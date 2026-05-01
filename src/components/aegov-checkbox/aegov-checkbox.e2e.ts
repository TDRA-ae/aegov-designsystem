import { newE2EPage } from '@stencil/core/testing';

describe('aegov-checkbox (e2e)', () => {
  it('renders the native checkbox input', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-checkbox label="Accept"></aegov-checkbox>');
    const input = await page.find('aegov-checkbox input');
    expect(input).not.toBeNull();
    expect(await input.getProperty('type')).toBe('checkbox');
  });

  it('reflects is-checked to native checked', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-checkbox is-checked></aegov-checkbox>');
    const input = await page.find('aegov-checkbox input');
    expect(await input.getProperty('checked')).toBe(true);
  });

  it('clicking the label toggles the checkbox', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-checkbox label="Toggle me"></aegov-checkbox>');
    const labelText = await page.find('aegov-checkbox .checkbox__label-text');
    await labelText.click();
    await page.waitForChanges();
    const input = await page.find('aegov-checkbox input');
    expect(await input.getProperty('checked')).toBe(true);
  });

  it('emits aegovCheckboxChange when toggled', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-checkbox value="v1" label="L"></aegov-checkbox>');
    const host = await page.find('aegov-checkbox');
    const spy = await host.spyOnEvent('aegovCheckboxChange');
    const input = await page.find('aegov-checkbox input');
    await input.click();
    await page.waitForChanges();
    expect(spy).toHaveReceivedEventTimes(1);
    expect(spy.lastEvent.detail).toEqual({ checked: true, value: 'v1' });
  });

  it('Space key toggles the checkbox when input is focused', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-checkbox label="Press"></aegov-checkbox>');
    const input = await page.find('aegov-checkbox input');
    await input.focus();
    await page.keyboard.press('Space');
    await page.waitForChanges();
    expect(await input.getProperty('checked')).toBe(true);
  });

  it('disabled checkbox does not toggle on click', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-checkbox is-disabled label="Off"></aegov-checkbox>');
    const input = await page.find('aegov-checkbox input');
    await input.click();
    await page.waitForChanges();
    expect(await input.getProperty('checked')).toBe(false);
    expect(await input.getProperty('disabled')).toBe(true);
  });

  it('reflects fieldId on the native input id', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-checkbox field-id="my-cb" label="X"></aegov-checkbox>');
    const input = await page.find('aegov-checkbox input');
    expect(input.id).toBe('my-cb');
  });

  it('forwards aria and data attributes to the input', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-checkbox aria-label="agree" data-id="1"></aegov-checkbox>');
    const input = await page.find('aegov-checkbox input');
    expect(input.getAttribute('aria-label')).toBe('agree');
    expect(input.getAttribute('data-id')).toBe('1');
  });
});
