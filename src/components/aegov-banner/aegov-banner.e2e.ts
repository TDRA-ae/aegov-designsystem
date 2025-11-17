import { newE2EPage } from '@stencil/core/testing';

describe('aegov-banner E2E', () => {
  // ============================================
  // RENDERING TESTS
  // ============================================

  describe('rendering', () => {
    it('should render the component', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner>Test message</aegov-banner>');

      const element = await page.find('aegov-banner');
      expect(element).toBeTruthy();

      const banner = await page.find('aegov-banner .aegov-banner');
      expect(banner).toBeTruthy();
    });

    it('should display slotted content', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner>This is a test message</aegov-banner>');

      const element = await page.find('aegov-banner');
      expect(element.textContent).toContain('This is a test message');
    });

    it('should render banner container', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner>Message</aegov-banner>');

      const container = await page.find('aegov-banner .banner__container');
      expect(container).toBeTruthy();
    });

    it('should render banner content area', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner>Message</aegov-banner>');

      const content = await page.find('aegov-banner .banner__content');
      expect(content).toBeTruthy();
    });

    it('should render banner text area', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner>Message</aegov-banner>');

      const text = await page.find('aegov-banner .banner__text');
      expect(text).toBeTruthy();
    });

    it('should render dismiss button by default', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner>Message</aegov-banner>');

      const dismissButton = await page.find('aegov-banner .banner__dismiss');
      expect(dismissButton).toBeTruthy();
    });
  });

  // ============================================
  // VARIANT TESTS
  // ============================================

  describe('variants', () => {
    it('should render default variant', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner variant="default">Default message</aegov-banner>');

      const banner = await page.find('aegov-banner .banner--default');
      expect(banner).toBeTruthy();
    });

    it('should render error variant', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner variant="error">Error message</aegov-banner>');

      const banner = await page.find('aegov-banner .banner--error');
      expect(banner).toBeTruthy();
    });

    it('should render warning variant', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner variant="warning">Warning message</aegov-banner>');

      const banner = await page.find('aegov-banner .banner--warning');
      expect(banner).toBeTruthy();
    });

    it('should render success variant', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner variant="success">Success message</aegov-banner>');

      const banner = await page.find('aegov-banner .banner--success');
      expect(banner).toBeTruthy();
    });

    it('should render info variant', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner variant="info">Info message</aegov-banner>');

      const banner = await page.find('aegov-banner .banner--info');
      expect(banner).toBeTruthy();
    });
  });

  // ============================================
  // APPEARANCE TESTS
  // ============================================

  describe('appearances', () => {
    it('should render soft appearance by default', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner>Message</aegov-banner>');

      const banner = await page.find('aegov-banner .banner--soft');
      expect(banner).toBeTruthy();
    });

    it('should render solid appearance', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner appearance="solid">Message</aegov-banner>');

      const banner = await page.find('aegov-banner .banner--solid');
      expect(banner).toBeTruthy();
    });
  });

  // ============================================
  // POSITION TESTS
  // ============================================

  describe('position', () => {
    it('should render top position by default', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner>Message</aegov-banner>');

      const banner = await page.find('aegov-banner .banner--top');
      expect(banner).toBeTruthy();
    });

    it('should render bottom position', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner position="bottom">Message</aegov-banner>');

      const banner = await page.find('aegov-banner .banner--bottom');
      expect(banner).toBeTruthy();
    });
  });

  // ============================================
  // DISPLAY MODE TESTS
  // ============================================

  describe('display mode', () => {
    it('should render fixed display by default', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner>Message</aegov-banner>');

      const banner = await page.find('aegov-banner .banner--fixed');
      expect(banner).toBeTruthy();
    });

    it('should render sticky display', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner display="sticky">Message</aegov-banner>');

      const banner = await page.find('aegov-banner .banner--sticky');
      expect(banner).toBeTruthy();
    });
  });

  // ============================================
  // LAYOUT MODE TESTS
  // ============================================

  describe('layout mode', () => {
    it('should render push mode by default', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner>Message</aegov-banner>');

      const banner = await page.find('aegov-banner .banner--push');
      expect(banner).toBeTruthy();
    });

    it('should render overlay mode', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner mode="overlay">Message</aegov-banner>');

      const banner = await page.find('aegov-banner .banner--overlay');
      expect(banner).toBeTruthy();
    });
  });

  // ============================================
  // DISMISSIBLE FUNCTIONALITY TESTS
  // ============================================

  describe('dismissible functionality', () => {
    it('should render dismiss button by default', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner>Message</aegov-banner>');

      const dismissButton = await page.find('aegov-banner .banner__dismiss');
      expect(dismissButton).toBeTruthy();
    });

    it('should not render dismiss button when dismissible=false', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner dismissible="false">Message</aegov-banner>');

      const dismissButton = await page.find('aegov-banner .banner__dismiss');
      expect(dismissButton).toBeFalsy();
    });

    it('should emit aegovBannerDismiss event when dismiss button clicked', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner>Message</aegov-banner>');

      const element = await page.find('aegov-banner');
      const dismissEvent = await element.spyOnEvent('aegovBannerDismiss');

      const dismissButton = await page.find('aegov-banner .banner__dismiss');
      await dismissButton.click();

      // Wait for animation (300ms)
      await new Promise(resolve => setTimeout(resolve, 350));
      await page.waitForChanges();

      expect(dismissEvent).toHaveReceivedEvent();
    });

    it('should hide banner after dismiss button clicked', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner>Message</aegov-banner>');

      const dismissButton = await page.find('aegov-banner .banner__dismiss');
      await dismissButton.click();

      // Wait for animation (300ms)
      await new Promise(resolve => setTimeout(resolve, 350));
      await page.waitForChanges();

      const banner = await page.find('aegov-banner .aegov-banner');
      expect(banner).toBeFalsy();
    });

    it('should apply dismissing class when dismiss button clicked', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner>Message</aegov-banner>');

      const dismissButton = await page.find('aegov-banner .banner__dismiss');
      await dismissButton.click();

      await page.waitForChanges();

      const banner = await page.find('aegov-banner .banner--dismissing');
      expect(banner).toBeTruthy();
    });
  });

  // ============================================
  // ACCESSIBILITY TESTS
  // ============================================

  describe('accessibility', () => {
    it('should have role="region" by default', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner>Message</aegov-banner>');

      const banner = await page.find('aegov-banner .aegov-banner');
      const role = await banner.getAttribute('role');
      expect(role).toBe('region');
    });

    it('should have role="alert" for error variant', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner variant="error">Error</aegov-banner>');

      const banner = await page.find('aegov-banner .aegov-banner');
      const role = await banner.getAttribute('role');
      expect(role).toBe('alert');
    });

    it('should have role="alert" for success variant', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner variant="success">Success</aegov-banner>');

      const banner = await page.find('aegov-banner .aegov-banner');
      const role = await banner.getAttribute('role');
      expect(role).toBe('alert');
    });

    it('should have aria-live="polite" by default', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner>Message</aegov-banner>');

      const banner = await page.find('aegov-banner .aegov-banner');
      const ariaLive = await banner.getAttribute('aria-live');
      expect(ariaLive).toBe('polite');
    });

    it('should have aria-live="assertive" for alert role', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner variant="error">Error</aegov-banner>');

      const banner = await page.find('aegov-banner .aegov-banner');
      const ariaLive = await banner.getAttribute('aria-live');
      expect(ariaLive).toBe('assertive');
    });

    it('should have aria-labelledby when bannerTitle is provided', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner banner-title="Notice">Message</aegov-banner>');

      const banner = await page.find('aegov-banner .aegov-banner');
      const labelledBy = await banner.getAttribute('aria-labelledby');
      expect(labelledBy).toBe('aegov-banner-title');
    });

    it('should allow custom ARIA role override', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner aria-role="status">Message</aegov-banner>');

      const banner = await page.find('aegov-banner .aegov-banner');
      const role = await banner.getAttribute('role');
      expect(role).toBe('status');
    });

    it('should use custom role even for error variant', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner variant="error" aria-role="region">Message</aegov-banner>');

      const banner = await page.find('aegov-banner .aegov-banner');
      const role = await banner.getAttribute('role');
      expect(role).toBe('region');
    });

    it('should have proper dismiss button label', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner>Message</aegov-banner>');

      const dismissButton = await page.find('aegov-banner .banner__dismiss');
      const ariaLabel = await dismissButton.getAttribute('aria-label');
      expect(ariaLabel).toBe('Close banner');
    });

    it('should have aria-hidden="true" on dismiss icon', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner>Message</aegov-banner>');

      const icon = await page.find('aegov-banner .banner__dismiss svg');
      const ariaHidden = await icon.getAttribute('aria-hidden');
      expect(ariaHidden).toBe('true');
    });
  });

  // ============================================
  // SLOTS TESTS
  // ============================================

  describe('slots', () => {
    it('should render actions slot when provided', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-banner>
          Message
          <div slot="actions">
            <button>Action</button>
          </div>
        </aegov-banner>
      `);

      await page.waitForChanges();
      const actions = await page.find('aegov-banner .banner__actions');
      expect(actions).toBeTruthy();
    });

    it('should not render actions container when no actions slot', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner>Message</aegov-banner>');

      await page.waitForChanges();
      const actions = await page.find('aegov-banner .banner__actions');
      expect(actions).toBeFalsy();
    });

    it('should apply center text alignment when no actions slot', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner>Message</aegov-banner>');

      await page.waitForChanges();
      const textElement = await page.find('aegov-banner .banner__text');
      const classes = await textElement.getAttribute('class');

      expect(classes).toContain('banner__text-center');
      expect(classes).not.toContain('banner__text-left');
    });

    it('should apply left text alignment when actions slot is present', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-banner>
          Message
          <div slot="actions">
            <button>Action</button>
          </div>
        </aegov-banner>
      `);

      await page.waitForChanges();
      const textElement = await page.find('aegov-banner .banner__text');
      const classes = await textElement.getAttribute('class');

      expect(classes).toContain('banner__text-left');
      expect(classes).not.toContain('banner__text-center');
    });
  });

  // ============================================
  // EVENTS TESTS
  // ============================================

  describe('events', () => {
    it('should emit aegovBannerHeightChange in overlay mode', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner mode="overlay">Message</aegov-banner>');

      const element = await page.find('aegov-banner');
      const heightEvent = await element.spyOnEvent('aegovBannerHeightChange');

      await page.waitForChanges();

      // Height event should be emitted on load
      expect(heightEvent.events.length).toBeGreaterThan(0);
    });

    it('should emit height 0 when dismissed in overlay mode', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner mode="overlay">Message</aegov-banner>');

      const element = await page.find('aegov-banner');
      const heightEvent = await element.spyOnEvent('aegovBannerHeightChange');

      const dismissButton = await page.find('aegov-banner .banner__dismiss');
      await dismissButton.click();

      // Wait for dismiss animation (300ms)
      await new Promise(resolve => setTimeout(resolve, 350));
      await page.waitForChanges();

      const events = heightEvent.events;
      const lastEvent = events[events.length - 1];
      expect(lastEvent.detail).toBe(0);
    });
  });

  // ============================================
  // CSS CLASSES COMBINATION TESTS
  // ============================================

  describe('CSS classes combination', () => {
    it('should apply correct classes for fixed top overlay', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner display="fixed" position="top" mode="overlay">Message</aegov-banner>');

      const banner = await page.find('aegov-banner .aegov-banner');
      const classes = await banner.getAttribute('class');

      expect(classes).toContain('banner--fixed');
      expect(classes).toContain('banner--top');
      expect(classes).toContain('banner--overlay');
    });

    it('should apply correct classes for sticky bottom push', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner display="sticky" position="bottom" mode="push">Message</aegov-banner>');

      const banner = await page.find('aegov-banner .aegov-banner');
      const classes = await banner.getAttribute('class');

      expect(classes).toContain('banner--sticky');
      expect(classes).toContain('banner--bottom');
      expect(classes).toContain('banner--push');
    });

    it('should apply variant and appearance classes together', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner variant="error" appearance="solid">Message</aegov-banner>');

      const banner = await page.find('aegov-banner .aegov-banner');
      const classes = await banner.getAttribute('class');

      expect(classes).toContain('banner--error');
      expect(classes).toContain('banner--solid');
    });

    it('should apply all configuration classes together', async () => {
      const page = await newE2EPage();
      await page.setContent(
        '<aegov-banner variant="success" appearance="solid" display="sticky" position="bottom" mode="overlay">Message</aegov-banner>'
      );

      const banner = await page.find('aegov-banner .aegov-banner');
      const classes = await banner.getAttribute('class');

      expect(classes).toContain('banner--success');
      expect(classes).toContain('banner--solid');
      expect(classes).toContain('banner--sticky');
      expect(classes).toContain('banner--bottom');
      expect(classes).toContain('banner--overlay');
    });
  });

  // ============================================
  // USER INTERACTION TESTS
  // ============================================

  describe('user interactions', () => {
    it('should be clickable dismiss button', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner>Message</aegov-banner>');

      const dismissButton = await page.find('aegov-banner .banner__dismiss');
      await dismissButton.click();
      await page.waitForChanges();

      // Should have dismissing class immediately
      const banner = await page.find('aegov-banner .banner--dismissing');
      expect(banner).toBeTruthy();
    });

    it('should handle multiple action buttons in slot', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-banner>
          Message
          <div slot="actions">
            <button id="btn1">Action 1</button>
            <button id="btn2">Action 2</button>
          </div>
        </aegov-banner>
      `);

      await page.waitForChanges();

      const btn1 = await page.find('#btn1');
      const btn2 = await page.find('#btn2');

      expect(btn1).toBeTruthy();
      expect(btn2).toBeTruthy();
    });
  });
});
