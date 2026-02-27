"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import AccountBalanceCard from "../components/AccountBalanceCard";
import { useUser } from "@/hooks/useUser";

const Scanline = styled.div`
  width: 100%;
  height: 100px;
  z-index: -1;
  background: linear-gradient(0deg, rgba(0, 0, 0, 0) 0%, rgba(255, 255, 255, 0.02) 50%, rgba(0, 0, 0, 0) 100%);
  opacity: 0.1;
  position: fixed;
  bottom: 100%;
  pointer-events: none;
  animation: scanline 8s linear infinite;

  @keyframes scanline {
    0% { bottom: 100%; }
    100% { bottom: -100px; }
  }
`;

const PulseIndicator = styled.div`
  width: 8px;
  height: 8px;
  background: #4cd137;
  border-radius: 50%;
  display: inline-block;
  margin-right: 8px;
  box-shadow: 0 0 10px #4cd137;
  animation: pulse 2s infinite;

  @keyframes pulse {
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.5); opacity: 0.5; }
    100% { transform: scale(1); opacity: 1; }
  }
`;

const Container = styled.div`
  min-height: 100vh;
  background: #0a0a0b;
  color: #ffffff;
  padding-bottom: 140px;
  position: relative;
  overflow-x: hidden;
  background-image: 
    radial-gradient(at 0% 0%, rgba(212, 175, 55, 0.05) 0px, transparent 50%),
    radial-gradient(at 100% 0%, rgba(212, 175, 55, 0.03) 0px, transparent 50%),
    radial-gradient(at 100% 100%, rgba(212, 175, 55, 0.05) 0px, transparent 50%),
    radial-gradient(at 0% 100%, rgba(212, 175, 55, 0.03) 0px, transparent 50%);

  &::before {
    content: '';
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: url('https://www.transparenttextures.com/patterns/carbon-fibre.png');
    opacity: 0.1;
    pointer-events: none;
    z-index: -1;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 100;
  max-width: 1240px;
  margin: 0 auto;
  padding: 32px 20px;
`;

const Header = styled.header`
  background: rgba(10, 10, 11, 0.95);
  backdrop-filter: blur(20px);
  color: #ffffff;
  padding: 16px 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 3000;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
  height: 84px;

  @media (max-width: 600px) {
    padding: 16px 20px;
    height: 76px;
  }
`;

const LogoText = styled.div`
  font-size: 1.8rem;
  font-weight: 950;
  background: linear-gradient(135deg, #ffffff 20%, #d4af37 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  letter-spacing: -2px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: scale(0.98);
    opacity: 0.9;
  }
`;

const BalanceBadge = styled.div`
  background: rgba(24, 24, 27, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 8px 18px;
  border-radius: 100px;
  font-size: 1rem;
  font-weight: 950;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  cursor: pointer;
  transition: all 0.2s;

  span:first-child { 
    font-size: 0.75rem; 
    opacity: 0.7; 
    font-weight: 700;
    background: rgba(255, 255, 255, 0.1);
    padding: 2px 6px;
    border-radius: 4px;
  }

  &:hover {
    transform: translateY(-2px);
    border-color: #d4af37;
  }
`;

const WinnersTicker = styled.div`
  background: rgba(24, 24, 27, 0.7);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding: 8px 0;
  overflow: hidden;
  white-space: nowrap;
  font-size: 0.8rem;
  color: #ffffff;
  font-weight: 700;
  position: relative;
  z-index: 5;
`;

const TickerContent = styled.div`
  display: inline-block;
  animation: scroll 80s linear infinite;
  padding-left: 100%;

  @keyframes scroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-100%); }
  }
`;

const CertifiedBadge = styled.div`
  position: absolute;
  top: 24px;
  right: 24px;
  background: rgba(24, 24, 27, 0.8);
  backdrop-filter: blur(10px);
  padding: 8px 16px;
  border-radius: 12px;
  font-size: 0.65rem;
  font-weight: 950;
  color: #4cd137;
  border: 1px solid rgba(76, 209, 55, 0.4);
  display: flex;
  align-items: center;
  gap: 8px;
  z-index: 5;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);

  &::before {
    content: '✓';
    background: #4cd137;
    color: #fff;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.6rem;
    font-weight: 950;
  }
`;

const WalletWrapper = styled.div`
  margin-top: 40px;
  position: relative;
`;

const WalletHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  padding: 0 4px;
  
  span:first-child {
    font-size: 0.65rem;
    font-weight: 950;
    color: rgba(255, 255, 255, 0.5);
    text-transform: uppercase;
    letter-spacing: 3px;
    opacity: 0.7;
    display: flex;
    align-items: center;
    gap: 8px;
    &::before { content: '🛡️'; font-size: 0.8rem; }
  }
  
  .line {
    flex: 1;
    height: 1px;
    background: linear-gradient(to right, rgba(255, 255, 255, 0.1), transparent);
  }
`;

const TransactionID = styled.div`
  font-size: 0.55rem;
  color: rgba(255, 255, 255, 0.3);
  font-family: 'JetBrains Mono', monospace;
  margin-top: 4px;
  letter-spacing: 0.5px;
  font-weight: 600;
`;

const MarketClock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-right: 12px;
  
  .time {
    font-size: 0.85rem;
    font-weight: 900;
    color: #ffffff;
    font-family: 'JetBrains Mono', monospace;
    letter-spacing: -0.5px;
  }
  
  .label {
    font-size: 0.55rem;
    font-weight: 800;
    color: #4cd137;
    text-transform: uppercase;
    letter-spacing: 1px;
  }

  @media (max-width: 600px) {
    display: none;
  }
`;

const FloatingBadge = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background: rgba(24, 24, 27, 0.7);
  backdrop-filter: blur(10px);
  padding: 4px 10px;
  border-radius: 8px;
  font-size: 0.65rem;
  font-weight: 800;
  color: #d4af37;
  border: 1px solid rgba(212, 175, 55, 0.3);
  display: flex;
  align-items: center;
  gap: 5px;
  z-index: 5;
`;

const StyledSectionTitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 950;
  margin: 60px 0 24px;
  display: flex;
  align-items: center;
  gap: 16px;
  color: #ffffff;
  letter-spacing: -1px;

  &::before {
    content: '';
    width: 6px;
    height: 32px;
    background: #d4af37;
    border-radius: 4px;
  }
`;

const VIPLevel = styled.div`
  background: rgba(24, 24, 27, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 24px 28px;
  margin-bottom: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;

  &::before {
    content: 'VIP';
    position: absolute;
    right: -10px;
    top: -10px;
    font-size: 5rem;
    font-weight: 950;
    opacity: 0.05;
    color: #d4af37;
    font-style: italic;
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 6px;
    z-index: 1;
    span:first-child { 
      font-size: 0.8rem; 
      font-weight: 950; 
      color: #d4af37; 
      text-transform: uppercase; 
      letter-spacing: 2px;
      display: flex;
      align-items: center;
      gap: 6px;
      &::before { content: '✦'; font-size: 0.7rem; }
    }
    span:last-child { font-size: 1.25rem; font-weight: 950; color: #ffffff; letter-spacing: -0.5px; }
  }

  .progress-container {
    text-align: right;
    z-index: 1;
  }

  .progress-label {
    font-size: 0.7rem;
    color: rgba(255, 255, 255, 0.5);
    font-weight: 800;
    margin-bottom: 8px;
    letter-spacing: 1px;
    span { color: #d4af37; font-weight: 950; }
  }

  .progress-bar {
    width: 160px;
    height: 8px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 10px;
    position: relative;
    overflow: hidden;
    
    &::after {
      content: '';
      position: absolute;
      top: 0; left: 0; bottom: 0;
      width: 84%;
      background: linear-gradient(to right, #d4af37, #f0d78c);
      border-radius: 10px;
    }
  }

  @media (max-width: 600px) {
    padding: 16px 20px;
    .progress-bar { width: 100px; }
  }
`;

const HeroBanner = styled.section`
  background: linear-gradient(135deg, #0a0a0b 0%, #18181b 100%);
  border-radius: 40px;
  padding: 60px 48px;
  margin-bottom: 48px;
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 380px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.3);

  &::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background: linear-gradient(to right, #0a0a0b 20%, transparent 100%);
    z-index: 1;
  }
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 550px;
`;

const HeroTitle = styled.h1`
  font-size: 3rem;
  font-weight: 950;
  margin: 12px 0;
  letter-spacing: -2px;
  line-height: 1;
  color: #fff;
  
  span {
    color: #d4af37;
  }

  @media (max-width: 600px) {
    font-size: 2.2rem;
  }
`;

