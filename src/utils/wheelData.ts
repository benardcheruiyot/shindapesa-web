export interface WheelSegment {
  label: string;
  color: string;
  min: number;
  max: number;
  valueTag: string;
}

export const wheelData: WheelSegment[] = [
  { label: 'JACKPOT', color: 'linear-gradient(135deg, #005baa 0%, #003d73 100%)', min: 10001, max: 20000, valueTag: 'x20' },
  { label: 'TRY AGAIN', color: '#0b1a30', min: 0, max: 0, valueTag: 'x0' },
  { label: 'BIG WIN', color: 'linear-gradient(135deg, #fbdf07 0%, #d4bb00 100%)', min: 5001, max: 10000, valueTag: 'x10' },
  { label: 'TRY AGAIN', color: '#0b1a30', min: 0, max: 0, valueTag: 'x0' },
  { label: 'MEGA', color: 'linear-gradient(135deg, #005baa 0%, #003d73 100%)', min: 1000, max: 5000, valueTag: 'x5' },
  { label: 'TRY AGAIN', color: '#0b1a30', min: 0, max: 0, valueTag: 'x0' },
  { label: 'MINI', color: 'linear-gradient(135deg, #fbdf07 0%, #d4bb00 100%)', min: 100, max: 999, valueTag: 'x1' },
  { label: 'TRY AGAIN', color: '#0b1a30', min: 0, max: 0, valueTag: 'x0' },
];
