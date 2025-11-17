import { newSpecPage } from '@stencil/core/testing';
import { AegovBanner } from './aegov-banner';

describe('aegov-banner', () => {
  describe('rendering', () => {
    it('should render with default props', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `<aegov-banner>This is a banner message</aegov-banner>`,
      });

      expect(page.root).toBeTruthy();
      const banner = page.root.querySelector('.aegov-banner');
      expect(banner).toBeTruthy();
    });

    it('should have role="region" by default', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `<aegov-banner>Message</aegov-banner>`,
      });

      const banner = page.root.querySelector('[role]');
      expect(banner.getAttribute('role')).toBe('region');
    });

    it('should have aria-live="polite" by default', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `<aegov-banner>Message</aegov-banner>`,
      });

      const banner = page.root.querySelector('[aria-live]');
      expect(banner.getAttribute('aria-live')).toBe('polite');
    });

    it('should render icon wrapper', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `<aegov-banner>Message</aegov-banner>`,
      });

      expect(page.root.querySelector('.banner-icon-wrapper')).toBeTruthy();
    });

    it('should render content area', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `<aegov-banner>Message</aegov-banner>`,
      });

      expect(page.root.querySelector('.banner-content')).toBeTruthy();
    });

    it('should render dismiss button by default', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `<aegov-banner>Message</aegov-banner>`,
      });

      expect(page.root.querySelector('.banner-dismiss')).toBeTruthy();
    });
  });

  describe('variants', () => {
    it('should render default variant', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `<aegov-banner variant="default">Message</aegov-banner>`,
      });

      const component = page.rootInstance as AegovBanner;
      expect(component.variant).toBe('default');
      expect(page.root.querySelector('.banner-default')).toBeTruthy();
    });

    it('should render error variant', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `<aegov-banner variant="error">Error message</aegov-banner>`,
      });

      const component = page.rootInstance as AegovBanner;
      expect(component.variant).toBe('error');
      expect(page.root.querySelector('.banner-error')).toBeTruthy();
    });

    it('should render warning variant', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `<aegov-banner variant="warning">Warning message</aegov-banner>`,
      });

      const component = page.rootInstance as AegovBanner;
      expect(component.variant).toBe('warning');
      expect(page.root.querySelector('.banner-warning')).toBeTruthy();
    });

    it('should render success variant', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `<aegov-banner variant="success">Success message</aegov-banner>`,
      });

      const component = page.rootInstance as AegovBanner;
      expect(component.variant).toBe('success');
      expect(page.root.querySelector('.banner-success')).toBeTruthy();
    });

    it('should render info variant', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `<aegov-banner variant="info">Info message</aegov-banner>`,
      });

      const component = page.rootInstance as AegovBanner;
      expect(component.variant).toBe('info');
      expect(page.root.querySelector('.banner-info')).toBeTruthy();
    });

    it('should have role="alert" for error variant', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `<aegov-banner variant="error">Error</aegov-banner>`,
      });

      const banner = page.root.querySelector('[role]');
      expect(banner.getAttribute('role')).toBe('alert');
    });

    it('should have role="alert" for success variant', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `<aegov-banner variant="success">Success</aegov-banner>`,
      });

      const banner = page.root.querySelector('[role]');
      expect(banner.getAttribute('role')).toBe('alert');
    });

    it('should have aria-live="assertive" for alert role', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `<aegov-banner variant="error">Error</aegov-banner>`,
      });

      const banner = page.root.querySelector('[aria-live]');
      expect(banner.getAttribute('aria-live')).toBe('assertive');
    });
  });

  describe('appearances', () => {
    it('should render soft appearance by default', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `<aegov-banner>Message</aegov-banner>`,
      });

      const component = page.rootInstance as AegovBanner;
      expect(component.appearance).toBe('soft');
      expect(page.root.querySelector('.banner-soft')).toBeTruthy();
    });

    it('should render solid appearance', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `<aegov-banner appearance="solid">Message</aegov-banner>`,
      });

      const component = page.rootInstance as AegovBanner;
      expect(component.appearance).toBe('solid');
      expect(page.root.querySelector('.banner-solid')).toBeTruthy();
    });
  });

  describe('position prop', () => {
    it('should default to top position', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `<aegov-banner>Message</aegov-banner>`,
      });

      const component = page.rootInstance as AegovBanner;
      expect(component.position).toBe('top');
      expect(page.root.querySelector('.banner--top')).toBeTruthy();
    });

    it('should render bottom position', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `<aegov-banner position="bottom">Message</aegov-banner>`,
      });

      const component = page.rootInstance as AegovBanner;
      expect(component.position).toBe('bottom');
      expect(page.root.querySelector('.banner--bottom')).toBeTruthy();
    });
  });

  describe('display prop', () => {
    it('should default to static display', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `<aegov-banner>Message</aegov-banner>`,
      });

      const component = page.rootInstance as AegovBanner;
      expect(component.display).toBe('static');
      expect(page.root.querySelector('.banner--static')).toBeTruthy();
    });

    it('should render fixed display', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `<aegov-banner display="fixed">Message</aegov-banner>`,
      });

      const component = page.rootInstance as AegovBanner;
      expect(component.display).toBe('fixed');
      expect(page.root.querySelector('.banner--fixed')).toBeTruthy();
    });

    it('should render sticky display', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `<aegov-banner display="sticky">Message</aegov-banner>`,
      });

      const component = page.rootInstance as AegovBanner;
      expect(component.display).toBe('sticky');
      expect(page.root.querySelector('.banner--sticky')).toBeTruthy();
    });
  });

  describe('mode prop', () => {
    it('should default to push mode', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `<aegov-banner>Message</aegov-banner>`,
      });

      const component = page.rootInstance as AegovBanner;
      expect(component.mode).toBe('push');
      expect(page.root.querySelector('.banner--push')).toBeTruthy();
    });

    it('should render overlay mode', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `<aegov-banner mode="overlay">Message</aegov-banner>`,
      });

      const component = page.rootInstance as AegovBanner;
      expect(component.mode).toBe('overlay');
      expect(page.root.querySelector('.banner--overlay')).toBeTruthy();
    });
  });

  describe('dismissible functionality', () => {
    it('should be dismissible by default', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `<aegov-banner>Message</aegov-banner>`,
      });

      const component = page.rootInstance as AegovBanner;
      expect(component.dismissible).toBe(true);
    });

    it('should not render dismiss button when dismissible=false', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `<aegov-banner dismissible="false">Message</aegov-banner>`,
      });

      expect(page.root.querySelector('.banner-dismiss')).toBeFalsy();
    });

    it('should emit aegovBannerDismiss event when dismissed', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `<aegov-banner>Message</aegov-banner>`,
      });

      const dismissSpy = jest.fn();
      page.root.addEventListener('aegovBannerDismiss', dismissSpy);

      const dismissButton = page.root.querySelector('.banner-dismiss') as HTMLButtonElement;
      dismissButton.click();

      // Wait for animation
      await new Promise(resolve => setTimeout(resolve, 350));
      await page.waitForChanges();

      expect(dismissSpy).toHaveBeenCalled();
    });

    it('should hide banner after dismiss', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `<aegov-banner>Message</aegov-banner>`,
      });

      const dismissButton = page.root.querySelector('.banner-dismiss') as HTMLButtonElement;
      dismissButton.click();

      // Wait for animation
      await new Promise(resolve => setTimeout(resolve, 350));
      await page.waitForChanges();

      expect(page.root.querySelector('.aegov-banner')).toBeFalsy();
    });
  });

  describe('bannerTitle prop', () => {
    it('should not render title by default', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `<aegov-banner>Message</aegov-banner>`,
      });

      expect(page.root.querySelector('.banner-title')).toBeFalsy();
    });

    it('should render title when provided', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `<aegov-banner banner-title="Important Notice">Message</aegov-banner>`,
      });

      const title = page.root.querySelector('.banner-title');
      expect(title).toBeTruthy();
      expect(title.textContent).toBe('Important Notice');
    });

    it('should have aria-labelledby when title is provided', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `<aegov-banner banner-title="Notice">Message</aegov-banner>`,
      });

      const banner = page.root.querySelector('[aria-labelledby]');
      expect(banner.getAttribute('aria-labelledby')).toBe('aegov-banner-title');
    });
  });

  describe('ariaRole prop', () => {
    it('should allow custom ARIA role override', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `<aegov-banner aria-role="status">Message</aegov-banner>`,
      });

      const banner = page.root.querySelector('[role]');
      expect(banner.getAttribute('role')).toBe('status');
    });

    it('should use custom role even for error variant', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `<aegov-banner variant="error" aria-role="region">Message</aegov-banner>`,
      });

      const banner = page.root.querySelector('[role]');
      expect(banner.getAttribute('role')).toBe('region');
    });
  });

  describe('slots', () => {
    it('should detect actions slot', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `
          <aegov-banner>
            Message
            <div slot="actions">
              <button>Action</button>
            </div>
          </aegov-banner>
        `,
      });

      await page.waitForChanges();
      const component = page.rootInstance as AegovBanner;
      expect(component.hasActionsSlot).toBe(true);
    });

    it('should render actions slot container when actions present', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `
          <aegov-banner>
            Message
            <div slot="actions">
              <button>Action</button>
            </div>
          </aegov-banner>
        `,
      });

      await page.waitForChanges();
      expect(page.root.querySelector('.banner-actions')).toBeTruthy();
    });

    it('should detect custom icon slot', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `
          <aegov-banner>
            Message
            <svg slot="icon"></svg>
          </aegov-banner>
        `,
      });

      await page.waitForChanges();
      const component = page.rootInstance as AegovBanner;
      expect(component.hasIconSlot).toBe(true);
    });
  });

  describe('default icons', () => {
    it('should render default icon for default variant', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `<aegov-banner variant="default">Message</aegov-banner>`,
      });

      const icon = page.root.querySelector('.banner-icon');
      expect(icon).toBeTruthy();
    });

    it('should render error icon for error variant', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `<aegov-banner variant="error">Message</aegov-banner>`,
      });

      const icon = page.root.querySelector('.banner-icon');
      expect(icon).toBeTruthy();
    });

    it('should render warning icon for warning variant', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `<aegov-banner variant="warning">Message</aegov-banner>`,
      });

      const icon = page.root.querySelector('.banner-icon');
      expect(icon).toBeTruthy();
    });

    it('should render success icon for success variant', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `<aegov-banner variant="success">Message</aegov-banner>`,
      });

      const icon = page.root.querySelector('.banner-icon');
      expect(icon).toBeTruthy();
    });

    it('should render info icon for info variant', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `<aegov-banner variant="info">Message</aegov-banner>`,
      });

      const icon = page.root.querySelector('.banner-icon');
      expect(icon).toBeTruthy();
    });
  });

  describe('CSS classes', () => {
    it('should apply correct classes for fixed top overlay', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `<aegov-banner display="fixed" position="top" mode="overlay">Message</aegov-banner>`,
      });

      const banner = page.root.querySelector('.aegov-banner');
      expect(banner.classList.contains('banner--fixed')).toBe(true);
      expect(banner.classList.contains('banner--top')).toBe(true);
      expect(banner.classList.contains('banner--overlay')).toBe(true);
    });

    it('should apply correct classes for sticky bottom push', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `<aegov-banner display="sticky" position="bottom" mode="push">Message</aegov-banner>`,
      });

      const banner = page.root.querySelector('.aegov-banner');
      expect(banner.classList.contains('banner--sticky')).toBe(true);
      expect(banner.classList.contains('banner--bottom')).toBe(true);
      expect(banner.classList.contains('banner--push')).toBe(true);
    });

    it('should apply dismissing class during dismiss animation', async () => {
      const page = await newSpecPage({
        components: [AegovBanner],
        html: `<aegov-banner>Message</aegov-banner>`,
      });

      const dismissButton = page.root.querySelector('.banner-dismiss') as HTMLButtonElement;
      dismissButton.click();
      await page.waitForChanges();

      const banner = page.root.querySelector('.aegov-banner');
      expect(banner.classList.contains('banner--dismissing')).toBe(true);
    });
  });
});
