import { newSpecPage } from '@stencil/core/testing';
import { AegovCallout } from './aegov-callout';

describe('aegov-callout', () => {
  describe('rendering', () => {
    it('should render with default props', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout>This is a callout message</aegov-callout>`,
      });

      expect(page.root).toBeTruthy();
      expect(page.root).toEqualHtml(`
        <aegov-callout>
          <div class="callout callout-default callout-soft" role="alert">
            <div class="callout-content-wrapper">
              <div class="callout-content">
                This is a callout message
              </div>
            </div>
          </div>
        </aegov-callout>
      `);
    });

    it('should render with slotted content', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout><strong>Important!</strong> This is a message.</aegov-callout>`,
      });

      const content = page.root.querySelector('.callout-content');
      expect(content.innerHTML).toContain('<strong>Important!</strong>');
    });

    it('should have role="alert" for accessibility', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout>Alert message</aegov-callout>`,
      });

      const callout = page.root.querySelector('.callout');
      expect(callout.getAttribute('role')).toBe('alert');
    });
  });

  describe('variants', () => {
    it('should render default variant', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout variant="default">Message</aegov-callout>`,
      });

      expect(page.root.querySelector('.callout-default')).toBeTruthy();
    });

    it('should render error variant', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout variant="error">Error message</aegov-callout>`,
      });

      expect(page.root.querySelector('.callout-error')).toBeTruthy();
    });

    it('should render warning variant', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout variant="warning">Warning message</aegov-callout>`,
      });

      expect(page.root.querySelector('.callout-warning')).toBeTruthy();
    });

    it('should render success variant', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout variant="success">Success message</aegov-callout>`,
      });

      expect(page.root.querySelector('.callout-success')).toBeTruthy();
    });

    it('should render info variant', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout variant="info">Info message</aegov-callout>`,
      });

      expect(page.root.querySelector('.callout-info')).toBeTruthy();
    });
  });

  describe('appearances', () => {
    it('should render soft appearance by default', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout>Message</aegov-callout>`,
      });

      expect(page.root.querySelector('.callout-soft')).toBeTruthy();
    });

    it('should render solid appearance', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout appearance="solid">Message</aegov-callout>`,
      });

      expect(page.root.querySelector('.callout-solid')).toBeTruthy();
    });

    it('should apply both variant and appearance classes', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout variant="error" appearance="solid">Message</aegov-callout>`,
      });

      const callout = page.root.querySelector('.callout');
      expect(callout.classList.contains('callout-error')).toBe(true);
      expect(callout.classList.contains('callout-solid')).toBe(true);
    });
  });

  describe('icon functionality', () => {
    it('should not render icon by default', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout>Message</aegov-callout>`,
      });

      expect(page.root.querySelector('.callout-icon-wrapper')).toBeFalsy();
    });

    it('should render icon when withIcon is true', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout with-icon>Message</aegov-callout>`,
      });

      expect(page.root.querySelector('.callout-icon-wrapper')).toBeTruthy();
      expect(page.root.querySelector('.callout-icon')).toBeTruthy();
    });

    it('should render error icon for error variant', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout variant="error" with-icon>Error</aegov-callout>`,
      });

      const icon = page.root.querySelector('.callout-icon');
      expect(icon).toBeTruthy();
      expect(icon.getAttribute('aria-hidden')).toBe('true');
    });

    it('should render warning icon for warning variant', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout variant="warning" with-icon>Warning</aegov-callout>`,
      });

      expect(page.root.querySelector('.callout-icon')).toBeTruthy();
    });

    it('should render success icon for success variant', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout variant="success" with-icon>Success</aegov-callout>`,
      });

      expect(page.root.querySelector('.callout-icon')).toBeTruthy();
    });

    it('should render info icon for info variant', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout variant="info" with-icon>Info</aegov-callout>`,
      });

      expect(page.root.querySelector('.callout-icon')).toBeTruthy();
    });

    it('should render default icon for default variant', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout variant="default" with-icon>Default</aegov-callout>`,
      });

      expect(page.root.querySelector('.callout-icon')).toBeTruthy();
    });
  });

  describe('link functionality', () => {
    it('should not render link by default', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout>Message</aegov-callout>`,
      });

      expect(page.root.querySelector('.callout-link')).toBeFalsy();
    });

    it('should render link when linkText is provided', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout link-text="Learn more">Message</aegov-callout>`,
      });

      const link = page.root.querySelector('.callout-link');
      expect(link).toBeTruthy();
      expect(link.textContent).toContain('Learn more');
    });

    it('should use linkUrl for href attribute', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout link-text="Details" link-url="/details">Message</aegov-callout>`,
      });

      const link = page.root.querySelector('.callout-link');
      expect(link.getAttribute('href')).toBe('/details');
    });

    it('should default to # when linkUrl is not provided', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout link-text="Click">Message</aegov-callout>`,
      });

      const link = page.root.querySelector('.callout-link');
      expect(link.getAttribute('href')).toBe('#');
    });

    it('should render link icon/arrow', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout link-text="More">Message</aegov-callout>`,
      });

      const link = page.root.querySelector('.callout-link');
      const svg = link.querySelector('svg');
      expect(svg).toBeTruthy();
      expect(svg.getAttribute('aria-hidden')).toBe('true');
    });
  });

  describe('dismissible functionality', () => {
    it('should not render dismiss button by default', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout>Message</aegov-callout>`,
      });

      expect(page.root.querySelector('.callout-dismiss')).toBeFalsy();
    });

    it('should render dismiss button when dismissible is true', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout dismissible>Message</aegov-callout>`,
      });

      expect(page.root.querySelector('.callout-dismiss')).toBeTruthy();
    });

    it('should have aria-label on dismiss button', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout dismissible>Message</aegov-callout>`,
      });

      const button = page.root.querySelector('.callout-dismiss');
      expect(button.getAttribute('aria-label')).toBe('Close callout');
    });

    it('should hide callout when dismiss button is clicked', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout dismissible>Message</aegov-callout>`,
      });

      expect(page.rootInstance.isVisible).toBe(true);

      const button = page.root.querySelector('.callout-dismiss') as HTMLButtonElement;
      button.click();
      await page.waitForChanges();

      expect(page.rootInstance.isVisible).toBe(false);
      expect(page.root.querySelector('.callout')).toBeFalsy();
    });
  });

  describe('events', () => {
    it('should emit aegovCalloutDismiss when dismissed', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout dismissible>Message</aegov-callout>`,
      });

      const dismissSpy = jest.fn();
      page.root.addEventListener('aegovCalloutDismiss', dismissSpy);

      const button = page.root.querySelector('.callout-dismiss') as HTMLButtonElement;
      button.click();
      await page.waitForChanges();

      expect(dismissSpy).toHaveBeenCalled();
    });

    it('should emit aegovCalloutLinkClick when link is clicked', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout link-text="Click me">Message</aegov-callout>`,
      });

      const linkClickSpy = jest.fn();
      page.root.addEventListener('aegovCalloutLinkClick', linkClickSpy);

      const link = page.root.querySelector('.callout-link') as HTMLAnchorElement;
      link.click();
      await page.waitForChanges();

      expect(linkClickSpy).toHaveBeenCalled();
    });
  });

  describe('combinations', () => {
    it('should render with icon, link, and dismiss button', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout variant="info" with-icon link-text="Details" dismissible>Important information</aegov-callout>`,
      });

      expect(page.root.querySelector('.callout-icon-wrapper')).toBeTruthy();
      expect(page.root.querySelector('.callout-link')).toBeTruthy();
      expect(page.root.querySelector('.callout-dismiss')).toBeTruthy();
    });

    it('should work with all variants in solid appearance', async () => {
      const variants = ['default', 'error', 'warning', 'success', 'info'];

      for (const variant of variants) {
        const page = await newSpecPage({
          components: [AegovCallout],
          html: `<aegov-callout variant="${variant}" appearance="solid">Message</aegov-callout>`,
        });

        expect(page.root.querySelector(`.callout-${variant}`)).toBeTruthy();
        expect(page.root.querySelector('.callout-solid')).toBeTruthy();
      }
    });
  });

  describe('edge cases', () => {
    it('should handle empty content', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout></aegov-callout>`,
      });

      expect(page.root).toBeTruthy();
      expect(page.root.querySelector('.callout')).toBeTruthy();
    });

    it('should handle very long content', async () => {
      const longText = 'This is a very long message. '.repeat(50);
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout>${longText}</aegov-callout>`,
      });

      expect(page.root).toBeTruthy();
      const content = page.root.querySelector('.callout-content');
      expect(content.textContent).toContain('This is a very long message.');
    });

    it('should handle special characters in content', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout>Message with <, >, &, ", '</aegov-callout>`,
      });

      expect(page.root).toBeTruthy();
    });

    it('should remain hidden after dismissal', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout dismissible>Message</aegov-callout>`,
      });

      const button = page.root.querySelector('.callout-dismiss') as HTMLButtonElement;
      button.click();
      await page.waitForChanges();

      expect(page.root.querySelector('.callout')).toBeFalsy();
      expect(page.rootInstance.isVisible).toBe(false);
    });
  });
});
