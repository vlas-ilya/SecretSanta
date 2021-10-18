import ValidatorJS from 'validator';
import isISSNValidator from 'validator/lib/isISSN';

export function isISSN(value: unknown, options?: ValidatorJS.IsISSNOptions): boolean {
  return typeof value === 'string' && isISSNValidator(value, options);
}
