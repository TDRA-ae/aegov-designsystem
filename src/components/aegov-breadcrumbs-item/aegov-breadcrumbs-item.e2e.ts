import { newE2EPage } from '@stencil/core/testing';

describe('aegov-breadcrumbs-item E2E', () => {
  describe('rendering', () => {
    it('should render inside breadcrumbs', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs>
          <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
          <aegov-breadcrumbs-item>Current</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const items = await page.findAll('aegov-breadcrumbs-item');
      expect(items.length).toBe(2);
    });

    it('should render link when href is provided', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs>
          <aegov-breadcrumbs-item href="/products">Products</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const link = await page.find('aegov-breadcrumbs-item a.breadcrumb-link');
      expect(link).toBeTruthy();
    });

    it('should render span when no href is provided', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs>
          <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
          <aegov-breadcrumbs-item>Current Page</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const span = await page.find('aegov-breadcrumbs-item:last-child span.breadcrumb-current');
      expect(span).toBeTruthy();
    });

    it('should render list item element', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs>
          <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const li = await page.find('aegov-breadcrumbs-item li.breadcrumb__item');
      expect(li).toBeTruthy();
    });

    it('should render text content in link', async () => {
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

    it('should render text content in span for current item', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs>
          <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
          <aegov-breadcrumbs-item>Current Page</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const span = await page.find('aegov-breadcrumbs-item:last-child span.breadcrumb-current');
      const text = await span.textContent;
      expect(text.trim()).toBe('Current Page');
    });
  });

  describe('link attributes', () => {
    it('should render correct href on link', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs>
          <aegov-breadcrumbs-item href="/products">Products</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const link = await page.find('aegov-breadcrumbs-item a');
      const href = await link.getAttribute('href');
      expect(href).toBe('/products');
    });

    it('should render correct target on link', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs>
          <aegov-breadcrumbs-item href="/external" target="_blank">External</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const link = await page.find('aegov-breadcrumbs-item a');
      const target = await link.getAttribute('target');
      expect(target).toBe('_blank');
    });

    it('should default target to _self', async () => {
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

    it('should render breadcrumb-link class on anchor', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs>
          <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const link = await page.find('aegov-breadcrumbs-item a.breadcrumb-link');
      expect(link).toBeTruthy();
    });

    it('should support _parent target', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs>
          <aegov-breadcrumbs-item href="/test" target="_parent">Test</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const link = await page.find('aegov-breadcrumbs-item a');
      const target = await link.getAttribute('target');
      expect(target).toBe('_parent');
    });
  });

  describe('current item', () => {
    it('should have aria-current="page" on last item', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs>
          <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
          <aegov-breadcrumbs-item>Current Page</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const span = await page.find('aegov-breadcrumbs-item:last-child span.breadcrumb-current');
      const ariaCurrent = await span.getAttribute('aria-current');
      expect(ariaCurrent).toBe('page');
    });

    it('should have breadcrumb-current class on span', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs>
          <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
          <aegov-breadcrumbs-item>Current</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const span = await page.find('aegov-breadcrumbs-item:last-child span.breadcrumb-current');
      expect(span).toBeTruthy();
    });

    it('should not have aria-current on non-last items', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs>
          <aegov-breadcrumbs-item>First</aegov-breadcrumbs-item>
          <aegov-breadcrumbs-item>Second</aegov-breadcrumbs-item>
          <aegov-breadcrumbs-item>Last</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const firstSpan = await page.find('aegov-breadcrumbs-item:first-child span.breadcrumb-current');
      const ariaCurrent = await firstSpan.getAttribute('aria-current');
      expect(ariaCurrent).toBeNull();
    });

    it('should not render anchor when no href provided', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs>
          <aegov-breadcrumbs-item>Current</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const link = await page.find('aegov-breadcrumbs-item a');
      expect(link).toBeNull();
    });
  });

  describe('separator', () => {
    it('should render slash separator by default', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs>
          <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
          <aegov-breadcrumbs-item>Current</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const separator = await page.find('aegov-breadcrumbs-item:first-child span.breadcrumb__separator');
      expect(separator).toBeTruthy();
      expect(separator.textContent).toBe('/');
    });

    it('should render chevron separator when parent sets chevron', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs separator="chevron">
          <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
          <aegov-breadcrumbs-item>Current</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const separator = await page.find('aegov-breadcrumbs-item:first-child svg.breadcrumb__separator');
      expect(separator).toBeTruthy();
    });

    it('should not render separator on last item', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs>
          <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
          <aegov-breadcrumbs-item>Current</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const lastItem = await page.find('aegov-breadcrumbs-item:last-child');
      const separator = await lastItem.find('.breadcrumb__separator');
      expect(separator).toBeNull();
    });

    it('should render separator between multiple link items', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs>
          <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
          <aegov-breadcrumbs-item href="/products">Products</aegov-breadcrumbs-item>
          <aegov-breadcrumbs-item>Item</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const separators = await page.findAll('.breadcrumb__separator');
      expect(separators.length).toBe(2);
    });

    it('should render chevron as SVG element', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs separator="chevron">
          <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
          <aegov-breadcrumbs-item>Current</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const svg = await page.find('aegov-breadcrumbs-item:first-child svg.breadcrumb__separator');
      expect(svg).toBeTruthy();
      const tagName = await svg.getProperty('tagName');
      expect(tagName.toLowerCase()).toBe('svg');
    });
  });

  describe('text truncation', () => {
    it('should truncate text with ellipsis when exceeding maxLength', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs max-length="10">
          <aegov-breadcrumbs-item href="/">Very Long Breadcrumb Text</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const link = await page.find('aegov-breadcrumbs-item a');
      const text = await link.textContent;
      expect(text.trim()).toBe('Very Long \u2026');
    });

    it('should not truncate text when shorter than maxLength', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs max-length="50">
          <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const link = await page.find('aegov-breadcrumbs-item a');
      const text = await link.textContent;
      expect(text.trim()).toBe('Home');
    });

    it('should not truncate when maxLength is not set', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs>
          <aegov-breadcrumbs-item href="/">Very Long Breadcrumb Text Here</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const link = await page.find('aegov-breadcrumbs-item a');
      const text = await link.textContent;
      expect(text.trim()).toBe('Very Long Breadcrumb Text Here');
    });

    it('should truncate text on current item', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs max-length="5">
          <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
          <aegov-breadcrumbs-item>Current Page Title</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const span = await page.find('aegov-breadcrumbs-item:last-child span.breadcrumb-current');
      const text = await span.textContent;
      expect(text.trim()).toBe('Curre\u2026');
    });

    it('should truncate text at exact maxLength boundary', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs max-length="4">
          <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const link = await page.find('aegov-breadcrumbs-item a');
      const text = await link.textContent;
      // "Home" is exactly 4 chars, should not truncate
      expect(text.trim()).toBe('Home');
    });
  });

  describe('events', () => {
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

    it('should include href in event detail', async () => {
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

    it('should emit event with different href values', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs>
          <aegov-breadcrumbs-item href="https://example.com">External</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const clickSpy = await page.spyOnEvent('aegovBreadcrumbItemClick');
      const link = await page.find('aegov-breadcrumbs-item a');
      await link.click();

      expect(clickSpy).toHaveReceivedEvent();
      expect(clickSpy.firstEvent.detail.href).toBe('https://example.com');
    });

    it('should emit event for each item independently', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs>
          <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
          <aegov-breadcrumbs-item href="/products">Products</aegov-breadcrumbs-item>
          <aegov-breadcrumbs-item>Current</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const clickSpy = await page.spyOnEvent('aegovBreadcrumbItemClick');

      const firstLink = await page.find('aegov-breadcrumbs-item:first-child a');
      await firstLink.click();

      expect(clickSpy).toHaveReceivedEventTimes(1);
      expect(clickSpy.firstEvent.detail.href).toBe('/');
    });
  });

  describe('pass-through attributes', () => {
    it('should pass data-* attributes to link', async () => {
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

    it('should pass aria-* attributes to link', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs>
          <aegov-breadcrumbs-item href="/" aria-label="Navigate to home">Home</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const link = await page.find('aegov-breadcrumbs-item a');
      expect(await link.getAttribute('aria-label')).toBe('Navigate to home');
    });

    it('should pass id attribute to link', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs>
          <aegov-breadcrumbs-item href="/" id="home-crumb">Home</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const link = await page.find('aegov-breadcrumbs-item a');
      expect(await link.getAttribute('id')).toBe('home-crumb');
    });

    it('should pass id to span for current item', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs>
          <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
          <aegov-breadcrumbs-item id="current-crumb">Current</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const span = await page.find('aegov-breadcrumbs-item:last-child span.breadcrumb-current');
      expect(await span.getAttribute('id')).toBe('current-crumb');
    });

    it('should pass data-* attributes to span for current item', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs>
          <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
          <aegov-breadcrumbs-item data-testid="current-page">Current</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const span = await page.find('aegov-breadcrumbs-item:last-child span.breadcrumb-current');
      expect(await span.getAttribute('data-testid')).toBe('current-page');
    });

    it('should pass multiple attribute types simultaneously', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs>
          <aegov-breadcrumbs-item href="/" id="test-id" aria-label="Go home" data-value="123">Home</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const link = await page.find('aegov-breadcrumbs-item a');
      expect(await link.getAttribute('id')).toBe('test-id');
      expect(await link.getAttribute('aria-label')).toBe('Go home');
      expect(await link.getAttribute('data-value')).toBe('123');
    });
  });

  describe('microdata', () => {
    it('should add schema.org attributes on li when microdata enabled', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs is-microdata>
          <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const li = await page.find('aegov-breadcrumbs-item li');
      expect(await li.getAttribute('itemprop')).toBe('itemListElement');
      expect(await li.getAttribute('itemscope')).not.toBeNull();
      expect(await li.getAttribute('itemtype')).toBe('https://schema.org/ListItem');
    });

    it('should add itemprop="item" on link when microdata enabled', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs is-microdata>
          <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const link = await page.find('aegov-breadcrumbs-item a');
      expect(await link.getAttribute('itemprop')).toBe('item');
    });

    it('should add meta tag with position', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs is-microdata>
          <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
          <aegov-breadcrumbs-item href="/products">Products</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const metas = await page.findAll('aegov-breadcrumbs-item meta[itemprop="position"]');
      expect(metas.length).toBe(2);
      expect(await metas[0].getAttribute('content')).toBe('1');
      expect(await metas[1].getAttribute('content')).toBe('2');
    });

    it('should add itemprop="name" on span inside link', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs is-microdata>
          <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const span = await page.find('aegov-breadcrumbs-item a span[itemprop="name"]');
      expect(span).toBeTruthy();
      const text = await span.textContent;
      expect(text.trim()).toBe('Home');
    });

    it('should add itemprop="name" on current item span', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs is-microdata>
          <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
          <aegov-breadcrumbs-item>Current</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const span = await page.find('aegov-breadcrumbs-item:last-child span.breadcrumb-current[itemprop="name"]');
      expect(span).toBeTruthy();
    });

    it('should not add microdata attributes when disabled', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs>
          <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const li = await page.find('aegov-breadcrumbs-item li');
      expect(await li.getAttribute('itemprop')).toBeNull();

      const meta = await page.find('aegov-breadcrumbs-item meta[itemprop="position"]');
      expect(meta).toBeNull();
    });

    it('should add microdata to current item li', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-breadcrumbs is-microdata>
          <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
          <aegov-breadcrumbs-item>Current</aegov-breadcrumbs-item>
        </aegov-breadcrumbs>
      `);

      const lastLi = await page.find('aegov-breadcrumbs-item:last-child li');
      expect(await lastLi.getAttribute('itemprop')).toBe('itemListElement');
      expect(await lastLi.getAttribute('itemtype')).toBe('https://schema.org/ListItem');
    });
  });
});
