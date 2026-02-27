
"use client";
import React, { useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import SpinWheel from "../components/SpinWheel";
import { useUser } from "@/hooks/useUser";
import { PageWrapper, BackHeader } from "@/components/SharedStyles";

const Container = styled.div`
  padding: 50px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 24px;
  animation: fadeIn 0.8s ease-out;
  z-index: 10;
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 8px;
  letter-spacing: -0.04em;
  line-height: 1;

  @media (max-width: 600px) {
    font-size: 2.5rem;
  }
`;

const StatsBar = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 40px;
  z-index: 10;
  flex-wrap: wrap;
  justify-content: center;
`;

const StatBadge = styled.div`
  background: rgba(13, 21, 38, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 10px 18px;
  border-radius: 100px;
  font-size: 0.9rem;
  font-weight: 700;
  color: #f8fafc;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: all 0.2s ease;

  &:hover {
    background: rgba(13, 21, 38, 0.6);
    border-color: rgba(59, 130, 246, 0.2);
  }

  span.label {
    opacity: 0.5;
    font-size: 0.65rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-weight: 600;
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
    <PageWrapper>
      <BackHeader title="Spin to Win" onBack={() => router.push("/home")} />

      <Container>
        <Header>
          <div style={{ 
            background: 'rgba(59, 130, 246, 0.08)', 
            color: '#3b82f6', 
            padding: '4px 12px', 
            border: '1px solid rgba(59, 130, 246, 0.15)', 
            borderRadius: '100px', 
            fontSize: '0.65rem', 
            fontWeight: 700, 
            letterSpacing: '0.05em', 
            display: 'inline-block', 
            marginBottom: 16,
            textTransform: 'uppercase'
          }}>
            Premium Gaming Experience
          </div>
          <Title>Royal Wheel</Title>
        </Header>

        <StatsBar>
          <StatBadge>
            <span style={{ fontSize: '1.1rem' }}>💳</span> 
            <span className="label">Balance</span>
            KES {Number(user.balance).toLocaleString()}
          </StatBadge>
          {Number(user.freeSpins) > 0 && (
            <StatBadge style={{ background: 'rgba(34, 197, 94, 0.08)', borderColor: 'rgba(34, 197, 94, 0.2)' }}>
              <span style={{ fontSize: '1.2rem' }}>🎡</span>
              <span style={{ color: '#4ade80' }}>{user.freeSpins} Free Spins Remaining</span>
            </StatBadge>
          )}
        </StatsBar>

        <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
           <SpinWheel />
        </div>

        <div style={{ 
          marginTop: 50, 
          background: 'rgba(15, 23, 42, 0.6)', 
          backdropFilter: 'blur(20px)',
          padding: '30px', 
          borderRadius: '32px', 
          border: '1px solid rgba(255,255,255,0.1)', 
          maxWidth: '400px', 
          textAlign: 'center', 
          boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: 'linear-gradient(90deg, #3b82f6, transparent, #3b82f6)' }} />
          <p style={{ margin: 0, fontSize: '0.95rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, fontWeight: 700 }}>
             System verification complete. Each spin utilizes <b style={{ color: '#fff' }}>Certified RNG</b> protocols.<br/>
             Winnings are disbursed <b style={{ color: '#4cd137' }}>Instantly via M-PESA</b> on withdrawal.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 20, opacity: 0.5 }}>
             <span style={{ fontSize: '0.65rem', fontWeight: 950, letterSpacing: 1 }}>VERIFIED PROTOCOL v3.4.1</span>
          </div>
        </div>
      </Container>
    </PageWrapper>
  );
}
