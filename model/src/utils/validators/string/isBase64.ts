import isBase64Validator from 'validator/lib/isBase64';

export function isBase64(value: unknown): boolean {
  return typeof value === 'string' && isBase64Validator(value);
}
