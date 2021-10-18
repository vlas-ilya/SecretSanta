import ValidatorJS from 'validator';
import isDecimalValidator from 'validator/lib/isDecimal';

export function isDecimal(
  value: unknown,
  options?: ValidatorJS.IsDecimalOptions,
): boolean {
  return typeof value === 'string' && isDecimalValidator(value, options);
}
