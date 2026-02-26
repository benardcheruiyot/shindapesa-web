"use client";

import { useEffect } from "react";

export default function Logout() {
  useEffect(() => {
    // Collect users list to preserve across logout
    const users = localStorage.getItem("users");
    // Clear only session data
    localStorage.removeItem("userName");
    localStorage.removeItem("userPhone");
    localStorage.removeItem("collectedAmount");
    localStorage.removeItem("userClicks");
    localStorage.removeItem("welcomeSpinsFinished");
    
    // In a real environment we'd keep 'users', but for this demo clearing everything might be expected
    // However the request asks for "amount won should be available as it was even if user log out and in"
    // So we MUST NOT clear the 'users' database.
    
    // Redirect to login page
    window.location.href = "/login";
  }, []);

  return (
    <div style={{padding:'48px',textAlign:'center',fontWeight:800,fontSize:'2rem',color:'#1851a3'}}>Logging out...</div>
  );
}
