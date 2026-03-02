import { newSpecPage } from '@stencil/core/testing';
import { AegovSeparator } from './aegov-separator';

describe('aegov-separator', () => {
  // ------------------------------------------------------------------ rendering
  describe('rendering', () => {
    it('renders an hr element by default (no text)', async () => {
      const page = await newSpecPage({
        components: [AegovSeparator],
        html: `<aegov-separator></aegov-separator>`,
      });
      const hr = page.root.querySelector('hr');
      expect(hr).not.toBeNull();
    });

    it('renders a div when text prop is provided', async () => {
      const page = await newSpecPage({
        components: [AegovSeparator],
        html: `<aegov-separator text="OR"></aegov-separator>`,
      });
      const div = page.root.querySelector('div.separator');
      expect(div).not.toBeNull();
    });

    it('renders separator text content', async () => {
      const page = await newSpecPage({
        components: [AegovSeparator],
        html: `<aegov-separator text="OR"></aegov-separator>`,
      });
      const textSpan = page.root.querySelector('.separator__text');
      expect(textSpan.textContent).toBe('OR');
    });

    it('renders two separator lines with text', async () => {
      const page = await newSpecPage({
        components: [AegovSeparator],
        html: `<aegov-separator text="divider"></aegov-separator>`,
      });
      const lines = page.root.querySelectorAll('.separator__line');
      expect(lines.length).toBe(2);
    });

    it('renders slot content when no text prop', async () => {
      const page = await newSpecPage({
        components: [AegovSeparator],
        html: `<aegov-separator>OR</aegov-separator>`,
      });
      const textSpan = page.root.querySelector('.separator__text');
      expect(textSpan).not.toBeNull();
    });

    it('prefers text prop over slot content', async () => {
      const page = await newSpecPage({
        components: [AegovSeparator],
        html: `<aegov-separator text="PROP">SLOT</aegov-separator>`,
      });
      const textSpan = page.root.querySelector('.separator__text');
      expect(textSpan.textContent).toBe('PROP');
    });
  });

  // ------------------------------------------------------------------ default props
  describe('default props', () => {
    it('defaults orientation to horizontal', async () => {
      const page = await newSpecPage({
        components: [AegovSeparator],
        html: `<aegov-separator></aegov-separator>`,
      });
      expect(page.rootInstance.orientation).toBe('horizontal');
    });

    it('defaults variant to default', async () => {
      const page = await newSpecPage({
        components: [AegovSeparator],
        html: `<aegov-separator></aegov-separator>`,
      });
      expect(page.rootInstance.variant).toBe('default');
    });

    it('defaults decorative to true', async () => {
      const page = await newSpecPage({
        components: [AegovSeparator],
        html: `<aegov-separator></aegov-separator>`,
      });
      expect(page.rootInstance.decorative).toBe(true);
    });
  });

  // ------------------------------------------------------------------ orientation
  describe('orientation', () => {
    it('applies separator--horizontal class for horizontal', async () => {
      const page = await newSpecPage({
        components: [AegovSeparator],
        html: `<aegov-separator orientation="horizontal"></aegov-separator>`,
      });
      const hr = page.root.querySelector('hr');
      expect(hr.classList.contains('separator--horizontal')).toBe(true);
    });

    it('applies separator--vertical class for vertical', async () => {
      const page = await newSpecPage({
        components: [AegovSeparator],
        html: `<aegov-separator orientation="vertical"></aegov-separator>`,
      });
      const hr = page.root.querySelector('hr');
      expect(hr.classList.contains('separator--vertical')).toBe(true);
    });

    it('sets aria-orientation to horizontal', async () => {
      const page = await newSpecPage({
        components: [AegovSeparator],
        html: `<aegov-separator orientation="horizontal"></aegov-separator>`,
      });
      const hr = page.root.querySelector('hr');
      expect(hr.getAttribute('aria-orientation')).toBe('horizontal');
    });

    it('sets aria-orientation to vertical', async () => {
      const page = await newSpecPage({
        components: [AegovSeparator],
        html: `<aegov-separator orientation="vertical"></aegov-separator>`,
      });
      const hr = page.root.querySelector('hr');
      expect(hr.getAttribute('aria-orientation')).toBe('vertical');
    });
  });

  // ------------------------------------------------------------------ variant
  describe('variant', () => {
    it('applies separator--subtle for subtle variant', async () => {
      const page = await newSpecPage({
        components: [AegovSeparator],
        html: `<aegov-separator variant="subtle"></aegov-separator>`,
      });
      const hr = page.root.querySelector('hr');
      expect(hr.classList.contains('separator--subtle')).toBe(true);
    });

    it('does not apply separator--subtle for default variant', async () => {
      const page = await newSpecPage({
        components: [AegovSeparator],
        html: `<aegov-separator variant="default"></aegov-separator>`,
      });
      const hr = page.root.querySelector('hr');
      expect(hr.classList.contains('separator--subtle')).toBe(false);
    });

    it('combines orientation and variant classes', async () => {
      const page = await newSpecPage({
        components: [AegovSeparator],
        html: `<aegov-separator orientation="vertical" variant="subtle"></aegov-separator>`,
      });
      const hr = page.root.querySelector('hr');
      expect(hr.classList.contains('separator--vertical')).toBe(true);
      expect(hr.classList.contains('separator--subtle')).toBe(true);
    });
  });

  // ------------------------------------------------------------------ decorative / role
  describe('decorative / role', () => {
    it('has role="presentation" when decorative is true', async () => {
      const page = await newSpecPage({
        components: [AegovSeparator],
        html: `<aegov-separator></aegov-separator>`,
      });
      const hr = page.root.querySelector('hr');
      expect(hr.getAttribute('role')).toBe('presentation');
    });

    it('has role="separator" when decorative is false', async () => {
      const page = await newSpecPage({
        components: [AegovSeparator],
        html: `<aegov-separator decorative="false"></aegov-separator>`,
      });
      const hr = page.root.querySelector('hr');
      expect(hr.getAttribute('role')).toBe('separator');
    });

    it('has role="presentation" on div when decorative with text', async () => {
      const page = await newSpecPage({
        components: [AegovSeparator],
        html: `<aegov-separator text="OR"></aegov-separator>`,
      });
      const div = page.root.querySelector('div.separator');
      expect(div.getAttribute('role')).toBe('presentation');
    });

    it('has role="separator" on div when not decorative with text', async () => {
      const page = await newSpecPage({
        components: [AegovSeparator],
        html: `<aegov-separator text="OR" decorative="false"></aegov-separator>`,
      });
      const div = page.root.querySelector('div.separator');
      expect(div.getAttribute('role')).toBe('separator');
    });
  });

  // ------------------------------------------------------------------ with-text class
  describe('with-text class', () => {
    it('applies separator--with-text when text prop is set', async () => {
      const page = await newSpecPage({
        components: [AegovSeparator],
        html: `<aegov-separator text="Section"></aegov-separator>`,
      });
      const div = page.root.querySelector('div.separator');
      expect(div.classList.contains('separator--with-text')).toBe(true);
    });

    it('does not apply separator--with-text when no text', async () => {
      const page = await newSpecPage({
        components: [AegovSeparator],
        html: `<aegov-separator></aegov-separator>`,
      });
      const hr = page.root.querySelector('hr');
      expect(hr.classList.contains('separator--with-text')).toBe(false);
    });
  });
});
