import isJSONValidator from 'validator/lib/isJSON';

export function isJSON(value: unknown): boolean {
  return typeof value === 'string' && isJSONValidator(value);
}
