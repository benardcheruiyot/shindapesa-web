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
  background: rgba(17, 24, 39, 0.7);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 32px;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 24px;
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

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  position: relative;
  z-index: 1;
`;

const VipBadge = styled.div`
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: #ffffff;
  padding: 6px 12px;
  border-radius: 12px;
  font-size: 0.6rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  box-shadow: 0 4px 14px rgba(59, 130, 246, 0.2);
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Avatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 18px;
  background: rgba(59, 130, 246, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 800;
  color: #3b82f6;
  border: 1px solid rgba(59, 130, 246, 0.2);
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
`;

const UserDetails = styled.div`
  flex: 1;
`;

const LevelTag = styled.div`
  font-size: 0.65rem;
  font-weight: 700;
  color: #3b82f6;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
`;

const StatusBadge = styled.div<{ $isActivated: boolean }>`
  background: ${props => props.$isActivated ? 'rgba(34, 197, 94, 0.08)' : 'rgba(239, 68, 68, 0.08)'};
  color: ${props => props.$isActivated ? '#22c55e' : '#ef4444'};
  padding: 8px 16px;
  border-radius: 12px;
  font-size: 0.65rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 1px;
  border: 1px solid ${props => props.$isActivated ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)'};
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
  padding-top: 24px;
`;

const StatItem = styled.div`
  background: rgba(255, 255, 255, 0.02);
  padding: 14px;
  border-radius: 14px;
  border: 1px solid rgba(255, 255, 255, 0.04);
`;

const StatLabel = styled.div`
  font-size: 0.6rem;
  color: #64748b;
  text-transform: uppercase;
  font-weight: 700;
  margin-bottom: 4px;
  letter-spacing: 0.5px;
`;

const StatValue = styled.div<{ gold?: boolean }>`
  font-size: 0.95rem;
  font-weight: 800;
  color: #ffffff;
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

