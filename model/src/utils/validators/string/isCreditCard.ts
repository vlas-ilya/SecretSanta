import isCreditCardValidator from 'validator/lib/isCreditCard';

export function isCreditCard(value: unknown): boolean {
  return typeof value === 'string' && isCreditCardValidator(value);
}
