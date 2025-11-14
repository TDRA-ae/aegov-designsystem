import { newSpecPage } from '@stencil/core/testing';
import { AegovBlockquote } from './aegov-blockquote';

describe('aegov-blockquote', () => {
  describe('rendering', () => {
    it('should render', async () => {
      const page = await newSpecPage({
        components: [AegovBlockquote],
        html: `<aegov-blockquote></aegov-blockquote>`,
      });
      expect(page.root).toBeTruthy();
    });

    it('should render with default props', async () => {
      const page = await newSpecPage({
        components: [AegovBlockquote],
        html: `<aegov-blockquote></aegov-blockquote>`,
      });
      const component = page.rootInstance as AegovBlockquote;
      expect(component.variant).toBe('primary');

      const blockquote = page.root.querySelector('.aegov-quote');
      expect(blockquote).toBeTruthy();
      expect(blockquote.classList.contains('quote-colored')).toBe(false);
    });

    it('should render quote content from slot', async () => {
      const page = await newSpecPage({
        components: [AegovBlockquote],
        html: `<aegov-blockquote>This is a quote</aegov-blockquote>`,
      });
      expect(page.root.textContent).toContain('This is a quote');
    });

    it('should render quote icon for primary variant', async () => {
      const page = await newSpecPage({
        components: [AegovBlockquote],
        html: `<aegov-blockquote variant="primary"></aegov-blockquote>`,
      });
      const icon = page.root.querySelector('svg');
      expect(icon).toBeTruthy();
    });

    it('should not render quote icon for colored variant', async () => {
      const page = await newSpecPage({
        components: [AegovBlockquote],
        html: `<aegov-blockquote variant="colored"></aegov-blockquote>`,
      });
      const svg = page.root.querySelector('svg');
      expect(svg).toBeNull();
    });

    it('should not render quote icon for coloured variant', async () => {
      const page = await newSpecPage({
        components: [AegovBlockquote],
        html: `<aegov-blockquote variant="coloured"></aegov-blockquote>`,
      });
      const svg = page.root.querySelector('svg');
      expect(svg).toBeNull();
    });
  });

  describe('variants', () => {
    it('should apply primary variant as default', async () => {
      const page = await newSpecPage({
        components: [AegovBlockquote],
        html: `<aegov-blockquote></aegov-blockquote>`,
      });
      const component = page.rootInstance as AegovBlockquote;
      expect(component.variant).toBe('primary');
    });

    it('should apply primary variant class (default)', async () => {
      const page = await newSpecPage({
        components: [AegovBlockquote],
        html: `<aegov-blockquote variant="primary"></aegov-blockquote>`,
      });
      const component = page.rootInstance as AegovBlockquote;
      expect(component.variant).toBe('primary');

      const blockquote = page.root.querySelector('.aegov-quote');
      expect(blockquote.classList.contains('quote-colored')).toBe(false);
    });

    it('should apply colored variant class', async () => {
      const page = await newSpecPage({
        components: [AegovBlockquote],
        html: `<aegov-blockquote variant="colored"></aegov-blockquote>`,
      });
      const component = page.rootInstance as AegovBlockquote;
      expect(component.variant).toBe('colored');

      const blockquote = page.root.querySelector('.aegov-quote');
      expect(blockquote.classList.contains('quote-colored')).toBe(true);
    });

    it('should apply colored variant class for coloured spelling', async () => {
      const page = await newSpecPage({
        components: [AegovBlockquote],
        html: `<aegov-blockquote variant="coloured"></aegov-blockquote>`,
      });
      const component = page.rootInstance as AegovBlockquote;
      expect(component.variant).toBe('coloured');

      const blockquote = page.root.querySelector('.aegov-quote');
      expect(blockquote.classList.contains('quote-colored')).toBe(true);
    });
  });

  describe('cite attribute', () => {
    it('should render cite attribute when provided', async () => {
      const page = await newSpecPage({
        components: [AegovBlockquote],
        html: `<aegov-blockquote cite="https://example.com"></aegov-blockquote>`,
      });
      const component = page.rootInstance as AegovBlockquote;
      expect(component.cite).toBe('https://example.com');

      const blockquote = page.root.querySelector('blockquote');
      expect(blockquote.getAttribute('cite')).toBe('https://example.com');
    });

    it('should not have cite attribute when not provided', async () => {
      const page = await newSpecPage({
        components: [AegovBlockquote],
        html: `<aegov-blockquote></aegov-blockquote>`,
      });
      const component = page.rootInstance as AegovBlockquote;
      expect(component.cite).toBeUndefined();

      const blockquote = page.root.querySelector('blockquote');
      expect(blockquote.hasAttribute('cite')).toBe(false);
    });
  });

  describe('author and title', () => {
    it('should not render footer when no author or title', async () => {
      const page = await newSpecPage({
        components: [AegovBlockquote],
        html: `<aegov-blockquote></aegov-blockquote>`,
      });
      const footer = page.root.querySelector('.quote-footer');
      expect(footer).toBeNull();
    });

    it('should render author when provided', async () => {
      const page = await newSpecPage({
        components: [AegovBlockquote],
        html: `<aegov-blockquote author="John Doe"></aegov-blockquote>`,
      });
      const component = page.rootInstance as AegovBlockquote;
      expect(component.author).toBe('John Doe');

      const author = page.root.querySelector('.quote-author');
      expect(author).toBeTruthy();
      expect(author.textContent).toBe('John Doe');
    });

    it('should render title when provided', async () => {
      const page = await newSpecPage({
        components: [AegovBlockquote],
        html: `<aegov-blockquote author-title="CEO, Company"></aegov-blockquote>`,
      });
      const component = page.rootInstance as AegovBlockquote;
      expect(component.authorTitle).toBe('CEO, Company');

      const title = page.root.querySelector('.quote-title');
      expect(title).toBeTruthy();
      expect(title.textContent).toBe('CEO, Company');
    });

    it('should render both author and title when provided', async () => {
      const page = await newSpecPage({
        components: [AegovBlockquote],
        html: `<aegov-blockquote author="John Doe" author-title="CEO, Company"></aegov-blockquote>`,
      });
      const component = page.rootInstance as AegovBlockquote;
      expect(component.author).toBe('John Doe');
      expect(component.authorTitle).toBe('CEO, Company');

      const footer = page.root.querySelector('.quote-footer');
      const author = page.root.querySelector('.quote-author');
      const title = page.root.querySelector('.quote-title');

      expect(footer).toBeTruthy();
      expect(author).toBeTruthy();
      expect(author.textContent).toBe('John Doe');
      expect(title).toBeTruthy();
      expect(title.textContent).toBe('CEO, Company');
    });

    it('should render only author when title not provided', async () => {
      const page = await newSpecPage({
        components: [AegovBlockquote],
        html: `<aegov-blockquote author="John Doe"></aegov-blockquote>`,
      });
      const author = page.root.querySelector('.quote-author');
      const title = page.root.querySelector('.quote-title');

      expect(author).toBeTruthy();
      expect(author.textContent).toBe('John Doe');
      expect(title).toBeNull();
    });

    it('should render only title when author not provided', async () => {
      const page = await newSpecPage({
        components: [AegovBlockquote],
        html: `<aegov-blockquote author-title="CEO, Company"></aegov-blockquote>`,
      });
      const author = page.root.querySelector('.quote-author');
      const title = page.root.querySelector('.quote-title');

      expect(author).toBeNull();
      expect(title).toBeTruthy();
      expect(title.textContent).toBe('CEO, Company');
    });
  });

  describe('complete blockquote', () => {
    it('should render complete blockquote with all attributes', async () => {
      const page = await newSpecPage({
        components: [AegovBlockquote],
        html: `
          <aegov-blockquote
            variant="colored"
            cite="https://example.com"
            author="Jane Smith"
            author-title="Product Manager">
            The best way to predict the future is to create it.
          </aegov-blockquote>
        `,
      });

      const component = page.rootInstance as AegovBlockquote;
      expect(component.variant).toBe('colored');
      expect(component.cite).toBe('https://example.com');
      expect(component.author).toBe('Jane Smith');
      expect(component.authorTitle).toBe('Product Manager');

      const blockquote = page.root.querySelector('blockquote');
      const author = page.root.querySelector('.quote-author');
      const title = page.root.querySelector('.quote-title');

      expect(blockquote.classList.contains('quote-colored')).toBe(true);
      expect(blockquote.getAttribute('cite')).toBe('https://example.com');
      expect(author.textContent).toBe('Jane Smith');
      expect(title.textContent).toBe('Product Manager');
      expect(page.root.textContent).toContain('The best way to predict the future is to create it.');
    });
  });

  describe('dynamic props', () => {
    it('should update when variant changes', async () => {
      const page = await newSpecPage({
        components: [AegovBlockquote],
        html: `<aegov-blockquote variant="primary"></aegov-blockquote>`,
      });

      let blockquote = page.root.querySelector('.aegov-quote');
      expect(blockquote.classList.contains('quote-colored')).toBe(false);

      page.root.setAttribute('variant', 'colored');
      await page.waitForChanges();

      blockquote = page.root.querySelector('.aegov-quote');
      expect(blockquote.classList.contains('quote-colored')).toBe(true);
    });

    it('should update when author changes', async () => {
      const page = await newSpecPage({
        components: [AegovBlockquote],
        html: `<aegov-blockquote></aegov-blockquote>`,
      });

      let author = page.root.querySelector('.quote-author');
      expect(author).toBeNull();

      page.root.setAttribute('author', 'New Author');
      await page.waitForChanges();

      author = page.root.querySelector('.quote-author');
      expect(author).toBeTruthy();
      expect(author.textContent).toBe('New Author');
    });
  });

  describe('blockquote element', () => {
    it('should render as blockquote element', async () => {
      const page = await newSpecPage({
        components: [AegovBlockquote],
        html: `<aegov-blockquote>Quote</aegov-blockquote>`,
      });

      const blockquote = page.root.querySelector('blockquote');
      expect(blockquote).toBeTruthy();
      expect(blockquote.tagName).toBe('BLOCKQUOTE');
    });

    it('should have aegov-quote class', async () => {
      const page = await newSpecPage({
        components: [AegovBlockquote],
        html: `<aegov-blockquote>Quote</aegov-blockquote>`,
      });

      const blockquote = page.root.querySelector('blockquote');
      expect(blockquote.classList.contains('aegov-quote')).toBe(true);
    });
  });
});
