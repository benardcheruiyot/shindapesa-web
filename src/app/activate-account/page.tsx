"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styled, { keyframes } from "styled-components";
import { useUser } from "@/context/UserContext";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
`;

const rotate = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
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

const ContentContainer = styled.div`
  width: 100%;
  max-width: 1200px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 32px;
  margin-top: 20px;
`;

const SpinningEmoji = styled.div`
  font-size: 4rem;
  margin-bottom: 20px;
  display: inline-block;
  animation: ${rotate} 2s linear infinite;
`;

const HeaderBar = styled.div`
  width: 100%;
  height: 64px;
  background: rgba(0, 31, 63, 0.8);
  backdrop-filter: blur(15px);
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0 24px;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  max-width: 1200px;
  border-radius: 0 0 16px 16px;
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

const MainCard = styled.div`
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 40px 32px;
  animation: ${fadeIn} 0.6s ease-out;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SidebarCard = styled.div`
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 224, 102, 0.1);
  border-radius: 24px;
  padding: 40px 32px;
  animation: ${fadeIn} 0.8s ease-out;
`;

const IconWrapper = styled.div`
  font-size: 3.5rem;
  margin-bottom: 20px;
  color: #ffe066;
`;

const Title = styled.h1`
  font-size: 1.8rem;
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

const FeeBox = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 32px;
  border: 1px solid rgba(255, 224, 102, 0.2);
`;

const FeeLabel = styled.div`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 8px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1px;
`;

const FeeAmount = styled.div`
  font-size: 2.5rem;
  font-weight: 900;
  color: #ffe066;
`;

const ActivateButton = styled.button`
  width: 100%;
  background: #ffe066;
  color: #001f3f;
  border: none;
  border-radius: 12px;
  padding: 18px;
  font-weight: 800;
  font-size: 1.15rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 10px 20px -5px rgba(255, 224, 102, 0.3);
  margin-bottom: 24px;

  &:hover {
    transform: scale(1.02);
    background: #fff;
  }
`;

const BenefitsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
  text-align: left;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const BenefitItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.8);
`;

const CheckCircle = styled.span`
  color: #4caf50;
  font-weight: 900;
`;

const Instructions = styled.div`
  margin-top: 32px;
  text-align: left;
  background: rgba(0, 0, 0, 0.2);
  padding: 20px;
  border-radius: 16px;
  font-size: 0.9rem;
`;

const Step = styled.div`
  margin-bottom: 10px;
  display: flex;
  gap: 10px;
  color: #ccd6f6;
`;

const StepNum = styled.span`
  color: #ffe066;
  font-weight: 800;
`;

const StatusToast = styled.div`
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  background: #1e293b;
  border: 1px solid #ffe066;
  border-radius: 12px;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  animation: ${fadeIn} 0.3s ease-out;
  z-index: 1000;
`;

