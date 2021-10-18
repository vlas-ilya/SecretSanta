import ValidatorJS from 'validator';
import isAlphaValidator from 'validator/lib/isAlpha';

export function isAlpha(value: unknown, locale?: ValidatorJS.AlphaLocale): boolean {
  return typeof value === 'string' && isAlphaValidator(value, locale);
}
