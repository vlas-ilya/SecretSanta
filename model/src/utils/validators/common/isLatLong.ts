import isLatLongValidator from 'validator/lib/isLatLong';

export function isLatLong(value: string): boolean {
  return typeof value === 'string' && isLatLongValidator(value);
}
