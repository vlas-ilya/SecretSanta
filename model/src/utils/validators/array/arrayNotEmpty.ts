export function arrayNotEmpty(array: unknown): boolean {
  return array instanceof Array && array.length > 0;
}
