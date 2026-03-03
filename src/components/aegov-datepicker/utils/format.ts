/**
 * Date formatting and parsing utilities for aegov-datepicker
 */

type TokenFormatter = (d: Date, locale: string) => string;

const TOKEN_MAP: Record<string, TokenFormatter> = {
  'YYYY': (d) => String(d.getFullYear()),
  'YY': (d) => String(d.getFullYear()).slice(-2),
  'MMMM': (d, l) => new Intl.DateTimeFormat(l, { month: 'long' }).format(d),
  'MMM': (d, l) => new Intl.DateTimeFormat(l, { month: 'short' }).format(d),
  'MM': (d) => String(d.getMonth() + 1).padStart(2, '0'),
  'M': (d) => String(d.getMonth() + 1),
  'DD': (d) => String(d.getDate()).padStart(2, '0'),
  'D': (d) => String(d.getDate()),
  'ddd': (d, l) => new Intl.DateTimeFormat(l, { weekday: 'long' }).format(d),
  'dd': (d, l) => new Intl.DateTimeFormat(l, { weekday: 'short' }).format(d),
};

// Sort tokens by length descending so we match longest tokens first
const SORTED_TOKENS = Object.keys(TOKEN_MAP).sort((a, b) => b.length - a.length);

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
export function formatDate(date: Date, format: string, locale: string = 'en'): string {
  // Replace tokens with placeholders first to avoid re-matching replaced values
  const replacements: string[] = [];
  let result = format;

  for (const token of SORTED_TOKENS) {
    if (result.includes(token)) {
      const value = TOKEN_MAP[token](date, locale);
      const placeholder = `\x00${replacements.length}\x00`;
      replacements.push(value);
      result = result.split(token).join(placeholder);
    }
  }

  // Replace placeholders with actual values
  for (let i = 0; i < replacements.length; i++) {
    result = result.split(`\x00${i}\x00`).join(replacements[i]);
  }

  return result;
}

/**
 * Parse a date string into a Date object using format tokens.
 * Supports ISO format (YYYY-MM-DD) directly, and token-based parsing for others.
 *
 * @param value - Date string to parse
 * @param format - Format string matching the value's layout
 * @returns Date object or null if parsing fails
 */
export function parseDate(value: string, format: string): Date | null {
  if (!value || !value.trim()) return null;

  const trimmed = value.trim();

  // Direct ISO parse (most common)
  if (/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
    const [y, m, d] = trimmed.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    if (!isNaN(date.getTime())) return date;
  }

  // Token-based parsing: build regex from format string
  // Step 1: Split format into tokens and literal separators
  const groups: string[] = [];
  const numericTokens = ['YYYY', 'YY', 'MM', 'M', 'DD', 'D'];
  let regexStr = '';
  let remaining = format;

  while (remaining.length > 0) {
    let matched = false;
    // Try to match longest token first
    for (const token of SORTED_TOKENS) {
      if (remaining.startsWith(token)) {
        if (numericTokens.includes(token)) {
          groups.push(token);
          if (token === 'YYYY') {
            regexStr += '(\\d{4})';
          } else if (token === 'YY') {
            regexStr += '(\\d{2})';
          } else {
            regexStr += '(\\d{1,2})';
          }
        } else {
          // Name-based tokens - skip with wildcard
          regexStr += '.+?';
        }
        remaining = remaining.slice(token.length);
        matched = true;
        break;
      }
    }
    if (!matched) {
      // Literal character - escape for regex
      regexStr += escapeRegExp(remaining[0]);
      remaining = remaining.slice(1);
    }
  }

  const match = trimmed.match(new RegExp(`^${regexStr}$`));
  if (!match) return null;

  let year = 2000;
  let month = 0;
  let day = 1;

  groups.forEach((token, i) => {
    if (i + 1 >= match.length) return;
    const val = parseInt(match[i + 1], 10);
    if (isNaN(val)) return;

    switch (token) {
      case 'YYYY':
        year = val;
        break;
      case 'YY':
        year = 2000 + val;
        break;
      case 'MM':
      case 'M':
        month = val - 1;
        break;
      case 'DD':
      case 'D':
        day = val;
        break;
    }
  });

  const date = new Date(year, month, day);
  return isNaN(date.getTime()) ? null : date;
}

/**
 * Parse a range value string into start and end dates.
 * Range format: "startDate / endDate" (e.g., "2026-01-01 / 2026-01-31")
 */
export function parseRangeValue(value: string, format: string): { start: Date | null; end: Date | null } {
  if (!value || !value.includes('/')) {
    return { start: null, end: null };
  }

  const parts = value.split('/').map(s => s.trim());
  return {
    start: parts[0] ? parseDate(parts[0], format) : null,
    end: parts[1] ? parseDate(parts[1], format) : null,
  };
}

/**
 * Format a range value as "start / end" string
 */
export function formatRangeValue(start: Date, end: Date, format: string, locale: string = 'en'): string {
  return `${formatDate(start, format, locale)} / ${formatDate(end, format, locale)}`;
}

function escapeRegExp(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
