"use client";
import React from "react";
import styled, { keyframes } from "styled-components";

const slideIn = keyframes`
  from { transform: translateX(-20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const Badge = styled.div<{ $isActivated: boolean }>`
  background: ${props => props.$isActivated ? 'rgba(76, 209, 55, 0.05)' : 'rgba(239, 68, 68, 0.1)'};
  border: 1px solid ${props => props.$isActivated ? 'rgba(76, 209, 55, 0.2)' : 'rgba(239, 68, 68, 0.2)'};
  color: ${props => props.$isActivated ? '#4cd137' : '#ef4444'};
  padding: 12px 20px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 800;
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  animation: ${slideIn} 0.5s ease-out;

  span {
    background: ${props => props.$isActivated ? '#4cd137' : '#ef4444'};
    color: ${props => props.$isActivated ? '#000' : '#fff'};
    padding: 2px 8px;
    border-radius: 6px;
    font-size: 0.6rem;
    letter-spacing: 1px;
    font-weight: 950;
  }
`;

interface StatusBadgeProps {
  isActivated: boolean;
  onClick: () => void;
}

const StatusBadge = ({ isActivated, onClick }: StatusBadgeProps) => {
  if (isActivated) {
    return (
      <Badge $isActivated onClick={onClick}>
        <span>🔒 SECURITY PROTOCOL: ACCOUNT FULLY ACTIVATED</span>
        <span>VERIFIED</span>
      </Badge>
    );
  }

  return (
    <Badge $isActivated={false} onClick={onClick}>
      ⚠️ ACCOUNT SEMI-VERIFIED: FULL ACTIVATION REQUIRED <span>ACTION REQUIRED</span>
    </Badge>
  );
};

export default StatusBadge;
