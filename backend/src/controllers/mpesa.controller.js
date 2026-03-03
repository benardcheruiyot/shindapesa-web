const MpesaService = require('../services/mpesa.service');
const { sql, formatPhoneNumber, generateTimestamp } = require('../config');

exports.stkPush = async (req, res) => {
    try {
        console.log('[STK PUSH] Incoming request:', {
            method: req.method,
            url: req.originalUrl,
            headers: req.headers,
            body: req.body
        });
        const { phone, amount, accountReference, tillNumber } = req.body;
        if (!phone || !amount || !accountReference || !tillNumber) {
            console.error('[STK PUSH] Missing required fields:', req.body);
            return res.status(400).json({ error: 'Missing required fields: phone, amount, accountReference, tillNumber' });
        }
        const formattedPhone = formatPhoneNumber(phone);
        const timestamp = generateTimestamp();

        const result = await MpesaService.stkPush(formattedPhone, amount, accountReference, timestamp, tillNumber);

        // Log the initial transaction attempt (status PENDING)
        if (result.CheckoutRequestID) {
            await sql`
                INSERT INTO transactions (id, phone, amount, status)
                VALUES (${result.CheckoutRequestID}, ${formattedPhone}, ${amount}, 'PENDING')
                ON CONFLICT (id) DO NOTHING
            `;
        }

        res.json(result);
    } catch (err) {
        // Extra error logging for production
        console.error('[STK PUSH CONTROLLER ERROR]', {
            error: err.message,
            stack: err.stack,
            body: req.body
        });
        res.status(500).json({ error: err.message });
    }
};

exports.callback = async (req, res) => {
    try {
        const body = req.body;
        console.log("Callback Received:", JSON.stringify(body, null, 2));

        if (!body.Body || !body.Body.stkCallback) {
            return res.status(400).json({ ResultCode: 1, ResultDesc: "Invalid JSON" });
        }

        const { stkCallback } = body.Body;
        const { ResultCode, CheckoutRequestID, CallbackMetadata, ResultDesc } = stkCallback;

        if (ResultCode === 0 && CallbackMetadata) {
            const amount = CallbackMetadata.Item.find(i => i.Name === 'Amount')?.Value;
            let phone = CallbackMetadata.Item.find(i => i.Name === 'PhoneNumber')?.Value;
            const receipt = CallbackMetadata.Item.find(i => i.Name === 'MpesaReceiptNumber')?.Value;

            phone = formatPhoneNumber(phone);

            await sql`
                UPDATE users 
                SET balance = balance + ${amount}, is_activated = true, updated_at = NOW()
                WHERE phone = ${phone}
            `;

            await sql`
                INSERT INTO transactions (id, phone, amount, mpesa_receipt, status)
                VALUES (${CheckoutRequestID}, ${phone}, ${amount}, ${receipt}, 'SUCCESS')
                ON CONFLICT (id) DO UPDATE SET status = 'SUCCESS', mpesa_receipt = ${receipt}
            `;
            console.log(`Payment Success: ${phone}, Receipt: ${receipt}`);
        } else {
            // Handle Cancelled or Failed transactions
            // ResultCode 1032 is usually "Request cancelled by user"
            const status = ResultCode === 1032 ? 'CANCELLED' : 'FAILED';
            console.log(`Payment status for ${CheckoutRequestID}: ${status} (${ResultDesc})`);

            // Optionally log the failure/cancellation in the database if you have a phone number context
            // Note: phone number isn't always in the CallbackMetadata for failures
            await sql`
                UPDATE transactions 
                SET status = ${status} 
                WHERE id = ${CheckoutRequestID}
            `;
        }
        res.json({ ResultCode: 0, ResultDesc: "Success" });
    } catch (err) {
        console.error("Callback Error:", err.message);
        res.status(500).json({ ResultCode: 1, ResultDesc: "Internal Error" });
    }
};

exports.withdraw = async (req, res) => {
    try {
        const { phone, amount } = req.body;
        const formattedPhone = formatPhoneNumber(phone);
        const result = await MpesaService.b2cRequest(formattedPhone, amount);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getUser = async (req, res) => {
    try {
        const phone = formatPhoneNumber(req.params.phone);
        const { rows } = await sql`SELECT * FROM users WHERE phone = ${phone}`;
        res.json(rows[0] || { error: "User not found" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// Get latest transaction status for a user
exports.getLatestTransaction = async (req, res) => {
    try {
        const phone = formatPhoneNumber(req.params.phone);
        const { rows } = await sql`
            SELECT * FROM transactions WHERE phone = ${phone} ORDER BY created_at DESC LIMIT 1
        `;
        if (rows.length === 0) {
            return res.json({ status: 'NONE', message: 'No transaction found' });
        }
        const tx = rows[0];
        res.json({ status: tx.status, message: tx.status === 'SUCCESS' ? 'Payment successful' : (tx.status === 'CANCELLED' ? 'Payment cancelled' : 'Payment failed'), receipt: tx.mpesa_receipt });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.authTest = async (req, res) => {
    try {
        const data = await MpesaService.getAuthToken();
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
