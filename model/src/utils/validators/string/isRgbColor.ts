import isRgbColorValidator from 'validator/lib/isRgbColor';

export function isRgbColor(value: unknown, includePercentValues?: boolean): boolean {
  return typeof value === 'string' && isRgbColorValidator(value, includePercentValues);
}
