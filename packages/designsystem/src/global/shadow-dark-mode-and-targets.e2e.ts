import { newE2EPage } from '@stencil/core/testing';
import { themeColours } from '../utils/e2e-theme';

/**
 * Regression tests for four fixes:
 *  1. Dark mode reaches into shadow DOM through the --aegov-* colour-token custom
 *     properties set on .dark in global.css (dark: variants and
 *     :host-context(.dark) don't work there in every browser).
 *  2. Checkbox and radio rows are at least 24 px tall (WCAG 2.2 SC 2.5.8).
 *  3. An unpinned drawer never grows wider than the screen.
 *  4. The callout's dismiss icon is the Phosphor "x" on a 256 grid.
 */

/** Resolves a CSS colour to the browser's computed form, for comparison. */
const COMPUTE = `(colour) => { const p = document.createElement('div'); p.style.color = colour; document.body.appendChild(p); const c = getComputedStyle(p).color; p.remove(); return c; }`;

describe('dark mode inside shadow DOM', () => {
  async function colours(isDark: boolean) {
    const page = await newE2EPage();
    await page.setContent(`
      <aegov-checkbox label="Checkbox" hint="Hint"></aegov-checkbox>
      <aegov-radio label="Radio" hint="Hint"></aegov-radio>
      <aegov-toggle label="Toggle" hint="Hint"></aegov-toggle>
      <aegov-modal is-open="true"><p>Modal</p></aegov-modal>
    `);
    await page.addStyleTag({ content: themeColours() });
    if (isDark) await page.evaluate(() => document.documentElement.classList.add('dark'));
    await page.waitForChanges();
    return page.evaluate(`(() => {
      const compute = ${COMPUTE};
      const pick = (host, sel, prop) => getComputedStyle(document.querySelector(host).shadowRoot.querySelector(sel))[prop];
      return {
        checkboxLabel: pick('aegov-checkbox', '.checkbox__label-text', 'color'),
        checkboxHint: pick('aegov-checkbox', '.checkbox__hint', 'color'),
        radioLabel: pick('aegov-radio', '.radio__label-text', 'color'),
        toggleLabel: pick('aegov-toggle', '.toggle__label-text', 'color'),
        modalSurface: pick('aegov-modal', '.aegov-modal-content', 'backgroundColor'),
        lightText: compute('oklch(0.2936 0.0112 271.01)'),  // aeblack-800
        darkText: compute('oklch(0.991 0 0)'),               // whitely-100
        darkMuted: compute('oklch(0.7081 0.008 260.73)'),    // aeblack-300
        lightSurface: compute('oklch(1 0 0)'),               // whitely-50
        darkSurface: compute('oklch(0.226 0.0083 264.39)'),  // aeblack-900
      };
    })()`) as Promise<Record<string, string>>;
  }

  it('uses the light colours without .dark', async () => {
    const c = await colours(false);
    expect(c.checkboxLabel).toBe(c.lightText);
    expect(c.radioLabel).toBe(c.lightText);
    expect(c.toggleLabel).toBe(c.lightText);
    expect(c.modalSurface).toBe(c.lightSurface);
  });

  it('switches label, hint and panel colours with .dark on an ancestor', async () => {
    const c = await colours(true);
    expect(c.checkboxLabel).toBe(c.darkText);
    expect(c.checkboxHint).toBe(c.darkMuted);
    expect(c.radioLabel).toBe(c.darkText);
    expect(c.toggleLabel).toBe(c.darkText);
    expect(c.modalSurface).toBe(c.darkSurface);
  });

  it('gives the range tooltip body and arrow the same colour in dark mode', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-range value="40" display="tooltip"></aegov-range>`);
    await page.addStyleTag({ content: themeColours() });
    await page.evaluate(() => document.documentElement.classList.add('dark'));
    await page.waitForChanges();
    const { body, arrow } = await page.evaluate(() => {
      const tip = document.querySelector('aegov-range')!.shadowRoot!.querySelector('.range__tooltip') as HTMLElement;
      return { body: getComputedStyle(tip).backgroundColor, arrow: getComputedStyle(tip, '::after').borderTopColor };
    });
    expect(arrow).toBe(body);
  });

  it('switches with .dark on any ancestor, not only <html>', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <section class="dark"><aegov-checkbox id="inside" label="Inside"></aegov-checkbox></section>
      <aegov-checkbox id="outside" label="Outside"></aegov-checkbox>
    `);
    await page.addStyleTag({ content: themeColours() });
    await page.waitForChanges();
    const c = await page.evaluate(`(() => {
      const compute = ${COMPUTE};
      const label = id => getComputedStyle(document.getElementById(id).shadowRoot.querySelector('.checkbox__label-text')).color;
      return { inside: label('inside'), outside: label('outside'),
               darkText: compute('oklch(0.991 0 0)'), lightText: compute('oklch(0.2936 0.0112 271.01)') };
    })()`) as Record<string, string>;
    expect(c.inside).toBe(c.darkText);
    expect(c.outside).toBe(c.lightText);
  });

  it('lets a project override a token', async () => {
    const page = await newE2EPage();
    await page.setContent(`
      <style>.dark { --aegov-surface: rgb(0, 0, 0); }</style>
      <aegov-modal is-open="true"><p>Modal</p></aegov-modal>
    `);
    await page.addStyleTag({ content: themeColours() });
    await page.evaluate(() => document.documentElement.classList.add('dark'));
    await page.waitForChanges();
    const surface = await page.evaluate(() =>
      getComputedStyle(document.querySelector('aegov-modal')!.shadowRoot!.querySelector('.aegov-modal-content') as HTMLElement).backgroundColor);
    expect(surface).toBe('rgb(0, 0, 0)');
  });
});

