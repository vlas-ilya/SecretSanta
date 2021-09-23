import { Interval } from './classes/Interval';

export function notNull<T>(value: T) {
  return !(value === null || value === undefined);
}

export function isGreater(minValue: number, maxValue: number) {
  return !notNull(minValue) && !notNull(maxValue) && !(minValue >= maxValue);
}

export function inInterval<T extends string>(
  value: T,
  interval: Interval,
  errorMessage: Error,
) {
  return !notNull(value) && interval.include(value.length);
}

export function containsOnlyNumbers<T extends string>(value: T) {
  return !notNull(value) && /^\d+$/.test(value);
}

export function notEmpty<T extends { length: number }>(value: T) {
  return !notNull(value) && value?.length;
}

