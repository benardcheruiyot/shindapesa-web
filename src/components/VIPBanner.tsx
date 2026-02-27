"use client";
import React from "react";
import styled from "styled-components";

const VIPLevel = styled.div`
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 24px 28px;
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
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
    color: var(--primary);
    font-style: italic;
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 6px;
    z-index: 1;
    span:first-child { 
      font-size: 0.8rem; 
      font-weight: 950; 
      color: #fbdf07; 
      text-transform: uppercase; 
      letter-spacing: 2px;
      display: flex;
      align-items: center;
      gap: 6px;
      &::before { content: '✦'; font-size: 0.7rem; }
    }
    span:last-child { font-size: 1.25rem; font-weight: 950; color: #ffffff; letter-spacing: -0.5px; }
  }

  .progress-container {
    text-align: right;
    z-index: 1;
  }

  .progress-label {
    font-size: 0.7rem;
    color: rgba(255, 255, 255, 0.5);
    font-weight: 800;
    margin-bottom: 8px;
    letter-spacing: 1px;
    span { color: var(--primary); font-weight: 950; }
  }

  .progress-bar {
    width: 160px;
    height: 8px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
    position: relative;
    overflow: hidden;
    
    &::after {
      content: '';
      position: absolute;
      top: 0; left: 0; bottom: 0;
      width: 84%;
      background: linear-gradient(to right, var(--primary), var(--primary-light));
      border-radius: 10px;
    }
  }

  @media (max-width: 600px) {
    padding: 16px 20px;
    .progress-bar { width: 100px; }
  }
`;

const ExclusiveTag = styled.span`
  background: rgba(59, 130, 246, 0.1);
  color: var(--primary-light);
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 0.6rem;
  font-weight: 950;
  margin-left: 8px;
  border: 1px solid rgba(59, 130, 246, 0.2);
`;

const VIPBanner = () => {
    return (
        <VIPLevel>
          <div className="info">
            <span>Spin Tier <ExclusiveTag>LUCKY PLAYER</ExclusiveTag></span>
            <span>Active Spinner</span>
          </div>
          <div className="progress-container">
            <div className="progress-label">WINNING STREAK: <span>84%</span></div>
            <div className="progress-bar" />
          </div>
        </VIPLevel>
    );
};

export default VIPBanner;
