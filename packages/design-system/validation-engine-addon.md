# AEGOV Form Validation — Full Implementation Plan (Layer 1 + Layer 2)

> **Status:** design doc, pre-implementation
> **Owner:** AEGOV DLS team
> **Scope:** end-to-end build, test, and release plan for both layers
> **Audience:** senior engineers familiar with Stencil 4, TypeScript 5, web components, ElementInternals/FormAssociated, and modern bundling

---

## Table of Contents

- [0. Executive Summary](#0-executive-summary)
- [1. Architecture Overview](#1-architecture-overview)
- [2. Layer 1 — Component Validation Surface](#2-layer-1--component-validation-surface)
  - [2.1 Shared Types](#21-shared-types)
  - [2.2 Shared Utilities](#22-shared-utilities)
  - [2.3 Component Change Pattern](#23-component-change-pattern)
  - [2.4 Per-Component Specs](#24-per-component-specs)
  - [2.5 ElementInternals / FormAssociated](#25-elementinternals--formassociated)
  - [2.6 CSS & Styling](#26-css--styling)
  - [2.7 `aegov-form-field` Orchestration](#27-aegov-form-field-orchestration)
  - [2.8 Testing](#28-testing)
  - [2.9 Documentation](#29-documentation)
  - [2.10 Release](#210-release)
- [3. Layer 2 — Validation Orchestrator Package](#3-layer-2--validation-orchestrator-package)
  - [3.1 Package Layout](#31-package-layout)
  - [3.2 Public API](#32-public-api)
  - [3.3 Adapter Contract](#33-adapter-contract)
  - [3.4 Orchestrator Implementation](#34-orchestrator-implementation)
  - [3.5 Default Adapter — Valibot](#35-default-adapter--valibot)
  - [3.6 Alt Adapters](#36-alt-adapters)
  - [3.7 Framework Helpers](#37-framework-helpers)
  - [3.8 Async, Cross-Field, i18n](#38-async-cross-field-i18n)
  - [3.9 Build & Tooling](#39-build--tooling)
  - [3.10 Testing](#310-testing)
  - [3.11 Documentation](#311-documentation)
  - [3.12 Release](#312-release)
- [4. Combined Roadmap & Sequencing](#4-combined-roadmap--sequencing)
- [5. Risks & Mitigations](#5-risks--mitigations)
- [6. Open Questions (Decisions Recorded)](#6-open-questions)
- [7. Execution Gap Resolutions](#7-execution-gap-resolutions-cross-reference-catalog)

---

## 0. Executive Summary

Two cleanly separated layers:

- **Layer 1** — additive validation surface in `@aegov/design-system` core. Mandatory. ~900 LOC across 13 form components plus shared utilities.
- **Layer 2** — `@aegov/design-system-validation` add-on package. Optional. Engine-agnostic orchestrator + adapter shims (Valibot/Zod/Vest/Native) + framework helpers (React/Vue/Angular/vanilla).

Layer 1 ships first in core `0.2.0`. Layer 2 ships next as `@aegov/design-system-validation@0.1.0`, depending on core `>=0.2.0`.

Layer 1 is fully usable standalone — consumers can BYO validator with ~5 lines of glue. Layer 2 is sugar for schema-driven, multi-framework, batteries-included DX.

---

## 1. Architecture Overview

```
┌──────────────────────────────────────────────────────────────────┐
│  Consumer App (React / Vue / Angular / vanilla)                  │
│                                                                  │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  Layer 2: @aegov/design-system-validation (OPTIONAL)       │  │
│  │  • createForm(rootEl, schema, adapter, options)            │  │
│  │  • Adapters: valibot | zod | vest | native                 │  │
│  │  • Framework helpers: react | vue | angular | vanilla      │  │
│  │  • Listens to `aegovValidate` events at form root          │  │
│  │  • Sets `el.isInvalid` / `el.errorMessage` on components   │  │
│  └─────────────────────┬──────────────────────────────────────┘  │
│                        │ DOM properties + custom events          │
│                        ▼                                         │
│  ┌────────────────────────────────────────────────────────────┐  │
│  │  Layer 1: @aegov/design-system core (REQUIRED)             │  │
│  │  Form components expose:                                   │  │
│  │   • Props: isInvalid, errorMessage, hint                   │  │
│  │   • Slots: error, hint                                     │  │
│  │   • Event: aegovValidate { value, validity, customError }  │  │
│  │   • Method: validate(), setCustomValidity(msg)             │  │
│  │   • aria-invalid + aria-describedby wiring                 │  │
│  │   • ElementInternals on custom controls                    │  │
│  └────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

**Contract direction**: Layer 2 reads `aegovValidate` events and writes `isInvalid`/`errorMessage` properties on Layer 1 components. Components themselves never reach into Layer 2.

---

## 2. Layer 1 — Component Validation Surface

### 2.1 Shared Types

**File:** `src/utils/types.ts` (extend existing)

```ts
export interface AegovValidityState {
  badInput: boolean;
  customError: boolean;
  patternMismatch: boolean;
  rangeOverflow: boolean;
  rangeUnderflow: boolean;
  stepMismatch: boolean;
  tooLong: boolean;
  tooShort: boolean;
  typeMismatch: boolean;
  valueMissing: boolean;
  valid: boolean;
}

export interface AegovValidationDetail<T = unknown> {
  /** Field name (from `name` attribute). */
  name: string | null;
  /** Current value (string for text inputs, File[] for fileupload, Date | [Date,Date] for datepicker, etc.). */
  value: T;
  /** Mirrors native ValidityState; synthesized for custom controls. */
  validity: AegovValidityState;
  /** Human-readable validation message (empty if valid). */
  validationMessage: string;
  /** Custom error message set via setCustomValidity(). */
  customError: string | null;
  /** Trigger that caused the event. */
  trigger: 'input' | 'change' | 'blur' | 'submit' | 'manual';
}

export interface AegovValidationResult {
  valid: boolean;
  message?: string;
  validity?: AegovValidityState;
}
```

Re-export from `src/utils/index.ts`.

### 2.2 Shared Utilities

**File (new):** `src/utils/validation.ts` (~180 LOC)

Responsibilities:
- Synthesize `AegovValidityState` for custom controls without native validity
- Bridge native `ValidityState` to `AegovValidityState` (1:1 copy)
- Helper to compose `aria-describedby` IDs (error + hint + description)
- Helper to emit `aegovValidate` with throttle/debounce options
- Helper for ElementInternals wiring (Stencil 4 supports `formAssociated: true`)

```ts
// src/utils/validation.ts
import type { AegovValidityState, AegovValidationDetail } from './types';

export const VALID_STATE: AegovValidityState = {
  badInput: false, customError: false, patternMismatch: false,
  rangeOverflow: false, rangeUnderflow: false, stepMismatch: false,
  tooLong: false, tooShort: false, typeMismatch: false,
  valueMissing: false, valid: true,
};

export function fromNativeValidity(v: ValidityState): AegovValidityState {
  return {
    badInput: v.badInput, customError: v.customError,
    patternMismatch: v.patternMismatch, rangeOverflow: v.rangeOverflow,
    rangeUnderflow: v.rangeUnderflow, stepMismatch: v.stepMismatch,
    tooLong: v.tooLong, tooShort: v.tooShort, typeMismatch: v.typeMismatch,
    valueMissing: v.valueMissing, valid: v.valid,
  };
}

export function synthesizeValidity(flags: Partial<AegovValidityState>): AegovValidityState {
  const merged = { ...VALID_STATE, ...flags };
  merged.valid = !Object.entries(merged).some(([k, v]) => k !== 'valid' && v);
  return merged;
}

export function composeDescribedBy(...ids: (string | null | undefined)[]): string | undefined {
  const list = ids.filter(Boolean) as string[];
  return list.length ? list.join(' ') : undefined;
}

export interface InternalsHost extends HTMLElement {
  attachInternals(): ElementInternals;
}

export function setInternalsValidity(
  internals: ElementInternals | null,
  validity: Partial<AegovValidityState>,
  message: string,
  anchor?: HTMLElement
): void {
  if (!internals) return;
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

export function buildValidationDetail<T>(
  el: HTMLElement & { name?: string },
  value: T,
  validity: AegovValidityState,
  validationMessage: string,
  customError: string | null,
  trigger: AegovValidationDetail['trigger']
): AegovValidationDetail<T> {
  return {
    name: el.getAttribute('name') ?? el.name ?? null,
    value, validity, validationMessage, customError, trigger,
  };
}
```

### 2.3 Component Change Pattern

**Every form component receives the same structural additions.** Reference template (apply uniformly to inputs, textarea, select, checkbox, radio, toggle, range, otp, fileupload, datepicker):

```tsx
import { Component, Element, Event, EventEmitter, Method, Prop, State, h } from '@stencil/core';
import type { AegovValidationDetail, AegovValidationResult, AegovValidityState } from '../../utils/types';
import { fromNativeValidity, synthesizeValidity, composeDescribedBy, buildValidationDetail } from '../../utils/validation';
import { generateId } from '../../utils/id-generator';

@Component({
  tag: 'aegov-input',
  styleUrl: 'aegov-input.css',
  scoped: false,
  // For custom controls only:
  // formAssociated: true,
})
export class AegovInput {
  @Element() el!: HTMLElement;

  // ─── Existing props (unchanged) ───
  @Prop({ reflect: true, mutable: true }) fieldId = '';
  @Prop() name?: string;
  @Prop({ mutable: true }) value = '';
  @Prop() type: AegovInputType = 'text';
  // … other existing props

  // ─── NEW validation surface ───
  /** Visual + a11y invalid state. Toggles `aria-invalid`, `.is-invalid` class. */
  @Prop({ mutable: true, reflect: true }) isInvalid = false;
  /** Inline error message rendered below control. Auto-wires aria-describedby. */
  @Prop({ mutable: true }) errorMessage = '';
  /** Helper hint rendered below control. Replaces legacy `description` / `labelHelp` (gap §7.4 fix — pre-production rename, no compat shim). */
  @Prop() hint = '';

  @State() private hasErrorSlot = false;
  @State() private hasHintSlot = false;
  private errorId = '';
  private hintId = '';
  private nativeRef?: HTMLInputElement;

  /** Emitted on input/change/blur/submit; carries full validity snapshot. */
  @Event() aegovValidate!: EventEmitter<AegovValidationDetail<string>>;

  /** Imperatively re-run validation. Returns current result. */
  @Method()
  async validate(trigger: AegovValidationDetail['trigger'] = 'manual'): Promise<AegovValidationResult> {
    const validity = this.nativeRef
      ? fromNativeValidity(this.nativeRef.validity)
      : synthesizeValidity({});
    const message = this.nativeRef?.validationMessage ?? this.errorMessage ?? '';
    this.aegovValidate.emit(buildValidationDetail(
      this.el as any, this.value, validity, message,
      this.errorMessage || null, trigger,
    ));
    return { valid: validity.valid, message, validity };
  }

  /** Set a custom validity message. Mirrors HTMLInputElement.setCustomValidity(). */
  @Method()
  async setCustomValidity(message: string): Promise<void> {
    this.errorMessage = message;
    this.isInvalid = !!message;
    this.nativeRef?.setCustomValidity(message);
  }

  componentWillLoad() {
    if (!this.fieldId) this.fieldId = generateId('aegov-input');
    this.errorId = `${this.fieldId}-error`;
    this.hintId = `${this.fieldId}-hint`;
    this.hasErrorSlot = !!this.el.querySelector('[slot="error"]');
    this.hasHintSlot = !!this.el.querySelector('[slot="hint"]');
  }

  /** Has user blurred this field at least once? Gates aria-live to avoid AT spam (gap §7.10 fix). */
  @State() private hasBlurredOnce = false;

  private onBlur = (e: FocusEvent) => {
    this.hasBlurredOnce = true;
    // existing emit logic …
    this.validate('blur');
  };

  private onInput = (e: InputEvent) => {
    this.value = (e.target as HTMLInputElement).value;
    // existing emit logic …
    this.validate('input');
  };

  render() {
    const showError = this.isInvalid && (this.hasErrorSlot || this.errorMessage);
    const showHint = !showError && (this.hasHintSlot || this.hint);
    // Gap §7.8 fix: compose with existing describedby (set by author or other features e.g. counter)
    const existingDescribedBy = this.el.getAttribute('aria-describedby');
    const describedBy = composeDescribedBy(
      existingDescribedBy,
      showError ? this.errorId : null,
      showHint ? this.hintId : null,
    );
    // Gap §7.10 fix: only announce errors after first blur OR explicit submit; live region silent during typing
    const announceError = showError && this.hasBlurredOnce;
    return (
      <div class={{ 'aegov-input-wrapper': true, 'is-invalid': this.isInvalid }}>
        <input
          ref={el => (this.nativeRef = el)}
          id={this.fieldId}
          name={this.name}
          value={this.value}
          type={this.type}
          aria-invalid={this.isInvalid ? 'true' : null}
          aria-describedby={describedBy}
          onInput={this.onInput}
          onBlur={this.onBlur}
          // … existing attrs
        />
        {showError && (
          <div
            id={this.errorId}
            class="aegov-input__error"
            role={announceError ? 'alert' : null}
            aria-live={announceError ? 'polite' : null}
          >
            {this.hasErrorSlot ? <slot name="error" /> : this.errorMessage}
          </div>
        )}
        {showHint && (
          <div id={this.hintId} class="aegov-input__hint">
            {this.hasHintSlot ? <slot name="hint" /> : this.hint}
          </div>
        )}
      </div>
    );
  }
}
```

**Apply identical pattern** to: `aegov-textarea`, `aegov-select`, `aegov-checkbox`, `aegov-radio`, `aegov-toggle`, `aegov-range`, `aegov-otp`, `aegov-fileupload`, `aegov-datepicker`. Group components (`-group`) get aggregate-level error region only — children handle their own.

### 2.4 Per-Component Specs

#### 2.4.1 Value type standardization (gap §7.3 fix)

Schema authors and orchestrator both depend on a single canonical value type per component. Pin types here; tests enforce.

| Component | JS value type (`el.value`) | FormData / `setFormValue` payload | Schema example |
|---|---|---|---|
| `aegov-input` | `string` | string | `v.string()` / `z.string()` |
| `aegov-textarea` | `string` | string | `v.string()` |
| `aegov-select` (native single) | `string` | string | `v.string()` / `v.picklist([...])` |
| `aegov-select` (native multiple) | `string[]` | one entry per value (multi-append) | `v.array(v.string())` |
| `aegov-select` (listbox single) | `string` | string | `v.string()` |
| `aegov-select` (listbox multiple) | `string[]` | `FormData` with one entry per value (NOT comma-joined) | `v.array(v.string())` |
| `aegov-checkbox` | `boolean` | `'on'` if checked (or custom `value` prop) | `v.boolean()` |
| `aegov-checkbox-group` | `string[]` | each child submits individually | `v.array(v.string())` |
| `aegov-radio` | `string` (own value if checked) | own value if checked | `v.string()` |
| `aegov-radio-group` | `string \| undefined` | name=value of selected child | `v.string()` |
| `aegov-toggle` | `boolean` | `'on'` if checked | `v.boolean()` |
| `aegov-range` (single) | `number` | number string | `v.number()` |
| `aegov-range` (range mode) | `{ low: number; high: number }` | two entries `name-low`, `name-high` | `v.object({ low: v.number(), high: v.number() })` |
| `aegov-otp` | `string` (digits/chars) | string | `v.pipe(v.string(), v.length(6))` |
| `aegov-fileupload` | `File[]` | `FormData` with one entry per file | `v.array(v.file())` (custom `file()` validator) |
| `aegov-datepicker` (single) | `string` (ISO 8601 `YYYY-MM-DD`) | ISO string | `v.pipe(v.string(), v.isoDate())` |
| `aegov-datepicker` (range) | `{ start: string; end: string }` (ISO 8601) | two entries `name-start`, `name-end` | `v.object({ start: v.string(), end: v.string() })` |

**Rules:**
- `el.value` is the JS-typed getter (TypeScript type matches table above)
- `setFormValue()` (for custom controls) takes either a primitive string or a `FormData` object
- Listbox multi-select previously serialized comma-joined into hidden input — **change to per-value FormData entries** for proper schema interop. Breaking change accepted (pre-production per §6.6)
- Range and date-range emit two FormData entries with suffixes `-low`/`-high` and `-start`/`-end` so consumers can model as either object or two-field schema

**Test:** add per-component test asserting `el.value` matches table, and `<form>.formdata` event payload matches expected entries.

#### 2.4.2 Component change table

| Component | Special Considerations | LOC Estimate |
|---|---|---|
| `aegov-input` | Native `<input>`; bridge `validity`. Pattern, min/max/step/minlength/maxlength forwarded already. | +60 |
| `aegov-textarea` | Native `<textarea>`; coordinate `aria-describedby` with existing counter id (counter id + error id + hint id chain). | +70 |
| `aegov-select` (native variant) | Native `<select>`; standard bridge. | +50 |
| `aegov-select` (listbox variant) | No native form participation today (hidden input). Add `formAssociated: true` + ElementInternals. Synthesize `valueMissing` when `isRequired && !value`. | +120 |
| `aegov-checkbox` | Native `<input type="checkbox">`. | +50 |
| `aegov-checkbox-group` | **Pure aggregator — NOT `formAssociated`.** Children submit individually via their own native `<input>`s (avoids FormData duplication, gap §7.1). Group emits aggregate `aegovValidate` after listening to child events; tracks `values: string[]`; renders group-level error below `<legend>`. `valueMissing` synthesized when `isRequired && values.length === 0`, surfaced via group's own `errorMessage` + `aria-invalid` on `<fieldset>`. | +80 |
| `aegov-radio` | Native `<input type="radio">`. Group emits aggregate validate. | +50 |
| `aegov-radio-group` | **Pure aggregator — NOT `formAssociated`.** Same pattern as checkbox-group: children submit individually; group emits aggregate `aegovValidate`; `valueMissing` if `isRequired && !value`; group-level error rendered below `<legend>`. | +80 |
| `aegov-toggle` | Native `<input type="checkbox" role="switch">`. | +50 |
| `aegov-range` | Native `<input type="range">`; `min`, `max`, `step` already enforced. Range mode (two thumbs) needs `valueLow <= valueHigh` synthesis. | +80 |
| `aegov-otp` | Hidden `<input>` proxy → upgrade to `formAssociated: true`. Synthesize `valueMissing` (length < `length` prop), `patternMismatch` (regex prop). Already emits `aegovOtpInvalid` — keep AND emit unified `aegovValidate`. | +100 |
| `aegov-fileupload` | Native `<input type="file">`. Synthesize `tooLong`/`patternMismatch`/`valueMissing` for max-size/accept/required violations. Already emits `aegovFileuploadError` — keep AND emit unified `aegovValidate`. `formAssociated: true` so `formdata` event submits the File[] correctly across variants. | +110 |
| `aegov-datepicker` | Read-only trigger input. Synthesize `valueMissing`, `rangeUnderflow`/`rangeOverflow` (vs `min`/`max`/`isDisableFuture`), `tooLong`/`tooShort` (vs `minRange`/`maxRange`), `customError` (blackout dates). `formAssociated: true`. | +140 |
| `aegov-form-field` | New: cascade `isInvalid`/`errorMessage`/`hint` to slotted child if child unset. Render shared error/hint region OR delegate to child (config). Auto-link `aria-describedby` chain. | +120 |
| `aegov-label` | No change. |  0 |

**Total Layer 1 component LOC:** ~1,180 added; ~50 modified.

### 2.5 ElementInternals / FormAssociated

Stencil 4.16+ supports `formAssociated: true` in `@Component`. Stencil 4.42+ adds `@AttachInternals()` decorator for type-safe access.

**Components requiring it** (custom controls without inner native form element representing the full value):

1. `aegov-select` (listbox variant only)
2. `aegov-otp`
3. `aegov-datepicker`
4. `aegov-fileupload` (variant abstraction)

**Components NOT requiring it (per gap §7.1 fix):**

- `aegov-checkbox-group`, `aegov-radio-group` — children already form-associated via native inputs; double-attaching causes FormData duplication
- `aegov-form-field` — pure structural wrapper

**Spike required before mass migration (gap §7.5):** verify `scoped: true` + `formAssociated: true` interact correctly in `aegov-datepicker`. Build minimal reproduction in week 1 of L1 (component with both flags + form integration test). If event re-targeting or styling breaks, fall back to manual `attachInternals()` (drop `@AttachInternals` decorator usage for that one component).

**Pattern (Stencil 4.42+):**

```tsx
import { AttachInternals, Component, Element, Prop, h } from '@stencil/core';

@Component({
  tag: 'aegov-otp',
  styleUrl: 'aegov-otp.css',
  scoped: false,
  formAssociated: true,
})
export class AegovOtp {
  @Element() el!: HTMLElement;
  @AttachInternals() internals!: ElementInternals;

  @Prop() name?: string;
  @Prop({ mutable: true }) value = '';

  formAssociatedCallback(_form: HTMLFormElement) {
    /* parent <form> attached */
  }
  formDisabledCallback(disabled: boolean) {
    this.isDisabled = disabled;
  }
  formResetCallback() {
    this.value = '';
    this.runValidation();
  }
  formStateRestoreCallback(state: string, _mode: 'restore' | 'autocomplete') {
    this.value = state ?? '';
  }

  private runValidation() {
    const isMissing = this.isRequired && !this.value;
    const isPatternBad = !!this.pattern && this.value && !new RegExp(this.pattern).test(this.value);
    if (isMissing) {
      this.internals.setValidity({ valueMissing: true }, 'Required', this.firstCellRef);
    } else if (isPatternBad) {
      this.internals.setValidity({ patternMismatch: true }, 'Invalid format', this.firstCellRef);
    } else {
      this.internals.setValidity({});
    }
    this.internals.setFormValue(this.value);
  }
}
```

**Stencil config check:** `stencil.config.ts` already targets web component spec; ensure `experimentalSlotFixes: true` and version >= 4.42. Bump if needed.

**Lifecycle hooks Stencil exposes:**

| Web Component API | Stencil method |
|---|---|
| `formAssociatedCallback` | `formAssociatedCallback` |
| `formDisabledCallback` | `formDisabledCallback` |
| `formResetCallback` | `formResetCallback` |
| `formStateRestoreCallback` | `formStateRestoreCallback` |

### 2.6 CSS & Styling

**File:** add to each component's `.css`:

```css
/* aegov-input.css */
.aegov-input-wrapper.is-invalid input {
  @apply border-aered-600 ring-aered-100 ring-2;
}
.aegov-input__error {
  @apply text-aered-600 text-sm mt-1.5 flex items-start gap-1.5;
}
.aegov-input__error::before {
  /* warning icon mask */
  @apply w-4 h-4 bg-aered-600 mt-0.5 flex-shrink-0;
  mask: url("data:image/svg+xml;…") no-repeat center / contain;
  content: '';
}
.aegov-input__hint {
  @apply text-slate-600 text-sm mt-1.5;
}
```

Use existing `aered` palette for invalid state. Keep error icon consistent across components — extract to `src/utils/icons.tsx` as `getValidationErrorIcon()`.

**Global CSS** (`src/global/global.css`): no changes (component-scoped).

### 2.7 `aegov-form-field` Orchestration

**File:** `src/components/aegov-form-field/aegov-form-field.tsx`

Today: links `aegov-label.htmlFor` to first form-control child. Extend to:

1. Accept `isInvalid`, `errorMessage`, `hint` at the wrapper level — cascade to **first form control child** if it has no own value set.
2. Listen to `aegovValidate` from any descendant; toggle wrapper class `is-invalid` (for label coloring etc.).
3. Provide `<slot name="error">` and `<slot name="hint">` at wrapper level — when used, child renders its own; wrapper renders only labelling/layout.
4. Auto-build `aria-describedby` chain: child's existing description + wrapper-level error + wrapper-level hint.

```tsx
@Watch('errorMessage')
cascadeErrorToChild() {
  const ctrl = this.findControl();
  if (!ctrl) return;
  if (ctrl.errorMessage === '' || ctrl.errorMessage == null) ctrl.errorMessage = this.errorMessage;
  if (this.errorMessage) ctrl.isInvalid = true;
}

private findControl(): HTMLElement & { isInvalid?: boolean; errorMessage?: string } | null {
  return this.el.querySelector(
    'aegov-input, aegov-textarea, aegov-select, aegov-checkbox, aegov-checkbox-group, ' +
    'aegov-radio-group, aegov-toggle, aegov-range, aegov-otp, aegov-fileupload, aegov-datepicker'
  );
}

/**
 * Gap §7.8 fix — aria-describedby chain composition.
 *
 * Each form-field renders its own error/hint nodes with stable IDs.
 * The chain MUST preserve any existing aria-describedby the child input already has
 * (e.g. textarea counter id, custom helper text the consumer wired manually).
 *
 * Algorithm:
 *  1. Read child's CURRENT aria-describedby attribute.
 *  2. Strip any IDs we previously injected (tracked via `data-aegov-injected-ids`).
 *  3. Append our error id (if showing error) + hint id (if showing hint).
 *  4. Write merged value; record injected IDs in `data-aegov-injected-ids` for next pass.
 */
private updateChildDescribedBy(ctrl: HTMLElement) {
  const existing = ctrl.getAttribute('aria-describedby') ?? '';
  const previouslyInjected = (ctrl.dataset.aegovInjectedIds ?? '').split(' ').filter(Boolean);
  const cleaned = existing
    .split(' ')
    .filter(id => id && !previouslyInjected.includes(id))
    .join(' ');

  const inject: string[] = [];
  if (this.isInvalid && this.errorMessage) inject.push(this.errorId);
  if (this.hint) inject.push(this.hintId);

  const merged = [cleaned, ...inject].filter(Boolean).join(' ');
  if (merged) ctrl.setAttribute('aria-describedby', merged);
  else ctrl.removeAttribute('aria-describedby');
  ctrl.dataset.aegovInjectedIds = inject.join(' ');
}
```

**Test:** unit test where `aegov-input` already has `aria-describedby="external-help-id"` — after form-field cascades error, attribute reads `"external-help-id field-1-error"`. After error clears, reads `"external-help-id"`. External ID preserved across cycles.

### 2.8 Testing

**Unit (Stencil `newSpecPage`):**
- Each component: 8 new tests
  - `isInvalid` toggles `aria-invalid`
  - `errorMessage` renders error region
  - `hint` renders hint region
  - error/hint slots take precedence over props
  - `aria-describedby` chain correct (composed of existing + error + hint IDs)
  - `validate()` resolves with correct shape
  - `setCustomValidity('msg')` toggles `isInvalid` + sets `errorMessage`
  - `setCustomValidity('')` clears both

→ **13 components × 8 tests = 104 new unit tests.**

**E2E (Stencil `newE2EPage` + Puppeteer):**
- Each component: 4 new tests
  - Invalid input fires `aegovValidate` with `validity.valid === false`
  - Form-level `form.checkValidity()` returns false when any aegov component invalid (FormAssociated correctness)
  - `form.elements` includes FormAssociated components
  - `form.formdata` event payload includes correct values

→ **13 × 4 = 52 new E2E tests.**

**Cross-component a11y:** extend `src/utils/accessibility.spec.ts`:
- Invalid components announce error via `role="alert"` + `aria-live="polite"`
- `aria-describedby` resolves to non-empty text

**Form integration E2E:** new file `src/utils/form-integration.e2e.ts`:
- Native `<form>` containing all 13 form components
- Submit invalid → `event.preventDefault()` happens automatically (via `:invalid`)
- Submit valid → `formdata` event includes every aegov field value

**Coverage gate:** maintain 100% line coverage. Add tests until threshold restored.

### 2.9 Documentation

**Auto-generated `README.md`** per component (via `docs-readme` output target) updates automatically with new props/events/methods.

**Manual updates:**
- `src/docs/markdown/aegov-input.md` and 12 sibling files — add "Validation" section (spec below)
- New: `src/docs/markdown/validation-overview.md` — explains the unified surface, error/hint slots, ARIA
- New: `src/docs/markdown/validation-byo.md` — "Bring your own validator" recipe (Layer 1 standalone, no Layer 2)
- `CLAUDE.md` — update form components inventory with validation surface row
- `src/docs/markdown/index.md` — link to new validation pages

**Per-component "Validation" section spec (mandatory headings + minimum examples):**

Every form component markdown file gets a `## Validation` section with the following structure:

```
## Validation
### Validation Props
  • Table: isInvalid, errorMessage, hint — type, default, description
### Validation Events
  • Table: aegovValidate — payload shape, when fired
### Validation Methods
  • Table: validate(), setCustomValidity(msg) — signature, return
### Common Validation Recipes (cookbook — limited to common use cases)
  • 3 minimum runnable code blocks per component, each with rendered demo
### Accessibility
  • aria-invalid wiring, aria-describedby chain, role="alert" usage
### Cross-link
  • "Use with @aegov/design-system-validation" → links to Layer 2 page (§3.11)
```

**Per-component cookbook scope (common use cases only — NOT exhaustive):**

| Component | Required cookbook recipes (3 minimum each) |
|---|---|
| `aegov-input` | Required field, email format, min/max length, pattern regex |
| `aegov-textarea` | Required field, max length with counter, profanity check (custom) |
| `aegov-select` | Required selection, conditional required (depends on another field) |
| `aegov-checkbox` | Required (terms acceptance), check-all behavior |
| `aegov-checkbox-group` | At least one selected, max selections allowed |
| `aegov-radio-group` | Required selection, default value validation |
| `aegov-toggle` | Required on (consent), conditional dependent field |
| `aegov-range` | Min/max bounds, step constraint, range mode min ≤ max |
| `aegov-otp` | Length match, pattern (numeric/alphanumeric), expired-code custom error |
| `aegov-fileupload` | Max file size, mime type allowlist, max file count |
| `aegov-datepicker` | Min/max bounds, blackout dates, range duration limit |
| `aegov-form-field` | Cascade error to child, hint vs error precedence |

Each recipe = one runnable code block (HTML + JS) under 30 lines, plus 1-line "what this demonstrates" caption.

**Run `node scripts/build-docs.js`** after authoring markdown.

### 2.10 Release

- Branch: `feat/validation-surface`
- Conventional Commits, one logical commit per component group
- PR with checklist:
  - [ ] All 13 components updated
  - [ ] Shared utils added
  - [ ] 156 new tests passing
  - [ ] Coverage 100%
  - [ ] Docs regenerated
  - [ ] React wrappers regenerate (auto via `@stencil/react-output-target`)
  - [ ] Manual smoke in `examples/` apps
- Version bump: `0.1.0 → 0.2.0` (minor; additive surface, no breaking change)
- Changelog under `## [0.2.0]` with sections "Added", "Improved"
- Tag, push, npm publish (CI on main)

---

## 3. Layer 2 — Validation Orchestrator Package

### 3.1 Package Layout

**Repo:** `/Users/moiz/Projects/TDRA/aegov-designsystem-validation` (separate repo, decided in §6.1)
**Package name:** `@aegov/design-system-validation`
**Peer dependency:** `@aegov/design-system >=0.2.0 <1.0.0`

Tree:

```
aegov-designsystem-validation/
├── package.json                 # name, exports map, peer deps
├── tsconfig.json
├── tsup.config.ts               # ESM + CJS dual build
├── size-limit.config.js         # CI bundle budgets
├── README.md
├── CHANGELOG.md
├── src/
│   ├── core/
│   │   ├── orchestrator.ts      # public createForm()
│   │   ├── registry.ts          # path ↔ element map + dependency graph
│   │   ├── debounce.ts          # per-field debounce + race-token guard
│   │   ├── values.ts            # collect form values from elements
│   │   ├── events.ts            # internal event bus
│   │   ├── types.ts             # ValidatorAdapter, FieldDescriptor, etc.
│   │   └── index.ts
│   ├── adapters/
│   │   ├── valibot.ts
│   │   ├── zod.ts
│   │   ├── vest.ts
│   │   ├── native.ts
│   │   └── index.ts
│   ├── frameworks/
│   │   ├── react.ts             # useAegovForm hook
│   │   ├── vue.ts               # useAegovForm composable
│   │   ├── angular.ts           # AegovFormDirective + AegovFieldDirective
│   │   ├── vanilla.ts           # createForm re-export + attachForm helper
│   │   └── index.ts
│   ├── i18n/
│   │   ├── en.ts
│   │   ├── ar.ts
│   │   └── index.ts
│   └── index.ts                 # barrel — vanilla API
├── tests/
│   ├── unit/                    # Vitest
│   ├── integration/             # adapter round-trips
│   └── e2e/                     # Puppeteer + real components
└── examples/
    ├── vanilla/
    ├── react/
    ├── vue/
    └── angular/
```

`package.json` `"exports"` declares every subpath:

```jsonc
{
  "name": "@aegov/design-system-validation",
  "version": "0.1.0",
  "repository": "github:tdra/aegov-designsystem-validation",
  "type": "module",
  "exports": {
    ".": { "import": "./dist/index.js", "require": "./dist/index.cjs", "types": "./dist/index.d.ts" },
    "./adapters/valibot": { "import": "./dist/adapters/valibot.js", "require": "./dist/adapters/valibot.cjs", "types": "./dist/adapters/valibot.d.ts" },
    "./adapters/zod":     { "import": "./dist/adapters/zod.js",     "require": "./dist/adapters/zod.cjs",     "types": "./dist/adapters/zod.d.ts" },
    "./adapters/vest":    { "import": "./dist/adapters/vest.js",    "require": "./dist/adapters/vest.cjs",    "types": "./dist/adapters/vest.d.ts" },
    "./adapters/native":  { "import": "./dist/adapters/native.js",  "require": "./dist/adapters/native.cjs",  "types": "./dist/adapters/native.d.ts" },
    "./react":            { "import": "./dist/frameworks/react.js", "require": "./dist/frameworks/react.cjs", "types": "./dist/frameworks/react.d.ts" },
    "./vue":              { "import": "./dist/frameworks/vue.js",   "require": "./dist/frameworks/vue.cjs",   "types": "./dist/frameworks/vue.d.ts" },
    "./angular":          { "import": "./dist/frameworks/angular.js","require": "./dist/frameworks/angular.cjs","types": "./dist/frameworks/angular.d.ts" },
    "./i18n/en":          "./dist/i18n/en.js",
    "./i18n/ar":          "./dist/i18n/ar.js"
  },
  "peerDependencies": {
    "@aegov/design-system": ">=0.2.0",
    "valibot": ">=0.30.0",
    "zod": ">=3.22.0",
    "vest": ">=5.0.0",
    "react": ">=18.0.0",
    "vue": ">=3.4.0",
    "@angular/core": ">=17.0.0"
  },
  "peerDependenciesMeta": {
    "valibot": { "optional": true }, "zod": { "optional": true }, "vest": { "optional": true },
    "react":   { "optional": true }, "vue": { "optional": true }, "@angular/core": { "optional": true }
  }
}
```

### 3.2 Public API

**Vanilla:**

```ts
import { createForm } from '@aegov/design-system-validation';
import { valibotAdapter } from '@aegov/design-system-validation/adapters/valibot';
import * as v from 'valibot';

const schema = v.object({
  email: v.pipe(v.string(), v.email('Invalid email')),
  password: v.pipe(v.string(), v.minLength(8, 'Min 8 chars')),
});

const form = createForm(
  document.querySelector<HTMLFormElement>('form#login')!,
  schema,
  valibotAdapter(),
  { mode: 'onBlur', debounce: 200 }
);

await form.validate();             // Promise<{ valid, errors }>
await form.validateField('email'); // Promise<{ valid, errors }>
form.getValues();                  // Record<string, unknown>
form.setValue('email', 'a@b.com');
form.reset();
form.destroy();
```

**React:**

```tsx
import { useAegovForm } from '@aegov/design-system-validation/react';

function LoginForm() {
  const { formRef, handleSubmit, errors, isValid } = useAegovForm({
    schema, adapter: valibotAdapter(),
  });
  return (
    <form ref={formRef} onSubmit={handleSubmit(values => api.login(values))}>
      <AegovInput name="email" />
      <AegovInput name="password" type="password" />
      <AegovButton type="submit" isDisabled={!isValid}>Login</AegovButton>
    </form>
  );
}
```

**Vue:**

```vue
<script setup>
import { useAegovForm } from '@aegov/design-system-validation/vue';
const { formRef, handleSubmit, errors, isValid } = useAegovForm({ schema, adapter });
</script>
<template>
  <form ref="formRef" @submit.prevent="handleSubmit(onSubmit)">
    <aegov-input name="email" />
    <aegov-input name="password" type="password" />
  </form>
</template>
```

**Angular:**

```html
<form [aegovForm]="{ schema, adapter }" (submitValid)="onSubmit($event)">
  <aegov-input name="email"></aegov-input>
  <aegov-input name="password" type="password"></aegov-input>
</form>
```

### 3.3 Adapter Contract

```ts
// packages/aegov-design-system-validation/src/core/types.ts
export interface ValidatorAdapter<Schema = unknown> {
  validate(schema: Schema, value: unknown, ctx?: ValidationContext): Promise<AdapterResult> | AdapterResult;
  validateField(schema: Schema, fieldPath: string, value: unknown, ctx?: ValidationContext): Promise<AdapterResult> | AdapterResult;
  parseSchema?(schema: Schema): FieldDescriptor[];
}

export interface AdapterResult {
  valid: boolean;
  issues: ValidationIssue[];
}

export interface ValidationIssue {
  path: string;
  message: string;
  code?: string;
}

export interface FieldDescriptor {
  path: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: string;
  dependsOn?: string[];
}

export interface ValidationContext {
  formValues: Record<string, unknown>;
  locale?: string;
  signal?: AbortSignal;
}

export type ValidationMode = 'onChange' | 'onInput' | 'onBlur' | 'onSubmit';

export interface CreateFormOptions {
  /**
   * Optional — invoked when full-form validation passes on submit.
   * Decision §6.5 (hybrid):
   *  • If provided, native submit is suppressed; callback handles it.
   *  • If absent, orchestrator re-dispatches native submit so `<form action>` works.
   * Framework helpers (React/Vue/Angular) require this via their own option types.
   */
  onValidSubmit?: (values: Record<string, unknown>) => void | Promise<void>;
  mode?: ValidationMode;            // default 'onBlur'
  reValidateMode?: 'onChange' | 'onBlur';
  debounce?: number;                // default 200
  messageResolver?: (issue: ValidationIssue) => string;
  scrollToError?: boolean;          // default true on submit
  hydrateProps?: boolean;           // default false — opt-in auto isRequired/min/max from schema
  dependencies?: Record<string, string[]>;
  onErrorsChange?: (errors: Record<string, string>) => void;
}
```

### 3.4 Orchestrator Implementation

**File:** `src/core/orchestrator.ts` (~250 LOC)

```ts
import type { ValidatorAdapter, CreateFormOptions, AdapterResult, ValidationIssue, ValidationMode } from './types';
import { Registry } from './registry';
import { Debouncer } from './debounce';

const SELECTORS = [
  'aegov-input', 'aegov-textarea', 'aegov-select',
  'aegov-checkbox', 'aegov-checkbox-group',
  'aegov-radio', 'aegov-radio-group',
  'aegov-toggle', 'aegov-range',
  'aegov-otp', 'aegov-fileupload', 'aegov-datepicker',
].join(',');

export interface FormApi {
  validate(): Promise<AdapterResult>;
  validateField(path: string): Promise<AdapterResult>;
  getValues(): Record<string, unknown>;
  setValue(path: string, value: unknown): void;
  setValues(values: Record<string, unknown>): void;
  reset(): void;
  destroy(): void;
}

export function createForm<S>(
  rootEl: HTMLFormElement | HTMLElement,
  schema: S,
  adapter: ValidatorAdapter<S>,
  options: CreateFormOptions = {}
): FormApi {
  const opts = {
    mode: 'onBlur' as ValidationMode,
    reValidateMode: 'onChange' as 'onChange' | 'onBlur',
    debounce: 200,
    messageResolver: (i: ValidationIssue) => i.message,
    scrollToError: true,
    hydrateProps: false,
    dependencies: {} as Record<string, string[]>,
    onErrorsChange: (() => {}) as (errors: Record<string, string>) => void,
    onValidSubmit: undefined as ((v: Record<string, unknown>) => void | Promise<void>) | undefined,
    ...options,
  };

  const registry = new Registry(rootEl, SELECTORS);
  const debouncer = new Debouncer(opts.debounce);
  const errors = new Map<string, string>();
  let firstErrorReported = new Set<string>();

  // Gap §7.2 fix: hydration race — registry walks now via internal `ready` promise.
  // Public methods (validate, validateField, etc.) await `ready` before touching registry.
  const ready = (async () => {
    const tags = SELECTORS.split(',').map(t => t.trim());
    await Promise.all(tags.map(tag => customElements.whenDefined(tag)));
    registry.populate(); // walks DOM after all aegov-* tags defined
    if (opts.hydrateProps) hydrateComponentProps(registry, descriptors);
  })();

  // Build dependency graph (synchronous — schema parsing doesn't depend on DOM)
  const descriptors = adapter.parseSchema?.(schema) ?? [];
  const depGraph = buildDependencyGraph(descriptors, opts.dependencies);

  // Gap §7.9 fix: auto-cleanup if rootEl detached from document — prevents leaks on SPA route change
  const detachObserver = new MutationObserver(() => {
    if (!rootEl.isConnected) {
      console.debug('[@aegov/design-system-validation] rootEl detached — auto-destroying form orchestrator');
      api.destroy();
    }
  });
  detachObserver.observe(rootEl.ownerDocument!.body, { childList: true, subtree: true });

  // Event delegation — single listener at root
  const onValidate = (e: Event) => {
    const detail = (e as CustomEvent).detail;
    const target = e.target as HTMLElement;
    const path = target.getAttribute('name');
    if (!path) return;
    if (!shouldValidate(detail.trigger, opts.mode, opts.reValidateMode, firstErrorReported.has(path))) return;
    debouncer.schedule(path, () => runField(path, detail.value));
  };

  rootEl.addEventListener('aegovValidate', onValidate);

  const REENTRY_FLAG = Symbol('aegov-validated');

  const onSubmit = async (e: SubmitEvent) => {
    if ((e as any)[REENTRY_FLAG]) return;            // re-dispatched submit — let browser handle native POST
    e.preventDefault();
    const result = await runFull();
    if (!result.valid) {
      if (opts.scrollToError) {
        const firstInvalid = registry.find(result.issues[0].path);
        firstInvalid?.focus?.();
        firstInvalid?.scrollIntoView?.({ behavior: 'smooth', block: 'center' });
      }
      return;
    }
    const values = collectValues();
    if (opts.onValidSubmit) {
      await opts.onValidSubmit(values);
      return;
    }
    // Decision §6.5 hybrid — no callback, re-dispatch native submit (progressive enhancement)
    if (rootEl instanceof HTMLFormElement) {
      const evt = new SubmitEvent('submit', { cancelable: true, bubbles: true });
      (evt as any)[REENTRY_FLAG] = true;
      const proceed = rootEl.dispatchEvent(evt);
      if (proceed) rootEl.submit();
    }
  };

  if (rootEl instanceof HTMLFormElement) rootEl.addEventListener('submit', onSubmit);

  async function runField(path: string, value: unknown): Promise<AdapterResult> {
    const ctx = { formValues: collectValues(), signal: undefined };
    const result = await adapter.validateField(schema, path, value, ctx);
    applyFieldResult(path, result);
    // Cascade to dependents
    for (const dep of depGraph.dependents(path)) {
      const depEl = registry.find(dep);
      if (depEl) await runField(dep, depEl.value);
    }
    return result;
  }

  async function runFull(): Promise<AdapterResult> {
    const values = collectValues();
    const result = await adapter.validate(schema, values);
    applyFullResult(result);
    return result;
  }

  function applyFieldResult(path: string, result: AdapterResult) {
    const el = registry.find(path);
    if (!el) return;
    const issue = result.issues.find(i => i.path === path);
    if (issue) {
      const msg = opts.messageResolver(issue);
      el.isInvalid = true;
      el.errorMessage = msg;
      el.setCustomValidity?.(msg);
      errors.set(path, msg);
      firstErrorReported.add(path);
    } else {
      el.isInvalid = false;
      el.errorMessage = '';
      el.setCustomValidity?.('');
      errors.delete(path);
    }
    opts.onErrorsChange(Object.fromEntries(errors));
  }

  function applyFullResult(result: AdapterResult) {
    const seen = new Set<string>();
    for (const issue of result.issues) {
      seen.add(issue.path);
      applyFieldResult(issue.path, { valid: false, issues: [issue] });
    }
    for (const path of registry.paths()) {
      if (!seen.has(path)) applyFieldResult(path, { valid: true, issues: [] });
    }
  }

  function collectValues(): Record<string, unknown> {
    return registry.collectValues();
  }

  const api: FormApi = {
    // Gap §7.2 fix: every method awaits `ready` so late-hydrated components are seen
    validate:      async () => { await ready; return runFull(); },
    validateField: async (path: string) => { await ready; return runField(path, registry.find(path)?.value); },
    getValues:     () => { return collectValues(); }, // sync read of current registry; OK to call early — returns partial if not ready
    setValue:      (path, val) => { ready.then(() => registry.setValue(path, val)); },
    setValues:     (vals) => { ready.then(() => Object.entries(vals).forEach(([k, v]) => registry.setValue(k, v))); },
    reset:         () => { ready.then(() => { errors.clear(); firstErrorReported.clear(); registry.reset(); }); },
    destroy:       () => {
      rootEl.removeEventListener('aegovValidate', onValidate);
      if (rootEl instanceof HTMLFormElement) rootEl.removeEventListener('submit', onSubmit);
      debouncer.cancelAll();
      detachObserver.disconnect();   // §7.9 fix
      registry.destroy();
    },
  };
  return api;
}
```

**Registry (`src/core/registry.ts`, ~120 LOC):** holds `Map<path, HTMLElement>`, observes mutations to track dynamic add/remove via `MutationObserver`, exposes `find/paths/collectValues/setValue/reset/destroy`.

**Debouncer (`src/core/debounce.ts`, ~50 LOC):** per-key timeout + token map for race-condition-safe async result acceptance.

### 3.5 Default Adapter — Valibot

**File:** `src/adapters/valibot.ts` (~120 LOC)

```ts
import * as v from 'valibot';
import type { ValidatorAdapter, AdapterResult, FieldDescriptor } from '../core/types';

export const valibotAdapter = (): ValidatorAdapter<v.BaseSchema<any, any, any>> => ({
  async validate(schema, value) {
    const result = await v.safeParseAsync(schema, value);
    return toResult(result);
  },
  async validateField(schema, path, value, ctx) {
    const subSchema = pluckSchemaAtPath(schema, path);
    if (!subSchema) return { valid: true, issues: [] };
    const result = await v.safeParseAsync(subSchema, value);
    return toResult(result, path);
  },
  parseSchema(schema) {
    return walkValibotSchema(schema);
  },
});

function toResult(result: v.SafeParseResult<any>, basePath = ''): AdapterResult {
  if (result.success) return { valid: true, issues: [] };
  return {
    valid: false,
    issues: result.issues.map(i => ({
      path: [basePath, ...(i.path?.map(p => String(p.key)) ?? [])].filter(Boolean).join('.'),
      message: i.message,
      code: i.type,
    })),
  };
}

function pluckSchemaAtPath(schema: any, path: string): any {
  const parts = path.split('.');
  let cur = schema;
  for (const p of parts) {
    if (cur?.type === 'object' && cur.entries?.[p]) cur = cur.entries[p];
    else if (cur?.type === 'array' && cur.item) cur = cur.item;
    else return null;
  }
  return cur;
}

function walkValibotSchema(schema: any, prefix = ''): FieldDescriptor[] {
  const out: FieldDescriptor[] = [];
  if (schema?.type === 'object') {
    for (const [key, sub] of Object.entries<any>(schema.entries ?? {})) {
      const path = prefix ? `${prefix}.${key}` : key;
      const desc: FieldDescriptor = { path };
      // walk pipe steps for constraints
      const pipes = sub?.pipe ?? [];
      for (const step of pipes) {
        if (step.type === 'min_length') desc.minLength = step.requirement;
        if (step.type === 'max_length') desc.maxLength = step.requirement;
        if (step.type === 'regex') desc.pattern = String(step.requirement);
        if (step.type === 'min_value') desc.min = step.requirement;
        if (step.type === 'max_value') desc.max = step.requirement;
      }
      if (!sub?.async && !sub?.optional) desc.required = true;
      out.push(desc);
      out.push(...walkValibotSchema(sub, path));
    }
  }
  return out;
}
```

### 3.6 Alt Adapters

**Zod (`src/adapters/zod.ts`, ~100 LOC):**

```ts
import { z, ZodError } from 'zod';
export const zodAdapter = (): ValidatorAdapter<z.ZodTypeAny> => ({
  async validate(schema, value) {
    const r = await schema.safeParseAsync(value);
    if (r.success) return { valid: true, issues: [] };
    return { valid: false, issues: r.error.issues.map(i => ({
      path: i.path.join('.'), message: i.message, code: i.code,
    }))};
  },
  async validateField(schema, path, value) {
    const sub = pluckZodAtPath(schema, path);
    if (!sub) return { valid: true, issues: [] };
    const r = await sub.safeParseAsync(value);
    if (r.success) return { valid: true, issues: [] };
    return { valid: false, issues: r.error.issues.map(i => ({
      path, message: i.message, code: i.code,
    }))};
  },
  parseSchema(schema) { return walkZodObject(schema); },
});
```

**Vest (`src/adapters/vest.ts`, ~120 LOC):** wraps a `vest.create()` suite; `only(path)` for field validation; collects `result.getErrors()` per path.

**Native (`src/adapters/native.ts`, ~70 LOC):** no schema; reads `el.validity` + `el.validationMessage` from each registered element via ElementInternals.

### 3.7 Framework Helpers

**React (`src/frameworks/react.ts`, ~140 LOC):**

Gap §7.6 fix — schema → values type inference. Generic `S` carries through to `handleSubmit` callback, so `values` is typed exactly per schema (Valibot `InferOutput` / Zod `infer`). No `any` leak.

```ts
import { useEffect, useRef, useState, useCallback } from 'react';
import { createForm, type CreateFormOptions, type ValidatorAdapter } from '../core';

/**
 * Helper to extract value type from a schema. Adapter authors implement this
 * via declaration merging or pass an explicit Values generic.
 */
export type InferValues<A extends ValidatorAdapter<any>> =
  A extends ValidatorAdapter<infer S>
    ? // Valibot
      S extends { _types?: { input: infer V } } ? V :
      // Zod
      S extends { _output: infer V } ? V :
      // Fallback
      Record<string, unknown>
    : Record<string, unknown>;

export interface UseAegovFormOptions<S, A extends ValidatorAdapter<S>>
  extends Omit<CreateFormOptions, 'onValidSubmit'> {
  schema: S;
  adapter: A;
  defaultValues?: Partial<InferValues<A>>;
}

export function useAegovForm<S, A extends ValidatorAdapter<S>>(opts: UseAegovFormOptions<S, A>) {
  type Values = InferValues<A>;
  const formRef = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isValid, setIsValid] = useState(true);
  const apiRef = useRef<ReturnType<typeof createForm>>();

  useEffect(() => {
    if (!formRef.current) return;
    const api = createForm(formRef.current, opts.schema, opts.adapter, {
      ...opts,
      onErrorsChange: errs => {
        setErrors(errs);
        setIsValid(Object.keys(errs).length === 0);
      },
    });
    if (opts.defaultValues) api.setValues(opts.defaultValues);
    apiRef.current = api;
    return () => api.destroy();
  }, [opts.schema, opts.adapter]);

  const handleSubmit = useCallback(
    (onValid: (values: Values) => void | Promise<void>) =>
      async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await apiRef.current!.validate();
        if (result.valid) await onValid(apiRef.current!.getValues() as Values);
      },
    []
  );

  return {
    formRef, errors, isValid, handleSubmit,
    setValue: <K extends keyof Values>(k: K, v: Values[K]) => apiRef.current?.setValue(k as string, v),
    reset: () => apiRef.current?.reset(),
    getValues: () => (apiRef.current?.getValues() ?? {}) as Values,
  };
}
```

**Vue (`src/frameworks/vue.ts`, ~140 LOC):** mirrors React but uses `ref`/`reactive`/`onMounted`/`onBeforeUnmount`. **Same `InferValues<A>` generic propagation** so Vue users get typed `values` in `handleSubmit` callbacks (gap §7.6 fix).

**Angular (`src/frameworks/angular.ts`, ~180 LOC):** `AegovFormDirective` + optional `AegovFieldDirective` for `ControlValueAccessor` bridge — see prior section. Directive uses `Generic<S, A>` typing on inputs and `EventEmitter<InferValues<A>>` for `submitValid` (gap §7.6 fix).

**Vanilla (`src/frameworks/vanilla.ts`, ~30 LOC):** thin re-export of `createForm` + `attachForm(selector, schema, adapter, opts)` shorthand.

### 3.8 Async, Cross-Field, i18n

**Async** — adapter contract returns `Promise<AdapterResult> | AdapterResult`. Orchestrator sets `data-validating="true"` on the firing element while awaiting; race tokens discard stale results; `AbortSignal` in context.

**Cross-field** — orchestrator builds dependency graph from `adapter.parseSchema()` output (`dependsOn` field) or from explicit `dependencies` option. When source field changes → re-validates dependents.

**i18n** — three-layer cascade:

1. Schema-supplied messages
2. `messageResolver` option (global hook)
3. `@aegov/design-system-validation/i18n/{en,ar}` default catalogs

**Gap §7.7 fix — native browser message NEVER used in app UI:** `HTMLInputElement.validationMessage` returns a string localized to the **browser's UI language**, not the app's locale. An Arabic AEGOV form running in an English-locale browser would show English fallback messages — leak into RTL layout, broken UX.

**Rule:** the native adapter (`adapters/native.ts`) reads `el.validity` flags only and maps each truthy flag to a key in the i18n bundle. It does NOT read `el.validationMessage`. Same for any other adapter that bridges native validity. Bundle keys cover every `ValidityState` flag:

```ts
// adapters/native.ts excerpt
function deriveKey(v: ValidityState): string {
  if (v.valueMissing) return 'required';
  if (v.typeMismatch) return 'type';
  if (v.patternMismatch) return 'pattern';
  if (v.tooLong) return 'max_length';
  if (v.tooShort) return 'min_length';
  if (v.rangeOverflow) return 'max_value';
  if (v.rangeUnderflow) return 'min_value';
  if (v.stepMismatch) return 'step';
  if (v.badInput) return 'bad_input';
  if (v.customError) return 'custom';
  return 'invalid';
}
// then look up via opts.messageResolver({ code: deriveKey(v), … })
```

**Test:** unit test sets browser to English, schema to Arabic — assert error message is Arabic from bundle, not English from browser.

```ts
// src/i18n/en.ts
export default {
  required: 'This field is required',
  email: 'Enter a valid email',
  min_length: ({ min }: { min: number }) => `Must be at least ${min} characters`,
  max_length: ({ max }: { max: number }) => `Must be at most ${max} characters`,
  pattern: 'Invalid format',
  min_value: ({ min }: { min: number }) => `Must be at least ${min}`,
  max_value: ({ max }: { max: number }) => `Must be at most ${max}`,
};
```

### 3.9 Build & Tooling

- **TypeScript** 5.8, target ES2022, strict mode, `moduleResolution: "bundler"`
- **Bundler**: `tsup` for ESM-primary + CJS fallback, source maps, `.d.ts` per entry
- **Lint**: ESLint with `@typescript-eslint`, Prettier
- **Pre-commit**: Husky + lint-staged
- **Bundle budgets** (CI fail on regression):

  | Entry | Budget |
  |---|---|
  | core (`index.js`) | ≤ 3 kB gzip |
  | adapters/valibot | ≤ 2 kB |
  | adapters/zod | ≤ 2 kB |
  | adapters/vest | ≤ 2.5 kB |
  | adapters/native | ≤ 1 kB |
  | react | ≤ 2 kB |
  | vue | ≤ 2 kB |
  | angular | ≤ 2.5 kB |

  Configured via `size-limit.config.js`; runs on every PR.

- **CI** (`.github/workflows/ci.yml` extension or new):
  - Install workspace deps
  - Lint + typecheck
  - Unit + integration tests with coverage report
  - Build all entries
  - Bundle budget check
  - E2E in Puppeteer (real browser)
  - Smoke: build all `examples/` apps

### 3.10 Testing

| Layer | Tool | Scope |
|---|---|---|
| Unit | Vitest | orchestrator state machine, registry, debounce, race tokens, dependency graph, schema path-pluck |
| Integration | Vitest + jsdom | adapter round-trip with synthetic schemas (invalid/valid/cross-field/async) per adapter |
| E2E | Stencil's `newE2EPage` (Puppeteer) | real `aegov-*` components, `createForm` attached, simulate user, assert UI + form participation |
| Framework smoke | Playwright | minimal apps under `examples/{react,vue,angular}/` |
| A11y | extend Layer 1 a11y suite | `aria-invalid` / `aria-describedby` correct after orchestrator runs |

**Coverage target:** 95%+ on `src/core/` and `src/adapters/`.

### 3.11 Documentation

#### 3.11.1 Pages and example minimums

Every page in the docs site has a mandatory minimum number of runnable code examples. Examples are full snippets (imports + setup + JSX/HTML + handler), not pseudocode.

| Page | Min examples | Required example types |
|---|---|---|
| Package README | 5 | install, quick-start vanilla, quick-start React, quick-start Vue, quick-start Angular |
| `validation.md` (overview) | 3 | minimal vanilla, framework-agnostic concept, when to use Layer 2 vs Layer 1-only |
| `validation-valibot.md` | 6 | object schema, async, cross-field refine, custom message, transform, RTL message |
| `validation-zod.md` | 5 | object schema, async, refine, error map, discriminated union |
| `validation-vest.md` | 4 | suite, only(), async, group |
| `validation-native.md` | 3 | minimal, custom validity bridge, no-schema use case |
| `validation-react.md` | 5 | login, file upload, conditional fields, async username, controlled vs uncontrolled |
| `validation-vue.md` | 5 | login, file upload, conditional fields, async username, `<script setup>` vs Options API |
| `validation-angular.md` | 6 | directive-only, Reactive Forms via CVA, template-driven, async validator, cross-field, dynamic forms |
| `validation-byo.md` | 4 | listen + setCustomValidity, server-side validation only, hybrid client+server, BYO regex engine |
| `validation-hydrate-props.md` | 2 | enabled vs disabled before/after diff, clobber rules demo |
| `validation-i18n.md` (new — see §3.11.4) | 4 | messageResolver default, per-locale Valibot messages, Arabic + RTL screenshot, fallback chain |

Total: ≥52 runnable examples site-wide.

Each example block includes:
- One-line caption above the block ("Validates email format with custom message")
- Imports + complete code (no `…` placeholder mid-block)
- Expected result comment or rendered demo iframe link
- Cross-reference link to API docs for any new symbol introduced

#### 3.11.2 Recipes (cookbook)

Stored in `src/docs/markdown/recipes/`. Each recipe is a single page, runnable end-to-end:

- `recipe-login-valibot.md` — email + password, error messages, submit handler
- `recipe-fileupload.md` — size/type/count enforcement, Arabic error fallback
- `recipe-async-username.md` — Zod + fetch + AbortSignal, debounce, race protection demo
- `recipe-date-range.md` — `aegov-datepicker` range mode + cross-field min/max
- `recipe-rtl-arabic.md` — full RTL form with `dir="rtl"`, Arabic schema messages, Alexandria font
- `recipe-conditional-fields.md` — show/hide field based on toggle, validate only if visible
- `recipe-multi-step-form.md` — wizard with per-step validation, schema slicing
- `recipe-server-side-only.md` — Layer 1 + native adapter + server response → `setCustomValidity`

Each recipe page structure:
```
## Goal
## Result (animated GIF or screenshot)
## Schema
## Markup
## JavaScript / framework code
## How it works (3-5 bullets)
## Variations (optional)
```

#### 3.11.3 Cross-link map (Layer 1 ↔ Layer 2)

Mandatory bidirectional links so readers never hit a dead end:

**From Layer 1 docs to Layer 2:**
- Each component "Validation" section ends with: "Use with `@aegov/design-system-validation`" → links to relevant Layer 2 page (default: `validation.md` overview, plus framework-specific link if applicable)
- `validation-overview.md` ends with: "Drive validation from a schema" → `validation.md`
- `validation-byo.md` ends with: "Prefer schema-driven? See `@aegov/design-system-validation`" → `validation.md`

**From Layer 2 docs to Layer 1:**
- Every Layer 2 page top: "Requires `@aegov/design-system >=0.2.0` validation surface" → `validation-overview.md`
- Adapter pages (`validation-valibot.md` etc.) link to the relevant Layer 1 component validation section when discussing per-component behavior
- Framework pages (`validation-react.md` etc.) link to the per-component cookbook recipes for component-specific examples
- API ref (TypeDoc) cross-links to component README via Stencil docs URL pattern

**Cross-link audit:** automated check in CI — run a markdown link checker (`markdown-link-check` or `lychee`) across both repos' docs in a single linting workflow. CI fails on broken cross-link.

**Site-wide nav:** add a unified "Validation" top-level navigation section showing both Layer 1 (component surface) and Layer 2 (orchestrator package) entries side-by-side; users see they're complementary.

#### 3.11.4 i18n recipe — `messageResolver` + Arabic

New page `validation-i18n.md` covers full localization flow. Required content:

**Sections:**
1. **Three-layer cascade explained** — schema messages → `messageResolver` option → default i18n bundles
2. **Default English bundle** — list every key
3. **Arabic bundle** — full RTL example with proper Kufi/Alexandria typography callout
4. **Custom `messageResolver`** — bridge to existing app i18n framework (i18next, vue-i18n, ngx-translate)
5. **Per-locale schemas** — Valibot pattern for swapping messages by locale at form init
6. **RTL handling** — error icon mirroring rules (does NOT mirror per §6.7), text direction inheritance
7. **Pluralization and ICU** — escape hatch via `messageResolver` for complex grammar

**Required examples:**

```ts
// 1. Default fallback
import en from '@aegov/design-system-validation/i18n/en';
createForm(form, schema, adapter, {
  messageResolver: (issue) => en[issue.code] ?? issue.message,
});
```

```ts
// 2. Arabic
import ar from '@aegov/design-system-validation/i18n/ar';
createForm(form, schema, adapter, {
  messageResolver: (issue) => {
    const tpl = ar[issue.code] ?? issue.message;
    return typeof tpl === 'function' ? tpl(issue) : tpl;
  },
});
```

```ts
// 3. Bridge to i18next
import i18next from 'i18next';
createForm(form, schema, adapter, {
  messageResolver: (issue) => i18next.t(`validation.${issue.code}`, issue),
});
```

```ts
// 4. Per-locale Valibot schema factory
const makeSchema = (locale: 'en' | 'ar') => v.object({
  email: v.pipe(v.string(), v.email(locale === 'ar' ? 'بريد إلكتروني غير صحيح' : 'Invalid email')),
});
```

**Required screenshots:** rendered LTR English form with error + rendered RTL Arabic form with error (side by side).

**Cross-references:**
- Links to `aegov-i18n` general docs (if exists)
- Links to Tailwind RTL configuration in design system

#### 3.11.5 Schema migration guides

New folder `src/docs/markdown/migration/`. Each guide covers one source library → target adapter, with a working example before/after.

Guides to ship in `0.1.0`:

1. **`migrate-from-yup.md`** — Yup `object().shape({...})` → Valibot `v.object({...})` cheat-sheet
2. **`migrate-from-joi.md`** — Joi → Valibot or Zod (pick destination based on Joi feature compat)
3. **`migrate-from-react-hook-form.md`** — RHF `register` + `Controller` → `useAegovForm` hook
4. **`migrate-from-formik.md`** — Formik `<Formik>` + `<Field>` → `useAegovForm` + aegov components
5. **`migrate-from-vee-validate.md`** — VeeValidate `useField` → `useAegovForm` Vue composable
6. **`migrate-from-angular-reactive-forms.md`** — pure Reactive Forms → AegovFieldDirective+CVA hybrid

**Each migration guide structure:**

```
## Why migrate
## Feature parity matrix       (table of source feature → aegov equivalent / "not yet" / "different approach")
## Before (full original code, 30-50 lines)
## After (full converted code, 30-50 lines, line-numbered diff if helpful)
## Edge cases and gotchas
## Incremental migration path  (when the codebase is large)
## When NOT to migrate
```

**Required: feature parity matrix** is mandatory in every guide — readers can grep for a specific source-lib feature and see what it maps to.

**Tooling note (future, not blocking 0.1.0):** if migration volume justifies, ship a `npx @aegov/migrate-validation --from yup --to valibot ./src` codemod. Not in scope for 0.1.0.

#### 3.11.6 TypeDoc and API reference

- **TypeDoc** generated from source → published under `/validation/api/`
- Per-symbol page: `createForm`, `ValidatorAdapter`, every adapter, every framework helper
- Cross-link from each TypeDoc page back to the relevant guide (manual `@see` tags in source)
- Search index built into docs site

#### 3.11.7 Versioning of docs

Docs site stores per-version snapshots so consumers on `0.1.x` see matching docs even after `0.2.0` ships. Implementation TBD with main docs site (likely `docusaurus`-style version dropdown).

### 3.12 Release

- **Versioning**: independent semver from `@aegov/design-system`
- **First release**: `0.1.0`, after core `0.2.0` ships Layer 1
- **Contract pin**: `peerDependencies: { "@aegov/design-system": ">=0.2.0 <1.0.0" }`
- **Changeset workflow**: every PR includes `.changeset/*.md`
- **Publish**: GitHub Action on tag push → npm with provenance
- **Cadence**:
  - Patch: bug fixes
  - Minor: new adapters / framework helpers
  - Major: `ValidatorAdapter` or `createForm` signature changes

---

## 4. Combined Roadmap & Sequencing

```
Week  Milestone                                          Output
────  ──────────────────────────────────────────────────  ───────────────────────────────────────────────
 1    L1.1  Shared types + utilities                     types.ts, validation.ts, tests
 1    L1.2  Component pattern proof-of-concept           aegov-input fully migrated; tests green
 2    L1.3  Apply pattern to text/textarea/select        3 components done
 2    L1.4  Apply pattern to checkbox/radio/toggle/range 4 components done
 3    L1.5  ElementInternals on otp/datepicker/fileupload 3 custom controls done
 3    L1.6  ElementInternals on listbox-select + groups   3 components done
 4    L1.7  aegov-form-field cascade                      1 component
 4    L1.8  CSS polish + a11y + cross-component a11y      visual + a11y green
 5    L1.9  Docs regen + markdown updates                 docs site updated
 5    L1.10 PR review + merge + cut 0.2.0                 npm published
────  ──────────────────────────────────────────────────  ───────────────────────────────────────────────
 6    L2.1  Workspace scaffold + tsup + size-limit + CI   package skeleton
 6    L2.2  core/orchestrator + registry + debounce + tests core green
 7    L2.3  Valibot adapter + tests                       valibot path tested end-to-end
 7    L2.4  vanilla framework helper + E2E                createForm + attachForm working
 8    L2.5  React helper + smoke example                  example app green
 8    L2.6  Vue helper + smoke example                    example app green
 9    L2.7  Angular directive + Reactive Forms bridge     example app green
 9    L2.8  Zod, Vest, Native adapters                    3 adapters tested
10    L2.9  i18n bundles (en, ar) + messageResolver       localization complete
10    L2.10 Docs + recipes + TypeDoc                      docs site published
10    L2.11 Cut 0.1.0 release                             npm published
```

Total: ~10 working weeks for a single senior engineer; ~6 weeks with two engineers in parallel after Layer 1 lands.

**Cross-repo coordination (decided per §6.1):** Layer 2 lives in separate repo. Local dev uses `npm link` against built `aegov-dls-3` output. CI in validation repo installs published `@aegov/design-system` matching peer range, plus a nightly job against `next` tag of core to catch contract drift early.

---

## 5. Risks & Mitigations

| # | Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|---|
| 1 | Stencil version below 4.42 — no `@AttachInternals` | Medium | High | Upgrade Stencil first; fall back to manual `el.attachInternals()` if upgrade blocked |
| 2 | ElementInternals has incomplete polyfill in older browsers | Low | Medium | Document Safari ≥16, Firefox ≥98, Chrome ≥77 as supported. Native adapter degrades gracefully |
| 3 | Removing `aegovOtpInvalid` / `aegovFileuploadError` breaks any in-progress consumers | Low | Low | Pre-production lib, no production consumers (decision §6.6). Sweep all `src/docs/pages/` examples for old event names; replace with `aegovValidate` listeners |
| 4 | React wrappers re-generation breaks (`@stencil/react-output-target`) | Medium | High | Run `npm run build` in main repo + smoke test wrappers as part of L1 PR checklist |
| 5 | Bundle budgets fail (Valibot tree-shake worse than expected) | Low | Medium | Audit imports; only import specific pipes; CI fails fast |
| 6 | Cross-field dependency graph misses transitive deps | Medium | Medium | Topological order in `parseSchema`; integration test with 3-level dependency chain |
| 7 | `formdata` event payload duplicates values across native+ElementInternals on same component | Low | High | Pick one mechanism per component; ElementInternals only when no inner native; integration test |
| 8 | Listbox `aegov-select` value reads vary by mode (single string vs comma-separated multi) | Medium | Medium | Component exposes typed `value` getter; orchestrator uses `el.value` not attribute |
| 9 | `aria-describedby` ID collisions when same form has duplicate component types | Low | Low | Use `generateId()` (already module-level counter) |
| 10 | Async race conditions cancel mid-flight HTTP that user expected to complete (e.g. analytics) | Low | Low | Document `AbortSignal` semantics; adapters honor signal |
| 11 | Cross-repo test framework split (core: Jest, validation: Vitest) | Low | Low | Bookkeeping — Vitest can run integration tests against built core via npm install; document boundary in validation repo CONTRIBUTING.md |
| 12 | Layer 1 surface adds ~10–15 KB to core bundle; no budget tracked | Medium | Medium | Bookkeeping — add `size-limit` to `aegov-dls-3` for `dist/aegov.esm.js` and `dist/aegov.css`; baseline pre-Layer 1, set budget at +20 KB ceiling post-Layer 1 |
| 13 | `@stencil/react-output-target` regen sequencing missed in PR | Medium | Medium | Bookkeeping — add explicit step to Layer 1 PR checklist: "React wrappers regenerated and `aegov-dls-3-react` smoke tested" |
| 14 | Validation repo CI nightly job has no `next` tag on core to test against | Low | Medium | Bookkeeping — set up release-train tooling in core repo as prerequisite; or fall back to `main` branch tarball install in nightly job |
| 15 | Async validation `data-validating="true"` has no shipped spinner CSS | Low | Low | Bookkeeping — ship default spinner in `src/global/global.css` for `[data-validating="true"]`, OR document required CSS in `validation-overview.md` |
| 16 | Performance regression for forms with 100+ fields | Low | Medium | Bookkeeping — add benchmark fixture (`tests/perf/large-form.spec.ts`) measuring init + per-field validate; baseline target ≤16 ms init for 100 fields, ≤2 ms per field validate |

---

## 6. Open Questions

### 6.1 Workspace topology — **DECIDED: Option B (separate repo)**

**Decision:** Separate repo at `/Users/moiz/Projects/TDRA/aegov-designsystem-validation` (already created).
**Package name:** `@aegov/design-system-validation`
**Implications:**
- No workspace restructure needed in `aegov-dls-3`
- Layer 1 contract changes require coordinated PRs across two repos — track via `peerDependencies` semver range and integration smoke job in CI
- Local development uses `npm link` or `file:` protocol against `aegov-dls-3` build output
- CI in validation repo runs against published `@aegov/design-system` versions matching `peerDependencies` range
- Release cycles independent

### 6.2 Default adapter — **DECIDED: Option B (explicit)**

**Decision:** No pre-bundled adapter. Consumer always imports adapter explicitly:
```ts
import { createForm } from '@aegov/design-system-validation';
import { valibotAdapter } from '@aegov/design-system-validation/adapters/valibot';
```
**Implications:**
- Core barrel `index.ts` exports `createForm` + types only — zero adapter code
- All adapters (`valibot`, `zod`, `vest`, `native`) ship as equal first-class subpath exports
- Quick-start doc shows two imports prominently; recipes show same pattern
- Bundle budget for core entry stays ≤3 kB without engine bytes
- No engine favoritism in branding or docs ordering (alphabetical)

### 6.3 Angular form integration — **DECIDED: Option B (directive + CVA bridge)**

**Decision:** Ship both `AegovFormDirective` (form-level orchestration) AND `AegovFieldDirective` implementing `ControlValueAccessor` per aegov form component.

**Implementation:**
- `AegovFormDirective` — `[aegovForm]="{ schema, adapter }"` on `<form>`; listens to `aegovValidate`, runs orchestrator, emits `(submitValid)`
- `AegovFieldDirective` — `aegovField` selector matched by tag (`aegov-input[formControlName], aegov-select[formControlName], …`); implements `writeValue`, `registerOnChange`, `registerOnTouched`, `setDisabledState`, plus `validate` from `Validator` interface
- Generic CVA with tag-aware value coercion (string for input, File[] for fileupload, Date for datepicker, string[] for multi-select)
- Bridges Angular validators back to `aegov-*.errorMessage` via `formControl.errors`
- Both directives standalone (Angular 17+); barrel export from `@aegov/design-system-validation/angular`

**Effort:** ~250 LOC total (directive 100 + CVA 120 + tag-coercion helpers 30); one-time, covers all 13 form components.

**Test coverage:**
- Reactive Forms integration: `formGroup` + `formControlName` round-trip per component
- Validators: built-in (`Validators.required`, `Validators.email`) + custom validator composition
- `valueChanges` / `statusChanges` emit correctly
- `markAsTouched` / `markAsPristine` reflect to component visual state

### 6.4 Schema-driven prop hydration — **DECIDED: Option B (opt-in)**

**Decision:** Default `hydrateProps: false`. Consumer explicitly opts in via `createForm(form, schema, adapter, { hydrateProps: true })`.

**Hydration scope when enabled:**
- `isRequired` ← schema field is non-optional
- `minlength` / `maxlength` ← `v.minLength` / `v.maxLength` (Valibot), `.min` / `.max` length (Zod)
- `pattern` ← `v.regex` / `.regex`
- `min` / `max` ← `v.minValue` / `v.maxValue` (numeric ranges)
- `type="email"` ← `v.email` validator
- `type="url"` ← `v.url` validator
- `accept` ← schema-declared MIME types (custom field meta)

**Clobber rules:**
- If component already has the attribute set in HTML, hydration **does not overwrite** (author intent wins)
- Only fills in missing attributes
- Logs `console.debug` per applied hydration when `options.debug: true`

**Documented in:** quick-start, recipes, and dedicated `validation-hydrate-props.md` page covering when to enable, gotchas, and audit trail.

### 6.5 Submit dispatch behavior — **DECIDED: Option C (hybrid, final)**

**Decision (revised):** Hybrid behavior per consumption mode. Vanilla `createForm` supports BOTH: callback if registered, native re-dispatch if absent (progressive enhancement). Framework helpers REQUIRE callback (idiomatic for SPAs).

**Rationale for revision:** AEGOV serves UAE Federal Authority forms. Many are server-rendered with `<form action="/api/…" method="post">` and a backend POST handler. Forcing callback-only would silently break native form submission for those govt sites and regress JS-optional resilience expected by accessibility baselines. Frameworks (React/Vue/Angular) always hijack submit anyway, so callback is idiomatic there.

**API:**

```ts
// Vanilla — onValidSubmit OPTIONAL
createForm(formEl, schema, adapter, {
  // onValidSubmit?: (values) => void | Promise<void>
});
// • if onValidSubmit provided  → callback fires; native submit suppressed
// • if onValidSubmit absent    → orchestrator re-dispatches native submit; browser POSTs to form.action

// React (REQUIRED)
const { handleSubmit } = useAegovForm({ schema, adapter });
<form ref={formRef} onSubmit={handleSubmit(values => api.login(values))}>

// Vue (REQUIRED)
const { handleSubmit } = useAegovForm({ schema, adapter });
<form @submit.prevent="handleSubmit(onSubmit)">

// Angular (REQUIRED)
<form [aegovForm]="config" (submitValid)="onSubmit($event)">
```

**Behavior on submit (vanilla):**

1. Re-entry guard: if event carries `__aegovValidated` symbol, allow it through (it's the orchestrator's own re-dispatch). Done.
2. Else `event.preventDefault()`.
3. Run full-form `adapter.validate()`.
4. If invalid → focus + scroll to first invalid field. Stop.
5. If valid AND `opts.onValidSubmit` present → invoke callback with values. Done.
6. If valid AND `opts.onValidSubmit` absent → re-dispatch native `submit` event with re-entry symbol; if not `defaultPrevented`, call `formEl.submit()` to trigger native POST.

**Re-entry guard implementation:**

```ts
const REENTRY_FLAG = Symbol('aegov-validated');

const onSubmit = async (e: SubmitEvent) => {
  if ((e as any)[REENTRY_FLAG]) return;        // re-dispatched submit, let browser handle
  e.preventDefault();
  const result = await runFull();
  if (!result.valid) {
    if (opts.scrollToError) focusFirstInvalid(result);
    return;
  }
  const values = collectValues();
  if (opts.onValidSubmit) {
    await opts.onValidSubmit(values);
    return;
  }
  // Progressive enhancement path: re-dispatch native submit
  const evt = new SubmitEvent('submit', { cancelable: true, bubbles: true });
  (evt as any)[REENTRY_FLAG] = true;
  const proceed = rootEl.dispatchEvent(evt);
  if (proceed) (rootEl as HTMLFormElement).submit();   // browser POSTs to form.action
};
```

**Documentation requirements:**

- **README quick-start** — show both modes side-by-side: "with callback" and "with native action".
- **Submission Modes section** in docs — explain the two paths, when to use each, the re-entry guard mechanism.
- **Per-framework recipe** — every framework example shows callback registration (still required there).
- **TypeScript types**:
  - `CreateFormOptions.onValidSubmit` → **optional** (`?`) in vanilla types
  - Framework helper option types still require it (compile error if missing in `useAegovForm` etc.)
- **Migration note** — none, since this matches user expectation for native forms.

**Trade-offs accepted:**
- Two documented behaviors per mode (vanilla vs framework). Mitigated by clear "Submission Modes" doc section.
- Re-entry guard adds ~10 LOC. Standard form-lib pattern (React Hook Form, Felte use similar).

**Test coverage:**

- Vanilla without `onValidSubmit` + valid form → assert `formEl.submit()` called or natural POST observed (Puppeteer intercepts request).
- Vanilla with `onValidSubmit` + valid form → callback fires, native submit NOT triggered.
- Re-entry guard: re-dispatched submit does NOT recurse into validation.
- Framework helpers (React/Vue/Angular) → callback required at type level (negative compile test).
- E2E: server-rendered form with `<form action="/echo" method="post">` + aegov inputs + no JS callback → submitting valid form actually POSTs to `/echo`.

### 6.6 Backward-compatible event policy — **DECIDED: Option C (remove now)**

**Decision:** Pre-production library, zero backward-compat obligation. Remove specific events in `0.2.0` and replace with unified `aegovValidate`.

**Removed events:**
- `aegov-otp` → `aegovOtpInvalid` (regex mismatch) — REMOVED, replaced by `aegovValidate` with `validity.patternMismatch === true`
- `aegov-fileupload` → `aegovFileuploadError` (size/type/count) — REMOVED, replaced by `aegovValidate` with appropriate validity flags + `customError` carrying message

**Validity-flag mapping for fileupload errors:**
| Old error type | New `validity` flag | `customError` message |
|---|---|---|
| `'max-size'` | `tooLong: true` | "File exceeds {maxFileSize}" |
| `'invalid-type'` | `typeMismatch: true` | "File type not accepted" |
| `'max-files'` | `customError: true` | "Maximum {maxFiles} files allowed" |

**Kept events (unrelated to validation):**
- `aegovOtpChange`, `aegovOtpComplete` — value-change events, not validation
- `aegovFileuploadChange`, `aegovFileuploadRemove` — file-list mutation events

**Migration impact:** internal — only affects in-progress consumers (none in production). Update example pages and docs that listen to removed events.

**Test cleanup:** remove `aegovOtpInvalid` and `aegovFileuploadError` test cases; replace with unified `aegovValidate` assertions.

### 6.7 Visual error icon — **DECIDED: Option A (reuse `getVariantIcon`)**

**Decision:** Reuse existing `getVariantIcon('error', size)` from `src/utils/icons.tsx`. Extend signature with `size` param.

**Implementation:**
- Update `src/utils/icons.tsx` `getVariantIcon` signature: `getVariantIcon(variant: CalloutVariant, size: 'sm' | 'base' = 'base'): VNode`
  - `size: 'sm'` → 16px (form inline errors)
  - `size: 'base'` → 24px (callout, banner, current default)
- All form components import from same util:
  ```tsx
  import { getVariantIcon } from '../../utils/icons';
  // …
  <div class="aegov-input__error" role="alert" aria-live="polite">
    {getVariantIcon('error', 'sm')}
    <span>{this.errorMessage}</span>
  </div>
  ```
- Color comes from CSS class on parent (`text-aered-600`), SVG uses `currentColor`
- RTL: icon does NOT mirror (universal warning glyph); placement (start/end) follows `dir` via CSS `flex-direction`

**Update existing callout call sites:** pass explicit `'base'` for backward compat — sweep `aegov-callout`, `aegov-banner` to add the param.

**Test:** snapshot test ensures icon renders at correct size per call site.

### 6.8 Stencil version upgrade — **REVISED EXECUTION OUTCOME: Option B fallback active**

**Original decision:** Option A (upgrade to latest 4.x ≥4.42 for `@AttachInternals` decorator).

**Execution outcome (May 2026):** Upgrade attempted to Stencil `4.43.4` AND `4.42.0` — both fail at build with:
```
Rollup: Plugin Error
Cannot read properties of undefined (reading 'text') (plugin: tailwind, transform)
```
`stencil-tailwind-plugin@2.0.5` (latest) reads `cssNode.text` from a TypeScript AST node returned by Stencil's internal walker — the node shape changed between Stencil `4.38.3` and `4.42.0`. No public release of the plugin handles this yet (last published 2.0.5).

**Decision (revised):** Pin `@stencil/core` to `^4.38.3` (last working version). Use manual `attachInternals()` via `@Element()` host reference instead of `@AttachInternals` decorator. Plan §6.8 explicitly authorizes this fallback. Cost: ~3 extra LOC per FormAssociated component. No Layer 1 redesign.

**Pattern under fallback:**

```tsx
@Component({
  tag: 'aegov-otp',
  styleUrl: 'aegov-otp.css',
  scoped: false,
  formAssociated: true,
})
export class AegovOtp {
  @Element() el!: HTMLElement;
  private internals!: ElementInternals;

  componentWillLoad() {
    this.internals = (this.el as unknown as InternalsHost).attachInternals();
  }
  // … same lifecycle hooks (formAssociatedCallback, formResetCallback, etc.)
}
```

**Re-evaluate trigger:** when `stencil-tailwind-plugin` ships compatibility for Stencil ≥4.42 OR when alternative tailwind solution found, reattempt upgrade. Track in repo issue.

**Original plan content below kept for context.**

### 6.8 Stencil version upgrade — **ORIGINAL DECISION: Option A (upgrade to latest 4.x)**

**Decision:** Bump `@stencil/core` from `4.29.1` → latest stable `4.x` (≥`4.42.0`) to gain `@AttachInternals` decorator and current bug fixes. Existing 2,700+ test suite is the regression net.

**Pre-flight before Layer 1 work begins:**

1. **Snapshot baseline** — run `npm test`, `npm run build`, `npm run test:e2e` on `4.29.1`; capture coverage report and any pre-existing flakies.
2. **Upgrade** — `npm i @stencil/core@latest`.
3. **Read changelog** — review every minor between `4.29` and target; flag any breaking changes (slot behavior, deprecations, JSX type changes).
4. **Build + typecheck** — `npm run build`. Fix compile errors before touching tests.
5. **Test sweep** — run all suites:
   - `npm run test:unit` — fix unit failures (likely scoped slot or `@Watch` ordering tweaks)
   - `npm run test:e2e` — fix E2E failures (selector behavior, hydration timing)
   - `npm run test:coverage` — restore 100%
6. **Manual smoke** — load every page in `src/docs/pages/` in dev server; verify no visual regressions.
7. **React wrappers regen** — `@stencil/react-output-target` re-emits to `../aegov-dls-3-react/`; smoke its package too.
8. **Commit upgrade as standalone PR** — separate from Layer 1 surface work. Easier to bisect if regression found later.

**Known migration points (Stencil 4.30 → 4.40+ range):**

| Area | Note |
|---|---|
| `experimentalSlotFixes` | Behavior may have graduated; remove flag if so |
| Scoped slot light-DOM children | Some slot fallback semantics tightened — sweep components rendering conditional `<slot>` |
| `dist-custom-elements` output | Manifest format updated; validate `package.json` `customElements` field still resolves |
| Hydration | Stricter SSR-mismatch warnings — may surface latent bugs |
| Decorator metadata | TS 5.0+ decorators metadata behavior — confirm `tsconfig.json` `experimentalDecorators` still set |

**Rollback plan:** if upgrade introduces blocking regressions and Layer 1 deadline is tight, fall back to Option B (manual `attachInternals()`) per §6.8 — no Layer 1 redesign needed; only ~3 extra LOC per FormAssociated component.

**Acceptance gate for Layer 1 PR:** Stencil upgrade PR merged + green main + manual smoke complete.

### 6.9 `aegov-form` wrapper component — **DECIDED: Option A (do not build)**

**Decision:** Do NOT ship an `aegov-form` web component. Native `<form>` stays the canonical form element.

**Rationale:**
- Native `<form>` is browser primitive — `formdata`, `submit`, `reset`, `enctype`, `:invalid` all rely on it
- Wrapping component would either duplicate native form (illegal nested forms) or wrap a slotted `<form>`, adding indirection without payoff
- Schema must be JS reference; HTML-attribute APIs for schemas are rigid and awkward
- Frameworks own form semantics in their idiomatic way — wrapper conflicts with React `onSubmit`, Vue `@submit`, Angular `(ngSubmit)`

**Vanilla consumer pattern (documented as canonical):**

```html
<form id="login-form">
  <aegov-input name="email"></aegov-input>
  <aegov-input name="password" type="password"></aegov-input>
  <button type="submit">Login</button>
</form>

<script type="module">
  import { createForm } from '@aegov/design-system-validation';
  import { valibotAdapter } from '@aegov/design-system-validation/adapters/valibot';
  import { loginSchema } from './schemas.js';

  createForm(document.getElementById('login-form'), loginSchema, valibotAdapter(), {
    onValidSubmit: (values) => api.login(values),
  });
</script>
```

**Re-evaluate trigger:** if real vanilla-HTML feedback after `0.1.0` consistently asks for zero-JS configuration, revisit in a future minor. Not a blocker for current scope.

### 6.10 License & browser targets — **DECIDED**

**6.10a License:** **Custom UAE Government License** (matches core; `package.json` of core says "MIT" but actual `LICENSE.md` is a UAE-Government-restricted license — package.json `license` field is misleading and should be reviewed separately). Validation repo ships an identical `LICENSE` file copied from core; `package.json` uses `"license": "SEE LICENSE IN LICENSE"` (SPDX expression for non-OSI licenses). Recommend follow-up to fix core's `package.json` license declaration to match the actual `LICENSE.md`.

**6.10b Browser targets:** **Modern evergreen** — Chrome / Edge ≥77, Firefox ≥98, Safari ≥16.4. Aligned with FormAssociated / ElementInternals support floor.

**Implications:**
- `browserslist` in validation repo `package.json`:
  ```json
  "browserslist": [
    "Chrome >= 77", "Edge >= 77", "Firefox >= 98", "Safari >= 16.4",
    "not IE 11", "not dead"
  ]
  ```
- TypeScript `target: "ES2022"` (already in plan §3.9)
- No polyfills shipped; consumers needing older support BYO polyfills
- Documented in README "Browser Support" section
- CI test matrix: latest Chrome + latest Firefox + latest Safari (via Playwright)
- Coordinate with core `aegov-dls-3` if its `browserslist` is wider — narrow Layer 2 to most-restrictive intersection (always FormAssociated floor)

---

---

## 7. Execution Gap Resolutions (cross-reference catalog)

Audit surfaced 10 critical/high gaps + 6 bookkeeping items during plan review. All resolved in-place; this section maps each gap to its fix location for traceability and PR review.

| # | Gap | Severity | Fix location | Resolution summary |
|---|---|---|---|---|
| 7.1 | Group form-participation collision (checkbox-group / radio-group double-submit) | Critical | §2.4 component table, §2.5 FormAssociated list | Groups are pure aggregators — NOT `formAssociated`. Children submit individually. |
| 7.2 | Component hydration race vs `createForm()` walk | Critical | §3.4 orchestrator init | Internal `ready` promise awaits `customElements.whenDefined()` for all aegov tags before registry walk. Public methods await `ready`. |
| 7.3 | Form value type variance not pinned | Critical | §2.4.1 new value-type table | Canonical JS type and FormData payload pinned per component. Listbox multi-select changes from comma-string to per-value FormData entries (breaking, accepted pre-production). |
| 7.4 | `description` vs `hint` prop overlap | High | §2.3 component pattern, §2.4 component table | Pre-production rename `description` → `hint` on checkbox/radio/toggle/fileupload. No compat shim. |
| 7.5 | Stencil `scoped: true` + `formAssociated: true` combo unverified (datepicker) | High | §2.5 spike note | Spike test in week 1 of L1 work; fall back to manual `attachInternals()` if combo flaky for that one component. |
| 7.6 | TypeScript schema → values inference (DX) | High | §3.7 React helper, plus Vue/Angular notes | New `InferValues<A>` type; helpers carry generic `<S, A>` so `handleSubmit(values)` is fully typed per schema. |
| 7.7 | Native `validationMessage` is browser-localized, leaks into Arabic UI | High | §3.8 i18n cascade | Native adapter discards `el.validationMessage`; maps `validity` flags to bundle keys via `messageResolver` only. |
| 7.8 | `aegov-form-field` aria-describedby chain clobber | Medium | §2.7 cascade impl | New `updateChildDescribedBy()` reads existing IDs, strips previously-injected via `data-aegov-injected-ids` tracker, appends current error/hint IDs. Preserves external IDs across cycles. |
| 7.9 | Memory leak on consumer-forgotten `destroy()` | Medium | §3.4 detach observer | `MutationObserver` on `document.body` watches for `rootEl.isConnected === false`; auto-destroys orchestrator. Disconnect observer in `destroy()`. |
| 7.10 | `role="alert"` + `aria-live="polite"` AT spam during typing | Medium | §2.3 component pattern render | New `hasBlurredOnce` state gates `role="alert"` + `aria-live="polite"` to render only after first blur. Silent during typing. |
| Bookkeeping items | Low/medium severity bookkeeping (test framework split, bundle budgets, React wrapper regen, CI nightly tag, async spinner CSS, perf benchmark) | Low–Medium | §5 risk rows 11–16 | Documented in risk table with concrete mitigation steps; not blocking scaffold start. |

**Sign-off gate:** PR reviewers verify each row is reflected in the linked section before approval.

---

**End of plan.** Sign-off required on §6 (decisions) and §7 (gap resolutions) before scaffolding begins.
