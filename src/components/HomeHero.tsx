"use client";
import React from "react";
import styled from "styled-components";

const HeroBannerContainer = styled.section`
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 40px;
  padding: 60px 48px;
  margin-bottom: 48px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 380px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);

  &::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: linear-gradient(to right, rgba(2, 6, 23, 0.8) 20%, transparent 100%);
    z-index: 1;
  }

  @media (max-width: 600px) {
    padding: 40px 24px;
    min-height: 320px;
  }
`;

const CertifiedBadge = styled.div`
  position: absolute;
  top: 24px;
  right: 24px;
  background: rgba(24, 24, 27, 0.8);
  backdrop-filter: blur(10px);
  padding: 8px 16px;
  border-radius: 12px;
  font-size: 0.65rem;
  font-weight: 950;
  color: #4cd137;
  border: 1px solid rgba(76, 209, 55, 0.4);
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 5;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);

  &::before {
    content: '✓';
    background: #4cd137;
    color: #fff;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.6rem;
    font-weight: 950;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 550px;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: 950;
  margin: 12px 0;
  letter-spacing: -2px;
  line-height: 1.1;
  color: #fff;
  
  span {
    color: var(--primary-light);
  }

  @media (max-width: 600px) {
    font-size: 2rem;
  }
`;

const HeroButton = styled.button`
  padding: 18px 36px;
  border-radius: 20px;
  background: linear-gradient(135deg, var(--primary) 0%, var(--primary-hover) 100%);
  border: none;
  color: #fff;
  font-weight: 900;
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 15px 30px rgba(59, 130, 246, 0.3);

  &:hover {
    transform: scale(1.05) translateY(-5px);
    box-shadow: 0 20px 40px rgba(59, 130, 246, 0.4);
  }
`;

const StyledBadge = styled.span`
  background: var(--primary);
  color: #fff;
  padding: 4px 12px;
  border-radius: 100px;
  font-size: 0.7rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: inline-block;
`;

interface HomeHeroProps {
  livePlayers: number;
  onAction: () => void;
}

const HomeHero = ({ livePlayers, onAction }: HomeHeroProps) => {
    const winProbability = React.useMemo(() => 75 + Math.floor(Math.random() * 20), []);
    
    return (
        <HeroBannerContainer>
            <CertifiedBadge>Certified Fair</CertifiedBadge>
            <HeroContent>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                    <div style={{ height: 2, flex: 1, background: '#3b82f6', maxWidth: 40 }} />
                    <StyledBadge>Active: Weekly Jackpot</StyledBadge>
                </div>
                <HeroTitle>
                    Exclusive Reward: <br/>
                    <span>KES 25,000</span> Potential Winnings Locked
                </HeroTitle>
                <p style={{ opacity: 0.8, fontSize: '1.1rem', fontWeight: 500, marginBottom: 32, lineHeight: 1.6, letterSpacing: '0.2px' }}>
                    The prize pool is growing every second. Join <strong>{livePlayers.toLocaleString()}</strong> players competing for today's grand payout.
                </p>
                <div style={{ marginBottom: 24, background: 'rgba(255,255,255,0.03)', padding: '12px 16px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', fontWeight: 800, marginBottom: 8, color: 'rgba(255,255,255,0.5)' }}>
                        <span>WINNING PROBABILITY</span>
                        <span style={{ color: '#4cd137' }}>{winProbability}% HIGH</span>
                    </div>
                    <div style={{ height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
                        <div style={{ height: '100%', width: '85%', background: '#4cd137', borderRadius: 2, boxShadow: '0 0 10px #4cd137' }} />
                    </div>
                </div>
                <div style={{ display: 'flex', gap: 15 }}>
                    <HeroButton onClick={onAction}>
                        Activate & Win <span style={{ fontSize: '1.2rem' }}>🎁</span>
                    </HeroButton>
                </div>
            </HeroContent>
        </HeroBannerContainer>
    );
};

export default HomeHero;
