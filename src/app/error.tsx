'use client';

import React, { useEffect } from 'react';
import styled from 'styled-components';

const ErrorWrapper = styled.div`
  min-height: 100vh;
  background: #0a0a0b;
  color: #ffffff;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px;
  text-align: center;
  font-family: 'Inter', sans-serif;
`;

const ErrorTitle = styled.h2`
  color: #d4af37;
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const RetryButton = styled.button`
  background: #d4af37;
  color: #fff;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  margin-top: 20px;
  
  &:hover {
    background: #fff;
  }
`;

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled Error:', error);
  }, [error]);

  return (
    <ErrorWrapper>
      <ErrorTitle>Something went wrong!</ErrorTitle>
      <p>We apologize for the inconvenience. Our team has been notified.</p>
      <p style={{ opacity: 0.6, fontSize: '0.9rem', marginTop: '10px' }}>
        {error.message || 'An unexpected error occurred.'}
      </p>
      <RetryButton onClick={() => reset()}>Try Again</RetryButton>
    </ErrorWrapper>
  );
}
