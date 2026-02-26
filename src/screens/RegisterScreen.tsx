
"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Wrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #001f3f 0%, #003366 50%, #1851a3 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 40px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
`;

const HeaderBar = styled.div`
  width: 100vw;
  height: 60px;
  background: rgba(0, 31, 63, 0.8);
  backdrop-filter: blur(10px);
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
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

const Card = styled.div`
  width: 90vw;
  max-width: 440px;
  margin-top: 100px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  padding: 40px 24px;
  animation: ${fadeIn} 0.8s ease-out;
`;

const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 8px;
  text-align: center;
  background: linear-gradient(to right, #ffffff, #ffe066);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.div`
  font-size: 1rem;
  color: #ccd6f6;
  margin-bottom: 32px;
  text-align: center;
  font-weight: 500;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 8px;
  font-weight: 600;
  padding-left: 4px;
`;

const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
  font-family: inherit;
  outline: none;
  transition: all 0.2s;
  box-sizing: border-box;

  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }

  &:focus {
    border-color: #ffe066;
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 0 4px rgba(255, 224, 102, 0.1);
  }
`;

const ReferralHint = styled.div`
  font-size: 0.85rem;
  color: rgba(255, 224, 102, 0.8);
  margin-bottom: 20px;
  margin-top: -12px;
  padding: 0 4px;
  line-height: 1.4;
`;

const ErrorMsg = styled.div`
  color: #ff4d4d;
  background: rgba(255, 77, 77, 0.1);
  border: 1px solid rgba(255, 77, 77, 0.2);
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 20px;
  text-align: center;
  font-size: 0.9rem;
  font-weight: 500;
`;

const CreateButton = styled.button`
  width: 100%;
  background: #ffe066;
  color: #001f3f;
  font-size: 1.1rem;
  font-weight: 800;
  border: none;
  border-radius: 12px;
  padding: 16px 0;
  margin-top: 10px;
  margin-bottom: 12px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 10px 20px -5px rgba(255, 224, 102, 0.2);

  &:hover {
    transform: translateY(-2px);
    background: #fff;
    box-shadow: 0 15px 30px -5px rgba(255, 224, 102, 0.3);
  }

  &:active {
    transform: translateY(0);
  }
`;

const BottomText = styled.div`
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
  margin-top: 15px;
`;

const SignInLink = styled.a`
  color: #ffe066;
  font-weight: 700;
  margin-left: 6px;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const RegisterScreen = () => {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !phoneNumber || !password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    setError('');
    
    // Save user data to localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    if (users.find((u: any) => u.username === username || u.phoneNumber === phoneNumber)) {
      setError('Username or Phone already registered');
      return;
    }

    // Process Referral if provided
    let updatedUsers = [...users];
    if (referralCode.trim()) {
      const referrerIdx = updatedUsers.findIndex(u => u.username.toLowerCase() === referralCode.trim().toLowerCase());
      if (referrerIdx !== -1) {
        // Credit the referrer KES 100 and increment their clicks/referrals
        updatedUsers[referrerIdx] = {
          ...updatedUsers[referrerIdx],
          balance: (updatedUsers[referrerIdx].balance || 0) + 100,
          clicks: (updatedUsers[referrerIdx].clicks || 0) + 1
        };
      }
    }
    
    updatedUsers.push({ 
      username, 
      phoneNumber, 
      password, 
      balance: 1000, 
      clicks: 0,
      referralBy: referralCode, // Track who referred them
      welcomeSpinsFinished: false,
      isActivated: false 
    });
    
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    localStorage.setItem('userName', username);
    localStorage.setItem('userPhone', phoneNumber);
    localStorage.setItem('collectedAmount', '1000');
    localStorage.setItem('userClicks', '0');
    localStorage.setItem('welcomeSpinsFinished', 'false');
    localStorage.setItem('isActivated', 'false');
    
    router.push('/home');
  };

  return (
    <Wrapper>
      <HeaderBar>
        <BackArrow onClick={() => router.push('/login')}>&larr;</BackArrow>
        <HeaderTitle>Create Account</HeaderTitle>
      </HeaderBar>
      <Card>
        <Title>Join ShindaPesa</Title>
        <Subtitle>Start with KES 1000 bonus!</Subtitle>
        
        <Form onSubmit={handleRegister}>
          <FormGroup>
            <Label>Username</Label>
            <Input
              type="text"
              placeholder="Choose a unique username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>Phone Number</Label>
            <Input
              type="text"
              placeholder="e.g. 0712345678"
              value={phoneNumber}
              onChange={e => setPhoneNumber(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>Referral Code (Optional)</Label>
            <Input
              type="text"
              placeholder="Enter your friend's code"
              value={referralCode}
              onChange={e => setReferralCode(e.target.value)}
            />
          </FormGroup>
          <ReferralHint>💡 Get extra bonus points when you join using a link!</ReferralHint>

          <FormGroup>
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="Minimum 6 characters"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>Confirm Password</Label>
            <Input
              type="password"
              placeholder="Repeat your password"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </FormGroup>

          {error && <ErrorMsg>{error}</ErrorMsg>}
          
          <CreateButton type="submit">Create Account</CreateButton>
        </Form>
        
        <BottomText>
          Already have an account? <SignInLink href="/login">Sign in here</SignInLink>
        </BottomText>
      </Card>
    </Wrapper>
  );
};

export default RegisterScreen;

