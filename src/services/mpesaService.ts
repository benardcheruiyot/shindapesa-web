export const formatPhoneNumber = (phone: string): string => {
  let formatted = phone.toString().replace(/\s+/g, '');
  if (formatted.startsWith('0')) {
    formatted = '254' + formatted.substring(1);
  } else if (formatted.startsWith('+')) {
    formatted = formatted.substring(1);
  } else if (formatted.length === 9 && (formatted.startsWith('7') || formatted.startsWith('1'))) {
    formatted = '254' + formatted;
  }
  return formatted;
};

export const generateTimestamp = (): string => {
  return new Date().toISOString().replace(/[-:T.Z]/g, '').slice(0, 14);
};

export const getAuthToken = async (consumerKey: string, consumerSecret: string, baseUrl: string) => {
  const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64');
  const response = await fetch(`${baseUrl}/oauth/v1/generate?grant_type=client_credentials`, {
    headers: { Authorization: `Basic ${auth}` }
  });
  return response.json();
};
