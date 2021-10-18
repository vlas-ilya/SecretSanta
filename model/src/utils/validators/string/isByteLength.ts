import isByteLengthValidator from 'validator/lib/isByteLength';

export function isByteLength(value: unknown, min: number, max?: number): boolean {
  return typeof value === 'string' && isByteLengthValidator(value, { min, max });
}
