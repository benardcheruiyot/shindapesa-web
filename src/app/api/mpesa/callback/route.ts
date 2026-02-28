import { NextResponse } from 'next/server';
import { updateTransactionStatus } from '@/lib/mpesaStore';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("M-Pesa Callback Received:", JSON.stringify(body, null, 2));

    const { Body } = body;
    if (!Body || !Body.stkCallback) {
      return NextResponse.json({ ResultCode: 1, ResultDesc: "Invalid Body" }, { status: 400 });
    }

    const { ResultCode, ResultDesc, CheckoutRequestID, CallbackMetadata } = stkCallback;

    let displayMessage = ResultDesc;
    if (ResultCode === 1032) {
      displayMessage = "Request canceled by user.";
    } else if (ResultCode === 1) {
      displayMessage = "Insufficient balance in your M-Pesa account.";
    } else if (ResultCode === 2001) {
      displayMessage = "Incorrect M-Pesa PIN entered.";
    }

    console.log(`M-Pesa Callback Processed - ID: ${CheckoutRequestID}, Code: ${ResultCode}, Desc: ${displayMessage}`);

    // Update the store for the frontend to poll
    updateTransactionStatus(CheckoutRequestID, {
      status: ResultCode === 0 ? "SUCCESS" : "FAILED",
      resultCode: ResultCode,
      resultDesc: displayMessage,
      metadata: CallbackMetadata,
      raw: stkCallback
    });

    return NextResponse.json({ ResultCode: 0, ResultDesc: "Success" });
  } catch (error: any) {
    console.error('M-Pesa Callback Error:', error);
    return NextResponse.json({ ResultCode: 1, ResultDesc: "Error" }, { status: 500 });
  }
}
