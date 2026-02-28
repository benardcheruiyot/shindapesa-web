"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import AccountBalanceCard from "../components/AccountBalanceCard";
import BottomNav from "../components/BottomNav";
import WinnersTicker from "../components/WinnersTicker";
import StatusBadge from "../components/StatusBadge";
import PayoutFeed from "../components/PayoutFeed";
import HomeHero from "../components/HomeHero";
import VIPBanner from "../components/VIPBanner";
import TrustSection from "../components/TrustSection";
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
  background: #39b54a;
  border-radius: 50%;
  display: inline-block;
  margin-right: 8px;
  box-shadow: 0 0 10px #39b54a;
  animation: pulse 2s infinite;

  @keyframes pulse {
    0% { transform: scale(1); opacity: 1; }
    50% { transform: scale(1.5); opacity: 0.5; }
    100% { transform: scale(1); opacity: 1; }
  }
`;

const Container = styled.div`
  min-height: 100vh;
  background-color: #030712;
  color: #f8fafc;
  padding-bottom: 120px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: fixed;
    top: 50%;
    left: 50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(59, 130, 246, 0.05) 0%, transparent 50%);
    transform: translate(-50%, -50%);
    pointer-events: none;
    z-index: 0;
  }
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 10;
  max-width: 1240px;
  margin: 0 auto;
  padding: 24px 20px;
`;

const Header = styled.header`
  background: rgba(13, 21, 38, 0.75);
  backdrop-filter: blur(20px);
  color: #ffffff;
  padding: 0 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 3000;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
  height: 72px;

  @media (max-width: 600px) {
    padding: 0 16px;
    height: 64px;
  }
`;

const LogoText = styled.div`
  font-size: 1.75rem;
  font-weight: 800;
  color: #ffffff;
  letter-spacing: -0.05em;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;

  span {
    background: linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  &::before {
    content: '⚡';
    font-size: 1.25rem;
  }

  @media (max-width: 600px) {
    font-size: 1.4rem;
  }
`;

const BalanceBadge = styled.div`
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 6px 14px;
  border-radius: 100px;
  font-size: 0.95rem;
  font-weight: 700;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);

  span:first-child { 
    font-size: 0.7rem; 
    opacity: 0.6; 
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  &:hover {
    background: rgba(255, 255, 255, 0.08);
    transform: translateY(-1px);
    border-color: #3b82f6;
  }

  @media (max-width: 600px) {
    padding: 5px 12px;
    font-size: 0.85rem;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;

  @media (max-width: 600px) {
    gap: 6px;
    
    .live-stats {
      display: none !important;
    }
    
    button {
      padding: 8px !important;
      font-size: 1rem !important;
    }
  }

  @media (max-width: 400px) {
    gap: 4px;
    
    button {
      display: none !important;
    }
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
    background: #3b82f6;
    border-radius: 4px;
  }
`;

const VerificationProgressWrapper = styled.div`
  margin-bottom: 40px;
  background: rgba(30, 41, 59, 0.4);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(30, 41, 59, 0.6);
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
  gap: 10px;
  z-index: 1;
  width: 33%;

  .dot {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    font-weight: 900;
    background: ${props => props.$active ? 'var(--success)' : props.$pending ? 'rgba(59, 130, 246, 0.2)' : 'rgba(255, 255, 255, 0.05)'};
    color: ${props => props.$active ? '#000' : props.$pending ? 'var(--primary-light)' : 'rgba(255, 255, 255, 0.2)'};
    border: 2px solid ${props => props.$active ? 'var(--success)' : props.$pending ? 'var(--primary-light)' : 'rgba(255, 255, 255, 0.1)'};
    ${props => props.$pending && `animation: pulse-gold 2s infinite;`}
  }

  .label {
    font-size: 0.65rem;
    font-weight: 800;
    color: ${props => props.$active ? 'var(--success)' : props.$pending ? 'var(--primary-light)' : 'rgba(255, 255, 255, 0.3)'};
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  @keyframes pulse-gold {
    0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4); }
    70% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
    100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
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
      <div style={{ height: '100vh', background: 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary-light)' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3rem', marginBottom: 25, animation: 'rotate 2s linear infinite' }}>🎡</div>
          <h3 style={{ textTransform: 'uppercase', letterSpacing: 3, fontWeight: 900 }}>Authenticating...</h3>
        </div>
      </div>
    );
  }

  const freeSpinsCount = Number(user.freeSpins) || 0;

  return (
    <Container>
      <Scanline />
      <WinnersTicker winners={tickerWinners} />

      <Header>
        <LogoText onClick={() => window.location.assign("/home")}>SHINDA<span>PESA</span></LogoText>
        <HeaderActions>
          <MarketClock>
            <span className="time">{currentTime.toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}</span>
            <span className="label">PORTAL ACTIVE</span>
          </MarketClock>

          <div className="live-stats" style={{ display: 'flex', alignItems: 'center', background: 'rgba(57, 181, 74, 0.1)', padding: '6px 14px', borderRadius: '10px', border: '1px solid rgba(57, 181, 74, 0.2)', marginRight: 4 }}>
            <PulseIndicator />
            <span style={{ fontSize: '0.75rem', fontWeight: 900, color: '#39b54a', letterSpacing: '0.5px' }}>{livePlayers.toLocaleString()} ONLINE</span>
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
        </HeaderActions>
      </Header>

      <ContentWrapper>
        <StatusBadge 
          isActivated={user.isActivated} 
          onClick={() => router.push("/activate-account")} 
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, opacity: 0.5 }}>
          <span style={{ fontSize: '0.65rem', fontWeight: 900, letterSpacing: '2px', color: '#3b82f6' }}>SYSTEM: ONLINE v2.0.4</span>
          <span style={{ fontSize: '0.65rem', fontWeight: 900, letterSpacing: '2px', color: '#4cd137' }}>STATUS: SECURE 🟢</span>
        </div>

        <VIPBanner />

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
        
        <HomeHero livePlayers={livePlayers} onAction={() => router.push("/activate-account")} />

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
        <PayoutFeed payouts={recentPayouts} />

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
            © {new Date().getFullYear()} SHINDAPESA ENTERTAINMENT LTD. ALL RIGHTS RESERVED.
          </div>
        </div>
      </ContentWrapper>

      <BottomNav onLogout={logout} />
    </Container>
  );
}
