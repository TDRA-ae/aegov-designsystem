import { newSpecPage } from '@stencil/core/testing';
import { AegovBreadcrumbs } from './aegov-breadcrumbs';
import { AegovBreadcrumbsItem } from '../aegov-breadcrumbs-item/aegov-breadcrumbs-item';

describe('aegov-breadcrumbs', () => {
  describe('rendering', () => {
    it('should render', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs>
            <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
            <aegov-breadcrumbs-item>Current</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });
      expect(page.root).toBeTruthy();
    });

    it('should render nav element with aria-label', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs>
            <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
            <aegov-breadcrumbs-item>Current</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      const nav = page.root.querySelector('nav');
      expect(nav).toBeTruthy();
      expect(nav.getAttribute('aria-label')).toBe('Breadcrumb');
    });

    it('should render aegov-breadcrumbs class on nav', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs>
            <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      const nav = page.root.querySelector('nav.aegov-breadcrumbs');
      expect(nav).toBeTruthy();
    });

    it('should render ordered list', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs>
            <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      const ol = page.root.querySelector('ol.breadcrumb__list');
      expect(ol).toBeTruthy();
    });

    it('should render multiple breadcrumb items', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs>
            <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
            <aegov-breadcrumbs-item href="/products">Products</aegov-breadcrumbs-item>
            <aegov-breadcrumbs-item>Item</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      const items = page.root.querySelectorAll('aegov-breadcrumbs-item');
      expect(items.length).toBe(3);
    });
  });

  describe('separator prop', () => {
    it('should default to slash', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs>
            <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
            <aegov-breadcrumbs-item>Current</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      const component = page.rootInstance as AegovBreadcrumbs;
      expect(component.separator).toBe('slash');
    });

    it('should accept chevron value', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs separator="chevron">
            <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
            <aegov-breadcrumbs-item>Current</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      const component = page.rootInstance as AegovBreadcrumbs;
      expect(component.separator).toBe('chevron');
    });

    it('should pass separator to child items', async () => {
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

      const items = page.root.querySelectorAll('aegov-breadcrumbs-item') as NodeListOf<HTMLAegovBreadcrumbsItemElement>;
      expect(items[0].separator).toBe('chevron');
      expect(items[1].separator).toBe('chevron');
    });
  });

  describe('maxLength prop', () => {
    it('should not have maxLength by default', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs>
            <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      const component = page.rootInstance as AegovBreadcrumbs;
      expect(component.maxLength).toBeUndefined();
    });

    it('should accept maxLength value', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs max-length="20">
            <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      const component = page.rootInstance as AegovBreadcrumbs;
      expect(component.maxLength).toBe(20);
    });

    it('should pass maxLength to child items', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs max-length="15">
            <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      await page.waitForChanges();

      const item = page.root.querySelector('aegov-breadcrumbs-item') as HTMLAegovBreadcrumbsItemElement;
      expect(item.maxLength).toBe(15);
    });
  });

  describe('item properties', () => {
    it('should set isLast on last item only', async () => {
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

      const items = page.root.querySelectorAll('aegov-breadcrumbs-item') as NodeListOf<HTMLAegovBreadcrumbsItemElement>;
      expect(items[0].isLast).toBe(false);
      expect(items[1].isLast).toBe(false);
      expect(items[2].isLast).toBe(true);
    });

    it('should set position on items (1-indexed)', async () => {
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

      const items = page.root.querySelectorAll('aegov-breadcrumbs-item') as NodeListOf<HTMLAegovBreadcrumbsItemElement>;
      expect(items[0].position).toBe(1);
      expect(items[1].position).toBe(2);
      expect(items[2].position).toBe(3);
    });

    it('should set isLast on single item', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs>
            <aegov-breadcrumbs-item>Home</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      await page.waitForChanges();

      const item = page.root.querySelector('aegov-breadcrumbs-item') as HTMLAegovBreadcrumbsItemElement;
      expect(item.isLast).toBe(true);
    });
  });

  describe('pass-through attributes', () => {
    it('should pass through aria-* attributes to nav', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs aria-describedby="breadcrumb-desc">
            <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      const nav = page.root.querySelector('nav');
      expect(nav.getAttribute('aria-describedby')).toBe('breadcrumb-desc');
    });

    it('should pass through data-* attributes to nav', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs data-testid="main-breadcrumb" data-tracking="nav-123">
            <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      const nav = page.root.querySelector('nav');
      expect(nav.getAttribute('data-testid')).toBe('main-breadcrumb');
      expect(nav.getAttribute('data-tracking')).toBe('nav-123');
    });

    it('should pass through id attribute to nav', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs id="primary-nav">
            <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      const nav = page.root.querySelector('nav');
      expect(nav.getAttribute('id')).toBe('primary-nav');
    });

    it('should pass through multiple attribute types simultaneously', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs id="test-id" aria-describedby="desc-1" data-value="123">
            <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      const nav = page.root.querySelector('nav');
      expect(nav.getAttribute('id')).toBe('test-id');
      expect(nav.getAttribute('aria-describedby')).toBe('desc-1');
      expect(nav.getAttribute('data-value')).toBe('123');
    });

    it('should not pass through non-supported attributes', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs title="tooltip" custom="value">
            <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      const nav = page.root.querySelector('nav');
      expect(nav.getAttribute('title')).toBeNull();
      expect(nav.getAttribute('custom')).toBeNull();
    });
  });

  describe('microdata', () => {
    it('should not add microdata attributes by default', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs>
            <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      const ol = page.root.querySelector('ol');
      expect(ol.getAttribute('itemscope')).toBeNull();
      expect(ol.getAttribute('itemtype')).toBeNull();
    });

    it('should add microdata attributes to ol when microdata is true', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs microdata>
            <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      await page.waitForChanges();

      const ol = page.root.querySelector('ol');
      expect(ol.hasAttribute('itemscope')).toBe(true);
      expect(ol.getAttribute('itemtype')).toBe('https://schema.org/BreadcrumbList');
    });

    it('should pass microdata property to child items', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs microdata>
            <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
            <aegov-breadcrumbs-item href="/products">Products</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      await page.waitForChanges();

      const items = page.root.querySelectorAll('aegov-breadcrumbs-item') as NodeListOf<HTMLAegovBreadcrumbsItemElement>;
      expect(items[0].microdata).toBe(true);
      expect(items[1].microdata).toBe(true);
    });

    it('should set position on child items for microdata', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs microdata>
            <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
            <aegov-breadcrumbs-item href="/products">Products</aegov-breadcrumbs-item>
            <aegov-breadcrumbs-item>Item</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      await page.waitForChanges();

      const items = page.root.querySelectorAll('aegov-breadcrumbs-item') as NodeListOf<HTMLAegovBreadcrumbsItemElement>;
      expect(items[0].position).toBe(1);
      expect(items[1].position).toBe(2);
      expect(items[2].position).toBe(3);
    });

    it('should add microdata attributes to li elements with links', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs microdata>
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

    it('should add itemprop="item" to link elements', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs microdata>
            <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      await page.waitForChanges();

      const link = page.root.querySelector('aegov-breadcrumbs-item a');
      expect(link.getAttribute('itemprop')).toBe('item');
    });

    it('should wrap link content in span with itemprop="name"', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs microdata>
            <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      await page.waitForChanges();

      const span = page.root.querySelector('aegov-breadcrumbs-item a span');
      expect(span.getAttribute('itemprop')).toBe('name');
      expect(span.textContent).toBe('Home');
    });

    it('should add itemprop="name" to current item span', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs microdata>
            <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
            <aegov-breadcrumbs-item>Current</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      await page.waitForChanges();

      const currentSpan = page.root.querySelector('aegov-breadcrumbs-item:last-child span.breadcrumb-current');
      expect(currentSpan.getAttribute('itemprop')).toBe('name');
      expect(currentSpan.getAttribute('aria-current')).toBe('page');
    });

    it('should add meta tag with position for each item', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs microdata>
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

    it('should not add microdata when disabled', async () => {
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
  });
});
