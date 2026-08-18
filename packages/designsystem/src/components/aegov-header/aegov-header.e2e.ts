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
      const nav = host.shadowRoot.querySelector('.header__nav') as HTMLElement;
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
      const nav = host.shadowRoot.querySelector('.header__nav') as HTMLElement;
      const toggle = host.shadowRoot.querySelector('.header__menu-toggle') as HTMLElement;
      const actions = host.shadowRoot.querySelector('.header__actions') as HTMLElement;
      return {
        nav: getComputedStyle(nav).display,
        toggle: getComputedStyle(toggle).display,
        actions: getComputedStyle(actions).display,
      };
    });
    expect(visibility.nav).toBe('none');
    expect(visibility.toggle).not.toBe('none');
    // Secondary actions stay visible at every breakpoint.
    expect(visibility.actions).not.toBe('none');
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
        nav: getComputedStyle(host.shadowRoot.querySelector('.header__nav')).display,
        toggle: getComputedStyle(host.shadowRoot.querySelector('.header__menu-toggle')).display,
      };
    }, id);

    const atLg = await read('#at-lg');
    expect(atLg.nav).toBe('flex');
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
        nav: getComputedStyle(host.shadowRoot.querySelector('.header__nav')).display,
        toggle: getComputedStyle(host.shadowRoot.querySelector('.header__menu-toggle')).display,
      };
    });
    expect(state.nav).toBe('flex');
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

  const STICKY_PAGE = (attrs = 'is-sticky="true"') => `
    <style>body { margin: 0; }</style>
    <aegov-header ${attrs} entity-name="Ministry of Test" entity-domain="https://test.gov.ae" logo-label="Home">
      <img slot="logo" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" alt="logo" />
      <nav slot="navigation" aria-label="Main"><a href="#services">Services</a></nav>
      <nav slot="mobile-content" aria-label="Mobile"><a href="#services">Services</a></nav>
    </aegov-header>
    <main style="height: 4000px">Tall content</main>
  `;

  const stickyState = (page: any) => page.evaluate(() => {
    const host = document.querySelector('aegov-header') as HTMLElement;
    const head = host.shadowRoot.querySelector('.header__head') as HTMLElement;
    const banner = host.shadowRoot.querySelector('aegov-header-banner') as HTMLElement;
    const styles = getComputedStyle(head);
    return {
      hostPosition: getComputedStyle(host).position,
      hostClass: host.className,
      headTop: Math.round(head.getBoundingClientRect().top),
      bannerBottom: Math.round(banner.getBoundingClientRect().bottom),
      bannerHeightVar: host.style.getPropertyValue('--aegov-header-banner-height'),
      headHeightVar: host.style.getPropertyValue('--aegov-header-height'),
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
    expect(after.headTop).toBeLessThan(0);
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
    // The banner height drives the host's negative top offset.
    expect(parseFloat(atRest.bannerHeightVar)).toBeGreaterThan(0);
    expect(atRest.headTop).toBeGreaterThan(0);

    await page.evaluate(() => window.scrollTo(0, 1000));
    await new Promise((resolve) => setTimeout(resolve, 300));
    await page.waitForChanges();

    const stuck = await stickyState(page);
    // The bar sits at the very top of the viewport...
    expect(stuck.headTop).toBe(0);
    // ...and the banner has scrolled off above it.
    expect(stuck.bannerBottom).toBeLessThanOrEqual(0);
    expect(stuck.hostClass).toContain('header--stuck');
  });

  it('stays pinned far down a long page, rather than unsticking with its parent', async () => {
    const page = await newE2EPage();
    await page.setViewport({ width: 1280, height: 800 });
    await page.setContent(STICKY_PAGE());
    await page.waitForChanges();

    // Regression guard for the sticky-on-.header__head mistake: that version
    // unsticks once the header's own box has scrolled past, a few dozen pixels in.
    await page.evaluate(() => window.scrollTo(0, 3000));
    await new Promise((resolve) => setTimeout(resolve, 300));
    await page.waitForChanges();

    const state = await stickyState(page);
    expect(state.headTop).toBe(0);
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
    const published = parseFloat(state.headHeightVar);
    const measured = await page.evaluate(() => {
      const head = document.querySelector('aegov-header').shadowRoot.querySelector('.header__head') as HTMLElement;
      return head.offsetHeight;
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
    expect(after.headTop).toBeLessThan(0);
    // Measurement vars are cleaned up with the observers.
    expect(after.bannerHeightVar).toBe('');
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
    await page.setViewport({ width: 390, height: 844 });
    await page.setContent(STICKY_PAGE());
    await page.waitForChanges();

    await page.evaluate(() => window.scrollTo(0, 1000));
    await new Promise((resolve) => setTimeout(resolve, 300));
    await page.waitForChanges();

    await (await page.find('aegov-header >>> .header__menu-toggle')).click();
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
});
