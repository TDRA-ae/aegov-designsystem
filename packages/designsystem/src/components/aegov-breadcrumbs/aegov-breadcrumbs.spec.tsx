import { newSpecPage } from '@stencil/core/testing';
import { AegovBreadcrumbs } from './aegov-breadcrumbs';
import { AegovBreadcrumbsItem } from '../aegov-breadcrumbs-item/aegov-breadcrumbs-item';

describe('aegov-breadcrumbs', () => {
  it('renders default nav with breadcrumb class', async () => {
    const page = await newSpecPage({
      components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
      html: `<aegov-breadcrumbs><aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item></aegov-breadcrumbs>`,
    });
    const nav = page.root.querySelector('nav');
    expect(nav).not.toBeNull();
    expect(nav.getAttribute('aria-label')).toBe('Breadcrumb');
    expect(nav.className).toContain('aegov-breadcrumbs');
    expect(nav.querySelector('ol')).not.toBeNull();
  });

  it('auto-generates fieldId when not provided', async () => {
    const page = await newSpecPage({
      components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
      html: `<aegov-breadcrumbs><aegov-breadcrumbs-item>Home</aegov-breadcrumbs-item></aegov-breadcrumbs>`,
    });
    expect(page.rootInstance.fieldId).toMatch(/^aegov-breadcrumbs-\d+$/);
    expect(page.root.querySelector('nav').id).toBe(page.rootInstance.fieldId);
  });

  it('respects user-provided fieldId', async () => {
    const page = await newSpecPage({
      components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
      html: `<aegov-breadcrumbs field-id="bc-1"><aegov-breadcrumbs-item>Home</aegov-breadcrumbs-item></aegov-breadcrumbs>`,
    });
    expect(page.rootInstance.fieldId).toBe('bc-1');
    expect(page.root.querySelector('nav').id).toBe('bc-1');
  });

  it('passes separator down to children (slash default)', async () => {
    const page = await newSpecPage({
      components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
      html: `<aegov-breadcrumbs>
        <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
        <aegov-breadcrumbs-item>Page</aegov-breadcrumbs-item>
      </aegov-breadcrumbs>`,
    });
    const items = page.root.querySelectorAll('aegov-breadcrumbs-item');
    expect((items[0] as any).separator).toBe('slash');
  });

  it('passes chevron separator to children', async () => {
    const page = await newSpecPage({
      components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
      html: `<aegov-breadcrumbs separator="chevron">
        <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
        <aegov-breadcrumbs-item>Page</aegov-breadcrumbs-item>
      </aegov-breadcrumbs>`,
    });
    const items = page.root.querySelectorAll('aegov-breadcrumbs-item');
    expect((items[0] as any).separator).toBe('chevron');
  });

  it('marks the last child item with isLast=true', async () => {
    const page = await newSpecPage({
      components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
      html: `<aegov-breadcrumbs>
        <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
        <aegov-breadcrumbs-item href="/a">A</aegov-breadcrumbs-item>
        <aegov-breadcrumbs-item>Last</aegov-breadcrumbs-item>
      </aegov-breadcrumbs>`,
    });
    const items = page.root.querySelectorAll('aegov-breadcrumbs-item');
    expect((items[0] as any).isLast).toBe(false);
    expect((items[1] as any).isLast).toBe(false);
    expect((items[2] as any).isLast).toBe(true);
  });

  it('passes maxLength prop to children when set', async () => {
    const page = await newSpecPage({
      components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
      html: `<aegov-breadcrumbs max-length="5">
        <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
        <aegov-breadcrumbs-item>VeryLongTitle</aegov-breadcrumbs-item>
      </aegov-breadcrumbs>`,
    });
    const items = page.root.querySelectorAll('aegov-breadcrumbs-item');
    expect((items[1] as any).maxLength).toBe(5);
  });

  it('sets schema.org microdata when isMicrodata true', async () => {
    const page = await newSpecPage({
      components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
      html: `<aegov-breadcrumbs is-microdata="true">
        <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
      </aegov-breadcrumbs>`,
    });
    const ol = page.root.querySelector('ol');
    expect(ol.getAttribute('itemtype')).toBe('https://schema.org/BreadcrumbList');
  });

  it('assigns 1-indexed position to children', async () => {
    const page = await newSpecPage({
      components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
      html: `<aegov-breadcrumbs is-microdata="true">
        <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
        <aegov-breadcrumbs-item href="/a">A</aegov-breadcrumbs-item>
      </aegov-breadcrumbs>`,
    });
    const items = page.root.querySelectorAll('aegov-breadcrumbs-item');
    expect((items[0] as any).position).toBe(1);
    expect((items[1] as any).position).toBe(2);
  });

  it('forwards aria-* and data-* attributes to nav', async () => {
    const page = await newSpecPage({
      components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
      html: `<aegov-breadcrumbs aria-describedby="d" data-test="x"><aegov-breadcrumbs-item>X</aegov-breadcrumbs-item></aegov-breadcrumbs>`,
    });
    const nav = page.root.querySelector('nav');
    expect(nav.getAttribute('aria-describedby')).toBe('d');
    expect(nav.getAttribute('data-test')).toBe('x');
  });
});
