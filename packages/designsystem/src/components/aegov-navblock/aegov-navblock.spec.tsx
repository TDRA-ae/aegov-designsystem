import { newSpecPage } from '@stencil/core/testing';
import { AegovNavblock } from './aegov-navblock';
import { AegovNavblockItem } from '../aegov-navblock-item/aegov-navblock-item';

describe('aegov-navblock', () => {
  it('renders nav landmark with default labelNav and base size class', async () => {
    const page = await newSpecPage({
      components: [AegovNavblock, AegovNavblockItem],
      html: `<aegov-navblock>
        <aegov-navblock-item href="/">Home</aegov-navblock-item>
      </aegov-navblock>`,
    });
    const nav = page.root.querySelector('nav');
    expect(nav).not.toBeNull();
    expect(nav.getAttribute('aria-label')).toBe('Sidebar navigation');
    expect(nav.className).toContain('aegov-navblock');
    expect(nav.className).toContain('navblock--base');
  });

  it('honors custom labelNav', async () => {
    const page = await newSpecPage({
      components: [AegovNavblock, AegovNavblockItem],
      html: `<aegov-navblock label-nav="Project sidebar">
        <aegov-navblock-item href="/">A</aegov-navblock-item>
      </aegov-navblock>`,
    });
    expect(page.root.querySelector('nav').getAttribute('aria-label')).toBe('Project sidebar');
  });

  it('renders blockTitle prop as <h2>', async () => {
    const page = await newSpecPage({
      components: [AegovNavblock, AegovNavblockItem],
      html: `<aegov-navblock block-title="Workspace">
        <aegov-navblock-item href="/">A</aegov-navblock-item>
      </aegov-navblock>`,
    });
    const title = page.root.querySelector('h2.aegov-navblock__title');
    expect(title).not.toBeNull();
    expect(title.textContent).toBe('Workspace');
  });

  it('title slot overrides blockTitle', async () => {
    const page = await newSpecPage({
      components: [AegovNavblock, AegovNavblockItem],
      html: `<aegov-navblock block-title="Ignored">
        <span slot="title">Custom</span>
        <aegov-navblock-item href="/">A</aegov-navblock-item>
      </aegov-navblock>`,
    });
    const title = page.root.querySelector('h2.aegov-navblock__title');
    expect(title).not.toBeNull();
    expect(title.textContent.trim()).toBe('Custom');
  });

  it('toggles bordered class via isBordered', async () => {
    const page = await newSpecPage({
      components: [AegovNavblock, AegovNavblockItem],
      html: `<aegov-navblock is-bordered="true">
        <aegov-navblock-item href="/">A</aegov-navblock-item>
      </aegov-navblock>`,
    });
    expect(page.root.querySelector('nav').className).toContain('aegov-navblock--bordered');
  });

  it('cascades resolved size to descendant items', async () => {
    const page = await newSpecPage({
      components: [AegovNavblock, AegovNavblockItem],
      html: `<aegov-navblock size="lg">
        <aegov-navblock-item href="/">A</aegov-navblock-item>
        <aegov-navblock-item href="/b">B</aegov-navblock-item>
      </aegov-navblock>`,
    });
    const items = page.root.querySelectorAll('aegov-navblock-item');
    expect((items[0] as any).size).toBe('lg');
    expect((items[1] as any).size).toBe('lg');
  });

  it('cascades icon prop to descendant items', async () => {
    const page = await newSpecPage({
      components: [AegovNavblock, AegovNavblockItem],
      html: `<aegov-navblock icon="plus">
        <aegov-navblock-item>
          Group
          <aegov-navblock-item href="/x">X</aegov-navblock-item>
        </aegov-navblock-item>
      </aegov-navblock>`,
    });
    const items = page.root.querySelectorAll('aegov-navblock-item');
    items.forEach(it => expect((it as any).icon).toBe('plus'));
  });

  it('auto-expands ancestor items when a descendant is active', async () => {
    const page = await newSpecPage({
      components: [AegovNavblock, AegovNavblockItem],
      html: `<aegov-navblock>
        <aegov-navblock-item id="lvl1">
          Reports
          <aegov-navblock-item id="lvl2">
            Sales
            <aegov-navblock-item id="lvl3" href="/r/sales/q1" is-active>Q1</aegov-navblock-item>
          </aegov-navblock-item>
        </aegov-navblock-item>
      </aegov-navblock>`,
    });
    const lvl1 = page.root.querySelector('#lvl1') as any;
    const lvl2 = page.root.querySelector('#lvl2') as any;
    const lvl3 = page.root.querySelector('#lvl3') as any;
    expect(lvl1.isOpen).toBe(true);
    expect(lvl2.isOpen).toBe(true);
    expect(lvl3.isOpen).toBe(false);
  });

  it('default single-open: opening one closes its sibling', async () => {
    const page = await newSpecPage({
      components: [AegovNavblock, AegovNavblockItem],
      html: `<aegov-navblock>
        <aegov-navblock-item id="g1">
          One
          <aegov-navblock-item href="/a">A</aegov-navblock-item>
        </aegov-navblock-item>
        <aegov-navblock-item id="g2">
          Two
          <aegov-navblock-item href="/b">B</aegov-navblock-item>
        </aegov-navblock-item>
      </aegov-navblock>`,
    });
    const g1 = page.root.querySelector('#g1') as any;
    const g2 = page.root.querySelector('#g2') as any;
    const btn1 = g1.querySelector('button.aegov-navblock-item__row') as HTMLButtonElement;
    const btn2 = g2.querySelector('button.aegov-navblock-item__row') as HTMLButtonElement;
    btn1.click();
    await page.waitForChanges();
    expect(g1.isOpen).toBe(true);
    btn2.click();
    await page.waitForChanges();
    expect(g1.isOpen).toBe(false);
    expect(g2.isOpen).toBe(true);
  });

  it('isMultiple keeps siblings open simultaneously', async () => {
    const page = await newSpecPage({
      components: [AegovNavblock, AegovNavblockItem],
      html: `<aegov-navblock is-multiple="true">
        <aegov-navblock-item id="g1">
          One
          <aegov-navblock-item href="/a">A</aegov-navblock-item>
        </aegov-navblock-item>
        <aegov-navblock-item id="g2">
          Two
          <aegov-navblock-item href="/b">B</aegov-navblock-item>
        </aegov-navblock-item>
      </aegov-navblock>`,
    });
    const g1 = page.root.querySelector('#g1') as any;
    const g2 = page.root.querySelector('#g2') as any;
    const btn1 = g1.querySelector('button.aegov-navblock-item__row') as HTMLButtonElement;
    const btn2 = g2.querySelector('button.aegov-navblock-item__row') as HTMLButtonElement;
    btn1.click();
    btn2.click();
    await page.waitForChanges();
    expect(g1.isOpen).toBe(true);
    expect(g2.isOpen).toBe(true);
  });

  it('auto-generates fieldId when omitted', async () => {
    const page = await newSpecPage({
      components: [AegovNavblock, AegovNavblockItem],
      html: `<aegov-navblock>
        <aegov-navblock-item href="/">A</aegov-navblock-item>
      </aegov-navblock>`,
    });
    const id = page.root.querySelector('nav').getAttribute('id');
    expect(id).toMatch(/^aegov-navblock-/);
  });

  it('renders role="list" containers whose direct children are role="listitem" item hosts, nested too', async () => {
    const page = await newSpecPage({
      components: [AegovNavblock, AegovNavblockItem],
      html: `<aegov-navblock>
        <aegov-navblock-item href="/a">A</aegov-navblock-item>
        <aegov-navblock-item>Group
          <aegov-navblock-item href="/b">B</aegov-navblock-item>
          <aegov-navblock-item href="/c">C</aegov-navblock-item>
        </aegov-navblock-item>
      </aegov-navblock>`,
    });
    // A <ul>/<li> pair would be split by the custom-element host (A-01).
    expect(page.root.querySelector('ul, ol, li')).toBeNull();
    const lists = Array.from(page.root.querySelectorAll('[role="list"]'));
    expect(lists.length).toBe(2);
    const counts = lists.map(list => {
      const items = Array.from(list.children).filter(c => c.tagName === 'AEGOV-NAVBLOCK-ITEM');
      items.forEach(item => expect(item.getAttribute('role')).toBe('listitem'));
      return items.length;
    });
    expect(counts).toEqual([2, 2]);
  });
});
