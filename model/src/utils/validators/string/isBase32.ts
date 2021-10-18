import isBase32Validator from 'validator/lib/isBase32';

export function isBase32(value: unknown): boolean {
  return typeof value === 'string' && isBase32Validator(value);
}
