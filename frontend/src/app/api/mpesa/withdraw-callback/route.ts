import { NextResponse } from 'next/server';

/**
 * M-Pesa B2C (Withdrawal) Callback Route
 * This endpoint is called by Safaricom once the withdrawal request is processed.
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log('M-Pesa B2C Callback Received:', JSON.stringify(body, null, 2));

    // Safaricom sends a Result structure for B2C
    const result = body.Result;
    
    if (!result) {
      return NextResponse.json({ ResultCode: 1, ResultDesc: 'Invalid payload' }, { status: 400 });
    }

    const { ResultCode, ResultDesc, OriginatorConversationID, ConversationID, TransactionID } = result;

    if (ResultCode === 0) {
      console.log(`Withdrawal Success! ID: ${TransactionID}, OriginatorID: ${OriginatorConversationID}`);
      // TODO: Logic to update user balance in the database should go here.
      // E.g., const userId = await getUserIdByOriginatorID(OriginatorConversationID);
      // await updateWithdrawalStatus(userId, TransactionID, 'COMPLETED');
    } else {
      console.warn(`Withdrawal Failed: ${ResultDesc} (Code: ${ResultCode})`);
      // TODO: Logic to return funds to the user's game wallet if applicable.
    }

    // Safaricom expects a standard success response
    return NextResponse.json({ ResultCode: 0, ResultDesc: 'Success' });
  } catch (error) {
    console.error('Error in M-Pesa B2C Callback:', error);
    return NextResponse.json({ ResultCode: 1, ResultDesc: 'Internal Error' }, { status: 500 });
  }
}
