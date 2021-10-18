import isIBANValidator from 'validator/lib/isIBAN';

export function isIBAN(value: unknown): boolean {
  return typeof value === 'string' && isIBANValidator(value);
}
