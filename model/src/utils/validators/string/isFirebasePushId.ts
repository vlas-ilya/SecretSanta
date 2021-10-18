export function isFirebasePushId(value: unknown): boolean {
  const webSafeRegex = /^[a-zA-Z0-9_-]*$/;
  return typeof value === 'string' && value.length === 20 && webSafeRegex.test(value);
}
