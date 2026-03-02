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
      await page.setContent('<aegov-button><span id="custom">Custom Content</span></aegov-button>');
      const customContent = await page.find('aegov-button #custom');
      expect(customContent).toBeTruthy();
      expect(customContent.textContent).toBe('Custom Content');
    });
  });

  describe('variants', () => {
    const variants = ['solid', 'outline', 'soft', 'link'];
    variants.forEach(variant => {
      it(`should apply btn-${variant} class`, async () => {
        const page = await newE2EPage();
        await page.setContent(`<aegov-button variant="${variant}">Button</aegov-button>`);
        const button = await page.find('aegov-button button');
        const classes = await button.getProperty('className');
        expect(classes).toContain('aegov-btn');
        expect(classes).toContain(`btn-${variant}`);
      });
    });
  });

  describe('sizes', () => {
    const sizes = ['xs', 'sm', 'base', 'lg'];
    sizes.forEach(size => {
      it(`should apply btn-${size} class`, async () => {
        const page = await newE2EPage();
        await page.setContent(`<aegov-button size="${size}">Button</aegov-button>`);
        const button = await page.find('aegov-button button');
        const classes = await button.getProperty('className');
        expect(classes).toContain(`btn-${size}`);
      });
    });
  });

  describe('appearances', () => {
    it('should apply primary appearance by default', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-button>Button</aegov-button>');
      const button = await page.find('aegov-button button');
      const classes = await button.getProperty('className');
      expect(classes).toContain('btn-primary');
      expect(classes).toContain('btn-solid');
    });

    it('should apply secondary appearance', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-button appearance="secondary">Button</aegov-button>');
      const button = await page.find('aegov-button button');
      const classes = await button.getProperty('className');
      expect(classes).toContain('btn-secondary');
    });

    it('should combine appearance with variant', async () => {
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
      expect(await button.getProperty('disabled')).toBe(true);
      expect(await button.getAttribute('aria-disabled')).toBe('true');
    });

    it('should handle loading state', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-button loading>Button</aegov-button>');
      const button = await page.find('aegov-button button');
      const spinner = await page.find('aegov-button svg');
      expect(spinner).toBeTruthy();
      expect(await button.getAttribute('aria-busy')).toBe('true');
    });

    it('should handle full width', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-button full>Button</aegov-button>');
      const button = await page.find('aegov-button button');
      const classes = await button.getProperty('className');
      expect(classes).toContain('w-full');
    });

    it('should handle icon-only', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-button icon>Button</aegov-button>');
      const button = await page.find('aegov-button button');
      const classes = await button.getProperty('className');
      expect(classes).toContain('btn-icon');
    });

    it('should handle bold by default', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-button>Button</aegov-button>');
      const button = await page.find('aegov-button button');
      const classes = await button.getProperty('className');
      expect(classes).toContain('font-medium');
    });

    it('should handle non-bold when bold=false', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-button bold="false">Button</aegov-button>');
      const button = await page.find('aegov-button button');
      const classes = await button.getProperty('className');
      expect(classes).not.toContain('font-medium');
    });
  });

  describe('events', () => {
    it('should emit aegovButtonClick on click', async () => {
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
      await page.setContent('<aegov-button>Button</aegov-button><div id="other">Other</div>');
      const blurEvent = await page.spyOnEvent('aegovButtonBlur');
      const button = await page.find('aegov-button button');
      await button.focus();
      await page.waitForChanges();
      await page.click('#other');
      await page.waitForChanges();
      expect(blurEvent).toHaveReceivedEvent();
    });
  });

  describe('accessibility', () => {
    it('should have aria-disabled when disabled', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-button disabled>Button</aegov-button>');
      const button = await page.find('aegov-button button');
      expect(await button.getAttribute('aria-disabled')).toBe('true');
    });

    it('should have aria-busy when loading', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-button loading>Button</aegov-button>');
      const button = await page.find('aegov-button button');
      expect(await button.getAttribute('aria-busy')).toBe('true');
    });

    it('should have part attribute', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-button>Button</aegov-button>');
      const button = await page.find('aegov-button button');
      expect(await button.getAttribute('part')).toBe('button');
    });
  });

  describe('combinations', () => {
    it('should combine variant and size', async () => {
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
    it('should update when appearance changes', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-button variant="solid">Button</aegov-button>');
      const element = await page.find('aegov-button');
      const button = await page.find('aegov-button button');

      let classes = await button.getProperty('className');
      expect(classes).toContain('btn-solid');

      element.setProperty('appearance', 'secondary');
      await page.waitForChanges();

      classes = await button.getProperty('className');
      expect(classes).toContain('btn-secondary');
    });
  });

  describe('multiple buttons', () => {
    it('should render independently', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-button variant="solid" id="btn1">Button 1</aegov-button>
        <aegov-button variant="outline" id="btn2">Button 2</aegov-button>
        <aegov-button variant="soft" size="lg" id="btn3">Button 3</aegov-button>
      `);

      const button1 = await page.find('#btn1 button');
      const button2 = await page.find('#btn2 button');
      const button3 = await page.find('#btn3 button');

      expect(await button1.getProperty('className')).toContain('btn-solid');
      expect(await button2.getProperty('className')).toContain('btn-outline');
      expect(await button3.getProperty('className')).toContain('btn-lg');
    });
  });
});
