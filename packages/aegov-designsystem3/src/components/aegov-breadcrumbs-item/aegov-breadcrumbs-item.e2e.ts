import { newE2EPage } from '@stencil/core/testing';

describe('aegov-breadcrumbs-item e2e', () => {
  it('renders link when href provided', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-breadcrumbs>
        <aegov-breadcrumbs-item href="/home">Home</aegov-breadcrumbs-item>
        <aegov-breadcrumbs-item>Last</aegov-breadcrumbs-item>
      </aegov-breadcrumbs>
    `);
    const a = await page.find('aegov-breadcrumbs-item a');
    expect(a).not.toBeNull();
    expect(a.getAttribute('href')).toBe('/home');
  });

  it('renders plain text when no href', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-breadcrumbs>
        <aegov-breadcrumbs-item>Current</aegov-breadcrumbs-item>
      </aegov-breadcrumbs>
    `);
    const span = await page.find('aegov-breadcrumbs-item .breadcrumb-current');
    expect(span).not.toBeNull();
    expect(span.getAttribute('aria-current')).toBe('page');
  });

  it('emits aegovBreadcrumbItemClick when clicked', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-breadcrumbs>
        <aegov-breadcrumbs-item href="javascript:void(0)">Home</aegov-breadcrumbs-item>
        <aegov-breadcrumbs-item>Last</aegov-breadcrumbs-item>
      </aegov-breadcrumbs>
    `);
    const item = await page.find('aegov-breadcrumbs-item');
    const spy = await item.spyOnEvent('aegovBreadcrumbItemClick');
    const link = await page.find('aegov-breadcrumbs-item a');
    await link.click();
    await page.waitForChanges();
    expect(spy).toHaveReceivedEventTimes(1);
  });

  it('truncates text when maxLength provided', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-breadcrumbs max-length="6">
        <aegov-breadcrumbs-item>SuperLongTitle</aegov-breadcrumbs-item>
      </aegov-breadcrumbs>
    `);
    const item = await page.find('aegov-breadcrumbs-item');
    expect(item.textContent).toContain('…');
  });

  it('forwards rel and target attributes', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-breadcrumbs>
        <aegov-breadcrumbs-item href="/x" rel="noopener" target="_blank">X</aegov-breadcrumbs-item>
        <aegov-breadcrumbs-item>Last</aegov-breadcrumbs-item>
      </aegov-breadcrumbs>
    `);
    const a = await page.find('aegov-breadcrumbs-item a');
    expect(a.getAttribute('target')).toBe('_blank');
    expect(a.getAttribute('rel')).toBe('noopener');
  });
});
