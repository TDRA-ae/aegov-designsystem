import { newE2EPage } from '@stencil/core/testing';

describe('aegov-separator E2E', () => {
  it('should render', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-separator></aegov-separator>`);

    const element = await page.find('aegov-separator');
    expect(element).not.toBeNull();
  });

  it('should render horizontal separator by default', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-separator></aegov-separator>`);

    const hr = await page.find('aegov-separator >>> hr');
    const className = await hr.getProperty('className');
    expect(className).toContain('separator--horizontal');
  });

  it('should render vertical separator', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-separator orientation="vertical"></aegov-separator>`);

    const hr = await page.find('aegov-separator >>> hr');
    const className = await hr.getProperty('className');
    expect(className).toContain('separator--vertical');
  });

  it('should render subtle variant', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-separator variant="subtle"></aegov-separator>`);

    const hr = await page.find('aegov-separator >>> hr');
    const className = await hr.getProperty('className');
    expect(className).toContain('separator--subtle');
  });

  it('should render text in separator', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-separator text="or"></aegov-separator>`);

    const text = await page.find('aegov-separator >>> .separator__text');
    expect(text).not.toBeNull();
    expect(text.textContent).toBe('or');
  });

  it('should render slot content', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-separator>OR</aegov-separator>`);

    const text = await page.find('aegov-separator >>> .separator__text');
    expect(text).not.toBeNull();
  });

  it('should render separator lines with text', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-separator text="or"></aegov-separator>`);

    const lines = await page.findAll('aegov-separator >>> .separator__line');
    expect(lines.length).toBe(2);
  });

  it('should have correct ARIA role when decorative', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-separator decorative></aegov-separator>`);

    const hr = await page.find('aegov-separator >>> hr');
    const role = await hr.getAttribute('role');
    expect(role).toBe('presentation');
  });

  it('should have correct ARIA role when not decorative', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-separator decorative="false"></aegov-separator>`);

    const hr = await page.find('aegov-separator >>> hr');
    const role = await hr.getAttribute('role');
    expect(role).toBe('separator');
  });

  it('should have correct aria-orientation attribute', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-separator orientation="vertical"></aegov-separator>`);

    const hr = await page.find('aegov-separator >>> hr');
    const ariaOrientation = await hr.getAttribute('aria-orientation');
    expect(ariaOrientation).toBe('vertical');
  });
});
