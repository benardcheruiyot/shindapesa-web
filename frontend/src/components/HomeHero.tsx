"use client";
import React from "react";
import styled from "styled-components";

const HeroBannerContainer = styled.section`
  background: rgba(13, 21, 38, 0.4);
  backdrop-filter: blur(40px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 32px;
  padding: 60px 48px;
  margin-bottom: 40px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 380px;
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.4);

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    right: -20%;
    width: 80%;
    height: 150%;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
    z-index: 1;
  }

  @media (max-width: 600px) {
    padding: 32px 24px;
    min-height: 300px;
    border-radius: 24px;
  }
`;

const CertifiedBadge = styled.div`
  position: absolute;
  top: 24px;
  right: 24px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  padding: 8px 14px;
  border-radius: 100px;
  font-size: 0.65rem;
  font-weight: 700;
  color: #22c55e;
  border: 1px solid rgba(34, 197, 94, 0.2);
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 5;
  text-transform: uppercase;
  letter-spacing: 0.05em;

  &::before {
    content: '✓';
    background: #22c55e;
    color: #fff;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.55rem;
    font-weight: 800;
  }

  @media (max-width: 600px) {
    top: 16px;
    right: 16px;
    padding: 6px 10px;
    font-size: 0.6rem;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 550px;
`;

const HeroTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin: 12px 0 20px;
  letter-spacing: -0.04em;
  line-height: 1;
  color: #ffffff;
  
  span {
    color: #3b82f6;
  }

  @media (max-width: 600px) {
    font-size: 2.25rem;
  }
`;

const HeroButton = styled.button`
  padding: 16px 32px;
  border-radius: 14px;
  background: #3b82f6;
  border: none;
  color: #ffffff;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 10px 25px rgba(59, 130, 246, 0.2);
  display: flex;
  align-items: center;
  gap: 10px;
  width: fit-content;

  &:hover {
    background: #2563eb;
    transform: translateY(-2px);
    box-shadow: 0 15px 35px rgba(59, 130, 246, 0.3);
  }

  @media (max-width: 600px) {
    width: 100%;
    justify-content: center;
    padding: 16px;
  }
`;

const StyledBadge = styled.span`
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
  padding: 4px 12px;
  border-radius: 100px;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  display: inline-block;
  border: 1px solid rgba(59, 130, 246, 0.2);
`;

interface HomeHeroProps {
  livePlayers: number;
  onAction: () => void;
}

const HomeHero = ({ livePlayers, onAction }: HomeHeroProps) => {
    const winProbability = React.useMemo(() => 85 + Math.floor(Math.random() * 10), []);
    
    return (
        <HeroBannerContainer>
            <CertifiedBadge>Certified Fair</CertifiedBadge>
            <HeroContent>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                    <div style={{ height: 1, flex: 1, background: 'rgba(59, 130, 246, 0.3)', maxWidth: 30 }} />
                    <StyledBadge>Active Weekly Reward Pool</StyledBadge>
                </div>
                <HeroTitle>
                    Exclusive Reward: <br/>
                    <span>KES 25,000</span> Final Payout Locked
                </HeroTitle>
                <p style={{ opacity: 0.7, fontSize: '1.05rem', fontWeight: 400, marginBottom: 32, lineHeight: 1.6, color: '#94a3b8' }}>
                    Join <strong>{livePlayers.toLocaleString()}</strong> verified players in the current session. Your potential reward pool is ready for disbursement.
                </p>
                <div style={{ marginBottom: 24, background: 'rgba(255, 255, 255, 0.02)', padding: '16px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.04)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', fontWeight: 600, marginBottom: 8, color: '#64748b', letterSpacing: '0.05em' }}>
                        <span>SYSTEM TRUST SCORE</span>
                        <span style={{ color: '#22c55e' }}>{winProbability}% VERIFIED</span>
                    </div>
                    <div style={{ width: '100%', height: 4, background: 'rgba(255, 255, 255, 0.05)', borderRadius: 2 }}>
                        <div style={{ width: `${winProbability}%`, height: '100%', background: '#22c55e', borderRadius: 2, boxShadow: '0 0 10px rgba(34, 197, 94, 0.5)' }} />
                    </div>
                </div>
                <HeroButton onClick={onAction}>
                    ACTIVATE REWARD <span>→</span>
                </HeroButton>
            </HeroContent>
        </HeroBannerContainer>
    );
};

export default HomeHero;
