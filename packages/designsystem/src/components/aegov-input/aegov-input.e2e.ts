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

  // Opacity the user sees: product of opacities up the flat tree.
  const effectiveOpacity = (page: any, hostSelector: string, selector: string) => page.evaluate((hostSelector: string, selector: string) => {
    const host = document.querySelector(hostSelector) as any;
    let node: any = selector === ':host' ? host : (host.shadowRoot.querySelector(selector) || host.querySelector(selector));
    let o = 1;
    while (node) {
      if (node.nodeType === 1) o *= parseFloat(getComputedStyle(node).opacity);
      node = node.assignedSlot || node.parentNode || node.host;
    }
    return Math.round(o * 100) / 100;
  }, hostSelector, selector);

  // Regression coverage for #50: inside aegov-input-group only the group dims
  // (0.4), the grouped input doesn't add its own (0.4 × 0.4 = 0.16).
  it('is dimmed once inside a group, and dims itself standalone (#50)', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-input-group>
        <aegov-input id="grouped" is-disabled="true"></aegov-input>
      </aegov-input-group>
      <aegov-input id="standalone" is-disabled="true"></aegov-input>
    `);
    await page.waitForChanges();
    expect(await effectiveOpacity(page, '#grouped', '.aegov-input')).toBe(0.4);
    expect(await effectiveOpacity(page, '#standalone', '.aegov-input')).toBe(0.4);
  });

  it('disabled dims slotted icons and the reveal button with the input', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-input id="i" type="password" is-revealable="true" is-disabled="true">
        <svg slot="icon-start" viewBox="0 0 24 24"><rect width="24" height="24"/></svg>
      </aegov-input>
    `);
    await page.waitForChanges();
    expect(await effectiveOpacity(page, '#i', '.aegov-input')).toBe(0.4);
    expect(await effectiveOpacity(page, '#i', '[slot="icon-start"]')).toBe(0.4);
    expect(await effectiveOpacity(page, '#i', '.input__revealable')).toBe(0.4);
  });

  it('end padding clears the reveal / copy button at every size', async () => {
    const page = await newE2EPage();
    await page.setContent(['xs', 'sm', 'base', 'lg', 'xl']
      .map(size => `<aegov-input size="${size}" type="password" is-revealable="true"></aegov-input>`).join(''));
    await page.waitForChanges();
    const rows = await page.evaluate(() => Array.from(document.querySelectorAll('aegov-input')).map((el: any) => {
      const input = el.shadowRoot.querySelector('.aegov-input');
      const btn = el.shadowRoot.querySelector('.input__revealable');
      return { padding: parseFloat(getComputedStyle(input).paddingInlineEnd), button: btn.getBoundingClientRect().width };
    }));
    for (const row of rows) expect(row.padding).toBeGreaterThanOrEqual(row.button);
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
