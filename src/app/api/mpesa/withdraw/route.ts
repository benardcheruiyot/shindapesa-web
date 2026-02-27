import { NextResponse } from 'next/server';
import { getAuthToken, formatPhoneNumber } from '@/services/mpesaService';
import { mpesaConfig, getBaseUrl, isConfigValid } from '@/lib/mpesaConfig';

/**
 * Backend Route for M-Pesa B2C Payouts (Part B: Withdrawals)
 */
export async function POST(request: Request) {
  try {
    const { phone, amount } = await request.json();

    if (!phone || !amount) {
      return NextResponse.json({ error: "Phone and Amount are required" }, { status: 400 });
    }

    const baseUrl = getBaseUrl();
    
    // --- SIMULATION MODE ---
    if (!isConfigValid('b2c')) {
      console.warn("M-Pesa B2C Configuration missing - RUNNING IN SIMULATION MODE");
      return NextResponse.json({
        ConversationID: "SIM-CONV-" + Date.now(),
        OriginatorConversationID: "SIM-ORIG-" + Math.random().toString(36).substr(2, 9),
        ResponseCode: "0",
        ResponseDescription: "Accept the service request successfully."
      });
    }

    // 1. Get Auth Token
    const authData = await getAuthToken(mpesaConfig.consumerKey!, mpesaConfig.consumerSecret!, baseUrl);
    const access_token = authData.access_token;
    
    if (!access_token) {
      return NextResponse.json({ error: "Could not authenticate with Safaricom. Check credentials." }, { status: 401 });
    }

    // 2. Prepare B2C Body
    const formattedPhone = formatPhoneNumber(phone);
    
    // NOTE: In B2C Withdrawal, PartyA is the Business (Sending), PartyB is the Customer (Receiving).
    const b2cBody = {
      InitiatorName: mpesaConfig.initiatorName,
      SecurityCredential: mpesaConfig.securityCredential,
      CommandID: "BusinessPayment", // BusinessPayment is usually used for wins/rewards
      Amount: Math.round(amount),
      PartyA: mpesaConfig.b2cShortcode, 
      PartyB: formattedPhone, 
      Remarks: "SHINDAPESA Payout",
      QueueTimeOutURL: mpesaConfig.b2cCallbackUrl,
      ResultURL: mpesaConfig.b2cCallbackUrl,
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

  } catch (error: unknown) {
    console.error('M-Pesa B2C Error:', error);
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
