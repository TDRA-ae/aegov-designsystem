import { newE2EPage } from '@stencil/core/testing';

describe('aegov-blockquote e2e', () => {
  it('renders a blockquote element', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-blockquote>Quote</aegov-blockquote>`);
    const bq = await page.find('aegov-blockquote >>> blockquote');
    expect(bq).not.toBeNull();
    expect(bq.className).toContain('aegov-blockquote');
  });

  it('renders SVG icon for primary appearance', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-blockquote>Q</aegov-blockquote>`);
    const svg = await page.find('aegov-blockquote >>> svg');
    expect(svg).not.toBeNull();
  });

  it('omits SVG and adds colored class for appearance="colored"', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-blockquote appearance="colored">Q</aegov-blockquote>`);
    const svg = await page.find('aegov-blockquote >>> svg');
    expect(svg).toBeNull();
    const bq = await page.find('aegov-blockquote >>> blockquote');
    expect(bq.className).toContain('blockquote--colored');
  });

  it('renders author and authorTitle in footer', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-blockquote author="Sheikh Zayed" author-title="Founder">Q</aegov-blockquote>`);
    const author = await page.find('aegov-blockquote >>> .blockquote--author');
    const title = await page.find('aegov-blockquote >>> .blockquote--title');
    expect(author.textContent).toContain('Sheikh Zayed');
    expect(title.textContent).toContain('Founder');
  });

  it('reflects cite attribute on the blockquote element', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-blockquote cite="https://example.com">Q</aegov-blockquote>`);
    const bq = await page.find('aegov-blockquote >>> blockquote');
    expect(bq.getAttribute('cite')).toBe('https://example.com');
  });

  it('renders slot content', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-blockquote>The future belongs to those who prepare for it.</aegov-blockquote>`);
    // Slotted content lives in the host's light DOM, not inside the shadow-root
    // `<blockquote>` wrapper — query the host itself, not `>>> blockquote`.
    const bq = await page.find('aegov-blockquote');
    expect(bq.textContent).toContain('The future belongs');
  });

  it('does not flip the icon in LTR', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-blockquote>Q</aegov-blockquote>`);
    const styles = await page.evaluate(() => {
      const svg = document.querySelector('aegov-blockquote').shadowRoot.querySelector('svg');
      const cs = getComputedStyle(svg);
      return { scale: cs.scale, transform: cs.transform };
    });
    expect(styles.scale).toBe('none');
    expect(styles.transform).toBe('none');
  });

  it('flips the icon exactly once under dir="rtl" (regression test for issue #8 — two cancelling flip mechanisms)', async () => {
    const page = await newE2EPage();
    await page.setContent(`<div dir="rtl"><aegov-blockquote>Q</aegov-blockquote></div>`);
    const styles = await page.evaluate(() => {
      const svg = document.querySelector('aegov-blockquote').shadowRoot.querySelector('svg');
      const cs = getComputedStyle(svg);
      return { scale: cs.scale, transform: cs.transform };
    });
    // Exactly one flip mechanism should be active (the Tailwind `scale` utility);
    // `transform` must stay 'none' — if both apply again, they cancel to no net flip.
    expect(styles.scale).toBe('-1 1');
    expect(styles.transform).toBe('none');
  });
});
