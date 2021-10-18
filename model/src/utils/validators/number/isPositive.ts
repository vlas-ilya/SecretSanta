export function isPositive(value: unknown): boolean {
  return typeof value === 'number' && value > 0;
}
