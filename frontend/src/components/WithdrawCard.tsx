"use client";
import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';
import { ShieldCheck, Info } from 'lucide-react';

const pulse = keyframes
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.3); }
  70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
;

const shimmer = keyframes
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
;

const CardContainer = styled.section
  background: rgba(17, 24, 39, 0.7);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 32px;
  padding: 32px;
  margin-bottom: 24px;
  position: relative;
  overflow: hidden;
  box-shadow: 
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05),
    inset 0 1px 1px rgba(255, 255, 255, 0.05);

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
      rgba(59, 130, 246, 0.05),
      transparent
    );
    animation: \ 8s infinite linear;
  }
;

const Header = styled.div
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 28px;
;

const TitleGroup = styled.div
  display: flex;
  flex-direction: column;
;

const CardTitle = styled.h3
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(to right, #fff, #94a3b8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
;

const Subtitle = styled.span
  color: #3b82f6;
  font-size: 0.65rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-top: 6px;
  opacity: 0.9;
;

const NodeBadge = styled.div
  background: rgba(34, 197, 94, 0.1);
  border: 1px solid rgba(34, 197, 94, 0.2);
  color: #22c55e;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.65rem;
  font-weight: 800;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 6px;
  letter-spacing: 1px;
;

const Pulse = styled.div
  width: 6px;
  height: 6px;
  background: #22c55e;
  border-radius: 50%;
  animation: \ 2s infinite;
;

const BalanceDisplay = styled.div
  margin-bottom: 32px;
  padding: 24px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.03);
;

const Amount = styled.div
  font-size: 2.2rem;
  font-weight: 950;
  color: #ffffff;
  letter-spacing: -1.5px;
  display: flex;
  align-items: baseline;
  gap: 10px;
;

const Currency = styled.span
  font-size: 1rem;
  color: #3b82f6;
  font-weight: 900;
;

const StatsGrid = styled.div
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-bottom: 32px;
;

const StatItem = styled.div
  background: rgba(255, 255, 255, 0.02);
  padding: 14px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.04);
;

const StatLabel = styled.div
  font-size: 0.6rem;
  color: #64748b;
  text-transform: uppercase;
  font-weight: 800;
  margin-bottom: 4px;
  letter-spacing: 1px;
;

const StatValue = styled.div
  font-size: 0.85rem;
  font-weight: 800;
  color: #ffffff;
;

const ActionButton = styled.button
  width: 100%;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: #ffffff;
  border: none;
  padding: 24px;
  border-radius: 20px;
  font-size: 1.1rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  text-transform: uppercase;
  letter-spacing: 2px;
  box-shadow: 0 15px 35px rgba(59, 130, 246, 0.25);
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 20px 45px rgba(59, 130, 246, 0.35);
  }

  &:active {
    transform: translateY(-1px);
  }
;

const MpesaLogo = styled.span
  background: #ffffff;
  color: #000000;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.65rem;
  font-weight: 900;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
;

const UrgencyBanner = styled.div
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
;

interface WithdrawCardProps {
  available: number;
  onWithdraw: () => void;
}

const WithdrawCard: React.FC<WithdrawCardProps> = ({ available, onWithdraw }) => {
  const [timeLeft, setTimeLeft] = useState('04:12');

  useEffect(() => {
    const timer = setInterval(() => {
      const mins = Math.floor(Math.random() * 5);
      const secs = Math.floor(Math.random() * 60);
      setTimeLeft(mins.toString().padStart(2, '0') + ':' + secs.toString().padStart(2, '0'));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <CardContainer>
      <Header>
        <TitleGroup>
          <CardTitle>
            <ShieldCheck size={22} color="#3b82f6" style={{ marginRight: '8px' }} />
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
        System processing: Batch active. Funds will reflect in 3-5 seconds.
      </UrgencyBanner>
    </CardContainer>
  );
};

export default WithdrawCard;
