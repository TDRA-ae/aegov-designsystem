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
});
