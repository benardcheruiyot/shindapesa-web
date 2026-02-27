"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { PageWrapper, BackHeader } from "@/components/SharedStyles";

const ContentContainer = styled.div`
  width: 100%;
  max-width: 440px;
  margin: 40px auto 0;
  padding: 0 16px;
`;

const FormCard = styled.div`
  background: rgba(15, 23, 42, 0.8);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 32px;
  padding: 40px;
  text-align: center;
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.5);
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; width: 100%; height: 2px;
    background: linear-gradient(90deg, transparent, #3b82f6, transparent);
  }
`;

const Title = styled.h1`
  font-size: 1.8rem;
  font-weight: 900;
  margin-bottom: 8px;
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: -0.5px;
`;

const Description = styled.p`
  font-size: 0.95rem;
  color: #94a3b8;
  margin-bottom: 32px;
  line-height: 1.6;
  font-weight: 500;
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
  text-align: left;
`;

const Label = styled.label`
  font-size: 0.8rem;
  color: #94a3b8;
  margin-bottom: 8px;
  font-weight: 700;
  display: block;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 16px;
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 12px;
  font-size: 1rem;
  background: rgba(0, 0, 0, 0.2);
  color: #ffffff;
  outline: none;
  font-weight: 600;
  transition: all 0.3s ease;

  &:focus {
    border-color: #3b82f6;
    background: rgba(0, 0, 0, 0.3);
  }
`;

const PrimaryButton = styled.button`
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
  letter-spacing: 1.5px;
  box-shadow: 0 10px 25px rgba(59, 130, 246, 0.2);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 35px rgba(59, 130, 246, 0.3);
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
      <BackHeader title="Recovery" onBack={() => router.push('/login')} />

      <ContentContainer>
        <FormCard>
          {!submitted ? (
            <>
              <div style={{ background: 'rgba(59, 130, 246, 0.1)', width: 64, height: 64, borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                <span style={{ fontSize: '1.5rem' }}>??</span>
              </div>
              <Title>Forgot Password?</Title>
              <Description>
                Enter your registered phone number. We'll send a recovery code via SMS.
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
                <PrimaryButton type="submit">Request Code</PrimaryButton>
              </form>
            </>
          ) : (
            <>
              <div style={{ background: 'rgba(34, 197, 94, 0.1)', width: 64, height: 64, borderRadius: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                <span style={{ fontSize: '1.5rem' }}>?</span>
              </div>
              <Title>Success</Title>
              <Description>
                Check your phone. A reset code was sent to <b style={{ color: '#fff' }}>{phone}</b>.
              </Description>
              <PrimaryButton onClick={() => router.push('/login')}>Return to Login</PrimaryButton>
            </>
          )}
        </FormCard>

        <div style={{ marginTop: 32, textAlign: 'center' }}>
          <div style={{ fontSize: '0.65rem', color: '#64748b', fontWeight: 800, letterSpacing: 2, textTransform: 'uppercase' }}>
            SECURED BY SHINDAPESA AUTH
          </div>
        </div>
      </ContentContainer>
    </PageWrapper>
  );
}
