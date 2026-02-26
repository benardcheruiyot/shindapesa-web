'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const LoaderWrapper = styled.div`
  min-height: 100vh;
  background: #001f3f;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(255, 224, 102, 0.1);
  border-top: 5px solid #ffe066;
  border-radius: 50%;
  animation: ${rotate} 1s linear infinite;
`;

const Text = styled.p`
  color: #ffe066;
  margin-top: 20px;
  font-weight: 600;
  letter-spacing: 1px;
`;

export default function Loading() {
  return (
    <LoaderWrapper>
      <Spinner />
      <Text>SHINDAPESA</Text>
    </LoaderWrapper>
  );
}
