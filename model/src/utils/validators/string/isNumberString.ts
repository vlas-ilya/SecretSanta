import ValidatorJS from 'validator';
import isNumericValidator from 'validator/lib/isNumeric';

export function isNumberString(
  value: unknown,
  options?: ValidatorJS.IsNumericOptions,
): boolean {
  return typeof value === 'string' && isNumericValidator(value, options);
}
