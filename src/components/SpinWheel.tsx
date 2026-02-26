
// Arranged to match screenshot clockwise from top pointer
const wheelData = [
  { label: 'KES 1000', color: '#ffe066' },
  { label: '-KES 1000', color: '#b71c1c' },
  { label: 'KES 600', color: '#ffb3b3' },
  { label: '-KES 500', color: '#b71c1c' },
  { label: 'KES 500', color: '#7ed6df' },
  { label: '-KES 750', color: '#c0392b' },
  { label: 'KES 800', color: '#ffe066' },
  { label: '-KES 600', color: '#b71c1c' },
];

const SpinWheel = () => {
  // Render a static SVG wheel with 8 slices
  const size = 320;
  const center = size / 2;
  const radius = size / 2 - 8;
  const numSlices = wheelData.length;
  const angle = 360 / numSlices;



  let paths = [];
  for (let i = 0; i < numSlices; i++) {
    const startAngle = i * angle;
    const endAngle = (i + 1) * angle;
    const start = getCoordsForAngle(startAngle);
    const end = getCoordsForAngle(endAngle);
    const largeArc = angle > 180 ? 1 : 0;
    const pathData = [
      `M ${center} ${center}`,
      `L ${start.x} ${start.y}`,
      `A ${radius} ${radius} 0 ${largeArc} 1 ${end.x} ${end.y}`,
      'Z',
    ].join(' ');
    paths.push(
      <path
        key={i}
        d={pathData}
        fill={wheelData[i].color}
        stroke="#fff"
        strokeWidth={3}
      />
    );
  }

  // Labels upright and perpendicular to arc
  let labels = [];
  for (let i = 0; i < numSlices; i++) {
    const labelAngle = (i + 0.5) * angle;
    const labelRadius = radius * 0.72;
    const coords = getCoordsForAngle(labelAngle, labelRadius);
    // Perpendicular rotation: labelAngle degrees
    labels.push(
      <text
        key={i}
        x={coords.x}
        y={coords.y}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize="1.15rem"
        fontWeight="bold"
        fill="#fff"
        style={{
          textShadow: '0 1px 4px #222',
        }}
        transform={`rotate(${labelAngle},${coords.x},${coords.y})`}
      >
        {wheelData[i].label}
      </text>
    );
  }

  // Helper to allow radius override
  function getCoordsForAngle(deg: number, r: number = radius) {
    const rad = (deg - 90) * (Math.PI / 180);
    return {
      x: center + r * Math.cos(rad),
      y: center + r * Math.sin(rad),
    };
  }

  return (
    <div style={{ position: 'relative', width: size, height: size }}>
      <svg width={size} height={size}>
        {paths}
        {labels}
        {/* Center circle */}
        <circle cx={center} cy={center} r={38} fill="#fff" stroke="#eee" strokeWidth={2} />
      </svg>
      {/* Pointer */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translate(-50%, -18px)',
        width: 0,
        height: 0,
        borderLeft: '18px solid transparent',
        borderRight: '18px solid transparent',
        borderBottom: '32px solid #222',
        zIndex: 2,
      }} />
    </div>
  );
};

export default SpinWheel;
