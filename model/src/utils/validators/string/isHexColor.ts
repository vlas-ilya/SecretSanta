import isHexColorValidator from 'validator/lib/isHexColor';

export function isHexColor(value: unknown): boolean {
  return typeof value === 'string' && isHexColorValidator(value);
}
