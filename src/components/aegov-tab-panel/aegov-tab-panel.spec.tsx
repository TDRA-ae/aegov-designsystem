import { newSpecPage } from '@stencil/core/testing';
import { AegovTabPanel } from './aegov-tab-panel';

describe('aegov-tab-panel', () => {
  // ------------------------------------------------------------------ helpers
  async function render(props: Partial<{ tabId: string; active: boolean }> = {}) {
    const { tabId = 'test', active = false } = props;
    const activeAttr = active ? ' active' : '';
    const page = await newSpecPage({
      components: [AegovTabPanel],
      html: `<aegov-tab-panel tab-id="${tabId}"${activeAttr}>Panel content</aegov-tab-panel>`,
    });
    return page;
  }

  // ------------------------------------------------------------------ rendering
  describe('rendering', () => {
    it('renders a div with role="tabpanel"', async () => {
      const page = await render({ tabId: 'profile' });
      const panel = page.root.querySelector('[role="tabpanel"]');
      expect(panel).not.toBeNull();
    });

    it('sets id to panel-{tabId}', async () => {
      const page = await render({ tabId: 'settings' });
      const panel = page.root.querySelector('[role="tabpanel"]');
      expect(panel.getAttribute('id')).toBe('panel-settings');
    });

    it('sets aria-labelledby to tab-{tabId}', async () => {
      const page = await render({ tabId: 'account' });
      const panel = page.root.querySelector('[role="tabpanel"]');
      expect(panel.getAttribute('aria-labelledby')).toBe('tab-account');
    });

    it('has class tab-panel', async () => {
      const page = await render({ tabId: 'test' });
      const panel = page.root.querySelector('[role="tabpanel"]');
      expect(panel.classList.contains('tab-panel')).toBe(true);
    });
  });

  // ------------------------------------------------------------------ active state
  describe('active state', () => {
    it('is hidden when active is false', async () => {
      const page = await render({ tabId: 'test', active: false });
      const panel = page.root.querySelector('[role="tabpanel"]');
      expect(panel.hasAttribute('hidden')).toBe(true);
    });

    it('is visible when active is true', async () => {
      const page = await render({ tabId: 'test', active: true });
      const panel = page.root.querySelector('[role="tabpanel"]');
      expect(panel.hasAttribute('hidden')).toBe(false);
    });

    it('has tabindex=0 when active', async () => {
      const page = await render({ tabId: 'test', active: true });
      const panel = page.root.querySelector('[role="tabpanel"]');
      expect(panel.getAttribute('tabindex')).toBe('0');
    });

    it('does not have tabindex when inactive', async () => {
      const page = await render({ tabId: 'test', active: false });
      const panel = page.root.querySelector('[role="tabpanel"]');
      expect(panel.getAttribute('tabindex')).toBeNull();
    });

    it('shows content when active becomes true', async () => {
      const page = await render({ tabId: 'test', active: false });
      let panel = page.root.querySelector('[role="tabpanel"]');
      expect(panel.hasAttribute('hidden')).toBe(true);

      page.root.active = true;
      await page.waitForChanges();

      panel = page.root.querySelector('[role="tabpanel"]');
      expect(panel.hasAttribute('hidden')).toBe(false);
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
