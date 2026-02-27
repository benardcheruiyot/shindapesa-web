"use client";
import React from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { useUser } from "@/hooks/useUser";
import { mpesaApi } from "@/services/mpesaService";
import { PageWrapper, BackHeader } from "@/components/SharedStyles";

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

const BalanceCard = styled.div`
  background: #002d58;
  border: 4px solid #fbdf07;
  border-radius: 40px;
  padding: 40px;
  text-align: left;
  animation: ${fadeIn} 0.6s ease-out;
  position: relative;
  overflow: hidden;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
`;

const BalanceTitle = styled.div`
  font-size: 0.75rem;
  color: #fbdf07;
  margin-bottom: 8px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const BalanceAmount = styled.div`
  font-size: 3.5rem;
  font-weight: 950;
  color: #ffffff;
  margin-bottom: 12px;
  letter-spacing: -2px;
  span {
    font-size: 1.5rem;
    color: #fbdf07;
    margin-right: 8px;
  }

  @media (max-width: 600px) {
    font-size: 2.2rem;
    
    span {
      font-size: 1.1rem;
    }
  }
`;

const SubBalance = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  padding: 15px;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.05);
`;

const SubItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  span:first-child { 
    font-size: 0.6rem; 
    color: #94a3b8; 
    text-transform: uppercase; 
    font-weight: 800;
    letter-spacing: 0.5px;
  }
  span:last-child { 
    font-size: 0.9rem; 
    font-weight: 700; 
    color: #3b82f6;
  }
`;

const ActionButton = styled.button<{ primary?: boolean }>`
  width: 100%;
  background: ${props => props.primary ? 'linear-gradient(90deg, #fbdf07, #d4bb00)' : 'transparent'};
  color: ${props => props.primary ? '#000000' : '#ffffff'};
  border: ${props => props.primary ? 'none' : '1px solid rgba(255, 255, 255, 0.2)'};
  border-radius: 12px;
  padding: 18px;
  font-weight: 950;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 15px;

  &:hover {
    transform: translateY(-2px);
    background: ${props => props.primary ? 'linear-gradient(90deg, #fbdf07, #ffd700, #fbdf07)' : 'rgba(255, 255, 255, 0.05)'};
    box-shadow: ${props => props.primary ? '0 8px 20px rgba(251, 223, 7, 0.3)' : 'none'};
  }
`;

const LockdownNotice = styled.div`
  background: rgba(238, 28, 37, 0.05);
  border: 1px solid rgba(238, 28, 37, 0.1);
  border-radius: 12px;
  padding: 15px;
  margin-top: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.8rem;
  color: #ee1c25;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(238, 28, 37, 0.08);
  }
`;

const HistoryCard = styled.div`
  background: #002d58;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`;

const LegitimacyBanner = styled.div`
  background: rgba(0, 91, 170, 0.1);
  border: 1px solid rgba(0, 91, 170, 0.2);
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const ShieldIcon = styled.div`
  width: 48px;
  height: 48px;
  background: rgba(0, 91, 170, 0.2);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fbdf07;
  font-size: 1.5rem;
`;

const BannerText = styled.div`
  flex: 1;
  div:first-child {
    color: #ffffff;
    font-weight: 900;
    font-size: 0.9rem;
    margin-bottom: 4px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
    font-size: 0.75rem;
    line-height: 1.4;
    font-weight: 600;
  }
