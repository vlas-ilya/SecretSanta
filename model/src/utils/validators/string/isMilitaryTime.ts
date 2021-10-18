import matchesValidator from 'validator/lib/matches';

export function isMilitaryTime(value: unknown): boolean {
  const militaryTimeRegex = /^([01]\d|2[0-3]):?([0-5]\d)$/;
  return typeof value === 'string' && matchesValidator(value, militaryTimeRegex);
}
