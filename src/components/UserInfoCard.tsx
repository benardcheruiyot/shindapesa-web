import React from 'react';
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const CardWrapper = styled.section`
  background: rgba(24, 24, 27, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 24px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.3), transparent);
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
  z-index: 1;
`;

const VipBadge = styled.div`
  background: linear-gradient(135deg, #d4af37 0%, #b8860b 100%);
  color: #fff;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 0.65rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 4px 10px rgba(212, 175, 55, 0.15);
`;

const Avatar = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  font-weight: 950;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const UserDetails = styled.div`
  flex: 1;
`;

const LevelTag = styled.div`
  font-size: 0.65rem;
  font-weight: 900;
  color: #d4af37;
  text-transform: uppercase;
  letter-spacing: 1px;
  display: flex;
  align-items: center;
  gap: 6px;
  margin-bottom: 4px;
`;

const StatusBadge = styled.div<{ $isActivated: boolean }>`
  background: ${props => props.$isActivated ? 'rgba(74, 222, 128, 0.1)' : 'rgba(239, 68, 68, 0.1)'};
  color: ${props => props.$isActivated ? '#4ade80' : '#f87171'};
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 0.6rem;
  font-weight: 950;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border: 1px solid ${props => props.$isActivated ? 'rgba(74, 222, 128, 0.2)' : 'rgba(239, 68, 68, 0.2)'};
  display: flex;
  align-items: center;
  gap: 6px;
  animation: ${props => !props.$isActivated ? pulse : 'none'} 2s infinite;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  padding-top: 16px;
`;

const StatItem = styled.div`
  background: rgba(255, 255, 255, 0.02);
  padding: 12px;
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.02);
`;

const StatLabel = styled.div`
  font-size: 0.6rem;
  color: rgba(255, 255, 255, 0.4);
  text-transform: uppercase;
  font-weight: 800;
  margin-bottom: 4px;
`;

const StatValue = styled.div<{ gold?: boolean }>`
  font-size: 0.9rem;
  font-weight: 950;
  color: ${props => props.gold ? '#d4af37' : '#ffffff'};
`;

interface UserInfoCardProps {
  name: string;
  phone: string;
  isActivated: boolean;
}

const UserInfoCard: React.FC<UserInfoCardProps> = ({ name, phone, isActivated }) => (
  <CardWrapper>
    <Header>
      <Avatar>
        {name ? name.charAt(0).toUpperCase() : 'U'}
      </Avatar>
      <UserDetails>
        <LevelTag>
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#d4af37' }} />
          SHINDAPESA PLATINUM MEMBER
        </LevelTag>
        <div style={{ fontSize: '1.1rem', fontWeight: 950, color: '#ffffff', letterSpacing: '-0.2px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          {name}
          <VipBadge>PRO</VipBadge>
        </div>
        <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', fontWeight: 700 }}>{phone}</div>
      </UserDetails>
      <StatusBadge $isActivated={isActivated}>
        {isActivated ? 'VERIFIED' : 'PENDING'}
      </StatusBadge>
    </Header>

    <StatsGrid>
      <StatItem>
        <StatLabel>Account Security</StatLabel>
        <StatValue style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <div style={{ width: 40, height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ width: isActivated ? '100%' : '65%', height: '100%', background: isActivated ? '#22c55e' : '#d4af37' }} />
          </div>
          <span style={{ fontSize: '0.7rem', color: isActivated ? '#22c55e' : '#d4af37' }}>{isActivated ? 'High' : 'Secure'}</span>
        </StatValue>
      </StatItem>
      <StatItem>
        <StatLabel>Available Spins</StatLabel>
        <StatValue gold>UNLIMITED</StatValue>
      </StatItem>
    </StatsGrid>
  </CardWrapper>
);

export default UserInfoCard;

