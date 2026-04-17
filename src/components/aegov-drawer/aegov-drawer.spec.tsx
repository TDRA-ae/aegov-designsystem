import { newSpecPage } from '@stencil/core/testing';
import { AegovDrawer } from './aegov-drawer';

describe('aegov-drawer', () => {
  describe('rendering', () => {
    it('should render with default props', async () => {
      const page = await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer><div>Drawer content</div></aegov-drawer>`,
      });

      expect(page.root).toBeTruthy();
      expect(page.root?.shadowRoot).toBeTruthy();
    });

    it('should not render content when closed', async () => {
      const page = await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer><div>Drawer content</div></aegov-drawer>`,
      });

      const container = page.root?.shadowRoot?.querySelector('.aegov-drawer-container');
      expect(container).toBeNull();
    });

    it('should render when open is true', async () => {
      const page = await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer open="true"><div>Drawer content</div></aegov-drawer>`,
      });

      await page.waitForChanges();
      const container = page.root?.shadowRoot?.querySelector('.aegov-drawer-container');
      expect(container).toBeTruthy();
    });

    it('should use shadow DOM', async () => {
      const page = await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer open="true"><div>Content</div></aegov-drawer>`,
      });

      expect(page.root?.shadowRoot).toBeTruthy();
    });

    it('should render slotted content', async () => {
      const page = await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer open="true"><div class="test-content">Test</div></aegov-drawer>`,
      });

      await page.waitForChanges();
      const slot = page.root?.shadowRoot?.querySelector('slot');
      expect(slot).toBeTruthy();
    });

    it('should return null when closed and animationState is closed', async () => {
      const page = await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer><div>Content</div></aegov-drawer>`,
      });

      expect(page.rootInstance.open).toBe(false);
      expect(page.rootInstance.animationState).toBe('closed');
      const backdrop = page.root?.shadowRoot?.querySelector('.aegov-drawer-backdrop');
      expect(backdrop).toBeNull();
    });
  });

  describe('default props', () => {
    it('should have default open value of false', async () => {
      const page = await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer><div>Content</div></aegov-drawer>`,
      });

      expect(page.rootInstance.open).toBe(false);
    });

    it('should have default position value of right', async () => {
      const page = await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer><div>Content</div></aegov-drawer>`,
      });

      expect(page.rootInstance.position).toBe('right');
    });

    it('should have default animation value of slide', async () => {
      const page = await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer><div>Content</div></aegov-drawer>`,
      });

      expect(page.rootInstance.animation).toBe('slide');
    });

    it('should have default pinned value of true', async () => {
      const page = await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer><div>Content</div></aegov-drawer>`,
      });

      expect(page.rootInstance.pinned).toBe(true);
    });

    it('should have default overlay value of true', async () => {
      const page = await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer><div>Content</div></aegov-drawer>`,
      });

      expect(page.rootInstance.overlay).toBe(true);
    });

    it('should have default overlayOpacity value of base', async () => {
      const page = await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer><div>Content</div></aegov-drawer>`,
      });

      expect(page.rootInstance.overlayOpacity).toBe('base');
    });

    it('should have default closeWithBackdrop value of true', async () => {
      const page = await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer><div>Content</div></aegov-drawer>`,
      });

      expect(page.rootInstance.closeWithBackdrop).toBe(true);
    });

    it('should have default preventBodyScroll value of true', async () => {
      const page = await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer><div>Content</div></aegov-drawer>`,
      });

      expect(page.rootInstance.preventBodyScroll).toBe(true);
    });

    it('should have default animationState of closed', async () => {
      const page = await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer><div>Content</div></aegov-drawer>`,
      });

      expect(page.rootInstance.animationState).toBe('closed');
    });
  });

  describe('position variants', () => {
    it('should apply drawer-container--right class by default', async () => {
      const page = await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer open="true"><div>Content</div></aegov-drawer>`,
      });

      await page.waitForChanges();
      const container = page.root?.shadowRoot?.querySelector('.drawer-container--right');
      expect(container).toBeTruthy();
    });

    it('should apply drawer-container--left class', async () => {
      const page = await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer open="true" position="left"><div>Content</div></aegov-drawer>`,
      });

      await page.waitForChanges();
      const container = page.root?.shadowRoot?.querySelector('.drawer-container--left');
      expect(container).toBeTruthy();
    });

    it('should apply drawer-container--top class', async () => {
      const page = await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer open="true" position="top"><div>Content</div></aegov-drawer>`,
      });

      await page.waitForChanges();
      const container = page.root?.shadowRoot?.querySelector('.drawer-container--top');
      expect(container).toBeTruthy();
    });

    it('should apply drawer-container--bottom class', async () => {
      const page = await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer open="true" position="bottom"><div>Content</div></aegov-drawer>`,
      });

      await page.waitForChanges();
      const container = page.root?.shadowRoot?.querySelector('.drawer-container--bottom');
      expect(container).toBeTruthy();
    });
  });

  describe('animation variants', () => {
    it('should set data-animation="slide" by default', async () => {
      const page = await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer open="true"><div>Content</div></aegov-drawer>`,
      });

      await page.waitForChanges();
      const container = page.root?.shadowRoot?.querySelector('.aegov-drawer-container');
      expect(container?.getAttribute('data-animation')).toBe('slide');
    });

    it('should set data-animation="fade"', async () => {
      const page = await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer open="true" animation="fade"><div>Content</div></aegov-drawer>`,
      });

      await page.waitForChanges();
      const container = page.root?.shadowRoot?.querySelector('.aegov-drawer-container');
      expect(container?.getAttribute('data-animation')).toBe('fade');
    });

    it('should set data-animation="none"', async () => {
      const page = await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer open="true" animation="none"><div>Content</div></aegov-drawer>`,
      });

      await page.waitForChanges();
      const container = page.root?.shadowRoot?.querySelector('.aegov-drawer-container');
      expect(container?.getAttribute('data-animation')).toBe('none');
    });
  });

  describe('pinned vs unpinned', () => {
    it('should not have unpinned class when pinned is true', async () => {
      const page = await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer open="true"><div>Content</div></aegov-drawer>`,
      });

      await page.waitForChanges();
      const container = page.root?.shadowRoot?.querySelector('.drawer-container--unpinned');
      expect(container).toBeNull();
    });

    it('should have unpinned class when pinned is false', async () => {
      const page = await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer open="true" pinned="false"><div>Content</div></aegov-drawer>`,
      });

      await page.waitForChanges();
      const container = page.root?.shadowRoot?.querySelector('.drawer-container--unpinned');
      expect(container).toBeTruthy();
    });
  });

  describe('overlay', () => {
    it('should render backdrop when overlay is true', async () => {
      const page = await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer open="true"><div>Content</div></aegov-drawer>`,
      });

      await page.waitForChanges();
      const backdrop = page.root?.shadowRoot?.querySelector('.aegov-drawer-backdrop');
      expect(backdrop).toBeTruthy();
    });

    it('should not render backdrop when overlay is false', async () => {
      const page = await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer open="true" overlay="false"><div>Content</div></aegov-drawer>`,
      });

      await page.waitForChanges();
      const backdrop = page.root?.shadowRoot?.querySelector('.aegov-drawer-backdrop');
      expect(backdrop).toBeNull();
    });

    it('should render invisible backdrop when overlay is false but closeWithBackdrop is true', async () => {
      const page = await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer open="true" overlay="false"><div>Content</div></aegov-drawer>`,
      });

      await page.waitForChanges();
      const invisible = page.root?.shadowRoot?.querySelector('.aegov-drawer-backdrop-invisible');
      expect(invisible).toBeTruthy();
    });

    it('should not render invisible backdrop when both overlay and closeWithBackdrop are false', async () => {
      const page = await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer open="true" overlay="false" close-with-backdrop="false"><div>Content</div></aegov-drawer>`,
      });

      await page.waitForChanges();
      const invisible = page.root?.shadowRoot?.querySelector('.aegov-drawer-backdrop-invisible');
      expect(invisible).toBeNull();
    });

    it('should apply drawer-backdrop--base class by default', async () => {
      const page = await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer open="true"><div>Content</div></aegov-drawer>`,
      });

      await page.waitForChanges();
      const backdrop = page.root?.shadowRoot?.querySelector('.drawer-backdrop--base');
      expect(backdrop).toBeTruthy();
    });

    it('should apply drawer-backdrop--light class', async () => {
      const page = await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer open="true" overlay-opacity="light"><div>Content</div></aegov-drawer>`,
      });

      await page.waitForChanges();
      const backdrop = page.root?.shadowRoot?.querySelector('.drawer-backdrop--light');
      expect(backdrop).toBeTruthy();
    });

    it('should apply drawer-backdrop--dark class', async () => {
      const page = await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer open="true" overlay-opacity="dark"><div>Content</div></aegov-drawer>`,
      });

      await page.waitForChanges();
      const backdrop = page.root?.shadowRoot?.querySelector('.drawer-backdrop--dark');
      expect(backdrop).toBeTruthy();
    });
  });

  describe('accessibility', () => {
    it('should render with role="dialog"', async () => {
      const page = await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer open="true"><div>Content</div></aegov-drawer>`,
      });

      await page.waitForChanges();
      const dialog = page.root?.shadowRoot?.querySelector('[role="dialog"]');
      expect(dialog).toBeTruthy();
    });

    it('should render with aria-modal="true"', async () => {
      const page = await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer open="true"><div>Content</div></aegov-drawer>`,
      });

      await page.waitForChanges();
      const modal = page.root?.shadowRoot?.querySelector('[aria-modal="true"]');
      expect(modal).toBeTruthy();
    });

    it('should pass through aria-label attribute', async () => {
      const page = await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer open="true" aria-label="Navigation drawer"><div>Content</div></aegov-drawer>`,
      });

      await page.waitForChanges();
      const dialog = page.root?.shadowRoot?.querySelector('[aria-label="Navigation drawer"]');
      expect(dialog).toBeTruthy();
    });
  });

  describe('pass-through attributes', () => {
    it('should pass through id attribute', async () => {
      const page = await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer id="my-drawer" open="true"><div>Content</div></aegov-drawer>`,
      });

      await page.waitForChanges();
      const content = page.root?.shadowRoot?.querySelector('#my-drawer');
      expect(content).toBeTruthy();
    });

    it('should pass through data-* attributes', async () => {
      const page = await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer data-testid="drawer-test" open="true"><div>Content</div></aegov-drawer>`,
      });

      await page.waitForChanges();
      const content = page.root?.shadowRoot?.querySelector('[data-testid="drawer-test"]');
      expect(content).toBeTruthy();
    });

    it('should pass through aria-describedby attribute', async () => {
      const page = await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer aria-describedby="desc" open="true"><div>Content</div></aegov-drawer>`,
      });

      await page.waitForChanges();
      const content = page.root?.shadowRoot?.querySelector('[aria-describedby="desc"]');
      expect(content).toBeTruthy();
    });
  });

  describe('public methods', () => {
    it('should open drawer via show() method', async () => {
      const page = await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer><div>Content</div></aegov-drawer>`,
      });

      expect(page.rootInstance.open).toBe(false);

      await page.rootInstance.show();
      await page.waitForChanges();

      expect(page.rootInstance.open).toBe(true);
    });

    it('should close drawer via close() method', async () => {
      const page = await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer open="true"><div>Content</div></aegov-drawer>`,
      });

      expect(page.rootInstance.open).toBe(true);

      await page.rootInstance.close();
      await page.waitForChanges();

      expect(page.rootInstance.animationState).toBe('closing');
    });

    it('should toggle drawer via toggle() method', async () => {
      const page = await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer><div>Content</div></aegov-drawer>`,
      });

      expect(page.rootInstance.open).toBe(false);

      await page.rootInstance.toggle();
      await page.waitForChanges();

      expect(page.rootInstance.open).toBe(true);

      await page.rootInstance.toggle();
      await page.waitForChanges();

      expect(page.rootInstance.open).toBe(false);
    });
  });

  describe('events', () => {
    it('should emit aegovDrawerOpen event when opened', async () => {
      const page = await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer><div>Content</div></aegov-drawer>`,
      });

      const openSpy = jest.fn();
      page.root?.addEventListener('aegovDrawerOpen', openSpy);

      await page.rootInstance.show();
      await page.waitForChanges();

      expect(openSpy).toHaveBeenCalled();
    });

    it('should emit aegovDrawerClose event when closed', async () => {
      const page = await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer open="true"><div>Content</div></aegov-drawer>`,
      });

      const closeSpy = jest.fn();
      page.root?.addEventListener('aegovDrawerClose', closeSpy);

      page.rootInstance.open = false;
      page.rootInstance['handleCloseComplete']();
      await page.waitForChanges();

      expect(closeSpy).toHaveBeenCalled();
    });

    it('should emit aegovDrawerBeforeClose event before closing', async () => {
      const page = await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer open="true"><div>Content</div></aegov-drawer>`,
      });

      const beforeCloseSpy = jest.fn();
      page.root?.addEventListener('aegovDrawerBeforeClose', beforeCloseSpy);

      await page.rootInstance.close();
      await page.waitForChanges();

      expect(beforeCloseSpy).toHaveBeenCalled();
    });

    it('should allow preventing drawer close via aegovDrawerBeforeClose', async () => {
      const page = await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer open="true"><div>Content</div></aegov-drawer>`,
      });

      page.root?.addEventListener('aegovDrawerBeforeClose', (event: any) => {
        event.detail.preventDefault();
      });

      await page.rootInstance.close();
      await page.waitForChanges();

      expect(page.rootInstance.open).toBe(true);
    });
  });

  describe('animation states', () => {
    it('should have animationState="closed" initially', async () => {
      const page = await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer><div>Content</div></aegov-drawer>`,
      });

      expect(page.rootInstance.animationState).toBe('closed');
    });

    it('should begin open sequence when show() is called', async () => {
      const page = await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer><div>Content</div></aegov-drawer>`,
      });

      await page.rootInstance.show();
      await page.waitForChanges();

      // Initially renders at 'closed' position for the transition start state,
      // then rAF moves it to 'opening'. In spec tests rAF doesn't fire,
      // so we verify the element is rendered (open=true) with a transitional state.
      expect(page.rootInstance.open).toBe(true);
      expect(['closed', 'opening']).toContain(page.rootInstance.animationState);
    });

    it('should set animationState="closing" when closing', async () => {
      const page = await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer open="true"><div>Content</div></aegov-drawer>`,
      });

      await page.rootInstance.close();
      await page.waitForChanges();

      expect(page.rootInstance.animationState).toBe('closing');
    });
  });

  describe('z-index stacking', () => {
    it('should set z-index based on drawer count', async () => {
      const page = await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer open="true"><div>Content</div></aegov-drawer>`,
      });

      await page.waitForChanges();

      const style = page.root?.getAttribute('style');
      expect(style).toContain('--drawer-z-index');
    });
  });

  describe('animation duration', () => {
    it('should return 0 for none animation', async () => {
      const page = await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer animation="none"><div>Content</div></aegov-drawer>`,
      });

      expect(page.rootInstance['getAnimationDuration']()).toBe(0);
    });

    it('should return 300 for slide animation', async () => {
      const page = await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer animation="slide"><div>Content</div></aegov-drawer>`,
      });

      expect(page.rootInstance['getAnimationDuration']()).toBe(300);
    });

    it('should return 300 for fade animation', async () => {
      const page = await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer animation="fade"><div>Content</div></aegov-drawer>`,
      });

      expect(page.rootInstance['getAnimationDuration']()).toBe(300);
    });
  });

  describe('invalid prop values', () => {
    let warnSpy: jest.SpyInstance;

    beforeEach(() => {
      warnSpy = jest.spyOn(console, 'warn').mockImplementation();
    });

    afterEach(() => {
      warnSpy.mockRestore();
    });

    it('renders safely when position is invalid', async () => {
      const page = await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer open="true" position="middle"><div>Content</div></aegov-drawer>`,
      });
      await page.waitForChanges();
      expect(page.root).toBeTruthy();
    });

    it('renders safely when animation is invalid', async () => {
      const page = await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer open="true" animation="bounce"><div>Content</div></aegov-drawer>`,
      });
      await page.waitForChanges();
      expect(page.root).toBeTruthy();
    });

    it('renders safely when overlayOpacity is invalid', async () => {
      const page = await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer open="true" overlay-opacity="crazy"><div>Content</div></aegov-drawer>`,
      });
      await page.waitForChanges();
      expect(page.root).toBeTruthy();
    });

    it('warns with component name, prop name, invalid value, and fallback', async () => {
      await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer position="weird"><div>Content</div></aegov-drawer>`,
      });
      const messages = warnSpy.mock.calls.map(c => c[0] as string);
      const warn = messages.find(m => m.includes('"position"'));
      expect(warn).toBeDefined();
      expect(warn).toContain('[aegov-drawer]');
      expect(warn).toContain('"weird"');
      expect(warn).toContain('right');
    });

    it('does not warn when all props are valid', async () => {
      await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer position="left" animation="fade" overlay-opacity="dark"><div>Content</div></aegov-drawer>`,
      });
      expect(warnSpy).not.toHaveBeenCalled();
    });

    it('warns again via @Watch when position is updated to invalid value', async () => {
      const page = await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer position="right"><div>Content</div></aegov-drawer>`,
      });
      page.root.setAttribute('position', 'nope');
      await page.waitForChanges();
      const messages = warnSpy.mock.calls.map(c => c[0] as string);
      const warn = messages.find(m => m.includes('[aegov-drawer]') && m.includes('"position"'));
      expect(warn).toBeDefined();
    });

    it('warns again via @Watch when animation is updated to invalid value', async () => {
      const page = await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer animation="slide"><div>Content</div></aegov-drawer>`,
      });
      page.root.setAttribute('animation', 'nope');
      await page.waitForChanges();
      const messages = warnSpy.mock.calls.map(c => c[0] as string);
      const warn = messages.find(m => m.includes('[aegov-drawer]') && m.includes('"animation"'));
      expect(warn).toBeDefined();
    });

    it('warns again via @Watch when overlayOpacity is updated to invalid value', async () => {
      const page = await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer overlay-opacity="base"><div>Content</div></aegov-drawer>`,
      });
      page.root.setAttribute('overlay-opacity', 'nope');
      await page.waitForChanges();
      const messages = warnSpy.mock.calls.map(c => c[0] as string);
      const warn = messages.find(m => m.includes('[aegov-drawer]') && m.includes('"overlayOpacity"'));
      expect(warn).toBeDefined();
    });
  });
});
