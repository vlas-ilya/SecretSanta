import isLengthValidator from 'validator/lib/isLength';

export function length(value: unknown, min: number, max?: number): boolean {
  return typeof value === 'string' && isLengthValidator(value, { min, max });
}
