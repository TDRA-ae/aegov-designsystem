import { newE2EPage } from '@stencil/core/testing';

describe('aegov-toggle (e2e)', () => {
  it('renders the native checkbox input with role="switch"', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-toggle label="Notify"></aegov-toggle>');
    const input = await page.find('aegov-toggle input');
    expect(input).not.toBeNull();
    expect(await input.getProperty('type')).toBe('checkbox');
    expect(input.getAttribute('role')).toBe('switch');
  });

  it('reflects is-checked to native checked and aria-checked', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-toggle is-checked></aegov-toggle>');
    const input = await page.find('aegov-toggle input');
    expect(await input.getProperty('checked')).toBe(true);
    expect(input.getAttribute('aria-checked')).toBe('true');
  });

  it('clicking the label toggles state', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-toggle label="Toggle"></aegov-toggle>');
    const labelText = await page.find('aegov-toggle .toggle__label-text');
    await labelText.click();
    await page.waitForChanges();
    const input = await page.find('aegov-toggle input');
    expect(await input.getProperty('checked')).toBe(true);
  });

  it('emits aegovToggleChange when toggled', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-toggle value="on" label="L"></aegov-toggle>');
    const host = await page.find('aegov-toggle');
    const spy = await host.spyOnEvent('aegovToggleChange');
    const input = await page.find('aegov-toggle input');
    await input.click();
    await page.waitForChanges();
    expect(spy).toHaveReceivedEventTimes(1);
    expect(spy.lastEvent.detail).toEqual({ checked: true, value: 'on' });
  });

  it('Space key toggles the switch when focused', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-toggle label="P"></aegov-toggle>');
    const input = await page.find('aegov-toggle input');
    await input.focus();
    await page.keyboard.press('Space');
    await page.waitForChanges();
    expect(await input.getProperty('checked')).toBe(true);
  });

  it('disabled toggle does not change on click', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-toggle is-disabled label="X"></aegov-toggle>');
    const input = await page.find('aegov-toggle input');
    await input.click();
    await page.waitForChanges();
    expect(await input.getProperty('checked')).toBe(false);
    expect(await input.getProperty('disabled')).toBe(true);
  });

  it('forwards aria and data attributes to the input', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-toggle aria-label="notify" data-id="1"></aegov-toggle>');
    const input = await page.find('aegov-toggle input');
    expect(input.getAttribute('aria-label')).toBe('notify');
    expect(input.getAttribute('data-id')).toBe('1');
  });
});
