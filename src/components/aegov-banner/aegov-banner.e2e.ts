import { newE2EPage } from '@stencil/core/testing';

describe('aegov-banner E2E', () => {
  describe('rendering', () => {
    it('should render', async () => {
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

      const content = await page.find('aegov-banner .banner-text');
      expect(content.textContent).toContain('This is a test message');
    });

    it('should have role="region" by default', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner>Message</aegov-banner>');

      const banner = await page.find('aegov-banner .aegov-banner');
      const role = await banner.getAttribute('role');
      expect(role).toBe('region');
    });

    it('should have aria-live="polite" by default', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner>Message</aegov-banner>');

      const banner = await page.find('aegov-banner .aegov-banner');
      const ariaLive = await banner.getAttribute('aria-live');
      expect(ariaLive).toBe('polite');
    });

    it('should render icon wrapper', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner>Message</aegov-banner>');

      const icon = await page.find('aegov-banner .banner-icon-wrapper');
      expect(icon).toBeTruthy();
    });

    it('should render default icon', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner>Message</aegov-banner>');

      const svg = await page.find('aegov-banner .banner-icon');
      expect(svg).toBeTruthy();
    });

    it('should render dismiss button by default', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner>Message</aegov-banner>');

      const dismissButton = await page.find('aegov-banner .banner-dismiss');
      expect(dismissButton).toBeTruthy();
    });
  });

  describe('variants', () => {
    it('should render default variant', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner variant="default">Default message</aegov-banner>');

      const banner = await page.find('aegov-banner .banner-default');
      expect(banner).toBeTruthy();
    });

    it('should render error variant', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner variant="error">Error message</aegov-banner>');

      const banner = await page.find('aegov-banner .banner-error');
      expect(banner).toBeTruthy();
    });

    it('should render warning variant', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner variant="warning">Warning message</aegov-banner>');

      const banner = await page.find('aegov-banner .banner-warning');
      expect(banner).toBeTruthy();
    });

    it('should render success variant', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner variant="success">Success message</aegov-banner>');

      const banner = await page.find('aegov-banner .banner-success');
      expect(banner).toBeTruthy();
    });

    it('should render info variant', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner variant="info">Info message</aegov-banner>');

      const banner = await page.find('aegov-banner .banner-info');
      expect(banner).toBeTruthy();
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

    it('should have aria-live="assertive" for alert role', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner variant="error">Error</aegov-banner>');

      const banner = await page.find('aegov-banner .aegov-banner');
      const ariaLive = await banner.getAttribute('aria-live');
      expect(ariaLive).toBe('assertive');
    });
  });

  describe('appearances', () => {
    it('should render soft appearance by default', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner>Message</aegov-banner>');

      const banner = await page.find('aegov-banner .banner-soft');
      expect(banner).toBeTruthy();
    });

    it('should render solid appearance', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner appearance="solid">Message</aegov-banner>');

      const banner = await page.find('aegov-banner .banner-solid');
      expect(banner).toBeTruthy();
    });
  });

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

  describe('display mode', () => {
    it('should render static display by default', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner>Message</aegov-banner>');

      const banner = await page.find('aegov-banner .banner--static');
      expect(banner).toBeTruthy();
    });

    it('should render fixed display', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner display="fixed">Message</aegov-banner>');

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

  describe('dismissible functionality', () => {
    it('should not render dismiss button when dismissible=false', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner dismissible="false">Message</aegov-banner>');

      const dismissButton = await page.find('aegov-banner .banner-dismiss');
      expect(dismissButton).toBeFalsy();
    });

    it('should emit aegovBannerDismiss event when dismiss button clicked', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner>Message</aegov-banner>');

      const element = await page.find('aegov-banner');
      const dismissEvent = await element.spyOnEvent('aegovBannerDismiss');

      const dismissButton = await page.find('aegov-banner .banner-dismiss');
      await dismissButton.click();

      // Wait for animation (300ms)
      await new Promise(resolve => setTimeout(resolve, 350));
      await page.waitForChanges();

      expect(dismissEvent).toHaveReceivedEvent();
    });

    it('should hide banner after dismiss button clicked', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner>Message</aegov-banner>');

      const dismissButton = await page.find('aegov-banner .banner-dismiss');
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

      const dismissButton = await page.find('aegov-banner .banner-dismiss');
      await dismissButton.click();

      await page.waitForChanges();

      const banner = await page.find('aegov-banner .banner--dismissing');
      expect(banner).toBeTruthy();
    });
  });

  describe('bannerTitle prop', () => {
    it('should not render title by default', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner>Message</aegov-banner>');

      const title = await page.find('aegov-banner .banner-title');
      expect(title).toBeFalsy();
    });

    it('should render title when provided', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner banner-title="Important Notice">Message</aegov-banner>');

      const title = await page.find('aegov-banner .banner-title');
      expect(title).toBeTruthy();
      expect(title.textContent).toBe('Important Notice');
    });

    it('should have aria-labelledby when title is provided', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner banner-title="Notice">Message</aegov-banner>');

      const banner = await page.find('aegov-banner .aegov-banner');
      const labelledBy = await banner.getAttribute('aria-labelledby');
      expect(labelledBy).toBe('aegov-banner-title');
    });

    it('should have matching id on title element', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner banner-title="Notice">Message</aegov-banner>');

      const title = await page.find('aegov-banner .banner-title');
      const id = await title.getAttribute('id');
      expect(id).toBe('aegov-banner-title');
    });
  });

  describe('slots', () => {
    it('should render actions slot', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-banner>
          Message
          <div slot="actions">
            <button>Action</button>
          </div>
        </aegov-banner>
      `);

      const actions = await page.find('aegov-banner .banner-actions');
      expect(actions).toBeTruthy();
    });

    it('should render custom icon slot', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-banner>
          Message
          <svg slot="icon" class="custom-icon"></svg>
        </aegov-banner>
      `);

      const customIcon = await page.find('aegov-banner .custom-icon');
      expect(customIcon).toBeTruthy();
    });

    it('should not render default icon when custom icon provided', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-banner>
          Message
          <svg slot="icon" class="custom-icon"></svg>
        </aegov-banner>
      `);

      const defaultIcon = await page.find('aegov-banner .banner-icon');
      expect(defaultIcon).toBeFalsy();
    });
  });

  describe('ariaRole prop', () => {
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
  });

  describe('events', () => {
    it('should have mode overlay when configured', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner mode="overlay">Message</aegov-banner>');

      const banner = await page.find('aegov-banner .banner--overlay');
      expect(banner).toBeTruthy();
    });

    it('should have mode push when configured', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner mode="push">Message</aegov-banner>');

      const banner = await page.find('aegov-banner .banner--push');
      expect(banner).toBeTruthy();
    });

    it('should emit height 0 when dismissed in overlay mode', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner mode="overlay">Message</aegov-banner>');

      const element = await page.find('aegov-banner');
      const heightEvent = await element.spyOnEvent('aegovBannerHeightChange');

      const dismissButton = await page.find('aegov-banner .banner-dismiss');
      await dismissButton.click();

      // Wait for dismiss animation (300ms)
      await new Promise(resolve => setTimeout(resolve, 350));
      await page.waitForChanges();

      const events = heightEvent.events;
      const lastEvent = events[events.length - 1];
      expect(lastEvent.detail).toBe(0);
    });
  });

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

      expect(classes).toContain('banner-error');
      expect(classes).toContain('banner-solid');
    });
  });

  describe('accessibility', () => {
    it('should have proper dismiss button label', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner>Message</aegov-banner>');

      const dismissButton = await page.find('aegov-banner .banner-dismiss');
      const ariaLabel = await dismissButton.getAttribute('aria-label');
      expect(ariaLabel).toBe('Close banner');
    });

    it('should have aria-hidden="true" on dismiss icon', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner>Message</aegov-banner>');

      const icon = await page.find('aegov-banner .banner-dismiss-icon');
      const ariaHidden = await icon.getAttribute('aria-hidden');
      expect(ariaHidden).toBe('true');
    });
  });
});
