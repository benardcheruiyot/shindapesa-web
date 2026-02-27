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
  background-color: #0b1a30;
  color: #ffffff;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  overflow-x: hidden;
`;

export const AuthCard = styled.div`
  width: 90vw;
  max-width: 440px;
  margin-top: 80px;
  background: #002d58;
  border: 4px solid #fbdf07;
  border-radius: 48px;
  padding: 55px 40px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 50px 120px rgba(0, 0, 0, 0.8);
  animation: ${fadeIn} 0.8s ease-out;
  z-index: 2;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; width: 100%; height: 6px;
    background: linear-gradient(90deg, #005baa, #fbdf07, #005baa);
  }
`;

export const StyledTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 950;
  color: #ffffff;
  margin-bottom: 12px;
  text-align: center;
  letter-spacing: -2px;
  text-transform: uppercase;
`;

export const StyledInput = styled.input`
  width: 100%;
  padding: 24px;
  border: 4px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  font-size: 1.1rem;
  background: rgba(0, 0, 0, 0.3);
  color: #ffffff;
  outline: none;
  box-sizing: border-box;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  font-weight: 900;
  
  &:focus {
    border-color: #fbdf07;
    background: rgba(0, 0, 0, 0.5);
    box-shadow: 0 0 20px rgba(251, 223, 7, 0.15);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.2);
  }
`;

export const PrimaryButton = styled.button`
  width: 100%;
  padding: 24px;
  background: linear-gradient(135deg, #fbdf07 0%, #d4bb00 100%);
  color: #000;
  border: none;
  border-radius: 20px;
  font-weight: 950;
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 15px 35px rgba(251, 223, 7, 0.2);

  &:hover:not(:disabled) {
    transform: translateY(-5px);
    box-shadow: 0 20px 45px rgba(251, 223, 7, 0.4);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: #475569;
    color: #94a3b8;
  }
`;

export const SecondaryButton = styled.button`
  width: 100%;
  padding: 18px;
  background: transparent;
  color: #ffffff;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 24px;
`;

export const StyledLabel = styled.label`
  display: block;
  font-size: 0.75rem;
  font-weight: 800;
  color: #fbdf07;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 8px;
  opacity: 0.9;
`;

export const ErrorMessage = styled.div`
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid #ef4444;
  color: #ef4444;
  padding: 12px;
  border-radius: 12px;
  margin-bottom: 20px;
  width: 100%;
  text-align: center;
  font-size: 0.85rem;
  font-weight: 800;
`;

export const BottomText = styled.div`
  margin-top: 32px;
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.4);
  text-align: center;
  font-weight: 700;

  span {
    color: #3b82f6;
    cursor: pointer;
    font-weight: 950;
    margin-left: 8px;
    text-transform: uppercase;
    letter-spacing: 1px;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

const StyledBackHeader = styled.div`
  position: absolute;
  top: 40px;
  left: 40px;
  display: flex;
  align-items: center;
  color: #fbdf07;
  font-weight: 800;
  cursor: pointer;
  z-index: 10;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 1px;

  span {
    font-size: 1.2rem;
    margin-right: 10px;
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
