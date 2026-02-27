"use client";
import React from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { ShieldCheck, Lock } from 'lucide-react';

const Wrapper = styled.div`
  min-height: 100vh;
  background: #0b1a30;
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
    background: radial-gradient(circle, rgba(0, 91, 170, 0.12) 0%, transparent 70%);
    animation: rotate 30s linear infinite;
  }

  @keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const GlassCard = styled.div`
  background: #002d58;
  border: 4px solid #fbdf07;
  border-radius: 48px;
  max-width: 480px;
  width: 100%;
  padding: 56px 40px;
  text-align: center;
  position: relative;
  z-index: 2;
  box-shadow: 0 50px 100px rgba(0, 0, 0, 0.8);
`;

const IconWrapper = styled.div`
  width: 100px;
  height: 100px;
  background: #fbdf07;
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 32px;
  box-shadow: 0 20px 40px rgba(251, 223, 7, 0.3);
  transform: rotate(5deg);
`;

const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: 950;
  text-transform: uppercase;
  letter-spacing: -1.5px;
  margin-bottom: 12px;
  line-height: 1.1;
  color: #ffffff;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 48px;
  font-weight: 700;
  line-height: 1.6;
`;

const StepList = styled.div`
  text-align: left;
  margin-bottom: 56px;
`;

const StepItem = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 24px;
`;

const StepNumber = styled.div`
  width: 44px;
  height: 44px;
  background: rgba(251, 223, 7, 0.1);
  border: 1px solid rgba(251, 223, 7, 0.3);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 950;
  color: #fbdf07;
  font-size: 1.2rem;
`;

const StepText = styled.div`
  flex: 1;
`;

const StepTitle = styled.div`
  font-weight: 950;
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const StepDesc = styled.div`
  font-size: 0.8rem;
  color: rgba(255, 255, 255, 0.5);
  font-weight: 700;
`;

const ActionButton = styled.button`
  width: 100%;
  background: #fbdf07;
  color: #000;
  border: none;
  border-radius: 20px;
  padding: 24px;
  font-weight: 950;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 15px 30px rgba(251, 223, 7, 0.2);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 20px 40px rgba(251, 223, 7, 0.4);
  }
`;

const FooterText = styled.div`
  margin-top: 32px;
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.3);
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const OnboardingScreen = () => {
  const router = useRouter();

  return (
    <Wrapper>
      <GlassCard>
        <IconWrapper>
          <ShieldCheck size={50} color="#000000" />
        </IconWrapper>
        <Title>Welcome to ShindaPesa</Title>
        <Subtitle>Unlock your premium gaming portal with secure M-PESA integration.</Subtitle>

        <StepList>
          <StepItem>
            <StepNumber>1</StepNumber>
            <StepText>
              <StepTitle>Verify Identity</StepTitle>
              <StepDesc>Securely link your M-PESA wallet node.</StepDesc>
            </StepText>
          </StepItem>
          <StepItem>
            <StepNumber>2</StepNumber>
            <StepText>
              <StepTitle>Unlock Rewards</StepTitle>
              <StepDesc>Claim your KES 1,000 Welcome Bonus.</StepDesc>
            </StepText>
          </StepItem>
          <StepItem>
            <StepNumber>3</StepNumber>
            <StepText>
              <StepTitle>Instant Payouts</StepTitle>
              <StepDesc>Real-time settlement to Safaricom channels.</StepDesc>
            </StepText>
          </StepItem>
        </StepList>

        <ActionButton onClick={() => router.push('/welcome')}>
          Initialize Secure Portal
        </ActionButton>

        <FooterText>
          <Lock size={12} /> SECURED BY B3-HUB GATEWAY
        </FooterText>
      </GlassCard>
    </Wrapper>
  );
};

export default OnboardingScreen;
