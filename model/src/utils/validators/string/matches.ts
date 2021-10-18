import matchesValidator from 'validator/lib/matches';

export function matches(value: string, pattern: string, modifiers?: string): boolean {
  return typeof value === 'string' && matchesValidator(value, pattern, modifiers);
}
