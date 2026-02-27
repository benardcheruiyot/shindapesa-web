"use client";
import React from "react";
import { useRouter } from "next/navigation";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
`;

const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: #0a0a0b;
  color: #ffffff;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  padding: 100px 20px 60px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 24px;
  @media (max-width: 850px) {
    grid-template-columns: 1fr;
  }
`;

const MainCard = styled.div`
  background: rgba(24, 24, 27, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 40px;
  animation: ${fadeIn} 0.6s ease-out;
  position: relative;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; width: 100%; height: 4px;
    background: linear-gradient(90deg, #d4af37, #fef08a, #d4af37);
  }
`;

const SidebarCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 900;
  margin-bottom: 8px;
  color: #fff;
  letter-spacing: -0.5px;
`;

const Description = styled.p`
  font-size: 0.95rem;
  line-height: 1.6;
  color: #94a3b8;
  margin-bottom: 30px;
`;

const CodeBox = styled.div`
  background: rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 24px;
  text-align: center;
  position: relative;
`;

const CodeLabel = styled.div`
  font-size: 0.6rem;
  color: #d4af37;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin-bottom: 8px;
  font-weight: 800;
`;

const CodeText = styled.div`
  font-size: 1.8rem;
  font-weight: 950;
  color: #fff;
  letter-spacing: 2px;
`;

const ShareButton = styled.button`
  width: 100%;
  background: linear-gradient(90deg, #d4af37, #fef08a, #d4af37);
  color: #000;
  border: none;
  border-radius: 12px;
  padding: 18px;
  font-weight: 900;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 10px 30px rgba(212, 175, 55, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 40px rgba(212, 175, 55, 0.3);
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
`;

const StatCard = styled.div`
  background: rgba(24, 24, 27, 0.7);
  padding: 20px;
  border-radius: 12px;
  text-align: left;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

const StatValue = styled.div`
  font-size: 1.2rem;
  font-weight: 900;
  color: #fff;
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font-size: 0.65rem;
  color: #94a3b8;
  font-weight: 700;
  text-transform: uppercase;
`;

const PayoutTier = styled.div`
  padding: 12px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.85rem;
`;

export default function Referral() {
  const router = useRouter();
  const [referralCode, setReferralCode] = React.useState("SHINDA99");
  const [currentUser, setCurrentUser] = React.useState<any>(null);

  React.useEffect(() => {
    const savedName = localStorage.getItem("userName");
    if (savedName) {
      setReferralCode(savedName.toUpperCase());
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find((u: any) => u.username === savedName);
      if (user) setCurrentUser(user);
    }
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    alert('Referral code copied to clipboard!');
  };

  return (
    <PageWrapper>
      <div style={{ width: '100%', maxWidth: 1000, display: 'flex', alignItems: 'center', marginBottom: 30, justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#ffffff' }} onClick={() => router.push('/home')}>
             &larr;
          </div>
          <div style={{ fontWeight: 950, fontSize: '1.2rem' }}>INVITE & WIN</div>
        </div>
        <div style={{ fontSize: '0.7rem', color: '#4ade80', fontWeight: 900, background: 'rgba(74, 222, 128, 0.05)', padding: '6px 12px', borderRadius: '100px', border: '1px solid rgba(74, 222, 128, 0.2)' }}>
          ● LIVE
        </div>
      </div>

      <ContentContainer>
        <MainCard>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
             <div style={{ width: 40, height: 2, background: '#d4af37' }} />
             <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#d4af37', letterSpacing: '2px' }}>REFERRAL DASHBOARD</div>
          </div>
          <Title>Invite Friends & Win</Title>
          <Description>
            Share your unique referral code with friends and earn KES 100 for every friend who joins and activates their account.
          </Description>

          <CodeBox>
            <CodeLabel>Your Referral Code</CodeLabel>
            <CodeText>{referralCode}</CodeText>
          </CodeBox>

          <ShareButton onClick={handleCopy}>
            Copy Referral Code
          </ShareButton>
          
          <div style={{ marginTop: '30px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
             <div style={{ fontSize: '0.7rem', fontWeight: 900, color: '#94a3b8', textTransform: 'uppercase' }}>Affiliate Rewards</div>
             <PayoutTier>
                <span>Direct Referral</span>
                <span style={{ color: '#4ade80', fontWeight: 800 }}>KES 100.00</span>
             </PayoutTier>
             <PayoutTier>
                <span>Team Bonus</span>
                <span style={{ color: '#4ade80', fontWeight: 800 }}>KES 50.00</span>
             </PayoutTier>
          </div>
        </MainCard>

        <SidebarCard>
          <StatsGrid>
            <StatCard>
              <StatLabel>Direct Partners</StatLabel>
              <StatValue>{currentUser?.referrals?.length || 0}</StatValue>
            </StatCard>
            <StatCard>
              <StatLabel>Network Reach</StatLabel>
              <StatValue>{(currentUser?.referrals?.length || 0) * 3}</StatValue>
            </StatCard>
          </StatsGrid>
          
          <StatCard style={{ textAlign: 'center' }}>
             <StatLabel>Total Commissions</StatLabel>
             <StatValue style={{ fontSize: '2rem', color: '#d4af37' }}>KES {Number(currentUser?.referralCredits || 0).toLocaleString()}.00</StatValue>
          </StatCard>

          <div style={{ background: 'rgba(24, 24, 27, 0.7)', padding: '24px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 4px 15px rgba(0,0,0,0.2)' }}>
             <div style={{ fontWeight: 800, fontSize: '0.9rem', marginBottom: '15px' }}>Instant Settlement</div>
             <div style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: '1.6' }}>
                All alliance commissions are settled instantly into your core wallet upon partner verification. 
                <br/><br/>
                <span style={{ color: '#d4af37' }}>✓ M-PESA Integrated</span><br/>
                <span style={{ color: '#d4af37' }}>✓ 24/7 Tracking</span>
             </div>
          </div>
        </SidebarCard>
      </ContentContainer>
    </PageWrapper>
  );
}

