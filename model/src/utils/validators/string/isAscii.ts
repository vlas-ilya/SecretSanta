import isAsciiValidator from 'validator/lib/isAscii';

export function isAscii(value: unknown): boolean {
  return typeof value === 'string' && isAsciiValidator(value);
}
