/**
 * AEGOV Design System - Runtime Prop Validator
 *
 * Components expose enum-typed props (e.g. ButtonSize = 'xs' | 'sm' | ...).
 * TypeScript enforces these at compile time, but consumers using HTML or
 * untyped JavaScript can still pass any string. Without guards, dictionary
 * lookups (sizeClasses[this.size]) return undefined and spreads throw.
 *
 * These helpers validate at runtime. Warnings fire only in dev builds via
 * Build.isDev, so production bundles drop the branch entirely.
 */
import { Build } from '@stencil/core';
/**
 * Return the value if it is a member of `allowed`, else return `fallback`.
 * Emits one console.warn in dev builds when the value is a non-empty
 * invalid input (skips undefined/null/'' so unset props are quiet).
 */
export function validateEnumProp(value, allowed, fallback, ctx) {
    if (typeof value === 'string' && allowed.includes(value)) {
        return value;
    }
    if (Build.isDev && value !== undefined && value !== null && value !== '') {
        console.warn(`[${ctx.component}] Invalid value ${JSON.stringify(value)} for prop "${ctx.prop}". ` +
            `Expected one of: ${allowed.join(', ')}. Falling back to "${fallback}".`);
    }
    return fallback;
}
/**
 * Dev-only warning variant. Use in componentWillLoad / @Watch hooks where
 * the goal is to surface the problem once, not to compute a fallback.
 */
export function warnIfInvalidEnumProp(value, allowed, fallback, ctx) {
    if (!Build.isDev)
        return;
    validateEnumProp(value, allowed, fallback, ctx);
}
