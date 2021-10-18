import isSurrogatePairValidator from 'validator/lib/isSurrogatePair';

export function isSurrogatePair(value: unknown): boolean {
  return typeof value === 'string' && isSurrogatePairValidator(value);
}
