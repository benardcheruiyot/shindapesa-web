import React from 'react';
import styled from 'styled-components';

interface ReferralCardProps {
  referral: number;
}

const CardContainer = styled.section`
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

  &::after {
    content: '';
    position: absolute;
    top: 0; left: 0; width: 100%; height: 2px;
    background: linear-gradient(90deg, transparent, #3b82f6, transparent);
    opacity: 0.5;
  }
`;

const Glow = styled.div`
  position: absolute;
  top: -20px;
  right: -20px;
  width: 150px;
  height: 150px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
  z-index: 0;
`;

const Badge = styled.div`
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 1px;
  border: 1px solid rgba(34, 197, 94, 0.2);
  text-transform: uppercase;
`;

const IconWrapper = styled.div`
  background: rgba(59, 130, 246, 0.1);
  padding: 10px;
  border-radius: 12px;
  border: 1px solid rgba(59, 130, 246, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h3`
  font-weight: 800;
  font-size: 1.1rem;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  margin: 0;
  background: linear-gradient(to right, #fff, #94a3b8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const BalanceDisplay = styled.div`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 24px;
  color: #ffffff;
  letter-spacing: -2px;
  display: flex;
  align-items: baseline;
  gap: 12px;

  span {
    font-size: 1.2rem;
    color: #3b82f6;
    font-weight: 800;
  }
`;

const ActionButton = styled.button`
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: #ffffff;
  border: none;
  border-radius: 16px;
  padding: 20px;
  font-weight: 800;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 4px 14px 0 rgba(59, 130, 246, 0.3);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
    filter: brightness(1.1);
  }
`;

const ReferralCard: React.FC<ReferralCardProps> = ({ referral }) => (
  <CardContainer>
    <Glow />
    <div style={{ position: 'relative', zIndex: 1 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <IconWrapper>
            <span style={{ fontSize: '1.4rem' }}>🤝</span>
          </IconWrapper>
          <Title>Affiliate Hub</Title>
        </div>
        <Badge>LIVE REVENUE</Badge>
      </div>
      
      <BalanceDisplay>
        <span>KES</span>
        {referral.toLocaleString()}
      </BalanceDisplay>

      <ActionButton 
        onClick={() => {
          const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://shindapesa-web.vercel.app';
          const cleanBaseUrl = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
          navigator.clipboard.writeText(`${cleanBaseUrl}/register?ref=user${Math.floor(Math.random() * 1000)}`);
          alert('Link secure copied! Start sharing to earn.');
        }}
      >
        GENERATE SECURE LINK 🚀
      </ActionButton>

      <div style={{ marginTop: 24, textAlign: 'center', opacity: 0.3, fontSize: '0.6rem', fontWeight: 800, letterSpacing: 1.5, textTransform: 'uppercase', color: '#94a3b8' }}>
        ENCRYPTED AFFILIATE NODE ACTIVE
      </div>
    </div>
  </CardContainer>
);

export default ReferralCard;
