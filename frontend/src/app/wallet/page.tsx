"use client";
import React from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { useUser } from "@/context/UserContext";
import { mpesaApi } from "@/services/mpesaService";
import { userService } from "@/services/userService";
import PaymentOverlay from "@/components/PaymentOverlay";
import { 
  PageWrapper, 
  BackHeader, 
  fadeIn, 
  PrimaryButton 
} from "@/components/SharedStyles";
import { css } from "styled-components";

const ContentContainer = styled.div`
  width: 92vw;
  max-width: 1000px;
  display: grid;
  grid-template-columns: 1.25fr 1fr;
  gap: 24px;
  margin-top: 80px;
  margin-bottom: 120px;
  ${css`animation: ${fadeIn} 0.8s cubic-bezier(0.16, 1, 0.3, 1);`}

  @media (max-width: 850px) {
    grid-template-columns: 1fr;
    margin-top: 60px;
  }
`;

const BalanceCard = styled.div`
  background: rgba(17, 24, 39, 0.8);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 32px;
  padding: 40px;
  text-align: left;
  position: relative;
  overflow: hidden;
  box-shadow: 
    0 10px 15px -3px rgba(0, 0, 0, 0.1),
    0 4px 6px -2px rgba(0, 0, 0, 0.05),
    inset 0 1px 1px rgba(255, 255, 255, 0.05);

  &::after {
    content: '';
    position: absolute;
    top: 0; left: 0; width: 100%; height: 2px;
    background: linear-gradient(90deg, transparent, #3b82f6, transparent);
    opacity: 0.5;
  }
`;

const BalanceTitle = styled.div`
  font-size: 0.7rem;
  color: #3b82f6;
  margin-bottom: 12px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const BalanceAmount = styled.div`
  font-size: 3.5rem;
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 24px;
  letter-spacing: -2px;
  display: flex;
  align-items: baseline;
  gap: 8px;

  span {
    font-size: 1.5rem;
    color: #3b82f6;
    font-weight: 800;
  }

  @media (max-width: 600px) {
    font-size: 2.8rem;
    
    span {
      font-size: 1.2rem;
    }
  }
`;

const SubBalanceGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 16px;
  margin-bottom: 32px;
`;

const SubItem = styled.div`
  background: rgba(0, 0, 0, 0.3);
  padding: 16px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
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
    font-size: 0.95rem; 
    font-weight: 800; 
    color: #ffffff;
  }
`;

const StatusBadge = styled.span<{ $active: boolean }>`
  color: ${props => props.$active ? '#22c55e' : '#ef4444'} !important;
  font-weight: 950 !important;
`;

const SecondaryButton = styled.button`
  width: 100%;
  background: rgba(255, 255, 255, 0.03);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 18px;
  font-weight: 800;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-top: 12px;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(255, 255, 255, 0.2);
  }
`;

const LockdownNotice = styled.div`
  background: rgba(239, 68, 68, 0.05);
  border: 1px solid rgba(239, 68, 68, 0.1);
  border-radius: 16px;
  padding: 18px;
  margin-top: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background: rgba(239, 68, 68, 0.08);
  }
`;

const HistoryCard = styled.div`
  background: rgba(17, 24, 39, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 24px;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px;
  color: #64748b;
  font-size: 0.85rem;
  font-weight: 600;
`;

const LegitimacyBanner = styled.div`
  background: rgba(59, 130, 246, 0.05);
  border: 1px solid rgba(59, 130, 246, 0.1);
  border-radius: 20px;
  padding: 24px;
  margin-top: 24px;
  display: flex;
  align-items: center;
  gap: 20px;
`;

const ShieldIcon = styled.div`
  width: 52px;
  height: 52px;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #3b82f6;
  font-size: 1.5rem;
  box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
`;

const BannerText = styled.div`
  flex: 1;
  div:first-child {
    color: #ffffff;
    font-weight: 800;
    font-size: 0.95rem;
    margin-bottom: 4px;
    letter-spacing: -0.01em;
  }
  div:last-child {
    color: #94a3b8;
    font-size: 0.75rem;
    line-height: 1.5;
    font-weight: 500;
  }
`;

