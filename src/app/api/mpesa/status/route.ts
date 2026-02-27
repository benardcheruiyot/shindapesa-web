import { NextResponse } from 'next/server';
import { getTransactionStatus } from '@/lib/mpesaStore';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const checkoutRequestID = searchParams.get('checkoutRequestID');

  if (!checkoutRequestID) {
    return NextResponse.json({ error: "CheckoutRequestID is required" }, { status: 400 });
  }

  const status = getTransactionStatus(checkoutRequestID);

  if (!status) {
    return NextResponse.json({ status: "PENDING" });
  }

  return NextResponse.json(status);
}
