import ValidatorJS from 'validator';
import isIso8601Validator from 'validator/lib/isISO8601';

export function isISO8601(
  value: unknown,
  options?: ValidatorJS.IsISO8601Options,
): boolean {
  return typeof value === 'string' && isIso8601Validator(value, options);
}
