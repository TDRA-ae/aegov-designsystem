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

export interface PropValidationContext {
  /** The component tag, e.g. 'aegov-button' */
  component: string;
  /** The prop name, e.g. 'size' */
  prop: string;
}

/**
 * Return the value if it is a member of `allowed`, else return `fallback`.
 * Emits one console.warn in dev builds when the value is a non-empty
 * invalid input (skips undefined/null/'' so unset props are quiet).
 */
export function validateEnumProp<T extends string>(
  value: unknown,
  allowed: readonly T[],
  fallback: T,
  ctx: PropValidationContext,
): T {
  if (typeof value === 'string' && (allowed as readonly string[]).includes(value)) {
    return value as T;
  }
  if (Build.isDev && value !== undefined && value !== null && value !== '') {
    console.warn(
      `[${ctx.component}] Invalid value ${JSON.stringify(value)} for prop "${ctx.prop}". ` +
        `Expected one of: ${allowed.join(', ')}. Falling back to "${fallback}".`,
    );
  }
  return fallback;
}

/**
 * Dev-only warning variant. Use in componentWillLoad / @Watch hooks where
 * the goal is to surface the problem once, not to compute a fallback.
 */
export function warnIfInvalidEnumProp<T extends string>(
  value: unknown,
  allowed: readonly T[],
  fallback: T,
  ctx: PropValidationContext,
): void {
  if (!Build.isDev) return;
  validateEnumProp(value, allowed, fallback, ctx);
}
