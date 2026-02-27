"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import styled, { keyframes } from "styled-components";
import { useRouter } from "next/navigation";
import { useUser } from "@/hooks/useUser";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const PageWrapper = styled.main`
  min-height: 100vh;
  background-color: #0a0a0b;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  overflow-x: hidden;
  padding: 20px;
  background-image: 
    radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.05) 0%, transparent 50%);
`;

const ContentCard = styled.div`
  background: rgba(24, 24, 27, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 60px 40px;
  border-radius: 24px;
  text-align: center;
  max-width: 440px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.6);
  animation: ${fadeIn} 1s ease-out;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; width: 100%; height: 4px;
    background: linear-gradient(90deg, #d4af37, #fef08a, #d4af37);
  }
`;

const Title = styled.h1`
  font-size: 3.2rem;
  font-weight: 950;
  margin-bottom: 8px;
  color: #ffffff;
  letter-spacing: -2px;
  line-height: 1;
`;

const descriptionStyle = {
  fontSize: '1rem',
  color: 'rgba(255, 255, 255, 0.7)',
  marginBottom: '40px',
  lineHeight: '1.6'
};

const LogoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 24px;
  animation: ${float} 6s ease-in-out infinite;
`;

const CTAButton = styled.button`
  background: linear-gradient(135deg, #d4af37 0%, #a18412 100%);
  color: #fff;
  border: none;
  padding: 20px 40px;
  border-radius: 12px;
  font-size: 1.1rem;
  font-weight: 950;
  cursor: pointer;
  transition: all 0.3s;
  width: 100%;
  margin-top: 20px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  box-shadow: 0 10px 20px rgba(212, 175, 55, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 30px rgba(212, 175, 55, 0.3);
    filter: brightness(1.1);
  }
`;

const SecondaryButton = styled.button`
  background: transparent;
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 16px 40px;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 16px;
  width: 100%;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const Badge = styled.div`
  display: inline-block;
  background: rgba(212, 175, 55, 0.1);
  color: #d4af37;
  padding: 6px 16px;
  border-radius: 100px;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 24px;
  border: 1px solid rgba(212, 175, 55, 0.2);
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
        <Badge>SHINDAPESA</Badge>
        <LogoContainer>
          <div style={{ color: '#ffffff', fontSize: '3.5rem', fontWeight: 950, letterSpacing: -3 }}>
            SHINDAPESA
          </div>
        </LogoContainer>
        
        <p style={descriptionStyle as any}>
          Welcome to the premier rewards platform in East Africa. 
          Experience the thrill of the wheel and secure instant cash payouts directly to your M-PESA.
        </p>

        <CTAButton onClick={() => router.push("/login")}>
          Secure Sign In
        </CTAButton>
        <SecondaryButton onClick={() => router.push("/register")}>
          Activate & Win
        </SecondaryButton>
        
        <div style={{ marginTop: 40, fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', fontWeight: 700, letterSpacing: 1.5 }}>
           CERTIFIED FAIR • SSL ENCRYPTED • INSTANT PAYOUTS
        </div>
      </ContentCard>
    </PageWrapper>
  );
}
