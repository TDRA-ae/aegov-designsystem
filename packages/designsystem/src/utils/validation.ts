/**
 * AEGOV Design System - Validation utilities (Layer 1)
 *
 * Shared helpers for the unified validation surface across form components.
 * See: validation-engine-addon.md §2.2
 */

import type {
  AegovValidationDetail,
  AegovValidationTrigger,
  AegovValidityState,
} from './types';

/**
 * Default valid state — every flag false, `valid: true`.
 */
export const VALID_STATE: AegovValidityState = {
  badInput: false,
  customError: false,
  patternMismatch: false,
  rangeOverflow: false,
  rangeUnderflow: false,
  stepMismatch: false,
  tooLong: false,
  tooShort: false,
  typeMismatch: false,
  valueMissing: false,
  valid: true,
};

/**
 * Bridge a native `ValidityState` to the AEGOV equivalent (1:1 copy).
 * Use this in components that wrap a native `<input>`, `<textarea>`, or `<select>`.
 */
export function fromNativeValidity(v: ValidityState): AegovValidityState {
  return {
    badInput: v.badInput,
    customError: v.customError,
    patternMismatch: v.patternMismatch,
    rangeOverflow: v.rangeOverflow,
    rangeUnderflow: v.rangeUnderflow,
    stepMismatch: v.stepMismatch,
    tooLong: v.tooLong,
    tooShort: v.tooShort,
    typeMismatch: v.typeMismatch,
    valueMissing: v.valueMissing,
    valid: v.valid,
  };
}

/**
 * Build a synthetic `AegovValidityState` for custom controls (otp, datepicker,
 * fileupload, listbox-select, group components). Pass only the truthy flags;
 * `valid` is computed from the union of all flags.
 *
 * @example
 * synthesizeValidity({ valueMissing: true })
 * // → { …VALID_STATE, valueMissing: true, valid: false }
 */
export function synthesizeValidity(flags: Partial<AegovValidityState>): AegovValidityState {
  const merged: AegovValidityState = { ...VALID_STATE, ...flags };
  // `valid` is derived: any truthy flag (other than `valid` itself) = invalid
  let anyTruthy = false;
  for (const key of Object.keys(merged) as Array<keyof AegovValidityState>) {
    if (key === 'valid') continue;
    if (merged[key]) {
      anyTruthy = true;
      break;
    }
  }
  merged.valid = !anyTruthy;
  return merged;
}

/**
 * Fold a pending `setCustomValidity()` message into a computed result, the way
 * a native control does: `customError` joins whatever other flags are set and
 * the custom message wins. Custom controls recompute validity on every blur and
 * `validate()` call, so without this the custom error would be silently dropped
 * from ElementInternals while it is still shown on screen.
 */
export function withCustomError<R extends { validity: AegovValidityState; message: string }>(
  result: R,
  customMessage: string,
): R {
  if (!customMessage) return result;
  return { ...result, validity: synthesizeValidity({ ...result.validity, customError: true }), message: customMessage };
}

/**
 * Compose a space-separated `aria-describedby` value from any number of IDs,
 * filtering out null/undefined/empty entries. Returns `undefined` if all empty
 * (caller can spread to remove the attribute).
 *
 * Used by form components to chain hint + error + counter + author-supplied IDs
 * onto the inner native control. See gap §7.8 in validation-engine-addon.md.
 */
export function composeDescribedBy(
  ...ids: Array<string | null | undefined>
): string | undefined {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const raw of ids) {
    if (!raw) continue;
    // Each entry may itself be space-separated
    for (const id of raw.split(/\s+/)) {
      if (!id || seen.has(id)) continue;
      seen.add(id);
      out.push(id);
    }
  }
  return out.length ? out.join(' ') : undefined;
}

/**
 * Element with `attachInternals()` exposed — convenience type for the manual
 * (non-decorator) `attachInternals()` path used while plan §6.8 fallback is active.
 */
export interface InternalsHost extends HTMLElement {
  attachInternals(): ElementInternals;
}

/**
 * Apply a synthetic validity state to an `ElementInternals` instance, mapping
 * AEGOV flags onto the native `ValidityStateFlags` accepted by `setValidity()`.
 *
 * - If `validity.valid !== false`, clears validity (`setValidity({})`).
 * - Otherwise sets the matching flags + message + optional anchor element.
 */
export function setInternalsValidity(
  internals: ElementInternals | null,
  validity: Partial<AegovValidityState>,
  message: string,
  anchor?: HTMLElement,
): void {
  if (!internals || typeof internals.setValidity !== 'function') return;
  if (validity.valid !== false) {
    internals.setValidity({});
    return;
  }
  const flags: ValidityStateFlags = {};
  if (validity.valueMissing) flags.valueMissing = true;
  if (validity.typeMismatch) flags.typeMismatch = true;
  if (validity.patternMismatch) flags.patternMismatch = true;
  if (validity.tooLong) flags.tooLong = true;
  if (validity.tooShort) flags.tooShort = true;
  if (validity.rangeUnderflow) flags.rangeUnderflow = true;
  if (validity.rangeOverflow) flags.rangeOverflow = true;
  if (validity.stepMismatch) flags.stepMismatch = true;
  if (validity.badInput) flags.badInput = true;
  if (validity.customError) flags.customError = true;
  internals.setValidity(flags, message || 'Invalid', anchor);
}

/**
 * Build a typed `AegovValidationDetail` payload for the unified `aegovValidate`
 * event. Reads `name` from either the host's HTML attribute or its `name`
 * property (whichever is set).
 */
export function buildValidationDetail<T>(
  el: HTMLElement & { name?: string },
  value: T,
  validity: AegovValidityState,
  validationMessage: string,
  customError: string | null,
  trigger: AegovValidationTrigger,
): AegovValidationDetail<T> {
  return {
    name: el.getAttribute('name') ?? el.name ?? null,
    value,
    validity,
    validationMessage,
    customError,
    trigger,
  };
}
