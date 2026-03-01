"use client";
import React from "react";
import styled, { keyframes, css } from "styled-components";

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
  font-size: 0.85rem;
  color: #ffffff;
  font-weight: 700;
  position: relative;
  z-index: 5;
  display: flex;
  align-items: center;

  @media (max-width: 600px) {
    font-size: 0.75rem;
    padding: 6px 0;
  }

  &::before {
    content: 'LIVE PAYOUTS';
    background: #3b82f6;
    color: white;
    font-size: 0.55rem;
    font-weight: 900;
    padding: 4px 8px;
    margin-right: 12px;
    border-radius: 4px;
    flex-shrink: 0;
    z-index: 10;
    box-shadow: 4px 0 10px rgba(0,0,0,0.3);
  }
`;

const TickerContent = styled.div`
  display: inline-block;
  ${css`animation: ${scroll} 80s linear infinite;`}
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
