export function arrayMinSize(array: unknown, min: number): boolean {
  return array instanceof Array && array.length >= min;
}
