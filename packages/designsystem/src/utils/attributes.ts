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
    if (
      attr.name.startsWith('aria-') ||
      attr.name.startsWith('data-') ||
      (additionalAttrs && additionalAttrs.has(attr.name))
    ) {
      result[attr.name] = BOOLEAN_PASS_THROUGH_ATTRS.has(attr.name) ? true : attr.value;
    }
  });

  return result;
}
