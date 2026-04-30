import { newE2EPage } from '@stencil/core/testing';

describe('aegov-drawer E2E', () => {
  describe('rendering', () => {
    it('should render with shadow DOM', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-drawer is-open><div>Drawer content</div></aegov-drawer>`);

      const drawer = await page.find('aegov-drawer');
      expect(drawer).toBeTruthy();
      expect(drawer.shadowRoot).toBeTruthy();
    });

    it('should not display drawer when closed', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-drawer><div>Drawer content</div></aegov-drawer>`);

      const container = await page.find('aegov-drawer >>> .aegov-drawer-container');
      expect(container).toBeNull();
    });

    it('should display drawer when open', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-drawer is-open><div>Drawer content</div></aegov-drawer>`);

      const container = await page.find('aegov-drawer >>> .aegov-drawer-container');
      expect(container).toBeTruthy();
    });

    it('should render slotted content', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-drawer is-open>
          <div class="test-content">Test Content</div>
        </aegov-drawer>
      `);

      const content = await page.find('.test-content');
      expect(content).toBeTruthy();
      expect(content.textContent).toBe('Test Content');
    });
  });

  describe('position variants', () => {
    it('should render with right position by default', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-drawer is-open><div>Content</div></aegov-drawer>`);

      const container = await page.find('aegov-drawer >>> .drawer-container--right');
      expect(container).toBeTruthy();
    });

    it('should render with left position', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-drawer is-open position="left"><div>Content</div></aegov-drawer>`);

      const container = await page.find('aegov-drawer >>> .drawer-container--left');
      expect(container).toBeTruthy();
    });

    it('should render with top position', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-drawer is-open position="top"><div>Content</div></aegov-drawer>`);

      const container = await page.find('aegov-drawer >>> .drawer-container--top');
      expect(container).toBeTruthy();
    });

    it('should render with bottom position', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-drawer is-open position="bottom"><div>Content</div></aegov-drawer>`);

      const container = await page.find('aegov-drawer >>> .drawer-container--bottom');
      expect(container).toBeTruthy();
    });
  });

  describe('overlay', () => {
    it('should render backdrop with base opacity by default', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-drawer is-open><div>Content</div></aegov-drawer>`);

      const backdrop = await page.find('aegov-drawer >>> .drawer-backdrop--base');
      expect(backdrop).toBeTruthy();
    });

    it('should render backdrop with light opacity', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-drawer is-open overlay-opacity="light"><div>Content</div></aegov-drawer>`);

      const backdrop = await page.find('aegov-drawer >>> .drawer-backdrop--light');
      expect(backdrop).toBeTruthy();
    });

    it('should render backdrop with dark opacity', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-drawer is-open overlay-opacity="dark"><div>Content</div></aegov-drawer>`);

      const backdrop = await page.find('aegov-drawer >>> .drawer-backdrop--dark');
      expect(backdrop).toBeTruthy();
    });

    it('should not render backdrop when overlay is false', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-drawer is-open is-overlay="false"><div>Content</div></aegov-drawer>`);

      const backdrop = await page.find('aegov-drawer >>> .aegov-drawer-backdrop');
      expect(backdrop).toBeNull();
    });

    it('should render invisible backdrop when overlay is false but closeWithBackdrop is true', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-drawer is-open is-overlay="false"><div>Content</div></aegov-drawer>`);

      const invisible = await page.find('aegov-drawer >>> .aegov-drawer-backdrop-invisible');
      expect(invisible).toBeTruthy();
    });
  });

  describe('pinned vs unpinned', () => {
    it('should not have unpinned class when pinned (default)', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-drawer is-open><div>Content</div></aegov-drawer>`);

      const unpinned = await page.find('aegov-drawer >>> .drawer-container--unpinned');
      expect(unpinned).toBeNull();
    });

    it('should have unpinned class when pinned is false', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-drawer is-open is-pinned="false"><div>Content</div></aegov-drawer>`);

      const unpinned = await page.find('aegov-drawer >>> .drawer-container--unpinned');
      expect(unpinned).toBeTruthy();
    });
  });

  describe('animation variants', () => {
    it('should set data-animation="slide" by default', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-drawer is-open><div>Content</div></aegov-drawer>`);

      const container = await page.find('aegov-drawer >>> .aegov-drawer-container');
      expect(container.getAttribute('data-animation')).toBe('slide');
    });

    it('should set data-animation="fade"', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-drawer is-open animation="fade"><div>Content</div></aegov-drawer>`);

      const container = await page.find('aegov-drawer >>> .aegov-drawer-container');
      expect(container.getAttribute('data-animation')).toBe('fade');
    });

    it('should set data-animation="none"', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-drawer is-open animation="none"><div>Content</div></aegov-drawer>`);

      const container = await page.find('aegov-drawer >>> .aegov-drawer-container');
      expect(container.getAttribute('data-animation')).toBe('none');
    });
  });

  describe('public methods', () => {
    it('should open drawer via show() method', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-drawer><div>Content</div></aegov-drawer>`);

      const drawer = await page.find('aegov-drawer');

      let container = await page.find('aegov-drawer >>> .aegov-drawer-container');
      expect(container).toBeNull();

      await drawer.callMethod('show');
      await page.waitForChanges();

      container = await page.find('aegov-drawer >>> .aegov-drawer-container');
      expect(container).toBeTruthy();
    });

    it('should close drawer via close() method', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-drawer is-open><div>Content</div></aegov-drawer>`);

      const drawer = await page.find('aegov-drawer');

      let container = await page.find('aegov-drawer >>> .aegov-drawer-container');
      expect(container).toBeTruthy();

      await drawer.callMethod('close');
      await page.waitForChanges();

      const drawerState = await drawer.getAttribute('data-state');
      expect(['closing', 'closed']).toContain(drawerState);
    });

    it('should toggle drawer via toggle() method', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-drawer><div>Content</div></aegov-drawer>`);

      const drawer = await page.find('aegov-drawer');

      let container = await page.find('aegov-drawer >>> .aegov-drawer-container');
      expect(container).toBeNull();

      await drawer.callMethod('toggle');
      await page.waitForChanges();
      // Wait for double-rAF + animation duration to fully open
      await new Promise(resolve => setTimeout(resolve, 500));
      await page.waitForChanges();
      container = await page.find('aegov-drawer >>> .aegov-drawer-container');
      expect(container).toBeTruthy();

      await drawer.callMethod('toggle');
      await page.waitForChanges();
      await new Promise(resolve => setTimeout(resolve, 350));
      await page.waitForChanges();

      const drawerState = await drawer.getAttribute('data-state');
      expect(['closing', 'closed', null]).toContain(drawerState);
    });
  });

  describe('events', () => {
    it('should emit aegovDrawerOpen event when opened', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-drawer><div>Content</div></aegov-drawer>`);

      const drawer = await page.find('aegov-drawer');
      const openEvent = await drawer.spyOnEvent('aegovDrawerOpen');

      await drawer.callMethod('show');
      await page.waitForChanges();

      expect(openEvent).toHaveReceivedEvent();
    });

    it('should emit aegovDrawerBeforeClose event before closing', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-drawer is-open><div>Content</div></aegov-drawer>`);

      const drawer = await page.find('aegov-drawer');
      const beforeCloseEvent = await drawer.spyOnEvent('aegovDrawerBeforeClose');

      await drawer.callMethod('close');
      await page.waitForChanges();

      expect(beforeCloseEvent).toHaveReceivedEvent();
    });

    it('should emit aegovDrawerBackdropClick event when backdrop is clicked', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-drawer is-open><div>Content</div></aegov-drawer>`);

      const drawer = await page.find('aegov-drawer');
      const backdropClickEvent = await drawer.spyOnEvent('aegovDrawerBackdropClick');

      const backdrop = await page.find('aegov-drawer >>> .aegov-drawer-backdrop');
      await backdrop.click();
      await page.waitForChanges();

      expect(backdropClickEvent).toHaveReceivedEvent();
    });

    it('should close drawer on ESC key press', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-drawer is-open><div>Content</div></aegov-drawer>`);

      const container = await page.find('aegov-drawer >>> .aegov-drawer-container');
      expect(container).toBeTruthy();

      await page.keyboard.press('Escape');
      await page.waitForChanges();

      const drawer = await page.find('aegov-drawer');
      const state = await drawer.getAttribute('data-state');
      expect(['closing', 'closed']).toContain(state);
    });
  });

  describe('backdrop click', () => {
    it('should close drawer when backdrop is clicked', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-drawer is-open><div>Content</div></aegov-drawer>`);

      const backdrop = await page.find('aegov-drawer >>> .aegov-drawer-backdrop');
      expect(backdrop).toBeTruthy();

      await backdrop.click();
      await page.waitForChanges();

      const drawer = await page.find('aegov-drawer');
      const state = await drawer.getAttribute('data-state');
      expect(['closing', 'closed', null]).toContain(state);
    });

    it('should NOT close drawer when closeWithBackdrop is false', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-drawer is-open is-close-with-backdrop="false"><div>Content</div></aegov-drawer>`);

      const backdrop = await page.find('aegov-drawer >>> .aegov-drawer-backdrop');
      expect(backdrop).toBeTruthy();

      await backdrop.click();
      await page.waitForChanges();

      const container = await page.find('aegov-drawer >>> .aegov-drawer-container');
      expect(container).toBeTruthy();
    });
  });

  describe('keyboard', () => {
    it('should close drawer when ESC key is pressed', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-drawer is-open><div>Content</div></aegov-drawer>`);

      const container = await page.find('aegov-drawer >>> .aegov-drawer-container');
      expect(container).toBeTruthy();

      await page.keyboard.press('Escape');
      await page.waitForChanges();

      const drawer = await page.find('aegov-drawer');
      const state = await drawer.getAttribute('data-state');
      expect(['closing', 'closed']).toContain(state);
    });
  });

  describe('accessibility', () => {
    it('should have role="dialog" on drawer container', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-drawer is-open><div>Content</div></aegov-drawer>`);

      const dialog = await page.find('aegov-drawer >>> [role="dialog"]');
      expect(dialog).toBeTruthy();
    });

    it('should have aria-modal="true" on drawer container', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-drawer is-open><div>Content</div></aegov-drawer>`);

      const modal = await page.find('aegov-drawer >>> [aria-modal="true"]');
      expect(modal).toBeTruthy();
    });

    it('should apply custom aria-label', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-drawer is-open aria-label="Navigation drawer"><div>Content</div></aegov-drawer>`);

      const dialog = await page.find('aegov-drawer >>> [aria-label="Navigation drawer"]');
      expect(dialog).toBeTruthy();
    });

    it('should apply custom aria-labelledby', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-drawer is-open aria-labelledby="drawer-title">
          <h2 id="drawer-title">Title</h2>
        </aegov-drawer>
      `);

      const dialog = await page.find('aegov-drawer >>> [aria-labelledby="drawer-title"]');
      expect(dialog).toBeTruthy();
    });
  });

  describe('pass-through attributes', () => {
    it('should pass through id attribute', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-drawer is-open id="my-drawer"><div>Content</div></aegov-drawer>`);

      const content = await page.find('aegov-drawer >>> #my-drawer');
      expect(content).toBeTruthy();
    });

    it('should pass through data-* attributes', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-drawer is-open data-testid="drawer-test"><div>Content</div></aegov-drawer>`);

      const content = await page.find('aegov-drawer >>> [data-testid="drawer-test"]');
      expect(content).toBeTruthy();
    });
  });
});
