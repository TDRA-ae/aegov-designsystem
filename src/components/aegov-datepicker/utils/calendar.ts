/**
 * Calendar grid generation utilities for aegov-datepicker
 */

/**
 * Strip time from a Date, returning midnight local time
 */
export function stripTime(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

/**
 * Check if two dates represent the same calendar day
 */
export function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/**
 * Check if a date falls between start and end (exclusive)
 */
export function isDateBetween(date: Date, start: Date, end: Date): boolean {
  const d = stripTime(date).getTime();
  const s = stripTime(start).getTime();
  const e = stripTime(end).getTime();
  return d > Math.min(s, e) && d < Math.max(s, e);
}

/**
 * Calculate absolute difference in days between two dates
 */
export function diffDays(a: Date, b: Date): number {
  const ms = Math.abs(stripTime(a).getTime() - stripTime(b).getTime());
  return Math.round(ms / 86400000);
}

/**
 * Check if date a is before date b (day-level comparison)
 */
export function isBefore(a: Date, b: Date): boolean {
  return stripTime(a).getTime() < stripTime(b).getTime();
}

/**
 * Check if date a is after date b (day-level comparison)
 */
export function isAfter(a: Date, b: Date): boolean {
  return stripTime(a).getTime() > stripTime(b).getTime();
}

/**
 * Generate a 6-row x 7-column calendar grid for a given month/year.
 *
 * @param year - Full year (e.g., 2026)
 * @param month - 0-indexed month (0=January, 11=December)
 * @param startDay - Day of week to start (0=Sunday, 1=Monday, ...6=Saturday)
 * @returns 6x7 array of Date objects covering the visible calendar
 */
export function generateCalendarGrid(
  year: number,
  month: number,
  startDay: number = 0,
): Date[][] {
  const firstOfMonth = new Date(year, month, 1);
  const firstDayOfWeek = firstOfMonth.getDay();

  // Calculate how many leading days from previous month
  let offset = firstDayOfWeek - startDay;
  if (offset < 0) offset += 7;

  // Start date: go back `offset` days from the 1st
  const gridStart = new Date(year, month, 1 - offset);

  const grid: Date[][] = [];
  const current = new Date(gridStart);

  for (let row = 0; row < 6; row++) {
    const week: Date[] = [];
    for (let col = 0; col < 7; col++) {
      week.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    grid.push(week);
  }

  return grid;
}

/**
 * Get localized weekday names starting from the configured start day.
 *
 * @param locale - BCP 47 locale string (e.g., 'en', 'ar', 'fr')
 * @param startDay - Day of week to start (0=Sunday)
 * @param format - 'narrow' (S, M, T...) or 'short' (Sun, Mon, Tue...)
 */
export function getWeekdayNames(
  locale: string = 'en',
  startDay: number = 0,
  format: 'narrow' | 'short' | 'long' = 'short',
): string[] {
  const formatter = new Intl.DateTimeFormat(locale, { weekday: format });
  const names: string[] = [];
  // Jan 4, 1970 is a known Sunday
  for (let i = 0; i < 7; i++) {
    const dayIndex = (startDay + i) % 7;
    const refDate = new Date(1970, 0, 4 + dayIndex);
    names.push(formatter.format(refDate));
  }
  return names;
}

/**
 * Get localized month names.
 *
 * @param locale - BCP 47 locale string
 * @param format - 'long' (January) or 'short' (Jan)
 */
export function getMonthNames(
  locale: string = 'en',
  format: 'long' | 'short' = 'long',
): string[] {
  const formatter = new Intl.DateTimeFormat(locale, { month: format });
  return Array.from({ length: 12 }, (_, i) => formatter.format(new Date(2000, i, 1)));
}

/**
 * Get a year range for the year selector dropdown.
 *
 * @param centerYear - Year to center the range on
 * @param range - Number of years before and after center (default: 100)
 */
export function getYearRange(centerYear: number, range: number = 100): number[] {
  const start = centerYear - range;
  const end = centerYear + range;
  const years: number[] = [];
  for (let y = start; y <= end; y++) {
    years.push(y);
  }
  return years;
}
