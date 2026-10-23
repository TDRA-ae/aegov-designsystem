import { newE2EPage } from '@stencil/core/testing';

describe('aegov-toggle (e2e)', () => {
  it('renders the native checkbox input with role="switch"', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-toggle label="Notify"></aegov-toggle>');
    const input = await page.find('aegov-toggle >>> input');
    expect(input).not.toBeNull();
    expect(await input.getProperty('type')).toBe('checkbox');
    expect(input.getAttribute('role')).toBe('switch');
  });

  it('reflects is-checked to native checked and aria-checked', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-toggle is-checked></aegov-toggle>');
    const input = await page.find('aegov-toggle >>> input');
    expect(await input.getProperty('checked')).toBe(true);
    expect(input.getAttribute('aria-checked')).toBe('true');
  });

  it('clicking the label toggles state', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-toggle label="Toggle"></aegov-toggle>');
    const labelText = await page.find('aegov-toggle >>> .toggle__label-text');
    await labelText.click();
    await page.waitForChanges();
    const input = await page.find('aegov-toggle >>> input');
    expect(await input.getProperty('checked')).toBe(true);
  });

  it('emits aegovToggleChange when toggled', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-toggle value="on" label="L"></aegov-toggle>');
    const host = await page.find('aegov-toggle');
    const spy = await host.spyOnEvent('aegovToggleChange');
    const input = await page.find('aegov-toggle >>> input');
    await input.click();
    await page.waitForChanges();
    expect(spy).toHaveReceivedEventTimes(1);
    expect(spy.lastEvent.detail).toEqual({ checked: true, value: 'on' });
  });

  it('Space key toggles the switch when focused', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-toggle label="P"></aegov-toggle>');
    const input = await page.find('aegov-toggle >>> input');
    await input.focus();
    await page.keyboard.press('Space');
    await page.waitForChanges();
    expect(await input.getProperty('checked')).toBe(true);
  });

  it('disabled toggle does not change on click', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-toggle is-disabled label="X"></aegov-toggle>');
    const input = await page.find('aegov-toggle >>> input');
    await input.click();
    await page.waitForChanges();
    expect(await input.getProperty('checked')).toBe(false);
    expect(await input.getProperty('disabled')).toBe(true);
  });

  it('forwards aria and data attributes to the input', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-toggle aria-label="notify" data-id="1"></aegov-toggle>');
    const input = await page.find('aegov-toggle >>> input');
    expect(input.getAttribute('aria-label')).toBe('notify');
    expect(input.getAttribute('data-id')).toBe('1');
  });

  // Regression coverage for #64. Stencil's own `reflect: true` silently
  // skipped writing the `is-checked` attribute on the very first change away
  // from a literally-attribute-declared `is-checked="true"` (its internal
  // "last reflected value" bookkeeping gets desynced from the real DOM
  // attribute when the initial value comes from attribute parsing rather
  // than a property assignment) — every change after the first reflected
  // correctly on its own. handleChange() now explicitly syncs the attribute
  // as a defensive measure that doesn't depend on Stencil's own bookkeeping.
  it('removes the is-checked attribute on the first user-triggered uncheck of a toggle declared is-checked="true"', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-toggle is-checked="true" label="On by default"></aegov-toggle>');
    const host = await page.find('aegov-toggle');
    expect(host.getAttribute('is-checked')).toBe('true');

    const input = await page.find('aegov-toggle >>> input');
    await input.click();
    await page.waitForChanges();
    expect(host.getAttribute('is-checked')).toBeNull();
    expect(await input.getProperty('checked')).toBe(false);

    // And it continues to reflect correctly on every subsequent toggle.
    await input.click();
    await page.waitForChanges();
    expect(host.getAttribute('is-checked')).not.toBeNull();
    await input.click();
    await page.waitForChanges();
    expect(host.getAttribute('is-checked')).toBeNull();
  });
});
