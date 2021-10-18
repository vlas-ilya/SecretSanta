import ValidatorJS from 'validator';
import isEmailValidator from 'validator/lib/isEmail';

export function isEmail(value: unknown, options?: ValidatorJS.IsEmailOptions): boolean {
  return typeof value === 'string' && isEmailValidator(value, options);
}
