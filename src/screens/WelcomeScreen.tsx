
"use client";
import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
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
  animation: ${float} ${props => props.$duration} ease-in-out infinite;
  pointer-events: none;
`;

const Content = styled.div`
  width: 100%;
  max-width: 440px;
  text-align: center;
  z-index: 2;
  animation: ${fadeIn} 0.8s ease-out;
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
  border: 4px solid rgba(245, 158, 11, 0.2);
  animation: ${spin} 8s linear infinite;
  &:before {
    content: '';
    position: absolute;
    top: -5px;
    left: 50%;
    width: 12px;
    height: 12px;
    background: #f59e0b;
    border-radius: 50%;
  }
`;

const LogoBody = styled.div`
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #f59e0b, #b45309);
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 30px rgba(245, 158, 11, 0.3);
  transform: rotate(-10deg);
`;

const Title = styled.h1`
  font-size: 3.2rem;
  font-weight: 950;
  margin-bottom: 8px;
  letter-spacing: -2px;
  color: #ffffff;
  text-transform: uppercase;
`;

const Subtitle = styled.div`
  font-size: 1.1rem;
  color: #f59e0b;
  font-weight: 950;
  margin-bottom: 40px;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const LoadingText = styled.div`
  margin-top: 20px;
  font-size: 0.9rem;
  font-weight: 700;
  color: #aaa;
  letter-spacing: 3px;
  text-transform: uppercase;
`;

const SystemLog = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  padding: 12px;
  font-family: monospace;
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.3);
  text-align: left;
  width: 100%;
  margin-top: 32px;
`;

const LogEntry = styled.div`
  margin-bottom: 4px;
  span { color: #39b54a; }
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255, 255, 255, 0.1);
  border-top-color: #f59e0b;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
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


