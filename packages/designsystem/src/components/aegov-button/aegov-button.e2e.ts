import { newE2EPage } from '@stencil/core/testing';

describe('aegov-button e2e', () => {
  it('stays inline-block by default (not full width)', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-button>X</aegov-button>`);
    const display = await page.evaluate(() => getComputedStyle(document.querySelector('aegov-button')).display);
    expect(display).toBe('inline-block');
  });

  it('switches the host to display:block under is-full (regression test for issue #12 — selector checked [full] but the attribute is [is-full])', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-button is-full="true">X</aegov-button>`);
    const display = await page.evaluate(() => getComputedStyle(document.querySelector('aegov-button')).display);
    expect(display).toBe('block');
  });

  it('switches to display:block when isFull is set as a JS property, not just a string attribute (regression test for issue #12 — frameworks like Angular/React bind this as a property, which only reflect:true propagates to the attribute the CSS depends on)', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-button>X</aegov-button>`);
    await page.evaluate(() => {
      (document.querySelector('aegov-button') as any).isFull = true;
    });
    await page.waitForChanges();
    const display = await page.evaluate(() => getComputedStyle(document.querySelector('aegov-button')).display);
    expect(display).toBe('block');
  });

  it('renders the host element with native button', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-button>Click</aegov-button>`);
    const btn = await page.find('aegov-button >>> button');
    expect(btn).not.toBeNull();
    // The label is slotted light-DOM content, so it is not part of the shadow button's
    // own textContent — read it from the host.
    const host = await page.find('aegov-button');
    expect(host.textContent).toContain('Click');
  });

  it('emits aegovButtonClick when clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-button>Click</aegov-button>`);
    const host = await page.find('aegov-button');
    const spy = await host.spyOnEvent('aegovButtonClick');
    await (await page.find('aegov-button >>> button')).click();
    await page.waitForChanges();
    expect(spy).toHaveReceivedEventTimes(1);
  });

  it('does not emit click when disabled', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-button is-disabled="true">X</aegov-button>`);
    const host = await page.find('aegov-button');
    const spy = await host.spyOnEvent('aegovButtonClick');
    const btn = await page.find('aegov-button >>> button');
    await btn.click();
    await page.waitForChanges();
    expect(spy).toHaveReceivedEventTimes(0);
  });

  it('renders spinner when isLoading is set', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-button is-loading="true">Loading</aegov-button>`);
    const svg = await page.find('aegov-button >>> button svg');
    expect(svg).not.toBeNull();
    const btn = await page.find('aegov-button >>> button');
    expect(btn.getAttribute('aria-busy')).toBe('true');
  });

  it('keeps focus on the button while it is loading and after loading ends', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-button id="b">Save</aegov-button><aegov-button id="after">Next</aegov-button>`);
    const focusedId = () => page.evaluate(() => (document.activeElement as HTMLElement)?.id || document.activeElement?.tagName);
    await page.evaluate(() => (document.getElementById('b') as HTMLElement).focus());
    expect(await focusedId()).toBe('b');

    await page.$eval('#b', (el: any) => { el.isLoading = true; });
    await page.waitForChanges();
    expect(await focusedId()).toBe('b');
    const btn = await page.find('#b >>> button');
    expect(btn.getAttribute('aria-disabled')).toBe('true');
    expect(btn).not.toHaveAttribute('disabled');

    // Activation is ignored while loading.
    const spy = await page.spyOnEvent('aegovButtonClick');
    await page.keyboard.press('Enter');
    await page.waitForChanges();
    expect(spy).toHaveReceivedEventTimes(0);

    await page.$eval('#b', (el: any) => { el.isLoading = false; });
    await page.waitForChanges();
    expect(await focusedId()).toBe('b');
    expect(await page.find('#b >>> button')).not.toHaveAttribute('aria-disabled');
  });

  it('updates classes when variant prop changes at runtime', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-button variant="primary">X</aegov-button>`);
    const host = await page.find('aegov-button');
    host.setProperty('variant', 'danger');
    await page.waitForChanges();
    const btn = await page.find('aegov-button >>> button');
    expect(btn.className).toContain('btn-danger');
  });

  it('emits aegovButtonFocus when focused', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-button>X</aegov-button>`);
    const host = await page.find('aegov-button');
    const spy = await host.spyOnEvent('aegovButtonFocus');
    await page.$eval('aegov-button >>> button', (b: HTMLButtonElement) => b.focus());
    await page.waitForChanges();
    expect(spy).toHaveReceivedEventTimes(1);
  });

  it('passes through aria-label', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-button aria-label="Submit">X</aegov-button>`);
    const btn = await page.find('aegov-button >>> button');
    expect(btn.getAttribute('aria-label')).toBe('Submit');
  });
});
