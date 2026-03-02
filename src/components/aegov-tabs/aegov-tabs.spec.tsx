import { newSpecPage } from '@stencil/core/testing';
import { AegovTabs } from './aegov-tabs';
import { AegovTab } from '../aegov-tab/aegov-tab';
import { AegovTabPanel } from '../aegov-tab-panel/aegov-tab-panel';

describe('aegov-tabs', () => {
  // ------------------------------------------------------------------ helpers
  async function render(html: string) {
    const page = await newSpecPage({
      components: [AegovTabs, AegovTab, AegovTabPanel],
      html,
    });
    return page;
  }

  const basicHtml = `
    <aegov-tabs default-active-tab="tab1">
      <aegov-tab slot="tabs" tab-id="tab1">Tab One</aegov-tab>
      <aegov-tab slot="tabs" tab-id="tab2">Tab Two</aegov-tab>
      <aegov-tab slot="tabs" tab-id="tab3">Tab Three</aegov-tab>
      <aegov-tab-panel tab-id="tab1">Panel One</aegov-tab-panel>
      <aegov-tab-panel tab-id="tab2">Panel Two</aegov-tab-panel>
      <aegov-tab-panel tab-id="tab3">Panel Three</aegov-tab-panel>
    </aegov-tabs>
  `;

  // ------------------------------------------------------------------ rendering
  describe('rendering', () => {
    it('renders the tabs container div', async () => {
      const page = await render(basicHtml);
      const container = page.root.querySelector('.tabs');
      expect(container).not.toBeNull();
    });

    it('renders the tablist with role="tablist"', async () => {
      const page = await render(basicHtml);
      const tablist = page.root.querySelector('[role="tablist"]');
      expect(tablist).not.toBeNull();
    });

    it('renders panels container', async () => {
      const page = await render(basicHtml);
      const panels = page.root.querySelector('.tabs__panels');
      expect(panels).not.toBeNull();
    });

    it('renders the list wrapper', async () => {
      const page = await render(basicHtml);
      const wrapper = page.root.querySelector('.tabs__list-wrapper');
      expect(wrapper).not.toBeNull();
    });

    it('sets aria-orientation on tablist', async () => {
      const page = await render(basicHtml);
      const tablist = page.root.querySelector('[role="tablist"]');
      expect(tablist.getAttribute('aria-orientation')).toBe('horizontal');
    });

    it('sets aria-orientation to vertical when orientation is vertical', async () => {
      const page = await render(`
        <aegov-tabs orientation="vertical" default-active-tab="t1">
          <aegov-tab slot="tabs" tab-id="t1">T1</aegov-tab>
          <aegov-tab-panel tab-id="t1">P1</aegov-tab-panel>
        </aegov-tabs>
      `);
      const tablist = page.root.querySelector('[role="tablist"]');
      expect(tablist.getAttribute('aria-orientation')).toBe('vertical');
    });
  });

  // ------------------------------------------------------------------ variant classes
  describe('variant classes', () => {
    it('applies tabs--simple by default', async () => {
      const page = await render(basicHtml);
      const container = page.root.querySelector('.tabs');
      expect(container.classList.contains('tabs--simple')).toBe(true);
    });

    it('applies tabs--segmented for segmented variant', async () => {
      const page = await render(`
        <aegov-tabs variant="segmented" default-active-tab="t1">
          <aegov-tab slot="tabs" tab-id="t1">T1</aegov-tab>
          <aegov-tab-panel tab-id="t1">P1</aegov-tab-panel>
        </aegov-tabs>
      `);
      const container = page.root.querySelector('.tabs');
      expect(container.classList.contains('tabs--segmented')).toBe(true);
    });

    it('applies tabs--pill for pill variant', async () => {
      const page = await render(`
        <aegov-tabs variant="pill" default-active-tab="t1">
          <aegov-tab slot="tabs" tab-id="t1">T1</aegov-tab>
          <aegov-tab-panel tab-id="t1">P1</aegov-tab-panel>
        </aegov-tabs>
      `);
      const container = page.root.querySelector('.tabs');
      expect(container.classList.contains('tabs--pill')).toBe(true);
    });
  });

  // ------------------------------------------------------------------ size classes
  describe('size classes', () => {
    it('applies tabs--base by default', async () => {
      const page = await render(basicHtml);
      const container = page.root.querySelector('.tabs');
      expect(container.classList.contains('tabs--base')).toBe(true);
    });

    it('applies tabs--sm for sm size', async () => {
      const page = await render(`
        <aegov-tabs size="sm" default-active-tab="t1">
          <aegov-tab slot="tabs" tab-id="t1">T1</aegov-tab>
          <aegov-tab-panel tab-id="t1">P1</aegov-tab-panel>
        </aegov-tabs>
      `);
      const container = page.root.querySelector('.tabs');
      expect(container.classList.contains('tabs--sm')).toBe(true);
    });

    it('applies tabs--lg for lg size', async () => {
      const page = await render(`
        <aegov-tabs size="lg" default-active-tab="t1">
          <aegov-tab slot="tabs" tab-id="t1">T1</aegov-tab>
          <aegov-tab-panel tab-id="t1">P1</aegov-tab-panel>
        </aegov-tabs>
      `);
      const container = page.root.querySelector('.tabs');
      expect(container.classList.contains('tabs--lg')).toBe(true);
    });
  });

  // ------------------------------------------------------------------ stretch
  describe('stretch', () => {
    it('does not apply tabs--stretch by default', async () => {
      const page = await render(basicHtml);
      const container = page.root.querySelector('.tabs');
      expect(container.classList.contains('tabs--stretch')).toBe(false);
    });

    it('applies tabs--stretch when stretch is true', async () => {
      const page = await render(`
        <aegov-tabs stretch default-active-tab="t1">
          <aegov-tab slot="tabs" tab-id="t1">T1</aegov-tab>
          <aegov-tab-panel tab-id="t1">P1</aegov-tab-panel>
        </aegov-tabs>
      `);
      const container = page.root.querySelector('.tabs');
      expect(container.classList.contains('tabs--stretch')).toBe(true);
    });
  });

  // ------------------------------------------------------------------ vertical orientation
  describe('vertical orientation', () => {
    it('does not apply tabs--vertical by default', async () => {
      const page = await render(basicHtml);
      const container = page.root.querySelector('.tabs');
      expect(container.classList.contains('tabs--vertical')).toBe(false);
    });

    it('applies tabs--vertical when orientation is vertical', async () => {
      const page = await render(`
        <aegov-tabs orientation="vertical" default-active-tab="t1">
          <aegov-tab slot="tabs" tab-id="t1">T1</aegov-tab>
          <aegov-tab-panel tab-id="t1">P1</aegov-tab-panel>
        </aegov-tabs>
      `);
      const container = page.root.querySelector('.tabs');
      expect(container.classList.contains('tabs--vertical')).toBe(true);
    });
  });

  // ------------------------------------------------------------------ initial active tab
  describe('initial active tab', () => {
    it('activates the specified defaultActiveTab', async () => {
      const page = await render(basicHtml);
      expect(page.rootInstance.activeTabId).toBe('tab1');
    });

    it('activates the second tab when defaultActiveTab is tab2', async () => {
      const page = await render(`
        <aegov-tabs default-active-tab="tab2">
          <aegov-tab slot="tabs" tab-id="tab1">T1</aegov-tab>
          <aegov-tab slot="tabs" tab-id="tab2">T2</aegov-tab>
          <aegov-tab-panel tab-id="tab1">P1</aegov-tab-panel>
          <aegov-tab-panel tab-id="tab2">P2</aegov-tab-panel>
        </aegov-tabs>
      `);
      expect(page.rootInstance.activeTabId).toBe('tab2');
    });

    it('activates first non-disabled tab when no defaultActiveTab specified', async () => {
      const page = await render(`
        <aegov-tabs>
          <aegov-tab slot="tabs" tab-id="tab1">T1</aegov-tab>
          <aegov-tab slot="tabs" tab-id="tab2">T2</aegov-tab>
          <aegov-tab-panel tab-id="tab1">P1</aegov-tab-panel>
          <aegov-tab-panel tab-id="tab2">P2</aegov-tab-panel>
        </aegov-tabs>
      `);
      expect(page.rootInstance.activeTabId).toBe('tab1');
    });

    it('skips disabled tabs when auto-selecting first tab', async () => {
      const page = await render(`
        <aegov-tabs>
          <aegov-tab slot="tabs" tab-id="tab1" disabled>T1</aegov-tab>
          <aegov-tab slot="tabs" tab-id="tab2">T2</aegov-tab>
          <aegov-tab-panel tab-id="tab1">P1</aegov-tab-panel>
          <aegov-tab-panel tab-id="tab2">P2</aegov-tab-panel>
        </aegov-tabs>
      `);
      expect(page.rootInstance.activeTabId).toBe('tab2');
    });
  });

  // ------------------------------------------------------------------ prop syncing to children
  describe('prop syncing to children', () => {
    it('sets activeTabId on child aegov-tab elements', async () => {
      const page = await render(basicHtml);
      const tabs = page.root.querySelectorAll('aegov-tab');
      tabs.forEach((tab: any) => {
        expect(tab.activeTabId).toBe('tab1');
      });
    });

    it('sets variant on child aegov-tab elements', async () => {
      const page = await render(`
        <aegov-tabs variant="pill" default-active-tab="t1">
          <aegov-tab slot="tabs" tab-id="t1">T1</aegov-tab>
          <aegov-tab slot="tabs" tab-id="t2">T2</aegov-tab>
          <aegov-tab-panel tab-id="t1">P1</aegov-tab-panel>
          <aegov-tab-panel tab-id="t2">P2</aegov-tab-panel>
        </aegov-tabs>
      `);
      const tabs = page.root.querySelectorAll('aegov-tab');
      tabs.forEach((tab: any) => {
        expect(tab.variant).toBe('pill');
      });
    });

    it('sets size on child aegov-tab elements', async () => {
      const page = await render(`
        <aegov-tabs size="lg" default-active-tab="t1">
          <aegov-tab slot="tabs" tab-id="t1">T1</aegov-tab>
          <aegov-tab-panel tab-id="t1">P1</aegov-tab-panel>
        </aegov-tabs>
      `);
      const tab = page.root.querySelector('aegov-tab') as any;
      expect(tab.size).toBe('lg');
    });

    it('sets orientation on child aegov-tab elements', async () => {
      const page = await render(`
        <aegov-tabs orientation="vertical" default-active-tab="t1">
          <aegov-tab slot="tabs" tab-id="t1">T1</aegov-tab>
          <aegov-tab-panel tab-id="t1">P1</aegov-tab-panel>
        </aegov-tabs>
      `);
      const tab = page.root.querySelector('aegov-tab') as any;
      expect(tab.orientation).toBe('vertical');
    });

    it('sets active on the correct aegov-tab-panel', async () => {
      const page = await render(basicHtml);
      const panels = page.root.querySelectorAll('aegov-tab-panel');
      expect((panels[0] as any).active).toBe(true);
      expect((panels[1] as any).active).toBe(false);
      expect((panels[2] as any).active).toBe(false);
    });

    it('updates panel active states after tab change', async () => {
      const page = await render(basicHtml);

      // Simulate selecting tab2
      const tabEl = page.root.querySelectorAll('aegov-tab')[1];
      tabEl.dispatchEvent(new CustomEvent('aegovTabSelect', { bubbles: true, detail: 'tab2' }));
      await page.waitForChanges();

      const panels = page.root.querySelectorAll('aegov-tab-panel');
      expect((panels[0] as any).active).toBe(false);
      expect((panels[1] as any).active).toBe(true);
      expect((panels[2] as any).active).toBe(false);
    });
  });

  // ------------------------------------------------------------------ events
  describe('events', () => {
    it('emits aegovTabChange when a tab is selected', async () => {
      const page = await render(basicHtml);
      const changeSpy = jest.fn();
      page.root.addEventListener('aegovTabChange', changeSpy);

      // Simulate tab select event from aegov-tab
      const tabEl = page.root.querySelectorAll('aegov-tab')[1];
      tabEl.dispatchEvent(new CustomEvent('aegovTabSelect', { bubbles: true, detail: 'tab2' }));
      await page.waitForChanges();

      expect(changeSpy).toHaveBeenCalledTimes(1);
      expect(changeSpy.mock.calls[0][0].detail).toBe('tab2');
    });

    it('does not emit if same tab is selected again', async () => {
      const page = await render(basicHtml);
      const changeSpy = jest.fn();
      page.root.addEventListener('aegovTabChange', changeSpy);

      // Select the already-active tab
      page.root.querySelectorAll('aegov-tab')[0].dispatchEvent(
        new CustomEvent('aegovTabSelect', { bubbles: true, detail: 'tab1' }),
      );
      await page.waitForChanges();

      expect(changeSpy).toHaveBeenCalledTimes(0);
    });

    it('updates activeTabId state when tab is selected', async () => {
      const page = await render(basicHtml);
      page.root.querySelectorAll('aegov-tab')[1].dispatchEvent(
        new CustomEvent('aegovTabSelect', { bubbles: true, detail: 'tab2' }),
      );
      await page.waitForChanges();

      expect(page.rootInstance.activeTabId).toBe('tab2');
    });
  });

  // ------------------------------------------------------------------ scrollable
  describe('scrollable', () => {
    it('adds tabs__list-wrapper--scrollable class when scrollable is true', async () => {
      const page = await render(`
        <aegov-tabs scrollable default-active-tab="t1">
          <aegov-tab slot="tabs" tab-id="t1">T1</aegov-tab>
          <aegov-tab-panel tab-id="t1">P1</aegov-tab-panel>
        </aegov-tabs>
      `);
      const wrapper = page.root.querySelector('.tabs__list-wrapper');
      expect(wrapper.classList.contains('tabs__list-wrapper--scrollable')).toBe(true);
    });

    it('does not add scrollable class when scrollable is false', async () => {
      const page = await render(basicHtml);
      const wrapper = page.root.querySelector('.tabs__list-wrapper');
      expect(wrapper.classList.contains('tabs__list-wrapper--scrollable')).toBe(false);
    });
  });

  // ------------------------------------------------------------------ default props
  describe('default props', () => {
    it('defaults variant to simple', async () => {
      const page = await render(basicHtml);
      expect(page.rootInstance.variant).toBe('simple');
    });

    it('defaults size to base', async () => {
      const page = await render(basicHtml);
      expect(page.rootInstance.size).toBe('base');
    });

    it('defaults scrollable to false', async () => {
      const page = await render(basicHtml);
      expect(page.rootInstance.scrollable).toBe(false);
    });

    it('defaults stretch to false', async () => {
      const page = await render(basicHtml);
      expect(page.rootInstance.stretch).toBe(false);
    });

    it('defaults orientation to horizontal', async () => {
      const page = await render(basicHtml);
      expect(page.rootInstance.orientation).toBe('horizontal');
    });
  });
});
