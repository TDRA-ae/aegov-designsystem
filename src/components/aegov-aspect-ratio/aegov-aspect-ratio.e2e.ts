import { newE2EPage } from '@stencil/core/testing';

describe('aegov-aspect-ratio e2e', () => {
  it('renders inner container', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-aspect-ratio></aegov-aspect-ratio>`);
    const inner = await page.find('aegov-aspect-ratio .aegov-aspect-ratio');
    expect(inner).not.toBeNull();
  });

  it('applies square ratio', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-aspect-ratio ratio="square"></aegov-aspect-ratio>`);
    const style = await page.evaluate(() => {
      const el = document.querySelector('aegov-aspect-ratio .aegov-aspect-ratio') as HTMLElement;
      return el.style.aspectRatio;
    });
    expect(style).toBe('1 / 1');
  });

  it('applies custom ratio "4/3"', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-aspect-ratio ratio="4/3"></aegov-aspect-ratio>`);
    const style = await page.evaluate(() => {
      const el = document.querySelector('aegov-aspect-ratio .aegov-aspect-ratio') as HTMLElement;
      return el.style.aspectRatio;
    });
    expect(style).toBe('4 / 3');
  });

  it('reflects fit prop as data-fit attribute', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-aspect-ratio ratio="video" fit="contain"></aegov-aspect-ratio>`);
    const inner = await page.find('aegov-aspect-ratio .aegov-aspect-ratio');
    expect(inner.getAttribute('data-fit')).toBe('contain');
  });

  it('renders slotted image', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-aspect-ratio ratio="video">
        <img src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg'/>" alt="test"/>
      </aegov-aspect-ratio>
    `);
    const img = await page.find('aegov-aspect-ratio img');
    expect(img).not.toBeNull();
  });

  it('updates style when ratio changes at runtime', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-aspect-ratio ratio="square"></aegov-aspect-ratio>`);
    const host = await page.find('aegov-aspect-ratio');
    host.setProperty('ratio', 'video');
    await page.waitForChanges();
    const style = await page.evaluate(() => {
      const el = document.querySelector('aegov-aspect-ratio .aegov-aspect-ratio') as HTMLElement;
      return el.style.aspectRatio;
    });
    expect(style).toBe('16 / 9');
  });
});
