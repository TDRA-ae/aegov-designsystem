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
      expect(button.classList.contains('bg-primary-600')).toBe(true);
      expect(button.classList.contains('text-white')).toBe(true);
    });

    it('should render solid variant explicitly', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button variant="solid">Button</aegov-button>`,
      });

      const button = page.root.querySelector('button');
      expect(button.classList.contains('bg-primary-600')).toBe(true);
      expect(button.classList.contains('text-white')).toBe(true);
      expect(button.classList.contains('border-2')).toBe(true);
      expect(button.classList.contains('border-transparent')).toBe(true);
    });

    it('should render outline variant', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button variant="outline">Button</aegov-button>`,
      });

      const button = page.root.querySelector('button');
      expect(button.classList.contains('bg-transparent')).toBe(true);
      expect(button.classList.contains('text-primary-700')).toBe(true);
      expect(button.classList.contains('border-2')).toBe(true);
      expect(button.classList.contains('border-primary-600')).toBe(true);
    });
  });

  describe('sizes', () => {
    it('should render base size by default', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button>Button</aegov-button>`,
      });

      const button = page.root.querySelector('button');
      expect(button.classList.contains('text-base')).toBe(true);
      expect(button.classList.contains('px-4')).toBe(true);
      expect(button.classList.contains('py-2.5')).toBe(true);
      expect(button.classList.contains('gap-2')).toBe(true);
      expect(button.classList.contains('rounded-lg')).toBe(true);
    });

    it('should render xs size', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button size="xs">Button</aegov-button>`,
      });

      const button = page.root.querySelector('button');
      expect(button.classList.contains('text-xs')).toBe(true);
      expect(button.classList.contains('px-2.5')).toBe(true);
      expect(button.classList.contains('py-1.5')).toBe(true);
      expect(button.classList.contains('gap-1')).toBe(true);
      expect(button.classList.contains('rounded')).toBe(true);
    });

    it('should render sm size', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button size="sm">Button</aegov-button>`,
      });

      const button = page.root.querySelector('button');
      expect(button.classList.contains('text-sm')).toBe(true);
      expect(button.classList.contains('px-3')).toBe(true);
      expect(button.classList.contains('py-2')).toBe(true);
      expect(button.classList.contains('gap-1.5')).toBe(true);
      expect(button.classList.contains('rounded-md')).toBe(true);
    });

    it('should render lg size', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button size="lg">Button</aegov-button>`,
      });

      const button = page.root.querySelector('button');
      expect(button.classList.contains('text-lg')).toBe(true);
      expect(button.classList.contains('px-6')).toBe(true);
      expect(button.classList.contains('py-3')).toBe(true);
      expect(button.classList.contains('gap-2.5')).toBe(true);
      expect(button.classList.contains('rounded-lg')).toBe(true);
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
      expect(button.classList.contains('opacity-50')).toBe(true);
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
      expect(button.classList.contains('opacity-50')).toBe(true);
      expect(button.classList.contains('cursor-not-allowed')).toBe(true);
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

  describe('fullWidth state', () => {
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
        html: `<aegov-button full-width>Button</aegov-button>`,
      });

      const button = page.root.querySelector('button');
      expect(button.classList.contains('w-full')).toBe(true);
    });
  });

  describe('events', () => {
    it('should emit aegovClick event when clicked', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button>Button</aegov-button>`,
      });

      const clickSpy = jest.fn();
      page.root.addEventListener('aegovClick', clickSpy);

      const button = page.root.querySelector('button');
      button.click();
      await page.waitForChanges();

      expect(clickSpy).toHaveBeenCalled();
    });

    it('should not emit aegovClick when disabled', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button disabled>Button</aegov-button>`,
      });

      const clickSpy = jest.fn();
      page.root.addEventListener('aegovClick', clickSpy);

      const button = page.root.querySelector('button');
      button.click();
      await page.waitForChanges();

      expect(clickSpy).not.toHaveBeenCalled();
    });

    it('should not emit aegovClick when loading', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button loading>Button</aegov-button>`,
      });

      const clickSpy = jest.fn();
      page.root.addEventListener('aegovClick', clickSpy);

      const button = page.root.querySelector('button');
      button.click();
      await page.waitForChanges();

      expect(clickSpy).not.toHaveBeenCalled();
    });

    it('should emit aegovFocus event when focused', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button>Button</aegov-button>`,
      });

      const focusSpy = jest.fn();
      page.root.addEventListener('aegovFocus', focusSpy);

      const button = page.root.querySelector('button');
      button.dispatchEvent(new FocusEvent('focus'));
      await page.waitForChanges();

      expect(focusSpy).toHaveBeenCalled();
    });

    it('should emit aegovBlur event when blurred', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button>Button</aegov-button>`,
      });

      const blurSpy = jest.fn();
      page.root.addEventListener('aegovBlur', blurSpy);

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
      expect(button.classList.contains('bg-primary-600')).toBe(true);
      expect(button.classList.contains('text-lg')).toBe(true);
      expect(button.classList.contains('px-6')).toBe(true);
    });

    it('should render outline variant with sm size', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button variant="outline" size="sm">Button</aegov-button>`,
      });

      const button = page.root.querySelector('button');
      expect(button.classList.contains('bg-transparent')).toBe(true);
      expect(button.classList.contains('text-sm')).toBe(true);
      expect(button.classList.contains('px-3')).toBe(true);
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
        html: `<aegov-button variant="outline" full-width>Button</aegov-button>`,
      });

      const button = page.root.querySelector('button');
      expect(button.classList.contains('bg-transparent')).toBe(true);
      expect(button.classList.contains('w-full')).toBe(true);
    });
  });

  describe('dynamic props', () => {
    it('should update when variant changes', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button variant="solid">Button</aegov-button>`,
      });

      let button = page.root.querySelector('button');
      expect(button.classList.contains('bg-primary-600')).toBe(true);

      page.root.setAttribute('variant', 'outline');
      await page.waitForChanges();

      button = page.root.querySelector('button');
      expect(button.classList.contains('bg-transparent')).toBe(true);
    });

    it('should update when size changes', async () => {
      const page = await newSpecPage({
        components: [AegovButton],
        html: `<aegov-button size="sm">Button</aegov-button>`,
      });

      let button = page.root.querySelector('button');
      expect(button.classList.contains('text-sm')).toBe(true);

      page.root.setAttribute('size', 'lg');
      await page.waitForChanges();

      button = page.root.querySelector('button');
      expect(button.classList.contains('text-lg')).toBe(true);
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
  });
});
