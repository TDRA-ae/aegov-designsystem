import { newSpecPage } from '@stencil/core/testing';
import { AegovModal } from './aegov-modal';

describe('aegov-modal', () => {
  it('does not render content when closed', async () => {
    const page = await newSpecPage({
      components: [AegovModal],
      html: `<aegov-modal></aegov-modal>`,
    });
    expect(page.root.shadowRoot.querySelector('.aegov-modal-backdrop')).toBeNull();
  });

  it('renders backdrop and dialog when open', async () => {
    const page = await newSpecPage({
      components: [AegovModal],
      html: `<aegov-modal is-open="true"><p>Body</p></aegov-modal>`,
    });
    const backdrop = page.root.shadowRoot.querySelector('.aegov-modal-backdrop');
    const dialog = page.root.shadowRoot.querySelector('[role="dialog"]');
    expect(backdrop).not.toBeNull();
    expect(dialog).not.toBeNull();
    expect(dialog.getAttribute('aria-modal')).toBe('true');
  });

  it('auto-generates fieldId', async () => {
    const page = await newSpecPage({
      components: [AegovModal],
      html: `<aegov-modal is-open="true"></aegov-modal>`,
    });
    expect(page.rootInstance.fieldId).toMatch(/^aegov-modal-\d+$/);
  });

  it('respects user-provided fieldId', async () => {
    const page = await newSpecPage({
      components: [AegovModal],
      html: `<aegov-modal is-open="true" field-id="my-modal"></aegov-modal>`,
    });
    expect(page.rootInstance.fieldId).toBe('my-modal');
    expect(page.root.shadowRoot.querySelector('#my-modal')).not.toBeNull();
  });

  it('applies center position class by default', async () => {
    const page = await newSpecPage({
      components: [AegovModal],
      html: `<aegov-modal is-open="true"></aegov-modal>`,
    });
    expect(page.root.shadowRoot.querySelector('.modal-container--center')).not.toBeNull();
  });

  it('applies top position class', async () => {
    const page = await newSpecPage({
      components: [AegovModal],
      html: `<aegov-modal is-open="true" position="top"></aegov-modal>`,
    });
    expect(page.root.shadowRoot.querySelector('.modal-container--top')).not.toBeNull();
  });

  it('applies bottom position class', async () => {
    const page = await newSpecPage({
      components: [AegovModal],
      html: `<aegov-modal is-open="true" position="bottom"></aegov-modal>`,
    });
    expect(page.root.shadowRoot.querySelector('.modal-container--bottom')).not.toBeNull();
  });

  it('applies size classes', async () => {
    const page = await newSpecPage({
      components: [AegovModal],
      html: `<aegov-modal is-open="true" size="lg"></aegov-modal>`,
    });
    expect(page.root.shadowRoot.querySelector('.modal-size-lg')).not.toBeNull();
  });

  it('applies overlay opacity classes', async () => {
    const page = await newSpecPage({
      components: [AegovModal],
      html: `<aegov-modal is-open="true" overlay-opacity="dark"></aegov-modal>`,
    });
    expect(page.root.shadowRoot.querySelector('.modal-backdrop--dark')).not.toBeNull();
  });

  it('applies padding class by default', async () => {
    const page = await newSpecPage({
      components: [AegovModal],
      html: `<aegov-modal is-open="true"></aegov-modal>`,
    });
    expect(page.root.shadowRoot.querySelector('.modal--padded')).not.toBeNull();
  });

  it('omits padding class when is-padding=false', async () => {
    const page = await newSpecPage({
      components: [AegovModal],
      html: `<aegov-modal is-open="true" is-padding="false"></aegov-modal>`,
    });
    expect(page.root.shadowRoot.querySelector('.modal--padded')).toBeNull();
  });

  it('emits aegovModalOpen when isOpen toggles to true', async () => {
    const page = await newSpecPage({
      components: [AegovModal],
      html: `<aegov-modal></aegov-modal>`,
    });
    const spy = jest.fn();
    page.root.addEventListener('aegovModalOpen', spy);
    page.rootInstance.isOpen = true;
    await page.waitForChanges();
    expect(spy).toHaveBeenCalled();
  });

  it('show() method opens the modal', async () => {
    const page = await newSpecPage({
      components: [AegovModal],
      html: `<aegov-modal></aegov-modal>`,
    });
    await page.rootInstance.show();
    expect(page.rootInstance.isOpen).toBe(true);
  });

  it('toggle() method flips state', async () => {
    const page = await newSpecPage({
      components: [AegovModal],
      html: `<aegov-modal></aegov-modal>`,
    });
    await page.rootInstance.toggle();
    expect(page.rootInstance.isOpen).toBe(true);
    await page.rootInstance.toggle();
    expect(page.rootInstance.isOpen).toBe(false);
  });

  it('emits a cancellable aegovModalBeforeClose on close()', async () => {
    const page = await newSpecPage({
      components: [AegovModal],
      html: `<aegov-modal is-open="true"></aegov-modal>`,
    });
    const spy = jest.fn();
    page.root.addEventListener('aegovModalBeforeClose', spy);
    await page.rootInstance.close();
    expect(spy).toHaveBeenCalled();
    // Cancelled via preventDefault() on the event itself, not a closure in detail.
    const event = spy.mock.calls[0][0];
    expect(event.cancelable).toBe(true);
    expect(event.detail?.preventDefault).toBeUndefined();
  });

  // GitHub #57: the ID can't resolve inside the shadow root, so the dialog gets the heading's text.
  it('names the dialog from the host aria-labelledby heading, not a raw ID it cannot resolve', async () => {
    const page = await newSpecPage({
      components: [AegovModal],
      html: `<aegov-modal is-open="true" aria-labelledby="title-id"><h2 id="title-id">Delete this application?</h2></aegov-modal>`,
    });
    const dialog = page.root.shadowRoot.querySelector('[role="dialog"]');
    expect(dialog.getAttribute('aria-labelledby')).toBeNull();
    expect(dialog.getAttribute('aria-label')).toBe('Delete this application?');
  });

  /**
   * Move while open, only when trapped (#14): with no ancestor that traps its
   * fixed layers the host opens where it was declared (inside the app's root,
   * so React handlers work). The move out of a trapping ancestor, and how the
   * declared parent keeps addressing a moved host, need real computed styles:
   * see src/utils/portal-manager.e2e.ts.
   */
  describe('opens in place unless trapped', () => {
    const comments = (n: Node) => Array.from(n.childNodes).filter(c => c.nodeType === 8).length;
    const setup = async () => {
      const page = await newSpecPage({
        components: [AegovModal],
        html: `<div id="wrap"><span id="before"></span><aegov-modal label="x"><p>Body</p></aegov-modal></div>`,
      });
      const wrap = page.body.querySelector('#wrap') as HTMLElement;
      const host = page.body.querySelector('aegov-modal') as any;
      return { page, wrap, host };
    };
    const open = async (page, host) => { host.isOpen = true; await page.waitForChanges(); };

    it('stays where it was declared while closed', async () => {
      const { wrap, host } = await setup();
      expect(host.parentNode === wrap).toBe(true);
      expect(comments(wrap)).toBe(0);
    });

    it('opens where it was declared when no ancestor traps it', async () => {
      const { page, wrap, host } = await setup();
      await open(page, host);
      expect(host.parentNode === wrap).toBe(true);
      expect(comments(wrap)).toBe(0);
    });
  });
});
