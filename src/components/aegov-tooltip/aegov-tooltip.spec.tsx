import { newSpecPage } from '@stencil/core/testing';
import { AegovTooltip } from './aegov-tooltip';

describe('aegov-tooltip', () => {
  describe('rendering', () => {
    it('should render with default props', async () => {
      const page = await newSpecPage({
        components: [AegovTooltip],
        html: `<aegov-tooltip content="Test tooltip"><button>Trigger</button></aegov-tooltip>`,
      });
      expect(page.root).toBeTruthy();
      expect(page.root.querySelector('.aegov-tooltip-trigger')).toBeTruthy();
    });

    it('should render trigger element via default slot', async () => {
      const page = await newSpecPage({
        components: [AegovTooltip],
        html: `<aegov-tooltip content="Test"><button>Click me</button></aegov-tooltip>`,
      });
      const trigger = page.root.querySelector('.aegov-tooltip-trigger');
      expect(trigger.textContent).toBe('Click me');
    });

    it('should not render tooltip when not visible', async () => {
      const page = await newSpecPage({
        components: [AegovTooltip],
        html: `<aegov-tooltip content="Test tooltip"><button>Trigger</button></aegov-tooltip>`,
      });
      const tooltip = page.root.querySelector('.aegov-tooltip') as HTMLElement;
      expect(tooltip).toBeTruthy();
      expect(tooltip.style.display).toBe('none');
    });

    it('should render tooltip when visible', async () => {
      const page = await newSpecPage({
        components: [AegovTooltip],
        html: `<aegov-tooltip content="Test tooltip"><button>Trigger</button></aegov-tooltip>`,
      });
      const tooltip = page.rootInstance as AegovTooltip;
      tooltip.isVisible = true;
      await page.waitForChanges();
      expect(page.root.querySelector('.aegov-tooltip')).toBeTruthy();
    });
  });

  describe('content property', () => {
    it('should render content from property', async () => {
      const page = await newSpecPage({
        components: [AegovTooltip],
        html: `<aegov-tooltip content="Tooltip text"><button>Trigger</button></aegov-tooltip>`,
      });
      const tooltip = page.rootInstance as AegovTooltip;
      tooltip.isVisible = true;
      await page.waitForChanges();
      const content = page.root.querySelector('.tooltip__content');
      expect(content.textContent).toBe('Tooltip text');
    });

    it('should render content from slot when provided', async () => {
      const page = await newSpecPage({
        components: [AegovTooltip],
        html: `
          <aegov-tooltip>
            <button>Trigger</button>
            <div slot="tooltip-content">Rich content</div>
          </aegov-tooltip>
        `,
      });
      const tooltip = page.rootInstance as AegovTooltip;
      tooltip.isVisible = true;
      await page.waitForChanges();
      const content = page.root.querySelector('.tooltip__content');
      expect(content.textContent.trim()).toBe('Rich content');
    });

    it('should prioritize slot content over property', async () => {
      const page = await newSpecPage({
        components: [AegovTooltip],
        html: `
          <aegov-tooltip content="Property content">
            <button>Trigger</button>
            <div slot="tooltip-content">Slot content</div>
          </aegov-tooltip>
        `,
      });
      const tooltip = page.rootInstance as AegovTooltip;
      tooltip.isVisible = true;
      tooltip.hasContentSlot = true;
      await page.waitForChanges();
      const content = page.root.querySelector('.tooltip__content');
      expect(content.textContent.trim()).toBe('Slot content');
    });
  });

  describe('position property', () => {
    it('should default to top position', async () => {
      const page = await newSpecPage({
        components: [AegovTooltip],
        html: `<aegov-tooltip content="Test"><button>Trigger</button></aegov-tooltip>`,
      });
      expect(page.rootInstance.position).toBe('top');
    });

    it('should accept right position', async () => {
      const page = await newSpecPage({
        components: [AegovTooltip],
        html: `<aegov-tooltip content="Test" position="right"><button>Trigger</button></aegov-tooltip>`,
      });
      expect(page.rootInstance.position).toBe('right');
    });

    it('should accept bottom position', async () => {
      const page = await newSpecPage({
        components: [AegovTooltip],
        html: `<aegov-tooltip content="Test" position="bottom"><button>Trigger</button></aegov-tooltip>`,
      });
      expect(page.rootInstance.position).toBe('bottom');
    });

    it('should accept left position', async () => {
      const page = await newSpecPage({
        components: [AegovTooltip],
        html: `<aegov-tooltip content="Test" position="left"><button>Trigger</button></aegov-tooltip>`,
      });
      expect(page.rootInstance.position).toBe('left');
    });

    it('should apply position class to tooltip', async () => {
      const page = await newSpecPage({
        components: [AegovTooltip],
        html: `<aegov-tooltip content="Test" position="right"><button>Trigger</button></aegov-tooltip>`,
      });
      const tooltip = page.rootInstance as AegovTooltip;
      tooltip.isVisible = true;
      await page.waitForChanges();
      expect(page.root.querySelector('.tooltip--right')).toBeTruthy();
    });
  });

  describe('align property', () => {
    it('should default to center alignment', async () => {
      const page = await newSpecPage({
        components: [AegovTooltip],
        html: `<aegov-tooltip content="Test"><button>Trigger</button></aegov-tooltip>`,
      });
      expect(page.rootInstance.align).toBe('center');
    });

    it('should accept start alignment', async () => {
      const page = await newSpecPage({
        components: [AegovTooltip],
        html: `<aegov-tooltip content="Test" align="start"><button>Trigger</button></aegov-tooltip>`,
      });
      expect(page.rootInstance.align).toBe('start');
    });

    it('should accept end alignment', async () => {
      const page = await newSpecPage({
        components: [AegovTooltip],
        html: `<aegov-tooltip content="Test" align="end"><button>Trigger</button></aegov-tooltip>`,
      });
      expect(page.rootInstance.align).toBe('end');
    });
  });

  describe('trigger property', () => {
    it('should default to hover trigger', async () => {
      const page = await newSpecPage({
        components: [AegovTooltip],
        html: `<aegov-tooltip content="Test"><button>Trigger</button></aegov-tooltip>`,
      });
      expect(page.rootInstance.trigger).toBe('hover');
    });

    it('should accept click trigger', async () => {
      const page = await newSpecPage({
        components: [AegovTooltip],
        html: `<aegov-tooltip content="Test" trigger="click"><button>Trigger</button></aegov-tooltip>`,
      });
      expect(page.rootInstance.trigger).toBe('click');
    });
  });

  describe('gap property', () => {
    it('should default to 8 pixels', async () => {
      const page = await newSpecPage({
        components: [AegovTooltip],
        html: `<aegov-tooltip content="Test"><button>Trigger</button></aegov-tooltip>`,
      });
      expect(page.rootInstance.gap).toBe(8);
    });

    it('should accept custom gap value', async () => {
      const page = await newSpecPage({
        components: [AegovTooltip],
        html: `<aegov-tooltip content="Test" gap="20"><button>Trigger</button></aegov-tooltip>`,
      });
      expect(page.rootInstance.gap).toBe(20);
    });
  });

  describe('offset property', () => {
    it('should default to 0 pixels', async () => {
      const page = await newSpecPage({
        components: [AegovTooltip],
        html: `<aegov-tooltip content="Test"><button>Trigger</button></aegov-tooltip>`,
      });
      expect(page.rootInstance.offset).toBe(0);
    });

    it('should accept custom offset value', async () => {
      const page = await newSpecPage({
        components: [AegovTooltip],
        html: `<aegov-tooltip content="Test" offset="30"><button>Trigger</button></aegov-tooltip>`,
      });
      expect(page.rootInstance.offset).toBe(30);
    });

    it('should accept negative offset value', async () => {
      const page = await newSpecPage({
        components: [AegovTooltip],
        html: `<aegov-tooltip content="Test" offset="-15"><button>Trigger</button></aegov-tooltip>`,
      });
      expect(page.rootInstance.offset).toBe(-15);
    });
  });

  describe('disabled property', () => {
    it('should default to false', async () => {
      const page = await newSpecPage({
        components: [AegovTooltip],
        html: `<aegov-tooltip content="Test"><button>Trigger</button></aegov-tooltip>`,
      });
      expect(page.rootInstance.disabled).toBe(false);
    });

    it('should accept disabled state', async () => {
      const page = await newSpecPage({
        components: [AegovTooltip],
        html: `<aegov-tooltip content="Test" disabled="true"><button>Trigger</button></aegov-tooltip>`,
      });
      expect(page.rootInstance.disabled).toBe(true);
    });
  });

  describe('interactive property', () => {
    it('should default to false', async () => {
      const page = await newSpecPage({
        components: [AegovTooltip],
        html: `<aegov-tooltip content="Test"><button>Trigger</button></aegov-tooltip>`,
      });
      expect(page.rootInstance.interactive).toBe(false);
    });

    it('should accept interactive mode', async () => {
      const page = await newSpecPage({
        components: [AegovTooltip],
        html: `<aegov-tooltip content="Test" interactive="true"><button>Trigger</button></aegov-tooltip>`,
      });
      expect(page.rootInstance.interactive).toBe(true);
    });

    it('should apply interactive class when enabled', async () => {
      const page = await newSpecPage({
        components: [AegovTooltip],
        html: `<aegov-tooltip content="Test" interactive="true"><button>Trigger</button></aegov-tooltip>`,
      });
      const tooltip = page.rootInstance as AegovTooltip;
      tooltip.isVisible = true;
      await page.waitForChanges();
      expect(page.root.querySelector('.tooltip--interactive')).toBeTruthy();
    });
  });

  describe('show-delay property', () => {
    it('should default to 200ms', async () => {
      const page = await newSpecPage({
        components: [AegovTooltip],
        html: `<aegov-tooltip content="Test"><button>Trigger</button></aegov-tooltip>`,
      });
      expect(page.rootInstance.showDelay).toBe(200);
    });

    it('should accept custom show delay', async () => {
      const page = await newSpecPage({
        components: [AegovTooltip],
        html: `<aegov-tooltip content="Test" show-delay="500"><button>Trigger</button></aegov-tooltip>`,
      });
      expect(page.rootInstance.showDelay).toBe(500);
    });

    it('should accept zero delay', async () => {
      const page = await newSpecPage({
        components: [AegovTooltip],
        html: `<aegov-tooltip content="Test" show-delay="0"><button>Trigger</button></aegov-tooltip>`,
      });
      expect(page.rootInstance.showDelay).toBe(0);
    });
  });

  describe('hide-delay property', () => {
    it('should default to 0ms', async () => {
      const page = await newSpecPage({
        components: [AegovTooltip],
        html: `<aegov-tooltip content="Test"><button>Trigger</button></aegov-tooltip>`,
      });
      expect(page.rootInstance.hideDelay).toBe(0);
    });

    it('should accept custom hide delay', async () => {
      const page = await newSpecPage({
        components: [AegovTooltip],
        html: `<aegov-tooltip content="Test" hide-delay="1000"><button>Trigger</button></aegov-tooltip>`,
      });
      expect(page.rootInstance.hideDelay).toBe(1000);
    });
  });

  describe('ARIA attributes', () => {
    it('should not have aria-describedby when tooltip is hidden', async () => {
      const page = await newSpecPage({
        components: [AegovTooltip],
        html: `<aegov-tooltip content="Test"><button>Trigger</button></aegov-tooltip>`,
      });
      const trigger = page.root.querySelector('.aegov-tooltip-trigger');
      expect(trigger.getAttribute('aria-describedby')).toBeNull();
    });

    it('should have aria-describedby when tooltip is visible', async () => {
      const page = await newSpecPage({
        components: [AegovTooltip],
        html: `<aegov-tooltip content="Test"><button>Trigger</button></aegov-tooltip>`,
      });
      const tooltip = page.rootInstance as AegovTooltip;
      tooltip.isVisible = true;
      await page.waitForChanges();
      const trigger = page.root.querySelector('.aegov-tooltip-trigger');
      expect(trigger.getAttribute('aria-describedby')).toBeTruthy();
    });

    it('should have aria-expanded for click trigger', async () => {
      const page = await newSpecPage({
        components: [AegovTooltip],
        html: `<aegov-tooltip content="Test" trigger="click"><button>Trigger</button></aegov-tooltip>`,
      });
      const trigger = page.root.querySelector('.aegov-tooltip-trigger');
      expect(trigger.getAttribute('aria-expanded')).toBe('false');
    });

    it('should update aria-expanded when clicked', async () => {
      const page = await newSpecPage({
        components: [AegovTooltip],
        html: `<aegov-tooltip content="Test" trigger="click"><button>Trigger</button></aegov-tooltip>`,
      });
      const tooltip = page.rootInstance as AegovTooltip;
      tooltip.isVisible = true;
      await page.waitForChanges();
      const trigger = page.root.querySelector('.aegov-tooltip-trigger');
      expect(trigger.getAttribute('aria-expanded')).toBe('true');
    });

    it('should have role="tooltip" for non-interactive tooltips', async () => {
      const page = await newSpecPage({
        components: [AegovTooltip],
        html: `<aegov-tooltip content="Test"><button>Trigger</button></aegov-tooltip>`,
      });
      const tooltip = page.rootInstance as AegovTooltip;
      tooltip.isVisible = true;
      await page.waitForChanges();
      expect(page.root.querySelector('[role="tooltip"]')).toBeTruthy();
    });

    it('should have role="dialog" for interactive tooltips', async () => {
      const page = await newSpecPage({
        components: [AegovTooltip],
        html: `<aegov-tooltip content="Test" interactive="true"><button>Trigger</button></aegov-tooltip>`,
      });
      const tooltip = page.rootInstance as AegovTooltip;
      tooltip.isVisible = true;
      await page.waitForChanges();
      expect(page.root.querySelector('[role="dialog"]')).toBeTruthy();
    });

    it('should have aria-label="Interactive tooltip" when interactive', async () => {
      const page = await newSpecPage({
        components: [AegovTooltip],
        html: `<aegov-tooltip content="Test" interactive="true"><button>Trigger</button></aegov-tooltip>`,
      });
      const tooltip = page.rootInstance as AegovTooltip;
      tooltip.isVisible = true;
      await page.waitForChanges();
      const dialog = page.root.querySelector('[role="dialog"]');
      expect(dialog.getAttribute('aria-label')).toBe('Interactive tooltip');
    });

    it('should not have aria-label on non-interactive tooltip', async () => {
      const page = await newSpecPage({
        components: [AegovTooltip],
        html: `<aegov-tooltip content="Test"><button>Trigger</button></aegov-tooltip>`,
      });
      const tooltip = page.rootInstance as AegovTooltip;
      tooltip.isVisible = true;
      await page.waitForChanges();
      const tooltipEl = page.root.querySelector('[role="tooltip"]');
      expect(tooltipEl.getAttribute('aria-label')).toBeNull();
    });
  });

  describe('tooltip arrow', () => {
    it('should render arrow element', async () => {
      const page = await newSpecPage({
        components: [AegovTooltip],
        html: `<aegov-tooltip content="Test"><button>Trigger</button></aegov-tooltip>`,
      });
      const tooltip = page.rootInstance as AegovTooltip;
      tooltip.isVisible = true;
      await page.waitForChanges();
      expect(page.root.querySelector('.tooltip__arrow')).toBeTruthy();
    });
  });

  describe('component lifecycle', () => {
    it('should detect slot content in componentWillLoad', async () => {
      const page = await newSpecPage({
        components: [AegovTooltip],
        html: `
          <aegov-tooltip>
            <button>Trigger</button>
            <div slot="tooltip-content">Slot content</div>
          </aegov-tooltip>
        `,
      });
      expect(page.rootInstance.hasContentSlot).toBe(true);
    });

    it('should not detect slot content when not provided', async () => {
      const page = await newSpecPage({
        components: [AegovTooltip],
        html: `<aegov-tooltip content="Property content"><button>Trigger</button></aegov-tooltip>`,
      });
      expect(page.rootInstance.hasContentSlot).toBe(false);
    });
  });

  describe('visibility state', () => {
    it('should start as not visible', async () => {
      const page = await newSpecPage({
        components: [AegovTooltip],
        html: `<aegov-tooltip content="Test"><button>Trigger</button></aegov-tooltip>`,
      });
      expect(page.rootInstance.isVisible).toBe(false);
    });

    it('should become visible when isVisible is set to true', async () => {
      const page = await newSpecPage({
        components: [AegovTooltip],
        html: `<aegov-tooltip content="Test"><button>Trigger</button></aegov-tooltip>`,
      });
      const tooltip = page.rootInstance as AegovTooltip;
      tooltip.isVisible = true;
      await page.waitForChanges();
      expect(page.root.querySelector('.aegov-tooltip')).toBeTruthy();
    });
  });
});
