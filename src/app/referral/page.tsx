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
  background: linear-gradient(135deg, #001f3f 0%, #003366 50%, #1851a3 100%);
  color: #fff;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  padding: 80px 20px 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HeaderBar = styled.div`
  width: 100vw;
  height: 60px;
  background: rgba(0, 31, 63, 0.8);
  backdrop-filter: blur(10px);
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const BackArrow = styled.span`
  font-size: 1.5rem;
  margin-right: 15px;
  cursor: pointer;
  transition: transform 0.2s;
  &:hover {
    transform: translateX(-3px);
  }
`;

const HeaderTitle = styled.span`
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 0.5px;
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 32px;
  margin-top: 40px;
`;

const MainCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 32px;
  padding: 48px;
  text-align: left;
  animation: ${fadeIn} 0.6s ease-out;
`;

const SidebarCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: 800;
  margin-bottom: 12px;
  background: linear-gradient(to right, #fff, #ffe066);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Description = styled.p`
  font-size: 1.05rem;
  line-height: 1.6;
  color: #ccd6f6;
  margin-bottom: 32px;
`;

const CodeBox = styled.div`
  background: rgba(0, 0, 0, 0.2);
  border: 1px dashed rgba(255, 224, 102, 0.3);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 24px;
  text-align: center;
`;

const CodeLabel = styled.div`
  font-size: 0.8rem;
  color: rgba(255, 224, 102, 0.7);
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 8px;
  font-weight: 700;
`;

const CodeText = styled.div`
  font-size: 2rem;
  font-weight: 900;
  color: #fff;
  letter-spacing: 4px;
`;

const ShareButton = styled.button`
  width: 100%;
  background: #ffe066;
  color: #001f3f;
  border: none;
  border-radius: 12px;
  padding: 18px;
  font-weight: 800;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 10px 20px -5px rgba(255, 224, 102, 0.2);

  &:hover {
    transform: translateY(-2px);
    background: #fff;
  }
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
`;

const StatCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  padding: 20px 10px;
  border-radius: 16px;
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 1.4rem;
  font-weight: 800;
  color: #ffe066;
  margin-bottom: 4px;
`;

const StatLabel = styled.div`
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.4);
  font-weight: 600;
`;

export default function Referral() {
  const router = useRouter();
  const [referralCode, setReferralCode] = React.useState("SHINDA99");
  const [totalClicks, setTotalClicks] = React.useState(0);
  const [currentUser, setCurrentUser] = React.useState<any>(null);

  React.useEffect(() => {
    const savedName = localStorage.getItem("userName");
    if (savedName) {
      setReferralCode(savedName);
      
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      const user = users.find((u: any) => u.username === savedName);
      if (user) {
        setCurrentUser(user);
        setTotalClicks(user.clicks || 0);
      }
    }
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(referralCode);
    alert('Referral code copied!');
  };

  const recentReferrals = [
    { name: 'John D.', date: '2 hours ago', status: 'Active' },
    { name: 'Sarah K.', date: '5 hours ago', status: 'Pending' },
    { name: 'Mike O.', date: '1 day ago', status: 'Active' },
  ];

  return (
    <PageWrapper>
      <div style={{ width: '100%', maxWidth: 1200, display: 'flex', alignItems: 'center', marginBottom: 20 }}>
        <div style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', marginRight: 20 }} onClick={() => router.push('/home')}>
           ←
        </div>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 900 }}>Partnership Program</h1>
      </div>

      <ContentContainer>
        <MainCard>
          <div style={{ fontSize: '3rem', marginBottom: 20 }}>🤝</div>
          <Title>Scale Your Earnings</Title>
          <Description>
            Join our elite partnership program. Share your unique code with your network and earn <b>KES 100</b> for every verified activation.
          </Description>

          <CodeBox>
            <CodeLabel>Your Exclusive Partner Code</CodeLabel>
            <CodeText>{referralCode}</CodeText>
          </CodeBox>

          <ShareButton onClick={handleCopy}>Copy Code & Share</ShareButton>
          
          <div style={{ marginTop: 40 }}>
             <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 16 }}>Program Benefits:</h3>
             <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: 12 }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.95rem', color: 'rgba(255,255,255,0.7)' }}>
                   <span style={{ color: '#ffe066' }}>✔</span> Instant KES 100 upon activation
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.95rem', color: 'rgba(255,255,255,0.7)' }}>
                   <span style={{ color: '#ffe066' }}>✔</span> Multi-tier bonus potential
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: '0.95rem', color: 'rgba(255,255,255,0.7)' }}>
                   <span style={{ color: '#ffe066' }}>✔</span> Real-time performance tracking
                </li>
             </ul>
          </div>
        </MainCard>

        <SidebarCard>
          <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 24, padding: 32 }}>
             <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: 24 }}>Partnership Stats</h3>
             <StatsGrid>
               <StatCard>
                 <StatValue>{totalClicks}</StatValue>
                 <StatLabel>Total Referrals</StatLabel>
               </StatCard>
               <StatCard>
                 <StatValue>KES {(totalClicks * 100).toLocaleString()}</StatValue>
                 <StatLabel>Total Earned</StatLabel>
               </StatCard>
             </StatsGrid>
             
             <div style={{ marginTop: 24, background: 'rgba(255,224,102,0.1)', borderRadius: 12, padding: 16, textAlign: 'center' }}>
                <div style={{ fontSize: '0.8rem', color: '#ffe066', fontWeight: 700, textTransform: 'uppercase' }}>Current Rank</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 900 }}>Silver Partner</div>
             </div>
          </div>

          <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: 24, padding: 32 }}>
             <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: 20 }}>Recent Activities</h3>
             <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {recentReferrals.map((ref, i) => (
                   <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 12, borderBottom: i < 2 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                      <div>
                         <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{ref.name}</div>
                         <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>{ref.date}</div>
                      </div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, color: ref.status === 'Active' ? '#4ade80' : '#ffe066', background: 'rgba(255,255,255,0.05)', padding: '4px 12px', borderRadius: 20 }}>
                         {ref.status}
                      </div>
                   </div>
                ))}
             </div>
          </div>
        </SidebarCard>
      </ContentContainer>
    </PageWrapper>
  );
}

