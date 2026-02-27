import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import { useUser } from '@/context/UserContext';
import { userService } from '@/services/userService';

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
  transform: translate(-50%, -18px);
  width: 0;
  height: 0;
  border-left: 18px solid transparent;
  border-right: 18px solid transparent;
  border-bottom: 32px solid #d4af37;
  z-index: 5;
`;

const SpinButton = styled.button`
  background: linear-gradient(135deg, #d4af37 0%, #b8860b 100%);
  color: #fff;
  font-size: 1.4rem;
  font-weight: 950;
  border: none;
  border-radius: 40px;
  padding: 20px 60px;
  box-shadow: 0 10px 30px rgba(212, 175, 55, 0.15);
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  text-transform: uppercase;
  letter-spacing: 1px;
  
  &:hover:not(:disabled) {
    transform: translateY(-5px) scale(1.02);
    box-shadow: 0 15px 40px rgba(212, 175, 55, 0.25);
  }
  
  &:active:not(:disabled) {
    transform: translateY(0) scale(0.98);
  }
  
  &:disabled {
    background: rgba(255, 255, 255, 0.1);
    color: rgba(255, 255, 255, 0.3);
    cursor: not-allowed;
    box-shadow: none;
  }
`;

const WinOverlay = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
  background: #0a0a0b;
  padding: 30px;
  border-radius: 40px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  text-align: center;
  animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  min-width: 280px;
  color: #ffffff;

  @keyframes popIn {
    from { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
    to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
  }
`;

const wheelData = [
  { label: 'x20', color: '#d4af37', min: 10001, max: 20000 },
  { label: 'x0', color: '#0a0a0b', min: 0, max: 0 },
  { label: 'x10', color: '#ffffff', min: 5001, max: 10000 },
  { label: 'x0', color: '#0a0a0b', min: 0, max: 0 },
  { label: 'x5', color: '#d4af37', min: 1000, max: 5000 },
  { label: 'x0', color: '#0a0a0b', min: 0, max: 0 },
  { label: 'x1', color: '#ffffff', min: 100, max: 999 },
  { label: 'x0', color: '#0a0a0b', min: 0, max: 0 },
];

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

  let paths = [];
  for (let i = 0; i < numSlices; i++) {
    const startAngle = i * angle;
    const endAngle = (i + 1) * angle;
    const start = getCoordsForAngle(startAngle);
    const end = getCoordsForAngle(endAngle);
    const largeArc = angle > 180 ? 1 : 0;
    const pathData = [`M ${center} ${center}`, `L ${start.x} ${start.y}`, `A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`, 'Z'].join(' ');
    paths.push(<path key={i} d={pathData} fill={wheelData[i].color} stroke="rgba(255,255,255,0.2)" strokeWidth={1} />);
  }

  let labels = [];
  for (let i = 0; i < numSlices; i++) {
    const labelAngle = (i + 0.5) * angle;
    const labelRadius = radius * 0.72;
    const coords = getCoordsForAngle(labelAngle, labelRadius);
    labels.push(
      <text
        key={i}
        x={coords.x}
        y={coords.y}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="0.85rem"
        fontWeight="800"
        fill={wheelData[i].color === '#ffffff' ? '#0a0a0b' : '#fff'}
        transform={`rotate(${labelAngle},${coords.x},${coords.y})`}
      >
        {wheelData[i].label}
      </text>
    );
  }

  return (
    <WheelContainer>
      <div style={{ color: '#d4af37', fontWeight: 950, marginBottom: 15, fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: 3 }}>
        {user?.freeSpins ? `🎡 ${user.freeSpins} FREE SPINS LEFT` : '✨ GRAND PRIZE WHEEL'}
      </div>
      
      <div style={{ position: 'relative' }}>
        <Pointer />
        <WheelWrapper rotation={rotation} transitioning={isSpinning}>
          <svg width={size} height={size}>
            {paths}
            {labels}
            <circle cx={center} cy={center} r={24} fill="#0a0a0b" stroke="#d4af37" strokeWidth={4} />
            <text x={center} y={center} textAnchor="middle" dominantBaseline="middle" dy=".3em" fontSize="1.2rem">🎰</text>
          </svg>
        </WheelWrapper>

        {pendingWin && (
          <WinOverlay>
            <div style={{ fontSize: '3rem', marginBottom: 15 }}>{pendingWin.value > 0 ? '🎉' : '💫'}</div>
            <h2 style={{ color: pendingWin.value > 0 ? '#d4af37' : '#ffffff', fontSize: '1.4rem', fontWeight: 950, marginBottom: 8, letterSpacing: '1px' }}>
              {pendingWin.value > 0 ? 'CONGRATULATIONS!' : 'BETTER LUCK NEXT TIME'}
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', fontWeight: 800, marginBottom: 25 }}>
              {pendingWin.value > 0 
                ? `You just won ${pendingWin.label} (KES ${pendingWin.value.toLocaleString()})` 
                : `Outcome: ${pendingWin.label}. The next spin could be your jackpot!`}
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

      <div style={{ textAlign: 'center', marginTop: 30 }}>
        {!pendingWin && (
          <SpinButton 
            onClick={user && Number(user.freeSpins) > 0 ? spin : () => router.push("/activate-account")} 
            disabled={isSpinning}
          >
            {isSpinning ? 'SPINNING...' : (user && Number(user.freeSpins) > 0 ? 'SPIN NOW' : 'ACTIVATE & WIN 🎁')}
          </SpinButton>
        )}
      </div>
    </WheelContainer>
  );
};

export default SpinWheel;
