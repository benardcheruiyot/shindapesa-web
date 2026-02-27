import React from 'react';

interface ReferralCardProps {
  referral: number;
}

const ReferralCard: React.FC<ReferralCardProps> = ({ referral }) => (
  <section style={{
    background: 'rgba(24, 24, 27, 0.7)',
    color: '#ffffff',
    borderRadius: 24,
    padding: '24px',
    marginBottom: 18,
    boxShadow: '0 4px 15px rgba(0,0,0,0.3)',
    border: '1px solid rgba(255,255,255,0.1)'
  }}>
    <div style={{display:'flex',alignItems:'center',gap:10,marginBottom:12}}>
      <span style={{fontSize: '1.5rem'}}>💵</span>
      <span style={{fontWeight:900,fontSize:'1.1rem', color: '#ffffff'}}>Referral Earnings</span>
    </div>
    <div style={{fontSize:'1.8rem', fontWeight: 950, marginBottom: 16, color: '#d4af37'}}>KES {referral.toLocaleString()}</div>
    <button 
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        color: '#ffffff',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: 12,
        padding: '12px 20px',
        fontWeight: 800,
        fontSize: '0.95rem',
        cursor: 'pointer',
        width: '100%',
        transition: 'all 0.2s'
      }} 
      onClick={()=>alert('Referral feature coming soon!')}
    >
      Copy Invite Link
    </button>
  </section>
);

export default ReferralCard;
