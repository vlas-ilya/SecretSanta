export function ifExist<T, D>(value: T, creator: (value: T) => D): D | undefined {
  if (value) {
    return creator(value);
  }
}
