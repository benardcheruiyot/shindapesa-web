"use client";

import { useEffect } from "react";
import { useUser } from "@/context/UserContext";

export default function Logout() {
  const { logout } = useUser();
  
  useEffect(() => {
    // Standardized manual logout
    logout();
  }, [logout]);

  return (
    <div style={{
      padding: '48px',
      textAlign: 'center',
      fontWeight: 950,
      fontSize: '2rem',
      color: '#ffffff',
      backgroundColor: '#0a0a0b',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Inter, sans-serif',
      letterSpacing: '-1px'
    }}>
      Logging out...
    </div>
  );
}
