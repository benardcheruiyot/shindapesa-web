import React from 'react';

interface AccountBalanceCardProps {
  balance: number;
  withdrawableBalance: number;
  clicks: number;
  freeSpins?: number;
  referral: number;
  onWithdraw: () => void;
}

const AccountBalanceCard: React.FC<AccountBalanceCardProps> = ({ balance, withdrawableBalance, clicks, freeSpins = 0, referral, onWithdraw }) => (
  <section style={{
    background: 'rgba(24, 24, 27, 0.7)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: 40,
    padding: '40px 32px',
    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.3)',
    color: '#ffffff',
    position: 'relative',
    overflow: 'hidden'
  }}>
    <div style={{
      position: 'absolute',
      top: -100,
      right: -100,
      width: 250,
      height: 250,
      background: 'radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, transparent 70%)',
      zIndex: 0
    }} />
    
    <div style={{position: 'relative', zIndex: 1}}>
      <div style={{display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom: 28}}>
        <div>
          <div style={{fontSize: '0.85rem', fontWeight: 950, color: '#d4af37', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8}}>Withdrawable Winnings</div>
          <div style={{fontSize: '4.2rem', fontWeight: 950, color: '#ffffff', letterSpacing: -3, lineHeight: 1.1, display:'flex', alignItems:'center', gap: 12}}>
            <span style={{fontSize: '1.6rem', opacity: 0.5, fontWeight: 700}}>KES</span>
            {withdrawableBalance.toLocaleString()}
          </div>
          <div style={{fontSize: '0.75rem', fontWeight: 800, color: 'rgba(255,255,255,0.4)', marginTop: 8, letterSpacing: 0.5}}>
            Total Pending Balance: <span style={{color: '#fff'}}>KES {balance.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div style={{display:'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 16, marginBottom: 32}}>
        <div style={{background: 'rgba(255, 255, 255, 0.05)', padding: '18px 12px', borderRadius: 24, textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)'}}>
          <div style={{fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', marginBottom: 6, fontWeight: 800, letterSpacing: 1}}>TOTAL SPINS</div>
          <div style={{fontSize: '1.25rem', fontWeight: 950, color: '#ffffff'}}>{clicks}</div>
        </div>
        <div style={{background: 'rgba(212, 175, 55, 0.1)', padding: '18px 12px', borderRadius: 24, textAlign: 'center', border: '1px solid rgba(212, 175, 55, 0.25)'}}>
          <div style={{fontSize: '0.7rem', color: '#d4af37', marginBottom: 6, fontWeight: 950, letterSpacing: 1}}>FREE SPINS</div>
          <div style={{fontSize: '1.25rem', fontWeight: 950, color: '#d4af37'}}>{freeSpins}</div>
        </div>
        <div style={{background: 'rgba(255, 255, 255, 0.05)', padding: '18px 12px', borderRadius: 24, textAlign: 'center', border: '1px solid rgba(255,255,255,0.1)'}}>
          <div style={{fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', marginBottom: 6, fontWeight: 800, letterSpacing: 1}}>BONUS</div>
          <div style={{fontSize: '1.25rem', fontWeight: 950, color: '#ffffff'}}>{referral.toLocaleString()}</div>
        </div>
      </div>

      <button 
        onClick={onWithdraw} 
        style={{
          background: 'linear-gradient(135deg, #d4af37 0%, #b8860b 100%)', 
          color: '#fff', 
          border: 'none', 
          borderRadius: 24, 
          padding: '26px', 
          fontWeight: 950, 
          fontSize: '1.25rem', 
          cursor: 'pointer', 
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          boxShadow: '0 10px 20px rgba(212, 175, 55, 0.15)',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}
        onMouseOver={(e) => {
          e.currentTarget.style.transform = 'translateY(-4px) scale(1.01)';
          e.currentTarget.style.boxShadow = '0 20px 45px rgba(212, 175, 55, 0.3)';
        }}
        onMouseOut={(e) => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)';
          e.currentTarget.style.boxShadow = '0 15px 35px rgba(212, 175, 55, 0.15)';
        }}
      >
        WITHDRAW TO M-PESA <span>⚡</span>
      </button>
    </div>
  </section>
);

export default AccountBalanceCard;

