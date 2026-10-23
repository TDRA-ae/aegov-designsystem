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

  it('passes through aria-labelledby attribute', async () => {
    const page = await newSpecPage({
      components: [AegovModal],
      html: `<aegov-modal is-open="true" aria-labelledby="title-id"></aegov-modal>`,
    });
    const dialog = page.root.shadowRoot.querySelector('[role="dialog"]');
    expect(dialog.getAttribute('aria-labelledby')).toBe('title-id');
  });

  /**
   * Portal while open (#14): the host only moves to document.body while open,
   * leaving a comment placeholder at its declared position, and returns there
   * on close. While moved, the declared parent's removeChild/insertBefore
   * treat the host as if it were still in place, so a framework that owns the
   * element (React) can keep addressing it there.
   */
  describe('portal to body while open', () => {
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
    const close = async (page, host) => { host.isOpen = false; await page.waitForChanges(); };

    it('stays where it was declared while closed', async () => {
      const { wrap, host } = await setup();
      expect(host.parentNode === wrap).toBe(true);
      expect(comments(wrap)).toBe(0);
    });

    it('moves to body when opened and back to its declared position when closed', async () => {
      const { page, wrap, host } = await setup();
      await open(page, host);
      expect(host.parentNode && (host.parentNode as any).nodeName).toBe('BODY');
      expect(comments(wrap)).toBe(1);
      await close(page, host);
      expect(host.parentNode === wrap).toBe(true);
      expect(wrap.lastElementChild === host).toBe(true);
      expect(comments(wrap)).toBe(0);
    });

    it('lets the declared parent remove it while open (React unmount) without throwing', async () => {
      const { page, wrap, host } = await setup();
      await open(page, host);
      expect(() => wrap.removeChild(host)).not.toThrow();
      expect(host.parentNode == null).toBe(true);
      expect(comments(wrap)).toBe(0);
      expect(Object.prototype.hasOwnProperty.call(wrap, 'removeChild')).toBe(false);
    });

    it('lets the declared parent insert a sibling before it while open', async () => {
      const { page, wrap, host } = await setup();
      await open(page, host);
      const p = page.doc.createElement('p');
      p.id = 'sib';
      expect(() => wrap.insertBefore(p, host)).not.toThrow();
      await close(page, host);
      expect(Array.from(wrap.children).map(c => c.id || c.tagName.toLowerCase())).toEqual(['before', 'sib', 'aegov-modal']);
    });
  });
});
