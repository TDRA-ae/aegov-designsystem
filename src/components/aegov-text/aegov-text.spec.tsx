import { newSpecPage } from '@stencil/core/testing';
import { AegovText } from './aegov-text';

describe('aegov-text', () => {
  // ------------------------------------------------------------------ rendering
  describe('rendering', () => {
    it('renders a p element', async () => {
      const page = await newSpecPage({
        components: [AegovText],
        html: `<aegov-text>Hello</aegov-text>`,
      });
      const p = page.root.querySelector('p');
      expect(p).not.toBeNull();
    });

    it('renders slot content inside p', async () => {
      const page = await newSpecPage({
        components: [AegovText],
        html: `<aegov-text>Body text here</aegov-text>`,
      });
      const p = page.root.querySelector('p');
      expect(p.textContent).toBe('Body text here');
    });
  });

  // ------------------------------------------------------------------ default props
  describe('default props', () => {
    it('defaults size to base', async () => {
      const page = await newSpecPage({
        components: [AegovText],
        html: `<aegov-text>Text</aegov-text>`,
      });
      expect(page.rootInstance.size).toBe('base');
    });

    it('has mb-8 and mt-0 classes by default', async () => {
      const page = await newSpecPage({
        components: [AegovText],
        html: `<aegov-text>Text</aegov-text>`,
      });
      const p = page.root.querySelector('p');
      expect(p.className).toContain('mb-8');
      expect(p.className).toContain('mt-0');
    });

    it('has text-base class by default', async () => {
      const page = await newSpecPage({
        components: [AegovText],
        html: `<aegov-text>Text</aegov-text>`,
      });
      const p = page.root.querySelector('p');
      expect(p.className).toContain('text-base');
    });
  });

  // ------------------------------------------------------------------ size prop
  describe('size prop', () => {
    it('applies text-sm for size=sm', async () => {
      const page = await newSpecPage({
        components: [AegovText],
        html: `<aegov-text size="sm">Small text</aegov-text>`,
      });
      const p = page.root.querySelector('p');
      expect(p.className).toContain('text-sm');
    });

    it('applies text-base for size=base', async () => {
      const page = await newSpecPage({
        components: [AegovText],
        html: `<aegov-text size="base">Base text</aegov-text>`,
      });
      const p = page.root.querySelector('p');
      expect(p.className).toContain('text-base');
    });

    it('applies text-lg for size=lg', async () => {
      const page = await newSpecPage({
        components: [AegovText],
        html: `<aegov-text size="lg">Large text</aegov-text>`,
      });
      const p = page.root.querySelector('p');
      expect(p.className).toContain('text-lg');
    });
  });

  // ------------------------------------------------------------------ custom class
  describe('custom class', () => {
    it('merges custom classes with defaults', async () => {
      const page = await newSpecPage({
        components: [AegovText],
        html: `<aegov-text class="text-gray-500 italic">Text</aegov-text>`,
      });
      const p = page.root.querySelector('p');
      expect(p.className).toContain('mb-8');
      expect(p.className).toContain('text-gray-500');
      expect(p.className).toContain('italic');
    });
  });

  // ------------------------------------------------------------------ pass-through attributes
  describe('pass-through attributes', () => {
    it('passes data-* attributes to p element', async () => {
      const page = await newSpecPage({
        components: [AegovText],
        html: `<aegov-text data-testid="body-text">Text</aegov-text>`,
      });
      const p = page.root.querySelector('p');
      expect(p.getAttribute('data-testid')).toBe('body-text');
    });

    it('passes aria-* attributes to p element', async () => {
      const page = await newSpecPage({
        components: [AegovText],
        html: `<aegov-text aria-describedby="desc-1">Text</aegov-text>`,
      });
      const p = page.root.querySelector('p');
      expect(p.getAttribute('aria-describedby')).toBe('desc-1');
    });

    it('passes id attribute to p element', async () => {
      const page = await newSpecPage({
        components: [AegovText],
        html: `<aegov-text id="intro-text">Text</aegov-text>`,
      });
      const p = page.root.querySelector('p');
      expect(p.getAttribute('id')).toBe('intro-text');
    });
  });
});
