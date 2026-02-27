import { NextResponse } from 'next/server';
import { getAuthToken } from '@/services/mpesaService';
import { getBaseUrl } from '@/lib/mpesaConfig';

export async function GET() {
  // ONLY for temporary debugging. Remove this file before sharing the URL or going public!
  try {
    const key = process.env.MPESA_CONSUMER_KEY?.trim() || 'MISSING';
    const secret = process.env.MPESA_CONSUMER_SECRET?.trim() || 'MISSING';
    const env = process.env.MPESA_ENV || 'not set';
    const baseUrl = getBaseUrl();

    // Mask for safety
    const maskedKey = key !== 'MISSING' ? `${key.substring(0, 5)}...${key.substring(key.length - 5)}` : 'MISSING';
    const maskedSecret = secret !== 'MISSING' ? `${secret.substring(0, 5)}...${secret.substring(secret.length - 5)}` : 'MISSING';

    const testResponse = await getAuthToken(key, secret, baseUrl);

    return NextResponse.json({
      environment: env,
      baseUrl: baseUrl,
      keyStatus: key !== 'MISSING' ? 'Present' : 'Missing',
      secretStatus: secret !== 'MISSING' ? 'Present' : 'Missing',
      maskedKey,
      maskedSecret,
      authTest: testResponse.error ? 'FAILED' : 'SUCCESS',
      errorDetails: testResponse.errorMessage || null,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
