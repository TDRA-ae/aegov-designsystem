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
      expect(await callout.getAttribute('role')).toBe('alert');
    });

    it('should render icon container', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout><span slot="content">Message</span></aegov-callout>');
      const icon = await page.find('aegov-callout .callout__icon');
      expect(icon).toBeTruthy();
    });

    it('should render default icon SVG', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout><span slot="content">Message</span></aegov-callout>');
      const svg = await page.find('aegov-callout .callout__icon svg');
      expect(svg).toBeTruthy();
    });
  });

  describe('variants', () => {
    const variants = ['default', 'error', 'warning', 'success', 'info'];
    variants.forEach(variant => {
      it(`should render ${variant} variant`, async () => {
        const page = await newE2EPage();
        await page.setContent(`<aegov-callout variant="${variant}"><span slot="content">${variant} message</span></aegov-callout>`);
        const callout = await page.find('aegov-callout [data-aegov-callout]');
        expect(callout).toBeTruthy();
        const classes = await callout.getAttribute('class');
        expect(classes).toContain(`callout--${variant}`);
      });
    });
  });

  describe('appearances', () => {
    it('should render soft appearance by default', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout><span slot="content">Message</span></aegov-callout>');
      const callout = await page.find('aegov-callout [data-aegov-callout]');
      const classes = await callout.getAttribute('class');
      expect(classes).toContain('callout--soft');
    });

    it('should render solid appearance', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout appearance="solid"><span slot="content">Message</span></aegov-callout>');
      const callout = await page.find('aegov-callout [data-aegov-callout]');
      const classes = await callout.getAttribute('class');
      expect(classes).toContain('callout--solid');
    });

    it('should combine variant and appearance', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout variant="error" appearance="solid"><span slot="content">Message</span></aegov-callout>');
      const callout = await page.find('aegov-callout [data-aegov-callout]');
      const classes = await callout.getAttribute('class');
      expect(classes).toContain('callout--error');
      expect(classes).toContain('callout--solid');
    });
  });

  describe('dismissible functionality', () => {
    it('should not show dismiss button by default', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout><span slot="content">Message</span></aegov-callout>');
      const dismissButton = await page.find('aegov-callout button[aria-label="Close callout"]');
      expect(dismissButton).toBeNull();
    });

    it('should show dismiss button when dismissible', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout dismissible><span slot="content">Message</span></aegov-callout>');
      const dismissButton = await page.find('aegov-callout button[aria-label="Close callout"]');
      expect(dismissButton).toBeTruthy();
    });

    it('should hide callout when dismiss button clicked', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout dismissible><span slot="content">Message</span></aegov-callout>');

      let callout = await page.find('aegov-callout [data-aegov-callout]');
      expect(callout).toBeTruthy();

      const dismissButton = await page.find('aegov-callout button[aria-label="Close callout"]');
      await dismissButton.click();
      await page.waitForChanges();

      callout = await page.find('aegov-callout [data-aegov-callout]');
      expect(callout).toBeNull();
    });

    it('should emit aegovCalloutDismiss event', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout dismissible><span slot="content">Message</span></aegov-callout>');
      const dismissSpy = await page.spyOnEvent('aegovCalloutDismiss');
      const dismissButton = await page.find('aegov-callout button[aria-label="Close callout"]');
      await dismissButton.click();
      expect(dismissSpy).toHaveReceivedEvent();
    });
  });

  describe('bordered prop', () => {
    it('should not have border by default', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout><span slot="content">Message</span></aegov-callout>');
      const callout = await page.find('aegov-callout [data-aegov-callout]');
      const classes = await callout.getAttribute('class');
      expect(classes).toContain('border-0');
    });

    it('should apply border when bordered', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout bordered><span slot="content">Message</span></aegov-callout>');
      const callout = await page.find('aegov-callout [data-aegov-callout]');
      const classes = await callout.getAttribute('class');
      expect(classes).toContain('border-1');
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
      const classes = await callout.getAttribute('class');
      expect(classes).toContain('callout--success');
      expect(classes).toContain('callout--solid');
      expect(classes).toContain('border-1');

      const dismissButton = await page.find('aegov-callout button[aria-label="Close callout"]');
      expect(dismissButton).toBeTruthy();
    });
  });

  describe('accessibility', () => {
    it('should have proper structure', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout><span slot="content">Accessible message</span></aegov-callout>');
      const callout = await page.find('aegov-callout [data-aegov-callout]');
      expect(await callout.getAttribute('role')).toBe('alert');
    });

    it('should have aria-label on dismiss button', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout dismissible><span slot="content">Message</span></aegov-callout>');
      const dismissButton = await page.find('aegov-callout button[aria-label="Close callout"]');
      expect(await dismissButton.getAttribute('aria-label')).toBe('Close callout');
    });

    it('should have aria-hidden on dismiss icon', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-callout dismissible><span slot="content">Message</span></aegov-callout>');
      const svg = await page.find('aegov-callout button[aria-label="Close callout"] svg');
      expect(await svg.getAttribute('aria-hidden')).toBe('true');
    });
  });
});
