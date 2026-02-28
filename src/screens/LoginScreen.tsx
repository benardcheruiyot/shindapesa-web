"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { useUser } from '@/context/UserContext';
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
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.45);
  text-align: center;
  margin-bottom: 48px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const Form = styled.form`
  width: 100%;
`;

const LoginScreen = () => {
  const router = useRouter();
  const { refreshUser, user, loading } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Already logged in? Go home.
  React.useEffect(() => {
    if (!loading && user) {
      router.push('/home');
    }
  }, [user, loading, router]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Required fields are empty.');
      return;
    }

    const user = userService.findUser(username);

    if (user && user.password === password) {
      userService.saveUser(user, true);
      refreshUser();
      router.push('/home');
    } else {
      setError('Invalid credentials provided.');
    }
  };

  return (
    <PageWrapper>
      <BackHeader onClick={() => router.push('/')}>
        <span>&larr;</span>
        BACK
      </BackHeader>
      <AuthCard>
        <StyledTitle>Welcome Back</StyledTitle>
        <Subtitle>Login to your account to start winning.</Subtitle>
        
        {error && <ErrorMessage>{error}</ErrorMessage>}
        
        <Form onSubmit={handleLogin}>
          <FormGroup>
            <StyledLabel>Username</StyledLabel>
            <StyledInput 
              type="text" 
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormGroup>
          
          <FormGroup>
            <StyledLabel>Password</StyledLabel>
            <StyledInput 
              type="password" 
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>

          <PrimaryButton type="submit">Login & Spin</PrimaryButton>
        </Form>
        
        <BottomText>
          New here? <span onClick={() => router.push('/register')}>Create Account</span>
        </BottomText>

        <SecureBadge>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          SSL SECURED & ENCRYPTED
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

export default LoginScreen;

