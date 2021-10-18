export declare type ArrayUniqueIdentifier<T = any> = (o: T) => any;

export function arrayUnique(
  array: unknown[],
  identifier?: ArrayUniqueIdentifier,
): boolean {
  if (!(array instanceof Array)) return false;
  if (identifier) {
    array = array.map((o) => (o != null ? identifier(o) : o));
  }
  const uniqueItems = array.filter((a, b, c) => c.indexOf(a) === b);
  return array.length === uniqueItems.length;
}
