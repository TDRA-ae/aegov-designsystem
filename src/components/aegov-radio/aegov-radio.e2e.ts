import { newE2EPage } from '@stencil/core/testing';

describe('aegov-radio (e2e)', () => {
  it('renders the native radio input', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-radio label="A"></aegov-radio>');
    const input = await page.find('aegov-radio input');
    expect(input).not.toBeNull();
    expect(await input.getProperty('type')).toBe('radio');
  });

  it('reflects is-checked to native checked', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-radio is-checked></aegov-radio>');
    const input = await page.find('aegov-radio input');
    expect(await input.getProperty('checked')).toBe(true);
  });

  it('clicking the label selects the radio', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-radio label="Pick me"></aegov-radio>');
    const labelText = await page.find('aegov-radio .radio__label-text');
    await labelText.click();
    await page.waitForChanges();
    const input = await page.find('aegov-radio input');
    expect(await input.getProperty('checked')).toBe(true);
  });

  it('emits aegovRadioChange when toggled', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-radio value="v1" label="L"></aegov-radio>');
    const host = await page.find('aegov-radio');
    const spy = await host.spyOnEvent('aegovRadioChange');
    const input = await page.find('aegov-radio input');
    await input.click();
    await page.waitForChanges();
    expect(spy).toHaveReceivedEventTimes(1);
    expect(spy.lastEvent.detail).toEqual({ checked: true, value: 'v1' });
  });

  it('Space key selects the radio when focused', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-radio label="P"></aegov-radio>');
    const input = await page.find('aegov-radio input');
    await input.focus();
    await page.keyboard.press('Space');
    await page.waitForChanges();
    expect(await input.getProperty('checked')).toBe(true);
  });

  it('disabled radio does not toggle on click', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-radio is-disabled label="X"></aegov-radio>');
    const input = await page.find('aegov-radio input');
    await input.click();
    await page.waitForChanges();
    expect(await input.getProperty('checked')).toBe(false);
    expect(await input.getProperty('disabled')).toBe(true);
  });

  it('forwards aria and data attributes to the input', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-radio aria-label="opt" data-id="1"></aegov-radio>');
    const input = await page.find('aegov-radio input');
    expect(input.getAttribute('aria-label')).toBe('opt');
    expect(input.getAttribute('data-id')).toBe('1');
  });
});
