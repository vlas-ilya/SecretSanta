import ValidatorJS from 'validator';
import isHashValidator from 'validator/lib/isHash';

export function isHash(value: unknown, algorithm: ValidatorJS.HashAlgorithm): boolean {
  return typeof value === 'string' && isHashValidator(value, algorithm);
}
