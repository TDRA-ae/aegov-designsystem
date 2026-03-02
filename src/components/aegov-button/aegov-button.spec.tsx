import { newSpecPage } from '@stencil/core/testing';
import { AegovButton } from './aegov-button';

describe('aegov-button', () => {
  describe('rendering', () => {
    it('should render with default props', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button>Click Me</aegov-button>`,
      });

      expect(page.root).toBeTruthy();
      const button = page.root.querySelector('button');
      expect(button).toBeTruthy();
      expect(button.textContent).toBe('Click Me');
      expect(button.getAttribute('type')).toBe('button');
      expect(button.getAttribute('part')).toBe('button');
    });

    it('should render slot content', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button><span>Custom Content</span></aegov-button>`,
      });

      const slotContent = page.root.querySelector('span');
      expect(slotContent.textContent).toBe('Custom Content');
    });
  });

  describe('default props', () => {
    it('defaults variant to solid', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button>Button</aegov-button>`,
      });
      expect(page.rootInstance.variant).toBe('solid');
    });

    it('defaults size to base', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button>Button</aegov-button>`,
      });
      expect(page.rootInstance.size).toBe('base');
    });

    it('defaults type to button', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button>Button</aegov-button>`,
      });
      expect(page.rootInstance.type).toBe('button');
    });

    it('defaults appearance to primary', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button>Button</aegov-button>`,
      });
      expect(page.rootInstance.appearance).toBe('primary');
    });

    it('defaults disabled to false', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button>Button</aegov-button>`,
      });
      expect(page.rootInstance.disabled).toBe(false);
    });

    it('defaults bold to true', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button>Button</aegov-button>`,
      });
      expect(page.rootInstance.bold).toBe(true);
    });
  });

  describe('variants', () => {
    const variants = ['solid', 'outline', 'soft', 'link'];
    variants.forEach(variant => {
      it(`should apply btn-${variant} class`, async () => {
        const page = await newSpecPage({
          components: [AegovButton],
          html: `<aegov-button variant="${variant}">Button</aegov-button>`,
        });
        const button = page.root.querySelector('button');
        expect(button.classList.contains('aegov-btn')).toBe(true);
        expect(button.classList.contains(`btn-${variant}`)).toBe(true);
      });
    });
  });

  describe('sizes', () => {
    const sizes = ['xs', 'sm', 'base', 'lg'];
    sizes.forEach(size => {
      it(`should apply btn-${size} class`, async () => {
        const page = await newSpecPage({
          components: [AegovButton],
          html: `<aegov-button size="${size}">Button</aegov-button>`,
        });
        const button = page.root.querySelector('button');
        expect(button.classList.contains(`btn-${size}`)).toBe(true);
      });
    });
  });

  describe('appearances', () => {
    it('should apply btn-primary by default', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button>Button</aegov-button>`,
      });
      const button = page.root.querySelector('button');
      expect(button.classList.contains('btn-primary')).toBe(true);
    });

    it('should apply btn-secondary', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button appearance="secondary">Button</aegov-button>`,
      });
      const button = page.root.querySelector('button');
      expect(button.classList.contains('btn-secondary')).toBe(true);
    });

    it('should apply btn-danger', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button appearance="danger">Button</aegov-button>`,
      });
      const button = page.root.querySelector('button');
      expect(button.classList.contains('btn-danger')).toBe(true);
    });

    it('should apply btn-neutral-min', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button appearance="neutralMin">Button</aegov-button>`,
      });
      const button = page.root.querySelector('button');
      expect(button.classList.contains('btn-neutral-min')).toBe(true);
    });

    it('should apply btn-neutral-max', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button appearance="neutralMax">Button</aegov-button>`,
      });
      const button = page.root.querySelector('button');
      expect(button.classList.contains('btn-neutral-max')).toBe(true);
    });
  });

  describe('type attribute', () => {
    it('should render button type by default', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button>Button</aegov-button>`,
      });
      const button = page.root.querySelector('button');
      expect(button.getAttribute('type')).toBe('button');
    });

    it('should render submit type', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button type="submit">Button</aegov-button>`,
      });
      const button = page.root.querySelector('button');
      expect(button.getAttribute('type')).toBe('submit');
    });

    it('should render reset type', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button type="reset">Button</aegov-button>`,
      });
      const button = page.root.querySelector('button');
      expect(button.getAttribute('type')).toBe('reset');
    });
  });

  describe('disabled state', () => {
    it('should not be disabled by default', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button>Button</aegov-button>`,
      });
      const button = page.root.querySelector('button');
      expect(button.hasAttribute('disabled')).toBe(false);
      expect(button.getAttribute('aria-disabled')).toBe('false');
    });

    it('should render disabled state', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button disabled>Button</aegov-button>`,
      });
      const button = page.root.querySelector('button');
      expect(button.hasAttribute('disabled')).toBe(true);
      expect(button.getAttribute('aria-disabled')).toBe('true');
      expect(button.classList.contains('cursor-not-allowed')).toBe(true);
      expect(button.classList.contains('pointer-events-none')).toBe(true);
    });
  });

  describe('loading state', () => {
    it('should not be loading by default', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button>Button</aegov-button>`,
      });
      const button = page.root.querySelector('button');
      expect(button.querySelector('svg')).toBeNull();
      expect(button.getAttribute('aria-busy')).toBe('false');
    });

    it('should render loading spinner', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button loading>Button</aegov-button>`,
      });
      const button = page.root.querySelector('button');
      const spinner = button.querySelector('svg');
      expect(spinner).toBeTruthy();
      expect(spinner.classList.contains('animate-spin')).toBe(true);
      expect(button.getAttribute('aria-busy')).toBe('true');
    });

    it('should disable button when loading', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button loading>Button</aegov-button>`,
      });
      const button = page.root.querySelector('button');
      expect(button.hasAttribute('disabled')).toBe(true);
      expect(button.getAttribute('aria-disabled')).toBe('true');
    });
  });

  describe('full width', () => {
    it('should not be full width by default', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button>Button</aegov-button>`,
      });
      const button = page.root.querySelector('button');
      expect(button.classList.contains('w-full')).toBe(false);
    });

    it('should apply w-full class', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button full>Button</aegov-button>`,
      });
      const button = page.root.querySelector('button');
      expect(button.classList.contains('w-full')).toBe(true);
    });
  });

  describe('bold', () => {
    it('should be bold by default', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button>Button</aegov-button>`,
      });
      const button = page.root.querySelector('button');
      expect(button.classList.contains('font-medium')).toBe(true);
    });

    it('should not be bold when bold=false', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button bold="false">Button</aegov-button>`,
      });
      const button = page.root.querySelector('button');
      expect(button.classList.contains('font-medium')).toBe(false);
    });
  });

  describe('icon', () => {
    it('should not be icon-only by default', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button>Button</aegov-button>`,
      });
      const button = page.root.querySelector('button');
      expect(button.classList.contains('btn-icon')).toBe(false);
    });

    it('should apply btn-icon class', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button icon>Button</aegov-button>`,
      });
      const button = page.root.querySelector('button');
      expect(button.classList.contains('btn-icon')).toBe(true);
    });
  });

  describe('events', () => {
    it('should emit aegovButtonClick when clicked', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button>Button</aegov-button>`,
      });
      const clickSpy = jest.fn();
      page.root.addEventListener('aegovButtonClick', clickSpy);
      const button = page.root.querySelector('button');
      button.click();
      await page.waitForChanges();
      expect(clickSpy).toHaveBeenCalled();
    });

    it('should not emit aegovButtonClick when disabled', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button disabled>Button</aegov-button>`,
      });
      const clickSpy = jest.fn();
      page.root.addEventListener('aegovButtonClick', clickSpy);
      const button = page.root.querySelector('button');
      button.click();
      await page.waitForChanges();
      expect(clickSpy).not.toHaveBeenCalled();
    });

    it('should not emit aegovButtonClick when loading', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button loading>Button</aegov-button>`,
      });
      const clickSpy = jest.fn();
      page.root.addEventListener('aegovButtonClick', clickSpy);
      const button = page.root.querySelector('button');
      button.click();
      await page.waitForChanges();
      expect(clickSpy).not.toHaveBeenCalled();
    });

    it('should emit aegovButtonFocus on focus', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button>Button</aegov-button>`,
      });
      const focusSpy = jest.fn();
      page.root.addEventListener('aegovButtonFocus', focusSpy);
      const button = page.root.querySelector('button');
      button.dispatchEvent(new FocusEvent('focus'));
      await page.waitForChanges();
      expect(focusSpy).toHaveBeenCalled();
    });

    it('should emit aegovButtonBlur on blur', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button>Button</aegov-button>`,
      });
      const blurSpy = jest.fn();
      page.root.addEventListener('aegovButtonBlur', blurSpy);
      const button = page.root.querySelector('button');
      button.dispatchEvent(new FocusEvent('blur'));
      await page.waitForChanges();
      expect(blurSpy).toHaveBeenCalled();
    });
  });

  describe('accessibility', () => {
    it('should have aria-disabled when disabled', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button disabled>Button</aegov-button>`,
      });
      const button = page.root.querySelector('button');
      expect(button.getAttribute('aria-disabled')).toBe('true');
    });

    it('should have aria-busy when loading', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button loading>Button</aegov-button>`,
      });
      const button = page.root.querySelector('button');
      expect(button.getAttribute('aria-busy')).toBe('true');
    });

    it('should have part attribute', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button>Button</aegov-button>`,
      });
      const button = page.root.querySelector('button');
      expect(button.getAttribute('part')).toBe('button');
    });
  });

  describe('pass-through attributes', () => {
    it('should pass through data-* attributes', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button data-testid="my-btn">Button</aegov-button>`,
      });
      const button = page.root.querySelector('button');
      expect(button.getAttribute('data-testid')).toBe('my-btn');
    });

    it('should pass through aria-* attributes', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button aria-label="Submit form">Button</aegov-button>`,
      });
      const button = page.root.querySelector('button');
      expect(button.getAttribute('aria-label')).toBe('Submit form');
    });
  });

  describe('combinations', () => {
    it('should render solid variant with lg size', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button variant="solid" size="lg">Button</aegov-button>`,
      });
      const button = page.root.querySelector('button');
      expect(button.classList.contains('btn-solid')).toBe(true);
      expect(button.classList.contains('btn-lg')).toBe(true);
    });

    it('should render disabled loading button', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button disabled loading>Button</aegov-button>`,
      });
      const button = page.root.querySelector('button');
      expect(button.hasAttribute('disabled')).toBe(true);
      expect(button.querySelector('svg')).toBeTruthy();
      expect(button.getAttribute('aria-busy')).toBe('true');
      expect(button.getAttribute('aria-disabled')).toBe('true');
    });

    it('should render full width outline button', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button variant="outline" full>Button</aegov-button>`,
      });
      const button = page.root.querySelector('button');
      expect(button.classList.contains('btn-outline')).toBe(true);
      expect(button.classList.contains('w-full')).toBe(true);
    });
  });

  describe('button group support', () => {
    it('should apply horizontal first group classes', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button>Button</aegov-button>`,
      });
      page.rootInstance.isFirst = true;
      page.rootInstance.groupOrientation = 'horizontal';
      await page.waitForChanges();

      const button = page.root.querySelector('button');
      expect(button.classList.contains('btn-grouped-horizontal')).toBe(true);
      expect(button.classList.contains('btn-grouped-first-horizontal')).toBe(true);
    });

    it('should apply horizontal last group classes', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button>Button</aegov-button>`,
      });
      page.rootInstance.isLast = true;
      page.rootInstance.groupOrientation = 'horizontal';
      await page.waitForChanges();

      const button = page.root.querySelector('button');
      expect(button.classList.contains('btn-grouped-last-horizontal')).toBe(true);
    });

    it('should apply single group class', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button>Button</aegov-button>`,
      });
      page.rootInstance.isSingle = true;
      page.rootInstance.groupOrientation = 'horizontal';
      await page.waitForChanges();

      const button = page.root.querySelector('button');
      expect(button.classList.contains('btn-grouped-single')).toBe(true);
    });

    it('should apply vertical group classes', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button>Button</aegov-button>`,
      });
      page.rootInstance.isFirst = true;
      page.rootInstance.groupOrientation = 'vertical';
      await page.waitForChanges();

      const button = page.root.querySelector('button');
      expect(button.classList.contains('btn-grouped-vertical')).toBe(true);
      expect(button.classList.contains('btn-grouped-first-vertical')).toBe(true);
    });
  });

  describe('dynamic props', () => {
    it('should update when variant changes', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button variant="solid">Button</aegov-button>`,
      });
      let button = page.root.querySelector('button');
      expect(button.classList.contains('btn-solid')).toBe(true);

      page.root.setAttribute('variant', 'outline');
      await page.waitForChanges();

      button = page.root.querySelector('button');
      expect(button.classList.contains('btn-outline')).toBe(true);
      expect(button.classList.contains('btn-solid')).toBe(false);
    });

    it('should update when size changes', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button size="sm">Button</aegov-button>`,
      });
      let button = page.root.querySelector('button');
      expect(button.classList.contains('btn-sm')).toBe(true);

      page.root.setAttribute('size', 'lg');
      await page.waitForChanges();

      button = page.root.querySelector('button');
      expect(button.classList.contains('btn-lg')).toBe(true);
      expect(button.classList.contains('btn-sm')).toBe(false);
    });

    it('should update when disabled changes', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button>Button</aegov-button>`,
      });
      let button = page.root.querySelector('button');
      expect(button.hasAttribute('disabled')).toBe(false);

      page.root.setAttribute('disabled', 'true');
      await page.waitForChanges();

      button = page.root.querySelector('button');
      expect(button.hasAttribute('disabled')).toBe(true);
    });

    it('should update when appearance changes', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button appearance="primary">Button</aegov-button>`,
      });
      let button = page.root.querySelector('button');
      expect(button.classList.contains('btn-primary')).toBe(true);

      page.root.setAttribute('appearance', 'secondary');
      await page.waitForChanges();

      button = page.root.querySelector('button');
      expect(button.classList.contains('btn-secondary')).toBe(true);
      expect(button.classList.contains('btn-primary')).toBe(false);
    });

    it('should update when loading changes', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button>Button</aegov-button>`,
      });
      let button = page.root.querySelector('button');
      expect(button.querySelector('svg')).toBeNull();

      page.root.setAttribute('loading', 'true');
      await page.waitForChanges();

      button = page.root.querySelector('button');
      expect(button.querySelector('svg')).toBeTruthy();
      expect(button.getAttribute('aria-busy')).toBe('true');
    });
  });
});