describe('checkbox and radio touch target', () => {
  for (const tag of ['aegov-checkbox', 'aegov-radio']) {
    for (const size of ['xs', 'sm', 'base']) {
      it(`${tag} size="${size}" row is at least 24px tall`, async () => {
        const page = await newE2EPage();
        await page.setContent(`<${tag} size="${size}" label="Option"></${tag}>`);
        await page.addStyleTag({ content: themeColours() });
        const height = await page.evaluate((t: string) => {
          const wrapper = document.querySelector(t)!.shadowRoot!.querySelector('label') as HTMLElement;
          return wrapper.getBoundingClientRect().height;
        }, tag);
        expect(height).toBeGreaterThanOrEqual(24);
      });
    }
  }
});

describe('unpinned drawer width', () => {
  it('an unpinned xl drawer fits a 393px wide screen', async () => {
    const page = await newE2EPage();
    await page.setViewport({ width: 393, height: 800 });
    await page.setContent(`<aegov-drawer is-open="true" size="xl" is-pinned="false" animation="none"><p>Drawer</p></aegov-drawer>`);
    await page.addStyleTag({ content: themeColours() });
    await page.waitForChanges();
    const { left, right } = await page.evaluate(() => {
      const panel = document.querySelector('aegov-drawer')!.shadowRoot!.querySelector('.aegov-drawer-container') as HTMLElement;
      const r = panel.getBoundingClientRect();
      return { left: r.left, right: r.right };
    });
    expect(left).toBeGreaterThanOrEqual(0);
    expect(right).toBeLessThanOrEqual(393);
  });
});

describe('callout dismiss icon', () => {
  it('uses the Phosphor "x" on a 256 grid', async () => {
    const page = await newE2EPage();
    await page.setContent(`<aegov-callout is-dismissible="true">Message</aegov-callout>`);
    await page.addStyleTag({ content: themeColours() });
    const viewBox = await page.evaluate(() => {
      const host = document.querySelector('aegov-callout')!;
      const svg = (host.shadowRoot ?? host).querySelector('.callout__dismiss svg');
      return svg?.getAttribute('viewBox');
    });
    expect(viewBox).toBe('0 0 256 256');
  });
});
