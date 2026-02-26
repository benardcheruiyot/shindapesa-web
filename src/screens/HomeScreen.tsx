"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import SpinWheel from "../components/SpinWheel";
import UserInfoCard from "../components/UserInfoCard";
import AccountBalanceCard from "../components/AccountBalanceCard";
import { useUser } from "@/hooks/useUser";

const Container = styled.div`
  min-height: 100vh;
  background: #f4f7fe;
  padding-bottom: 60px;
`;

const Header = styled.header`
  background: #0a3570;
  color: white;
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const Logo = styled.h1`
  font-size: 1.4rem;
  font-weight: 900;
  margin: 0;
  letter-spacing: -0.5px;
`;

const PromoBanner = styled.div`
  background: #ffcc00;
  color: #000;
  text-align: center;
  padding: 12px;
  font-weight: 900;
  font-size: 1rem;
  text-transform: uppercase;
  border-bottom: 2px solid #000;
  animation: pulse 1s infinite alternate;
  
  @keyframes pulse {
    from { opacity: 1; }
    to { opacity: 0.8; }
  }
`;

const LogoutButton = styled.button`
  background: rgba(255,255,255,0.1);
  border: 1px solid rgba(255,255,255,0.3);
  color: white;
  padding: 6px 14px;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  &:hover {
    background: rgba(255,255,255,0.2);
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.9);
  backdrop-filter: blur(8px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const ModalContent = styled.div`
  background: #001f3f;
  border-radius: 28px;
  padding: 40px 32px;
  text-align: center;
  border: 4px solid #ffe066;
  max-width: 420px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0,0,0,0.5);
`;

export default function HomeScreen() {
  const { user, loading, logout } = useUser();
  const router = useRouter();
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    // Show welcome modal if user has any spins left
    if (user && Number(user.freeSpins) > 0) {
      console.log("HomeScreen: Spins detected:", user.freeSpins);
      const shown = sessionStorage.getItem("welcomeShown");
      if (!shown) {
        setShowWelcomeModal(true);
        sessionStorage.setItem("welcomeShown", "true");
      }
    }
  }, [user]);

  if (loading || !user) {
    return (
      <div style={{ padding: 40, textAlign: "center", color: "#666" }}>
        <h3>Loading your dashboard...</h3>
      </div>
    );
  }

  const freeSpinsCount = Number(user.freeSpins) || 0;

  return (
    <Container>
      {freeSpinsCount > 0 && (
        <PromoBanner> 5 FREE PROMO SPINS ACTIVE! WIN UP TO 20,000 KES!</PromoBanner>
      )}
      <Header>
        <Logo>SHINDAPESA</Logo>
        <LogoutButton onClick={logout}>Logout</LogoutButton>
      </Header>

      <main style={{ maxWidth: 500, margin: "0 auto", padding: "20px" }}>
        {showWelcomeModal && (
          <ModalOverlay>
            <ModalContent>
              <div style={{ fontSize: "6rem", marginBottom: 24 }}></div>
              <h2 style={{ color: "white", fontSize: "2.2rem", marginBottom: 15, fontWeight: 900 }}>WELCOME BONUS!</h2>
              <p style={{ color: "white", marginBottom: 35, fontSize: "1.15rem", lineHeight: 1.6, opacity: 0.9 }}>
                You have received <b style={{color: "#ffe066"}}>5 PROMOTIONAL SPINS</b>!<br/><br/>
                Cost: <b>KES 100</b> per spin.<br/>
                Top Prize: <b>KES 20,000</b>!
              </p>
              <button 
                onClick={() => setShowWelcomeModal(false)} 
                style={{ 
                  background: "#ffe066", 
                  color: "#001f3f", 
                  padding: "20px", 
                  borderRadius: "18px", 
                  fontWeight: 900, 
                  border: "none", 
                  cursor: "pointer", 
                  width: "100%", 
                  fontSize: "1.3rem",
                  boxShadow: "0 6px 20px rgba(255,224,102,0.4)"
                }}
              >
                START SPINNING
              </button>
            </ModalContent>
          </ModalOverlay>
        )}

        <div style={{ marginBottom: 20 }}>
          <UserInfoCard 
            name={user.name || user.username} 
            phone={user.phone || ""} 
            isActivated={user.isActivated || false} 
          />
        </div>

        <div style={{ marginBottom: 24 }}>
          <AccountBalanceCard 
            balance={Number(user.balance) || 0} 
            clicks={Number(user.clicks) || 0} 
            freeSpins={freeSpinsCount}
            referral={Number(user.referralCredits) || 0}
            onWithdraw={() => router.push("/wallet")}
          />
        </div>

        <div style={{ 
          background: "white", 
          borderRadius: 30, 
          padding: "35px 20px", 
          boxShadow: "0 10px 40px rgba(0,0,0,0.08)", 
          textAlign: "center",
          border: "1px solid rgba(0,0,0,0.03)"
        }}>
          <h2 style={{ color: "#0a3570", marginBottom: 28, fontSize: "1.6rem", fontWeight: 900 }}>Spin & Win Real Cash</h2>
          <SpinWheel />
        </div>
      </main>
    </Container>
  );
}
