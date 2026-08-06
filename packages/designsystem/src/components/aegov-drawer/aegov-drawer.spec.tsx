import { newSpecPage } from '@stencil/core/testing';
import { AegovDrawer } from './aegov-drawer';

describe('aegov-drawer', () => {
  it('does not render content when closed', async () => {
    const page = await newSpecPage({
      components: [AegovDrawer],
      html: `<aegov-drawer></aegov-drawer>`,
    });
    expect(page.root.shadowRoot.querySelector('[role="dialog"]')).toBeNull();
  });

  it('renders dialog with role and aria-modal when open', async () => {
    const page = await newSpecPage({
      components: [AegovDrawer],
      html: `<aegov-drawer is-open="true"><p>Body</p></aegov-drawer>`,
    });
    const dialog = page.root.shadowRoot.querySelector('[role="dialog"]');
    expect(dialog).not.toBeNull();
    expect(dialog.getAttribute('aria-modal')).toBe('true');
  });

  it('auto-generates fieldId', async () => {
    const page = await newSpecPage({
      components: [AegovDrawer],
      html: `<aegov-drawer is-open="true"></aegov-drawer>`,
    });
    expect(page.rootInstance.fieldId).toMatch(/^aegov-drawer-\d+$/);
  });

  it('applies right position class by default', async () => {
    const page = await newSpecPage({
      components: [AegovDrawer],
      html: `<aegov-drawer is-open="true"></aegov-drawer>`,
    });
    expect(page.root.shadowRoot.querySelector('.drawer-container--right')).not.toBeNull();
  });

  it('applies left position class', async () => {
    const page = await newSpecPage({
      components: [AegovDrawer],
      html: `<aegov-drawer is-open="true" position="left"></aegov-drawer>`,
    });
    expect(page.root.shadowRoot.querySelector('.drawer-container--left')).not.toBeNull();
  });

  it('applies top and bottom position classes', async () => {
    const top = await newSpecPage({
      components: [AegovDrawer],
      html: `<aegov-drawer is-open="true" position="top"></aegov-drawer>`,
    });
    expect(top.root.shadowRoot.querySelector('.drawer-container--top')).not.toBeNull();

    const bot = await newSpecPage({
      components: [AegovDrawer],
      html: `<aegov-drawer is-open="true" position="bottom"></aegov-drawer>`,
    });
    expect(bot.root.shadowRoot.querySelector('.drawer-container--bottom')).not.toBeNull();
  });

  it('applies size classes', async () => {
    const page = await newSpecPage({
      components: [AegovDrawer],
      html: `<aegov-drawer is-open="true" size="lg"></aegov-drawer>`,
    });
    expect(page.root.shadowRoot.querySelector('.drawer-size-lg')).not.toBeNull();
  });

  it('applies unpinned modifier when is-pinned=false', async () => {
    const page = await newSpecPage({
      components: [AegovDrawer],
      html: `<aegov-drawer is-open="true" is-pinned="false"></aegov-drawer>`,
    });
    expect(page.root.shadowRoot.querySelector('.drawer-container--unpinned')).not.toBeNull();
  });

  it('renders backdrop when is-overlay=true (default)', async () => {
    const page = await newSpecPage({
      components: [AegovDrawer],
      html: `<aegov-drawer is-open="true"></aegov-drawer>`,
    });
    expect(page.root.shadowRoot.querySelector('.aegov-drawer-backdrop')).not.toBeNull();
  });

  it('omits visible backdrop when is-overlay=false', async () => {
    const page = await newSpecPage({
      components: [AegovDrawer],
      html: `<aegov-drawer is-open="true" is-overlay="false"></aegov-drawer>`,
    });
    expect(page.root.shadowRoot.querySelector('.aegov-drawer-backdrop')).toBeNull();
  });

  it('applies overlay opacity classes', async () => {
    const page = await newSpecPage({
      components: [AegovDrawer],
      html: `<aegov-drawer is-open="true" overlay-opacity="dark"></aegov-drawer>`,
    });
    expect(page.root.shadowRoot.querySelector('.drawer-backdrop--dark')).not.toBeNull();
  });

  it('reflects animation attribute', async () => {
    const page = await newSpecPage({
      components: [AegovDrawer],
      html: `<aegov-drawer is-open="true" animation="fade"></aegov-drawer>`,
    });
    const dialog = page.root.shadowRoot.querySelector('[role="dialog"]');
    expect(dialog.getAttribute('data-animation')).toBe('fade');
  });

  it('applies padding class by default', async () => {
    const page = await newSpecPage({
      components: [AegovDrawer],
      html: `<aegov-drawer is-open="true"></aegov-drawer>`,
    });
    expect(page.root.shadowRoot.querySelector('.drawer--padded')).not.toBeNull();
  });

  it('emits aegovDrawerOpen on open', async () => {
    const page = await newSpecPage({
      components: [AegovDrawer],
      html: `<aegov-drawer></aegov-drawer>`,
    });
    const spy = jest.fn();
    page.root.addEventListener('aegovDrawerOpen', spy);
    page.rootInstance.isOpen = true;
    await page.waitForChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('show() opens the drawer', async () => {
    const page = await newSpecPage({
      components: [AegovDrawer],
      html: `<aegov-drawer></aegov-drawer>`,
    });
    await page.rootInstance.show();
    expect(page.rootInstance.isOpen).toBe(true);
  });

  it('toggle() flips state', async () => {
    const page = await newSpecPage({
      components: [AegovDrawer],
      html: `<aegov-drawer></aegov-drawer>`,
    });
    await page.rootInstance.toggle();
    expect(page.rootInstance.isOpen).toBe(true);
  });

  it('emits aegovDrawerBeforeClose on close()', async () => {
    const page = await newSpecPage({
      components: [AegovDrawer],
      html: `<aegov-drawer is-open="true"></aegov-drawer>`,
    });
    const spy = jest.fn();
    page.root.addEventListener('aegovDrawerBeforeClose', spy);
    await page.rootInstance.close();
    expect(spy).toHaveBeenCalled();
  });

  /**
   * aegovDrawerBeforeClose must stay a cancellable event cancelled via
   * `event.preventDefault()`, matching aegovModalBeforeClose. It previously passed a
   * `preventDefault` closure in `event.detail`, which meant a handler written for the
   * modal silently failed to cancel here — losing the unsaved-changes guard.
   */
  describe('aegovDrawerBeforeClose cancellation', () => {
    it('is a cancelable event', async () => {
      const page = await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer is-open="true"></aegov-drawer>`,
      });

      let received: Event | undefined;
      page.root.addEventListener('aegovDrawerBeforeClose', (e: Event) => { received = e; });
      await page.rootInstance.close();

      expect(received).toBeDefined();
      expect(received!.cancelable).toBe(true);
      // The old contract put a preventDefault closure on the detail; it must not come back.
      expect((received as CustomEvent).detail?.preventDefault).toBeUndefined();
    });

    it('preventDefault() on the event cancels the close', async () => {
      const page = await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer is-open="true"></aegov-drawer>`,
      });

      page.root.addEventListener('aegovDrawerBeforeClose', (e: Event) => e.preventDefault());
      await page.rootInstance.close();
      await page.waitForChanges();

      expect(page.rootInstance.isOpen).toBe(true);
    });

    it('closes normally when the event is not cancelled', async () => {
      const page = await newSpecPage({
        components: [AegovDrawer],
        html: `<aegov-drawer is-open="true"></aegov-drawer>`,
      });

      page.root.addEventListener('aegovDrawerBeforeClose', () => { /* allow */ });
      await page.rootInstance.close();
      await page.waitForChanges();

      expect(page.rootInstance.isOpen).toBe(false);
    });
  });
});
