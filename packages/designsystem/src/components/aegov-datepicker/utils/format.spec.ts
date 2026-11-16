import { formatDate, parseDate, parseRangeValue, formatRangeValue } from './format';

describe('format utils', () => {
  describe('formatDate', () => {
    const date = new Date(2026, 2, 5); // March 5, 2026

    it('should format YYYY-MM-DD', () => {
      expect(formatDate(date, 'YYYY-MM-DD')).toBe('2026-03-05');
    });

    it('should format DD/MM/YYYY', () => {
      expect(formatDate(date, 'DD/MM/YYYY')).toBe('05/03/2026');
    });

    it('should format MM-DD-YYYY', () => {
      expect(formatDate(date, 'MM-DD-YYYY')).toBe('03-05-2026');
    });

    it('should format D/M/YYYY without padding', () => {
      expect(formatDate(date, 'D/M/YYYY')).toBe('5/3/2026');
    });

    it('should format YY for 2-digit year', () => {
      expect(formatDate(date, 'YY-MM-DD')).toBe('26-03-05');
    });

    it('should format with month names', () => {
      const result = formatDate(date, 'DD MMM YYYY', 'en');
      expect(result).toContain('Mar');
      expect(result).toContain('2026');
    });

    it('should format full month name', () => {
      const result = formatDate(date, 'MMMM DD, YYYY', 'en');
      expect(result).toContain('March');
    });

    it('should handle padded day/month for double digits', () => {
      const d = new Date(2026, 11, 25); // December 25
      expect(formatDate(d, 'YYYY-MM-DD')).toBe('2026-12-25');
    });

    it('should handle single digit day/month without padding', () => {
      expect(formatDate(date, 'M/D/YYYY')).toBe('3/5/2026');
    });
  });

  describe('parseDate', () => {
    it('should parse ISO format YYYY-MM-DD', () => {
      const d = parseDate('2026-03-15', 'YYYY-MM-DD');
      expect(d).not.toBeNull();
      expect(d.getFullYear()).toBe(2026);
      expect(d.getMonth()).toBe(2); // March = 2
      expect(d.getDate()).toBe(15);
    });

    it('should parse DD/MM/YYYY format', () => {
      const d = parseDate('15/03/2026', 'DD/MM/YYYY');
      expect(d).not.toBeNull();
      expect(d.getFullYear()).toBe(2026);
      expect(d.getMonth()).toBe(2);
      expect(d.getDate()).toBe(15);
    });

    it('should parse MM-DD-YYYY format', () => {
      const d = parseDate('03-15-2026', 'MM-DD-YYYY');
      expect(d).not.toBeNull();
      expect(d.getMonth()).toBe(2);
      expect(d.getDate()).toBe(15);
    });

    it('should return null for empty string', () => {
      expect(parseDate('', 'YYYY-MM-DD')).toBeNull();
    });

    it('should return null for invalid date string', () => {
      expect(parseDate('not-a-date', 'YYYY-MM-DD')).toBeNull();
    });

    it('should return null for whitespace', () => {
      expect(parseDate('  ', 'YYYY-MM-DD')).toBeNull();
    });

    it('should handle 2-digit year', () => {
      const d = parseDate('26-03-15', 'YY-MM-DD');
      expect(d).not.toBeNull();
      expect(d.getFullYear()).toBe(2026);
    });
  });

  describe('parseRangeValue', () => {
    it('should parse range value with separator', () => {
      const result = parseRangeValue('2026-03-01 / 2026-03-15', 'YYYY-MM-DD');
      expect(result.start).not.toBeNull();
      expect(result.end).not.toBeNull();
      expect(result.start.getDate()).toBe(1);
      expect(result.end.getDate()).toBe(15);
    });

    it('should return nulls for empty value', () => {
      const result = parseRangeValue('', 'YYYY-MM-DD');
      expect(result.start).toBeNull();
      expect(result.end).toBeNull();
    });

    it('should return nulls for value without separator', () => {
      const result = parseRangeValue('2026-03-01', 'YYYY-MM-DD');
      expect(result.start).toBeNull();
      expect(result.end).toBeNull();
    });

    // GitHub #60: formats that use "/" themselves.
    it('should parse a range when the format contains "/"', () => {
      const result = parseRangeValue('14/11/2026 / 20/11/2026', 'DD/MM/YYYY');
      expect([result.start?.getDate(), result.start?.getMonth(), result.end?.getDate(), result.end?.getMonth()]).toEqual([14, 10, 20, 10]);
    });

    it('should round-trip formatRangeValue for formats with "/"', () => {
      for (const format of ['DD/MM/YYYY', 'MM/DD/YYYY', 'D/M/YY', 'YYYY/MM/DD']) {
        const value = formatRangeValue(new Date(2026, 10, 4), new Date(2026, 11, 25), format);
        const { start, end } = parseRangeValue(value, format);
        expect([format, start?.toDateString(), end?.toDateString()]).toEqual([format, new Date(2026, 10, 4).toDateString(), new Date(2026, 11, 25).toDateString()]);
      }
    });

    it('should still read a range written without spaces', () => {
      const result = parseRangeValue('2026-03-01/2026-03-15', 'YYYY-MM-DD');
      expect([result.start?.getDate(), result.end?.getDate()]).toEqual([1, 15]);
    });

    it('should keep the start when only the start is given', () => {
      const result = parseRangeValue('14/11/2026 / ', 'DD/MM/YYYY');
      expect(result.start?.getDate()).toBe(14);
      expect(result.end).toBeNull();
    });
  });

  describe('formatRangeValue', () => {
    it('should format range as "start / end"', () => {
      const start = new Date(2026, 2, 1);
      const end = new Date(2026, 2, 15);
      const result = formatRangeValue(start, end, 'YYYY-MM-DD');
      expect(result).toBe('2026-03-01 / 2026-03-15');
    });

    it('should respect custom format', () => {
      const start = new Date(2026, 2, 1);
      const end = new Date(2026, 2, 15);
      const result = formatRangeValue(start, end, 'DD/MM/YYYY');
      expect(result).toBe('01/03/2026 / 15/03/2026');
    });
  });
});
