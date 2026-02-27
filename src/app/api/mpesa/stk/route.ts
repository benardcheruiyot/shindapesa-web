import { NextResponse } from 'next/server';
import { formatPhoneNumber, generateTimestamp, getAuthToken } from '@/services/mpesaService';
import { mpesaConfig, getBaseUrl, isConfigValid } from '@/lib/mpesaConfig';

// Global variables to cache the token for better performance in production
let cachedToken: string | null = null;
let tokenExpiry: number = 0;

export async function POST(request: Request) {
  try {
    const { phone, amount, accountReference } = await request.json();

    if (!phone || !amount) {
      return NextResponse.json({ error: "Phone and Amount are required" }, { status: 400 });
    }

    const baseUrl = getBaseUrl();
    
    // --- SIMULATION MODE ---
    if (!isConfigValid('stk')) {
      const missingFields = [];
      if (!mpesaConfig.consumerKey) missingFields.push("Consumer Key");
      if (!mpesaConfig.consumerSecret) missingFields.push("Consumer Secret");
      if (!mpesaConfig.passkey) missingFields.push("Passkey");
      if (!mpesaConfig.callbackUrl) missingFields.push("Callback URL");
      if (mpesaConfig.transactionType === 'CustomerBuyGoodsOnline' && !mpesaConfig.storeNumber) missingFields.push("Store Number");

      if (process.env.NODE_ENV === 'production' || mpesaConfig.env === 'production') {
        return NextResponse.json({ 
          error: `Production setup error: Missing variables [${missingFields.join(", ")}]`,
          help: "Ensure all M-Pesa variables are set in your .env file or hosting provider dashboard."
        }, { status: 500 });
      }

      console.warn("M-Pesa environment variables missing - RUNNING IN SIMULATION MODE");
      return NextResponse.json({
        MerchantRequestID: "SIM-" + Date.now(),
        CheckoutRequestID: "SIM-" + Math.random().toString(36).substr(2, 9),
        ResponseCode: "0",
        ResponseDescription: "Success. Request accepted for processing",
        CustomerMessage: "Success. Request accepted for processing"
      });
    }

    let access_token = cachedToken;
    const now = Date.now();

    // Only fetch a new token if cached one is missing or expired (with 5 min buffer)
    if (!access_token || now >= tokenExpiry) {
      try {
        const data = await getAuthToken(mpesaConfig.consumerKey!, mpesaConfig.consumerSecret!, baseUrl);
        if (data.error || !data.access_token) {
          throw new Error(data.errorMessage || "OAuth Token generation failed");
        }
        access_token = data.access_token;
        cachedToken = access_token;
        // Mark expiry: Safaricom tokens usually last 3600 seconds. We save for 55 mins (3300s)
        tokenExpiry = now + (3300 * 1000); 
      } catch (tokenErr: any) {
        console.error("Token Error:", tokenErr);
        return NextResponse.json({ error: "Could not authenticate with Safaricom. Check credentials." }, { status: 401 });
      }
    }

    // 2. Prepare STK Push Request
    const timestamp = generateTimestamp();
    
    // For Buy Goods (Till), the shortcode used for password generation is the STORE NUMBER
    const businessShortCode = mpesaConfig.transactionType === 'CustomerBuyGoodsOnline' 
      ? mpesaConfig.storeNumber 
      : mpesaConfig.shortcode;
      
    const password = Buffer.from(`${businessShortCode}${mpesaConfig.passkey}${timestamp}`).toString('base64');
    
    // Format phone: 2547XXXXXXXX or 2541XXXXXXXX
    const formattedPhone = formatPhoneNumber(phone);
    
    // CRITICAL: For "Buy Goods" (Till), PartyB MUST be the 7-digit Till Number
    const partyB = mpesaConfig.transactionType === 'CustomerBuyGoodsOnline'
      ? mpesaConfig.tillNumber // e.g., 8733762
      : mpesaConfig.shortcode;

    const stkBody = {
      BusinessShortCode: businessShortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: mpesaConfig.transactionType, 
      Amount: Math.round(amount), // Ensure amount is integer
      PartyA: formattedPhone,
      PartyB: partyB,
      PhoneNumber: formattedPhone,
      CallBackURL: mpesaConfig.callbackUrl,
      AccountReference: accountReference || "SHINDAPESA",
      TransactionDesc: "Account Activation"
    };

    const stkResponse = await fetch(`${baseUrl}/mpesa/stkpush/v1/processrequest`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(stkBody)
    });

    const stkData = await stkResponse.json();
    
    // LOGGING FOR PRODUCTION DEBUGGING
    console.log('--- Safaricom STK Response ---');
    console.log('Status Code:', stkResponse.status);
    console.log('Payload:', JSON.stringify(stkData, null, 2));
    
    if (stkResponse.status !== 200) {
      console.error('STK Push Failed:', stkData.errorMessage || stkData.ResponseDescription || 'Unknown Error');
    }

    return NextResponse.json(stkData);

  } catch (error: any) {
    console.error('M-Pesa API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
