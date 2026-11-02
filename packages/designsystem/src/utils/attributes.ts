/**
 * Pass-through attribute names that are boolean-reflected HTML IDL properties:
 * per the HTML spec, presence alone means "on" regardless of the attribute's
 * string value (even `autofocus="false"` autofocuses natively). Spreading
 * their raw string value onto JSX instead relies on JS truthiness, which
 * breaks the bare-attribute shorthand (`autofocus=""` is falsy) and silently
 * drops it from the rendered element.
 */
const BOOLEAN_PASS_THROUGH_ATTRS = new Set(['autofocus', 'multiple']);

/**
 * Shared utility for extracting pass-through attributes from a host element.
 *
 * Collects `aria-*` and `data-*` attributes by default, plus any additional
 * attribute names provided in the optional set. Boolean-reflected attributes
 * (see `BOOLEAN_PASS_THROUGH_ATTRS`) are returned as `true` based on presence
 * rather than their string value.
 */
export function getPassThroughAttributes(
  el: HTMLElement,
  additionalAttrs?: Set<string>,
): Record<string, string | boolean> {
  const result: Record<string, string | boolean> = {};
  if (!el) return result;

  Array.from(el.attributes).forEach(attr => {
    if (isPassThroughAttribute(attr.name, additionalAttrs)) {
      result[attr.name] = BOOLEAN_PASS_THROUGH_ATTRS.has(attr.name) ? true : attr.value;
    }
  });

  return result;
}

function isPassThroughAttribute(name: string, additionalAttrs?: Set<string>): boolean {
  return name.startsWith('aria-') || name.startsWith('data-') || !!additionalAttrs?.has(name);
}

/**
 * Call `onChange` whenever a pass-through attribute (see
 * `getPassThroughAttributes`) is added, changed or removed on the host.
 *
 * Stencil only re-renders on prop/state changes, so without this an attribute
 * set after load — `pattern`, `minlength`, `max`, `aria-label`, … — never
 * reaches the inner native control, and its validity never changes. Pass
 * `() => forceUpdate(this)` and disconnect the returned observer in
 * `disconnectedCallback`. Returns null where MutationObserver is unavailable
 * (spec mocks).
 */
export function observePassThroughAttributes(
  el: HTMLElement,
  additionalAttrs: Set<string> | undefined,
  onChange: () => void,
): MutationObserver | null {
  if (typeof MutationObserver === 'undefined') return null;
  const observer = new MutationObserver(mutations => {
    if (mutations.some(({ attributeName }) => !!attributeName && isPassThroughAttribute(attributeName, additionalAttrs))) {
      onChange();
    }
  });
  observer.observe(el, { attributes: true });
  return observer;
}
