"use client";
import React from "react";
import styled from "styled-components";

const TrustContainer = styled.div`
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 32px;
  border-radius: 24px;
  text-align: center;
  margin-top: 60px;

  .title {
    font-size: 0.75rem;
    font-weight: 950;
    color: rgba(255, 255, 255, 0.4);
    text-transform: uppercase;
    letter-spacing: 3px;
    margin-bottom: 24px;
  }

  .logos {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
    
    @media (min-width: 600px) {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  .logos > div {
    background: rgba(255, 255, 255, 0.03);
    padding: 16px;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.05);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
  }

  .badge {
    font-size: 0.55rem;
    font-weight: 900;
    color: rgba(255, 255, 255, 0.6);
  }
`;

const TrustSection = () => {
    return (
        <TrustContainer>
          <div className="title">Official Partners & Security</div>
          <div className="logos">
            <div>
              <span style={{ fontSize: '1.8rem' }}>🛡️</span>
              <span className="badge">BCLB LICENSED</span>
            </div>
            <div>
              <span style={{ fontSize: '1.8rem' }}>💳</span>
              <span className="badge">MPESA SECURE</span>
            </div>
            <div>
              <span style={{ fontSize: '1.8rem' }}>🔞</span>
              <span className="badge">18+ ONLY</span>
            </div>
            <div>
              <span style={{ fontSize: '1.8rem' }}>🎮</span>
              <span className="badge">GAMING LICENSE</span>
            </div>
          </div>
          <div style={{ marginTop: 25, color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '1px', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span>REGULATED BY THE BETTING CONTROL AND LICENSING BOARD • LICENSE NO. 0000452</span>
            <span style={{ color: '#ff4d4d', opacity: 0.8 }}>⚠ RESPONSIBLE GAMING: PLAY WISELY.</span>
          </div>
        </TrustContainer>
    );
};

export default TrustSection;
