import { newE2EPage } from '@stencil/core/testing';

describe('aegov-title E2E', () => {
  describe('rendering', () => {
    it('should render', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-title>Hello World</aegov-title>`);
      const element = await page.find('aegov-title');
      expect(element).toBeTruthy();
    });

    it('should render a p element with text content', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-title>Page Title</aegov-title>`);
      const p = await page.find('aegov-title p');
      expect(p).toBeTruthy();
      expect(await p.textContent).toBe('Page Title');
    });
  });

  describe('size prop', () => {
    it('should apply text-base! class for size=sm', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-title size="sm">Title</aegov-title>`);
      const p = await page.find('aegov-title p');
      expect(await p.getAttribute('class')).toContain('text-base!');
    });

    it('should apply text-lg! class for size=base', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-title size="base">Title</aegov-title>`);
      const p = await page.find('aegov-title p');
      expect(await p.getAttribute('class')).toContain('text-lg!');
    });

    it('should apply text-xl! class for size=lg', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-title size="lg">Title</aegov-title>`);
      const p = await page.find('aegov-title p');
      expect(await p.getAttribute('class')).toContain('text-xl!');
    });

    it('should apply text-2xl! class for size=xl', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-title size="xl">Title</aegov-title>`);
      const p = await page.find('aegov-title p');
      expect(await p.getAttribute('class')).toContain('text-2xl!');
    });

    it('should apply text-3xl! class for size=2xl', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-title size="2xl">Title</aegov-title>`);
      const p = await page.find('aegov-title p');
      expect(await p.getAttribute('class')).toContain('text-3xl!');
    });
  });

  describe('default classes', () => {
    it('should have font-bold! class', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-title>Title</aegov-title>`);
      const p = await page.find('aegov-title p');
      expect(await p.getAttribute('class')).toContain('font-bold!');
    });

    it('should have mt-0! and mb-0! classes', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-title>Title</aegov-title>`);
      const p = await page.find('aegov-title p');
      const cls = await p.getAttribute('class');
      expect(cls).toContain('mt-0!');
      expect(cls).toContain('mb-0!');
    });
  });

  describe('custom class', () => {
    it('should merge custom classes with defaults', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-title class="text-red-500">Title</aegov-title>`);
      const p = await page.find('aegov-title p');
      const cls = await p.getAttribute('class');
      expect(cls).toContain('font-bold');
      expect(cls).toContain('text-red-500');
    });
  });

  describe('headingType prop', () => {
    it('renders a <p> by default', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-title>Default</aegov-title>`);
      const p = await page.find('aegov-title p');
      expect(p).toBeTruthy();
      const h2 = await page.find('aegov-title h2');
      expect(h2).toBeFalsy();
    });

    it('renders an <h3> when heading-type="h3"', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-title heading-type="h3" size="lg">Section</aegov-title>`);
      const h3 = await page.find('aegov-title h3');
      expect(h3).toBeTruthy();
      expect(await h3.textContent).toBe('Section');
      const cls = await h3.getAttribute('class');
      expect(cls).toContain('text-xl!');
      expect(cls).toContain('font-bold!');
      expect(cls).toContain('mt-0!');
      expect(cls).toContain('mb-0!');
      const p = await page.find('aegov-title p');
      expect(p).toBeFalsy();
    });

    it('renders an <h2> with the size class overriding the global heading style', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-title heading-type="h2" size="2xl">Big</aegov-title>`);
      const h2 = await page.find('aegov-title h2');
      expect(h2).toBeTruthy();
      expect(await h2.getAttribute('class')).toContain('text-3xl!');
    });
  });

  describe('pass-through attributes', () => {
    it('should pass data-* attributes to p element', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-title data-testid="title-1">Title</aegov-title>`);
      const p = await page.find('aegov-title p');
      expect(await p.getAttribute('data-testid')).toBe('title-1');
    });

    it('should pass aria-* attributes to p element', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-title aria-label="Main heading">Title</aegov-title>`);
      const p = await page.find('aegov-title p');
      expect(await p.getAttribute('aria-label')).toBe('Main heading');
    });

    it('should pass id attribute to p element', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-title id="hero-title">Title</aegov-title>`);
      const p = await page.find('aegov-title p');
      expect(await p.getAttribute('id')).toBe('hero-title');
    });
  });
});
