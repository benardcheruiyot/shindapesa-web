export const formatPhoneNumber = (phone: string): string => {
  let formatted = phone.toString().replace(/\s+/g, '');
  if (formatted.startsWith('0')) {
    formatted = '254' + formatted.substring(1);
  } else if (formatted.startsWith('+')) {
    formatted = formatted.substring(1);
  } else if (formatted.length === 9 && (formatted.startsWith('7') || formatted.startsWith('1'))) {
    formatted = '254' + formatted;
  }
  return formatted;
};

export const generateTimestamp = (): string => {
  return new Date().toISOString().replace(/[-:T.Z]/g, '').slice(0, 14);
};

export const getAuthToken = async (consumerKey: string, consumerSecret: string, baseUrl: string) => {
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
  const response = await fetch(`${baseUrl}/oauth/v1/generate?grant_type=client_credentials`, {
    headers: { Authorization: `Basic ${auth}` }
  });
  return response.json();
};

const getApiBaseUrl = () => {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || process.env.NEXT_PUBLIC_APP_URL || '';
  return baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
};

/**
 * Frontend Client to interact with our Next.js M-Pesa API routes
 */
export const mpesaApi = {
  /**
   * Initiate an STK Push (C2B Payment)
   */
  initiateStkPush: async (phone: string, amount: number, accountRef: string) => {
    const response = await fetch(`${getApiBaseUrl()}/api/mpesa/stk`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, amount, accountReference: accountRef })
    });
    return response.json();
  },

  /**
   * Check STK Push Status (Wait/Poll)
   */
  checkStkStatus: async (checkoutID: string) => {
    const response = await fetch(`${getApiBaseUrl()}/api/mpesa/status?checkoutRequestID=${checkoutID}`);
    return response.json();
  },

  /**
   * Initiate a B2C Payout (Withdrawal)
   * PART B
   */
  initiateWithdrawal: async (phone: string, amount: number) => {
    const response = await fetch(`${getApiBaseUrl()}/api/mpesa/withdraw`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, amount })
    });
    return response.json();
  }
};

