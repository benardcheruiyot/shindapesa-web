"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { useUser } from '@/context/UserContext';

const Wrapper = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #001f3f 0%, #003366 50%, #1851a3 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
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

const Card = styled.div`
  width: 90vw;
  max-width: 420px;
  margin: 100px auto 40px auto;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  padding: 40px 24px 32px 24px;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 800;
  color: #fff;
  margin-bottom: 8px;
  text-align: center;
  background: linear-gradient(to right, #ffffff, #ffe066);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const Subtitle = styled.div`
  font-size: 1.05rem;
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
  width: 100%;
`;

const Label = styled.label`
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.9);
  margin-bottom: 8px;
  font-weight: 700;
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
  font-family: inherit;
  outline: none;
  box-sizing: border-box;
  &::placeholder {
    color: rgba(255, 255, 255, 0.3);
  }
  &:focus {
    border-color: #ffe066;
    background: rgba(255, 255, 255, 0.1);
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 24px;
  width: 100%;
  align-self: flex-start;
`;

const Checkbox = styled.input`
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: #ffe066;
`;

const CheckboxLabel = styled.label`
  font-size: 1rem;
  color: #ccd6f6;
  font-weight: 600;
  cursor: pointer;
`;

const SignInButton = styled.button`
  width: 100%;
  background: #ffe066;
  color: #001f3f;
  font-size: 1.1rem;
  font-weight: 800;
  border: none;
  border-radius: 12px;
  padding: 16px 0;
  margin-top: 4px;
  margin-bottom: 20px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 10px 20px -5px rgba(255, 224, 102, 0.2);

  &:hover {
    transform: translateY(-2px);
    background: #fff;
  }
`;

const ChangePasswordLink = styled.a`
  color: #ffe066;
  font-weight: 700;
  font-size: 0.95rem;
  margin-bottom: 24px;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const BottomText = styled.div`
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.6);
  text-align: center;
`;

const SignUpLink = styled.a`
  color: #ffe066;
  font-weight: 700;
  margin-left: 6px;
  text-decoration: none;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const LoginScreen = () => {
  const router = useRouter();
  const { refreshUser } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      setError('Please fill in all fields');
      return;
    }

    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => 
      (u.username === username || u.phone === username) && u.password === password
    );

    if (user) {
      // Save full user object to currentUser
      localStorage.setItem('currentUser', JSON.stringify(user));
      
      // Legacy support for other parts of the app (optional but safe)
      localStorage.setItem('userName', user.username || user.name);
      localStorage.setItem('userPhone', user.phone || user.phoneNumber);
      localStorage.setItem('collectedAmount', (user.balance || 0).toString());
      localStorage.setItem('userClicks', (user.clicks || 0).toString());
      localStorage.setItem('welcomeSpinsFinished', user.welcomeSpinsFinished ? 'true' : 'false');
      localStorage.setItem('isActivated', user.isActivated ? 'true' : 'false');
      
      refreshUser(); // Update context
      router.push('/home');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <Wrapper>
      <HeaderBar>
        <span style={{ fontSize: '1.5rem', marginRight: 15, cursor: 'pointer' }} onClick={() => router.push('/')}>&larr;</span>
        <span style={{ fontWeight: 700 }}>Sign In</span>
      </HeaderBar>
      <Card>
        <Title>Welcome Back!</Title>
        <Subtitle>Sign in to continue winning KES</Subtitle>
        
        {error && (
          <div style={{ background: 'rgba(255, 77, 77, 0.1)', border: '1px solid #ff4d4d', color: '#ff4d4d', padding: '12px', borderRadius: '8px', marginBottom: '20px', width: '100%', textAlign: 'center', fontSize: '0.9rem', fontWeight: 600 }}>
            {error}
          </div>
        )}
        
        <Form onSubmit={handleLogin}>
          <FormGroup>
            <Label>Username</Label>
            <Input 
              type="text" 
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Password</Label>
            <Input 
              type="password" 
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>

          <SignInButton type="submit">Sign In</SignInButton>
        </Form>
        
        <BottomText>
          Don't have an account? <SignUpLink href="/register">Sign up here</SignUpLink>
        </BottomText>
      </Card>
    </Wrapper>
  );
};

export default LoginScreen;

