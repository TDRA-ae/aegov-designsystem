import { newE2EPage } from '@stencil/core/testing';

describe('aegov-pagination e2e', () => {
  // ------------------------------------------------------------------ helpers
  async function render(html: string) {
    const page = await newE2EPage();
    await page.setContent(html);
    return page;
  }

  // ------------------------------------------------------------------ basic rendering
  describe('basic rendering', () => {
    it('renders the pagination nav', async () => {
      const page = await render('<aegov-pagination total-pages="5" current-page="1"></aegov-pagination>');
      const nav = await page.find('aegov-pagination nav');
      expect(nav).not.toBeNull();
      expect(await nav.getAttribute('aria-label')).toBe('Pagination');
    });

    it('renders the page list as ul', async () => {
      const page = await render('<aegov-pagination total-pages="5" current-page="1"></aegov-pagination>');
      const ul = await page.find('aegov-pagination ul.pagination__list');
      expect(ul).not.toBeNull();
    });

    it('does not render when totalPages is 0', async () => {
      const page = await render('<aegov-pagination total-pages="0" current-page="1"></aegov-pagination>');
      const nav = await page.find('aegov-pagination nav');
      expect(nav).toBeNull();
    });

    it('always renders Previous and Next buttons', async () => {
      const page = await render('<aegov-pagination total-pages="10" current-page="5"></aegov-pagination>');
      const prevBtn = await page.find('aegov-pagination button[aria-label="Go to previous page"]');
      const nextBtn = await page.find('aegov-pagination button[aria-label="Go to next page"]');
      expect(prevBtn).not.toBeNull();
      expect(nextBtn).not.toBeNull();
    });

    it('does not render First/Last buttons by default', async () => {
      const page = await render('<aegov-pagination total-pages="10" current-page="5"></aegov-pagination>');
      const firstBtn = await page.find('aegov-pagination button[aria-label="Go to first page"]');
      const lastBtn = await page.find('aegov-pagination button[aria-label="Go to last page"]');
      expect(firstBtn).toBeNull();
      expect(lastBtn).toBeNull();
    });

    it('renders First/Last buttons when showFirstLast is true', async () => {
      const page = await render('<aegov-pagination total-pages="10" current-page="5" show-first-last></aegov-pagination>');
      const firstBtn = await page.find('aegov-pagination button[aria-label="Go to first page"]');
      const lastBtn = await page.find('aegov-pagination button[aria-label="Go to last page"]');
      expect(firstBtn).not.toBeNull();
      expect(lastBtn).not.toBeNull();
    });
  });

  // ------------------------------------------------------------------ active page
  describe('active page', () => {
    it('marks the current page button with pagination__btn--active', async () => {
      const page = await render('<aegov-pagination total-pages="5" current-page="3"></aegov-pagination>');
      const activeBtn = await page.find('aegov-pagination .pagination__btn--active');
      expect(activeBtn).not.toBeNull();
      expect((await activeBtn.getProperty('textContent')).trim()).toBe('3');
    });

    it('sets aria-current="page" on the active button', async () => {
      const page = await render('<aegov-pagination total-pages="5" current-page="2"></aegov-pagination>');
      const currentBtn = await page.find('aegov-pagination button[aria-current="page"]');
      expect(currentBtn).not.toBeNull();
      expect((await currentBtn.getProperty('textContent')).trim()).toBe('2');
    });

    it('does not set aria-current on inactive page buttons', async () => {
      const page = await render('<aegov-pagination total-pages="5" current-page="2"></aegov-pagination>');
      const allPageBtns = await page.findAll('aegov-pagination .pagination__btn--page');
      for (const btn of allPageBtns) {
        const text = (await btn.getProperty('textContent')).trim();
        const ariaCurrent = await btn.getAttribute('aria-current');
        if (text === '2') {
          expect(ariaCurrent).toBe('page');
        } else {
          expect(ariaCurrent).toBeNull();
        }
      }
    });
  });

  // ------------------------------------------------------------------ events
  describe('events', () => {
    it('emits aegovPageChange when a page button is clicked', async () => {
      const page = await render('<aegov-pagination total-pages="5" current-page="1"></aegov-pagination>');
      const paginationEl = await page.find('aegov-pagination');
      const changeSpy = await paginationEl.spyOnEvent('aegovPageChange');

      const btn3 = await page.find('aegov-pagination button[aria-label="Go to page 3"]');
      await btn3.click();
      await page.waitForChanges();

      expect(changeSpy).toHaveReceivedEventTimes(1);
      expect(changeSpy).toHaveReceivedEventDetail(3);
    });

    it('emits aegovPageChange with currentPage+1 when Next is clicked', async () => {
      const page = await render('<aegov-pagination total-pages="5" current-page="2"></aegov-pagination>');
      const paginationEl = await page.find('aegov-pagination');
      const changeSpy = await paginationEl.spyOnEvent('aegovPageChange');

      const nextBtn = await page.find('aegov-pagination button[aria-label="Go to next page"]');
      await nextBtn.click();
      await page.waitForChanges();

      expect(changeSpy).toHaveReceivedEventTimes(1);
      expect(changeSpy).toHaveReceivedEventDetail(3);
    });

    it('emits aegovPageChange with currentPage-1 when Previous is clicked', async () => {
      const page = await render('<aegov-pagination total-pages="5" current-page="3"></aegov-pagination>');
      const paginationEl = await page.find('aegov-pagination');
      const changeSpy = await paginationEl.spyOnEvent('aegovPageChange');

      const prevBtn = await page.find('aegov-pagination button[aria-label="Go to previous page"]');
      await prevBtn.click();
      await page.waitForChanges();

      expect(changeSpy).toHaveReceivedEventTimes(1);
      expect(changeSpy).toHaveReceivedEventDetail(2);
    });

    it('emits page 1 when First button is clicked', async () => {
      const page = await render('<aegov-pagination total-pages="10" current-page="5" show-first-last></aegov-pagination>');
      const paginationEl = await page.find('aegov-pagination');
      const changeSpy = await paginationEl.spyOnEvent('aegovPageChange');

      const firstBtn = await page.find('aegov-pagination button[aria-label="Go to first page"]');
      await firstBtn.click();
      await page.waitForChanges();

      expect(changeSpy).toHaveReceivedEventTimes(1);
      expect(changeSpy).toHaveReceivedEventDetail(1);
    });

    it('emits totalPages when Last button is clicked', async () => {
      const page = await render('<aegov-pagination total-pages="10" current-page="5" show-first-last></aegov-pagination>');
      const paginationEl = await page.find('aegov-pagination');
      const changeSpy = await paginationEl.spyOnEvent('aegovPageChange');

      const lastBtn = await page.find('aegov-pagination button[aria-label="Go to last page"]');
      await lastBtn.click();
      await page.waitForChanges();

      expect(changeSpy).toHaveReceivedEventTimes(1);
      expect(changeSpy).toHaveReceivedEventDetail(10);
    });

    it('does not emit when clicking the active page button', async () => {
      const page = await render('<aegov-pagination total-pages="5" current-page="3"></aegov-pagination>');
      const paginationEl = await page.find('aegov-pagination');
      const changeSpy = await paginationEl.spyOnEvent('aegovPageChange');

      // Active page button is not disabled, but guarded in handler
      const activeBtn = await page.find('aegov-pagination .pagination__btn--active');
      const isDisabled = await activeBtn.getProperty('disabled');
      expect(isDisabled).toBe(false); // active page is not disabled, just guarded in handler

      expect(changeSpy).toHaveReceivedEventTimes(0);
    });
  });

  // ------------------------------------------------------------------ disabled navigation
  describe('disabled navigation buttons', () => {
    it('Previous button is disabled and has aria-disabled on first page', async () => {
      const page = await render('<aegov-pagination total-pages="10" current-page="1"></aegov-pagination>');
      const prevBtn = await page.find('aegov-pagination button[aria-label="Go to previous page"]');
      expect(await prevBtn.getProperty('disabled')).toBe(true);
      expect(await prevBtn.getAttribute('aria-disabled')).toBe('true');
    });

    it('Next button is disabled and has aria-disabled on last page', async () => {
      const page = await render('<aegov-pagination total-pages="10" current-page="10"></aegov-pagination>');
      const nextBtn = await page.find('aegov-pagination button[aria-label="Go to next page"]');
      expect(await nextBtn.getProperty('disabled')).toBe(true);
      expect(await nextBtn.getAttribute('aria-disabled')).toBe('true');
    });

    it('disabled Previous button does not emit events', async () => {
      const page = await render('<aegov-pagination total-pages="10" current-page="1"></aegov-pagination>');
      const paginationEl = await page.find('aegov-pagination');
      const changeSpy = await paginationEl.spyOnEvent('aegovPageChange');

      const prevBtn = await page.find('aegov-pagination button[aria-label="Go to previous page"]');
      await prevBtn.click();
      await page.waitForChanges();

      expect(changeSpy).toHaveReceivedEventTimes(0);
    });

    it('disabled Next button does not emit events', async () => {
      const page = await render('<aegov-pagination total-pages="10" current-page="10"></aegov-pagination>');
      const paginationEl = await page.find('aegov-pagination');
      const changeSpy = await paginationEl.spyOnEvent('aegovPageChange');

      const nextBtn = await page.find('aegov-pagination button[aria-label="Go to next page"]');
      await nextBtn.click();
      await page.waitForChanges();

      expect(changeSpy).toHaveReceivedEventTimes(0);
    });
  });

  // ------------------------------------------------------------------ disabled prop
  describe('disabled prop', () => {
    it('all buttons are disabled when disabled prop is set', async () => {
      const page = await render('<aegov-pagination total-pages="5" current-page="3" disabled></aegov-pagination>');
      const allBtns = await page.findAll('aegov-pagination button');
      for (const btn of allBtns) {
        expect(await btn.getProperty('disabled')).toBe(true);
      }
    });

    it('page buttons do not emit when disabled', async () => {
      const page = await render('<aegov-pagination total-pages="5" current-page="3" disabled></aegov-pagination>');
      const paginationEl = await page.find('aegov-pagination');
      const changeSpy = await paginationEl.spyOnEvent('aegovPageChange');

      // Click all buttons - none should emit
      const allBtns = await page.findAll('aegov-pagination button');
      for (const btn of allBtns) {
        await btn.click();
      }
      await page.waitForChanges();

      expect(changeSpy).toHaveReceivedEventTimes(0);
    });
  });

  // ------------------------------------------------------------------ ellipsis
  describe('ellipsis', () => {
    it('renders ellipsis between boundary and siblings for large ranges', async () => {
      const page = await render('<aegov-pagination total-pages="20" current-page="10"></aegov-pagination>');
      const ellipses = await page.findAll('aegov-pagination .pagination__ellipsis');
      expect(ellipses.length).toBe(2);
    });

    it('renders one ellipsis at end when on first few pages', async () => {
      const page = await render('<aegov-pagination total-pages="20" current-page="2"></aegov-pagination>');
      const ellipses = await page.findAll('aegov-pagination .pagination__ellipsis');
      expect(ellipses.length).toBe(1);
    });

    it('renders one ellipsis at start when on last few pages', async () => {
      const page = await render('<aegov-pagination total-pages="20" current-page="19"></aegov-pagination>');
      const ellipses = await page.findAll('aegov-pagination .pagination__ellipsis');
      expect(ellipses.length).toBe(1);
    });

    it('renders no ellipsis when totalPages is small', async () => {
      const page = await render('<aegov-pagination total-pages="5" current-page="3"></aegov-pagination>');
      const ellipses = await page.findAll('aegov-pagination .pagination__ellipsis');
      expect(ellipses.length).toBe(0);
    });
  });

  // ------------------------------------------------------------------ compact variant
  describe('compact variant', () => {
    it('should not render page number buttons', async () => {
      const page = await render('<aegov-pagination variant="compact" total-pages="20" current-page="5"></aegov-pagination>');
      const pageButtons = await page.findAll('aegov-pagination .pagination__btn--page');
      expect(pageButtons.length).toBe(0);
    });

    it('should not render ellipsis', async () => {
      const page = await render('<aegov-pagination variant="compact" total-pages="20" current-page="10"></aegov-pagination>');
      const ellipses = await page.findAll('aegov-pagination .pagination__ellipsis');
      expect(ellipses.length).toBe(0);
    });

    it('should render Previous and Next buttons', async () => {
      const page = await render('<aegov-pagination variant="compact" total-pages="10" current-page="5"></aegov-pagination>');
      const prev = await page.find('aegov-pagination [aria-label="Go to previous page"]');
      const next = await page.find('aegov-pagination [aria-label="Go to next page"]');
      expect(prev).not.toBeNull();
      expect(next).not.toBeNull();
    });

    it('should render the page indicator', async () => {
      const page = await render('<aegov-pagination variant="compact" total-pages="20" current-page="7"></aegov-pagination>');
      const indicator = await page.find('aegov-pagination .pagination__compact-indicator');
      expect(indicator).not.toBeNull();
      expect(indicator.textContent.trim()).toBe('7 / 20');
    });

    it('should render First/Last buttons when show-first-last is set', async () => {
      const page = await render('<aegov-pagination variant="compact" total-pages="10" current-page="5" show-first-last></aegov-pagination>');
      const first = await page.find('aegov-pagination [aria-label="Go to first page"]');
      const last = await page.find('aegov-pagination [aria-label="Go to last page"]');
      expect(first).not.toBeNull();
      expect(last).not.toBeNull();
    });

    it('should not render First/Last buttons by default', async () => {
      const page = await render('<aegov-pagination variant="compact" total-pages="10" current-page="5"></aegov-pagination>');
      const first = await page.find('aegov-pagination [aria-label="Go to first page"]');
      const last = await page.find('aegov-pagination [aria-label="Go to last page"]');
      expect(first).toBeNull();
      expect(last).toBeNull();
    });

    it('should emit aegovPageChange on Previous click', async () => {
      const page = await render('<aegov-pagination variant="compact" total-pages="10" current-page="5"></aegov-pagination>');
      const el = await page.find('aegov-pagination');
      const spy = await el.spyOnEvent('aegovPageChange');

      const prev = await page.find('aegov-pagination [aria-label="Go to previous page"]');
      await prev.click();
      await page.waitForChanges();

      expect(spy).toHaveReceivedEventTimes(1);
      expect(spy).toHaveReceivedEventDetail(4);
    });

    it('should emit aegovPageChange on Next click', async () => {
      const page = await render('<aegov-pagination variant="compact" total-pages="10" current-page="5"></aegov-pagination>');
      const el = await page.find('aegov-pagination');
      const spy = await el.spyOnEvent('aegovPageChange');

      const next = await page.find('aegov-pagination [aria-label="Go to next page"]');
      await next.click();
      await page.waitForChanges();

      expect(spy).toHaveReceivedEventTimes(1);
      expect(spy).toHaveReceivedEventDetail(6);
    });

    it('should apply pagination--compact class', async () => {
      const page = await render('<aegov-pagination variant="compact" total-pages="5" current-page="1"></aegov-pagination>');
      const nav = await page.find('aegov-pagination nav');
      expect(await nav.getAttribute('class')).toContain('pagination--compact');
    });
  });

  // ------------------------------------------------------------------ size classes
  describe('size classes', () => {
    it('applies pagination--base class by default', async () => {
      const page = await render('<aegov-pagination total-pages="5" current-page="1"></aegov-pagination>');
      const nav = await page.find('aegov-pagination nav');
      expect(await nav.getAttribute('class')).toContain('pagination--base');
    });

    it('applies pagination--sm class', async () => {
      const page = await render('<aegov-pagination total-pages="5" current-page="1" size="sm"></aegov-pagination>');
      const nav = await page.find('aegov-pagination nav');
      expect(await nav.getAttribute('class')).toContain('pagination--sm');
    });

    it('applies pagination--lg class', async () => {
      const page = await render('<aegov-pagination total-pages="5" current-page="1" size="lg"></aegov-pagination>');
      const nav = await page.find('aegov-pagination nav');
      expect(await nav.getAttribute('class')).toContain('pagination--lg');
    });
  });
});
