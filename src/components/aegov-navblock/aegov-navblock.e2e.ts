import { newE2EPage } from '@stencil/core/testing';

describe('aegov-navblock (e2e)', () => {
  it('renders nav landmark with items', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-navblock>
        <aegov-navblock-item href="/">Home</aegov-navblock-item>
        <aegov-navblock-item href="/x">Other</aegov-navblock-item>
      </aegov-navblock>
    `);
    const nav = await page.find('aegov-navblock nav');
    expect(nav).not.toBeNull();
    expect(nav.getAttribute('aria-label')).toBe('Sidebar navigation');
    const items = await page.findAll('aegov-navblock aegov-navblock-item');
    expect(items.length).toBe(2);
  });

  it('clicking a parent toggle expands the sub-region', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-navblock>
        <aegov-navblock-item id="p">
          Reports
          <aegov-navblock-item href="/r/sales">Sales</aegov-navblock-item>
        </aegov-navblock-item>
      </aegov-navblock>
    `);
    const toggle = await page.find('aegov-navblock-item#p button.aegov-navblock-item__row');
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
    await toggle.click();
    await page.waitForChanges();
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    await toggle.click();
    await page.waitForChanges();
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
  });

  it('default single-open: opening a sibling closes the previous', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-navblock>
        <aegov-navblock-item id="g1">
          One
          <aegov-navblock-item href="/a">A</aegov-navblock-item>
        </aegov-navblock-item>
        <aegov-navblock-item id="g2">
          Two
          <aegov-navblock-item href="/b">B</aegov-navblock-item>
        </aegov-navblock-item>
      </aegov-navblock>
    `);
    const t1 = await page.find('aegov-navblock-item#g1 button.aegov-navblock-item__row');
    const t2 = await page.find('aegov-navblock-item#g2 button.aegov-navblock-item__row');
    await t1.click();
    await page.waitForChanges();
    expect(t1.getAttribute('aria-expanded')).toBe('true');
    await t2.click();
    await page.waitForChanges();
    expect(t1.getAttribute('aria-expanded')).toBe('false');
    expect(t2.getAttribute('aria-expanded')).toBe('true');
  });

  it('isMultiple keeps siblings open simultaneously', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-navblock is-multiple="true">
        <aegov-navblock-item id="g1">
          One
          <aegov-navblock-item href="/a">A</aegov-navblock-item>
        </aegov-navblock-item>
        <aegov-navblock-item id="g2">
          Two
          <aegov-navblock-item href="/b">B</aegov-navblock-item>
        </aegov-navblock-item>
      </aegov-navblock>
    `);
    const t1 = await page.find('aegov-navblock-item#g1 button.aegov-navblock-item__row');
    const t2 = await page.find('aegov-navblock-item#g2 button.aegov-navblock-item__row');
    await t1.click();
    await t2.click();
    await page.waitForChanges();
    expect(t1.getAttribute('aria-expanded')).toBe('true');
    expect(t2.getAttribute('aria-expanded')).toBe('true');
  });

  it('auto-expands ancestors of an active deep descendant on load', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-navblock>
        <aegov-navblock-item id="lvl1">
          L1
          <aegov-navblock-item id="lvl2">
            L2
            <aegov-navblock-item id="lvl3" href="/leaf" is-active>Leaf</aegov-navblock-item>
          </aegov-navblock-item>
        </aegov-navblock-item>
      </aegov-navblock>
    `);
    const t1 = await page.find('aegov-navblock-item#lvl1 button.aegov-navblock-item__row');
    const t2 = await page.find('aegov-navblock-item#lvl2 button.aegov-navblock-item__row');
    expect(t1.getAttribute('aria-expanded')).toBe('true');
    expect(t2.getAttribute('aria-expanded')).toBe('true');
  });

  it('ArrowDown/ArrowUp moves focus through visible rows', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-navblock>
        <aegov-navblock-item id="r1" href="/1">One</aegov-navblock-item>
        <aegov-navblock-item id="r2" href="/2">Two</aegov-navblock-item>
        <aegov-navblock-item id="r3" href="/3">Three</aegov-navblock-item>
      </aegov-navblock>
    `);
    const a1 = await page.find('aegov-navblock-item#r1 a');
    await a1.focus();
    await page.keyboard.press('ArrowDown');
    let focusedHref = await page.evaluate(() => (document.activeElement as HTMLAnchorElement).getAttribute('href'));
    expect(focusedHref).toBe('/2');
    await page.keyboard.press('ArrowDown');
    focusedHref = await page.evaluate(() => (document.activeElement as HTMLAnchorElement).getAttribute('href'));
    expect(focusedHref).toBe('/3');
    await page.keyboard.press('ArrowUp');
    focusedHref = await page.evaluate(() => (document.activeElement as HTMLAnchorElement).getAttribute('href'));
    expect(focusedHref).toBe('/2');
  });

  it('ArrowRight expands closed parent; ArrowLeft collapses open parent', async () => {
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
    await page.keyboard.press('ArrowRight');
    await page.waitForChanges();
    expect(toggle.getAttribute('aria-expanded')).toBe('true');
    await page.keyboard.press('ArrowLeft');
    await page.waitForChanges();
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
  });

  it('Home/End jump to first/last visible row', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-navblock>
        <aegov-navblock-item href="/1">One</aegov-navblock-item>
        <aegov-navblock-item href="/2">Two</aegov-navblock-item>
        <aegov-navblock-item href="/3">Three</aegov-navblock-item>
      </aegov-navblock>
    `);
    const a2 = await page.find('aegov-navblock-item:nth-of-type(2) a');
    await a2.focus();
    await page.keyboard.press('Home');
    let href = await page.evaluate(() => (document.activeElement as HTMLAnchorElement).getAttribute('href'));
    expect(href).toBe('/1');
    await page.keyboard.press('End');
    href = await page.evaluate(() => (document.activeElement as HTMLAnchorElement).getAttribute('href'));
    expect(href).toBe('/3');
  });

  it('renders block title from prop', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-navblock block-title="Workspace">
        <aegov-navblock-item href="/">Home</aegov-navblock-item>
      </aegov-navblock>
    `);
    const title = await page.find('aegov-navblock h2.aegov-navblock__title');
    expect(title.textContent.trim()).toBe('Workspace');
  });

  it('title slot overrides blockTitle prop', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-navblock block-title="Ignored">
        <span slot="title">Custom</span>
        <aegov-navblock-item href="/">Home</aegov-navblock-item>
      </aegov-navblock>
    `);
    const title = await page.find('aegov-navblock h2.aegov-navblock__title');
    expect(title.textContent.trim()).toBe('Custom');
  });

  it('isBordered toggles bordered class', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-navblock is-bordered="true">
        <aegov-navblock-item href="/">Home</aegov-navblock-item>
      </aegov-navblock>
    `);
    const nav = await page.find('aegov-navblock nav');
    expect(nav.className).toContain('aegov-navblock--bordered');
  });

  it('disabled item is not focused via arrow nav', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-navblock>
        <aegov-navblock-item href="/1">One</aegov-navblock-item>
        <aegov-navblock-item href="/2" is-disabled>Two</aegov-navblock-item>
        <aegov-navblock-item href="/3">Three</aegov-navblock-item>
      </aegov-navblock>
    `);
    const a1 = await page.find('aegov-navblock-item:nth-of-type(1) .aegov-navblock-item__row');
    await a1.focus();
    await page.keyboard.press('ArrowDown');
    const tag = await page.evaluate(() => document.activeElement.tagName.toLowerCase());
    const href = await page.evaluate(() => (document.activeElement as HTMLAnchorElement).getAttribute('href'));
    expect(tag).toBe('a');
    expect(href).toBe('/3');
  });
});
