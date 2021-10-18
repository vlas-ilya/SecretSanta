export function minDate(date: unknown, minDate: Date): boolean {
  return date instanceof Date && date.getTime() >= minDate.getTime();
}
