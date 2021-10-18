import ValidatorJS from 'validator';
import { isISO8601 } from './isISO8601';

export function isDateString(
  value: unknown,
  options?: ValidatorJS.IsISO8601Options,
): boolean {
  return isISO8601(value, options);
}
