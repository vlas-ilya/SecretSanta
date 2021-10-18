import ValidatorJS from 'validator';
import isCurrencyValidator from 'validator/lib/isCurrency';

export function isCurrency(
  value: unknown,
  options?: ValidatorJS.IsCurrencyOptions,
): boolean {
  return typeof value === 'string' && isCurrencyValidator(value, options);
}
