import React from 'react';

interface WithdrawCardProps {
  available: number;
  onWithdraw: () => void;
}

const WithdrawCard: React.FC<WithdrawCardProps> = ({ available, onWithdraw }) => (
  <section style={{background:'#1a2a44',color:'#fff',borderRadius:16,padding:'18px 18px 12px 18px',marginBottom:18,boxShadow:'0 2px 12px rgba(0,0,0,0.08)'}}>
    <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:8}}>
      <span role="img" aria-label="bank">🏦</span>
      <span style={{fontWeight:700,fontSize:'1.08rem'}}>Withdraw Account Balance</span>
    </div>
    <div style={{fontSize:'1.01rem',marginBottom:8}}>KES {available} available</div>
    <button onClick={onWithdraw} style={{background:'#fff',color:'#1a2a44',border:'none',borderRadius:8,padding:'8px 18px',fontWeight:700,fontSize:'1rem',cursor:'pointer',boxShadow:'0 1px 4px #0a357033'}}>
      Withdraw Now →
    </button>
  </section>
);

export default WithdrawCard;