const HeroButton = styled.button`
  padding: 18px 36px;
  border-radius: 20px;
  background: linear-gradient(135deg, #d4af37 0%, #b8860b 100%);
  border: none;
  color: #fff;
  font-weight: 900;
  font-size: 1.1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 15px 30px rgba(212, 175, 55, 0.3);

  &:hover {
    transform: scale(1.05) translateY(-5px);
    box-shadow: 0 20px 40px rgba(212, 175, 55, 0.4);
  }
`;

const StyledBadge = styled.span`
  background: #d4af37;
  color: #fff;
  padding: 4px 12px;
  border-radius: 100px;
  font-size: 0.7rem;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 16px;
  display: inline-block;
`;

const AccountStatusBadge = styled.div`
  background: rgba(255, 0, 0, 0.05);
  border: 1px solid rgba(255, 0, 0, 0.2);
  color: #d63031;
  padding: 12px 20px;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 800;
  margin-bottom: 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  animation: slideIn 0.5s ease-out;

  span {
    background: #d63031;
    color: #fff;
    padding: 2px 8px;
    border-radius: 6px;
    font-size: 0.6rem;
    letter-spacing: 1px;
  }
`;

const ExclusiveTag = styled.span`
  background: rgba(212, 175, 55, 0.1);
  color: #d4af37;
  padding: 2px 8px;
  border-radius: 6px;
  font-size: 0.6rem;
  font-weight: 950;
  margin-left: 8px;
  border: 1px solid rgba(212, 175, 55, 0.2);
`;

const VerificationProgressWrapper = styled.div`
  margin-bottom: 40px;
  background: rgba(24, 24, 27, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(255, 255, 255, 0.05);
  }
`;

const ProgressSteps = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 15px; left: 10%; right: 10%;
    height: 2px;
    background: rgba(255, 255, 255, 0.1);
    z-index: 0;
  }
`;

const ProgressStep = styled.div<{ $active?: boolean, $pending?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  z-index: 1;
  width: 33%;

  .dot {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    background: ${props => props.$active ? '#4cd137' : props.$pending ? 'rgba(212, 175, 55, 0.2)' : 'rgba(255, 255, 255, 0.05)'};
    color: ${props => props.$active ? '#000' : props.$pending ? '#d4af37' : 'rgba(255, 255, 255, 0.2)'};
    border: 2px solid ${props => props.$active ? '#4cd137' : props.$pending ? '#d4af37' : 'rgba(255, 255, 255, 0.1)'};
    ${props => props.$pending && `animation: pulse-gold 2s infinite;`}
  }

  .label {
    font-size: 0.65rem;
    font-weight: 800;
    color: ${props => props.$active ? '#4cd137' : props.$pending ? '#d4af37' : 'rgba(255, 255, 255, 0.3)'};
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  @keyframes pulse-gold {
    0% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0.4); }
    70% { box-shadow: 0 0 0 10px rgba(212, 175, 55, 0); }
    100% { box-shadow: 0 0 0 0 rgba(212, 175, 55, 0); }
  }
`;

const BankGradeText = styled.div`
  font-size: 0.65rem;
  color: rgba(255, 255, 255, 0.3);
  text-align: center;
  margin-top: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-weight: 700;
  letter-spacing: 0.5px;

  &::before { content: '🔒'; font-size: 0.7rem; }
`;

const PayoutList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 15px;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 20px;
  padding: 10px;
  border: 1px solid rgba(255, 255, 255, 0.03);
