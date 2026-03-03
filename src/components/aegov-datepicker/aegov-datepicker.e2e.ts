import { newE2EPage, E2EPage } from '@stencil/core/testing';

describe('aegov-datepicker e2e', () => {
  let page: E2EPage;

  describe('single mode', () => {
    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent(`<aegov-datepicker></aegov-datepicker>`);
    });

    it('should render the trigger input', async () => {
      const input = await page.find('aegov-datepicker .datepicker__input');
      expect(input).toBeTruthy();
    });

    it('should open calendar on trigger click', async () => {
      const trigger = await page.find('aegov-datepicker .datepicker__trigger');
      await trigger.click();
      await page.waitForChanges();

      const portal = await page.find('.aegov-datepicker-portal .aegov-datepicker');
      expect(portal).toBeTruthy();
    });

    it('should close calendar on outside click', async () => {
      const trigger = await page.find('aegov-datepicker .datepicker__trigger');
      await trigger.click();
      await page.waitForChanges();

      // Click outside
      await page.click('body');
      await page.waitForChanges();

      // Wait for portal to clear
      await page.waitForChanges();
      const portal = await page.find('.aegov-datepicker-portal .aegov-datepicker');
      expect(portal).toBeNull();
    });

    it('should close calendar on Escape key', async () => {
      const trigger = await page.find('aegov-datepicker .datepicker__trigger');
      await trigger.click();
      await page.waitForChanges();

      await page.keyboard.press('Escape');
      await page.waitForChanges();
      await page.waitForChanges();

      const portal = await page.find('.aegov-datepicker-portal .aegov-datepicker');
      expect(portal).toBeNull();
    });

    it('should emit aegovDatepickerOpen when opened', async () => {
      const openEvent = await page.spyOnEvent('aegovDatepickerOpen');
      const trigger = await page.find('aegov-datepicker .datepicker__trigger');
      await trigger.click();
      await page.waitForChanges();

      expect(openEvent).toHaveReceivedEvent();
    });

    it('should emit aegovDatepickerClose when closed', async () => {
      const closeEvent = await page.spyOnEvent('aegovDatepickerClose');
      const trigger = await page.find('aegov-datepicker .datepicker__trigger');
      await trigger.click();
      await page.waitForChanges();

      await page.keyboard.press('Escape');
      await page.waitForChanges();

      expect(closeEvent).toHaveReceivedEvent();
    });

    it('should show calendar grid with day cells', async () => {
      const trigger = await page.find('aegov-datepicker .datepicker__trigger');
      await trigger.click();
      await page.waitForChanges();

      const days = await page.findAll('.aegov-datepicker-portal .datepicker__day');
      expect(days.length).toBe(42); // 6 rows x 7 columns
    });

    it('should show weekday headers', async () => {
      const trigger = await page.find('aegov-datepicker .datepicker__trigger');
      await trigger.click();
      await page.waitForChanges();

      const weekdays = await page.findAll('.aegov-datepicker-portal .datepicker__weekday');
      expect(weekdays.length).toBe(7);
    });

    it('should show month/year selects', async () => {
      const trigger = await page.find('aegov-datepicker .datepicker__trigger');
      await trigger.click();
      await page.waitForChanges();

      const selects = await page.findAll('.aegov-datepicker-portal .datepicker__select');
      expect(selects.length).toBe(2); // month and year
    });

    it('should select a date and emit change event', async () => {
      const changeEvent = await page.spyOnEvent('aegovDatepickerChange');
      const trigger = await page.find('aegov-datepicker .datepicker__trigger');
      await trigger.click();
      await page.waitForChanges();

      // Click a day that is not outside the current month
      const days = await page.findAll('.aegov-datepicker-portal .datepicker__day:not(.datepicker__day--outside):not(.datepicker__day--disabled)');
      if (days.length > 0) {
        await days[0].click();
        await page.waitForChanges();

        expect(changeEvent).toHaveReceivedEvent();
        const detail = changeEvent.lastEvent.detail;
        expect(detail.value).toBeTruthy();
        expect(detail.date).toBeTruthy();
      }
    });

    it('should close calendar after selecting a date', async () => {
      const trigger = await page.find('aegov-datepicker .datepicker__trigger');
      await trigger.click();
      await page.waitForChanges();

      const days = await page.findAll('.aegov-datepicker-portal .datepicker__day:not(.datepicker__day--outside):not(.datepicker__day--disabled)');
      if (days.length > 0) {
        await days[0].click();
        await page.waitForChanges();
        await page.waitForChanges();

        const portal = await page.find('.aegov-datepicker-portal .aegov-datepicker');
        expect(portal).toBeNull();
      }
    });

    it('should show today highlighted', async () => {
      const trigger = await page.find('aegov-datepicker .datepicker__trigger');
      await trigger.click();
      await page.waitForChanges();

      const todayCell = await page.find('.aegov-datepicker-portal .datepicker__day--today');
      expect(todayCell).toBeTruthy();
    });

    it('should have role="dialog" on calendar', async () => {
      const trigger = await page.find('aegov-datepicker .datepicker__trigger');
      await trigger.click();
      await page.waitForChanges();

      const dialog = await page.find('.aegov-datepicker-portal .aegov-datepicker');
      expect(dialog.getAttribute('role')).toBe('dialog');
    });

    it('should have aria-modal on calendar', async () => {
      const trigger = await page.find('aegov-datepicker .datepicker__trigger');
      await trigger.click();
      await page.waitForChanges();

      const dialog = await page.find('.aegov-datepicker-portal .aegov-datepicker');
      expect(dialog.getAttribute('aria-modal')).toBe('true');
    });
  });

  describe('single mode with pre-selected value', () => {
    it('should show value in input', async () => {
      page = await newE2EPage();
      await page.setContent(`<aegov-datepicker value="2026-03-15"></aegov-datepicker>`);

      const input = await page.find('aegov-datepicker .datepicker__input');
      const value = await input.getProperty('value');
      expect(value).toBe('2026-03-15');
    });

    it('should show clear button', async () => {
      page = await newE2EPage();
      await page.setContent(`<aegov-datepicker value="2026-03-15"></aegov-datepicker>`);

      const clearBtn = await page.find('aegov-datepicker .datepicker__clear-btn');
      expect(clearBtn).toBeTruthy();
    });

    it('should clear value on clear button click', async () => {
      page = await newE2EPage();
      await page.setContent(`<aegov-datepicker value="2026-03-15"></aegov-datepicker>`);

      const clearEvent = await page.spyOnEvent('aegovDatepickerClear');
      const clearBtn = await page.find('aegov-datepicker .datepicker__clear-btn');
      await clearBtn.click();
      await page.waitForChanges();

      expect(clearEvent).toHaveReceivedEvent();
      const input = await page.find('aegov-datepicker .datepicker__input');
      const value = await input.getProperty('value');
      expect(value).toBe('');
    });
  });

  describe('navigation', () => {
    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent(`<aegov-datepicker></aegov-datepicker>`);
      const trigger = await page.find('aegov-datepicker .datepicker__trigger');
      await trigger.click();
      await page.waitForChanges();
    });

    it('should navigate to previous month', async () => {
      const prevBtn = await page.find('.aegov-datepicker-portal .datepicker__nav-btn');
      const monthChangeEvent = await page.spyOnEvent('aegovDatepickerMonthChange');

      await prevBtn.click();
      await page.waitForChanges();

      expect(monthChangeEvent).toHaveReceivedEvent();
    });

    it('should navigate to next month', async () => {
      const navBtns = await page.findAll('.aegov-datepicker-portal .datepicker__nav-btn');
      const monthChangeEvent = await page.spyOnEvent('aegovDatepickerMonthChange');

      // Last nav button is "next"
      const nextBtn = navBtns[navBtns.length - 1];
      await nextBtn.click();
      await page.waitForChanges();

      expect(monthChangeEvent).toHaveReceivedEvent();
    });
  });

  describe('disabled state', () => {
    it('should not open when disabled', async () => {
      page = await newE2EPage();
      await page.setContent(`<aegov-datepicker disabled></aegov-datepicker>`);

      const trigger = await page.find('aegov-datepicker .datepicker__trigger');
      await trigger.click();
      await page.waitForChanges();

      const portal = await page.find('.aegov-datepicker-portal .aegov-datepicker');
      expect(portal).toBeNull();
    });
  });

  describe('date constraints', () => {
    it('should disable dates before min', async () => {
      page = await newE2EPage();
      await page.setContent(`<aegov-datepicker min="2026-03-15" value="2026-03-20"></aegov-datepicker>`);

      const trigger = await page.find('aegov-datepicker .datepicker__trigger');
      await trigger.click();
      await page.waitForChanges();

      const disabledDays = await page.findAll('.aegov-datepicker-portal .datepicker__day--disabled');
      expect(disabledDays.length).toBeGreaterThan(0);
    });

    it('should mark unavailable dates as disabled', async () => {
      page = await newE2EPage();
      await page.setContent(`<aegov-datepicker unavailable-dates="2026-03-15" value="2026-03-10"></aegov-datepicker>`);

      const trigger = await page.find('aegov-datepicker .datepicker__trigger');
      await trigger.click();
      await page.waitForChanges();

      const disabledDays = await page.findAll('.aegov-datepicker-portal .datepicker__day--disabled');
      expect(disabledDays.length).toBeGreaterThan(0);
    });
  });

  describe('range mode', () => {
    beforeEach(async () => {
      page = await newE2EPage();
      await page.setContent(`<aegov-datepicker mode="range"></aegov-datepicker>`);
    });

    it('should render two inputs', async () => {
      const startInput = await page.find('aegov-datepicker .datepicker__input--range-start');
      const endInput = await page.find('aegov-datepicker .datepicker__input--range-end');
      expect(startInput).toBeTruthy();
      expect(endInput).toBeTruthy();
    });

    it('should show two calendars', async () => {
      const trigger = await page.find('aegov-datepicker .datepicker__trigger');
      await trigger.click();
      await page.waitForChanges();

      const calendars = await page.findAll('.aegov-datepicker-portal .datepicker__calendar');
      expect(calendars.length).toBe(2);
    });

    it('should show range separator', async () => {
      const sep = await page.find('aegov-datepicker .datepicker__range-separator');
      expect(sep).toBeTruthy();
    });
  });

  describe('range mode with presets', () => {
    it('should show presets sidebar', async () => {
      page = await newE2EPage();
      await page.setContent(`<aegov-datepicker mode="range" presets="today,last7Days,thisMonth"></aegov-datepicker>`);

      const trigger = await page.find('aegov-datepicker .datepicker__trigger');
      await trigger.click();
      await page.waitForChanges();

      const presetsPanel = await page.find('.aegov-datepicker-portal .datepicker__presets');
      expect(presetsPanel).toBeTruthy();

      const presetBtns = await page.findAll('.aegov-datepicker-portal .datepicker__preset-btn');
      expect(presetBtns.length).toBe(3);
    });

    it('should select preset and emit change', async () => {
      page = await newE2EPage();
      await page.setContent(`<aegov-datepicker mode="range" presets="today,last7Days,thisMonth"></aegov-datepicker>`);

      const changeEvent = await page.spyOnEvent('aegovDatepickerChange');
      const trigger = await page.find('aegov-datepicker .datepicker__trigger');
      await trigger.click();
      await page.waitForChanges();

      const presetBtns = await page.findAll('.aegov-datepicker-portal .datepicker__preset-btn');
      await presetBtns[0].click(); // Click "Today"
      await page.waitForChanges();

      expect(changeEvent).toHaveReceivedEvent();
    });
  });

  describe('range mode with pre-selected value', () => {
    it('should show values in inputs', async () => {
      page = await newE2EPage();
      await page.setContent(`<aegov-datepicker mode="range" value="2026-03-01 / 2026-03-15"></aegov-datepicker>`);

      const start = await page.find('aegov-datepicker .datepicker__input--range-start');
      const end = await page.find('aegov-datepicker .datepicker__input--range-end');
      const startVal = await start.getProperty('value');
      const endVal = await end.getProperty('value');
      expect(startVal).toBe('2026-03-01');
      expect(endVal).toBe('2026-03-15');
    });
  });

  describe('with-confirmation mode', () => {
    it('should show Apply/Cancel buttons', async () => {
      page = await newE2EPage();
      await page.setContent(`<aegov-datepicker with-confirmation></aegov-datepicker>`);

      const trigger = await page.find('aegov-datepicker .datepicker__trigger');
      await trigger.click();
      await page.waitForChanges();

      const footer = await page.find('.aegov-datepicker-portal .datepicker__footer');
      expect(footer).toBeTruthy();

      const applyBtn = await page.find('.aegov-datepicker-portal .datepicker__footer-btn--apply');
      const cancelBtn = await page.find('.aegov-datepicker-portal .datepicker__footer-btn--cancel');
      expect(applyBtn).toBeTruthy();
      expect(cancelBtn).toBeTruthy();
    });

    it('should not close on day click in confirmation mode', async () => {
      page = await newE2EPage();
      await page.setContent(`<aegov-datepicker with-confirmation></aegov-datepicker>`);

      const trigger = await page.find('aegov-datepicker .datepicker__trigger');
      await trigger.click();
      await page.waitForChanges();

      // Click a day via evaluate (portal re-renders after click)
      await page.evaluate(() => {
        const days = document.querySelectorAll('.aegov-datepicker-portal .datepicker__day:not(.datepicker__day--outside):not(.datepicker__day--disabled)');
        if (days.length > 0) (days[0] as HTMLElement).click();
      });
      await page.waitForChanges();
      await page.waitForChanges();

      // Calendar should still be open - check via evaluate since portal was rebuilt
      const isOpen = await page.evaluate(() => {
        return document.querySelector('.aegov-datepicker-portal .aegov-datepicker') !== null;
      });
      expect(isOpen).toBe(true);
    });

    it('should close on Cancel click without emitting change', async () => {
      page = await newE2EPage();
      await page.setContent(`<aegov-datepicker with-confirmation></aegov-datepicker>`);

      const changeEvent = await page.spyOnEvent('aegovDatepickerChange');
      const trigger = await page.find('aegov-datepicker .datepicker__trigger');
      await trigger.click();
      await page.waitForChanges();

      await page.evaluate(() => {
        const btn = document.querySelector('.aegov-datepicker-portal .datepicker__footer-btn--cancel') as HTMLElement;
        if (btn) btn.click();
      });
      await page.waitForChanges();

      expect(changeEvent).not.toHaveReceivedEvent();
    });

    it('should emit change on Apply click after selecting a day', async () => {
      page = await newE2EPage();
      await page.setContent(`<aegov-datepicker with-confirmation></aegov-datepicker>`);

      const changeEvent = await page.spyOnEvent('aegovDatepickerChange');
      const trigger = await page.find('aegov-datepicker .datepicker__trigger');
      await trigger.click();
      await page.waitForChanges();

      // Click a day via evaluate (portal re-renders so refs go stale)
      const dayClicked = await page.evaluate(() => {
        const days = document.querySelectorAll('.aegov-datepicker-portal .datepicker__day:not(.datepicker__day--outside):not(.datepicker__day--disabled)');
        if (days.length > 0) {
          (days[0] as HTMLElement).click();
          return true;
        }
        return false;
      });
      expect(dayClicked).toBe(true);
      await page.waitForChanges();
      await page.waitForChanges();

      // Click Apply (portal was re-rendered after day click)
      const applyClicked = await page.evaluate(() => {
        const btn = document.querySelector('.aegov-datepicker-portal .datepicker__footer-btn--apply') as HTMLElement;
        if (btn) {
          btn.click();
          return true;
        }
        return false;
      });
      expect(applyClicked).toBe(true);
      await page.waitForChanges();
      await page.waitForChanges();

      expect(changeEvent).toHaveReceivedEvent();
    });
  });

  describe('custom trigger slot', () => {
    it('should render custom trigger', async () => {
      page = await newE2EPage();
      await page.setContent(`
        <aegov-datepicker>
          <button slot="trigger">Open Calendar</button>
        </aegov-datepicker>
      `);

      const btn = await page.find('aegov-datepicker [slot="trigger"]');
      expect(btn).toBeTruthy();
      expect(btn.textContent).toBe('Open Calendar');
    });

    it('should open calendar when custom trigger is clicked', async () => {
      page = await newE2EPage();
      await page.setContent(`
        <aegov-datepicker>
          <button slot="trigger">Open</button>
        </aegov-datepicker>
      `);

      const trigger = await page.find('aegov-datepicker .datepicker__trigger');
      await trigger.click();
      await page.waitForChanges();

      const portal = await page.find('.aegov-datepicker-portal .aegov-datepicker');
      expect(portal).toBeTruthy();
    });
  });

  describe('custom format', () => {
    it('should display date in custom format', async () => {
      page = await newE2EPage();
      await page.setContent(`<aegov-datepicker format="DD/MM/YYYY" value="2026-03-15"></aegov-datepicker>`);

      const input = await page.find('aegov-datepicker .datepicker__input');
      const value = await input.getProperty('value');
      expect(value).toBe('15/03/2026');
    });
  });

  describe('selectable header', () => {
    it('should show month/year labels instead of selects when selectable-header is false', async () => {
      page = await newE2EPage();
      await page.setContent(`<aegov-datepicker selectable-header="false"></aegov-datepicker>`);

      const trigger = await page.find('aegov-datepicker .datepicker__trigger');
      await trigger.click();
      await page.waitForChanges();

      const selects = await page.findAll('.aegov-datepicker-portal .datepicker__select');
      expect(selects.length).toBe(0);

      const label = await page.find('.aegov-datepicker-portal .datepicker__month-label');
      expect(label).toBeTruthy();
    });
  });

  describe('programmatic methods', () => {
    it('should open via method', async () => {
      page = await newE2EPage();
      await page.setContent(`<aegov-datepicker></aegov-datepicker>`);

      const datepicker = await page.find('aegov-datepicker');
      await datepicker.callMethod('open');
      await page.waitForChanges();

      const portal = await page.find('.aegov-datepicker-portal .aegov-datepicker');
      expect(portal).toBeTruthy();
    });

    it('should close via method', async () => {
      page = await newE2EPage();
      await page.setContent(`<aegov-datepicker></aegov-datepicker>`);

      const datepicker = await page.find('aegov-datepicker');
      await datepicker.callMethod('open');
      await page.waitForChanges();

      await datepicker.callMethod('close');
      await page.waitForChanges();
      await page.waitForChanges();

      const portal = await page.find('.aegov-datepicker-portal .aegov-datepicker');
      expect(portal).toBeNull();
    });

    it('should clear via method', async () => {
      page = await newE2EPage();
      await page.setContent(`<aegov-datepicker value="2026-03-15"></aegov-datepicker>`);

      const clearEvent = await page.spyOnEvent('aegovDatepickerClear');
      const datepicker = await page.find('aegov-datepicker');
      await datepicker.callMethod('clear');
      await page.waitForChanges();

      expect(clearEvent).toHaveReceivedEvent();
    });

    it('should get value via method', async () => {
      page = await newE2EPage();
      await page.setContent(`<aegov-datepicker value="2026-03-15"></aegov-datepicker>`);

      const datepicker = await page.find('aegov-datepicker');
      const value = await datepicker.callMethod('getValue');
      expect(value).toBe('2026-03-15');
    });
  });

  describe('keyboard navigation', () => {
    it('should open calendar on Enter', async () => {
      page = await newE2EPage();
      await page.setContent(`<aegov-datepicker></aegov-datepicker>`);

      const input = await page.find('aegov-datepicker .datepicker__input');
      await input.focus();
      await page.keyboard.press('Enter');
      await page.waitForChanges();

      const portal = await page.find('.aegov-datepicker-portal .aegov-datepicker');
      expect(portal).toBeTruthy();
    });
  });

  describe('start-day configuration', () => {
    it('should start week on Monday when start-day is 1', async () => {
      page = await newE2EPage();
      await page.setContent(`<aegov-datepicker start-day="1"></aegov-datepicker>`);

      const trigger = await page.find('aegov-datepicker .datepicker__trigger');
      await trigger.click();
      await page.waitForChanges();

      const weekdays = await page.findAll('.aegov-datepicker-portal .datepicker__weekday');
      expect(weekdays.length).toBe(7);
      const firstDay = await weekdays[0].getProperty('textContent');
      expect(firstDay).toBe('Mon');
    });
  });
});
