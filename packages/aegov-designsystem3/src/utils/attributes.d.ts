/**
 * Shared utility for extracting pass-through attributes from a host element.
 *
 * Collects `aria-*` and `data-*` attributes by default, plus any additional
 * attribute names provided in the optional set.
 */
export declare function getPassThroughAttributes(el: HTMLElement, additionalAttrs?: Set<string>): Record<string, string>;
