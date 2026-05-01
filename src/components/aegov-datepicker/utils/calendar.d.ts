/**
 * Calendar grid generation utilities for aegov-datepicker
 */
/**
 * Strip time from a Date, returning midnight local time
 */
export declare function stripTime(date: Date): Date;
/**
 * Check if two dates represent the same calendar day
 */
export declare function isSameDay(a: Date, b: Date): boolean;
/**
 * Check if a date falls between start and end (exclusive)
 */
export declare function isDateBetween(date: Date, start: Date, end: Date): boolean;
/**
 * Calculate absolute difference in days between two dates
 */
export declare function diffDays(a: Date, b: Date): number;
/**
 * Check if date a is before date b (day-level comparison)
 */
export declare function isBefore(a: Date, b: Date): boolean;
/**
 * Check if date a is after date b (day-level comparison)
 */
export declare function isAfter(a: Date, b: Date): boolean;
/**
 * Generate a 6-row x 7-column calendar grid for a given month/year.
 *
 * @param year - Full year (e.g., 2026)
 * @param month - 0-indexed month (0=January, 11=December)
 * @param startDay - Day of week to start (0=Sunday, 1=Monday, ...6=Saturday)
 * @returns 6x7 array of Date objects covering the visible calendar
 */
export declare function generateCalendarGrid(year: number, month: number, startDay?: number): Date[][];
/**
 * Get localized weekday names starting from the configured start day.
 *
 * @param locale - BCP 47 locale string (e.g., 'en', 'ar', 'fr')
 * @param startDay - Day of week to start (0=Sunday)
 * @param format - 'narrow' (S, M, T...) or 'short' (Sun, Mon, Tue...)
 */
export declare function getWeekdayNames(locale?: string, startDay?: number, format?: 'narrow' | 'short'): string[];
/**
 * Get localized month names.
 *
 * @param locale - BCP 47 locale string
 * @param format - 'long' (January) or 'short' (Jan)
 */
export declare function getMonthNames(locale?: string, format?: 'long' | 'short'): string[];
/**
 * Get a year range for the year selector dropdown.
 *
 * @param centerYear - Year to center the range on
 * @param range - Number of years before and after center (default: 100)
 */
export declare function getYearRange(centerYear: number, range?: number): number[];
