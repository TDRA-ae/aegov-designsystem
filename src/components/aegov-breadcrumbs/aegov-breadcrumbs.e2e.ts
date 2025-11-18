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

  describe('pass-through attributes on parent', () => {
    it('should pass through data-* attributes to nav element', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs data-testid="breadcrumb-nav" data-tracking="nav-123">
          <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const nav = await page.find('aegov-breadcrumbs nav');
      expect(await nav.getAttribute('data-testid')).toBe('breadcrumb-nav');
      expect(await nav.getAttribute('data-tracking')).toBe('nav-123');
    });

    it('should pass through aria-* attributes to nav element', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs aria-describedby="breadcrumb-desc">
          <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const nav = await page.find('aegov-breadcrumbs nav');
      expect(await nav.getAttribute('aria-describedby')).toBe('breadcrumb-desc');
    });

    it('should pass through id attribute to nav element', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs id="primary-breadcrumb">
          <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const nav = await page.find('aegov-breadcrumbs nav');
      expect(await nav.getAttribute('id')).toBe('primary-breadcrumb');
    });
  });

  describe('pass-through attributes on items', () => {
    it('should pass through data-* attributes to link element', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs>
          <aegov-breadcrumbs-item href="/" data-testid="home-link" data-tracking="item-1">Home</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const link = await page.find('aegov-breadcrumbs-item a');
      expect(await link.getAttribute('data-testid')).toBe('home-link');
      expect(await link.getAttribute('data-tracking')).toBe('item-1');
    });

    it('should pass through aria-* attributes to link element', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs>
          <aegov-breadcrumbs-item href="/" aria-label="Navigate to home">Home</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const link = await page.find('aegov-breadcrumbs-item a');
      expect(await link.getAttribute('aria-label')).toBe('Navigate to home');
    });

    it('should pass through id attribute to link element', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs>
          <aegov-breadcrumbs-item href="/" id="home-breadcrumb">Home</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const link = await page.find('aegov-breadcrumbs-item a');
      expect(await link.getAttribute('id')).toBe('home-breadcrumb');
    });

    it('should pass through attributes to span element for current item', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs>
          <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
          <aegov-breadcrumbs-item data-testid="current-page" id="current-item">Current</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const span = await page.find('aegov-breadcrumbs-item:last-child span.breadcrumb-current');
      expect(await span.getAttribute('data-testid')).toBe('current-page');
      expect(await span.getAttribute('id')).toBe('current-item');
    });
  });
});
