import { newE2EPage } from '@stencil/core/testing';

describe('aegov-callout E2E', () => {
  describe('rendering', () => {
    it('should render', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout>Test message</aegov-callout>');

      const element = await page.find('aegov-callout');
      expect(element).toBeTruthy();

      const callout = await page.find('aegov-callout .callout');
      expect(callout).toBeTruthy();
    });

    it('should display slotted content', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout>This is a test message</aegov-callout>');

      const content = await page.find('aegov-callout .callout-content');
      expect(content.textContent).toContain('This is a test message');
    });

    it('should have role="alert"', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout>Message</aegov-callout>');

      const callout = await page.find('aegov-callout .callout');
      const role = await callout.getAttribute('role');
      expect(role).toBe('alert');
    });
  });

  describe('variants', () => {
    it('should render default variant', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout variant="default">Default message</aegov-callout>');

      const callout = await page.find('aegov-callout .callout-default');
      expect(callout).toBeTruthy();
    });

    it('should render error variant', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout variant="error">Error message</aegov-callout>');

      const callout = await page.find('aegov-callout .callout-error');
      expect(callout).toBeTruthy();
    });

    it('should render warning variant', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout variant="warning">Warning message</aegov-callout>');

      const callout = await page.find('aegov-callout .callout-warning');
      expect(callout).toBeTruthy();
    });

    it('should render success variant', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout variant="success">Success message</aegov-callout>');

      const callout = await page.find('aegov-callout .callout-success');
      expect(callout).toBeTruthy();
    });

    it('should render info variant', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout variant="info">Info message</aegov-callout>');

      const callout = await page.find('aegov-callout .callout-info');
      expect(callout).toBeTruthy();
    });
  });

  describe('appearances', () => {
    it('should render soft appearance by default', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout>Message</aegov-callout>');

      const callout = await page.find('aegov-callout .callout-soft');
      expect(callout).toBeTruthy();
    });

    it('should render solid appearance', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout appearance="solid">Message</aegov-callout>');

      const callout = await page.find('aegov-callout .callout-solid');
      expect(callout).toBeTruthy();
    });

    it('should combine variant and appearance classes', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout variant="error" appearance="solid">Message</aegov-callout>');

      const errorCallout = await page.find('aegov-callout .callout-error');
      const solidCallout = await page.find('aegov-callout .callout-solid');

      expect(errorCallout).toBeTruthy();
      expect(solidCallout).toBeTruthy();
    });
  });

  describe('icon functionality', () => {
    it('should not display icon by default', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout>Message</aegov-callout>');

      const icon = await page.find('aegov-callout .callout-icon-wrapper');
      expect(icon).toBeFalsy();
    });

    it('should display icon when with-icon is true', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout with-icon>Message</aegov-callout>');

      const iconWrapper = await page.find('aegov-callout .callout-icon-wrapper');
      const icon = await page.find('aegov-callout .callout-icon');

      expect(iconWrapper).toBeTruthy();
      expect(icon).toBeTruthy();
    });

    it('should render icon with aria-hidden', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout variant="error" with-icon>Error</aegov-callout>');

      const icon = await page.find('aegov-callout .callout-icon');
      const ariaHidden = await icon.getAttribute('aria-hidden');
      expect(ariaHidden).toBe('true');
    });

    it('should render different icons for different variants', async () => {
      const variants = ['error', 'warning', 'success', 'info', 'default'];

      for (const variant of variants) {
        const page = await newE2EPage();
        await page.setContent(`<aegov-callout variant="${variant}" with-icon>Message</aegov-callout>`);

        const icon = await page.find('aegov-callout .callout-icon');
        expect(icon).toBeTruthy();
      }
    });
  });

  describe('link functionality', () => {
    it('should not display link by default', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout>Message</aegov-callout>');

      const link = await page.find('aegov-callout .callout-link');
      expect(link).toBeFalsy();
    });

    it('should display link when link-text is provided', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout link-text="Learn more">Message</aegov-callout>');

      const link = await page.find('aegov-callout .callout-link');
      expect(link).toBeTruthy();
      expect(link.textContent).toContain('Learn more');
    });

    it('should use link-url for href', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout link-text="Details" link-url="/details">Message</aegov-callout>');

      const link = await page.find('aegov-callout .callout-link');
      const href = await link.getAttribute('href');
      expect(href).toBe('/details');
    });

    it('should emit aegovCalloutLinkClick event when clicked', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout link-text="Click me">Message</aegov-callout>');

      const linkClickEvent = await page.spyOnEvent('aegovCalloutLinkClick');
      const link = await page.find('aegov-callout .callout-link');

      await link.click();
      await page.waitForChanges();

      expect(linkClickEvent).toHaveReceivedEvent();
    });

    it('should render link arrow icon', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout link-text="More">Message</aegov-callout>');

      const link = await page.find('aegov-callout .callout-link');
      const svg = await link.find('svg');
      expect(svg).toBeTruthy();
    });
  });

  describe('dismissible functionality', () => {
    it('should not display dismiss button by default', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout>Message</aegov-callout>');

      const dismissButton = await page.find('aegov-callout .callout-dismiss');
      expect(dismissButton).toBeFalsy();
    });

    it('should display dismiss button when dismissible is true', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout dismissible>Message</aegov-callout>');

      const dismissButton = await page.find('aegov-callout .callout-dismiss');
      expect(dismissButton).toBeTruthy();
    });

    it('should have aria-label on dismiss button', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout dismissible>Message</aegov-callout>');

      const dismissButton = await page.find('aegov-callout .callout-dismiss');
      const ariaLabel = await dismissButton.getAttribute('aria-label');
      expect(ariaLabel).toBe('Close callout');
    });

    it('should hide callout when dismiss button is clicked', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout dismissible>Message</aegov-callout>');

      let callout = await page.find('aegov-callout .callout');
      expect(callout).toBeTruthy();

      const dismissButton = await page.find('aegov-callout .callout-dismiss');
      await dismissButton.click();
      await page.waitForChanges();

      callout = await page.find('aegov-callout .callout');
      expect(callout).toBeFalsy();
    });

    it('should emit aegovCalloutDismiss event when dismissed', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout dismissible>Message</aegov-callout>');

      const dismissEvent = await page.spyOnEvent('aegovCalloutDismiss');
      const dismissButton = await page.find('aegov-callout .callout-dismiss');

      await dismissButton.click();
      await page.waitForChanges();

      expect(dismissEvent).toHaveReceivedEvent();
    });
  });

  describe('combinations', () => {
    it('should render with icon and link', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout with-icon link-text="Learn more">Message</aegov-callout>');

      const icon = await page.find('aegov-callout .callout-icon');
      const link = await page.find('aegov-callout .callout-link');

      expect(icon).toBeTruthy();
      expect(link).toBeTruthy();
    });

    it('should render with icon and dismiss button', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout with-icon dismissible>Message</aegov-callout>');

      const icon = await page.find('aegov-callout .callout-icon');
      const dismissButton = await page.find('aegov-callout .callout-dismiss');

      expect(icon).toBeTruthy();
      expect(dismissButton).toBeTruthy();
    });

    it('should render with all features enabled', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-callout
          variant="info"
          appearance="solid"
          with-icon
          link-text="Details"
          link-url="/details"
          dismissible>
          Important information
        </aegov-callout>
      `);

      const callout = await page.find('aegov-callout .callout-info.callout-solid');
      const icon = await page.find('aegov-callout .callout-icon');
      const link = await page.find('aegov-callout .callout-link');
      const dismissButton = await page.find('aegov-callout .callout-dismiss');

      expect(callout).toBeTruthy();
      expect(icon).toBeTruthy();
      expect(link).toBeTruthy();
      expect(dismissButton).toBeTruthy();
    });
  });

  describe('user interactions', () => {
    it('should handle keyboard navigation on dismiss button', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout dismissible>Message</aegov-callout>');

      const dismissButton = await page.find('aegov-callout .callout-dismiss');
      await dismissButton.focus();

      const activeElement = await page.evaluateHandle(() => document.activeElement);
      const buttonElement = await page.evaluateHandle(() =>
        document.querySelector('aegov-callout .callout-dismiss')
      );

      const isFocused = await page.evaluate((active, button) => active === button, activeElement, buttonElement);
      expect(isFocused).toBe(true);
    });

    it('should handle multiple callouts independently', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-callout id="callout1" dismissible>Message 1</aegov-callout>
        <aegov-callout id="callout2" dismissible>Message 2</aegov-callout>
      `);

      const callout1 = await page.find('#callout1 .callout');
      const callout2 = await page.find('#callout2 .callout');
      expect(callout1).toBeTruthy();
      expect(callout2).toBeTruthy();

      const dismissButton1 = await page.find('#callout1 .callout-dismiss');
      await dismissButton1.click();
      await page.waitForChanges();

      const callout1After = await page.find('#callout1 .callout');
      const callout2After = await page.find('#callout2 .callout');
      expect(callout1After).toBeFalsy();
      expect(callout2After).toBeTruthy();
    });
  });

  describe('edge cases', () => {
    it('should handle very long content', async () => {
      const longText = 'This is a very long message. '.repeat(50);
      const page = await newE2EPage();
      await page.setContent(`<aegov-callout>${longText}</aegov-callout>`);

      const content = await page.find('aegov-callout .callout-content');
      expect(content.textContent).toContain('This is a very long message.');
    });

    it('should handle HTML content in slot', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-callout>
          <strong>Important:</strong> This is <em>emphasized</em> text.
        </aegov-callout>
      `);

      const strong = await page.find('aegov-callout strong');
      const em = await page.find('aegov-callout em');

      expect(strong).toBeTruthy();
      expect(em).toBeTruthy();
      expect(strong.textContent).toBe('Important:');
      expect(em.textContent).toBe('emphasized');
    });

    it('should persist dismissal state', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout dismissible>Message</aegov-callout>');

      const dismissButton = await page.find('aegov-callout .callout-dismiss');
      await dismissButton.click();
      await page.waitForChanges();

      // Check that callout is dismissed
      const callout = await page.find('aegov-callout .callout');
      expect(callout).toBeFalsy();
    });
  });
});
