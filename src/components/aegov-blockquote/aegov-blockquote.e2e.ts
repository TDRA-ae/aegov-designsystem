import { newE2EPage } from '@stencil/core/testing';

describe('aegov-blockquote e2e', () => {
  describe('rendering', () => {
    it('should render', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-blockquote></aegov-blockquote>');
      const element = await page.find('aegov-blockquote');
      expect(element).toBeTruthy();
    });

    it('should render with default props', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-blockquote></aegov-blockquote>');
      const blockquote = await page.find('aegov-blockquote .aegov-quote');
      expect(blockquote).toBeTruthy();
      expect(blockquote).not.toHaveClass('quote-colored');
    });

    it('should render quote content from slot', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-blockquote>This is a quote</aegov-blockquote>');
      const element = await page.find('aegov-blockquote');
      const text = await element.getProperty('textContent');
      expect(text).toContain('This is a quote');
    });

    it('should render quote icon for primary variant', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-blockquote variant="primary"></aegov-blockquote>');
      const icon = await page.find('aegov-blockquote .quote-icon');
      expect(icon).toBeTruthy();
    });

    it('should not render quote icon for colored variant', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-blockquote variant="colored"></aegov-blockquote>');
      const icon = await page.find('aegov-blockquote .quote-icon');
      expect(icon).toBeNull();
    });
  });

  describe('variants', () => {
    it('should apply primary variant class (default)', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-blockquote variant="primary"></aegov-blockquote>');
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
      const cite = await blockquote.getAttribute('cite');
      expect(cite).toBe('https://example.com');
    });

    it('should not have cite attribute when not provided', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-blockquote></aegov-blockquote>');
      const blockquote = await page.find('aegov-blockquote blockquote');
      const cite = await blockquote.getAttribute('cite');
      expect(cite).toBeNull();
    });
  });

  describe('author and title', () => {
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
      const text = await author.getProperty('textContent');
      expect(text).toBe('John Doe');
    });

    it('should render title when provided', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-blockquote author-title="CEO, Company"></aegov-blockquote>');
      const cite = await page.find('aegov-blockquote .quote-cite');
      expect(cite).toBeTruthy();
      const text = await cite.getProperty('textContent');
      expect(text).toBe('CEO, Company');
    });

    it('should render both author and title when provided', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-blockquote author="John Doe" author-title="CEO, Company"></aegov-blockquote>');

      const footer = await page.find('aegov-blockquote .quote-footer');
      const author = await page.find('aegov-blockquote .quote-author');
      const cite = await page.find('aegov-blockquote .quote-cite');

      expect(footer).toBeTruthy();
      expect(author).toBeTruthy();
      expect(cite).toBeTruthy();

      const authorText = await author.getProperty('textContent');
      const citeText = await cite.getProperty('textContent');
      expect(authorText).toBe('John Doe');
      expect(citeText).toBe('CEO, Company');
    });

    it('should render only author when title not provided', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-blockquote author="John Doe"></aegov-blockquote>');

      const author = await page.find('aegov-blockquote .quote-author');
      const cite = await page.find('aegov-blockquote .quote-cite');

      expect(author).toBeTruthy();
      expect(cite).toBeNull();

      const authorText = await author.getProperty('textContent');
      expect(authorText).toBe('John Doe');
    });

    it('should render only title when author not provided', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-blockquote author-title="CEO, Company"></aegov-blockquote>');

      const author = await page.find('aegov-blockquote .quote-author');
      const cite = await page.find('aegov-blockquote .quote-cite');

      expect(author).toBeNull();
      expect(cite).toBeTruthy();

      const citeText = await cite.getProperty('textContent');
      expect(citeText).toBe('CEO, Company');
    });
  });

  describe('complete blockquote', () => {
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
      const author = await page.find('aegov-blockquote .quote-author');
      const cite = await page.find('aegov-blockquote .quote-cite');
      const element = await page.find('aegov-blockquote');

      expect(blockquote).toHaveClass('quote-colored');

      const citeAttr = await blockquote.getAttribute('cite');
      expect(citeAttr).toBe('https://example.com');

      const authorText = await author.getProperty('textContent');
      const citeText = await cite.getProperty('textContent');
      const elementText = await element.getProperty('textContent');

      expect(authorText).toBe('Jane Smith');
      expect(citeText).toBe('Product Manager');
      expect(elementText).toContain('The best way to predict the future is to create it.');
    });
  });

  describe('dynamic props', () => {
    it('should update when variant changes', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-blockquote variant="primary"></aegov-blockquote>');

      let blockquote = await page.find('aegov-blockquote .aegov-quote');
      expect(blockquote).not.toHaveClass('quote-colored');

      const element = await page.find('aegov-blockquote');
      element.setProperty('variant', 'colored');
      await page.waitForChanges();

      blockquote = await page.find('aegov-blockquote .aegov-quote');
      expect(blockquote).toHaveClass('quote-colored');
    });

    it('should update when author changes', async () => {
      const page = await newE2EPage();
      await page.setContent('<aegov-blockquote></aegov-blockquote>');

      let author = await page.find('aegov-blockquote .quote-author');
      expect(author).toBeNull();

      const element = await page.find('aegov-blockquote');
      element.setProperty('author', 'New Author');
      await page.waitForChanges();

      author = await page.find('aegov-blockquote .quote-author');
      expect(author).toBeTruthy();

      const authorText = await author.getProperty('textContent');
      expect(authorText).toBe('New Author');
    });
  });
});
