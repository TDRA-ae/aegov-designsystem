import { newE2EPage } from '@stencil/core/testing';

/**
 * aegov-modal and aegov-drawer open where they were declared unless an ancestor
 * traps their fixed backdrop and panel; then they move out of the outermost such
 * ancestor only (document.body is the last resort). Staying inside the app's root
 * is what lets React handlers inside them work.
 */
for (const tag of ['aegov-modal', 'aegov-drawer']) {
  describe(`${tag} placement while open`, () => {
    const markup = (wrapper: string) => `
      <div id="app">
        <span id="before"></span>
        ${wrapper.replace('{overlay}', `<${tag} label="Overlay" animation="none"><button id="inside">Inside</button></${tag}>`)}
      </div>`;

    const openAndRead = async (page) => {
      await page.$eval(tag, (el: any) => el.show());
      await page.waitForChanges();
      await page.waitForFunction((tag) => (document.querySelector(tag) as any).isOpen, {}, tag);
      return page.evaluate((tag) => {
        const host = document.querySelector(tag)!;
        const backdrop = host.shadowRoot!.querySelector('[class*="backdrop"]') as HTMLElement | null;
        const r = backdrop?.getBoundingClientRect();
        // The topmost element at the viewport centre must be part of the overlay.
        const centre = document.elementFromPoint(innerWidth / 2, innerHeight / 2);
        return {
          parent: (host.parentNode as Element)?.id || (host.parentNode as Element)?.localName,
          coversViewport: !!r && r.width >= innerWidth - 1 && r.height >= innerHeight - 1,
          onTop: centre === host || host.contains(centre),
        };
      }, tag);
    };

    const closeAndWait = async (page) => {
      await page.$eval(tag, (el: any) => el.close());
      await page.waitForFunction((tag) => !(document.querySelector(tag) as any).isOpen
        && !document.querySelector(tag)!.parentElement!.matches('body, #app'), {}, tag);
    };

    it('opens in place when no ancestor traps it', async () => {
      const page = await newE2EPage();
      await page.setContent(markup('<div id="wrap">{overlay}</div>'));
      const open = await openAndRead(page);
      expect(open.parent).toBe('wrap');
      expect(open.coversViewport).toBe(true);
      expect(open.onTop).toBe(true);
      const comments = await page.$eval('#wrap', (w) => Array.from(w.childNodes).filter(n => n.nodeType === 8).length);
      expect(comments).toBe(0);
    });

    it('moves out of a transformed ancestor to that ancestor\'s parent, not body, and back on close', async () => {
      const page = await newE2EPage();
      await page.setContent(markup('<div id="wrap" style="transform: translateX(0)">{overlay}</div>'));
      const open = await openAndRead(page);
      expect(open.parent).toBe('app');
      expect(open.coversViewport).toBe(true);
      expect(open.onTop).toBe(true);
      await closeAndWait(page);
      expect(await page.$eval(tag, (h) => h.parentElement!.id)).toBe('wrap');
    });

    it('moves out of the outermost trapping ancestor', async () => {
      const page = await newE2EPage();
      await page.setContent(markup(
        '<section id="outer" style="position: relative; z-index: 1"><div id="inner" style="filter: blur(0)">{overlay}</div></section>' +
        '<div id="later" style="position: relative; z-index: 2; height: 100vh"></div>'));
      const open = await openAndRead(page);
      expect(open.parent).toBe('app');
      // #later (z-index 2) would cover an overlay left inside #outer (z-index 1).
      expect(open.onTop).toBe(true);
    });

    it('moves out of a hidden ancestor so it shows', async () => {
      const page = await newE2EPage();
      await page.setContent(markup('<div id="wrap" hidden>{overlay}</div>'));
      const open = await openAndRead(page);
      expect(open.parent).toBe('app');
      expect(open.coversViewport).toBe(true);
    });

    it('falls back to body when the trapping ancestor is a child of body', async () => {
      const page = await newE2EPage();
      await page.setContent(`<div id="root" style="isolation: isolate"><div id="wrap">${markup('{overlay}')}</div></div>`);
      const open = await openAndRead(page);
      expect(open.parent).toBe('body');
    });

    it('lets the declared parent remove it while moved (React unmount) without throwing', async () => {
      const page = await newE2EPage();
      await page.setContent(markup('<div id="wrap" style="transform: translateX(0)">{overlay}</div>'));
      await openAndRead(page);
      const result = await page.evaluate((tag) => {
        const wrap = document.getElementById('wrap')!;
        const host = document.querySelector(tag)!;
        let threw = false;
        try { wrap.removeChild(host); } catch { threw = true; }
        return {
          threw,
          detached: host.parentNode == null,
          comments: Array.from(wrap.childNodes).filter(n => n.nodeType === 8).length,
          patched: Object.prototype.hasOwnProperty.call(wrap, 'removeChild'),
        };
      }, tag);
      expect(result).toEqual({ threw: false, detached: true, comments: 0, patched: false });
    });

    it('lets the declared parent insert a sibling before it while moved', async () => {
      const page = await newE2EPage();
      await page.setContent(markup('<div id="wrap" style="transform: translateX(0)"><span id="first"></span>{overlay}</div>'));
      await openAndRead(page);
      await page.evaluate((tag) => {
        const p = document.createElement('p');
        p.id = 'sib';
        document.getElementById('wrap')!.insertBefore(p, document.querySelector(tag));
      }, tag);
      await closeAndWait(page);
      const order = await page.$eval('#wrap', (w) => Array.from(w.children).map(c => c.id || c.localName));
      expect(order).toEqual(['first', 'sib', tag]);
    });
  });
}
