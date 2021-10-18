export function isInt(val: unknown): boolean {
  return typeof val === 'number' && Number.isInteger(val);
}
