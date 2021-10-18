import { isLatLong } from './isLatLong';

export function isLatitude(value: string): boolean {
  return (
    (typeof value === 'number' || typeof value === 'string') && isLatLong(`${value},0`)
  );
}
