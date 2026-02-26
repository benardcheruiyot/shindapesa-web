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
  padding: 10px;
  font-weight: 900;
  font-size: 0.95rem;
  text-transform: uppercase;
  border-bottom: 2px solid #000;
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
  background: rgba(0,0,0,0.85);
  backdrop-filter: blur(4px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const ModalContent = styled.div`
  background: #001f3f;
  border-radius: 28px;
  padding: 32px;
  text-align: center;
  border: 4px solid #ffe066;
  max-width: 420px;
  width: 100%;
  box-shadow: 0 20px 50px rgba(0,0,0,0.4);
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
    if (user && Number(user.freeSpins) > 0) {
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

  return (
    <Container>
      {Number(user.freeSpins) > 0 && (
        <PromoBanner> 5 FREE PROMO SPINS DETECTED! WIN UP TO 20,000 KES!</PromoBanner>
      )}
      <Header>
        <Logo>SHINDAPESA</Logo>
        <LogoutButton onClick={logout}>Logout</LogoutButton>
      </Header>

      <main style={{ maxWidth: 500, margin: "0 auto", padding: "20px" }}>
        {showWelcomeModal && (
          <ModalOverlay>
            <ModalContent>
              <div style={{ fontSize: "5rem", marginBottom: 20 }}></div>
              <h2 style={{ color: "white", fontSize: "2rem", marginBottom: 15, fontWeight: 900 }}>WELCOME BONUS!</h2>
              <p style={{ color: "rgba(255,255,255,0.85)", marginBottom: 30, fontSize: "1.1rem", lineHeight: 1.6 }}>
                You have received <b>5 PROMOTIONAL SPINS</b>!<br/><br/>
                Cost: <b>KES 100</b> per spin (auto-deducted).<br/>
                Top Prize: <b>KES 20,000</b>!
              </p>
              <button 
                onClick={() => setShowWelcomeModal(false)} 
                style={{ 
                  background: "#ffe066", 
                  color: "#001f3f", 
                  padding: "18px", 
                  borderRadius: "16px", 
                  fontWeight: 900, 
                  border: "none", 
                  cursor: "pointer", 
                  width: "100%", 
                  fontSize: "1.2rem",
                  boxShadow: "0 4px 15px rgba(255,224,102,0.3)"
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
            freeSpins={Number(user.freeSpins) || 0}
            referral={Number(user.referralCredits) || 0}
            onWithdraw={() => router.push("/wallet")}
          />
        </div>

        <div style={{ 
          background: "white", 
          borderRadius: 30, 
          padding: "30px 20px", 
          boxShadow: "0 10px 30px rgba(0,0,0,0.06)", 
          textAlign: "center",
          border: "1px solid rgba(0,0,0,0.03)"
        }}>
          <h2 style={{ color: "#0a3570", marginBottom: 24, fontSize: "1.5rem", fontWeight: 900 }}>Lucky Spin Wheel</h2>
          <SpinWheel />
        </div>
      </main>
    </Container>
  );
}
