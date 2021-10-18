import isMultibyteValidator from 'validator/lib/isMultibyte';

export function isMultibyte(value: unknown): boolean {
  return typeof value === 'string' && isMultibyteValidator(value);
}
