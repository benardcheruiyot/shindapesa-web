export interface User {
  username: string;
  name: string;
  phone: string;
  phoneNumber?: string; 
  password?: string;
  balance: number;
  clicks: number;
  freeSpins: number; // For new users
  referralCredits: number;
  referralBy?: string;
  welcomeSpinsFinished: boolean;
  isActivated: boolean;
}

export interface Payout {
  name: string;
  phone: string;
  amount: string;
  time: string;
}
