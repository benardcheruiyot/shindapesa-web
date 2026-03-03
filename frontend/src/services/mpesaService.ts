
  /**
   * Get latest transaction status for a user
   */
  getLatestTransaction: async (phone: string) => {
    const response = await fetch(`${getApiBaseUrl()}/transaction/${phone}`);
    return response.json();
  }
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
  try {
    const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
    const response = await fetch(`${baseUrl}/oauth/v1/generate?grant_type=client_credentials`, {
      headers: { Authorization: `Basic ${auth}` }
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Daraja Auth Error (${response.status}):`, errorText);
      return { error: true, errorMessage: `Safaricom rejected credentials (${response.status})` };
    }
    
    return response.json();
  } catch (err: any) {
    console.error("Network error during Daraja Auth:", err.message);
    return { error: true, errorMessage: "Network error connecting to Safaricom" };
  }
};

const getApiBaseUrl = () => {
  // Read from env variable, fallback to empty string (which defaults to origin)
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || '';
  return baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
};

/**
 * Frontend Client to interact with our Standalone Backend
 */
export const mpesaApi = {
  /**
   * Initiate an STK Push (C2B Payment)
   */
  initiateStkPush: async (phone: string, amount: number, accountRef: string, tillNumber: string = "YOUR_DEFAULT_TILL") => {
    const response = await fetch(`${getApiBaseUrl()}/stk`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        phone, 
        amount, 
        accountReference: accountRef,
        tillNumber: tillNumber // You can now pass the till number here
      })
    });
    return response.json();
  },

  /**
   * Check STK Push Status (Sync balance instead of polling CheckoutID)
   */ 
  checkUserBalance: async (phone: string) => {
    const response = await fetch(`${getApiBaseUrl()}/user/${phone}`);
    return response.json();
  },

  /**
   * Initiate a B2C Payout (Withdrawal)
   */
  initiateWithdrawal: async (phone: string, amount: number) => {
    const response = await fetch(`${getApiBaseUrl()}/withdraw`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone, amount })
    });
    return response.json();
  }
    ,
  /**
   * Get latest transaction status for a user
   */
  getLatestTransaction: async (phone: string) => {
    const response = await fetch(`${getApiBaseUrl()}/transaction/${phone}`);
    return response.json();
  }
};


