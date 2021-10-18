export function isNotIn(value: unknown, possibleValues: readonly unknown[]): boolean {
  return (
    !(possibleValues instanceof Array) ||
    !possibleValues.some((possibleValue) => possibleValue === value)
  );
}
