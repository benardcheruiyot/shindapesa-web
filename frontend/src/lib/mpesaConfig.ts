export const mpesaConfig = {
  // Use trim() to prevent invisible characters from breaking authentication
  consumerKey: (process.env.MPESA_CONSUMER_KEY || '').trim(),
  consumerSecret: (process.env.MPESA_CONSUMER_SECRET || '').trim(),
  initiatorName: process.env.MPESA_INITIATOR_NAME || 'SpinWinAdmin',
  securityCredential: process.env.MPESA_SECURITY_CREDENTIAL,
  shortcode: (process.env.MPESA_SHORTCODE || '174379').trim(),
  b2cShortcode: (process.env.MPESA_B2C_SHORTCODE || '600000').trim(),
  passkey: (process.env.MPESA_PASSKEY || '').trim(),
  // Check if we are on Vercel or local to force environment
  env: process.env.VERCEL ? 'production' : (process.env.MPESA_ENV || 'sandbox'),
  callbackUrl: process.env.MPESA_CALLBACK_URL || `${process.env.NEXT_PUBLIC_APP_URL}/api/mpesa/callback`,
  b2cCallbackUrl: process.env.MPESA_B2C_CALLBACK_URL || `${process.env.NEXT_PUBLIC_APP_URL}/api/mpesa/withdraw-callback`,
  transactionType: process.env.MPESA_TRANSACTION_TYPE || 'CustomerPayBillOnline',
  tillNumber: (process.env.MPESA_TILL_NUMBER || '').trim(),
  storeNumber: (process.env.MPESA_STORE_NUMBER || '').trim(), 
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
