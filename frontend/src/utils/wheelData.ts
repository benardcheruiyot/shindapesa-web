export interface WheelSegment {
  label: string;
  color: string;
  min: number;
  max: number;
  valueTag: string;
}

export const wheelData: WheelSegment[] = [
  { label: 'MAX WIN', color: 'linear-gradient(135deg, #1d4ed8 0%, #172554 100%)', min: 10001, max: 20000, valueTag: 'x20' },
  { label: 'TRY AGAIN', color: '#0f172a', min: 0, max: 0, valueTag: 'x0' },
  { label: 'BIG WIN', color: 'linear-gradient(135deg, #059669 0%, #064e3b 100%)', min: 5001, max: 10000, valueTag: 'x10' },
  { label: 'TRY AGAIN', color: '#0f172a', min: 0, max: 0, valueTag: 'x0' },
  { label: 'MEGA', color: 'linear-gradient(135deg, #4f46e5 0%, #312e81 100%)', min: 1000, max: 5000, valueTag: 'x5' },
  { label: 'TRY AGAIN', color: '#0f172a', min: 0, max: 0, valueTag: 'x0' },
  { label: 'MINI', color: 'linear-gradient(135deg, #0891b2 0%, #083344 100%)', min: 100, max: 999, valueTag: 'x1' },
  { label: 'TRY AGAIN', color: '#0f172a', min: 0, max: 0, valueTag: 'x0' },
];
