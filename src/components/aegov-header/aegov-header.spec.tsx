import { newSpecPage } from '@stencil/core/testing';
import { AegovHeader } from './aegov-header';

describe('aegov-header', () => {
  beforeEach(() => {
    // Clean any leftover skip links between tests
    document.querySelectorAll('.aegov-skip-content').forEach((el) => el.remove());
  });

  it('renders error block when entity-name is missing', async () => {
    const page = await newSpecPage({
      components: [AegovHeader],
      html: `<aegov-header entity-domain="https://example.gov.ae"></aegov-header>`,
    });
    const err = page.root.shadowRoot.querySelector('.aegov-header--error');
    expect(err).not.toBeNull();
  });

  it('renders error block when entity-domain is missing', async () => {
    const page = await newSpecPage({
      components: [AegovHeader],
      html: `<aegov-header entity-name="Ministry"></aegov-header>`,
    });
    expect(page.root.shadowRoot.querySelector('.aegov-header--error')).not.toBeNull();
  });

  it('renders ministry variant by default', async () => {
    const page = await newSpecPage({
      components: [AegovHeader],
      html: `<aegov-header entity-name="Ministry" entity-domain="https://example.gov.ae"></aegov-header>`,
    });
    const header = page.root.shadowRoot.querySelector('header');
    expect(header).not.toBeNull();
    expect(header.className).toContain('header--ministry');
  });

  it('applies authority variant class', async () => {
    const page = await newSpecPage({
      components: [AegovHeader],
      html: `<aegov-header variant="authority" entity-name="Authority" entity-domain="https://x.gov.ae"></aegov-header>`,
    });
    const header = page.root.shadowRoot.querySelector('header');
    expect(header.className).toContain('header--authority');
  });

  it('renders entity name and domain in expand panel', async () => {
    const page = await newSpecPage({
      components: [AegovHeader],
      html: `<aegov-header entity-name="My Entity" entity-domain="https://my.gov.ae"></aegov-header>`,
    });
    const html = page.root.shadowRoot.innerHTML;
    expect(html).toContain('My Entity');
    expect(html).toContain('https://my.gov.ae');
  });

  it('toggles headerExpanded state when trigger is clicked', async () => {
    const page = await newSpecPage({
      components: [AegovHeader],
      html: `<aegov-header entity-name="N" entity-domain="https://x.gov.ae"></aegov-header>`,
    });
    const trigger = page.root.shadowRoot.querySelector('a[aria-controls="header-top-expand"]') as HTMLAnchorElement;
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    trigger.click();
    await page.waitForChanges();
    const triggerAfter = page.root.shadowRoot.querySelector('a[aria-controls="header-top-expand"]');
    expect(triggerAfter.getAttribute('aria-expanded')).toBe('true');
  });

  it('renders logo and search slots', async () => {
    const page = await newSpecPage({
      components: [AegovHeader],
      html: `<aegov-header entity-name="N" entity-domain="https://x.gov.ae">
        <img slot="logo" src="logo.png" alt="logo" />
        <input slot="search" type="search" />
      </aegov-header>`,
    });
    const slots = page.root.shadowRoot.querySelectorAll('slot');
    const names = Array.from(slots).map(s => s.getAttribute('name'));
    expect(names).toContain('logo');
    expect(names).toContain('search');
  });

  it('creates skip link when skip-content-container provided', async () => {
    await newSpecPage({
      components: [AegovHeader],
      html: `<aegov-header entity-name="N" entity-domain="https://x.gov.ae" skip-content-container="#main"></aegov-header>`,
    });
    const skip = document.querySelector('.aegov-skip-content');
    expect(skip).not.toBeNull();
    expect(skip.getAttribute('href')).toBe('#main');
  });

  it('does not create skip link when prop is omitted', async () => {
    await newSpecPage({
      components: [AegovHeader],
      html: `<aegov-header entity-name="N" entity-domain="https://x.gov.ae"></aegov-header>`,
    });
    expect(document.querySelector('.aegov-skip-content')).toBeNull();
  });

  it('uses shadow DOM encapsulation', async () => {
    const page = await newSpecPage({
      components: [AegovHeader],
      html: `<aegov-header entity-name="N" entity-domain="https://x.gov.ae"></aegov-header>`,
    });
    expect(page.root.shadowRoot).not.toBeNull();
  });
});
