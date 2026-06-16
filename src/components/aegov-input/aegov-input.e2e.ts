import { newE2EPage } from '@stencil/core/testing';

describe('aegov-input (e2e)', () => {
  it('renders a native input', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-input></aegov-input>');
    const input = await page.find('aegov-input input');
    expect(input).not.toBeNull();
    expect(input).toHaveClass('aegov-input');
  });

  it('typing fires aegovInputInput', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-input></aegov-input>');
    const host = await page.find('aegov-input');
    const spy = await host.spyOnEvent('aegovInputInput');
    const input = await page.find('aegov-input input');
    await input.press('a');
    await page.waitForChanges();
    expect(spy).toHaveReceivedEvent();
  });

  it('emits aegovInputChange on blur with new value', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-input></aegov-input>');
    const host = await page.find('aegov-input');
    const spy = await host.spyOnEvent('aegovInputChange');
    const input = await page.find('aegov-input input');
    await input.press('h');
    await input.press('i');
    await page.evaluate(() => (document.querySelector('aegov-input input') as HTMLInputElement).blur());
    await page.waitForChanges();
    expect(spy).toHaveReceivedEvent();
  });

  it('disables native input when is-disabled', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-input is-disabled="true"></aegov-input>');
    const input = await page.find('aegov-input input');
    expect(await input.getProperty('disabled')).toBe(true);
  });

  it('shows reveal button for password and toggles type', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-input type="password" is-revealable="true"></aegov-input>');
    let input = await page.find('aegov-input input');
    expect(await input.getProperty('type')).toBe('password');
    const btn = await page.find('aegov-input button.input__revealable');
    expect(btn).not.toBeNull();
    await btn.click();
    await page.waitForChanges();
    input = await page.find('aegov-input input');
    expect(await input.getProperty('type')).toBe('text');
  });

  it('shows copy button when readonly+copyable and clicking it triggers copy state', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-input is-readonly="true" is-copyable="true" value="hello"></aegov-input>');
    // Stub clipboard
    await page.evaluate(() => {
      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: () => Promise.resolve() },
        configurable: true,
      });
    });
    const btn = await page.find('aegov-input button.input__copy-btn');
    expect(btn).not.toBeNull();
    await btn.click();
    await page.waitForChanges();
    const updated = await page.find('aegov-input button.input__copy-btn');
    expect(updated).toHaveClass('input__copy-btn--copied');
  });

  it('forwards aria and data attributes to native input', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-input aria-label="email" data-foo="bar"></aegov-input>');
    const input = await page.find('aegov-input input');
    expect(input.getAttribute('aria-label')).toBe('email');
    expect(input.getAttribute('data-foo')).toBe('bar');
  });

  it('reflects fieldId to native input id', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-input field-id="x1"></aegov-input>');
    const input = await page.find('aegov-input input');
    expect(input.id).toBe('x1');
  });
});
