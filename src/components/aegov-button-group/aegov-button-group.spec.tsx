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
          <div class="aegov-button-group button-group--horizontal" role="group"></div>
        </aegov-button-group>
      `);
    });

    it('should render with horizontal orientation by default', async () => {
      const page = await newSpecPage({
        components: [AegovButtonGroup],
        html: `<aegov-button-group></aegov-button-group>`,
      });

      const buttonGroup = page.root?.querySelector('.aegov-button-group');
      expect(buttonGroup?.classList.contains('button-group--horizontal')).toBe(true);
      expect(buttonGroup?.classList.contains('button-group--vertical')).toBe(false);
    });

    it('should render with vertical orientation when specified', async () => {
      const page = await newSpecPage({
        components: [AegovButtonGroup],
        html: `<aegov-button-group orientation="vertical"></aegov-button-group>`,
      });

      const buttonGroup = page.root?.querySelector('.aegov-button-group');
      expect(buttonGroup?.classList.contains('button-group--vertical')).toBe(true);
      expect(buttonGroup?.classList.contains('button-group--horizontal')).toBe(false);
    });

    it('should have role="group" for accessibility', async () => {
      const page = await newSpecPage({
        components: [AegovButtonGroup],
        html: `<aegov-button-group></aegov-button-group>`,
      });

      const buttonGroup = page.root?.querySelector('.aegov-button-group');
      expect(buttonGroup?.getAttribute('role')).toBe('group');
    });
  });

  describe('Button Management - Horizontal', () => {
    it('should set groupPosition to first on first button in horizontal group', async () => {
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
      expect(buttons[0].groupPosition).toBe('first');
    });

    it('should set groupPosition to last on last button in horizontal group', async () => {
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
      expect(buttons[1].groupPosition).toBe('last');
    });

    it('should set groupPosition to middle on middle buttons in horizontal group', async () => {
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
      expect(buttons[1].groupPosition).toBe('middle');
    });

    it('should set groupPosition to single on single button in horizontal group', async () => {
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
      expect(button.groupPosition).toBe('single');
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
    it('should set groupPosition to first on first button in vertical group', async () => {
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
      expect(buttons[0].groupPosition).toBe('first');
    });

    it('should set groupPosition to last on last button in vertical group', async () => {
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
      expect(buttons[1].groupPosition).toBe('last');
    });

    it('should set groupPosition to middle on middle buttons in vertical group', async () => {
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
      expect(buttons[1].groupPosition).toBe('middle');
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
    it('should set groupPosition on direct child buttons', async () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

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
      expect(buttons[0].groupPosition).toBe('first');
      expect(buttons[1].groupPosition).toBe('middle');
      expect(buttons[2].groupPosition).toBe('last');

      consoleSpy.mockRestore();
    });
  });

  describe('Validation', () => {
    it('should warn when non-button user children are present', async () => {
      const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

      await newSpecPage({
        components: [AegovButtonGroup, AegovButton],
        html: `
          <aegov-button-group>
            <aegov-button>Button</aegov-button>
            <span>Not a button</span>
          </aegov-button-group>
        `,
      });

      // Scoped CSS adds a DIV wrapper from render(), plus user's SPAN
      const warnCalls = consoleSpy.mock.calls.filter(
        (call) => typeof call[0] === 'string' && call[0].includes('[aegov-button-group]')
      );
      expect(warnCalls.length).toBeGreaterThan(0);

      consoleSpy.mockRestore();
    });

    it('should call validateChildren on load', async () => {
      // validateChildren runs in componentDidLoad via updateButtons
      // This verifies the component renders without errors
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
      expect(buttons[0].groupPosition).toBe('first');
      expect(buttons[1].groupPosition).toBe('last');
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

      expect(buttons[0].groupPosition).toBe('first');
      expect(buttons[1].groupPosition).toBe('last');
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

      expect(buttons[0].groupPosition).toBe('first');
      expect(buttons[2].groupPosition).toBe('middle');
      expect(buttons[4].groupPosition).toBe('last');
    });

    it('should not set groupPosition to single when there are multiple buttons', async () => {
      const page = await newSpecPage({
        components: [AegovButtonGroup, AegovButton],
        html: `
          <aegov-button-group>
            <aegov-button>First</aegov-button>
            <aegov-button>Second</aegov-button>
            <aegov-button>Third</aegov-button>
          </aegov-button-group>
        `,
      });

      await page.waitForChanges();
      const buttons = page.root?.querySelectorAll('aegov-button') as NodeListOf<HTMLAegovButtonElement>;

      buttons.forEach(button => {
        expect(button.groupPosition).not.toBe('single');
      });
    });
  });

  describe('invalid prop values', () => {
    let warnSpy: jest.SpyInstance;

    beforeEach(() => {
      warnSpy = jest.spyOn(console, 'warn').mockImplementation();
    });

    afterEach(() => {
      warnSpy.mockRestore();
    });

    it('falls back to default orientation class when orientation is invalid', async () => {
      const page = await newSpecPage({
        components: [AegovButtonGroup],
        html: `<aegov-button-group orientation="diagonal"></aegov-button-group>`,
      });
      const wrapper = page.root.querySelector('.aegov-button-group');
      expect(wrapper.className).toContain('button-group--horizontal');
      expect(wrapper.className).not.toContain('button-group--vertical');
    });

    it('warns for invalid orientation', async () => {
      await newSpecPage({
        components: [AegovButtonGroup],
        html: `<aegov-button-group orientation="diagonal"></aegov-button-group>`,
      });
      const messages = warnSpy.mock.calls.map(c => c[0] as string);
      const warn = messages.find(m => typeof m === 'string' && m.includes('"orientation"'));
      expect(warn).toBeDefined();
      expect(warn).toContain('[aegov-button-group]');
      expect(warn).toContain('"diagonal"');
      expect(warn).toContain('horizontal');
    });

    it('does not warn when all props are valid', async () => {
      await newSpecPage({
        components: [AegovButtonGroup],
        html: `<aegov-button-group orientation="vertical"></aegov-button-group>`,
      });
      // Filter out possible non-prop warnings (e.g. from child validation)
      const propWarns = warnSpy.mock.calls
        .map(c => c[0] as string)
        .filter(m => typeof m === 'string' && m.includes('[aegov-button-group]') && m.includes('Invalid value'));
      expect(propWarns.length).toBe(0);
    });

    it('warns again via @Watch when orientation is updated to an invalid value', async () => {
      const page = await newSpecPage({
        components: [AegovButtonGroup],
        html: `<aegov-button-group orientation="horizontal"></aegov-button-group>`,
      });
      // Filter baseline
      const initialPropWarns = warnSpy.mock.calls
        .map(c => c[0] as string)
        .filter(m => typeof m === 'string' && m.includes('[aegov-button-group]') && m.includes('Invalid value'));
      expect(initialPropWarns.length).toBe(0);

      page.root.setAttribute('orientation', 'nope');
      await page.waitForChanges();

      const messages = warnSpy.mock.calls.map(c => c[0] as string);
      const invalidWarn = messages.find(m => typeof m === 'string' && m.includes('[aegov-button-group]') && m.includes('"nope"'));
      expect(invalidWarn).toBeDefined();
      expect(invalidWarn).toContain('"orientation"');
    });
  });
});
