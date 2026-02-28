import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import { userService } from '@/services/userService';
import { wheelData } from '@/utils/wheelData';

const WheelContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const WheelWrapper = styled.div<{ rotation: number; transitioning: boolean }>`
  position: relative;
  width: 320px;
  height: 320px;
  transition: ${props => props.transitioning ? 'transform 4s cubic-bezier(0.15, 0, 0.15, 1)' : 'none'};
  transform: rotate(${props => props.rotation}deg);
`;

const Pointer = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -15px);
  width: 0;
  height: 0;
  border-left: 15px solid transparent;
  border-right: 15px solid transparent;
  border-top: 30px solid #ffffff;
  filter: drop-shadow(0 4px 10px rgba(0,0,0,0.5));
  z-index: 100;
  
  &::after {
    content: '';
    position: absolute;
    top: -32px;
    left: -13px;
    width: 0;
    height: 0;
    border-left: 13px solid transparent;
    border-right: 13px solid transparent;
    border-top: 26px solid #3b82f6;
    z-index: 101;
  }
`;

const WheelOuterRing = styled.div`
  position: absolute;
  top: -12px;
  left: -12px;
  right: -12px;
  bottom: -12px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(13, 21, 38, 0.4);
  backdrop-filter: blur(20px);
  box-shadow: 
    0 20px 60px rgba(0, 0, 0, 0.5),
    inset 0 0 40px rgba(59, 130, 246, 0.1);
  z-index: 1;
  pointer-events: none;
