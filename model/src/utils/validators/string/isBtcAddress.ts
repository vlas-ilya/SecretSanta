import isBtcAddressValidator from 'validator/lib/isBtcAddress';

export function isBtcAddress(value: unknown): boolean {
  return typeof value === 'string' && isBtcAddressValidator(value);
}
