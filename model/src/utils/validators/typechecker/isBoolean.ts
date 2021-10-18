export function isBoolean(value: unknown): boolean {
  return value instanceof Boolean || typeof value === 'boolean';
}
