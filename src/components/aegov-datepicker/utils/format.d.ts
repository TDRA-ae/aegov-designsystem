/**
 * Date formatting and parsing utilities for aegov-datepicker
 */
/**
 * Format a Date object into a string using format tokens.
 *
 * Supported tokens:
 * - YYYY: 4-digit year (2026)
 * - YY: 2-digit year (26)
 * - MMMM: Full month name (January)
 * - MMM: Short month name (Jan)
 * - MM: 2-digit month (01-12)
 * - M: Month without padding (1-12)
 * - DD: 2-digit day (01-31)
 * - D: Day without padding (1-31)
 * - ddd: Full weekday name (Monday)
 * - dd: Short weekday name (Mon)
 *
 * @param date - Date to format
 * @param format - Format string with tokens (e.g., 'YYYY-MM-DD')
 * @param locale - BCP 47 locale for name-based tokens
 */
export declare function formatDate(date: Date, format: string, locale?: string): string;
/**
 * Parse a date string into a Date object using format tokens.
 * Supports ISO format (YYYY-MM-DD) directly, and token-based parsing for others.
 *
 * @param value - Date string to parse
 * @param format - Format string matching the value's layout
 * @returns Date object or null if parsing fails
 */
export declare function parseDate(value: string, format: string): Date | null;
/**
 * Parse a range value string into start and end dates.
 * Range format: "startDate / endDate" (e.g., "2026-01-01 / 2026-01-31")
 */
export declare function parseRangeValue(value: string, format: string): {
    start: Date | null;
    end: Date | null;
};
/**
 * Format a range value as "start / end" string
 */
export declare function formatRangeValue(start: Date, end: Date, format: string, locale?: string): string;
