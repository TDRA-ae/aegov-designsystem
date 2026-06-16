import { newE2EPage } from '@stencil/core/testing';

describe('aegov-bento-grid (e2e)', () => {
  it('renders wrapper with grid class and role', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-bento-grid></aegov-bento-grid>');
    const wrap = await page.find('aegov-bento-grid div');
    expect(wrap).toHaveClass('aegov-bento-grid');
    expect(wrap.getAttribute('role')).toBe('group');
  });

  it('sets --bento-cols and --bento-gap CSS variables inline', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-bento-grid cols="3" gap="lg"></aegov-bento-grid>');
    await page.waitForChanges();
    const styleAttr = await page.$eval(
      'aegov-bento-grid div',
      (el: HTMLElement) => el.getAttribute('style') || '',
    );
    expect(styleAttr).toContain('--bento-cols: 3');
    expect(styleAttr).toContain('--bento-gap: 1.5rem');
  });

  it('uses display: grid via stylesheet', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-bento-grid cols="3">
        <aegov-card>A</aegov-card>
        <aegov-card>B</aegov-card>
      </aegov-bento-grid>
    `);
    await page.waitForChanges();
    const display = await page.$eval(
      'aegov-bento-grid div.aegov-bento-grid',
      (el: HTMLElement) => getComputedStyle(el).display,
    );
    expect(display).toBe('grid');
  });

  it('applies gridColumn span inline style on cards with data-col-span', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-bento-grid cols="4">
        <aegov-card data-col-span="2">A</aegov-card>
        <aegov-card>B</aegov-card>
      </aegov-bento-grid>
    `);
    await page.waitForChanges();
    const span = await page.$eval(
      'aegov-bento-grid aegov-card:first-child',
      (el: HTMLElement) => el.style.gridColumn,
    );
    expect(span).toContain('span 2');
  });

  it('clamps col-span when cols is 1 (mobile stacking)', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-bento-grid cols="1">
        <aegov-card data-col-span="3">A</aegov-card>
      </aegov-bento-grid>
    `);
    await page.waitForChanges();
    const span = await page.$eval(
      'aegov-bento-grid aegov-card',
      (el: HTMLElement) => el.style.gridColumn,
    );
    expect(span).toBe('');
  });

  it('passes through aria-label', async () => {
    const page = await newE2EPage();
    await page.setContent('<aegov-bento-grid aria-label="Feature tiles"></aegov-bento-grid>');
    const wrap = await page.find('aegov-bento-grid div');
    expect(wrap.getAttribute('aria-label')).toBe('Feature tiles');
  });

  it('updates spans when data-col-span attribute changes dynamically', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-bento-grid cols="4">
        <aegov-card>A</aegov-card>
      </aegov-bento-grid>
    `);
    await page.waitForChanges();

    await page.evaluate(() => {
      const card = document.querySelector('aegov-bento-grid aegov-card');
      card?.setAttribute('data-col-span', '3');
    });
    await page.waitForChanges();
    // Allow MutationObserver microtask to flush
    await new Promise(resolve => setTimeout(resolve, 50));

    const span = await page.$eval(
      'aegov-bento-grid aegov-card',
      (el: HTMLElement) => el.style.gridColumn,
    );
    expect(span).toContain('span 3');
  });
});
