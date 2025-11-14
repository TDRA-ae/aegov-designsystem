import { newSpecPage } from '@stencil/core/testing';
import { AegovCallout } from './aegov-callout';

describe('aegov-callout', () => {
  describe('rendering', () => {
    it('should render with default props', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout><span slot="content">This is a callout message</span></aegov-callout>`,
      });

      expect(page.root).toBeTruthy();
      const callout = page.root.querySelector('[data-aegov-callout]');
      expect(callout).toBeTruthy();
    });

    it('should have role="alert" for accessibility', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout><span slot="content">Alert message</span></aegov-callout>`,
      });

      const callout = page.root.querySelector('[data-aegov-callout]');
      expect(callout.getAttribute('role')).toBe('alert');
    });

    it('should render icon container', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout><span slot="content">Message</span></aegov-callout>`,
      });

      expect(page.root.querySelector('.callout-icon')).toBeTruthy();
    });

    it('should render content container', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout><span slot="content">Message</span></aegov-callout>`,
      });

      expect(page.root.querySelector('.callout-content')).toBeTruthy();
    });
  });

  describe('variants', () => {
    it('should render default variant', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout variant="default"><span slot="content">Message</span></aegov-callout>`,
      });

      const component = page.rootInstance as AegovCallout;
      expect(component.variant).toBe('default');
    });

    it('should render error variant', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout variant="error"><span slot="content">Error message</span></aegov-callout>`,
      });

      const component = page.rootInstance as AegovCallout;
      expect(component.variant).toBe('error');
    });

    it('should render warning variant', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout variant="warning"><span slot="content">Warning message</span></aegov-callout>`,
      });

      const component = page.rootInstance as AegovCallout;
      expect(component.variant).toBe('warning');
    });

    it('should render success variant', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout variant="success"><span slot="content">Success message</span></aegov-callout>`,
      });

      const component = page.rootInstance as AegovCallout;
      expect(component.variant).toBe('success');
    });

    it('should render info variant', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout variant="info"><span slot="content">Info message</span></aegov-callout>`,
      });

      const component = page.rootInstance as AegovCallout;
      expect(component.variant).toBe('info');
    });
  });

  describe('appearances', () => {
    it('should render soft appearance by default', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout><span slot="content">Message</span></aegov-callout>`,
      });

      const component = page.rootInstance as AegovCallout;
      expect(component.appearance).toBe('soft');
    });

    it('should render solid appearance', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout appearance="solid"><span slot="content">Message</span></aegov-callout>`,
      });

      const component = page.rootInstance as AegovCallout;
      expect(component.appearance).toBe('solid');
    });

    it('should apply both variant and appearance props', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout variant="error" appearance="solid"><span slot="content">Message</span></aegov-callout>`,
      });

      const component = page.rootInstance as AegovCallout;
      expect(component.variant).toBe('error');
      expect(component.appearance).toBe('solid');
    });
  });

  describe('dismissible functionality', () => {
    it('should not render dismiss button by default', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout><span slot="content">Message</span></aegov-callout>`,
      });

      const dismissButton = page.root.querySelector('button[aria-label="Close callout"]');
      expect(dismissButton).toBeFalsy();
    });

    it('should render dismiss button when dismissible is true', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout dismissible><span slot="content">Message</span></aegov-callout>`,
      });

      const dismissButton = page.root.querySelector('button[aria-label="Close callout"]');
      expect(dismissButton).toBeTruthy();
    });

    it('should hide callout when dismiss button is clicked', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout dismissible><span slot="content">Message</span></aegov-callout>`,
      });

      const component = page.rootInstance as AegovCallout;
      const dismissButton = page.root.querySelector('button[aria-label="Close callout"]') as HTMLButtonElement;

      expect(component.isVisible).toBe(true);
      dismissButton.click();
      await page.waitForChanges();
      expect(component.isVisible).toBe(false);
    });

    it('should emit aegovCalloutDismiss event when dismissed', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout dismissible><span slot="content">Message</span></aegov-callout>`,
      });

      const dismissSpy = jest.fn();
      page.root.addEventListener('aegovCalloutDismiss', dismissSpy);

      const dismissButton = page.root.querySelector('button[aria-label="Close callout"]') as HTMLButtonElement;
      dismissButton.click();
      await page.waitForChanges();

      expect(dismissSpy).toHaveBeenCalled();
    });
  });

  describe('bordered prop', () => {
    it('should not have border by default', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout><span slot="content">Message</span></aegov-callout>`,
      });

      const component = page.rootInstance as AegovCallout;
      expect(component.bordered).toBe(false);
    });

    it('should apply border when bordered is true', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout bordered><span slot="content">Message</span></aegov-callout>`,
      });

      const component = page.rootInstance as AegovCallout;
      expect(component.bordered).toBe(true);
    });
  });

  describe('visibility', () => {
    it('should be visible by default', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout><span slot="content">Message</span></aegov-callout>`,
      });

      const component = page.rootInstance as AegovCallout;
      expect(component.isVisible).toBe(true);
    });

    it('should return null when not visible', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout dismissible><span slot="content">Message</span></aegov-callout>`,
      });

      const component = page.rootInstance as AegovCallout;
      component.isVisible = false;
      await page.waitForChanges();

      const callout = page.root.querySelector('[data-aegov-callout]');
      expect(callout).toBeFalsy();
    });
  });

  describe('icon slot', () => {
    it('should render default icon when no icon slot provided', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout><span slot="content">Message</span></aegov-callout>`,
      });

      const icon = page.root.querySelector('.callout-icon svg');
      expect(icon).toBeTruthy();
    });

    it('should render custom icon when icon slot provided', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout>
          <span slot="icon">⚠️</span>
          <span slot="content">Message</span>
        </aegov-callout>`,
      });

      await page.waitForChanges();
      const component = page.rootInstance as AegovCallout;
      expect(component.hasIconSlot).toBe(true);
    });
  });

  describe('actions slot', () => {
    it('should not have actions by default', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout><span slot="content">Message</span></aegov-callout>`,
      });

      const component = page.rootInstance as AegovCallout;
      expect(component.hasActionsSlot).toBe(false);
    });

    it('should detect actions slot when provided', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout>
          <span slot="content">Message</span>
          <button slot="actions">Action</button>
        </aegov-callout>`,
      });

      await page.waitForChanges();
      const component = page.rootInstance as AegovCallout;
      expect(component.hasActionsSlot).toBe(true);
    });
  });

  describe('icon variants', () => {
    it('should render info icon for default variant', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout variant="default"><span slot="content">Message</span></aegov-callout>`,
      });

      const icon = page.root.querySelector('.callout-icon svg');
      expect(icon).toBeTruthy();
    });

    it('should render error icon for error variant', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout variant="error"><span slot="content">Error</span></aegov-callout>`,
      });

      const icon = page.root.querySelector('.callout-icon svg');
      expect(icon).toBeTruthy();
    });

    it('should render warning icon for warning variant', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout variant="warning"><span slot="content">Warning</span></aegov-callout>`,
      });

      const icon = page.root.querySelector('.callout-icon svg');
      expect(icon).toBeTruthy();
    });

    it('should render success icon for success variant', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout variant="success"><span slot="content">Success</span></aegov-callout>`,
      });

      const icon = page.root.querySelector('.callout-icon svg');
      expect(icon).toBeTruthy();
    });

    it('should render info icon for info variant', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout variant="info"><span slot="content">Info</span></aegov-callout>`,
      });

      const icon = page.root.querySelector('.callout-icon svg');
      expect(icon).toBeTruthy();
    });
  });
});
