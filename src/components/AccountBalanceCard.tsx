import React from 'react';
import styled from 'styled-components';

interface AccountBalanceCardProps {
  balance: number;
  withdrawableBalance: number;
  clicks: number;
  freeSpins?: number;
  referral: number;
  onWithdraw: () => void;
}

const CardContainer = styled.section`
  background: rgba(15, 23, 42, 0.45);
  backdrop-filter: blur(40px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 40px;
  padding: 48px 36px;
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.8), 0 0 1px 1px rgba(255, 255, 255, 0.1);
  color: #ffffff;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 200%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(59, 130, 246, 0.05),
      transparent
    );
    animation: shimmer 8s infinite linear;
  }

  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }

  @media (max-width: 600px) {
    padding: 32px 24px;
    border-radius: 32px;
  }
`;

const GlowEffect = styled.div`
  position: absolute;
  top: -150px;
  right: -150px;
  width: 350px;
  height: 350px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%);
  opacity: 0.2;
  z-index: 0;
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
`;

const Label = styled.div`
  font-size: 0.8rem;
  font-weight: 950;
  color: #fbdf07;
  text-transform: uppercase;
  letter-spacing: 4px;
  margin-bottom: 12px;
  opacity: 0.9;

  @media (max-width: 600px) {
    font-size: 0.7rem;
    letter-spacing: 2px;
  }
`;

const MainBalance = styled.div`
  font-size: 5.2rem;
  font-weight: 950;
  color: #ffffff;
  letter-spacing: -4px;
  line-height: 1;
  display: flex;
  align-items: baseline;
  gap: 16px;

  span {
    font-size: 1.6rem;
    color: #fbdf07;
    font-weight: 950;
    letter-spacing: 0;
  }

  @media (max-width: 600px) {
    font-size: 3.5rem;
    gap: 10px;
    
    span {
      font-size: 1.2rem;
    }
  }

  @media (max-width: 400px) {
    font-size: 2.8rem;
  }
`;

const SubBalance = styled.div`
  font-size: 0.75rem;
  font-weight: 800;
  color: rgba(255,255,255,0.4);
  margin-top: 16px;
  letter-spacing: 1px;
  text-transform: uppercase;

  span {
    color: #ffffff;
    font-weight: 950;
    margin-left: 4px;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  margin: 40px 0;

  @media (max-width: 600px) {
    gap: 12px;
    margin: 28px 0;
  }
`;

const StatItem = styled.div<{ $highlight?: boolean }>`
  background: ${props => props.$highlight ? 'rgba(251, 223, 7, 0.08)' : 'rgba(255, 255, 255, 0.02)'};
  padding: 24px 16px;
  border-radius: 28px;
  text-align: center;
  border: 1px solid ${props => props.$highlight ? 'rgba(251, 223, 7, 0.2)' : 'rgba(255,255,255,0.05)'};
  transition: all 0.3s ease;

  &:hover {
    background: ${props => props.$highlight ? 'rgba(251, 223, 7, 0.12)' : 'rgba(255, 255, 255, 0.04)'};
    transform: translateY(-2px);
  }

  .stat-label {
    font-size: 0.6rem;
    color: ${props => props.$highlight ? '#fbdf07' : 'rgba(255,255,255,0.4)'};
    margin-bottom: 8px;
    font-weight: 950;
    letter-spacing: 1.5px;
    text-transform: uppercase;
  }

  .stat-value {
    font-size: 1.4rem;
    font-weight: 950;
    color: ${props => props.$highlight ? '#ffffff' : '#ffffff'};

    @media (max-width: 600px) {
      font-size: 1.15rem;
    }
  }

  @media (max-width: 600px) {
    padding: 16px 12px;
    border-radius: 20px;
  }
`;

const WithdrawButton = styled.button`
  background: linear-gradient(135deg, #fbdf07 0%, #d4bb00 100%);
  color: #000000;
  border: none;
  border-radius: 24px;
  padding: 28px;
  font-weight: 950;
  font-size: 1.2rem;
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 14px;
  box-shadow: 0 20px 40px rgba(251, 223, 7, 0.25);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  text-transform: uppercase;
  letter-spacing: 2px;

  span {
    font-size: 1.4rem;
  }

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 25px 50px rgba(251, 223, 7, 0.4);
    filter: brightness(1.1);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 600px) {
    padding: 22px;
    font-size: 1.05rem;
    border-radius: 20px;
  }
`;

const AccountBalanceCard: React.FC<AccountBalanceCardProps> = ({ balance, withdrawableBalance, clicks, freeSpins = 0, referral, onWithdraw }) => (
  <CardContainer>
    <GlowEffect />
    <Content>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom: 20}}>
        <div>
          <Label>Withdrawable Winnings</Label>
          <MainBalance>
            <span>KES</span>
            {withdrawableBalance.toLocaleString()}
          </MainBalance>
          <SubBalance>
            Total Pending Balance: <span>KES {balance.toLocaleString()}</span>
          </SubBalance>
        </div>
      </div>

      <StatsGrid>
        <StatItem>
          <div className="stat-label">TOTAL SPINS</div>
          <div className="stat-value">{clicks}</div>
        </StatItem>
        <StatItem $highlight>
          <div className="stat-label">FREE SPINS</div>
          <div className="stat-value">{freeSpins}</div>
        </StatItem>
        <StatItem>
          <div className="stat-label">BONUS</div>
          <div className="stat-value">{referral.toLocaleString()}</div>
        </StatItem>
      </StatsGrid>

      <WithdrawButton onClick={onWithdraw}>
        WITHDRAW TO M-PESA <span>⚡</span>
      </WithdrawButton>
    </Content>
  </CardContainer>
);

export default AccountBalanceCard;

