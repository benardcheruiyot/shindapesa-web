'use client';

import { useUser as useUserContext } from '@/context/UserContext';

/**
 * Hook to access the current user globally.
 * Wraps the UserContext for cleaner usage in components.
 */
export const useUser = () => {
  return useUserContext();
};
