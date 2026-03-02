import { newSpecPage } from '@stencil/core/testing';
import { AegovTabPanel } from './aegov-tab-panel';
import { AegovTabs } from '../aegov-tabs/aegov-tabs';
import { AegovTab } from '../aegov-tab/aegov-tab';

describe('aegov-tab-panel', () => {
  // ------------------------------------------------------------------ helpers
  async function renderStandalone(props: Partial<{ tabId: string; active: boolean }> = {}) {
    const { tabId = 'test', active = false } = props;
    const activeAttr = active ? ' active' : '';
    const page = await newSpecPage({
      components: [AegovTabPanel],
      html: `<aegov-tab-panel tab-id="${tabId}"${activeAttr}>Panel content</aegov-tab-panel>`,
    });
    return page;
  }

  async function renderInTabs(html: string) {
    const page = await newSpecPage({
      components: [AegovTabs, AegovTab, AegovTabPanel],
      html,
    });
    return page;
  }

  // ------------------------------------------------------------------ rendering
  describe('rendering', () => {
    it('renders a div with role="tabpanel"', async () => {
      const page = await renderStandalone({ tabId: 'profile' });
      const panel = page.root.querySelector('[role="tabpanel"]');
      expect(panel).not.toBeNull();
    });

    it('sets id to panel-{tabId}', async () => {
      const page = await renderStandalone({ tabId: 'settings' });
      const panel = page.root.querySelector('[role="tabpanel"]');
      expect(panel.getAttribute('id')).toBe('panel-settings');
    });

    it('sets aria-labelledby to tab-{tabId}', async () => {
      const page = await renderStandalone({ tabId: 'account' });
      const panel = page.root.querySelector('[role="tabpanel"]');
      expect(panel.getAttribute('aria-labelledby')).toBe('tab-account');
    });

    it('has class aegov-tab-panel', async () => {
      const page = await renderStandalone({ tabId: 'test' });
      const panel = page.root.querySelector('[role="tabpanel"]');
      expect(panel.classList.contains('aegov-tab-panel')).toBe(true);
    });

    it('renders slot content', async () => {
      const page = await renderStandalone({ tabId: 'test', active: true });
      const panel = page.root.querySelector('[role="tabpanel"]');
      expect(panel.textContent).toContain('Panel content');
    });
  });

  // ------------------------------------------------------------------ active state
  describe('active state', () => {
    it('is hidden when active is false', async () => {
      const page = await renderStandalone({ tabId: 'test', active: false });
      const panel = page.root.querySelector('[role="tabpanel"]');
      expect(panel.hasAttribute('hidden')).toBe(true);
    });

    it('is visible when active is true', async () => {
      const page = await renderStandalone({ tabId: 'test', active: true });
      const panel = page.root.querySelector('[role="tabpanel"]');
      expect(panel.hasAttribute('hidden')).toBe(false);
    });

    it('has tabindex=0 when active', async () => {
      const page = await renderStandalone({ tabId: 'test', active: true });
      const panel = page.root.querySelector('[role="tabpanel"]');
      expect(panel.getAttribute('tabindex')).toBe('0');
    });

    it('does not have tabindex when inactive', async () => {
      const page = await renderStandalone({ tabId: 'test', active: false });
      const panel = page.root.querySelector('[role="tabpanel"]');
      expect(panel.getAttribute('tabindex')).toBeNull();
    });

    it('shows content when active becomes true', async () => {
      const page = await renderStandalone({ tabId: 'test', active: false });
      let panel = page.root.querySelector('[role="tabpanel"]');
      expect(panel.hasAttribute('hidden')).toBe(true);

      page.root.active = true;
      await page.waitForChanges();

      panel = page.root.querySelector('[role="tabpanel"]');
      expect(panel.hasAttribute('hidden')).toBe(false);
    });

    it('hides content when active becomes false', async () => {
      const page = await renderStandalone({ tabId: 'test', active: true });
      let panel = page.root.querySelector('[role="tabpanel"]');
      expect(panel.hasAttribute('hidden')).toBe(false);

      page.root.active = false;
      await page.waitForChanges();

      panel = page.root.querySelector('[role="tabpanel"]');
      expect(panel.hasAttribute('hidden')).toBe(true);
    });
  });

  // ------------------------------------------------------------------ within parent tabs
  describe('within parent tabs', () => {
    it('active panel is visible and inactive panel is hidden', async () => {
      const page = await renderInTabs(`
        <aegov-tabs default-active-tab="one">
          <aegov-tab slot="tabs" tab-id="one">One</aegov-tab>
          <aegov-tab slot="tabs" tab-id="two">Two</aegov-tab>
          <aegov-tab-panel tab-id="one">Panel One</aegov-tab-panel>
          <aegov-tab-panel tab-id="two">Panel Two</aegov-tab-panel>
        </aegov-tabs>
      `);
      const panel1 = page.root.querySelector('aegov-tab-panel[tab-id="one"] [role="tabpanel"]');
      const panel2 = page.root.querySelector('aegov-tab-panel[tab-id="two"] [role="tabpanel"]');
      expect(panel1.hasAttribute('hidden')).toBe(false);
      expect(panel2.hasAttribute('hidden')).toBe(true);
    });

    it('panels update when tab changes', async () => {
      const page = await renderInTabs(`
        <aegov-tabs default-active-tab="one">
          <aegov-tab slot="tabs" tab-id="one">One</aegov-tab>
          <aegov-tab slot="tabs" tab-id="two">Two</aegov-tab>
          <aegov-tab-panel tab-id="one">Panel One</aegov-tab-panel>
          <aegov-tab-panel tab-id="two">Panel Two</aegov-tab-panel>
        </aegov-tabs>
      `);

      // Simulate selecting second tab
      const tabEl = page.root.querySelectorAll('aegov-tab')[1];
      tabEl.dispatchEvent(new CustomEvent('aegovTabSelect', { bubbles: true, detail: 'two' }));
      await page.waitForChanges();

      const panel1 = page.root.querySelector('aegov-tab-panel[tab-id="one"] [role="tabpanel"]');
      const panel2 = page.root.querySelector('aegov-tab-panel[tab-id="two"] [role="tabpanel"]');
      expect(panel1.hasAttribute('hidden')).toBe(true);
      expect(panel2.hasAttribute('hidden')).toBe(false);
    });

    it('receives active prop from parent', async () => {
      const page = await renderInTabs(`
        <aegov-tabs default-active-tab="one">
          <aegov-tab slot="tabs" tab-id="one">One</aegov-tab>
          <aegov-tab slot="tabs" tab-id="two">Two</aegov-tab>
          <aegov-tab-panel tab-id="one">Panel One</aegov-tab-panel>
          <aegov-tab-panel tab-id="two">Panel Two</aegov-tab-panel>
        </aegov-tabs>
      `);
      const panel1 = page.root.querySelector('aegov-tab-panel[tab-id="one"]') as any;
      const panel2 = page.root.querySelector('aegov-tab-panel[tab-id="two"]') as any;
      expect(panel1.active).toBe(true);
      expect(panel2.active).toBe(false);
    });
  });

  // ------------------------------------------------------------------ default props
  describe('default props', () => {
    it('defaults active to false', async () => {
      const page = await newSpecPage({
        components: [AegovTabPanel],
        html: `<aegov-tab-panel tab-id="test">Content</aegov-tab-panel>`,
      });
      expect(page.rootInstance.active).toBe(false);
    });
  });
});