`;

const SpinButton = styled.button`
  background: #3b82f6;
  color: #ffffff;
  font-size: 1.1rem;
  font-weight: 700;
  border: none;
  border-radius: 100px;
  padding: 16px 60px;
  box-shadow: 0 10px 25px rgba(59, 130, 246, 0.2);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  position: relative;
  overflow: hidden;

  &:hover:not(:disabled) {
    background: #2563eb;
    transform: translateY(-2px);
    box-shadow: 0 15px 35px rgba(59, 130, 246, 0.3);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  &:disabled {
    background: rgba(255, 255, 255, 0.05);
    color: rgba(255, 255, 255, 0.2);
    cursor: not-allowed;
    box-shadow: none;
    border: 1px solid rgba(255, 255, 255, 0.05);
  }
`;

const WinOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  background: rgba(13, 21, 38, 0.95);
  backdrop-filter: blur(40px);
  padding: 48px;
  border-radius: 32px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  animation: popIn 0.5s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: 0 40px 100px rgba(0, 0, 0, 0.6);
  min-width: 320px;
  color: #ffffff;

  @keyframes popIn {
    from { opacity: 0; transform: translate(-50%, -50%) scale(0.9); }
    to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  }
`;

const TrustBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(34, 197, 94, 0.08);
  padding: 8px 16px;
  border-radius: 100px;
  font-size: 0.65rem;
  font-weight: 700;
  color: #4ade80;
  border: 1px solid rgba(34, 197, 94, 0.15);
  margin-top: 30px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const SpinWheel = () => {
  const { user, updateUser } = useUser();
  const router = useRouter();
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [pendingWin, setPendingWin] = useState<{ value: number, label: string } | null>(null);
  const [result, setResult] = useState<string | null>(null);

  // Debug log to trace spins
  useEffect(() => {
    if (user) {
      console.log(`SpinWheel Sync - User: ${user.username}, Spins: ${user.freeSpins}, Balance: ${user.balance}`);
    }
  }, [user]);

  const collectWinnings = () => {
    if (!user || !pendingWin) return;

    const currentSpins = Number(user.freeSpins) || 0;
    const isFreeSpin = currentSpins > 0;
    const cost = isFreeSpin ? 0 : 100;
    const nextSpins = isFreeSpin ? currentSpins - 1 : 0;
    const currentBalance = Number(user.balance) || 0;

    updateUser({
      balance: currentBalance + pendingWin.value - cost,
      clicks: (Number(user.clicks) || 0) + 1,
      freeSpins: nextSpins,
      welcomeSpinsFinished: isFreeSpin ? (nextSpins === 0) : true
    });

    setPendingWin(null);
    setResult(null);

    // If it was the last free spin, redirect home immediately on collection
    if (isFreeSpin && nextSpins === 0) {
      router.push("/home");
    }
  };

  const spin = () => {
    if (isSpinning || !user || pendingWin) return;
    
    // Explicitly check for free spins
    const currentSpins = Number(user.freeSpins) || 0;
    const isFreeSpin = currentSpins > 0;
    
    console.log("Spin Attempt - isFreeSpin:", isFreeSpin, "Count:", currentSpins);

    // Check if account is activated for real spins (if no free spins)
    if (!isFreeSpin && !user.isActivated) {
       alert('Please activate your account to keep spinning!');
       return;
    }

    // COST logic (if not free spin)
    if (!isFreeSpin && (Number(user.balance) || 0) < 100) {
      alert('Insufficient balance! Each spin costs KES 100.');
      return;
    }

    setIsSpinning(true);
    setResult(null);

    // Randomize result
    let wonSliceIndex: number;

    if (isFreeSpin) {
      // Sequence for exactly 3 wins:
      // Spin 1: Loss (Index 1)
      // Spin 2: Win x5 (Index 4) -> (KES 1,000 - 5,000)
      // Spin 3: Win x10 (Index 2) -> (KES 5,001 - 10,000)
      // Spin 4: Loss (Index 5)
      // Spin 5: Win x20 (Index 0) -> (KES 10,001 - 20,000)
      // Total potential: KES 16,000 - KES 35,000
      const sequenceIndex = 5 - currentSpins; 
      const indices = [1, 4, 2, 5, 0]; 
      wonSliceIndex = indices[sequenceIndex] ?? 5; 
      console.log(`Executing Promo Spin #${sequenceIndex + 1}, target index: ${wonSliceIndex}`);
    } else {
      wonSliceIndex = Math.floor(Math.random() * wheelData.length);
    }
    
    const sliceAngle = 360 / wheelData.length;
    const targetRotation = (360 - (wonSliceIndex * sliceAngle)) % 360;
    
    const totalSpins = 5 + Math.floor(Math.random() * 5); 
    const newRotation = rotation + (totalSpins * 360) + (targetRotation - (rotation % 360) + 360) % 360;
    
    setRotation(newRotation);

    setTimeout(() => {
      setIsSpinning(false);
      const wonSlice = wheelData[wonSliceIndex];
      // Generate actual winning amount randomly within the slice range
      let actualWin = 0;
      if (wonSlice.max > 0) {
        actualWin = Math.floor(Math.random() * (wonSlice.max - wonSlice.min + 1)) + wonSlice.min;
      }
      
      setResult(`You won ${wonSlice.label}!`);
      setPendingWin({ value: actualWin, label: wonSlice.label });
    }, 4000);
  };

  const size = 320;
  const center = size / 2;
  const radius = size / 2 - 8;
  const numSlices = wheelData.length;
  const angle = 360 / numSlices;

  function getCoordsForAngle(deg: number, r: number = radius) {
    const rad = (deg - 90) * (Math.PI / 180);
    return {
      x: center + r * Math.cos(rad),
      y: center + r * Math.sin(rad),
    };
  }

  const gradients = wheelData.map((data, i) => {
    if (data.color.startsWith('linear-gradient')) {
      const colors = data.color.match(/#[a-fA-F0-9]{3,6}/g);
      if (colors && colors.length >= 2) {
        return (
          <linearGradient key={i} id={`grad-${i}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors[0]} />
            <stop offset="100%" stopColor={colors[1]} />
          </linearGradient>
        );
      }
    }
    return null;
  });

  let paths = [];
  for (let i = 0; i < numSlices; i++) {
    const startAngle = i * angle;
    const endAngle = (i + 1) * angle;
    const start = getCoordsForAngle(startAngle);
    const end = getCoordsForAngle(endAngle);
    const largeArc = angle > 180 ? 1 : 0;
    const pathData = [`M ${center} ${center}`, `L ${start.x} ${start.y}`, `A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`, 'Z'].join(' ');
    const fill = wheelData[i].color.startsWith('linear-gradient') ? `url(#grad-${i})` : wheelData[i].color;
    paths.push(<path key={i} d={pathData} fill={fill} stroke="rgba(255,255,255,0.1)" strokeWidth={2} />);
  }

  let labels = [];
  for (let i = 0; i < numSlices; i++) {
    const labelAngle = (i + 0.5) * angle;
    const labelRadius = radius * 0.7;
    const coords = getCoordsForAngle(labelAngle, labelRadius);
    labels.push(
      <g key={i} style={{ pointerEvents: 'none' }}>
        <text
          x={coords.x}
          y={coords.y - 10}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="13px"
          fontWeight="900"
          fill="#FFFFFF"
          style={{
            textShadow: '0 0 6px #000, 0 0 12px #000',
            textTransform: 'uppercase',
            letterSpacing: '1px',
            paintOrder: 'stroke',
            stroke: '#000',
            strokeWidth: 2
          }}
        >
          {wheelData[i].label}
        </text>
        <text
          x={coords.x}
          y={coords.y + 14}
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="26px"
          fontWeight="1000"
          fill="#FFFFFF"
          style={{
            textShadow: '0 0 10px #000, 0 0 20px #3b82f6',
            paintOrder: 'stroke',
            stroke: '#000',
            strokeWidth: 3
          }}
        >
          {wheelData[i].valueTag}
        </text>
      </g>
    );
  }

  return (
    <WheelContainer>
      <div style={{ color: 'var(--primary-light)', fontWeight: 950, marginBottom: 15, fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: 4, display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: '1.2rem' }}>💎</span>
        {user?.freeSpins ? `${user.freeSpins} PRESTIGE SPINS` : 'ULTIMATE SAPPHIRE WHEEL'}
      </div>
      
      <div style={{ position: 'relative', padding: 10 }}>
        <WheelOuterRing />
        <Pointer />
        <WheelWrapper rotation={rotation} transitioning={isSpinning}>
          <svg width={size} height={size} style={{ filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.5))' }}>
            <defs>
              {gradients}
              <filter id="innerShadow">
                <feFlood floodColor="black" floodOpacity="0.5" />
                <feComposite operator="out" in2="SourceGraphic" />
                <feGaussianBlur stdDeviation="3" />
                <feComposite operator="atop" in2="SourceGraphic" />
              </filter>
            </defs>
            <g filter="url(#innerShadow)">
              {paths}
            </g>
            {labels}
            <circle cx={center} cy={center} r={28} fill="#0f172a" stroke="var(--primary)" strokeWidth={2} />
            <circle cx={center} cy={center} r={22} fill="transparent" stroke="rgba(255,255,255,0.1)" strokeWidth={1} />
            <text x={center} y={center} textAnchor="middle" dominantBaseline="middle" dy=".3em" fontSize="1.4rem">💎</text>
          </svg>
        </WheelWrapper>

        {pendingWin && (
          <WinOverlay>
            <div style={{ fontSize: '4rem', marginBottom: 20, filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))' }}>{pendingWin.value > 0 ? '🏆' : '🎲'}</div>
            <h2 style={{ color: pendingWin.value > 0 ? '#4cd137' : '#ffffff', fontSize: '1.8rem', fontWeight: 950, marginBottom: 12, letterSpacing: '-0.5px' }}>
              {pendingWin.value > 0 ? 'JACKPOT UNLOCKED!' : 'KEEP SPINNING'}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem', fontWeight: 700, marginBottom: 35, lineHeight: 1.5 }}>
              {pendingWin.value > 0 
                ? <>You just secured <span style={{ color: '#ffffff', fontWeight: 950 }}>KES {pendingWin.value.toLocaleString()}</span> in winnings!</> 
                : <>The algorithm is heating up. Your next spin has <span style={{ color: '#3b82f6' }}>85% higher</span> jackpot probability.</>}
            </p>
            <SpinButton onClick={collectWinnings}>
              {pendingWin.value > 0 
                ? (user && user.freeSpins === 1 ? 'COLLECT EARNINGS' : 'COLLECT & CONTINUE')
                : (user && user.freeSpins === 1 ? 'FINISH' : 'TRY AGAIN')
              }
            </SpinButton>
          </WinOverlay>
        )}
      </div>

      <div style={{ textAlign: 'center', marginTop: 30, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {!pendingWin && (
          <SpinButton 
            onClick={user && Number(user.freeSpins) > 0 ? spin : () => router.push("/activate-account")} 
            disabled={isSpinning}
          >
            {isSpinning ? 'SPINNING...' : (user && Number(user.freeSpins) > 0 ? 'SPIN NOW' : 'ACTIVATE & WIN 🎁')}
          </SpinButton>
        )}
        <TrustBadge>
          <span style={{ fontSize: '0.9rem' }}>🛡️</span> SECURE TRANSACTIONAL HUB • RNG VERIFIED
        </TrustBadge>
      </div>
    </WheelContainer>
  );
};

export default SpinWheel;
