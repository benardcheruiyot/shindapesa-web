import React from 'react';
import styled, { keyframes } from 'styled-components';

const float = keyframes`
  0% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(5deg); }
  100% { transform: translateY(0px) rotate(0deg); }
`;

const CardContainer = styled.section`
  background: #002d58;
  color: #ffffff;
  border-radius: 40px;
  padding: 56px 40px;
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.8);
  text-align: center;
  border: 4px solid #fbdf07;
  position: relative;
  overflow: hidden;
`;

const Glow = styled.div`
  position: absolute;
  top: -100px;
  right: -100px;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(0, 91, 170, 0.15) 0%, transparent 70%);
  opacity: 0.2;
  z-index: 0;
`;

const GatewayBadge = styled.div`
  background: rgba(57, 181, 74, 0.1);
  color: #39b54a;
  font-size: 0.65rem;
  font-weight: 950;
  padding: 8px 18px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 32px;
  border: 1px solid rgba(57, 181, 74, 0.2);
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const PromoIcon = styled.div`
  font-size: 5rem;
  margin-bottom: 24px;
  display: inline-block;
  filter: drop-shadow(0 20px 30px rgba(0,0,0,0.5));
  animation: ${float} 4s ease-in-out infinite;
`;

const Title = styled.h2`
  font-weight: 950;
  font-size: 2.4rem;
  margin-bottom: 12px;
  color: #ffffff;
  letter-spacing: -1.5px;
  text-transform: uppercase;
  line-height: 1.1;

  span {
    color: #fbdf07;
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  margin-bottom: 48px;
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.6;
  font-weight: 700;

  b {
    color: #ffffff;
    font-weight: 950;
  }
`;

const ActionButton = styled.button`
  background: linear-gradient(135deg, #fbdf07 0%, #d4bb00 100%);
  color: #000000;
  border: none;
  border-radius: 24px;
  padding: 28px 48px;
  font-weight: 950;
  font-size: 1.4rem;
  cursor: pointer;
  box-shadow: 0 20px 40px rgba(251, 223, 7, 0.3);
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  width: 100%;
  text-transform: uppercase;
  letter-spacing: 2px;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 25px 50px rgba(251, 223, 7, 0.45);
    filter: brightness(1.1);
  }

  &:active {
    transform: translateY(0);
  }
`;

const Note = styled.div`
  margin-top: 28px;
  font-size: 0.7rem;
  color: rgba(255, 255, 255, 0.3);
  font-weight: 900;
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
