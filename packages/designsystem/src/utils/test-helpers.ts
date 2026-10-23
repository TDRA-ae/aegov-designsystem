/**
 * Spec-test query helpers that see through shadow roots.
 *
 * The form controls (input, textarea, select, checkbox, radio, toggle, range,
 * otp, fileupload, datepicker and the two groups) render their internals in a
 * shadow root, so `page.root.querySelector(...)` returns null for anything
 * they render. These helpers search the host's shadow root first, then its
 * light DOM, descending into every nested shadow root along the way — so a
 * light-DOM wrapper such as `aegov-form-field` can still reach the native
 * `<input>` inside a child `aegov-input`.
 *
 * Test-only: never import from component code.
 */

type Root = Element | ShadowRoot | Document;

function searchRoots(host: Root): Root[] {
  const roots: Root[] = [];
  const visit = (root: Root) => {
    roots.push(root);
    root.querySelectorAll('*').forEach((el) => {
      if (el.shadowRoot) visit(el.shadowRoot as unknown as ShadowRoot);
    });
  };
  if (host instanceof Element && host.shadowRoot) visit(host.shadowRoot as unknown as ShadowRoot);
  visit(host);
  return roots;
}

/** First element matching `selector` anywhere under `host`, shadow roots included. */
export function q<K extends keyof HTMLElementTagNameMap>(host: Root, selector: K): HTMLElementTagNameMap[K] | null;
export function q<T extends Element = HTMLElement>(host: Root, selector: string): T | null;
export function q(host: Root, selector: string): Element | null {
  for (const root of searchRoots(host)) {
    const match = root.querySelector(selector);
    if (match) return match;
  }
  return null;
}

/** Every element matching `selector` under `host`, shadow roots included, in search order. */
export function qa<K extends keyof HTMLElementTagNameMap>(host: Root, selector: K): HTMLElementTagNameMap[K][];
export function qa<T extends Element = HTMLElement>(host: Root, selector: string): T[];
export function qa(host: Root, selector: string): Element[] {
  const seen = new Set<Element>();
  const out: Element[] = [];
  for (const root of searchRoots(host)) {
    root.querySelectorAll(selector).forEach((el) => {
      if (!seen.has(el)) {
        seen.add(el);
        out.push(el);
      }
    });
  }
  return out;
}
