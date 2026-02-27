import { newSpecPage } from '@stencil/core/testing';
import { AegovPagination } from './aegov-pagination';

describe('aegov-pagination', () => {
  // ------------------------------------------------------------------ helpers
  async function render(html: string) {
    return newSpecPage({ components: [AegovPagination], html });
  }

  function getPageButtons(root: HTMLElement) {
    return Array.from(root.querySelectorAll('.pagination__btn--page')) as HTMLButtonElement[];
  }

  function getNavButton(root: HTMLElement, ariaLabel: string): HTMLButtonElement | null {
    return root.querySelector(`button[aria-label="${ariaLabel}"]`);
  }

  // ------------------------------------------------------------------ rendering
  describe('rendering', () => {
    it('should render the nav element with aria-label', async () => {
      const page = await render('<aegov-pagination total-pages="5" current-page="1"></aegov-pagination>');
      const nav = page.root.querySelector('nav');
      expect(nav).toBeTruthy();
      expect(nav.getAttribute('aria-label')).toBe('Pagination');
    });

    it('should render the list as a ul', async () => {
      const page = await render('<aegov-pagination total-pages="5" current-page="1"></aegov-pagination>');
      const ul = page.root.querySelector('ul.pagination__list');
      expect(ul).toBeTruthy();
    });

    it('should render page buttons', async () => {
      const page = await render('<aegov-pagination total-pages="5" current-page="3"></aegov-pagination>');
      const buttons = getPageButtons(page.root);
      expect(buttons.length).toBeGreaterThan(0);
    });

    it('should return null when totalPages is 0', async () => {
      const page = await render('<aegov-pagination total-pages="0" current-page="1"></aegov-pagination>');
      const nav = page.root.querySelector('nav');
      expect(nav).toBeFalsy();
    });

    it('should return null when totalPages is negative', async () => {
      const page = await render('<aegov-pagination total-pages="-1" current-page="1"></aegov-pagination>');
      const nav = page.root.querySelector('nav');
      expect(nav).toBeFalsy();
    });

    it('should always render Previous and Next buttons', async () => {
      const page = await render('<aegov-pagination total-pages="10" current-page="5"></aegov-pagination>');
      expect(getNavButton(page.root, 'Go to previous page')).toBeTruthy();
      expect(getNavButton(page.root, 'Go to next page')).toBeTruthy();
    });

    it('should not render First and Last buttons by default', async () => {
      const page = await render('<aegov-pagination total-pages="10" current-page="5"></aegov-pagination>');
      expect(getNavButton(page.root, 'Go to first page')).toBeFalsy();
      expect(getNavButton(page.root, 'Go to last page')).toBeFalsy();
    });

    it('should render First and Last buttons when showFirstLast is true', async () => {
      const page = await render('<aegov-pagination total-pages="10" current-page="5" show-first-last></aegov-pagination>');
      expect(getNavButton(page.root, 'Go to first page')).toBeTruthy();
      expect(getNavButton(page.root, 'Go to last page')).toBeTruthy();
    });

    it('should render single page when totalPages is 1', async () => {
      const page = await render('<aegov-pagination total-pages="1" current-page="1"></aegov-pagination>');
      const buttons = getPageButtons(page.root);
      expect(buttons.length).toBe(1);
      expect(buttons[0].textContent.trim()).toBe('1');
    });
  });

  // ------------------------------------------------------------------ range algorithm
  describe('range algorithm', () => {
    it('should show all pages when totalPages is small', async () => {
      const page = await render('<aegov-pagination total-pages="5" current-page="3"></aegov-pagination>');
      const buttons = getPageButtons(page.root);
      expect(buttons.length).toBe(5);
      expect(buttons.map(b => b.textContent.trim())).toEqual(['1', '2', '3', '4', '5']);
    });

    it('should show ellipsis at end when on early pages', async () => {
      const page = await render('<aegov-pagination total-pages="20" current-page="2"></aegov-pagination>');
      const ellipses = page.root.querySelectorAll('.pagination__ellipsis');
      expect(ellipses.length).toBe(1);
      // Should have boundary page at end (20) but not at start (already visible)
      const buttons = getPageButtons(page.root);
      const pages = buttons.map(b => parseInt(b.textContent.trim(), 10));
      expect(pages).toContain(20);
      expect(pages).toContain(1);
    });

    it('should show ellipsis at start when on late pages', async () => {
      const page = await render('<aegov-pagination total-pages="20" current-page="19"></aegov-pagination>');
      const ellipses = page.root.querySelectorAll('.pagination__ellipsis');
      expect(ellipses.length).toBe(1);
      const buttons = getPageButtons(page.root);
      const pages = buttons.map(b => parseInt(b.textContent.trim(), 10));
      expect(pages).toContain(1);
      expect(pages).toContain(20);
    });

    it('should show two ellipses when on a middle page', async () => {
      const page = await render('<aegov-pagination total-pages="20" current-page="10"></aegov-pagination>');
      const ellipses = page.root.querySelectorAll('.pagination__ellipsis');
      expect(ellipses.length).toBe(2);
    });

    it('should include currentPage in the rendered pages', async () => {
      const page = await render('<aegov-pagination total-pages="20" current-page="10"></aegov-pagination>');
      const buttons = getPageButtons(page.root);
      const pages = buttons.map(b => parseInt(b.textContent.trim(), 10));
      expect(pages).toContain(10);
    });

    it('should include sibling pages around currentPage', async () => {
      const page = await render('<aegov-pagination total-pages="20" current-page="10" sibling-count="1"></aegov-pagination>');
      const buttons = getPageButtons(page.root);
      const pages = buttons.map(b => parseInt(b.textContent.trim(), 10));
      expect(pages).toContain(9);
      expect(pages).toContain(10);
      expect(pages).toContain(11);
    });

    it('should respect siblingCount=2', async () => {
      const page = await render('<aegov-pagination total-pages="20" current-page="10" sibling-count="2"></aegov-pagination>');
      const buttons = getPageButtons(page.root);
      const pages = buttons.map(b => parseInt(b.textContent.trim(), 10));
      expect(pages).toContain(8);
      expect(pages).toContain(9);
      expect(pages).toContain(10);
      expect(pages).toContain(11);
      expect(pages).toContain(12);
    });

    it('should always show boundary pages', async () => {
      const page = await render('<aegov-pagination total-pages="20" current-page="10"></aegov-pagination>');
      const buttons = getPageButtons(page.root);
      const pages = buttons.map(b => parseInt(b.textContent.trim(), 10));
      expect(pages[0]).toBe(1);
      expect(pages[pages.length - 1]).toBe(20);
    });

    it('should respect boundaryCount=2', async () => {
      const page = await render('<aegov-pagination total-pages="20" current-page="10" boundary-count="2"></aegov-pagination>');
      const buttons = getPageButtons(page.root);
      const pages = buttons.map(b => parseInt(b.textContent.trim(), 10));
      expect(pages).toContain(1);
      expect(pages).toContain(2);
      expect(pages).toContain(19);
      expect(pages).toContain(20);
    });

    it('should not have duplicate pages in range', async () => {
      const page = await render('<aegov-pagination total-pages="10" current-page="2"></aegov-pagination>');
      const buttons = getPageButtons(page.root);
      const pages = buttons.map(b => parseInt(b.textContent.trim(), 10));
      const unique = [...new Set(pages)];
      expect(pages.length).toBe(unique.length);
    });
  });

  // ------------------------------------------------------------------ active page
  describe('active page', () => {
    it('should mark currentPage button with pagination__btn--active class', async () => {
      const page = await render('<aegov-pagination total-pages="5" current-page="3"></aegov-pagination>');
      const buttons = getPageButtons(page.root);
      const activeBtn = buttons.find(b => b.classList.contains('pagination__btn--active'));
      expect(activeBtn).toBeTruthy();
      expect(activeBtn.textContent.trim()).toBe('3');
    });

    it('should set aria-current="page" on the active button', async () => {
      const page = await render('<aegov-pagination total-pages="5" current-page="2"></aegov-pagination>');
      const buttons = getPageButtons(page.root);
      const currentBtn = buttons.find(b => b.getAttribute('aria-current') === 'page');
      expect(currentBtn).toBeTruthy();
      expect(currentBtn.textContent.trim()).toBe('2');
    });

    it('should not set aria-current on other page buttons', async () => {
      const page = await render('<aegov-pagination total-pages="5" current-page="2"></aegov-pagination>');
      const buttons = getPageButtons(page.root);
      const nonCurrentBtns = buttons.filter(b => b.textContent.trim() !== '2');
      nonCurrentBtns.forEach(btn => {
        expect(btn.getAttribute('aria-current')).toBeNull();
      });
    });

    it('should have correct aria-label for active page', async () => {
      const page = await render('<aegov-pagination total-pages="5" current-page="3"></aegov-pagination>');
      const buttons = getPageButtons(page.root);
      const activeBtn = buttons.find(b => b.classList.contains('pagination__btn--active'));
      expect(activeBtn.getAttribute('aria-label')).toBe('Page 3, current page');
    });

    it('should have "Go to page N" aria-label for inactive pages', async () => {
      const page = await render('<aegov-pagination total-pages="5" current-page="3"></aegov-pagination>');
      const buttons = getPageButtons(page.root);
      const inactiveBtn = buttons.find(b => b.textContent.trim() === '1');
      expect(inactiveBtn.getAttribute('aria-label')).toBe('Go to page 1');
    });
  });

  // ------------------------------------------------------------------ navigation buttons
  describe('navigation buttons', () => {
    it('should disable Previous button on first page', async () => {
      const page = await render('<aegov-pagination total-pages="10" current-page="1"></aegov-pagination>');
      const prevBtn = getNavButton(page.root, 'Go to previous page');
      expect(prevBtn.hasAttribute('disabled')).toBe(true);
      expect(prevBtn.classList.contains('pagination__btn--disabled')).toBe(true);
    });

    it('should disable Next button on last page', async () => {
      const page = await render('<aegov-pagination total-pages="10" current-page="10"></aegov-pagination>');
      const nextBtn = getNavButton(page.root, 'Go to next page');
      expect(nextBtn.hasAttribute('disabled')).toBe(true);
      expect(nextBtn.classList.contains('pagination__btn--disabled')).toBe(true);
    });

    it('should enable Previous button on pages after 1', async () => {
      const page = await render('<aegov-pagination total-pages="10" current-page="5"></aegov-pagination>');
      const prevBtn = getNavButton(page.root, 'Go to previous page');
      expect(prevBtn.hasAttribute('disabled')).toBe(false);
      expect(prevBtn.classList.contains('pagination__btn--disabled')).toBe(false);
    });

    it('should enable Next button on pages before last', async () => {
      const page = await render('<aegov-pagination total-pages="10" current-page="5"></aegov-pagination>');
      const nextBtn = getNavButton(page.root, 'Go to next page');
      expect(nextBtn.hasAttribute('disabled')).toBe(false);
      expect(nextBtn.classList.contains('pagination__btn--disabled')).toBe(false);
    });

    it('should disable First button on first page', async () => {
      const page = await render('<aegov-pagination total-pages="10" current-page="1" show-first-last></aegov-pagination>');
      const firstBtn = getNavButton(page.root, 'Go to first page');
      expect(firstBtn.hasAttribute('disabled')).toBe(true);
    });

    it('should disable Last button on last page', async () => {
      const page = await render('<aegov-pagination total-pages="10" current-page="10" show-first-last></aegov-pagination>');
      const lastBtn = getNavButton(page.root, 'Go to last page');
      expect(lastBtn.hasAttribute('disabled')).toBe(true);
    });

    it('should set aria-disabled="true" on disabled navigation buttons', async () => {
      const page = await render('<aegov-pagination total-pages="10" current-page="1"></aegov-pagination>');
      const prevBtn = getNavButton(page.root, 'Go to previous page');
      expect(prevBtn.getAttribute('aria-disabled')).toBe('true');
    });

    it('should not set aria-disabled on enabled navigation buttons', async () => {
      const page = await render('<aegov-pagination total-pages="10" current-page="5"></aegov-pagination>');
      const prevBtn = getNavButton(page.root, 'Go to previous page');
      expect(prevBtn.getAttribute('aria-disabled')).toBeNull();
    });
  });

  // ------------------------------------------------------------------ custom labels
  describe('custom labels', () => {
    it('should render custom prevLabel', async () => {
      const page = await render('<aegov-pagination total-pages="5" current-page="3" prev-label="Prev"></aegov-pagination>');
      const prevBtn = getNavButton(page.root, 'Go to previous page');
      const label = prevBtn.querySelector('.pagination__nav-label');
      expect(label.textContent.trim()).toBe('Prev');
    });

    it('should render custom nextLabel', async () => {
      const page = await render('<aegov-pagination total-pages="5" current-page="3" next-label="Next ›"></aegov-pagination>');
      const nextBtn = getNavButton(page.root, 'Go to next page');
      const label = nextBtn.querySelector('.pagination__nav-label');
      expect(label.textContent.trim()).toBe('Next ›');
    });

    it('should render custom firstLabel when showFirstLast is true', async () => {
      const page = await render('<aegov-pagination total-pages="10" current-page="5" show-first-last first-label="Start"></aegov-pagination>');
      const firstBtn = getNavButton(page.root, 'Go to first page');
      const label = firstBtn.querySelector('.pagination__nav-label');
      expect(label.textContent.trim()).toBe('Start');
    });

    it('should render custom lastLabel when showFirstLast is true', async () => {
      const page = await render('<aegov-pagination total-pages="10" current-page="5" show-first-last last-label="End"></aegov-pagination>');
      const lastBtn = getNavButton(page.root, 'Go to last page');
      const label = lastBtn.querySelector('.pagination__nav-label');
      expect(label.textContent.trim()).toBe('End');
    });

    it('should use default labels when none are provided', async () => {
      const page = await render('<aegov-pagination total-pages="5" current-page="3" show-first-last></aegov-pagination>');
      expect(getNavButton(page.root, 'Go to previous page').querySelector('.pagination__nav-label').textContent.trim()).toBe('Previous');
      expect(getNavButton(page.root, 'Go to next page').querySelector('.pagination__nav-label').textContent.trim()).toBe('Next');
      expect(getNavButton(page.root, 'Go to first page').querySelector('.pagination__nav-label').textContent.trim()).toBe('First');
      expect(getNavButton(page.root, 'Go to last page').querySelector('.pagination__nav-label').textContent.trim()).toBe('Last');
    });
  });

  // ------------------------------------------------------------------ size
  describe('size', () => {
    it('should apply base size class by default', async () => {
      const page = await render('<aegov-pagination total-pages="5" current-page="1"></aegov-pagination>');
      const nav = page.root.querySelector('nav');
      expect(nav.classList.contains('pagination--base')).toBe(true);
    });

    it('should apply sm size class', async () => {
      const page = await render('<aegov-pagination total-pages="5" current-page="1" size="sm"></aegov-pagination>');
      const nav = page.root.querySelector('nav');
      expect(nav.classList.contains('pagination--sm')).toBe(true);
    });

    it('should apply lg size class', async () => {
      const page = await render('<aegov-pagination total-pages="5" current-page="1" size="lg"></aegov-pagination>');
      const nav = page.root.querySelector('nav');
      expect(nav.classList.contains('pagination--lg')).toBe(true);
    });
  });

  // ------------------------------------------------------------------ disabled
  describe('disabled', () => {
    it('should disable all page buttons when disabled is true', async () => {
      const page = await render('<aegov-pagination total-pages="5" current-page="3" disabled></aegov-pagination>');
      const pageButtons = getPageButtons(page.root);
      pageButtons.forEach(btn => {
        expect(btn.hasAttribute('disabled')).toBe(true);
        expect(btn.classList.contains('pagination__btn--disabled')).toBe(true);
      });
    });

    it('should disable nav buttons when disabled is true', async () => {
      const page = await render('<aegov-pagination total-pages="10" current-page="5" disabled></aegov-pagination>');
      const prevBtn = getNavButton(page.root, 'Go to previous page');
      const nextBtn = getNavButton(page.root, 'Go to next page');
      expect(prevBtn.hasAttribute('disabled')).toBe(true);
      expect(nextBtn.hasAttribute('disabled')).toBe(true);
    });

    it('should set aria-disabled on all page buttons when disabled', async () => {
      const page = await render('<aegov-pagination total-pages="5" current-page="3" disabled></aegov-pagination>');
      const pageButtons = getPageButtons(page.root);
      pageButtons.forEach(btn => {
        expect(btn.getAttribute('aria-disabled')).toBe('true');
      });
    });
  });

  // ------------------------------------------------------------------ events
  describe('events', () => {
    it('should emit aegovPageChange with the correct page number', async () => {
      const page = await render('<aegov-pagination total-pages="5" current-page="1"></aegov-pagination>');
      const spy = jest.fn();
      page.root.addEventListener('aegovPageChange', spy);

      const buttons = getPageButtons(page.root);
      const btn3 = buttons.find(b => b.textContent.trim() === '3') as HTMLButtonElement;
      btn3.click();
      await page.waitForChanges();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy.mock.calls[0][0].detail).toBe(3);
    });

    it('should not emit when clicking the active page', async () => {
      const page = await render('<aegov-pagination total-pages="5" current-page="3"></aegov-pagination>');
      const spy = jest.fn();
      page.root.addEventListener('aegovPageChange', spy);

      const component = page.rootInstance as AegovPagination;
      // Directly call the private method to simulate clicking current page
      (component as any).handlePageClick(3);
      await page.waitForChanges();

      expect(spy).not.toHaveBeenCalled();
    });

    it('should not emit when disabled', async () => {
      const page = await render('<aegov-pagination total-pages="5" current-page="3" disabled></aegov-pagination>');
      const spy = jest.fn();
      page.root.addEventListener('aegovPageChange', spy);

      const component = page.rootInstance as AegovPagination;
      (component as any).handlePageClick(1);
      await page.waitForChanges();

      expect(spy).not.toHaveBeenCalled();
    });

    it('should not emit for out-of-range pages', async () => {
      const page = await render('<aegov-pagination total-pages="5" current-page="3"></aegov-pagination>');
      const spy = jest.fn();
      page.root.addEventListener('aegovPageChange', spy);

      const component = page.rootInstance as AegovPagination;
      (component as any).handlePageClick(0);
      (component as any).handlePageClick(6);
      await page.waitForChanges();

      expect(spy).not.toHaveBeenCalled();
    });

    it('should emit page 1 when Next is clicked from page 2 (after controlled update)', async () => {
      const page = await render('<aegov-pagination total-pages="5" current-page="2"></aegov-pagination>');
      const spy = jest.fn();
      page.root.addEventListener('aegovPageChange', spy);

      getNavButton(page.root, 'Go to previous page').click();
      await page.waitForChanges();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy.mock.calls[0][0].detail).toBe(1);
    });

    it('should emit page+1 when Next is clicked', async () => {
      const page = await render('<aegov-pagination total-pages="5" current-page="3"></aegov-pagination>');
      const spy = jest.fn();
      page.root.addEventListener('aegovPageChange', spy);

      getNavButton(page.root, 'Go to next page').click();
      await page.waitForChanges();

      expect(spy).toHaveBeenCalledTimes(1);
      expect(spy.mock.calls[0][0].detail).toBe(4);
    });
  });

  // ------------------------------------------------------------------ accessibility
  describe('accessibility', () => {
    it('should have aria-label on the nav element', async () => {
      const page = await render('<aegov-pagination total-pages="5" current-page="1"></aegov-pagination>');
      const nav = page.root.querySelector('nav');
      expect(nav.getAttribute('aria-label')).toBe('Pagination');
    });

    it('should use a ul for the list', async () => {
      const page = await render('<aegov-pagination total-pages="5" current-page="1"></aegov-pagination>');
      expect(page.root.querySelector('ul.pagination__list')).toBeTruthy();
    });

    it('should wrap each item in a li', async () => {
      const page = await render('<aegov-pagination total-pages="5" current-page="1"></aegov-pagination>');
      const liItems = page.root.querySelectorAll('li.pagination__item');
      expect(liItems.length).toBeGreaterThan(0);
    });

    it('should have aria-label on all navigation buttons', async () => {
      const page = await render('<aegov-pagination total-pages="10" current-page="5" show-first-last></aegov-pagination>');
      const navBtns = page.root.querySelectorAll('.pagination__btn--nav');
      navBtns.forEach(btn => {
        expect(btn.getAttribute('aria-label')).toBeTruthy();
      });
    });

    it('should have aria-label on all page buttons', async () => {
      const page = await render('<aegov-pagination total-pages="5" current-page="2"></aegov-pagination>');
      const pageBtns = getPageButtons(page.root);
      pageBtns.forEach(btn => {
        expect(btn.getAttribute('aria-label')).toBeTruthy();
      });
    });

    it('should mark ellipsis as aria-hidden', async () => {
      const page = await render('<aegov-pagination total-pages="20" current-page="10"></aegov-pagination>');
      const ellipsis = page.root.querySelectorAll('.pagination__ellipsis');
      ellipsis.forEach(el => {
        expect(el.getAttribute('aria-hidden')).toBe('true');
      });
    });

    it('should mark direction icons as aria-hidden', async () => {
      const page = await render('<aegov-pagination total-pages="5" current-page="3"></aegov-pagination>');
      const icons = page.root.querySelectorAll('.pagination__icon svg');
      icons.forEach(icon => {
        expect(icon.getAttribute('aria-hidden')).toBe('true');
      });
    });
  });

  // ------------------------------------------------------------------ props
  describe('default props', () => {
    it('should default to totalPages=1', async () => {
      const page = await render('<aegov-pagination></aegov-pagination>');
      const component = page.rootInstance as AegovPagination;
      expect(component.totalPages).toBe(1);
    });

    it('should default to currentPage=1', async () => {
      const page = await render('<aegov-pagination total-pages="5"></aegov-pagination>');
      const component = page.rootInstance as AegovPagination;
      expect(component.currentPage).toBe(1);
    });

    it('should default showFirstLast to false', async () => {
      const page = await render('<aegov-pagination total-pages="5"></aegov-pagination>');
      const component = page.rootInstance as AegovPagination;
      expect(component.showFirstLast).toBe(false);
    });

    it('should default siblingCount to 1', async () => {
      const page = await render('<aegov-pagination total-pages="5"></aegov-pagination>');
      const component = page.rootInstance as AegovPagination;
      expect(component.siblingCount).toBe(1);
    });

    it('should default boundaryCount to 1', async () => {
      const page = await render('<aegov-pagination total-pages="5"></aegov-pagination>');
      const component = page.rootInstance as AegovPagination;
      expect(component.boundaryCount).toBe(1);
    });

    it('should default size to base', async () => {
      const page = await render('<aegov-pagination total-pages="5"></aegov-pagination>');
      const component = page.rootInstance as AegovPagination;
      expect(component.size).toBe('base');
    });

    it('should default disabled to false', async () => {
      const page = await render('<aegov-pagination total-pages="5"></aegov-pagination>');
      const component = page.rootInstance as AegovPagination;
      expect(component.disabled).toBe(false);
    });
  });
});
