export function maxDate(date: unknown, maxDate: Date): boolean {
  return date instanceof Date && date.getTime() <= maxDate.getTime();
}
