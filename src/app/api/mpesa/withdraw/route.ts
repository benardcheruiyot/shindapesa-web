import { NextResponse } from 'next/server';
import { generateTimestamp, getAuthToken, formatPhoneNumber } from '@/services/mpesaService';

/**
 * Backend Route for M-Pesa B2C Payouts (Part B: Withdrawals)
 */
export async function POST(request: Request) {
  try {
    const { phone, amount } = await request.json();

    if (!phone || !amount) {
      return NextResponse.json({ error: "Phone and Amount are required" }, { status: 400 });
    }

    const consumerKey = process.env.MPESA_CONSUMER_KEY;
    const consumerSecret = process.env.MPESA_CONSUMER_SECRET;
    const initiatorName = process.env.MPESA_INITIATOR_NAME || 'ShindaPesaAdmin';
    const securityCredential = process.env.MPESA_SECURITY_CREDENTIAL; // Encrypted Safaricom password
    const mpesaEnv = process.env.MPESA_ENV || 'sandbox';
    const baseUrl = mpesaEnv === 'production' 
      ? 'https://api.safaricom.co.ke' 
      : 'https://sandbox.safaricom.co.ke';
    
    if (!consumerKey || !consumerSecret || !securityCredential) {
      console.error("Missing M-Pesa B2C Configuration in environment variables");
      return NextResponse.json({ error: "Server Configuration Error" }, { status: 500 });
    }

    // 1. Get Auth Token
    const { access_token } = await getAuthToken(consumerKey, consumerSecret, baseUrl);

    // 2. Prepare B2C Body
    const shortcode = process.env.MPESA_B2C_SHORTCODE || '600000'; // Paybill/Command id
    const callbackUrl = process.env.MPESA_B2C_CALLBACK_URL;

    const b2cBody = {
      InitiatorName: initiatorName,
      SecurityCredential: securityCredential,
      CommandID: "BusinessPayment", // or "PromotionPayment"
      Amount: Math.round(amount),
      PartyA: shortcode,
      PartyB: formatPhoneNumber(phone),
      Remarks: "ShindaPesa Prize Payout",
      QueueTimeOutURL: callbackUrl,
      ResultURL: callbackUrl,
      Occasion: "Gaming Win"
    };

    const b2cResponse = await fetch(`${baseUrl}/mpesa/b2c/v1/paymentrequest`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(b2cBody)
    });

    const b2cData = await b2cResponse.json();
    
    console.log("M-Pesa B2C Response:", b2cData);
    
    return NextResponse.json(b2cData);

  } catch (error: any) {
    console.error('M-Pesa B2C Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
