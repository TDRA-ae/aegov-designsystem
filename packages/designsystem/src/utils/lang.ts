/** Languages the components ship built-in strings for. */
export type UiLang = 'en' | 'ar';

const fromLang = (lang: string): UiLang => (lang === 'ar' || lang.startsWith('ar-') ? 'ar' : 'en');

/**
 * The language a component's built-in strings (button names, status and
 * validation messages) should use.
 *
 * Walks from the element up through its ancestors — crossing shadow-root
 * boundaries, so a component inside another component's shadow DOM still
 * sees the page — and stops at the nearest element that says something:
 *  - a `lang` attribute decides (Arabic `ar` / `ar-AE` … → 'ar', any other
 *    language → 'en'), even when the same element also has `dir`;
 *  - otherwise a `dir` attribute decides (`rtl` → 'ar', `ltr` → 'en'), so an
 *    Arabic block marked only with `dir="rtl"` keeps its Arabic strings.
 * Nothing set anywhere → 'en'.
 *
 * Before, the strings followed `dir` only: `<html lang="ar">` without `dir`
 * showed English, and `dir="rtl" lang="en"` showed Arabic read by an English
 * voice (WCAG 3.1.2, DS-A11Y-input-05).
 */
export function uiLang(el?: Element | null): UiLang {
  let node: Node | null = el ?? null;
  while (node) {
    if (node instanceof Element) {
      const lang = node.getAttribute('lang')?.trim().toLowerCase();
      if (lang) return fromLang(lang);
      const dir = node.getAttribute('dir')?.trim().toLowerCase();
      if (dir === 'rtl') return 'ar';
      if (dir === 'ltr') return 'en';
      node = node.parentNode;
    } else if (node instanceof ShadowRoot) {
      node = node.host;
    } else {
      node = null;
    }
  }
  return 'en';
}

/**
 * Calls `onChange` when `lang` or `dir` changes on <html> or <body>, so
 * built-in strings follow a language switch made after load (DS-A11Y-input-05:
 * labels only updated when something else re-rendered). Returns a disconnect
 * function. No-op outside the browser.
 */
export function observePageLang(onChange: () => void): () => void {
  if (typeof MutationObserver === 'undefined' || typeof document === 'undefined') return () => {};
  const observer = new MutationObserver(onChange);
  const options = { attributes: true, attributeFilter: ['lang', 'dir'] };
  observer.observe(document.documentElement, options);
  if (document.body) observer.observe(document.body, options);
  return () => observer.disconnect();
}
