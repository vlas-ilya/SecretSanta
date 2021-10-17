import { Interval } from './classes/Interval';
import { isUUID } from '@nestjs/common/utils/is-uuid';

export function notNull<T>(value: T, errorMessage: Error) {
  if (value === null || value === undefined) {
    throw errorMessage;
  }
}

export function isGreater(minValue: number, maxValue: number, errorMessage: Error) {
  notNull(minValue, errorMessage);
  notNull(maxValue, errorMessage);
  if (minValue >= maxValue) {
    throw errorMessage;
  }
}

export function inInterval<T extends string>(
  value: T,
  interval: Interval,
  errorMessage: Error,
) {
  notNull(value, errorMessage);
  if (!interval.include(value.length)) {
    throw errorMessage;
  }
}

export function isUuid<T extends string>(value: T, errorMessage: Error) {
  notNull(value, errorMessage);
  if (!isUUID(value)) {
    throw errorMessage;
  }
}

export function containsOnlyNumbers<T extends string>(value: T, errorMessage: Error) {
  notNull(value, errorMessage);
  if (!/^\d+$/.test(value)) {
    throw errorMessage;
  }
}

export function notEmpty<T extends { length: number }>(value: T, errorMessage: Error) {
  notNull(value, errorMessage);
  if (!value?.length) {
    throw errorMessage;
  }
}

export function correctHash<T extends string>(value: T, errorMessage: Error) {
  notEmpty(value, errorMessage);
  // TODO (feat): проверить регэкспом
}

export function isTrue(condition: boolean, error: Error) {
  if (!condition) {
    throw error;
  }
}

export function isFalse(condition: boolean, error: Error) {
  isTrue(!condition, error);
}
