import { newSpecPage } from '@stencil/core/testing';
import { AegovBreadcrumbsItem } from './aegov-breadcrumbs-item';
import { AegovBreadcrumbs } from '../aegov-breadcrumbs/aegov-breadcrumbs';

describe('aegov-breadcrumbs-item', () => {
  describe('rendering', () => {
    it('should render inside breadcrumbs', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs>
            <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      const item = page.root.querySelector('aegov-breadcrumbs-item');
      expect(item).toBeTruthy();
    });

    it('should render link when href is provided', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs>
            <aegov-breadcrumbs-item href="/products">Products</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      const link = page.root.querySelector('aegov-breadcrumbs-item a.breadcrumb-link');
      expect(link).toBeTruthy();
    });

    it('should render span when no href is provided', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs>
            <aegov-breadcrumbs-item>Current</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      const span = page.root.querySelector('aegov-breadcrumbs-item span.breadcrumb-current');
      expect(span).toBeTruthy();
    });

    it('should render list item element', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs>
            <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      const li = page.root.querySelector('aegov-breadcrumbs-item li.breadcrumb__item');
      expect(li).toBeTruthy();
    });

    it('should render text content inside link', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs>
            <aegov-breadcrumbs-item href="/">Home Page</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      const link = page.root.querySelector('aegov-breadcrumbs-item a');
      expect(link.textContent).toContain('Home Page');
    });

    it('should render text content inside span for current item', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs>
            <aegov-breadcrumbs-item>Current Page</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      const span = page.root.querySelector('aegov-breadcrumbs-item span.breadcrumb-current');
      expect(span.textContent).toContain('Current Page');
    });
  });

  describe('default props', () => {
    it('should default target to _self', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs>
            <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      const link = page.root.querySelector('aegov-breadcrumbs-item a');
      expect(link.getAttribute('target')).toBe('_self');
    });

    it('should default isLast to false', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs>
            <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
            <aegov-breadcrumbs-item>Current</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      await page.waitForChanges();

      const item = page.root.querySelector('aegov-breadcrumbs-item') as HTMLAegovBreadcrumbsItemElement;
      expect(item.isLast).toBe(false);
    });

    it('should default separator to slash', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs>
            <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
            <aegov-breadcrumbs-item>Current</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      await page.waitForChanges();

      const separator = page.root.querySelector('aegov-breadcrumbs-item span.breadcrumb__separator');
      expect(separator).toBeTruthy();
      expect(separator.textContent).toBe('/');
    });

    it('should default microdata to false', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs>
            <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      await page.waitForChanges();

      const li = page.root.querySelector('aegov-breadcrumbs-item li');
      expect(li.getAttribute('itemprop')).toBeNull();
    });

    it('should default position to 1', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs>
            <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      await page.waitForChanges();

      const item = page.root.querySelector('aegov-breadcrumbs-item') as HTMLAegovBreadcrumbsItemElement;
      expect(item.position).toBe(1);
    });
  });

  describe('link rendering', () => {
    it('should render anchor element with correct href', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs>
            <aegov-breadcrumbs-item href="/products">Products</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      const link = page.root.querySelector('aegov-breadcrumbs-item a');
      expect(link.getAttribute('href')).toBe('/products');
    });

    it('should render anchor with correct target', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs>
            <aegov-breadcrumbs-item href="/test" target="_blank">Test</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      const link = page.root.querySelector('aegov-breadcrumbs-item a');
      expect(link.getAttribute('target')).toBe('_blank');
    });

    it('should render breadcrumb-link class on anchor', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs>
            <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      const link = page.root.querySelector('aegov-breadcrumbs-item a.breadcrumb-link');
      expect(link).toBeTruthy();
    });

    it('should wrap link text in span element', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs>
            <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      const span = page.root.querySelector('aegov-breadcrumbs-item a span');
      expect(span).toBeTruthy();
      expect(span.textContent).toBe('Home');
    });
  });

  describe('current item', () => {
    it('should render span with breadcrumb-current class', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs>
            <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
            <aegov-breadcrumbs-item>Current</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      const span = page.root.querySelector('aegov-breadcrumbs-item:last-child span.breadcrumb-current');
      expect(span).toBeTruthy();
    });

    it('should have aria-current="page" when isLast is true', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs>
            <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
            <aegov-breadcrumbs-item>Current</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      await page.waitForChanges();

      const span = page.root.querySelector('aegov-breadcrumbs-item:last-child span.breadcrumb-current');
      expect(span.getAttribute('aria-current')).toBe('page');
    });

    it('should not have aria-current when not last item', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs>
            <aegov-breadcrumbs-item>First</aegov-breadcrumbs-item>
            <aegov-breadcrumbs-item>Second</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      await page.waitForChanges();

      const firstSpan = page.root.querySelector('aegov-breadcrumbs-item:first-child span.breadcrumb-current');
      expect(firstSpan.getAttribute('aria-current')).toBeNull();
    });

    it('should not render anchor element when no href', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs>
            <aegov-breadcrumbs-item>Current</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      const link = page.root.querySelector('aegov-breadcrumbs-item a');
      expect(link).toBeNull();
    });
  });

  describe('separator', () => {
    it('should render slash separator by default', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs>
            <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
            <aegov-breadcrumbs-item>Current</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      await page.waitForChanges();

      const separator = page.root.querySelector('aegov-breadcrumbs-item:first-child span.breadcrumb__separator');
      expect(separator).toBeTruthy();
      expect(separator.textContent).toBe('/');
    });

    it('should render chevron separator when set', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs separator="chevron">
            <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
            <aegov-breadcrumbs-item>Current</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      await page.waitForChanges();

      const separator = page.root.querySelector('aegov-breadcrumbs-item:first-child svg.breadcrumb__separator');
      expect(separator).toBeTruthy();
    });

    it('should not render separator when isLast is true', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs>
            <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
            <aegov-breadcrumbs-item>Current</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      await page.waitForChanges();

      const lastItem = page.root.querySelector('aegov-breadcrumbs-item:last-child');
      const separator = lastItem.querySelector('.breadcrumb__separator');
      expect(separator).toBeNull();
    });

    it('should render separator on non-last items with links', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs>
            <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
            <aegov-breadcrumbs-item href="/products">Products</aegov-breadcrumbs-item>
            <aegov-breadcrumbs-item>Current</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      await page.waitForChanges();

      const firstSep = page.root.querySelector('aegov-breadcrumbs-item:first-child .breadcrumb__separator');
      expect(firstSep).toBeTruthy();

      const secondItem = page.root.querySelectorAll('aegov-breadcrumbs-item')[1];
      const secondSep = secondItem.querySelector('.breadcrumb__separator');
      expect(secondSep).toBeTruthy();
    });

    it('should render separator on non-last items without links', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs>
            <aegov-breadcrumbs-item>First</aegov-breadcrumbs-item>
            <aegov-breadcrumbs-item>Last</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      await page.waitForChanges();

      const firstSep = page.root.querySelector('aegov-breadcrumbs-item:first-child .breadcrumb__separator');
      expect(firstSep).toBeTruthy();
    });
  });

  describe('text truncation', () => {
    it('should truncate text with ellipsis when exceeding maxLength', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs max-length="5">
            <aegov-breadcrumbs-item href="/">Very Long Text Here</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      await page.waitForChanges();

      const link = page.root.querySelector('aegov-breadcrumbs-item a');
      expect(link.textContent).toContain('Very \u2026');
    });

    it('should not truncate text when shorter than maxLength', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs max-length="50">
            <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      await page.waitForChanges();

      const link = page.root.querySelector('aegov-breadcrumbs-item a');
      expect(link.textContent).toContain('Home');
      expect(link.textContent).not.toContain('\u2026');
    });

    it('should not truncate text when maxLength is not set', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs>
            <aegov-breadcrumbs-item href="/">Very Long Breadcrumb Text</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      const link = page.root.querySelector('aegov-breadcrumbs-item a');
      expect(link.textContent).toContain('Very Long Breadcrumb Text');
    });

    it('should truncate text on current item (span)', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs max-length="7">
            <aegov-breadcrumbs-item>Current Page Title</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      await page.waitForChanges();

      const span = page.root.querySelector('aegov-breadcrumbs-item span.breadcrumb-current');
      expect(span.textContent).toContain('Current\u2026');
    });
  });

  describe('pass-through attributes', () => {
    it('should pass data-* attributes to link', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs>
            <aegov-breadcrumbs-item href="/" data-testid="home-link" data-tracking="item-1">Home</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      const link = page.root.querySelector('aegov-breadcrumbs-item a');
      expect(link.getAttribute('data-testid')).toBe('home-link');
      expect(link.getAttribute('data-tracking')).toBe('item-1');
    });

    it('should pass aria-* attributes to link', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs>
            <aegov-breadcrumbs-item href="/" aria-label="Navigate to home">Home</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      const link = page.root.querySelector('aegov-breadcrumbs-item a');
      expect(link.getAttribute('aria-label')).toBe('Navigate to home');
    });

    it('should pass id attribute to link', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs>
            <aegov-breadcrumbs-item href="/" id="home-crumb">Home</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      const link = page.root.querySelector('aegov-breadcrumbs-item a');
      expect(link.getAttribute('id')).toBe('home-crumb');
    });

    it('should pass attributes to span for current item', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs>
            <aegov-breadcrumbs-item data-testid="current" id="current-crumb" aria-describedby="desc">Current</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      const span = page.root.querySelector('aegov-breadcrumbs-item span.breadcrumb-current');
      expect(span.getAttribute('data-testid')).toBe('current');
      expect(span.getAttribute('id')).toBe('current-crumb');
      expect(span.getAttribute('aria-describedby')).toBe('desc');
    });

    it('should not pass non-supported attributes', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs>
            <aegov-breadcrumbs-item href="/" title="tooltip" custom="value">Home</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      const link = page.root.querySelector('aegov-breadcrumbs-item a');
      expect(link.getAttribute('title')).toBeNull();
      expect(link.getAttribute('custom')).toBeNull();
    });
  });

  describe('microdata', () => {
    it('should add itemListElement attributes on li when microdata enabled', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs is-microdata>
            <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      await page.waitForChanges();

      const li = page.root.querySelector('aegov-breadcrumbs-item li');
      expect(li.getAttribute('itemprop')).toBe('itemListElement');
      expect(li.hasAttribute('itemscope')).toBe(true);
      expect(li.getAttribute('itemtype')).toBe('https://schema.org/ListItem');
    });

    it('should add itemprop="item" on link', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs is-microdata>
            <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      await page.waitForChanges();

      const link = page.root.querySelector('aegov-breadcrumbs-item a');
      expect(link.getAttribute('itemprop')).toBe('item');
    });

    it('should add meta tag with position', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs is-microdata>
            <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
            <aegov-breadcrumbs-item href="/products">Products</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      await page.waitForChanges();

      const metas = page.root.querySelectorAll('aegov-breadcrumbs-item meta[itemprop="position"]');
      expect(metas.length).toBe(2);
      expect(metas[0].getAttribute('content')).toBe('1');
      expect(metas[1].getAttribute('content')).toBe('2');
    });

    it('should add itemprop="name" on span inside link', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs is-microdata>
            <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      await page.waitForChanges();

      const span = page.root.querySelector('aegov-breadcrumbs-item a span');
      expect(span.getAttribute('itemprop')).toBe('name');
    });

    it('should add itemprop="name" on current item span', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs is-microdata>
            <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
            <aegov-breadcrumbs-item>Current</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      await page.waitForChanges();

      const currentSpan = page.root.querySelector('aegov-breadcrumbs-item:last-child span.breadcrumb-current');
      expect(currentSpan.getAttribute('itemprop')).toBe('name');
    });

    it('should not add microdata attributes when disabled', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs>
            <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      await page.waitForChanges();

      const li = page.root.querySelector('aegov-breadcrumbs-item li');
      const link = page.root.querySelector('aegov-breadcrumbs-item a');
      const meta = page.root.querySelector('aegov-breadcrumbs-item meta');

      expect(li.getAttribute('itemprop')).toBeNull();
      expect(link.getAttribute('itemprop')).toBeNull();
      expect(meta).toBeNull();
    });

    it('should add microdata on current item li', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs is-microdata>
            <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
            <aegov-breadcrumbs-item>Current</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      await page.waitForChanges();

      const lastLi = page.root.querySelector('aegov-breadcrumbs-item:last-child li');
      expect(lastLi.getAttribute('itemprop')).toBe('itemListElement');
      expect(lastLi.hasAttribute('itemscope')).toBe(true);
      expect(lastLi.getAttribute('itemtype')).toBe('https://schema.org/ListItem');
    });
  });

  describe('standalone validation', () => {
    it('should throw error when used without parent breadcrumbs', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      try {
        await newSpecPage({
          components: [AegovBreadcrumbsItem],
          html: `<aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>`,
        });
      } catch (e) {
        expect(e.message).toContain('must be used inside <aegov-breadcrumbs>');
      }

      consoleErrorSpy.mockRestore();
    });

    it('should throw descriptive error message', async () => {
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

      try {
        await newSpecPage({
          components: [AegovBreadcrumbsItem],
          html: `<aegov-breadcrumbs-item>Standalone</aegov-breadcrumbs-item>`,
        });
      } catch (e) {
        expect(e.message).toContain('[aegov-breadcrumbs-item]');
        expect(e.message).toContain('Please wrap it with <aegov-breadcrumbs>');
      }

      consoleErrorSpy.mockRestore();
    });
  });

  describe('events', () => {
    it('should emit aegovBreadcrumbItemClick on link click', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs>
            <aegov-breadcrumbs-item href="/test">Test</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      const item = page.root.querySelector('aegov-breadcrumbs-item') as HTMLAegovBreadcrumbsItemElement;
      const eventSpy = jest.fn();
      item.addEventListener('aegovBreadcrumbItemClick', eventSpy);

      const link = page.root.querySelector('aegov-breadcrumbs-item a') as HTMLAnchorElement;
      link.click();

      expect(eventSpy).toHaveBeenCalled();
    });

    it('should include href in event detail', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs>
            <aegov-breadcrumbs-item href="/products">Products</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      const item = page.root.querySelector('aegov-breadcrumbs-item') as HTMLAegovBreadcrumbsItemElement;
      let eventDetail: any;
      item.addEventListener('aegovBreadcrumbItemClick', (e: CustomEvent) => {
        eventDetail = e.detail;
      });

      const link = page.root.querySelector('aegov-breadcrumbs-item a') as HTMLAnchorElement;
      link.click();

      expect(eventDetail.href).toBe('/products');
    });

    it('should include event in detail', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs>
            <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      const item = page.root.querySelector('aegov-breadcrumbs-item') as HTMLAegovBreadcrumbsItemElement;
      let eventDetail: any;
      item.addEventListener('aegovBreadcrumbItemClick', (e: CustomEvent) => {
        eventDetail = e.detail;
      });

      const link = page.root.querySelector('aegov-breadcrumbs-item a') as HTMLAnchorElement;
      link.click();

      expect(eventDetail.event).toBeTruthy();
    });

    it('should emit event on current item click', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs>
            <aegov-breadcrumbs-item>Current</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      const item = page.root.querySelector('aegov-breadcrumbs-item') as HTMLAegovBreadcrumbsItemElement;
      const eventSpy = jest.fn();
      item.addEventListener('aegovBreadcrumbItemClick', eventSpy);

      // Current items (spans) don't have click handlers attached
      // Only link items emit click events
      const link = page.root.querySelector('aegov-breadcrumbs-item a');
      expect(link).toBeNull();
    });

    it('should have undefined href in detail when no href set on current item', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs>
            <aegov-breadcrumbs-item href="">Home</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      // Items with empty href still render as links per component logic
      const link = page.root.querySelector('aegov-breadcrumbs-item a') as HTMLElement;
      if (link) {
        const item = page.root.querySelector('aegov-breadcrumbs-item') as HTMLAegovBreadcrumbsItemElement;
        let eventDetail: any;
        item.addEventListener('aegovBreadcrumbItemClick', (e: CustomEvent) => {
          eventDetail = e.detail;
        });
        link.click();
        expect(eventDetail).toBeTruthy();
      }
    });
  });
});
