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

    it('should render a blockquote element', async () => {
      const page = await newSpecPage({
        components: [AegovBlockquote],
        html: `<aegov-blockquote>Quote</aegov-blockquote>`,
      });
      const blockquote = page.root.querySelector('blockquote');
      expect(blockquote).toBeTruthy();
      expect(blockquote.tagName).toBe('BLOCKQUOTE');
    });

    it('should render slot content', async () => {
      const page = await newSpecPage({
        components: [AegovBlockquote],
        html: `<aegov-blockquote>This is a quote</aegov-blockquote>`,
      });
      expect(page.root.textContent).toContain('This is a quote');
    });

    it('should have aegov-blockquote class', async () => {
      const page = await newSpecPage({
        components: [AegovBlockquote],
        html: `<aegov-blockquote>Quote</aegov-blockquote>`,
      });
      const blockquote = page.root.querySelector('blockquote');
      expect(blockquote.classList.contains('aegov-blockquote')).toBe(true);
    });
  });

  describe('default props', () => {
    it('defaults variant to primary', async () => {
      const page = await newSpecPage({
        components: [AegovBlockquote],
        html: `<aegov-blockquote></aegov-blockquote>`,
      });
      expect(page.rootInstance.variant).toBe('primary');
    });

    it('defaults cite to undefined', async () => {
      const page = await newSpecPage({
        components: [AegovBlockquote],
        html: `<aegov-blockquote></aegov-blockquote>`,
      });
      expect(page.rootInstance.cite).toBeUndefined();
    });

    it('defaults author to undefined', async () => {
      const page = await newSpecPage({
        components: [AegovBlockquote],
        html: `<aegov-blockquote></aegov-blockquote>`,
      });
      expect(page.rootInstance.author).toBeUndefined();
    });

    it('defaults authorTitle to undefined', async () => {
      const page = await newSpecPage({
        components: [AegovBlockquote],
        html: `<aegov-blockquote></aegov-blockquote>`,
      });
      expect(page.rootInstance.authorTitle).toBeUndefined();
    });
  });

  describe('variants', () => {
    it('should render primary variant (default)', async () => {
      const page = await newSpecPage({
        components: [AegovBlockquote],
        html: `<aegov-blockquote variant="primary"></aegov-blockquote>`,
      });
      const blockquote = page.root.querySelector('.aegov-blockquote');
      expect(blockquote.classList.contains('quote-colored')).toBe(false);
    });

    it('should render quote icon for primary variant', async () => {
      const page = await newSpecPage({
        components: [AegovBlockquote],
        html: `<aegov-blockquote variant="primary"></aegov-blockquote>`,
      });
      const svg = page.root.querySelector('svg');
      expect(svg).toBeTruthy();
    });

    it('should render colored variant', async () => {
      const page = await newSpecPage({
        components: [AegovBlockquote],
        html: `<aegov-blockquote variant="colored"></aegov-blockquote>`,
      });
      expect(page.rootInstance.variant).toBe('colored');
      const blockquote = page.root.querySelector('.aegov-blockquote');
      expect(blockquote.classList.contains('quote-colored')).toBe(true);
    });

    it('should not render quote icon for colored variant', async () => {
      const page = await newSpecPage({
        components: [AegovBlockquote],
        html: `<aegov-blockquote variant="colored"></aegov-blockquote>`,
      });
      const svg = page.root.querySelector('svg');
      expect(svg).toBeNull();
    });

    it('should render coloured variant (alternative spelling)', async () => {
      const page = await newSpecPage({
        components: [AegovBlockquote],
        html: `<aegov-blockquote variant="coloured"></aegov-blockquote>`,
      });
      expect(page.rootInstance.variant).toBe('coloured');
      const blockquote = page.root.querySelector('.aegov-blockquote');
      expect(blockquote.classList.contains('quote-colored')).toBe(true);
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

  describe('cite attribute', () => {
    it('should render cite attribute when provided', async () => {
      const page = await newSpecPage({
        components: [AegovBlockquote],
        html: `<aegov-blockquote cite="https://example.com"></aegov-blockquote>`,
      });
      expect(page.rootInstance.cite).toBe('https://example.com');
      const blockquote = page.root.querySelector('blockquote');
      expect(blockquote.getAttribute('cite')).toBe('https://example.com');
    });

    it('should not have cite attribute when not provided', async () => {
      const page = await newSpecPage({
        components: [AegovBlockquote],
        html: `<aegov-blockquote></aegov-blockquote>`,
      });
      const blockquote = page.root.querySelector('blockquote');
      expect(blockquote.hasAttribute('cite')).toBe(false);
    });
  });

  describe('author and authorTitle', () => {
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
      const author = page.root.querySelector('.quote-author');
      expect(author).toBeTruthy();
      expect(author.textContent).toBe('John Doe');
    });

    it('should render authorTitle when provided', async () => {
      const page = await newSpecPage({
        components: [AegovBlockquote],
        html: `<aegov-blockquote author-title="CEO, Company"></aegov-blockquote>`,
      });
      const title = page.root.querySelector('.quote-title');
      expect(title).toBeTruthy();
      expect(title.textContent).toBe('CEO, Company');
    });

    it('should render both author and authorTitle', async () => {
      const page = await newSpecPage({
        components: [AegovBlockquote],
        html: `<aegov-blockquote author="John Doe" author-title="CEO, Company"></aegov-blockquote>`,
      });
      const footer = page.root.querySelector('.quote-footer');
      expect(footer).toBeTruthy();
      const author = page.root.querySelector('.quote-author');
      expect(author.textContent).toBe('John Doe');
      const title = page.root.querySelector('.quote-title');
      expect(title.textContent).toBe('CEO, Company');
    });

    it('should render only author when title not provided', async () => {
      const page = await newSpecPage({
        components: [AegovBlockquote],
        html: `<aegov-blockquote author="John Doe"></aegov-blockquote>`,
      });
      expect(page.root.querySelector('.quote-author')).toBeTruthy();
      expect(page.root.querySelector('.quote-title')).toBeNull();
    });

    it('should render only title when author not provided', async () => {
      const page = await newSpecPage({
        components: [AegovBlockquote],
        html: `<aegov-blockquote author-title="CEO, Company"></aegov-blockquote>`,
      });
      expect(page.root.querySelector('.quote-author')).toBeNull();
      expect(page.root.querySelector('.quote-title')).toBeTruthy();
    });
  });

  describe('combined props', () => {
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

      expect(page.rootInstance.variant).toBe('colored');
      expect(page.rootInstance.cite).toBe('https://example.com');
      expect(page.rootInstance.author).toBe('Jane Smith');
      expect(page.rootInstance.authorTitle).toBe('Product Manager');

      const blockquote = page.root.querySelector('blockquote');
      expect(blockquote.classList.contains('quote-colored')).toBe(true);
      expect(blockquote.getAttribute('cite')).toBe('https://example.com');
      expect(page.root.querySelector('.quote-author').textContent).toBe('Jane Smith');
      expect(page.root.querySelector('.quote-title').textContent).toBe('Product Manager');
      expect(page.root.textContent).toContain('The best way to predict the future is to create it.');
    });
  });

  describe('dynamic props', () => {
    it('should update when variant changes', async () => {
      const page = await newSpecPage({
        components: [AegovBlockquote],
        html: `<aegov-blockquote variant="primary"></aegov-blockquote>`,
      });

      let blockquote = page.root.querySelector('.aegov-blockquote');
      expect(blockquote.classList.contains('quote-colored')).toBe(false);

      page.root.setAttribute('variant', 'colored');
      await page.waitForChanges();

      blockquote = page.root.querySelector('.aegov-blockquote');
      expect(blockquote.classList.contains('quote-colored')).toBe(true);
    });

    it('should update when author changes', async () => {
      const page = await newSpecPage({
        components: [AegovBlockquote],
        html: `<aegov-blockquote></aegov-blockquote>`,
      });

      expect(page.root.querySelector('.quote-author')).toBeNull();

      page.root.setAttribute('author', 'New Author');
      await page.waitForChanges();

      const author = page.root.querySelector('.quote-author');
      expect(author).toBeTruthy();
      expect(author.textContent).toBe('New Author');
    });
  });
});
