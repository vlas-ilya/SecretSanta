import ValidatorJS from 'validator';
import isFqdnValidator from 'validator/lib/isFQDN';

export function isFQDN(value: unknown, options?: ValidatorJS.IsFQDNOptions): boolean {
  return typeof value === 'string' && isFqdnValidator(value, options);
}
