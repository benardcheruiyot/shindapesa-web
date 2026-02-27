"use client";
import React from "react";
import styled from "styled-components";

const VIPLevel = styled.div`
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 24px;
  padding: 24px 28px;
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.4);
  position: relative;
  overflow: hidden;

  &::before {
    content: 'VIP';
    position: absolute;
    right: -10px;
    top: -10px;
    font-size: 5rem;
    font-weight: 950;
    opacity: 0.05;
    color: #3b82f6;
    font-style: italic;
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 6px;
    z-index: 1;
    span:first-child { 
      font-size: 0.75rem; 
      font-weight: 800; 
      color: #3b82f6; 
      text-transform: uppercase; 
      letter-spacing: 2px;
      display: flex;
      align-items: center;
      gap: 6px;
      &::before { content: '?'; font-size: 0.7rem; }
    }
    span:last-child { font-size: 1.25rem; font-weight: 900; color: #ffffff; letter-spacing: -0.5px; }
  }

  .progress-container {
    text-align: right;
    z-index: 1;
  }

  .progress-label {
    font-size: 0.7rem;
    color: #94a3b8;
    font-weight: 700;
    margin-bottom: 8px;
    letter-spacing: 1px;
    span { color: #ffffff; font-weight: 800; }
  }

  .progress-bar {
    width: 160px;
    height: 6px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
    position: relative;
    overflow: hidden;
    
    &::after {
      content: '';
      position: absolute;
      top: 0; left: 0; bottom: 0;
      width: 84%;
      background: linear-gradient(to right, #3b82f6, #60a5fa);
      border-radius: 10px;
    }
  }

  @media (max-width: 600px) {
    padding: 16px 20px;
    .progress-bar { width: 100px; }
  }
`;

const VIPBanner = () => {
    return (
        <VIPLevel>
            <div className="info">
                <span>Current Status</span>
                <span>Sapphire VIP Elite</span>
            </div>
            <div className="progress-container">
                <div className="progress-label">Next Tier: <span>Diamond</span></div>
                <div className="progress-bar"></div>
            </div>
        </VIPLevel>
    );
};

export default VIPBanner;
