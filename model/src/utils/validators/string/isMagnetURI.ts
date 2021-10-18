import isMagnetURIValidator from 'validator/lib/isMagnetURI';

export function isMagnetURI(value: unknown): boolean {
  return typeof value === 'string' && isMagnetURIValidator(value);
}
