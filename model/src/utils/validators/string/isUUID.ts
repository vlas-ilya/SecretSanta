import isUuidValidator from 'validator/lib/isUUID';

export declare type UUIDVersion = '3' | '4' | '5' | 'all' | 3 | 4 | 5;

export function isUUID(value: unknown, version?: UUIDVersion): boolean {
  return typeof value === 'string' && isUuidValidator(value, version);
}
