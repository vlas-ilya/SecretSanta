import { isObject } from '../typechecker/isObject';

export function isNotEmptyObject(
  value: unknown,
  options?: {
    nullable?: boolean;
  },
): boolean {
  if (!isObject(value)) {
    return false;
  }
  if ((options === null || options === void 0 ? void 0 : options.nullable) === true) {
    return !Object.values(value).every(
      (propertyValue) => propertyValue === null || propertyValue === undefined,
    );
  }
  for (const key in value) {
    if (value.hasOwnProperty(key)) {
      return true;
    }
  }
  return false;
}
