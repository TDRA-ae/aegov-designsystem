import { newSpecPage } from '@stencil/core/testing';
import { AegovDatepicker } from './aegov-datepicker';

describe('aegov-datepicker', () => {
  describe('rendering', () => {
    it('should render with default props', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker></aegov-datepicker>`,
      });
      expect(page.root).toBeTruthy();
      const trigger = page.root.querySelector('.datepicker__trigger');
      expect(trigger).toBeTruthy();
    });

    it('should render single mode input by default', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker></aegov-datepicker>`,
      });
      const input = page.root.querySelector('.datepicker__input');
      expect(input).toBeTruthy();
      expect(input.getAttribute('placeholder')).toBe('Select date');
    });

    it('should render range mode inputs', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker mode="range"></aegov-datepicker>`,
      });
      const startInput = page.root.querySelector('.datepicker__input--range-start');
      const endInput = page.root.querySelector('.datepicker__input--range-end');
      expect(startInput).toBeTruthy();
      expect(endInput).toBeTruthy();
    });

    it('should show custom placeholder', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker placeholder="Pick a date"></aegov-datepicker>`,
      });
      const input = page.root.querySelector('.datepicker__input');
      expect(input.getAttribute('placeholder')).toBe('Pick a date');
    });

    it('should show range placeholders', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker mode="range" range-placeholder-start="From" range-placeholder-end="To"></aegov-datepicker>`,
      });
      const start = page.root.querySelector('.datepicker__input--range-start');
      const end = page.root.querySelector('.datepicker__input--range-end');
      expect(start.getAttribute('placeholder')).toBe('From');
      expect(end.getAttribute('placeholder')).toBe('To');
    });

    it('should render calendar icon', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker></aegov-datepicker>`,
      });
      const icon = page.root.querySelector('.datepicker__icon');
      expect(icon).toBeTruthy();
    });

    it('should render disabled state', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker disabled></aegov-datepicker>`,
      });
      const input = page.root.querySelector('.datepicker__input');
      expect(input.getAttribute('disabled')).not.toBeNull();
    });

    it('should render range separator', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker mode="range"></aegov-datepicker>`,
      });
      const separator = page.root.querySelector('.datepicker__range-separator');
      expect(separator).toBeTruthy();
    });

    it('should render custom trigger via slot', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker><button slot="trigger">Open Calendar</button></aegov-datepicker>`,
      });
      const slotContent = page.root.querySelector('[slot="trigger"]');
      expect(slotContent).toBeTruthy();
      expect(slotContent.textContent).toBe('Open Calendar');
    });
  });

  describe('props', () => {
    it('should default mode to single', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker></aegov-datepicker>`,
      });
      expect(page.rootInstance.mode).toBe('single');
    });

    it('should default format to YYYY-MM-DD', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker></aegov-datepicker>`,
      });
      expect(page.rootInstance.format).toBe('YYYY-MM-DD');
    });

    it('should default startDay to 0', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker></aegov-datepicker>`,
      });
      expect(page.rootInstance.startDay).toBe(0);
    });

    it('should default locale to en', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker></aegov-datepicker>`,
      });
      expect(page.rootInstance.locale).toBe('en');
    });

    it('should default clearable to true', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker></aegov-datepicker>`,
      });
      expect(page.rootInstance.clearable).toBe(true);
    });

    it('should default withConfirmation to false', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker></aegov-datepicker>`,
      });
      expect(page.rootInstance.withConfirmation).toBe(false);
    });

    it('should default selectableHeader to true', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker></aegov-datepicker>`,
      });
      expect(page.rootInstance.selectableHeader).toBe(true);
    });

    it('should default disabled to false', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker></aegov-datepicker>`,
      });
      expect(page.rootInstance.disabled).toBe(false);
    });

    it('should default minRange to 0', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker></aegov-datepicker>`,
      });
      expect(page.rootInstance.minRange).toBe(0);
    });

    it('should default maxRange to 0', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker></aegov-datepicker>`,
      });
      expect(page.rootInstance.maxRange).toBe(0);
    });
  });

  describe('value parsing', () => {
    it('should parse single date value', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker value="2026-03-15"></aegov-datepicker>`,
      });
      expect(page.rootInstance.selectedDate).toBeTruthy();
      expect(page.rootInstance.selectedDate.getFullYear()).toBe(2026);
      expect(page.rootInstance.selectedDate.getMonth()).toBe(2);
      expect(page.rootInstance.selectedDate.getDate()).toBe(15);
    });

    it('should show parsed value in input', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker value="2026-03-15"></aegov-datepicker>`,
      });
      const input = page.root.querySelector('.datepicker__input') as HTMLInputElement;
      expect(input.value).toBe('2026-03-15');
    });

    it('should parse range value', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker mode="range" value="2026-03-01 / 2026-03-15"></aegov-datepicker>`,
      });
      expect(page.rootInstance.rangeStart).toBeTruthy();
      expect(page.rootInstance.rangeEnd).toBeTruthy();
      expect(page.rootInstance.rangeStart.getDate()).toBe(1);
      expect(page.rootInstance.rangeEnd.getDate()).toBe(15);
    });

    it('should show clear button when value is set', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker value="2026-03-15"></aegov-datepicker>`,
      });
      const clearBtn = page.root.querySelector('.datepicker__clear-btn');
      expect(clearBtn).toBeTruthy();
    });

    it('should not show clear button when no value', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker></aegov-datepicker>`,
      });
      const clearBtn = page.root.querySelector('.datepicker__clear-btn');
      expect(clearBtn).toBeNull();
    });

    it('should not show clear button when clearable is false', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker value="2026-03-15" clearable="false"></aegov-datepicker>`,
      });
      const clearBtn = page.root.querySelector('.datepicker__clear-btn');
      expect(clearBtn).toBeNull();
    });

    it('should handle empty value', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker value=""></aegov-datepicker>`,
      });
      expect(page.rootInstance.selectedDate).toBeNull();
    });
  });

  describe('preset parsing', () => {
    it('should parse presets string', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker mode="range" presets="today,last7Days,thisMonth"></aegov-datepicker>`,
      });
      expect(page.rootInstance.parsedPresets).toEqual(['today', 'last7Days', 'thisMonth']);
    });

    it('should handle empty presets', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker mode="range"></aegov-datepicker>`,
      });
      expect(page.rootInstance.parsedPresets).toEqual([]);
    });
  });

  describe('unavailable dates parsing', () => {
    it('should parse unavailable dates string', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker unavailable-dates="2026-03-10,2026-03-15,2026-03-20"></aegov-datepicker>`,
      });
      expect(page.rootInstance.parsedUnavailableDates.size).toBe(3);
      expect(page.rootInstance.parsedUnavailableDates.has('2026-03-10')).toBe(true);
    });

    it('should handle empty unavailable dates', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker></aegov-datepicker>`,
      });
      expect(page.rootInstance.parsedUnavailableDates.size).toBe(0);
    });
  });

  describe('date constraints', () => {
    it('should identify dates before min as disabled', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker min="2026-03-10"></aegov-datepicker>`,
      });
      const instance = page.rootInstance;
      expect(instance.isDateDisabled(new Date(2026, 2, 5))).toBe(true);
      expect(instance.isDateDisabled(new Date(2026, 2, 10))).toBe(false);
      expect(instance.isDateDisabled(new Date(2026, 2, 15))).toBe(false);
    });

    it('should identify dates after max as disabled', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker max="2026-03-20"></aegov-datepicker>`,
      });
      const instance = page.rootInstance;
      expect(instance.isDateDisabled(new Date(2026, 2, 15))).toBe(false);
      expect(instance.isDateDisabled(new Date(2026, 2, 20))).toBe(false);
      expect(instance.isDateDisabled(new Date(2026, 2, 25))).toBe(true);
    });

    it('should disable unavailable dates', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker unavailable-dates="2026-03-15"></aegov-datepicker>`,
      });
      const instance = page.rootInstance;
      expect(instance.isDateDisabled(new Date(2026, 2, 15))).toBe(true);
      expect(instance.isDateDisabled(new Date(2026, 2, 14))).toBe(false);
    });

    it('should validate range limits', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker mode="range" min-range="5" max-range="10"></aegov-datepicker>`,
      });
      const instance = page.rootInstance;

      // 3 days (too short)
      expect(instance.isRangeSelectionInvalid(new Date(2026, 2, 1), new Date(2026, 2, 3))).toBe(true);

      // 5 days (minimum - valid)
      expect(instance.isRangeSelectionInvalid(new Date(2026, 2, 1), new Date(2026, 2, 5))).toBe(false);

      // 10 days (maximum - valid)
      expect(instance.isRangeSelectionInvalid(new Date(2026, 2, 1), new Date(2026, 2, 10))).toBe(false);

      // 15 days (too long)
      expect(instance.isRangeSelectionInvalid(new Date(2026, 2, 1), new Date(2026, 2, 15))).toBe(true);
    });
  });

  describe('clear functionality', () => {
    it('should clear single value', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker value="2026-03-15"></aegov-datepicker>`,
      });
      const instance = page.rootInstance;
      expect(instance.selectedDate).toBeTruthy();

      await instance.clear();
      expect(instance.selectedDate).toBeNull();
      expect(instance.value).toBe('');
    });

    it('should clear range values', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker mode="range" value="2026-03-01 / 2026-03-15"></aegov-datepicker>`,
      });
      const instance = page.rootInstance;
      expect(instance.rangeStart).toBeTruthy();
      expect(instance.rangeEnd).toBeTruthy();

      await instance.clear();
      expect(instance.rangeStart).toBeNull();
      expect(instance.rangeEnd).toBeNull();
      expect(instance.value).toBe('');
    });
  });

  describe('getValue method', () => {
    it('should return formatted value for single mode', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker value="2026-03-15"></aegov-datepicker>`,
      });
      const val = await page.rootInstance.getValue();
      expect(val).toBe('2026-03-15');
    });

    it('should return empty string when no value', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker></aegov-datepicker>`,
      });
      const val = await page.rootInstance.getValue();
      expect(val).toBe('');
    });

    it('should return formatted range value', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker mode="range" value="2026-03-01 / 2026-03-15"></aegov-datepicker>`,
      });
      const val = await page.rootInstance.getValue();
      expect(val).toBe('2026-03-01 / 2026-03-15');
    });
  });

  describe('accessibility', () => {
    it('should have aria-haspopup on input', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker></aegov-datepicker>`,
      });
      const input = page.root.querySelector('.datepicker__input');
      expect(input.getAttribute('aria-haspopup')).toBe('dialog');
    });

    it('should have aria-expanded false when closed', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker></aegov-datepicker>`,
      });
      const input = page.root.querySelector('.datepicker__input');
      expect(input.getAttribute('aria-expanded')).toBe('false');
    });

    it('should have aria-label on input', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker placeholder="Pick date"></aegov-datepicker>`,
      });
      const input = page.root.querySelector('.datepicker__input');
      expect(input.getAttribute('aria-label')).toBe('Pick date');
    });

    it('should have aria-label on clear button', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker value="2026-03-15"></aegov-datepicker>`,
      });
      const clearBtn = page.root.querySelector('.datepicker__clear-btn');
      expect(clearBtn.getAttribute('aria-label')).toBe('Clear date');
    });

    it('should have aria-label on range inputs', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker mode="range"></aegov-datepicker>`,
      });
      const start = page.root.querySelector('.datepicker__input--range-start');
      const end = page.root.querySelector('.datepicker__input--range-end');
      expect(start.getAttribute('aria-label')).toBe('Start date');
      expect(end.getAttribute('aria-label')).toBe('End date');
    });

    it('should have aria-hidden on calendar icon', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker></aegov-datepicker>`,
      });
      const icon = page.root.querySelector('.datepicker__icon');
      expect(icon.getAttribute('aria-hidden')).toBe('true');
    });

    it('should have aria-hidden on range separator', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker mode="range"></aegov-datepicker>`,
      });
      const sep = page.root.querySelector('.datepicker__range-separator');
      expect(sep.getAttribute('aria-hidden')).toBe('true');
    });
  });

  describe('format output', () => {
    it('should use custom format for display', async () => {
      const page = await newSpecPage({
        components: [AegovDatepicker],
        html: `<aegov-datepicker format="DD/MM/YYYY" value="2026-03-15"></aegov-datepicker>`,
      });
      // Value is parsed from default ISO, but displayed in custom format
      // Since value prop is "2026-03-15" and format is DD/MM/YYYY,
      // parseDate should handle ISO detection
      const input = page.root.querySelector('.datepicker__input') as HTMLInputElement;
      expect(input.value).toBe('15/03/2026');
    });
  });
});
