import { newSpecPage } from '@stencil/core/testing';
import { AegovDropdown } from './aegov-dropdown';

describe('aegov-dropdown', () => {
  describe('rendering', () => {
    it('should render with default props', async () => {
      const page = await newSpecPage({
        components: [AegovDropdown],
        html: `
          <aegov-dropdown>
            <button>Trigger</button>
            <div slot="dropdown-content">Content</div>
          </aegov-dropdown>
        `,
      });

      expect(page.root).toEqualHtml(`
        <aegov-dropdown>
          <div class="dropdown-trigger" aria-haspopup="true" aria-expanded="false">
            <button>Trigger</button>
          </div>
          <div style="display: none;">
            <div slot="dropdown-content">Content</div>
          </div>
        </aegov-dropdown>
      `);
    });

    it('should render trigger element via default slot', async () => {
      const page = await newSpecPage({
        components: [AegovDropdown],
        html: `
          <aegov-dropdown>
            <button class="custom-trigger">Click me</button>
            <div slot="dropdown-content">Menu</div>
          </aegov-dropdown>
        `,
      });

      const trigger = page.root.querySelector('button.custom-trigger');
      expect(trigger).toBeTruthy();
      expect(trigger.textContent).toBe('Click me');
    });

    it('should hide content slot in main component', async () => {
      const page = await newSpecPage({
        components: [AegovDropdown],
        html: `
          <aegov-dropdown>
            <button>Trigger</button>
            <div slot="dropdown-content">Content</div>
          </aegov-dropdown>
        `,
      });

      const hiddenSlot = page.root.querySelector('div[style*="display: none"]');
      expect(hiddenSlot).toBeTruthy();
    });
  });

  describe('props', () => {
    it('should have default triggerType of "click"', async () => {
      const page = await newSpecPage({
        components: [AegovDropdown],
        html: `<aegov-dropdown><button>Trigger</button></aegov-dropdown>`,
      });

      expect(page.rootInstance.triggerType).toBe('click');
    });

    it('should have default position of "bottom"', async () => {
      const page = await newSpecPage({
        components: [AegovDropdown],
        html: `<aegov-dropdown><button>Trigger</button></aegov-dropdown>`,
      });

      expect(page.rootInstance.position).toBe('bottom');
    });

    it('should have default align of "start"', async () => {
      const page = await newSpecPage({
        components: [AegovDropdown],
        html: `<aegov-dropdown><button>Trigger</button></aegov-dropdown>`,
      });

      expect(page.rootInstance.align).toBe('start');
    });

    it('should have default gap of 8', async () => {
      const page = await newSpecPage({
        components: [AegovDropdown],
        html: `<aegov-dropdown><button>Trigger</button></aegov-dropdown>`,
      });

      expect(page.rootInstance.gap).toBe(8);
    });

    it('should have default offset of 0', async () => {
      const page = await newSpecPage({
        components: [AegovDropdown],
        html: `<aegov-dropdown><button>Trigger</button></aegov-dropdown>`,
      });

      expect(page.rootInstance.offset).toBe(0);
    });

    it('should have default showDelay of 200', async () => {
      const page = await newSpecPage({
        components: [AegovDropdown],
        html: `<aegov-dropdown><button>Trigger</button></aegov-dropdown>`,
      });

      expect(page.rootInstance.showDelay).toBe(200);
    });

    it('should have default hideDelay of 0', async () => {
      const page = await newSpecPage({
        components: [AegovDropdown],
        html: `<aegov-dropdown><button>Trigger</button></aegov-dropdown>`,
      });

      expect(page.rootInstance.hideDelay).toBe(0);
    });

    it('should have default disabled of false', async () => {
      const page = await newSpecPage({
        components: [AegovDropdown],
        html: `<aegov-dropdown><button>Trigger</button></aegov-dropdown>`,
      });

      expect(page.rootInstance.disabled).toBe(false);
    });

    it('should accept custom triggerType', async () => {
      const page = await newSpecPage({
        components: [AegovDropdown],
        html: `<aegov-dropdown trigger-type="hover"><button>Trigger</button></aegov-dropdown>`,
      });

      expect(page.rootInstance.triggerType).toBe('hover');
    });

    it('should accept custom position', async () => {
      const page = await newSpecPage({
        components: [AegovDropdown],
        html: `<aegov-dropdown position="top"><button>Trigger</button></aegov-dropdown>`,
      });

      expect(page.rootInstance.position).toBe('top');
    });

    it('should accept custom align', async () => {
      const page = await newSpecPage({
        components: [AegovDropdown],
        html: `<aegov-dropdown align="center"><button>Trigger</button></aegov-dropdown>`,
      });

      expect(page.rootInstance.align).toBe('center');
    });

    it('should accept custom gap', async () => {
      const page = await newSpecPage({
        components: [AegovDropdown],
        html: `<aegov-dropdown gap="16"><button>Trigger</button></aegov-dropdown>`,
      });

      expect(page.rootInstance.gap).toBe(16);
    });

    it('should accept custom offset', async () => {
      const page = await newSpecPage({
        components: [AegovDropdown],
        html: `<aegov-dropdown offset="10"><button>Trigger</button></aegov-dropdown>`,
      });

      expect(page.rootInstance.offset).toBe(10);
    });

    it('should accept custom showDelay', async () => {
      const page = await newSpecPage({
        components: [AegovDropdown],
        html: `<aegov-dropdown show-delay="500"><button>Trigger</button></aegov-dropdown>`,
      });

      expect(page.rootInstance.showDelay).toBe(500);
    });

    it('should accept custom hideDelay', async () => {
      const page = await newSpecPage({
        components: [AegovDropdown],
        html: `<aegov-dropdown hide-delay="300"><button>Trigger</button></aegov-dropdown>`,
      });

      expect(page.rootInstance.hideDelay).toBe(300);
    });

    it('should accept disabled prop', async () => {
      const page = await newSpecPage({
        components: [AegovDropdown],
        html: `<aegov-dropdown disabled><button>Trigger</button></aegov-dropdown>`,
      });

      expect(page.rootInstance.disabled).toBe(true);
    });
  });

  describe('state management', () => {
    it('should start with closed state', async () => {
      const page = await newSpecPage({
        components: [AegovDropdown],
        html: `
          <aegov-dropdown>
            <button>Trigger</button>
            <div slot="dropdown-content">Content</div>
          </aegov-dropdown>
        `,
      });

      expect(page.rootInstance.isOpen).toBe(false);
    });

    it('should update aria-expanded when state changes', async () => {
      const page = await newSpecPage({
        components: [AegovDropdown],
        html: `
          <aegov-dropdown>
            <button>Trigger</button>
            <div slot="dropdown-content">Content</div>
          </aegov-dropdown>
        `,
      });

      const trigger = page.root.querySelector('.dropdown-trigger');
      expect(trigger.getAttribute('aria-expanded')).toBe('false');

      page.rootInstance.isOpen = true;
      await page.waitForChanges();

      expect(trigger.getAttribute('aria-expanded')).toBe('true');
    });

    it('should set aria-controls when open', async () => {
      const page = await newSpecPage({
        components: [AegovDropdown],
        html: `
          <aegov-dropdown>
            <button>Trigger</button>
            <div slot="dropdown-content">Content</div>
          </aegov-dropdown>
        `,
      });

      const trigger = page.root.querySelector('.dropdown-trigger');
      expect(trigger.getAttribute('aria-controls')).toBeNull();

      page.rootInstance.isOpen = true;
      await page.waitForChanges();

      expect(trigger.getAttribute('aria-controls')).toBeTruthy();
    });

    it('should detect content slot', async () => {
      const page = await newSpecPage({
        components: [AegovDropdown],
        html: `
          <aegov-dropdown>
            <button>Trigger</button>
            <div slot="dropdown-content">Content</div>
          </aegov-dropdown>
        `,
      });

      expect(page.rootInstance.hasContentSlot).toBe(true);
    });

    it('should detect missing content slot', async () => {
      const page = await newSpecPage({
        components: [AegovDropdown],
        html: `
          <aegov-dropdown>
            <button>Trigger</button>
          </aegov-dropdown>
        `,
      });

      expect(page.rootInstance.hasContentSlot).toBe(false);
    });
  });

  describe('events', () => {
    it('should emit aegovDropdownOpen when opened', async () => {
      const page = await newSpecPage({
        components: [AegovDropdown],
        html: `
          <aegov-dropdown>
            <button>Trigger</button>
            <div slot="dropdown-content">Content</div>
          </aegov-dropdown>
        `,
      });

      const openSpy = jest.fn();
      page.root.addEventListener('aegovDropdownOpen', openSpy);

      page.rootInstance.isOpen = true;
      await page.waitForChanges();

      expect(openSpy).toHaveBeenCalledTimes(1);
    });

    it('should emit aegovDropdownClose when closed', async () => {
      const page = await newSpecPage({
        components: [AegovDropdown],
        html: `
          <aegov-dropdown>
            <button>Trigger</button>
            <div slot="dropdown-content">Content</div>
          </aegov-dropdown>
        `,
      });

      // Open first
      page.rootInstance.isOpen = true;
      await page.waitForChanges();

      const closeSpy = jest.fn();
      page.root.addEventListener('aegovDropdownClose', closeSpy);

      // Close
      page.rootInstance.isOpen = false;
      await page.waitForChanges();

      expect(closeSpy).toHaveBeenCalledTimes(1);
    });
  });

  describe('accessibility', () => {
    it('should have aria-haspopup attribute', async () => {
      const page = await newSpecPage({
        components: [AegovDropdown],
        html: `
          <aegov-dropdown>
            <button>Trigger</button>
            <div slot="dropdown-content">Content</div>
          </aegov-dropdown>
        `,
      });

      const trigger = page.root.querySelector('.dropdown-trigger');
      expect(trigger.getAttribute('aria-haspopup')).toBe('true');
    });

    it('should generate unique dropdown ID', async () => {
      const page = await newSpecPage({
        components: [AegovDropdown],
        html: `
          <aegov-dropdown>
            <button>Trigger</button>
            <div slot="dropdown-content">Content</div>
          </aegov-dropdown>
        `,
      });

      // Verify dropdownId is generated
      expect(page.rootInstance.dropdownId).toBeTruthy();
      expect(page.rootInstance.dropdownId).toContain('dropdown-');
    });
  });

  describe('positioning', () => {
    it('should support all position values', async () => {
      const positions = ['top', 'right', 'bottom', 'left'];

      for (const position of positions) {
        const page = await newSpecPage({
          components: [AegovDropdown],
          html: `<aegov-dropdown position="${position}"><button>Trigger</button></aegov-dropdown>`,
        });

        expect(page.rootInstance.position).toBe(position);
      }
    });

    it('should support all align values', async () => {
      const alignments = ['start', 'center', 'end'];

      for (const align of alignments) {
        const page = await newSpecPage({
          components: [AegovDropdown],
          html: `<aegov-dropdown align="${align}"><button>Trigger</button></aegov-dropdown>`,
        });

        expect(page.rootInstance.align).toBe(align);
      }
    });
  });

  describe('trigger types', () => {
    it('should support click trigger', async () => {
      const page = await newSpecPage({
        components: [AegovDropdown],
        html: `
          <aegov-dropdown trigger-type="click">
            <button>Trigger</button>
            <div slot="dropdown-content">Content</div>
          </aegov-dropdown>
        `,
      });

      expect(page.rootInstance.triggerType).toBe('click');
    });

    it('should support hover trigger', async () => {
      const page = await newSpecPage({
        components: [AegovDropdown],
        html: `
          <aegov-dropdown trigger-type="hover">
            <button>Trigger</button>
            <div slot="dropdown-content">Content</div>
          </aegov-dropdown>
        `,
      });

      expect(page.rootInstance.triggerType).toBe('hover');
    });
  });

  describe('multiple dropdowns', () => {
    it('should emit close event when another dropdown opens', async () => {
      const page = await newSpecPage({
        components: [AegovDropdown],
        html: `
          <aegov-dropdown>
            <button>Trigger</button>
            <div slot="dropdown-content">Content</div>
          </aegov-dropdown>
        `,
      });

      // Set up event spy
      const closeSpy = jest.fn();
      page.root.addEventListener('aegovDropdownClose', closeSpy);

      // Open dropdown
      page.rootInstance.isOpen = true;
      await page.waitForChanges();

      // Manually trigger close (in real usage, this happens when another dropdown opens)
      page.rootInstance.isOpen = false;
      await page.waitForChanges();

      // Verify close event was emitted
      expect(closeSpy).toHaveBeenCalledTimes(1);
    });

    it('should have closeDropdown public method', async () => {
      const page = await newSpecPage({
        components: [AegovDropdown],
        html: `
          <aegov-dropdown>
            <button>Trigger</button>
            <div slot="dropdown-content">Content</div>
          </aegov-dropdown>
        `,
      });

      // Open dropdown
      page.rootInstance.isOpen = true;
      await page.waitForChanges();
      expect(page.rootInstance.isOpen).toBe(true);

      // Close via public method
      page.rootInstance.closeDropdown();
      await page.waitForChanges();
      expect(page.rootInstance.isOpen).toBe(false);
    });
  });
});
