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

  // Regression coverage for #56. The chevron's own CSS previously never set
  // any transform/rotate on open or close, despite the reference docs
  // claiming the rotation was part of the component's behaviour.
  it('rotates the dropdown chevron 180° while the sub-menu is open', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-navbar>
        <aegov-navbar-item href="/products">
          Products
          <aegov-dropdown slot="dropdown">
            <a slot="dropdown-content" href="/a">Item A</a>
          </aegov-dropdown>
        </aegov-navbar-item>
      </aegov-navbar>
    `);
    await page.waitForChanges();

    const chevron = await page.find('aegov-navbar-item button.aegov-navbar-item__chevron');
    expect(await chevron.getProperty('ariaExpanded')).toBe('false');

    const beforeRotate = await page.evaluate(() => {
      const svg = document.querySelector('button.aegov-navbar-item__chevron svg');
      return getComputedStyle(svg).rotate;
    });
    expect(beforeRotate).toBe('none');

    await chevron.click();
    await page.waitForChanges();

    expect(await chevron.getProperty('ariaExpanded')).toBe('true');
    const afterRotate = await page.evaluate(() => {
      const svg = document.querySelector('button.aegov-navbar-item__chevron svg');
      return getComputedStyle(svg).rotate;
    });
    expect(afterRotate).toBe('180deg');
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
