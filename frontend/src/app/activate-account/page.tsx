"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { useUser } from "@/hooks/useUser";
import { PageWrapper, BackHeader } from "@/components/SharedStyles";
import { mpesaApi } from "@/services/mpesaService";

const ContentContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 20px auto 0;
  padding: 0 16px;
`;

const MainCard = styled.div`
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 32px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #3b82f6, transparent);
  }
`;

const Title = styled.h1`
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 8px;
  color: #ffffff;
  letter-spacing: -0.5px;
  text-transform: uppercase;
  text-align: center;
`;

const Subtitle = styled.p`
  font-size: 0.9rem;
  color: #94a3b8;
  margin-bottom: 24px;
  line-height: 1.5;
  font-weight: 500;
  text-align: center;
`;

const FormSection = styled.div`
  background: rgba(255, 255, 255, 0.03);
  padding: 20px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  margin-bottom: 24px;
`;

const InfoBox = styled.div`
  margin-bottom: 16px;
  padding: 12px;
  border-left: 3px solid #3b82f6;
  background: rgba(59, 130, 246, 0.1);
  font-size: 0.75rem;
  color: #cbd5e1;
  line-height: 1.4;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
`;

const Label = styled.label`
  color: #94a3b8;
  font-size: 0.8rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Input = styled.input`
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 12px;
  padding: 14px;
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 700;
  outline: none;
  transition: all 0.3s ease;

  &:focus {
    border-color: #3b82f6;
    background: rgba(0, 0, 0, 0.3);
  }
`;

const StatsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 8px;
`;

const StatLabel = styled.span`
  color: #64748b;
  font-size: 0.8rem;
  font-weight: 500;
`;

const StatValue = styled.span`
  color: #ffffff;
  font-weight: 800;
  font-size: 0.95rem;
`;

const ActivateButton = styled.button`
  width: 100%;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: #ffffff;
  border: none;
  border-radius: 14px;
  padding: 18px;
  font-weight: 800;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 10px 25px rgba(59, 130, 246, 0.2);

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 15px 35px rgba(59, 130, 246, 0.3);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: #1e293b;
    box-shadow: none;
  }
`;

const TimerText = styled.div`
  font-size: 2.5rem;
  font-weight: 900;
  color: #3b82f6;
  font-variant-numeric: tabular-nums;
