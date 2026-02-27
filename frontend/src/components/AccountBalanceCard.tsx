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
  background: rgba(13, 21, 38, 0.45);
  backdrop-filter: blur(40px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 32px;
  padding: 40px 32px;
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.6);
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
    animation: shimmer 12s infinite linear;
  }

  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }

  @media (max-width: 600px) {
    padding: 24px 20px;
    border-radius: 24px;
  }
`;

const GlowEffect = styled.div`
  position: absolute;
  top: -100px;
  right: -100px;
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.12) 0%, transparent 70%);
  opacity: 0.3;
  z-index: 0;
`;

const Content = styled.div`
  position: relative;
  z-index: 1;
`;

const Label = styled.div`
  font-size: 0.75rem;
  font-weight: 700;
  color: #94a3b8;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin-bottom: 8px;

  @media (max-width: 600px) {
    font-size: 0.65rem;
    letter-spacing: 0.12em;
  }
`;

const MainBalance = styled.div`
  font-size: 4rem;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -0.04em;
  line-height: 1.1;
  display: flex;
  align-items: baseline;
  gap: 12px;

  span {
    font-size: 1.25rem;
    color: #3b82f6;
    font-weight: 700;
    letter-spacing: 0;
  }

  @media (max-width: 600px) {
    font-size: 2.75rem;
    gap: 8px;
    
    span {
      font-size: 1rem;
    }
  }

  @media (max-width: 400px) {
    font-size: 2.25rem;
  }
`;

const SubBalance = styled.div`
  font-size: 0.85rem;
  font-weight: 500;
  color: #64748b;
  margin-top: 12px;
  display: flex;
  align-items: center;
  gap: 6px;

  span {
    color: #94a3b8;
    font-weight: 600;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  margin: 32px 0;

  @media (max-width: 600px) {
    gap: 8px;
    margin: 24px 0;
  }
`;

const StatItem = styled.div<{ $highlight?: boolean }>`
  background: ${props => props.$highlight ? 'rgba(59, 130, 246, 0.08)' : 'rgba(255, 255, 255, 0.03)'};
  padding: 16px 12px;
  border-radius: 16px;
  text-align: center;
  border: 1px solid ${props => props.$highlight ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255, 255, 255, 0.05)'};
  transition: all 0.2s ease;

  &:hover {
    background: ${props => props.$highlight ? 'rgba(59, 130, 246, 0.12)' : 'rgba(255, 255, 255, 0.05)'};
    transform: translateY(-1px);
  }

  .stat-label {
    font-size: 0.6rem;
    color: ${props => props.$highlight ? '#60a5fa' : '#64748b'};
    margin-bottom: 4px;
    font-weight: 700;
    letter-spacing: 0.05em;
    text-transform: uppercase;
  }

  .stat-value {
    font-size: 1.15rem;
    font-weight: 700;
    color: #f8fafc;

    @media (max-width: 600px) {
      font-size: 1rem;
    }
  }

  @media (max-width: 600px) {
    padding: 12px 8px;
  }
`;

const WithdrawButton = styled.button`
  background: #3b82f6;
  color: #ffffff;
  border: none;
  border-radius: 16px;
  padding: 18px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  box-shadow: 0 10px 25px rgba(59, 130, 246, 0.2);
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  text-transform: uppercase;
  letter-spacing: 0.05em;

  span {
    font-size: 1.25rem;
    transition: transform 0.3s ease;
  }

  &:hover {
    background: #2563eb;
    transform: translateY(-2px);
    box-shadow: 0 15px 35px rgba(59, 130, 246, 0.3);
    
    span {
      transform: translateX(4px);
    }
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 600px) {
    padding: 16px;
    font-size: 0.9rem;
    border-radius: 14px;
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

