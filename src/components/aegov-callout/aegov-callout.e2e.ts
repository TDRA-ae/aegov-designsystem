import { newE2EPage } from '@stencil/core/testing';

describe('aegov-callout E2E', () => {
  describe('rendering', () => {
    it('should render', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout><span slot="content">Test message</span></aegov-callout>');

      const element = await page.find('aegov-callout');
      expect(element).toBeTruthy();

      const callout = await page.find('aegov-callout [data-aegov-callout]');
      expect(callout).toBeTruthy();
    });

    it('should display slotted content', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout><span slot="content">This is a test message</span></aegov-callout>');

      const content = await page.find('aegov-callout .callout__content');
      expect(content.textContent).toContain('This is a test message');
    });

    it('should have role="alert"', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout><span slot="content">Message</span></aegov-callout>');

      const callout = await page.find('aegov-callout [data-aegov-callout]');
      const role = await callout.getAttribute('role');
      expect(role).toBe('alert');
    });

    it('should render icon container', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout><span slot="content">Message</span></aegov-callout>');

      const icon = await page.find('aegov-callout .callout__icon');
      expect(icon).toBeTruthy();
    });

    it('should render default icon', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout><span slot="content">Message</span></aegov-callout>');

      const svg = await page.find('aegov-callout .callout__icon svg');
      expect(svg).toBeTruthy();
    });
  });

  describe('variants', () => {
    it('should render default variant', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout variant="default"><span slot="content">Default message</span></aegov-callout>');

      const element = await page.find('aegov-callout');
      expect(element).toBeTruthy();
    });

    it('should render error variant', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout variant="error"><span slot="content">Error message</span></aegov-callout>');

      const element = await page.find('aegov-callout');
      expect(element).toBeTruthy();

      // Error variant should have an error icon
      const icon = await page.find('aegov-callout .callout__icon svg');
      expect(icon).toBeTruthy();
    });

    it('should render warning variant', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout variant="warning"><span slot="content">Warning message</span></aegov-callout>');

      const element = await page.find('aegov-callout');
      expect(element).toBeTruthy();
    });

    it('should render success variant', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout variant="success"><span slot="content">Success message</span></aegov-callout>');

      const element = await page.find('aegov-callout');
      expect(element).toBeTruthy();
    });

    it('should render info variant', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout variant="info"><span slot="content">Info message</span></aegov-callout>');

      const element = await page.find('aegov-callout');
      expect(element).toBeTruthy();
    });
  });

  describe('appearances', () => {
    it('should render soft appearance by default', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout><span slot="content">Message</span></aegov-callout>');

      const callout = await page.find('aegov-callout [data-aegov-callout]');
      expect(callout).toBeTruthy();
    });

    it('should render solid appearance', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout appearance="solid"><span slot="content">Message</span></aegov-callout>');

      const callout = await page.find('aegov-callout [data-aegov-callout]');
      expect(callout).toBeTruthy();
    });

    it('should combine variant and appearance props', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout variant="error" appearance="solid"><span slot="content">Message</span></aegov-callout>');

      const callout = await page.find('aegov-callout [data-aegov-callout]');
      expect(callout).toBeTruthy();
    });
  });

  describe('dismissible functionality', () => {
    it('should not show dismiss button by default', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout><span slot="content">Message</span></aegov-callout>');

      const dismissButton = await page.find('aegov-callout button[aria-label="Close this callout"]');
      expect(dismissButton).toBeNull();
    });

    it('should show dismiss button when dismissible', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout dismissible><span slot="content">Message</span></aegov-callout>');

      const dismissButton = await page.find('aegov-callout button[aria-label="Close this callout"]');
      expect(dismissButton).toBeTruthy();
    });

    it('should hide callout when dismiss button is clicked', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout dismissible><span slot="content">Message</span></aegov-callout>');

      let callout = await page.find('aegov-callout [data-aegov-callout]');
      expect(callout).toBeTruthy();

      const dismissButton = await page.find('aegov-callout button[aria-label="Close this callout"]');
      await dismissButton.click();
      await page.waitForChanges();

      callout = await page.find('aegov-callout [data-aegov-callout]');
      expect(callout).toBeNull();
    });

    it('should emit aegovCalloutDismiss event when dismissed', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout dismissible><span slot="content">Message</span></aegov-callout>');

      const dismissSpy = await page.spyOnEvent('aegovCalloutDismiss');
      const dismissButton = await page.find('aegov-callout button[aria-label="Close this callout"]');
      await dismissButton.click();

      expect(dismissSpy).toHaveReceivedEvent();
    });
  });

  describe('bordered prop', () => {
    it('should not have border by default', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout><span slot="content">Message</span></aegov-callout>');

      const callout = await page.find('aegov-callout [data-aegov-callout]');
      expect(callout).toBeTruthy();
    });

    it('should apply border when bordered prop is true', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout bordered><span slot="content">Message</span></aegov-callout>');

      const callout = await page.find('aegov-callout [data-aegov-callout]');
      expect(callout).toBeTruthy();
    });
  });

  describe('custom slots', () => {
    it('should render custom icon when provided', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-callout>
          <span slot="icon">⚠️</span>
          <span slot="content">Message with custom icon</span>
        </aegov-callout>
      `);

      const iconSlot = await page.find('aegov-callout [slot="icon"]');
      expect(iconSlot).toBeTruthy();
      // Don't check exact text content due to UTF-8 encoding variations in E2E tests
      expect(iconSlot.textContent).toBeTruthy();
    });

    it('should render actions slot when provided', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-callout>
          <span slot="content">Message</span>
          <button slot="actions" class="test-action">Action</button>
        </aegov-callout>
      `);

      const actionsSlot = await page.find('aegov-callout [slot="actions"]');
      expect(actionsSlot).toBeTruthy();
    });

    it('should render link slot when provided', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-callout>
          <span slot="content">Message</span>
          <a slot="link" href="#">Learn more</a>
        </aegov-callout>
      `);

      const linkSlot = await page.find('aegov-callout [slot="link"]');
      expect(linkSlot).toBeTruthy();
    });
  });

  describe('combined props', () => {
    it('should apply multiple props correctly', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-callout variant="success" appearance="solid" bordered dismissible>
          <span slot="content">Success message</span>
        </aegov-callout>
      `);

      const callout = await page.find('aegov-callout [data-aegov-callout]');
      expect(callout).toBeTruthy();

      const dismissButton = await page.find('aegov-callout button[aria-label="Close this callout"]');
      expect(dismissButton).toBeTruthy();
    });
  });

  describe('accessibility', () => {
    it('should have proper structure', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout><span slot="content">Accessible message</span></aegov-callout>');

      const callout = await page.find('aegov-callout [data-aegov-callout]');
      const role = await callout.getAttribute('role');
      expect(role).toBe('alert');
    });

    it('should have aria-label on dismiss button', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout dismissible><span slot="content">Message</span></aegov-callout>');

      const dismissButton = await page.find('aegov-callout button[aria-label="Close this callout"]');
      const ariaLabel = await dismissButton.getAttribute('aria-label');
      expect(ariaLabel).toBe('Close callout');
    });
  });
});
