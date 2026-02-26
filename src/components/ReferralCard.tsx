import React from 'react';

interface ReferralCardProps {
  referral: number;
}

const ReferralCard: React.FC<ReferralCardProps> = ({ referral }) => (
  <section style={{background:'#fff',color:'#0a3570',borderRadius:16,padding:'18px 18px 12px 18px',marginBottom:18,boxShadow:'0 2px 12px rgba(0,0,0,0.08)'}}>
    <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:8}}>
      <span role="img" aria-label="referral">💵</span>
      <span style={{fontWeight:700,fontSize:'1.08rem'}}>Referral Earnings</span>
    </div>
    <div style={{fontSize:'1.01rem',marginBottom:8}}>KES {referral}</div>
    <button style={{background:'#36A2EB',color:'#fff',border:'none',borderRadius:8,padding:'8px 18px',fontWeight:700,fontSize:'1rem',cursor:'pointer',boxShadow:'0 1px 4px #0a357033'}} onClick={()=>alert('Referral feature coming soon!')}>
      Refer & Earn
    </button>
  </section>
);

export default ReferralCard;
