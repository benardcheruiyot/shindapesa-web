import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { Body } = await request.json();
    const { stkCallback } = Body;
    const { ResultCode, ResultDesc, MerchantRequestID, CheckoutRequestID } = stkCallback;

    console.log(`M-Pesa Callback - Code: ${ResultCode}, Desc: ${ResultDesc}`);

    if (ResultCode === 0) {
      // Payment Successful
      // In a real app, update DB or cache (e.g., Redis)
      // and redirect the frontend.
    }

    return NextResponse.json({ ResultCode: 0, ResultDesc: "Success" });
  } catch (error: any) {
    console.error('M-Pesa Callback Error:', error);
    return NextResponse.json({ ResultCode: 1, ResultDesc: "Error" }, { status: 500 });
  }
}
