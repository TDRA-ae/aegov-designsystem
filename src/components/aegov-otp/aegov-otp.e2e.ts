import { newE2EPage } from '@stencil/core/testing';

describe('aegov-otp (e2e)', () => {
  it('renders the cells based on length', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-otp length="4"></aegov-otp>');
    const cells = await page.findAll('aegov-otp .otp__cell');
    expect(cells.length).toBe(4);
  });

  it('typing into a cell auto-advances focus to the next cell', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-otp length="4"></aegov-otp>');
    const first = await page.find('aegov-otp .otp__cell:nth-of-type(1)');
    await first.focus();
    await page.keyboard.type('1');
    await page.waitForChanges();
    const focusedClass = await page.evaluate(() =>
      (document.activeElement as HTMLElement).getAttribute('aria-label'),
    );
    expect(focusedClass).toBe('Character 2 of 4');
  });

  it('rejects non-numeric chars in numeric mode', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-otp length="4"></aegov-otp>');
    const first = await page.find('aegov-otp .otp__cell:nth-of-type(1)');
    await first.focus();
    await page.keyboard.type('a');
    await page.waitForChanges();
    expect(await first.getProperty('value')).toBe('');
  });

  it('accepts letters when is-alphanumeric is set', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-otp is-alphanumeric length="4"></aegov-otp>');
    const first = await page.find('aegov-otp .otp__cell:nth-of-type(1)');
    await first.focus();
    await page.keyboard.type('A');
    await page.waitForChanges();
    expect(await first.getProperty('value')).toBe('A');
  });

  it('Backspace on empty cell focuses previous cell and clears it', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-otp length="4"></aegov-otp>');
    const first = await page.find('aegov-otp .otp__cell:nth-of-type(1)');
    await first.focus();
    await page.keyboard.type('12');
    await page.waitForChanges();
    // Now focus is on cell 3 (empty); backspace goes back to cell 2 and clears it
    await page.keyboard.press('Backspace');
    await page.waitForChanges();
    const cell2 = await page.find('aegov-otp .otp__cell:nth-of-type(2)');
    expect(await cell2.getProperty('value')).toBe('');
  });

  it('emits aegovOtpChange on each character typed', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-otp length="4"></aegov-otp>');
    const host = await page.find('aegov-otp');
    const spy = await host.spyOnEvent('aegovOtpChange');
    const first = await page.find('aegov-otp .otp__cell:nth-of-type(1)');
    await first.focus();
    await page.keyboard.type('12');
    await page.waitForChanges();
    expect(spy.events.length).toBeGreaterThanOrEqual(2);
  });

  it('emits aegovOtpComplete when all cells filled', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-otp length="4"></aegov-otp>');
    const host = await page.find('aegov-otp');
    const spy = await host.spyOnEvent('aegovOtpComplete');
    const first = await page.find('aegov-otp .otp__cell:nth-of-type(1)');
    await first.focus();
    await page.keyboard.type('1234');
    await page.waitForChanges();
    expect(spy).toHaveReceivedEventTimes(1);
    expect(spy.lastEvent.detail).toEqual({ value: '1234' });
  });

  it('emits aegovOtpInvalid when filled value fails pattern', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-otp length="4" pattern="^9999$"></aegov-otp>');
    const host = await page.find('aegov-otp');
    const invalidSpy = await host.spyOnEvent('aegovOtpInvalid');
    const completeSpy = await host.spyOnEvent('aegovOtpComplete');
    const first = await page.find('aegov-otp .otp__cell:nth-of-type(1)');
    await first.focus();
    await page.keyboard.type('1234');
    await page.waitForChanges();
    expect(invalidSpy).toHaveReceivedEventTimes(1);
    expect(completeSpy).toHaveReceivedEventTimes(0);
    expect(invalidSpy.lastEvent.detail.pattern).toBe('^9999$');
  });

  it('ArrowLeft / ArrowRight move focus between cells', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-otp length="4"></aegov-otp>');
    const second = await page.find('aegov-otp .otp__cell:nth-of-type(2)');
    await second.focus();
    await page.keyboard.press('ArrowRight');
    await page.waitForChanges();
    let label = await page.evaluate(() =>
      (document.activeElement as HTMLElement).getAttribute('aria-label'),
    );
    expect(label).toBe('Character 3 of 4');

    await page.keyboard.press('ArrowLeft');
    await page.waitForChanges();
    label = await page.evaluate(() =>
      (document.activeElement as HTMLElement).getAttribute('aria-label'),
    );
    expect(label).toBe('Character 2 of 4');
  });

  it('clear() method empties all cells and updates value', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-otp length="4" value="1234"></aegov-otp>');
    const host = await page.find('aegov-otp');
    await host.callMethod('clear');
    await page.waitForChanges();
    const cells = await page.findAll('aegov-otp .otp__cell');
    for (const c of cells) {
      expect(await c.getProperty('value')).toBe('');
    }
    expect(await host.getProperty('value')).toBe('');
  });

  it('disabled cells are not interactable', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-otp is-disabled length="4"></aegov-otp>');
    const first = await page.find('aegov-otp .otp__cell:nth-of-type(1)');
    expect(await first.getProperty('disabled')).toBe(true);
  });
});
