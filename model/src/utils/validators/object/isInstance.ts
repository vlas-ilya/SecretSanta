export function isInstance(
  object: unknown,
  targetTypeConstructor: new (...args: any[]) => any,
): boolean {
  return (
    targetTypeConstructor &&
    typeof targetTypeConstructor === 'function' &&
    object instanceof targetTypeConstructor
  );
}
