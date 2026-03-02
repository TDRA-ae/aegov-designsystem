import { newE2EPage } from '@stencil/core/testing';

describe('aegov-accordion E2E', () => {
  describe('rendering', () => {
    it('should render', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-accordion>
          <aegov-accordion-item>
            <span slot="accordion-item-heading">Heading</span>
            <span slot="accordion-item-content">Content</span>
          </aegov-accordion-item>
        </aegov-accordion>
      `);

      const element = await page.find('aegov-accordion');
      expect(element).toBeTruthy();
    });

    it('should render accordion items', async () => {
      const page = await newE2EPage();
      await page.setContent(`
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
      `);

      const items = await page.findAll('aegov-accordion-item');
      expect(items.length).toBe(2);
    });
  });

  describe('interaction', () => {
    it('should toggle item when clicked', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-accordion>
          <aegov-accordion-item>
            <span slot="accordion-item-heading">Heading</span>
            <span slot="accordion-item-content">Content</span>
          </aegov-accordion-item>
        </aegov-accordion>
      `);

      const button = await page.find('aegov-accordion-item .accordion-item__header');

      let item = await page.find('aegov-accordion-item');
      let isOpen = await item.getProperty('open');
      expect(isOpen).toBe(false);

      await button.click();
      await page.waitForChanges();

      item = await page.find('aegov-accordion-item');
      isOpen = await item.getProperty('open');
      expect(isOpen).toBe(true);
    });

    it('should close other items in single mode', async () => {
      const page = await newE2EPage();
      await page.setContent(`
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
      `);

      const items = await page.findAll('aegov-accordion-item');
      const buttons = await page.findAll('aegov-accordion-item .accordion-item__header');

      await buttons[0].click();
      await page.waitForChanges();

      let item1Open = await items[0].getProperty('open');
      expect(item1Open).toBe(true);

      await buttons[1].click();
      await page.waitForChanges();

      item1Open = await items[0].getProperty('open');
      const item2Open = await items[1].getProperty('open');
      expect(item1Open).toBe(false);
      expect(item2Open).toBe(true);
    });

    it('should allow multiple open items when allow-multiple is true', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-accordion allow-multiple>
          <aegov-accordion-item>
            <span slot="accordion-item-heading">Heading 1</span>
            <span slot="accordion-item-content">Content 1</span>
          </aegov-accordion-item>
          <aegov-accordion-item>
            <span slot="accordion-item-heading">Heading 2</span>
            <span slot="accordion-item-content">Content 2</span>
          </aegov-accordion-item>
        </aegov-accordion>
      `);

      const items = await page.findAll('aegov-accordion-item');
      const buttons = await page.findAll('aegov-accordion-item .accordion-item__header');

      await buttons[0].click();
      await page.waitForChanges();

      await buttons[1].click();
      await page.waitForChanges();

      const item1Open = await items[0].getProperty('open');
      const item2Open = await items[1].getProperty('open');
      expect(item1Open).toBe(true);
      expect(item2Open).toBe(true);
    });

    it('should not toggle when disabled', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-accordion>
          <aegov-accordion-item disabled>
            <span slot="accordion-item-heading">Heading</span>
            <span slot="accordion-item-content">Content</span>
          </aegov-accordion-item>
        </aegov-accordion>
      `);

      const button = await page.find('aegov-accordion-item .accordion-item__header');
      const item = await page.find('aegov-accordion-item');

      await button.click();
      await page.waitForChanges();

      const isOpen = await item.getProperty('open');
      expect(isOpen).toBe(false);
    });
  });

  describe('default open', () => {
    it('should open specified item by default', async () => {
      const page = await newE2EPage();
      await page.setContent(`
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
      `);

      await page.waitForChanges();

      const items = await page.findAll('aegov-accordion-item');
      const item1Open = await items[0].getProperty('open');
      const item2Open = await items[1].getProperty('open');

      expect(item1Open).toBe(false);
      expect(item2Open).toBe(true);
    });
  });

  describe('keyboard navigation', () => {
    it('should toggle with Enter key', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-accordion>
          <aegov-accordion-item>
            <span slot="accordion-item-heading">Heading</span>
            <span slot="accordion-item-content">Content</span>
          </aegov-accordion-item>
        </aegov-accordion>
      `);

      const button = await page.find('aegov-accordion-item .accordion-item__header');
      await button.focus();
      await button.press('Enter');
      await page.waitForChanges();

      const item = await page.find('aegov-accordion-item');
      const isOpen = await item.getProperty('open');
      expect(isOpen).toBe(true);
    });

    it('should toggle with Space key', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-accordion>
          <aegov-accordion-item>
            <span slot="accordion-item-heading">Heading</span>
            <span slot="accordion-item-content">Content</span>
          </aegov-accordion-item>
        </aegov-accordion>
      `);

      const button = await page.find('aegov-accordion-item .accordion-item__header');
      await button.focus();
      await button.press('Space');
      await page.waitForChanges();

      const item = await page.find('aegov-accordion-item');
      const isOpen = await item.getProperty('open');
      expect(isOpen).toBe(true);
    });
  });

  describe('accessibility', () => {
    it('should have correct aria-expanded attribute', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-accordion>
          <aegov-accordion-item>
            <span slot="accordion-item-heading">Heading</span>
            <span slot="accordion-item-content">Content</span>
          </aegov-accordion-item>
        </aegov-accordion>
      `);

      const button = await page.find('aegov-accordion-item .accordion-item__header');

      let expanded = await button.getAttribute('aria-expanded');
      expect(expanded).toBe('false');

      await button.click();
      await page.waitForChanges();

      expanded = await button.getAttribute('aria-expanded');
      expect(expanded).toBe('true');
    });
  });

  describe('events', () => {
    it('should emit aegovAccordionItemToggle event', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-accordion>
          <aegov-accordion-item>
            <span slot="accordion-item-heading">Heading</span>
            <span slot="accordion-item-content">Content</span>
          </aegov-accordion-item>
        </aegov-accordion>
      `);

      const item = await page.find('aegov-accordion-item');
      const spy = await item.spyOnEvent('aegovAccordionItemToggle');

      const button = await page.find('aegov-accordion-item .accordion-item__header');
      await button.click();
      await page.waitForChanges();

      expect(spy).toHaveReceivedEvent();
    });
  });

  describe('icon property', () => {
    it('should render chevron icon by default', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-accordion>
          <aegov-accordion-item>
            <span slot="accordion-item-heading">Heading</span>
            <span slot="accordion-item-content">Content</span>
          </aegov-accordion-item>
        </aegov-accordion>
      `);

      const chevronIcon = await page.find('aegov-accordion-item .accordion-item__icon-chevron');
      const plusIcon = await page.find('aegov-accordion-item .accordion-item__icon-plus');

      expect(chevronIcon).toBeTruthy();
      expect(plusIcon).toBeFalsy();
    });

    it('should render plus icon when icon="plus"', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-accordion icon="plus">
          <aegov-accordion-item>
            <span slot="accordion-item-heading">Heading</span>
            <span slot="accordion-item-content">Content</span>
          </aegov-accordion-item>
        </aegov-accordion>
      `);

      const chevronIcon = await page.find('aegov-accordion-item .accordion-item__icon-chevron');
      const plusIcon = await page.find('aegov-accordion-item .accordion-item__icon-plus');

      expect(chevronIcon).toBeFalsy();
      expect(plusIcon).toBeTruthy();
    });

    it('should apply correct icon to all items', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-accordion icon="plus">
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
      `);

      const plusIcons = await page.findAll('aegov-accordion-item .accordion-item__icon-plus');
      const chevronIcons = await page.findAll('aegov-accordion-item .accordion-item__icon-chevron');

      expect(plusIcons.length).toBe(3);
      expect(chevronIcons.length).toBe(0);
    });
  });

  describe('bordered property', () => {
    it('should not have bordered class by default', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-accordion>
          <aegov-accordion-item>
            <span slot="accordion-item-heading">Heading</span>
            <span slot="accordion-item-content">Content</span>
          </aegov-accordion-item>
        </aegov-accordion>
      `);

      const accordionDiv = await page.find('aegov-accordion .aegov-accordion');
      const classes = await accordionDiv.getProperty('className');

      expect(classes).not.toContain('aegov-accordion__bordered');
    });

    it('should have bordered class when bordered="true"', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-accordion bordered>
          <aegov-accordion-item>
            <span slot="accordion-item-heading">Heading</span>
            <span slot="accordion-item-content">Content</span>
          </aegov-accordion-item>
        </aegov-accordion>
      `);

      const accordionDiv = await page.find('aegov-accordion .aegov-accordion');
      const classes = await accordionDiv.getProperty('className');

      expect(classes).toContain('aegov-accordion__bordered');
    });
  });

  describe('first and last item classes', () => {
    it('should apply accordion-item__first class to first item', async () => {
      const page = await newE2EPage();
      await page.setContent(`
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
      `);

      await page.waitForChanges();

      const firstItemDiv = await page.find('aegov-accordion-item:first-of-type .aegov-accordion-item');
      const classes = await firstItemDiv.getProperty('className');

      expect(classes).toContain('accordion-item__first');
    });

    it('should apply accordion-item__last class to last item', async () => {
      const page = await newE2EPage();
      await page.setContent(`
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
      `);

      await page.waitForChanges();

      const lastItemDiv = await page.find('aegov-accordion-item:last-of-type .aegov-accordion-item');
      const classes = await lastItemDiv.getProperty('className');

      expect(classes).toContain('accordion-item__last');
    });

    it('should apply both first and last classes to single item', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-accordion>
          <aegov-accordion-item>
            <span slot="accordion-item-heading">Heading</span>
            <span slot="accordion-item-content">Content</span>
          </aegov-accordion-item>
        </aegov-accordion>
      `);

      await page.waitForChanges();

      const itemDiv = await page.find('aegov-accordion-item .aegov-accordion-item');
      const classes = await itemDiv.getProperty('className');

      expect(classes).toContain('accordion-item__first');
      expect(classes).toContain('accordion-item__last');
    });

    it('should not apply first or last classes to middle items', async () => {
      const page = await newE2EPage();
      await page.setContent(`
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
      `);

      await page.waitForChanges();

      const items = await page.findAll('aegov-accordion-item .aegov-accordion-item');
      const middleItemClasses = await items[1].getProperty('className');

      expect(middleItemClasses).not.toContain('accordion-item__first');
      expect(middleItemClasses).not.toContain('accordion-item__last');
    });
  });

  describe('nested accordion', () => {
    it('should render nested accordion inside parent item', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-accordion>
          <aegov-accordion-item>
            <span slot="accordion-item-heading">Parent Item</span>
            <div slot="accordion-item-content">
              <p>Some content before nested accordion</p>
              <aegov-accordion allow-multiple>
                <aegov-accordion-item>
                  <span slot="accordion-item-heading">Nested Item 1</span>
                  <div slot="accordion-item-content">
                    <p>Nested content 1</p>
                  </div>
                </aegov-accordion-item>
                <aegov-accordion-item>
                  <span slot="accordion-item-heading">Nested Item 2</span>
                  <div slot="accordion-item-content">
                    <p>Nested content 2</p>
                  </div>
                </aegov-accordion-item>
              </aegov-accordion>
            </div>
          </aegov-accordion-item>
        </aegov-accordion>
      `);

      // Verify nested accordion structure renders
      const allAccordions = await page.findAll('aegov-accordion');
      expect(allAccordions.length).toBe(2);

      const allItems = await page.findAll('aegov-accordion-item');
      expect(allItems.length).toBe(3); // 1 parent + 2 nested
    });

    it('should allow nested accordion items to toggle independently', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-accordion>
          <aegov-accordion-item>
            <span slot="accordion-item-heading">Parent Item</span>
            <div slot="accordion-item-content">
              <p>Some content</p>
              <aegov-accordion>
                <aegov-accordion-item>
                  <span slot="accordion-item-heading">Nested Item</span>
                  <div slot="accordion-item-content">
                    <p>Nested content line 1</p>
                    <p>Nested content line 2</p>
                    <p>Nested content line 3</p>
                  </div>
                </aegov-accordion-item>
              </aegov-accordion>
            </div>
          </aegov-accordion-item>
        </aegov-accordion>
      `);

      const allItems = await page.findAll('aegov-accordion-item');
      expect(allItems.length).toBe(2); // 1 parent + 1 nested

      // Verify all items start closed
      const parentOpen = await allItems[0].getProperty('open');
      const nestedOpen = await allItems[1].getProperty('open');
      expect(parentOpen).toBe(false);
      expect(nestedOpen).toBe(false);
    });
  });
});
