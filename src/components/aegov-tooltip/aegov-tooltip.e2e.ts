import { newE2EPage } from '@stencil/core/testing';

describe('aegov-tooltip e2e', () => {
  describe('rendering', () => {
    it('should render tooltip component', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-tooltip content="Test tooltip">
          <button>Hover me</button>
        </aegov-tooltip>
      `);
      const element = await page.find('aegov-tooltip');
      expect(element).toBeTruthy();
    });

    it('should render trigger element', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-tooltip content="Test tooltip">
          <button>Click me</button>
        </aegov-tooltip>
      `);
      const trigger = await page.find('aegov-tooltip .tooltip-trigger');
      expect(trigger).toBeTruthy();
      expect(trigger.textContent.trim()).toBe('Click me');
    });

    it('should not display tooltip initially', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-tooltip content="Test tooltip">
          <button>Hover me</button>
        </aegov-tooltip>
      `);
      const tooltip = await page.find('aegov-tooltip .tooltip');
      expect(tooltip).toBeTruthy();
      const style = await tooltip.getComputedStyle();
      expect(style.display).toBe('none');
    });
  });

  describe('hover trigger', () => {
    it('should show tooltip on mouse enter', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-tooltip content="Hover tooltip" show-delay="0">
          <button>Hover me</button>
        </aegov-tooltip>
      `);

      const trigger = await page.find('aegov-tooltip .tooltip-trigger');
      await trigger.hover();
      await page.waitForChanges();

      const tooltip = await page.find('aegov-tooltip .tooltip');
      expect(tooltip).toBeTruthy();
    });

    it('should display content property in tooltip', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-tooltip content="This is tooltip content" show-delay="0">
          <button>Hover me</button>
        </aegov-tooltip>
      `);

      const trigger = await page.find('aegov-tooltip .tooltip-trigger');
      await trigger.hover();
      await page.waitForChanges();

      const content = await page.find('aegov-tooltip .tooltip__content');
      expect(content.textContent).toBe('This is tooltip content');
    });

    it('should hide tooltip on mouse leave', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-tooltip content="Hover tooltip" show-delay="0" hide-delay="0">
          <button>Hover me</button>
        </aegov-tooltip>
      `);

      const trigger = await page.find('aegov-tooltip .tooltip-trigger');
      await trigger.hover();
      await page.waitForChanges();

      // Move mouse away
      await page.mouse.move(0, 0);
      await page.waitForChanges();

      const tooltip = await page.find('aegov-tooltip .tooltip');
      expect(tooltip).toBeTruthy();
      const style = await tooltip.getComputedStyle();
      expect(style.display).toBe('none');
    });
  });

  describe('click trigger', () => {
    it('should show tooltip on click', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-tooltip content="Click tooltip" trigger="click">
          <button>Click me</button>
        </aegov-tooltip>
      `);

      const trigger = await page.find('aegov-tooltip .tooltip-trigger');
      await trigger.click();
      await page.waitForChanges();

      const tooltip = await page.find('aegov-tooltip .tooltip');
      expect(tooltip).toBeTruthy();
    });

    it('should toggle tooltip on repeated clicks', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-tooltip content="Toggle tooltip" trigger="click">
          <button>Click me</button>
        </aegov-tooltip>
      `);

      const trigger = await page.find('aegov-tooltip .tooltip-trigger');

      // First click - show
      await trigger.click();
      await page.waitForChanges();
      let tooltip = await page.find('aegov-tooltip .tooltip');
      expect(tooltip).toBeTruthy();
      let style = await tooltip.getComputedStyle();
      expect(style.display).toBe('block');

      // Second click - hide
      await trigger.click();
      await page.waitForChanges();
      tooltip = await page.find('aegov-tooltip .tooltip');
      expect(tooltip).toBeTruthy();
      style = await tooltip.getComputedStyle();
      expect(style.display).toBe('none');
    });

    it('should hide tooltip on outside click', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <div>
          <aegov-tooltip content="Click tooltip" trigger="click">
            <button>Click me</button>
          </aegov-tooltip>
          <div id="outside">Outside element</div>
        </div>
      `);

      const trigger = await page.find('aegov-tooltip .tooltip-trigger');
      await trigger.click();
      await page.waitForChanges();

      let tooltip = await page.find('aegov-tooltip .tooltip');
      expect(tooltip).toBeTruthy();
      let style = await tooltip.getComputedStyle();
      expect(style.display).toBe('block');

      // Click outside
      const outside = await page.find('#outside');
      await outside.click();
      await page.waitForChanges();

      tooltip = await page.find('aegov-tooltip .tooltip');
      expect(tooltip).toBeTruthy();
      style = await tooltip.getComputedStyle();
      expect(style.display).toBe('none');
    });
  });

  describe('positions', () => {
    it('should apply top position class', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-tooltip content="Top tooltip" position="top" show-delay="0">
          <button>Hover me</button>
        </aegov-tooltip>
      `);

      const trigger = await page.find('aegov-tooltip .tooltip-trigger');
      await trigger.hover();
      await page.waitForChanges();

      const tooltip = await page.find('aegov-tooltip .tooltip--top');
      expect(tooltip).toBeTruthy();
    });

    it('should apply right position class', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-tooltip content="Right tooltip" position="right" show-delay="0">
          <button>Hover me</button>
        </aegov-tooltip>
      `);

      const trigger = await page.find('aegov-tooltip .tooltip-trigger');
      await trigger.hover();
      await page.waitForChanges();

      const tooltip = await page.find('aegov-tooltip .tooltip--right');
      expect(tooltip).toBeTruthy();
    });

    it('should apply bottom position class', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-tooltip content="Bottom tooltip" position="bottom" show-delay="0">
          <button>Hover me</button>
        </aegov-tooltip>
      `);

      const trigger = await page.find('aegov-tooltip .tooltip-trigger');
      await trigger.hover();
      await page.waitForChanges();

      const tooltip = await page.find('aegov-tooltip .tooltip--bottom');
      expect(tooltip).toBeTruthy();
    });

    it('should apply left position class', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-tooltip content="Left tooltip" position="left" show-delay="0">
          <button>Hover me</button>
        </aegov-tooltip>
      `);

      const trigger = await page.find('aegov-tooltip .tooltip-trigger');
      await trigger.hover();
      await page.waitForChanges();

      const tooltip = await page.find('aegov-tooltip .tooltip--left');
      expect(tooltip).toBeTruthy();
    });
  });

  describe('interactive mode', () => {
    it('should apply interactive class', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-tooltip content="Interactive tooltip" interactive="true" show-delay="0">
          <button>Hover me</button>
        </aegov-tooltip>
      `);

      const trigger = await page.find('aegov-tooltip .tooltip-trigger');
      await trigger.hover();
      await page.waitForChanges();

      const tooltip = await page.find('aegov-tooltip .tooltip--interactive');
      expect(tooltip).toBeTruthy();
    });
  });

  describe('slot content', () => {
    it('should render rich content via slot', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-tooltip show-delay="0">
          <button>Hover me</button>
          <div slot="tooltip-content">
            <strong>Rich</strong> content
          </div>
        </aegov-tooltip>
      `);

      const trigger = await page.find('aegov-tooltip .tooltip-trigger');
      await trigger.hover();
      await page.waitForChanges();

      const content = await page.find('aegov-tooltip .tooltip__content');
      expect(content.innerHTML).toContain('<strong>Rich</strong>');
    });
  });

  describe('ARIA attributes', () => {
    it('should have aria-describedby when visible', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-tooltip content="ARIA tooltip" show-delay="0">
          <button>Hover me</button>
        </aegov-tooltip>
      `);

      const trigger = await page.find('aegov-tooltip .tooltip-trigger');
      await trigger.hover();
      await page.waitForChanges();

      const ariaDescribedBy = await trigger.getAttribute('aria-describedby');
      expect(ariaDescribedBy).toBeTruthy();
    });

    it('should have aria-expanded for click trigger', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-tooltip content="Click tooltip" trigger="click">
          <button>Click me</button>
        </aegov-tooltip>
      `);

      const trigger = await page.find('aegov-tooltip .tooltip-trigger');
      const ariaExpanded = await trigger.getAttribute('aria-expanded');
      expect(ariaExpanded).toBeTruthy();
    });

    it('should update aria-expanded on click', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-tooltip content="Click tooltip" trigger="click">
          <button>Click me</button>
        </aegov-tooltip>
      `);

      const trigger = await page.find('aegov-tooltip .tooltip-trigger');

      // Initially false
      let ariaExpanded = await trigger.getAttribute('aria-expanded');
      expect(ariaExpanded).toBe('false');

      // Click to show
      await trigger.click();
      await page.waitForChanges();

      ariaExpanded = await trigger.getAttribute('aria-expanded');
      expect(ariaExpanded).toBe('true');
    });

    it('should have role="tooltip" for non-interactive', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-tooltip content="Tooltip" show-delay="0">
          <button>Hover me</button>
        </aegov-tooltip>
      `);

      const trigger = await page.find('aegov-tooltip .tooltip-trigger');
      await trigger.hover();
      await page.waitForChanges();

      const tooltip = await page.find('aegov-tooltip [role="tooltip"]');
      expect(tooltip).toBeTruthy();
    });

    it('should have role="dialog" for interactive', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-tooltip content="Tooltip" interactive="true" show-delay="0">
          <button>Hover me</button>
        </aegov-tooltip>
      `);

      const trigger = await page.find('aegov-tooltip .tooltip-trigger');
      await trigger.hover();
      await page.waitForChanges();

      const tooltip = await page.find('aegov-tooltip [role="dialog"]');
      expect(tooltip).toBeTruthy();
    });
  });

  describe('keyboard interaction', () => {
    it('should close tooltip on Escape key', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-tooltip content="Click tooltip" trigger="click">
          <button>Click me</button>
        </aegov-tooltip>
      `);

      const trigger = await page.find('aegov-tooltip .tooltip-trigger');
      await trigger.click();
      await page.waitForChanges();

      let tooltip = await page.find('aegov-tooltip .tooltip');
      expect(tooltip).toBeTruthy();
      let style = await tooltip.getComputedStyle();
      expect(style.display).toBe('block');

      // Press Escape
      await page.keyboard.press('Escape');
      await page.waitForChanges();

      tooltip = await page.find('aegov-tooltip .tooltip');
      expect(tooltip).toBeTruthy();
      style = await tooltip.getComputedStyle();
      expect(style.display).toBe('none');
    });
  });

  describe('tooltip arrow', () => {
    it('should render arrow element', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-tooltip content="Tooltip with arrow" show-delay="0">
          <button>Hover me</button>
        </aegov-tooltip>
      `);

      const trigger = await page.find('aegov-tooltip .tooltip-trigger');
      await trigger.hover();
      await page.waitForChanges();

      const arrow = await page.find('aegov-tooltip .tooltip__arrow');
      expect(arrow).toBeTruthy();
    });
  });

  describe('disabled state', () => {
    it('should not show tooltip when disabled', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-tooltip content="Disabled tooltip" disabled="true" show-delay="0">
          <button>Hover me</button>
        </aegov-tooltip>
      `);

      const trigger = await page.find('aegov-tooltip .tooltip-trigger');
      await trigger.hover();
      await page.waitForChanges();

      const tooltip = await page.find('aegov-tooltip .tooltip');
      expect(tooltip).toBeTruthy();
      const style = await tooltip.getComputedStyle();
      expect(style.display).toBe('none');
    });
  });

  describe('custom styling', () => {
    it('should apply fixed positioning', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-tooltip content="Positioned tooltip" show-delay="0">
          <button>Hover me</button>
        </aegov-tooltip>
      `);

      const trigger = await page.find('aegov-tooltip .tooltip-trigger');
      await trigger.hover();
      await page.waitForChanges();

      const tooltip = await page.find('aegov-tooltip .tooltip');
      const style = await tooltip.getComputedStyle();
      expect(style.position).toBe('fixed');
    });
  });

  describe('with different trigger elements', () => {
    it('should work with button', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-tooltip content="Button tooltip" show-delay="0">
          <button>Click</button>
        </aegov-tooltip>
      `);

      const trigger = await page.find('aegov-tooltip .tooltip-trigger');
      await trigger.hover();
      await page.waitForChanges();

      const tooltip = await page.find('aegov-tooltip .tooltip');
      expect(tooltip).toBeTruthy();
    });

    it('should work with link', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-tooltip content="Link tooltip" show-delay="0">
          <a href="#">Link</a>
        </aegov-tooltip>
      `);

      const trigger = await page.find('aegov-tooltip .tooltip-trigger');
      await trigger.hover();
      await page.waitForChanges();

      const tooltip = await page.find('aegov-tooltip .tooltip');
      expect(tooltip).toBeTruthy();
    });

    it('should work with span', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-tooltip content="Span tooltip" show-delay="0">
          <span>Text</span>
        </aegov-tooltip>
      `);

      const trigger = await page.find('aegov-tooltip .tooltip-trigger');
      await trigger.hover();
      await page.waitForChanges();

      const tooltip = await page.find('aegov-tooltip .tooltip');
      expect(tooltip).toBeTruthy();
    });
  });
});
