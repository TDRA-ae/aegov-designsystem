import { newSpecPage } from '@stencil/core/testing';
import { AegovHeaderBanner } from './aegov-header-banner';
import { AegovHeader } from '../aegov-header/aegov-header';
import { AegovDrawer } from '../aegov-drawer/aegov-drawer';
import { AegovButton } from '../aegov-button/aegov-button';

describe('aegov-header-banner', () => {
  beforeEach(() => {
    document.querySelectorAll('.aegov-skip-content').forEach((el) => el.remove());
  });

  // mock-doc resets the document between pages by truncating body.childNodes,
  // which never fires disconnectedCallback and leaves old nodes reporting
  // isConnected. Remove banners properly so a previous test's banner cannot
  // hold the one-per-page slot.
  afterEach(() => {
    document.querySelectorAll('aegov-header, aegov-header-banner').forEach((el) => el.remove());
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

  describe('one banner per page', () => {
    let errorSpy: jest.SpyInstance;
    beforeEach(() => {
      errorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    });
    afterEach(() => { errorSpy.mockRestore(); });

    const html = (extra = '') =>
      `<aegov-header-banner id="a" entity-name="A" entity-domain="https://a.gov.ae" ${extra}></aegov-header-banner>` +
      `<aegov-header-banner id="b" entity-name="B" entity-domain="https://b.gov.ae" ${extra}></aegov-header-banner>`;

    it('renders the first banner and an error block for the second', async () => {
      const page = await newSpecPage({ components: [AegovHeaderBanner], html: html() });
      const first = page.body.querySelector('#a');
      const second = page.body.querySelector('#b');
      expect(first.shadowRoot.querySelector('.header__top')).not.toBeNull();
      expect(first.shadowRoot.querySelector('.aegov-header-banner--error')).toBeNull();
      expect(second.shadowRoot.querySelector('.header__top')).toBeNull();
      expect(second.shadowRoot.querySelector('.aegov-header-banner--error')).not.toBeNull();
      expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('Only one aegov-header-banner is allowed per page'), second);
      expect(errorSpy).toHaveBeenCalledTimes(1);
    });

    it('keeps the banner inside aegov-header and rejects a standalone one, whichever connects first', async () => {
      const page = await newSpecPage({
        components: [AegovHeaderBanner, AegovHeader, AegovDrawer, AegovButton],
        html:
          `<aegov-header-banner id="standalone" entity-name="S" entity-domain="https://s.gov.ae"></aegov-header-banner>` +
          `<aegov-header entity-name="H" entity-domain="https://h.gov.ae"><div slot="mobile-content">m</div></aegov-header>`,
      });
      const embedded = page.body.querySelector('aegov-header').shadowRoot.querySelector('aegov-header-banner');
      const standalone = page.body.querySelector('#standalone');
      expect(embedded.shadowRoot.querySelector('.header__top')).not.toBeNull();
      expect(standalone.shadowRoot.querySelector('.aegov-header-banner--error')).not.toBeNull();
      expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('Only one aegov-header-banner is allowed per page'), standalone);
    });

    it('injects only one skip link', async () => {
      const page = await newSpecPage({ components: [AegovHeaderBanner], html: html('skip-content-container="#main"') });
      expect(page.doc.querySelectorAll('.aegov-skip-content').length).toBe(1);
    });

    it('promotes the duplicate when the original banner is removed', async () => {
      const page = await newSpecPage({ components: [AegovHeaderBanner], html: html() });
      page.body.querySelector('#a').remove();
      await page.waitForChanges();
      const second = page.body.querySelector('#b');
      expect(second.shadowRoot.querySelector('.header__top')).not.toBeNull();
      expect(second.shadowRoot.querySelector('.aegov-header-banner--error')).toBeNull();
    });
  });
});
