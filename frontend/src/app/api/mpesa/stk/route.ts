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
      console.error("STK Push Request error: Missing phone or amount", { phone, amount });
      return NextResponse.json({ error: "Phone and Amount are required" }, { status: 400 });
    }

    const baseUrl = getBaseUrl();
    console.log(`Using M-Pesa Environment: ${mpesaConfig.env} | Base URL: ${baseUrl}`);
    
    // --- AUTHENTICATION ---
    let access_token = cachedToken;
    const now = Date.now();

    if (!access_token || now >= tokenExpiry) {
      try {
        // In production, we MUST use the environment variables directly
        const key = process.env.MPESA_CONSUMER_KEY;
        const secret = process.env.MPESA_CONSUMER_SECRET;
        
        if (!key || !secret) {
          throw new Error("Missing MPESA_CONSUMER_KEY or MPESA_CONSUMER_SECRET in production environment");
        }
        
        console.log("Fetching new production OAuth token...");
        const data = await getAuthToken(key.trim(), secret.trim(), baseUrl);
        
        if (data.error || !data.access_token) {
          console.error("Safaricom Auth Failed:", data);
          throw new Error(data.errorMessage || "OAuth Token generation failed (Check Keys)");
        }
        
        access_token = data.access_token;
        cachedToken = access_token;
        tokenExpiry = now + (3300 * 1000); 
      } catch (tokenErr: any) {
        console.error("M-Pesa Production Auth Error:", tokenErr.message);
        return NextResponse.json({ 
          error: "Production Authentication Failed", 
          details: tokenErr.message,
          tip: "Ensure your Consumer Key and Secret are from the 'PROD' app in Daraja Portal, not Sandbox."
        }, { status: 401 });
      }
    }

    // 2. Prepare STK Push Request
    const timestamp = generateTimestamp();
    
    // FORCE FIX FOR BUY GOODS (TILL):
    // In Daraja Production, for Buy Goods:
    // 1. BusinessShortCode MUST be the STORE NUMBER (6 or 7 digits).
    // 2. PartyB MUST be the TILL NUMBER (5 or 6 digits).
    // 3. Password is generated using the STORE NUMBER + Passkey + Timestamp.
    
    const rawTill = (process.env.MPESA_TILL_NUMBER || '').trim();
    const rawStore = (process.env.MPESA_STORE_NUMBER || '').trim();
    const txType = 'CustomerBuyGoodsOnline'; // Force this for your setup
    
    if (!rawStore || !rawTill) {
      throw new Error(`Buy Goods configuration error: Missing Store Number (${rawStore}) or Till Number (${rawTill})`);
    }
    
    const businessShortCode = rawStore; 
    const partyB = rawTill;
      
    const passkey = (process.env.MPESA_PASSKEY || '').trim();
    if (!passkey) {
      throw new Error("Missing MPESA_PASSKEY in production environment.");
    }
      
    const password = Buffer.from(`${businessShortCode}${passkey}${timestamp}`).toString('base64');
    
    // Format phone: 2547XXXXXXXX or 2541XXXXXXXX
    const formattedPhone = formatPhoneNumber(phone);

    const stkBody = {
      BusinessShortCode: businessShortCode,
      Password: password,
      Timestamp: timestamp,
      TransactionType: mpesaConfig.transactionType, 
      Amount: Math.round(amount), 
      PartyA: formattedPhone,
      PartyB: partyB,
      PhoneNumber: formattedPhone,
      CallBackURL: mpesaConfig.callbackUrl,
      AccountReference: (accountReference || "SHINDAPESA").substring(0, 12),
      TransactionDesc: "Payment"
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
    
    // ENHANCED PRODUCTION LOGGING
    console.log('--- Safaricom STK Response ---');
    console.log('Environment:', mpesaConfig.env);
    console.log('ShortCode Used:', businessShortCode);
    console.log('PartyB Used:', partyB);
    console.log('Status Code:', stkResponse.status);
    console.log('Payload:', JSON.stringify(stkData, null, 2));
    
    if (stkResponse.status !== 200) {
      // If Safaricom rejects the body, we need to know why
      return NextResponse.json({ 
        error: "Safaricom Rejected STK Request", 
        details: stkData.errorMessage || stkData.ResponseDescription || "Invalid Request Body",
        code: stkData.errorCode || "400",
        debug: {
          shortCode: businessShortCode,
          partyB: partyB,
          type: mpesaConfig.transactionType
        }
      }, { status: stkResponse.status });
    }

    return NextResponse.json(stkData);

  } catch (error: any) {
    console.error('M-Pesa API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
