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
    it('defaults size to base', async () => {
      const page = await newSpecPage({
        components: [AegovTitle],
        html: `<aegov-title>Title</aegov-title>`,
      });
      expect(page.rootInstance.size).toBe('base');
    });

    it('has font-bold!, mt-0! and mb-0! classes by default', async () => {
      const page = await newSpecPage({
        components: [AegovTitle],
        html: `<aegov-title>Title</aegov-title>`,
      });
      const p = page.root.querySelector('p');
      expect(p.className).toContain('font-bold!');
      expect(p.className).toContain('mt-0!');
      expect(p.className).toContain('mb-0!');
    });

    it('has text-lg! class by default', async () => {
      const page = await newSpecPage({
        components: [AegovTitle],
        html: `<aegov-title>Title</aegov-title>`,
      });
      const p = page.root.querySelector('p');
      expect(p.className).toContain('text-lg!');
    });
  });

  // ------------------------------------------------------------------ size prop
  describe('size prop', () => {
    it('applies text-base! for size=sm', async () => {
      const page = await newSpecPage({
        components: [AegovTitle],
        html: `<aegov-title size="sm">Title</aegov-title>`,
      });
      const p = page.root.querySelector('p');
      expect(p.className).toContain('text-base!');
    });

    it('applies text-lg! for size=base', async () => {
      const page = await newSpecPage({
        components: [AegovTitle],
        html: `<aegov-title size="base">Title</aegov-title>`,
      });
      const p = page.root.querySelector('p');
      expect(p.className).toContain('text-lg!');
    });

    it('applies text-xl! for size=lg', async () => {
      const page = await newSpecPage({
        components: [AegovTitle],
        html: `<aegov-title size="lg">Title</aegov-title>`,
      });
      const p = page.root.querySelector('p');
      expect(p.className).toContain('text-xl!');
    });

    it('applies text-2xl! for size=xl', async () => {
      const page = await newSpecPage({
        components: [AegovTitle],
        html: `<aegov-title size="xl">Title</aegov-title>`,
      });
      const p = page.root.querySelector('p');
      expect(p.className).toContain('text-2xl!');
    });

    it('applies text-3xl! for size=2xl', async () => {
      const page = await newSpecPage({
        components: [AegovTitle],
        html: `<aegov-title size="2xl">Title</aegov-title>`,
      });
      const p = page.root.querySelector('p');
      expect(p.className).toContain('text-3xl!');
    });
  });

  // ------------------------------------------------------------------ headingType prop
  describe('headingType prop', () => {
    it('renders a <p> when headingType is not set', async () => {
      const page = await newSpecPage({
        components: [AegovTitle],
        html: `<aegov-title>Title</aegov-title>`,
      });
      expect(page.root.querySelector('p')).not.toBeNull();
      expect(page.root.querySelector('h1, h2, h3, h4, h5, h6')).toBeNull();
    });

    (['h2', 'h3', 'h4', 'h5', 'h6'] as const).forEach(tag => {
      it(`renders a <${tag}> when heading-type="${tag}"`, async () => {
        const page = await newSpecPage({
          components: [AegovTitle],
          html: `<aegov-title heading-type="${tag}">Title</aegov-title>`,
        });
        const heading = page.root.querySelector(tag);
        expect(heading).not.toBeNull();
        expect(heading.textContent).toBe('Title');
        expect(page.root.querySelector('p')).toBeNull();
      });
    });

    it('applies size class to the heading wrapper', async () => {
      const page = await newSpecPage({
        components: [AegovTitle],
        html: `<aegov-title heading-type="h2" size="xl">Title</aegov-title>`,
      });
      const h2 = page.root.querySelector('h2');
      expect(h2).not.toBeNull();
      expect(h2.className).toContain('text-2xl!');
    });

    it('applies forced margin reset (mt-0!, mb-0!) to the heading wrapper', async () => {
      const page = await newSpecPage({
        components: [AegovTitle],
        html: `<aegov-title heading-type="h3">Title</aegov-title>`,
      });
      const h3 = page.root.querySelector('h3');
      expect(h3.className).toContain('mt-0!');
      expect(h3.className).toContain('mb-0!');
    });

    it('forwards pass-through attributes to the heading wrapper', async () => {
      const page = await newSpecPage({
        components: [AegovTitle],
        html: `<aegov-title heading-type="h2" id="hero" data-testid="t" aria-label="Page">Title</aegov-title>`,
      });
      const h2 = page.root.querySelector('h2');
      expect(h2.getAttribute('id')).toBe('hero');
      expect(h2.getAttribute('data-testid')).toBe('t');
      expect(h2.getAttribute('aria-label')).toBe('Page');
    });

    it('renders a <p> when heading-type="p"', async () => {
      const page = await newSpecPage({
        components: [AegovTitle],
        html: `<aegov-title heading-type="p">Title</aegov-title>`,
      });
      expect(page.root.querySelector('p')).not.toBeNull();
    });
  });

  // ------------------------------------------------------------------ custom class
  describe('custom class', () => {
    it('merges custom classes with defaults', async () => {
      const page = await newSpecPage({
        components: [AegovTitle],
        html: `<aegov-title extra-class="text-red-500 uppercase">Title</aegov-title>`,
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

  // ------------------------------------------------------------------ invalid prop values
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
        components: [AegovTitle],
        html: `<aegov-title size="huge">Title</aegov-title>`,
      });
      const p = page.root.querySelector('p');
      expect(p).toBeTruthy();
      expect(p.className).toContain('text-lg');
    });

    it('warns with component name, prop name, invalid value, and fallback', async () => {
      await newSpecPage({
        components: [AegovTitle],
        html: `<aegov-title size="huge">Title</aegov-title>`,
      });
      const messages = warnSpy.mock.calls.map(c => c[0] as string);
      const sizeWarn = messages.find(m => m.includes('[aegov-title]') && m.includes('"huge"'));
      expect(sizeWarn).toBeDefined();
      expect(sizeWarn).toContain('"size"');
    });

    it('does not warn when all props are valid', async () => {
      await newSpecPage({
        components: [AegovTitle],
        html: `<aegov-title size="xl">Title</aegov-title>`,
      });
      expect(warnSpy).not.toHaveBeenCalled();
    });

    it('warns again via @Watch when size is updated to an invalid value', async () => {
      const page = await newSpecPage({
        components: [AegovTitle],
        html: `<aegov-title size="lg">Title</aegov-title>`,
      });
      expect(warnSpy).not.toHaveBeenCalled();

      page.root.setAttribute('size', 'nope');
      await page.waitForChanges();

      const messages = warnSpy.mock.calls.map(c => c[0] as string);
      const invalidWarn = messages.find(m => m.includes('[aegov-title]') && m.includes('"nope"'));
      expect(invalidWarn).toBeDefined();
      expect(invalidWarn).toContain('"size"');
    });
  });
});
