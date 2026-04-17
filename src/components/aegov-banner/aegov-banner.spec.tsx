import { newSpecPage } from '@stencil/core/testing';
import { AegovBanner } from './aegov-banner';
import { h } from '@stencil/core';

describe('aegov-banner', () => {
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

    it('should not render when isVisible is false', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner>Content</aegov-banner>,
      });
      (page.rootInstance as any).isVisible = false;
      await page.waitForChanges();
      expect(page.root?.querySelector('.aegov-banner')).toBeFalsy();
    });
  });

  describe('variants', () => {
    const variants = ['default', 'error', 'warning', 'success', 'info'];
    variants.forEach(variant => {
      it(`should render ${variant} variant`, async () => {
        const page = await newSpecPage({
          components: [AegovBanner],
          template: () => <aegov-banner variant={variant as any}>{variant} message</aegov-banner>,
        });
        const banner = page.root?.querySelector(`.banner--${variant}`);
        expect(banner).toBeTruthy();
      });
    });
  });

  describe('appearances', () => {
    it('should render soft appearance by default', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner>Content</aegov-banner>,
      });
      expect(page.root?.querySelector('.banner--soft')).toBeTruthy();
    });

    it('should render solid appearance', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner appearance="solid">Content</aegov-banner>,
      });
      expect(page.root?.querySelector('.banner--solid')).toBeTruthy();
    });
  });

  describe('position', () => {
    it('should render at top by default', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner>Content</aegov-banner>,
      });
      expect(page.root?.querySelector('.banner--top')).toBeTruthy();
    });

    it('should render at bottom', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner position="bottom">Content</aegov-banner>,
      });
      expect(page.root?.querySelector('.banner--bottom')).toBeTruthy();
    });
  });

  describe('display', () => {
    it('should render with fixed display by default', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner>Content</aegov-banner>,
      });
      expect(page.root?.querySelector('.banner--fixed')).toBeTruthy();
    });

    it('should render with sticky display', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner display="sticky">Content</aegov-banner>,
      });
      expect(page.root?.querySelector('.banner--sticky')).toBeTruthy();
    });
  });

  describe('mode', () => {
    it('should render with push mode by default', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner>Content</aegov-banner>,
      });
      expect(page.root?.querySelector('.banner--push')).toBeTruthy();
    });

    it('should render with overlay mode', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner mode="overlay">Content</aegov-banner>,
      });
      expect(page.root?.querySelector('.banner--overlay')).toBeTruthy();
    });
  });

  describe('dismissible', () => {
    it('should render dismiss button by default (dismissible=true)', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner>Content</aegov-banner>,
      });
      expect(page.root?.querySelector('.banner__dismiss')).toBeTruthy();
    });

    it('should not render dismiss button when dismissible=false', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner dismissible={false}>Content</aegov-banner>,
      });
      expect(page.root?.querySelector('.banner__dismiss')).toBeFalsy();
    });

    it('should have aria-label on dismiss button', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner>Content</aegov-banner>,
      });
      const dismissButton = page.root?.querySelector('.banner__dismiss');
      expect(dismissButton?.getAttribute('aria-label')).toBe('Close banner');
    });

    it('should set isDismissing on dismiss click', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner>Content</aegov-banner>,
      });
      const dismissButton = page.root?.querySelector('.banner__dismiss') as HTMLButtonElement;
      dismissButton.click();
      await page.waitForChanges();
      expect(page.root?.querySelector('.banner--dismissing')).toBeTruthy();
    });

    it('should emit aegovBannerDismiss event', async () => {
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
      await new Promise(resolve => setTimeout(resolve, 350));
      await page.waitForChanges();
      expect((page.rootInstance as any).isVisible).toBe(false);
    });
  });

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
        template: () => <aegov-banner variant="error">Error</aegov-banner>,
      });
      const banner = page.root?.querySelector('[role]');
      expect(banner?.getAttribute('role')).toBe('alert');
    });

    it('should have alert role for success variant', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner variant="success">Success</aegov-banner>,
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

    it('should have aria-labelledby when bannerTitle is provided', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner bannerTitle="Important Notice">Content</aegov-banner>,
      });
      const banner = page.root?.querySelector('[aria-labelledby]');
      expect(banner?.getAttribute('aria-labelledby')).toBe('aegov-banner-title');
    });

    it('should not have aria-labelledby when no bannerTitle', async () => {
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
        template: () => <aegov-banner autoFocus={true} variant="error">Critical</aegov-banner>,
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

  describe('events', () => {
    it('should emit aegovBannerHeightChange in overlay mode', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner mode="overlay">Content</aegov-banner>,
      });
      let heightChangeEventFired = false;
      page.root?.addEventListener('aegovBannerHeightChange', () => {
        heightChangeEventFired = true;
      });
      (page.rootInstance as any).emitHeight();
      expect(heightChangeEventFired).toBe(true);
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
      await new Promise(resolve => setTimeout(resolve, 350));
      await page.waitForChanges();
      expect(lastEmittedHeight).toBe(0);
    });
  });

  describe('slot detection', () => {
    it('should detect actions slot when present', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `<aegov-banner>Content<button slot="actions">Action</button></aegov-banner>`,
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
      expect(page.root?.querySelector('.banner__actions')).toBeFalsy();
    });

    it('should apply banner__text-center when no actions slot', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => <aegov-banner>Content only</aegov-banner>,
      });
      await page.waitForChanges();
      const textElement = page.root?.querySelector('.banner__text');
      expect(textElement?.classList.contains('banner__text-center')).toBe(true);
    });

    it('should apply banner__text-left when actions slot is present', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `<aegov-banner>Content<button slot="actions">Action</button></aegov-banner>`,
      });
      await page.waitForChanges();
      const textElement = page.root?.querySelector('.banner__text');
      expect(textElement?.classList.contains('banner__text-left')).toBe(true);
    });
  });

  describe('CSS classes', () => {
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
          <aegov-banner variant="error" appearance="solid" position="bottom" display="sticky" mode="overlay">
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
      expect(page.root?.querySelector('.banner--dismissing')).toBeTruthy();
    });
  });

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

    it('should render non-dismissible warning banner', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        template: () => (
          <aegov-banner variant="warning" dismissible={false}>
            Permanent warning
          </aegov-banner>
        ),
      });
      expect(page.root?.querySelector('.banner--warning')).toBeTruthy();
      expect(page.root?.querySelector('.banner__dismiss')).toBeFalsy();
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

    it('renders safely when variant is invalid', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `<aegov-banner variant="weird">Message</aegov-banner>`,
      });
      const banner = page.root?.querySelector('.aegov-banner');
      expect(banner).toBeTruthy();
      expect(banner?.classList.contains('banner--default')).toBe(true);
    });

    it('renders safely when appearance is invalid', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `<aegov-banner appearance="mystery">Message</aegov-banner>`,
      });
      const banner = page.root?.querySelector('.aegov-banner');
      expect(banner?.classList.contains('banner--soft')).toBe(true);
    });

    it('renders safely when position is invalid', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `<aegov-banner position="middle">Message</aegov-banner>`,
      });
      const banner = page.root?.querySelector('.aegov-banner');
      expect(banner?.classList.contains('banner--top')).toBe(true);
    });

    it('renders safely when display is invalid', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `<aegov-banner display="floaty">Message</aegov-banner>`,
      });
      const banner = page.root?.querySelector('.aegov-banner');
      expect(banner?.classList.contains('banner--fixed')).toBe(true);
    });

    it('renders safely when mode is invalid', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `<aegov-banner mode="huh">Message</aegov-banner>`,
      });
      const banner = page.root?.querySelector('.aegov-banner');
      expect(banner?.classList.contains('banner--push')).toBe(true);
    });

    it('renders safely when ariaRole is invalid', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `<aegov-banner aria-role="nonsense">Message</aegov-banner>`,
      });
      expect(page.root?.querySelector('.aegov-banner')).toBeTruthy();
    });

    it('warns with component name, prop name, invalid value, and fallback', async () => {
      await newSpecPage({
        components: [AegovBanner],
        html: `<aegov-banner variant="weird">Message</aegov-banner>`,
      });
      const messages = warnSpy.mock.calls.map(c => c[0] as string);
      const variantWarn = messages.find(m => m.includes('"variant"'));
      expect(variantWarn).toBeDefined();
      expect(variantWarn).toContain('[aegov-banner]');
      expect(variantWarn).toContain('"weird"');
      expect(variantWarn).toContain('default');
    });

    it('does not warn when all props are valid', async () => {
      await newSpecPage({
        components: [AegovBanner],
        html: `<aegov-banner variant="error" appearance="solid" position="bottom" display="sticky" mode="overlay">Message</aegov-banner>`,
      });
      expect(warnSpy).not.toHaveBeenCalled();
    });

    it('does not warn when ariaRole is unset', async () => {
      await newSpecPage({
        components: [AegovBanner],
        html: `<aegov-banner>Message</aegov-banner>`,
      });
      expect(warnSpy).not.toHaveBeenCalled();
    });

    it('warns again via @Watch when variant is updated to an invalid value', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `<aegov-banner variant="info">Message</aegov-banner>`,
      });
      expect(warnSpy).not.toHaveBeenCalled();

      page.root.setAttribute('variant', 'nope');
      await page.waitForChanges();

      const messages = warnSpy.mock.calls.map(c => c[0] as string);
      const invalidWarn = messages.find(m => m.includes('[aegov-banner]') && m.includes('"nope"'));
      expect(invalidWarn).toBeDefined();
      expect(invalidWarn).toContain('"variant"');
    });

    it('warns again via @Watch when appearance is updated to an invalid value', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `<aegov-banner appearance="soft">Message</aegov-banner>`,
      });
      page.root.setAttribute('appearance', 'nope');
      await page.waitForChanges();
      const messages = warnSpy.mock.calls.map(c => c[0] as string);
      const invalidWarn = messages.find(m => m.includes('[aegov-banner]') && m.includes('"appearance"'));
      expect(invalidWarn).toBeDefined();
    });

    it('warns again via @Watch when position is updated to an invalid value', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `<aegov-banner position="top">Message</aegov-banner>`,
      });
      page.root.setAttribute('position', 'nope');
      await page.waitForChanges();
      const messages = warnSpy.mock.calls.map(c => c[0] as string);
      const invalidWarn = messages.find(m => m.includes('[aegov-banner]') && m.includes('"position"'));
      expect(invalidWarn).toBeDefined();
    });

    it('warns again via @Watch when display is updated to an invalid value', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `<aegov-banner display="fixed">Message</aegov-banner>`,
      });
      page.root.setAttribute('display', 'nope');
      await page.waitForChanges();
      const messages = warnSpy.mock.calls.map(c => c[0] as string);
      const invalidWarn = messages.find(m => m.includes('[aegov-banner]') && m.includes('"display"'));
      expect(invalidWarn).toBeDefined();
    });

    it('warns again via @Watch when mode is updated to an invalid value', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `<aegov-banner mode="push">Message</aegov-banner>`,
      });
      page.root.setAttribute('mode', 'nope');
      await page.waitForChanges();
      const messages = warnSpy.mock.calls.map(c => c[0] as string);
      const invalidWarn = messages.find(m => m.includes('[aegov-banner]') && m.includes('"mode"'));
      expect(invalidWarn).toBeDefined();
    });

    it('warns again via @Watch when ariaRole is updated to an invalid value', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `<aegov-banner>Message</aegov-banner>`,
      });
      page.root.setAttribute('aria-role', 'nope');
      await page.waitForChanges();
      const messages = warnSpy.mock.calls.map(c => c[0] as string);
      const invalidWarn = messages.find(m => m.includes('[aegov-banner]') && m.includes('"ariaRole"'));
      expect(invalidWarn).toBeDefined();
    });
  });
});
