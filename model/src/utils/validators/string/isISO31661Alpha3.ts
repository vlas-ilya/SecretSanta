import isISO31661Alpha3Validator from 'validator/lib/isISO31661Alpha3';

export function isISO31661Alpha3(value: unknown): boolean {
  return typeof value === 'string' && isISO31661Alpha3Validator(value);
}
