import { isLatLong } from './isLatLong';
export function isLongitude(value: string): boolean {
  return (
    (typeof value === 'number' || typeof value === 'string') && isLatLong(`0,${value}`)
  );
}
