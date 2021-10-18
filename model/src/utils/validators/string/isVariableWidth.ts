import isVariableWidthValidator from 'validator/lib/isVariableWidth';

export function isVariableWidth(value: unknown): boolean {
  return typeof value === 'string' && isVariableWidthValidator(value);
}
