import { newE2EPage } from '@stencil/core/testing';

describe('aegov-text E2E', () => {
  describe('rendering', () => {
    it('should render', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-text>Hello World</aegov-text>`);
      const element = await page.find('aegov-text');
      expect(element).toBeTruthy();
    });

    it('should render a p element with text content', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-text>Paragraph text</aegov-text>`);
      const p = await page.find('aegov-text p');
      expect(p).toBeTruthy();
      expect(await p.textContent).toBe('Paragraph text');
    });
  });

  describe('size prop', () => {
    it('should apply text-sm class for size=sm', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-text size="sm">Small</aegov-text>`);
      const p = await page.find('aegov-text p');
      expect(await p.getAttribute('class')).toContain('text-sm');
    });

    it('should apply text-base class for size=base', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-text size="base">Base</aegov-text>`);
      const p = await page.find('aegov-text p');
      expect(await p.getAttribute('class')).toContain('text-base');
    });

    it('should apply text-lg class for size=lg', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-text size="lg">Large</aegov-text>`);
      const p = await page.find('aegov-text p');
      expect(await p.getAttribute('class')).toContain('text-lg');
    });
  });

  describe('default classes', () => {
    it('should have mb-8 class', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-text>Text</aegov-text>`);
      const p = await page.find('aegov-text p');
      expect(await p.getAttribute('class')).toContain('mb-8');
    });

    it('should have mt-0 class', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-text>Text</aegov-text>`);
      const p = await page.find('aegov-text p');
      expect(await p.getAttribute('class')).toContain('mt-0');
    });
  });

  describe('custom class', () => {
    it('should merge custom classes with defaults', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-text class="text-gray-600">Text</aegov-text>`);
      const p = await page.find('aegov-text p');
      const cls = await p.getAttribute('class');
      expect(cls).toContain('mb-8');
      expect(cls).toContain('text-gray-600');
    });
  });

  describe('pass-through attributes', () => {
    it('should pass data-* attributes to p element', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-text data-testid="paragraph-1">Text</aegov-text>`);
      const p = await page.find('aegov-text p');
      expect(await p.getAttribute('data-testid')).toBe('paragraph-1');
    });

    it('should pass aria-* attributes to p element', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-text aria-label="Description">Text</aegov-text>`);
      const p = await page.find('aegov-text p');
      expect(await p.getAttribute('aria-label')).toBe('Description');
    });

    it('should pass id attribute to p element', async () => {
      const page = await newE2EPage();
      await page.setContent(`<aegov-text id="content-text">Text</aegov-text>`);
      const p = await page.find('aegov-text p');
      expect(await p.getAttribute('id')).toBe('content-text');
    });
  });
});
