"use client";
import React from "react";
import styled, { keyframes } from "styled-components";

const scroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
`;

const TickerWrapper = styled.div`
  background: rgba(15, 23, 42, 0.7);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding: 8px 0;
  overflow: hidden;
  white-space: nowrap;
  font-size: 0.8rem;
  color: #ffffff;
  font-weight: 700;
  position: relative;
  z-index: 5;
`;

const TickerContent = styled.div`
  display: inline-block;
  animation: ${scroll} 80s linear infinite;
  padding-left: 100%;
`;

interface WinnersTickerProps {
  winners: string[];
}

const WinnersTicker = ({ winners }: WinnersTickerProps) => {
  const content = winners.join("");
  return (
    <TickerWrapper>
      <TickerContent>
        {content}{content}
      </TickerContent>
    </TickerWrapper>
  );
};

export default WinnersTicker;
