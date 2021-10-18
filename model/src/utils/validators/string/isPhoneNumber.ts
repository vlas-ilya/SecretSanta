import { CountryCode } from 'libphonenumber-js/types';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

export function isPhoneNumber(
  value: string,
  region?:
    | CountryCode
    | { defaultCountry?: CountryCode; defaultCallingCode?: string; extract?: boolean },
) {
  try {
    const phoneNum = parsePhoneNumberFromString(value, region);
    const result = phoneNum === null || phoneNum === void 0 ? void 0 : phoneNum.isValid();
    return !!result;
  } catch (error) {
    // logging?
    return false;
  }
}
