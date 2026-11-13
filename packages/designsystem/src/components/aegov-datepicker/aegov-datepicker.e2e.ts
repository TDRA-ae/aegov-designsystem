import { newE2EPage } from '@stencil/core/testing';
import { themeColours } from '../../utils/e2e-theme';

describe('aegov-datepicker (e2e)', () => {
  it('renders the trigger input', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-datepicker placeholder="Pick a date"></aegov-datepicker>');
    const input = await page.find('aegov-datepicker >>> input.datepicker__input');
    expect(input).not.toBeNull();
    expect(await input.getProperty('placeholder')).toBe('Pick a date');
    expect(await input.getProperty('readOnly')).toBe(true);
  });

  it('renders two inputs in range appearance', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-datepicker appearance="range"></aegov-datepicker>');
    const inputs = await page.findAll('aegov-datepicker >>> input.datepicker__input');
    expect(inputs.length).toBe(2);
  });

  it('clicking the trigger opens the calendar in a body portal', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-datepicker></aegov-datepicker>');
    const host = await page.find('aegov-datepicker');
    const openSpy = await host.spyOnEvent('aegovDatepickerOpen');

    const trigger = await page.find('aegov-datepicker >>> .datepicker__trigger');
    await trigger.click();
    await page.waitForChanges();

    const portal = await page.find('.aegov-datepicker-portal');
    expect(portal).not.toBeNull();
    const dialog = await page.find('.aegov-datepicker-portal .aegov-datepicker');
    expect(dialog).not.toBeNull();
    expect(dialog.getAttribute('role')).toBe('dialog');
    expect(openSpy).toHaveReceivedEventTimes(1);
  });

  it('aria-expanded reflects open state on the input', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-datepicker></aegov-datepicker>');
    const host = await page.find('aegov-datepicker');
    await host.callMethod('open');
    await page.waitForChanges();
    const input = await page.find('aegov-datepicker >>> input.datepicker__input');
    expect(input.getAttribute('aria-expanded')).toBe('true');
  });

  it('a value set from code emits no change or validate event, and reaches the form', async () => {
    const page = await newE2EPage();
    await page.setContent('<form><aegov-datepicker name="d" value="2026-09-10"></aegov-datepicker></form>');
    const host = await page.find('aegov-datepicker');
    const changeSpy = await host.spyOnEvent('aegovDatepickerChange');
    const validateSpy = await host.spyOnEvent('aegovValidate');
    await page.$eval('aegov-datepicker', (el: any) => { el.value = '2026-09-12'; });
    await page.waitForChanges();
    expect(changeSpy.events.length).toBe(0);
    expect(validateSpy.events.length).toBe(0);
    expect(await page.evaluate(() => new FormData(document.querySelector('form')!).get('d'))).toBe('2026-09-12');
  });

  it('a value on a blackout date blocks the form, set in markup or from code', async () => {
    const page = await newE2EPage();
    await page.setContent('<form><aegov-datepicker name="d" blackout="2026-09-03" value="2026-09-03"></aegov-datepicker></form>');
    await page.waitForChanges();
    const formValid = () => page.evaluate(() => document.querySelector('form')!.checkValidity());
    expect(await formValid()).toBe(false);
    await page.$eval('aegov-datepicker', (el: any) => { el.value = '2026-09-01'; });
    await page.waitForChanges();
    expect(await formValid()).toBe(true);
    await page.$eval('aegov-datepicker', (el: any) => { el.blackout = '2026-09-01'; });
    await page.waitForChanges();
    expect(await formValid()).toBe(false);
  });

  it('selecting a day in single mode commits a value, closes, and emits change', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-datepicker value="2024-06-15" format="YYYY-MM-DD"></aegov-datepicker>');
    const host = await page.find('aegov-datepicker');
    const changeSpy = await host.spyOnEvent('aegovDatepickerChange');
    const validateSpy = await host.spyOnEvent('aegovValidate');

    await host.callMethod('open');
    await page.waitForChanges();

    // Pick the 20th in the visible month
    const clicked = await page.evaluate(() => {
      const btn = document.querySelector('.aegov-datepicker-portal .datepicker__day[data-date="2024-06-20"]') as HTMLButtonElement;
      if (btn) { btn.click(); return true; }
      return false;
    });
    expect(clicked).toBe(true);
    await page.waitForChanges();

    expect(changeSpy.events.length).toBeGreaterThanOrEqual(1);
    expect(changeSpy.lastEvent.detail.value).toBe('2024-06-20');
    expect(validateSpy.lastEvent.detail.trigger).toBe('change');
    expect(validateSpy.lastEvent.detail.value).toBe('2024-06-20');
    // The portal element is removed when the datepicker closes.
    const portalEmpty = await page.evaluate(() => {
      const portal = document.querySelector('.aegov-datepicker-portal');
      return !portal || portal.innerHTML.trim() === '';
    });
    expect(portalEmpty).toBe(true);
  });

  it('range mode emits change with start/end after two clicks', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-datepicker appearance="range" value="2024-06-01 / 2024-06-05"></aegov-datepicker>');
    const host = await page.find('aegov-datepicker');
    const changeSpy = await host.spyOnEvent('aegovDatepickerChange');

    await host.callMethod('open');
    await page.waitForChanges();

    await page.evaluate(() => {
      const start = document.querySelector('.aegov-datepicker-portal .datepicker__day[data-date="2024-06-10"]') as HTMLButtonElement;
      start?.click();
    });
    await page.waitForChanges();
    await page.evaluate(() => {
      const end = document.querySelector('.aegov-datepicker-portal .datepicker__day[data-date="2024-06-15"]') as HTMLButtonElement;
      end?.click();
    });
    await page.waitForChanges();

    expect(changeSpy.events.length).toBeGreaterThanOrEqual(1);
    const last = changeSpy.lastEvent.detail;
    expect(last.value).toBe('2024-06-10 / 2024-06-15');
  });

  it('navigating to next/previous month emits aegovDatepickerMonthChange', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-datepicker value="2024-06-15"></aegov-datepicker>');
    const host = await page.find('aegov-datepicker');
    const monthSpy = await host.spyOnEvent('aegovDatepickerMonthChange');
    await host.callMethod('open');
    await page.waitForChanges();

    await page.evaluate(() => {
      const next = document.querySelector('.aegov-datepicker-portal button[aria-label^="Next month"]') as HTMLButtonElement;
      next?.click();
    });
    await page.waitForChanges();

    expect(monthSpy.events.length).toBeGreaterThanOrEqual(1);
    expect(monthSpy.lastEvent.detail).toEqual({ month: 6, year: 2024 });
  });

  for (const [label, markup] of [
    ['single', '<aegov-datepicker value="2024-06-15"></aegov-datepicker>'],
    ['range', '<aegov-datepicker appearance="range" value="2024-06-01 / 2024-06-05"></aegov-datepicker>'],
  ]) {
    it(`focus stays on the Next/Previous month button after it is activated with the keyboard (${label})`, async () => {
      const page = await newE2EPage();
      await page.setContent(markup);
      const host = await page.find('aegov-datepicker');
      await host.callMethod('open');
      await page.waitForChanges();
      const focusedLabel = () => page.evaluate(() => (document.activeElement as HTMLElement)?.getAttribute('aria-label') || document.activeElement?.tagName);

      await page.evaluate(() => (document.querySelector('.aegov-datepicker-portal button[aria-label^="Next month"]') as HTMLElement).focus());
      await page.keyboard.press('Enter');
      await page.waitForChanges();
      expect(await focusedLabel()).toMatch(/^Next month, /);

      // Pressing again keeps moving forward, from the same button.
      const before = await focusedLabel();
      await page.keyboard.press('Space');
      await page.waitForChanges();
      expect(await focusedLabel()).toMatch(/^Next month, /);
      expect(await focusedLabel()).not.toBe(before);

      await page.evaluate(() => (document.querySelector('.aegov-datepicker-portal button[aria-label^="Previous month"]') as HTMLElement).focus());
      await page.keyboard.press('Enter');
      await page.waitForChanges();
      expect(await focusedLabel()).toMatch(/^Previous month, /);
    });
  }

  it('clear button clears the value and emits clear', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-datepicker value="2024-06-15"></aegov-datepicker>');
    const host = await page.find('aegov-datepicker');
    const clearSpy = await host.spyOnEvent('aegovDatepickerClear');

    const clearBtn = await page.find('aegov-datepicker >>> .datepicker__clear-btn');
    expect(clearBtn).not.toBeNull();
    await clearBtn.click();
    await page.waitForChanges();

    expect(clearSpy).toHaveReceivedEventTimes(1);
    expect(await host.getProperty('value')).toBe('');
  });

  for (const [label, markup] of [
    ['single', '<aegov-datepicker value="2024-06-15"></aegov-datepicker>'],
    ['range', '<aegov-datepicker appearance="range" value="2024-06-01 / 2024-06-05"></aegov-datepicker>'],
  ]) {
    for (const key of ['Enter', 'Space'] as const) {
      it(`${key} on the clear button clears the value, keeps the calendar closed and keeps focus in the field (${label})`, async () => {
        const page = await newE2EPage();
        await page.setContent(markup);
        const host = await page.find('aegov-datepicker');
        const clearSpy = await host.spyOnEvent('aegovDatepickerClear');
        await page.$eval('aegov-datepicker', (el: HTMLElement) => (el.shadowRoot!.querySelector('.datepicker__clear-btn') as HTMLElement).focus());
        await page.keyboard.press(key);
        await page.waitForChanges();

        expect(clearSpy).toHaveReceivedEventTimes(1);
        expect(await host.getProperty('value')).toBe('');
        // The calendar stays closed: no portal dialog, trigger not expanded.
        expect(await page.find('.datepicker__dialog, [role="dialog"]')).toBeNull();
        const expanded = await page.$eval('aegov-datepicker', (el: HTMLElement) => el.shadowRoot!.querySelector('input.datepicker__input')!.getAttribute('aria-expanded'));
        expect(expanded).toBe('false');
        const focused = await page.evaluate(() => {
          const a = document.querySelector('aegov-datepicker')!.shadowRoot!.activeElement;
          return a ? a.className : document.activeElement?.tagName;
        });
        expect(focused).toContain('datepicker__input');
      });
    }
  }

  // Reflow (WCAG 1.4.10): the calendar never runs off a small screen.
  for (const [w, h] of [[320, 640], [320, 256]] as const) {
    it(`range calendar with presets and confirmation fits a ${w}x${h} viewport`, async () => {
      const page = await newE2EPage();
      await page.setViewport({ width: w, height: h });
      await page.setContent('<aegov-datepicker appearance="range" presets="today,yesterday,last7Days,thisMonth,lastMonth" is-with-confirmation="true"></aegov-datepicker>');
      const host = await page.find('aegov-datepicker');
      await host.callMethod('open');
      await page.waitForSelector('.aegov-datepicker.datepicker--visible');
      const r = await page.evaluate(() => {
        const d = document.querySelector('.aegov-datepicker.datepicker--visible') as HTMLElement;
        const b = d.getBoundingClientRect();
        const [c1, c2] = Array.from(d.querySelectorAll('.datepicker__calendar')).map(c => c.getBoundingClientRect());
        return {
          inside: b.left >= 0 && b.top >= 0 && b.right <= innerWidth && b.bottom <= innerHeight,
          monthsStacked: c2.top >= c1.bottom - 1,
          scrollsInside: d.scrollHeight > d.clientHeight,
        };
      });
      expect(r.inside).toBe(true);
      expect(r.monthsStacked).toBe(true);
      expect(r.scrollsInside).toBe(true);
    });
  }

  it('Escape closes the open calendar and emits close', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-datepicker></aegov-datepicker>');
    const host = await page.find('aegov-datepicker');
    const closeSpy = await host.spyOnEvent('aegovDatepickerClose');
    await host.callMethod('open');
    await page.waitForChanges();

    await page.keyboard.press('Escape');
    await page.waitForChanges();

    const portalEmpty = await page.evaluate(() => {
      const portal = document.querySelector('.aegov-datepicker-portal');
      return !portal || portal.innerHTML.trim() === '';
    });
    expect(portalEmpty).toBe(true);
    expect(closeSpy).toHaveReceivedEventTimes(1);
  });

  it('disabled datepicker does not open on trigger click', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-datepicker is-disabled></aegov-datepicker>');
    const trigger = await page.find('aegov-datepicker >>> .datepicker__trigger');
    await trigger.click();
    await page.waitForChanges();
    const portalDialog = await page.find('.aegov-datepicker-portal .aegov-datepicker');
    expect(portalDialog).toBeNull();
  });

  it('confirmation mode renders Apply/Cancel buttons in the footer', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-datepicker is-with-confirmation></aegov-datepicker>');
    const host = await page.find('aegov-datepicker');
    await host.callMethod('open');
    await page.waitForChanges();

    const apply = await page.find('.aegov-datepicker-portal .datepicker__footer-btn--apply');
    const cancel = await page.find('.aegov-datepicker-portal .datepicker__footer-btn--cancel');
    expect(apply).not.toBeNull();
    expect(cancel).not.toBeNull();
  });

  it('range mode with presets renders a presets panel', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-datepicker appearance="range" presets="today,last7Days,thisMonth"></aegov-datepicker>');
    const host = await page.find('aegov-datepicker');
    await host.callMethod('open');
    await page.waitForChanges();

    const presetButtons = await page.findAll('.aegov-datepicker-portal .datepicker__preset-btn');
    expect(presetButtons.length).toBe(3);
  });

  it('renders a custom trigger when [slot=trigger] is provided', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-datepicker><button slot="trigger" id="my-trigger">Pick</button></aegov-datepicker>');
    const slotted = await page.find('#my-trigger');
    expect(slotted).not.toBeNull();
    // Default styled input should not be present
    const defaultInput = await page.find('aegov-datepicker >>> input.datepicker__input');
    expect(defaultInput).toBeNull();
  });

  it('forwards aria/data attributes to the host element', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-datepicker data-testid="dp"></aegov-datepicker>');
    const host = await page.find('aegov-datepicker');
    expect(host.getAttribute('data-testid')).toBe('dp');
  });

  it('a disabled day button stays focusable (aria-disabled, not native disabled) — #36', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-datepicker value="2024-06-15" max="2024-06-15" format="YYYY-MM-DD"></aegov-datepicker>');
    const host = await page.find('aegov-datepicker');
    await host.callMethod('open');
    await page.waitForChanges();

    const state = await page.evaluate(() => {
      const btn = document.querySelector('.aegov-datepicker-portal .datepicker__day[data-date="2024-06-16"]') as HTMLButtonElement;
      return {
        ariaDisabled: btn?.getAttribute('aria-disabled'),
        nativeDisabled: btn?.disabled,
        hasDisabledClass: btn?.classList.contains('datepicker__day--disabled'),
      };
    });
    expect(state.ariaDisabled).toBe('true');
    expect(state.nativeDisabled).toBe(false);
    expect(state.hasDisabledClass).toBe(true);
  });

  it('ArrowRight past the last enabled date lands on the next (disabled) date instead of losing focus — #36', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-datepicker value="2024-06-15" max="2024-06-15" format="YYYY-MM-DD"></aegov-datepicker>');
    const host = await page.find('aegov-datepicker');
    await host.callMethod('open');
    await page.waitForChanges();

    await page.keyboard.press('ArrowRight');
    await page.waitForChanges();

    const focused = await page.evaluate(() => {
      const el = document.activeElement as HTMLButtonElement | null;
      return {
        tag: el?.tagName,
        date: el?.getAttribute('data-date'),
        ariaDisabled: el?.getAttribute('aria-disabled'),
      };
    });
    // Before the fix, this landed 366 days away with focus lost to <body>.
    expect(focused.tag).toBe('BUTTON');
    expect(focused.date).toBe('2024-06-16');
    expect(focused.ariaDisabled).toBe('true');
  });

  it('Enter on a focused disabled date does not select it or emit change — #36', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-datepicker value="2024-06-15" max="2024-06-15" format="YYYY-MM-DD"></aegov-datepicker>');
    const host = await page.find('aegov-datepicker');
    const changeSpy = await host.spyOnEvent('aegovDatepickerChange');
    await host.callMethod('open');
    await page.waitForChanges();

    await page.keyboard.press('ArrowRight');
    await page.waitForChanges();
    await page.keyboard.press('Enter');
    await page.waitForChanges();

    expect(changeSpy.events.length).toBe(0);
    // Calendar should still be open — Enter on a disabled date is a no-op, not a selection.
    const portalDialog = await page.find('.aegov-datepicker-portal .aegov-datepicker');
    expect(portalDialog).not.toBeNull();
  });

  it('portal element carries dir="rtl" from a local ancestor wrapper — #37', async () => {
    const page = await newE2EPage();
    await page.setContent('<div dir="rtl"><aegov-datepicker></aegov-datepicker></div>');
    const host = await page.find('aegov-datepicker');
    await host.callMethod('open');
    await page.waitForChanges();

    const portalDir = await page.evaluate(() => document.querySelector('.aegov-datepicker-portal')?.getAttribute('dir'));
    const dialogDirection = await page.evaluate(() => {
      const dialog = document.querySelector('.aegov-datepicker-portal .aegov-datepicker');
      return dialog ? getComputedStyle(dialog).direction : null;
    });
    expect(portalDir).toBe('rtl');
    expect(dialogDirection).toBe('rtl');
  });

  it('portal element defaults to dir="ltr" with no rtl ancestor — #37', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-datepicker></aegov-datepicker>');
    const host = await page.find('aegov-datepicker');
    await host.callMethod('open');
    await page.waitForChanges();

    const portalDir = await page.evaluate(() => document.querySelector('.aegov-datepicker-portal')?.getAttribute('dir'));
    expect(portalDir).toBe('ltr');
  });

  // aegov-button is shadow:true — a direct .focus() call on its host previously
  // silently no-op'd (no delegatesFocus, no reflected tabindex), dropping focus
  // to <body> instead of back to the trigger. Regression coverage for #66.
  it('restores focus to a shadow-DOM (aegov-button) custom trigger after Escape closes it', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-datepicker><aegov-button slot="trigger">Pick</aegov-button></aegov-datepicker>');
    const triggerBtn = await page.find('aegov-datepicker aegov-button >>> button');
    await triggerBtn.click();
    await page.waitForChanges();
    await page.keyboard.press('Escape');
    await page.waitForChanges();

    const focusState = await page.evaluate(() => {
      const host = document.activeElement as (Element & { shadowRoot?: ShadowRoot }) | null;
      return { hostTag: host?.tagName, deepActiveTag: host?.shadowRoot?.activeElement?.tagName ?? null };
    });
    expect(focusState.hostTag).toBe('AEGOV-BUTTON');
    expect(focusState.deepActiveTag).toBe('BUTTON');
  });

  describe('open() called from outside the picker', () => {
    const SETUP = '<form><aegov-datepicker name="d" is-required></aegov-datepicker></form><button id="opener" type="button">Pick a date</button>';

    /** Errors thrown during render reach the page as uncaught errors or console errors. */
    function collectErrors(page: import('@stencil/core/testing').E2EPage) {
      const errors: string[] = [];
      page.on('pageerror', e => errors.push(String(e)));
      page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
      return errors;
    }

    it('a page button opening an empty required picker throws nothing, keeps it invalid, and gets focus back', async () => {
      const page = await newE2EPage();
      const errors = collectErrors(page);
      await page.setContent(SETUP);
      await page.$eval('#opener', (b: HTMLButtonElement) => b.addEventListener('click', () => (document.querySelector('aegov-datepicker') as any).open()));
      await page.click('#opener');
      await page.waitForChanges();
      expect(await page.evaluate(() => !!document.querySelector('.aegov-datepicker-portal .aegov-datepicker'))).toBe(true);
      expect(await page.evaluate(() => document.querySelector('form')!.checkValidity())).toBe(false);
      const host = await page.find('aegov-datepicker');
      const result = await host.callMethod('validate', 'manual');
      expect(result.validity.valueMissing).toBe(true);

      await page.keyboard.press('Escape');
      await page.waitForChanges();
      expect(await page.evaluate(() => document.activeElement?.id)).toBe('opener');
      expect(errors).toEqual([]);
    });

    it('a later click outside still closes a calendar opened by a page button', async () => {
      const page = await newE2EPage();
      await page.setContent(`${SETUP}<p id="elsewhere" style="padding:20px">Elsewhere</p>`);
      await page.$eval('#opener', (b: HTMLButtonElement) => b.addEventListener('click', () => (document.querySelector('aegov-datepicker') as any).open()));
      await page.click('#opener');
      await page.waitForChanges();
      expect(await page.$eval('aegov-datepicker', (el: any) => el.shadowRoot.querySelector('input').getAttribute('aria-expanded'))).toBe('true');
      await page.click('#elsewhere');
      await page.waitForChanges();
      expect(await page.$eval('aegov-datepicker', (el: any) => el.shadowRoot.querySelector('input').getAttribute('aria-expanded'))).toBe('false');
    });

    it('with nothing focused before open(), focus goes to the picker input on close', async () => {
      const page = await newE2EPage();
      const errors = collectErrors(page);
      await page.setContent(SETUP);
      await page.$eval('aegov-datepicker', (el: any) => el.open());
      await page.waitForChanges();
      await page.keyboard.press('Escape');
      await page.waitForChanges();
      const focus = await page.evaluate(() => ({
        host: document.activeElement?.tagName,
        inner: (document.activeElement as HTMLElement)?.shadowRoot?.activeElement?.className,
      }));
      expect(focus.host).toBe('AEGOV-DATEPICKER');
      expect(focus.inner).toContain('datepicker__input');
      expect(await page.evaluate(() => document.querySelector('form')!.checkValidity())).toBe(false);
      expect(errors).toEqual([]);
    });
  });

  describe('UI language follows locale', () => {
    const PICKER = '<aegov-datepicker appearance="range" presets="today,last7Days" is-with-confirmation is-required></aegov-datepicker>';

    /** Open the calendar and read the datepicker's own text from the trigger and the portal. */
    async function readTexts(page: import('@stencil/core/testing').E2EPage) {
      const host = await page.find('aegov-datepicker');
      const { message } = await host.callMethod('validate', 'manual');
      await host.callMethod('open');
      await page.waitForChanges();
      const texts = await page.evaluate(() => {
        const host = document.querySelector('aegov-datepicker') as any;
        const portal = document.querySelector('.aegov-datepicker-portal')!;
        const start = host.shadowRoot.querySelector('.datepicker__input--range-start') as HTMLInputElement;
        return {
          placeholder: start.placeholder,
          triggerLang: host.shadowRoot.querySelector('.datepicker__trigger').getAttribute('lang'),
          portalDir: portal.getAttribute('dir'),
          portalLang: portal.getAttribute('lang'),
          presets: Array.from(portal.querySelectorAll('.datepicker__preset-btn')).map(b => b.textContent),
          presetGroup: portal.querySelector('.datepicker__presets')!.getAttribute('aria-label'),
          apply: portal.querySelector('.datepicker__footer-btn--apply')!.textContent,
          cancel: portal.querySelector('.datepicker__footer-btn--cancel')!.textContent,
          prev: portal.querySelector('.datepicker__nav-btn')!.getAttribute('aria-label'),
        };
      });
      return { ...texts, message };
    }

    it('locale="ar" on an LTR page: Arabic text and messages, LTR layout', async () => {
      const page = await newE2EPage();
      await page.setContent(`<div dir="ltr">${PICKER.replace('<aegov-datepicker', '<aegov-datepicker locale="ar"')}</div>`);
      const t = await readTexts(page);
      expect(t.placeholder).toBe('تاريخ البدء');
      expect(t.presets).toEqual(['اليوم', 'آخر 7 أيام']);
      expect(t.presetGroup).toBe('نطاقات تاريخية مسبقة');
      expect(t.apply).toBe('تطبيق');
      expect(t.cancel).toBe('إلغاء');
      expect(t.prev.startsWith('الشهر السابق, ')).toBe(true);
      expect(t.message).toBe('مطلوب');
      expect(t.portalDir).toBe('ltr');
      expect(t.portalLang).toBe('ar');
      expect(t.triggerLang).toBe('ar');
    });

    it('locale="en" inside dir="rtl": English text and messages, RTL layout', async () => {
      const page = await newE2EPage();
      await page.setContent(`<div dir="rtl">${PICKER.replace('<aegov-datepicker', '<aegov-datepicker locale="en-GB"')}</div>`);
      const t = await readTexts(page);
      expect(t.placeholder).toBe('Start date');
      expect(t.presets).toEqual(['Today', 'Last 7 Days']);
      expect(t.apply).toBe('Apply');
      expect(t.prev.startsWith('Previous month, ')).toBe(true);
      expect(t.message).toBe('Required');
      expect(t.portalDir).toBe('rtl');
      expect(t.portalLang).toBe('en');
    });

    it('without locale the text and the dates follow the page language', async () => {
      const rtl = await newE2EPage();
      await rtl.setContent(`<div dir="rtl">${PICKER}</div>`);
      const r = await readTexts(rtl);
      expect(r.presets).toEqual(['اليوم', 'آخر 7 أيام']);
      expect(r.apply).toBe('تطبيق');
      expect(r.message).toBe('مطلوب');
      // Dates are Arabic too, not English read by an Arabic voice (DS-A11Y-datepicker-11),
      // and the portal (under <body>) carries the language.
      expect(r.prev).toMatch(/^الشهر السابق, [^A-Za-z]+$/);
      expect(r.portalLang).toBe('ar');
      expect(r.triggerLang).toBeNull();

      const ltr = await newE2EPage();
      await ltr.setContent(PICKER);
      const l = await readTexts(ltr);
      expect(l.presets).toEqual(['Today', 'Last 7 Days']);
      expect(l.apply).toBe('Apply');
      expect(l.message).toBe('Required');
      expect(l.portalLang).toBe('en');
    });

    it('changing locale while open updates the trigger and the open calendar', async () => {
      const page = await newE2EPage();
      await page.setContent(PICKER);
      expect((await readTexts(page)).apply).toBe('Apply');
      await page.$eval('aegov-datepicker', (el: any) => { el.locale = 'ar-AE'; });
      await page.waitForChanges();
      const t = await page.evaluate(() => ({
        apply: document.querySelector('.aegov-datepicker-portal .datepicker__footer-btn--apply')?.textContent,
        presets: Array.from(document.querySelectorAll('.aegov-datepicker-portal .datepicker__preset-btn')).map(b => b.textContent),
        placeholder: (document.querySelector('aegov-datepicker') as any).shadowRoot.querySelector('.datepicker__input--range-start').placeholder,
      }));
      expect(t).toEqual({ apply: 'تطبيق', presets: ['اليوم', 'آخر 7 أيام'], placeholder: 'تاريخ البدء' });
    });
  });

  it('the trigger is as tall as aegov-input at every size (border included)', async () => {
    const page = await newE2EPage();
    await page.setContent(['xs', 'sm', 'base', 'lg', 'xl']
      .map(size => `<aegov-datepicker size="${size}"></aegov-datepicker>`).join('') +
      `<aegov-datepicker size="base" appearance="range"></aegov-datepicker>`);
    await page.waitForChanges();
    const heights = await page.evaluate(() => Array.from(document.querySelectorAll('aegov-datepicker'))
      .map((el: any) => Math.round(el.shadowRoot.querySelector('.datepicker__input-wrapper').getBoundingClientRect().height)));
    expect(heights).toEqual([36, 40, 44, 48, 52, 44]);
  });

  it('the clear button has no UA padding squashing its icon', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-datepicker size="xs" value="2024-06-15" is-clearable="true"></aegov-datepicker>');
    await page.waitForChanges();
    const info = await page.$eval('aegov-datepicker', (el: any) => {
      const btn = el.shadowRoot.querySelector('.datepicker__clear-btn');
      const svg = btn.querySelector('svg').getBoundingClientRect();
      return { padding: getComputedStyle(btn).paddingLeft, svgWidth: Math.round(svg.width) };
    });
    expect(info).toEqual({ padding: '0px', svgWidth: 16 });
  });

  it('disabled dims the trigger and re-enabling restores it', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-datepicker is-disabled="true"></aegov-datepicker>');
    await page.waitForChanges();
    const opacity = () => page.$eval('aegov-datepicker', (el: any) => getComputedStyle(el.shadowRoot.querySelector('.datepicker__input-wrapper')).opacity);
    expect(await opacity()).toBe('0.4');
    await page.$eval('aegov-datepicker', (el: any) => { el.isDisabled = false; });
    await page.waitForChanges();
    // The wrapper has a 200ms transition-all — wait for it to settle.
    await page.waitForFunction(() => getComputedStyle((document.querySelector('aegov-datepicker') as any)
      .shadowRoot.querySelector('.datepicker__input-wrapper')).opacity === '1', { timeout: 2000 });
    expect(await opacity()).toBe('1');
  });
});

