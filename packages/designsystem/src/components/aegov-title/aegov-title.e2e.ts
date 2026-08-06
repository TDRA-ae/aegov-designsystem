import { newE2EPage } from '@stencil/core/testing';

describe('aegov-title e2e', () => {
  it('renders the host', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-title>Hello</aegov-title>`);
    const el = await page.find('aegov-title');
    expect(el).not.toBeNull();
  });

  it('renders <p> by default and auto-generates an id', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-title>Hello</aegov-title>`);
    const p = await page.find('aegov-title p');
    expect(p).not.toBeNull();
    expect(p.id).toMatch(/^aegov-title-\d+$/);
  });

  it('renders the heading tag specified by heading-type', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-title heading-type="h2">x</aegov-title>`);
    const h2 = await page.find('aegov-title h2');
    expect(h2).not.toBeNull();
  });

  it('reflects field-id attribute onto inner element id', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-title field-id="hero-title">x</aegov-title>`);
    const p = await page.find('aegov-title p');
    expect(p.id).toBe('hero-title');
  });

  it('applies size="lg" class', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-title size="lg">x</aegov-title>`);
    const p = await page.find('aegov-title p');
    expect(p.className).toContain('text-lg!');
  });

  it('passes through data-* and aria-*', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-title aria-label="lbl" data-x="1">x</aegov-title>`);
    const p = await page.find('aegov-title p');
    expect(p.getAttribute('aria-label')).toBe('lbl');
    expect(p.getAttribute('data-x')).toBe('1');
  });
});
