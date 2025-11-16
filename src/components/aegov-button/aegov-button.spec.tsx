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

  describe('variants', () => {
    it('should render solid variant by default', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button>Button</aegov-button>`,
      });

      const button = page.root.querySelector('button');
      expect(button.classList.contains('aegov-btn')).toBe(true);
      expect(button.classList.contains('btn-solid')).toBe(true);
      expect(button.classList.contains('btn-primary')).toBe(true);
    });

    it('should render solid variant explicitly', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button variant="solid">Button</aegov-button>`,
      });

      const button = page.root.querySelector('button');
      expect(button.classList.contains('aegov-btn')).toBe(true);
      expect(button.classList.contains('btn-solid')).toBe(true);
    });

    it('should render outline variant', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button variant="outline">Button</aegov-button>`,
      });

      const button = page.root.querySelector('button');
      expect(button.classList.contains('aegov-btn')).toBe(true);
      expect(button.classList.contains('btn-outline')).toBe(true);
      expect(button.classList.contains('btn-primary')).toBe(true);
    });

    it('should render soft variant', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button variant="soft">Button</aegov-button>`,
      });

      const button = page.root.querySelector('button');
      expect(button.classList.contains('aegov-btn')).toBe(true);
      expect(button.classList.contains('btn-soft')).toBe(true);
      expect(button.classList.contains('btn-primary')).toBe(true);
    });

    it('should render link variant', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button variant="link">Button</aegov-button>`,
      });

      const button = page.root.querySelector('button');
      expect(button.classList.contains('aegov-btn')).toBe(true);
      expect(button.classList.contains('btn-link')).toBe(true);
      expect(button.classList.contains('btn-primary')).toBe(true);
    });
  });

  describe('sizes', () => {
    it('should render base size by default', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button>Button</aegov-button>`,
      });

      const button = page.root.querySelector('button');
      expect(button.classList.contains('aegov-btn')).toBe(true);
      expect(button.classList.contains('btn-base')).toBe(true);
    });

    it('should render xs size', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button size="xs">Button</aegov-button>`,
      });

      const button = page.root.querySelector('button');
      expect(button.classList.contains('aegov-btn')).toBe(true);
      expect(button.classList.contains('btn-xs')).toBe(true);
    });

    it('should render sm size', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button size="sm">Button</aegov-button>`,
      });

      const button = page.root.querySelector('button');
      expect(button.classList.contains('aegov-btn')).toBe(true);
      expect(button.classList.contains('btn-sm')).toBe(true);
    });

    it('should render lg size', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button size="lg">Button</aegov-button>`,
      });

      const button = page.root.querySelector('button');
      expect(button.classList.contains('aegov-btn')).toBe(true);
      expect(button.classList.contains('btn-lg')).toBe(true);
    });
  });

  describe('appearance', () => {
    it('should render primary appearance by default', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button>Button</aegov-button>`,
      });

      const button = page.root.querySelector('button');
      expect(button.classList.contains('aegov-btn')).toBe(true);
      expect(button.classList.contains('btn-primary')).toBe(true);
      expect(button.classList.contains('btn-solid')).toBe(true);
    });

    it('should render secondary appearance', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button appearance="secondary">Button</aegov-button>`,
      });

      const button = page.root.querySelector('button');
      expect(button.classList.contains('aegov-btn')).toBe(true);
      expect(button.classList.contains('btn-secondary')).toBe(true);
      expect(button.classList.contains('btn-solid')).toBe(true);
    });

    it('should render primary appearance with outline variant', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button variant="outline" appearance="primary">Button</aegov-button>`,
      });

      const button = page.root.querySelector('button');
      expect(button.classList.contains('btn-primary')).toBe(true);
      expect(button.classList.contains('btn-outline')).toBe(true);
    });

    it('should render secondary appearance with outline variant', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button variant="outline" appearance="secondary">Button</aegov-button>`,
      });

      const button = page.root.querySelector('button');
      expect(button.classList.contains('btn-secondary')).toBe(true);
      expect(button.classList.contains('btn-outline')).toBe(true);
    });

    it('should render secondary appearance with soft variant', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button variant="soft" appearance="secondary">Button</aegov-button>`,
      });

      const button = page.root.querySelector('button');
      expect(button.classList.contains('btn-soft')).toBe(true);
      expect(button.classList.contains('btn-secondary')).toBe(true);
    });

    it('should render secondary appearance with link variant', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button variant="link" appearance="secondary">Button</aegov-button>`,
      });

      const button = page.root.querySelector('button');
      expect(button.classList.contains('btn-secondary')).toBe(true);
      expect(button.classList.contains('btn-link')).toBe(true);
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
      const spinner = button.querySelector('svg');
      expect(spinner).toBeNull();
      expect(button.getAttribute('aria-busy')).toBe('false');
    });

    it('should render loading state', async () => {
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

  describe('full width state', () => {
    it('should not be full width by default', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button>Button</aegov-button>`,
      });

      const button = page.root.querySelector('button');
      expect(button.classList.contains('w-full')).toBe(false);
    });

    it('should render full width', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button full>Button</aegov-button>`,
      });

      const button = page.root.querySelector('button');
      expect(button.classList.contains('w-full')).toBe(true);
    });
  });

  describe('bold state', () => {
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

    it('should be bold when explicitly set to true', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button bold="true">Button</aegov-button>`,
      });

      const button = page.root.querySelector('button');
      expect(button.classList.contains('font-medium')).toBe(true);
    });
  });

  describe('icon state', () => {
    it('should not be icon-only by default', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button>Button</aegov-button>`,
      });

      const button = page.root.querySelector('button');
      expect(button.classList.contains('btn-icon')).toBe(false);
    });

    it('should render icon-only button', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button icon>Button</aegov-button>`,
      });

      const button = page.root.querySelector('button');
      expect(button.classList.contains('btn-icon')).toBe(true);
    });
  });

  describe('events', () => {
    it('should emit aegovButtonClick event when clicked', async () => {
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

    it('should emit aegovButtonFocus event when focused', async () => {
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

    it('should emit aegovButtonBlur event when blurred', async () => {
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
    it('should have proper aria-disabled attribute', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button disabled>Button</aegov-button>`,
      });

      const button = page.root.querySelector('button');
      expect(button.getAttribute('aria-disabled')).toBe('true');
    });

    it('should have proper aria-busy attribute when loading', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button loading>Button</aegov-button>`,
      });

      const button = page.root.querySelector('button');
      expect(button.getAttribute('aria-busy')).toBe('true');
    });

    it('should have part attribute for styling', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button>Button</aegov-button>`,
      });

      const button = page.root.querySelector('button');
      expect(button.getAttribute('part')).toBe('button');
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
      expect(button.classList.contains('btn-primary')).toBe(true);
      expect(button.classList.contains('btn-lg')).toBe(true);
    });

    it('should render outline variant with sm size', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button variant="outline" size="sm">Button</aegov-button>`,
      });

      const button = page.root.querySelector('button');
      expect(button.classList.contains('btn-outline')).toBe(true);
      expect(button.classList.contains('btn-primary')).toBe(true);
      expect(button.classList.contains('btn-sm')).toBe(true);
    });

    it('should render disabled loading button', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button disabled loading>Button</aegov-button>`,
      });

      const button = page.root.querySelector('button');
      const spinner = button.querySelector('svg');
      expect(button.hasAttribute('disabled')).toBe(true);
      expect(spinner).toBeTruthy();
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
      expect(button.classList.contains('btn-primary')).toBe(true);
      expect(button.classList.contains('w-full')).toBe(true);
    });

    it('should render secondary appearance with soft variant', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button variant="soft" appearance="secondary">Button</aegov-button>`,
      });

      const button = page.root.querySelector('button');
      expect(button.classList.contains('btn-soft')).toBe(true);
      expect(button.classList.contains('btn-secondary')).toBe(true);
    });

    it('should render icon-only button with xs size', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button icon size="xs">Button</aegov-button>`,
      });

      const button = page.root.querySelector('button');
      expect(button.classList.contains('btn-icon')).toBe(true);
      expect(button.classList.contains('btn-xs')).toBe(true);
    });

    it('should render button without bold text', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button bold="false" variant="outline">Button</aegov-button>`,
      });

      const button = page.root.querySelector('button');
      expect(button.classList.contains('font-medium')).toBe(false);
      expect(button.classList.contains('btn-outline')).toBe(true);
    });

    it('should render full width button with bold text', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button full bold="true">Button</aegov-button>`,
      });

      const button = page.root.querySelector('button');
      expect(button.classList.contains('w-full')).toBe(true);
      expect(button.classList.contains('font-medium')).toBe(true);
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
      let spinner = button.querySelector('svg');
      expect(spinner).toBeNull();

      page.root.setAttribute('loading', 'true');
      await page.waitForChanges();

      button = page.root.querySelector('button');
      spinner = button.querySelector('svg');
      expect(spinner).toBeTruthy();
      expect(button.getAttribute('aria-busy')).toBe('true');
    });

    it('should update when bold changes', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button bold="true">Button</aegov-button>`,
      });

      let button = page.root.querySelector('button');
      expect(button.classList.contains('font-medium')).toBe(true);

      page.root.setAttribute('bold', 'false');
      await page.waitForChanges();

      button = page.root.querySelector('button');
      expect(button.classList.contains('font-medium')).toBe(false);
    });

    it('should update when full changes', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button>Button</aegov-button>`,
      });

      let button = page.root.querySelector('button');
      expect(button.classList.contains('w-full')).toBe(false);

      page.root.setAttribute('full', 'true');
      await page.waitForChanges();

      button = page.root.querySelector('button');
      expect(button.classList.contains('w-full')).toBe(true);
    });
  });
});
