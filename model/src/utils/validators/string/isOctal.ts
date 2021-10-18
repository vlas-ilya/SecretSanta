import isOctalValidator from 'validator/lib/isOctal';

export function isOctal(value: unknown): boolean {
  return typeof value === 'string' && isOctalValidator(value);
}
