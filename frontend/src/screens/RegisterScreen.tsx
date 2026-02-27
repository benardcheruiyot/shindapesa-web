
"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { useUser } from '@/context/UserContext';
import { User } from '@/types';
import { userService } from '@/services/userService';
import { 
  PageWrapper, 
  AuthCard, 
  StyledTitle, 
  StyledInput, 
  PrimaryButton, 
  FormGroup, 
  StyledLabel, 
  ErrorMessage, 
  BottomText, 
  BackHeader 
} from '@/components/SharedStyles';

const Subtitle = styled.p`
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  margin-bottom: 32px;
`;

const Form = styled.form`
  width: 100%;
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
    <PageWrapper>
      <BackHeader onClick={() => router.push('/login')}>
        <span>&larr;</span>
        LOGIN
      </BackHeader>
      <AuthCard>
        <StyledTitle>Join SHINDAPESA</StyledTitle>
        <Subtitle>Create an account to start winning today.</Subtitle>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <Form onSubmit={handleRegister}>
          <FormGroup>
            <StyledLabel>Username</StyledLabel>
            <StyledInput
              type="text"
              placeholder="Pick a username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <StyledLabel>Phone Number (M-PESA)</StyledLabel>
            <StyledInput
              type="text"
              placeholder="e.g. 0712345678"
              value={phoneNumber}
              onChange={e => setPhoneNumber(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <StyledLabel>Referral Code (Optional)</StyledLabel>
            <StyledInput
              type="text"
              placeholder="Enter invite code"
              value={referralCode}
              onChange={e => setReferralCode(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <StyledLabel>Password</StyledLabel>
            <StyledInput
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <StyledLabel>Confirm Password</StyledLabel>
            <StyledInput
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
          </FormGroup>

          <PrimaryButton type="submit">Sign Up & Spin</PrimaryButton>
        </Form>
        
        <BottomText>
          Already have an account? <span onClick={() => router.push('/login')}>Login</span>
        </BottomText>

        <SecureBadge>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          256-BIT SECURE ENCRYPTION
        </SecureBadge>
      </AuthCard>
    </PageWrapper>
  );
};

const SecureBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  margin-top: 32px;
  color: rgba(255, 255, 255, 0.2);
  font-size: 0.6rem;
  font-weight: 800;
  letter-spacing: 1px;
  text-transform: uppercase;
  
  svg {
    opacity: 0.5;
  }
`;

export default RegisterScreen;

