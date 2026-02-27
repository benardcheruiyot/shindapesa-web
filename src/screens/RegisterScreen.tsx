
"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styled, { keyframes } from 'styled-components';
import { useUser } from '@/context/UserContext';
import { User } from '@/types';
import { userService } from '@/services/userService';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: #0a0a0b;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 60px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  color: #ffffff;
  background-image: 
    radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.05) 0%, transparent 50%);
`;

const Card = styled.div`
  width: 90vw;
  max-width: 440px;
  margin-top: 100px;
  background: rgba(24, 24, 27, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 48px 32px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.5);
  animation: ${fadeIn} 0.8s ease-out;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; width: 100%; height: 6px;
    background: linear-gradient(90deg, #d4af37, #f0d78c, #d4af37);
  }
`;

const Title = styled.h1`
  font-size: 2.2rem;
  font-weight: 950;
  color: #ffffff;
  margin-bottom: 8px;
  text-align: center;
  letter-spacing: -1.5px;
`;

const Input = styled.input`
  width: 100%;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  font-size: 1rem;
  background: rgba(255, 255, 255, 0.05);
  color: #ffffff;
  outline: none;
  box-sizing: border-box;
  transition: all 0.2s;
  
  &:focus {
    border-color: #d4af37;
    background: rgba(255, 255, 255, 0.1);
    box-shadow: 0 0 0 2px rgba(212, 175, 55, 0.2);
  }
`;

const Button = styled.button`
  width: 100%;
  padding: 18px;
  background: linear-gradient(135deg, #d4af37 0%, #b8860b 100%);
  color: #fff;
  border: none;
  border-radius: 14px;
  font-weight: 900;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s;
  margin-top: 24px;
  text-transform: uppercase;
  letter-spacing: 1px;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(212, 175, 55, 0.15);
  }
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Subtitle = styled.p`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  margin-bottom: 32px;
`;

const Form = styled.form`
  width: 100%;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 0.75rem;
  font-weight: 800;
  color: #d4af37;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 8px;
`;

const HeaderBar = styled.div`
  position: absolute;
  top: 40px;
  left: 40px;
  display: flex;
  align-items: center;
  color: #d4af37;
  font-weight: 800;
  cursor: pointer;
  z-index: 10;
`;

const BottomText = styled.div`
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  font-weight: 500;
`;

const SignInLink = styled.span`
  color: #d4af37;
  cursor: pointer;
  font-weight: 800;
  margin-left: 5px;
  
  &:hover {
    text-decoration: underline;
  }
`;

const RegisterScreen = () => {
  const router = useRouter();
  const { refreshUser, user, loading } = useUser();
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [error, setError] = useState('');

  // Already logged in? Go home.
  React.useEffect(() => {
    if (!loading && user) {
      router.push('/home');
    }
  }, [user, loading, router]);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !phoneNumber || !password || !confirmPassword) {
      setError('Please fill in all required fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be 6+ characters.');
      return;
    }
    setError('');
    
    // Check if user already exists
    if (userService.findUser(username) || userService.findUser(phoneNumber)) {
      setError('Username or phone already taken.');
      return;
    }

    // Process Referral if provided
    if (referralCode.trim()) {
      userService.processReferral(referralCode);
    }
    
    const newUser: User = { 
      username, 
      name: username,
      phone: phoneNumber,
      phoneNumber,
      password, 
      balance: 0, 
      withdrawableBalance: 0,
      clicks: 0,
      freeSpins: 5,
      referralCredits: 0,
      referralBy: referralCode,
      welcomeSpinsFinished: false,
      isActivated: false 
    };

    userService.saveUser(newUser, true);
    sessionStorage.clear();
    refreshUser();
    window.location.href = '/home'; // Changed from /spin to /home for onboarding
  };

  return (
    <Wrapper>
      <HeaderBar onClick={() => router.push('/login')}>
        <span style={{ fontSize: '1.2rem', marginRight: 10 }}>&larr;</span>
        LOGIN
      </HeaderBar>
      <Card>
        <Title>Join SHINDAPESA</Title>
        <Subtitle>Create an account to start winning today.</Subtitle>
        
        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', color: '#ef4444', padding: '12px', borderRadius: '8px', marginBottom: '20px', width: '100%', textAlign: 'center', fontSize: '0.85rem', fontWeight: 800 }}>
            {error}
          </div>
        )}
        
        <Form onSubmit={handleRegister}>
          <FormGroup>
            <Label>Username</Label>
            <Input
              type="text"
              placeholder="Pick a username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>Phone Number (M-PESA)</Label>
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
              placeholder="Enter invite code"
              value={referralCode}
              onChange={e => setReferralCode(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>Password</Label>
            <Input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <Label>Confirm Password</Label>
            <Input
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </FormGroup>

          <Button type="submit">Sign Up & Spin</Button>
        </Form>
        
        <BottomText style={{ marginTop: '24px' }}>
          Already have an account? <SignInLink onClick={() => router.push('/login')}>Login</SignInLink>
        </BottomText>
      </Card>
    </Wrapper>
  );
};

export default RegisterScreen;

