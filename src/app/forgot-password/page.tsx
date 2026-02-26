"use client";
import React, { useState } from "react";
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

const ContentContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin-top: 20px;
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
  font-size: 1rem;
  color: #ccd6f6;
  margin-bottom: 32px;
  line-height: 1.5;
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
  text-align: left;
`;

const Label = styled.label`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 8px;
  font-weight: 600;
  display: block;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  outline: none;
  box-sizing: border-box;
  &:focus {
    border-color: #ffe066;
  }
`;

const ResetButton = styled.button`
  width: 100%;
  background: #ffe066;
  color: #001f3f;
  border: none;
  border-radius: 12px;
  padding: 16px;
  font-weight: 800;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s;
  box-shadow: 0 10px 20px -5px rgba(255, 224, 102, 0.3);

  &:hover {
    transform: translateY(-2px);
    background: #fff;
  }
`;

export default function ForgotPassword() {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) return alert("Please enter your phone number");
    setSubmitted(true);
  };

  return (
    <PageWrapper>
      <HeaderBar>
        <BackArrow onClick={() => router.push('/login')}>&larr;</BackArrow>
        <HeaderTitle>Reset Password</HeaderTitle>
      </HeaderBar>

      <ContentContainer>
        <MainCard>
          {!submitted ? (
            <>
              <div style={{ fontSize: '3.5rem', marginBottom: 20 }}>🔑</div>
              <Title>Forgot Password?</Title>
              <Description>
                Enter your registered phone number below. We'll send you a temporary verification code to reset your password.
              </Description>
              <form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label>Phone Number</Label>
                  <Input 
                    type="text" 
                    placeholder="e.g. 0712345678" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </FormGroup>
                <ResetButton type="submit">Send Reset Code</ResetButton>
              </form>
            </>
          ) : (
            <>
              <div style={{ fontSize: '3.5rem', marginBottom: 20 }}>✅</div>
              <Title>Check Your SIM</Title>
              <Description>
                We have sent an SMS with a temporary verification code to <b>{phone}</b>. Please follow the instructions in the message.
              </Description>
              <ResetButton onClick={() => router.push('/login')}>Back to Login</ResetButton>
            </>
          )}
        </MainCard>
      </ContentContainer>
    </PageWrapper>
  );
}
