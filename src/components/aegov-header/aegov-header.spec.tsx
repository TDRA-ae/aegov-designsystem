import { newSpecPage } from '@stencil/core/testing';
import { AegovHeader } from './aegov-header';
import { AegovHeaderBanner } from '../aegov-header-banner/aegov-header-banner';

describe('aegov-header', () => {
  beforeEach(() => {
    document.querySelectorAll('.aegov-skip-content').forEach((el) => el.remove());
  });

  it('renders ministry variant by default', async () => {
    const page = await newSpecPage({
      components: [AegovHeader, AegovHeaderBanner],
      html: `<aegov-header entity-name="Ministry" entity-domain="https://example.gov.ae"></aegov-header>`,
    });
    const header = page.root.shadowRoot.querySelector('header');
    expect(header).not.toBeNull();
    expect(header.className).toContain('header--ministry');
  });

  it('applies authority variant class', async () => {
    const page = await newSpecPage({
      components: [AegovHeader, AegovHeaderBanner],
      html: `<aegov-header variant="authority" entity-name="Authority" entity-domain="https://x.gov.ae"></aegov-header>`,
    });
    const header = page.root.shadowRoot.querySelector('header');
    expect(header.className).toContain('header--authority');
  });

  it('renders aegov-header-banner with forwarded entity props', async () => {
    const page = await newSpecPage({
      components: [AegovHeader, AegovHeaderBanner],
      html: `<aegov-header entity-name="My Entity" entity-domain="https://my.gov.ae"></aegov-header>`,
    });
    const banner = page.root.shadowRoot.querySelector('aegov-header-banner');
    expect(banner).not.toBeNull();
    expect(banner.getAttribute('entity-name')).toBe('My Entity');
    expect(banner.getAttribute('entity-domain')).toBe('https://my.gov.ae');
  });

  it('forwards skip-content-container prop to banner', async () => {
    const page = await newSpecPage({
      components: [AegovHeader, AegovHeaderBanner],
      html: `<aegov-header entity-name="N" entity-domain="https://x.gov.ae" skip-content-container="#main"></aegov-header>`,
    });
    const banner = page.root.shadowRoot.querySelector('aegov-header-banner');
    expect(banner.getAttribute('skip-content-container')).toBe('#main');
  });

  it('renders logo and search slots', async () => {
    const page = await newSpecPage({
      components: [AegovHeader, AegovHeaderBanner],
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

  it('wraps logo slot in anchor pointing to entity-domain', async () => {
    const page = await newSpecPage({
      components: [AegovHeader, AegovHeaderBanner],
      html: `<aegov-header entity-name="N" entity-domain="https://x.gov.ae"></aegov-header>`,
    });
    const anchor = page.root.shadowRoot.querySelector('.header__logo a');
    expect(anchor).not.toBeNull();
    expect(anchor.getAttribute('href')).toBe('https://x.gov.ae');
  });

  it('forwards actions slot from header through to banner', async () => {
    const page = await newSpecPage({
      components: [AegovHeader, AegovHeaderBanner],
      html: `<aegov-header entity-name="N" entity-domain="https://x.gov.ae"><a slot="actions" href="#" class="custom-action">Custom</a></aegov-header>`,
    });
    const headerForwarder = page.root.shadowRoot.querySelector('aegov-header-banner slot[name="actions"][slot="actions"]');
    expect(headerForwarder).not.toBeNull();
    const slotted = page.root.querySelector('a[slot="actions"]');
    expect(slotted).not.toBeNull();
  });

  it('uses shadow DOM encapsulation', async () => {
    const page = await newSpecPage({
      components: [AegovHeader, AegovHeaderBanner],
      html: `<aegov-header entity-name="N" entity-domain="https://x.gov.ae"></aegov-header>`,
    });
    expect(page.root.shadowRoot).not.toBeNull();
  });
});