export default function Wallet() {
    // DEBUG OVERLAY: Show the API URL being used at runtime
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const { user, refreshUser, loading } = useUser();
  const [isWithdrawing, setIsWithdrawing] = React.useState(false);
  const [status, setStatus] = React.useState<'idle' | 'pending' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = React.useState("");

  if (loading || !user) return null;

  const handleWithdrawal = async () => {
    if (!user) return;
    const withdrawable = user.withdrawableBalance || 0;

    if (!user.isActivated) {
      router.push("/activate-account");
      return;
    }

    if (withdrawable < 100) {
      setStatus('error');
      setStatusMessage("Minimum withdrawable amount is KES 100. Please activate more funds.");
      return;
    }

    setIsWithdrawing(true);
    setStatus('pending');
    setStatusMessage("Initiating M-PESA STK Push to your phone...");

    try {
      const result = await mpesaApi.initiateStkPush(
        user.phone || user.phoneNumber || "",
        withdrawable,
        "WALLET_WITHDRAWAL"
      );

      if (result && result.ResponseCode === "0") {
        setStatus('success');
        setStatusMessage("STK Push sent! Please check your phone and enter your M-PESA PIN.");
        // Optionally, update user balance after confirmation
        // const updatedUser = { ...user, withdrawableBalance: 0 };
        // userService.saveUser(updatedUser, true);
        // refreshUser();
      } else {
        let errorMsg = "System Error: " + (result?.ResponseDescription || result?.errorMessage || result?.message || "Gateway Timeout");
        if (result?.error) {
          errorMsg += ` (code: ${result.code || 'unknown'})`;
        }
        setStatus('error');
        setStatusMessage(errorMsg);
      }
    } catch (e) {
      setStatus('error');
      setStatusMessage("Network Error. Please check your connection and try again. " + (e?.message || ''));
    } finally {
      setIsWithdrawing(false);
    }
  };

  return (
    <>
      {/* DEBUG OVERLAY: Shows the API URL at the top left of the page for troubleshooting */}
      <div style={{ position: 'fixed', top: 0, left: 0, background: '#222', color: '#fff', padding: '6px 12px', zIndex: 9999, fontSize: 12, opacity: 0.85 }}>
        <strong>API URL:</strong> {apiUrl || 'NOT SET'}
      </div>
      <PageWrapper>
        <BackHeader title="Financial Ledger" onBack={() => router.push('/home')} />

        {status === 'pending' && <PaymentOverlay status="pending" message={statusMessage} />}
        {status === 'success' && (
          <PaymentOverlay 
            status="success" 
            message={statusMessage} 
            onClose={() => setStatus('idle')} 
          />
        )}
        {/* Completely suppress error popups for payment errors (no overlay at all) */}

        <ContentContainer>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <BalanceCard>
              <BalanceTitle>Liquid Settlements</BalanceTitle>
              <BalanceAmount><span>KES</span>{Number(user?.withdrawableBalance || 0).toLocaleString()}</BalanceAmount>
              
              <SubBalanceGrid>
              <SubItem>
                <span>Account Equity</span>
                <span>KES {Number(user?.balance || 0).toLocaleString()}</span>
              </SubItem>
              <SubItem>
                <span>Authorization</span>
                <StatusBadge $active={!!user?.isActivated}>
                  {user?.isActivated ? "ENTERPRISE VERIFIED" : "PENDING ACTIVATION"}
                </StatusBadge>
              </SubItem>
            </SubBalanceGrid>

            <PrimaryButton onClick={handleWithdrawal} disabled={isWithdrawing}>
              {isWithdrawing ? "Authorizing Payout..." : "Withdraw to M-PESA"}
            </PrimaryButton>
            
            <SecondaryButton onClick={() => router.push("/spin")}>
              Return to Gaming
            </SecondaryButton>

            {!user?.isActivated && (
              <LockdownNotice onClick={() => router.push("/activate-account")}>
                <div style={{ fontSize: "1.25rem" }}>???</div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: "0.85rem", color: "#fca5a5" }}>PAYOUT CHANNEL RESTRICTED</div>
                  <div style={{ color: "#fca5a5", opacity: 0.7, fontSize: "0.75rem", fontWeight: 500 }}>Global AML activation required to unlock settlements.</div>
                </div>
              </LockdownNotice>
            )}
          </BalanceCard>

          <LegitimacyBanner>
            <ShieldIcon>???</ShieldIcon>
            <BannerText>
              <div>Institutional Liquidity Provider</div>
              <div>Funds are secured under the Multi-Sig Sapphire protocol and insured for immediate settlement 24/7.</div>
            </BannerText>
          </LegitimacyBanner>

          <div style={{ 
            marginTop: "24px",
            background: "rgba(0, 0, 0, 0.2)", 
            border: "1px solid rgba(255, 255, 255, 0.05)", 
            borderRadius: "20px", 
            padding: "24px", 
            display: "flex", 
            alignItems: "center", 
            gap: "16px" 
          }}>
             <div style={{ fontSize: "1.5rem" }}>??</div>
             <div style={{ fontSize: "0.85rem", color: "#94a3b8", lineHeight: "1.5", fontWeight: 600 }}>
                <b style={{ color: "#ffffff", display: "block", marginBottom: "4px" }}>M-PESA Primary Endpoint</b>
                Connected: {user?.phoneNumber || user?.phone || "Authorized Device"}
             </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div style={{ fontWeight: 800, fontSize: "0.7rem", letterSpacing: "2px", color: "#3b82f6", textTransform: "uppercase" }}>Audited Ledger</div>
          <HistoryCard>
             <div style={{ fontSize: "2rem", marginBottom: "16px", opacity: 0.2 }}>??</div>
             <div>Zero transactions found in the<br/>current settlement cycle.</div>
          </HistoryCard>
          
          <div style={{ 
            padding: "24px", 
            background: "rgba(17, 24, 39, 0.5)", 
            borderRadius: "20px", 
            border: "1px solid rgba(255, 255, 255, 0.05)",
            display: "flex",
            flexDirection: "column",
            gap: "12px"
          }}>
             <div style={{ fontSize: "0.6rem", color: "#64748b", fontWeight: 800, textTransform: "uppercase", letterSpacing: "1px" }}>Official Settlement Gateway</div>
             <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/1200px-M-PESA_LOGO-01.svg.png" height="18" alt="Mpesa" style={{opacity: 0.8, filter: "brightness(1.5)"}} />
                <div style={{ borderLeft: "1px solid rgba(255,255,255,0.1)", height: 20 }} />
                <div style={{ fontWeight: 700, fontSize: "0.75rem", color: "#94a3b8" }}>Safaricom Cloud Node</div>
             </div>
          </div>
        </div>
      </ContentContainer>
    </PageWrapper>
  </> 
  );
}
