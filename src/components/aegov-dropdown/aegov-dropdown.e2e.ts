import { newE2EPage } from '@stencil/core/testing';

describe('aegov-dropdown E2E', () => {
  describe('rendering', () => {
    it('should render', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-dropdown>
          <button>Open Menu</button>
          <div slot="dropdown-content">
            <a href="#profile">Profile</a>
            <a href="#settings">Settings</a>
          </div>
        </aegov-dropdown>
      `);

      const element = await page.find('aegov-dropdown');
      expect(element).toBeTruthy();
    });

    it('should render trigger element', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-dropdown>
          <button id="trigger-btn">Open Menu</button>
          <div slot="dropdown-content">Content</div>
        </aegov-dropdown>
      `);

      const trigger = await page.find('button#trigger-btn');
      expect(trigger).toBeTruthy();
      const text = await trigger.getProperty('textContent');
      expect(text).toBe('Open Menu');
    });

    it('should create portal element on component load', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-dropdown>
          <button>Trigger</button>
          <div slot="dropdown-content">Content</div>
        </aegov-dropdown>
      `);

      // Portal element should exist but be empty
      const portal = await page.find('.aegov-dropdown-portal');
      expect(portal).toBeTruthy();

      // Should not have dropdown content yet
      const dropdown = await page.find('.aegov-dropdown-portal .aegov-dropdown');
      expect(dropdown).toBeFalsy();
    });
  });

  describe('click trigger', () => {
    it('should open dropdown on trigger click', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-dropdown show-delay="0">
          <button>Open Menu</button>
          <div slot="dropdown-content">
            <button>Item 1</button>
            <button>Item 2</button>
          </div>
        </aegov-dropdown>
      `);

      const trigger = await page.find('aegov-dropdown .aegov-dropdown-trigger');
      await trigger.click();
      await page.waitForChanges();

      // Check aria-expanded
      const ariaExpanded = await trigger.getAttribute('aria-expanded');
      expect(ariaExpanded).toBe('true');

      // Check portal has dropdown content
      await page.waitForSelector('.aegov-dropdown-portal .aegov-dropdown');
      const dropdown = await page.find('.aegov-dropdown-portal .aegov-dropdown');
      expect(dropdown).toBeTruthy();
    });

    it('should close dropdown on second trigger click', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-dropdown show-delay="0">
          <button>Open Menu</button>
          <div slot="dropdown-content">
            <button>Item 1</button>
          </div>
        </aegov-dropdown>
      `);

      const trigger = await page.find('aegov-dropdown .aegov-dropdown-trigger');

      // Open
      await trigger.click();
      await page.waitForChanges();
      let ariaExpanded = await trigger.getAttribute('aria-expanded');
      expect(ariaExpanded).toBe('true');

      // Close
      await trigger.click();
      await page.waitForChanges();
      ariaExpanded = await trigger.getAttribute('aria-expanded');
      expect(ariaExpanded).toBe('false');
    });

    it('should close dropdown when clicking outside', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <div>
          <aegov-dropdown show-delay="0">
            <button>Open Menu</button>
            <div slot="dropdown-content">
              <button>Item 1</button>
            </div>
          </aegov-dropdown>
          <button id="outside">Outside Button</button>
        </div>
      `);

      const trigger = await page.find('aegov-dropdown .aegov-dropdown-trigger');
      const outside = await page.find('#outside');

      // Open dropdown
      await trigger.click();
      await page.waitForChanges();
      let ariaExpanded = await trigger.getAttribute('aria-expanded');
      expect(ariaExpanded).toBe('true');

      // Click outside
      await outside.click();
      await page.waitForChanges();
      ariaExpanded = await trigger.getAttribute('aria-expanded');
      expect(ariaExpanded).toBe('false');
    });

    it('should render dropdown content in portal when opened', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-dropdown show-delay="0">
          <button>Open Menu</button>
          <div slot="dropdown-content">
            <a href="#profile" id="menu-link">Profile</a>
          </div>
        </aegov-dropdown>
      `);

      const trigger = await page.find('aegov-dropdown .aegov-dropdown-trigger');

      // Open dropdown
      await trigger.click();
      await page.waitForChanges();

      // Wait for portal to be created
      await page.waitForSelector('.aegov-dropdown-portal .aegov-dropdown');

      // Verify content is rendered in the portal
      const menuLink = await page.find('.aegov-dropdown-portal .aegov-dropdown a');
      expect(menuLink).toBeTruthy();
    });
  });

  describe('hover trigger', () => {
    it('should open dropdown on hover after delay', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-dropdown trigger-type="hover" show-delay="0">
          <button>Hover Menu</button>
          <div slot="dropdown-content">
            <button>Item 1</button>
          </div>
        </aegov-dropdown>
      `);

      const trigger = await page.find('aegov-dropdown .aegov-dropdown-trigger');

      // Hover over trigger
      await trigger.hover();
      await page.waitForChanges();

      // Should be open
      const ariaExpanded = await trigger.getAttribute('aria-expanded');
      expect(ariaExpanded).toBe('true');
    });

    it('should open dropdown on hover', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <div>
          <aegov-dropdown trigger-type="hover" show-delay="0" hide-delay="0">
            <button>Hover Menu</button>
            <div slot="dropdown-content">
              <button>Item 1</button>
            </div>
          </aegov-dropdown>
          <button id="outside">Outside</button>
        </div>
      `);

      const trigger = await page.find('aegov-dropdown .aegov-dropdown-trigger');

      // Hover to open
      await trigger.hover();
      await page.waitForChanges();
      const ariaExpanded = await trigger.getAttribute('aria-expanded');
      expect(ariaExpanded).toBe('true');
    });
  });

  describe('keyboard navigation', () => {
    it('should close dropdown on Escape key', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-dropdown show-delay="0">
          <button>Open Menu</button>
          <div slot="dropdown-content">
            <button>Item 1</button>
          </div>
        </aegov-dropdown>
      `);

      const trigger = await page.find('aegov-dropdown .aegov-dropdown-trigger');

      // Open dropdown
      await trigger.click();
      await page.waitForChanges();
      let ariaExpanded = await trigger.getAttribute('aria-expanded');
      expect(ariaExpanded).toBe('true');

      // Press Escape
      await page.keyboard.press('Escape');
      await page.waitForChanges();

      // Should be closed
      ariaExpanded = await trigger.getAttribute('aria-expanded');
      expect(ariaExpanded).toBe('false');
    });

    it('should open dropdown and render content in portal', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-dropdown show-delay="0">
          <button>Open Menu</button>
          <div slot="dropdown-content">
            <button id="first-btn">Item 1</button>
            <button id="second-btn">Item 2</button>
          </div>
        </aegov-dropdown>
      `);

      const trigger = await page.find('aegov-dropdown .aegov-dropdown-trigger');

      // Open dropdown
      await trigger.click();
      await page.waitForChanges();

      // Wait for portal content
      await page.waitForSelector('.aegov-dropdown-portal .aegov-dropdown button');

      // Verify dropdown is open and content is rendered
      const ariaExpanded = await trigger.getAttribute('aria-expanded');
      expect(ariaExpanded).toBe('true');

      const buttons = await page.findAll('.aegov-dropdown-portal .aegov-dropdown button');
      expect(buttons.length).toBe(2);
    });

    it('should navigate with Arrow Down key', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-dropdown show-delay="0">
          <button>Open Menu</button>
          <div slot="dropdown-content">
            <button>Item 1</button>
            <button>Item 2</button>
          </div>
        </aegov-dropdown>
      `);

      const trigger = await page.find('aegov-dropdown .aegov-dropdown-trigger');

      // Open dropdown
      await trigger.click();
      await page.waitForChanges();
      await page.waitForSelector('.aegov-dropdown-portal .aegov-dropdown');
      await new Promise(resolve => setTimeout(resolve, 50));

      // Press Arrow Down
      await page.keyboard.press('ArrowDown');
      await new Promise(resolve => setTimeout(resolve, 20));

      const activeElement = await page.evaluateHandle(() => document.activeElement);
      const text = await page.evaluate(el => el.textContent, activeElement);
      expect(text).toBe('Item 2');
    });

    it('should navigate backwards with Arrow Up key', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-dropdown show-delay="0">
          <button>Open Menu</button>
          <div slot="dropdown-content">
            <button>Item 1</button>
            <button>Item 2</button>
          </div>
        </aegov-dropdown>
      `);

      const trigger = await page.find('aegov-dropdown .aegov-dropdown-trigger');

      // Open dropdown
      await trigger.click();
      await page.waitForChanges();
      await page.waitForSelector('.aegov-dropdown-portal .aegov-dropdown');
      await new Promise(resolve => setTimeout(resolve, 50));

      // First element should be focused, press Arrow Up to wrap to last
      await page.keyboard.press('ArrowUp');
      await new Promise(resolve => setTimeout(resolve, 20));

      const activeElement = await page.evaluateHandle(() => document.activeElement);
      const text = await page.evaluate(el => el.textContent, activeElement);
      expect(text).toBe('Item 2');
    });

    it('should navigate with Tab key', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-dropdown show-delay="0">
          <button>Open Menu</button>
          <div slot="dropdown-content">
            <button>Item 1</button>
            <button>Item 2</button>
            <button>Item 3</button>
          </div>
        </aegov-dropdown>
      `);

      const trigger = await page.find('aegov-dropdown .aegov-dropdown-trigger');

      // Open dropdown
      await trigger.click();
      await page.waitForChanges();
      await page.waitForSelector('.aegov-dropdown-portal .aegov-dropdown');
      await new Promise(resolve => setTimeout(resolve, 50));

      // Press Tab to move to second element
      await page.keyboard.press('Tab');
      await new Promise(resolve => setTimeout(resolve, 20));

      const activeElement = await page.evaluateHandle(() => document.activeElement);
      const text = await page.evaluate(el => el.textContent, activeElement);
      expect(text).toBe('Item 2');
    });
  });

  describe('events', () => {
    it('should emit aegovDropdownOpen event when opened', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-dropdown show-delay="0">
          <button>Open Menu</button>
          <div slot="dropdown-content">
            <button>Item 1</button>
          </div>
        </aegov-dropdown>
      `);

      const dropdown = await page.find('aegov-dropdown');
      const openSpy = await dropdown.spyOnEvent('aegovDropdownOpen');

      const trigger = await page.find('aegov-dropdown .aegov-dropdown-trigger');
      await trigger.click();
      await page.waitForChanges();

      expect(openSpy).toHaveReceivedEventTimes(1);
    });

    it('should emit aegovDropdownClose event when closed', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-dropdown show-delay="0">
          <button>Open Menu</button>
          <div slot="dropdown-content">
            <button>Item 1</button>
          </div>
        </aegov-dropdown>
      `);

      const dropdown = await page.find('aegov-dropdown');
      const closeSpy = await dropdown.spyOnEvent('aegovDropdownClose');

      const trigger = await page.find('aegov-dropdown .aegov-dropdown-trigger');

      // Open
      await trigger.click();
      await page.waitForChanges();

      // Close
      await trigger.click();
      await page.waitForChanges();

      expect(closeSpy).toHaveReceivedEventTimes(1);
    });
  });

  describe('disabled state', () => {
    it('should not open when disabled', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-dropdown disabled show-delay="0">
          <button>Open Menu</button>
          <div slot="dropdown-content">
            <button>Item 1</button>
          </div>
        </aegov-dropdown>
      `);

      const trigger = await page.find('aegov-dropdown .aegov-dropdown-trigger');

      // Try to open
      await trigger.click();
      await page.waitForChanges();

      // Should remain closed
      const ariaExpanded = await trigger.getAttribute('aria-expanded');
      expect(ariaExpanded).toBe('false');
    });
  });

  describe('positioning', () => {
    it('should accept position prop', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-dropdown position="top">
          <button>Trigger</button>
          <div slot="dropdown-content">Content</div>
        </aegov-dropdown>
      `);

      const element = await page.find('aegov-dropdown');
      const position = await element.getProperty('position');
      expect(position).toBe('top');
    });

    it('should accept align prop', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-dropdown align="center">
          <button>Trigger</button>
          <div slot="dropdown-content">Content</div>
        </aegov-dropdown>
      `);

      const element = await page.find('aegov-dropdown');
      const align = await element.getProperty('align');
      expect(align).toBe('center');
    });

    it('should accept gap prop', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-dropdown gap="16">
          <button>Trigger</button>
          <div slot="dropdown-content">Content</div>
        </aegov-dropdown>
      `);

      const element = await page.find('aegov-dropdown');
      const gap = await element.getProperty('gap');
      expect(gap).toBe(16);
    });

    it('should accept offset prop', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-dropdown offset="10">
          <button>Trigger</button>
          <div slot="dropdown-content">Content</div>
        </aegov-dropdown>
      `);

      const element = await page.find('aegov-dropdown');
      const offset = await element.getProperty('offset');
      expect(offset).toBe(10);
    });
  });
});
