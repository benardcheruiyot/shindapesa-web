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
  background: #002d58;
  border: 4px solid #fbdf07;
  border-radius: 40px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-bottom: 24px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.8);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
  z-index: 1;
`;

const VipBadge = styled.div`
  background: linear-gradient(135deg, #fbdf07 0%, #d4bb00 100%);
  color: #000;
  padding: 6px 14px;
  border-radius: 12px;
  font-size: 0.6rem;
  font-weight: 950;
  text-transform: uppercase;
  letter-spacing: 2px;
  box-shadow: 0 10px 20px rgba(251, 223, 7, 0.3);
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Avatar = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 20px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.6rem;
  font-weight: 950;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 10px 30px rgba(0,0,0,0.3);
`;

const UserDetails = styled.div`
  flex: 1;
`;

const LevelTag = styled.div`
  font-size: 0.65rem;
  font-weight: 950;
  color: #fbdf07;
  text-transform: uppercase;
  letter-spacing: 2px;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 6px;
  opacity: 0.8;
`;

const StatusBadge = styled.div<{ $isActivated: boolean }>`
  background: ${props => props.$isActivated ? 'rgba(57, 181, 74, 0.1)' : 'rgba(238, 28, 37, 0.1)'};
  color: ${props => props.$isActivated ? '#39b54a' : '#ee1c25'};
  padding: 10px 18px;
  border-radius: 14px;
  font-size: 0.65rem;
  font-weight: 950;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid ${props => props.$isActivated ? 'rgba(76, 209, 55, 0.2)' : 'rgba(255, 71, 87, 0.2)'};
  display: flex;
  align-items: center;
  gap: 8px;
  animation: ${props => !props.$isActivated ? pulse : 'none'} 2s infinite;

  &::before {
    content: '';
    width: 6px;
    height: 6px;
    background: currentColor;
    border-radius: 50%;
  }
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
  font-size: 1rem;
  font-weight: 950;
  color: ${props => props.gold ? '#3b82f6' : '#ffffff'};
  letter-spacing: 0.5px;
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
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#3b82f6' }} />
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
            <div style={{ width: isActivated ? '100%' : '65%', height: '100%', background: isActivated ? '#22c55e' : '#3b82f6' }} />
          </div>
          <span style={{ fontSize: '0.7rem', color: isActivated ? '#22c55e' : '#3b82f6' }}>{isActivated ? 'High' : 'Secure'}</span>
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

