import { newE2EPage } from '@stencil/core/testing';

describe('aegov-separator e2e', () => {
  it('renders an <hr> by default', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-separator></aegov-separator>`);
    const hr = await page.find('aegov-separator hr');
    expect(hr).not.toBeNull();
    expect(hr.getAttribute('role')).toBe('presentation');
  });

  it('renders text variant when text prop is set', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-separator text="Or"></aegov-separator>`);
    const span = await page.find('aegov-separator .separator__text');
    expect(span).not.toBeNull();
    expect(span.textContent).toContain('Or');
    const hr = await page.find('aegov-separator hr');
    expect(hr).toBeNull();
  });

  it('vertical orientation reflects on attributes', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-separator orientation="vertical"></aegov-separator>`);
    const hr = await page.find('aegov-separator hr');
    // Decorative by default, so aria-orientation is omitted (only valid on role=separator).
    expect(hr.getAttribute('aria-orientation')).toBeNull();
    expect(hr.className).toContain('separator--vertical');
  });

  it('renders separator role when not decorative', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-separator is-decorative="false"></aegov-separator>`);
    const hr = await page.find('aegov-separator hr');
    expect(hr.getAttribute('role')).toBe('separator');
  });

  it('renders appearance class', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-separator appearance="light"></aegov-separator>`);
    const hr = await page.find('aegov-separator hr');
    expect(hr.className).toContain('separator-appearance-light');
  });

  it('renders variant class', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-separator variant="secondary"></aegov-separator>`);
    const hr = await page.find('aegov-separator hr');
    expect(hr.className).toContain('separator-variant-secondary');
  });

  it('renders slot content as the inline label', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-separator>OR</aegov-separator>`);
    const span = await page.find('aegov-separator .separator__text');
    expect(span).not.toBeNull();
    expect(span.textContent).toContain('OR');
  });
});
