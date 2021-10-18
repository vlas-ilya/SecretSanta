import isLocaleValidator from 'validator/lib/isLocale';

export function isLocale(value: unknown): boolean {
  return typeof value === 'string' && isLocaleValidator(value);
}
