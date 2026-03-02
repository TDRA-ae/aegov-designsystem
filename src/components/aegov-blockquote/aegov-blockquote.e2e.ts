import { newE2EPage } from '@stencil/core/testing';

describe('aegov-blockquote E2E', () => {
  describe('rendering', () => {
    it('should render', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-blockquote></aegov-blockquote>');
      const element = await page.find('aegov-blockquote');
      expect(element).toBeTruthy();
    });

    it('should render blockquote element with aegov-quote class', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-blockquote></aegov-blockquote>');
      const blockquote = await page.find('aegov-blockquote .aegov-quote');
      expect(blockquote).toBeTruthy();
    });

    it('should render slot content', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-blockquote>This is a quote</aegov-blockquote>');
      const element = await page.find('aegov-blockquote');
      const text = await element.getProperty('textContent');
      expect(text).toContain('This is a quote');
    });

    it('should render quote icon for primary variant', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-blockquote variant="primary"></aegov-blockquote>');
      const svg = await page.find('aegov-blockquote svg');
      expect(svg).toBeTruthy();
    });

    it('should not render quote icon for colored variant', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-blockquote variant="colored"></aegov-blockquote>');
      const svg = await page.find('aegov-blockquote svg');
      expect(svg).toBeNull();
    });

    it('should not render quote icon for coloured variant', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-blockquote variant="coloured"></aegov-blockquote>');
      const svg = await page.find('aegov-blockquote svg');
      expect(svg).toBeNull();
    });
  });

  describe('variants', () => {
    it('should render primary variant by default', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-blockquote></aegov-blockquote>');
      const blockquote = await page.find('aegov-blockquote .aegov-quote');
      expect(blockquote).not.toHaveClass('quote-colored');
    });

    it('should apply colored variant class', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-blockquote variant="colored"></aegov-blockquote>');
      const blockquote = await page.find('aegov-blockquote .aegov-quote');
      expect(blockquote).toHaveClass('quote-colored');
    });

    it('should apply colored variant class for coloured spelling', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-blockquote variant="coloured"></aegov-blockquote>');
      const blockquote = await page.find('aegov-blockquote .aegov-quote');
      expect(blockquote).toHaveClass('quote-colored');
    });
  });

  describe('cite attribute', () => {
    it('should render cite attribute when provided', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-blockquote cite="https://example.com"></aegov-blockquote>');
      const blockquote = await page.find('aegov-blockquote blockquote');
      expect(await blockquote.getAttribute('cite')).toBe('https://example.com');
    });

    it('should not have cite attribute when not provided', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-blockquote></aegov-blockquote>');
      const blockquote = await page.find('aegov-blockquote blockquote');
      expect(await blockquote.getAttribute('cite')).toBeNull();
    });
  });

  describe('author and authorTitle', () => {
    it('should not render footer when no author or title', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-blockquote></aegov-blockquote>');
      const footer = await page.find('aegov-blockquote .quote-footer');
      expect(footer).toBeNull();
    });

    it('should render author when provided', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-blockquote author="John Doe"></aegov-blockquote>');
      const author = await page.find('aegov-blockquote .quote-author');
      expect(author).toBeTruthy();
      expect(await author.getProperty('textContent')).toBe('John Doe');
    });

    it('should render authorTitle when provided', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-blockquote author-title="CEO, Company"></aegov-blockquote>');
      const title = await page.find('aegov-blockquote .quote-title');
      expect(title).toBeTruthy();
      expect(await title.getProperty('textContent')).toBe('CEO, Company');
    });

    it('should render both author and authorTitle', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-blockquote author="John Doe" author-title="CEO, Company"></aegov-blockquote>');
      const footer = await page.find('aegov-blockquote .quote-footer');
      expect(footer).toBeTruthy();
      const author = await page.find('aegov-blockquote .quote-author');
      expect(await author.getProperty('textContent')).toBe('John Doe');
      const title = await page.find('aegov-blockquote .quote-title');
      expect(await title.getProperty('textContent')).toBe('CEO, Company');
    });

    it('should render only author when title not provided', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-blockquote author="John Doe"></aegov-blockquote>');
      expect(await page.find('aegov-blockquote .quote-author')).toBeTruthy();
      expect(await page.find('aegov-blockquote .quote-title')).toBeNull();
    });

    it('should render only title when author not provided', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-blockquote author-title="CEO, Company"></aegov-blockquote>');
      expect(await page.find('aegov-blockquote .quote-author')).toBeNull();
      expect(await page.find('aegov-blockquote .quote-title')).toBeTruthy();
    });
  });

  describe('combined props', () => {
    it('should render complete blockquote with all attributes', async () => {
      const page = await newE2EPage();
      await page.setContent(`
        <aegov-blockquote
          variant="colored"
          cite="https://example.com"
          author="Jane Smith"
          author-title="Product Manager">
          The best way to predict the future is to create it.
        </aegov-blockquote>
      `);

      const blockquote = await page.find('aegov-blockquote blockquote');
      expect(blockquote).toHaveClass('quote-colored');
      expect(await blockquote.getAttribute('cite')).toBe('https://example.com');

      const author = await page.find('aegov-blockquote .quote-author');
      expect(await author.getProperty('textContent')).toBe('Jane Smith');

      const title = await page.find('aegov-blockquote .quote-title');
      expect(await title.getProperty('textContent')).toBe('Product Manager');

      const element = await page.find('aegov-blockquote');
      expect(await element.getProperty('textContent')).toContain('The best way to predict the future is to create it.');
    });
  });

  describe('accessibility', () => {
    it('should render as blockquote element', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-blockquote>Quote</aegov-blockquote>');
      const blockquote = await page.find('aegov-blockquote blockquote');
      expect(blockquote).toBeTruthy();
    });

    it('should support cite attribute for source URL', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-blockquote cite="https://source.com">Quote</aegov-blockquote>');
      const blockquote = await page.find('aegov-blockquote blockquote');
      expect(await blockquote.getAttribute('cite')).toBe('https://source.com');
    });
  });

  describe('styling', () => {
    it('should apply border and background for colored variant', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-blockquote variant="colored">Quote</aegov-blockquote>');
      const blockquote = await page.find('aegov-blockquote .aegov-quote');
      expect(blockquote).toHaveClass('quote-colored');
    });
  });
});
