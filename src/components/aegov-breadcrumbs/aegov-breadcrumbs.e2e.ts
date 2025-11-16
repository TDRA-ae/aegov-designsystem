import { newE2EPage } from '@stencil/core/testing';

describe('aegov-breadcrumbs E2E', () => {
  describe('rendering', () => {
    it('should render', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs>
          <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
          <aegov-breadcrumbs-item>Current</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const element = await page.find('aegov-breadcrumbs');
      expect(element).toBeTruthy();
    });

    it('should render navigation element', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs>
          <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
          <aegov-breadcrumbs-item>Current</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const nav = await page.find('aegov-breadcrumbs nav');
      expect(nav).toBeTruthy();
      const ariaLabel = await nav.getAttribute('aria-label');
      expect(ariaLabel).toBe('Breadcrumb');
    });

    it('should render breadcrumb list', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs>
          <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
          <aegov-breadcrumbs-item>Current</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const list = await page.find('aegov-breadcrumbs ol');
      expect(list).toBeTruthy();
    });

    it('should render breadcrumb items', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs>
          <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
          <aegov-breadcrumbs-item href="/products">Products</aegov-breadcrumbs-item>
          <aegov-breadcrumbs-item>Current Item</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const items = await page.findAll('aegov-breadcrumbs-item');
      expect(items.length).toBe(3);
    });
  });

  describe('breadcrumb items with links', () => {
    it('should render link items with anchor tags', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs>
          <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
          <aegov-breadcrumbs-item href="/products">Products</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const links = await page.findAll('aegov-breadcrumbs-item a');
      expect(links.length).toBe(2);
    });

    it('should render link with correct href', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs>
          <aegov-breadcrumbs-item href="/test">Test</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const link = await page.find('aegov-breadcrumbs-item a');
      const href = await link.getAttribute('href');
      expect(href).toBe('/test');
    });

    it('should render link text content', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs>
          <aegov-breadcrumbs-item href="/">Home Page</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const link = await page.find('aegov-breadcrumbs-item a');
      const text = await link.textContent;
      expect(text.trim()).toBe('Home Page');
    });
  });

  describe('breadcrumb items without links', () => {
    it('should render current item as span', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs>
          <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
          <aegov-breadcrumbs-item>Current Page</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const span = await page.find('aegov-breadcrumbs-item:last-child span');
      expect(span).toBeTruthy();
    });

    it('should have aria-current on last item', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs>
          <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
          <aegov-breadcrumbs-item>Current Page</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const span = await page.find('aegov-breadcrumbs-item:last-child span');
      const ariaCurrent = await span.getAttribute('aria-current');
      expect(ariaCurrent).toBe('page');
    });
  });

  describe('separators', () => {
    it('should render separators with slash by default', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs>
          <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
          <aegov-breadcrumbs-item href="/products">Products</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const separators = await page.findAll('aegov-breadcrumbs-item .breadcrumb-separator');
      expect(separators.length).toBeGreaterThan(0);
    });

    it('should render chevron separators when specified', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs separator="chevron">
          <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
          <aegov-breadcrumbs-item href="/products">Products</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const separators = await page.findAll('aegov-breadcrumbs-item svg');
      expect(separators.length).toBeGreaterThan(0);
    });

    it('should not render separator after last item', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs>
          <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
          <aegov-breadcrumbs-item>Current</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const lastItem = await page.find('aegov-breadcrumbs-item:last-child');
      const separator = await lastItem.find('svg');
      expect(separator).toBeNull();
    });
  });

  describe('text truncation', () => {
    it('should not truncate text when maxLength is not set', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs>
          <aegov-breadcrumbs-item href="/">Very Long Breadcrumb Text</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const link = await page.find('aegov-breadcrumbs-item a');
      const text = await link.textContent;
      expect(text.trim()).toBe('Very Long Breadcrumb Text');
    });

    it('should truncate text when maxLength is set', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs max-length="10">
          <aegov-breadcrumbs-item href="/">Very Long Breadcrumb Text</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const link = await page.find('aegov-breadcrumbs-item a');
      const text = await link.textContent;
      expect(text.trim()).toBe('Very Long …');
    });
  });

  describe('click events', () => {
    it('should emit aegovBreadcrumbItemClick when link is clicked', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs>
          <aegov-breadcrumbs-item href="/test">Test</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const clickSpy = await page.spyOnEvent('aegovBreadcrumbItemClick');
      const link = await page.find('aegov-breadcrumbs-item a');
      await link.click();

      expect(clickSpy).toHaveReceivedEvent();
    });

    it('should emit event with href in detail', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs>
          <aegov-breadcrumbs-item href="/products">Products</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const clickSpy = await page.spyOnEvent('aegovBreadcrumbItemClick');
      const link = await page.find('aegov-breadcrumbs-item a');
      await link.click();

      expect(clickSpy).toHaveReceivedEvent();
      expect(clickSpy.firstEvent.detail.href).toBe('/products');
    });
  });

  describe('target attribute', () => {
    it('should default to _self', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs>
          <aegov-breadcrumbs-item href="/test">Test</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const link = await page.find('aegov-breadcrumbs-item a');
      const target = await link.getAttribute('target');
      expect(target).toBe('_self');
    });

    it('should accept custom target value', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs>
          <aegov-breadcrumbs-item href="/test" target="_blank">Test</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const link = await page.find('aegov-breadcrumbs-item a');
      const target = await link.getAttribute('target');
      expect(target).toBe('_blank');
    });
  });
});
