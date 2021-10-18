import ValidatorJS from 'validator';
import isAlphanumericValidator from 'validator/lib/isAlphanumeric';

export function isAlphanumeric(
  value: unknown,
  locale?: ValidatorJS.AlphanumericLocale,
): boolean {
  return typeof value === 'string' && isAlphanumericValidator(value, locale);
}