`;

export default function ActivateAccount() {
  const router = useRouter();
  const { user, updateUser } = useUser();
  const [withdrawInput, setWithdrawInput] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<"initial" | "processing" | "waiting" | "success">("initial");
  const [timer, setTimer] = useState(25);

  const calculateFee = (amount: number) => {
    if (!amount || amount <= 0) return 0;
    if (amount < 100) return 100; 
    if (amount <= 1000) return 100;
    if (amount <= 5000) return 200;
    if (amount <= 10000) return 350;
    if (amount <= 15000) return 500;
    if (amount <= 20000) return 600;
    return 700;
  };

  const currentAmount = Number(withdrawInput) || 0;
  const activationFee = calculateFee(currentAmount);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
  }, [user, router]);

  const handlePay = async () => {
    setIsProcessing(true);
    setStep("processing");

    try {
      const data = await mpesaApi.initiateStkPush(
        user?.phoneNumber || user?.phone || "",
        activationFee,
        "LIQUIDITY_UNLOCK"
      );

      if (data.ResponseCode === "0") {
        setStep("waiting");
        
        const checkoutID = data.CheckoutRequestID;
        let pollCount = 0;
        const maxPolls = 60;

        const pollTimer = setInterval(async () => {
          pollCount++;
          if (pollCount > maxPolls) {
            clearInterval(pollTimer);
            alert("Verification Timeout. THE TRANSACTION FAILED OR EXPIRED.");
            setStep("initial");
            setIsProcessing(false);
            return;
          }

          try {
            const statusData = await mpesaApi.checkStkStatus(checkoutID);

            if (statusData.status === "SUCCESS") {
              clearInterval(pollTimer);
              handleSuccess();
            } else if (statusData.status === "FAILED") {
              clearInterval(pollTimer);
              const failureReason = statusData.resultDesc || "Transaction was not completed.";
              alert(`AUTHENTICATION FAILED: ${failureReason}`);
              setStep("initial");
              setIsProcessing(false);
            }
          } catch (pollErr) {
            console.error("Status check failed", pollErr);
          }
        }, 1500);

        const countdown = setInterval(() => {
          setTimer(prev => {
            if (prev <= 1) {
              clearInterval(countdown);
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

      } else {
        alert("Gateway Rejected: " + (data.errorMessage || data.error));
        setStep("initial");
        setIsProcessing(false);
      }
    } catch (err) {
      alert("Handshake Failed. Check Connection.");
      setStep("initial");
      setIsProcessing(false);
    }
  };

  const handleSuccess = () => {
    setStep("success");
    
    const withdrawalAmount = Number(withdrawInput) || 0;
    const currentBalance = Number(user?.balance) || 0;
    const currentWithdrawable = Number(user?.withdrawableBalance) || 0;
    const newBalance = Math.max(0, currentBalance - withdrawalAmount);

    updateUser({ 
      isActivated: true,
      withdrawableBalance: currentWithdrawable + withdrawalAmount,
      balance: newBalance
    });

    localStorage.setItem("isActivated", "true");
    setTimeout(() => {
      router.push("/home");
    }, 2500);
  };

  if (!user) return null;

  return (
    <PageWrapper>
      <BackHeader title="Account Trust" onBack={() => router.push('/home')} />

      <ContentContainer>
        <MainCard>
          {step !== "success" ? (
            <>
              <Title>Withdrawal Activation</Title>
              <Subtitle>
                Secure your payout channel. This is a one-time verification required for instant withdrawals.
              </Subtitle>

              <FormSection>
                <InfoBox>
                  ?? <b>PROCEED:</b> Enter the amount you wish to withdraw. The system will calculate your activation fee based on liquidity brackets.
                </InfoBox>
                
                <InputGroup>
                  <Label>Withdrawal Amount (Min 100)</Label>
                  <Input 
                    type="number" 
                    value={withdrawInput}
                    onChange={(e) => setWithdrawInput(e.target.value)}
                    placeholder="e.g. 500"
                  />
                  <StatsRow>
                    <StatLabel>Available Balance</StatLabel>
                    <StatValue>KES {Number(user.balance).toLocaleString()}</StatValue>
                  </StatsRow>
                </InputGroup>

                <StatsRow style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '12px' }}>
                  <StatLabel>Activation Fee</StatLabel>
                  <StatValue style={{ color: '#3b82f6', fontSize: '1.1rem' }}>KES {activationFee.toLocaleString()}.00</StatValue>
                </StatsRow>
              </FormSection>

              {step === "initial" && (
                <ActivateButton 
                  onClick={handlePay} 
                  disabled={isProcessing || withdrawInput === "" || currentAmount < 100 || currentAmount > Number(user.balance)}
                >
                  {withdrawInput === "" ? "ENTER AMOUNT" :
                   currentAmount < 100 ? "MIN KES 100" : 
                   currentAmount > Number(user.balance) ? "LIMIT EXCEEDED" : 
                   "ACTIVATE NOW"}
                </ActivateButton>
              )}

              {(step === "processing" || step === "waiting") && (
                <div style={{ textAlign: 'center', padding: '10px 0' }}>
                  <div style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '8px', color: '#ffffff', textTransform: 'uppercase' }}>
                    {step === "processing" ? "CONNECTING..." : "CHECK YOUR PHONE"}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '20px', fontWeight: 500 }}>
                    {step === "processing" ? "Securing handshake with Safaricom..." : "Enter M-PESA PIN to complete."}
                  </div>
                  <TimerText>{timer}s</TimerText>
                </div>
              )}
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
               <div style={{ fontSize: '3.5rem', marginBottom: '16px' }}>?</div>
               <Title style={{ color: '#22c55e' }}>Activated</Title>
               <Subtitle>Your withdrawal channel is operational. Your wallet balance has been updated.</Subtitle>
               <div style={{ fontSize: '0.75rem', color: '#22c55e', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px' }}>REDIRECTING...</div>
            </div>
          )}
        </MainCard>
        
        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/15/M-PESA_LOGO-01.svg/512px-M-PESA_LOGO-01.svg.png" 
               alt="M-Pesa" style={{ height: '24px', opacity: 0.6, filter: 'grayscale(1)' }} />
          <div style={{ color: '#64748b', fontSize: '0.7rem', marginTop: '10px', textTransform: 'uppercase', letterSpacing: '1px' }}>
            SSL SECURED & ENCRYPTED
          </div>
        </div>
      </ContentContainer>
    </PageWrapper>
  );
}
