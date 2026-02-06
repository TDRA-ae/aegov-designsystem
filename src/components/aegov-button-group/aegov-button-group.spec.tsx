import { newSpecPage } from '@stencil/core/testing';
import { AegovButtonGroup } from './aegov-button-group';
import { AegovButton } from '../aegov-button/aegov-button';

describe('aegov-button-group', () => {
  describe('Component Initialization', () => {
    it('should render with default props', async () => {
      const page = await newSpecPage({
        components: [AegovButtonGroup],
        html: `<aegov-button-group></aegov-button-group>`,
      });

      expect(page.root).toBeTruthy();
      expect(page.root).toEqualHtml(`
        <aegov-button-group>
          <div class="button-group button-group--horizontal" role="group"></div>
        </aegov-button-group>
      `);
    });

    it('should render with horizontal orientation by default', async () => {
      const page = await newSpecPage({
        components: [AegovButtonGroup],
        html: `<aegov-button-group></aegov-button-group>`,
      });

      const buttonGroup = page.root?.querySelector('.button-group');
      expect(buttonGroup?.classList.contains('button-group--horizontal')).toBe(true);
      expect(buttonGroup?.classList.contains('button-group--vertical')).toBe(false);
    });

    it('should render with vertical orientation when specified', async () => {
      const page = await newSpecPage({
        components: [AegovButtonGroup],
        html: `<aegov-button-group orientation="vertical"></aegov-button-group>`,
      });

      const buttonGroup = page.root?.querySelector('.button-group');
      expect(buttonGroup?.classList.contains('button-group--vertical')).toBe(true);
      expect(buttonGroup?.classList.contains('button-group--horizontal')).toBe(false);
    });

    it('should have role="group" for accessibility', async () => {
      const page = await newSpecPage({
        components: [AegovButtonGroup],
        html: `<aegov-button-group></aegov-button-group>`,
      });

      const buttonGroup = page.root?.querySelector('.button-group');
      expect(buttonGroup?.getAttribute('role')).toBe('group');
    });
  });

  describe('Button Management - Horizontal', () => {
    it('should set isFirst flag on first button in horizontal group', async () => {
      const page = await newSpecPage({
        components: [AegovButtonGroup, AegovButton],
        html: `
          <aegov-button-group>
            <aegov-button>First</aegov-button>
            <aegov-button>Second</aegov-button>
          </aegov-button-group>
        `,
      });

      await page.waitForChanges();
      const buttons = page.root?.querySelectorAll('aegov-button') as NodeListOf<HTMLAegovButtonElement>;
      expect(buttons[0].isFirst).toBe(true);
      expect(buttons[0].isLast).toBe(false);
    });

    it('should set isLast flag on last button in horizontal group', async () => {
      const page = await newSpecPage({
        components: [AegovButtonGroup, AegovButton],
        html: `
          <aegov-button-group>
            <aegov-button>First</aegov-button>
            <aegov-button>Last</aegov-button>
          </aegov-button-group>
        `,
      });

      await page.waitForChanges();
      const buttons = page.root?.querySelectorAll('aegov-button') as NodeListOf<HTMLAegovButtonElement>;
      expect(buttons[1].isLast).toBe(true);
      expect(buttons[1].isFirst).toBe(false);
    });

    it('should not set flags on middle buttons in horizontal group', async () => {
      const page = await newSpecPage({
        components: [AegovButtonGroup, AegovButton],
        html: `
          <aegov-button-group>
            <aegov-button>First</aegov-button>
            <aegov-button>Middle</aegov-button>
            <aegov-button>Last</aegov-button>
          </aegov-button-group>
        `,
      });

      await page.waitForChanges();
      const buttons = page.root?.querySelectorAll('aegov-button') as NodeListOf<HTMLAegovButtonElement>;
      expect(buttons[1].isFirst).toBe(false);
      expect(buttons[1].isLast).toBe(false);
    });

    it('should set isSingle flag on single button in horizontal group', async () => {
      const page = await newSpecPage({
        components: [AegovButtonGroup, AegovButton],
        html: `
          <aegov-button-group>
            <aegov-button>Only</aegov-button>
          </aegov-button-group>
        `,
      });

      await page.waitForChanges();
      const button = page.root?.querySelector('aegov-button') as HTMLAegovButtonElement;
      expect(button.isSingle).toBe(true);
      expect(button.isFirst).toBe(true);
      expect(button.isLast).toBe(true);
    });

    it('should pass horizontal orientation to all buttons', async () => {
      const page = await newSpecPage({
        components: [AegovButtonGroup, AegovButton],
        html: `
          <aegov-button-group orientation="horizontal">
            <aegov-button>First</aegov-button>
            <aegov-button>Second</aegov-button>
          </aegov-button-group>
        `,
      });

      await page.waitForChanges();
      const buttons = page.root?.querySelectorAll('aegov-button') as NodeListOf<HTMLAegovButtonElement>;
      expect(buttons[0].groupOrientation).toBe('horizontal');
      expect(buttons[1].groupOrientation).toBe('horizontal');
    });
  });

  describe('Button Management - Vertical', () => {
    it('should set isFirst flag on first button in vertical group', async () => {
      const page = await newSpecPage({
        components: [AegovButtonGroup, AegovButton],
        html: `
          <aegov-button-group orientation="vertical">
            <aegov-button>First</aegov-button>
            <aegov-button>Second</aegov-button>
          </aegov-button-group>
        `,
      });

      await page.waitForChanges();
      const buttons = page.root?.querySelectorAll('aegov-button') as NodeListOf<HTMLAegovButtonElement>;
      expect(buttons[0].isFirst).toBe(true);
      expect(buttons[0].isLast).toBe(false);
    });

    it('should set isLast flag on last button in vertical group', async () => {
      const page = await newSpecPage({
        components: [AegovButtonGroup, AegovButton],
        html: `
          <aegov-button-group orientation="vertical">
            <aegov-button>First</aegov-button>
            <aegov-button>Last</aegov-button>
          </aegov-button-group>
        `,
      });

      await page.waitForChanges();
      const buttons = page.root?.querySelectorAll('aegov-button') as NodeListOf<HTMLAegovButtonElement>;
      expect(buttons[1].isLast).toBe(true);
      expect(buttons[1].isFirst).toBe(false);
    });

    it('should not set flags on middle buttons in vertical group', async () => {
      const page = await newSpecPage({
        components: [AegovButtonGroup, AegovButton],
        html: `
          <aegov-button-group orientation="vertical">
            <aegov-button>First</aegov-button>
            <aegov-button>Middle</aegov-button>
            <aegov-button>Last</aegov-button>
          </aegov-button-group>
        `,
      });

      await page.waitForChanges();
      const buttons = page.root?.querySelectorAll('aegov-button') as NodeListOf<HTMLAegovButtonElement>;
      expect(buttons[1].isFirst).toBe(false);
      expect(buttons[1].isLast).toBe(false);
    });

    it('should pass vertical orientation to all buttons', async () => {
      const page = await newSpecPage({
        components: [AegovButtonGroup, AegovButton],
        html: `
          <aegov-button-group orientation="vertical">
            <aegov-button>First</aegov-button>
            <aegov-button>Second</aegov-button>
          </aegov-button-group>
        `,
      });

      await page.waitForChanges();
      const buttons = page.root?.querySelectorAll('aegov-button') as NodeListOf<HTMLAegovButtonElement>;
      expect(buttons[0].groupOrientation).toBe('vertical');
      expect(buttons[1].groupOrientation).toBe('vertical');
    });
  });

  describe('Direct Children Filtering', () => {
    it('should only affect direct child buttons, not nested ones', async () => {
      const page = await newSpecPage({
        components: [AegovButtonGroup, AegovButton],
        html: `
          <aegov-button-group>
            <aegov-button>Direct Child 1</aegov-button>
            <div>
              <aegov-button>Nested Child</aegov-button>
            </div>
            <aegov-button>Direct Child 2</aegov-button>
          </aegov-button-group>
        `,
      });

      await page.waitForChanges();
      const allButtons = page.root?.querySelectorAll('aegov-button') as NodeListOf<HTMLAegovButtonElement>;

      // First direct child should have isFirst
      expect(allButtons[0].isFirst).toBe(true);

      // Nested button should not have flags set
      expect(allButtons[1].isFirst).toBe(undefined);
      expect(allButtons[1].isLast).toBe(undefined);

      // Second direct child should have isLast
      expect(allButtons[2].isLast).toBe(true);
    });

    it('should handle nested button-groups independently', async () => {
      const page = await newSpecPage({
        components: [AegovButtonGroup, AegovButton],
        html: `
          <aegov-button-group>
            <aegov-button>Outer First</aegov-button>
            <aegov-button-group>
              <aegov-button>Inner First</aegov-button>
              <aegov-button>Inner Last</aegov-button>
            </aegov-button-group>
            <aegov-button>Outer Last</aegov-button>
          </aegov-button-group>
        `,
      });

      await page.waitForChanges();

      // Get outer group buttons
      const outerGroup = page.root as HTMLAegovButtonGroupElement;
      const outerButtons = Array.from(outerGroup.querySelectorAll(':scope > aegov-button')) as HTMLAegovButtonElement[];

      expect(outerButtons[0].isFirst).toBe(true);
      expect(outerButtons[1].isLast).toBe(true);
    });
  });

  describe('Validation', () => {
    it('should warn when non-button children are present', async () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

      await newSpecPage({
        components: [AegovButtonGroup, AegovButton],
        html: `
          <aegov-button-group>
            <aegov-button>Button</aegov-button>
            <div>Not a button</div>
          </aegov-button-group>
        `,
      });

      expect(consoleSpy).toHaveBeenCalledWith(
        expect.stringContaining('[aegov-button-group] All children must be <aegov-button> elements'),
        expect.any(Array)
      );

      consoleSpy.mockRestore();
    });

    it('should not warn when all children are buttons', async () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

      await newSpecPage({
        components: [AegovButtonGroup, AegovButton],
        html: `
          <aegov-button-group>
            <aegov-button>Button 1</aegov-button>
            <aegov-button>Button 2</aegov-button>
          </aegov-button-group>
        `,
      });

      expect(consoleSpy).not.toHaveBeenCalled();

      consoleSpy.mockRestore();
    });
  });

  describe('Dynamic Updates', () => {
    it('should update button flags when orientation changes', async () => {
      const page = await newSpecPage({
        components: [AegovButtonGroup, AegovButton],
        html: `
          <aegov-button-group>
            <aegov-button>Button 1</aegov-button>
            <aegov-button>Button 2</aegov-button>
          </aegov-button-group>
        `,
      });

      await page.waitForChanges();
      const buttons = page.root?.querySelectorAll('aegov-button') as NodeListOf<HTMLAegovButtonElement>;
      expect(buttons[0].groupOrientation).toBe('horizontal');

      // Change orientation
      const buttonGroup = page.root as HTMLAegovButtonGroupElement;
      buttonGroup.orientation = 'vertical';
      await page.waitForChanges();

      expect(buttons[0].groupOrientation).toBe('vertical');
    });

    it('should handle empty button group gracefully', async () => {
      const page = await newSpecPage({
        components: [AegovButtonGroup],
        html: `<aegov-button-group></aegov-button-group>`,
      });

      expect(page.root).toBeTruthy();
      // Should not throw errors
    });
  });

  describe('Edge Cases', () => {
    it('should handle button group with two buttons', async () => {
      const page = await newSpecPage({
        components: [AegovButtonGroup, AegovButton],
        html: `
          <aegov-button-group>
            <aegov-button>First</aegov-button>
            <aegov-button>Last</aegov-button>
          </aegov-button-group>
        `,
      });

      await page.waitForChanges();
      const buttons = page.root?.querySelectorAll('aegov-button') as NodeListOf<HTMLAegovButtonElement>;

      expect(buttons[0].isFirst).toBe(true);
      expect(buttons[0].isLast).toBe(false);
      expect(buttons[0].isSingle).toBe(false);

      expect(buttons[1].isFirst).toBe(false);
      expect(buttons[1].isLast).toBe(true);
      expect(buttons[1].isSingle).toBe(false);
    });

    it('should handle button group with many buttons', async () => {
      const page = await newSpecPage({
        components: [AegovButtonGroup, AegovButton],
        html: `
          <aegov-button-group>
            <aegov-button>1</aegov-button>
            <aegov-button>2</aegov-button>
            <aegov-button>3</aegov-button>
            <aegov-button>4</aegov-button>
            <aegov-button>5</aegov-button>
          </aegov-button-group>
        `,
      });

      await page.waitForChanges();
      const buttons = page.root?.querySelectorAll('aegov-button') as NodeListOf<HTMLAegovButtonElement>;

      expect(buttons[0].isFirst).toBe(true);
      expect(buttons[0].isLast).toBe(false);

      expect(buttons[2].isFirst).toBe(false);
      expect(buttons[2].isLast).toBe(false);

      expect(buttons[4].isFirst).toBe(false);
      expect(buttons[4].isLast).toBe(true);
    });
  });
});
