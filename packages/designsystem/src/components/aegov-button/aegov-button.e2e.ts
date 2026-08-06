import { newE2EPage } from '@stencil/core/testing';

describe('aegov-button e2e', () => {
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
