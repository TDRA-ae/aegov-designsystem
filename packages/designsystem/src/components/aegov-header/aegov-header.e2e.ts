import { newE2EPage } from '@stencil/core/testing';

const MARKUP = `
  <aegov-header entity-name="Ministry of Test" entity-domain="https://test.gov.ae" logo-label="Home">
    <img slot="logo" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="logo" />
    <nav slot="navigation" aria-label="Main"><a href="#services">Services</a></nav>
    <button slot="secondary-actions" id="login">Login</button>
    <nav slot="mobile-content" aria-label="Mobile"><a id="mobile-link" href="#services">Services</a></nav>
  </aegov-header>
`;

describe('aegov-header e2e', () => {
  it('renders host with header element in shadow DOM', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-header entity-name="My Entity" entity-domain="https://my.gov.ae"></aegov-header>`);
    const header = await page.find('aegov-header >>> header');
    expect(header).not.toBeNull();
    expect(header.className).toContain('aegov-header');
  });

  it('renders nested aegov-header-banner with forwarded props', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-header entity-name="Ministry of Test" entity-domain="https://test.gov.ae"></aegov-header>`);
    const banner = await page.find('aegov-header >>> aegov-header-banner');
    expect(banner).not.toBeNull();
    expect(banner.getAttribute('entity-name')).toBe('Ministry of Test');
    expect(banner.getAttribute('entity-domain')).toBe('https://test.gov.ae');
  });

  it('applies authority variant class', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-header variant="authority" entity-name="A" entity-domain="https://a.gov.ae"></aegov-header>`);
    const header = await page.find('aegov-header >>> header');
    expect(header.className).toContain('header--authority');
  });

  it('forwards skip-content-container so banner injects skip-link in body', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-header entity-name="N" entity-domain="https://x.gov.ae" skip-content-container="main"></aegov-header>
      <main id="main">Content</main>
    `);
    const skipExists = await page.evaluate(() => !!document.querySelector('.aegov-skip-content'));
    expect(skipExists).toBe(true);
  });

  it('renders logo, navigation and secondary-actions slot content', async () => {
    const page = await newE2EPage();
    await page.setContent(MARKUP);
    expect(await page.find('aegov-header img[slot="logo"]')).not.toBeNull();
    expect(await page.find('aegov-header nav[slot="navigation"]')).not.toBeNull();
    expect(await page.find('aegov-header button[slot="secondary-actions"]')).not.toBeNull();
  });

  it('shows navigation and hides the menu toggle at desktop width', async () => {
    const page = await newE2EPage();
    await page.setViewport({ width: 1280, height: 900 });
    await page.setContent(MARKUP);
    await page.waitForChanges();

    const visibility = await page.evaluate(() => {
      const host = document.querySelector('aegov-header');
      const nav = host.shadowRoot.querySelector('.header__nav-row') as HTMLElement;
      const toggle = host.shadowRoot.querySelector('.header__menu-toggle') as HTMLElement;
      return {
        nav: getComputedStyle(nav).display,
        toggle: getComputedStyle(toggle).display,
      };
    });
    expect(visibility.nav).not.toBe('none');
    expect(visibility.toggle).toBe('none');
  });

  it('hides navigation and shows the menu toggle below lg', async () => {
    const page = await newE2EPage();
    await page.setViewport({ width: 768, height: 900 });
    await page.setContent(MARKUP);
    await page.waitForChanges();

    const visibility = await page.evaluate(() => {
      const host = document.querySelector('aegov-header');
      const nav = host.shadowRoot.querySelector('.header__nav-row') as HTMLElement;
      const toggle = host.shadowRoot.querySelector('.header__menu-toggle') as HTMLElement;
      const actions = host.shadowRoot.querySelector('.header__nav-row') as HTMLElement;
      return {
        nav: getComputedStyle(nav).display,
        toggle: getComputedStyle(toggle).display,
        actions: getComputedStyle(actions).display,
      };
    });
    expect(visibility.nav).toBe('none');
    expect(visibility.toggle).not.toBe('none');
    // Secondary actions live in the second row, so they collapse with it.
    expect(visibility.actions).toBe('none');
  });

  it('keeps the drawer inside the header shadow root so mobile-content projects', async () => {
    const page = await newE2EPage();
    await page.setViewport({ width: 390, height: 844 });
    await page.setContent(MARKUP);
    await page.waitForChanges();

    const placement = await page.evaluate(() => {
      const host = document.querySelector('aegov-header');
      const drawer = host.shadowRoot.querySelector('aegov-drawer');
      const slot = drawer.querySelector('slot[name="mobile-content"]') as HTMLSlotElement;
      return {
        inShadowRoot: host.shadowRoot.contains(drawer),
        movedToBody: drawer.parentElement === document.body,
        assigned: slot.assignedElements({ flatten: true }).map((el) => el.getAttribute('aria-label')),
      };
    });
    expect(placement.inShadowRoot).toBe(true);
    expect(placement.movedToBody).toBe(false);
    expect(placement.assigned).toContain('Mobile');
  });

  it('opens the drawer from the toggle and updates aria-expanded', async () => {
    const page = await newE2EPage();
    await page.setViewport({ width: 390, height: 844 });
    await page.setContent(MARKUP);
    await page.waitForChanges();

    const toggle = await page.find('aegov-header >>> .header__menu-toggle');
    expect(toggle.getAttribute('aria-expanded')).toBe('false');

    const opened = await page.spyOnEvent('aegovHeaderMenuOpen');
    await toggle.click();
    await page.waitForChanges();

    expect(opened).toHaveReceivedEvent();
    const toggleAfter = await page.find('aegov-header >>> .header__menu-toggle');
    expect(toggleAfter.getAttribute('aria-expanded')).toBe('true');

    const drawerOpen = await page.evaluate(() => {
      const host = document.querySelector('aegov-header');
      return (host.shadowRoot.querySelector('aegov-drawer') as any).isOpen;
    });
    expect(drawerOpen).toBe(true);
  });

  it('renders the mobile-content links inside the open drawer panel', async () => {
    const page = await newE2EPage();
    await page.setViewport({ width: 390, height: 844 });
    await page.setContent(MARKUP);
    await page.waitForChanges();

    await (await page.find('aegov-header >>> .header__menu-toggle')).click();
    await page.waitForChanges();
    await new Promise((resolve) => setTimeout(resolve, 400));

    // The slotted link must be laid out (non-zero box) inside the drawer panel.
    const box = await page.evaluate(() => {
      const link = document.querySelector('#mobile-link') as HTMLElement;
      const rect = link.getBoundingClientRect();
      return { width: rect.width, height: rect.height };
    });
    expect(box.width).toBeGreaterThan(0);
    expect(box.height).toBeGreaterThan(0);
  });

  it('closes the drawer from its close button and restores focus to the toggle', async () => {
    const page = await newE2EPage();
    await page.setViewport({ width: 390, height: 844 });
    await page.setContent(MARKUP);
    await page.waitForChanges();

    const closed = await page.spyOnEvent('aegovHeaderMenuClose');
    await (await page.find('aegov-header >>> .header__menu-toggle')).click();
    await page.waitForChanges();
    await new Promise((resolve) => setTimeout(resolve, 400));

    await (await page.find('aegov-header >>> .header__drawer-close')).click();
    await page.waitForChanges();
    await new Promise((resolve) => setTimeout(resolve, 500));

    expect(closed).toHaveReceivedEvent();
    const state = await page.evaluate(() => {
      const host = document.querySelector('aegov-header');
      const toggle = host.shadowRoot.querySelector('.header__menu-toggle');
      return {
        ariaExpanded: toggle.getAttribute('aria-expanded'),
        innerAriaExpanded: toggle.shadowRoot.querySelector('button').getAttribute('aria-expanded'),
        // Focus lands on aegov-button's inner native button, so the header's
        // shadow root reports the aegov-button host as its active element.
        focusedToggle: host.shadowRoot.activeElement === toggle,
        focusedInner: toggle.shadowRoot.activeElement === toggle.shadowRoot.querySelector('button'),
      };
    });
    expect(state.ariaExpanded).toBe('false');
    expect(state.innerAriaExpanded).toBe('false');
    expect(state.focusedToggle).toBe(true);
    expect(state.focusedInner).toBe(true);
  });

  it('re-forwards the toggle aria-expanded onto aegov-button\'s inner button', async () => {
    const page = await newE2EPage();
    await page.setViewport({ width: 390, height: 844 });
    await page.setContent(MARKUP);
    await page.waitForChanges();

    const read = () => page.evaluate(() => {
      const toggle = document.querySelector('aegov-header').shadowRoot.querySelector('.header__menu-toggle');
      return {
        host: toggle.getAttribute('aria-expanded'),
        inner: toggle.shadowRoot.querySelector('button').getAttribute('aria-expanded'),
      };
    });

    expect(await read()).toEqual({ host: 'false', inner: 'false' });

    await (await page.find('aegov-header >>> .header__menu-toggle')).click();
    await page.waitForChanges();
    await new Promise((resolve) => setTimeout(resolve, 400));

    // getPassThroughAttributes runs only during render, so aegov-button has to
    // re-render on host attribute changes or the inner value goes stale.
    expect(await read()).toEqual({ host: 'true', inner: 'true' });
  });

  it('includes the drawer close button in the focus trap', async () => {
    const page = await newE2EPage();
    await page.setViewport({ width: 390, height: 844 });
    await page.setContent(MARKUP);
    await page.waitForChanges();

    await (await page.find('aegov-header >>> .header__menu-toggle')).click();
    await page.waitForChanges();
    await new Promise((resolve) => setTimeout(resolve, 400));

    // The close control is a slotted aegov-button: its focusable native button
    // lives in a shadow root, so the trap has to descend into it.
    const trapped = await page.evaluate(() => {
      const host = document.querySelector('aegov-header');
      const drawer = host.shadowRoot.querySelector('aegov-drawer');
      const closeInner = drawer.querySelector('.header__drawer-close').shadowRoot.querySelector('button');
      const focusables = (window as any).__aegovFocusables as HTMLElement[] | undefined;
      return {
        closeIsFocused: drawer.querySelector('.header__drawer-close').shadowRoot.activeElement === closeInner,
        hasFocusables: !!focusables,
      };
    });
    // Drawer focuses the first element in the trap on open; with the close
    // button now visible to the trap, that is the close button.
    expect(trapped.closeIsFocused).toBe(true);
  });

  it('closes the drawer on Escape', async () => {
    const page = await newE2EPage();
    await page.setViewport({ width: 390, height: 844 });
    await page.setContent(MARKUP);
    await page.waitForChanges();

    await (await page.find('aegov-header >>> .header__menu-toggle')).click();
    await page.waitForChanges();
    await new Promise((resolve) => setTimeout(resolve, 400));

    await page.keyboard.press('Escape');
    await page.waitForChanges();
    await new Promise((resolve) => setTimeout(resolve, 500));

    const isOpen = await page.evaluate(() => {
      const host = document.querySelector('aegov-header');
      return (host.shadowRoot.querySelector('aegov-drawer') as any).isOpen;
    });
    expect(isOpen).toBe(false);
  });

  it('closes the drawer when the viewport grows past lg', async () => {
    const page = await newE2EPage();
    await page.setViewport({ width: 390, height: 844 });
    await page.setContent(MARKUP);
    await page.waitForChanges();

    await (await page.find('aegov-header >>> .header__menu-toggle')).click();
    await page.waitForChanges();
    await new Promise((resolve) => setTimeout(resolve, 400));

    await page.setViewport({ width: 1280, height: 900 });
    await page.waitForChanges();
    await new Promise((resolve) => setTimeout(resolve, 500));

    const isOpen = await page.evaluate(() => {
      const host = document.querySelector('aegov-header');
      return (host.shadowRoot.querySelector('aegov-drawer') as any).isOpen;
    });
    expect(isOpen).toBe(false);
  });

  it('honours collapseAt: at 1100px, lg shows navigation but xl still shows the toggle', async () => {
    const page = await newE2EPage();
    // Between lg (1024) and xl (1280): the two settings must disagree here.
    await page.setViewport({ width: 1100, height: 900 });
    await page.setContent(`
      <aegov-header id="at-lg" entity-name="N" entity-domain="https://x.gov.ae" logo-label="Home">
        <nav slot="navigation"><a href="#a">A</a></nav>
        <nav slot="mobile-content"><a href="#a">A</a></nav>
      </aegov-header>
      <aegov-header id="at-xl" collapse-at="xl" entity-name="N" entity-domain="https://x.gov.ae" logo-label="Home">
        <nav slot="navigation"><a href="#a">A</a></nav>
        <nav slot="mobile-content"><a href="#a">A</a></nav>
      </aegov-header>
    `);
    await page.waitForChanges();

    const read = (id: string) => page.evaluate((hostId: string) => {
      const host = document.querySelector(hostId);
      return {
        nav: getComputedStyle(host.shadowRoot.querySelector('.header__nav-row')).display,
        toggle: getComputedStyle(host.shadowRoot.querySelector('.header__menu-toggle')).display,
      };
    }, id);

    const atLg = await read('#at-lg');
    expect(atLg.nav).toBe('block');
    expect(atLg.toggle).toBe('none');

    const atXl = await read('#at-xl');
    expect(atXl.nav).toBe('none');
    expect(atXl.toggle).not.toBe('none');
  });

  it('honours collapseAt="md" at 800px, where the lg default would still collapse', async () => {
    const page = await newE2EPage();
    await page.setViewport({ width: 800, height: 900 });
    await page.setContent(`
      <aegov-header collapse-at="md" entity-name="N" entity-domain="https://x.gov.ae" logo-label="Home">
        <nav slot="navigation"><a href="#a">A</a></nav>
        <nav slot="mobile-content"><a href="#a">A</a></nav>
      </aegov-header>
    `);
    await page.waitForChanges();

    const state = await page.evaluate(() => {
      const host = document.querySelector('aegov-header');
      return {
        nav: getComputedStyle(host.shadowRoot.querySelector('.header__nav-row')).display,
        toggle: getComputedStyle(host.shadowRoot.querySelector('.header__menu-toggle')).display,
      };
    });
    expect(state.nav).toBe('block');
    expect(state.toggle).toBe('none');
  });

  it('closes the drawer at the configured breakpoint, not the lg default', async () => {
    const page = await newE2EPage();
    await page.setViewport({ width: 390, height: 844 });
    await page.setContent(`
      <aegov-header collapse-at="xl" entity-name="N" entity-domain="https://x.gov.ae" logo-label="Home">
        <nav slot="navigation"><a href="#a">A</a></nav>
        <nav slot="mobile-content"><a href="#a">A</a></nav>
      </aegov-header>
    `);
    await page.waitForChanges();

    await (await page.find('aegov-header >>> .header__menu-toggle')).click();
    await page.waitForChanges();
    await new Promise((resolve) => setTimeout(resolve, 400));

    const isOpen = () => page.evaluate(() => {
      const host = document.querySelector('aegov-header');
      return (host.shadowRoot.querySelector('aegov-drawer') as any).isOpen;
    });

    // Past lg but still under xl: the menu is the only navigation here, so it
    // must stay open.
    await page.setViewport({ width: 1100, height: 900 });
    await page.waitForChanges();
    await new Promise((resolve) => setTimeout(resolve, 400));
    expect(await isOpen()).toBe(true);

    // Past xl the navigation is back, so the drawer must close.
    await page.setViewport({ width: 1400, height: 900 });
    await page.waitForChanges();
    await new Promise((resolve) => setTimeout(resolve, 500));
    expect(await isOpen()).toBe(false);
  });

  // Sticky only engages at or above the collapse breakpoint, so every sticky
  // case below runs at desktop width.
  const STICKY_PAGE = (attrs = 'is-sticky="true"') => `
    <style>body { margin: 0; }</style>
    <aegov-header ${attrs} entity-name="Ministry of Test" entity-domain="https://test.gov.ae" logo-label="Home">
      <img slot="logo" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="logo" />
      <nav slot="navigation" aria-label="Main"><a href="#services">Services</a></nav>
      <aegov-button slot="secondary-actions" size="base">Sign in</aegov-button>
      <nav slot="mobile-content" aria-label="Mobile"><a href="#services">Services</a></nav>
    </aegov-header>
    <main style="height: 4000px">Tall content</main>
  `;

  const stickyState = (page: any) => page.evaluate(() => {
    const host = document.querySelector('aegov-header') as HTMLElement;
    const navRow = host.shadowRoot.querySelector('.header__nav-row') as HTMLElement;
    const styles = getComputedStyle(navRow);
    return {
      hostPosition: getComputedStyle(host).position,
      hostClass: host.className,
      navRowTop: Math.round(navRow.getBoundingClientRect().top),
      brandRowBottom: Math.round((host.shadowRoot.querySelector('.header__brand-row') as HTMLElement).getBoundingClientRect().bottom),
      stickyOffsetVar: host.style.getPropertyValue('--aegov-header-sticky-offset'),
      navHeightVar: host.style.getPropertyValue('--aegov-header-height'),
      backdropFilter: styles.backdropFilter || (styles as any).webkitBackdropFilter,
      boxShadow: styles.boxShadow,
      background: styles.backgroundColor,
    };
  });

  it('is not sticky without the attribute', async () => {
    const page = await newE2EPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.setContent(STICKY_PAGE(''));
    await page.waitForChanges();

    const before = await stickyState(page);
    expect(before.hostPosition).not.toBe('sticky');

    await page.evaluate(() => window.scrollTo(0, 600));
    await page.waitForChanges();

    // Without is-sticky the whole header scrolls away with the page.
    const after = await stickyState(page);
    expect(after.navRowTop).toBeLessThan(0);
    expect(after.hostClass).not.toContain('header--stuck');
  });

  it('pins the bar at the top while the banner scrolls away', async () => {
    const page = await newE2EPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.setContent(STICKY_PAGE());
    await page.waitForChanges();

    const atRest = await stickyState(page);
    expect(atRest.hostPosition).toBe('sticky');
    expect(atRest.hostClass).toContain('header--sticky');
    expect(atRest.hostClass).not.toContain('header--stuck');
    // Banner + brand row drive the host's negative top offset.
    expect(parseFloat(atRest.stickyOffsetVar)).toBeGreaterThan(0);
    expect(atRest.navRowTop).toBeGreaterThan(0);

    await page.evaluate(() => window.scrollTo(0, 1000));
    await new Promise((resolve) => setTimeout(resolve, 300));
    await page.waitForChanges();

    const stuck = await stickyState(page);
    // The bar sits at the very top of the viewport...
    expect(stuck.navRowTop).toBe(0);
    // ...and the brand row has scrolled off above it.
    expect(stuck.brandRowBottom).toBeLessThanOrEqual(0);
    expect(stuck.hostClass).toContain('header--stuck');
  });

  it('stays pinned far down a long page, rather than unsticking with its parent', async () => {
    const page = await newE2EPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.setContent(STICKY_PAGE());
    await page.waitForChanges();

    // Regression guard for the sticky-on-.header__nav-row mistake: that version
    // unsticks once the header's own box has scrolled past, a few dozen pixels in.
    await page.evaluate(() => window.scrollTo(0, 3000));
    await new Promise((resolve) => setTimeout(resolve, 300));
    await page.waitForChanges();

    const state = await stickyState(page);
    expect(state.navRowTop).toBe(0);
    expect(state.hostClass).toContain('header--stuck');
  });

  it('applies blur, shadow and a translucent background only once stuck', async () => {
    const page = await newE2EPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.setContent(STICKY_PAGE());
    await page.waitForChanges();

    const atRest = await stickyState(page);
    expect(atRest.backdropFilter === 'none' || atRest.backdropFilter === '').toBe(true);
    expect(atRest.boxShadow).toBe('none');

    await page.evaluate(() => window.scrollTo(0, 1000));
    await new Promise((resolve) => setTimeout(resolve, 300));
    await page.waitForChanges();

    const stuck = await stickyState(page);
    expect(stuck.backdropFilter).toContain('blur');
    expect(stuck.boxShadow).not.toBe('none');
    // Translucent, so content scrolling behind stays faintly visible. Chrome
    // reports the color-mix() result in oklab, e.g. "oklab(1 0 0 / 0.7)".
    expect(stuck.background).toMatch(/\/\s*0?\.\d+\s*\)/);
  });

  it('emits aegovHeaderStuck and aegovHeaderUnstuck across a scroll round trip', async () => {
    const page = await newE2EPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.setContent(STICKY_PAGE());
    await page.waitForChanges();

    const stuck = await page.spyOnEvent('aegovHeaderStuck');
    const unstuck = await page.spyOnEvent('aegovHeaderUnstuck');

    await page.evaluate(() => window.scrollTo(0, 1000));
    await new Promise((resolve) => setTimeout(resolve, 300));
    await page.waitForChanges();
    expect(stuck).toHaveReceivedEvent();

    await page.evaluate(() => window.scrollTo(0, 0));
    await new Promise((resolve) => setTimeout(resolve, 300));
    await page.waitForChanges();
    expect(unstuck).toHaveReceivedEvent();

    const state = await stickyState(page);
    expect(state.hostClass).not.toContain('header--stuck');
  });

  it('publishes --aegov-header-height for consumer scroll offsets', async () => {
    const page = await newE2EPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.setContent(STICKY_PAGE());
    await page.waitForChanges();

    const state = await stickyState(page);
    const published = parseFloat(state.navHeightVar);
    const measured = await page.evaluate(() => {
      const navRow = document.querySelector('aegov-header').shadowRoot.querySelector('.header__nav-row') as HTMLElement;
      return navRow.offsetHeight;
    });
    expect(published).toBe(measured);
    expect(published).toBeGreaterThan(0);
  });

  it('releases sticky positioning when isSticky is turned off at runtime', async () => {
    const page = await newE2EPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.setContent(STICKY_PAGE());
    await page.waitForChanges();

    await page.evaluate(() => window.scrollTo(0, 1000));
    await new Promise((resolve) => setTimeout(resolve, 300));
    await page.waitForChanges();
    expect((await stickyState(page)).hostClass).toContain('header--stuck');

    await page.evaluate(() => {
      (document.querySelector('aegov-header') as any).isSticky = false;
    });
    await page.waitForChanges();
    await new Promise((resolve) => setTimeout(resolve, 200));

    const after = await stickyState(page);
    expect(after.hostPosition).not.toBe('sticky');
    expect(after.hostClass).not.toContain('header--stuck');
    expect(after.navRowTop).toBeLessThan(0);
    // Measurement vars are cleaned up with the observers.
    expect(after.stickyOffsetVar).toBe('');
  });

  it('does not report stuck for a sticky header still below the fold', async () => {
    const page = await newE2EPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.setContent(`
      <style>body { margin: 0; }</style>
      <div style="height: 1500px">Hero above the header</div>
      <aegov-header is-sticky="true" entity-name="N" entity-domain="https://x.gov.ae" logo-label="Home">
        <nav slot="navigation"><a href="#a">A</a></nav>
        <nav slot="mobile-content"><a href="#a">A</a></nav>
      </aegov-header>
      <main style="height: 3000px">Content</main>
    `);
    await page.waitForChanges();
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Off-screen below, not scrolled past: the boundingClientRect.top < 0 guard
    // is what keeps this from reading as stuck.
    const state = await stickyState(page);
    expect(state.hostClass).not.toContain('header--stuck');
  });

  it('keeps the open drawer above the sticky bar', async () => {
    const page = await newE2EPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.setContent(STICKY_PAGE());
    await page.waitForChanges();

    await page.evaluate(() => window.scrollTo(0, 1000));
    await new Promise((resolve) => setTimeout(resolve, 300));
    await page.waitForChanges();

    const host = await page.find('aegov-header');
    await host.callMethod('openMenu');
    await page.waitForChanges();
    await new Promise((resolve) => setTimeout(resolve, 400));

    const z = await page.evaluate(() => {
      const host = document.querySelector('aegov-header') as HTMLElement;
      const drawer = host.shadowRoot.querySelector('aegov-drawer');
      const panel = drawer.shadowRoot.querySelector('.aegov-drawer-container') as HTMLElement;
      return {
        host: parseInt(getComputedStyle(host).zIndex, 10),
        panel: parseInt(getComputedStyle(panel).zIndex, 10),
      };
    });
    expect(z.panel).toBeGreaterThan(z.host);
  });

  const layoutAt = (page: any) => page.evaluate(() => {
    const host = document.querySelector('aegov-header');
    const box = (sel: string) => {
      const el = host.shadowRoot.querySelector(sel) as HTMLElement;
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { display: getComputedStyle(el).display, top: Math.round(r.top), width: Math.round(r.width) };
    };
    return {
      brandRow: box('.header__brand-row'),
      navRow: box('.header__nav-row'),
      search: box('.header__search'),
      emblem: box('.header__emblem'),
      toggle: box('.header__menu-toggle'),
      logo: box('.header__logo'),
    };
  });

  const VARIANT_PAGE = (variant: string) => `
    <style>body { margin: 0; }</style>
    <aegov-header variant="${variant}" entity-name="N" entity-domain="https://x.gov.ae" logo-label="Home">
      <img slot="logo" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="logo" />
      <input slot="search" type="search" aria-label="Search" />
      <nav slot="navigation" aria-label="Main"><a href="#a">Services</a></nav>
      <aegov-button slot="secondary-actions" size="base">Sign in</aegov-button>
      <nav slot="mobile-content" aria-label="Mobile"><a href="#a">Services</a></nav>
    </aegov-header>
  `;

  it('ministry shows the search slot at the inline end of the brand row', async () => {
    const page = await newE2EPage();
    await page.setViewport({ width: 1280, height: 900 });
    await page.setContent(VARIANT_PAGE('ministry'));
    await page.waitForChanges();

    const l = await layoutAt(page);
    expect(l.search.display).not.toBe('none');
    expect(l.emblem).toBeNull();
    expect(l.toggle.display).toBe('none');
    // Search sits in the brand row, beside the logo, not in the nav row.
    expect(l.search.top).toBeLessThan(l.navRow.top);
    expect(await page.find('aegov-header input[slot="search"]')).not.toBeNull();
  });

  it('authority renders the emblem and never the search slot', async () => {
    const page = await newE2EPage();
    await page.setViewport({ width: 1280, height: 900 });
    await page.setContent(VARIANT_PAGE('authority'));
    await page.waitForChanges();

    const l = await layoutAt(page);
    expect(l.emblem.display).not.toBe('none');
    expect(l.search).toBeNull();

    // The slot is not rendered, so slotted search content is never projected:
    // it has no layout box even though it is still in the light DOM.
    const searchBox = await page.evaluate(() => {
      const el = document.querySelector('aegov-header input[slot="search"]') as HTMLElement;
      return { exists: !!el, width: el ? el.getBoundingClientRect().width : -1 };
    });
    expect(searchBox.exists).toBe(true);
    expect(searchBox.width).toBe(0);
  });

  it('puts navigation and actions on a second row below the brand row', async () => {
    const page = await newE2EPage();
    await page.setViewport({ width: 1280, height: 900 });
    await page.setContent(VARIANT_PAGE('ministry'));
    await page.waitForChanges();

    const l = await layoutAt(page);
    expect(l.navRow.display).not.toBe('none');
    expect(l.navRow.top).toBeGreaterThanOrEqual(l.brandRow.top + 1);

    // Nav at the inline start, actions at the inline end, in LTR.
    const ends = await page.evaluate(() => {
      const host = document.querySelector('aegov-header');
      const nav = host.shadowRoot.querySelector('.header__nav').getBoundingClientRect();
      const actions = host.shadowRoot.querySelector('.header__actions').getBoundingClientRect();
      return { navLeft: Math.round(nav.left), actionsLeft: Math.round(actions.left) };
    });
    expect(ends.navLeft).toBeLessThan(ends.actionsLeft);
  });

  it('mirrors the second row under dir="rtl"', async () => {
    const page = await newE2EPage();
    await page.setViewport({ width: 1280, height: 900 });
    await page.setContent(`<div dir="rtl">${VARIANT_PAGE('ministry')}</div>`);
    await page.waitForChanges();

    const ends = await page.evaluate(() => {
      const host = document.querySelector('aegov-header');
      const nav = host.shadowRoot.querySelector('.header__nav').getBoundingClientRect();
      const actions = host.shadowRoot.querySelector('.header__actions').getBoundingClientRect();
      return { navLeft: Math.round(nav.left), actionsLeft: Math.round(actions.left) };
    });
    // Inline start is now the right-hand side.
    expect(ends.navLeft).toBeGreaterThan(ends.actionsLeft);
  });

  it('hides the whole second row below the collapse breakpoint and shows the toggle', async () => {
    const page = await newE2EPage();
    await page.setViewport({ width: 768, height: 900 });
    await page.setContent(VARIANT_PAGE('ministry'));
    await page.waitForChanges();

    const l = await layoutAt(page);
    expect(l.navRow.display).toBe('none');
    expect(l.search.display).toBe('none');
    expect(l.toggle.display).not.toBe('none');
    // The toggle took the search slot's place in the brand row.
    expect(Math.abs(l.toggle.top - l.brandRow.top)).toBeLessThan(l.brandRow.top + 100);
  });

  it('hides the emblem too when the toggle appears', async () => {
    const page = await newE2EPage();
    await page.setViewport({ width: 768, height: 900 });
    await page.setContent(VARIANT_PAGE('authority'));
    await page.waitForChanges();

    const l = await layoutAt(page);
    expect(l.emblem.display).toBe('none');
    expect(l.toggle.display).not.toBe('none');
    expect(l.navRow.display).toBe('none');
  });

  it('does not pin anything below the collapse breakpoint, even with is-sticky', async () => {
    const page = await newE2EPage();
    await page.setViewport({ width: 390, height: 844 });
    await page.setContent(STICKY_PAGE());
    await page.waitForChanges();

    await page.evaluate(() => window.scrollTo(0, 1000));
    await new Promise((resolve) => setTimeout(resolve, 400));
    await page.waitForChanges();

    const state = await page.evaluate(() => {
      const host = document.querySelector('aegov-header') as HTMLElement;
      return {
        position: getComputedStyle(host).position,
        cls: host.className,
        hostTop: Math.round(host.getBoundingClientRect().top),
      };
    });
    expect(state.position).not.toBe('sticky');
    expect(state.cls).not.toContain('header--sticky');
    expect(state.cls).not.toContain('header--stuck');
    // The whole header scrolled away with the page.
    expect(state.hostTop).toBeLessThan(0);
  });

  it('releases the pin when the viewport shrinks past the breakpoint while stuck', async () => {
    const page = await newE2EPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.setContent(STICKY_PAGE());
    await page.waitForChanges();

    await page.evaluate(() => window.scrollTo(0, 1000));
    await new Promise((resolve) => setTimeout(resolve, 400));
    await page.waitForChanges();
    expect(await page.evaluate(() => document.querySelector('aegov-header').className)).toContain('header--stuck');

    await page.setViewport({ width: 390, height: 844 });
    await new Promise((resolve) => setTimeout(resolve, 400));
    await page.waitForChanges();

    const cls = await page.evaluate(() => document.querySelector('aegov-header').className);
    expect(cls).not.toContain('header--sticky');
    expect(cls).not.toContain('header--stuck');
  });

  it('keeps the brand row scrolling away while the nav row stays pinned', async () => {
    const page = await newE2EPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.setContent(STICKY_PAGE());
    await page.waitForChanges();

    await page.evaluate(() => window.scrollTo(0, 1200));
    await new Promise((resolve) => setTimeout(resolve, 400));
    await page.waitForChanges();

    const state = await page.evaluate(() => {
      const host = document.querySelector('aegov-header');
      const brand = host.shadowRoot.querySelector('.header__brand-row').getBoundingClientRect();
      const nav = host.shadowRoot.querySelector('.header__nav-row').getBoundingClientRect();
      return { brandBottom: Math.round(brand.bottom), navTop: Math.round(nav.top) };
    });
    // Only the navigation row remains: the brand row is fully above the fold.
    expect(state.navTop).toBe(0);
    expect(state.brandBottom).toBeLessThanOrEqual(0);
  });

  const emblemFill = (page: any) => page.evaluate(() => {
    const host = document.querySelector('aegov-header');
    const path = host.shadowRoot.querySelector('.header__emblem svg path') as SVGElement;
    return getComputedStyle(path).fill;
  });

  const EMBLEM_PAGE = (wrapper = '', style = '') => `
    <style>body { margin: 0; } ${style}</style>
    ${wrapper ? `<div ${wrapper}>` : ''}
    <aegov-header variant="authority" entity-name="N" entity-domain="https://x.gov.ae" logo-label="Home">
      <nav slot="navigation"><a href="#a">A</a></nav>
      <nav slot="mobile-content"><a href="#a">A</a></nav>
    </aegov-header>
    ${wrapper ? '</div>' : ''}
  `;

  it('paints the emblem aeblack by default', async () => {
    const page = await newE2EPage();
    await page.setViewport({ width: 1280, height: 900 });
    await page.setContent(EMBLEM_PAGE());
    await page.waitForChanges();

    // aeblack-800, straight from EMBLEM_COLORS in the component.
    expect(await emblemFill(page)).toBe('oklch(0.2936 0.0112 271.01)');
  });

  it.each([
    ['aegold', 'oklch(0.5632 0.0956 83.8)'],
    ['whitely', 'oklch(1 0 0)'],
  ])('paints the emblem %s when emblem-color is set', async (value, expected) => {
    const page = await newE2EPage();
    await page.setViewport({ width: 1280, height: 900 });
    await page.setContent(EMBLEM_PAGE().replace('variant="authority"', `variant="authority" emblem-color="${value}"`));
    await page.waitForChanges();

    expect(await emblemFill(page)).toBe(expected);
  });

  it('repaints the emblem when emblem-color changes at runtime', async () => {
    const page = await newE2EPage();
    await page.setViewport({ width: 1280, height: 900 });
    await page.setContent(EMBLEM_PAGE());
    await page.waitForChanges();

    await page.evaluate(() => document.querySelector('aegov-header').setAttribute('emblem-color', 'aegold'));
    await page.waitForChanges();
    expect(await emblemFill(page)).toBe('oklch(0.5632 0.0956 83.8)');
  });

  it('ignores the surrounding text colour', async () => {
    const page = await newE2EPage();
    await page.setViewport({ width: 1280, height: 900 });
    await page.setContent(EMBLEM_PAGE('style="color: rgb(255, 0, 0)"'));
    await page.waitForChanges();

    // `color` does cross the shadow boundary, so this has to be actively
    // resisted rather than assumed — the inline fill on the container is what
    // beats it.
    const inherited = await page.evaluate(() => {
      const host = document.querySelector('aegov-header');
      return getComputedStyle(host.shadowRoot.querySelector('.header__emblem') as HTMLElement).color;
    });
    expect(inherited).toBe('rgb(255, 0, 0)');
    expect(await emblemFill(page)).toBe('oklch(0.2936 0.0112 271.01)');
  });

  it('does not change in dark mode', async () => {
    const page = await newE2EPage();
    await page.setViewport({ width: 1280, height: 900 });
    await page.setContent(EMBLEM_PAGE('', ':root.dark aegov-header { color: rgb(0, 255, 0); }'));
    await page.waitForChanges();

    const light = await emblemFill(page);
    await page.evaluate(() => document.documentElement.classList.add('dark'));
    await page.waitForChanges();

    expect(await emblemFill(page)).toBe(light);
  });

  it('cannot be retinted by a consumer custom property', async () => {
    const page = await newE2EPage();
    await page.setViewport({ width: 1280, height: 900 });
    await page.setContent(EMBLEM_PAGE('', `
      aegov-header {
        --aegov-emblem-fill: rgb(0, 0, 255);
        --aegov-emblem-color: rgb(0, 0, 255);
      }
    `));
    await page.waitForChanges();

    // The component sets --aegov-emblem-fill inline on the emblem container, so
    // an inherited value from the host loses.
    expect(await emblemFill(page)).toBe('oklch(0.2936 0.0112 271.01)');
  });

  // A fresh page per measurement: Stencil's request interception throws
  // "Request is already handled!" if one page is given setContent twice.
  const measureEmblem = async (width: number, collapseAt: string) => {
    const page = await newE2EPage();
    await page.setViewport({ width, height: 900 });
    await page.setContent(`
      <style>body { margin: 0; }</style>
      <aegov-header variant="authority" collapse-at="${collapseAt}" entity-name="N" entity-domain="https://x.gov.ae" logo-label="Home">
        <nav slot="navigation"><a href="#a">A</a></nav>
        <nav slot="mobile-content"><a href="#a">A</a></nav>
      </aegov-header>
    `);
    await page.waitForChanges();
    return page.evaluate(() => {
      const svg = document.querySelector('aegov-header').shadowRoot
        .querySelector('.header__emblem svg') as SVGElement;
      const r = svg.getBoundingClientRect();
      return { height: Math.round(r.height), width: Math.round(r.width) };
    });
  };

  it('sizes the emblem to 80px tall from xl up', async () => {
    const xl = await measureEmblem(1400, 'lg');
    expect(xl.height).toBe(80);
    // Height is the fixed dimension; width follows the 765x995 aspect ratio.
    expect(xl.width).toBe(Math.round(80 * (765 / 995)));
  });

  it('sizes the emblem to 72px tall at lg', async () => {
    const lg = await measureEmblem(1100, 'lg');
    expect(lg.height).toBe(72);
    expect(lg.width).toBe(Math.round(72 * (765 / 995)));
  });

  it('sizes the emblem to 64px tall at md, where it is only visible with collapse-at="md"', async () => {
    const md = await measureEmblem(800, 'md');
    expect(md.height).toBe(64);
    expect(md.width).toBe(Math.round(64 * (765 / 995)));
  });

  it('keeps the emblem clear of the row edges even when it is the tallest element', async () => {
    const page = await newE2EPage();
    await page.setViewport({ width: 1400, height: 900 });
    await page.setContent(`
      <style>body { margin: 0; }</style>
      <aegov-header variant="authority" entity-name="N" entity-domain="https://x.gov.ae" logo-label="Home">
        <svg slot="logo" viewBox="0 0 400 48" xmlns="http://www.w3.org/2000/svg"><rect width="400" height="48" fill="#123"/></svg>
        <nav slot="navigation"><a href="#a">A</a></nav>
        <nav slot="mobile-content"><a href="#a">A</a></nav>
      </aegov-header>
    `);
    await page.waitForChanges();

    const gaps = await page.evaluate(() => {
      const sr = document.querySelector('aegov-header').shadowRoot;
      const bar = sr.querySelector('.header__brand-bar').getBoundingClientRect();
      const svg = sr.querySelector('.header__emblem svg').getBoundingClientRect();
      return { above: Math.round(svg.top - bar.top), below: Math.round(bar.bottom - svg.bottom) };
    });

    // Two separate hazards, both regressions people would not spot in a diff:
    // an inline SVG sits on the text baseline and leaves ~7px of descender space
    // below it (hence display:block), and a logo shorter than the emblem makes
    // the emblem size the row, so without its own padding it touches the banner.
    expect(Math.abs(gaps.above - gaps.below)).toBeLessThanOrEqual(1);
    expect(gaps.above).toBeGreaterThanOrEqual(8);
  });

  it('slides the drawer from the inline end, flipping under dir="rtl"', async () => {
    const page = await newE2EPage();
    await page.setViewport({ width: 390, height: 844 });
    await page.setContent(MARKUP);
    await page.waitForChanges();

    const ltr = await page.evaluate(() => {
      const host = document.querySelector('aegov-header');
      return (host.shadowRoot.querySelector('aegov-drawer') as any).position;
    });
    expect(ltr).toBe('right');

    await page.evaluate(() => document.documentElement.setAttribute('dir', 'rtl'));
    await page.waitForChanges();

    const rtl = await page.evaluate(() => {
      const host = document.querySelector('aegov-header');
      return (host.shadowRoot.querySelector('aegov-drawer') as any).position;
    });
    expect(rtl).toBe('left');
  });

  it('does not leak the internal drawer events to consumers', async () => {
    const page = await newE2EPage();
    await page.setViewport({ width: 390, height: 844 });
    await page.setContent(MARKUP);
    await page.waitForChanges();

    const leaked = await page.spyOnEvent('aegovDrawerOpen');
    await (await page.find('aegov-header >>> .header__menu-toggle')).click();
    await page.waitForChanges();
    await new Promise((resolve) => setTimeout(resolve, 400));

    expect(leaked).not.toHaveReceivedEvent();
  });

  it('exposes openMenu and closeMenu methods', async () => {
    const page = await newE2EPage();
    await page.setViewport({ width: 390, height: 844 });
    await page.setContent(MARKUP);
    await page.waitForChanges();

    const host = await page.find('aegov-header');
    await host.callMethod('openMenu');
    await page.waitForChanges();
    await new Promise((resolve) => setTimeout(resolve, 400));

    let isOpen = await page.evaluate(() => {
      const el = document.querySelector('aegov-header');
      return (el.shadowRoot.querySelector('aegov-drawer') as any).isOpen;
    });
    expect(isOpen).toBe(true);

    await host.callMethod('closeMenu');
    await page.waitForChanges();
    await new Promise((resolve) => setTimeout(resolve, 500));

    isOpen = await page.evaluate(() => {
      const el = document.querySelector('aegov-header');
      return (el.shadowRoot.querySelector('aegov-drawer') as any).isOpen;
    });
    expect(isOpen).toBe(false);
  });
  describe('gsr-stars (Global Star Rating badge)', () => {
    // A 400x100 logo; `style` lets a test pin its rendered height, otherwise the
    // header's own ::slotted sizing applies (48px / 64px at lg / 72px at xl).
    const logo = (style = '') => `<img slot="logo" src="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22100%22/%3E" alt="Entity" ${style ? `style="${style}"` : ''} />`;
    const markup = (attrs: string, { dir = 'ltr', logoStyle = '' } = {}) => `
      <div dir="${dir}">
        <aegov-header entity-name="N" entity-domain="https://x.gov.ae" ${attrs}>
          ${logo(logoStyle)}
          <nav slot="mobile-content" aria-label="Mobile"><a href="#a">A</a></nav>
        </aegov-header>
      </div>`;
    const waitForBadge = (page) => page.waitForFunction(() => {
      const img = document.querySelector('aegov-header').shadowRoot.querySelector('.header__gsr-img') as HTMLImageElement;
      return !!img && img.complete && img.naturalWidth > 0;
    });
    const settle = async (page) => { await page.waitForChanges(); await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))); };
    const rects = (page) => page.evaluate(() => {
      const box = (el: Element) => { const b = el.getBoundingClientRect(); return { left: b.left, right: b.right, top: b.top, width: b.width, height: b.height, cy: b.top + b.height / 2 }; };
      const host = document.querySelector('aegov-header');
      return { logo: box(host.querySelector('img[slot="logo"]')), gsr: box(host.shadowRoot.querySelector('.header__gsr')) };
    });

    it('loads the badge after the logo on the inline end, centred on it (LTR)', async () => {
      const page = await newE2EPage();
      await page.setViewport({ width: 1280, height: 800 });
      await page.setContent(markup('gsr-stars="4"', { logoStyle: 'height:64px;width:auto' }));
      await waitForBadge(page); await settle(page);
      const { logo, gsr } = await rects(page);
      expect(gsr.left).toBeGreaterThan(logo.right);
      expect(gsr.height).toBeCloseTo(64, 0);
      expect(gsr.width).toBeCloseTo(64 * 912 / 964, 0);
      expect(Math.abs(gsr.cy - logo.cy)).toBeLessThan(1);
    });

    it('mirrors under dir="rtl": the badge sits to the left of the logo', async () => {
      const page = await newE2EPage();
      await page.setViewport({ width: 1280, height: 800 });
      await page.setContent(markup('gsr-stars="3"', { dir: 'rtl', logoStyle: 'height:64px;width:auto' }));
      await waitForBadge(page); await settle(page);
      const { logo, gsr } = await rects(page);
      expect(gsr.right).toBeLessThan(logo.left);
      expect(Math.abs(gsr.cy - logo.cy)).toBeLessThan(1);
    });

    it('never grows past 80px, however tall the logo', async () => {
      const page = await newE2EPage();
      await page.setViewport({ width: 1280, height: 800 });
      await page.setContent(markup('gsr-stars="5"', { logoStyle: 'height:120px;width:auto;max-width:none' }));
      await waitForBadge(page); await settle(page);
      const { logo, gsr } = await rects(page);
      expect(gsr.height).toBeCloseTo(80, 0);
      expect(Math.abs(gsr.cy - logo.cy)).toBeLessThan(1);
    });

    it('never shrinks under 50px, however short the logo', async () => {
      const page = await newE2EPage();
      await page.setViewport({ width: 1280, height: 800 });
      await page.setContent(markup('gsr-stars="5"', { logoStyle: 'height:30px;width:auto' }));
      await waitForBadge(page); await settle(page);
      expect((await rects(page)).gsr.height).toBeCloseTo(50, 0);
    });

    it('follows the default logo size per breakpoint: 50px on phones, 64px at lg, 72px at xl', async () => {
      const page = await newE2EPage();
      await page.setViewport({ width: 375, height: 800 });
      await page.setContent(markup('gsr-stars="5"'));
      await waitForBadge(page); await settle(page);
      let r = await rects(page);
      expect(r.logo.height).toBeCloseTo(48, 0);
      expect(r.gsr.height).toBeCloseTo(50, 0);
      await page.setViewport({ width: 1100, height: 800 }); await settle(page);
      r = await rects(page);
      expect(r.logo.height).toBeCloseTo(64, 0);
      expect(r.gsr.height).toBeCloseTo(64, 0);
      await page.setViewport({ width: 1400, height: 800 }); await settle(page);
      r = await rects(page);
      expect(r.logo.height).toBeCloseTo(72, 0);
      expect(r.gsr.height).toBeCloseTo(72, 0);
    });

    it('keeps 16px between logo and badge on phones, 20px from md and 24px from lg', async () => {
      const page = await newE2EPage();
      await page.setViewport({ width: 375, height: 800 });
      await page.setContent(markup('gsr-stars="2"'));
      await waitForBadge(page); await settle(page);
      const gap = async () => { const r = await rects(page); return r.gsr.left - r.logo.right; };
      expect(await gap()).toBeCloseTo(16, 0);
      await page.setViewport({ width: 800, height: 800 }); await settle(page);
      expect(await gap()).toBeCloseTo(20, 0);
      await page.setViewport({ width: 1280, height: 800 }); await settle(page);
      expect(await gap()).toBeCloseTo(24, 0);
    });

    it('resizes with the logo at runtime', async () => {
      const page = await newE2EPage();
      await page.setViewport({ width: 1280, height: 800 });
      await page.setContent(markup('gsr-stars="3"', { logoStyle: 'height:40px;width:auto' }));
      await waitForBadge(page); await settle(page);
      expect((await rects(page)).gsr.height).toBeCloseTo(50, 0);
      await page.$eval('aegov-header img[slot="logo"]', (el: HTMLElement) => { el.style.height = '60px'; });
      await settle(page);
      expect((await rects(page)).gsr.height).toBeCloseTo(60, 0);
      await page.$eval('aegov-header img[slot="logo"]', (el: HTMLElement) => { el.style.height = '100px'; el.style.maxWidth = 'none'; });
      await settle(page);
      expect((await rects(page)).gsr.height).toBeCloseTo(80, 0);
    });

    it('does not cause horizontal overflow at 320px', async () => {
      const page = await newE2EPage();
      await page.setViewport({ width: 320, height: 700 });
      await page.setContent(markup('gsr-stars="5" variant="authority"'));
      await waitForBadge(page); await settle(page);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });

    it('fetches the badge artwork only when a rating is set', async () => {
      const page = await newE2EPage();
      const urls: string[] = [];
      page.on('request', (req) => urls.push(req.url()));
      await page.setContent(markup(''));
      await page.waitForChanges();
      expect(urls.filter((u) => /gsr-badge/.test(u))).toEqual([]);
      await page.$eval('aegov-header', (el: any) => { el.gsrStars = 2; });
      await waitForBadge(page);
      expect(urls.filter((u) => /gsr-badge/.test(u)).length).toBeGreaterThan(0);
    });
  });
});
