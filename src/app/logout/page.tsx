"use client";

import { useEffect } from "react";
import { useUser } from "@/context/UserContext";

export default function Logout() {
  const { logout } = useUser();
  
  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <div style={{
      padding: '48px',
      textAlign: 'center',
      fontWeight: 900,
      fontSize: '1.5rem',
      color: '#ffffff',
      backgroundColor: '#030712',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      letterSpacing: '1px',
      textTransform: 'uppercase'
    }}>
      <div style={{ 
        width: '40px', 
        height: '40px', 
        border: '3px solid rgba(59, 130, 246, 0.1)', 
        borderTopColor: '#3b82f6', 
        borderRadius: '50%', 
        animation: 'spin 1s linear infinite',
        marginBottom: '24px'
      }} />
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      Terminating Session...
    </div>
  );
}
