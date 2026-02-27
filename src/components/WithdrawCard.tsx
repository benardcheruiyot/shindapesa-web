"use client";
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.3); }
  70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(212, 175, 55, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(212, 175, 55, 0); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const CardContainer = styled.section`
  background: rgba(24, 24, 27, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 24px;
  margin-bottom: 24px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);

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
      rgba(212, 175, 55, 0.1),
      transparent
    );
    animation: ${shimmer} 5s infinite linear;
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const CardTitle = styled.h3`
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 950;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Subtitle = styled.span`
  color: #d4af37;
  font-size: 0.7rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-top: 4px;
`;

const NodeBadge = styled.div`
  background: rgba(212, 175, 55, 0.1);
  border: 1px solid rgba(212, 175, 55, 0.2);
  color: #d4af37;
  padding: 4px 10px;
  border-radius: 20px;
  font-size: 0.65rem;
  font-weight: 800;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 5px;
`;

const Pulse = styled.div`
  width: 6px;
  height: 6px;
  background: #d4af37;
  border-radius: 50%;
  animation: ${pulse} 2s infinite;
`;

const BalanceDisplay = styled.div`
  margin-bottom: 24px;
`;

const Amount = styled.div`
  font-size: 2.2rem;
  font-weight: 950;
  color: #ffffff;
  display: flex;
  align-items: baseline;
  gap: 6px;
  letter-spacing: -1px;
`;

const Currency = styled.span`
  font-size: 1rem;
  color: #d4af37;
  font-weight: 800;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 24px;
`;

const StatItem = styled.div`
  background: rgba(255, 255, 255, 0.02);
  padding: 12px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const StatLabel = styled.div`
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.6rem;
  text-transform: uppercase;
  font-weight: 800;
  margin-bottom: 4px;
`;

const StatValue = styled.div`
  color: #ffffff;
  font-size: 0.85rem;
  font-weight: 800;
`;

const ActionButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #d4af37 0%, #b8860b 100%);
  color: #fff;
  border: none;
  border-radius: 16px;
  padding: 18px;
  font-weight: 900;
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  box-shadow: 0 10px 20px rgba(201, 160, 80, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 25px rgba(201, 160, 80, 0.3);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const MpesaLogo = styled.span`
  background: #39b54a;
  color: #fff;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.7rem;
  font-weight: 950;
  margin-left: auto;
`;

const UrgencyBanner = styled.div`
  margin-top: 15px;
  padding: 12px;
  background: rgba(239, 68, 68, 0.05);
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #b91c1c;
  font-size: 0.75rem;
  font-weight: 700;
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
            Withdraw Winnings
            <MpesaLogo>M-PESA</MpesaLogo>
          </CardTitle>
          <Subtitle>Instant M-PESA Payouts</Subtitle>
        </TitleGroup>
        <NodeBadge>
          <Pulse />
          Direct Channel
        </NodeBadge>
      </Header>

      <BalanceDisplay>
        <StatLabel>Available to Withdraw</StatLabel>
        <Amount>
          <Currency>KES</Currency> {available.toLocaleString()}
        </Amount>
      </BalanceDisplay>

      <StatsGrid>
        <StatItem>
          <StatLabel>Payout Speed</StatLabel>
          <StatValue>Instant</StatValue>
        </StatItem>
        <StatItem>
          <StatLabel>Status</StatLabel>
          <StatValue>Verified</StatValue>
        </StatItem>
        <StatItem>
          <StatLabel>Weekly limit</StatLabel>
          <StatValue>Ksh 500,000</StatValue>
        </StatItem>
        <StatItem>
          <StatLabel>Last Payout</StatLabel>
          <StatValue>12 mins ago</StatValue>
        </StatItem>
      </StatsGrid>

      <ActionButton onClick={onWithdraw}>
        Withdraw to M-PESA
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12"></line>
          <polyline points="12 5 19 12 12 19"></polyline>
        </svg>
      </ActionButton>

      <UrgencyBanner>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        Minimum withdrawal: KES 50. Maximum: KES 150,000.
      </UrgencyBanner>
    </CardContainer>
  );
};

export default WithdrawCard;

