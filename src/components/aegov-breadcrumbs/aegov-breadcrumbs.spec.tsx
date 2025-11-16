import { newSpecPage } from '@stencil/core/testing';
import { AegovBreadcrumbs } from './aegov-breadcrumbs';
import { AegovBreadcrumbsItem } from '../aegov-breadcrumbs-item/aegov-breadcrumbs-item';

describe('aegov-breadcrumbs', () => {
  describe('rendering', () => {
    it('should render with default props', async () => {
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
      const nav = page.root.querySelector('nav');
      expect(nav).toBeTruthy();
      expect(nav.getAttribute('aria-label')).toBe('Breadcrumb');
    });

    it('should render breadcrumb list', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs>
            <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
            <aegov-breadcrumbs-item>Current</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      const ol = page.root.querySelector('ol');
      expect(ol).toBeTruthy();
      expect(ol.classList.contains('breadcrumb-list')).toBe(true);
    });

    it('should render breadcrumb items', async () => {
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
    it('should default to slash separator', async () => {
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

    it('should accept chevron separator', async () => {
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
  });

  describe('item properties', () => {
    it('should set isLast on last item', async () => {
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

      const items = page.root.querySelectorAll('aegov-breadcrumbs-item');
      const firstItem = items[0] as HTMLAegovBreadcrumbsItemElement;
      const secondItem = items[1] as HTMLAegovBreadcrumbsItemElement;
      const lastItem = items[2] as HTMLAegovBreadcrumbsItemElement;

      expect(firstItem.isLast).toBe(false);
      expect(secondItem.isLast).toBe(false);
      expect(lastItem.isLast).toBe(true);
    });

    it('should pass separator to items', async () => {
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

      const items = page.root.querySelectorAll('aegov-breadcrumbs-item');
      const firstItem = items[0] as HTMLAegovBreadcrumbsItemElement;

      expect(firstItem.separator).toBe('chevron');
    });

    it('should pass maxLength to items', async () => {
      const page = await newSpecPage({
        components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
        html: `
          <aegov-breadcrumbs max-length="15">
            <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
          </aegov-breadcrumbs>
        `,
      });

      await page.waitForChanges();

      const items = page.root.querySelectorAll('aegov-breadcrumbs-item');
      const item = items[0] as HTMLAegovBreadcrumbsItemElement;

      expect(item.maxLength).toBe(15);
    });
  });
});
