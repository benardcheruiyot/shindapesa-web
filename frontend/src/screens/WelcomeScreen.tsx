
"use client";
import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { css } from 'styled-components';
import { useRouter } from 'next/navigation';
import { ShieldCheck } from 'lucide-react';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const Container = styled.div`
  min-height: 100vh;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  position: relative;
  overflow: hidden;
  color: #ffffff;
`;

const FloatingElement = styled.div<{ $top: string; $left: string; $duration: string }>`
  position: absolute;
  top: ${props => props.$top};
  left: ${props => props.$left};
  width: 15vw;
  height: 15vw;
  background: radial-gradient(circle, rgba(0, 91, 170, 0.08) 0%, transparent 70%);
  border-radius: 50%;
  ${({ $duration }) => css`animation: ${float} ${$duration} ease-in-out infinite;`}
  pointer-events: none;
`;

const Content = styled.div`
  width: 100%;
  max-width: 440px;
  text-align: center;
  z-index: 2;
  ${css`animation: ${fadeIn} 0.8s ease-out;`}
`;

const LogoContainer = styled.div`
  position: relative;
  margin-bottom: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const GlowRing = styled.div`
  position: absolute;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  border: 1px solid rgba(59, 130, 246, 0.2);
  ${css`animation: ${spin} 12s linear infinite;`}
  &:before {
    content: '';
    position: absolute;
    top: -4px;
    left: 50%;
    width: 8px;
    height: 8px;
    background: #3b82f6;
    border-radius: 50%;
    box-shadow: 0 0 10px #3b82f6;
  }
`;

const LogoBody = styled.div`
  width: 100px;
  height: 100px;
  background: rgba(13, 21, 38, 0.4);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  transform: rotate(-5deg);
`;

const Title = styled.h1`
  font-size: 3.5rem;
  font-weight: 800;
  margin-bottom: 8px;
  letter-spacing: -0.04em;
  color: #ffffff;
  text-transform: uppercase;
`;

const Subtitle = styled.div`
  font-size: 1rem;
  color: #3b82f6;
  font-weight: 700;
  margin-bottom: 40px;
  text-transform: uppercase;
  letter-spacing: 0.1em;
`;

const LoadingText = styled.div`
  margin-top: 20px;
  font-size: 0.8rem;
  font-weight: 600;
  color: #64748b;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const SystemLog = styled.div`
  background: rgba(13, 21, 38, 0.4);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 16px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  color: #64748b;
  text-align: left;
  width: 100%;
  margin-top: 32px;
`;

const LogEntry = styled.div`
  margin-bottom: 6px;
  span { color: #22c55e; }
`;

const Spinner = styled.div`
  width: 32px;
  height: 32px;
  border: 3px solid rgba(59, 130, 246, 0.1);
  border-top-color: #3b82f6;
  border-radius: 50%;
  ${css`animation: ${spin} 0.8s linear infinite;`}
  margin: 0 auto;
`;

const WelcomeScreen = () => {
  const router = useRouter();
  const [logIndex, setLogIndex] = useState(0);
  const logs = [
    "INITIALIZING SAPPHIRE CORE...",
    "CONNECTING TO B3-HUB GATEWAY...",
    "VERIFYING MPESA NODE HANDSHAKE...",
    "FETCHING USER PRESTIGE DATA...",
    "SYSTEM SECURE - READY"
  ];

  useEffect(() => {
    const logInterval = setInterval(() => {
      setLogIndex(prev => (prev < logs.length - 1 ? prev + 1 : prev));
    }, 600);

    const timer = setTimeout(() => {
      const savedUser = localStorage.getItem('shindapesa_user');
      router.push(savedUser ? '/home' : '/');
    }, 3200);

    return () => {
      clearInterval(logInterval);
      clearTimeout(timer);
    };
  }, [router, logs.length]);

  return (
    <Container>
      <FloatingElement $top="10%" $left="15%" $duration="6s" />
      <FloatingElement $top="75%" $left="80%" $duration="8s" />
      
      <Content>
        <LogoContainer>
          <GlowRing />
          <LogoBody>
            <ShieldCheck size={50} color="#ffffff" fill="#ffffff" />
          </LogoBody>
        </LogoContainer>

        <Title>SHINDAPESA</Title>
        <Subtitle>Sapphire Tier Active</Subtitle>

        <div style={{marginTop: 40}}>
          <Spinner />
          <LoadingText>Syncing Secure Hub</LoadingText>
        </div>

        <SystemLog>
          {logs.slice(0, logIndex + 1).map((log, i) => (
            <LogEntry key={i}>
              [<span>OK</span>] {log}
            </LogEntry>
          ))}
        </SystemLog>
      </Content>
    </Container>
  );
};

export default WelcomeScreen;


