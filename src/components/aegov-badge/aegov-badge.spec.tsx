import { newSpecPage } from '@stencil/core/testing';
import { AegovBadge } from './aegov-badge';

describe('aegov-badge', () => {
  describe('rendering', () => {
    it('should render with default props', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge>Default</aegov-badge>`,
      });

      expect(page.root).toBeTruthy();
      const component = page.rootInstance as AegovBadge;
      expect(component.color).toBe('default');
      expect(component.appearance).toBe('soft');
      expect(component.size).toBe('base');
    });

    it('should render with slot content', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge>Badge Text</aegov-badge>`,
      });
      const span = page.root?.querySelector('span');
      expect(span?.textContent).toContain('Badge Text');
    });

    it('should render with HTML content in slot', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge><strong>Bold</strong> Text</aegov-badge>`,
      });
      const span = page.root?.querySelector('span');
      expect(span?.innerHTML).toContain('<strong>Bold</strong>');
    });
  });

  describe('size prop', () => {
    it('should render sm size', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge size="sm">Small</aegov-badge>`,
      });
      const component = page.rootInstance as AegovBadge;
      expect(component.size).toBe('sm');
    });

    it('should render base size (default)', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge>Base</aegov-badge>`,
      });
      const component = page.rootInstance as AegovBadge;
      expect(component.size).toBe('base');
    });

    it('should render lg size', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge size="lg">Large</aegov-badge>`,
      });
      const component = page.rootInstance as AegovBadge;
      expect(component.size).toBe('lg');
    });
  });

  describe('appearance prop', () => {
    it('should render soft appearance by default', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge>Soft</aegov-badge>`,
      });
      const component = page.rootInstance as AegovBadge;
      expect(component.appearance).toBe('soft');
    });

    it('should render solid appearance', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge appearance="solid">Solid</aegov-badge>`,
      });
      const component = page.rootInstance as AegovBadge;
      expect(component.appearance).toBe('solid');
    });
  });

  describe('color prop', () => {
    const colors = [
      'default', 'primary', 'secondary', 'aegold', 'aered', 'aegreen',
      'aeblack', 'techblue', 'seablue', 'camel', 'desert', 'fuchsia',
      'slate', 'purple', 'pink', 'indigo', 'lime'
    ];

    colors.forEach(color => {
      it(`should render ${color} color`, async () => {
        const page = await newSpecPage({
          components: [AegovBadge],
          html: `<aegov-badge color="${color}">Badge</aegov-badge>`,
        });
        const component = page.rootInstance as AegovBadge;
        expect(component.color).toBe(color);
      });
    });

    it('should default to "default" color', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge>Badge</aegov-badge>`,
      });
      const component = page.rootInstance as AegovBadge;
      expect(component.color).toBe('default');
    });
  });

  describe('dismissible functionality', () => {
    it('should not be dismissible by default', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge>Badge</aegov-badge>`,
      });
      const component = page.rootInstance as AegovBadge;
      expect(component.dismissible).toBe(false);

      const dismissButton = page.root?.querySelector('.badge-dismiss');
      expect(dismissButton).toBeFalsy();
    });

    it('should render dismiss button when dismissible is true', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge dismissible>Badge</aegov-badge>`,
      });
      const component = page.rootInstance as AegovBadge;
      expect(component.dismissible).toBe(true);

      const dismissButton = page.root?.querySelector('.badge-dismiss');
      expect(dismissButton).toBeTruthy();
    });

    it('should emit aegovBadgeDismiss event when dismiss button is clicked', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge dismissible>Badge</aegov-badge>`,
      });

      const dismissSpy = jest.fn();
      page.root?.addEventListener('aegovBadgeDismiss', dismissSpy);

      const dismissButton = page.root?.querySelector('.badge-dismiss') as HTMLButtonElement;
      dismissButton?.click();
      await page.waitForChanges();

      expect(dismissSpy).toHaveBeenCalled();
    });

    it('should have aria-label on dismiss button', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge dismissible>Badge</aegov-badge>`,
      });

      const dismissButton = page.root?.querySelector('.badge-dismiss');
      expect(dismissButton?.getAttribute('aria-label')).toBe('Badge dismiss button');
    });
  });

  describe('combined props', () => {
    it('should apply multiple props correctly', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge color="primary" appearance="solid" size="lg" dismissible>Large Primary Solid</aegov-badge>`,
      });

      const component = page.rootInstance as AegovBadge;
      expect(component.color).toBe('primary');
      expect(component.appearance).toBe('solid');
      expect(component.size).toBe('lg');
      expect(component.dismissible).toBe(true);
    });

    it('should render badge with all color variants and solid appearance', async () => {
      const colors = ['primary', 'secondary', 'aegold', 'aered', 'aegreen'];

      for (const color of colors) {
        const page = await newSpecPage({
          components: [AegovBadge],
          html: `<aegov-badge color="${color}" appearance="solid">Badge</aegov-badge>`,
        });

        const component = page.rootInstance as AegovBadge;
        expect(component.color).toBe(color);
        expect(component.appearance).toBe('solid');
      }
    });
  });

  describe('badge structure', () => {
    it('should render span element', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge>Badge</aegov-badge>`,
      });

      const span = page.root?.querySelector('span');
      expect(span).toBeTruthy();
    });

    it('should have dismiss icon SVG when dismissible', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge dismissible>Badge</aegov-badge>`,
      });

      const dismissButton = page.root?.querySelector('.badge-dismiss');
      const svg = dismissButton?.querySelector('svg');
      expect(svg).toBeTruthy();
    });
  });
});
