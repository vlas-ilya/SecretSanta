import isEthereumAddressValidator from 'validator/lib/isEthereumAddress';

export function isEthereumAddress(value: unknown): boolean {
  return typeof value === 'string' && isEthereumAddressValidator(value);
}
