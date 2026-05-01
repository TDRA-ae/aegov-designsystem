import { newSpecPage } from '@stencil/core/testing';
import { AegovPagination } from './aegov-pagination';

describe('aegov-pagination', () => {
  it('renders nav with default size and class', async () => {
    const page = await newSpecPage({
      components: [AegovPagination],
      html: `<aegov-pagination pages="5" page-current="1"></aegov-pagination>`,
    });
    const nav = page.root.querySelector('nav');
    expect(nav).not.toBeNull();
    expect(nav.getAttribute('aria-label')).toBe('Pagination');
    expect(nav.className).toContain('aegov-pagination');
    expect(nav.className).toContain('pagination--base');
  });

  it('auto-generates fieldId', async () => {
    const page = await newSpecPage({
      components: [AegovPagination],
      html: `<aegov-pagination pages="3"></aegov-pagination>`,
    });
    expect(page.rootInstance.fieldId).toMatch(/^aegov-pagination-\d+$/);
    expect(page.root.querySelector('nav').id).toBe(page.rootInstance.fieldId);
  });

  it('renders nothing when pages <= 0', async () => {
    const page = await newSpecPage({
      components: [AegovPagination],
      html: `<aegov-pagination pages="0"></aegov-pagination>`,
    });
    expect(page.root.querySelector('nav')).toBeNull();
  });

  it('renders all page buttons when total fits without ellipsis', async () => {
    const page = await newSpecPage({
      components: [AegovPagination],
      html: `<aegov-pagination pages="5" page-current="2"></aegov-pagination>`,
    });
    const pageButtons = page.root.querySelectorAll('button.pagination__btn--page');
    expect(pageButtons.length).toBe(5);
  });

  it('marks current page with aria-current and active class', async () => {
    const page = await newSpecPage({
      components: [AegovPagination],
      html: `<aegov-pagination pages="5" page-current="3"></aegov-pagination>`,
    });
    const active = page.root.querySelector('button.pagination__btn--active');
    expect(active).not.toBeNull();
    expect(active.textContent).toBe('3');
    expect(active.getAttribute('aria-current')).toBe('page');
  });

  it('disables Previous on first page and Next on last page', async () => {
    const page = await newSpecPage({
      components: [AegovPagination],
      html: `<aegov-pagination pages="5" page-current="1"></aegov-pagination>`,
    });
    const navBtns = page.root.querySelectorAll('button.pagination__btn--nav');
    // First nav button is Previous (no first/last enabled)
    expect((navBtns[0] as HTMLButtonElement).hasAttribute("disabled")).toBe(true);
    // Last nav button is Next
    expect((navBtns[navBtns.length - 1] as HTMLButtonElement).hasAttribute("disabled")).toBe(false);
  });

  it('shows First/Last buttons when isEnabledFirstLast=true', async () => {
    const page = await newSpecPage({
      components: [AegovPagination],
      html: `<aegov-pagination pages="5" page-current="3" is-enabled-first-last="true"></aegov-pagination>`,
    });
    const navBtns = page.root.querySelectorAll('button.pagination__btn--nav');
    expect(navBtns.length).toBe(4);
  });

  it('renders compact variant with indicator', async () => {
    const page = await newSpecPage({
      components: [AegovPagination],
      html: `<aegov-pagination pages="10" page-current="3" variant="compact"></aegov-pagination>`,
    });
    expect(page.root.querySelector('nav').className).toContain('pagination--compact');
    const indicator = page.root.querySelector('.pagination__compact-indicator');
    expect(indicator).not.toBeNull();
    expect(indicator.textContent).toContain('3');
    expect(indicator.textContent).toContain('10');
    expect(page.root.querySelectorAll('button.pagination__btn--page').length).toBe(0);
  });

  it('emits aegovPaginationPageChange with target page number', async () => {
    const page = await newSpecPage({
      components: [AegovPagination],
      html: `<aegov-pagination pages="5" page-current="1"></aegov-pagination>`,
    });
    const spy = jest.fn();
    page.root.addEventListener('aegovPaginationPageChange', spy);
    const target = Array.from(page.root.querySelectorAll('button.pagination__btn--page'))
      .find((b) => b.textContent === '3') as HTMLButtonElement;
    target.click();
    await page.waitForChanges();
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail).toBe(3);
  });

  it('does not emit when clicking the active page', async () => {
    const page = await newSpecPage({
      components: [AegovPagination],
      html: `<aegov-pagination pages="5" page-current="2"></aegov-pagination>`,
    });
    const spy = jest.fn();
    page.root.addEventListener('aegovPaginationPageChange', spy);
    const active = page.root.querySelector('button.pagination__btn--active') as HTMLButtonElement;
    active.click();
    await page.waitForChanges();
    expect(spy).not.toHaveBeenCalled();
  });

  it('does not emit when isDisabled', async () => {
    const page = await newSpecPage({
      components: [AegovPagination],
      html: `<aegov-pagination pages="5" page-current="1" is-disabled="true"></aegov-pagination>`,
    });
    const spy = jest.fn();
    page.root.addEventListener('aegovPaginationPageChange', spy);
    const btn = page.root.querySelectorAll('button.pagination__btn--page')[1] as HTMLButtonElement;
    btn.click();
    await page.waitForChanges();
    expect(spy).not.toHaveBeenCalled();
  });

  it('renders ellipsis when total pages exceed simple range', async () => {
    const page = await newSpecPage({
      components: [AegovPagination],
      html: `<aegov-pagination pages="20" page-current="10"></aegov-pagination>`,
    });
    const ellipses = page.root.querySelectorAll('.pagination__ellipsis');
    expect(ellipses.length).toBeGreaterThan(0);
  });

  it('uses custom labels for nav buttons', async () => {
    const page = await newSpecPage({
      components: [AegovPagination],
      html: `<aegov-pagination pages="5" page-current="1" label-prev="Back" label-next="Forward"></aegov-pagination>`,
    });
    const labels = Array.from(page.root.querySelectorAll('.pagination__nav-label')).map(
      (n) => n.textContent
    );
    expect(labels).toContain('Back');
    expect(labels).toContain('Forward');
  });

  it('forwards aria-* and data-* attrs to nav', async () => {
    const page = await newSpecPage({
      components: [AegovPagination],
      html: `<aegov-pagination pages="3" aria-describedby="d" data-test="x"></aegov-pagination>`,
    });
    const nav = page.root.querySelector('nav');
    expect(nav.getAttribute('aria-describedby')).toBe('d');
    expect(nav.getAttribute('data-test')).toBe('x');
  });
});