`;

export default function Wallet() {
  const router = useRouter();
  const { user, loading } = useUser();
  const [isWithdrawing, setIsWithdrawing] = React.useState(false);

  if (loading || !user) return null;

  const handleWithdrawal = async () => {
    if (!user) return;
    
    // Check for withdrawable balance first
    const withdrawable = user.withdrawableBalance || 0;
    const totalBalance = user.balance || 0;

    // Force activation redirection if balance exists but 0 withdrawable
    if (!user.isActivated) {
      router.push("/activate-account");
      return;
    }

    if (withdrawable < 100) {
      alert("Minimum withdrawable amount is KES 100. Please activate more funds.");
      return;
    }

    setIsWithdrawing(true);
    try {
      const result = await mpesaApi.initiateWithdrawal(user.phone || user.phoneNumber || "", withdrawable);
      
      if (result.ResponseCode === "0") {
        alert("Withdrawal initiated! You will receive your cash shortly.");
        updateUser({ withdrawableBalance: 0 });
      } else {
        alert("System Error: " + (result.ResponseDescription || "Gateway Timeout"));
      }
    } catch (e) {
      alert("Network Error. Please try again later.");
    } finally {
      setIsWithdrawing(false);
    }
  };

  return (
    <PageWrapper>
      <BackHeader title="Wallet Ledger" onBack={() => router.push('/home')} />

      <ContentContainer>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <BalanceCard>
            <BalanceTitle>Unlocked Withdrawable Funds</BalanceTitle>
            <BalanceAmount><span>KES</span>{Number(user?.withdrawableBalance || 0).toLocaleString()}</BalanceAmount>
            
            <SubBalance>
              <SubItem>
                <span>Total Accumulated</span>
                <span style={{color: '#ffffff', fontWeight: 900}}>KES {Number(user?.balance || 0).toLocaleString()}</span>
              </SubItem>
              <SubItem>
                <span>Status</span>
                <span style={{color: user?.isActivated ? '#4ade80' : '#f87171', fontWeight: 950}}>
                  {user?.isActivated ? 'FULLY VERIFIED' : 'PENDING ACTIVATION'}
                </span>
              </SubItem>
            </SubBalance>

            <ActionButton primary onClick={handleWithdrawal} disabled={isWithdrawing}>
              {isWithdrawing ? "Processing..." : "Transfer to M-PESA"}
            </ActionButton>
            
            <ActionButton onClick={() => router.push("/spin")}>
              SHINDAPESA More
            </ActionButton>

            {!user?.isActivated && (
              <LockdownNotice onClick={() => router.push("/activate-account")}>
                <span style={{ fontSize: '1.2rem' }}>🔒</span>
                <div>
                  <div style={{ fontWeight: 950, fontSize: '0.85rem' }}>WITHDRAWAL CHANNEL LOCKED</div>
                  <div style={{ opacity: 0.8, fontSize: '0.75rem', fontWeight: 600 }}>Activation required to unlock all settlements.</div>
                </div>
              </LockdownNotice>
            )}
          </BalanceCard>

          <LegitimacyBanner>
            <ShieldIcon>🛡️</ShieldIcon>
            <BannerText>
              <div>Institutional Asset Safeguard</div>
              <div>All digital assets are stored in enterprise-grade cold storage and insured via our Liquidity Alliance protocol.</div>
            </BannerText>
          </LegitimacyBanner>

          <div style={{ background: 'rgba(24, 24, 27, 0.7)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '16px', padding: '20px', display: 'flex', alignItems: 'center', gap: '15px' }}>
             <div style={{ fontSize: '1.5rem' }}>🏦</div>
             <div style={{ fontSize: '0.8rem', color: '#94a3b8', lineHeight: '1.6', fontWeight: 700 }}>
                <b style={{ color: '#ffffff' }}>Primary Settlement Endpoint</b><br/>
                M-PESA Integrated: {user?.phoneNumber || user?.phone || "Connected"}
             </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ fontWeight: 900, fontSize: '0.8rem', letterSpacing: '1px', color: '#94a3b8' }}>TRANSACTION LEDGER</div>
          <HistoryCard>
            <NoHistory>
               <div style={{ fontSize: '2rem', marginBottom: '10px', opacity: 0.1, filter: 'invert(1)' }}>🧾</div>
               No recent settlements found in this cycle.
            </NoHistory>
          </HistoryCard>
          
          <div style={{ padding: '24px', background: 'rgba(24, 24, 27, 0.7)', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.1)' }}>
             <div style={{ fontSize: '0.6rem', color: '#94a3b8', fontWeight: 950, marginBottom: '12px', textTransform: 'uppercase' }}>Payout Partners</div>
             <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/1200px-M-PESA_LOGO-01.svg.png" height="15" alt="Mpesa" style={{opacity: 0.8, filter: 'brightness(1.5)'}} />
                <div style={{ borderLeft: '1px solid rgba(255,255,255,0.1)', height: 15 }} />
                <div style={{ fontWeight: 900, fontSize: '0.7rem', color: '#94a3b8' }}>Safaricom Cloud</div>
             </div>
          </div>
        </div>
      </ContentContainer>
    </PageWrapper>
  );
}


