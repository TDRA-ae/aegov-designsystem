import { newE2EPage } from '@stencil/core/testing';

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
});
