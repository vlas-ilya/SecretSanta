export function arrayMaxSize(array: unknown, max: number): boolean {
  return array instanceof Array && array.length <= max;
}
