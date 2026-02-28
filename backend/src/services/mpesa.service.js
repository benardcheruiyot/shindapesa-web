const fetch = require('node-fetch');
const { config } = require('../config');

class MpesaService {
    constructor() {
        this.token = null;
        this.expiry = 0;
    }

    async getAuthToken() {
        // Return cached token if valid (59 minutes buffer for 1 hour token)
        if (this.token && Date.now() < this.expiry) {
            return { access_token: this.token };
        }

        const { consumerKey, consumerSecret } = config.mpesa;
        const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
        
        try {
            const response = await fetch(`${config.baseUrl}/oauth/v1/generate?grant_type=client_credentials`, {
                headers: { Authorization: `Basic ${auth}` }
            });

            if (!response.ok) {
                const error = await response.text();
                throw new Error(`Daraja Auth Failed: ${error}`);
            }

            const data = await response.json();
            
            // Cache the token
            this.token = data.access_token;
            // Set expiry to 5 mins from now (Daraja tokens last 60 mins)
            this.expiry = Date.now() + (5 * 60 * 1000);
            
            return data;
        } catch (error) {
            console.error("Auth Token Error:", error.message);
            throw error;
        }
    }

    async stkPush(phone, amount, accountReference, timestamp) {
        const { access_token } = await this.getAuthToken();
        const { storeNumber, tillNumber, passkey, callbackUrl } = config.mpesa;

        const password = Buffer.from(`${storeNumber}${passkey}${timestamp}`).toString('base64');
        
        const body = {
            BusinessShortCode: storeNumber,
            Password: password,
            Timestamp: timestamp,
            TransactionType: config.mpesa.env === 'production' ? "CustomerBuyGoodsOnline" : "CustomerPayBillOnline",
            Amount: Math.round(amount),
            PartyA: phone,
            PartyB: config.mpesa.env === 'production' ? tillNumber : storeNumber,
            PhoneNumber: phone,
            CallBackURL: callbackUrl,
            AccountReference: (accountReference || "SHINDAPESA").substring(0, 12),
            TransactionDesc: "Payment"
        };

        const response = await fetch(`${config.baseUrl}/mpesa/stkpush/v1/processrequest`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${access_token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        const data = await response.json();

        // If Safaricom returns a 429 or auth error, clear token cache to force refresh on next call
        if (response.status === 429 || response.status === 401) {
            console.warn(`Safaricom rate limit/auth error (${response.status}). Clearing token cache.`);
            this.token = null;
            this.expiry = 0;
            return { error: true, message: "Safaricom is busy. Please try again in 30 seconds.", code: response.status };
        }

        return data;
    }

    async b2cRequest(phone, amount) {
        const { access_token } = await this.getAuthToken();
        const { initiator, securityCredential, b2cShortcode, b2cCallbackUrl } = config.mpesa;

        const body = {
            InitiatorName: initiator,
            SecurityCredential: securityCredential,
            CommandID: "BusinessPayment",
            Amount: Math.round(amount),
            PartyA: b2cShortcode,
            PartyB: phone,
            Remarks: "SHINDAPESA Payout",
            QueueTimeOutURL: b2cCallbackUrl,
            ResultURL: b2cCallbackUrl,
            Occasion: "Gaming Win"
        };

        const response = await fetch(`${config.baseUrl}/mpesa/b2c/v1/paymentrequest`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${access_token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        return response.json();
    }
}

module.exports = new MpesaService();
