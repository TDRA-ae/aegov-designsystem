import { newSpecPage } from '@stencil/core/testing';
import { AegovBanner } from './aegov-banner';
import { h } from '@stencil/core';

describe('aegov-banner', () => {
  // ============================================
  // RENDERING TESTS
  // ============================================

  describe('rendering', () => {
    it('should render with default props', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner>Default banner content</aegov-banner>,
      });

      expect(page.root).toBeTruthy();
      const banner = page.root?.querySelector('.aegov-banner');
      expect(banner).toBeTruthy();
    });

    it('should render slot content', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner>Test message</aegov-banner>,
      });

      expect(page.root?.textContent).toContain('Test message');
    });

    it('should render banner container', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner>Message</aegov-banner>,
      });

      expect(page.root?.querySelector('.banner__container')).toBeTruthy();
    });

    it('should render banner content', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner>Message</aegov-banner>,
      });

      expect(page.root?.querySelector('.banner__content')).toBeTruthy();
    });

    it('should render banner text area', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner>Message</aegov-banner>,
      });

      expect(page.root?.querySelector('.banner__text')).toBeTruthy();
    });

    it('should render dismiss button by default', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner>Message</aegov-banner>,
      });

      expect(page.root?.querySelector('.banner__dismiss')).toBeTruthy();
    });

    it('should render actions slot when provided', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `
          <aegov-banner>
            Banner content
            <div slot="actions">
              <button>Action</button>
            </div>
          </aegov-banner>
        `,
      });

      await page.waitForChanges();
      const actionsSlot = page.root?.querySelector('.banner__actions');
      expect(actionsSlot).toBeTruthy();
    });

    it('should not render when isVisible is false', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner>Content</aegov-banner>,
      });

      // Manually set isVisible to false
      (page.rootInstance as any).isVisible = false;
      await page.waitForChanges();

      const banner = page.root?.querySelector('.aegov-banner');
      expect(banner).toBeFalsy();
    });
  });

  // ============================================
  // VARIANT TESTS
  // ============================================

  describe('variant', () => {
    it('should render with default variant', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner variant="default">Content</aegov-banner>,
      });

      const banner = page.root?.querySelector('.banner--default');
      expect(banner).toBeTruthy();
    });

    it('should render with error variant', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner variant="error">Error message</aegov-banner>,
      });

      const banner = page.root?.querySelector('.banner--error');
      expect(banner).toBeTruthy();
    });

    it('should render with warning variant', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner variant="warning">Warning message</aegov-banner>,
      });

      const banner = page.root?.querySelector('.banner--warning');
      expect(banner).toBeTruthy();
    });

    it('should render with success variant', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner variant="success">Success message</aegov-banner>,
      });

      const banner = page.root?.querySelector('.banner--success');
      expect(banner).toBeTruthy();
    });

    it('should render with info variant', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner variant="info">Info message</aegov-banner>,
      });

      const banner = page.root?.querySelector('.banner--info');
      expect(banner).toBeTruthy();
    });
  });

  // ============================================
  // APPEARANCE TESTS
  // ============================================

  describe('appearance', () => {
    it('should render with soft appearance by default', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner>Content</aegov-banner>,
      });

      const banner = page.root?.querySelector('.banner--soft');
      expect(banner).toBeTruthy();
    });

    it('should render with solid appearance', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner appearance="solid">Content</aegov-banner>,
      });

      const banner = page.root?.querySelector('.banner--solid');
      expect(banner).toBeTruthy();
    });
  });

  // ============================================
  // POSITION TESTS
  // ============================================

  describe('position', () => {
    it('should render at top position by default', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner>Content</aegov-banner>,
      });

      const banner = page.root?.querySelector('.banner--top');
      expect(banner).toBeTruthy();
    });

    it('should render at bottom position', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner position="bottom">Content</aegov-banner>,
      });

      const banner = page.root?.querySelector('.banner--bottom');
      expect(banner).toBeTruthy();
    });
  });

  // ============================================
  // DISPLAY TESTS
  // ============================================

  describe('display', () => {
    it('should render with fixed display by default', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner>Content</aegov-banner>,
      });

      const banner = page.root?.querySelector('.banner--fixed');
      expect(banner).toBeTruthy();
    });

    it('should render with sticky display', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner display="sticky">Content</aegov-banner>,
      });

      const banner = page.root?.querySelector('.banner--sticky');
      expect(banner).toBeTruthy();
    });
  });

  // ============================================
  // MODE TESTS
  // ============================================

  describe('mode', () => {
    it('should render with push mode by default', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner>Content</aegov-banner>,
      });

      const banner = page.root?.querySelector('.banner--push');
      expect(banner).toBeTruthy();
    });

    it('should render with overlay mode', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner mode="overlay">Content</aegov-banner>,
      });

      const banner = page.root?.querySelector('.banner--overlay');
      expect(banner).toBeTruthy();
    });
  });

  // ============================================
  // DISMISSIBLE TESTS
  // ============================================

  describe('dismissible', () => {
    it('should render dismiss button by default', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner>Content</aegov-banner>,
      });

      const dismissButton = page.root?.querySelector('.banner__dismiss');
      expect(dismissButton).toBeTruthy();
    });

    it('should not render dismiss button when dismissible is false', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner dismissible={false}>Content</aegov-banner>,
      });

      const dismissButton = page.root?.querySelector('.banner__dismiss');
      expect(dismissButton).toBeFalsy();
    });

    it('should have correct aria-label on dismiss button', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner>Content</aegov-banner>,
      });

      const dismissButton = page.root?.querySelector('.banner__dismiss');
      expect(dismissButton?.getAttribute('aria-label')).toBe('Close banner');
    });

    it('should set isDismissing state when dismiss is clicked', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner>Content</aegov-banner>,
      });

      const dismissButton = page.root?.querySelector('.banner__dismiss') as HTMLButtonElement;
      dismissButton.click();
      await page.waitForChanges();

      const banner = page.root?.querySelector('.banner--dismissing');
      expect(banner).toBeTruthy();
    });

    it('should emit aegovBannerDismiss event when dismiss button is clicked', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner>Content</aegov-banner>,
      });

      let dismissEventFired = false;
      page.root?.addEventListener('aegovBannerDismiss', () => {
        dismissEventFired = true;
      });

      const dismissButton = page.root?.querySelector('.banner__dismiss') as HTMLButtonElement;
      dismissButton.click();

      // Wait for animation to complete (300ms)
      await new Promise(resolve => setTimeout(resolve, 350));
      await page.waitForChanges();

      expect(dismissEventFired).toBe(true);
    });

    it('should hide after dismissing', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner>Content</aegov-banner>,
      });

      const dismissButton = page.root?.querySelector('.banner__dismiss') as HTMLButtonElement;
      dismissButton.click();

      // Wait for animation
      await new Promise(resolve => setTimeout(resolve, 350));
      await page.waitForChanges();

      expect((page.rootInstance as any).isVisible).toBe(false);
    });
  });

  // ============================================
  // ACCESSIBILITY TESTS
  // ============================================

  describe('accessibility', () => {
    it('should have region role by default', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner variant="default">Content</aegov-banner>,
      });

      const banner = page.root?.querySelector('[role]');
      expect(banner?.getAttribute('role')).toBe('region');
    });

    it('should have alert role for error variant', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner variant="error">Error message</aegov-banner>,
      });

      const banner = page.root?.querySelector('[role]');
      expect(banner?.getAttribute('role')).toBe('alert');
    });

    it('should have alert role for success variant', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner variant="success">Success message</aegov-banner>,
      });

      const banner = page.root?.querySelector('[role]');
      expect(banner?.getAttribute('role')).toBe('alert');
    });

    it('should have region role for warning variant', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner variant="warning">Warning</aegov-banner>,
      });

      const banner = page.root?.querySelector('[role]');
      expect(banner?.getAttribute('role')).toBe('region');
    });

    it('should have region role for info variant', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner variant="info">Info</aegov-banner>,
      });

      const banner = page.root?.querySelector('[role]');
      expect(banner?.getAttribute('role')).toBe('region');
    });

    it('should allow custom aria role', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner ariaRole="status">Content</aegov-banner>,
      });

      const banner = page.root?.querySelector('[role]');
      expect(banner?.getAttribute('role')).toBe('status');
    });

    it('should have assertive aria-live for alert role', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner variant="error">Error</aegov-banner>,
      });

      const banner = page.root?.querySelector('[aria-live]');
      expect(banner?.getAttribute('aria-live')).toBe('assertive');
    });

    it('should have polite aria-live for region role', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner variant="info">Info</aegov-banner>,
      });

      const banner = page.root?.querySelector('[aria-live]');
      expect(banner?.getAttribute('aria-live')).toBe('polite');
    });

    it('should have polite aria-live for status role', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner ariaRole="status">Status</aegov-banner>,
      });

      const banner = page.root?.querySelector('[aria-live]');
      expect(banner?.getAttribute('aria-live')).toBe('polite');
    });

    it('should have aria-labelledby when bannerTitle is provided', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner bannerTitle="Important Notice">Content</aegov-banner>,
      });

      const banner = page.root?.querySelector('[aria-labelledby]');
      expect(banner?.getAttribute('aria-labelledby')).toBe('aegov-banner-title');
    });

    it('should not have aria-labelledby when bannerTitle is not provided', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner>Content</aegov-banner>,
      });

      const banner = page.root?.querySelector('.aegov-banner');
      expect(banner?.getAttribute('aria-labelledby')).toBeFalsy();
    });

    it('should have tabindex when autoFocus is true', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner autoFocus={true} variant="error">Critical error</aegov-banner>,
      });

      const banner = page.root?.querySelector('[tabindex]');
      expect(banner?.getAttribute('tabindex')).toBe('-1');
    });

    it('should not have tabindex when autoFocus is false', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner autoFocus={false}>Content</aegov-banner>,
      });

      const banner = page.root?.querySelector('.aegov-banner');
      expect(banner?.hasAttribute('tabindex')).toBe(false);
    });
  });

  // ============================================
  // EVENT TESTS
  // ============================================

  describe('events', () => {
    it('should emit aegovBannerHeightChange event in overlay mode', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner mode="overlay">Content</aegov-banner>,
      });

      let heightChangeEventFired = false;

      page.root?.addEventListener('aegovBannerHeightChange', () => {
        heightChangeEventFired = true;
      });

      // Call emitHeight directly
      (page.rootInstance as any).emitHeight();

      expect(heightChangeEventFired).toBe(true);
      // Event was fired - height value depends on test environment
    });

    it('should emit height 0 when dismissed in overlay mode', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner mode="overlay">Content</aegov-banner>,
      });

      let lastEmittedHeight = -1;

      page.root?.addEventListener('aegovBannerHeightChange', (event: any) => {
        lastEmittedHeight = event.detail;
      });

      const dismissButton = page.root?.querySelector('.banner__dismiss') as HTMLButtonElement;
      dismissButton.click();

      // Wait for animation
      await new Promise(resolve => setTimeout(resolve, 350));
      await page.waitForChanges();

      expect(lastEmittedHeight).toBe(0);
    });
  });

  // ============================================
  // SLOT DETECTION TESTS
  // ============================================

  describe('slot detection', () => {
    it('should detect actions slot when present', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `
          <aegov-banner>
            Content
            <button slot="actions">Action</button>
          </aegov-banner>
        `,
      });

      await page.waitForChanges();

      expect((page.rootInstance as any).hasActionsSlot).toBe(true);
    });

    it('should not show actions container when no actions slot', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner>Content only</aegov-banner>,
      });

      await page.waitForChanges();

      const actionsContainer = page.root?.querySelector('.banner__actions');
      expect(actionsContainer).toBeFalsy();
    });

    it('should apply banner__text-center class when no actions slot', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner>Content only</aegov-banner>,
      });

      await page.waitForChanges();

      const textElement = page.root?.querySelector('.banner__text');
      expect(textElement?.classList.contains('banner__text-center')).toBe(true);
      expect(textElement?.classList.contains('banner__text-left')).toBe(false);
    });

    it('should apply banner__text-left class when actions slot is present', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `
          <aegov-banner>
            Content
            <button slot="actions">Action</button>
          </aegov-banner>
        `,
      });

      await page.waitForChanges();

      const textElement = page.root?.querySelector('.banner__text');
      expect(textElement?.classList.contains('banner__text-left')).toBe(true);
      expect(textElement?.classList.contains('banner__text-center')).toBe(false);
    });
  });

  // ============================================
  // CLASS GENERATION TESTS
  // ============================================

  describe('getBannerClasses', () => {
    it('should generate correct classes for default configuration', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner>Content</aegov-banner>,
      });

      const banner = page.root?.querySelector('.aegov-banner');
      expect(banner?.classList.contains('banner--fixed')).toBe(true);
      expect(banner?.classList.contains('banner--top')).toBe(true);
      expect(banner?.classList.contains('banner--push')).toBe(true);
      expect(banner?.classList.contains('banner--soft')).toBe(true);
      expect(banner?.classList.contains('banner--default')).toBe(true);
    });

    it('should generate correct classes for custom configuration', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => (
          <aegov-banner
            variant="error"
            appearance="solid"
            position="bottom"
            display="sticky"
            mode="overlay"
          >
            Content
          </aegov-banner>
        ),
      });

      const banner = page.root?.querySelector('.aegov-banner');
      expect(banner?.classList.contains('banner--sticky')).toBe(true);
      expect(banner?.classList.contains('banner--bottom')).toBe(true);
      expect(banner?.classList.contains('banner--overlay')).toBe(true);
      expect(banner?.classList.contains('banner--solid')).toBe(true);
      expect(banner?.classList.contains('banner--error')).toBe(true);
    });

    it('should add dismissing class when dismissing', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner>Content</aegov-banner>,
      });

      const dismissButton = page.root?.querySelector('.banner__dismiss') as HTMLButtonElement;
      dismissButton.click();
      await page.waitForChanges();

      const banner = page.root?.querySelector('.aegov-banner');
      expect(banner?.classList.contains('banner--dismissing')).toBe(true);
    });
  });

  // ============================================
  // COMBINATION TESTS
  // ============================================

  describe('combinations', () => {
    it('should render error banner with solid appearance at bottom', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => (
          <aegov-banner variant="error" appearance="solid" position="bottom">
            Error at bottom
          </aegov-banner>
        ),
      });

      const banner = page.root?.querySelector('.aegov-banner');
      expect(banner?.classList.contains('banner--error')).toBe(true);
      expect(banner?.classList.contains('banner--solid')).toBe(true);
      expect(banner?.classList.contains('banner--bottom')).toBe(true);
    });

    it('should render success banner with sticky display', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => (
          <aegov-banner variant="success" display="sticky">
            Sticky success
          </aegov-banner>
        ),
      });

      const banner = page.root?.querySelector('.aegov-banner');
      expect(banner?.classList.contains('banner--success')).toBe(true);
      expect(banner?.classList.contains('banner--sticky')).toBe(true);
    });

    it('should render info banner in overlay mode', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => (
          <aegov-banner variant="info" mode="overlay">
            Overlay info
          </aegov-banner>
        ),
      });

      const banner = page.root?.querySelector('.aegov-banner');
      expect(banner?.classList.contains('banner--info')).toBe(true);
      expect(banner?.classList.contains('banner--overlay')).toBe(true);
    });

    it('should render non-dismissible warning banner', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => (
          <aegov-banner variant="warning" dismissible={false}>
            Permanent warning
          </aegov-banner>
        ),
      });

      const banner = page.root?.querySelector('.banner--warning');
      expect(banner).toBeTruthy();

      const dismissButton = page.root?.querySelector('.banner__dismiss');
      expect(dismissButton).toBeFalsy();
    });
  });

  // ============================================
  // VISIBILITY TESTS
  // ============================================

  describe('visibility', () => {
    it('should be visible initially', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner>Content</aegov-banner>,
      });

      expect((page.rootInstance as any).isVisible).toBe(true);
    });

    it('should hide after dismissing', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner>Content</aegov-banner>,
      });

      const dismissButton = page.root?.querySelector('.banner__dismiss') as HTMLButtonElement;
      dismissButton.click();

      // Wait for animation
      await new Promise(resolve => setTimeout(resolve, 350));
      await page.waitForChanges();

      expect((page.rootInstance as any).isVisible).toBe(false);
    });
  });
});
