"use client";
import '../app/globals.css';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import SpinWheel from '../components/SpinWheel';
import styled from 'styled-components';
import { useUser } from '@/context/UserContext';
import { User } from '@/types';

const Drawer = styled.div`
  position: fixed;
  top: 0; left: 0;
  width: 85vw;
  max-width: 370px;
  height: 100vh;
  background: #fff;
  z-index: 1100;
  box-shadow: 2px 0 16px rgba(0,0,0,0.13);
  display: flex;
  flex-direction: column;
  animation: slideIn 0.22s cubic-bezier(.4,1.3,.6,1) 1;
  @keyframes slideIn {
    from { transform: translateX(-100%); }
    to { transform: translateX(0); }
  }
`;

const DrawerOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.18);
  z-index: 1000;
`;

const DashboardWrapper = styled.div`
  min-height: 100vh;
  background: #f7f7f7;
  padding: 0 0 32px 0;
  display: flex;
  flex-direction: column;
`;

const SiteHeader = styled.header`
  width: 100%;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  position: sticky;
  top: 0;
  z-index: 200;
`;
const SiteNav = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
  height: 70px;
  position: relative;
`;
const SiteLogo = styled.div`
  font-size: 2.2rem;
  font-weight: 900;
  color: #0a3570;
  letter-spacing: 1px;
  text-align: center;
  );
`;

const BalanceCard = styled.div`
  color: #fff;
  border-radius: 14px;
  padding: 10px 0 8px 0;
  width: 85%;
  margin: 0 auto 18px auto;
  text-align: center;
  font-size: 1.15rem;
  font-weight: 700;
`;
const DrawerClose = styled.div`
  position: absolute;
  top: 18px;
  right: 18px;
  font-size: 2.1rem;
  color: #888;
  cursor: pointer;
`;
const DrawerNav = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0;
  margin-top: 8px;
`;
const DrawerNavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 1.15rem;
  font-weight: 600;
  color: #222;
  padding: 16px 24px;
  cursor: pointer;
  border-bottom: 1px solid #f2f2f2;
  &:hover { background: #f7f7f7; }
  &.logout { color: #d32f2f; }
`;
const DrawerFooter = styled.div`
  text-align: center;
  color: #888;
  font-size: 1.08rem;
  padding: 18px 0 12px 0;
`;

const SpinModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.45);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const SpinModalContent = styled.div`
  position: relative;
  background: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const SpinClose = styled.div`
  position: absolute;
  top: -32px;
  right: -32px;
  width: 48px;
  height: 48px;
  background: #222;
  color: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  cursor: pointer;
  z-index: 10;
`;
const SpinStartButton = styled.button`
  margin-top: 24px;
  background: #0a3570;
  color: #fff;
  font-size: 1.25rem;
  font-weight: 700;
  border: none;
  border-radius: 32px;
  padding: 16px 48px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.13);
  cursor: pointer;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const Clicks = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 1.1rem;
`;

const Referral = styled.div`
  background: #0e417e;
  border-radius: 10px;
  padding: 6px 16px;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Card = styled.div`
  background: #073366;
  border-radius: 18px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.10);
  padding: 22px 18px 18px 18px;
`;

const DrawerHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 0 12px 0;
`;

const DrawerAvatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: #073366;
  color: #fff;
  font-size: 2.7rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
`;

const DrawerName = styled.div`
  font-size: 1.35rem;
  font-weight: 700;
  color: #222;
  margin-bottom: 2px;
`;

const DrawerPhone = styled.div`
  font-size: 1.08rem;
  color: #888;
  margin-bottom: 12px;
`;

const DrawerBalanceCard = styled.div`
  background: #073366;
  color: #fff;
  border-radius: 14px;
  padding: 10px 0 8px 0;
  width: 85%;
  margin: 0 auto 18px auto;
  text-align: center;
  font-size: 1.15rem;
  font-weight: 700;
`;

const UserInfoCard = styled.div`
  background: #fff;
  border-radius: 14px;
  padding: 18px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
  font-size: 1.1rem;
  color: #222;
`;
const AccountBalanceCard = styled.div`
  background: #fff;
  border-radius: 14px;
  padding: 18px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
  font-size: 1.1rem;
  color: #222;
`;
const WithdrawCard = styled.div`
  background: #fff;
  border-radius: 14px;
  padding: 18px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
  font-size: 1.1rem;
  color: #222;
`;
const BonusSpinCard = styled.div`
  background: #fff;
  border-radius: 14px;
  padding: 18px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
  font-size: 1.1rem;
  color: #222;
`;
const ReferralCard = styled.div`
  background: #fff;
  border-radius: 14px;
  padding: 18px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
  font-size: 1.1rem;
  color: #222;
`;

