import { newE2EPage } from '@stencil/core/testing';

describe('aegov-footer-highlights (e2e)', () => {
  it('the two-card grid is 1 column below `xl` (1280px) and 2 columns at `xl`+', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-footer-highlights entity-contact-number="800 8877"><p>Sign up</p></aegov-footer-highlights>`);

    await page.setViewport({ width: 1024, height: 900 });
    await page.waitForChanges();
    const grid = await page.find('aegov-footer-highlights .aegov-footer-highlights__grid');
    let cols = (await grid.getComputedStyle()).gridTemplateColumns as string;
    expect(cols.trim().split(/\s+/).length).toBe(1);

    await page.setViewport({ width: 1400, height: 900 });
    await page.waitForChanges();
    cols = (await grid.getComputedStyle()).gridTemplateColumns as string;
    expect(cols.trim().split(/\s+/).length).toBe(2);
  });

  it('renders the tel: and WhatsApp links with accessible names', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-footer-highlights></aegov-footer-highlights>`);
    await page.waitForChanges();

    const callLink = await page.find('aegov-footer-highlights a[href="tel:171"]');
    expect(callLink.textContent).toContain('171');
    const waLink = await page.find('aegov-footer-highlights a[href="https://wa.me/97147771777"]');
    expect(waLink.textContent).toContain('04-7771777');
  });
});
