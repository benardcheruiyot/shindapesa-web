"use client";
import '../app/globals.css';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import SpinWheel from '../components/SpinWheel';
import styled from 'styled-components';

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
  console.log('HomeScreen RENDERED - NEW DASHBOARD');
  // Example user data (replace with real data/fetch logic)
  const [user] = useState({
    name: 'Felix Mohamed',
    phone: '0790***697',
    balance: 0,
    clicks: 0,
    referral: 0,
    pendingAmount: 2419,
    pendingStatus: 'Processing',
  });

  return (
    <main style={{maxWidth:480,margin:'0 auto',padding:'18px 0',fontFamily:'inherit'}}>
      <div style={{background:'#d32f2f',color:'#fff',padding:'18px',borderRadius:12,textAlign:'center',fontWeight:800,fontSize:'1.5rem',marginBottom:24}}>
        THIS IS THE NEW DASHBOARD
      </div>
      {/* User Info Card */}
      <section style={{background:'#0a3570',color:'#fff',borderRadius:16,padding:'18px 18px 12px 18px',marginBottom:18,boxShadow:'0 2px 12px rgba(0,0,0,0.08)'}}>
        <div style={{fontWeight:700,fontSize:'1.13rem',marginBottom:2}}>{user.name}</div>
        <div style={{fontSize:'1.01rem',marginBottom:8,opacity:0.92}}>{user.phone}</div>
        <div style={{display:'flex',alignItems:'center',gap:12}}>
          <span style={{background:'#e6fbe6',color:'#1b7e1b',borderRadius:8,padding:'2px 10px',fontWeight:600,fontSize:'0.98rem'}}>
            KES {user.pendingAmount} pending
          </span>
          <span style={{color:'#1b7e1b',fontWeight:600,fontSize:'0.98rem'}}>⏳ {user.pendingStatus}</span>
        </div>
      </section>
      {/* ...rest of dashboard... */}
    </main>
  );
};

export default HomeScreen;