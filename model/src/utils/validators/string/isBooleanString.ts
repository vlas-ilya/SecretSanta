import isBooleanValidator from 'validator/lib/isBoolean';

export function isBooleanString(value: unknown): boolean {
  return typeof value === 'string' && isBooleanValidator(value);
}
