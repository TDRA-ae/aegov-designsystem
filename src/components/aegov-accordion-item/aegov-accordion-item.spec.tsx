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

    it('should render chevron icon by default', async () => {
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

    it('should render header button', async () => {
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
      expect(button).toBeTruthy();
      expect(button.tagName).toBe('BUTTON');
    });

    it('should render content wrapper', async () => {
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

      const wrapper = page.root.querySelector('.accordion-item__content-wrapper');
      expect(wrapper).toBeTruthy();
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

      const accordionItem = page.root.querySelector('.aegov-accordion-item');
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

      const accordionItem = page.root.querySelector('.aegov-accordion-item');
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

      const accordionItem = page.root.querySelector('.aegov-accordion-item');
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

  describe('icon variants', () => {
    it('should render chevron icon by default', async () => {
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

      const chevronIcon = page.root.querySelector('.accordion-item__icon-chevron');
      expect(chevronIcon).toBeTruthy();
    });

    it('should render plus icon when set', async () => {
      const page = await newSpecPage({
        components: [AegovAccordion, AegovAccordionItem],
        html: `
          <aegov-accordion icon="plus">
            <aegov-accordion-item>
              <span slot="accordion-item-heading">Heading</span>
              <span slot="accordion-item-content">Content</span>
            </aegov-accordion-item>
          </aegov-accordion>
        `,
      });

      await page.waitForChanges();

      const plusIcon = page.root.querySelector('.accordion-item__icon-plus');
      expect(plusIcon).toBeTruthy();
    });
  });

  describe('aria attributes', () => {
    it('should have aria-controls on trigger linking to content panel', async () => {
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
      const contentPanel = page.root.querySelector('.accordion-item__content');
      const ariaControls = button.getAttribute('aria-controls');
      expect(ariaControls).toBeTruthy();
      expect(contentPanel.id).toBe(ariaControls);
    });

    it('should have role="region" and aria-labelledby on content panel', async () => {
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
      const contentPanel = page.root.querySelector('.accordion-item__content');
      expect(contentPanel.getAttribute('role')).toBe('region');
      expect(contentPanel.getAttribute('aria-labelledby')).toBe(button.id);
    });

    it('should have matching trigger id and content aria-labelledby', async () => {
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
      const contentPanel = page.root.querySelector('.accordion-item__content');
      expect(button.id).toBeTruthy();
      expect(contentPanel.getAttribute('aria-labelledby')).toBe(button.id);
      expect(button.getAttribute('aria-controls')).toBe(contentPanel.id);
    });

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

    it('should have type="button" on header', async () => {
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
      expect(button.getAttribute('type')).toBe('button');
    });
  });

  describe('standalone usage validation', () => {
    it('should throw error when used without parent accordion', async () => {
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

  describe('heading prop', () => {
    it('should render heading prop text when no heading slot', async () => {
      const page = await newSpecPage({
        components: [AegovAccordion, AegovAccordionItem],
        html: `
          <aegov-accordion>
            <aegov-accordion-item heading="Test Heading">
              <span slot="accordion-item-content">Content</span>
            </aegov-accordion-item>
          </aegov-accordion>
        `,
      });

      const headingDiv = page.root.querySelector('.accordion-item__heading');
      expect(headingDiv.textContent).toContain('Test Heading');
    });
  });

  describe('CSS classes', () => {
    it('should apply accordion-item__first class when isFirst', async () => {
      const page = await newSpecPage({
        components: [AegovAccordion, AegovAccordionItem],
        html: `
          <aegov-accordion>
            <aegov-accordion-item>
              <span slot="accordion-item-heading">Heading 1</span>
              <span slot="accordion-item-content">Content 1</span>
            </aegov-accordion-item>
            <aegov-accordion-item>
              <span slot="accordion-item-heading">Heading 2</span>
              <span slot="accordion-item-content">Content 2</span>
            </aegov-accordion-item>
          </aegov-accordion>
        `,
      });

      await page.waitForChanges();

      const firstItemDiv = page.root.querySelector('aegov-accordion-item:first-of-type .aegov-accordion-item');
      expect(firstItemDiv.classList.contains('accordion-item__first')).toBe(true);
    });

    it('should apply accordion-item__last class when isLast', async () => {
      const page = await newSpecPage({
        components: [AegovAccordion, AegovAccordionItem],
        html: `
          <aegov-accordion>
            <aegov-accordion-item>
              <span slot="accordion-item-heading">Heading 1</span>
              <span slot="accordion-item-content">Content 1</span>
            </aegov-accordion-item>
            <aegov-accordion-item>
              <span slot="accordion-item-heading">Heading 2</span>
              <span slot="accordion-item-content">Content 2</span>
            </aegov-accordion-item>
          </aegov-accordion>
        `,
      });

      await page.waitForChanges();

      const lastItemDiv = page.root.querySelector('aegov-accordion-item:last-of-type .aegov-accordion-item');
      expect(lastItemDiv.classList.contains('accordion-item__last')).toBe(true);
    });

    it('should apply accordion-item--base class by default', async () => {
      const page = await newSpecPage({
        components: [AegovAccordion, AegovAccordionItem],
        html: `
          <aegov-accordion>
            <aegov-accordion-item heading="Heading">Content</aegov-accordion-item>
          </aegov-accordion>
        `,
      });

      await page.waitForChanges();

      const itemDiv = page.root.querySelector('.aegov-accordion-item');
      expect(itemDiv.classList.contains('accordion-item--base')).toBe(true);
    });

    it('should apply accordion-item--sm class when size is sm', async () => {
      const page = await newSpecPage({
        components: [AegovAccordion, AegovAccordionItem],
        html: `
          <aegov-accordion size="sm">
            <aegov-accordion-item heading="Heading">Content</aegov-accordion-item>
          </aegov-accordion>
        `,
      });

      await page.waitForChanges();

      const itemDiv = page.root.querySelector('.aegov-accordion-item');
      expect(itemDiv.classList.contains('accordion-item--sm')).toBe(true);
    });

    it('should apply accordion-item--lg class when size is lg', async () => {
      const page = await newSpecPage({
        components: [AegovAccordion, AegovAccordionItem],
        html: `
          <aegov-accordion size="lg">
            <aegov-accordion-item heading="Heading">Content</aegov-accordion-item>
          </aegov-accordion>
        `,
      });

      await page.waitForChanges();

      const itemDiv = page.root.querySelector('.aegov-accordion-item');
      expect(itemDiv.classList.contains('accordion-item--lg')).toBe(true);
    });
  });

  describe('size prop', () => {
    it('should default to base', async () => {
      const page = await newSpecPage({
        components: [AegovAccordion, AegovAccordionItem],
        html: `
          <aegov-accordion>
            <aegov-accordion-item heading="Heading">Content</aegov-accordion-item>
          </aegov-accordion>
        `,
      });

      const item = page.root.querySelector('aegov-accordion-item') as HTMLAegovAccordionItemElement;
      expect(item.size).toBe('base');
    });

    it('should reflect sm size set by parent', async () => {
      const page = await newSpecPage({
        components: [AegovAccordion, AegovAccordionItem],
        html: `
          <aegov-accordion size="sm">
            <aegov-accordion-item heading="Heading">Content</aegov-accordion-item>
          </aegov-accordion>
        `,
      });

      await page.waitForChanges();

      const item = page.root.querySelector('aegov-accordion-item') as HTMLAegovAccordionItemElement;
      expect(item.size).toBe('sm');
    });

    it('should reflect lg size set by parent', async () => {
      const page = await newSpecPage({
        components: [AegovAccordion, AegovAccordionItem],
        html: `
          <aegov-accordion size="lg">
            <aegov-accordion-item heading="Heading">Content</aegov-accordion-item>
          </aegov-accordion>
        `,
      });

      await page.waitForChanges();

      const item = page.root.querySelector('aegov-accordion-item') as HTMLAegovAccordionItemElement;
      expect(item.size).toBe('lg');
    });
  });
});