// DS-A11Y-datepicker-05 (WCAG 1.4.11 / 1.4.1): days inside a selected range
// carry a top and bottom line in the variant colour, not only a faint tint.
describe('aegov-datepicker (e2e) range band', () => {
  const band = (page: any, date: string) =>
    page.evaluate((d: string) => {
      const day = document.querySelector(`.aegov-datepicker-portal .datepicker__day[data-date="${d}"]`) as HTMLElement;
      return (getComputedStyle(day).boxShadow.match(/inset/g) || []).length;
    }, date);

  it('in-range days have the band lines; days outside the range do not', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-datepicker aria-label="Stay" appearance="range" value="2024-06-10 / 2024-06-15"></aegov-datepicker>');
    await page.addStyleTag({ content: themeColours() });
    const host = await page.find('aegov-datepicker');
    await host.callMethod('open');
    await page.waitForChanges();
    expect(await band(page, '2024-06-12')).toBe(2);
    expect(await band(page, '2024-06-20')).toBe(0);
  });

  it('keeps the band on the other variants', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-datepicker aria-label="Stay" appearance="range" variant="neutral-min" value="2024-06-10 / 2024-06-15"></aegov-datepicker>');
    await page.addStyleTag({ content: themeColours() });
    const host = await page.find('aegov-datepicker');
    await host.callMethod('open');
    await page.waitForChanges();
    expect(await band(page, '2024-06-12')).toBe(2);
  });
});
