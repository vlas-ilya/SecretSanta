import containsValidator from 'validator/lib/contains';

export function contains(value: unknown, seed: string): boolean {
  return typeof value === 'string' && containsValidator(value, seed);
}
