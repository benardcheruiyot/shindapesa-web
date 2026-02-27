"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styled from 'styled-components';
import { useUser } from '@/context/UserContext';
import { userService } from '@/services/userService';

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: #0a0a0b;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #ffffff;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  background-image: 
    radial-gradient(circle at 50% 0%, rgba(212, 175, 55, 0.05) 0%, transparent 50%);
`;

const Card = styled.div`
  width: 90vw;
  max-width: 440px;
  background: rgba(24, 24, 27, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 48px 32px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.5);

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
`;
const Subtitle = styled.p`
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  margin-bottom: 32px;
`;

const Form = styled.form`
  width: 100%;
`;

const FormGroup = styled.div`
  margin-bottom: 24px;
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

const SignUpLink = styled.span`
  color: #d4af37;
  cursor: pointer;
  font-weight: 800;
  margin-left: 5px;
  
  &:hover {
    text-decoration: underline;
  }
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
    <Wrapper>
      <HeaderBar onClick={() => router.push('/')}>
        <span style={{ fontSize: '1.2rem', marginRight: 10 }}>&larr;</span>
        BACK
      </HeaderBar>
      <Card>
        <Title>Welcome Back</Title>
        <Subtitle>Login to your account to start winning.</Subtitle>
        
        {error && (
          <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid #ef4444', color: '#ef4444', padding: '12px', borderRadius: '8px', marginBottom: '20px', width: '100%', textAlign: 'center', fontSize: '0.85rem', fontWeight: 800 }}>
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
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormGroup>

          <Button type="submit">Login & Spin</Button>
        </Form>
        
        <BottomText style={{ marginTop: '24px' }}>
          New here? <SignUpLink onClick={() => router.push('/register')}>Create Account</SignUpLink>
        </BottomText>
      </Card>
    </Wrapper>
  );
};

export default LoginScreen;

