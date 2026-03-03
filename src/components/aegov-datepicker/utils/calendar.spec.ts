import { generateCalendarGrid, getWeekdayNames, getMonthNames, getYearRange, isSameDay, isDateBetween, stripTime, diffDays, isBefore, isAfter } from './calendar';

describe('calendar utils', () => {
  describe('stripTime', () => {
    it('should strip time from date', () => {
      const d = new Date(2026, 2, 15, 14, 30, 45);
      const stripped = stripTime(d);
      expect(stripped.getHours()).toBe(0);
      expect(stripped.getMinutes()).toBe(0);
      expect(stripped.getSeconds()).toBe(0);
      expect(stripped.getDate()).toBe(15);
    });
  });

  describe('isSameDay', () => {
    it('should return true for same day', () => {
      const a = new Date(2026, 2, 15, 10, 0, 0);
      const b = new Date(2026, 2, 15, 22, 30, 0);
      expect(isSameDay(a, b)).toBe(true);
    });

    it('should return false for different days', () => {
      const a = new Date(2026, 2, 15);
      const b = new Date(2026, 2, 16);
      expect(isSameDay(a, b)).toBe(false);
    });

    it('should return false for different months', () => {
      const a = new Date(2026, 2, 15);
      const b = new Date(2026, 3, 15);
      expect(isSameDay(a, b)).toBe(false);
    });
  });

  describe('isDateBetween', () => {
    it('should return true for date between start and end', () => {
      const date = new Date(2026, 2, 15);
      const start = new Date(2026, 2, 10);
      const end = new Date(2026, 2, 20);
      expect(isDateBetween(date, start, end)).toBe(true);
    });

    it('should return false for date on start', () => {
      const date = new Date(2026, 2, 10);
      const start = new Date(2026, 2, 10);
      const end = new Date(2026, 2, 20);
      expect(isDateBetween(date, start, end)).toBe(false);
    });

    it('should return false for date on end', () => {
      const date = new Date(2026, 2, 20);
      const start = new Date(2026, 2, 10);
      const end = new Date(2026, 2, 20);
      expect(isDateBetween(date, start, end)).toBe(false);
    });

    it('should work when start is after end', () => {
      const date = new Date(2026, 2, 15);
      const start = new Date(2026, 2, 20);
      const end = new Date(2026, 2, 10);
      expect(isDateBetween(date, start, end)).toBe(true);
    });

    it('should return false for date outside range', () => {
      const date = new Date(2026, 2, 25);
      const start = new Date(2026, 2, 10);
      const end = new Date(2026, 2, 20);
      expect(isDateBetween(date, start, end)).toBe(false);
    });
  });

  describe('diffDays', () => {
    it('should return 0 for same day', () => {
      const a = new Date(2026, 2, 15);
      const b = new Date(2026, 2, 15);
      expect(diffDays(a, b)).toBe(0);
    });

    it('should return positive for different days', () => {
      const a = new Date(2026, 2, 10);
      const b = new Date(2026, 2, 15);
      expect(diffDays(a, b)).toBe(5);
    });

    it('should return positive regardless of order', () => {
      const a = new Date(2026, 2, 15);
      const b = new Date(2026, 2, 10);
      expect(diffDays(a, b)).toBe(5);
    });

    it('should handle cross-month differences', () => {
      const a = new Date(2026, 0, 31);
      const b = new Date(2026, 1, 2);
      expect(diffDays(a, b)).toBe(2);
    });
  });

  describe('isBefore', () => {
    it('should return true when a is before b', () => {
      expect(isBefore(new Date(2026, 2, 10), new Date(2026, 2, 15))).toBe(true);
    });

    it('should return false when a is after b', () => {
      expect(isBefore(new Date(2026, 2, 20), new Date(2026, 2, 15))).toBe(false);
    });

    it('should return false when same day', () => {
      expect(isBefore(new Date(2026, 2, 15), new Date(2026, 2, 15))).toBe(false);
    });
  });

  describe('isAfter', () => {
    it('should return true when a is after b', () => {
      expect(isAfter(new Date(2026, 2, 20), new Date(2026, 2, 15))).toBe(true);
    });

    it('should return false when a is before b', () => {
      expect(isAfter(new Date(2026, 2, 10), new Date(2026, 2, 15))).toBe(false);
    });

    it('should return false when same day', () => {
      expect(isAfter(new Date(2026, 2, 15), new Date(2026, 2, 15))).toBe(false);
    });
  });

  describe('generateCalendarGrid', () => {
    it('should generate 6 rows of 7 days', () => {
      const grid = generateCalendarGrid(2026, 2, 0); // March 2026, Sunday start
      expect(grid.length).toBe(6);
      grid.forEach(week => {
        expect(week.length).toBe(7);
      });
    });

    it('should start with the correct day of week (Sunday)', () => {
      const grid = generateCalendarGrid(2026, 2, 0); // March 2026
      // First cell should be a Sunday
      expect(grid[0][0].getDay()).toBe(0);
    });

    it('should start with Monday when startDay is 1', () => {
      const grid = generateCalendarGrid(2026, 2, 1);
      expect(grid[0][0].getDay()).toBe(1);
    });

    it('should contain the 1st of the month', () => {
      const grid = generateCalendarGrid(2026, 2, 0);
      const allDates = grid.flat();
      const hasFirst = allDates.some(d => d.getDate() === 1 && d.getMonth() === 2);
      expect(hasFirst).toBe(true);
    });

    it('should contain the last day of the month', () => {
      const grid = generateCalendarGrid(2026, 2, 0); // March has 31 days
      const allDates = grid.flat();
      const hasLast = allDates.some(d => d.getDate() === 31 && d.getMonth() === 2);
      expect(hasLast).toBe(true);
    });

    it('should include leading days from previous month', () => {
      // March 1, 2026 is a Sunday, so if startDay=0, first cell IS March 1
      // But if startDay=1 (Monday), we need Feb days
      const grid = generateCalendarGrid(2026, 2, 1);
      // First day should be from February
      expect(grid[0][0].getMonth()).toBe(1); // February
    });

    it('should include trailing days from next month', () => {
      const grid = generateCalendarGrid(2026, 2, 0); // March 2026
      const lastRow = grid[5];
      const lastDate = lastRow[lastRow.length - 1];
      // Last cells should be from April
      expect(lastDate.getMonth()).toBe(3); // April
    });

    it('should handle February correctly', () => {
      const grid = generateCalendarGrid(2026, 1, 0); // February 2026
      const allDates = grid.flat();
      const febDates = allDates.filter(d => d.getMonth() === 1);
      expect(febDates.length).toBe(28); // 2026 is not a leap year
    });

    it('should handle leap year February', () => {
      const grid = generateCalendarGrid(2024, 1, 0); // February 2024 (leap year)
      const allDates = grid.flat();
      const febDates = allDates.filter(d => d.getMonth() === 1);
      expect(febDates.length).toBe(29);
    });

    it('should handle Saturday start day', () => {
      const grid = generateCalendarGrid(2026, 2, 6);
      expect(grid[0][0].getDay()).toBe(6); // Saturday
    });
  });

  describe('getWeekdayNames', () => {
    it('should return 7 day names', () => {
      const names = getWeekdayNames('en', 0);
      expect(names.length).toBe(7);
    });

    it('should start with Sunday when startDay is 0', () => {
      const names = getWeekdayNames('en', 0, 'short');
      expect(names[0]).toBe('Sun');
    });

    it('should start with Monday when startDay is 1', () => {
      const names = getWeekdayNames('en', 1, 'short');
      expect(names[0]).toBe('Mon');
    });

    it('should return narrow format', () => {
      const names = getWeekdayNames('en', 0, 'narrow');
      expect(names[0]).toBe('S');
    });
  });

  describe('getMonthNames', () => {
    it('should return 12 month names', () => {
      const names = getMonthNames('en');
      expect(names.length).toBe(12);
    });

    it('should return full month names by default', () => {
      const names = getMonthNames('en', 'long');
      expect(names[0]).toBe('January');
      expect(names[11]).toBe('December');
    });

    it('should return short month names', () => {
      const names = getMonthNames('en', 'short');
      expect(names[0]).toBe('Jan');
      expect(names[11]).toBe('Dec');
    });
  });

  describe('getYearRange', () => {
    it('should return years centered around the given year', () => {
      const years = getYearRange(2026, 5);
      expect(years[0]).toBe(2021);
      expect(years[years.length - 1]).toBe(2031);
      expect(years.length).toBe(11);
    });

    it('should default to range of 100', () => {
      const years = getYearRange(2026);
      expect(years[0]).toBe(1926);
      expect(years[years.length - 1]).toBe(2126);
      expect(years.length).toBe(201);
    });
  });
});
