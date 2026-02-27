import { newE2EPage } from '@stencil/core/testing';

describe('aegov-tabs e2e', () => {
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
      <aegov-tab-panel tab-id="tab1">Panel One</aegov-tab-panel>
      <aegov-tab-panel tab-id="tab2">Panel Two</aegov-tab-panel>
      <aegov-tab-panel tab-id="tab3">Panel Three</aegov-tab-panel>
    </aegov-tabs>
  `;

  // ------------------------------------------------------------------ basic rendering
  describe('basic rendering', () => {
    it('renders the tablist', async () => {
      const page = await render(basicHtml);
      const tablist = await page.find('aegov-tabs [role="tablist"]');
      expect(tablist).not.toBeNull();
    });

    it('renders all tab buttons', async () => {
      const page = await render(basicHtml);
      const tabs = await page.findAll('aegov-tabs aegov-tab button[role="tab"]');
      expect(tabs.length).toBe(3);
    });

    it('renders all tab panels', async () => {
      const page = await render(basicHtml);
      const panels = await page.findAll('aegov-tabs aegov-tab-panel [role="tabpanel"]');
      expect(panels.length).toBe(3);
    });
  });

  // ------------------------------------------------------------------ initial active tab
  describe('initial active tab', () => {
    it('first tab has aria-selected="true"', async () => {
      const page = await render(basicHtml);
      const firstTab = await page.find('aegov-tabs aegov-tab[tab-id="tab1"] button');
      expect(await firstTab.getAttribute('aria-selected')).toBe('true');
    });

    it('first panel is visible', async () => {
      const page = await render(basicHtml);
      const firstPanel = await page.find('aegov-tabs aegov-tab-panel[tab-id="tab1"] [role="tabpanel"]');
      expect(await firstPanel.getProperty('hidden')).toBe(false);
    });

    it('second tab has aria-selected="false"', async () => {
      const page = await render(basicHtml);
      const secondTab = await page.find('aegov-tabs aegov-tab[tab-id="tab2"] button');
      expect(await secondTab.getAttribute('aria-selected')).toBe('false');
    });

    it('second panel is hidden initially', async () => {
      const page = await render(basicHtml);
      const secondPanel = await page.find('aegov-tabs aegov-tab-panel[tab-id="tab2"] [role="tabpanel"]');
      expect(await secondPanel.getProperty('hidden')).toBe(true);
    });
  });

  // ------------------------------------------------------------------ tab switching
  describe('tab switching via click', () => {
    it('activates a tab when clicked', async () => {
      const page = await render(basicHtml);
      const tab2Btn = await page.find('aegov-tabs aegov-tab[tab-id="tab2"] button');
      await tab2Btn.click();
      await page.waitForChanges();

      expect(await tab2Btn.getAttribute('aria-selected')).toBe('true');
    });

    it('deactivates previously active tab on click', async () => {
      const page = await render(basicHtml);
      const tab2Btn = await page.find('aegov-tabs aegov-tab[tab-id="tab2"] button');
      await tab2Btn.click();
      await page.waitForChanges();

      const tab1Btn = await page.find('aegov-tabs aegov-tab[tab-id="tab1"] button');
      expect(await tab1Btn.getAttribute('aria-selected')).toBe('false');
    });

    it('shows the corresponding panel when tab is clicked', async () => {
      const page = await render(basicHtml);
      const tab2Btn = await page.find('aegov-tabs aegov-tab[tab-id="tab2"] button');
      await tab2Btn.click();
      await page.waitForChanges();

      const panel2 = await page.find('aegov-tabs aegov-tab-panel[tab-id="tab2"] [role="tabpanel"]');
      expect(await panel2.getProperty('hidden')).toBe(false);
    });

    it('hides the previously active panel when another tab is clicked', async () => {
      const page = await render(basicHtml);
      const tab2Btn = await page.find('aegov-tabs aegov-tab[tab-id="tab2"] button');
      await tab2Btn.click();
      await page.waitForChanges();

      const panel1 = await page.find('aegov-tabs aegov-tab-panel[tab-id="tab1"] [role="tabpanel"]');
      expect(await panel1.getProperty('hidden')).toBe(true);
    });

    it('emits aegovTabChange with the new tab id', async () => {
      const page = await render(basicHtml);
      const tabsEl = await page.find('aegov-tabs');
      const changeSpy = await tabsEl.spyOnEvent('aegovTabChange');

      const tab3Btn = await page.find('aegov-tabs aegov-tab[tab-id="tab3"] button');
      await tab3Btn.click();
      await page.waitForChanges();

      expect(changeSpy).toHaveReceivedEventTimes(1);
      expect(changeSpy).toHaveReceivedEventDetail('tab3');
    });

    it('does not emit aegovTabChange when clicking the already active tab', async () => {
      const page = await render(basicHtml);
      const tabsEl = await page.find('aegov-tabs');
      const changeSpy = await tabsEl.spyOnEvent('aegovTabChange');

      // Click the already-active tab
      const tab1Btn = await page.find('aegov-tabs aegov-tab[tab-id="tab1"] button');
      await tab1Btn.click();
      await page.waitForChanges();

      expect(changeSpy).toHaveReceivedEventTimes(0);
    });
  });

  // ------------------------------------------------------------------ disabled tabs
  describe('disabled tabs', () => {
    const disabledHtml = `
      <aegov-tabs default-active-tab="tab1">
        <aegov-tab slot="tabs" tab-id="tab1">Tab One</aegov-tab>
        <aegov-tab slot="tabs" tab-id="tab2" disabled>Tab Two (Disabled)</aegov-tab>
        <aegov-tab slot="tabs" tab-id="tab3">Tab Three</aegov-tab>
        <aegov-tab-panel tab-id="tab1">Panel One</aegov-tab-panel>
        <aegov-tab-panel tab-id="tab2">Panel Two</aegov-tab-panel>
        <aegov-tab-panel tab-id="tab3">Panel Three</aegov-tab-panel>
      </aegov-tabs>
    `;

    it('disabled tab has disabled attribute', async () => {
      const page = await render(disabledHtml);
      const tab2Btn = await page.find('aegov-tabs aegov-tab[tab-id="tab2"] button');
      expect(await tab2Btn.getProperty('disabled')).toBe(true);
    });

    it('disabled tab does not emit aegovTabChange when clicked', async () => {
      const page = await render(disabledHtml);
      const tabsEl = await page.find('aegov-tabs');
      const changeSpy = await tabsEl.spyOnEvent('aegovTabChange');

      const tab2Btn = await page.find('aegov-tabs aegov-tab[tab-id="tab2"] button');
      await tab2Btn.click();
      await page.waitForChanges();

      expect(changeSpy).toHaveReceivedEventTimes(0);
    });

    it('disabled tab panel stays hidden', async () => {
      const page = await render(disabledHtml);
      const tabsEl = await page.find('aegov-tabs');
      const changeSpy = await tabsEl.spyOnEvent('aegovTabChange');

      const tab2Btn = await page.find('aegov-tabs aegov-tab[tab-id="tab2"] button');
      await tab2Btn.click();
      await page.waitForChanges();

      expect(changeSpy).toHaveReceivedEventTimes(0);
      const panel2 = await page.find('aegov-tabs aegov-tab-panel[tab-id="tab2"] [role="tabpanel"]');
      expect(await panel2.getProperty('hidden')).toBe(true);
    });
  });

  // ------------------------------------------------------------------ accessibility
  describe('accessibility attributes', () => {
    it('active tab button has aria-selected="true"', async () => {
      const page = await render(basicHtml);
      const activeBtn = await page.find('aegov-tabs aegov-tab[tab-id="tab1"] button');
      expect(await activeBtn.getAttribute('aria-selected')).toBe('true');
    });

    it('tab button has aria-controls pointing to panel id', async () => {
      const page = await render(basicHtml);
      const tab1Btn = await page.find('aegov-tabs aegov-tab[tab-id="tab1"] button');
      expect(await tab1Btn.getAttribute('aria-controls')).toBe('panel-tab1');
    });

    it('tab button id matches tab-{tabId}', async () => {
      const page = await render(basicHtml);
      const tab1Btn = await page.find('aegov-tabs aegov-tab[tab-id="tab1"] button');
      expect(await tab1Btn.getAttribute('id')).toBe('tab-tab1');
    });

    it('panel has role="tabpanel"', async () => {
      const page = await render(basicHtml);
      const panel = await page.find('aegov-tabs aegov-tab-panel[tab-id="tab1"] [role="tabpanel"]');
      expect(panel).not.toBeNull();
    });

    it('panel aria-labelledby points to tab id', async () => {
      const page = await render(basicHtml);
      const panel = await page.find('aegov-tabs aegov-tab-panel[tab-id="tab1"] [role="tabpanel"]');
      expect(await panel.getAttribute('aria-labelledby')).toBe('tab-tab1');
    });

    it('active tab has tabindex=0', async () => {
      const page = await render(basicHtml);
      const activeBtn = await page.find('aegov-tabs aegov-tab[tab-id="tab1"] button');
      expect(await activeBtn.getAttribute('tabindex')).toBe('0');
    });

    it('inactive tab has tabindex=-1', async () => {
      const page = await render(basicHtml);
      const inactiveBtn = await page.find('aegov-tabs aegov-tab[tab-id="tab2"] button');
      expect(await inactiveBtn.getAttribute('tabindex')).toBe('-1');
    });

    it('active panel has tabindex=0', async () => {
      const page = await render(basicHtml);
      const panel = await page.find('aegov-tabs aegov-tab-panel[tab-id="tab1"] [role="tabpanel"]');
      expect(await panel.getAttribute('tabindex')).toBe('0');
    });
  });

  // ------------------------------------------------------------------ keyboard navigation
  describe('keyboard navigation', () => {
    it('ArrowRight moves to next tab', async () => {
      const page = await render(basicHtml);
      const tabsEl = await page.find('aegov-tabs');
      const changeSpy = await tabsEl.spyOnEvent('aegovTabChange');

      // Focus the active tab button
      await page.keyboard.press('Tab'); // Move focus to active tab
      await page.waitForChanges();

      // Press ArrowRight
      await page.keyboard.press('ArrowRight');
      await page.waitForChanges();

      expect(changeSpy).toHaveReceivedEventTimes(1);
      expect(changeSpy).toHaveReceivedEventDetail('tab2');
    });

    it('ArrowLeft moves to previous tab', async () => {
      const page = await render(`
        <aegov-tabs default-active-tab="tab2">
          <aegov-tab slot="tabs" tab-id="tab1">Tab One</aegov-tab>
          <aegov-tab slot="tabs" tab-id="tab2">Tab Two</aegov-tab>
          <aegov-tab slot="tabs" tab-id="tab3">Tab Three</aegov-tab>
          <aegov-tab-panel tab-id="tab1">P1</aegov-tab-panel>
          <aegov-tab-panel tab-id="tab2">P2</aegov-tab-panel>
          <aegov-tab-panel tab-id="tab3">P3</aegov-tab-panel>
        </aegov-tabs>
      `);
      const tabsEl = await page.find('aegov-tabs');
      const changeSpy = await tabsEl.spyOnEvent('aegovTabChange');

      await page.keyboard.press('Tab');
      await page.waitForChanges();

      await page.keyboard.press('ArrowLeft');
      await page.waitForChanges();

      expect(changeSpy).toHaveReceivedEventTimes(1);
      expect(changeSpy).toHaveReceivedEventDetail('tab1');
    });

    it('ArrowRight wraps from last to first tab', async () => {
      const page = await render(`
        <aegov-tabs default-active-tab="tab3">
          <aegov-tab slot="tabs" tab-id="tab1">T1</aegov-tab>
          <aegov-tab slot="tabs" tab-id="tab2">T2</aegov-tab>
          <aegov-tab slot="tabs" tab-id="tab3">T3</aegov-tab>
          <aegov-tab-panel tab-id="tab1">P1</aegov-tab-panel>
          <aegov-tab-panel tab-id="tab2">P2</aegov-tab-panel>
          <aegov-tab-panel tab-id="tab3">P3</aegov-tab-panel>
        </aegov-tabs>
      `);
      const tabsEl = await page.find('aegov-tabs');
      const changeSpy = await tabsEl.spyOnEvent('aegovTabChange');

      await page.keyboard.press('Tab');
      await page.waitForChanges();

      await page.keyboard.press('ArrowRight');
      await page.waitForChanges();

      expect(changeSpy).toHaveReceivedEventDetail('tab1');
    });

    it('Home key moves to first tab', async () => {
      const page = await render(`
        <aegov-tabs default-active-tab="tab3">
          <aegov-tab slot="tabs" tab-id="tab1">T1</aegov-tab>
          <aegov-tab slot="tabs" tab-id="tab2">T2</aegov-tab>
          <aegov-tab slot="tabs" tab-id="tab3">T3</aegov-tab>
          <aegov-tab-panel tab-id="tab1">P1</aegov-tab-panel>
          <aegov-tab-panel tab-id="tab2">P2</aegov-tab-panel>
          <aegov-tab-panel tab-id="tab3">P3</aegov-tab-panel>
        </aegov-tabs>
      `);
      const tabsEl = await page.find('aegov-tabs');
      const changeSpy = await tabsEl.spyOnEvent('aegovTabChange');

      await page.keyboard.press('Tab');
      await page.waitForChanges();

      await page.keyboard.press('Home');
      await page.waitForChanges();

      expect(changeSpy).toHaveReceivedEventDetail('tab1');
    });

    it('End key moves to last tab', async () => {
      const page = await render(basicHtml);
      const tabsEl = await page.find('aegov-tabs');
      const changeSpy = await tabsEl.spyOnEvent('aegovTabChange');

      await page.keyboard.press('Tab');
      await page.waitForChanges();

      await page.keyboard.press('End');
      await page.waitForChanges();

      expect(changeSpy).toHaveReceivedEventDetail('tab3');
    });
  });

  // ------------------------------------------------------------------ variant classes
  describe('variant classes in DOM', () => {
    it('applies tabs--simple class for simple variant', async () => {
      const page = await render(basicHtml);
      const container = await page.find('aegov-tabs .tabs');
      expect(await container.getAttribute('class')).toContain('tabs--simple');
    });

    it('applies tabs--segmented class for segmented variant', async () => {
      const page = await render(`
        <aegov-tabs variant="segmented" default-active-tab="t1">
          <aegov-tab slot="tabs" tab-id="t1">T1</aegov-tab>
          <aegov-tab-panel tab-id="t1">P1</aegov-tab-panel>
        </aegov-tabs>
      `);
      const container = await page.find('aegov-tabs .tabs');
      expect(await container.getAttribute('class')).toContain('tabs--segmented');
    });

    it('applies tabs--pill class for pill variant', async () => {
      const page = await render(`
        <aegov-tabs variant="pill" default-active-tab="t1">
          <aegov-tab slot="tabs" tab-id="t1">T1</aegov-tab>
          <aegov-tab-panel tab-id="t1">P1</aegov-tab-panel>
        </aegov-tabs>
      `);
      const container = await page.find('aegov-tabs .tabs');
      expect(await container.getAttribute('class')).toContain('tabs--pill');
    });
  });

  // ------------------------------------------------------------------ size classes
  describe('size classes in DOM', () => {
    it('applies tabs--base class by default', async () => {
      const page = await render(basicHtml);
      const container = await page.find('aegov-tabs .tabs');
      expect(await container.getAttribute('class')).toContain('tabs--base');
    });

    it('applies tabs--sm class for sm size', async () => {
      const page = await render(`
        <aegov-tabs size="sm" default-active-tab="t1">
          <aegov-tab slot="tabs" tab-id="t1">T1</aegov-tab>
          <aegov-tab-panel tab-id="t1">P1</aegov-tab-panel>
        </aegov-tabs>
      `);
      const container = await page.find('aegov-tabs .tabs');
      expect(await container.getAttribute('class')).toContain('tabs--sm');
    });

    it('applies tabs--lg class for lg size', async () => {
      const page = await render(`
        <aegov-tabs size="lg" default-active-tab="t1">
          <aegov-tab slot="tabs" tab-id="t1">T1</aegov-tab>
          <aegov-tab-panel tab-id="t1">P1</aegov-tab-panel>
        </aegov-tabs>
      `);
      const container = await page.find('aegov-tabs .tabs');
      expect(await container.getAttribute('class')).toContain('tabs--lg');
    });
  });
});
