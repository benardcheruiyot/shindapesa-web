"use client";
import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { ShieldCheck, Info } from "lucide-react";

const pulse = keyframes`
  0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.3); }
  70% { transform: scale(1); box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
  100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
`;

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const CardContainer = styled.section`
  background: rgba(17, 24, 39, 0.7);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 24px;
  width: 100%;
  max-width: 480px;
  margin: 0 auto;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.5), transparent);
  }
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.h2`
  color: #f3f4f6;
  font-size: 1.25rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const BalanceLabel = styled.p`
  color: #9ca3af;
  font-size: 0.875rem;
  margin-bottom: 4px;
`;

const BalanceAmount = styled.p`
  color: #3b82f6;
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -0.025em;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Label = styled.label`
  color: #d1d5db;
  font-size: 0.875rem;
  font-weight: 500;
`;

const InputWrapper = styled.div`
  position: relative;
`;

const StyledInput = styled.input`
  width: 100%;
  background: rgba(31, 41, 55, 0.5);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 12px 16px;
  color: #fff;
  font-size: 1rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: #3b82f6;
    background: rgba(31, 41, 55, 0.8);
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }

  &::placeholder {
    color: #6b7280;
  }
`;

const Hint = styled.p`
  color: #6b7280;
  font-size: 0.75rem;
  margin-top: 4px;
`;

const SubmitButton = styled.button<{ isLoading?: boolean }>`
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  color: white;
  border: none;
  border-radius: 12px;
  padding: 14px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
  opacity: ${props => props.isLoading ? 0.7 : 1};
  pointer-events: ${props => props.isLoading ? "none" : "auto"};

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(37, 99, 235, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;

const StatusBox = styled.div<{ type: "success" | "error" | "info" }>`
  padding: 12px;
  border-radius: 12px;
  font-size: 0.875rem;
  background: ${props => 
    props.type === "success" ? "rgba(16, 185, 129, 0.1)" : 
    props.type === "error" ? "rgba(239, 68, 68, 0.1)" : 
    "rgba(59, 130, 246, 0.1)"};
  border: 1px solid ${props => 
    props.type === "success" ? "rgba(16, 185, 129, 0.2)" : 
    props.type === "error" ? "rgba(239, 68, 68, 0.2)" : 
    "rgba(59, 130, 246, 0.2)"};
  color: ${props => 
    props.type === "success" ? "#10b981" : 
    props.type === "error" ? "#ef4444" : 
    "#3b82f6"};
  display: flex;
  align-items: center;
  gap: 8px;
`;

const LimitsInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px;
  background: rgba(31, 41, 55, 0.3);
  border-radius: 12px;
  font-size: 0.75rem;
  color: #9ca3af;
`;

const WithdrawCard: React.FC = () => {
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{ type: "success" | "error" | "info"; message: string } | null>(null);

  const handleWithdraw = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount)) || Number(amount) < 10) {
      setStatus({ type: "error", message: "Minimum withdrawal is KES 10" });
      return;
    }

    setIsLoading(true);
    setStatus({ type: "info", message: "Processing withdrawal..." });

    try {
      // API call logic would go here
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStatus({ type: "success", message: "Withdrawal request sent successfully!" });
      setAmount("");
    } catch (error) {
      setStatus({ type: "error", message: "Failed to process withdrawal. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CardContainer>
      <Header>
        <Title>
          <ShieldCheck size={20} color="#3b82f6" />
          Secure Withdraw
        </Title>
      </Header>

      <div style={{ marginBottom: "24px" }}>
        <BalanceLabel>Available Balance</BalanceLabel>
        <BalanceAmount>KES 2,450.00</BalanceAmount>
      </div>

      <Form onSubmit={handleWithdraw}>
        <InputGroup>
          <Label>Amount to Withdraw</Label>
          <InputWrapper>
            <StyledInput 
              type="text" 
              placeholder="Min KES 10"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </InputWrapper>
          <Hint>Transaction fee: KES 0.00</Hint>
        </InputGroup>

        <LimitsInfo>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Min Withdrawal:</span>
            <span style={{ color: "#f3f4f6" }}>KES 10</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span>Max Daily Limit:</span>
            <span style={{ color: "#f3f4f6" }}>KES 50,000</span>
          </div>
        </LimitsInfo>

        {status && (
          <StatusBox type={status.type}>
            <Info size={16} />
            {status.message}
          </StatusBox>
        )}

        <SubmitButton type="submit" isLoading={isLoading}>
          {isLoading ? "Processing..." : "Withdraw Funds"}
        </SubmitButton>
      </Form>
    </CardContainer>
  );
};

export default WithdrawCard;
