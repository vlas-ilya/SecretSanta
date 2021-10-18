import isDivisibleByValidator from 'validator/lib/isDivisibleBy';

export function isDivisibleBy(value: unknown, num: number): boolean {
  return (
    typeof value === 'number' &&
    typeof num === 'number' &&
    isDivisibleByValidator(String(value), num)
  );
}
