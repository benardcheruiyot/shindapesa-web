"use client";
import React from "react";
import styled, { keyframes } from "styled-components";

const slideIn = keyframes`
  from { transform: translateX(-20px); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const Badge = styled.div<{ $isActivated: boolean }>`
  background: ${props => props.$isActivated ? 'rgba(34, 197, 94, 0.05)' : 'rgba(239, 68, 68, 0.05)'};
  border: 1px solid ${props => props.$isActivated ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)'};
  color: ${props => props.$isActivated ? '#4ade80' : '#f87171'};
  padding: 10px 16px;
  border-radius: 12px;
  font-size: 0.7rem;
  font-weight: 700;
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  animation: ${slideIn} 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  letter-spacing: 0.02em;

  span:first-child {
    display: flex;
    align-items: center;
    gap: 8px;
    &::before {
      content: '${props => props.$isActivated ? '🛡️' : '⚠️'}';
      font-size: 1rem;
    }
  }

  @media (max-width: 600px) {
    padding: 8px 12px;
    font-size: 0.6rem;
    gap: 8px;
    
    span:first-child {
      &::before { font-size: 0.85rem; }
    }
    
    .status-tag {
      padding: 2px 6px;
      font-size: 0.5rem;
    }
  }

  .status-tag {
    background: ${props => props.$isActivated ? '#22c55e' : '#ef4444'};
    color: #ffffff;
    padding: 3px 8px;
    border-radius: 6px;
    font-size: 0.6rem;
    letter-spacing: 0.05em;
    font-weight: 800;
    text-transform: uppercase;
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
        <span>System Protocol: Account Fully Protected</span>
        <span className="status-tag">Verified</span>
      </Badge>
    );
  }

  return (
    <Badge $isActivated={false} onClick={onClick}>
      <span>Security Alert: Activation Pending</span>
      <span className="status-tag">Required</span>
    </Badge>
  );
};

export default StatusBadge;
