"use client";
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { ShieldCheck, Info } from 'lucide-react';

const pulse = keyframes`
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.3); }
  70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const CardContainer = styled.section`
  background: #002d58;
  border: 4px solid #fbdf07;
  border-radius: 32px;
  padding: 32px;
  margin-bottom: 24px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.8);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 200%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(251, 223, 7, 0.05),
      transparent
    );
    animation: ${shimmer} 8s infinite linear;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
`;

const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.h3`
  color: #ffffff;
  font-size: 1.3rem;
  font-weight: 950;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Subtitle = styled.span`
  color: #fbdf07;
  font-size: 0.7rem;
  font-weight: 950;
  text-transform: uppercase;
  letter-spacing: 3px;
  margin-top: 8px;
  opacity: 0.8;
`;

const NodeBadge = styled.div`
  background: rgba(57, 181, 74, 0.1);
  border: 1px solid rgba(57, 181, 74, 0.2);
  color: #39b54a;
  padding: 8px 14px;
  border-radius: 20px;
  font-size: 0.65rem;
  font-weight: 950;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 6px;
  letter-spacing: 1px;
`;

const Pulse = styled.div`
  width: 8px;
  height: 8px;
  background: #39b54a;
  border-radius: 50%;
  animation: ${pulse} 2s infinite;
  box-shadow: 0 0 10px #39b54a;
`;

const BalanceDisplay = styled.div`
  margin-bottom: 32px;
  background: rgba(0,0,0,0.2);
  padding: 24px;
  border-radius: 24px;
  border: 1px solid rgba(255,255,255,0.05);
`;

const Amount = styled.div`
  font-size: 3.2rem;
  font-weight: 950;
  color: #ffffff;
  display: flex;
  align-items: baseline;
  gap: 10px;
  letter-spacing: -2px;
  margin-top: 8px;
`;

const Currency = styled.span`
  font-size: 1.2rem;
  color: #fbdf07;
  font-weight: 950;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px;
  margin-bottom: 32px;
`;

const StatItem = styled.div`
  background: rgba(255, 255, 255, 0.03);
  padding: 16px;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.06);
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.1);
  }
`;

const StatLabel = styled.div`
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.65rem;
  text-transform: uppercase;
  font-weight: 900;
  margin-bottom: 6px;
  letter-spacing: 1px;
`;

const StatValue = styled.div`
  color: #ffffff;
  font-size: 1rem;
  font-weight: 950;
`;

const ActionButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #fbdf07 0%, #d4bb00 100%);
  color: #000;
  border: none;
  border-radius: 20px;
  padding: 24px;
  font-weight: 950;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  box-shadow: 0 15px 35px rgba(251, 223, 7, 0.2);

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 20px 45px rgba(251, 223, 7, 0.35);
    filter: brightness(1.1);
  }

  &:active {
    transform: translateY(0);
  }
`;

const MpesaLogo = styled.span`
  background: #ffffff;
  color: #39b54a;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 950;
  margin-left: auto;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
`;

const UrgencyBanner = styled.div`
  margin-top: 24px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 10px;
  color: rgba(255, 255, 255, 0.5);
  font-size: 0.75rem;
  font-weight: 800;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

interface WithdrawCardProps {
  available: number;
  onWithdraw: () => void;
}

const WithdrawCard: React.FC<WithdrawCardProps> = ({ available, onWithdraw }) => {
  const [activeBatch, setActiveBatch] = useState(94);
  const [timeLeft, setTimeLeft] = useState('04:12');

  useEffect(() => {
    const timer = setInterval(() => {
      // Simulate ticking for urgency
      const mins = Math.floor(Math.random() * 5);
      const secs = Math.floor(Math.random() * 60);
      setTimeLeft(`${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`);
      setActiveBatch(prev => prev > 98 ? 91 : prev + 0.1);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <CardContainer>
      <Header>
        <TitleGroup>
          <CardTitle>
            <ShieldCheck size={22} color="#fbdf07" style={{ marginRight: '8px' }} />
            SECURE PAYOUT
          </CardTitle>
          <Subtitle>Safaricom M-PESA Portal</Subtitle>
        </TitleGroup>
        <NodeBadge>
          <Pulse />
          B3-HUB-AFRICA
        </NodeBadge>
      </Header>

      <BalanceDisplay>
        <StatLabel style={{ marginBottom: '8px' }}>Withdrawal Ready Balance</StatLabel>
        <Amount>
          <Currency>KES</Currency>
          {available.toLocaleString()}
        </Amount>
      </BalanceDisplay>

      <StatsGrid>
        <StatItem>
          <StatLabel>Transaction Limit</StatLabel>
          <StatValue>150,000.00 KES</StatValue>
        </StatItem>
        <StatItem>
          <StatLabel>Settlement Time</StatLabel>
          <StatValue>IMMEDIATE</StatValue>
        </StatItem>
        <StatItem>
          <StatLabel>Gateway Status</StatLabel>
          <StatValue style={{ color: '#39b54a', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{ width: 8, height: 8, background: '#39b54a', borderRadius: '50%' }} />
            ACTIVE
          </StatValue>
        </StatItem>
        <StatItem>
          <StatLabel>System Charge</StatLabel>
          <StatValue>0.00 KES</StatValue>
        </StatItem>
      </StatsGrid>

      <ActionButton onClick={onWithdraw}>
        WITHDRAW TO M-PESA
        <MpesaLogo>M-PESA</MpesaLogo>
      </ActionButton>

      <UrgencyBanner>
        <Info size={16} />
        System processing: Batch #44{timeLeft.split(':')[1]} active. Funds will reflect in 3-5 seconds.
      </UrgencyBanner>
    </CardContainer>
  );
};

export default WithdrawCard;

