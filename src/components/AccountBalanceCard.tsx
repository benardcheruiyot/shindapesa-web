import React from 'react';

interface AccountBalanceCardProps {
  balance: number;
  clicks: number;
  referral: number;
  onWithdraw: () => void;
}

const AccountBalanceCard: React.FC<AccountBalanceCardProps> = ({ balance, clicks, referral, onWithdraw }) => (
  <section style={{
    background: 'linear-gradient(135deg, #1851a3, #001f3f)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: 32,
    padding: '30px',
    boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
    color: '#fff',
    position: 'relative',
    overflow: 'hidden'
  }}>
    {/* Decorative Glow */}
    <div style={{position:'absolute', top: -50, right: -50, width: 150, height: 150, background: 'rgba(255,224,102,0.1)', borderRadius: '50%', filter: 'blur(40px)'}}></div>

    <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom: 20}}>
      <div>
        <div style={{fontSize: '0.9rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: 1}}>Available Balance</div>
        <div style={{fontSize: '3rem', fontWeight: 900, color: '#ffe066', marginTop: 4, letterSpacing: -1}}>
          <span style={{fontSize: '1.5rem', verticalAlign: 'middle', marginRight: 8}}>KES</span>
          {balance}
        </div>
      </div>
      <div style={{background: 'rgba(255,255,255,0.1)', padding: '10px', borderRadius: 16, fontSize: '1.5rem'}}>
        💰
      </div>
    </div>

    <div style={{display:'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 25}}>
      <div style={{background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: 20, textAlign: 'center'}}>
        <div style={{fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginBottom: 4}}>Total Clicks</div>
        <div style={{fontSize: '1.2rem', fontWeight: 800}}>{clicks}</div>
      </div>
      <div style={{background: 'rgba(255,255,255,0.05)', padding: '16px', borderRadius: 20, textAlign: 'center'}}>
        <div style={{fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginBottom: 4}}>Referral Earn</div>
        <div style={{fontSize: '1.2rem', fontWeight: 800, color: '#ffe066'}}>KES {referral}</div>
      </div>
    </div>

    <button 
      onClick={onWithdraw} 
      style={{
        background: '#ffe066', 
        color: '#001f3f', 
        border: 'none', 
        borderRadius: 20, 
        padding: '18px', 
        fontWeight: 900, 
        fontSize: '1.1rem', 
        cursor: 'pointer', 
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 10,
        boxShadow: '0 10px 20px rgba(255,224,102,0.2)'
      }}
    >
      Withdraw Balance <span>→</span>
    </button>
  </section>
);

export default AccountBalanceCard;

