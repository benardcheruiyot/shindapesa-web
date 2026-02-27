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
    const initiatorName = process.env.MPESA_INITIATOR_NAME || 'SpinWinAdmin';
    const securityCredential = process.env.MPESA_SECURITY_CREDENTIAL; // Encrypted Safaricom password
    const mpesaEnv = process.env.MPESA_ENV || 'sandbox';
    const baseUrl = mpesaEnv === 'production' 
      ? 'https://api.safaricom.co.ke' 
      : 'https://sandbox.safaricom.co.ke';
    
    // --- SIMULATION MODE ---
    if (!consumerKey || !consumerSecret || !securityCredential) {
      console.warn("M-Pesa B2C Configuration missing - RUNNING IN SIMULATION MODE");
      return NextResponse.json({
        ConversationID: "SIM-CONV-" + Date.now(),
        OriginatorConversationID: "SIM-ORIG-" + Math.random().toString(36).substr(2, 9),
        ResponseCode: "0",
        ResponseDescription: "Accept the service request successfully."
      });
    }

    // 1. Get Auth Token
    const { access_token } = await getAuthToken(consumerKey, consumerSecret, baseUrl);

    // 2. Prepare B2C Body
    const shortcode = process.env.MPESA_B2C_SHORTCODE || '600000'; // The Business Shortcode (Payer)
    const tillNumber = process.env.MPESA_TILL_NUMBER || shortcode; // This is the Till Number (3700945)
    
    // NOTE: In B2C Withdrawal, PartyB is usually the person's phone.
    // If you want PartyB to be a Till Number, we use the the till here as instructed.
    const b2cBody = {
      InitiatorName: initiatorName,
      SecurityCredential: securityCredential,
      CommandID: "BusinessPayment", 
      Amount: Math.round(amount),
      PartyA: "3700945", // Business Shortcode (Must be a string)
      PartyB: "8733762", // Receiving Shortcode/Till (Must be a string)
      Remarks: "SHINDAPESA Payout",
      QueueTimeOutURL: process.env.MPESA_B2C_CALLBACK_URL,
      ResultURL: process.env.MPESA_B2C_CALLBACK_URL,
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
