"use client";
import React from 'react';
import styled, { keyframes } from 'styled-components';

export const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

export const pulse = keyframes`
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(251, 223, 7, 0.4); }
  70% { transform: scale(1.05); box-shadow: 0 0 0 15px rgba(251, 223, 7, 0); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(251, 223, 7, 0); }
`;

export const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: #030712;
  background-image: 
    radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.08) 0, transparent 40%),
    radial-gradient(circle at 100% 100%, rgba(251, 223, 7, 0.05) 0, transparent 40%);
  color: #f8fafc;
  font-family: var(--font-inter, 'Inter', sans-serif);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow-x: hidden;
`;

export const AuthCard = styled.div`
  width: 92vw;
  max-width: 420px;
  margin-top: 60px;
  background: rgba(17, 24, 39, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 32px;
  padding: 48px 32px;
  position: relative;
  overflow: hidden;
  box-shadow: 
    0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 20px 25px -5px rgba(0, 0, 0, 0.2),
    0 10px 10px -5px rgba(0, 0, 0, 0.04),
    inset 0 1px 1px rgba(255, 255, 255, 0.05);
  animation: ${fadeIn} 0.8s cubic-bezier(0.16, 1, 0.3, 1);
  z-index: 2;

  &::after {
    content: '';
    position: absolute;
    top: 0; left: 0; width: 100%; height: 2px;
    background: linear-gradient(90deg, transparent, #3b82f6, #60a5fa, transparent);
    opacity: 0.5;
  }
`;

export const StyledTitle = styled.h1`
  font-size: 2.25rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 8px;
  text-align: center;
  letter-spacing: -0.05em;
  background: linear-gradient(to bottom right, #fff, #94a3b8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 16px 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  font-size: 1rem;
  background: rgba(0, 0, 0, 0.2);
  color: #ffffff;
  outline: none;
  box-sizing: border-box;
  transition: all 0.2s ease;
  font-weight: 500;
  
  &:focus {
    border-color: #3b82f6;
    background: rgba(0, 0, 0, 0.4);
    box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.1);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
`;

export const PrimaryButton = styled.button`
  width: 100%;
  padding: 16px 24px;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: #fff;
  border: none;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  box-shadow: 0 4px 6px -1px rgba(59, 130, 246, 0.2), 0 10px 15px -3px rgba(59, 130, 246, 0.1);

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 12px -2px rgba(59, 130, 246, 0.3), 0 20px 25px -5px rgba(59, 130, 246, 0.2);
    filter: brightness(1.1);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: #1f2937;
    color: #6b7280;
    box-shadow: none;
  }
`;

export const SecondaryButton = styled.button`
  width: 100%;
  padding: 14px 20px;
  background: rgba(255, 255, 255, 0.03);
  color: #e2e8f0;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  font-weight: 600;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 255, 255, 0.2);
    color: #fff;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 20px;
`;

export const StyledLabel = styled.label`
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #94a3b8;
  margin-bottom: 6px;
  letter-spacing: -0.01em;
`;

export const ErrorMessage = styled.div`
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid rgba(239, 68, 68, 0.2);
  color: #fca5a5;
  padding: 12px 16px;
  border-radius: 12px;
  margin-bottom: 20px;
  width: 100%;
  text-align: center;
  font-size: 0.875rem;
  font-weight: 500;
`;

export const BottomText = styled.div`
  margin-top: 24px;
  font-size: 0.9rem;
  color: #64748b;
  text-align: center;
  font-weight: 500;

  span {
    color: #3b82f6;
    cursor: pointer;
    font-weight: 600;
    margin-left: 6px;
    
    &:hover {
      color: #60a5fa;
      text-decoration: none;
    }
  }
`;

const StyledBackHeader = styled.div`
  position: absolute;
  top: 32px;
  left: 32px;
  display: flex;
  align-items: center;
  color: #94a3b8;
  font-weight: 600;
  cursor: pointer;
  z-index: 10;
  font-size: 0.875rem;
  transition: all 0.2s ease;

  &:hover {
    color: #ffffff;
    transform: translateX(-4px);
  }

  span {
    font-size: 1.125rem;
    margin-right: 8px;
  }
`;

export const BackHeader = ({ title, onBack, children, ...props }: any) => {
  return (
    <StyledBackHeader onClick={onBack || props.onClick} {...props}>
      {children ? (
        children
      ) : (
        <>
          <span>&larr;</span>
          {title || "BACK"}
        </>
      )}
    </StyledBackHeader>
  );
};
