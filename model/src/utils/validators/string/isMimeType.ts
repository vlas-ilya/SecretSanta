import isMimeTypeValidator from 'validator/lib/isMimeType';

export function isMimeType(value: unknown): boolean {
  return typeof value === 'string' && isMimeTypeValidator(value);
}
