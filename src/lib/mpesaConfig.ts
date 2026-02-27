export const mpesaConfig = {
  consumerKey: process.env.MPESA_CONSUMER_KEY,
  consumerSecret: process.env.MPESA_CONSUMER_SECRET,
  initiatorName: process.env.MPESA_INITIATOR_NAME || 'SpinWinAdmin',
  securityCredential: process.env.MPESA_SECURITY_CREDENTIAL,
  shortcode: "3700945", // Hardcoded Store/Shortcode
  b2cShortcode: "600000", // Default B2C Shortcode
  passkey: process.env.MPESA_PASSKEY,
  env: process.env.MPESA_ENV || 'sandbox',
  callbackUrl: `${process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_APP_URL}/api/mpesa/callback`,
  b2cCallbackUrl: `${process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_APP_URL}/api/mpesa/withdraw-callback`,
  transactionType: "CustomerBuyGoodsOnline",
  tillNumber: "8733762",
  storeNumber: "3700945", 
};

export const getBaseUrl = () => {
  return mpesaConfig.env === 'production' 
    ? 'https://api.safaricom.co.ke' 
    : 'https://sandbox.safaricom.co.ke';
};

export const isConfigValid = (type: 'stk' | 'b2c' | 'auth') => {
  const { consumerKey, consumerSecret, passkey } = mpesaConfig;
  
  if (type === 'auth') {
    return !!(consumerKey && consumerSecret);
  }
  if (type === 'stk') {
    // Only require Daraja credentials as requested
    return !!(consumerKey && consumerSecret && passkey);
  }
  if (type === 'b2c') {
    return !!(consumerKey && consumerSecret && mpesaConfig.securityCredential);
  }
  return false;
};
