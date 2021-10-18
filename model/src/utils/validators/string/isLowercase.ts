import isLowercaseValidator from 'validator/lib/isLowercase';

export function isLowercase(value: unknown): boolean {
  return typeof value === 'string' && isLowercaseValidator(value);
}
