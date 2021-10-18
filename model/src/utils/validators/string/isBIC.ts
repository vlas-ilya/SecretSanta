import isBICValidator from 'validator/lib/isBIC';

export function isBIC(value: unknown): boolean {
  return typeof value === 'string' && isBICValidator(value);
}
