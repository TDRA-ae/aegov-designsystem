/**
 * Returns a variant-appropriate SVG icon as JSX.
 *
 * Shared across aegov-callout, aegov-toast, and any future component
 * that maps semantic variants (error, warning, success, info, default)
 * to Phosphor-style filled icons.
 *
 * @param variant - The semantic variant name
 * @param sizeClass - Tailwind size class (e.g. 'size-5', 'size-6')
 */
export declare function getVariantIcon(variant: string, sizeClass: string): any;
