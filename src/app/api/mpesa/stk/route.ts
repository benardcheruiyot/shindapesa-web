import { NextResponse } from 'next/server';
import { formatPhoneNumber, generateTimestamp, getAuthToken } from '@/services/mpesaService';

// Global variables to cache the token for better performance in production
let cachedToken: string | null = null;
let tokenExpiry: number = 0;

export async function POST(request: Request) {
  try {
    const { phone, amount, accountReference } = await request.json();

    if (!phone || !amount) {
      return NextResponse.json({ error: "Phone and Amount are required" }, { status: 400 });
    }

    // 1. Generate/Retrieve Access Token
    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
    const mpesaEnv = process.env.MPESA_ENV || 'sandbox';
    const baseUrl = mpesaEnv === 'production' 
      ? 'https://api.safaricom.co.ke' 
      : 'https://sandbox.safaricom.co.ke';
    
    if (!consumerKey || !consumerSecret) {
      console.error("Missing M-Pesa Consumer Key or Secret in environment variables");
      return NextResponse.json({ error: "Server Configuration Error" }, { status: 500 });
    }

    let access_token = cachedToken;
    const now = Date.now();

    // Only fetch a new token if cached one is missing or expired (with 5 min buffer)
    if (!access_token || now >= tokenExpiry) {
      const data = await getAuthToken(consumerKey, consumerSecret, baseUrl);
      access_token = data.access_token;
      cachedToken = access_token;
      // Mark expiry: Safaricom tokens usually last 3600 seconds. We save for 55 mins (3300s)
      tokenExpiry = now + (3300 * 1000); 
    }

    // 2. Prepare STK Push Request
    const shortcode = process.env.MPESA_SHORTCODE || '174379';
    const passkey = process.env.MPESA_PASSKEY;
    const callbackUrl = process.env.MPESA_CALLBACK_URL;

    if (!passkey || !callbackUrl) {
      console.error("Missing M-Pesa Passkey or Callback URL in environment variables");
      return NextResponse.json({ error: "Server Configuration Error" }, { status: 500 });
    }

    const timestamp = generateTimestamp();
    const password = Buffer.from(`${shortcode}${passkey}${timestamp}`).toString('base64');
    
    // Format phone: 2547XXXXXXXX or 2541XXXXXXXX
    const formattedPhone = formatPhoneNumber(phone);

    const stkBody = {
      BusinessShortCode: shortcode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: Math.round(amount), // Ensure amount is integer
      PartyA: formattedPhone,
      PartyB: shortcode,
      PhoneNumber: formattedPhone,
      CallBackURL: callbackUrl,
      AccountReference: accountReference || "ShindaPesa",
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
    return NextResponse.json(stkData);

  } catch (error: any) {
    console.error('M-Pesa API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
