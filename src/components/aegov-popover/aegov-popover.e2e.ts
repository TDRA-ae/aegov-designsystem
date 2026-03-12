import { newE2EPage } from '@stencil/core/testing';

describe('aegov-popover E2E', () => {
  const standardHTML = `
    <aegov-popover show-delay="0" hide-delay="0">
      <button>Trigger</button>
      <div slot="popover-content">
        <p>Popover content</p>
        <a href="#">Link</a>
      </div>
    </aegov-popover>
  `;

  describe('rendering and basic structure', () => {
    it('should render the component', async () => {
      const page = await newE2EPage();
      await page.setContent(standardHTML);

      const element = await page.find('aegov-popover');
      expect(element).toBeTruthy();
    });

    it('should render the trigger element', async () => {
      const page = await newE2EPage();
      await page.setContent(standardHTML);

      const trigger = await page.find('aegov-popover button');
      expect(trigger).toBeTruthy();
      const text = await trigger.getProperty('textContent');
      expect(text).toBe('Trigger');
    });

    it('should render the trigger wrapper with correct class', async () => {
      const page = await newE2EPage();
      await page.setContent(standardHTML);

      const triggerWrapper = await page.find('aegov-popover .aegov-popover-trigger');
      expect(triggerWrapper).toBeTruthy();
    });

    it('should create portal element on component load', async () => {
      const page = await newE2EPage();
      await page.setContent(standardHTML);

      const portal = await page.find('.aegov-popover-portal');
      expect(portal).toBeTruthy();
    });

    it('should not render portal content when closed', async () => {
      const page = await newE2EPage();
      await page.setContent(standardHTML);

      const popover = await page.find('.aegov-popover-portal .aegov-popover');
      expect(popover).toBeFalsy();
    });
  });

  describe('ARIA attributes', () => {
    it('should have aria-haspopup="dialog" on trigger', async () => {
      const page = await newE2EPage();
      await page.setContent(standardHTML);

      const trigger = await page.find('aegov-popover .aegov-popover-trigger');
      const ariaHaspopup = await trigger.getAttribute('aria-haspopup');
      expect(ariaHaspopup).toBe('dialog');
    });

    it('should have aria-expanded="false" when closed', async () => {
      const page = await newE2EPage();
      await page.setContent(standardHTML);

      const trigger = await page.find('aegov-popover .aegov-popover-trigger');
      const ariaExpanded = await trigger.getAttribute('aria-expanded');
      expect(ariaExpanded).toBe('false');
    });

    it('should set aria-expanded="true" when open', async () => {
      const page = await newE2EPage();
      await page.setContent(standardHTML);

      const trigger = await page.find('aegov-popover .aegov-popover-trigger');
      await trigger.click();
      await page.waitForChanges();

      const ariaExpanded = await trigger.getAttribute('aria-expanded');
      expect(ariaExpanded).toBe('true');
    });

    it('should set aria-controls when open', async () => {
      const page = await newE2EPage();
      await page.setContent(standardHTML);

      const trigger = await page.find('aegov-popover .aegov-popover-trigger');
      await trigger.click();
      await page.waitForChanges();

      const ariaControls = await trigger.getAttribute('aria-controls');
      expect(ariaControls).toBeTruthy();
      expect(ariaControls).toContain('aegov-popover');
    });

    it('should remove aria-controls when closed', async () => {
      const page = await newE2EPage();
      await page.setContent(standardHTML);

      const trigger = await page.find('aegov-popover .aegov-popover-trigger');

      // Open
      await trigger.click();
      await page.waitForChanges();
      let ariaControls = await trigger.getAttribute('aria-controls');
      expect(ariaControls).toBeTruthy();

      // Close
      await trigger.click();
      await page.waitForChanges();
      ariaControls = await trigger.getAttribute('aria-controls');
      expect(ariaControls).toBeNull();
    });
  });

  describe('click trigger', () => {
    it('should open popover on trigger click', async () => {
      const page = await newE2EPage();
      await page.setContent(standardHTML);

      const trigger = await page.find('aegov-popover .aegov-popover-trigger');
      await trigger.click();
      await page.waitForChanges();

      const ariaExpanded = await trigger.getAttribute('aria-expanded');
      expect(ariaExpanded).toBe('true');

      await page.waitForSelector('.aegov-popover-portal .aegov-popover');
      const popover = await page.find('.aegov-popover-portal .aegov-popover');
      expect(popover).toBeTruthy();
    });

    it('should close popover on second trigger click', async () => {
      const page = await newE2EPage();
      await page.setContent(standardHTML);

      const trigger = await page.find('aegov-popover .aegov-popover-trigger');

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

    it('should toggle popover open and closed repeatedly', async () => {
      const page = await newE2EPage();
      await page.setContent(standardHTML);

      const trigger = await page.find('aegov-popover .aegov-popover-trigger');

      // Open
      await trigger.click();
      await page.waitForChanges();
      expect(await trigger.getAttribute('aria-expanded')).toBe('true');

      // Close
      await trigger.click();
      await page.waitForChanges();
      expect(await trigger.getAttribute('aria-expanded')).toBe('false');

      // Open again
      await trigger.click();
      await page.waitForChanges();
      expect(await trigger.getAttribute('aria-expanded')).toBe('true');
    });
  });

  describe('portal content', () => {
    it('should render portal content with role="dialog"', async () => {
      const page = await newE2EPage();
      await page.setContent(standardHTML);

      const trigger = await page.find('aegov-popover .aegov-popover-trigger');
      await trigger.click();
      await page.waitForChanges();
      await page.waitForSelector('.aegov-popover-portal .aegov-popover');

      const popover = await page.find('.aegov-popover-portal .aegov-popover');
      const role = await popover.getAttribute('role');
      expect(role).toBe('dialog');
    });

    it('should render portal content with data-state="open"', async () => {
      const page = await newE2EPage();
      await page.setContent(standardHTML);

      const trigger = await page.find('aegov-popover .aegov-popover-trigger');
      await trigger.click();
      await page.waitForChanges();
      await page.waitForSelector('.aegov-popover-portal .aegov-popover');

      const popover = await page.find('.aegov-popover-portal .aegov-popover');
      const dataState = await popover.getAttribute('data-state');
      expect(dataState).toBe('open');
    });

    it('should render the slotted content inside portal', async () => {
      const page = await newE2EPage();
      await page.setContent(standardHTML);

      const trigger = await page.find('aegov-popover .aegov-popover-trigger');
      await trigger.click();
      await page.waitForChanges();
      await page.waitForSelector('.aegov-popover-portal .aegov-popover');

      const content = await page.find('.aegov-popover-portal .aegov-popover p');
      expect(content).toBeTruthy();
      const text = await content.getProperty('textContent');
      expect(text).toBe('Popover content');
    });

    it('should render link inside portal content', async () => {
      const page = await newE2EPage();
      await page.setContent(standardHTML);

      const trigger = await page.find('aegov-popover .aegov-popover-trigger');
      await trigger.click();
      await page.waitForChanges();
      await page.waitForSelector('.aegov-popover-portal .aegov-popover');

      const link = await page.find('.aegov-popover-portal .aegov-popover a');
      expect(link).toBeTruthy();
      const text = await link.getProperty('textContent');
      expect(text).toBe('Link');
    });

    it('should have aria-labelledby pointing to trigger id', async () => {
      const page = await newE2EPage();
      await page.setContent(standardHTML);

      const trigger = await page.find('aegov-popover .aegov-popover-trigger');
      await trigger.click();
      await page.waitForChanges();
      await page.waitForSelector('.aegov-popover-portal .aegov-popover');

      const triggerId = await trigger.getAttribute('id');
      const popover = await page.find('.aegov-popover-portal .aegov-popover');
      const ariaLabelledby = await popover.getAttribute('aria-labelledby');
      expect(ariaLabelledby).toBe(triggerId);
    });

    it('should clear portal content when closed', async () => {
      const page = await newE2EPage();
      await page.setContent(standardHTML);

      const trigger = await page.find('aegov-popover .aegov-popover-trigger');

      // Open
      await trigger.click();
      await page.waitForChanges();
      await page.waitForSelector('.aegov-popover-portal .aegov-popover');
      let popover = await page.find('.aegov-popover-portal .aegov-popover');
      expect(popover).toBeTruthy();

      // Close
      await trigger.click();
      await page.waitForChanges();
      popover = await page.find('.aegov-popover-portal .aegov-popover');
      expect(popover).toBeFalsy();
    });
  });

  describe('arrow element', () => {
    it('should render arrow element inside portal', async () => {
      const page = await newE2EPage();
      await page.setContent(standardHTML);

      const trigger = await page.find('aegov-popover .aegov-popover-trigger');
      await trigger.click();
      await page.waitForChanges();
      await page.waitForSelector('.aegov-popover-portal .aegov-popover');

      const arrow = await page.find('.aegov-popover-portal .aegov-popover .aegov-popover__arrow');
      expect(arrow).toBeTruthy();
    });
  });

  describe('events', () => {
    it('should emit aegovPopoverOpen when opened', async () => {
      const page = await newE2EPage();
      await page.setContent(standardHTML);

      const element = await page.find('aegov-popover');
      const openSpy = await element.spyOnEvent('aegovPopoverOpen');

      const trigger = await page.find('aegov-popover .aegov-popover-trigger');
      await trigger.click();
      await page.waitForChanges();

      expect(openSpy).toHaveReceivedEventTimes(1);
    });

    it('should emit aegovPopoverClose when closed', async () => {
      const page = await newE2EPage();
      await page.setContent(standardHTML);

      const element = await page.find('aegov-popover');
      const closeSpy = await element.spyOnEvent('aegovPopoverClose');

      const trigger = await page.find('aegov-popover .aegov-popover-trigger');

      // Open
      await trigger.click();
      await page.waitForChanges();

      // Close
      await trigger.click();
      await page.waitForChanges();

      expect(closeSpy).toHaveReceivedEventTimes(1);
    });

    it('should emit open event only once per open', async () => {
      const page = await newE2EPage();
      await page.setContent(standardHTML);

      const element = await page.find('aegov-popover');
      const openSpy = await element.spyOnEvent('aegovPopoverOpen');

      const trigger = await page.find('aegov-popover .aegov-popover-trigger');

      // Open
      await trigger.click();
      await page.waitForChanges();

      // Close
      await trigger.click();
      await page.waitForChanges();

      // Open again
      await trigger.click();
      await page.waitForChanges();

      expect(openSpy).toHaveReceivedEventTimes(2);
    });

    it('should emit close event only once per close', async () => {
      const page = await newE2EPage();
      await page.setContent(standardHTML);

      const element = await page.find('aegov-popover');
      const closeSpy = await element.spyOnEvent('aegovPopoverClose');

      const trigger = await page.find('aegov-popover .aegov-popover-trigger');

      // Open then close
      await trigger.click();
      await page.waitForChanges();
      await trigger.click();
      await page.waitForChanges();

      // Open then close again
      await trigger.click();
      await page.waitForChanges();
      await trigger.click();
      await page.waitForChanges();

      expect(closeSpy).toHaveReceivedEventTimes(2);
    });
  });

  describe('escape key', () => {
    it('should close popover on Escape key', async () => {
      const page = await newE2EPage();
      await page.setContent(standardHTML);

      const trigger = await page.find('aegov-popover .aegov-popover-trigger');

      // Open
      await trigger.click();
      await page.waitForChanges();
      let ariaExpanded = await trigger.getAttribute('aria-expanded');
      expect(ariaExpanded).toBe('true');

      // Press Escape
      await page.keyboard.press('Escape');
      await page.waitForChanges();

      ariaExpanded = await trigger.getAttribute('aria-expanded');
      expect(ariaExpanded).toBe('false');
    });

    it('should emit close event on Escape', async () => {
      const page = await newE2EPage();
      await page.setContent(standardHTML);

      const element = await page.find('aegov-popover');
      const closeSpy = await element.spyOnEvent('aegovPopoverClose');

      const trigger = await page.find('aegov-popover .aegov-popover-trigger');

      // Open
      await trigger.click();
      await page.waitForChanges();

      // Escape
      await page.keyboard.press('Escape');
      await page.waitForChanges();

      expect(closeSpy).toHaveReceivedEventTimes(1);
    });

    it('should not do anything on Escape when popover is closed', async () => {
      const page = await newE2EPage();
      await page.setContent(standardHTML);

      const element = await page.find('aegov-popover');
      const closeSpy = await element.spyOnEvent('aegovPopoverClose');

      // Press Escape while closed
      await page.keyboard.press('Escape');
      await page.waitForChanges();

      expect(closeSpy).not.toHaveReceivedEvent();
    });
  });

  describe('outside click', () => {
    it('should close popover when clicking outside', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <div>
          ${standardHTML}
          <button id="outside">Outside Button</button>
        </div>
      `);

      const trigger = await page.find('aegov-popover .aegov-popover-trigger');
      const outside = await page.find('#outside');

      // Open
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

    it('should emit close event on outside click', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <div>
          ${standardHTML}
          <button id="outside">Outside Button</button>
        </div>
      `);

      const element = await page.find('aegov-popover');
      const closeSpy = await element.spyOnEvent('aegovPopoverClose');

      const trigger = await page.find('aegov-popover .aegov-popover-trigger');
      const outside = await page.find('#outside');

      // Open
      await trigger.click();
      await page.waitForChanges();

      // Click outside
      await outside.click();
      await page.waitForChanges();

      expect(closeSpy).toHaveReceivedEventTimes(1);
    });

    it('should not close when clicking inside the portal content', async () => {
      const page = await newE2EPage();
      await page.setContent(standardHTML);

      const trigger = await page.find('aegov-popover .aegov-popover-trigger');

      // Open
      await trigger.click();
      await page.waitForChanges();
      await page.waitForSelector('.aegov-popover-portal .aegov-popover');

      // Click inside portal content
      const portalContent = await page.find('.aegov-popover-portal .aegov-popover p');
      await portalContent.click();
      await page.waitForChanges();

      // Should still be open
      const ariaExpanded = await trigger.getAttribute('aria-expanded');
      expect(ariaExpanded).toBe('true');
    });
  });

  describe('disabled state', () => {
    it('should not open when disabled', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-popover disabled show-delay="0">
          <button>Trigger</button>
          <div slot="popover-content">
            <p>Content</p>
          </div>
        </aegov-popover>
      `);

      const trigger = await page.find('aegov-popover .aegov-popover-trigger');
      await trigger.click();
      await page.waitForChanges();

      const ariaExpanded = await trigger.getAttribute('aria-expanded');
      expect(ariaExpanded).toBe('false');
    });

    it('should not emit open event when disabled', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-popover disabled show-delay="0">
          <button>Trigger</button>
          <div slot="popover-content">
            <p>Content</p>
          </div>
        </aegov-popover>
      `);

      const element = await page.find('aegov-popover');
      const openSpy = await element.spyOnEvent('aegovPopoverOpen');

      const trigger = await page.find('aegov-popover .aegov-popover-trigger');
      await trigger.click();
      await page.waitForChanges();

      expect(openSpy).not.toHaveReceivedEvent();
    });

    it('should not create portal content when disabled and clicked', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-popover disabled show-delay="0">
          <button>Trigger</button>
          <div slot="popover-content">
            <p>Content</p>
          </div>
        </aegov-popover>
      `);

      const trigger = await page.find('aegov-popover .aegov-popover-trigger');
      await trigger.click();
      await page.waitForChanges();

      const popover = await page.find('.aegov-popover-portal .aegov-popover');
      expect(popover).toBeFalsy();
    });
  });

  describe('singleton behavior', () => {
    it('should close first popover when opening a second', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-popover id="popover1" show-delay="0">
          <button>Trigger 1</button>
          <div slot="popover-content"><p>Content 1</p></div>
        </aegov-popover>
        <aegov-popover id="popover2" show-delay="0">
          <button>Trigger 2</button>
          <div slot="popover-content"><p>Content 2</p></div>
        </aegov-popover>
      `);

      const trigger1 = await page.find('#popover1 .aegov-popover-trigger');
      const trigger2 = await page.find('#popover2 .aegov-popover-trigger');

      // Open first popover
      await trigger1.click();
      await page.waitForChanges();
      let aria1 = await trigger1.getAttribute('aria-expanded');
      expect(aria1).toBe('true');

      // Open second popover
      await trigger2.click();
      await page.waitForChanges();

      // First should be closed, second should be open
      aria1 = await trigger1.getAttribute('aria-expanded');
      const aria2 = await trigger2.getAttribute('aria-expanded');
      expect(aria1).toBe('false');
      expect(aria2).toBe('true');
    });

    it('should emit close event on first popover when second opens', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-popover id="popover1" show-delay="0">
          <button>Trigger 1</button>
          <div slot="popover-content"><p>Content 1</p></div>
        </aegov-popover>
        <aegov-popover id="popover2" show-delay="0">
          <button>Trigger 2</button>
          <div slot="popover-content"><p>Content 2</p></div>
        </aegov-popover>
      `);

      const popover1 = await page.find('#popover1');
      const closeSpy1 = await popover1.spyOnEvent('aegovPopoverClose');

      const trigger1 = await page.find('#popover1 .aegov-popover-trigger');
      const trigger2 = await page.find('#popover2 .aegov-popover-trigger');

      // Open first
      await trigger1.click();
      await page.waitForChanges();

      // Open second (closes first)
      await trigger2.click();
      await page.waitForChanges();

      expect(closeSpy1).toHaveReceivedEventTimes(1);
    });

    it('should only have one portal with content at a time', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-popover id="popover1" show-delay="0">
          <button>Trigger 1</button>
          <div slot="popover-content"><p>Content 1</p></div>
        </aegov-popover>
        <aegov-popover id="popover2" show-delay="0">
          <button>Trigger 2</button>
          <div slot="popover-content"><p>Content 2</p></div>
        </aegov-popover>
      `);

      const trigger1 = await page.find('#popover1 .aegov-popover-trigger');
      const trigger2 = await page.find('#popover2 .aegov-popover-trigger');

      // Open first
      await trigger1.click();
      await page.waitForChanges();
      await page.waitForSelector('.aegov-popover-portal .aegov-popover');

      // Open second
      await trigger2.click();
      await page.waitForChanges();
      await new Promise(resolve => setTimeout(resolve, 50));

      // Only one popover dialog should be present
      const popovers = await page.findAll('.aegov-popover-portal .aegov-popover');
      expect(popovers.length).toBe(1);
    });
  });

  describe('hover trigger', () => {
    it('should open popover on hover', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-popover trigger-type="hover" show-delay="0">
          <button>Hover Me</button>
          <div slot="popover-content"><p>Hover content</p></div>
        </aegov-popover>
      `);

      const trigger = await page.find('aegov-popover .aegov-popover-trigger');

      await trigger.hover();
      await page.waitForChanges();

      const ariaExpanded = await trigger.getAttribute('aria-expanded');
      expect(ariaExpanded).toBe('true');
    });

    it('should open via hover and emit open event', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-popover trigger-type="hover" show-delay="0">
          <button>Hover Me</button>
          <div slot="popover-content"><p>Hover content</p></div>
        </aegov-popover>
      `);

      const element = await page.find('aegov-popover');
      const openSpy = await element.spyOnEvent('aegovPopoverOpen');

      const trigger = await page.find('aegov-popover .aegov-popover-trigger');
      await trigger.hover();
      await page.waitForChanges();

      expect(openSpy).toHaveReceivedEventTimes(1);
    });

    it('should not open on hover when disabled', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-popover trigger-type="hover" disabled show-delay="0">
          <button>Hover Me</button>
          <div slot="popover-content"><p>Hover content</p></div>
        </aegov-popover>
      `);

      const trigger = await page.find('aegov-popover .aegov-popover-trigger');

      await trigger.hover();
      await page.waitForChanges();

      const ariaExpanded = await trigger.getAttribute('aria-expanded');
      expect(ariaExpanded).toBe('false');
    });
  });

  describe('keyboard navigation', () => {
    it('should navigate with Arrow Down key', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-popover show-delay="0">
          <button>Trigger</button>
          <div slot="popover-content">
            <button>Item 1</button>
            <button>Item 2</button>
            <button>Item 3</button>
          </div>
        </aegov-popover>
      `);

      const trigger = await page.find('aegov-popover .aegov-popover-trigger');

      // Open popover
      await trigger.click();
      await page.waitForChanges();
      await page.waitForSelector('.aegov-popover-portal .aegov-popover');
      await new Promise(resolve => setTimeout(resolve, 50));

      // Arrow Down should move to next focusable element
      await page.keyboard.press('ArrowDown');
      await new Promise(resolve => setTimeout(resolve, 20));

      const activeElement = await page.evaluateHandle(() => document.activeElement);
      const text = await page.evaluate(el => el.textContent, activeElement);
      expect(text).toBe('Item 2');
    });

    it('should navigate backwards with Arrow Up key', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-popover show-delay="0">
          <button>Trigger</button>
          <div slot="popover-content">
            <button>Item 1</button>
            <button>Item 2</button>
          </div>
        </aegov-popover>
      `);

      const trigger = await page.find('aegov-popover .aegov-popover-trigger');

      // Open popover
      await trigger.click();
      await page.waitForChanges();
      await page.waitForSelector('.aegov-popover-portal .aegov-popover');
      await new Promise(resolve => setTimeout(resolve, 50));

      // Arrow Up from first item should wrap to last
      await page.keyboard.press('ArrowUp');
      await new Promise(resolve => setTimeout(resolve, 20));

      const activeElement = await page.evaluateHandle(() => document.activeElement);
      const text = await page.evaluate(el => el.textContent, activeElement);
      expect(text).toBe('Item 2');
    });

    it('should navigate with Tab key', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-popover show-delay="0">
          <button>Trigger</button>
          <div slot="popover-content">
            <button>Item 1</button>
            <button>Item 2</button>
            <button>Item 3</button>
          </div>
        </aegov-popover>
      `);

      const trigger = await page.find('aegov-popover .aegov-popover-trigger');

      // Open popover
      await trigger.click();
      await page.waitForChanges();
      await page.waitForSelector('.aegov-popover-portal .aegov-popover');
      await new Promise(resolve => setTimeout(resolve, 50));

      // Tab should move to next element
      await page.keyboard.press('Tab');
      await new Promise(resolve => setTimeout(resolve, 20));

      const activeElement = await page.evaluateHandle(() => document.activeElement);
      const text = await page.evaluate(el => el.textContent, activeElement);
      expect(text).toBe('Item 2');
    });
  });

  describe('focus management', () => {
    it('should allow keyboard navigation to focusable elements in popover', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-popover show-delay="0">
          <button>Trigger</button>
          <div slot="popover-content">
            <button>Item 1</button>
            <button>Item 2</button>
          </div>
        </aegov-popover>
      `);

      const trigger = await page.find('aegov-popover .aegov-popover-trigger');

      // Open popover
      await trigger.click();
      await page.waitForChanges();
      await page.waitForSelector('.aegov-popover-portal .aegov-popover');
      await new Promise(resolve => setTimeout(resolve, 50));

      // Verify portal contains focusable buttons
      const buttons = await page.findAll('.aegov-popover-portal .aegov-popover button');
      expect(buttons.length).toBe(2);
    });

    it('should return focus to trigger when popover closes', async () => {
      const page = await newE2EPage();
      await page.setContent(standardHTML);

      const trigger = await page.find('aegov-popover .aegov-popover-trigger');

      // Open
      await trigger.click();
      await page.waitForChanges();
      await page.waitForSelector('.aegov-popover-portal .aegov-popover');
      await new Promise(resolve => setTimeout(resolve, 50));

      // Close via Escape
      await page.keyboard.press('Escape');
      await page.waitForChanges();
      await new Promise(resolve => setTimeout(resolve, 50));

      // Focus should return to the trigger's child button
      const activeTag = await page.evaluate(() => document.activeElement?.tagName.toLowerCase());
      expect(activeTag).toBe('button');
    });
  });

  describe('positioning props', () => {
    it('should accept position prop', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-popover position="top">
          <button>Trigger</button>
          <div slot="popover-content"><p>Content</p></div>
        </aegov-popover>
      `);

      const element = await page.find('aegov-popover');
      const position = await element.getProperty('position');
      expect(position).toBe('top');
    });

    it('should accept align prop', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-popover align="start">
          <button>Trigger</button>
          <div slot="popover-content"><p>Content</p></div>
        </aegov-popover>
      `);

      const element = await page.find('aegov-popover');
      const align = await element.getProperty('align');
      expect(align).toBe('start');
    });

    it('should accept gap prop', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-popover gap="20">
          <button>Trigger</button>
          <div slot="popover-content"><p>Content</p></div>
        </aegov-popover>
      `);

      const element = await page.find('aegov-popover');
      const gap = await element.getProperty('gap');
      expect(gap).toBe(20);
    });

    it('should accept offset prop', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-popover offset="15">
          <button>Trigger</button>
          <div slot="popover-content"><p>Content</p></div>
        </aegov-popover>
      `);

      const element = await page.find('aegov-popover');
      const offset = await element.getProperty('offset');
      expect(offset).toBe(15);
    });

    it('should set data-position on the portal popover element', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-popover position="bottom" show-delay="0">
          <button>Trigger</button>
          <div slot="popover-content"><p>Content</p></div>
        </aegov-popover>
      `);

      const trigger = await page.find('aegov-popover .aegov-popover-trigger');
      await trigger.click();
      await page.waitForChanges();
      await page.waitForSelector('.aegov-popover-portal .aegov-popover');

      const popover = await page.find('.aegov-popover-portal .aegov-popover');
      const dataPosition = await popover.getAttribute('data-position');
      expect(dataPosition).toBeTruthy();
    });

    it('should default to position bottom', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-popover>
          <button>Trigger</button>
          <div slot="popover-content"><p>Content</p></div>
        </aegov-popover>
      `);

      const element = await page.find('aegov-popover');
      const position = await element.getProperty('position');
      expect(position).toBe('bottom');
    });

    it('should default to align center', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-popover>
          <button>Trigger</button>
          <div slot="popover-content"><p>Content</p></div>
        </aegov-popover>
      `);

      const element = await page.find('aegov-popover');
      const align = await element.getProperty('align');
      expect(align).toBe('center');
    });
  });

  describe('delay props', () => {
    it('should accept show-delay prop', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-popover show-delay="500">
          <button>Trigger</button>
          <div slot="popover-content"><p>Content</p></div>
        </aegov-popover>
      `);

      const element = await page.find('aegov-popover');
      const showDelay = await element.getProperty('showDelay');
      expect(showDelay).toBe(500);
    });

    it('should accept hide-delay prop', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-popover hide-delay="300">
          <button>Trigger</button>
          <div slot="popover-content"><p>Content</p></div>
        </aegov-popover>
      `);

      const element = await page.find('aegov-popover');
      const hideDelay = await element.getProperty('hideDelay');
      expect(hideDelay).toBe(300);
    });
  });

  describe('trigger-type prop', () => {
    it('should default to click trigger', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-popover>
          <button>Trigger</button>
          <div slot="popover-content"><p>Content</p></div>
        </aegov-popover>
      `);

      const element = await page.find('aegov-popover');
      const triggerType = await element.getProperty('triggerType');
      expect(triggerType).toBe('click');
    });

    it('should accept hover trigger type', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-popover trigger-type="hover">
          <button>Trigger</button>
          <div slot="popover-content"><p>Content</p></div>
        </aegov-popover>
      `);

      const element = await page.find('aegov-popover');
      const triggerType = await element.getProperty('triggerType');
      expect(triggerType).toBe('hover');
    });
  });

  describe('no content slot', () => {
    it('should not create portal content if no popover-content slot is provided', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-popover show-delay="0">
          <button>Trigger</button>
        </aegov-popover>
      `);

      const trigger = await page.find('aegov-popover .aegov-popover-trigger');
      await trigger.click();
      await page.waitForChanges();

      const popover = await page.find('.aegov-popover-portal .aegov-popover');
      expect(popover).toBeFalsy();
    });
  });

  describe('disconnection cleanup', () => {
    it('should remove portal when component is removed from DOM', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <div id="container">
          <aegov-popover show-delay="0">
            <button>Trigger</button>
            <div slot="popover-content"><p>Content</p></div>
          </aegov-popover>
        </div>
      `);

      // Verify portal exists
      let portal = await page.find('.aegov-popover-portal');
      expect(portal).toBeTruthy();

      // Remove the component from DOM
      await page.evaluate(() => {
        const container = document.getElementById('container');
        container.innerHTML = '';
      });
      await page.waitForChanges();

      // Portal should be removed
      portal = await page.find('.aegov-popover-portal');
      expect(portal).toBeFalsy();
    });
  });
});
