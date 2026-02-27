import { User } from '@/types';

/**
 * Service to handle user-related logic and persistence (localStorage-based for this app).
 */
export const userService = {
  /**
   * Get all registered users
   */
  getAllUsers: (): User[] => {
    if (typeof window === 'undefined') return [];
    return JSON.parse(localStorage.getItem('users') || '[]');
  },

  /**
   * Find a user by username or phone
   */
  findUser: (identifier: string): User | undefined => {
    const users = userService.getAllUsers();
    return users.find(u => u.username === identifier || u.phone === identifier || u.phoneNumber === identifier);
  },

  /**
   * Update a user's data in the persistent list and current session
   */
  saveUser: (user: User, isCurrent: boolean = false) => {
    if (typeof window === 'undefined') return;
    
    // Update in the main list
    const users = userService.getAllUsers();
    const index = users.findIndex(u => u.username === user.username);
    if (index !== -1) {
      users[index] = user;
    } else {
      users.push(user);
    }
    localStorage.setItem('users', JSON.stringify(users));

    // Update current session if requested
    if (isCurrent) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      // Sync legacy keys
      localStorage.setItem('userName', user.username || '');
      localStorage.setItem('userPhone', user.phone || '');
      localStorage.setItem('collectedAmount', (user.balance || 0).toString());
      localStorage.setItem('freeSpins', (user.freeSpins || 0).toString());
    }
  },

  /**
   * Clean up user data and apply migrations
   */
  cleanUserData: (user: User): User => {
    const cleaned = { ...user };
    
    // 1. Force 5 spins for new/unfinished users
    const spins = Number(cleaned.freeSpins);
    if (isNaN(spins) || (spins === 0 && !cleaned.welcomeSpinsFinished)) {
      cleaned.freeSpins = 5;
      cleaned.welcomeSpinsFinished = false;
    }

    // 2. Balance migration: Legacies of 1000 KES are reset to 0 if not activated
    if (Number(cleaned.balance) === 1000 && !cleaned.isActivated) {
      cleaned.balance = 0;
    }

    // 3. Ensure withdrawableBalance exists
    if (cleaned.withdrawableBalance === undefined) {
      cleaned.withdrawableBalance = 0;
    }

    return cleaned;
  },

  /**
   * Handle the logic for awarding referral bonuses
   */
  processReferral: (referralCode: string): void => {
    if (!referralCode) return;
    const users = userService.getAllUsers();
    const referrerIdx = users.findIndex(u => u.username.toLowerCase() === referralCode.trim().toLowerCase());
    
    if (referrerIdx !== -1) {
      const referrer = users[referrerIdx];
      referrer.balance = (referrer.balance || 0) + 100;
      referrer.clicks = (referrer.clicks || 0) + 1;
      referrer.referralCredits = (referrer.referralCredits || 0) + 1;
      userService.saveUser(referrer);
    }
  }
};
