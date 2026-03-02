import { newE2EPage } from '@stencil/core/testing';

describe('aegov-tab-panel e2e', () => {
  // ------------------------------------------------------------------ helpers
  async function render(html: string) {
    const page = await newE2EPage();
    await page.setContent(html);
    return page;
  }

  const basicHtml = `
    <aegov-tabs default-active-tab="tab1">
      <aegov-tab slot="tabs" tab-id="tab1">Tab One</aegov-tab>
      <aegov-tab slot="tabs" tab-id="tab2">Tab Two</aegov-tab>
      <aegov-tab slot="tabs" tab-id="tab3">Tab Three</aegov-tab>
      <aegov-tab-panel tab-id="tab1"><p>Panel One Content</p></aegov-tab-panel>
      <aegov-tab-panel tab-id="tab2"><p>Panel Two Content</p></aegov-tab-panel>
      <aegov-tab-panel tab-id="tab3"><p>Panel Three Content</p></aegov-tab-panel>
    </aegov-tabs>
  `;

  // ------------------------------------------------------------------ rendering
  describe('rendering', () => {
    it('renders a div with role="tabpanel"', async () => {
      const page = await render(basicHtml);
      const panel = await page.find('aegov-tab-panel[tab-id="tab1"] [role="tabpanel"]');
      expect(panel).not.toBeNull();
    });

    it('sets id to panel-{tabId}', async () => {
      const page = await render(basicHtml);
      const panel = await page.find('aegov-tab-panel[tab-id="tab1"] [role="tabpanel"]');
      expect(await panel.getAttribute('id')).toBe('panel-tab1');
    });

    it('sets aria-labelledby to tab-{tabId}', async () => {
      const page = await render(basicHtml);
      const panel = await page.find('aegov-tab-panel[tab-id="tab1"] [role="tabpanel"]');
      expect(await panel.getAttribute('aria-labelledby')).toBe('tab-tab1');
    });

    it('renders all three panels', async () => {
      const page = await render(basicHtml);
      const panels = await page.findAll('aegov-tab-panel [role="tabpanel"]');
      expect(panels.length).toBe(3);
    });

    it('each panel has the correct id', async () => {
      const page = await render(basicHtml);
      const panel1 = await page.find('aegov-tab-panel[tab-id="tab1"] [role="tabpanel"]');
      const panel2 = await page.find('aegov-tab-panel[tab-id="tab2"] [role="tabpanel"]');
      const panel3 = await page.find('aegov-tab-panel[tab-id="tab3"] [role="tabpanel"]');
      expect(await panel1.getAttribute('id')).toBe('panel-tab1');
      expect(await panel2.getAttribute('id')).toBe('panel-tab2');
      expect(await panel3.getAttribute('id')).toBe('panel-tab3');
    });
  });

  // ------------------------------------------------------------------ visibility
  describe('visibility', () => {
    it('active panel is not hidden', async () => {
      const page = await render(basicHtml);
      const panel1 = await page.find('aegov-tab-panel[tab-id="tab1"] [role="tabpanel"]');
      expect(await panel1.getProperty('hidden')).toBe(false);
    });

    it('inactive panels are hidden', async () => {
      const page = await render(basicHtml);
      const panel2 = await page.find('aegov-tab-panel[tab-id="tab2"] [role="tabpanel"]');
      const panel3 = await page.find('aegov-tab-panel[tab-id="tab3"] [role="tabpanel"]');
      expect(await panel2.getProperty('hidden')).toBe(true);
      expect(await panel3.getProperty('hidden')).toBe(true);
    });

    it('panel becomes visible when its tab is clicked', async () => {
      const page = await render(basicHtml);
      const tab2Btn = await page.find('aegov-tab[tab-id="tab2"] button');
      await tab2Btn.click();
      await page.waitForChanges();

      const panel2 = await page.find('aegov-tab-panel[tab-id="tab2"] [role="tabpanel"]');
      expect(await panel2.getProperty('hidden')).toBe(false);
    });

    it('previously active panel becomes hidden when another tab is clicked', async () => {
      const page = await render(basicHtml);
      const tab2Btn = await page.find('aegov-tab[tab-id="tab2"] button');
      await tab2Btn.click();
      await page.waitForChanges();

      const panel1 = await page.find('aegov-tab-panel[tab-id="tab1"] [role="tabpanel"]');
      expect(await panel1.getProperty('hidden')).toBe(true);
    });

    it('switching through multiple tabs shows correct panel', async () => {
      const page = await render(basicHtml);

      // Click tab2
      const tab2Btn = await page.find('aegov-tab[tab-id="tab2"] button');
      await tab2Btn.click();
      await page.waitForChanges();

      // Click tab3
      const tab3Btn = await page.find('aegov-tab[tab-id="tab3"] button');
      await tab3Btn.click();
      await page.waitForChanges();

      const panel1 = await page.find('aegov-tab-panel[tab-id="tab1"] [role="tabpanel"]');
      const panel2 = await page.find('aegov-tab-panel[tab-id="tab2"] [role="tabpanel"]');
      const panel3 = await page.find('aegov-tab-panel[tab-id="tab3"] [role="tabpanel"]');
      expect(await panel1.getProperty('hidden')).toBe(true);
      expect(await panel2.getProperty('hidden')).toBe(true);
      expect(await panel3.getProperty('hidden')).toBe(false);
    });
  });

  // ------------------------------------------------------------------ tabindex
  describe('tabindex', () => {
    it('active panel has tabindex=0', async () => {
      const page = await render(basicHtml);
      const panel1 = await page.find('aegov-tab-panel[tab-id="tab1"] [role="tabpanel"]');
      expect(await panel1.getAttribute('tabindex')).toBe('0');
    });

    it('inactive panel does not have tabindex', async () => {
      const page = await render(basicHtml);
      const panel2 = await page.find('aegov-tab-panel[tab-id="tab2"] [role="tabpanel"]');
      expect(await panel2.getAttribute('tabindex')).toBeNull();
    });

    it('tabindex updates when panel becomes active', async () => {
      const page = await render(basicHtml);
      const tab2Btn = await page.find('aegov-tab[tab-id="tab2"] button');
      await tab2Btn.click();
      await page.waitForChanges();

      const panel2 = await page.find('aegov-tab-panel[tab-id="tab2"] [role="tabpanel"]');
      expect(await panel2.getAttribute('tabindex')).toBe('0');
    });

    it('tabindex removed when panel becomes inactive', async () => {
      const page = await render(basicHtml);
      const tab2Btn = await page.find('aegov-tab[tab-id="tab2"] button');
      await tab2Btn.click();
      await page.waitForChanges();

      const panel1 = await page.find('aegov-tab-panel[tab-id="tab1"] [role="tabpanel"]');
      expect(await panel1.getAttribute('tabindex')).toBeNull();
    });
  });

  // ------------------------------------------------------------------ content rendering
  describe('content rendering', () => {
    it('renders slot content in active panel', async () => {
      const page = await render(basicHtml);
      const panel1 = await page.find('aegov-tab-panel[tab-id="tab1"] [role="tabpanel"]');
      const text = panel1.textContent;
      expect(text).toContain('Panel One Content');
    });

    it('panel content persists after switching tabs', async () => {
      const page = await render(basicHtml);

      // Switch to tab2 then back to tab1
      const tab2Btn = await page.find('aegov-tab[tab-id="tab2"] button');
      await tab2Btn.click();
      await page.waitForChanges();

      const tab1Btn = await page.find('aegov-tab[tab-id="tab1"] button');
      await tab1Btn.click();
      await page.waitForChanges();

      const panel1 = await page.find('aegov-tab-panel[tab-id="tab1"] [role="tabpanel"]');
      expect(panel1.textContent).toContain('Panel One Content');
    });
  });

  // ------------------------------------------------------------------ accessibility
  describe('accessibility', () => {
    it('aria-labelledby matches the corresponding tab id', async () => {
      const page = await render(basicHtml);
      const panel1 = await page.find('aegov-tab-panel[tab-id="tab1"] [role="tabpanel"]');
      const panel2 = await page.find('aegov-tab-panel[tab-id="tab2"] [role="tabpanel"]');
      expect(await panel1.getAttribute('aria-labelledby')).toBe('tab-tab1');
      expect(await panel2.getAttribute('aria-labelledby')).toBe('tab-tab2');
    });

    it('panel id matches the pattern panel-{tabId}', async () => {
      const page = await render(basicHtml);
      const panel = await page.find('aegov-tab-panel[tab-id="tab1"] [role="tabpanel"]');
      expect(await panel.getAttribute('id')).toBe('panel-tab1');
    });

    it('tab aria-controls points to panel id', async () => {
      const page = await render(basicHtml);
      const tabBtn = await page.find('aegov-tab[tab-id="tab1"] button');
      const panelId = await tabBtn.getAttribute('aria-controls');

      const panel = await page.find(`#${panelId}`);
      expect(panel).not.toBeNull();
      expect(await panel.getAttribute('role')).toBe('tabpanel');
    });
  });
});
