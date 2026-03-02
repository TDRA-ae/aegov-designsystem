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

  describe('variants', () => {
    const variants = ['default', 'error', 'warning', 'success', 'info'];
    variants.forEach(variant => {
      it(`should render ${variant} variant`, async () => {
        const page = await newE2EPage();
        await page.setContent(`<aegov-banner variant="${variant}">${variant} message</aegov-banner>`);
        const banner = await page.find(`aegov-banner .banner--${variant}`);
        expect(banner).toBeTruthy();
      });
    });
  });

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

    it('should emit aegovBannerDismiss event when dismissed', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner>Message</aegov-banner>');
      const element = await page.find('aegov-banner');
      const dismissEvent = await element.spyOnEvent('aegovBannerDismiss');
      const dismissButton = await page.find('aegov-banner .banner__dismiss');
      await dismissButton.click();
      await new Promise(resolve => setTimeout(resolve, 350));
      await page.waitForChanges();
      expect(dismissEvent).toHaveReceivedEvent();
    });

    it('should hide banner after dismiss', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner>Message</aegov-banner>');
      const dismissButton = await page.find('aegov-banner .banner__dismiss');
      await dismissButton.click();
      await new Promise(resolve => setTimeout(resolve, 350));
      await page.waitForChanges();
      const banner = await page.find('aegov-banner .aegov-banner');
      expect(banner).toBeFalsy();
    });

    it('should apply dismissing class when dismiss clicked', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner>Message</aegov-banner>');
      const dismissButton = await page.find('aegov-banner .banner__dismiss');
      await dismissButton.click();
      await page.waitForChanges();
      const banner = await page.find('aegov-banner .banner--dismissing');
      expect(banner).toBeTruthy();
    });
  });

  describe('accessibility', () => {
    it('should have role="region" by default', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner>Message</aegov-banner>');
      const banner = await page.find('aegov-banner .aegov-banner');
      expect(await banner.getAttribute('role')).toBe('region');
    });

    it('should have role="alert" for error variant', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner variant="error">Error</aegov-banner>');
      const banner = await page.find('aegov-banner .aegov-banner');
      expect(await banner.getAttribute('role')).toBe('alert');
    });

    it('should have role="alert" for success variant', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner variant="success">Success</aegov-banner>');
      const banner = await page.find('aegov-banner .aegov-banner');
      expect(await banner.getAttribute('role')).toBe('alert');
    });

    it('should have aria-live="polite" by default', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner>Message</aegov-banner>');
      const banner = await page.find('aegov-banner .aegov-banner');
      expect(await banner.getAttribute('aria-live')).toBe('polite');
    });

    it('should have aria-live="assertive" for alert role', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner variant="error">Error</aegov-banner>');
      const banner = await page.find('aegov-banner .aegov-banner');
      expect(await banner.getAttribute('aria-live')).toBe('assertive');
    });

    it('should have aria-labelledby when bannerTitle is provided', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner banner-title="Notice">Message</aegov-banner>');
      const banner = await page.find('aegov-banner .aegov-banner');
      expect(await banner.getAttribute('aria-labelledby')).toBe('aegov-banner-title');
    });

    it('should allow custom ARIA role override', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner aria-role="status">Message</aegov-banner>');
      const banner = await page.find('aegov-banner .aegov-banner');
      expect(await banner.getAttribute('role')).toBe('status');
    });

    it('should have proper dismiss button label', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner>Message</aegov-banner>');
      const dismissButton = await page.find('aegov-banner .banner__dismiss');
      expect(await dismissButton.getAttribute('aria-label')).toBe('Close banner');
    });
  });

  describe('slots', () => {
    it('should render actions slot when provided', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-banner>
          Message
          <div slot="actions"><button>Action</button></div>
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
    });

    it('should apply left text alignment when actions slot present', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-banner>
          Message
          <div slot="actions"><button>Action</button></div>
        </aegov-banner>
      `);
      await page.waitForChanges();
      const textElement = await page.find('aegov-banner .banner__text');
      const classes = await textElement.getAttribute('class');
      expect(classes).toContain('banner__text-left');
    });
  });

  describe('events', () => {
    it('should render in overlay mode', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner mode="overlay">Message</aegov-banner>');
      const banner = await page.find('aegov-banner .banner--overlay');
      expect(banner).toBeTruthy();
    });

    it('should emit height 0 when dismissed in overlay mode', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-banner mode="overlay">Message</aegov-banner>');
      const element = await page.find('aegov-banner');
      const heightEvent = await element.spyOnEvent('aegovBannerHeightChange');
      const dismissButton = await page.find('aegov-banner .banner__dismiss');
      await dismissButton.click();
      await new Promise(resolve => setTimeout(resolve, 350));
      await page.waitForChanges();
      const events = heightEvent.events;
      const lastEvent = events[events.length - 1];
      expect(lastEvent.detail).toBe(0);
    });
  });

  describe('CSS classes combination', () => {
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
});
