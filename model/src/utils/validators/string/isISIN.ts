import isIsinValidator from 'validator/lib/isISIN';

export function isISIN(value: unknown): boolean {
  return typeof value === 'string' && isIsinValidator(value);
}
