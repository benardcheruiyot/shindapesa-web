import React from 'react';

interface BonusSpinCardProps {
  onSpin: () => void;
}

const BonusSpinCard: React.FC<BonusSpinCardProps> = ({ onSpin }) => (
  <section style={{background:'#0a3570',color:'#fff',borderRadius:16,padding:'28px 18px 22px 18px',marginBottom:18,boxShadow:'0 2px 12px rgba(0,0,0,0.08)',textAlign:'center'}}>
    <div style={{fontSize:'2.2rem',marginBottom:8}}>🎁</div>
    <div style={{fontWeight:700,fontSize:'1.18rem',marginBottom:6}}>Welcome to Bonus Spin!</div>
    <div style={{fontSize:'1.05rem',marginBottom:18}}>Get your FREE welcome spin!</div>
    <button onClick={onSpin} style={{background:'#ffe066',color:'#0a3570',border:'none',borderRadius:24,padding:'12px 32px',fontWeight:800,fontSize:'1.15rem',cursor:'pointer',boxShadow:'0 1px 4px #0a357033',margin:'0 auto',display:'flex',alignItems:'center',gap:8}}>
      <span role="img" aria-label="slot">🎰</span> Spin to Win <span role="img" aria-label="slot">🎰</span>
    </button>
  </section>
);

export default BonusSpinCard;
