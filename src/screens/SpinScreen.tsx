
"use client";
import React, { useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import SpinWheel from "../components/SpinWheel";
import { useUser } from "@/hooks/useUser";

const Container = styled.div`
  min-height: 100vh;
  background-color: #0a0a0b;
  background-image: url("https://www.transparenttextures.com/patterns/carbon-fibre.png");
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  color: #ffffff;
  overflow-x: hidden;
  position: relative;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 20px;
  animation: fadeIn 0.8s ease-out;
  z-index: 10;
`;

const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: 950;
  color: #ffffff;
  margin-bottom: 8px;
  letter-spacing: -1px;
`;

const StatsBar = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 30px;
  z-index: 10;
`;

const StatBadge = styled.div`
  background: rgba(24, 24, 27, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 800;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
`;

const BackButton = styled.button`
  position: absolute;
  top: 25px;
  left: 20px;
  background: rgba(24, 24, 27, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #ffffff;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  z-index: 100;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);

  &:hover {
    background: rgba(24, 24, 27, 0.9);
    transform: scale(1.1);
  }
`;

export default function SpinScreen() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) return null;

  return (
    <Container>
      <BackButton onClick={() => router.push("/home")}>
        <span style={{ fontSize: '1.2rem' }}>✕</span>
      </BackButton>

      <Header>
        <Title>Lucky Wheel</Title>
      </Header>

      <StatsBar>
        <StatBadge>
          <span style={{ color: '#d4af37' }}>💰</span> 
          KES {Number(user.balance).toLocaleString()}
        </StatBadge>
        {Number(user.freeSpins) > 0 && (
          <StatBadge style={{ borderColor: '#d4af37' }}>
            <span style={{ color: '#d4af37' }}>🎁</span>
            {user.freeSpins} Free Spins
          </StatBadge>
        )}
      </StatsBar>

      <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
         <SpinWheel />
      </div>

      <div style={{ marginTop: 40, background: 'rgba(24, 24, 27, 0.7)', padding: '24px', borderRadius: '24px', border: '1px solid rgba(255,255,255,0.1)', maxWidth: '340px', textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.02)' }}>
        <p style={{ margin: 0, fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, fontWeight: 700 }}>
           Each &quot;Lucky Spin&quot; costs KES 100. Winnings are deposited instantly to your account wallet.
        </p>
      </div>
    </Container>
  );
}
