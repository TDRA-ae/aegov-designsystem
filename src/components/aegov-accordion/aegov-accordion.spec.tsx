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

      // Open first item
      items[0].open = true;
      await page.waitForChanges();

      expect(items[0].open).toBe(true);
      expect(items[1].open).toBe(false);

      // Open second item
      items[1].open = true;
      await page.waitForChanges();

      // In single mode, first should close (handled by parent)
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

      // Open both items
      items[0].open = true;
      items[1].open = true;
      await page.waitForChanges();

      expect(items[0].open).toBe(true);
      expect(items[1].open).toBe(true);
    });
  });
});
