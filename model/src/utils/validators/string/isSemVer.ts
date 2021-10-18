import isSemVerValidator from 'validator/lib/isSemVer';

export function isSemVer(value: unknown): boolean {
  return typeof value === 'string' && isSemVerValidator(value);
}
