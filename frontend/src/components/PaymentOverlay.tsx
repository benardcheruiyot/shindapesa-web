import React, { useEffect } from 'react';
import styled, { keyframes, css } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const scaleIn = keyframes`
  from { transform: scale(0.9) translateY(20px); opacity: 0; }
  to { transform: scale(1) translateY(0); opacity: 1; }
`;

const spin = keyframes`
  to { transform: rotate(360deg); }
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(8, 14, 28, 0.85);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 24px;
  ${css`animation: ${fadeIn} 0.3s ease-out;`}
`;

const Modal = styled.div`
  background: rgba(13, 21, 38, 0.95);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 32px;
  padding: 40px;
  width: 100%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.6);
  ${css`animation: ${scaleIn} 0.4s cubic-bezier(0.16, 1, 0.3, 1);`}
  position: relative;
  overflow: hidden;
`;

const StatusIcon = styled.div<{ type: 'pending' | 'success' | 'error' }>`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin: 0 auto 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  
  ${({ type }) => type === 'pending' && css`
    border: 3px solid rgba(59, 130, 246, 0.2);
    border-top-color: #3b82f6;
    animation: ${spin} 1s linear infinite;
  `}
  
  ${({ type }) => type === 'success' && css`
    background: rgba(34, 197, 94, 0.1);
    color: #4ade80;
    border: 2px solid rgba(34, 197, 94, 0.2);
  `}
  
  ${({ type }) => type === 'error' && css`
    background: rgba(239, 68, 68, 0.1);
    color: #f87171;
    border: 2px solid rgba(239, 68, 68, 0.2);
  `}
`;

const Title = styled.h3`
  font-size: 1.5rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 12px;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #94a3b8;
  line-height: 1.6;
  margin-bottom: 30px;
`;

const CloseButton = styled.button`
  background: #3b82f6;
  color: white;
  border: none;
  border-radius: 16px;
  padding: 14px 28px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;
  width: 100%;

  &:hover {
    background: #2563eb;
    transform: translateY(-1px);
  }
`;

interface PaymentOverlayProps {
  status: 'pending' | 'success' | 'error';
  message?: string;
  onClose?: () => void;
}

const PaymentOverlay: React.FC<PaymentOverlayProps> = ({ status, message, onClose }) => {
  return (
    <Overlay>
      <Modal>
        <StatusIcon type={status}>
          {status === 'pending' && ''}
          {status === 'success' && '✓'}
          {status === 'error' && '✕'}
        </StatusIcon>
        
        <Title>
          {status === 'pending' && 'Payment Pending'}
          {status === 'success' && 'Payment Successful'}
          {status === 'error' && 'Payment Failed'}
        </Title>
        
        <Description>
          {status === 'pending' && (message || 'Please check your phone for the M-Pesa STK Push and enter your PIN.')}
          {status === 'success' && (message || 'Your wallet has been updated successfully!')}
          {status === 'error' && (message || 'Transaction could not be completed. Please try again.')}
        </Description>

        {status !== 'pending' && onClose && (
          <CloseButton onClick={onClose}>
            Continue
          </CloseButton>
        )}
      </Modal>
    </Overlay>
  );
};

export default PaymentOverlay;
