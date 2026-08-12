import { newSpecPage } from '@stencil/core/testing';
import { AegovBreadcrumbs } from '../aegov-breadcrumbs/aegov-breadcrumbs';
import { AegovBreadcrumbsItem } from './aegov-breadcrumbs-item';

describe('aegov-breadcrumbs-item', () => {
  it('renders as link when href provided', async () => {
    const page = await newSpecPage({
      components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
      html: `<aegov-breadcrumbs><aegov-breadcrumbs-item href="/home">Home</aegov-breadcrumbs-item></aegov-breadcrumbs>`,
    });
    const a = page.root.querySelector('aegov-breadcrumbs-item a');
    expect(a).not.toBeNull();
    expect(a.getAttribute('href')).toBe('/home');
    expect(a.className).toContain('breadcrumb-link');
  });

  it('renders as plain span when no href', async () => {
    const page = await newSpecPage({
      components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
      html: `<aegov-breadcrumbs><aegov-breadcrumbs-item>Current</aegov-breadcrumbs-item></aegov-breadcrumbs>`,
    });
    const item = page.root.querySelector('aegov-breadcrumbs-item');
    expect(item.querySelector('a')).toBeNull();
    expect(item.querySelector('.breadcrumb-current')).not.toBeNull();
  });

  it('renders a visible configuration error when used outside aegov-breadcrumbs', async () => {
    // A thrown error from componentWillLoad is silently swallowed by Stencil's lifecycle,
    // so misuse must render a visible signal instead (same pattern as aegov-callout).
    const page = await newSpecPage({
      components: [AegovBreadcrumbsItem],
      html: `<aegov-breadcrumbs-item>Orphan</aegov-breadcrumbs-item>`,
    });
    const alertEl = page.root.querySelector('[role="alert"]');
    expect(alertEl).not.toBeNull();
    expect(alertEl.textContent).toContain('must be used inside');
  });

  it('truncates text when maxLength is exceeded', async () => {
    const page = await newSpecPage({
      components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
      html: `<aegov-breadcrumbs max-length="5"><aegov-breadcrumbs-item>VeryLongTitle</aegov-breadcrumbs-item></aegov-breadcrumbs>`,
    });
    const item = page.root.querySelector('aegov-breadcrumbs-item');
    expect(item.textContent).toContain('VeryL…');
  });

  it('does not truncate when text fits within maxLength', async () => {
    const page = await newSpecPage({
      components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
      html: `<aegov-breadcrumbs max-length="20"><aegov-breadcrumbs-item>Short</aegov-breadcrumbs-item></aegov-breadcrumbs>`,
    });
    const item = page.root.querySelector('aegov-breadcrumbs-item');
    expect(item.textContent).toContain('Short');
    expect(item.textContent).not.toContain('…');
  });

  it('does not render separator on last item', async () => {
    const page = await newSpecPage({
      components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
      html: `<aegov-breadcrumbs>
        <aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item>
        <aegov-breadcrumbs-item>Last</aegov-breadcrumbs-item>
      </aegov-breadcrumbs>`,
    });
    const items = page.root.querySelectorAll('aegov-breadcrumbs-item');
    const lastSep = items[1].querySelector('.breadcrumb__separator');
    expect(lastSep).toBeNull();
  });

  it('emits aegovBreadcrumbItemClick when link is clicked', async () => {
    const page = await newSpecPage({
      components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
      html: `<aegov-breadcrumbs><aegov-breadcrumbs-item href="/p">Page</aegov-breadcrumbs-item></aegov-breadcrumbs>`,
    });
    const item = page.root.querySelector('aegov-breadcrumbs-item');
    const spy = jest.fn();
    item.addEventListener('aegovBreadcrumbItemClick', spy);
    const a = item.querySelector('a') as HTMLAnchorElement;
    a.click();
    await page.waitForChanges();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('renders microdata attributes when isMicrodata true', async () => {
    const page = await newSpecPage({
      components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
      html: `<aegov-breadcrumbs is-microdata="true"><aegov-breadcrumbs-item href="/">Home</aegov-breadcrumbs-item></aegov-breadcrumbs>`,
    });
    const item = page.root.querySelector('aegov-breadcrumbs-item');
    const li = item.querySelector('li');
    expect(li.getAttribute('itemtype')).toBe('https://schema.org/ListItem');
    expect(item.querySelector('meta[itemprop="position"]')).not.toBeNull();
  });

  it('forwards target attribute when href is set', async () => {
    const page = await newSpecPage({
      components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
      html: `<aegov-breadcrumbs><aegov-breadcrumbs-item href="/" target="_blank">Home</aegov-breadcrumbs-item></aegov-breadcrumbs>`,
    });
    const a = page.root.querySelector('aegov-breadcrumbs-item a');
    expect(a.getAttribute('target')).toBe('_blank');
  });

  it('renders element children via slot when present', async () => {
    const page = await newSpecPage({
      components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
      html: `<aegov-breadcrumbs><aegov-breadcrumbs-item href="/"><svg></svg>Home</aegov-breadcrumbs-item></aegov-breadcrumbs>`,
    });
    const item = page.root.querySelector('aegov-breadcrumbs-item');
    expect(item.querySelector('svg')).not.toBeNull();
  });

  it('does not forward link-specific attributes (title/hreflang/rel/referrerpolicy) to the non-linked span', async () => {
    const page = await newSpecPage({
      components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
      html: `<aegov-breadcrumbs><aegov-breadcrumbs-item title="ignored" hreflang="ar">Current</aegov-breadcrumbs-item></aegov-breadcrumbs>`,
    });
    const span = page.root.querySelector('.breadcrumb-current');
    expect(span.getAttribute('title')).toBeNull();
    expect(span.getAttribute('hreflang')).toBeNull();
  });

  it('does forward link-specific attributes to the <a> on a linked item', async () => {
    const page = await newSpecPage({
      components: [AegovBreadcrumbs, AegovBreadcrumbsItem],
      html: `<aegov-breadcrumbs><aegov-breadcrumbs-item href="/x" title="Go to X" hreflang="ar">X</aegov-breadcrumbs-item></aegov-breadcrumbs>`,
    });
    const a = page.root.querySelector('a');
    expect(a.getAttribute('title')).toBe('Go to X');
    expect(a.getAttribute('hreflang')).toBe('ar');
  });
});
