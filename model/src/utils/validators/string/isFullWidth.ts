import isFullWidthValidator from 'validator/lib/isFullWidth';

export function isFullWidth(value: unknown): boolean {
  return typeof value === 'string' && isFullWidthValidator(value);
}
