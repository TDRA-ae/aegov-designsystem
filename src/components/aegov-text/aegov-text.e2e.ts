import { newE2EPage } from '@stencil/core/testing';

describe('aegov-text e2e', () => {
  it('renders the host element', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-text>Hello</aegov-text>`);
    const el = await page.find('aegov-text');
    expect(el).not.toBeNull();
  });

  it('renders default slot content inside <p>', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-text>Hello world</aegov-text>`);
    const p = await page.find('aegov-text p');
    expect(p).not.toBeNull();
    expect(p.textContent).toContain('Hello world');
  });

  it('applies size="sm" class', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-text size="sm">x</aegov-text>`);
    const p = await page.find('aegov-text p');
    expect(p.className).toContain('text-sm');
  });

  it('applies size="lg" class', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-text size="lg">x</aegov-text>`);
    const p = await page.find('aegov-text p');
    expect(p.className).toContain('text-lg');
  });

  it('passes through aria-label and data-* attrs', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-text aria-label="lbl" data-x="1">x</aegov-text>`);
    const p = await page.find('aegov-text p');
    expect(p.getAttribute('aria-label')).toBe('lbl');
    expect(p.getAttribute('data-x')).toBe('1');
  });

  it('updates class when size prop changes at runtime', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-text size="sm">x</aegov-text>`);
    const host = await page.find('aegov-text');
    host.setProperty('size', 'lg');
    await page.waitForChanges();
    const p = await page.find('aegov-text p');
    expect(p.className).toContain('text-lg');
  });
});
