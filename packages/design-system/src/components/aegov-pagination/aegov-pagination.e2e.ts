import { newE2EPage } from '@stencil/core/testing';

describe('aegov-pagination e2e', () => {
  it('renders nav with aria-label="Pagination"', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-pagination pages="5" page-current="1"></aegov-pagination>`);
    const nav = await page.find('aegov-pagination nav');
    expect(nav).not.toBeNull();
    expect(nav.getAttribute('aria-label')).toBe('Pagination');
  });

  it('renders page buttons for default variant', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-pagination pages="5" page-current="2"></aegov-pagination>`);
    const buttons = await page.findAll('aegov-pagination button.pagination__btn--page');
    expect(buttons.length).toBe(5);
  });

  it('emits aegovPaginationPageChange when clicking a page', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-pagination pages="5" page-current="1"></aegov-pagination>`);
    const host = await page.find('aegov-pagination');
    const spy = await host.spyOnEvent('aegovPaginationPageChange');
    const buttons = await page.findAll('aegov-pagination button.pagination__btn--page');
    await buttons[2].click();
    await page.waitForChanges();
    expect(spy).toHaveReceivedEventTimes(1);
    expect(spy.lastEvent.detail).toBe(3);
  });

  it('disables Previous button on first page', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-pagination pages="5" page-current="1"></aegov-pagination>`);
    const navs = await page.findAll('aegov-pagination button.pagination__btn--nav');
    expect(await navs[0].getProperty('disabled')).toBe(true);
  });

  it('renders compact variant with indicator', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-pagination pages="10" page-current="4" variant="compact"></aegov-pagination>`);
    const indicator = await page.find('aegov-pagination .pagination__compact-indicator');
    expect(indicator).not.toBeNull();
    expect(indicator.textContent).toContain('4');
    expect(indicator.textContent).toContain('10');
  });

  it('updates active page when pageCurrent changes', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-pagination pages="5" page-current="1"></aegov-pagination>`);
    const host = await page.find('aegov-pagination');
    host.setProperty('pageCurrent', 3);
    await page.waitForChanges();
    const active = await page.find('aegov-pagination button.pagination__btn--active');
    expect(active.textContent).toBe('3');
  });

  it('renders First/Last buttons when isEnabledFirstLast set', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-pagination pages="5" page-current="3" is-enabled-first-last="true"></aegov-pagination>`);
    const navs = await page.findAll('aegov-pagination button.pagination__btn--nav');
    expect(navs.length).toBe(4);
  });
});
