import { NextResponse } from 'next/server';
import { sql } from '@vercel/postgres';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    console.log("M-Pesa Callback Received:", JSON.stringify(body, null, 2));

    const { Body } = body;
    if (!Body || !Body.stkCallback) {
      return NextResponse.json({ ResultCode: 1, ResultDesc: "Invalid Body" }, { status: 400 });
    }

    const { stkCallback } = Body;
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

    // If payment was successful (ResultCode 0), update database
    if (ResultCode === 0 && CallbackMetadata && CallbackMetadata.Item) {
      const amount = CallbackMetadata.Item.find((i: any) => i.Name === 'Amount')?.Value;
      const phone = CallbackMetadata.Item.find((i: any) => i.Name === 'PhoneNumber')?.Value;
      const receipt = CallbackMetadata.Item.find((i: any) => i.Name === 'MpesaReceiptNumber')?.Value;

      // Update user balance and activation status
      // We use the phone number to match the user
      await sql`
        UPDATE users 
        SET 
          balance = balance + ${amount}, 
          is_activated = true,
          updated_at = NOW()
        WHERE phone = ${phone.toString()}
      `;

      // Log the transaction
      await sql`
        INSERT INTO transactions (id, phone, amount, mpesa_receipt, status)
        VALUES (${CheckoutRequestID}, ${phone.toString()}, ${amount}, ${receipt}, 'SUCCESS')
        ON CONFLICT (id) DO UPDATE SET status = 'SUCCESS', mpesa_receipt = ${receipt}
      `;
    } else {
      // Log failed transaction
      await sql`
        INSERT INTO transactions (id, status)
        VALUES (${CheckoutRequestID}, 'FAILED')
        ON CONFLICT (id) DO UPDATE SET status = 'FAILED'
      `;
    }

    return NextResponse.json({ ResultCode: 0, ResultDesc: "Success" });
  } catch (error: any) {
    console.error('M-Pesa Callback Error:', error);
    return NextResponse.json({ ResultCode: 1, ResultDesc: "Error" }, { status: 500 });
  }
}
