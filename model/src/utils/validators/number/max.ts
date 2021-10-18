export function max(num: unknown, max: number): boolean {
  return typeof num === 'number' && typeof max === 'number' && num <= max;
}
