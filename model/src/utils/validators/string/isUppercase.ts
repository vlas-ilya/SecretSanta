import isUppercaseValidator from 'validator/lib/isUppercase';

export function isUppercase(value: unknown): boolean {
  return typeof value === 'string' && isUppercaseValidator(value);
}
