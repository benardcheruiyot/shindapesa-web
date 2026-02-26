import React from 'react';

interface UserInfoCardProps {
  name: string;
  phone: string;
  isActivated: boolean;
}

const UserInfoCard: React.FC<UserInfoCardProps> = ({ name, phone, isActivated }) => (
  <section style={{
    background: '#0a3570',
    color: '#fff',
    borderRadius: 20,
    padding: '22px',
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
    marginBottom: 20
  }}>
    <div style={{display:'flex', alignItems:'center', gap:16}}>
      <div style={{
        width: 60, 
        height: 60, 
        borderRadius: '20px', 
        background: 'rgba(255,255,255,0.1)',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        fontSize: '1.6rem',
        fontWeight: 900,
        color: '#ffe066'
      }}>
        {name ? name.charAt(0).toUpperCase() : 'U'}
      </div>
      <div>
        <div style={{fontWeight: 800, fontSize: '1.25rem', color: '#fff'}}>{name}</div>
        <div style={{fontSize: '0.95rem', color: 'rgba(255,255,255,0.7)', marginTop: 2}}>{phone}</div>
      </div>
    </div>
    
    <div style={{
      padding: '12px 16px',
      background: 'rgba(255,255,255,0.05)',
      borderRadius: 14,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <span style={{fontSize: '0.9rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)'}}>Account Status</span>
      <span style={{
        fontSize: '0.85rem', 
        fontWeight: 800, 
        padding: '4px 12px',
        borderRadius: 8,
        background: isActivated ? 'rgba(74, 222, 128, 0.2)' : 'rgba(248, 113, 113, 0.2)',
        color: isActivated ? '#4ade80' : '#f87171'
      }}>
        {isActivated ? '✅ VERIFIED' : '❌ UNVERIFIED'}
      </span>
    </div>
  </section>
);

export default UserInfoCard;

