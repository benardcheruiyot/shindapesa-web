// Global variable to persist across hot-reloads in dev
// and potentially across requests in the same container in production.
const globalForMpesa = global as unknown as { transactionStore: Map<string, any> };

export const transactionStore = globalForMpesa.transactionStore || new Map<string, any>();

if (process.env.NODE_ENV !== 'production') globalForMpesa.transactionStore = transactionStore;

export function updateTransactionStatus(checkoutRequestID: string, data: any) {
  transactionStore.set(checkoutRequestID, data);
  console.log(`[STK Store] Updated ID ${checkoutRequestID} with status:`, data.status);
}

export function getTransactionStatus(checkoutRequestID: string) {
  return transactionStore.get(checkoutRequestID);
}
