import isLengthValidator from 'validator/lib/isLength';

export function maxLength(value: unknown, max: number): boolean {
  return typeof value === 'string' && isLengthValidator(value, { min: 0, max });
}
