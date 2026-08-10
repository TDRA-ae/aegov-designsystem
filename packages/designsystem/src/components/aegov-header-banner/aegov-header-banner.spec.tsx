import { newSpecPage } from '@stencil/core/testing';
import { AegovHeaderBanner } from './aegov-header-banner';

describe('aegov-header-banner', () => {
  beforeEach(() => {
    document.querySelectorAll('.aegov-skip-content').forEach((el) => el.remove());
  });

  it('renders error block when entity-name is missing', async () => {
    const page = await newSpecPage({
      components: [AegovHeaderBanner],
      html: `<aegov-header-banner entity-domain="https://example.gov.ae"></aegov-header-banner>`,
    });
    expect(page.root.shadowRoot.querySelector('.aegov-header-banner--error')).not.toBeNull();
  });

  it('renders error block when entity-domain is missing', async () => {
    const page = await newSpecPage({
      components: [AegovHeaderBanner],
      html: `<aegov-header-banner entity-name="Ministry"></aegov-header-banner>`,
    });
    expect(page.root.shadowRoot.querySelector('.aegov-header-banner--error')).not.toBeNull();
  });

  it('renders banner when both required props provided', async () => {
    const page = await newSpecPage({
      components: [AegovHeaderBanner],
      html: `<aegov-header-banner entity-name="Ministry" entity-domain="https://example.gov.ae"></aegov-header-banner>`,
    });
    expect(page.root.shadowRoot.querySelector('.aegov-header-banner')).not.toBeNull();
    expect(page.root.shadowRoot.querySelector('.header__top')).not.toBeNull();
  });

  it('renders entity name and domain in expand panel', async () => {
    const page = await newSpecPage({
      components: [AegovHeaderBanner],
      html: `<aegov-header-banner entity-name="My Entity" entity-domain="https://my.gov.ae"></aegov-header-banner>`,
    });
    const html = page.root.shadowRoot.innerHTML;
    expect(html).toContain('My Entity');
    expect(html).toContain('https://my.gov.ae');
  });

  it('toggles headerExpanded state when trigger is clicked', async () => {
    const page = await newSpecPage({
      components: [AegovHeaderBanner],
      html: `<aegov-header-banner entity-name="N" entity-domain="https://x.gov.ae"></aegov-header-banner>`,
    });
    const trigger = page.root.shadowRoot.querySelector('a[aria-controls="header-top-expand"]') as HTMLAnchorElement;
    expect(trigger.getAttribute('aria-expanded')).toBe('false');
    trigger.click();
    await page.waitForChanges();
    const triggerAfter = page.root.shadowRoot.querySelector('a[aria-controls="header-top-expand"]');
    expect(triggerAfter.getAttribute('aria-expanded')).toBe('true');
  });

  it('creates skip link when skip-content-container provided', async () => {
    await newSpecPage({
      components: [AegovHeaderBanner],
      html: `<aegov-header-banner entity-name="N" entity-domain="https://x.gov.ae" skip-content-container="#main"></aegov-header-banner>`,
    });
    const skip = document.querySelector('.aegov-skip-content');
    expect(skip).not.toBeNull();
    expect(skip.getAttribute('href')).toBe('#main');
  });

  it('does not create skip link when prop is omitted', async () => {
    await newSpecPage({
      components: [AegovHeaderBanner],
      html: `<aegov-header-banner entity-name="N" entity-domain="https://x.gov.ae"></aegov-header-banner>`,
    });
    expect(document.querySelector('.aegov-skip-content')).toBeNull();
  });

  it('exposes an actions slot with no built-in fallback links', async () => {
    const page = await newSpecPage({
      components: [AegovHeaderBanner],
      html: `<aegov-header-banner entity-name="N" entity-domain="https://x.gov.ae"></aegov-header-banner>`,
    });
    const slot = page.root.shadowRoot.querySelector('slot[name="actions"]');
    expect(slot).not.toBeNull();
    // The component ships no placeholder utility links — consumers supply their own.
    expect(page.root.shadowRoot.querySelectorAll('nav ul li a').length).toBe(0);
  });

  it('accepts slotted actions content', async () => {
    const page = await newSpecPage({
      components: [AegovHeaderBanner],
      html: `<aegov-header-banner entity-name="N" entity-domain="https://x.gov.ae"><a slot="actions" href="#" class="custom-action">Custom</a></aegov-header-banner>`,
    });
    const slotted = page.root.querySelector('a[slot="actions"]');
    expect(slotted).not.toBeNull();
    expect(slotted.textContent).toBe('Custom');
  });

  it('uses shadow DOM encapsulation', async () => {
    const page = await newSpecPage({
      components: [AegovHeaderBanner],
      html: `<aegov-header-banner entity-name="N" entity-domain="https://x.gov.ae"></aegov-header-banner>`,
    });
    expect(page.root.shadowRoot).not.toBeNull();
  });
});
