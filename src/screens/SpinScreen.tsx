
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
  font-size: 2.8rem;
  font-weight: 950;
  color: #ffffff;
  margin-bottom: 12px;
  letter-spacing: -1.5px;
  text-transform: uppercase;
`;

const StatsBar = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 40px;
  z-index: 10;
`;

const StatBadge = styled.div`
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 10px 20px;
  border-radius: 25px;
  font-size: 0.95rem;
  font-weight: 800;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
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
      <BackHeader title="Prestige Wheel" onBack={() => router.push("/home")} />

      <Container>
        <Header>
          <div style={{ 
            background: 'rgba(59, 130, 246, 0.1)', 
            color: 'var(--primary-light)', 
            padding: '6px 14px', 
            borderRadius: 8, 
            fontSize: '0.65rem', 
            fontWeight: 950, 
            letterSpacing: 2, 
            display: 'inline-block', 
            marginBottom: 16,
            border: '1px solid rgba(59, 130, 246, 0.2)'
          }}>
            PREMIUM GAMING SUITE
          </div>
          <Title style={{ fontSize: '3.2rem', letterSpacing: '-2px' }}>PRESTIGE WHEEL</Title>
        </Header>

        <StatsBar>
          <StatBadge>
            <span style={{ fontSize: '1.1rem' }}>💳</span> 
            <span style={{ opacity: 0.6, fontSize: '0.75rem', marginRight: 4 }}>WALLET:</span>
            KES {Number(user.balance).toLocaleString()}
          </StatBadge>
          {Number(user.freeSpins) > 0 && (
            <StatBadge style={{ background: 'rgba(76, 209, 55, 0.1)', borderColor: 'rgba(76, 209, 55, 0.2)' }}>
              <span style={{ fontSize: '1.2rem' }}>🎡</span>
              <span style={{ color: '#4cd137' }}>{user.freeSpins} COMPLIMENTARY SPINS</span>
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
