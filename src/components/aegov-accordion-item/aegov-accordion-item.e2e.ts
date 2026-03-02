import { newE2EPage } from '@stencil/core/testing';

describe('aegov-accordion-item E2E', () => {
  describe('rendering', () => {
    it('should render inside accordion', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-accordion>
          <aegov-accordion-item>
            <span slot="accordion-item-heading">Test Heading</span>
            <span slot="accordion-item-content">Test Content</span>
          </aegov-accordion-item>
        </aegov-accordion>
      `);

      const element = await page.find('aegov-accordion-item');
      expect(element).toBeTruthy();
    });

    it('should render heading slot content', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-accordion>
          <aegov-accordion-item>
            <span slot="accordion-item-heading">My Heading</span>
            <span slot="accordion-item-content">Content</span>
          </aegov-accordion-item>
        </aegov-accordion>
      `);

      const heading = await page.find('aegov-accordion-item [slot="accordion-item-heading"]');
      expect(heading).toBeTruthy();
      expect(heading.textContent).toBe('My Heading');
    });

    it('should render header button', async () => {
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
      expect(button).toBeTruthy();
    });

    it('should render icon', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-accordion>
          <aegov-accordion-item>
            <span slot="accordion-item-heading">Heading</span>
            <span slot="accordion-item-content">Content</span>
          </aegov-accordion-item>
        </aegov-accordion>
      `);

      const icon = await page.find('aegov-accordion-item .accordion-item__icon');
      expect(icon).toBeTruthy();
    });
  });

  describe('open/close interaction', () => {
    it('should open when header is clicked', async () => {
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
      const item = await page.find('aegov-accordion-item');

      let isOpen = await item.getProperty('open');
      expect(isOpen).toBe(false);

      await button.click();
      await page.waitForChanges();

      isOpen = await item.getProperty('open');
      expect(isOpen).toBe(true);
    });

    it('should close when header is clicked while open', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-accordion allow-multiple>
          <aegov-accordion-item open>
            <span slot="accordion-item-heading">Heading</span>
            <span slot="accordion-item-content">Content</span>
          </aegov-accordion-item>
        </aegov-accordion>
      `);

      const button = await page.find('aegov-accordion-item .accordion-item__header');
      const item = await page.find('aegov-accordion-item');

      let isOpen = await item.getProperty('open');
      expect(isOpen).toBe(true);

      await button.click();
      await page.waitForChanges();

      isOpen = await item.getProperty('open');
      expect(isOpen).toBe(false);
    });

    it('should not open when disabled', async () => {
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
    it('should have aria-expanded="false" when closed', async () => {
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
      const expanded = await button.getAttribute('aria-expanded');
      expect(expanded).toBe('false');
    });

    it('should have aria-expanded="true" when open', async () => {
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
      await button.click();
      await page.waitForChanges();

      const expanded = await button.getAttribute('aria-expanded');
      expect(expanded).toBe('true');
    });

    it('should have disabled attribute on button when disabled', async () => {
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
      const disabled = await button.getProperty('disabled');
      expect(disabled).toBe(true);
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

    it('should emit event with open: true when opening', async () => {
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

      expect(spy.firstEvent.detail).toEqual({ open: true });
    });

    it('should not emit event when disabled', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-accordion>
          <aegov-accordion-item disabled>
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

      expect(spy).not.toHaveReceivedEvent();
    });
  });

  describe('CSS classes', () => {
    it('should have accordion-item--open class when open', async () => {
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
      await button.click();
      await page.waitForChanges();

      const itemDiv = await page.find('aegov-accordion-item .aegov-accordion-item');
      const classes = await itemDiv.getProperty('className');
      expect(classes).toContain('accordion-item--open');
    });

    it('should have accordion-item--disabled class when disabled', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-accordion>
          <aegov-accordion-item disabled>
            <span slot="accordion-item-heading">Heading</span>
            <span slot="accordion-item-content">Content</span>
          </aegov-accordion-item>
        </aegov-accordion>
      `);

      const itemDiv = await page.find('aegov-accordion-item .aegov-accordion-item');
      const classes = await itemDiv.getProperty('className');
      expect(classes).toContain('accordion-item--disabled');
    });

    it('should apply first and last classes', async () => {
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
      const lastItemDiv = await page.find('aegov-accordion-item:last-of-type .aegov-accordion-item');

      const firstClasses = await firstItemDiv.getProperty('className');
      const lastClasses = await lastItemDiv.getProperty('className');

      expect(firstClasses).toContain('accordion-item__first');
      expect(lastClasses).toContain('accordion-item__last');
    });
  });

  describe('icon variants', () => {
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
      expect(chevronIcon).toBeTruthy();
    });

    it('should render plus icon when parent has icon="plus"', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-accordion icon="plus">
          <aegov-accordion-item>
            <span slot="accordion-item-heading">Heading</span>
            <span slot="accordion-item-content">Content</span>
          </aegov-accordion-item>
        </aegov-accordion>
      `);

      const plusIcon = await page.find('aegov-accordion-item .accordion-item__icon-plus');
      expect(plusIcon).toBeTruthy();
    });
  });
});
