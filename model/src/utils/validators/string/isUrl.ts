import ValidatorJS from 'validator';
import isUrlValidator from 'validator/lib/isURL';

export function isURL(value: string, options?: ValidatorJS.IsURLOptions): boolean {
  return typeof value === 'string' && isUrlValidator(value, options);
}
