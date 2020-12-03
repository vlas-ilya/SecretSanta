export const throwIfTrue = (condition: boolean, error: Error) => {
  if (condition) {
    throw error;
  }
}