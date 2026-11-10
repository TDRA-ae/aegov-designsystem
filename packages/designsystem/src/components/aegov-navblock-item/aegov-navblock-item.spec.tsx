import { newSpecPage } from '@stencil/core/testing';
import { AegovNavblock } from '../aegov-navblock/aegov-navblock';
import { AegovNavblockItem } from './aegov-navblock-item';

describe('aegov-navblock-item', () => {
  it('renders <a> when href is set and item has no children', async () => {
    const page = await newSpecPage({
      components: [AegovNavblock, AegovNavblockItem],
      html: `<aegov-navblock>
        <aegov-navblock-item href="/dash">Dashboard</aegov-navblock-item>
      </aegov-navblock>`,
    });
    const a = page.root.querySelector('aegov-navblock-item a.aegov-navblock-item__row');
    expect(a).not.toBeNull();
    expect(a.getAttribute('href')).toBe('/dash');
  });

  it('renders plain button when no href and no children', async () => {
    const page = await newSpecPage({
      components: [AegovNavblock, AegovNavblockItem],
      html: `<aegov-navblock>
        <aegov-navblock-item>Settings</aegov-navblock-item>
      </aegov-navblock>`,
    });
    const btn = page.root.querySelector('aegov-navblock-item button.aegov-navblock-item__row');
    expect(btn).not.toBeNull();
    expect(btn.getAttribute('aria-expanded')).toBeNull();
  });

  it('renders toggle button with aria-expanded when item has subnav children', async () => {
    const page = await newSpecPage({
      components: [AegovNavblock, AegovNavblockItem],
      html: `<aegov-navblock>
        <aegov-navblock-item id="parent">
          Reports
          <aegov-navblock-item href="/x">X</aegov-navblock-item>
        </aegov-navblock-item>
      </aegov-navblock>`,
    });
    const toggle = page.root.querySelector('aegov-navblock-item#parent button.aegov-navblock-item__row');
    expect(toggle).not.toBeNull();
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
  });

  it('auto-promotes nested aegov-navblock-item to slot="subnav"', async () => {
    const page = await newSpecPage({
      components: [AegovNavblock, AegovNavblockItem],
      html: `<aegov-navblock>
        <aegov-navblock-item id="parent">
          Reports
          <aegov-navblock-item id="child" href="/x">X</aegov-navblock-item>
        </aegov-navblock-item>
      </aegov-navblock>`,
    });
    const child = page.root.querySelector('#child');
    expect(child.getAttribute('slot')).toBe('subnav');
  });

  it('sets aria-current="page" on link when isActive', async () => {
    const page = await newSpecPage({
      components: [AegovNavblock, AegovNavblockItem],
      html: `<aegov-navblock>
        <aegov-navblock-item href="/dash" is-active>Dashboard</aegov-navblock-item>
      </aegov-navblock>`,
    });
    const a = page.root.querySelector('aegov-navblock-item a.aegov-navblock-item__row');
    expect(a.getAttribute('aria-current')).toBe('page');
    const item = page.root.querySelector('aegov-navblock-item .aegov-navblock-item');
    expect(item.className).toContain('is-active');
  });

  it('renders disabled span with aria-disabled when isDisabled and no children', async () => {
    const page = await newSpecPage({
      components: [AegovNavblock, AegovNavblockItem],
      html: `<aegov-navblock>
        <aegov-navblock-item href="/x" is-disabled>Locked</aegov-navblock-item>
      </aegov-navblock>`,
    });
    const span = page.root.querySelector('aegov-navblock-item span.aegov-navblock-item__row');
    expect(span).not.toBeNull();
    expect(span.getAttribute('aria-disabled')).toBe('true');
  });

  it('emits aegovNavblockItemToggle on click of toggle row', async () => {
    const page = await newSpecPage({
      components: [AegovNavblock, AegovNavblockItem],
      html: `<aegov-navblock>
        <aegov-navblock-item id="p">
          Reports
          <aegov-navblock-item href="/x">X</aegov-navblock-item>
        </aegov-navblock-item>
      </aegov-navblock>`,
    });
    const events: any[] = [];
    page.root.addEventListener('aegovNavblockItemToggle', (e: any) => events.push(e.detail));
    const toggle = page.root.querySelector('aegov-navblock-item#p button.aegov-navblock-item__row') as HTMLButtonElement;
    toggle.click();
    await page.waitForChanges();
    expect(events.length).toBeGreaterThan(0);
    expect(events[0]).toEqual({ open: true });
  });

  it('renders chevron icon when icon=chevron', async () => {
    const page = await newSpecPage({
      components: [AegovNavblock, AegovNavblockItem],
      html: `<aegov-navblock icon="chevron">
        <aegov-navblock-item id="p">
          Reports
          <aegov-navblock-item href="/x">X</aegov-navblock-item>
        </aegov-navblock-item>
      </aegov-navblock>`,
    });
    expect(page.root.querySelector('#p .aegov-navblock-item__chevron-chevron')).not.toBeNull();
  });

  it('renders plus icon when icon=plus', async () => {
    const page = await newSpecPage({
      components: [AegovNavblock, AegovNavblockItem],
      html: `<aegov-navblock icon="plus">
        <aegov-navblock-item id="p">
          Reports
          <aegov-navblock-item href="/x">X</aegov-navblock-item>
        </aegov-navblock-item>
      </aegov-navblock>`,
    });
    expect(page.root.querySelector('#p .aegov-navblock-item__chevron-plus')).not.toBeNull();
  });

  it('renders icon-start slot wrapper when slot has content', async () => {
    const page = await newSpecPage({
      components: [AegovNavblock, AegovNavblockItem],
      html: `<aegov-navblock>
        <aegov-navblock-item href="/dash">
          <svg slot="icon-start"></svg>
          Dashboard
        </aegov-navblock-item>
      </aegov-navblock>`,
    });
    expect(page.root.querySelector('aegov-navblock-item .aegov-navblock-item__icon')).not.toBeNull();
  });

  it('applies size modifier class', async () => {
    const page = await newSpecPage({
      components: [AegovNavblock, AegovNavblockItem],
      html: `<aegov-navblock size="sm">
        <aegov-navblock-item href="/">A</aegov-navblock-item>
      </aegov-navblock>`,
    });
    const item = page.root.querySelector('aegov-navblock-item .aegov-navblock-item');
    expect(item.className).toContain('navblock-item--sm');
  });
});
