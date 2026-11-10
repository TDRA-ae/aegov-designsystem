import { newSpecPage } from '@stencil/core/testing';
import { AegovHeader } from './aegov-header';
import { AegovHeaderBanner } from '../aegov-header-banner/aegov-header-banner';
import { AegovDrawer } from '../aegov-drawer/aegov-drawer';
import { AegovButton } from '../aegov-button/aegov-button';

const COMPONENTS = [AegovHeader, AegovHeaderBanner, AegovDrawer, AegovButton];

describe('aegov-header', () => {
  beforeEach(() => {
    document.querySelectorAll('.aegov-skip-content').forEach((el) => el.remove());
    document.documentElement.removeAttribute('dir');
  });

  it('renders ministry variant by default', async () => {
    const page = await newSpecPage({
      components: COMPONENTS,
      html: `<aegov-header entity-name="Ministry" entity-domain="https://example.gov.ae"></aegov-header>`,
    });
    const header = page.root.shadowRoot.querySelector('header');
    expect(header).not.toBeNull();
    expect(header.className).toContain('header--ministry');
  });

  it('applies authority variant class', async () => {
    const page = await newSpecPage({
      components: COMPONENTS,
      html: `<aegov-header variant="authority" entity-name="Authority" entity-domain="https://x.gov.ae"></aegov-header>`,
    });
    const header = page.root.shadowRoot.querySelector('header');
    expect(header.className).toContain('header--authority');
  });

  it('renders aegov-header-banner with forwarded entity props', async () => {
    const page = await newSpecPage({
      components: COMPONENTS,
      html: `<aegov-header entity-name="My Entity" entity-domain="https://my.gov.ae"></aegov-header>`,
    });
    const banner = page.root.shadowRoot.querySelector('aegov-header-banner');
    expect(banner).not.toBeNull();
    expect(banner.getAttribute('entity-name')).toBe('My Entity');
    expect(banner.getAttribute('entity-domain')).toBe('https://my.gov.ae');
  });

  it('forwards skip-content-container prop to banner', async () => {
    const page = await newSpecPage({
      components: COMPONENTS,
      html: `<aegov-header entity-name="N" entity-domain="https://x.gov.ae" skip-content-container="#main"></aegov-header>`,
    });
    const banner = page.root.shadowRoot.querySelector('aegov-header-banner');
    expect(banner.getAttribute('skip-content-container')).toBe('#main');
  });

  it('forwards actions slot from header through to banner', async () => {
    const page = await newSpecPage({
      components: COMPONENTS,
      html: `<aegov-header entity-name="N" entity-domain="https://x.gov.ae"><a slot="actions" href="#" class="custom-action">Custom</a></aegov-header>`,
    });
    const headerForwarder = page.root.shadowRoot.querySelector('aegov-header-banner slot[name="actions"][slot="actions"]');
    expect(headerForwarder).not.toBeNull();
    expect(page.root.querySelector('a[slot="actions"]')).not.toBeNull();
  });

  it('renders logo, navigation, secondary-actions and mobile-content slots', async () => {
    const page = await newSpecPage({
      components: COMPONENTS,
      html: `<aegov-header entity-name="N" entity-domain="https://x.gov.ae">
        <img slot="logo" src="logo.png" alt="logo" />
        <nav slot="navigation"><a href="#">Home</a></nav>
        <button slot="secondary-actions">Login</button>
        <nav slot="mobile-content"><a href="#">Home</a></nav>
      </aegov-header>`,
    });
    const names = Array.from(page.root.shadowRoot.querySelectorAll('slot')).map((s) => s.getAttribute('name'));
    expect(names).toContain('logo');
    expect(names).toContain('navigation');
    expect(names).toContain('secondary-actions');
    expect(names).toContain('mobile-content');
  });

  it('renders the search slot on the ministry variant', async () => {
    const page = await newSpecPage({
      components: COMPONENTS,
      html: `<aegov-header entity-name="N" entity-domain="https://x.gov.ae"></aegov-header>`,
    });
    expect(page.root.shadowRoot.querySelector('.header__search slot[name="search"]')).not.toBeNull();
    expect(page.root.shadowRoot.querySelector('.header__emblem')).toBeNull();
  });

  it('replaces search with the emblem on the authority variant', async () => {
    const page = await newSpecPage({
      components: COMPONENTS,
      html: `<aegov-header variant="authority" entity-name="N" entity-domain="https://x.gov.ae"></aegov-header>`,
    });
    // Forced: the slot is not rendered at all, so any slotted search content
    // stays unprojected.
    expect(page.root.shadowRoot.querySelector('slot[name="search"]')).toBeNull();
    const emblem = page.root.shadowRoot.querySelector('.header__emblem svg');
    expect(emblem).not.toBeNull();
    expect(emblem.getAttribute('aria-hidden')).toBe('true');
  });

  describe('emblem-color', () => {
    const emblemFill = (page: any) =>
      (page.root.shadowRoot.querySelector('.header__emblem') as HTMLElement).style.getPropertyValue('--aegov-emblem-fill');
    const html = (attr = '') =>
      `<aegov-header variant="authority" ${attr} entity-name="N" entity-domain="https://x.gov.ae" logo-label="Home"><nav slot="mobile-content"></nav></aegov-header>`;

    it('defaults to aeblack', async () => {
      const page = await newSpecPage({ components: COMPONENTS, html: html() });
      expect(page.root.emblemColor).toBe('aeblack');
      expect(emblemFill(page)).toContain('--color-aeblack-800');
    });

    it.each([
      ['aegold', '--color-aegold-600'],
      ['whitely', '--color-whitely-50'],
    ])('paints the emblem with the %s token', async (value, token) => {
      const page = await newSpecPage({ components: COMPONENTS, html: html(`emblem-color="${value}"`) });
      expect(emblemFill(page)).toContain(token);
    });

    it('falls back to aeblack on an invalid value and warns', async () => {
      const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
      const page = await newSpecPage({ components: COMPONENTS, html: html('emblem-color="red"') });
      expect(emblemFill(page)).toContain('--color-aeblack-800');
      expect(warn).toHaveBeenCalledWith(expect.stringContaining('emblemColor'));
      warn.mockRestore();
    });

    it('updates when emblemColor changes at runtime', async () => {
      const page = await newSpecPage({ components: COMPONENTS, html: html() });
      page.root.emblemColor = 'whitely';
      await page.waitForChanges();
      expect(emblemFill(page)).toContain('--color-whitely-50');
    });
  });

  it('warns when search content is supplied to the authority variant', async () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    await newSpecPage({
      components: COMPONENTS,
      html: `<aegov-header variant="authority" entity-name="N" entity-domain="https://x.gov.ae" logo-label="Home"><input slot="search" /><nav slot="mobile-content"></nav></aegov-header>`,
    });
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('"search" slot is ignored'));
    warn.mockRestore();
  });

  it('puts search and the emblem in the brand row, beside the menu toggle', async () => {
    const page = await newSpecPage({
      components: COMPONENTS,
      html: `<aegov-header entity-name="N" entity-domain="https://x.gov.ae"></aegov-header>`,
    });
    const end = page.root.shadowRoot.querySelector('.header__brand-row .header__brand-end');
    expect(end.querySelector('.header__search')).not.toBeNull();
    expect(end.querySelector('.header__menu-toggle')).not.toBeNull();
  });

  it('wraps the logo slot in an anchor pointing to entity-domain', async () => {
    const page = await newSpecPage({
      components: COMPONENTS,
      html: `<aegov-header entity-name="N" entity-domain="https://x.gov.ae"></aegov-header>`,
    });
    const anchor = page.root.shadowRoot.querySelector('a.header__logo');
    expect(anchor).not.toBeNull();
    expect(anchor.getAttribute('href')).toBe('https://x.gov.ae');
    expect(anchor.querySelector('slot[name="logo"]')).not.toBeNull();
  });

  it('lays out two rows: brand row, then navigation row', async () => {
    const page = await newSpecPage({
      components: COMPONENTS,
      html: `<aegov-header entity-name="N" entity-domain="https://x.gov.ae"></aegov-header>`,
    });
    const rows = Array.from(page.root.shadowRoot.querySelector('header').children)
      .map((c) => c.className)
      .filter((c) => c.includes('header__'));
    expect(rows.indexOf('header__brand-row')).toBeGreaterThanOrEqual(0);
    expect(rows.indexOf('header__nav-row')).toBeGreaterThan(rows.indexOf('header__brand-row'));
  });

  it('puts navigation and secondary-actions in the second row', async () => {
    const page = await newSpecPage({
      components: COMPONENTS,
      html: `<aegov-header entity-name="N" entity-domain="https://x.gov.ae"></aegov-header>`,
    });
    const navRow = page.root.shadowRoot.querySelector('.header__nav-row');
    expect(navRow.querySelector('.header__nav slot[name="navigation"]')).not.toBeNull();
    expect(navRow.querySelector('.header__actions slot[name="secondary-actions"]')).not.toBeNull();
    // The toggle moved out of the actions group into the brand row.
    expect(navRow.querySelector('.header__menu-toggle')).toBeNull();
  });

  it('defaults collapseAt to lg and applies the modifier class', async () => {
    const page = await newSpecPage({
      components: COMPONENTS,
      html: `<aegov-header entity-name="N" entity-domain="https://x.gov.ae"></aegov-header>`,
    });
    const header = page.root.shadowRoot.querySelector('header');
    expect((page.root as HTMLAegovHeaderElement).collapseAt).toBe('lg');
    expect(header.className).toContain('header--collapse-lg');
  });

  it('applies the collapse modifier for each supported breakpoint', async () => {
    for (const bp of ['md', 'lg', 'xl', '2xl']) {
      const page = await newSpecPage({
        components: COMPONENTS,
        html: `<aegov-header collapse-at="${bp}" entity-name="N" entity-domain="https://x.gov.ae"></aegov-header>`,
      });
      const header = page.root.shadowRoot.querySelector('header');
      expect(header.className).toContain(`header--collapse-${bp}`);
    }
  });

  it('falls back to lg on an invalid collapseAt and warns', async () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    const page = await newSpecPage({
      components: COMPONENTS,
      html: `<aegov-header collapse-at="sm" entity-name="N" entity-domain="https://x.gov.ae" logo-label="Home"><nav slot="mobile-content"></nav></aegov-header>`,
    });
    const header = page.root.shadowRoot.querySelector('header');
    expect(header.className).toContain('header--collapse-lg');
    expect(header.className).not.toContain('header--collapse-sm');
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('collapseAt'));
    warn.mockRestore();
  });

  it('swaps the modifier class when collapseAt changes at runtime', async () => {
    const page = await newSpecPage({
      components: COMPONENTS,
      html: `<aegov-header entity-name="N" entity-domain="https://x.gov.ae"></aegov-header>`,
    });
    (page.root as HTMLAegovHeaderElement).collapseAt = 'xl';
    await page.waitForChanges();

    const header = page.root.shadowRoot.querySelector('header');
    expect(header.className).toContain('header--collapse-xl');
    expect(header.className).not.toContain('header--collapse-lg');
  });

  it('is not sticky by default', async () => {
    const page = await newSpecPage({
      components: COMPONENTS,
      html: `<aegov-header entity-name="N" entity-domain="https://x.gov.ae"></aegov-header>`,
    });
    expect((page.root as HTMLAegovHeaderElement).isSticky).toBe(false);
    expect(page.root.className).not.toContain('header--sticky');
    expect(page.root.className).not.toContain('header--stuck');
  });

  it('puts the sticky class on the host, not the inner header', async () => {
    const page = await newSpecPage({
      components: COMPONENTS,
      html: `<aegov-header is-sticky="true" entity-name="N" entity-domain="https://x.gov.ae"></aegov-header>`,
    });
    // mock-doc's matchMedia stub always reports matches:false, so the desktop
    // gate has to be set by hand here; e2e covers the real media query.
    page.rootInstance.isDesktop = true;
    await page.waitForChanges();

    // Sticky positioning has to apply to the host, because a sticky
    // .header__nav-row would be confined to its parent's box.
    expect(page.root.className).toContain('header--sticky');
    expect(page.root.shadowRoot.querySelector('header').className).not.toContain('header--sticky');
  });

  it('adds the stuck class only while pinned, and removes it again', async () => {
    const page = await newSpecPage({
      components: COMPONENTS,
      html: `<aegov-header is-sticky="true" entity-name="N" entity-domain="https://x.gov.ae"></aegov-header>`,
    });
    page.rootInstance.isDesktop = true;
    await page.waitForChanges();
    expect(page.root.className).not.toContain('header--stuck');

    page.rootInstance.isStuck = true;
    await page.waitForChanges();
    expect(page.root.className).toContain('header--stuck');

    page.rootInstance.isStuck = false;
    await page.waitForChanges();
    expect(page.root.className).not.toContain('header--stuck');
  });

  it('never reports stuck when isSticky is off', async () => {
    const page = await newSpecPage({
      components: COMPONENTS,
      html: `<aegov-header entity-name="N" entity-domain="https://x.gov.ae"></aegov-header>`,
    });
    page.rootInstance.isStuck = true;
    await page.waitForChanges();
    expect(page.root.className).not.toContain('header--stuck');
  });

  it('drops the stuck state and emits unstuck when isSticky is turned off', async () => {
    const page = await newSpecPage({
      components: COMPONENTS,
      html: `<aegov-header is-sticky="true" entity-name="N" entity-domain="https://x.gov.ae"></aegov-header>`,
    });
    const unstuck = jest.fn();
    page.root.addEventListener('aegovHeaderUnstuck', unstuck);

    page.rootInstance.isDesktop = true;
    page.rootInstance.isStuck = true;
    await page.waitForChanges();

    (page.root as HTMLAegovHeaderElement).isSticky = false;
    await page.waitForChanges();

    expect(page.rootInstance.isStuck).toBe(false);
    expect(page.root.className).not.toContain('header--stuck');
    expect(unstuck).toHaveBeenCalled();
  });

  it('does not pin below the collapse breakpoint, even when isSticky is set', async () => {
    const page = await newSpecPage({
      components: COMPONENTS,
      html: `<aegov-header is-sticky="true" entity-name="N" entity-domain="https://x.gov.ae"></aegov-header>`,
    });
    page.rootInstance.isDesktop = true;
    await page.waitForChanges();
    expect(page.root.className).toContain('header--sticky');

    // Below collapseAt the navigation row is hidden, so there is nothing to pin.
    page.rootInstance.isDesktop = false;
    page.rootInstance.isStuck = true;
    await page.waitForChanges();
    expect(page.root.className).not.toContain('header--sticky');
    expect(page.root.className).not.toContain('header--stuck');

    page.rootInstance.isDesktop = true;
    await page.waitForChanges();
    expect(page.root.className).toContain('header--sticky');
  });

  it('renders the menu toggle wired to the drawer', async () => {
    const page = await newSpecPage({
      components: COMPONENTS,
      html: `<aegov-header entity-name="N" entity-domain="https://x.gov.ae"><nav slot="mobile-content"></nav></aegov-header>`,
    });
    const toggle = page.root.shadowRoot.querySelector('.header__menu-toggle');
    const drawer = page.root.shadowRoot.querySelector('aegov-drawer');
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    expect(toggle.getAttribute('aria-label')).toBe('Menu');
    expect(toggle.getAttribute('aria-controls')).toBe(drawer.getAttribute('field-id'));

    // aegov-button forwards host aria-* onto its inner native button, which is
    // the element the accessibility tree actually reads.
    const innerToggle = toggle.shadowRoot.querySelector('button');
    expect(innerToggle.getAttribute('aria-expanded')).toBe('false');
    expect(innerToggle.getAttribute('aria-label')).toBe('Menu');
    expect(innerToggle.getAttribute('aria-controls')).toBe(drawer.getAttribute('field-id'));
  });

  it('configures the drawer as a pinned sliding panel on the inline end', async () => {
    const page = await newSpecPage({
      components: COMPONENTS,
      html: `<aegov-header entity-name="N" entity-domain="https://x.gov.ae"><nav slot="mobile-content"></nav></aegov-header>`,
    });
    const drawer = page.root.shadowRoot.querySelector('aegov-drawer') as HTMLAegovDrawerElement;
    expect(drawer.animation).toBe('slide');
    expect(drawer.position).toBe('right');
    expect(drawer.size).toBe('base');
    expect(drawer.label).toBe('Menu');
    expect(drawer.isPinned).toBe(true);
    // Nested inside the header's shadow DOM, so the drawer must not relocate
    // itself to document.body — that would take the mobile-content slot with it.
    expect(drawer.isPortal).toBe(false);
    expect(page.root.shadowRoot.contains(drawer)).toBe(true);
  });

  it('flips the drawer edge and strings under dir="rtl"', async () => {
    const page = await newSpecPage({
      components: COMPONENTS,
      html: `<aegov-header dir="rtl" entity-name="N" entity-domain="https://x.gov.ae"><nav slot="mobile-content"></nav></aegov-header>`,
    });
    const drawer = page.root.shadowRoot.querySelector('aegov-drawer') as HTMLAegovDrawerElement;
    const toggle = page.root.shadowRoot.querySelector('.header__menu-toggle');
    expect(drawer.position).toBe('left');
    expect(toggle.getAttribute('aria-label')).toBe('القائمة');
    expect(page.root.shadowRoot.querySelector('.header__drawer-close').getAttribute('aria-label')).toBe('إغلاق القائمة');
  });

  it('honours drawerSize and the label overrides', async () => {
    const page = await newSpecPage({
      components: COMPONENTS,
      html: `<aegov-header entity-name="N" entity-domain="https://x.gov.ae" drawer-size="sm" label-menu="Browse" label-menu-close="Dismiss"><nav slot="mobile-content"></nav></aegov-header>`,
    });
    const drawer = page.root.shadowRoot.querySelector('aegov-drawer') as HTMLAegovDrawerElement;
    expect(drawer.size).toBe('sm');
    expect(page.root.shadowRoot.querySelector('.header__menu-toggle').getAttribute('aria-label')).toBe('Browse');
    expect(page.root.shadowRoot.querySelector('.header__drawer-close').getAttribute('aria-label')).toBe('Dismiss');
    expect(page.root.shadowRoot.querySelector('.header__drawer-close').shadowRoot.querySelector('button').getAttribute('aria-label')).toBe('Dismiss');
  });

  it('renders a close button inside the drawer, before the mobile-content slot', async () => {
    const page = await newSpecPage({
      components: COMPONENTS,
      html: `<aegov-header entity-name="N" entity-domain="https://x.gov.ae"><nav slot="mobile-content"></nav></aegov-header>`,
    });
    const drawer = page.root.shadowRoot.querySelector('aegov-drawer');
    const close = drawer.querySelector('.header__drawer-close');
    expect(close).not.toBeNull();
    expect(close.getAttribute('aria-label')).toBe('Close menu');
    const children = Array.from(drawer.children);
    const headIndex = children.findIndex((c) => c.classList.contains('header__drawer-head'));
    const slotIndex = children.findIndex((c) => c.getAttribute('name') === 'mobile-content');
    expect(headIndex).toBeGreaterThanOrEqual(0);
    expect(slotIndex).toBeGreaterThan(headIndex);
  });

  it('warns when the mobile-content slot is empty', async () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    await newSpecPage({
      components: COMPONENTS,
      html: `<aegov-header entity-name="N" entity-domain="https://x.gov.ae" logo-label="Home"></aegov-header>`,
    });
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('mobile-content'));
    warn.mockRestore();
  });

  it('does not warn when the mobile-content slot is filled', async () => {
    const warn = jest.spyOn(console, 'warn').mockImplementation(() => {});
    await newSpecPage({
      components: COMPONENTS,
      html: `<aegov-header entity-name="N" entity-domain="https://x.gov.ae" logo-label="Home"><nav slot="mobile-content"><a href="#">Home</a></nav></aegov-header>`,
    });
    expect(warn).not.toHaveBeenCalledWith(expect.stringContaining('mobile-content'));
    warn.mockRestore();
  });

  it('exposes openMenu, closeMenu and toggleMenu', async () => {
    const page = await newSpecPage({
      components: COMPONENTS,
      html: `<aegov-header entity-name="N" entity-domain="https://x.gov.ae"><nav slot="mobile-content"></nav></aegov-header>`,
    });
    const host = page.root as HTMLAegovHeaderElement;
    expect(typeof host.openMenu).toBe('function');
    expect(typeof host.closeMenu).toBe('function');
    expect(typeof host.toggleMenu).toBe('function');
  });

  it('opens the drawer and reflects aria-expanded on the toggle', async () => {
    const page = await newSpecPage({
      components: COMPONENTS,
      html: `<aegov-header entity-name="N" entity-domain="https://x.gov.ae"><nav slot="mobile-content"><a href="#">Home</a></nav></aegov-header>`,
    });
    await (page.root as HTMLAegovHeaderElement).openMenu();
    await page.waitForChanges();

    const drawer = page.root.shadowRoot.querySelector('aegov-drawer') as HTMLAegovDrawerElement;
    expect(drawer.isOpen).toBe(true);

    const toggle = page.root.shadowRoot.querySelector('.header__menu-toggle');
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    // The inner button's copy of aria-expanded is re-forwarded by aegov-button's
    // host-attribute MutationObserver, which mock-doc does not implement — that
    // half is asserted in the e2e suite instead.
  });

  it('exposes setFocus on the toggle, since the aegov-button host is not focusable', async () => {
    const page = await newSpecPage({
      components: COMPONENTS,
      html: `<aegov-header entity-name="N" entity-domain="https://x.gov.ae"><nav slot="mobile-content"></nav></aegov-header>`,
    });
    const toggle = page.root.shadowRoot.querySelector('.header__menu-toggle') as HTMLAegovButtonElement;
    expect(typeof toggle.setFocus).toBe('function');
  });

  it('emits aegovHeaderMenuOpen and aegovHeaderMenuClose', async () => {
    const page = await newSpecPage({
      components: COMPONENTS,
      html: `<aegov-header entity-name="N" entity-domain="https://x.gov.ae"><nav slot="mobile-content"><a href="#">Home</a></nav></aegov-header>`,
    });
    const opened = jest.fn();
    const closed = jest.fn();
    page.root.addEventListener('aegovHeaderMenuOpen', opened);
    page.root.addEventListener('aegovHeaderMenuClose', closed);

    await (page.root as HTMLAegovHeaderElement).openMenu();
    await page.waitForChanges();
    expect(opened).toHaveBeenCalled();

    await (page.root as HTMLAegovHeaderElement).closeMenu();
    // aegov-drawer emits its close event only after the 300ms slide-out.
    await new Promise((resolve) => setTimeout(resolve, 400));
    await page.waitForChanges();
    expect(closed).toHaveBeenCalled();
  });

  it('contains the internal drawer events instead of leaking them to consumers', async () => {
    const page = await newSpecPage({
      components: COMPONENTS,
      html: `<aegov-header entity-name="N" entity-domain="https://x.gov.ae"><nav slot="mobile-content"><a href="#">Home</a></nav></aegov-header>`,
    });
    const leaked = jest.fn();
    page.root.addEventListener('aegovDrawerOpen', leaked);

    await (page.root as HTMLAegovHeaderElement).openMenu();
    await page.waitForChanges();
    expect(leaked).not.toHaveBeenCalled();
  });

  it('uses shadow DOM encapsulation', async () => {
    const page = await newSpecPage({
      components: COMPONENTS,
      html: `<aegov-header entity-name="N" entity-domain="https://x.gov.ae"></aegov-header>`,
    });
    expect(page.root.shadowRoot).not.toBeNull();
  });
});
