import { newE2EPage } from '@stencil/core/testing';

describe('aegov-blockquote e2e', () => {
  it('renders a blockquote element', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-blockquote>Quote</aegov-blockquote>`);
    const bq = await page.find('aegov-blockquote blockquote');
    expect(bq).not.toBeNull();
    expect(bq.className).toContain('aegov-blockquote');
  });

  it('renders SVG icon for primary appearance', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-blockquote>Q</aegov-blockquote>`);
    const svg = await page.find('aegov-blockquote svg');
    expect(svg).not.toBeNull();
  });

  it('omits SVG and adds colored class for appearance="colored"', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-blockquote appearance="colored">Q</aegov-blockquote>`);
    const svg = await page.find('aegov-blockquote svg');
    expect(svg).toBeNull();
    const bq = await page.find('aegov-blockquote blockquote');
    expect(bq.className).toContain('blockquote--colored');
  });

  it('renders author and authorTitle in footer', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-blockquote author="Sheikh Zayed" author-title="Founder">Q</aegov-blockquote>`);
    const author = await page.find('aegov-blockquote .blockquote--author');
    const title = await page.find('aegov-blockquote .blockquote--title');
    expect(author.textContent).toContain('Sheikh Zayed');
    expect(title.textContent).toContain('Founder');
  });

  it('reflects cite attribute on the blockquote element', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-blockquote cite="https://example.com">Q</aegov-blockquote>`);
    const bq = await page.find('aegov-blockquote blockquote');
    expect(bq.getAttribute('cite')).toBe('https://example.com');
  });

  it('renders slot content', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-blockquote>The future belongs to those who prepare for it.</aegov-blockquote>`);
    const bq = await page.find('aegov-blockquote blockquote');
    expect(bq.textContent).toContain('The future belongs');
  });
});
