import { newE2EPage } from '@stencil/core/testing';

describe('aegov-button E2E', () => {
  describe('rendering', () => {
    it('should render', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-button>Click Me</aegov-button>');

      const element = await page.find('aegov-button');
      expect(element).toBeTruthy();
      expect(element).toHaveClass('hydrated');
    });

    it('should render button element', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-button>Click Me</aegov-button>');

      const button = await page.find('aegov-button button');
      expect(button).toBeTruthy();
      expect(button.textContent).toBe('Click Me');
    });

    it('should render slot content', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-button>
          <span id="custom">Custom Content</span>
        </aegov-button>
      `);

      const customContent = await page.find('aegov-button #custom');
      expect(customContent).toBeTruthy();
      expect(customContent.textContent).toBe('Custom Content');
    });
  });

  describe('variants', () => {
    it('should apply solid variant classes', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-button variant="solid">Button</aegov-button>');

      const button = await page.find('aegov-button button');
      const classes = await button.getProperty('className');

      expect(classes).toContain('aegov-btn');
      expect(classes).toContain('btn-solid');
      expect(classes).toContain('btn-primary');
    });

    it('should apply outline variant classes', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-button variant="outline">Button</aegov-button>');

      const button = await page.find('aegov-button button');
      const classes = await button.getProperty('className');

      expect(classes).toContain('aegov-btn');
      expect(classes).toContain('btn-outline');
      expect(classes).toContain('btn-primary');
    });

    it('should apply soft variant classes', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-button variant="soft">Button</aegov-button>');

      const button = await page.find('aegov-button button');
      const classes = await button.getProperty('className');

      expect(classes).toContain('aegov-btn');
      expect(classes).toContain('btn-soft');
      expect(classes).toContain('btn-primary');
    });

    it('should apply link variant classes', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-button variant="link">Button</aegov-button>');

      const button = await page.find('aegov-button button');
      const classes = await button.getProperty('className');

      expect(classes).toContain('aegov-btn');
      expect(classes).toContain('btn-link');
      expect(classes).toContain('btn-primary');
    });
  });

  describe('sizes', () => {
    it('should apply xs size classes', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-button size="xs">Button</aegov-button>');

      const button = await page.find('aegov-button button');
      const classes = await button.getProperty('className');

      expect(classes).toContain('aegov-btn');
      expect(classes).toContain('btn-xs');
    });

    it('should apply sm size classes', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-button size="sm">Button</aegov-button>');

      const button = await page.find('aegov-button button');
      const classes = await button.getProperty('className');

      expect(classes).toContain('aegov-btn');
      expect(classes).toContain('btn-sm');
    });

    it('should apply base size classes', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-button size="base">Button</aegov-button>');

      const button = await page.find('aegov-button button');
      const classes = await button.getProperty('className');

      expect(classes).toContain('aegov-btn');
      expect(classes).toContain('btn-base');
    });

    it('should apply lg size classes', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-button size="lg">Button</aegov-button>');

      const button = await page.find('aegov-button button');
      const classes = await button.getProperty('className');

      expect(classes).toContain('aegov-btn');
      expect(classes).toContain('btn-lg');
    });
  });

  describe('appearance', () => {
    it('should apply primary appearance by default', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-button>Button</aegov-button>');

      const button = await page.find('aegov-button button');
      const classes = await button.getProperty('className');

      expect(classes).toContain('btn-primary');
      expect(classes).toContain('btn-solid');
    });

    it('should apply secondary appearance with solid variant', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-button appearance="secondary">Button</aegov-button>');

      const button = await page.find('aegov-button button');
      const classes = await button.getProperty('className');

      expect(classes).toContain('btn-secondary');
      expect(classes).toContain('btn-solid');
    });

    it('should apply secondary appearance with outline variant', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-button variant="outline" appearance="secondary">Button</aegov-button>');

      const button = await page.find('aegov-button button');
      const classes = await button.getProperty('className');

      expect(classes).toContain('btn-secondary');
      expect(classes).toContain('btn-outline');
    });
  });

  describe('states', () => {
    it('should handle disabled state', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-button disabled>Button</aegov-button>');

      const button = await page.find('aegov-button button');
      const isDisabled = await button.getProperty('disabled');
      const ariaDisabled = await button.getAttribute('aria-disabled');

      expect(isDisabled).toBe(true);
      expect(ariaDisabled).toBe('true');
    });

    it('should handle loading state', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-button loading>Button</aegov-button>');

      const button = await page.find('aegov-button button');
      const spinner = await page.find('aegov-button svg');
      const ariaBusy = await button.getAttribute('aria-busy');

      expect(spinner).toBeTruthy();
      expect(ariaBusy).toBe('true');
    });

    it('should handle full width state', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-button full>Button</aegov-button>');

      const button = await page.find('aegov-button button');
      const classes = await button.getProperty('className');

      expect(classes).toContain('w-full');
    });

    it('should handle icon-only state', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-button icon>Button</aegov-button>');

      const button = await page.find('aegov-button button');
      const classes = await button.getProperty('className');

      expect(classes).toContain('btn-icon');
    });

    it('should handle bold state by default', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-button>Button</aegov-button>');

      const button = await page.find('aegov-button button');
      const classes = await button.getProperty('className');

      expect(classes).toContain('font-medium');
    });

    it('should handle non-bold state when bold=false', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-button bold="false">Button</aegov-button>');

      const button = await page.find('aegov-button button');
      const classes = await button.getProperty('className');

      expect(classes).not.toContain('font-medium');
    });
  });

  describe('events', () => {
    it('should emit aegovButtonClick on button click', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-button>Click Me</aegov-button>');

      const clickEvent = await page.spyOnEvent('aegovButtonClick');
      const button = await page.find('aegov-button button');

      await button.click();
      await page.waitForChanges();

      expect(clickEvent).toHaveReceivedEvent();
      expect(clickEvent).toHaveReceivedEventTimes(1);
    });

    it('should not emit aegovButtonClick when disabled', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-button disabled>Click Me</aegov-button>');

      const clickEvent = await page.spyOnEvent('aegovButtonClick');
      const button = await page.find('aegov-button button');

      await button.click();
      await page.waitForChanges();

      expect(clickEvent).not.toHaveReceivedEvent();
    });

    it('should not emit aegovButtonClick when loading', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-button loading>Click Me</aegov-button>');

      const clickEvent = await page.spyOnEvent('aegovButtonClick');
      const button = await page.find('aegov-button button');

      await button.click();
      await page.waitForChanges();

      expect(clickEvent).not.toHaveReceivedEvent();
    });

    it('should emit aegovButtonFocus on focus', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-button>Button</aegov-button>');

      const focusEvent = await page.spyOnEvent('aegovButtonFocus');
      const button = await page.find('aegov-button button');

      await button.focus();
      await page.waitForChanges();

      expect(focusEvent).toHaveReceivedEvent();
    });

    it('should emit aegovButtonBlur on blur', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-button>Button</aegov-button>');

      const blurEvent = await page.spyOnEvent('aegovButtonBlur');
      const button = await page.find('aegov-button button');

      await button.focus();
      await button.blur();
      await page.waitForChanges();

      expect(blurEvent).toHaveReceivedEvent();
    });
  });

  describe('accessibility', () => {
    it('should have proper aria-disabled attribute', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-button disabled>Button</aegov-button>');

      const button = await page.find('aegov-button button');
      const ariaDisabled = await button.getAttribute('aria-disabled');

      expect(ariaDisabled).toBe('true');
    });

    it('should have proper aria-busy attribute when loading', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-button loading>Button</aegov-button>');

      const button = await page.find('aegov-button button');
      const ariaBusy = await button.getAttribute('aria-busy');

      expect(ariaBusy).toBe('true');
    });

    it('should have part attribute', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-button>Button</aegov-button>');

      const button = await page.find('aegov-button button');
      const part = await button.getAttribute('part');

      expect(part).toBe('button');
    });
  });

  describe('combinations', () => {
    it('should combine variant and size correctly', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-button variant="outline" size="lg">Button</aegov-button>');

      const button = await page.find('aegov-button button');
      const classes = await button.getProperty('className');

      expect(classes).toContain('btn-outline');
      expect(classes).toContain('btn-lg');
    });

    it('should combine appearance with variant', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-button variant="soft" appearance="secondary">Button</aegov-button>');

      const button = await page.find('aegov-button button');
      const classes = await button.getProperty('className');

      expect(classes).toContain('btn-soft');
      expect(classes).toContain('btn-secondary');
    });
  });

  describe('dynamic updates', () => {
    it('should update classes when variant changes', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-button variant="solid">Button</aegov-button>');

      const element = await page.find('aegov-button');
      let button = await page.find('aegov-button button');
      let classes = await button.getProperty('className');

      expect(classes).toContain('btn-solid');

      element.setProperty('appearance', 'secondary');
      await page.waitForChanges();

      classes = await button.getProperty('className');
      expect(classes).toContain('btn-secondary');
    });
  });

  describe('multiple buttons', () => {
    it('should render multiple buttons independently', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-button variant="solid" id="btn1">Button 1</aegov-button>
        <aegov-button variant="outline" id="btn2">Button 2</aegov-button>
        <aegov-button variant="soft" size="lg" id="btn3">Button 3</aegov-button>
      `);

      const button1 = await page.find('#btn1 button');
      const button2 = await page.find('#btn2 button');
      const button3 = await page.find('#btn3 button');

      const classes1 = await button1.getProperty('className');
      const classes2 = await button2.getProperty('className');
      const classes3 = await button3.getProperty('className');

      expect(classes1).toContain('btn-solid');
      expect(classes2).toContain('btn-outline');
      expect(classes3).toContain('btn-lg');
    });

    it('should render different appearances independently', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-button appearance="primary" id="btn1">Button 1</aegov-button>
        <aegov-button appearance="secondary" id="btn2">Button 2</aegov-button>
      `);

      const button1 = await page.find('#btn1 button');
      const button2 = await page.find('#btn2 button');

      const classes1 = await button1.getProperty('className');
      const classes2 = await button2.getProperty('className');

      expect(classes1).toContain('btn-primary');
      expect(classes2).toContain('btn-secondary');
    });
  });
});
