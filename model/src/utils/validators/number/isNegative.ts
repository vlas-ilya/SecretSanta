export function isNegative(value: unknown): boolean {
  return typeof value === 'number' && value < 0;
}
