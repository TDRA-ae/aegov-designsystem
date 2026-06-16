import { newSpecPage } from '@stencil/core/testing';
import { AegovBlockquote } from './aegov-blockquote';

describe('aegov-blockquote', () => {
  it('renders a <blockquote> element', async () => {
    const page = await newSpecPage({
      components: [AegovBlockquote],
      html: `<aegov-blockquote>Quote</aegov-blockquote>`,
    });
    const bq = page.root.querySelector('blockquote');
    expect(bq).toBeTruthy();
    expect(bq.classList.contains('aegov-blockquote')).toBe(true);
  });

  it('default appearance "primary" renders SVG icon', async () => {
    const page = await newSpecPage({
      components: [AegovBlockquote],
      html: `<aegov-blockquote>Q</aegov-blockquote>`,
    });
    expect(page.root.querySelector('svg')).toBeTruthy();
  });

  it('appearance="colored" omits SVG icon and adds colored class', async () => {
    const page = await newSpecPage({
      components: [AegovBlockquote],
      html: `<aegov-blockquote appearance="colored">Q</aegov-blockquote>`,
    });
    expect(page.root.querySelector('svg')).toBeNull();
    expect(page.root.querySelector('blockquote').classList.contains('blockquote--colored')).toBe(true);
  });

  it('appearance="coloured" alias also yields colored layout', async () => {
    const page = await newSpecPage({
      components: [AegovBlockquote],
      html: `<aegov-blockquote appearance="coloured">Q</aegov-blockquote>`,
    });
    expect(page.root.querySelector('blockquote').classList.contains('blockquote--colored')).toBe(true);
    expect(page.root.querySelector('svg')).toBeNull();
  });

  it('reflects cite attribute on the blockquote', async () => {
    const page = await newSpecPage({
      components: [AegovBlockquote],
      html: `<aegov-blockquote cite="https://example.com">Q</aegov-blockquote>`,
    });
    expect(page.root.querySelector('blockquote').getAttribute('cite')).toBe('https://example.com');
  });

  it('renders author when provided', async () => {
    const page = await newSpecPage({
      components: [AegovBlockquote],
      html: `<aegov-blockquote author="Sheikh Zayed">Q</aegov-blockquote>`,
    });
    const author = page.root.querySelector('.blockquote--author');
    expect(author).toBeTruthy();
    expect(author.textContent).toContain('Sheikh Zayed');
  });

  it('renders authorTitle when provided', async () => {
    const page = await newSpecPage({
      components: [AegovBlockquote],
      html: `<aegov-blockquote author-title="Founder">Q</aegov-blockquote>`,
    });
    const t = page.root.querySelector('.blockquote--title');
    expect(t).toBeTruthy();
    expect(t.textContent).toContain('Founder');
  });

  it('does not render footer block when neither author nor authorTitle is set', async () => {
    const page = await newSpecPage({
      components: [AegovBlockquote],
      html: `<aegov-blockquote>Q</aegov-blockquote>`,
    });
    expect(page.root.querySelector('.blockquote__footer')).toBeNull();
  });

  it('appends extraClass on the blockquote element', async () => {
    const page = await newSpecPage({
      components: [AegovBlockquote],
      html: `<aegov-blockquote extra-class="my-extra">Q</aegov-blockquote>`,
    });
    expect(page.root.querySelector('blockquote').classList.contains('my-extra')).toBe(true);
  });

  it('renders default slot content', async () => {
    const page = await newSpecPage({
      components: [AegovBlockquote],
      html: `<aegov-blockquote>Inspirational text</aegov-blockquote>`,
    });
    expect(page.root.textContent).toContain('Inspirational text');
  });
});
