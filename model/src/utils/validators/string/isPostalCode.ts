import ValidatorJS from 'validator';
import isPostalCodeValidator from 'validator/lib/isPostalCode';

export function isPostalCode(
  value: unknown,
  locale: 'any' | ValidatorJS.PostalCodeLocale,
): boolean {
  return typeof value === 'string' && isPostalCodeValidator(value, locale);
}
