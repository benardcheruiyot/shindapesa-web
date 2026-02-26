
"use client";
import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useRouter } from 'next/navigation';

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
  background: radial-gradient(circle at top right, #1851a3, #001f3f 60%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  position: relative;
  overflow: hidden;
  color: #fff;
`;

const FloatingElement = styled.div<{ $top: string; $left: string; $duration: string }>`
  position: absolute;
  top: ${props => props.$top};
  left: ${props => props.$left};
  width: 15vw;
  height: 15vw;
  background: radial-gradient(circle, rgba(255,224,102,0.1) 0%, transparent 70%);
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
  border: 2px solid rgba(255,224,102,0.2);
  animation: ${spin} 8s linear infinite;
  &:before {
    content: '';
    position: absolute;
    top: -5px;
    left: 50%;
    width: 10px;
    height: 10px;
    background: #ffe066;
    border-radius: 50%;
    box-shadow: 0 0 15px #ffe066;
  }
`;

const LogoBody = styled.div`
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #ffe066, #ffc107);
  border-radius: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 20px 40px rgba(0,0,0,0.3);
  transform: rotate(-10deg);
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 900;
  margin-bottom: 8px;
  letter-spacing: -1px;
  background: linear-gradient(to right, #fff, #ffe066);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.div`
  font-size: 1.25rem;
  color: rgba(255,255,255,0.7);
  font-weight: 500;
  margin-bottom: 40px;
`;

const LoadingText = styled.div`
  margin-top: 20px;
  font-size: 0.9rem;
  font-weight: 700;
  color: rgba(255,255,255,0.4);
  letter-spacing: 3px;
  text-transform: uppercase;
`;

const Spinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid rgba(255,255,255,0.05);
  border-top-color: #ffe066;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  margin: 0 auto;
`;

const WelcomeScreen = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push('/landing');
    }, 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <Container>
      <FloatingElement $top="10%" $left="15%" $duration="6s" />
      <FloatingElement $top="75%" $left="80%" $duration="8s" />
      
      <Content>
        <LogoContainer>
          <GlowRing />
          <LogoBody>
            <span style={{fontSize:'2.5rem', color:'#001f3f', fontWeight:900}}>K</span>
          </LogoBody>
        </LogoContainer>

        <Title>ShindaPesa</Title>
        <Subtitle>East Africa's Premium Rewards</Subtitle>

        <div style={{marginTop: 40}}>
          <Spinner />
          <LoadingText>Securing Portal...</LoadingText>
        </div>
      </Content>
    </Container>
  );
};

export default WelcomeScreen;


