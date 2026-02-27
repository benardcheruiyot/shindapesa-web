export const mpesaConfig = {
  consumerKey: process.env.MPESA_CONSUMER_KEY || 'c9AnG7qA00pGs0tVqA0W0A0W0A0W0A0W',
  consumerSecret: process.env.MPESA_CONSUMER_SECRET || 'A0W0A0W0A0W0A0W0',
  initiatorName: process.env.MPESA_INITIATOR_NAME || 'SpinWinAdmin',
  securityCredential: process.env.MPESA_SECURITY_CREDENTIAL,
  shortcode: process.env.MPESA_SHORTCODE || '174379', // Sandbox Shortcode
  b2cShortcode: process.env.MPESA_B2C_SHORTCODE || '600000', 
  passkey: process.env.MPESA_PASSKEY || 'bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919', // Sandbox Passkey
  env: process.env.MPESA_ENV || 'sandbox', // Switch to sandbox
  callbackUrl: process.env.MPESA_CALLBACK_URL || `${process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_APP_URL}/api/mpesa/callback`,
  b2cCallbackUrl: process.env.MPESA_B2C_CALLBACK_URL || `${process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_APP_URL}/api/mpesa/withdraw-callback`,
  transactionType: process.env.MPESA_TRANSACTION_TYPE || 'CustomerPayBillOnline', // Sandbox usually uses PayBill
  tillNumber: process.env.MPESA_TILL_NUMBER || '174379',
  storeNumber: process.env.MPESA_STORE_NUMBER || '174379', 
};

export const getBaseUrl = () => {
  return mpesaConfig.env === 'production' 
    ? 'https://api.safaricom.co.ke' 
    : 'https://sandbox.safaricom.co.ke';
};

export const isConfigValid = (type: 'stk' | 'b2c' | 'auth') => {
  const { consumerKey, consumerSecret, passkey, shortcode, tillNumber, storeNumber } = mpesaConfig;
  
  if (type === 'auth') {
    return !!(consumerKey && consumerSecret);
  }
  if (type === 'stk') {
    const isBuyGoods = mpesaConfig.transactionType === 'CustomerBuyGoodsOnline';
    if (isBuyGoods) {
      return !!(consumerKey && consumerSecret && passkey && storeNumber && tillNumber);
    }
    return !!(consumerKey && consumerSecret && passkey && shortcode);
  }
  if (type === 'b2c') {
    return !!(consumerKey && consumerSecret && mpesaConfig.securityCredential && mpesaConfig.b2cShortcode);
  }
  return false;
};