const HomeScreen = () => {
  const router = useRouter();
  const { user, loading, logout } = useUser();
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f7f7f7' }}>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <DashboardWrapper>
      <SiteHeader>
        <SiteNav>
          <div 
            style={{ position: 'absolute', left: 24, fontSize: '1.4rem', color: '#0a3570', cursor: 'pointer' }}
            onClick={() => setDrawerOpen(true)}
          >
            ☰
          </div>
          <SiteLogo>ShindaPesa</SiteLogo>
        </SiteNav>
      </SiteHeader>

      {isDrawerOpen && (
        <>
          <DrawerOverlay onClick={() => setDrawerOpen(false)} />
          <Drawer>
            <DrawerClose onClick={() => setDrawerOpen(false)}>&times;</DrawerClose>
            <DrawerHeader>
              <DrawerAvatar>{(user.name || user.username || 'U')[0].toUpperCase()}</DrawerAvatar>
              <DrawerName>{user.name || user.username}</DrawerName>
              <DrawerPhone>{user.phone || user.phoneNumber}</DrawerPhone>
              <DrawerBalanceCard>
                KES {user.balance?.toLocaleString() || '0'}
              </DrawerBalanceCard>
            </DrawerHeader>
            <DrawerNav>
              <DrawerNavItem onClick={() => router.push('/home')}>
                🏠 Home Dashboard
              </DrawerNavItem>
              <DrawerNavItem onClick={() => router.push('/wallet')}>
                💰 My Wallet
              </DrawerNavItem>
              <DrawerNavItem onClick={() => router.push('/referral')}>
                👥 Invite Friends
              </DrawerNavItem>
              <DrawerNavItem onClick={() => router.push('/activate-account')}>
                ⚡ Activate Account
              </DrawerNavItem>
              <DrawerNavItem className="logout" onClick={logout}>
                🚪 Logout
              </DrawerNavItem>
            </DrawerNav>
            <DrawerFooter>
              ShindaPesa v1.0.2
            </DrawerFooter>
          </Drawer>
        </>
      )}

      <main style={{ maxWidth: 480, margin: '0 auto', padding: '18px 16px', width: '100%' }}>
        {/* User Info Card */}
        <section style={{ background: '#0a3570', color: '#fff', borderRadius: 16, padding: '18px', marginBottom: 18, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
          <div style={{ fontWeight: 700, fontSize: '1.13rem', marginBottom: 2 }}>{user.name || user.username}</div>
          <div style={{ fontSize: '1.01rem', marginBottom: 12, opacity: 0.92 }}>{user.phone || user.phoneNumber}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <span style={{ background: '#e6fbe6', color: '#1b7e1b', borderRadius: 8, padding: '4px 10px', fontWeight: 600, fontSize: '0.92rem' }}>
              KES {user.balance?.toLocaleString() || '0'} Balance
            </span>
            <span style={{ color: user.isActivated ? '#1b7e1b' : '#d32f2f', fontWeight: 600, fontSize: '0.92rem' }}>
              {user.isActivated ? '✅ Verified Account' : '❌ Unverified Account'}
            </span>
          </div>
        </section>

        {/* Spin Wheel Section */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 24 }}>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#222', marginBottom: 16 }}>Spin & Win Instant Cash!</h2>
          <SpinWheel />
        </div>

        {/* Quick Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 24 }}>
          <div style={{ background: '#fff', padding: 18, borderRadius: 12, boxShadow: '0 2px 4px rgba(0,0,0,0.04)' }}>
            <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: 4 }}>Total Earnings</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#073366' }}>KES {user.balance?.toLocaleString() || '0'}</div>
          </div>
          <div style={{ background: '#fff', padding: 18, borderRadius: 12, boxShadow: '0 2px 4px rgba(0,0,0,0.04)' }}>
            <div style={{ fontSize: '0.85rem', color: '#888', marginBottom: 4 }}>Total Spins</div>
            <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#073366' }}>{user.clicks || 0}</div>
          </div>
        </div>

        {/* Action Link */}
        <div 
          onClick={() => router.push('/wallet')}
          style={{ background: '#073366', color: '#fff', textAlign: 'center', padding: '16px', borderRadius: 12, fontWeight: 700, cursor: 'pointer' }}
        >
          Withdraw Winnings
        </div>
      </main>
    </DashboardWrapper>
  );
};

export default HomeScreen;