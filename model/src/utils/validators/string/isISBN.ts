import isIsbnValidator from 'validator/lib/isISBN';

export declare type IsISBNVersion = '10' | '13' | 10 | 13;

export function isISBN(value: unknown, version?: IsISBNVersion): boolean {
  const versionStr = version ? (`${version}` as IsISBNVersion) : undefined;
  return typeof value === 'string' && isIsbnValidator(value, versionStr);
}
