import { newE2EPage } from '@stencil/core/testing';

describe('aegov-button-group E2E', () => {
  describe('Rendering', () => {
    it('should render with default horizontal orientation', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-button-group>
          <aegov-button>Button 1</aegov-button>
          <aegov-button>Button 2</aegov-button>
        </aegov-button-group>
      `);

      const buttonGroup = await page.find('aegov-button-group .aegov-button-group');
      expect(buttonGroup).toBeTruthy();
      expect(buttonGroup).toHaveClass('button-group--horizontal');
    });

    it('should render with vertical orientation', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-button-group orientation="vertical">
          <aegov-button>Button 1</aegov-button>
          <aegov-button>Button 2</aegov-button>
        </aegov-button-group>
      `);

      const buttonGroup = await page.find('aegov-button-group .aegov-button-group');
      expect(buttonGroup).toHaveClass('button-group--vertical');
    });

    it('should render role="group" for accessibility', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-button-group>
          <aegov-button>Button</aegov-button>
        </aegov-button-group>
      `);

      const buttonGroup = await page.find('aegov-button-group .aegov-button-group');
      const role = await buttonGroup.getAttribute('role');
      expect(role).toBe('group');
    });

    it('should render multiple buttons inside the group', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-button-group>
          <aegov-button>First</aegov-button>
          <aegov-button>Second</aegov-button>
          <aegov-button>Third</aegov-button>
        </aegov-button-group>
      `);

      const buttons = await page.findAll('aegov-button-group aegov-button');
      expect(buttons.length).toBe(3);
    });
  });

  describe('Visual Styling - Horizontal', () => {
    it('should apply btn-grouped-first-horizontal class to first button', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-button-group>
          <aegov-button>First</aegov-button>
          <aegov-button>Last</aegov-button>
        </aegov-button-group>
      `);

      await page.waitForChanges();
      const firstButton = await page.find('aegov-button:first-child button');
      const classList = await firstButton.getProperty('className');

      expect(classList).toContain('btn-grouped-first-horizontal');
    });

    it('should apply btn-grouped-last-horizontal class to last button', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-button-group>
          <aegov-button>First</aegov-button>
          <aegov-button>Last</aegov-button>
        </aegov-button-group>
      `);

      await page.waitForChanges();
      const lastButton = await page.find('aegov-button:last-child button');
      const classList = await lastButton.getProperty('className');

      expect(classList).toContain('btn-grouped-last-horizontal');
    });

    it('should apply btn-grouped-middle-horizontal class to middle buttons', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-button-group>
          <aegov-button>First</aegov-button>
          <aegov-button>Middle</aegov-button>
          <aegov-button>Last</aegov-button>
        </aegov-button-group>
      `);

      await page.waitForChanges();
      const middleButton = await page.find('aegov-button:nth-child(2) button');
      const classList = await middleButton.getProperty('className');

      expect(classList).toContain('btn-grouped-middle-horizontal');
    });

    it('should apply grouped classes to non-first buttons in horizontal group', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-button-group>
          <aegov-button>First</aegov-button>
          <aegov-button>Second</aegov-button>
          <aegov-button>Third</aegov-button>
        </aegov-button-group>
      `);

      await page.waitForChanges();
      const secondButton = await page.find('aegov-button:nth-child(2) button');
      const thirdButton = await page.find('aegov-button:nth-child(3) button');

      const secondClass = await secondButton.getProperty('className');
      const thirdClass = await thirdButton.getProperty('className');

      expect(secondClass).toContain('btn-grouped-middle-horizontal');
      expect(thirdClass).toContain('btn-grouped-last-horizontal');
    });

    it('should preserve single button styling in horizontal group', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-button-group>
          <aegov-button>Only</aegov-button>
        </aegov-button-group>
      `);

      await page.waitForChanges();
      const button = await page.find('aegov-button button');
      const classList = await button.getProperty('className');

      expect(classList).toContain('btn-grouped-single');
      // Should not have rounded-none or -ml-px
      expect(classList).not.toContain('rounded-none');
      expect(classList).not.toContain('-ml-px');
    });
  });

  describe('Visual Styling - Vertical', () => {
    it('should apply btn-grouped-first-vertical class to first button', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-button-group orientation="vertical">
          <aegov-button>First</aegov-button>
          <aegov-button>Last</aegov-button>
        </aegov-button-group>
      `);

      await page.waitForChanges();
      const firstButton = await page.find('aegov-button:first-child button');
      const classList = await firstButton.getProperty('className');

      expect(classList).toContain('btn-grouped-first-vertical');
    });

    it('should apply btn-grouped-last-vertical class to last button', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-button-group orientation="vertical">
          <aegov-button>First</aegov-button>
          <aegov-button>Last</aegov-button>
        </aegov-button-group>
      `);

      await page.waitForChanges();
      const lastButton = await page.find('aegov-button:last-child button');
      const classList = await lastButton.getProperty('className');

      expect(classList).toContain('btn-grouped-last-vertical');
    });

    it('should apply btn-grouped-middle-vertical class to middle buttons', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-button-group orientation="vertical">
          <aegov-button>First</aegov-button>
          <aegov-button>Middle</aegov-button>
          <aegov-button>Last</aegov-button>
        </aegov-button-group>
      `);

      await page.waitForChanges();
      const middleButton = await page.find('aegov-button:nth-child(2) button');
      const classList = await middleButton.getProperty('className');

      expect(classList).toContain('btn-grouped-middle-vertical');
    });

    it('should apply grouped classes to non-first buttons in vertical group', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-button-group orientation="vertical">
          <aegov-button>First</aegov-button>
          <aegov-button>Second</aegov-button>
          <aegov-button>Third</aegov-button>
        </aegov-button-group>
      `);

      await page.waitForChanges();
      const secondButton = await page.find('aegov-button:nth-child(2) button');
      const thirdButton = await page.find('aegov-button:nth-child(3) button');

      const secondClass = await secondButton.getProperty('className');
      const thirdClass = await thirdButton.getProperty('className');

      expect(secondClass).toContain('btn-grouped-middle-vertical');
      expect(thirdClass).toContain('btn-grouped-last-vertical');
    });
  });

  describe('Interactivity', () => {
    it('should allow clicking all buttons in horizontal group', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-button-group>
          <aegov-button>First</aegov-button>
          <aegov-button>Second</aegov-button>
          <aegov-button>Third</aegov-button>
        </aegov-button-group>
      `);

      const firstButton = await page.find('aegov-button:first-child');
      const secondButton = await page.find('aegov-button:nth-child(2)');
      const thirdButton = await page.find('aegov-button:last-child');

      const firstClickEvent = await firstButton.spyOnEvent('aegovButtonClick');
      const secondClickEvent = await secondButton.spyOnEvent('aegovButtonClick');
      const thirdClickEvent = await thirdButton.spyOnEvent('aegovButtonClick');

      await firstButton.click();
      await secondButton.click();
      await thirdButton.click();

      expect(firstClickEvent).toHaveReceivedEventTimes(1);
      expect(secondClickEvent).toHaveReceivedEventTimes(1);
      expect(thirdClickEvent).toHaveReceivedEventTimes(1);
    });

    it('should allow clicking all buttons in vertical group', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-button-group orientation="vertical">
          <aegov-button>First</aegov-button>
          <aegov-button>Second</aegov-button>
        </aegov-button-group>
      `);

      const firstButton = await page.find('aegov-button:first-child');
      const secondButton = await page.find('aegov-button:last-child');

      const firstClickEvent = await firstButton.spyOnEvent('aegovButtonClick');
      const secondClickEvent = await secondButton.spyOnEvent('aegovButtonClick');

      await firstButton.click();
      await secondButton.click();

      expect(firstClickEvent).toHaveReceivedEventTimes(1);
      expect(secondClickEvent).toHaveReceivedEventTimes(1);
    });
  });

  describe('Different Button Variants', () => {
    it('should work with solid variant buttons', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-button-group>
          <aegov-button variant="solid">First</aegov-button>
          <aegov-button variant="solid">Last</aegov-button>
        </aegov-button-group>
      `);

      await page.waitForChanges();
      const firstButton = await page.find('aegov-button:first-child button');
      const classList = await firstButton.getProperty('className');

      expect(classList).toContain('btn-solid');
      expect(classList).toContain('btn-grouped-first-horizontal');
    });

    it('should work with outline variant buttons', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-button-group>
          <aegov-button variant="outline">First</aegov-button>
          <aegov-button variant="outline">Last</aegov-button>
        </aegov-button-group>
      `);

      await page.waitForChanges();
      const firstButton = await page.find('aegov-button:first-child button');
      const classList = await firstButton.getProperty('className');

      expect(classList).toContain('btn-outline');
      expect(classList).toContain('btn-grouped-first-horizontal');
    });

    it('should work with soft variant buttons', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-button-group>
          <aegov-button variant="soft">First</aegov-button>
          <aegov-button variant="soft">Last</aegov-button>
        </aegov-button-group>
      `);

      await page.waitForChanges();
      const firstButton = await page.find('aegov-button:first-child button');
      const classList = await firstButton.getProperty('className');

      expect(classList).toContain('btn-soft');
      expect(classList).toContain('btn-grouped-first-horizontal');
    });
  });

  describe('Different Button Sizes', () => {
    it('should work with xs size buttons', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-button-group>
          <aegov-button size="xs">First</aegov-button>
          <aegov-button size="xs">Last</aegov-button>
        </aegov-button-group>
      `);

      await page.waitForChanges();
      const buttons = await page.findAll('aegov-button button');

      for (const button of buttons) {
        const classList = await button.getProperty('className');
        expect(classList).toContain('btn-xs');
      }
    });

    it('should work with lg size buttons', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-button-group>
          <aegov-button size="lg">First</aegov-button>
          <aegov-button size="lg">Last</aegov-button>
        </aegov-button-group>
      `);

      await page.waitForChanges();
      const buttons = await page.findAll('aegov-button button');

      for (const button of buttons) {
        const classList = await button.getProperty('className');
        expect(classList).toContain('btn-lg');
      }
    });
  });

  describe('Mixed Configurations', () => {
    it('should handle mixed button variants in group', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-button-group>
          <aegov-button variant="solid">Solid</aegov-button>
          <aegov-button variant="outline">Outline</aegov-button>
          <aegov-button variant="soft">Soft</aegov-button>
        </aegov-button-group>
      `);

      await page.waitForChanges();
      const buttons = await page.findAll('aegov-button button');

      // All should have grouped classes even with different variants
      const firstClass = await buttons[0].getProperty('className');
      const middleClass = await buttons[1].getProperty('className');
      const lastClass = await buttons[2].getProperty('className');

      expect(firstClass).toContain('btn-grouped-first-horizontal');
      expect(middleClass).toContain('btn-grouped-middle-horizontal');
      expect(lastClass).toContain('btn-grouped-last-horizontal');
    });

    it('should handle mixed button appearances in group', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-button-group>
          <aegov-button appearance="primary">Primary</aegov-button>
          <aegov-button appearance="secondary">Secondary</aegov-button>
          <aegov-button appearance="danger">Danger</aegov-button>
        </aegov-button-group>
      `);

      await page.waitForChanges();
      const buttons = await page.findAll('aegov-button button');

      // All should have grouped classes
      const firstClass = await buttons[0].getProperty('className');
      const lastClass = await buttons[2].getProperty('className');

      expect(firstClass).toContain('btn-grouped-first-horizontal');
      expect(lastClass).toContain('btn-grouped-last-horizontal');
    });
  });
});
