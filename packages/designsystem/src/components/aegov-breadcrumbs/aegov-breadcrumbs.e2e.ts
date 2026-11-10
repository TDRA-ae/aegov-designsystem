import { newE2EPage } from '@stencil/core/testing';

describe('aegov-breadcrumbs e2e', () => {
  it('makes the list a flex container (regression test for issue #17 — CSS selector targeted nav.aegov-breadcrumb, singular, but the rendered class is plural)', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-breadcrumbs>
        <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
        <aegov-breadcrumbs-item>Current</aegov-breadcrumbs-item>
      </aegov-breadcrumbs>
    `);
    const display = await page.evaluate(() => {
      const list = document.querySelector('aegov-breadcrumbs .breadcrumb__list');
      return getComputedStyle(list).display;
    });
    expect(display).toBe('flex');
  });

  it('renders the host with nav landmark', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-breadcrumbs>
        <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
        <aegov-breadcrumbs-item>Current</aegov-breadcrumbs-item>
      </aegov-breadcrumbs>
    `);
    const nav = await page.find('aegov-breadcrumbs nav');
    expect(nav).not.toBeNull();
    expect(nav.getAttribute('aria-label')).toBe('Breadcrumb');
  });

  it('renders breadcrumb items as <li> elements', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-breadcrumbs>
        <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
        <aegov-breadcrumbs-item href="/p">Page</aegov-breadcrumbs-item>
        <aegov-breadcrumbs-item>Last</aegov-breadcrumbs-item>
      </aegov-breadcrumbs>
    `);
    const items = await page.findAll('aegov-breadcrumbs [role="listitem"]');
    expect(items.length).toBe(3);
  });

  it('renders separator slashes by default', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-breadcrumbs>
        <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
        <aegov-breadcrumbs-item>Last</aegov-breadcrumbs-item>
      </aegov-breadcrumbs>
    `);
    const sep = await page.find('aegov-breadcrumbs span.breadcrumb__separator');
    expect(sep).not.toBeNull();
    expect(sep.textContent).toBe('/');
  });

  it('renders chevron separator when separator="chevron"', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-breadcrumbs separator="chevron">
        <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
        <aegov-breadcrumbs-item>Last</aegov-breadcrumbs-item>
      </aegov-breadcrumbs>
    `);
    const svg = await page.find('aegov-breadcrumbs svg.breadcrumb__separator');
    expect(svg).not.toBeNull();
  });

  it('marks the last item with aria-current="page"', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-breadcrumbs>
        <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
        <aegov-breadcrumbs-item>Current</aegov-breadcrumbs-item>
      </aegov-breadcrumbs>
    `);
    const current = await page.find('aegov-breadcrumbs span.breadcrumb-current');
    expect(current.getAttribute('aria-current')).toBe('page');
  });

  it('updates children when separator changes at runtime', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-breadcrumbs>
        <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
        <aegov-breadcrumbs-item>Last</aegov-breadcrumbs-item>
      </aegov-breadcrumbs>
    `);
    const host = await page.find('aegov-breadcrumbs');
    host.setProperty('separator', 'chevron');
    await page.waitForChanges();
    const svg = await page.find('aegov-breadcrumbs svg.breadcrumb__separator');
    expect(svg).not.toBeNull();
  });
});
