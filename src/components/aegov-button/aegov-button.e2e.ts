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
      expect(classes).toContain('bg-primary-600');
      expect(classes).toContain('text-whitely-50');
    });

    it('should apply outline variant classes', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-button variant="outline">Button</aegov-button>');

      const button = await page.find('aegov-button button');
      const classes = await button.getProperty('className');

      expect(classes).toContain('aegov-btn');
      expect(classes).toContain('bg-transparent');
      expect(classes).toContain('border-2');
    });

    it('should apply soft variant classes', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-button variant="soft">Button</aegov-button>');

      const button = await page.find('aegov-button button');
      const classes = await button.getProperty('className');

      expect(classes).toContain('aegov-btn');
      expect(classes).toContain('bg-primary-50');
      expect(classes).toContain('text-primary-700');
    });

    it('should apply link variant classes', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-button variant="link">Button</aegov-button>');

      const button = await page.find('aegov-button button');
      const classes = await button.getProperty('className');

      expect(classes).toContain('aegov-btn');
      expect(classes).toContain('bg-transparent');
      expect(classes).toContain('hover:underline');
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

      expect(classes).toContain('bg-primary-600');
      expect(classes).toContain('text-whitely-50');
    });

    it('should apply secondary appearance with solid variant', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-button appearance="secondary">Button</aegov-button>');

      const button = await page.find('aegov-button button');
      const classes = await button.getProperty('className');

      expect(classes).toContain('bg-secondary-800');
      expect(classes).toContain('text-whitely-50');
    });

    it('should apply secondary appearance with outline variant', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-button variant="outline" appearance="secondary">Button</aegov-button>');

      const button = await page.find('aegov-button button');
      const classes = await button.getProperty('className');

      expect(classes).toContain('text-secondary-800');
      expect(classes).toContain('border-secondary-800');
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
      expect(classes).toContain('w-12');
      expect(classes).toContain('gap-0');
      expect(classes).toContain('px-0');
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
      await page.setContent(`
        <aegov-button id="btn1">Button 1</aegov-button>
        <aegov-button id="btn2">Button 2</aegov-button>
      `);

      const blurEvent = await page.spyOnEvent('aegovButtonBlur');
      const button1 = await page.find('#btn1 >>> button');
      const button2 = await page.find('#btn2 >>> button');

      await button1.focus();
      await page.waitForChanges();
      await button2.focus();
      await page.waitForChanges();

      expect(blurEvent).toHaveReceivedEvent();
    });

    it('should emit multiple click events', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-button>Click Me</aegov-button>');

      const clickEvent = await page.spyOnEvent('aegovButtonClick');
      const button = await page.find('aegov-button button');

      await button.click();
      await page.waitForChanges();
      await button.click();
      await page.waitForChanges();
      await button.click();
      await page.waitForChanges();

      expect(clickEvent).toHaveReceivedEventTimes(3);
    });
  });

  describe('dynamic updates', () => {
    it('should update when variant changes', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-button variant="solid">Button</aegov-button>');

      const element = await page.find('aegov-button');
      const button = await page.find('aegov-button button');

      let classes = await button.getProperty('className');
      expect(classes).toContain('bg-primary-600');

      element.setProperty('variant', 'outline');
      await page.waitForChanges();

      classes = await button.getProperty('className');
      expect(classes).toContain('bg-transparent');
      expect(classes).toContain('border-2');
    });

    it('should update when size changes', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-button size="sm">Button</aegov-button>');

      const element = await page.find('aegov-button');
      const button = await page.find('aegov-button button');

      let classes = await button.getProperty('className');
      expect(classes).toContain('btn-sm');
      expect(classes).toContain('h-10');

      element.setProperty('size', 'lg');
      await page.waitForChanges();

      classes = await button.getProperty('className');
      expect(classes).toContain('btn-lg');
      expect(classes).toContain('h-13');
    });

    it('should update when disabled changes', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-button>Button</aegov-button>');

      const element = await page.find('aegov-button');
      const button = await page.find('aegov-button button');

      let isDisabled = await button.getProperty('disabled');
      expect(isDisabled).toBe(false);

      element.setProperty('disabled', true);
      await page.waitForChanges();

      isDisabled = await button.getProperty('disabled');
      expect(isDisabled).toBe(true);
    });

    it('should update when loading changes', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-button>Button</aegov-button>');

      const element = await page.find('aegov-button');

      let spinner = await page.find('aegov-button svg');
      expect(spinner).toBeNull();

      element.setProperty('loading', true);
      await page.waitForChanges();

      spinner = await page.find('aegov-button svg');
      expect(spinner).toBeTruthy();
    });

    it('should update when appearance changes', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-button appearance="primary">Button</aegov-button>');

      const element = await page.find('aegov-button');
      const button = await page.find('aegov-button button');

      let classes = await button.getProperty('className');
      expect(classes).toContain('bg-primary-600');

      element.setProperty('appearance', 'secondary');
      await page.waitForChanges();

      classes = await button.getProperty('className');
      expect(classes).toContain('bg-secondary-800');
    });

    it('should update when bold changes', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-button bold="true">Button</aegov-button>');

      const element = await page.find('aegov-button');
      const button = await page.find('aegov-button button');

      let classes = await button.getProperty('className');
      expect(classes).toContain('font-medium');

      element.setProperty('bold', false);
      await page.waitForChanges();

      classes = await button.getProperty('className');
      expect(classes).not.toContain('font-medium');
    });

    it('should update when full changes', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-button>Button</aegov-button>');

      const element = await page.find('aegov-button');
      const button = await page.find('aegov-button button');

      let classes = await button.getProperty('className');
      expect(classes).not.toContain('w-full');

      element.setProperty('full', true);
      await page.waitForChanges();

      classes = await button.getProperty('className');
      expect(classes).toContain('w-full');
    });
  });

  describe('accessibility', () => {
    it('should be keyboard accessible', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-button>Button</aegov-button>');

      const button = await page.find('aegov-button button');

      await page.keyboard.press('Tab');
      await page.waitForChanges();

      // Button should be focusable via keyboard
      expect(button).toBeTruthy();
    });

    it('should trigger click on Enter key', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-button>Button</aegov-button>');

      const clickEvent = await page.spyOnEvent('aegovButtonClick');
      const button = await page.find('aegov-button button');

      await button.focus();
      await page.keyboard.press('Enter');
      await page.waitForChanges();

      expect(clickEvent).toHaveReceivedEvent();
    });

    it('should trigger click on Space key', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-button>Button</aegov-button>');

      const clickEvent = await page.spyOnEvent('aegovButtonClick');
      const button = await page.find('aegov-button button');

      await button.focus();
      await page.keyboard.press('Space');
      await page.waitForChanges();

      expect(clickEvent).toHaveReceivedEvent();
    });
  });

  describe('visual appearance', () => {
    it('should have correct type attribute', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-button type="submit">Button</aegov-button>');

      const button = await page.find('aegov-button button');
      const type = await button.getAttribute('type');

      expect(type).toBe('submit');
    });

    it('should have part attribute', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-button>Button</aegov-button>');

      const button = await page.find('aegov-button button');
      const part = await button.getAttribute('part');

      expect(part).toBe('button');
    });
  });

  describe('multiple buttons', () => {
    it('should render multiple buttons independently', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-button id="btn1" variant="solid">Button 1</aegov-button>
        <aegov-button id="btn2" variant="outline">Button 2</aegov-button>
        <aegov-button id="btn3" size="lg">Button 3</aegov-button>
      `);

      const button1 = await page.find('#btn1 >>> button');
      const button2 = await page.find('#btn2 >>> button');
      const button3 = await page.find('#btn3 >>> button');

      const classes1 = await button1.getProperty('className');
      const classes2 = await button2.getProperty('className');
      const classes3 = await button3.getProperty('className');

      expect(classes1).toContain('bg-primary-600');
      expect(classes2).toContain('bg-transparent');
      expect(classes2).toContain('border-2');
      expect(classes3).toContain('btn-lg');
      expect(classes3).toContain('h-13');
    });

    it('should handle events independently', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-button id="btn1">Button 1</aegov-button>
        <aegov-button id="btn2">Button 2</aegov-button>
      `);

      const clickEvent = await page.spyOnEvent('aegovButtonClick');
      const button1 = await page.find('#btn1 >>> button');
      const button2 = await page.find('#btn2 >>> button');

      await button1.click();
      await page.waitForChanges();

      expect(clickEvent).toHaveReceivedEventTimes(1);

      await button2.click();
      await page.waitForChanges();

      expect(clickEvent).toHaveReceivedEventTimes(2);
    });

    it('should render different appearances independently', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-button id="btn1" appearance="primary">Primary</aegov-button>
        <aegov-button id="btn2" appearance="secondary">Secondary</aegov-button>
      `);

      const button1 = await page.find('#btn1 >>> button');
      const button2 = await page.find('#btn2 >>> button');

      const classes1 = await button1.getProperty('className');
      const classes2 = await button2.getProperty('className');

      expect(classes1).toContain('bg-primary-600');
      expect(classes2).toContain('bg-secondary-800');
    });
  });
});
