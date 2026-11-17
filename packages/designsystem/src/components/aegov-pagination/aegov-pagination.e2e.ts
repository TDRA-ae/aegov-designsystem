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

  // A11Y-FINAL-14 (WCAG 2.5.3): the name of First/Previous/Next/Last is the visible label.
  describe('nav buttons are named by their visible label', () => {
    const names = async (page) => {
      const snap = await page.accessibility.snapshot({ interestingOnly: true });
      const out: string[] = [];
      const walk = (n) => { if (n?.role === 'button') out.push(n.name); (n?.children ?? []).forEach(walk); };
      walk(snap);
      return out;
    };

    it('custom labels', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-pagination pages="5" page-current="3" is-enabled-first-last="true" label-first="Start" label-prev="Back" label-next="Forward" label-last="End"></aegov-pagination>`);
      await page.waitForChanges();
      const n = await names(page);
      expect([n[0], n[1], n[n.length - 2], n[n.length - 1]]).toEqual(['Start', 'Back', 'Forward', 'End']);
      expect(n).toContain('Go to page 2');
    });

    it('default labels, English and Arabic', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-pagination pages="5" page-current="3"></aegov-pagination><div dir="rtl" lang="ar"><aegov-pagination pages="5" page-current="3"></aegov-pagination></div>`);
      await page.waitForChanges();
      const n = await names(page);
      expect(n).toEqual(expect.arrayContaining(['Previous', 'Next', 'السابق', 'التالي']));
    });
  });
});
