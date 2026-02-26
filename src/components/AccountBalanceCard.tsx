import React from 'react';

interface AccountBalanceCardProps {
  balance: number;
  clicks: number;
  freeSpins?: number;
  referral: number;
  onWithdraw: () => void;
}

const AccountBalanceCard: React.FC<AccountBalanceCardProps> = ({ balance, clicks, freeSpins = 0, referral, onWithdraw }) => (
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
          {balance.toLocaleString()}
        </div>
      </div>
      <div style={{background: 'rgba(255,255,255,0.1)', padding: '10px', borderRadius: 16, fontSize: '1.5rem'}}>
        💰
      </div>
    </div>

    <div style={{display:'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12, marginBottom: 25}}>
      <div style={{background: 'rgba(255,255,255,0.05)', padding: '12px 8px', borderRadius: 20, textAlign: 'center'}}>
        <div style={{fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginBottom: 4}}>Clicks</div>
        <div style={{fontSize: '1.1rem', fontWeight: 800}}>{clicks}</div>
      </div>
      <div style={{background: 'rgba(255,255,255,0.1)', padding: '12px 8px', borderRadius: 20, textAlign: 'center', border: '1px solid rgba(255, 224, 102, 0.2)'}}>
        <div style={{fontSize: '0.75rem', color: '#ffe066', marginBottom: 4, fontWeight: 700}}>PROMOS</div>
        <div style={{fontSize: '1.1rem', fontWeight: 900, color: '#ffe066'}}>{freeSpins}</div>
      </div>
      <div style={{background: 'rgba(255,255,255,0.05)', padding: '12px 8px', borderRadius: 20, textAlign: 'center'}}>
        <div style={{fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', marginBottom: 4}}>Referral</div>
        <div style={{fontSize: '1.1rem', fontWeight: 800}}>KES {referral}</div>
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

