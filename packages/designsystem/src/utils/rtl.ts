/**
 * RTL detection utility.
 *
 * Resolves the effective text direction for an element by walking up to the
 * nearest ancestor with a `dir` attribute, falling back to `<html dir>`.
 *
 * The walk crosses shadow boundaries: a component rendered inside another
 * component's shadow root (e.g. the banner inside aegov-header) still sees a
 * `dir` set on an ancestor of that host. Plain `closest()` stops at the shadow
 * root and would only ever see `<html dir>`.
 *
 * Use this instead of duplicating `closest('[dir]')` logic per component.
 */
export function isRtl(el?: Element | null): boolean {
  let node: Element | null | undefined = el;
  while (node && typeof node.closest === 'function') {
    const withDir = node.closest('[dir]');
    const dir = withDir?.getAttribute('dir');
    if (dir) return dir === 'rtl';
    const root = node.getRootNode?.() as ShadowRoot | Document | undefined;
    node = root && (root as ShadowRoot).host ? (root as ShadowRoot).host : null;
  }
  if (typeof document !== 'undefined' && document.documentElement) {
    return document.documentElement.getAttribute('dir') === 'rtl';
  }
  return false;
}

/**
 * Calls `onChange` whenever a `dir` attribute changes anywhere in the light
 * DOM — on `<html>`, on an existing ancestor, or on an ancestor that did not
 * have one before. Components re-resolve with `isRtl()` in the callback.
 *
 * Returns a cleanup function; call it from `disconnectedCallback`. A no-op
 * where `MutationObserver` is missing (mock-doc).
 */
export function observeDir(onChange: () => void): () => void {
  if (typeof MutationObserver === 'undefined' || typeof document === 'undefined' || !document.documentElement) {
    return () => {};
  }
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['dir'], subtree: true });
  return () => observer.disconnect();
}
