import { newSpecPage } from '@stencil/core/testing';
import { AegovTitle } from './aegov-title';

describe('aegov-title', () => {
  // ------------------------------------------------------------------ rendering
  describe('rendering', () => {
    it('renders a p element', async () => {
      const page = await newSpecPage({
        components: [AegovTitle],
        html: `<aegov-title>Hello</aegov-title>`,
      });
      const p = page.root.querySelector('p');
      expect(p).not.toBeNull();
    });

    it('renders slot content inside p', async () => {
      const page = await newSpecPage({
        components: [AegovTitle],
        html: `<aegov-title>My Title</aegov-title>`,
      });
      const p = page.root.querySelector('p');
      expect(p.textContent).toBe('My Title');
    });
  });

  // ------------------------------------------------------------------ default props
  describe('default props', () => {
    it('defaults size to lg', async () => {
      const page = await newSpecPage({
        components: [AegovTitle],
        html: `<aegov-title>Title</aegov-title>`,
      });
      expect(page.rootInstance.size).toBe('lg');
    });

    it('has font-bold and mt-0 classes by default', async () => {
      const page = await newSpecPage({
        components: [AegovTitle],
        html: `<aegov-title>Title</aegov-title>`,
      });
      const p = page.root.querySelector('p');
      expect(p.className).toContain('font-bold');
      expect(p.className).toContain('mt-0');
    });

    it('has text-lg class by default', async () => {
      const page = await newSpecPage({
        components: [AegovTitle],
        html: `<aegov-title>Title</aegov-title>`,
      });
      const p = page.root.querySelector('p');
      expect(p.className).toContain('text-lg');
    });
  });

  // ------------------------------------------------------------------ size prop
  describe('size prop', () => {
    it('applies text-base for size=base', async () => {
      const page = await newSpecPage({
        components: [AegovTitle],
        html: `<aegov-title size="base">Title</aegov-title>`,
      });
      const p = page.root.querySelector('p');
      expect(p.className).toContain('text-base');
    });

    it('applies text-lg for size=lg', async () => {
      const page = await newSpecPage({
        components: [AegovTitle],
        html: `<aegov-title size="lg">Title</aegov-title>`,
      });
      const p = page.root.querySelector('p');
      expect(p.className).toContain('text-lg');
    });

    it('applies text-xl for size=xl', async () => {
      const page = await newSpecPage({
        components: [AegovTitle],
        html: `<aegov-title size="xl">Title</aegov-title>`,
      });
      const p = page.root.querySelector('p');
      expect(p.className).toContain('text-xl');
    });

    it('applies text-2xl for size=2xl', async () => {
      const page = await newSpecPage({
        components: [AegovTitle],
        html: `<aegov-title size="2xl">Title</aegov-title>`,
      });
      const p = page.root.querySelector('p');
      expect(p.className).toContain('text-2xl');
    });
  });

  // ------------------------------------------------------------------ custom class
  describe('custom class', () => {
    it('merges custom classes with defaults', async () => {
      const page = await newSpecPage({
        components: [AegovTitle],
        html: `<aegov-title class="text-red-500 uppercase">Title</aegov-title>`,
      });
      const p = page.root.querySelector('p');
      expect(p.className).toContain('font-bold');
      expect(p.className).toContain('text-red-500');
      expect(p.className).toContain('uppercase');
    });
  });

  // ------------------------------------------------------------------ pass-through attributes
  describe('pass-through attributes', () => {
    it('passes data-* attributes to p element', async () => {
      const page = await newSpecPage({
        components: [AegovTitle],
        html: `<aegov-title data-testid="main-title">Title</aegov-title>`,
      });
      const p = page.root.querySelector('p');
      expect(p.getAttribute('data-testid')).toBe('main-title');
    });

    it('passes aria-* attributes to p element', async () => {
      const page = await newSpecPage({
        components: [AegovTitle],
        html: `<aegov-title aria-label="Section title">Title</aegov-title>`,
      });
      const p = page.root.querySelector('p');
      expect(p.getAttribute('aria-label')).toBe('Section title');
    });

    it('passes id attribute to p element', async () => {
      const page = await newSpecPage({
        components: [AegovTitle],
        html: `<aegov-title id="page-title">Title</aegov-title>`,
      });
      const p = page.root.querySelector('p');
      expect(p.getAttribute('id')).toBe('page-title');
    });
  });
});
