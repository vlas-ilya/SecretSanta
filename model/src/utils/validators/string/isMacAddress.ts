import ValidatorJS from 'validator';
import isMacAddressValidator from 'validator/lib/isMACAddress';

export function isMACAddress(
  value: unknown,
  options?: ValidatorJS.IsMACAddressOptions,
): boolean {
  return typeof value === 'string' && isMacAddressValidator(value, options);
}
