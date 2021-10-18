import isHexadecimalValidator from 'validator/lib/isHexadecimal';

export function isHexadecimal(value: unknown): boolean {
  return typeof value === 'string' && isHexadecimalValidator(value);
}