export default function ActivateAccount() {
  const router = useRouter();
  const { user, updateUser } = useUser();
  const [activationFee] = useState<number>(100);
  const [withdrawAmount, setWithdrawAmount] = useState<string>("0");
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<"initial" | "processing" | "waiting" | "success">("initial");
  const [timer, setTimer] = useState(15);
  const [activeInterval, setActiveInterval] = useState<NodeJS.Timeout | null>(null);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    // If not logged in, redirect
    if (!user) {
      router.push('/login');
      return;
    }

    const amount = localStorage.getItem("pendingWithdrawAmount") || "2419";
    setWithdrawAmount(amount);

    return () => {
      if (activeInterval) clearInterval(activeInterval);
    };
  }, [activeInterval, user, router]);

  if (!user) return null;

  const handlePay = async () => {
    setIsProcessing(true);
    setStep("processing");

    try {
      // 1. Call real STK Push API
      const response = await fetch('/api/mpesa/stk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: user.phoneNumber,
          amount: activationFee,
          accountReference: "ShindaPesa"
        })
      });

      const data = await response.json();

      if (data.ResponseCode === "0") {
        setStep("waiting");
        setShowToast(true);
        setTimeout(() => setShowToast(false), 5000);
        
        const interval = setInterval(() => {
          setTimer((t) => {
            if (t <= 1) {
              clearInterval(interval);
              return 0;
            }
            return t - 1;
          });
        }, 1000);
        setActiveInterval(interval);
      } else {
        alert("Failed to initiate STK Push: " + (data.errorMessage || data.error || "Unknown Error"));
        setStep("initial");
        setIsProcessing(false);
      }
    } catch (error: any) {
      alert("Error reaching payment server: " + error.message);
      setStep("initial");
      setIsProcessing(false);
    }
  };

  const handleManualConfirm = () => {
    if (activeInterval) clearInterval(activeInterval);
    handleSuccess();
  };

  const handleSuccess = () => {
    setStep("success");
    
    // Update user via context instead of manual localStorage
    updateUser({ isActivated: true });
    localStorage.setItem("isActivated", "true");

    setTimeout(() => {
      router.push("/home");
    }, 3000);
  };

  return (
    <PageWrapper>
      <HeaderBar>
        <BackArrow onClick={() => router.push('/home')}>&larr;</BackArrow>
        <HeaderTitle>Secure Activation</HeaderTitle>
      </HeaderBar>

      <ContentContainer>
        <MainCard>
          {step === "initial" && (
            <>
              <IconWrapper>🛡️</IconWrapper>
              <Title>Account Verification</Title>
              <Description>
                You are initiating a withdrawal of <b>KES {Number(withdrawAmount).toLocaleString()}</b>. 
                To secure this transaction, a one-time activation fee is required.
              </Description>

              <div style={{ 
                background: 'rgba(255,255,255,0.03)', 
                borderRadius: '16px', 
                padding: '20px', 
                marginBottom: '32px',
                border: '1px solid rgba(255,255,255,0.05)',
                textAlign: 'left'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>Account Balance:</span>
                  <span style={{ fontWeight: 700 }}>KES {user.balance?.toLocaleString() || '0'}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>Withdrawal Request:</span>
                  <span style={{ fontWeight: 800, color: '#4ade80' }}>KES {Number(withdrawAmount).toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.9rem' }}>Required Fee:</span>
                  <span style={{ fontWeight: 900, fontSize: '1.4rem', color: '#ffe066' }}>KES {activationFee}</span>
                </div>
              </div>

              <ActivateButton onClick={handlePay}>
                🚀 Pay KES {activationFee} with M-PESA
              </ActivateButton>
              
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
                100% Secure Transaction via Safaricom Daraja API
              </div>
            </>
          )}

          {step === "processing" && (
            <div style={{ padding: '60px 0' }}>
              <SpinningEmoji>⏳</SpinningEmoji>
              <Title>Initiating M-PESA...</Title>
              <Description>Please wait while we set up the secure payment channel.</Description>
            </div>
          )}

          {step === "waiting" && (
            <div style={{ padding: '40px 0' }}>
              <div style={{ fontSize: '4rem', marginBottom: 20 }}>📱</div>
              <Title>Check Your Phone</Title>
              <Description>
                A real STK Push has been sent to <b>{user.phoneNumber}</b>. 
                <br /><br />
                Please enter your M-PESA PIN to complete the activation.
              </Description>
              
              <div style={{ 
                background: "rgba(255, 224, 102, 0.1)", 
                border: "1px solid rgba(255, 224, 102, 0.2)", 
                borderRadius: 16, 
                padding: "20px", 
                marginBottom: 30 
              }}>
                <div style={{ fontSize: '0.8rem', color: '#ffe066', marginBottom: 10, fontWeight: 700 }}>VERIFICATION STATUS</div>
                <div style={{ fontSize: '2rem', fontWeight: 900, color: '#fff', marginBottom: 5 }}>
                  {timer}s
                </div>
                <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.6)' }}>
                  {timer > 0 ? "Awaiting payment confirmation..." : "Verification complete!"}
                </div>
              </div>

              {timer === 0 ? (
                <button 
                  onClick={handleManualConfirm}
                  style={{
                    background: "#4ade80",
                    border: "none",
                    color: "#001f3f",
                    padding: "18px 32px",
                    borderRadius: 16,
                    fontSize: "1.1rem",
                    fontWeight: 900,
                    cursor: "pointer",
                    width: "100%",
                    boxShadow: "0 4px 14px 0 rgba(74, 222, 128, 0.39)"
                  }}
                >
                  ✅ CONFIRM & PROCEED
                </button>
              ) : (
                <div style={{ textAlign: 'center', opacity: 0.7 }}>
                  <p style={{ fontSize: '0.9rem' }}>Searching for transaction record...</p>
                </div>
              )}
            </div>
          )}

          {step === "success" && (
            <div style={{ padding: '60px 0' }}>
              <div style={{ fontSize: '5rem', marginBottom: 20 }}>✅</div>
              <Title style={{ color: '#4ade80' }}>Payment Successful!</Title>
              <Description>
                Your account is now activated. Redirecting you to complete your withdrawal...
              </Description>
            </div>
          )}
        </MainCard>

        <SidebarCard>
          <div style={{ fontWeight: 800, fontSize: '1.2rem', color: '#ffe066', marginBottom: 20 }}>
            Activation Benefits
          </div>
          <BenefitsGrid>
            <BenefitItem><CheckCircle>✓</CheckCircle> Unlock unlimited withdrawals</BenefitItem>
            <BenefitItem><CheckCircle>✓</CheckCircle> Enhanced account protection</BenefitItem>
            <BenefitItem><CheckCircle>✓</CheckCircle> Access to premium spin wheels</BenefitItem>
            <BenefitItem><CheckCircle>✓</CheckCircle> Instant payout processing</BenefitItem>
            <BenefitItem><CheckCircle>✓</CheckCircle> Priority 24/7 Support</BenefitItem>
          </BenefitsGrid>

          <Instructions>
            <div style={{ fontWeight: 800, color: '#fff', marginBottom: 16, fontSize: '1rem' }}>
              Manual Payment Steps:
            </div>
            <Step><StepNum>1.</StepNum> Open M-PESA on your phone</Step>
            <Step><StepNum>2.</StepNum> Lipa Na M-PESA &gt; Paybill</Step>
            <Step><StepNum>3.</StepNum> Business No: <b>174379</b></Step>
            <Step><StepNum>4.</StepNum> Account No: <b>SHINDAPESA</b></Step>
            <Step><StepNum>5.</StepNum> Amount: <b>KES {activationFee}</b></Step>
          </Instructions>
        </SidebarCard>
      </ContentContainer>

      {showToast && (
        <StatusToast>
          <span style={{fontSize: "1.5rem"}}>📲</span>
          <div>
            <div style={{fontWeight: 800, color: "#ffe066", fontSize: "0.9rem"}}>STK Push Sent</div>
            <div style={{fontSize: "0.8rem", color: "rgba(255,255,255,0.7)"}}>Check your screen to confirm payment</div>
          </div>
        </StatusToast>
      )}
    </PageWrapper>
  );
}