`;

const PayoutItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  background: rgba(0, 0, 150, 0.3);
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);

  &::before {
    content: '';
    position: absolute;
    left: 0; top: 0; bottom: 0;
    width: 4px;
    background: linear-gradient(to bottom, #4cd137, #2ecc71);
    opacity: 0.8;
  }

  &:hover {
    transform: translateX(8px);
    border-color: rgba(76, 209, 55, 0.3);
    box-shadow: 0 8px 25px rgba(0,0,0,0.4);
  }

  .user {
    display: flex;
    flex-direction: column;
    gap: 4px;
    
    .name-row {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .name {
      font-weight: 800;
      color: #ffffff;
      font-size: 1rem;
      letter-spacing: -0.2px;
    }
    
    .verified-tag {
      font-size: 0.6rem;
      font-weight: 900;
      background: rgba(76, 209, 55, 0.2);
      color: #4cd137;
      padding: 2px 8px;
      border-radius: 6px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      border: 1px solid rgba(76, 209, 55, 0.3);
    }

    .phone {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.75rem;
      color: rgba(255, 255, 255, 0.5);
      display: flex;
      align-items: center;
      gap: 5px;
      &::before { content: '✓'; color: #4cd137; font-weight: 900; }
    }
  }

  .amount {
    text-align: right;
    
    .value {
      color: #4cd137;
      font-weight: 950;
      font-size: 1.1rem;
      text-shadow: 0 0 15px rgba(76, 209, 55, 0.3);
    }
    .time {
      font-size: 0.65rem;
      color: rgba(255, 255, 255, 0.4);
      text-transform: uppercase;
      font-weight: 700;
      letter-spacing: 0.5px;
      margin-top: 3px;
    }
  }
`;

const TrustSection = styled.div`
  margin: 40px 0 120px;
  text-align: center;
  padding: 30px 20px;
  background: rgba(0, 0, 150, 0.2);
  border-radius: 30px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

  .title {
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 3px;
    font-weight: 700;
    margin-bottom: 25px;
  }

  .logos {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 40px;
    opacity: 0.8;
    filter: brightness(0) invert(1);
    transition: all 0.4s ease;

    &:hover {
      opacity: 1;
      filter: brightness(0) invert(1) contrast(1.2);
    }

    div {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 8px;
    }
  }

  .badge {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.7);
    font-weight: 700;
  }
`;

const BottomNav = styled.nav`
  position: fixed;
  bottom: 24px;
  left: 20px;
  right: 20px;
  background: rgba(10, 10, 11, 0.95);
  backdrop-filter: blur(25px);
  height: 76px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 28px;
  padding: 0 10px;
  z-index: 9999;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
  max-width: 600px;
  margin: 0 auto;
`;

