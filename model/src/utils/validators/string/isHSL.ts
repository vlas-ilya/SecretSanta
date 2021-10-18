import isHSLValidator from 'validator/lib/isHSL';

export function isHSL(value: unknown): boolean {
  return typeof value === 'string' && isHSLValidator(value);
}
