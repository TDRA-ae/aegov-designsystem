import { newSpecPage } from '@stencil/core/testing';
import { AegovInputGroup } from './aegov-input-group';
import { AegovInput } from '../aegov-input/aegov-input';
import { AegovButton } from '../aegov-button/aegov-button';

describe('aegov-input-group', () => {
  describe('rendering', () => {
    it('should render with default classes', async () => {
      const page = await newSpecPage({
        components: [AegovInputGroup],
        html: `<aegov-input-group></aegov-input-group>`,
      });
      const div = page.root.querySelector('.aegov-input-group');
      expect(div).toBeTruthy();
      expect(div.classList.contains('input-group--base')).toBe(true);
    });

    it('should render slot content', async () => {
      const page = await newSpecPage({
        components: [AegovInputGroup, AegovInput],
        html: `
          <aegov-input-group>
            <aegov-input placeholder="Test"></aegov-input>
          </aegov-input-group>
        `,
      });
      const input = page.root.querySelector('aegov-input');
      expect(input).toBeTruthy();
    });
  });

  describe('size prop', () => {
    it('should apply input-group--sm class for size sm', async () => {
      const page = await newSpecPage({
        components: [AegovInputGroup],
        html: `<aegov-input-group size="sm"></aegov-input-group>`,
      });
      const div = page.root.querySelector('.aegov-input-group');
      expect(div.classList.contains('input-group--sm')).toBe(true);
    });

    it('should apply input-group--base class for size base', async () => {
      const page = await newSpecPage({
        components: [AegovInputGroup],
        html: `<aegov-input-group size="base"></aegov-input-group>`,
      });
      const div = page.root.querySelector('.aegov-input-group');
      expect(div.classList.contains('input-group--base')).toBe(true);
    });

    it('should apply input-group--lg class for size lg', async () => {
      const page = await newSpecPage({
        components: [AegovInputGroup],
        html: `<aegov-input-group size="lg"></aegov-input-group>`,
      });
      const div = page.root.querySelector('.aegov-input-group');
      expect(div.classList.contains('input-group--lg')).toBe(true);
    });
  });

  describe('prefix prop', () => {
    it('should render text prefix when prop is set', async () => {
      const page = await newSpecPage({
        components: [AegovInputGroup],
        html: `<aegov-input-group addon-prefix="https://"></aegov-input-group>`,
      });
      const addon = page.root.querySelector('.input-group__addon--prefix');
      expect(addon).toBeTruthy();
      expect(addon.textContent).toBe('https://');
    });

    it('should not render prefix addon when prop is not set', async () => {
      const page = await newSpecPage({
        components: [AegovInputGroup],
        html: `<aegov-input-group></aegov-input-group>`,
      });
      const addon = page.root.querySelector('.input-group__addon--prefix');
      expect(addon).toBeNull();
    });

    it('should have input-group__addon class on prefix', async () => {
      const page = await newSpecPage({
        components: [AegovInputGroup],
        html: `<aegov-input-group addon-prefix="$"></aegov-input-group>`,
      });
      const addon = page.root.querySelector('.input-group__addon--prefix');
      expect(addon.classList.contains('input-group__addon')).toBe(true);
    });
  });

  describe('suffix prop', () => {
    it('should render text suffix when prop is set', async () => {
      const page = await newSpecPage({
        components: [AegovInputGroup],
        html: `<aegov-input-group addon-suffix="@gmail.com"></aegov-input-group>`,
      });
      const addon = page.root.querySelector('.input-group__addon--suffix');
      expect(addon).toBeTruthy();
      expect(addon.textContent).toBe('@gmail.com');
    });

    it('should not render suffix addon when prop is not set', async () => {
      const page = await newSpecPage({
        components: [AegovInputGroup],
        html: `<aegov-input-group></aegov-input-group>`,
      });
      const addon = page.root.querySelector('.input-group__addon--suffix');
      expect(addon).toBeNull();
    });
  });

  describe('prefix and suffix together', () => {
    it('should render both text prefix and suffix', async () => {
      const page = await newSpecPage({
        components: [AegovInputGroup],
        html: `<aegov-input-group addon-prefix="$" addon-suffix=".00"></aegov-input-group>`,
      });
      const prefix = page.root.querySelector('.input-group__addon--prefix');
      const suffix = page.root.querySelector('.input-group__addon--suffix');
      expect(prefix).toBeTruthy();
      expect(prefix.textContent).toBe('$');
      expect(suffix).toBeTruthy();
      expect(suffix.textContent).toBe('.00');
    });
  });

  describe('size propagation', () => {
    it('should propagate size to child aegov-input', async () => {
      const page = await newSpecPage({
        components: [AegovInputGroup, AegovInput],
        html: `
          <aegov-input-group size="lg">
            <aegov-input></aegov-input>
          </aegov-input-group>
        `,
      });
      const input = page.root.querySelector('aegov-input') as any;
      expect(input.size).toBe('lg');
    });

    it('should propagate size sm to child aegov-input', async () => {
      const page = await newSpecPage({
        components: [AegovInputGroup, AegovInput],
        html: `
          <aegov-input-group size="sm">
            <aegov-input></aegov-input>
          </aegov-input-group>
        `,
      });
      const input = page.root.querySelector('aegov-input') as any;
      expect(input.size).toBe('sm');
    });

    it('should propagate size to child aegov-button', async () => {
      const page = await newSpecPage({
        components: [AegovInputGroup, AegovButton],
        html: `
          <aegov-input-group size="lg">
            <aegov-button>Go</aegov-button>
          </aegov-input-group>
        `,
      });
      const button = page.root.querySelector('aegov-button') as any;
      expect(button.size).toBe('lg');
    });

    it('should propagate size to multiple children', async () => {
      const page = await newSpecPage({
        components: [AegovInputGroup, AegovInput, AegovButton],
        html: `
          <aegov-input-group size="sm">
            <aegov-input></aegov-input>
            <aegov-button>Go</aegov-button>
          </aegov-input-group>
        `,
      });
      const input = page.root.querySelector('aegov-input') as any;
      const button = page.root.querySelector('aegov-button') as any;
      expect(input.size).toBe('sm');
      expect(button.size).toBe('sm');
    });
  });

  describe('custom class', () => {
    it('should merge custom classes', async () => {
      const page = await newSpecPage({
        components: [AegovInputGroup],
        html: `<aegov-input-group class="mt-4"></aegov-input-group>`,
      });
      const div = page.root.querySelector('.aegov-input-group');
      expect(div.classList.contains('mt-4')).toBe(true);
      expect(div.classList.contains('input-group--base')).toBe(true);
    });
  });

  describe('complex children', () => {
    it('should render with native select and input', async () => {
      const page = await newSpecPage({
        components: [AegovInputGroup, AegovInput],
        html: `
          <aegov-input-group>
            <select><option>+971</option></select>
            <aegov-input type="tel" placeholder="Phone"></aegov-input>
          </aegov-input-group>
        `,
      });
      const select = page.root.querySelector('select');
      const input = page.root.querySelector('aegov-input');
      expect(select).toBeTruthy();
      expect(input).toBeTruthy();
    });

    it('should render with input and button', async () => {
      const page = await newSpecPage({
        components: [AegovInputGroup, AegovInput, AegovButton],
        html: `
          <aegov-input-group>
            <aegov-input type="search" placeholder="Search"></aegov-input>
            <aegov-button variant="solid">Go</aegov-button>
          </aegov-input-group>
        `,
      });
      const input = page.root.querySelector('aegov-input');
      const button = page.root.querySelector('aegov-button');
      expect(input).toBeTruthy();
      expect(button).toBeTruthy();
    });

    it('should render text prefix with input and button suffix', async () => {
      const page = await newSpecPage({
        components: [AegovInputGroup, AegovInput, AegovButton],
        html: `
          <aegov-input-group addon-prefix="$">
            <aegov-input type="number" placeholder="0.00"></aegov-input>
            <aegov-button variant="solid">Pay</aegov-button>
          </aegov-input-group>
        `,
      });
      const prefix = page.root.querySelector('.input-group__addon--prefix');
      const input = page.root.querySelector('aegov-input');
      const button = page.root.querySelector('aegov-button');
      expect(prefix.textContent).toBe('$');
      expect(input).toBeTruthy();
      expect(button).toBeTruthy();
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

    it('falls back to default size class when size is invalid', async () => {
      const page = await newSpecPage({
        components: [AegovInputGroup],
        html: `<aegov-input-group size="huge"></aegov-input-group>`,
      });
      const group = page.root.querySelector('.aegov-input-group');
      expect(group).toBeTruthy();
      expect(group.className).toContain('input-group--base');
    });

    it('warns with component name, prop name, invalid value, and fallback for size', async () => {
      await newSpecPage({
        components: [AegovInputGroup],
        html: `<aegov-input-group size="huge"></aegov-input-group>`,
      });
      const messages = warnSpy.mock.calls.map(c => c[0] as string);
      const sizeWarn = messages.find(m => m.includes('"size"'));
      expect(sizeWarn).toBeDefined();
      expect(sizeWarn).toContain('[aegov-input-group]');
      expect(sizeWarn).toContain('"huge"');
      expect(sizeWarn).toContain('base');
    });

    it('does not warn when all props are valid', async () => {
      await newSpecPage({
        components: [AegovInputGroup],
        html: `<aegov-input-group size="lg"></aegov-input-group>`,
      });
      expect(warnSpy).not.toHaveBeenCalled();
    });

    it('warns again via @Watch when size is updated to an invalid value', async () => {
      const page = await newSpecPage({
        components: [AegovInputGroup],
        html: `<aegov-input-group size="base"></aegov-input-group>`,
      });
      expect(warnSpy).not.toHaveBeenCalled();

      page.root.setAttribute('size', 'nope');
      await page.waitForChanges();

      const messages = warnSpy.mock.calls.map(c => c[0] as string);
      const invalidWarn = messages.find(m => m.includes('[aegov-input-group]') && m.includes('"nope"'));
      expect(invalidWarn).toBeDefined();
      expect(invalidWarn).toContain('"size"');
    });
  });
});
