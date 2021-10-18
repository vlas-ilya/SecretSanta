import isRFC3339Validator from 'validator/lib/isRFC3339';

export function isRFC3339(value: unknown): boolean {
  return typeof value === 'string' && isRFC3339Validator(value);
}
