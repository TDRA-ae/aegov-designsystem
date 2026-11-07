import { newE2EPage } from '@stencil/core/testing';

describe('aegov-navbar e2e', () => {
  it('renders nav with default label', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-navbar><aegov-navbar-item href="/">Home</aegov-navbar-item></aegov-navbar>`);
    const nav = await page.find('aegov-navbar nav');
    expect(nav).not.toBeNull();
    expect(nav.getAttribute('aria-label')).toBe('Main navigation');
  });

  it('renders all child navbar items', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-navbar>
        <aegov-navbar-item href="/">Home</aegov-navbar-item>
        <aegov-navbar-item href="/about">About</aegov-navbar-item>
        <aegov-navbar-item href="/contact">Contact</aegov-navbar-item>
      </aegov-navbar>
    `);
    const items = await page.findAll('aegov-navbar aegov-navbar-item');
    expect(items.length).toBe(3);
  });

  it('applies size="sm" class to nav', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-navbar size="sm"><aegov-navbar-item href="/">A</aegov-navbar-item></aegov-navbar>`);
    const nav = await page.find('aegov-navbar nav');
    expect(nav.className).toContain('aegov-navbar-sm');
  });

  it('uses custom labelNav prop', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-navbar label-nav="Primary nav"><aegov-navbar-item href="/">A</aegov-navbar-item></aegov-navbar>`);
    const nav = await page.find('aegov-navbar nav');
    expect(nav.getAttribute('aria-label')).toBe('Primary nav');
  });

  it('navigates between items with ArrowRight', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-navbar>
        <aegov-navbar-item href="/a">A</aegov-navbar-item>
        <aegov-navbar-item href="/b">B</aegov-navbar-item>
        <aegov-navbar-item href="/c">C</aegov-navbar-item>
      </aegov-navbar>
    `);
    await page.waitForChanges();
    await page.$eval('aegov-navbar a.aegov-navbar-item__link', (el: HTMLElement) => el.focus());
    await page.keyboard.press('ArrowRight');
    await page.waitForChanges();
    const focusedHref = await page.evaluate(() => (document.activeElement as HTMLAnchorElement)?.getAttribute('href'));
    expect(focusedHref).toBe('/b');
  });

  it('applies custom gap class to the list', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-navbar gap="gap-8"><aegov-navbar-item href="/">A</aegov-navbar-item></aegov-navbar>`);
    const list = await page.find('aegov-navbar .aegov-navbar-list');
    expect(list.className).toContain('gap-8');
  });
});
