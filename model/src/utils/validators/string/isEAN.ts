import isEANValidator from 'validator/lib/isEAN';

export function isEAN(value: unknown): boolean {
  return typeof value === 'string' && isEANValidator(value);
}
