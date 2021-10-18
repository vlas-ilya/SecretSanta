import isPortValidator from 'validator/lib/isPort';

export function isPort(value: unknown): boolean {
  return typeof value === 'string' && isPortValidator(value);
}
