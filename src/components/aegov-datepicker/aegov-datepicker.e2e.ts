import { newE2EPage } from '@stencil/core/testing';

describe('aegov-datepicker (e2e)', () => {
  it('renders the trigger input', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-datepicker placeholder="Pick a date"></aegov-datepicker>');
    const input = await page.find('aegov-datepicker input.datepicker__input');
    expect(input).not.toBeNull();
    expect(await input.getProperty('placeholder')).toBe('Pick a date');
    expect(await input.getProperty('readOnly')).toBe(true);
  });

  it('renders two inputs in range appearance', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-datepicker appearance="range"></aegov-datepicker>');
    const inputs = await page.findAll('aegov-datepicker input.datepicker__input');
    expect(inputs.length).toBe(2);
  });

  it('clicking the trigger opens the calendar in a body portal', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-datepicker></aegov-datepicker>');
    const host = await page.find('aegov-datepicker');
    const openSpy = await host.spyOnEvent('aegovDatepickerOpen');

    const trigger = await page.find('aegov-datepicker .datepicker__trigger');
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
    const input = await page.find('aegov-datepicker input.datepicker__input');
    expect(input.getAttribute('aria-expanded')).toBe('true');
  });

  it('selecting a day in single mode commits a value, closes, and emits change', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-datepicker value="2024-06-15" format="YYYY-MM-DD"></aegov-datepicker>');
    const host = await page.find('aegov-datepicker');
    const changeSpy = await host.spyOnEvent('aegovDatepickerChange');

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
      const next = document.querySelector('.aegov-datepicker-portal button[aria-label="Next month"]') as HTMLButtonElement;
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

    const clearBtn = await page.find('aegov-datepicker .datepicker__clear-btn');
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
    const trigger = await page.find('aegov-datepicker .datepicker__trigger');
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
    const defaultInput = await page.find('aegov-datepicker input.datepicker__input');
    expect(defaultInput).toBeNull();
  });

  it('forwards aria/data attributes to the host element', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-datepicker data-testid="dp"></aegov-datepicker>');
    const host = await page.find('aegov-datepicker');
    expect(host.getAttribute('data-testid')).toBe('dp');
  });
});
