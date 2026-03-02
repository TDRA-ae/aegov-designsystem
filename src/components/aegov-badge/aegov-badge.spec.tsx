import { newSpecPage } from '@stencil/core/testing';
import { AegovBadge } from './aegov-badge';

describe('aegov-badge', () => {
  // ------------------------------------------------------------------ rendering
  describe('rendering', () => {
    it('renders the component', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge>Default</aegov-badge>`,
      });
      expect(page.root).toBeTruthy();
    });

    it('renders a span element', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge>Badge</aegov-badge>`,
      });
      const span = page.root.querySelector('span');
      expect(span).toBeTruthy();
    });

    it('renders slot content', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge>Badge Text</aegov-badge>`,
      });
      const span = page.root.querySelector('span');
      expect(span.textContent).toContain('Badge Text');
    });

    it('renders HTML content in slot', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge><strong>Bold</strong> Text</aegov-badge>`,
      });
      const span = page.root.querySelector('span');
      expect(span.innerHTML).toContain('<strong>Bold</strong>');
    });
  });

  // ------------------------------------------------------------------ default props
  describe('default props', () => {
    it('defaults color to default', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge>Badge</aegov-badge>`,
      });
      expect(page.rootInstance.color).toBe('default');
    });

    it('defaults appearance to soft', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge>Badge</aegov-badge>`,
      });
      expect(page.rootInstance.appearance).toBe('soft');
    });

    it('defaults size to base', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge>Badge</aegov-badge>`,
      });
      expect(page.rootInstance.size).toBe('base');
    });

    it('defaults dismissible to false', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge>Badge</aegov-badge>`,
      });
      expect(page.rootInstance.dismissible).toBe(false);
    });
  });

  // ------------------------------------------------------------------ size prop
  describe('size prop', () => {
    it('accepts sm size', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge size="sm">Small</aegov-badge>`,
      });
      expect(page.rootInstance.size).toBe('sm');
      const span = page.root.querySelector('span');
      expect(span.className).toContain('text-xs');
    });

    it('accepts base size', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge size="base">Base</aegov-badge>`,
      });
      const span = page.root.querySelector('span');
      expect(span.className).toContain('text-sm');
    });

    it('accepts lg size', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge size="lg">Large</aegov-badge>`,
      });
      expect(page.rootInstance.size).toBe('lg');
    });
  });

  // ------------------------------------------------------------------ appearance prop
  describe('appearance prop', () => {
    it('applies badge-soft for soft appearance', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge>Soft</aegov-badge>`,
      });
      const span = page.root.querySelector('span');
      expect(span.className).toContain('badge-soft');
    });

    it('applies badge-solid for solid appearance', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge appearance="solid">Solid</aegov-badge>`,
      });
      const span = page.root.querySelector('span');
      expect(span.className).toContain('badge-solid');
    });
  });

  // ------------------------------------------------------------------ color prop
  describe('color prop', () => {
    const colors = [
      'default', 'primary', 'secondary', 'aegold', 'aered', 'aegreen',
      'aeblack', 'techblue', 'seablue', 'camel', 'desert', 'fuchsia',
      'slate', 'purple', 'pink', 'indigo', 'lime',
    ];

    colors.forEach(color => {
      it(`applies badge-${color} class for ${color} color`, async () => {
        const page = await newSpecPage({
          components: [AegovBadge],
          html: `<aegov-badge color="${color}">Badge</aegov-badge>`,
        });
        const span = page.root.querySelector('span');
        expect(span.className).toContain(`badge-${color}`);
      });
    });
  });

  // ------------------------------------------------------------------ dismissible
  describe('dismissible', () => {
    it('does not render dismiss button by default', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge>Badge</aegov-badge>`,
      });
      const btn = page.root.querySelector('.badge-dismiss');
      expect(btn).toBeFalsy();
    });

    it('renders dismiss button when dismissible', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge dismissible>Badge</aegov-badge>`,
      });
      const btn = page.root.querySelector('.badge-dismiss');
      expect(btn).toBeTruthy();
    });

    it('emits aegovBadgeDismiss on dismiss click', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge dismissible>Badge</aegov-badge>`,
      });
      const spy = jest.fn();
      page.root.addEventListener('aegovBadgeDismiss', spy);

      const btn = page.root.querySelector('.badge-dismiss') as HTMLButtonElement;
      btn.click();
      await page.waitForChanges();

      expect(spy).toHaveBeenCalled();
    });

    it('has aria-label on dismiss button', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge dismissible>Badge</aegov-badge>`,
      });
      const btn = page.root.querySelector('.badge-dismiss');
      expect(btn.getAttribute('aria-label')).toBe('Badge dismiss button');
    });

    it('has SVG icon in dismiss button', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge dismissible>Badge</aegov-badge>`,
      });
      const svg = page.root.querySelector('.badge-dismiss svg');
      expect(svg).toBeTruthy();
      expect(svg.getAttribute('aria-hidden')).toBe('true');
    });
  });

  // ------------------------------------------------------------------ combined props
  describe('combined props', () => {
    it('applies all props correctly', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge color="primary" appearance="solid" size="lg" dismissible>Badge</aegov-badge>`,
      });
      expect(page.rootInstance.color).toBe('primary');
      expect(page.rootInstance.appearance).toBe('solid');
      expect(page.rootInstance.size).toBe('lg');
      expect(page.rootInstance.dismissible).toBe(true);
    });
  });
});
