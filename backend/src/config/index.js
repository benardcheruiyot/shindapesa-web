const { sql } = require('@vercel/postgres');
const dotenv = require('dotenv');

dotenv.config();

const config = {
    port: process.env.PORT || 5000,
    mpesa: {
        env: process.env.MPESA_ENV || 'sandbox',
        consumerKey: (process.env.MPESA_CONSUMER_KEY || '').trim(),
        consumerSecret: (process.env.MPESA_CONSUMER_SECRET || '').trim(),
        passkey: (process.env.MPESA_PASSKEY || '').trim(),
        storeNumber: (process.env.MPESA_STORE_NUMBER || '').trim(),
        tillNumber: (process.env.MPESA_TILL_NUMBER || '').trim(), // Use env variable instead of hardcoded
        callbackUrl: process.env.MPESA_CALLBACK_URL,
        initiator: process.env.MPESA_INITIATOR_NAME,
        securityCredential: process.env.MPESA_SECURITY_CREDENTIAL,
        b2cShortcode: process.env.MPESA_B2C_SHORTCODE,
        b2cCallbackUrl: process.env.MPESA_B2C_CALLBACK_URL
    },
    baseUrl: process.env.MPESA_ENV === 'production' 
        ? 'https://api.safaricom.co.ke' 
        : 'https://sandbox.safaricom.co.ke'
};

const formatPhoneNumber = (phone) => {
    let formatted = phone.toString().replace(/\s+/g, '');
    if (formatted.startsWith('0')) formatted = '254' + formatted.substring(1);
    else if (formatted.startsWith('+')) formatted = formatted.substring(1);
    else if (formatted.length === 9) formatted = '254' + formatted;
    return formatted;
};

const generateTimestamp = () => {
    return new Date().toISOString().replace(/[-:T.Z]/g, '').slice(0, 14);
};

module.exports = { config, sql, formatPhoneNumber, generateTimestamp };
