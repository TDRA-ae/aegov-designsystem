import { newE2EPage, E2EPage } from '@stencil/core/testing';
import { themeColours } from '../utils/e2e-theme';

/**
 * A11Y-FINAL-25: the base `a` focus style fills text links with gold, but a
 * link that is a whole card, image or logo, or an overlay stretched over a
 * card, gets the outline only, so its content stays readable. link-focus.ts
 * marks each focused link with data-aegov-focus="box" | "text"; global.css
 * reads the mark and falls back to markup checks when there is no mark.
 *
 * Plain inline styles on purpose: the script must work for any CSS, not only
 * Tailwind classes.
 */

const LOGO = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='48'%3E%3Crect width='120' height='48' fill='%23b68a35'/%3E%3C/svg%3E`;
const ICON = `<svg width="16" height="16" viewBox="0 0 20 20" aria-hidden="true"><circle cx="10" cy="10" r="8"/></svg>`;
const CARD = 'position:relative;width:300px;min-height:120px;padding:16px;border:1px solid #ccc';

const TEXT_LINKS: Record<string, string> = {
  plain: `<a id="t" href="#">Read the guidelines</a>`,
  'icon and text': `<a id="t" href="#">${ICON}Download PDF</a>`,
  'text and sr-only text': `<a id="t" href="#"><span>External site</span><span class="sr-only">(opens in a new tab)</span></a>`,
  'two spans on one line': `<a id="t" href="#"><span>Section 4</span> <span>Privacy</span></a>`,
  'inline tags': `<a id="t" href="#">Read <strong>more</strong> about <em>tokens</em></a>`,
  'long text wrapping over lines': `<div style="width:160px"><a id="t" href="#">How to effectively optimise your page speed for government services</a></div>`,
  'two lines with br': `<a id="t" href="#">Line one<br>line two</a>`,
  'one div, one line': `<a id="t" href="#"><div>Contact us</div></a>`,
  'block nav link with small padding': `<nav><a id="t" href="#" style="display:block;padding:6px 8px">Overview</a></nav>`,
  'border-bottom underline': `<a id="t" href="#" style="border-bottom:1px solid currentColor">Terms of use</a>`,
  'small absolute link in a corner': `<div style="${CARD}"><a id="t" href="#" style="position:absolute;top:8px;right:8px">Edit</a></div>`,
  'icon-only link': `<a id="t" href="#" aria-label="Facebook"><svg width="24" height="24" viewBox="0 0 20 20" aria-hidden="true"><rect x="2" y="2" width="16" height="16"/></svg></a>`,
  'component link (aegov-btn) keeps its own design': `<a id="t" class="aegov-btn" href="#" style="padding:16px 24px;border:1px solid #ccc">Main site</a>`,
};

const CARD_LINKS: Record<string, string> = {
  'heading and paragraph': `<a id="t" href="#" style="display:block;padding:16px"><h3>Clarity by design</h3><p>Effective government content.</p></a>`,
  'image link': `<a id="t" href="#"><img alt="Example" width="240" height="120" src="${LOGO}"></a>`,
  'logo-sized svg': `<a id="t" href="#" aria-label="Home"><svg width="160" height="56" viewBox="0 0 160 56" aria-hidden="true"><rect width="160" height="56"/></svg></a>`,
  'overlay stretched over a card (plain CSS)': `<div style="${CARD}"><h3>Installation</h3><p>Add the package.</p><a id="t" href="#" style="position:absolute;inset:0"><span class="sr-only">Open Installation</span></a></div>`,
  'padded card with one span': `<a id="t" href="#" style="display:block;padding:24px;border:1px solid #ccc"><span>Open services</span></a>`,
  'bordered tile with icon and text': `<a id="t" href="#" style="display:inline-block;padding:8px 12px;border:1px solid #ccc">${ICON}Report an issue</a>`,
  'previous / next: two spans stacked': `<a id="t" href="#" style="display:flex;flex-direction:column;padding:8px"><span>Previous</span><span>Tooltip</span></a>`,
  'icon box beside two stacked lines': `<a id="t" href="#" style="display:flex;gap:12px"><span>${ICON}</span><span><span style="display:block">Report an issue</span><span style="display:block">Found a bug?</span></span></a>`,
};

async function focusResult(page: E2EPage, dark = false) {
  await page.addStyleTag({ content: themeColours() });
  if (dark) await page.evaluate(() => document.documentElement.classList.add('dark'));
  await page.waitForChanges();
  await page.keyboard.press('Shift'); // keyboard modality, so programmatic focus is :focus-visible
  return page.evaluate(() => {
    const host = document.querySelector('aegov-header');
    const link = (host ? host.shadowRoot!.querySelector('.header__logo') : document.getElementById('t')) as HTMLElement;
    link.focus();
    const style = getComputedStyle(link);
    const filled = style.backgroundColor !== 'rgba(0, 0, 0, 0)';
    return { visible: link.matches(':focus-visible'), mark: link.getAttribute('data-aegov-focus'), filled, outline: `${style.outlineStyle} ${style.outlineWidth}`, color: style.color, background: style.backgroundColor };
  });
}

describe('link focus: text links keep the gold fill', () => {
  for (const [name, html] of Object.entries(TEXT_LINKS)) {
    it(name, async () => {
      const page = await newE2EPage({ html });
      const r = await focusResult(page);
      expect(r.visible).toBe(true);
      expect(r.mark).toBe('text');
      expect(r.outline).toBe('solid 2px');
      if (!name.startsWith('component')) expect(r.filled).toBe(true);
    });
  }
});

describe('link focus: card links get the outline only', () => {
  for (const [name, html] of Object.entries(CARD_LINKS)) {
    it(name, async () => {
      const page = await newE2EPage({ html });
      const r = await focusResult(page);
      expect(r.visible).toBe(true);
      expect(r.mark).toBe('box');
      expect(r.filled).toBe(false);
      expect(r.outline).toBe('solid 2px');
    });
  }

  it('aegov-header logo (slotted image inside shadow DOM)', async () => {
    const page = await newE2EPage({ html: `<aegov-header entity-name="Example" entity-domain="https://example.gov.ae"><img slot="logo" alt="Example logo" width="120" height="48" src="${LOGO}"></aegov-header>` });
    const r = await focusResult(page);
    expect(r.visible).toBe(true);
    expect(r.mark).toBe('box');
    expect(r.filled).toBe(false);
    expect(r.outline).toBe('solid 2px');
  });
});

describe('link focus: CSS fallback without the script mark', () => {
  const fallback = async (html: string) => {
    const page = await newE2EPage({ html });
    await page.addStyleTag({ content: themeColours() });
    await page.keyboard.press('Shift');
    return page.evaluate(() => {
      const link = document.getElementById('t')!;
      link.focus();
      link.removeAttribute('data-aegov-focus');
      return getComputedStyle(link).backgroundColor !== 'rgba(0, 0, 0, 0)';
    });
  };

  it('fills a text link', async () => {
    expect(await fallback(`<a id="t" href="#">Read the guidelines</a>`)).toBe(true);
  });
  it('leaves a heading card unfilled', async () => {
    expect(await fallback(`<a id="t" href="#"><h3>Title</h3><p>Text</p></a>`)).toBe(false);
  });
  it('leaves an inset-0 overlay unfilled', async () => {
    expect(await fallback(`<div style="${CARD}"><a id="t" class="inset-0" href="#" style="position:absolute;inset:0"><span class="sr-only">Open</span></a></div>`)).toBe(false);
  });
  it('leaves two stacked parts unfilled', async () => {
    expect(await fallback(`<a id="t" href="#"><span>Previous</span><span>Tooltip</span></a>`)).toBe(false);
  });
});

describe('link focus: text on the fill in dark mode', () => {
  it('uses the light text colour on the dark gold fill (not the light-mode dark text)', async () => {
    const page = await newE2EPage({ html: `<a id="t" href="#">Read the guidelines</a>` });
    const r = await focusResult(page, true);
    const expected = await page.evaluate(() => {
      const probe = (value: string) => { const p = document.createElement('div'); p.style.color = value; document.body.appendChild(p); const c = getComputedStyle(p).color; p.remove(); return c; };
      return { text: probe('var(--color-primary-support-50)'), fill: probe('var(--color-primary-support-700)') };
    });
    expect(r.filled).toBe(true);
    expect(r.background).toBe(expected.fill);
    expect(r.color).toBe(expected.text);
  });
});
