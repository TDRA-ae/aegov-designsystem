import { newSpecPage } from '@stencil/core/testing';
import { AegovBadge } from './aegov-badge';

describe('aegov-badge', () => {
  describe('Rendering', () => {
    it('should render with default props', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge>Default</aegov-badge>`,
      });
      expect(page.root).toEqualHtml(`
        <aegov-badge>
          <span class="inline-flex items-center font-medium whitespace-nowrap rounded-full [print-color-adjust:exact] rounded-md px-2 text-sm py-1 bg-slate-50 text-slate-800">
            Default
          </span>
        </aegov-badge>
      `);
    });

    it('should render with slot content', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge>Badge Text</aegov-badge>`,
      });
      const span = page.root?.querySelector('span');
      expect(span?.textContent).toBe('Badge Text');
    });

    it('should render with HTML content in slot', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge><strong>Bold</strong> Text</aegov-badge>`,
      });
      const span = page.root?.querySelector('span');
      expect(span?.innerHTML).toContain('<strong>Bold</strong> Text');
    });
  });

  describe('Size Prop', () => {
    it('should apply sm size classes', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge size="sm">Small</aegov-badge>`,
      });
      const span = page.root?.querySelector('span');
      expect(span?.classList.contains('text-xs')).toBe(true);
      expect(span?.classList.contains('py-1')).toBe(true);
    });

    it('should apply base size classes (default)', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge>Base</aegov-badge>`,
      });
      const span = page.root?.querySelector('span');
      expect(span?.classList.contains('text-sm')).toBe(true);
      expect(span?.classList.contains('py-1')).toBe(true);
    });

    it('should apply lg size classes', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge size="lg">Large</aegov-badge>`,
      });
      const span = page.root?.querySelector('span');
      expect(span?.classList.contains('text-sm')).toBe(true);
      expect(span?.classList.contains('py-1.5')).toBe(true);
    });
  });

  describe('Appearance Prop', () => {
    it('should apply soft appearance by default', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge color="primary">Soft</aegov-badge>`,
      });
      const span = page.root?.querySelector('span');
      expect(span?.classList.contains('bg-primary-50')).toBe(true);
      expect(span?.classList.contains('text-primary-800')).toBe(true);
    });

    it('should apply solid appearance', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge appearance="solid" color="primary">Solid</aegov-badge>`,
      });
      const span = page.root?.querySelector('span');
      expect(span?.classList.contains('bg-primary-700')).toBe(true);
      expect(span?.classList.contains('text-primary-50')).toBe(true);
    });
  });

  describe('Color Prop - Soft Appearance', () => {
    it('should apply default color (soft)', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge>Default</aegov-badge>`,
      });
      const span = page.root?.querySelector('span');
      expect(span?.classList.contains('bg-slate-50')).toBe(true);
      expect(span?.classList.contains('text-slate-800')).toBe(true);
    });

    it('should apply primary color (soft)', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge color="primary">Primary</aegov-badge>`,
      });
      const span = page.root?.querySelector('span');
      expect(span?.classList.contains('bg-primary-50')).toBe(true);
      expect(span?.classList.contains('text-primary-800')).toBe(true);
    });

    it('should apply secondary color (soft)', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge color="secondary">Secondary</aegov-badge>`,
      });
      const span = page.root?.querySelector('span');
      expect(span?.classList.contains('bg-secondary-50')).toBe(true);
      expect(span?.classList.contains('text-secondary-800')).toBe(true);
    });

    it('should apply aegold color (soft)', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge color="aegold">AE Gold</aegov-badge>`,
      });
      const span = page.root?.querySelector('span');
      expect(span?.classList.contains('bg-aegold-50')).toBe(true);
      expect(span?.classList.contains('text-aegold-800')).toBe(true);
    });

    it('should apply aered color (soft)', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge color="aered">AE Red</aegov-badge>`,
      });
      const span = page.root?.querySelector('span');
      expect(span?.classList.contains('bg-aered-50')).toBe(true);
      expect(span?.classList.contains('text-aered-800')).toBe(true);
    });

    it('should apply aegreen color (soft)', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge color="aegreen">AE Green</aegov-badge>`,
      });
      const span = page.root?.querySelector('span');
      expect(span?.classList.contains('bg-aegreen-50')).toBe(true);
      expect(span?.classList.contains('text-aegreen-800')).toBe(true);
    });

    it('should apply aeblack color (soft)', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge color="aeblack">AE Black</aegov-badge>`,
      });
      const span = page.root?.querySelector('span');
      expect(span?.classList.contains('bg-aeblack-50')).toBe(true);
      expect(span?.classList.contains('text-aeblack-800')).toBe(true);
    });

    it('should apply techblue color (soft)', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge color="techblue">Tech Blue</aegov-badge>`,
      });
      const span = page.root?.querySelector('span');
      expect(span?.classList.contains('bg-techblue-50')).toBe(true);
      expect(span?.classList.contains('text-techblue-800')).toBe(true);
    });

    it('should apply seablue color (soft)', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge color="seablue">Sea Blue</aegov-badge>`,
      });
      const span = page.root?.querySelector('span');
      expect(span?.classList.contains('bg-seablue-50')).toBe(true);
      expect(span?.classList.contains('text-seablue-800')).toBe(true);
    });

    it('should apply camel color (soft)', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge color="camel">Camel</aegov-badge>`,
      });
      const span = page.root?.querySelector('span');
      expect(span?.classList.contains('bg-camel-50')).toBe(true);
      expect(span?.classList.contains('text-camel-800')).toBe(true);
    });

    it('should apply desert color (soft)', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge color="desert">Desert</aegov-badge>`,
      });
      const span = page.root?.querySelector('span');
      expect(span?.classList.contains('bg-desert-50')).toBe(true);
      expect(span?.classList.contains('text-desert-800')).toBe(true);
    });

    it('should apply fuchsia color (soft)', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge color="fuchsia">Fuchsia</aegov-badge>`,
      });
      const span = page.root?.querySelector('span');
      expect(span?.classList.contains('bg-fuchsia-50')).toBe(true);
      expect(span?.classList.contains('text-fuchsia-800')).toBe(true);
    });

    it('should apply slate color (soft)', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge color="slate">Slate</aegov-badge>`,
      });
      const span = page.root?.querySelector('span');
      expect(span?.classList.contains('bg-slate-50')).toBe(true);
      expect(span?.classList.contains('text-slate-800')).toBe(true);
    });

    it('should apply purple color (soft)', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge color="purple">Purple</aegov-badge>`,
      });
      const span = page.root?.querySelector('span');
      expect(span?.classList.contains('bg-purple-50')).toBe(true);
      expect(span?.classList.contains('text-purple-800')).toBe(true);
    });

    it('should apply pink color (soft)', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge color="pink">Pink</aegov-badge>`,
      });
      const span = page.root?.querySelector('span');
      expect(span?.classList.contains('bg-pink-50')).toBe(true);
      expect(span?.classList.contains('text-pink-800')).toBe(true);
    });

    it('should apply indigo color (soft)', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge color="indigo">Indigo</aegov-badge>`,
      });
      const span = page.root?.querySelector('span');
      expect(span?.classList.contains('bg-indigo-50')).toBe(true);
      expect(span?.classList.contains('text-indigo-800')).toBe(true);
    });

    it('should apply lime color (soft)', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge color="lime">Lime</aegov-badge>`,
      });
      const span = page.root?.querySelector('span');
      expect(span?.classList.contains('bg-lime-50')).toBe(true);
      expect(span?.classList.contains('text-lime-800')).toBe(true);
    });
  });

  describe('Color Prop - Solid Appearance', () => {
    it('should apply default color (solid)', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge appearance="solid">Default</aegov-badge>`,
      });
      const span = page.root?.querySelector('span');
      expect(span?.classList.contains('bg-slate-700')).toBe(true);
      expect(span?.classList.contains('text-whitely-50')).toBe(true);
    });

    it('should apply primary color (solid)', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge appearance="solid" color="primary">Primary</aegov-badge>`,
      });
      const span = page.root?.querySelector('span');
      expect(span?.classList.contains('bg-primary-700')).toBe(true);
      expect(span?.classList.contains('text-primary-50')).toBe(true);
    });

    it('should apply aegold color (solid)', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge appearance="solid" color="aegold">AE Gold</aegov-badge>`,
      });
      const span = page.root?.querySelector('span');
      expect(span?.classList.contains('bg-aegold-700')).toBe(true);
      expect(span?.classList.contains('text-aegold-50')).toBe(true);
    });

    it('should apply aered color (solid)', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge appearance="solid" color="aered">AE Red</aegov-badge>`,
      });
      const span = page.root?.querySelector('span');
      expect(span?.classList.contains('bg-aered-700')).toBe(true);
      expect(span?.classList.contains('text-aered-50')).toBe(true);
    });

    it('should apply aegreen color (solid)', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge appearance="solid" color="aegreen">AE Green</aegov-badge>`,
      });
      const span = page.root?.querySelector('span');
      expect(span?.classList.contains('bg-aegreen-700')).toBe(true);
      expect(span?.classList.contains('text-aegreen-50')).toBe(true);
    });

    it('should apply techblue color (solid)', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge appearance="solid" color="techblue">Tech Blue</aegov-badge>`,
      });
      const span = page.root?.querySelector('span');
      expect(span?.classList.contains('bg-techblue-700')).toBe(true);
      expect(span?.classList.contains('text-techblue-50')).toBe(true);
    });

    it('should apply seablue color (solid)', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge appearance="solid" color="seablue">Sea Blue</aegov-badge>`,
      });
      const span = page.root?.querySelector('span');
      expect(span?.classList.contains('bg-seablue-700')).toBe(true);
      expect(span?.classList.contains('text-seablue-50')).toBe(true);
    });

    it('should apply camel color (solid)', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge appearance="solid" color="camel">Camel</aegov-badge>`,
      });
      const span = page.root?.querySelector('span');
      expect(span?.classList.contains('bg-camel-700')).toBe(true);
      expect(span?.classList.contains('text-camel-50')).toBe(true);
    });

    it('should apply fuchsia color (solid)', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge appearance="solid" color="fuchsia">Fuchsia</aegov-badge>`,
      });
      const span = page.root?.querySelector('span');
      expect(span?.classList.contains('bg-fuchsia-700')).toBe(true);
      expect(span?.classList.contains('text-fuchsia-50')).toBe(true);
    });

    it('should apply purple color (solid)', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge appearance="solid" color="purple">Purple</aegov-badge>`,
      });
      const span = page.root?.querySelector('span');
      expect(span?.classList.contains('bg-purple-700')).toBe(true);
      expect(span?.classList.contains('text-purple-50')).toBe(true);
    });

    it('should apply lime color (solid)', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge appearance="solid" color="lime">Lime</aegov-badge>`,
      });
      const span = page.root?.querySelector('span');
      expect(span?.classList.contains('bg-lime-700')).toBe(true);
      expect(span?.classList.contains('text-lime-50')).toBe(true);
    });
  });

  describe('Base CSS Classes', () => {
    it('should always have base layout classes', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge>Test</aegov-badge>`,
      });
      const span = page.root?.querySelector('span');
      expect(span?.classList.contains('inline-flex')).toBe(true);
      expect(span?.classList.contains('items-center')).toBe(true);
      expect(span?.classList.contains('font-medium')).toBe(true);
      expect(span?.classList.contains('whitespace-nowrap')).toBe(true);
    });

    it('should have rounded and padding classes', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge>Test</aegov-badge>`,
      });
      const span = page.root?.querySelector('span');
      expect(span?.classList.contains('rounded-md')).toBe(true);
      expect(span?.classList.contains('px-2')).toBe(true);
    });

    it('should have print color adjust class', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge>Test</aegov-badge>`,
      });
      const span = page.root?.querySelector('span');
      expect(span?.className).toContain('[print-color-adjust:exact]');
    });
  });

  describe('Prop Combinations', () => {
    it('should combine size, appearance, and color correctly', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge size="lg" appearance="solid" color="aegold">Combo</aegov-badge>`,
      });
      const span = page.root?.querySelector('span');
      expect(span?.classList.contains('text-sm')).toBe(true);
      expect(span?.classList.contains('py-1.5')).toBe(true);
      expect(span?.classList.contains('bg-aegold-700')).toBe(true);
      expect(span?.classList.contains('text-aegold-50')).toBe(true);
    });

    it('should handle all sm + soft + different colors', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge size="sm" appearance="soft" color="techblue">Small Soft</aegov-badge>`,
      });
      const span = page.root?.querySelector('span');
      expect(span?.classList.contains('text-xs')).toBe(true);
      expect(span?.classList.contains('bg-techblue-50')).toBe(true);
      expect(span?.classList.contains('text-techblue-800')).toBe(true);
    });
  });

  describe('Dismissible Prop', () => {
    it('should accept dismissible prop', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge dismissible="true">Dismissible</aegov-badge>`,
      });
      expect(page.rootInstance.dismissible).toBe(true);
    });

    it('should default dismissible to false', async () => {
      const page = await newSpecPage({
        components: [AegovBadge],
        html: `<aegov-badge>Not Dismissible</aegov-badge>`,
      });
      expect(page.rootInstance.dismissible).toBe(false);
    });
  });
});
