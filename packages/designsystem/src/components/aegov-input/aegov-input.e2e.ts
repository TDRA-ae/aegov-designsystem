import { newE2EPage } from '@stencil/core/testing';

describe('aegov-input (e2e)', () => {
  it('renders a native input', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-input></aegov-input>');
    const input = await page.find('aegov-input >>> input');
    expect(input).not.toBeNull();
    expect(input).toHaveClass('aegov-input');
  });

  it('typing fires aegovInputValue', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-input></aegov-input>');
    const host = await page.find('aegov-input');
    const spy = await host.spyOnEvent('aegovInputValue');
    const input = await page.find('aegov-input >>> input');
    await input.press('a');
    await page.waitForChanges();
    expect(spy).toHaveReceivedEvent();
  });

  it('emits aegovInputChange on blur with new value', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-input></aegov-input>');
    const host = await page.find('aegov-input');
    const spy = await host.spyOnEvent('aegovInputChange');
    const input = await page.find('aegov-input >>> input');
    await input.press('h');
    await input.press('i');
    await page.evaluate(() => (document.querySelector('aegov-input')!.shadowRoot!.querySelector('input') as HTMLInputElement).blur());
    await page.waitForChanges();
    expect(spy).toHaveReceivedEvent();
  });

  it('disables native input when is-disabled', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-input is-disabled="true"></aegov-input>');
    const input = await page.find('aegov-input >>> input');
    expect(await input.getProperty('disabled')).toBe(true);
  });

  // Regression coverage for #50. A disabled input inside aegov-input-group would
  // otherwise compound its own disabled:opacity-40 with the group wrapper's own
  // opacity-40 (0.4 × 0.4 = 0.16). `is-grouped` is already set on every grouped
  // child unconditionally, so ":host([is-grouped]) .aegov-input:disabled" cancels
  // just the input's own multiplier whenever it's genuinely disabled, leaving the
  // group's single 0.4 as the only dimming applied.
  it('cancels its own disabled opacity inside a group, but not standalone (#50)', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-input-group>
        <aegov-input is-disabled="true"></aegov-input>
      </aegov-input-group>
      <aegov-input id="standalone" is-disabled="true"></aegov-input>
    `);
    await page.waitForChanges();

    const opacities = await page.evaluate(() => {
      const grouped = document.querySelector('aegov-input-group aegov-input') as any;
      const standalone = document.getElementById('standalone') as any;
      return {
        grouped: getComputedStyle(grouped.shadowRoot.querySelector('.aegov-input')).opacity,
        standalone: getComputedStyle(standalone.shadowRoot.querySelector('.aegov-input')).opacity,
      };
    });

    expect(opacities.grouped).toBe('1');
    expect(opacities.standalone).toBe('0.4');
  });

  it('shows reveal button for password and toggles type', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-input type="password" is-revealable="true"></aegov-input>');
    let input = await page.find('aegov-input >>> input');
    expect(await input.getProperty('type')).toBe('password');
    const btn = await page.find('aegov-input >>> button.input__revealable');
    expect(btn).not.toBeNull();
    await btn.click();
    await page.waitForChanges();
    input = await page.find('aegov-input >>> input');
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
    const btn = await page.find('aegov-input >>> button.input__copy-btn');
    expect(btn).not.toBeNull();
    await btn.click();
    await page.waitForChanges();
    const updated = await page.find('aegov-input >>> button.input__copy-btn');
    expect(updated).toHaveClass('input__copy-btn--copied');
  });

  it('forwards aria and data attributes to native input', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-input aria-label="email" data-foo="bar"></aegov-input>');
    const input = await page.find('aegov-input >>> input');
    expect(input.getAttribute('aria-label')).toBe('email');
    expect(input.getAttribute('data-foo')).toBe('bar');
  });

  it('re-forwards pass-through attributes changed after load', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-input aria-label="email"></aegov-input>');
    await page.$eval('aegov-input', (el: HTMLElement) => {
      el.setAttribute('aria-label', 'work email');
      el.setAttribute('minlength', '3');
    });
    await page.waitForChanges();
    const input = await page.find('aegov-input >>> input');
    expect(input.getAttribute('aria-label')).toBe('work email');
    expect(input.getAttribute('minlength')).toBe('3');
  });

  it('reflects fieldId to native input id', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-input field-id="x1"></aegov-input>');
    const input = await page.find('aegov-input >>> input');
    expect(input.id).toBe('x1');
  });
});
