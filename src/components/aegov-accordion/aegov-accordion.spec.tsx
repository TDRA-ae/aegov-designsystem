import { newSpecPage } from '@stencil/core/testing';
import { AegovAccordion } from './aegov-accordion';
import { AegovAccordionItem } from '../aegov-accordion-item/aegov-accordion-item';

describe('aegov-accordion', () => {
  describe('rendering', () => {
    it('should render', async () => {
      const page = await newSpecPage({
        components: [AegovAccordion, AegovAccordionItem],
        html: `
          <aegov-accordion>
            <aegov-accordion-item>
              <span slot="accordion-item-heading">Heading 1</span>
              <span slot="accordion-item-content">Content 1</span>
            </aegov-accordion-item>
          </aegov-accordion>
        `,
      });
      expect(page.root).toBeTruthy();
    });

    it('should render multiple accordion items', async () => {
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
            <aegov-accordion-item>
              <span slot="accordion-item-heading">Heading 3</span>
              <span slot="accordion-item-content">Content 3</span>
            </aegov-accordion-item>
          </aegov-accordion>
        `,
      });

      const items = page.root.querySelectorAll('aegov-accordion-item');
      expect(items.length).toBe(3);
    });

    it('should render aegov-accordion class', async () => {
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

      const accordionDiv = page.root.querySelector('.aegov-accordion');
      expect(accordionDiv).toBeTruthy();
    });
  });

  describe('allowMultiple prop', () => {
    it('should default to false', async () => {
      const page = await newSpecPage({
        components: [AegovAccordion, AegovAccordionItem],
        html: `
          <aegov-accordion>
            <aegov-accordion-item>
              <span slot="accordion-item-heading">Heading 1</span>
              <span slot="accordion-item-content">Content 1</span>
            </aegov-accordion-item>
          </aegov-accordion>
        `,
      });

      const accordion = page.root as HTMLAegovAccordionElement;
      expect(accordion.allowMultiple).toBe(false);
    });

    it('should accept true value', async () => {
      const page = await newSpecPage({
        components: [AegovAccordion, AegovAccordionItem],
        html: `
          <aegov-accordion allow-multiple="true">
            <aegov-accordion-item>
              <span slot="accordion-item-heading">Heading 1</span>
              <span slot="accordion-item-content">Content 1</span>
            </aegov-accordion-item>
          </aegov-accordion>
        `,
      });

      const accordion = page.root as HTMLAegovAccordionElement;
      expect(accordion.allowMultiple).toBe(true);
    });
  });

  describe('defaultOpen prop', () => {
    it('should open first item when defaultOpen is 0', async () => {
      const page = await newSpecPage({
        components: [AegovAccordion, AegovAccordionItem],
        html: `
          <aegov-accordion default-open="0">
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

      const items = page.root.querySelectorAll('aegov-accordion-item') as NodeListOf<HTMLAegovAccordionItemElement>;
      expect(items[0].open).toBe(true);
      expect(items[1].open).toBe(false);
    });

    it('should open second item when defaultOpen is 1', async () => {
      const page = await newSpecPage({
        components: [AegovAccordion, AegovAccordionItem],
        html: `
          <aegov-accordion default-open="1">
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

      const items = page.root.querySelectorAll('aegov-accordion-item') as NodeListOf<HTMLAegovAccordionItemElement>;
      expect(items[0].open).toBe(false);
      expect(items[1].open).toBe(true);
    });
  });

  describe('single mode (allowMultiple=false)', () => {
    it('should close other items when opening one', async () => {
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

      const items = page.root.querySelectorAll('aegov-accordion-item') as NodeListOf<HTMLAegovAccordionItemElement>;

      items[0].open = true;
      await page.waitForChanges();

      expect(items[0].open).toBe(true);
      expect(items[1].open).toBe(false);

      items[1].open = true;
      await page.waitForChanges();

      items[0].open = false;
      await page.waitForChanges();

      expect(items[0].open).toBe(false);
      expect(items[1].open).toBe(true);
    });
  });

  describe('multiple mode (allowMultiple=true)', () => {
    it('should allow multiple items to be open', async () => {
      const page = await newSpecPage({
        components: [AegovAccordion, AegovAccordionItem],
        html: `
          <aegov-accordion allow-multiple="true">
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

      const items = page.root.querySelectorAll('aegov-accordion-item') as NodeListOf<HTMLAegovAccordionItemElement>;

      items[0].open = true;
      items[1].open = true;
      await page.waitForChanges();

      expect(items[0].open).toBe(true);
      expect(items[1].open).toBe(true);
    });
  });

  describe('icon prop', () => {
    it('should default to chevron', async () => {
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

      const accordion = page.root as HTMLAegovAccordionElement;
      expect(accordion.icon).toBe('chevron');
    });

    it('should accept plus value', async () => {
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

      const accordion = page.root as HTMLAegovAccordionElement;
      expect(accordion.icon).toBe('plus');
    });

    it('should set icon on child items', async () => {
      const page = await newSpecPage({
        components: [AegovAccordion, AegovAccordionItem],
        html: `
          <aegov-accordion icon="plus">
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

      const items = page.root.querySelectorAll('aegov-accordion-item') as NodeListOf<HTMLAegovAccordionItemElement>;
      expect(items[0].icon).toBe('plus');
      expect(items[1].icon).toBe('plus');
    });
  });

  describe('bordered prop', () => {
    it('should default to false', async () => {
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

      const accordion = page.root as HTMLAegovAccordionElement;
      expect(accordion.bordered).toBe(false);
    });

    it('should accept true value', async () => {
      const page = await newSpecPage({
        components: [AegovAccordion, AegovAccordionItem],
        html: `
          <aegov-accordion bordered="true">
            <aegov-accordion-item>
              <span slot="accordion-item-heading">Heading</span>
              <span slot="accordion-item-content">Content</span>
            </aegov-accordion-item>
          </aegov-accordion>
        `,
      });

      const accordion = page.root as HTMLAegovAccordionElement;
      expect(accordion.bordered).toBe(true);
    });

    it('should apply aegov-accordion__bordered class when bordered is true', async () => {
      const page = await newSpecPage({
        components: [AegovAccordion, AegovAccordionItem],
        html: `
          <aegov-accordion bordered="true">
            <aegov-accordion-item>
              <span slot="accordion-item-heading">Heading</span>
              <span slot="accordion-item-content">Content</span>
            </aegov-accordion-item>
          </aegov-accordion>
        `,
      });

      await page.waitForChanges();

      const accordionDiv = page.root.querySelector('.aegov-accordion');
      expect(accordionDiv).toHaveClass('aegov-accordion__bordered');
    });

    it('should not apply aegov-accordion__bordered class when bordered is false', async () => {
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

      await page.waitForChanges();

      const accordionDiv = page.root.querySelector('.aegov-accordion');
      expect(accordionDiv).not.toHaveClass('aegov-accordion__bordered');
    });
  });

  describe('first and last item flags', () => {
    it('should set isFirst on first item', async () => {
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

      const items = page.root.querySelectorAll('aegov-accordion-item') as NodeListOf<HTMLAegovAccordionItemElement>;
      expect(items[0].isFirst).toBe(true);
      expect(items[1].isFirst).toBe(false);
    });

    it('should set isLast on last item', async () => {
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

      const items = page.root.querySelectorAll('aegov-accordion-item') as NodeListOf<HTMLAegovAccordionItemElement>;
      expect(items[0].isLast).toBe(false);
      expect(items[1].isLast).toBe(true);
    });

    it('should set both isFirst and isLast on single item', async () => {
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

      await page.waitForChanges();

      const item = page.root.querySelector('aegov-accordion-item') as HTMLAegovAccordionItemElement;
      expect(item.isFirst).toBe(true);
      expect(item.isLast).toBe(true);
    });
  });

  describe('memory leak prevention', () => {
    it('should remove event listeners on disconnectedCallback', async () => {
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

      const items = Array.from(page.root.querySelectorAll('aegov-accordion-item')) as HTMLAegovAccordionItemElement[];
      const removeSpies = items.map(item => jest.spyOn(item, 'removeEventListener'));

      // Trigger disconnectedCallback
      page.root.remove();
      await page.waitForChanges();

      // Each item should have had removeEventListener called for 'aegovAccordionItemToggle'
      removeSpies.forEach(spy => {
        expect(spy).toHaveBeenCalledWith('aegovAccordionItemToggle', expect.any(Function));
      });
    });

    it('should clear itemListeners map on disconnectedCallback', async () => {
      const page = await newSpecPage({
        components: [AegovAccordion, AegovAccordionItem],
        html: `
          <aegov-accordion>
            <aegov-accordion-item>
              <span slot="accordion-item-heading">Heading 1</span>
              <span slot="accordion-item-content">Content 1</span>
            </aegov-accordion-item>
          </aegov-accordion>
        `,
      });

      await page.waitForChanges();

      const instance = page.rootInstance;
      // Verify listeners were registered
      expect(instance.itemListeners.size).toBeGreaterThan(0);

      // Trigger disconnectedCallback
      page.root.remove();
      await page.waitForChanges();

      // Map should be cleared
      expect(instance.itemListeners.size).toBe(0);
    });

    it('should not accumulate listeners when setupEventListeners is called multiple times', async () => {
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

      const instance = page.rootInstance;
      const initialCount = instance.itemListeners.size;
      expect(initialCount).toBe(2); // One per item

      // Simulate prop change which triggers componentDidUpdate → updateItems
      instance.allowMultiple = true;
      await page.waitForChanges();

      // Listener count should remain the same, not double
      expect(instance.itemListeners.size).toBe(2);
    });

    it('should track each item listener in the Map', async () => {
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
            <aegov-accordion-item>
              <span slot="accordion-item-heading">Heading 3</span>
              <span slot="accordion-item-content">Content 3</span>
            </aegov-accordion-item>
          </aegov-accordion>
        `,
      });

      await page.waitForChanges();

      const instance = page.rootInstance;
      // One listener per accordion item
      expect(instance.itemListeners.size).toBe(3);

      // Each key in the Map should be an actual accordion item element
      const items = Array.from(page.root.querySelectorAll('aegov-accordion-item'));
      instance.itemListeners.forEach((_listener: EventListener, element: HTMLElement) => {
        expect(items).toContain(element);
      });
    });
  });

  describe('invalid prop values', () => {
    let warnSpy: jest.SpyInstance;

    beforeEach(() => {
      warnSpy = jest.spyOn(console, 'warn').mockImplementation();
    });

    afterEach(() => {
      warnSpy.mockRestore();
    });

    it('renders safely when icon is invalid', async () => {
      const page = await newSpecPage({
        components: [AegovAccordion, AegovAccordionItem],
        html: `
          <aegov-accordion icon="sparkle">
            <aegov-accordion-item>
              <span slot="accordion-item-heading">Heading</span>
              <span slot="accordion-item-content">Content</span>
            </aegov-accordion-item>
          </aegov-accordion>
        `,
      });
      expect(page.root.querySelector('.aegov-accordion')).toBeTruthy();
    });

    it('warns with component name, prop name, invalid value, and fallback', async () => {
      await newSpecPage({
        components: [AegovAccordion, AegovAccordionItem],
        html: `
          <aegov-accordion icon="sparkle">
            <aegov-accordion-item>
              <span slot="accordion-item-heading">Heading</span>
              <span slot="accordion-item-content">Content</span>
            </aegov-accordion-item>
          </aegov-accordion>
        `,
      });
      const messages = warnSpy.mock.calls.map(c => c[0] as string);
      const iconWarn = messages.find(m => m.includes('[aegov-accordion]') && m.includes('"sparkle"'));
      expect(iconWarn).toBeDefined();
      expect(iconWarn).toContain('"icon"');
    });

    it('does not warn when all props are valid', async () => {
      await newSpecPage({
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
      expect(warnSpy).not.toHaveBeenCalled();
    });

    it('warns again via @Watch when icon is updated to an invalid value', async () => {
      const page = await newSpecPage({
        components: [AegovAccordion, AegovAccordionItem],
        html: `
          <aegov-accordion icon="chevron">
            <aegov-accordion-item>
              <span slot="accordion-item-heading">Heading</span>
              <span slot="accordion-item-content">Content</span>
            </aegov-accordion-item>
          </aegov-accordion>
        `,
      });
      expect(warnSpy).not.toHaveBeenCalled();

      page.root.setAttribute('icon', 'nope');
      await page.waitForChanges();

      const messages = warnSpy.mock.calls.map(c => c[0] as string);
      const invalidWarn = messages.find(m => m.includes('[aegov-accordion]') && m.includes('"nope"'));
      expect(invalidWarn).toBeDefined();
      expect(invalidWarn).toContain('"icon"');
    });
  });
});
