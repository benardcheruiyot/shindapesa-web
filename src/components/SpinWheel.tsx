import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useUser } from '@/context/UserContext';

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
  border-bottom: 32px solid #222;
  z-index: 5;
`;

const SpinButton = styled.button`
  background: #0a3570;
  color: #fff;
  font-size: 1.25rem;
  font-weight: 700;
  border: none;
  border-radius: 32px;
  padding: 16px 48px;
  box-shadow: 0 4px 12px rgba(10, 53, 112, 0.3);
  cursor: pointer;
  transition: all 0.2s;
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    box-shadow: none;
  }
  &:active {
    transform: scale(0.96);
  }
`;

const wheelData = [
  { label: 'KES 15,000', color: '#ffe066', value: 15000 },
  { label: 'KES 0', color: '#001f3f', value: 0 },
  { label: 'KES 20,000', color: '#1851a3', value: 20000 },
  { label: 'KES 0', color: '#001f3f', value: 0 },
  { label: 'KES 12,000', color: '#ffe066', value: 12000 },
  { label: 'KES 0', color: '#001f3f', value: 0 },
  { label: 'KES 18,000', color: '#1851a3', value: 18000 },
  { label: 'KES 0', color: '#001f3f', value: 0 },
];

const SpinWheel = () => {
  const { user, updateUser } = useUser();
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  // Debug log to trace spins
  useEffect(() => {
    if (user) {
      console.log(`SpinWheel Sync - User: ${user.username}, Spins: ${user.freeSpins}, Balance: ${user.balance}`);
    }
  }, [user]);

  const spin = () => {
    if (isSpinning || !user) return;
    
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
      // Sequence: Loss (5), Win 20k (4), Loss (3), Win 15k (2), Loss (1)
      // If we have 5 spins left, we're on the 1st spin (idx 0)
      const sequenceIndex = 5 - currentSpins; 
      const indices = [1, 2, 5, 0, 7]; // Sequence of slice indices
      wonSliceIndex = indices[sequenceIndex] ?? 7; 
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
      setResult(`You won ${wonSlice.label}!`);
      
      const currentBalance = Number(user.balance) || 0;
      const nextSpins = isFreeSpin ? currentSpins - 1 : 0;

      updateUser({
        balance: currentBalance + (wonSlice.value || 0) - 100, 
        clicks: (Number(user.clicks) || 0) + 1,
        freeSpins: nextSpins,
        welcomeSpinsFinished: isFreeSpin ? (nextSpins === 0) : true
      });

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
    paths.push(<path key={i} d={pathData} fill={wheelData[i].color} stroke="#fff" strokeWidth={3} />);
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
        fontSize="1rem"
        fontWeight="bold"
        fill="#fff"
        style={{ textShadow: '0 1px 4px #222' }}
        transform={`rotate(${labelAngle},${coords.x},${coords.y})`}
      >
        {wheelData[i].label}
      </text>
    );
  }

  return (
    <WheelContainer>
      <div style={{ color: '#0a3570', fontWeight: 700, marginBottom: 10, fontSize: '0.9rem' }}>
        {user?.freeSpins ? `🎁 PROMO SPINS DETECTED (${user.freeSpins} left)` : 'LUCKY SPIN ACTIVE'}
      </div>
      <div style={{ position: 'relative' }}>
        <Pointer />
        <WheelWrapper rotation={rotation} transitioning={isSpinning}>
          <svg width={size} height={size}>
            {paths}
            {labels}
            <circle cx={center} cy={center} r={32} fill="#fff" stroke="#eee" strokeWidth={2} />
          </svg>
        </WheelWrapper>
      </div>

      <div style={{ textAlign: 'center' }}>
        {result && (
          <div style={{ marginBottom: 16, fontSize: '1.2rem', fontWeight: 800, color: '#1b7e1b' }}>
            {result}
          </div>
        )}
        <SpinButton onClick={spin} disabled={isSpinning}>
          {isSpinning ? 'SPINNING...' : (user && user.freeSpins > 0 ? `PROMO SPIN (${user.freeSpins} Left)` : 'LUCKY SPIN (KES 100)')}
        </SpinButton>
      </div>
    </WheelContainer>
  );
};

export default SpinWheel;
