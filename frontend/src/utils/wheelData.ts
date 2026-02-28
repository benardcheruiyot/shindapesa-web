export interface WheelSegment {
  label: string;
  color: string;
  min: number;
  max: number;
  valueTag: string;
}

export const wheelData: WheelSegment[] = [
  { label: 'ULTRA WIN', color: 'linear-gradient(135deg, #1d4ed8 0%, #172554 100%)', min: 20000, max: 20000, valueTag: 'x200' },
  { label: 'TRY AGAIN', color: '#0f172a', min: 0, max: 0, valueTag: 'x' },
  { label: 'MEGA WIN', color: 'linear-gradient(135deg, #4f46e5 0%, #312e81 100%)', min: 10000, max: 10000, valueTag: 'x100' },
  { label: 'TRY AGAIN', color: '#0f172a', min: 0, max: 0, valueTag: 'x' },
  { label: 'MAX WIN', color: 'linear-gradient(135deg, #1d4ed8 0%, #172554 100%)', min: 5000, max: 5000, valueTag: 'x50' },
  { label: 'TRY AGAIN', color: '#0f172a', min: 0, max: 0, valueTag: 'x' },
  { label: 'BIG WIN', color: 'linear-gradient(135deg, #059669 0%, #064e3b 100%)', min: 2000, max: 2000, valueTag: 'x20' },
  { label: 'TRY AGAIN', color: '#0f172a', min: 0, max: 0, valueTag: 'x' },
  { label: 'LUCKY WIN', color: 'linear-gradient(135deg, #0891b2 0%, #083344 100%)', min: 1000, max: 1000, valueTag: 'x10' },
  { label: 'TRY AGAIN', color: '#0f172a', min: 0, max: 0, valueTag: 'x' },
  { label: 'MEGA WIN', color: 'linear-gradient(135deg, #4f46e5 0%, #312e81 100%)', min: 500, max: 500, valueTag: 'x5' },
  { label: 'TRY AGAIN', color: '#0f172a', min: 0, max: 0, valueTag: 'x' },
];
