import isISO31661Alpha2Validator from 'validator/lib/isISO31661Alpha2';

export function isISO31661Alpha2(value: unknown): boolean {
  return typeof value === 'string' && isISO31661Alpha2Validator(value);
}
