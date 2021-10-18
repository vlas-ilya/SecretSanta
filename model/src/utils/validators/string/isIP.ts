import isIPValidator from 'validator/lib/isIP';

export declare type IsIpVersion = '4' | '6' | 4 | 6;

export function isIP(value: unknown, version?: IsIpVersion): boolean {
  const versionStr = version ? (`${version}` as IsIpVersion) : undefined;
  return typeof value === 'string' && isIPValidator(value, versionStr);
}
