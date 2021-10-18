export function isString(value: unknown): value is string {
  return value instanceof String || typeof value === 'string';
}
