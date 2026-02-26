import React, { useState, useRef } from 'react';
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
  { label: 'KES 1000', color: '#ffe066', value: 1000 },
  { label: '-KES 1000', color: '#b71c1c', value: -1000 },
  { label: 'KES 600', color: '#ffb3b3', value: 600 },
  { label: '-KES 500', color: '#b71c1c', value: -500 },
  { label: 'KES 500', color: '#7ed6df', value: 500 },
  { label: '-KES 750', color: '#c0392b', value: -750 },
  { label: 'KES 800', color: '#ffe066', value: 800 },
  { label: '-KES 600', color: '#b71c1c', value: -600 },
];

const SpinWheel = () => {
  const { user, updateUser } = useUser();
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  const spin = () => {
    if (isSpinning || !user) return;
    
    // Check if account is activated for real spins
    if (!user.welcomeSpinsFinished && !user.isActivated) {
       // Allow some spins for testing or demo?
    }

    setIsSpinning(true);
    setResult(null);

    // Randomize result
    const extraDegrees = Math.floor(Math.random() * 360);
    const totalSpins = 5 + Math.floor(Math.random() * 5); // 5 to 10 full rotations
    const newRotation = rotation + (totalSpins * 360) + extraDegrees;
    
    setRotation(newRotation);

    setTimeout(() => {
      setIsSpinning(false);
      
      // Calculate which slice it landed on
      // The pointer is at the top (0 deg). 
      // The wheel rotates clockwise.
      // A point at angle A on the wheel moves to (A + rotation) % 360.
      // We want to know which slice is at the top (0 deg).
      // So (sliceAngle + rotation) % 360 = 0 => sliceAngle = (-rotation) % 360
      const actualRotation = newRotation % 360;
      const sliceAngle = 360 / wheelData.length;
      
      // Adjusted calculation for pointer at top
      const index = Math.floor(((360 - (actualRotation % 360)) % 360) / sliceAngle);
      const wonSlice = wheelData[index];
      
      setResult(`You won ${wonSlice.label}!`);
      
      // Update balance in context
      const currentBalance = user.balance || 0;
      updateUser({
        balance: currentBalance + wonSlice.value,
        clicks: (user.clicks || 0) + 1
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
          {isSpinning ? 'SPINNING...' : 'SPIN NOW!'}
        </SpinButton>
      </div>
    </WheelContainer>
  );
};

export default SpinWheel;

export default SpinWheel;
