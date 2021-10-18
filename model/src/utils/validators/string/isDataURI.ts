import isDataURIValidator from 'validator/lib/isDataURI';

export function isDataURI(value: unknown): boolean {
  return typeof value === 'string' && isDataURIValidator(value);
}
