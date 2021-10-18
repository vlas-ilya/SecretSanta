import isMongoIdValidator from 'validator/lib/isMongoId';

export function isMongoId(value: unknown): boolean {
  return typeof value === 'string' && isMongoIdValidator(value);
}
