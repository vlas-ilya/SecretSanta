export function arrayContains(array: unknown, values: any[]): boolean {
  if (!(array instanceof Array)) return false;
  return values.every((value) => array.indexOf(value) !== -1);
}
