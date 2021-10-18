import isJwtValidator from 'validator/lib/isJWT';

export function isJWT(value: unknown): boolean {
  return typeof value === 'string' && isJwtValidator(value);
}
