"use client";
import React, { useEffect } from "react";
import styled, { keyframes, css } from "styled-components";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";
import { ShieldCheck, Lock, Globe } from 'lucide-react';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-15px); }
  100% { transform: translateY(0px); }
`;

const PageWrapper = styled.main`
  min-height: 100vh;
  background-color: #030712;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  padding: 24px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    width: 200%;
    height: 100%;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%);
    top: -50%;
  }
`;

const ContentCard = styled.div`
  background: rgba(15, 23, 42, 0.6);
  backdrop-filter: blur(25px);
  -webkit-backdrop-filter: blur(25px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 60px 40px;
  border-radius: 40px;
  text-align: center;
  max-width: 440px;
  width: 100%;
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.6);
  ${css`animation: ${fadeIn} 1.2s cubic-bezier(0.16, 1, 0.3, 1);`}
  position: relative;
  z-index: 2;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; width: 100%; height: 2px;
    background: linear-gradient(90deg, transparent, #3b82f6, transparent);
  }
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
  padding: 8px 20px;
  border-radius: 100px;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 32px;
  border: 1px solid rgba(59, 130, 246, 0.2);
`;

const Title = styled.h1`
  font-size: 3.8rem;
  font-weight: 900;
  margin-bottom: 12px;
  color: #ffffff;
  letter-spacing: -3px;
  line-height: 0.85;
  text-transform: uppercase;
  background: linear-gradient(180deg, #fff 0%, #94a3b8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
`;

const Description = styled.p`
  font-size: 1.05rem;
  color: #94a3b8;
  margin-bottom: 40px;
  line-height: 1.6;
  font-weight: 500;
`;

const CTAButton = styled.button`
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: #ffffff;
  border: none;
  padding: 22px 40px;
  border-radius: 20px;
  font-size: 1.1rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  width: 100%;
  text-transform: uppercase;
  letter-spacing: 2px;
  box-shadow: 0 15px 35px rgba(59, 130, 246, 0.25);

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 20px 45px rgba(59, 130, 246, 0.35);
  }

  &:active {
    transform: translateY(-1px);
  }
`;

const SecondaryButton = styled.button`
  background: transparent;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 18px 40px;
  border-radius: 20px;
  font-size: 0.95rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 16px;
  width: 100%;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

const SecurityBar = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-top: 48px;
  padding-top: 32px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
`;

const SecurityItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: #64748b;
  
  svg {
    width: 18px;
    height: 18px;
    opacity: 0.5;
  }
  
  span {
    font-size: 0.55rem;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: 1px;
  }
`;

export default function Landing() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/home");
    }
  }, [user, loading, router]);
  
  if (loading) return null;

  return (
    <PageWrapper>
      <ContentCard>
        <Badge>
          <ShieldCheck size={14} />
          Verified Rewards Platform
        </Badge>

        <LogoContainer>
          <Title>SHINDA<br/>PESA</Title>
        </LogoContainer>
        
        <Description>
          Experience the thrill of East Africa's premier rewards hub. 
          Spin the wheel and receive direct M-PESA payouts instantly.
        </Description>

        <CTAButton onClick={() => router.push("/login")}>
          Secure Sign In
        </CTAButton>
        <SecondaryButton onClick={() => router.push("/register")}>
          Create Account
        </SecondaryButton>
        
        <SecurityBar>
          <SecurityItem>
            <ShieldCheck />
            <span>Certified Fair</span>
          </SecurityItem>
          <SecurityItem>
            <Lock />
            <span>SSL Secured</span>
          </SecurityItem>
          <SecurityItem>
            <Globe />
            <span>PROUDLY KENYAN</span>
          </SecurityItem>
        </SecurityBar>
      </ContentCard>

      <div style={{ position: 'fixed', bottom: 30, opacity: 0.3, fontSize: '0.6rem', color: '#64748b', fontWeight: 600, letterSpacing: 1 }}>
        &copy; 2024 SHINDAPESA TECHNOLOGIES. ALL RIGHTS RESERVED.
      </div>
    </PageWrapper>
  );
}
