import { getPresetDefinitions, calculatePreset, getAllPresetIds } from './presets';
import { isSameDay, stripTime } from './calendar';

describe('presets utils', () => {
  const today = () => stripTime(new Date());

  describe('getAllPresetIds', () => {
    it('should return all preset IDs', () => {
      const ids = getAllPresetIds();
      expect(ids.length).toBe(27);
      expect(ids).toContain('today');
      expect(ids).toContain('yesterday');
      expect(ids).toContain('tomorrow');
      expect(ids).toContain('allTime');
      expect(ids).toContain('yearToDate');
    });
  });

  describe('getPresetDefinitions', () => {
    it('should return filtered presets in order', () => {
      const defs = getPresetDefinitions(['today', 'last7Days', 'thisMonth']);
      expect(defs.length).toBe(3);
      expect(defs[0].id).toBe('today');
      expect(defs[1].id).toBe('last7Days');
      expect(defs[2].id).toBe('thisMonth');
    });

    it('should skip unknown preset IDs', () => {
      const defs = getPresetDefinitions(['today', 'unknownPreset' as any]);
      expect(defs.length).toBe(1);
      expect(defs[0].id).toBe('today');
    });

    it('should return empty for empty input', () => {
      expect(getPresetDefinitions([])).toEqual([]);
    });
  });

  describe('calculatePreset', () => {
    it('should return null for unknown preset', () => {
      expect(calculatePreset('unknownPreset' as any)).toBeNull();
    });

    describe('today', () => {
      it('should return today as both start and end', () => {
        const range = calculatePreset('today');
        expect(isSameDay(range.start, today())).toBe(true);
        expect(isSameDay(range.end, today())).toBe(true);
      });
    });

    describe('yesterday', () => {
      it('should return yesterday', () => {
        const range = calculatePreset('yesterday');
        const expected = new Date(today());
        expected.setDate(expected.getDate() - 1);
        expect(isSameDay(range.start, expected)).toBe(true);
        expect(isSameDay(range.end, expected)).toBe(true);
      });
    });

    describe('tomorrow', () => {
      it('should return tomorrow', () => {
        const range = calculatePreset('tomorrow');
        const expected = new Date(today());
        expected.setDate(expected.getDate() + 1);
        expect(isSameDay(range.start, expected)).toBe(true);
        expect(isSameDay(range.end, expected)).toBe(true);
      });
    });

    describe('last7Days', () => {
      it('should return 7-day range ending today', () => {
        const range = calculatePreset('last7Days');
        expect(isSameDay(range.end, today())).toBe(true);
        const expected = new Date(today());
        expected.setDate(expected.getDate() - 6);
        expect(isSameDay(range.start, expected)).toBe(true);
      });
    });

    describe('next7Days', () => {
      it('should return 7-day range starting today', () => {
        const range = calculatePreset('next7Days');
        expect(isSameDay(range.start, today())).toBe(true);
        const expected = new Date(today());
        expected.setDate(expected.getDate() + 6);
        expect(isSameDay(range.end, expected)).toBe(true);
      });
    });

    describe('last14Days', () => {
      it('should return 14-day range ending today', () => {
        const range = calculatePreset('last14Days');
        expect(isSameDay(range.end, today())).toBe(true);
        const expected = new Date(today());
        expected.setDate(expected.getDate() - 13);
        expect(isSameDay(range.start, expected)).toBe(true);
      });
    });

    describe('last30Days', () => {
      it('should return 30-day range ending today', () => {
        const range = calculatePreset('last30Days');
        expect(isSameDay(range.end, today())).toBe(true);
        const expected = new Date(today());
        expected.setDate(expected.getDate() - 29);
        expect(isSameDay(range.start, expected)).toBe(true);
      });
    });

    describe('thisMonth', () => {
      it('should return first and last of current month', () => {
        const range = calculatePreset('thisMonth');
        const t = today();
        expect(range.start.getDate()).toBe(1);
        expect(range.start.getMonth()).toBe(t.getMonth());
        expect(range.end.getMonth()).toBe(t.getMonth());
        // Last day of month
        const lastDay = new Date(t.getFullYear(), t.getMonth() + 1, 0).getDate();
        expect(range.end.getDate()).toBe(lastDay);
      });
    });

    describe('lastMonth', () => {
      it('should return first and last of previous month', () => {
        const range = calculatePreset('lastMonth');
        const t = today();
        const expectedMonth = t.getMonth() === 0 ? 11 : t.getMonth() - 1;
        expect(range.start.getDate()).toBe(1);
        expect(range.start.getMonth()).toBe(expectedMonth);
        expect(range.end.getMonth()).toBe(expectedMonth);
      });
    });

    describe('thisYear', () => {
      it('should return Jan 1 to Dec 31 of current year', () => {
        const range = calculatePreset('thisYear');
        const t = today();
        expect(range.start.getMonth()).toBe(0);
        expect(range.start.getDate()).toBe(1);
        expect(range.end.getMonth()).toBe(11);
        expect(range.end.getDate()).toBe(31);
        expect(range.start.getFullYear()).toBe(t.getFullYear());
      });
    });

    describe('lastYear', () => {
      it('should return Jan 1 to Dec 31 of last year', () => {
        const range = calculatePreset('lastYear');
        const t = today();
        expect(range.start.getFullYear()).toBe(t.getFullYear() - 1);
        expect(range.start.getMonth()).toBe(0);
        expect(range.start.getDate()).toBe(1);
        expect(range.end.getFullYear()).toBe(t.getFullYear() - 1);
        expect(range.end.getMonth()).toBe(11);
        expect(range.end.getDate()).toBe(31);
      });
    });

    describe('yearToDate', () => {
      it('should return Jan 1 to today', () => {
        const range = calculatePreset('yearToDate');
        const t = today();
        expect(range.start.getMonth()).toBe(0);
        expect(range.start.getDate()).toBe(1);
        expect(isSameDay(range.end, t)).toBe(true);
      });
    });

    describe('allTime', () => {
      it('should return wide range', () => {
        const range = calculatePreset('allTime');
        expect(range.start.getFullYear()).toBe(1970);
        expect(range.end.getFullYear()).toBe(2099);
      });
    });

    describe('thisWeek', () => {
      it('should respect startDay parameter', () => {
        const rangeSun = calculatePreset('thisWeek', 0);
        expect(rangeSun.start.getDay()).toBe(0); // Sunday

        const rangeMon = calculatePreset('thisWeek', 1);
        expect(rangeMon.start.getDay()).toBe(1); // Monday
      });

      it('should cover 7 days', () => {
        const range = calculatePreset('thisWeek', 0);
        const days = Math.round((range.end.getTime() - range.start.getTime()) / 86400000) + 1;
        expect(days).toBe(7);
      });
    });

    describe('lastWeek', () => {
      it('should be 7 days before thisWeek', () => {
        const thisWeekRange = calculatePreset('thisWeek', 0);
        const lastWeekRange = calculatePreset('lastWeek', 0);
        const diffMs = thisWeekRange.start.getTime() - lastWeekRange.start.getTime();
        expect(Math.round(diffMs / 86400000)).toBe(7);
      });
    });

    describe('nextWeek', () => {
      it('should be 7 days after thisWeek', () => {
        const thisWeekRange = calculatePreset('thisWeek', 0);
        const nextWeekRange = calculatePreset('nextWeek', 0);
        const diffMs = nextWeekRange.start.getTime() - thisWeekRange.start.getTime();
        expect(Math.round(diffMs / 86400000)).toBe(7);
      });
    });

    describe('thisQuarter', () => {
      it('should return quarter boundaries', () => {
        const range = calculatePreset('thisQuarter');
        const startMonth = range.start.getMonth();
        // Quarter starts at month 0, 3, 6, or 9
        expect(startMonth % 3).toBe(0);
        expect(range.start.getDate()).toBe(1);
      });
    });

    describe('future presets', () => {
      it('next14Days should cover 14 days from today', () => {
        const range = calculatePreset('next14Days');
        expect(isSameDay(range.start, today())).toBe(true);
        const expected = new Date(today());
        expected.setDate(expected.getDate() + 13);
        expect(isSameDay(range.end, expected)).toBe(true);
      });

      it('next30Days should cover 30 days from today', () => {
        const range = calculatePreset('next30Days');
        expect(isSameDay(range.start, today())).toBe(true);
        const expected = new Date(today());
        expected.setDate(expected.getDate() + 29);
        expect(isSameDay(range.end, expected)).toBe(true);
      });

      it('nextMonth should return first and last of next month', () => {
        const range = calculatePreset('nextMonth');
        const t = today();
        const expectedMonth = t.getMonth() === 11 ? 0 : t.getMonth() + 1;
        expect(range.start.getDate()).toBe(1);
        expect(range.start.getMonth()).toBe(expectedMonth);
      });

      it('nextYear should return Jan 1 to Dec 31 of next year', () => {
        const range = calculatePreset('nextYear');
        const t = today();
        expect(range.start.getFullYear()).toBe(t.getFullYear() + 1);
        expect(range.end.getFullYear()).toBe(t.getFullYear() + 1);
      });
    });
  });
});
