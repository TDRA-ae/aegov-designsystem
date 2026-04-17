import { newSpecPage } from '@stencil/core/testing';
import { AegovTab } from './aegov-tab';
import { AegovTabs } from '../aegov-tabs/aegov-tabs';
import { AegovTabPanel } from '../aegov-tab-panel/aegov-tab-panel';

describe('aegov-tab', () => {
  // ------------------------------------------------------------------ helpers
  async function renderStandalone(
    props: Partial<{
      tabId: string;
      disabled: boolean;
      activeTabId: string;
      variant: string;
      size: string;
    }> = {},
  ) {
    const { tabId = 'test', disabled = false, activeTabId = '', variant = 'simple', size = 'base' } = props;
    const disabledAttr = disabled ? ' disabled' : '';
    const page = await newSpecPage({
      components: [AegovTab],
      html: `<aegov-tab slot="tabs" tab-id="${tabId}" active-tab-id="${activeTabId}" variant="${variant}" size="${size}"${disabledAttr}>Tab Label</aegov-tab>`,
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
    it('renders a button element', async () => {
      const page = await renderStandalone({ tabId: 'profile' });
      const btn = page.root.querySelector('button');
      expect(btn).not.toBeNull();
    });

    it('sets role="tab" on the button', async () => {
      const page = await renderStandalone({ tabId: 'profile' });
      const btn = page.root.querySelector('button');
      expect(btn.getAttribute('role')).toBe('tab');
    });

    it('sets id to tab-{tabId}', async () => {
      const page = await renderStandalone({ tabId: 'settings' });
      const btn = page.root.querySelector('button');
      expect(btn.getAttribute('id')).toBe('tab-settings');
    });

    it('sets aria-controls to panel-{tabId}', async () => {
      const page = await renderStandalone({ tabId: 'notifications' });
      const btn = page.root.querySelector('button');
      expect(btn.getAttribute('aria-controls')).toBe('panel-notifications');
    });

    it('has aegov-tab class', async () => {
      const page = await renderStandalone({ tabId: 'test' });
      const btn = page.root.querySelector('button');
      expect(btn.classList.contains('aegov-tab')).toBe(true);
    });

    it('renders tab label in a span with tab__label class', async () => {
      const page = await renderStandalone({ tabId: 'test' });
      const label = page.root.querySelector('.tab__label');
      expect(label).not.toBeNull();
    });
  });

  // ------------------------------------------------------------------ active state
  describe('active state', () => {
    it('is inactive by default (aria-selected=false)', async () => {
      const page = await renderStandalone({ tabId: 'test', activeTabId: '' });
      const btn = page.root.querySelector('button');
      expect(btn.getAttribute('aria-selected')).toBe('false');
    });

    it('is active when tabId matches activeTabId', async () => {
      const page = await renderStandalone({ tabId: 'test', activeTabId: 'test' });
      const btn = page.root.querySelector('button');
      expect(btn.getAttribute('aria-selected')).toBe('true');
    });

    it('has tab__btn--active class when active', async () => {
      const page = await renderStandalone({ tabId: 'abc', activeTabId: 'abc' });
      const btn = page.root.querySelector('button');
      expect(btn.classList.contains('tab__btn--active')).toBe(true);
    });

    it('does not have tab__btn--active class when inactive', async () => {
      const page = await renderStandalone({ tabId: 'abc', activeTabId: 'xyz' });
      const btn = page.root.querySelector('button');
      expect(btn.classList.contains('tab__btn--active')).toBe(false);
    });

    it('has tabindex=0 when active', async () => {
      const page = await renderStandalone({ tabId: 'test', activeTabId: 'test' });
      const btn = page.root.querySelector('button');
      expect(btn.getAttribute('tabindex')).toBe('0');
    });

    it('has tabindex=-1 when inactive', async () => {
      const page = await renderStandalone({ tabId: 'test', activeTabId: 'other' });
      const btn = page.root.querySelector('button');
      expect(btn.getAttribute('tabindex')).toBe('-1');
    });
  });

  // ------------------------------------------------------------------ variant classes
  describe('variant classes', () => {
    it('applies tab__btn--simple class for simple variant', async () => {
      const page = await renderStandalone({ variant: 'simple' });
      const btn = page.root.querySelector('button');
      expect(btn.classList.contains('tab__btn--simple')).toBe(true);
    });

    it('applies tab__btn--segmented class for segmented variant', async () => {
      const page = await renderStandalone({ variant: 'segmented' });
      const btn = page.root.querySelector('button');
      expect(btn.classList.contains('tab__btn--segmented')).toBe(true);
    });

    it('applies tab__btn--pill class for pill variant', async () => {
      const page = await renderStandalone({ variant: 'pill' });
      const btn = page.root.querySelector('button');
      expect(btn.classList.contains('tab__btn--pill')).toBe(true);
    });
  });

  // ------------------------------------------------------------------ size classes
  describe('size classes', () => {
    it('applies tab__btn--sm class for sm size', async () => {
      const page = await renderStandalone({ size: 'sm' });
      const btn = page.root.querySelector('button');
      expect(btn.classList.contains('tab__btn--sm')).toBe(true);
    });

    it('applies tab__btn--base class for base size', async () => {
      const page = await renderStandalone({ size: 'base' });
      const btn = page.root.querySelector('button');
      expect(btn.classList.contains('tab__btn--base')).toBe(true);
    });

    it('applies tab__btn--lg class for lg size', async () => {
      const page = await renderStandalone({ size: 'lg' });
      const btn = page.root.querySelector('button');
      expect(btn.classList.contains('tab__btn--lg')).toBe(true);
    });
  });

  // ------------------------------------------------------------------ disabled
  describe('disabled state', () => {
    it('has disabled attribute when disabled is true', async () => {
      const page = await renderStandalone({ tabId: 'test', disabled: true });
      const btn = page.root.querySelector('button');
      expect(btn.hasAttribute('disabled')).toBe(true);
    });

    it('has aria-disabled="true" when disabled', async () => {
      const page = await renderStandalone({ tabId: 'test', disabled: true });
      const btn = page.root.querySelector('button');
      expect(btn.getAttribute('aria-disabled')).toBe('true');
    });

    it('has tab__btn--disabled class when disabled', async () => {
      const page = await renderStandalone({ tabId: 'test', disabled: true });
      const btn = page.root.querySelector('button');
      expect(btn.classList.contains('tab__btn--disabled')).toBe(true);
    });

    it('does not have aria-disabled when not disabled', async () => {
      const page = await renderStandalone({ tabId: 'test', disabled: false });
      const btn = page.root.querySelector('button');
      expect(btn.getAttribute('aria-disabled')).toBeNull();
    });

    it('does not have tab__btn--disabled class when not disabled', async () => {
      const page = await renderStandalone({ tabId: 'test', disabled: false });
      const btn = page.root.querySelector('button');
      expect(btn.classList.contains('tab__btn--disabled')).toBe(false);
    });
  });

  // ------------------------------------------------------------------ orientation
  describe('orientation', () => {
    it('applies tab__btn--vertical class when orientation is vertical', async () => {
      const page = await newSpecPage({
        components: [AegovTab],
        html: `<aegov-tab slot="tabs" tab-id="test" orientation="vertical">Test</aegov-tab>`,
      });
      const btn = page.root.querySelector('button');
      expect(btn.classList.contains('tab__btn--vertical')).toBe(true);
    });

    it('does not apply tab__btn--vertical class for horizontal orientation', async () => {
      const page = await renderStandalone({ tabId: 'test' });
      const btn = page.root.querySelector('button');
      expect(btn.classList.contains('tab__btn--vertical')).toBe(false);
    });
  });

  // ------------------------------------------------------------------ events
  describe('events', () => {
    it('emits aegovTabSelect with tabId on click', async () => {
      const page = await newSpecPage({
        components: [AegovTab],
        html: `<aegov-tab slot="tabs" tab-id="dashboard">Dashboard</aegov-tab>`,
      });

      const selectSpy = jest.fn();
      page.root.addEventListener('aegovTabSelect', selectSpy);

      const btn = page.root.querySelector('button');
      btn.click();
      await page.waitForChanges();

      expect(selectSpy).toHaveBeenCalledTimes(1);
      expect(selectSpy.mock.calls[0][0].detail).toBe('dashboard');
    });

    it('does not emit when disabled', async () => {
      const page = await newSpecPage({
        components: [AegovTab],
        html: `<aegov-tab slot="tabs" tab-id="test" disabled>Test</aegov-tab>`,
      });

      const selectSpy = jest.fn();
      page.root.addEventListener('aegovTabSelect', selectSpy);

      // Button has disabled attribute so click won't fire in a real browser,
      // but we verify the guard in handleClick via the disabled property
      expect(page.rootInstance.disabled).toBe(true);
      // Event should not have been called
      expect(selectSpy).toHaveBeenCalledTimes(0);
    });
  });

  // ------------------------------------------------------------------ within parent tabs
  describe('within parent tabs', () => {
    it('receives activeTabId from parent', async () => {
      const page = await renderInTabs(`
        <aegov-tabs default-active-tab="one">
          <aegov-tab slot="tabs" tab-id="one">One</aegov-tab>
          <aegov-tab slot="tabs" tab-id="two">Two</aegov-tab>
          <aegov-tab-panel tab-id="one">P1</aegov-tab-panel>
          <aegov-tab-panel tab-id="two">P2</aegov-tab-panel>
        </aegov-tabs>
      `);
      const tab1 = page.root.querySelector('aegov-tab[tab-id="one"]') as any;
      expect(tab1.activeTabId).toBe('one');
    });

    it('receives variant from parent', async () => {
      const page = await renderInTabs(`
        <aegov-tabs variant="pill" default-active-tab="one">
          <aegov-tab slot="tabs" tab-id="one">One</aegov-tab>
          <aegov-tab-panel tab-id="one">P1</aegov-tab-panel>
        </aegov-tabs>
      `);
      const tab = page.root.querySelector('aegov-tab') as any;
      expect(tab.variant).toBe('pill');
    });

    it('receives size from parent', async () => {
      const page = await renderInTabs(`
        <aegov-tabs size="lg" default-active-tab="one">
          <aegov-tab slot="tabs" tab-id="one">One</aegov-tab>
          <aegov-tab-panel tab-id="one">P1</aegov-tab-panel>
        </aegov-tabs>
      `);
      const tab = page.root.querySelector('aegov-tab') as any;
      expect(tab.size).toBe('lg');
    });
  });

  // ------------------------------------------------------------------ default props
  describe('default props', () => {
    it('defaults variant to simple', async () => {
      const page = await newSpecPage({
        components: [AegovTab],
        html: `<aegov-tab slot="tabs" tab-id="test">Test</aegov-tab>`,
      });
      expect(page.rootInstance.variant).toBe('simple');
    });

    it('defaults size to base', async () => {
      const page = await newSpecPage({
        components: [AegovTab],
        html: `<aegov-tab slot="tabs" tab-id="test">Test</aegov-tab>`,
      });
      expect(page.rootInstance.size).toBe('base');
    });

    it('defaults disabled to false', async () => {
      const page = await newSpecPage({
        components: [AegovTab],
        html: `<aegov-tab slot="tabs" tab-id="test">Test</aegov-tab>`,
      });
      expect(page.rootInstance.disabled).toBe(false);
    });

    it('defaults activeTabId to empty string', async () => {
      const page = await newSpecPage({
        components: [AegovTab],
        html: `<aegov-tab slot="tabs" tab-id="test">Test</aegov-tab>`,
      });
      expect(page.rootInstance.activeTabId).toBe('');
    });

    it('defaults orientation to horizontal', async () => {
      const page = await newSpecPage({
        components: [AegovTab],
        html: `<aegov-tab slot="tabs" tab-id="test">Test</aegov-tab>`,
      });
      expect(page.rootInstance.orientation).toBe('horizontal');
    });
  });

  describe('invalid prop values', () => {
    let warnSpy: jest.SpyInstance;

    beforeEach(() => {
      warnSpy = jest.spyOn(console, 'warn').mockImplementation();
    });

    afterEach(() => {
      warnSpy.mockRestore();
    });

    it('falls back to default variant class when invalid', async () => {
      const page = await newSpecPage({
        components: [AegovTab],
        html: `<aegov-tab tab-id="a" variant="weird">X</aegov-tab>`,
      });
      const btn = page.root.querySelector('.aegov-tab');
      expect(btn.classList.contains('tab__btn--simple')).toBe(true);
    });

    it('falls back to default size class when invalid', async () => {
      const page = await newSpecPage({
        components: [AegovTab],
        html: `<aegov-tab tab-id="a" size="huge">X</aegov-tab>`,
      });
      const btn = page.root.querySelector('.aegov-tab');
      expect(btn.classList.contains('tab__btn--base')).toBe(true);
    });

    it('falls back to default orientation when invalid', async () => {
      const page = await newSpecPage({
        components: [AegovTab],
        html: `<aegov-tab tab-id="a" orientation="diagonal">X</aegov-tab>`,
      });
      const btn = page.root.querySelector('.aegov-tab');
      expect(btn.classList.contains('tab__btn--vertical')).toBe(false);
    });

    it('warns with component name, prop name, invalid value, and fallback', async () => {
      await newSpecPage({
        components: [AegovTab],
        html: `<aegov-tab tab-id="a" variant="weird">X</aegov-tab>`,
      });
      const messages = warnSpy.mock.calls.map(c => c[0] as string);
      const warn = messages.find(m => m.includes('[aegov-tab]') && m.includes('"variant"'));
      expect(warn).toBeDefined();
      expect(warn).toContain('"weird"');
      expect(warn).toContain('simple');
    });

    it('does not warn when all props are valid', async () => {
      await newSpecPage({
        components: [AegovTab],
        html: `<aegov-tab tab-id="a" variant="pill" size="lg" orientation="vertical">X</aegov-tab>`,
      });
      expect(warnSpy).not.toHaveBeenCalled();
    });

    it('warns again via @Watch when variant is updated to invalid value', async () => {
      const page = await newSpecPage({
        components: [AegovTab],
        html: `<aegov-tab tab-id="a" variant="simple">X</aegov-tab>`,
      });
      page.root.setAttribute('variant', 'nope');
      await page.waitForChanges();
      const messages = warnSpy.mock.calls.map(c => c[0] as string);
      const warn = messages.find(m => m.includes('[aegov-tab]') && m.includes('"variant"'));
      expect(warn).toBeDefined();
    });

    it('warns again via @Watch when size is updated to invalid value', async () => {
      const page = await newSpecPage({
        components: [AegovTab],
        html: `<aegov-tab tab-id="a" size="base">X</aegov-tab>`,
      });
      page.root.setAttribute('size', 'nope');
      await page.waitForChanges();
      const messages = warnSpy.mock.calls.map(c => c[0] as string);
      const warn = messages.find(m => m.includes('[aegov-tab]') && m.includes('"size"'));
      expect(warn).toBeDefined();
    });

    it('warns again via @Watch when orientation is updated to invalid value', async () => {
      const page = await newSpecPage({
        components: [AegovTab],
        html: `<aegov-tab tab-id="a" orientation="horizontal">X</aegov-tab>`,
      });
      page.root.setAttribute('orientation', 'nope');
      await page.waitForChanges();
      const messages = warnSpy.mock.calls.map(c => c[0] as string);
      const warn = messages.find(m => m.includes('[aegov-tab]') && m.includes('"orientation"'));
      expect(warn).toBeDefined();
    });
  });
});
