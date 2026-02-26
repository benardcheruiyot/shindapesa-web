'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';
import { userService } from '@/services/userService';

interface UserContextType {
  user: User | null;
  loading: boolean;
  updateUser: (updates: Partial<User>) => void;
  refreshUser: () => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const loadUser = () => {
    try {
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
        let parsed: User = JSON.parse(savedUser);
        
        // --- EMERGENCY PROMO SPIN RESET ---
        // If a user has 0 spins but hasn_t completed the welcome sequence, 
        // OR if the spins are missing entirely, we force them to 5.
        const spins = Number(parsed.freeSpins);
        
        if (isNaN(spins) || (spins === 0 && !parsed.welcomeSpinsFinished)) {
          parsed.freeSpins = 5;
          parsed.welcomeSpinsFinished = false;
          console.log("Context: Forcing 5 spins for user", parsed.username);
          localStorage.setItem('currentUser', JSON.stringify(parsed));
          
          // Also update the individual legacy key
          localStorage.setItem('freeSpins', '5');
        }

        setUser(parsed);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Error loading user:', error);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const updateUser = (updates: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...updates };
    setUser(updatedUser);
    
    // Use the Service to persist changes everywhere
    userService.saveUser(updatedUser, true);
  };

  const refreshUser = () => {
    loadUser();
  };

  const logout = () => {
    localStorage.removeItem('currentUser');
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <UserContext.Provider value={{ user, loading, updateUser, refreshUser, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
