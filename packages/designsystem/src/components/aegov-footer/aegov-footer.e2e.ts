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

  it('columns grid is 2-up at 700px, 4-up at 1280px — brand column + nav groups share one flat grid', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-footer>
      <span slot="brand">Example Entity</span>
      ${GROUP}
      <div class="aegov-footer__group"><h2>Using the website</h2><ul role="list"><li><a href="/b">B</a></li></ul></div>
      <div class="aegov-footer__group"><h2>Information and support</h2><ul role="list"><li><a href="/c">C</a></li></ul></div>
    </aegov-footer>`);

    await page.setViewport({ width: 700, height: 900 });
    await page.waitForChanges();
    const columns = await page.find('aegov-footer .aegov-footer__columns');
    let cols = (await columns.getComputedStyle()).gridTemplateColumns as string;
    expect(cols.trim().split(/\s+/).length).toBe(2);

    await page.setViewport({ width: 1280, height: 900 });
    await page.waitForChanges();
    cols = (await columns.getComputedStyle()).gridTemplateColumns as string;
    expect(cols.trim().split(/\s+/).length).toBe(4);
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

  it('embeds aegov-footer-highlights above the columns and forwards entity-contact-* props to it', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-footer entity-contact-number="800 8877" entity-email="info@example.gov.ae">${GROUP}</aegov-footer>`);
    await page.waitForChanges();

    const highlights = await page.find('aegov-footer aegov-footer-highlights');
    expect(highlights).not.toBeNull();
    const contactLink = await page.find('aegov-footer aegov-footer-highlights a[href="tel:8008877"]');
    expect(contactLink.textContent).toContain('800 8877');
    const emailLink = await page.find('aegov-footer aegov-footer-highlights a[href="mailto:info@example.gov.ae"]');
    expect(emailLink.textContent).toContain('info@example.gov.ae');
  });
});