const NavItem = styled.div<{ $active?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  color: ${props => props.$active ? '#d4af37' : 'rgba(255, 255, 255, 0.5)'};
  font-size: 0.7rem;
  font-weight: 800;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  padding: 10px;
  border-radius: 18px;

  span:first-child {
    font-size: 1.5rem;
    transition: transform 0.2s ease;
  }

  &:hover {
    color: #d4af37;
    background: rgba(212, 175, 55, 0.1);
    span:first-child { transform: translateY(-4px); }
  }

  ${props => props.$active && `
    position: relative;
    &::after {
      content: '';
      position: absolute;
      top: -10px; 
      width: 6px; height: 6px;
      background: #d4af37;
      border-radius: 50%;
      box-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
    }
  `}
`;

const WinningToast = styled.div<{ $visible: boolean }>`
  position: fixed;
  bottom: 110px;
  left: 20px;
  background: rgba(24, 24, 27, 0.95);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(76, 209, 55, 0.4);
  padding: 12px 20px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  z-index: 2000;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);
  transform: translateY(${props => props.$visible ? '0' : '150px'});
  opacity: ${props => props.$visible ? '1' : '0'};
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);

  .icon {
    width: 32px;
    height: 32px;
    background: rgba(76, 209, 55, 0.2);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #4cd137;
    font-size: 1rem;
  }

  .text {
    .name { font-weight: 800; font-size: 0.85rem; color: #ffffff; display: block; }
    .win { font-size: 0.75rem; color: #4cd137; font-weight: 700; }
  }
`;

export default function HomeScreen() {
  const { user, loading, logout } = useUser();
  const router = useRouter();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [tickerWinners, setTickerWinners] = useState<string[]>([]);
  const [recentPayouts, setRecentPayouts] = useState<{ id: number, phone: string, amount: number, time: string, txId: string }[]>([]);
  const [livePlayers, setLivePlayers] = useState(12402);
  const [jackpot, setJackpot] = useState(542840);
  const [toast, setToast] = useState({ visible: false, name: "", amount: 0 });

  useEffect(() => {
    const clockTimer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(clockTimer);
  }, []);

  useEffect(() => {
    // Dynamic stats simulation
    const statsTimer = setInterval(() => {
      setLivePlayers(prev => prev + (Math.random() > 0.5 ? 1 : -1));
      setJackpot(prev => prev + Math.floor(Math.random() * 50));
    }, 3000);

    // Simulated toast notifications
    const toastTimer = setInterval(() => {
      if (Math.random() > 0.7) {
        setToast({
          visible: true,
          name: `User ***${Math.floor(100 + Math.random() * 900)}`,
          amount: [500, 800, 1200, 2500, 5000, 750, 1500][Math.floor(Math.random() * 7)]
        });
        setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 4000);
      }
    }, 10000);

    return () => {
      clearInterval(statsTimer);
      clearInterval(toastTimer);
    };
  }, []);

  useEffect(() => {
    // Generate some fake winners for social proof
    const prefixes = ["071", "072", "079", "075", "011", "074"];
    const amounts = [500, 1500, 2500, 5000, 10000, 800, 1200];
    const fakeWinners = Array.from({ length: 15 }).map(() => {
      const pref = prefixes[Math.floor(Math.random() * prefixes.length)];
      const amt = amounts[Math.floor(Math.random() * amounts.length)];
      const suffix = Math.floor(100 + Math.random() * 900);
      return `🎉 ${pref}***${suffix} just won KES ${amt.toLocaleString()}!  •  `;
    });
    setTickerWinners(fakeWinners);

    // Generate recent payouts
    const generateTxId = () => {
      const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
      let res = "";
      for (let i = 0; i < 8; i++) res += chars.charAt(Math.floor(Math.random() * chars.length));
      return `#MPSA-${res}`;
    };

    const payouts = Array.from({ length: 5 }).map((_, i) => ({
       id: i,
       phone: `${prefixes[Math.floor(Math.random() * prefixes.length)]}***${Math.floor(100 + Math.random() * 900)}`,
       amount: amounts[Math.floor(Math.random() * amounts.length)],
       time: `${Math.floor(Math.random() * 59) + 1} mins ago`,
       txId: generateTxId()
    }));
    setRecentPayouts(payouts);
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user && Number(user.freeSpins) > 0) {
      const shown = sessionStorage.getItem("welcomeSpinShown");
      if (!shown) {
        sessionStorage.setItem("welcomeSpinShown", "true");
        router.push("/spin");
      }
    }
  }, [user, router]);

  if (loading || !user) {
    return (
      <div style={{ height: '100vh', background: '#0a0a0b', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d4af37' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: 20 }}>🎡</div>
          <h3>Authenticating...</h3>
        </div>
      </div>
    );
  }

  const freeSpinsCount = Number(user.freeSpins) || 0;

  return (
    <Container>
      <Scanline />
      <WinnersTicker>
        <TickerContent>
          {tickerWinners.join("")}{tickerWinners.join("")}
        </TickerContent>
      </WinnersTicker>

      <Header>
        <LogoText onClick={() => window.location.assign("/home")}>SHINDAPESA</LogoText>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <MarketClock>
            <span className="time">{currentTime.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
            <span className="label">MARKET OPEN</span>
          </MarketClock>

          <div className="live-stats" style={{ display: 'flex', alignItems: 'center', background: 'rgba(76, 209, 55, 0.1)', padding: '6px 14px', borderRadius: '10px', border: '1px solid rgba(76, 209, 55, 0.2)', marginRight: 4 }}>
            <PulseIndicator />
            <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#4cd137', letterSpacing: '0.5px' }}>{livePlayers.toLocaleString()} ONLINE</span>
          </div>
          
          <button 
            onClick={() => window.open('https://t.me/spin_win', '_blank')}
            style={{ 
              background: 'rgba(255,255,255,0.06)', 
              border: '1px solid rgba(255,255,255,0.08)', 
              color: '#fff', 
              padding: '10px', 
              borderRadius: 14, 
              fontSize: '1.2rem', 
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
            }}
            title="Get Support"
          >
             💬
          </button>
          
          <BalanceBadge onClick={() => router.push("/activate-account")} style={{ background: 'rgba(76, 209, 55, 0.05)', borderColor: 'rgba(76, 209, 55, 0.2)' }}>
            <span style={{ color: '#4cd137', background: 'rgba(76, 209, 55, 0.1)' }}>UNLOCKED</span>
            {Number(user.withdrawableBalance).toLocaleString()}
          </BalanceBadge>

          <BalanceBadge onClick={() => router.push("/wallet")}>
            <span>PENDING</span>
            {Number(user.balance).toLocaleString()}
          </BalanceBadge>
        </div>
      </Header>

      <ContentWrapper>
        {!user.isActivated ? (
          <AccountStatusBadge onClick={() => router.push("/activate-account")}>
            ⚠️ ACCOUNT SEMI-VERIFIED: FULL ACTIVATION REQUIRED FOR WITHDRAWALS <span>ACTION REQUIRED</span>
          </AccountStatusBadge>
        ) : (
          <div style={{ background: 'rgba(76, 209, 55, 0.05)', border: '1px solid rgba(76, 209, 55, 0.2)', color: '#4cd137', padding: '12px 20px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 800, marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>🔒 SECURITY PROTOCOL: ACCOUNT FULLY ACTIVATED</span>
            <span style={{ background: '#4cd137', color: '#000', padding: '2px 8px', borderRadius: '6px', fontSize: '0.6rem', letterSpacing: '1px', fontWeight: 950 }}>VERIFIED</span>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, opacity: 0.5 }}>
          <span style={{ fontSize: '0.65rem', fontWeight: 900, letterSpacing: '2px', color: '#d4af37' }}>SYSTEM: ONLINE v2.0.4</span>
          <span style={{ fontSize: '0.65rem', fontWeight: 900, letterSpacing: '2px', color: '#4cd137' }}>STATUS: SECURE 🟢</span>
        </div>

        <VIPLevel>
          <div className="info">
            <span>Spin Tier <ExclusiveTag>LUCKY PLAYER</ExclusiveTag></span>
            <span>Active Spinner</span>
          </div>
          <div className="progress-container">
            <div className="progress-label">WINNING STREAK: <span>84%</span></div>
            <div className="progress-bar" />
          </div>
        </VIPLevel>

        <VerificationProgressWrapper onClick={() => router.push("/activate-account")}>
          <div style={{ marginBottom: 16, textAlign: 'center' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 900, color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '2px' }}>Finalize Account Setup</span>
          </div>
          <ProgressSteps>
            <ProgressStep $active>
              <div className="dot">✓</div>
              <div className="label">Registration</div>
            </ProgressStep>
            <ProgressStep $active>
              <div className="dot">✓</div>
              <div className="label">Gameplay</div>
            </ProgressStep>
            <ProgressStep $pending>
              <div className="dot">!</div>
              <div className="label">Activation</div>
            </ProgressStep>
          </ProgressSteps>
        </VerificationProgressWrapper>
        
        <HeroBanner>
          <CertifiedBadge>Certified Fair</CertifiedBadge>
          <HeroContent>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ height: 2, flex: 1, background: '#d4af37', maxWidth: 40 }} />
              <StyledBadge style={{ marginBottom: 0 }}>Active: Weekly Jackpot</StyledBadge>
            </div>
            <HeroTitle>
              Exclusive Reward: <br/>
              <span>KES 25,000</span> Potential Winnings Locked
            </HeroTitle>
            <p style={{ opacity: 0.8, fontSize: '1.1rem', fontWeight: 500, marginBottom: 32, lineHeight: 1.6, letterSpacing: '0.2px' }}>
              The prize pool is growing every second. Join <strong>{livePlayers.toLocaleString()}</strong> players competing for today's grand payout.
            </p>
            <div style={{ marginBottom: 24, background: 'rgba(255,255,255,0.03)', padding: '12px 16px', borderRadius: '14px', border: '1px solid rgba(255,255,255,0.06)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', fontWeight: 800, marginBottom: 8, color: 'rgba(255,255,255,0.5)' }}>
                <span>WINNING PROBABILITY</span>
                <span style={{ color: '#4cd137' }}>{75 + Math.floor(Math.random() * 20)}% HIGH</span>
              </div>
              <div style={{ height: 4, background: 'rgba(255,255,255,0.1)', borderRadius: 2 }}>
                <div style={{ height: '100%', width: '85%', background: '#4cd137', borderRadius: 2, boxShadow: '0 0 10px #4cd137' }} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 15 }}>
              <HeroButton onClick={() => router.push("/activate-account")}>
                Activate & Win <span style={{ fontSize: '1.2rem' }}>🎁</span>
              </HeroButton>
            </div>
          </HeroContent>
        </HeroBanner>

        <WinningToast $visible={toast.visible}>
          <div className="icon">💰</div>
          <div className="text">
            <span className="name">{toast.name}</span>
            <span className="win">Won KES {toast.amount.toLocaleString()}!</span>
          </div>
        </WinningToast>

        <WalletWrapper>
          <WalletHeader>
            <span>My Winnings & Wallet</span>
            <div className="line" />
          </WalletHeader>
          <AccountBalanceCard 
            balance={Number(user.balance) || 0} 
            withdrawableBalance={Number(user.withdrawableBalance) || 0}
            clicks={Number(user.clicks) || 0} 
            freeSpins={freeSpinsCount}
            referral={Number(user.referralCredits) || 0}
            onWithdraw={() => {
              window.location.assign("/wallet");
            }}
          />
          <BankGradeText>100% Secure & Fair Gameplay</BankGradeText>
        </WalletWrapper>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 60, marginBottom: 24 }}>
          <StyledSectionTitle style={{ margin: 0 }}>Real-Time Payouts</StyledSectionTitle>
          <div style={{ display: 'flex', alignItems: 'center', background: 'rgba(76, 209, 55, 0.1)', padding: '6px 14px', borderRadius: '10px', border: '1px solid rgba(76, 209, 55, 0.2)' }}>
            <PulseIndicator />
            <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#4cd137', letterSpacing: '0.5px' }}>LIVE FEED</span>
          </div>
        </div>
        <PayoutList>
          {recentPayouts.map((payout) => (
            <PayoutItem key={payout.id}>
              <div className="user">
                <div className="name-row">
                  <span className="name">User ***{payout.phone.slice(-3)}</span>
                  <span className="verified-tag">Verified</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span className="phone">Secured Transaction</span>
                  <TransactionID>{payout.txId}</TransactionID>
                </div>
              </div>
              <div className="amount">
                <span className="value">KES {payout.amount.toLocaleString()}</span>
                <span className="time">{payout.time}</span>
              </div>
            </PayoutItem>
          ))}
        </PayoutList>

        <TrustSection>
          <div className="title">Official Partners & Security</div>
          <div className="logos">
            <div>
              <span style={{ fontSize: '1.8rem' }}>🛡️</span>
              <span className="badge">BCLB LICENSED</span>
            </div>
            <div>
              <span style={{ fontSize: '1.8rem' }}>💳</span>
              <span className="badge">MPESA SECURE</span>
            </div>
            <div>
              <span style={{ fontSize: '1.8rem' }}>�</span>
              <span className="badge">18+ ONLY</span>
            </div>
            <div>
              <span style={{ fontSize: '1.8rem' }}>🎮</span>
              <span className="badge">GAMING LICENSE</span>
            </div>
          </div>
          <div style={{ marginTop: 25, color: 'rgba(255,255,255,0.4)', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '1px', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span>REGULATED BY THE BETTING CONTROL AND LICENSING BOARD • LICENSE NO. 0000452</span>
            <span style={{ color: '#ff4d4d', opacity: 0.8 }}>⚠ RESPONSIBLE GAMING: PLAY WISELY.</span>
          </div>
        </TrustSection>
        
        <div style={{ padding: '60px 20px 120px', textAlign: 'center' }}>
          <div style={{ opacity: 0.15, fontSize: '0.8rem', fontWeight: 700, letterSpacing: '2px' }}>
            © 2026 SHINDAPESA ENTERTAINMENT LTD. ALL RIGHTS RESERVED.
          </div>
        </div>
      </ContentWrapper>

      <BottomNav>
        <NavItem $active onClick={() => window.location.assign("/home")}>
          <span>🏠</span>
          <span>HOME</span>
        </NavItem>
        <NavItem onClick={() => window.location.assign("/spin")}>
          <span>🎡</span>
          <span>SPIN</span>
        </NavItem>
        <NavItem onClick={() => window.location.assign("/wallet")}>
          <span>💰</span>
          <span>WALLET</span>
        </NavItem>
        <NavItem onClick={() => window.location.assign("/referral")}>
          <span>👥</span>
          <span>INVITE</span>
        </NavItem>
        <NavItem onClick={logout} style={{ color: "#ff4d4d" }}>
          <span>🚪</span>
          <span>LOGOUT</span>
        </NavItem>
      </BottomNav>
    </Container>
  );
}
