'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '@/types';

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
        
        // --- FORCED PROMO SPIN INITIALIZATION ---
        // Ensure freeSpins exists and is a number. 
        // If the user hasn't finished their welcome spins, and has 0 or undefined, force it to 5.
        const existingSpins = Number(parsed.freeSpins);
        if (isNaN(existingSpins) || (existingSpins === 0 && !parsed.welcomeSpinsFinished)) {
          if (!parsed.welcomeSpinsFinished) {
            parsed.freeSpins = 5;
            localStorage.setItem('currentUser', JSON.stringify(parsed));
          }
        }
        
        // Also ensure it's synced to the legacy individual localStorage keys
        if (parsed.freeSpins > 0) {
           localStorage.setItem('freeSpins', parsed.freeSpins.toString());
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
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    // Update in users list too
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex((u: User) => u.username === user.username);
    if (userIndex !== -1) {
      users[userIndex] = updatedUser;
      localStorage.setItem('users', JSON.stringify(users));
    }
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
