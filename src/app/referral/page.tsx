"use client";
import React from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { useUser } from "@/context/UserContext";
import { PageWrapper, fadeIn, BackHeader, PrimaryButton } from "@/components/SharedStyles";

const ContentContainer = styled.div`
  width: 92vw;
  max-width: 1000px;
  display: grid;
  grid-template-columns: 1.25fr 1fr;
  gap: 24px;
  margin-top: 80px;
  margin-bottom: 120px;
  animation: ${fadeIn} 0.8s cubic-bezier(0.16, 1, 0.3, 1);

  @media (max-width: 850px) {
    grid-template-columns: 1fr;
    margin-top: 60px;
  }
`;

const MainCard = styled.div`
  background: rgba(17, 24, 39, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 32px;
  padding: 40px;
  position: relative;
  overflow: hidden;
  box-shadow: 
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    inset 0 1px 1px rgba(255, 255, 255, 0.05);

  &::after {
    content: "";
    position: absolute;
    top: 0; left: 0; width: 100%; height: 2px;
    background: linear-gradient(90deg, transparent, #3b82f6, transparent);
    opacity: 0.5;
  }
`;

const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 12px;
  color: #fff;
  letter-spacing: -0.02em;
  background: linear-gradient(to right, #fff, #94a3b8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Description = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: #94a3b8;
  margin-bottom: 32px;
  font-weight: 500;
`;

const CodeBox = styled.div`
  background: rgba(0, 0, 0, 0.3);
  border: 2px dashed rgba(59, 130, 246, 0.3);
  border-radius: 20px;
  padding: 32px;
  margin-bottom: 24px;
  text-align: center;
  position: relative;
  transition: all 0.3s ease;

  &:hover {
    border-color: #3b82f6;
    background: rgba(0, 0, 0, 0.4);
  }
`;

const CodeLabel = styled.div`
  font-size: 0.65rem;
  color: #3b82f6;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 8px;
  font-weight: 800;
`;

const CodeText = styled.div`
  font-size: 2rem;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: 4px;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

const StatCard = styled.div`
  background: rgba(17, 24, 39, 0.5);
  padding: 24px;
  border-radius: 20px;
  text-align: left;
  border: 1px solid rgba(255, 255, 255, 0.05);
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(59, 130, 246, 0.2);
    transform: translateY(-2px);
  }
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font-size: 0.65rem;
  color: #64748b;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const PayoutTier = styled.div`
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.03);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: #e2e8f0;

  span:first-child { font-weight: 600; color: #94a3b8; }
  span:last-child { font-weight: 800; color: #22c55e; }
`;

export default function Referral() {
  const router = useRouter();
  const { user, loading } = useUser();
  const [referralCode, setReferralCode] = React.useState("SHINDA99");

  React.useEffect(() => {
    if (user?.username) {
      setReferralCode(user.username.toUpperCase());
    }
  }, [user]);

  const copyLink = () => {
    const baseUrl = window.location.origin;
    navigator.clipboard.writeText(`${baseUrl}/register?ref=${referralCode}`);
    alert("Referral link copied to clipboard!");
  };

  if (loading || !user) return null;

  return (
    <PageWrapper>
      <BackHeader title="Affiliate Dashboard" onBack={() => router.push("/home")} />

      <ContentContainer>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <MainCard>
            <Title>Build Your Network</Title>
            <Description>
              Earn performance-based commissions by expanding the ShindaPesa ecosystem. 
              Our multi-tier settlement protocol ensures you receive rewards for every activation.
            </Description>
            
            <CodeBox>
              <CodeLabel>Your Unique Access Node</CodeLabel>
              <CodeText>{referralCode}</CodeText>
            </CodeBox>

            <PrimaryButton onClick={copyLink}>
              Generate Secure Invite Link
            </PrimaryButton>

            <div style={{ marginTop: "32px" }}>
              <div style={{ fontSize: "0.7rem", fontWeight: 800, color: "#3b82f6", textTransform: "uppercase", letterSpacing: "2px", marginBottom: "16px" }}>
                Commission Structure
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <PayoutTier>
                  <span>Tier 1 Activation</span>
                  <span>KES 50.00</span>
                </PayoutTier>
                <PayoutTier>
                  <span>Network Spin Bonus</span>
                  <span>5% Volume</span>
                </PayoutTier>
              </div>
            </div>
          </MainCard>
        </div>

        <SidebarContainer>
          <div style={{ fontWeight: 800, fontSize: "0.7rem", letterSpacing: "2px", color: "#3b82f6", textTransform: "uppercase" }}>Network Statistics</div>
          <StatsGrid>
            <StatCard>
              <StatValue>{user.referralCredits || 0}</StatValue>
              <StatLabel>Activations</StatLabel>
            </StatCard>
            <StatCard>
              <StatValue>KES {(user.referralCredits || 0) * 50}</StatValue>
              <StatLabel>Total Earned</StatLabel>
            </StatCard>
          </StatsGrid>

          <div style={{ 
            marginTop: "8px",
            padding: "24px", 
            background: "rgba(17, 24, 39, 0.5)", 
            borderRadius: "24px", 
            border: "1px solid rgba(255, 255, 255, 0.05)" 
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <div style={{ fontSize: "1.2rem" }}>??</div>
              <div style={{ fontWeight: 800, fontSize: "0.9rem", color: "#ffffff" }}>Sapphire Affiliate</div>
            </div>
            <div style={{ fontSize: "0.75rem", color: "#94a3b8", lineHeight: "1.6", fontWeight: 500 }}>
              You are currently on the <b style={{color: "#3b82f6"}}>Base Tier</b>. Reach 20 activations to unlock 
              <b style={{color: "#ffffff"}}> Platinum Commission</b> rates.
            </div>
          </div>
        </SidebarContainer>
      </ContentContainer>
    </PageWrapper>
  );
}
