import React from 'react';

interface UserInfoCardProps {
  name: string;
  phone: string;
  status: string;
}

const UserInfoCard: React.FC<UserInfoCardProps> = ({ name, phone, status }) => (
  <section style={{
    background: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: 24,
    padding: '24px',
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    transition: 'transform 0.3s ease'
  }}>
    <div style={{display:'flex', alignItems:'center', gap:16}}>
      <div style={{
        width: 50, 
        height: 50, 
        borderRadius: '50%', 
        background: 'linear-gradient(135deg, #ffe066, #ffc107)',
        display:'flex',
        alignItems:'center',
        justifyContent:'center',
        fontSize: '1.2rem',
        fontWeight: 900,
        color: '#001f3f'
      }}>
        {name.charAt(0).toUpperCase()}
      </div>
      <div>
        <div style={{fontWeight: 800, fontSize: '1.1rem', color: '#fff'}}>{name}</div>
        <div style={{fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', marginTop: 2}}>{phone}</div>
      </div>
    </div>
    
    <div style={{
      padding: '12px 16px',
      background: 'rgba(255,255,255,0.05)',
      borderRadius: 16,
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <span style={{fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)'}}>Account Status</span>
      <span style={{
        fontSize: '0.85rem', 
        fontWeight: 800, 
        color: status === 'Active' ? '#4ade80' : '#ffe066',
        display: 'flex',
        alignItems: 'center',
        gap: 6
      }}>
        <span style={{width: 8, height: 8, borderRadius: '50%', background: status === 'Active' ? '#4ade80' : '#ffe066'}}></span>
        {status}
      </span>
    </div>
  </section>
);

export default UserInfoCard;

