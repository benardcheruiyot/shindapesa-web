import React from 'react';

interface BonusSpinCardProps {
  onSpin: () => void;
}

const BonusSpinCard: React.FC<BonusSpinCardProps> = ({ onSpin }) => (
  <section style={{
    background: 'rgba(24, 24, 27, 0.7)',
    color: '#ffffff',
    borderRadius: 32,
    padding: '32px 24px',
    marginBottom: 0,
    boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
    textAlign: 'center',
    border: '2px dashed rgba(212, 175, 55, 0.3)',
    position: 'relative',
    overflow: 'hidden'
  }}>
    <div style={{position:'absolute', top: -20, right: -20, fontSize: '5rem', opacity: 0.05}}>🎁</div>
    <div style={{fontSize:'3.5rem',marginBottom:16, display:'inline-block', filter: 'drop-shadow(0 4px 10px rgba(0,0,0,0.3))'}}>🎁</div>
    <div style={{fontWeight:950,fontSize:'1.8rem',marginBottom:8, color: '#ffffff', letterSpacing: '-0.5px'}}>WELCOME BONUS!</div>
    <div style={{fontSize:'1.1rem',marginBottom:24, color: 'rgba(255, 255, 255, 0.6)', lineHeight: 1.5}}>
      You have <b style={{color: '#d4af37'}}>5 PROMOTIONAL SPINS</b> waiting!<br/>
      Win up to <b style={{color: '#ffffff'}}>x2 (KES 20,000)</b> instantly.
    </div>
    <button onClick={onSpin} style={{
      background:'linear-gradient(135deg, #d4af37 0%, #b8860b 100%)',
      color:'#fff',
      border:'none',
      borderRadius:20,
      padding:'20px 40px',
      fontWeight:900,
      fontSize:'1.2rem',
      cursor:'pointer',
      boxShadow:'0 10px 20px rgba(212, 175, 55, 0.15)',
      margin:'0 auto',
      display:'flex',
      alignItems:'center',
      gap:10,
      width: '100%',
      justifyContent: 'center',
      textTransform: 'uppercase',
      letterSpacing: '1px'
    }}>
      CLAIM & SPIN NOW <span>→</span>
    </button>
  </section>
);

export default BonusSpinCard;
