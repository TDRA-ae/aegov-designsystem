import { newE2EPage } from '@stencil/core/testing';

describe('aegov-navblock-item (e2e)', () => {
  it('renders link row with aria-current when isActive', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-navblock>
        <aegov-navblock-item href="/dash" is-active>Dashboard</aegov-navblock-item>
      </aegov-navblock>
    `);
    const a = await page.find('aegov-navblock-item a.aegov-navblock-item__row');
    expect(a).not.toBeNull();
    expect(a.getAttribute('aria-current')).toBe('page');
    expect(a.getAttribute('href')).toBe('/dash');
  });

  it('renders inline content (e.g. badge) inside the default slot', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-navblock>
        <aegov-navblock-item href="/inbox">
          Inbox
          <aegov-badge>3</aegov-badge>
        </aegov-navblock-item>
      </aegov-navblock>
    `);
    const badge = await page.find('aegov-navblock-item .aegov-navblock-item__label aegov-badge');
    expect(badge).not.toBeNull();
  });

  it('renders icon-start slot wrapper', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-navblock>
        <aegov-navblock-item href="/dash">
          <svg slot="icon-start" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6"/></svg>
          Dashboard
        </aegov-navblock-item>
      </aegov-navblock>
    `);
    const wrap = await page.find('aegov-navblock-item .aegov-navblock-item__icon');
    expect(wrap).not.toBeNull();
  });

  it('emits aegovNavblockItemToggle when toggling a parent row', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-navblock>
        <aegov-navblock-item id="p">
          Reports
          <aegov-navblock-item href="/x">X</aegov-navblock-item>
        </aegov-navblock-item>
      </aegov-navblock>
    `);
    const item = await page.find('aegov-navblock-item#p');
    const ev = await item.spyOnEvent('aegovNavblockItemToggle');
    const toggle = await page.find('aegov-navblock-item#p button.aegov-navblock-item__row');
    await toggle.click();
    await page.waitForChanges();
    expect(ev).toHaveReceivedEventDetail({ open: true });
  });

  it('Enter key on toggle row emits toggle', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-navblock>
        <aegov-navblock-item id="p">
          Reports
          <aegov-navblock-item href="/x">X</aegov-navblock-item>
        </aegov-navblock-item>
      </aegov-navblock>
    `);
    const toggle = await page.find('aegov-navblock-item#p button.aegov-navblock-item__row');
    await toggle.focus();
    await page.keyboard.press('Enter');
    await page.waitForChanges();
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
  });

  it('disabled item with no children renders span with aria-disabled', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-navblock>
        <aegov-navblock-item href="/x" is-disabled>Locked</aegov-navblock-item>
      </aegov-navblock>
    `);
    const span = await page.find('aegov-navblock-item span.aegov-navblock-item__row');
    expect(span).not.toBeNull();
    expect(span.getAttribute('aria-disabled')).toBe('true');
  });

  it('cascades icon prop into nested sub-items', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-navblock icon="plus">
        <aegov-navblock-item id="p">
          Reports
          <aegov-navblock-item id="c">
            Sub
            <aegov-navblock-item href="/leaf">Leaf</aegov-navblock-item>
          </aegov-navblock-item>
        </aegov-navblock-item>
      </aegov-navblock>
    `);
    const sub = await page.find('aegov-navblock-item#c button.aegov-navblock-item__row .aegov-navblock-item__chevron-plus');
    expect(sub).not.toBeNull();
  });

  describe('flat group header', () => {
    const flatHtml = `
      <aegov-navblock variant="flat">
        <aegov-navblock-item id="g1">
          Group one
          <aegov-navblock-item href="/a">A</aegov-navblock-item>
        </aegov-navblock-item>
        <aegov-navblock-item id="leaf" href="/b">B</aegov-navblock-item>
        <aegov-navblock-item id="g2">
          Group two
          <aegov-navblock-item href="/c">C</aegov-navblock-item>
        </aegov-navblock-item>
      </aegov-navblock>
    `;

    const headerStyle = (page: any, id: string) =>
      page.$eval(`#${id} > .aegov-navblock-item > .aegov-navblock-item__group-header`, (el: HTMLElement) => {
        const cs = getComputedStyle(el);
        return { bg: cs.backgroundColor, color: cs.color, marginTop: cs.marginTop };
      });

    it('has no hover background or hover text colour change', async () => {
      const page = await newE2EPage();
      await page.setContent(flatHtml);
      await page.waitForChanges();
      const before = await headerStyle(page, 'g2');
      await page.hover('#g2 .aegov-navblock-item__group-header');
      const after = await headerStyle(page, 'g2');
      expect(after.bg).toBe('rgba(0, 0, 0, 0)');
      expect(after.color).toBe(before.color);
    });

    it('interactive rows still get the hover background', async () => {
      const page = await newE2EPage();
      await page.setContent(flatHtml);
      await page.waitForChanges();
      await page.hover('#leaf a.aegov-navblock-item__row');
      const bg = await page.$eval('#leaf a.aegov-navblock-item__row', (el: HTMLElement) => getComputedStyle(el).backgroundColor);
      expect(bg).not.toBe('rgba(0, 0, 0, 0)');
    });

    it('gets 16px top margin after other items, none as the first item', async () => {
      const page = await newE2EPage();
      await page.setContent(flatHtml);
      await page.waitForChanges();
      expect((await headerStyle(page, 'g1')).marginTop).toBe('0px');
      expect((await headerStyle(page, 'g2')).marginTop).toBe('16px');
    });
  });

  it('forwards target/rel attributes onto the inner anchor', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-navblock>
        <aegov-navblock-item href="https://example.com" target="_blank" rel="noopener">External</aegov-navblock-item>
      </aegov-navblock>
    `);
    const a = await page.find('aegov-navblock-item a.aegov-navblock-item__row');
    expect(a.getAttribute('target')).toBe('_blank');
    expect(a.getAttribute('rel')).toBe('noopener');
  });
});
