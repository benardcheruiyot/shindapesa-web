const fetch = require('node-fetch');
const { config } = require('../config');

class MpesaService {
    async getAuthToken() {
        const { consumerKey, consumerSecret } = config.mpesa;
        const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
        const response = await fetch(`${config.baseUrl}/oauth/v1/generate?grant_type=client_credentials`, {
            headers: { Authorization: `Basic ${auth}` }
        });
        return response.json();
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

        return response.json();
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
