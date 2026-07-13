import { h } from '@stencil/core';
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
export function getVariantIcon(variant, sizeClass) {
    switch (variant) {
        case 'error':
            return (h("svg", { class: sizeClass, "aria-hidden": "true", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 256 256" },
                h("rect", { width: "256", height: "256", fill: "none" }),
                h("path", { d: "M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm-8,56a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm8,104a12,12,0,1,1,12-12A12,12,0,0,1,128,184Z" })));
        case 'warning':
            return (h("svg", { class: sizeClass, "aria-hidden": "true", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 256 256" },
                h("rect", { width: "256", height: "256", fill: "none" }),
                h("path", { d: "M236.8,188.09,149.35,36.22h0a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM120,104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm8,88a12,12,0,1,1,12-12A12,12,0,0,1,128,192Z" })));
        case 'success':
            return (h("svg", { class: sizeClass, "aria-hidden": "true", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 256 256" },
                h("rect", { width: "256", height: "256", fill: "none" }),
                h("path", { d: "M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z" })));
        case 'info':
            return (h("svg", { class: sizeClass, "aria-hidden": "true", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 256 256" },
                h("rect", { width: "256", height: "256", fill: "none" }),
                h("path", { d: "M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm-4,48a12,12,0,1,1-12,12A12,12,0,0,1,124,72Zm12,112a16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40a8,8,0,0,1,0,16Z" })));
        default:
            return (h("svg", { class: sizeClass, "aria-hidden": "true", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 256 256" },
                h("rect", { width: "256", height: "256", fill: "none" }),
                h("path", { d: "M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm-4,48a12,12,0,1,1-12,12A12,12,0,0,1,124,72Zm12,112a16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40a8,8,0,0,1,0,16Z" })));
    }
}
