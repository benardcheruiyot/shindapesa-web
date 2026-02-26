
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
  background: linear-gradient(135deg, #001f3f 0%, #003366 50%, #1851a3 100%);
`;

export default function LandingPage() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push("/home");
    }
  }, [user, loading, router]);
  
  if (loading) return null;
  if (user) return null; // Let the redirect happen

  return (
    <PageWrapper>
      {/* Rest of the landing page code... */}
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  overflow-x: hidden;
  padding: 20px;
`;

const ContentCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 60px 40px;
  border-radius: 32px;
  text-align: center;
  max-width: 480px;
  width: 100%;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  animation: ${fadeIn} 1s ease-out;
`;

const LogoContainer = styled.div`
  margin-bottom: 30px;
  animation: ${float} 3s ease-in-out infinite;
`;

const LogoEmoji = styled.div`
  font-size: 80px;
  margin-bottom: 10px;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 900;
  margin-bottom: 16px;
  background: linear-gradient(to right, #ffffff, #ffe066);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  line-height: 1.1;
`;

const Description = styled.p`
  font-size: 1.25rem;
  line-height: 1.6;
  color: #ccd6f6;
  margin-bottom: 40px;
  font-weight: 400;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
`;

const PrimaryButton = styled(Link)`
  background: #ffe066;
  color: #001f3f;
  padding: 18px;
  border-radius: 16px;
  font-weight: 800;
  font-size: 1.15rem;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 10px 20px -5px rgba(255, 224, 102, 0.3);

  &:hover {
    transform: scale(1.03);
    box-shadow: 0 15px 30px -5px rgba(255, 224, 102, 0.4);
    background: #fff;
  }
`;

const SecondaryButton = styled(Link)`
  background: transparent;
  color: #fff;
  padding: 18px;
  border-radius: 16px;
  font-weight: 700;
  font-size: 1.15rem;
  text-decoration: none;
  border: 2px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.5);
  }
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: 40px;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Footer = styled.footer`
  margin-top: 60px;
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.95rem;
  font-weight: 500;
`;

export default function Landing() {
  return (
    <PageWrapper>
      <ContentCard>
        <LogoContainer>
          <LogoEmoji>💰</LogoEmoji>
        </LogoContainer>
        
        <Title>ShindaPesa</Title>
        <Description>
          The ultimate platform to spin, win, and grow your wealth. Join over 50k+ active winners today!
        </Description>
        
        <ButtonContainer>
          <PrimaryButton href="/register">Create Your Account</PrimaryButton>
          <SecondaryButton href="/login">Sign In Instead</SecondaryButton>
        </ButtonContainer>

        <StatsContainer>
          <StatItem><span>✅</span> Licensed</StatItem>
          <StatItem><span>🚀</span> Instant Payouts</StatItem>
          <StatItem><span>🔒</span> Secure</StatItem>
        </StatsContainer>
      </ContentCard>
      
      <Footer>© 2026 ShindaPesa Kenya. Play Responsibly.</Footer>
    </PageWrapper>
  );
}
