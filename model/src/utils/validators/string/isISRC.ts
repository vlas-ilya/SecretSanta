import isISRCValidator from 'validator/lib/isISRC';

export function isISRC(value: unknown): boolean {
  return typeof value === 'string' && isISRCValidator(value);
}
