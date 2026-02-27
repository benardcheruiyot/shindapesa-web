import React from 'react';
import styled from 'styled-components';

interface ReferralCardProps {
  referral: number;
}

const CardContainer = styled.section`
  background: #002d58;
  color: #ffffff;
  border-radius: 40px;
  padding: 40px;
  margin-bottom: 24px;
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.6);
  border: 4px solid #fbdf07;
  position: relative;
  overflow: hidden;
`;

const Glow = styled.div`
  position: absolute;
  bottom: -100px;
  right: -100px;
  width: 250px;
  height: 250px;
  background: radial-gradient(circle, rgba(0, 91, 170, 0.1) 0%, transparent 70%);
  opacity: 0.1;
  z-index: 0;
`;

const Badge = styled.div`
  background: rgba(57, 181, 74, 0.1);
  color: #39b54a;
  padding: 6px 14px;
  border-radius: 12px;
  font-size: 0.6rem;
  font-weight: 950;
  letter-spacing: 2px;
  border: 1px solid rgba(57, 181, 74, 0.2);
  text-transform: uppercase;
`;

const IconWrapper = styled.div`
  background: rgba(251, 223, 7, 0.1);
  padding: 12px;
  border-radius: 16px;
  border: 1px solid rgba(251, 223, 7, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h3`
  font-weight: 950;
  font-size: 1.2rem;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin: 0;
`;

const BalanceDisplay = styled.div`
  font-size: 3.2rem;
  font-weight: 950;
  margin-bottom: 32px;
  color: #ffffff;
  letter-spacing: -2px;
  display: flex;
  align-items: baseline;
  gap: 12px;

  span {
    font-size: 1.1rem;
    color: #fbdf07;
    font-weight: 950;
  }
`;

const ActionButton = styled.button`
  background: rgba(255, 255, 255, 0.03);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 24px;
  font-weight: 950;
  font-size: 1.1rem;
  cursor: pointer;
  width: 100%;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  text-transform: uppercase;
  letter-spacing: 2px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);

  &:hover {
    transform: translateY(-4px);
    background: rgba(255, 255, 255, 0.06);
    border-color: #fbdf07;
    box-shadow: 0 15px 30px rgba(251, 223, 7, 0.2);
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

      <div style={{ marginTop: 24, textAlign: 'center', opacity: 0.35, fontSize: '0.65rem', fontWeight: 950, letterSpacing: 1.5, textTransform: 'uppercase' }}>
        SECURE MULTI-LEVEL COMMISSION PROTOCOL ACTIVE
      </div>
    </div>
  </CardContainer>
);

export default ReferralCard;
