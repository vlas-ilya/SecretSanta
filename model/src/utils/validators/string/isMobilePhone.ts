import ValidatorJS from 'validator';
import isMobilePhoneValidator from 'validator/lib/isMobilePhone';

export function isMobilePhone(
  value: unknown,
  locale?: ValidatorJS.MobilePhoneLocale,
  options?: ValidatorJS.IsMobilePhoneOptions,
): boolean {
  return typeof value === 'string' && isMobilePhoneValidator(value, locale, options);
}
