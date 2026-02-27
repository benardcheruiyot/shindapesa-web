import { NextResponse } from 'next/server';
import { updateTransactionStatus } from '@/lib/mpesaStore';

/**
 * ONLY FOR LOCAL TESTING
 * This endpoint lets you simulate a callback from Safaricom
 * Usage: /api/mpesa/simulate?checkoutID=ws_CO_...&status=SUCCESS
 */
export async function GET(request: Request) {
  // Only allow this in non-production environments normally, 
  // but we'll leave it for now so you can test on Render if you really need to.
  
  const { searchParams } = new URL(request.url);
  const checkoutID = searchParams.get('checkoutID');
  const status = searchParams.get('status') || 'SUCCESS'; // SUCCESS or FAILED
  const reason = searchParams.get('reason') || 'Simulated status update';

  if (!checkoutID) {
    return NextResponse.json({ error: "CheckoutID required" }, { status: 400 });
  }

  updateTransactionStatus(checkoutID, {
    status: status,
    resultCode: status === 'SUCCESS' ? 0 : 1032,
    resultDesc: status === 'SUCCESS' ? "Success" : reason
  });

  return NextResponse.json({ 
    message: `Simulated ${status} for ${checkoutID}`,
    nextSteps: "Your app should now detect this and update the UI."
  });
}
