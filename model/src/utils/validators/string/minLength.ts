import isLengthValidator from 'validator/lib/isLength';

export function minLength(value: unknown, min: number): boolean {
  return typeof value === 'string' && isLengthValidator(value, { min });
}
