import { newE2EPage } from '@stencil/core/testing';

describe('aegov-navbar-item e2e', () => {
  it('renders link when href provided', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-navbar><aegov-navbar-item href="/x">Item</aegov-navbar-item></aegov-navbar>`);
    const a = await page.find('aegov-navbar-item a');
    expect(a).not.toBeNull();
    expect(a.getAttribute('href')).toBe('/x');
  });

  it('renders span when no href', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-navbar><aegov-navbar-item>Plain</aegov-navbar-item></aegov-navbar>`);
    const span = await page.find('aegov-navbar-item span.aegov-navbar-item__link');
    expect(span).not.toBeNull();
  });

  it('marks active item with aria-current', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-navbar><aegov-navbar-item href="/" is-active="true">A</aegov-navbar-item></aegov-navbar>`);
    const a = await page.find('aegov-navbar-item a');
    expect(a.getAttribute('aria-current')).toBe('page');
  });

  it('renders disabled item with aria-disabled', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-navbar><aegov-navbar-item is-disabled="true">D</aegov-navbar-item></aegov-navbar>`);
    const span = await page.find('aegov-navbar-item span.aegov-navbar-item__link');
    expect(span.getAttribute('aria-disabled')).toBe('true');
  });

  it('renders icon-start slot content', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-navbar><aegov-navbar-item href="/x"><svg slot="icon-start" data-icon></svg>Page</aegov-navbar-item></aegov-navbar>`);
    const iconWrap = await page.find('aegov-navbar-item .aegov-navbar-item__icon');
    expect(iconWrap).not.toBeNull();
  });

  it('reflects size class on host li', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-navbar size="lg"><aegov-navbar-item href="/">X</aegov-navbar-item></aegov-navbar>`);
    await page.waitForChanges();
    const li = await page.find('aegov-navbar-item li');
    expect(li.className).toContain('aegov-navbar-item--lg');
  });
});
