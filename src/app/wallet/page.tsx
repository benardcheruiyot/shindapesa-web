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
  padding: 100px 20px 60px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: 1000px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
`;

const BalanceCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 32px;
  padding: 40px;
  text-align: center;
  animation: ${fadeIn} 0.6s ease-out;
  height: fit-content;
`;


const BalanceTitle = styled.div`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: 12px;
  font-weight: 500;
`;

const BalanceAmount = styled.div`
  font-size: 3rem;
  font-weight: 900;
  color: #ffe066;
  margin-bottom: 24px;
  letter-spacing: -1px;
`;

const ActionButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  width: 100%;
`;

const ActionButton = styled.button<{ primary?: boolean }>`
  background: ${props => props.primary ? '#ffe066' : 'rgba(255, 255, 255, 0.1)'};
  color: ${props => props.primary ? '#001f3f' : '#fff'};
  border: none;
  border-radius: 12px;
  padding: 14px;
  font-weight: 800;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    transform: scale(1.02);
    background: ${props => props.primary ? '#fff' : 'rgba(255, 255, 255, 0.15)'};
  }
`;

const HistorySection = styled.div`
  width: 100%;
  max-width: 440px;
  animation: ${fadeIn} 0.8s ease-out;
`;

const SectionTitle = styled.h2`
  font-size: 1.25rem;
  font-weight: 800;
  margin-bottom: 16px;
  padding-left: 4px;
`;

const HistoryCard = styled.div`
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 18px;
  overflow: hidden;
`;

const HistoryItem = styled.div`
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  &:last-child {
    border-bottom: none;
  }
`;

const ItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const ItemTitle = styled.div`
  font-weight: 700;
  font-size: 1rem;
`;

const ItemDate = styled.div`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.5);
`;

const ItemAmount = styled.div<{ positive?: boolean }>`
  font-weight: 800;
  font-size: 1.1rem;
  color: ${props => props.positive ? '#4caf50' : '#ff4d4d'};
`;

const NoHistory = styled.div`
  padding: 40px;
  text-align: center;
  color: rgba(255, 255, 255, 0.4);
  font-size: 0.95rem;
  font-style: italic;
`;

const HeaderBar = styled.header`
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
  margin-bottom: 40px;
`;

const BackArrow = styled.button`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  width: 48px;
  height: 48px;
  border-radius: 12px;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;

const HeaderTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 900;
  letter-spacing: -0.5px;
`;

export default function Wallet() {
  const router = useRouter();
  const [balance, setBalance] = React.useState<number>(1000);

  React.useEffect(() => {
    const saved = localStorage.getItem("collectedAmount");
    if (saved) setBalance(parseInt(saved));
  }, []);

  const history = [
    { id: 1, type: 'Spin Win', amount: 500, date: 'Feb 26, 2026', positive: true },
    { id: 2, type: 'Referral Bonus', amount: 150, date: 'Feb 25, 2026', positive: true },
    { id: 3, type: 'Withdrawal', amount: 300, date: 'Feb 24, 2026', positive: false },
    { id: 4, type: 'Spin Win', amount: 1000, date: 'Feb 23, 2026', positive: true },
  ];

  return (
    <PageWrapper>
      <HeaderBar>
        <BackArrow onClick={() => router.push('/home')}>&larr;</BackArrow>
        <HeaderTitle>Financial Wallet</HeaderTitle>
      </HeaderBar>

      <ContentContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <BalanceCard>
            <BalanceTitle>Main Trading Balance</BalanceTitle>
            <BalanceAmount>KES {balance.toLocaleString()}.00</BalanceAmount>
            <ActionButtons>
              <ActionButton primary onClick={() => {
                if (balance < 100) {
                  alert("Minimum withdrawal is KES 100.");
                } else {
                  router.push('/home'); // Go to home to use the selection modal
                }
              }}>Withdraw</ActionButton>
              <ActionButton onClick={() => alert('Top up coming soon!')}>Top Up</ActionButton>
            </ActionButtons>
            <div style={{ marginTop: 32, paddingTop: 32, borderTop: '1px solid rgba(255,255,255,0.1)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
               <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>Pending</div>
                  <div style={{ fontWeight: 700 }}>KES 450.00</div>
               </div>
               <div style={{ textAlign: 'left' }}>
                  <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginBottom: 4 }}>Locked</div>
                  <div style={{ fontWeight: 700 }}>KES 0.00</div>
               </div>
            </div>
          </BalanceCard>
          
          <div style={{ background: 'rgba(255, 224, 102, 0.05)', border: '1px dotted #ffe066', borderRadius: 24, padding: 24, color: '#ffe066' }}>
             <div style={{ fontWeight: 800, marginBottom: 8 }}>💡 Pro Tip</div>
             <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Refer 3 friends to unlock instant withdrawals without account activation!</div>
          </div>
        </div>

        <HistorySection>
          <SectionTitle>Recent Activity</SectionTitle>
          <HistoryCard>
            {history.length > 0 ? (
              history.map(item => (
                <HistoryItem key={item.id}>
                  <ItemInfo>
                    <ItemTitle>{item.type}</ItemTitle>
                    <ItemDate>{item.date}</ItemDate>
                  </ItemInfo>
                  <ItemAmount positive={item.positive}>
                    {item.positive ? '+' : '-'} {item.amount}
                  </ItemAmount>
                </HistoryItem>
              ))
            ) : (
              <NoHistory>No transactions yet.</NoHistory>
            )}
          </HistoryCard>
          <button style={{ width: '100%', background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', padding: '20px', fontWeight: 700, cursor: 'pointer' }}>
             Load More History
          </button>
        </HistorySection>
      </ContentContainer>
    </PageWrapper>
  );
}

