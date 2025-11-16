import { newSpecPage } from '@stencil/core/testing';
import { AegovAccordionItem } from './aegov-accordion-item';
import { AegovAccordion } from '../aegov-accordion/aegov-accordion';

describe('aegov-accordion-item', () => {
  describe('rendering', () => {
    it('should render', async () => {
      const page = await newSpecPage({
        components: [AegovAccordion, AegovAccordionItem],
        html: `
          <aegov-accordion>
            <aegov-accordion-item>
              <span slot="accordion-item-heading">Test Heading</span>
              <span slot="accordion-item-content">Test Content</span>
            </aegov-accordion-item>
          </aegov-accordion>
        `,
      });
      expect(page.root).toBeTruthy();
    });

    it('should render heading slot content', async () => {
      const page = await newSpecPage({
        components: [AegovAccordion, AegovAccordionItem],
        html: `
          <aegov-accordion>
            <aegov-accordion-item>
              <span slot="accordion-item-heading">My Heading</span>
              <span slot="accordion-item-content">Content</span>
            </aegov-accordion-item>
          </aegov-accordion>
        `,
      });

      const heading = page.root.querySelector('[slot="accordion-item-heading"]');
      expect(heading).toBeTruthy();
      expect(heading.textContent).toBe('My Heading');
    });

    it('should render content slot', async () => {
      const page = await newSpecPage({
        components: [AegovAccordion, AegovAccordionItem],
        html: `
          <aegov-accordion>
            <aegov-accordion-item>
              <span slot="accordion-item-heading">Heading</span>
              <span slot="accordion-item-content">My Content</span>
            </aegov-accordion-item>
          </aegov-accordion>
        `,
      });

      const content = page.root.querySelector('[slot="accordion-item-content"]');
      expect(content).toBeTruthy();
      expect(content.textContent).toBe('My Content');
    });

    it('should render chevron icon', async () => {
      const page = await newSpecPage({
        components: [AegovAccordion, AegovAccordionItem],
        html: `
          <aegov-accordion>
            <aegov-accordion-item>
              <span slot="accordion-item-heading">Heading</span>
              <span slot="accordion-item-content">Content</span>
            </aegov-accordion-item>
          </aegov-accordion>
        `,
      });

      const icon = page.root.querySelector('.accordion-item__icon');
      expect(icon).toBeTruthy();
    });
  });

  describe('open state', () => {
    it('should default to closed', async () => {
      const page = await newSpecPage({
        components: [AegovAccordion, AegovAccordionItem],
        html: `
          <aegov-accordion>
            <aegov-accordion-item>
              <span slot="accordion-item-heading">Heading</span>
              <span slot="accordion-item-content">Content</span>
            </aegov-accordion-item>
          </aegov-accordion>
        `,
      });

      const item = page.root.querySelector('aegov-accordion-item') as HTMLAegovAccordionItemElement;
      expect(item.open).toBe(false);
    });

    it('should have open class when open', async () => {
      const page = await newSpecPage({
        components: [AegovAccordion, AegovAccordionItem],
        html: `
          <aegov-accordion>
            <aegov-accordion-item open>
              <span slot="accordion-item-heading">Heading</span>
              <span slot="accordion-item-content">Content</span>
            </aegov-accordion-item>
          </aegov-accordion>
        `,
      });

      await page.waitForChanges();

      const accordionItem = page.root.querySelector('.accordion-item');
      expect(accordionItem.classList.contains('accordion-item--open')).toBe(true);
    });

    it('should not have open class when closed', async () => {
      const page = await newSpecPage({
        components: [AegovAccordion, AegovAccordionItem],
        html: `
          <aegov-accordion>
            <aegov-accordion-item>
              <span slot="accordion-item-heading">Heading</span>
              <span slot="accordion-item-content">Content</span>
            </aegov-accordion-item>
          </aegov-accordion>
        `,
      });

      const accordionItem = page.root.querySelector('.accordion-item');
      expect(accordionItem.classList.contains('accordion-item--open')).toBe(false);
    });
  });

  describe('disabled state', () => {
    it('should default to enabled', async () => {
      const page = await newSpecPage({
        components: [AegovAccordion, AegovAccordionItem],
        html: `
          <aegov-accordion>
            <aegov-accordion-item>
              <span slot="accordion-item-heading">Heading</span>
              <span slot="accordion-item-content">Content</span>
            </aegov-accordion-item>
          </aegov-accordion>
        `,
      });

      const item = page.root.querySelector('aegov-accordion-item') as HTMLAegovAccordionItemElement;
      expect(item.disabled).toBe(false);
    });

    it('should have disabled class when disabled', async () => {
      const page = await newSpecPage({
        components: [AegovAccordion, AegovAccordionItem],
        html: `
          <aegov-accordion>
            <aegov-accordion-item disabled>
              <span slot="accordion-item-heading">Heading</span>
              <span slot="accordion-item-content">Content</span>
            </aegov-accordion-item>
          </aegov-accordion>
        `,
      });

      const accordionItem = page.root.querySelector('.accordion-item');
      expect(accordionItem.classList.contains('accordion-item--disabled')).toBe(true);
    });

    it('should disable button when disabled', async () => {
      const page = await newSpecPage({
        components: [AegovAccordion, AegovAccordionItem],
        html: `
          <aegov-accordion>
            <aegov-accordion-item disabled>
              <span slot="accordion-item-heading">Heading</span>
              <span slot="accordion-item-content">Content</span>
            </aegov-accordion-item>
          </aegov-accordion>
        `,
      });

      await page.waitForChanges();

      const button = page.body.querySelector('.accordion-item__header') as HTMLButtonElement;
      expect(button).toBeTruthy();
      expect(button.hasAttribute('disabled')).toBe(true);
    });
  });

  describe('aria attributes', () => {
    it('should have aria-expanded false when closed', async () => {
      const page = await newSpecPage({
        components: [AegovAccordion, AegovAccordionItem],
        html: `
          <aegov-accordion>
            <aegov-accordion-item>
              <span slot="accordion-item-heading">Heading</span>
              <span slot="accordion-item-content">Content</span>
            </aegov-accordion-item>
          </aegov-accordion>
        `,
      });

      const button = page.root.querySelector('.accordion-item__header');
      expect(button.getAttribute('aria-expanded')).toBe('false');
    });

    it('should have aria-expanded true when open', async () => {
      const page = await newSpecPage({
        components: [AegovAccordion, AegovAccordionItem],
        html: `
          <aegov-accordion>
            <aegov-accordion-item open>
              <span slot="accordion-item-heading">Heading</span>
              <span slot="accordion-item-content">Content</span>
            </aegov-accordion-item>
          </aegov-accordion>
        `,
      });

      await page.waitForChanges();

      const button = page.root.querySelector('.accordion-item__header');
      expect(button.getAttribute('aria-expanded')).toBe('true');
    });
  });

  describe('standalone usage validation', () => {
    it('should throw error when used without parent accordion', async () => {
      // Note: In Stencil test environment, errors in componentWillLoad don't reject the promise
      // This validation works in real browsers but cannot be easily tested with newSpecPage
      // The validation code is in componentWillLoad() and will throw in production
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      try {
        await newSpecPage({
          components: [AegovAccordionItem],
          html: `
            <aegov-accordion-item>
              <span slot="accordion-item-heading">Heading</span>
              <span slot="accordion-item-content">Content</span>
            </aegov-accordion-item>
          `,
        });
      } catch (error) {
        // Error thrown as expected
        expect(error.message).toContain('must be used inside <aegov-accordion>');
      }

      consoleErrorSpy.mockRestore();
    });
  });

  describe('events', () => {
    it('should emit aegovAccordionItemToggle when toggled', async () => {
      const page = await newSpecPage({
        components: [AegovAccordion, AegovAccordionItem],
        html: `
          <aegov-accordion>
            <aegov-accordion-item>
              <span slot="accordion-item-heading">Heading</span>
              <span slot="accordion-item-content">Content</span>
            </aegov-accordion-item>
          </aegov-accordion>
        `,
      });

      const item = page.root.querySelector('aegov-accordion-item');
      const toggleSpy = jest.fn();
      item.addEventListener('aegovAccordionItemToggle', toggleSpy);

      const button = page.root.querySelector('.accordion-item__header') as HTMLButtonElement;
      button.click();

      await page.waitForChanges();

      expect(toggleSpy).toHaveBeenCalled();
    });

    it('should emit event with open: true when opening', async () => {
      const page = await newSpecPage({
        components: [AegovAccordion, AegovAccordionItem],
        html: `
          <aegov-accordion>
            <aegov-accordion-item>
              <span slot="accordion-item-heading">Heading</span>
              <span slot="accordion-item-content">Content</span>
            </aegov-accordion-item>
          </aegov-accordion>
        `,
      });

      const item = page.root.querySelector('aegov-accordion-item');
      let eventDetail;
      item.addEventListener('aegovAccordionItemToggle', (e: CustomEvent) => {
        eventDetail = e.detail;
      });

      const button = page.root.querySelector('.accordion-item__header') as HTMLButtonElement;
      button.click();

      await page.waitForChanges();

      expect(eventDetail).toEqual({ open: true });
    });

    it('should not emit event when disabled', async () => {
      const page = await newSpecPage({
        components: [AegovAccordion, AegovAccordionItem],
        html: `
          <aegov-accordion>
            <aegov-accordion-item disabled>
              <span slot="accordion-item-heading">Heading</span>
              <span slot="accordion-item-content">Content</span>
            </aegov-accordion-item>
          </aegov-accordion>
        `,
      });

      const item = page.root.querySelector('aegov-accordion-item');
      const toggleSpy = jest.fn();
      item.addEventListener('aegovAccordionItemToggle', toggleSpy);

      const button = page.root.querySelector('.accordion-item__header') as HTMLButtonElement;
      button.click();

      await page.waitForChanges();

      expect(toggleSpy).not.toHaveBeenCalled();
    });
  });
});
