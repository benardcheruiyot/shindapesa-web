import React from 'react';
import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const CardContainer = styled.section`
  background: rgba(17, 24, 39, 0.7);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 32px;
  padding: 56px 40px;
  box-shadow: 
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05),
    inset 0 1px 1px rgba(255, 255, 255, 0.05);
  text-align: center;
  position: relative;
  overflow: hidden;

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
  top: -50px;
  right: -50px;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
  z-index: 0;
`;

const GatewayBadge = styled.div`
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
  font-size: 0.65rem;
  font-weight: 800;
  padding: 8px 16px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 32px;
  border: 1px solid rgba(34, 197, 94, 0.2);
  text-transform: uppercase;
  letter-spacing: 1.5px;
`;

const PromoIcon = styled.div`
  font-size: 4.5rem;
  margin-bottom: 24px;
  display: inline-block;
  filter: drop-shadow(0 15px 25px rgba(0,0,0,0.5));
  animation: ${float} 4s ease-in-out infinite;
`;

const Title = styled.h2`
  font-weight: 800;
  font-size: 2.2rem;
  margin-bottom: 12px;
  color: #ffffff;
  letter-spacing: -1px;
  text-transform: uppercase;
  line-height: 1.1;

  span {
    background: linear-gradient(to bottom right, #3b82f6, #60a5fa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;

const Subtitle = styled.p`
  font-size: 1rem;
  margin-bottom: 48px;
  color: #94a3b8;
  line-height: 1.6;
  font-weight: 500;

  b {
    color: #ffffff;
    font-weight: 800;
  }
`;

const ActionButton = styled.button`
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: #ffffff;
  border: none;
  border-radius: 20px;
  padding: 24px 40px;
  font-weight: 800;
  font-size: 1.25rem;
  cursor: pointer;
  box-shadow: 0 4px 14px 0 rgba(59, 130, 246, 0.39);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 100%;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(59, 130, 246, 0.45);
    filter: brightness(1.1);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Note = styled.div`
  margin-top: 28px;
  font-size: 0.65rem;
  color: #64748b;
  font-weight: 800;
  letter-spacing: 1px;
  text-transform: uppercase;
`;

interface BonusSpinCardProps {
  onSpin: () => void;
}

const BonusSpinCard: React.FC<BonusSpinCardProps> = ({ onSpin }) => (
  <CardContainer>
    <Glow />
    <div style={{ position: 'relative', zIndex: 1 }}>
      <GatewayBadge>
        <div style={{ width: 8, height: 8, background: '#4cd137', borderRadius: '50%', boxShadow: '0 0 10px #4cd137' }} />
        M-PESA SECURE GATEWAY ACTIVE
      </GatewayBadge>

      <PromoIcon>🎁</PromoIcon>
      
      <Title>
        UNCLAIMED <span>REWARDS</span> FOUND
      </Title>
      
      <Subtitle>
        Your account node is eligible for <b>5 PRESTIGE SPINS</b>.<br/>
        Potential Payout: <b style={{color: '#4cd137'}}>KES 20,000</b>
      </Subtitle>

      <ActionButton onClick={onSpin}>
        SPIN & WIN NOW <span>💰</span>
      </ActionButton>

      <Note>
        NO DEPOSIT REQUIRED FOR PROMOTIONAL REWARDS
      </Note>
    </div>
  </CardContainer>
);

export default BonusSpinCard;
