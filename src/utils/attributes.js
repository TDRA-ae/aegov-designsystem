/**
 * Shared utility for extracting pass-through attributes from a host element.
 *
 * Collects `aria-*` and `data-*` attributes by default, plus any additional
 * attribute names provided in the optional set.
 */
export function getPassThroughAttributes(el, additionalAttrs) {
    const result = {};
    if (!el)
        return result;
    Array.from(el.attributes).forEach(attr => {
        if (attr.name.startsWith('aria-') ||
            attr.name.startsWith('data-') ||
            (additionalAttrs && additionalAttrs.has(attr.name))) {
            result[attr.name] = attr.value;
        }
    });
    return result;
}
