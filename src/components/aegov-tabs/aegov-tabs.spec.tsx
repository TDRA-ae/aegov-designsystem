import { newSpecPage } from '@stencil/core/testing';
import { AegovTabs } from './aegov-tabs';
import { AegovTab } from '../aegov-tab/aegov-tab';
import { AegovTabPanel } from '../aegov-tab-panel/aegov-tab-panel';

const baseHtml = `
  <aegov-tabs default-open="one">
    <aegov-tab slot="tabs" tab-id="one">One</aegov-tab>
    <aegov-tab slot="tabs" tab-id="two">Two</aegov-tab>
    <aegov-tab-panel tab-id="one">Panel One</aegov-tab-panel>
    <aegov-tab-panel tab-id="two">Panel Two</aegov-tab-panel>
  </aegov-tabs>
`;

describe('aegov-tabs', () => {
  it('renders tablist and panel containers', async () => {
    const page = await newSpecPage({
      components: [AegovTabs, AegovTab, AegovTabPanel],
      html: baseHtml,
    });
    expect(page.root.querySelector('[role="tablist"]')).not.toBeNull();
    expect(page.root.querySelector('.aegov-tabs')).not.toBeNull();
    expect(page.root.querySelector('.tabs__panels')).not.toBeNull();
  });

  it('auto-generates fieldId when not provided', async () => {
    const page = await newSpecPage({
      components: [AegovTabs],
      html: `<aegov-tabs></aegov-tabs>`,
    });
    expect(page.rootInstance.fieldId).toMatch(/^aegov-tabs-\d+$/);
    expect(page.root.querySelector('.aegov-tabs').id).toBe(page.rootInstance.fieldId);
  });

  it('uses default-open as initial active tab', async () => {
    const page = await newSpecPage({
      components: [AegovTabs, AegovTab, AegovTabPanel],
      html: baseHtml,
    });
    expect(page.rootInstance.activeTabId).toBe('one');
    const tabs = page.root.querySelectorAll('aegov-tab');
    expect((tabs[0] as any).activeTabId).toBe('one');
    const panels = page.root.querySelectorAll('aegov-tab-panel');
    expect((panels[0] as any).active).toBe(true);
    expect((panels[1] as any).active).toBe(false);
  });

  it('falls back to first non-disabled tab when no default-open', async () => {
    const page = await newSpecPage({
      components: [AegovTabs, AegovTab, AegovTabPanel],
      html: `
        <aegov-tabs>
          <aegov-tab slot="tabs" tab-id="a" is-disabled="true">A</aegov-tab>
          <aegov-tab slot="tabs" tab-id="b">B</aegov-tab>
          <aegov-tab-panel tab-id="a">Pa</aegov-tab-panel>
          <aegov-tab-panel tab-id="b">Pb</aegov-tab-panel>
        </aegov-tabs>
      `,
    });
    expect(page.rootInstance.activeTabId).toBe('b');
  });

  it('applies variant class', async () => {
    const page = await newSpecPage({
      components: [AegovTabs],
      html: `<aegov-tabs variant="pill"></aegov-tabs>`,
    });
    expect(page.root.querySelector('.aegov-tabs').className).toContain('tabs--pill');
  });

  it('applies size class', async () => {
    const page = await newSpecPage({
      components: [AegovTabs],
      html: `<aegov-tabs size="lg"></aegov-tabs>`,
    });
    expect(page.root.querySelector('.aegov-tabs').className).toContain('tabs--lg');
  });

  it('applies stretch and vertical modifiers', async () => {
    const page = await newSpecPage({
      components: [AegovTabs],
      html: `<aegov-tabs is-stretchable="true" orientation="vertical"></aegov-tabs>`,
    });
    const cls = page.root.querySelector('.aegov-tabs').className;
    expect(cls).toContain('tabs--stretch');
    expect(cls).toContain('tabs--vertical');
  });

  it('applies scrollable wrapper modifier', async () => {
    const page = await newSpecPage({
      components: [AegovTabs],
      html: `<aegov-tabs is-scrollable="true"></aegov-tabs>`,
    });
    expect(page.root.querySelector('.tabs__list-wrapper').className).toContain('tabs__list-wrapper--scrollable');
  });

  it('emits aegovTabChange and updates active tab on aegovTabSelect', async () => {
    const page = await newSpecPage({
      components: [AegovTabs, AegovTab, AegovTabPanel],
      html: baseHtml,
    });
    const spy = jest.fn();
    page.root.addEventListener('aegovTabChange', spy);

    page.root.dispatchEvent(new CustomEvent('aegovTabSelect', { detail: 'two', bubbles: true, composed: true }));
    await page.waitForChanges();

    expect(page.rootInstance.activeTabId).toBe('two');
    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0][0].detail).toBe('two');
  });

  it('does not re-emit when activating the already-active tab', async () => {
    const page = await newSpecPage({
      components: [AegovTabs, AegovTab, AegovTabPanel],
      html: baseHtml,
    });
    const spy = jest.fn();
    page.root.addEventListener('aegovTabChange', spy);

    page.root.dispatchEvent(new CustomEvent('aegovTabSelect', { detail: 'one', bubbles: true, composed: true }));
    await page.waitForChanges();
    expect(spy).not.toHaveBeenCalled();
  });

  it('syncs variant/size/orientation onto child tabs', async () => {
    const page = await newSpecPage({
      components: [AegovTabs, AegovTab, AegovTabPanel],
      html: `
        <aegov-tabs variant="pill" size="lg" orientation="vertical" default-open="one">
          <aegov-tab slot="tabs" tab-id="one">One</aegov-tab>
          <aegov-tab-panel tab-id="one">P</aegov-tab-panel>
        </aegov-tabs>
      `,
    });
    await page.waitForChanges();
    const tab = page.root.querySelector('aegov-tab');
    expect((tab as any).variant).toBe('pill');
    expect((tab as any).size).toBe('lg');
    expect((tab as any).orientation).toBe('vertical');
  });

  it('exposes aria-orientation on tablist', async () => {
    const page = await newSpecPage({
      components: [AegovTabs],
      html: `<aegov-tabs orientation="vertical"></aegov-tabs>`,
    });
    expect(page.root.querySelector('[role="tablist"]').getAttribute('aria-orientation')).toBe('vertical');
  });

  it('uses labelTablist for aria-label', async () => {
    const page = await newSpecPage({
      components: [AegovTabs],
      html: `<aegov-tabs label-tablist="Account sections"></aegov-tabs>`,
    });
    expect(page.root.querySelector('[role="tablist"]').getAttribute('aria-label')).toBe('Account sections');
  });

  it('forwards aria-* and data-* attributes', async () => {
    const page = await newSpecPage({
      components: [AegovTabs],
      html: `<aegov-tabs aria-describedby="desc" data-test="x"></aegov-tabs>`,
    });
    const root = page.root.querySelector('.aegov-tabs');
    expect(root.getAttribute('aria-describedby')).toBe('desc');
    expect(root.getAttribute('data-test')).toBe('x');
  });
});
