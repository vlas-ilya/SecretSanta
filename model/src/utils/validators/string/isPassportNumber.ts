import isPassportNumberValidator from 'validator/lib/isPassportNumber';

export function isPassportNumber(value: unknown, countryCode: string): boolean {
  return typeof value === 'string' && isPassportNumberValidator(value, countryCode);
}
