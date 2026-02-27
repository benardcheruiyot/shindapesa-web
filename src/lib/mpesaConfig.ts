export const mpesaConfig = {
  consumerKey: process.env.MPESA_CONSUMER_KEY,
  consumerSecret: process.env.MPESA_CONSUMER_SECRET,
  initiatorName: process.env.MPESA_INITIATOR_NAME || 'SpinWinAdmin',
  securityCredential: process.env.MPESA_SECURITY_CREDENTIAL,
  shortcode: process.env.MPESA_SHORTCODE || '174379',
  b2cShortcode: process.env.MPESA_B2C_SHORTCODE || '600000',
  passkey: process.env.MPESA_PASSKEY,
  env: process.env.MPESA_ENV || 'sandbox',
  callbackUrl: process.env.MPESA_CALLBACK_URL || `${process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_APP_URL}/api/mpesa/callback`,
  b2cCallbackUrl: process.env.MPESA_B2C_CALLBACK_URL || `${process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_APP_URL}/api/mpesa/withdraw-callback`,
  transactionType: process.env.MPESA_TRANSACTION_TYPE || 'CustomerBuyGoodsOnline',
  tillNumber: process.env.MPESA_TILL_NUMBER || '8733762',
  storeNumber: process.env.MPESA_STORE_NUMBER, // For Buy Goods (Till) setups
};

export const getBaseUrl = () => {
  return mpesaConfig.env === 'production' 
    ? 'https://api.safaricom.co.ke' 
    : 'https://sandbox.safaricom.co.ke';
};

export const isConfigValid = (type: 'stk' | 'b2c' | 'auth') => {
  const { consumerKey, consumerSecret, passkey, shortcode, callbackUrl, storeNumber, tillNumber } = mpesaConfig;
  
  if (type === 'auth') {
    return !!(consumerKey && consumerSecret);
  }
  if (type === 'stk') {
    // Basic auth check
    if (!consumerKey || !consumerSecret || !passkey || !callbackUrl) return false;
    
    // For Buy Goods (Till), we need both Store Number and Till Number
    if (mpesaConfig.transactionType === 'CustomerBuyGoodsOnline') {
      return !!(storeNumber && tillNumber);
    }
    
    // For Paybill, we just need the shortcode
    return !!shortcode;
  }
  if (type === 'b2c') {
    return !!(consumerKey && consumerSecret && mpesaConfig.securityCredential && mpesaConfig.b2cShortcode && mpesaConfig.b2cCallbackUrl);
  }
  return false;
};
