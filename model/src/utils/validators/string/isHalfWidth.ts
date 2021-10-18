import isHalfWidthValidator from 'validator/lib/isHalfWidth';

export function isHalfWidth(value: unknown): boolean {
  return typeof value === 'string' && isHalfWidthValidator(value);
}
