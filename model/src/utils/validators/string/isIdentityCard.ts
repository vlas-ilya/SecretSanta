import ValidatorJS from 'validator';
import isIdentityCardValidator from 'validator/lib/isIdentityCard';

export function isIdentityCard(
  value: unknown,
  locale: ValidatorJS.IdentityCardLocale,
): boolean {
  return typeof value === 'string' && isIdentityCardValidator(value, locale);
}
