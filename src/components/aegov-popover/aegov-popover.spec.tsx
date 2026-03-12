import { newSpecPage } from '@stencil/core/testing';
import { AegovPopover } from './aegov-popover';

describe('aegov-popover', () => {
  describe('rendering', () => {
    it('should render with default props', async () => {
      const page = await newSpecPage({
        components: [AegovPopover],
        html: `
          <aegov-popover>
            <button>Trigger</button>
            <div slot="popover-content">Content</div>
          </aegov-popover>
        `,
      });

      const trigger = page.root.querySelector('.aegov-popover-trigger');
      expect(trigger).toBeTruthy();
      expect(trigger.getAttribute('aria-haspopup')).toBe('dialog');
      expect(trigger.getAttribute('aria-expanded')).toBe('false');
      expect(trigger.id).toBeTruthy();
      expect(trigger.id).toContain('aegov-popover');
      expect(trigger.querySelector('button').textContent).toBe('Trigger');
    });

    it('should render trigger element via default slot', async () => {
      const page = await newSpecPage({
        components: [AegovPopover],
        html: `
          <aegov-popover>
            <button class="custom-trigger">Click me</button>
            <div slot="popover-content">Panel</div>
          </aegov-popover>
        `,
      });

      const trigger = page.root.querySelector('button.custom-trigger');
      expect(trigger).toBeTruthy();
      expect(trigger.textContent).toBe('Click me');
    });

    it('should hide content slot in main component', async () => {
      const page = await newSpecPage({
        components: [AegovPopover],
        html: `
          <aegov-popover>
            <button>Trigger</button>
            <div slot="popover-content">Content</div>
          </aegov-popover>
        `,
      });

      const hiddenSlot = page.root.querySelector('div[style*="display: none"]');
      expect(hiddenSlot).toBeTruthy();
    });
  });

  describe('props', () => {
    it('should have default triggerType of "click"', async () => {
      const page = await newSpecPage({
        components: [AegovPopover],
        html: `<aegov-popover><button>Trigger</button></aegov-popover>`,
      });

      expect(page.rootInstance.triggerType).toBe('click');
    });

    it('should have default position of "bottom"', async () => {
      const page = await newSpecPage({
        components: [AegovPopover],
        html: `<aegov-popover><button>Trigger</button></aegov-popover>`,
      });

      expect(page.rootInstance.position).toBe('bottom');
    });

    it('should have default align of "center"', async () => {
      const page = await newSpecPage({
        components: [AegovPopover],
        html: `<aegov-popover><button>Trigger</button></aegov-popover>`,
      });

      expect(page.rootInstance.align).toBe('center');
    });

    it('should have default gap of 10', async () => {
      const page = await newSpecPage({
        components: [AegovPopover],
        html: `<aegov-popover><button>Trigger</button></aegov-popover>`,
      });

      expect(page.rootInstance.gap).toBe(10);
    });

    it('should have default offset of 0', async () => {
      const page = await newSpecPage({
        components: [AegovPopover],
        html: `<aegov-popover><button>Trigger</button></aegov-popover>`,
      });

      expect(page.rootInstance.offset).toBe(0);
    });

    it('should have default showDelay of 200', async () => {
      const page = await newSpecPage({
        components: [AegovPopover],
        html: `<aegov-popover><button>Trigger</button></aegov-popover>`,
      });

      expect(page.rootInstance.showDelay).toBe(200);
    });

    it('should have default hideDelay of 0', async () => {
      const page = await newSpecPage({
        components: [AegovPopover],
        html: `<aegov-popover><button>Trigger</button></aegov-popover>`,
      });

      expect(page.rootInstance.hideDelay).toBe(0);
    });

    it('should have default disabled of false', async () => {
      const page = await newSpecPage({
        components: [AegovPopover],
        html: `<aegov-popover><button>Trigger</button></aegov-popover>`,
      });

      expect(page.rootInstance.disabled).toBe(false);
    });

    it('should accept custom triggerType', async () => {
      const page = await newSpecPage({
        components: [AegovPopover],
        html: `<aegov-popover trigger-type="hover"><button>Trigger</button></aegov-popover>`,
      });

      expect(page.rootInstance.triggerType).toBe('hover');
    });

    it('should accept custom position', async () => {
      const page = await newSpecPage({
        components: [AegovPopover],
        html: `<aegov-popover position="top"><button>Trigger</button></aegov-popover>`,
      });

      expect(page.rootInstance.position).toBe('top');
    });

    it('should accept custom align', async () => {
      const page = await newSpecPage({
        components: [AegovPopover],
        html: `<aegov-popover align="start"><button>Trigger</button></aegov-popover>`,
      });

      expect(page.rootInstance.align).toBe('start');
    });

    it('should accept custom gap', async () => {
      const page = await newSpecPage({
        components: [AegovPopover],
        html: `<aegov-popover gap="20"><button>Trigger</button></aegov-popover>`,
      });

      expect(page.rootInstance.gap).toBe(20);
    });

    it('should accept custom offset', async () => {
      const page = await newSpecPage({
        components: [AegovPopover],
        html: `<aegov-popover offset="15"><button>Trigger</button></aegov-popover>`,
      });

      expect(page.rootInstance.offset).toBe(15);
    });

    it('should accept custom showDelay', async () => {
      const page = await newSpecPage({
        components: [AegovPopover],
        html: `<aegov-popover show-delay="500"><button>Trigger</button></aegov-popover>`,
      });

      expect(page.rootInstance.showDelay).toBe(500);
    });

    it('should accept custom hideDelay', async () => {
      const page = await newSpecPage({
        components: [AegovPopover],
        html: `<aegov-popover hide-delay="300"><button>Trigger</button></aegov-popover>`,
      });

      expect(page.rootInstance.hideDelay).toBe(300);
    });

    it('should accept disabled prop', async () => {
      const page = await newSpecPage({
        components: [AegovPopover],
        html: `<aegov-popover disabled><button>Trigger</button></aegov-popover>`,
      });

      expect(page.rootInstance.disabled).toBe(true);
    });
  });

  describe('state management', () => {
    it('should start with closed state', async () => {
      const page = await newSpecPage({
        components: [AegovPopover],
        html: `
          <aegov-popover>
            <button>Trigger</button>
            <div slot="popover-content">Content</div>
          </aegov-popover>
        `,
      });

      expect(page.rootInstance.isOpen).toBe(false);
    });

    it('should update aria-expanded when state changes', async () => {
      const page = await newSpecPage({
        components: [AegovPopover],
        html: `
          <aegov-popover>
            <button>Trigger</button>
            <div slot="popover-content">Content</div>
          </aegov-popover>
        `,
      });

      const trigger = page.root.querySelector('.aegov-popover-trigger');
      expect(trigger.getAttribute('aria-expanded')).toBe('false');

      page.rootInstance.isOpen = true;
      await page.waitForChanges();

      expect(trigger.getAttribute('aria-expanded')).toBe('true');
    });

    it('should set aria-controls when open', async () => {
      const page = await newSpecPage({
        components: [AegovPopover],
        html: `
          <aegov-popover>
            <button>Trigger</button>
            <div slot="popover-content">Content</div>
          </aegov-popover>
        `,
      });

      const trigger = page.root.querySelector('.aegov-popover-trigger');
      expect(trigger.getAttribute('aria-controls')).toBeNull();

      page.rootInstance.isOpen = true;
      await page.waitForChanges();

      expect(trigger.getAttribute('aria-controls')).toBeTruthy();
    });

    it('should remove aria-controls when closed', async () => {
      const page = await newSpecPage({
        components: [AegovPopover],
        html: `
          <aegov-popover>
            <button>Trigger</button>
            <div slot="popover-content">Content</div>
          </aegov-popover>
        `,
      });

      const trigger = page.root.querySelector('.aegov-popover-trigger');

      page.rootInstance.isOpen = true;
      await page.waitForChanges();
      expect(trigger.getAttribute('aria-controls')).toBeTruthy();

      page.rootInstance.isOpen = false;
      await page.waitForChanges();
      expect(trigger.getAttribute('aria-controls')).toBeNull();
    });

    it('should detect content slot', async () => {
      const page = await newSpecPage({
        components: [AegovPopover],
        html: `
          <aegov-popover>
            <button>Trigger</button>
            <div slot="popover-content">Content</div>
          </aegov-popover>
        `,
      });

      expect(page.rootInstance.hasContentSlot).toBe(true);
    });

    it('should detect missing content slot', async () => {
      const page = await newSpecPage({
        components: [AegovPopover],
        html: `
          <aegov-popover>
            <button>Trigger</button>
          </aegov-popover>
        `,
      });

      expect(page.rootInstance.hasContentSlot).toBe(false);
    });
  });

  describe('events', () => {
    it('should emit aegovPopoverOpen when opened', async () => {
      const page = await newSpecPage({
        components: [AegovPopover],
        html: `
          <aegov-popover>
            <button>Trigger</button>
            <div slot="popover-content">Content</div>
          </aegov-popover>
        `,
      });

      const openSpy = jest.fn();
      page.root.addEventListener('aegovPopoverOpen', openSpy);

      page.rootInstance.isOpen = true;
      await page.waitForChanges();

      expect(openSpy).toHaveBeenCalledTimes(1);
    });

    it('should emit aegovPopoverClose when closed', async () => {
      const page = await newSpecPage({
        components: [AegovPopover],
        html: `
          <aegov-popover>
            <button>Trigger</button>
            <div slot="popover-content">Content</div>
          </aegov-popover>
        `,
      });

      // Open first
      page.rootInstance.isOpen = true;
      await page.waitForChanges();

      const closeSpy = jest.fn();
      page.root.addEventListener('aegovPopoverClose', closeSpy);

      // Close
      page.rootInstance.isOpen = false;
      await page.waitForChanges();

      expect(closeSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('accessibility', () => {
    it('should have aria-haspopup="dialog" attribute', async () => {
      const page = await newSpecPage({
        components: [AegovPopover],
        html: `
          <aegov-popover>
            <button>Trigger</button>
            <div slot="popover-content">Content</div>
          </aegov-popover>
        `,
      });

      const trigger = page.root.querySelector('.aegov-popover-trigger');
      expect(trigger.getAttribute('aria-haspopup')).toBe('dialog');
    });

    it('should generate unique popover ID', async () => {
      const page = await newSpecPage({
        components: [AegovPopover],
        html: `
          <aegov-popover>
            <button>Trigger</button>
            <div slot="popover-content">Content</div>
          </aegov-popover>
        `,
      });

      expect(page.rootInstance.popoverId).toBeTruthy();
      expect(page.rootInstance.popoverId).toContain('popover-');
    });

    it('should generate trigger ID based on popover ID', async () => {
      const page = await newSpecPage({
        components: [AegovPopover],
        html: `
          <aegov-popover>
            <button>Trigger</button>
            <div slot="popover-content">Content</div>
          </aegov-popover>
        `,
      });

      expect(page.rootInstance.triggerId).toBeTruthy();
      expect(page.rootInstance.triggerId).toContain('-trigger');
      expect(page.rootInstance.triggerId).toContain(page.rootInstance.popoverId);
    });

    it('should set id on trigger element', async () => {
      const page = await newSpecPage({
        components: [AegovPopover],
        html: `
          <aegov-popover>
            <button>Trigger</button>
            <div slot="popover-content">Content</div>
          </aegov-popover>
        `,
      });

      const trigger = page.root.querySelector('.aegov-popover-trigger');
      expect(trigger.id).toBeTruthy();
      expect(trigger.id).toContain('aegov-popover');
      expect(trigger.id).toContain('-trigger');
    });

    it('should set aria-labelledby on portal container linking to trigger id', async () => {
      const page = await newSpecPage({
        components: [AegovPopover],
        html: `
          <aegov-popover>
            <button>Trigger</button>
            <div slot="popover-content">Content</div>
          </aegov-popover>
        `,
      });

      const trigger = page.root.querySelector('.aegov-popover-trigger');
      const triggerId = trigger.id;

      page.rootInstance.isOpen = true;
      await page.waitForChanges();

      const portal = document.querySelector('.aegov-popover-portal');
      const dialog = portal?.querySelector('.aegov-popover');
      expect(dialog).toBeTruthy();
      expect(dialog.getAttribute('aria-labelledby')).toBe(triggerId);
    });

    it('should set role="dialog" on portal container', async () => {
      const page = await newSpecPage({
        components: [AegovPopover],
        html: `
          <aegov-popover>
            <button>Trigger</button>
            <div slot="popover-content">Content</div>
          </aegov-popover>
        `,
      });

      page.rootInstance.isOpen = true;
      await page.waitForChanges();

      const portal = document.querySelector('.aegov-popover-portal');
      const dialog = portal?.querySelector('.aegov-popover');
      expect(dialog.getAttribute('role')).toBe('dialog');
    });
  });

  describe('portal content', () => {
    it('should create portal element on componentDidLoad', async () => {
      const page = await newSpecPage({
        components: [AegovPopover],
        html: `
          <aegov-popover>
            <button>Trigger</button>
            <div slot="popover-content">Content</div>
          </aegov-popover>
        `,
      });

      expect(page.rootInstance.portalElement).toBeDefined();
    });

    it('should move content slot to portal when opened', async () => {
      const page = await newSpecPage({
        components: [AegovPopover],
        html: `
          <aegov-popover>
            <button>Trigger</button>
            <div slot="popover-content"><p>Popover text</p></div>
          </aegov-popover>
        `,
      });

      page.rootInstance.isOpen = true;
      await page.waitForChanges();

      const portal = document.querySelector('.aegov-popover-portal');
      const content = portal?.querySelector('.aegov-popover p');
      expect(content).toBeTruthy();
      expect(content.textContent).toBe('Popover text');
    });

    it('should create arrow element in portal when opened', async () => {
      const page = await newSpecPage({
        components: [AegovPopover],
        html: `
          <aegov-popover>
            <button>Trigger</button>
            <div slot="popover-content">Content</div>
          </aegov-popover>
        `,
      });

      page.rootInstance.isOpen = true;
      await page.waitForChanges();

      const portal = document.querySelector('.aegov-popover-portal');
      const arrow = portal?.querySelector('.aegov-popover__arrow');
      expect(arrow).toBeTruthy();
    });

    it('should inject styles into portal', async () => {
      const page = await newSpecPage({
        components: [AegovPopover],
        html: `
          <aegov-popover>
            <button>Trigger</button>
            <div slot="popover-content">Content</div>
          </aegov-popover>
        `,
      });

      page.rootInstance.isOpen = true;
      await page.waitForChanges();

      const portal = document.querySelector('.aegov-popover-portal');
      const style = portal?.querySelector('style');
      expect(style).toBeTruthy();
      expect(style.textContent).toContain('.aegov-popover-portal');
    });

    it('should set data-state="open" on portal container', async () => {
      const page = await newSpecPage({
        components: [AegovPopover],
        html: `
          <aegov-popover>
            <button>Trigger</button>
            <div slot="popover-content">Content</div>
          </aegov-popover>
        `,
      });

      page.rootInstance.isOpen = true;
      await page.waitForChanges();

      const portal = document.querySelector('.aegov-popover-portal');
      const dialog = portal?.querySelector('.aegov-popover');
      expect(dialog.getAttribute('data-state')).toBe('open');
    });

    it('should set data-position on portal container', async () => {
      const page = await newSpecPage({
        components: [AegovPopover],
        html: `
          <aegov-popover position="top">
            <button>Trigger</button>
            <div slot="popover-content">Content</div>
          </aegov-popover>
        `,
      });

      page.rootInstance.isOpen = true;
      await page.waitForChanges();

      const portal = document.querySelector('.aegov-popover-portal');
      const dialog = portal?.querySelector('.aegov-popover');
      expect(dialog.getAttribute('data-position')).toBe('top');
    });

    it('should clear portal content when closed', async () => {
      const page = await newSpecPage({
        components: [AegovPopover],
        html: `
          <aegov-popover>
            <button>Trigger</button>
            <div slot="popover-content">Content</div>
          </aegov-popover>
        `,
      });

      page.rootInstance.isOpen = true;
      await page.waitForChanges();

      page.rootInstance.isOpen = false;
      await page.waitForChanges();

      const portal = document.querySelector('.aegov-popover-portal');
      expect(portal?.querySelector('.aegov-popover')).toBeNull();
    });

    it('should set popover ID on portal container', async () => {
      const page = await newSpecPage({
        components: [AegovPopover],
        html: `
          <aegov-popover>
            <button>Trigger</button>
            <div slot="popover-content">Content</div>
          </aegov-popover>
        `,
      });

      const popoverId = page.rootInstance.popoverId;

      page.rootInstance.isOpen = true;
      await page.waitForChanges();

      const portal = document.querySelector('.aegov-popover-portal');
      const dialog = portal?.querySelector('.aegov-popover');
      expect(dialog.id).toBe(popoverId);
    });
  });

  describe('positioning', () => {
    it('should support all position values', async () => {
      const positions = ['top', 'right', 'bottom', 'left'];

      for (const position of positions) {
        const page = await newSpecPage({
          components: [AegovPopover],
          html: `<aegov-popover position="${position}"><button>Trigger</button></aegov-popover>`,
        });

        expect(page.rootInstance.position).toBe(position);
      }
    });

    it('should support all align values', async () => {
      const alignments = ['start', 'center', 'end'];

      for (const align of alignments) {
        const page = await newSpecPage({
          components: [AegovPopover],
          html: `<aegov-popover align="${align}"><button>Trigger</button></aegov-popover>`,
        });

        expect(page.rootInstance.align).toBe(align);
      }
    });
  });

  describe('trigger types', () => {
    it('should support click trigger', async () => {
      const page = await newSpecPage({
        components: [AegovPopover],
        html: `
          <aegov-popover trigger-type="click">
            <button>Trigger</button>
            <div slot="popover-content">Content</div>
          </aegov-popover>
        `,
      });

      expect(page.rootInstance.triggerType).toBe('click');
    });

    it('should support hover trigger', async () => {
      const page = await newSpecPage({
        components: [AegovPopover],
        html: `
          <aegov-popover trigger-type="hover">
            <button>Trigger</button>
            <div slot="popover-content">Content</div>
          </aegov-popover>
        `,
      });

      expect(page.rootInstance.triggerType).toBe('hover');
    });
  });

  describe('singleton pattern', () => {
    it('should emit close event when another popover opens', async () => {
      const page = await newSpecPage({
        components: [AegovPopover],
        html: `
          <aegov-popover>
            <button>Trigger</button>
            <div slot="popover-content">Content</div>
          </aegov-popover>
        `,
      });

      const closeSpy = jest.fn();
      page.root.addEventListener('aegovPopoverClose', closeSpy);

      // Open popover
      page.rootInstance.isOpen = true;
      await page.waitForChanges();

      // Close popover (simulates another popover opening)
      page.rootInstance.isOpen = false;
      await page.waitForChanges();

      expect(closeSpy).toHaveBeenCalledTimes(1);
    });

    it('should have closePopover public method', async () => {
      const page = await newSpecPage({
        components: [AegovPopover],
        html: `
          <aegov-popover>
            <button>Trigger</button>
            <div slot="popover-content">Content</div>
          </aegov-popover>
        `,
      });

      // Open popover
      page.rootInstance.isOpen = true;
      await page.waitForChanges();
      expect(page.rootInstance.isOpen).toBe(true);

      // Close via public method
      page.rootInstance.closePopover();
      await page.waitForChanges();
      expect(page.rootInstance.isOpen).toBe(false);
    });
  });

  describe('disabled state', () => {
    it('should not open when disabled via click trigger', async () => {
      const page = await newSpecPage({
        components: [AegovPopover],
        html: `
          <aegov-popover disabled trigger-type="click">
            <button>Trigger</button>
            <div slot="popover-content">Content</div>
          </aegov-popover>
        `,
      });

      const trigger = page.root.querySelector('.aegov-popover-trigger') as HTMLElement;
      trigger.click();
      await page.waitForChanges();

      expect(page.rootInstance.isOpen).toBe(false);
    });
  });

  describe('memory leak prevention', () => {
    it('should call cleanupPopoverListeners on closing', async () => {
      const page = await newSpecPage({
        components: [AegovPopover],
        html: `
          <aegov-popover>
            <button>Trigger</button>
            <div slot="popover-content">Content</div>
          </aegov-popover>
        `,
      });

      const instance = page.rootInstance;

      // Open popover
      instance.isOpen = true;
      await page.waitForChanges();

      const cleanupSpy = jest.spyOn(instance, 'cleanupPopoverListeners');

      // Close popover
      instance.isOpen = false;
      await page.waitForChanges();

      expect(cleanupSpy).toHaveBeenCalled();
    });

    it('should remove portal element on disconnectedCallback', async () => {
      const page = await newSpecPage({
        components: [AegovPopover],
        html: `
          <aegov-popover>
            <button>Trigger</button>
            <div slot="popover-content">Content</div>
          </aegov-popover>
        `,
      });

      const instance = page.rootInstance;
      expect(instance.portalElement).toBeDefined();

      page.root.remove();
      await page.waitForChanges();

      expect(instance.portalElement).toBeUndefined();
    });

    it('should clear timeouts on disconnectedCallback', async () => {
      const page = await newSpecPage({
        components: [AegovPopover],
        html: `
          <aegov-popover>
            <button>Trigger</button>
            <div slot="popover-content">Content</div>
          </aegov-popover>
        `,
      });

      const instance = page.rootInstance;
      const clearTimeoutsSpy = jest.spyOn(instance, 'clearTimeouts');

      page.root.remove();
      await page.waitForChanges();

      expect(clearTimeoutsSpy).toHaveBeenCalled();
    });

    it('should return portal content on disconnectedCallback', async () => {
      const page = await newSpecPage({
        components: [AegovPopover],
        html: `
          <aegov-popover>
            <button>Trigger</button>
            <div slot="popover-content">Content</div>
          </aegov-popover>
        `,
      });

      const instance = page.rootInstance;
      const returnSpy = jest.spyOn(instance, 'returnPortalContent');

      page.root.remove();
      await page.waitForChanges();

      expect(returnSpy).toHaveBeenCalled();
    });
  });
});
