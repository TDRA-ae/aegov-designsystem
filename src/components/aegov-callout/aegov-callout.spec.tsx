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

    it('should have role="alert"', async () => {
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
      expect(page.root.querySelector('.callout__icon')).toBeTruthy();
    });

    it('should render content container', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout><span slot="content">Message</span></aegov-callout>`,
      });
      expect(page.root.querySelector('.callout__content')).toBeTruthy();
    });
  });

  describe('default props', () => {
    it('defaults variant to default', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout><span slot="content">Message</span></aegov-callout>`,
      });
      expect(page.rootInstance.variant).toBe('default');
    });

    it('defaults appearance to soft', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout><span slot="content">Message</span></aegov-callout>`,
      });
      expect(page.rootInstance.appearance).toBe('soft');
    });

    it('defaults dismissible to false', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout><span slot="content">Message</span></aegov-callout>`,
      });
      expect(page.rootInstance.dismissible).toBe(false);
    });

    it('defaults bordered to false', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout><span slot="content">Message</span></aegov-callout>`,
      });
      expect(page.rootInstance.bordered).toBe(false);
    });
  });

  describe('variants', () => {
    const variants = ['default', 'error', 'warning', 'success', 'info'];
    variants.forEach(variant => {
      it(`should render ${variant} variant`, async () => {
        const page = await newSpecPage({
          components: [AegovCallout],
          html: `<aegov-callout variant="${variant}"><span slot="content">Message</span></aegov-callout>`,
        });
        expect(page.rootInstance.variant).toBe(variant);
        const callout = page.root.querySelector('[data-aegov-callout]');
        expect(callout.classList.contains(`callout--${variant}`)).toBe(true);
      });
    });
  });

  describe('appearances', () => {
    it('should apply callout--soft for soft appearance', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout><span slot="content">Message</span></aegov-callout>`,
      });
      const callout = page.root.querySelector('[data-aegov-callout]');
      expect(callout.classList.contains('callout--soft')).toBe(true);
    });

    it('should apply callout--solid for solid appearance', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout appearance="solid"><span slot="content">Message</span></aegov-callout>`,
      });
      const callout = page.root.querySelector('[data-aegov-callout]');
      expect(callout.classList.contains('callout--solid')).toBe(true);
    });

    it('should combine variant and appearance', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout variant="error" appearance="solid"><span slot="content">Message</span></aegov-callout>`,
      });
      const callout = page.root.querySelector('[data-aegov-callout]');
      expect(callout.classList.contains('callout--error')).toBe(true);
      expect(callout.classList.contains('callout--solid')).toBe(true);
    });
  });

  describe('bordered prop', () => {
    it('should apply border-0 by default', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout><span slot="content">Message</span></aegov-callout>`,
      });
      const callout = page.root.querySelector('[data-aegov-callout]');
      expect(callout.classList.contains('border-0')).toBe(true);
    });

    it('should apply border-1 when bordered', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout bordered><span slot="content">Message</span></aegov-callout>`,
      });
      const callout = page.root.querySelector('[data-aegov-callout]');
      expect(callout.classList.contains('border-1')).toBe(true);
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

    it('should render dismiss button when dismissible', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout dismissible><span slot="content">Message</span></aegov-callout>`,
      });
      const dismissButton = page.root.querySelector('button[aria-label="Close callout"]');
      expect(dismissButton).toBeTruthy();
    });

    it('should hide callout when dismissed', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout dismissible><span slot="content">Message</span></aegov-callout>`,
      });
      expect(page.rootInstance.isVisible).toBe(true);

      const dismissButton = page.root.querySelector('button[aria-label="Close callout"]') as HTMLButtonElement;
      dismissButton.click();
      await page.waitForChanges();

      expect(page.rootInstance.isVisible).toBe(false);
    });

    it('should emit aegovCalloutDismiss event', async () => {
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

  describe('visibility', () => {
    it('should be visible by default', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout><span slot="content">Message</span></aegov-callout>`,
      });
      expect(page.rootInstance.isVisible).toBe(true);
    });

    it('should return null when not visible', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout dismissible><span slot="content">Message</span></aegov-callout>`,
      });
      page.rootInstance.isVisible = false;
      await page.waitForChanges();
      expect(page.root.querySelector('[data-aegov-callout]')).toBeFalsy();
    });
  });

  describe('icon variants', () => {
    const variants = ['default', 'error', 'warning', 'success', 'info'];
    variants.forEach(variant => {
      it(`should render icon for ${variant} variant`, async () => {
        const page = await newSpecPage({
          components: [AegovCallout],
          html: `<aegov-callout variant="${variant}"><span slot="content">Message</span></aegov-callout>`,
        });
        const icon = page.root.querySelector('.callout__icon svg');
        expect(icon).toBeTruthy();
      });
    });
  });

  describe('icon slot', () => {
    it('should render default icon when no icon slot', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout><span slot="content">Message</span></aegov-callout>`,
      });
      expect(page.root.querySelector('.callout__icon svg')).toBeTruthy();
    });

    it('should detect custom icon slot', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout>
          <span slot="icon">⚠️</span>
          <span slot="content">Message</span>
        </aegov-callout>`,
      });
      await page.waitForChanges();
      expect(page.rootInstance.hasIconSlot).toBe(true);
    });
  });

  describe('actions slot', () => {
    it('should not have actions by default', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout><span slot="content">Message</span></aegov-callout>`,
      });
      expect(page.rootInstance.hasActionsSlot).toBe(false);
    });

    it('should detect actions slot', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout>
          <span slot="content">Message</span>
          <button slot="actions">Action</button>
        </aegov-callout>`,
      });
      await page.waitForChanges();
      expect(page.rootInstance.hasActionsSlot).toBe(true);
    });
  });

  describe('pass-through attributes', () => {
    it('should pass through aria-* attributes', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout aria-label="Custom alert"><span slot="content">Message</span></aegov-callout>`,
      });
      const callout = page.root.querySelector('[data-aegov-callout]');
      expect(callout.getAttribute('aria-label')).toBe('Custom alert');
    });

    it('should pass through data-* attributes', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout data-testid="my-callout"><span slot="content">Message</span></aegov-callout>`,
      });
      const callout = page.root.querySelector('[data-aegov-callout]');
      expect(callout.getAttribute('data-testid')).toBe('my-callout');
    });

    it('should pass through id attribute', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout id="unique-callout"><span slot="content">Message</span></aegov-callout>`,
      });
      const callout = page.root.querySelector('[data-aegov-callout]');
      expect(callout.getAttribute('id')).toBe('unique-callout');
    });

    it('should not pass through unsupported attributes', async () => {
      const page = await newSpecPage({
        components: [AegovCallout],
        html: `<aegov-callout title="tooltip"><span slot="content">Message</span></aegov-callout>`,
      });
      const callout = page.root.querySelector('[data-aegov-callout]');
      expect(callout.getAttribute('title')).toBeNull();
    });
  });
});
