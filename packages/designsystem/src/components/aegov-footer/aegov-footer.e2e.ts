import { newE2EPage } from '@stencil/core/testing';

const GROUP = `
  <div class="aegov-footer__group">
    <h2>The Ministry</h2>
    <ul role="list"><li><a href="/about">About the ministry</a></li></ul>
  </div>
`;

describe('aegov-footer (e2e)', () => {
  it('collapsible + mobile viewport (<640px): a trigger button is synthesized, starts open (first/only column), and toggles the panel', async () => {
    const page = await newE2EPage();
    await page.setViewport({ width: 500, height: 800 });
    await page.setContent(`<aegov-footer>${GROUP}</aegov-footer>`);
    await page.waitForChanges();

    const trigger = await page.find('aegov-footer .aegov-footer__group-trigger');
    const panel = await page.find('aegov-footer .aegov-footer__group-panel');
    expect(trigger.textContent.trim()).toBe('The Ministry');
    expect(await trigger.getAttribute('aria-expanded')).toBe('true');
    expect(await panel.getProperty('hidden')).toBe(false);

    await trigger.click();
    await page.waitForChanges();
    expect(await trigger.getAttribute('aria-expanded')).toBe('false');
    expect(await panel.getProperty('hidden')).toBe(true);
  });

  it('the interactive/static cutover is at `sm` (640px), not `lg` (1024px) — 700px already has no button', async () => {
    const page = await newE2EPage();
    await page.setViewport({ width: 700, height: 900 });
    await page.setContent(`<aegov-footer>${GROUP}</aegov-footer>`);
    await page.waitForChanges();

    const title = await page.find('aegov-footer .aegov-footer__group h2');
    const trigger = await page.find('aegov-footer .aegov-footer__group-trigger');
    const panel = await page.find('aegov-footer .aegov-footer__group-panel');
    expect(trigger).toBeNull();
    expect(title.textContent.trim()).toBe('The Ministry');
    expect(await panel.getProperty('hidden')).toBe(false);
  });

  it('grid is 2 columns at 700px, 4 columns at 1280px — the grid-column breakpoint is `lg`, independent of the `sm` interactive cutover', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-footer>
      ${GROUP}
      <div class="aegov-footer__group"><h2>Using the website</h2><ul role="list"><li><a href="/b">B</a></li></ul></div>
      <div class="aegov-footer__group"><h2>Information and support</h2><ul role="list"><li><a href="/c">C</a></li></ul></div>
      <div class="aegov-footer__group"><h2>References</h2><ul role="list"><li><a href="/d">D</a></li></ul></div>
    </aegov-footer>`);

    await page.setViewport({ width: 700, height: 900 });
    await page.waitForChanges();
    const nav = await page.find('aegov-footer .aegov-footer__nav');
    let cols = (await nav.getComputedStyle()).gridTemplateColumns as string;
    expect(cols.trim().split(/\s+/).length).toBe(2);

    await page.setViewport({ width: 1280, height: 900 });
    await page.waitForChanges();
    cols = (await nav.getComputedStyle()).gridTemplateColumns as string;
    expect(cols.trim().split(/\s+/).length).toBe(4);
  });

  it('main layout and Tawasul block go side-by-side at `sm`; the bottom bar stays stacked until `lg`', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-footer>${GROUP}</aegov-footer>`);

    await page.setViewport({ width: 700, height: 900 });
    await page.waitForChanges();
    const main = await page.find('aegov-footer .aegov-footer__main');
    const bottom = await page.find('aegov-footer .aegov-footer__bottom');
    expect((await main.getComputedStyle()).flexDirection).toBe('row');
    expect((await bottom.getComputedStyle()).flexDirection).toBe('column');

    await page.setViewport({ width: 1280, height: 900 });
    await page.waitForChanges();
    expect((await bottom.getComputedStyle()).flexDirection).toBe('row');
  });

  it('nav-variant="flat": no button on any viewport, panel always visible', async () => {
    const page = await newE2EPage();
    await page.setViewport({ width: 500, height: 800 });
    await page.setContent(`<aegov-footer nav-variant="flat">${GROUP}</aegov-footer>`);
    await page.waitForChanges();

    const trigger = await page.find('aegov-footer .aegov-footer__group-trigger');
    const panel = await page.find('aegov-footer .aegov-footer__group-panel');
    expect(trigger).toBeNull();
    expect(await panel.getProperty('hidden')).toBe(false);
  });

  it('resizing from mobile to `sm`+ unwraps the trigger back into plain title text', async () => {
    const page = await newE2EPage();
    await page.setViewport({ width: 500, height: 800 });
    await page.setContent(`<aegov-footer>${GROUP}</aegov-footer>`);
    await page.waitForChanges();

    expect(await page.find('aegov-footer .aegov-footer__group-trigger')).not.toBeNull();

    await page.setViewport({ width: 700, height: 900 });
    await page.waitForChanges();

    const title = await page.find('aegov-footer .aegov-footer__group h2');
    expect(await page.find('aegov-footer .aegov-footer__group-trigger')).toBeNull();
    expect(title.textContent.trim()).toBe('The Ministry');
  });

  it('renders the tel: and WhatsApp Tawasul links with accessible names', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-footer>${GROUP}</aegov-footer>`);
    const callLink = await page.find('aegov-footer a[href="tel:171"]');
    expect(callLink.textContent).toContain('171');
    const waLink = await page.find('aegov-footer a[href="https://wa.me/97147771777"]');
    expect(waLink.textContent).toContain('04-7771777');
  });
});
