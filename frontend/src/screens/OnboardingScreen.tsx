"use client";
import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock, CreditCard } from 'lucide-react';

const Wrapper = styled.div`
  min-height: 100vh;
  background: #030712;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    width: 250%;
    height: 100%;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%);
  }
`;

const GlassCard = styled.div`
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 40px;
  max-width: 480px;
  width: 100%;
  padding: 56px 40px;
  text-align: center;
  position: relative;
  z-index: 2;
  box-shadow: 0 50px 100px rgba(0, 0, 0, 0.6);
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    top: 0; left: 0; width: 100%; height: 2px;
    background: linear-gradient(90deg, transparent, #3b82f6, transparent);
  }

  @media (max-width: 600px) {
    padding: 32px 24px;
    border-radius: 24px;
  }
`;

const IconWrapper = styled.div`
  width: 80px;
  height: 80px;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 32px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);

  @media (max-width: 600px) {
    width: 64px;
    height: 64px;
    margin-bottom: 24px;
    
    svg { width: 32px; height: 32px; }
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -1px;
  margin-bottom: 12px;
  line-height: 1.1;
  color: #ffffff;

  @media (max-width: 600px) {
    font-size: 1.5rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: #94a3b8;
  margin-bottom: 40px;
  font-weight: 500;
  line-height: 1.6;

  @media (max-width: 600px) {
    font-size: 0.9rem;
    margin-bottom: 32px;
  }
`;

const StepList = styled.div`
  text-align: left;
  margin-bottom: 48px;
`;

const StepItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-bottom: 24px;

  @media (max-width: 600px) {
    gap: 12px;
    margin-bottom: 20px;
  }
`;

const StepIcon = styled.div`
  width: 48px;
  height: 48px;
  background: rgba(59, 130, 246, 0.05);
  border: 1px solid rgba(59, 130, 246, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3b82f6;
  flex-shrink: 0;

  @media (max-width: 600px) {
    width: 40px;
    height: 40px;
    svg { width: 18px; height: 18px; }
  }
`;

const StepContent = styled.div`
  .step-title {
    font-size: 0.95rem;
    font-weight: 800;
    color: #ffffff;
    margin-bottom: 4px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
  .step-desc {
    font-size: 0.85rem;
    color: #64748b;
    line-height: 1.4;
  }

  @media (max-width: 600px) {
    .step-title { font-size: 0.85rem; }
    .step-desc { font-size: 0.75rem; }
  }
`;

const ActionButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: #ffffff;
  border: none;
  padding: 20px;
  border-radius: 16px;
  font-size: 1rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s;
  text-transform: uppercase;
  letter-spacing: 2px;
  box-shadow: 0 10px 25px rgba(59, 130, 246, 0.25);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 35px rgba(59, 130, 246, 0.35);
  }

  @media (max-width: 600px) {
    padding: 16px;
    font-size: 0.9rem;
    letter-spacing: 1px;
  }
`;

const ProgressDots = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 32px;
  
  span {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: rgba(59, 130, 246, 0.2);
    &.active {
      background: #3b82f6;
      width: 20px;
      border-radius: 10px;
    }
  }
`;

const OnboardingScreen = () => {
  const router = useRouter();

  const handleStart = () => {
    localStorage.setItem('hasSeenOnboarding', 'true');
    router.push('/home');
  };

  return (
    <Wrapper>
      <GlassCard>
        <IconWrapper>
          <ShieldCheck size={40} color="#3b82f6" />
        </IconWrapper>
        
        <Title>Welcome to Sapphire Access</Title>
        <Subtitle>Your account has been secured with Tier-1 encryption. Follow these steps to begin.</Subtitle>

        <StepList>
          <StepItem>
            <StepIcon>
              <Lock size={20} />
            </StepIcon>
            <StepContent>
              <div className="step-title">Activate Core</div>
              <div className="step-desc">Secure your payout channel via Safaricom handshake.</div>
            </StepContent>
          </StepItem>

          <StepItem>
            <StepIcon>
              <CreditCard size={20} />
            </StepIcon>
            <StepContent>
              <div className="step-title">Instant Payouts</div>
              <div className="step-desc">Winnings are disbursed within 60 seconds of withdrawal.</div>
            </StepContent>
          </StepItem>
        </StepList>

        <ActionButton onClick={handleStart}>
          Proceed to Dashboard
        </ActionButton>

        <ProgressDots>
          <span className="active"></span>
          <span></span>
          <span></span>
        </ProgressDots>
      </GlassCard>
      
      <div style={{ marginTop: 40, color: '#475569', fontSize: '0.65rem', fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase' }}>
         Institutional Security Protocols Enabled
      </div>
    </Wrapper>
  );
};

export default OnboardingScreen;
