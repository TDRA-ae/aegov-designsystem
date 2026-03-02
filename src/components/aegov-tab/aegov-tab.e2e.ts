import { newE2EPage } from '@stencil/core/testing';

describe('aegov-tab e2e', () => {
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

  // ------------------------------------------------------------------ rendering
  describe('rendering', () => {
    it('renders a button with role="tab"', async () => {
      const page = await render(basicHtml);
      const btn = await page.find('aegov-tab[tab-id="tab1"] button[role="tab"]');
      expect(btn).not.toBeNull();
    });

    it('sets the correct id on each tab button', async () => {
      const page = await render(basicHtml);
      const tab1Btn = await page.find('aegov-tab[tab-id="tab1"] button');
      const tab2Btn = await page.find('aegov-tab[tab-id="tab2"] button');
      expect(await tab1Btn.getAttribute('id')).toBe('tab-tab1');
      expect(await tab2Btn.getAttribute('id')).toBe('tab-tab2');
    });

    it('sets aria-controls to the matching panel id', async () => {
      const page = await render(basicHtml);
      const tab1Btn = await page.find('aegov-tab[tab-id="tab1"] button');
      expect(await tab1Btn.getAttribute('aria-controls')).toBe('panel-tab1');
    });

    it('renders tab label text', async () => {
      const page = await render(basicHtml);
      const label = await page.find('aegov-tab[tab-id="tab1"] .tab__label');
      expect(label).not.toBeNull();
      expect(label.textContent).toContain('Tab One');
    });
  });

  // ------------------------------------------------------------------ active state
  describe('active state', () => {
    it('active tab has aria-selected="true"', async () => {
      const page = await render(basicHtml);
      const activeBtn = await page.find('aegov-tab[tab-id="tab1"] button');
      expect(await activeBtn.getAttribute('aria-selected')).toBe('true');
    });

    it('inactive tab has aria-selected="false"', async () => {
      const page = await render(basicHtml);
      const inactiveBtn = await page.find('aegov-tab[tab-id="tab2"] button');
      expect(await inactiveBtn.getAttribute('aria-selected')).toBe('false');
    });

    it('active tab has tabindex=0', async () => {
      const page = await render(basicHtml);
      const activeBtn = await page.find('aegov-tab[tab-id="tab1"] button');
      expect(await activeBtn.getAttribute('tabindex')).toBe('0');
    });

    it('inactive tab has tabindex=-1', async () => {
      const page = await render(basicHtml);
      const inactiveBtn = await page.find('aegov-tab[tab-id="tab2"] button');
      expect(await inactiveBtn.getAttribute('tabindex')).toBe('-1');
    });

    it('aria-selected changes when tab is clicked', async () => {
      const page = await render(basicHtml);
      const tab2Btn = await page.find('aegov-tab[tab-id="tab2"] button');
      await tab2Btn.click();
      await page.waitForChanges();

      expect(await tab2Btn.getAttribute('aria-selected')).toBe('true');

      const tab1Btn = await page.find('aegov-tab[tab-id="tab1"] button');
      expect(await tab1Btn.getAttribute('aria-selected')).toBe('false');
    });

    it('tabindex updates when active tab changes', async () => {
      const page = await render(basicHtml);
      const tab2Btn = await page.find('aegov-tab[tab-id="tab2"] button');
      await tab2Btn.click();
      await page.waitForChanges();

      expect(await tab2Btn.getAttribute('tabindex')).toBe('0');

      const tab1Btn = await page.find('aegov-tab[tab-id="tab1"] button');
      expect(await tab1Btn.getAttribute('tabindex')).toBe('-1');
    });
  });

  // ------------------------------------------------------------------ disabled
  describe('disabled state', () => {
    const disabledHtml = `
      <aegov-tabs default-active-tab="tab1">
        <aegov-tab slot="tabs" tab-id="tab1">Tab One</aegov-tab>
        <aegov-tab slot="tabs" tab-id="tab2" disabled>Tab Two</aegov-tab>
        <aegov-tab-panel tab-id="tab1">Panel One</aegov-tab-panel>
        <aegov-tab-panel tab-id="tab2">Panel Two</aegov-tab-panel>
      </aegov-tabs>
    `;

    it('disabled tab has disabled attribute on button', async () => {
      const page = await render(disabledHtml);
      const tab2Btn = await page.find('aegov-tab[tab-id="tab2"] button');
      expect(await tab2Btn.getProperty('disabled')).toBe(true);
    });

    it('disabled tab has aria-disabled="true"', async () => {
      const page = await render(disabledHtml);
      const tab2Btn = await page.find('aegov-tab[tab-id="tab2"] button');
      expect(await tab2Btn.getAttribute('aria-disabled')).toBe('true');
    });

    it('disabled tab has tab__btn--disabled class', async () => {
      const page = await render(disabledHtml);
      const tab2Btn = await page.find('aegov-tab[tab-id="tab2"] button');
      expect(await tab2Btn.getAttribute('class')).toContain('tab__btn--disabled');
    });

    it('clicking disabled tab does not change active tab', async () => {
      const page = await render(disabledHtml);
      const tabsEl = await page.find('aegov-tabs');
      const changeSpy = await tabsEl.spyOnEvent('aegovTabChange');

      const tab2Btn = await page.find('aegov-tab[tab-id="tab2"] button');
      await tab2Btn.click();
      await page.waitForChanges();

      expect(changeSpy).toHaveReceivedEventTimes(0);

      // First tab should still be active
      const tab1Btn = await page.find('aegov-tab[tab-id="tab1"] button');
      expect(await tab1Btn.getAttribute('aria-selected')).toBe('true');
    });
  });

  // ------------------------------------------------------------------ click behavior
  describe('click behavior', () => {
    it('clicking a tab activates it', async () => {
      const page = await render(basicHtml);
      const tab3Btn = await page.find('aegov-tab[tab-id="tab3"] button');
      await tab3Btn.click();
      await page.waitForChanges();

      expect(await tab3Btn.getAttribute('aria-selected')).toBe('true');
    });

    it('clicking a tab shows its panel', async () => {
      const page = await render(basicHtml);
      const tab2Btn = await page.find('aegov-tab[tab-id="tab2"] button');
      await tab2Btn.click();
      await page.waitForChanges();

      const panel2 = await page.find('aegov-tab-panel[tab-id="tab2"] [role="tabpanel"]');
      expect(await panel2.getProperty('hidden')).toBe(false);
    });

    it('clicking an already-active tab does not fire event', async () => {
      const page = await render(basicHtml);
      const tabsEl = await page.find('aegov-tabs');
      const changeSpy = await tabsEl.spyOnEvent('aegovTabChange');

      const tab1Btn = await page.find('aegov-tab[tab-id="tab1"] button');
      await tab1Btn.click();
      await page.waitForChanges();

      expect(changeSpy).toHaveReceivedEventTimes(0);
    });
  });

  // ------------------------------------------------------------------ variant classes
  describe('variant classes', () => {
    it('applies tab__btn--simple class for simple variant', async () => {
      const page = await render(basicHtml);
      const btn = await page.find('aegov-tab[tab-id="tab1"] button');
      expect(await btn.getAttribute('class')).toContain('tab__btn--simple');
    });

    it('applies tab__btn--segmented class for segmented variant', async () => {
      const page = await render(`
        <aegov-tabs variant="segmented" default-active-tab="t1">
          <aegov-tab slot="tabs" tab-id="t1">T1</aegov-tab>
          <aegov-tab-panel tab-id="t1">P1</aegov-tab-panel>
        </aegov-tabs>
      `);
      const btn = await page.find('aegov-tab[tab-id="t1"] button');
      expect(await btn.getAttribute('class')).toContain('tab__btn--segmented');
    });

    it('applies tab__btn--pill class for pill variant', async () => {
      const page = await render(`
        <aegov-tabs variant="pill" default-active-tab="t1">
          <aegov-tab slot="tabs" tab-id="t1">T1</aegov-tab>
          <aegov-tab-panel tab-id="t1">P1</aegov-tab-panel>
        </aegov-tabs>
      `);
      const btn = await page.find('aegov-tab[tab-id="t1"] button');
      expect(await btn.getAttribute('class')).toContain('tab__btn--pill');
    });
  });

  // ------------------------------------------------------------------ size classes
  describe('size classes', () => {
    it('applies tab__btn--sm class for sm size', async () => {
      const page = await render(`
        <aegov-tabs size="sm" default-active-tab="t1">
          <aegov-tab slot="tabs" tab-id="t1">T1</aegov-tab>
          <aegov-tab-panel tab-id="t1">P1</aegov-tab-panel>
        </aegov-tabs>
      `);
      const btn = await page.find('aegov-tab[tab-id="t1"] button');
      expect(await btn.getAttribute('class')).toContain('tab__btn--sm');
    });

    it('applies tab__btn--lg class for lg size', async () => {
      const page = await render(`
        <aegov-tabs size="lg" default-active-tab="t1">
          <aegov-tab slot="tabs" tab-id="t1">T1</aegov-tab>
          <aegov-tab-panel tab-id="t1">P1</aegov-tab-panel>
        </aegov-tabs>
      `);
      const btn = await page.find('aegov-tab[tab-id="t1"] button');
      expect(await btn.getAttribute('class')).toContain('tab__btn--lg');
    });
  });
});
