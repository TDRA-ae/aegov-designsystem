import { Component, Host, h, Prop, State, Event, EventEmitter, Element, Watch, Method, Listen, forceUpdate } from '@stencil/core';
import { RANGE_SIZES, RANGE_DISPLAYS, RANGE_ORIENTATIONS, RANGE_MODES, FORM_VARIANTS } from '../../utils/types';
import type {
  RangeSize, RangeDisplay, RangeOrientation, RangeMode, FormVariant,
  AegovValidationDetail, AegovValidationResult, AegovValidationTrigger,
} from '../../utils/types';
import { getPassThroughAttributes } from '../../utils/attributes';
import { HostAria } from '../../utils/host-aria';
import { adoptExtraClassStylesIntoShadowRoot } from '../../utils/shadow-styles';
import { generateId } from '../../utils/id-generator';
import { isRtl } from '../../utils/rtl';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { watchResponsiveProp } from '../../utils/responsive-prop';
import type { ResponsivePropWatcher } from '../../utils/responsive-prop';
import {
  fromNativeValidity, VALID_STATE,
  composeDescribedBy, buildValidationDetail, synthesizeValidity, setInternalsValidity, syncHostDisabled,
} from '../../utils/validation';

/** Range value type — number for single mode, { low, high } for range mode. See §2.4.1. */
export type AegovRangeValue = number | { low: number; high: number };

const TAG = 'aegov-range';
const ctx = (prop: string) => ({ component: TAG, prop });

const STRINGS = {
  en: {
    thumbMin: (label?: string) => label ? `${label} — Range minimum` : 'Range minimum',
    thumbMax: (label?: string) => label ? `${label} — Range maximum` : 'Range maximum',
  },
  ar: {
    thumbMin: (label?: string) => label ? `${label} — الحد الأدنى للنطاق` : 'الحد الأدنى للنطاق',
    thumbMax: (label?: string) => label ? `${label} — الحد الأقصى للنطاق` : 'الحد الأقصى للنطاق',
  },
};

@Component({
  tag: 'aegov-range',
  styleUrl: 'aegov-range.css',
  formAssociated: true,
  shadow: { delegatesFocus: true },
})
export class AegovRange {
  @Element() el: HTMLElement;

  /** Unique ID for the native range input element. Auto-generated if not provided. */
  @Prop({ mutable: true, reflect: true }) fieldId?: string;

  /** The name attribute for the range. Reflected so ElementInternals reads it for form submission. */
  @Prop({ reflect: true }) name?: string;

  /**
   * Current value (single mode). Sanitized like a native `<input type="range">`:
   * clamped to `min`/`max` and rounded to the nearest `step`, on load and
   * whenever it, `min`, `max` or `step` changes.
   */
  @Prop({ mutable: true }) value: number = 50;

  /** Low thumb value (range mode). Sanitized like `value`. */
  @Prop({ mutable: true }) valueLow: number = 25;

  /** High thumb value (range mode). Sanitized like `value`. */
  @Prop({ mutable: true }) valueHigh: number = 75;

  /** Minimum value. */
  @Prop() min: number = 0;

  /** Maximum value. */
  @Prop() max: number = 100;

  /** Step increment. */
  @Prop() step: number = 1;

  /** Size of the range track. Thumb remains constant. */
  @Prop() size: string = 'base';
  @State() private _resolvedSize: RangeSize = 'base';
  private _sizeWatcher: ResponsivePropWatcher | null = null;

  /** Value display mode. */
  @Prop() display: RangeDisplay = 'none';

  /** Layout orientation. */
  @Prop() orientation: RangeOrientation = 'horizontal';

  /** Single thumb or dual thumb (range selection). */
  @Prop() mode: RangeMode = 'single';

  /** Colour family. Drives idle ring/border, selected/checked fill, and value/accent text. Focus ring follows the variant's support colour (camel for primary, desert for secondary, seablue for neutral-max/neutral-min); error stays aered regardless. */
  @Prop() variant?: FormVariant;

  /** Whether the range is disabled. */
  @Prop({ mutable: true, reflect: true }) isDisabled: boolean = false;

  /** Whether the range is required. */
  @Prop() isRequired: boolean = false;

  /** Optional label text. */
  @Prop() label?: string;

  /** Helper hint shown below the control. Hidden when an error is shown. */
  @Prop() hint: string = '';

  /** Visual + a11y invalid state. See §2.3. */
  @Prop({ mutable: true, reflect: true }) isInvalid: boolean = false;

  /** Inline error message. Use `error` slot for rich markup. */
  @Prop({ mutable: true }) errorMessage: string = '';

  /**
   * Additional CSS classes.
   *
   * This component renders in a real shadow root, which normally blocks the page's CSS
   * from reaching inside it. Margin/padding utilities (e.g. `mt-4`, `md:px-6`) are copied
   * in from the page's own stylesheets at runtime and work as expected; other utilities
   * (colour, border, typography, etc.) still have no effect — see #35.
   */
  @Prop() extraClass?: string;

  @State() activeThumb: 'single' | 'low' | 'high' | null = null;

  /** Whether user has blurred at least once — gates aria-live (gap §7.10). */
  @State() private hasBlurredOnce: boolean = false;

  /** Emitted during drag on every value update. */
  @Event() aegovRangeInput: EventEmitter<{ value?: number; valueLow?: number; valueHigh?: number }>;

  /** Emitted on release (value committed). */
  @Event() aegovRangeChange: EventEmitter<{ value?: number; valueLow?: number; valueHigh?: number }>;

  /** Unified validation event. See §2.3. */
  @Event() aegovValidate: EventEmitter<AegovValidationDetail<AegovRangeValue>>;

  private trackWrapperEl?: HTMLElement;
  private nativeRef?: HTMLInputElement;
  private highRef?: HTMLInputElement;
  private internals: ElementInternals | null = null;
  private errorId: string = '';
  private hintId: string = '';
  private labelId: string = '';
  private _defaultValue: number = 50;
  private _defaultValueLow: number = 25;
  private _defaultValueHigh: number = 75;

  componentWillLoad() {
    if (this.isDisabled) syncHostDisabled(this.el, true);
    // The raw values are what a reset restores (and sanitizes again), like a
    // native input's `value` attribute.
    this._defaultValue = this.value;
    this._defaultValueLow = this.valueLow;
    this._defaultValueHigh = this.valueHigh;
    this.sanitizeValues();
    this._sizeWatcher = watchResponsiveProp(this.size, RANGE_SIZES, 'base', v => {
      this._resolvedSize = v as RangeSize;
    });
    this._resolvedSize = this._sizeWatcher.current as RangeSize;
    warnIfInvalidEnumProp(this.display, RANGE_DISPLAYS, 'none', ctx('display'));
    warnIfInvalidEnumProp(this.orientation, RANGE_ORIENTATIONS, 'horizontal', ctx('orientation'));
    warnIfInvalidEnumProp(this.mode, RANGE_MODES, 'single', ctx('mode'));
    warnIfInvalidEnumProp(this.variant, FORM_VARIANTS, 'primary', ctx('variant'));
    if (!this.fieldId) {
      this.fieldId = generateId('aegov-range');
    }
    this.errorId = `${this.fieldId}-error`;
    this.hintId = `${this.fieldId}-hint`;
    this.labelId = `${this.fieldId}-label`;
    const host = this.el as unknown as HTMLElement & { attachInternals?: () => ElementInternals };
    if (typeof host.attachInternals === 'function') {
      try {
        this.internals = host.attachInternals();
        this.syncFormValue();
      } catch {
        this.internals = null;
      }
    }
  }

  componentDidLoad() {
    this.hostAria?.refreshSoon();
    adoptExtraClassStylesIntoShadowRoot(this.el.shadowRoot, this.extraClass);
  }

  formAssociatedCallback(_form: HTMLFormElement | null) { /* no-op */ }
  formDisabledCallback(disabled: boolean) { this.formDisabled = disabled; }

  /**
   * True while an ancestor `<fieldset disabled>` or the host's `disabled`
   * attribute disables the field. Kept apart from `isDisabled` so that
   * re-enabling the fieldset doesn't clear the field's own setting.
   */
  @State() private formDisabled: boolean = false;

  /** Disabled by its own `isDisabled` or by the form. */
  private get disabled(): boolean {
    return this.isDisabled || this.formDisabled;
  }

  /** Leave FormData and constraint validation while disabled, like a native control. */
  @Watch('isDisabled')
  onIsDisabledChange() {
    syncHostDisabled(this.el, this.isDisabled);
  }

  formResetCallback() {
    this.value = this._defaultValue;
    this.valueLow = this._defaultValueLow;
    this.valueHigh = this._defaultValueHigh;
    this.errorMessage = '';
    this.isInvalid = false;
    this.nativeRef?.setCustomValidity('');
    this.highRef?.setCustomValidity('');
    setInternalsValidity(this.internals, this.readValidity(), '');
    // The value watchers only run on an actual change; a reset may not change it.
    this.syncFormValue();
  }

  /**
   * A value set from code fires no input event — move the native thumb(s) and
   * update the form value (no events, like a native range input).
   */
  @Watch('value')
  @Watch('valueLow')
  @Watch('valueHigh')
  onValueChange() {
    // An out-of-range or off-step value is replaced by its sanitized form; that
    // assignment re-enters this watcher, which then does the sync below.
    if (this.sanitizeValues()) return;
    const syncNative = (el: HTMLInputElement | undefined, v: number) => {
      if (el && el.value !== String(v)) el.value = String(v);
    };
    if (this.mode === 'range') {
      syncNative(this.nativeRef, this.valueLow);
      syncNative(this.highRef, this.valueHigh);
    } else {
      syncNative(this.nativeRef, this.value);
    }
    this.syncFormValue();
  }

  /** New bounds or step re-sanitize the current value(s), as they do on a native range input. */
  @Watch('min')
  @Watch('max')
  @Watch('step')
  onBoundsChange() {
    if (!this.sanitizeValues()) this.onValueChange();
  }

  /**
   * The HTML value sanitization algorithm for `<input type="range">`: a value
   * that is not a number becomes the default value (half-way between min and
   * max); the value is clamped to [min, max] and rounded to the nearest step
   * from min (ties towards max), staying within max. A max below min counts as
   * min; a step that is not a positive number counts as 1.
   */
  private sanitize(raw: number): number {
    const min = Number.isFinite(this.min) ? this.min : 0;
    const maxAttr = Number.isFinite(this.max) ? this.max : 100;
    const max = maxAttr < min ? min : maxAttr;
    const step = Number.isFinite(this.step) && this.step > 0 ? this.step : 1;
    const value = typeof raw === 'number' && Number.isFinite(raw) ? raw : min + (max - min) / 2;
    const clamped = Math.min(max, Math.max(min, value));
    let stepped = Math.round((clamped - min) / step) * step + min;
    if (stepped > max) stepped -= step;
    return parseFloat(stepped.toFixed(10));
  }

  /**
   * Replace `value`, `valueLow` and `valueHigh` with their sanitized forms.
   * Emits no events, as sanitizing a native input fires none. Returns true if
   * anything changed.
   */
  private sanitizeValues(): boolean {
    let changed = false;
    const apply = (key: 'value' | 'valueLow' | 'valueHigh') => {
      const clean = this.sanitize(this[key]);
      if (!Object.is(clean, this[key])) {
        this[key] = clean;
        changed = true;
      }
    };
    apply('value');
    apply('valueLow');
    apply('valueHigh');
    return changed;
  }

  private syncFormValue() {
    if (!this.internals) return;
    try {
      if (this.mode === 'range' && this.name) {
        const fd = new FormData();
        fd.append(`${this.name}-low`, String(this.valueLow));
        fd.append(`${this.name}-high`, String(this.valueHigh));
        this.internals.setFormValue(fd);
      } else {
        this.internals.setFormValue(String(this.value));
      }
    } catch { /* jsdom mock */ }
  }

  /** The form found this field invalid during a submit or checkValidity() — start announcing errors. */
  @Listen('invalid')
  onInvalid() {
    this.hasBlurredOnce = true;
  }

  /** Imperatively re-run validation. */
  @Method()
  async validate(trigger: AegovValidationTrigger = 'manual'): Promise<AegovValidationResult> {
    if (trigger === 'submit') this.hasBlurredOnce = true;
    const validity = this.readValidity();
    const message = !validity.valid
      ? (this.errorMessage || this.nativeRef?.validationMessage || '')
      : '';
    this.aegovValidate.emit(buildValidationDetail<AegovRangeValue>(
      this.el as unknown as HTMLElement & { name?: string },
      this.currentValueForDetail(),
      validity, message, this.errorMessage || null, trigger,
    ));
    return { valid: validity.valid, message, validity };
  }

  /** Mirror of HTMLInputElement.setCustomValidity(). */
  @Method()
  async setCustomValidity(message: string): Promise<void> {
    this.errorMessage = message;
    this.isInvalid = !!message;
    if (this.nativeRef && typeof this.nativeRef.setCustomValidity === 'function') {
      this.nativeRef.setCustomValidity(message);
    }
    if (this.internals) {
      if (message) {
        setInternalsValidity(this.internals, synthesizeValidity({ customError: true }), message, this.nativeRef);
      } else {
        setInternalsValidity(this.internals, { valid: true }, '');
      }
    }
  }

  private readValidity() {
    // Disabled controls are barred from constraint validation, as native ones are.
    if (this.disabled) return VALID_STATE;
    const low = this.nativeRef?.validity;
    const high = this.mode === 'range' ? this.highRef?.validity : undefined;
    if (!low) return VALID_STATE;
    const lowState = fromNativeValidity(low);
    if (!high || lowState.valid === false) return lowState;
    return fromNativeValidity(high);
  }

  private currentValueForDetail(): AegovRangeValue {
    return this.mode === 'range'
      ? { low: this.valueLow, high: this.valueHigh }
      : this.value;
  }

  private emitValidate(trigger: AegovValidationTrigger) {
    const validity = this.readValidity();
    const message = !validity.valid
      ? (this.errorMessage || this.nativeRef?.validationMessage || '')
      : '';
    this.aegovValidate.emit(buildValidationDetail<AegovRangeValue>(
      this.el as unknown as HTMLElement & { name?: string },
      this.currentValueForDetail(),
      validity, message, this.errorMessage || null, trigger,
    ));
  }

  private handleInputBlur = () => {
    this.hasBlurredOnce = true;
    this.emitValidate('blur');
  };

  /** Host aria-label / aria-labelledby / aria-describedby / labels, resolved for the inner control (DS-A11Y-input-01). */
  private hostAria?: HostAria;

  connectedCallback() {
    this.hostAria ??= new HostAria(this.el, { fieldId: () => this.fieldId, internals: () => this.internals, onChange: () => forceUpdate(this) });
    this.hostAria.connect();
  }

  disconnectedCallback() {
    this.hostAria?.disconnect();
    this._sizeWatcher?.destroy();
  }

  @Watch('size')
  onSizeChange() {
    this._sizeWatcher?.destroy();
    this._sizeWatcher = watchResponsiveProp(this.size, RANGE_SIZES, 'base', v => {
      this._resolvedSize = v as RangeSize;
    });
    this._resolvedSize = this._sizeWatcher.current as RangeSize;
  }

  @Watch('display')
  onDisplayChange(v: unknown) { warnIfInvalidEnumProp(v, RANGE_DISPLAYS, 'none', ctx('display')); }

  @Watch('orientation')
  onOrientationChange(v: unknown) { warnIfInvalidEnumProp(v, RANGE_ORIENTATIONS, 'horizontal', ctx('orientation')); }

  @Watch('mode')
  onModeChange(v: unknown) { warnIfInvalidEnumProp(v, RANGE_MODES, 'single', ctx('mode')); }

  @Watch('variant')
  onVariantChange(v: unknown) { warnIfInvalidEnumProp(v, FORM_VARIANTS, 'primary', ctx('variant')); }

  @Watch('extraClass')
  onExtraClassChange() {
    adoptExtraClassStylesIntoShadowRoot(this.el.shadowRoot, this.extraClass);
  }

  private static readonly PASS_THROUGH_ATTRS = new Set([
    'tabindex', 'autofocus', 'title', 'form',
  ]);

  // ── Helpers ──

  private getPercent(val: number): number {
    const range = this.max - this.min;
    if (range === 0) return 0;
    return ((val - this.min) / range) * 100;
  }

  private snapToStep(val: number): number {
    return this.sanitize(val);
  }

  private emitInput() {
    if (this.mode === 'range') {
      this.aegovRangeInput.emit({ valueLow: this.valueLow, valueHigh: this.valueHigh });
    } else {
      this.aegovRangeInput.emit({ value: this.value });
    }
    this.emitValidate('input');
  }

  private emitChange() {
    if (this.mode === 'range') {
      this.aegovRangeChange.emit({ valueLow: this.valueLow, valueHigh: this.valueHigh });
    } else {
      this.aegovRangeChange.emit({ value: this.value });
    }
    this.emitValidate('change');
  }

  // ── Native input handlers (keyboard) ──

  private handleSingleInput = (e: Event) => {
    const input = e.target as HTMLInputElement;
    this.value = this.snapToStep(parseFloat(input.value));
    this.syncFormValue();
    this.emitInput();
  };

  private handleSingleChange = (e: Event) => {
    const input = e.target as HTMLInputElement;
    this.value = this.snapToStep(parseFloat(input.value));
    this.syncFormValue();
    this.emitChange();
  };

  private handleLowInput = (e: Event) => {
    const input = e.target as HTMLInputElement;
    const newVal = this.snapToStep(Math.min(parseFloat(input.value), this.valueHigh - this.step));
    this.valueLow = newVal;
    input.value = String(newVal);
    this.syncFormValue();
    this.emitInput();
  };

  private handleLowChange = (e: Event) => {
    const input = e.target as HTMLInputElement;
    const newVal = this.snapToStep(Math.min(parseFloat(input.value), this.valueHigh - this.step));
    this.valueLow = newVal;
    input.value = String(newVal);
    this.syncFormValue();
    this.emitChange();
  };

  private handleHighInput = (e: Event) => {
    const input = e.target as HTMLInputElement;
    const newVal = this.snapToStep(Math.max(parseFloat(input.value), this.valueLow + this.step));
    this.valueHigh = newVal;
    input.value = String(newVal);
    this.syncFormValue();
    this.emitInput();
  };

  private handleHighChange = (e: Event) => {
    const input = e.target as HTMLInputElement;
    const newVal = this.snapToStep(Math.max(parseFloat(input.value), this.valueLow + this.step));
    this.valueHigh = newVal;
    input.value = String(newVal);
    this.syncFormValue();
    this.emitChange();
  };

  // ── Pointer drag handlers ──

  private updateValueFromPointer(
    clientX: number,
    clientY: number,
    which: 'single' | 'low' | 'high',
    cachedRect?: DOMRect,
    cachedIsRtl?: boolean,
  ) {
    const wrapper = this.trackWrapperEl;
    if (!wrapper) return;
    const rect = cachedRect ?? wrapper.getBoundingClientRect();

    let percent: number;
    if (this.orientation === 'vertical') {
      // Bottom = min, top = max
      percent = 1 - (clientY - rect.top) / rect.height;
    } else {
      const isRtl = cachedIsRtl ?? getComputedStyle(this.el).direction === 'rtl';
      percent = isRtl
        ? 1 - (clientX - rect.left) / rect.width
        : (clientX - rect.left) / rect.width;
    }

    percent = Math.max(0, Math.min(1, percent));
    const rawValue = this.min + percent * (this.max - this.min);
    const snapped = this.snapToStep(rawValue);

    if (which === 'single') {
      this.value = snapped;
    } else if (which === 'low') {
      this.valueLow = Math.min(snapped, this.valueHigh - this.step);
    } else {
      this.valueHigh = Math.max(snapped, this.valueLow + this.step);
    }

    this.emitInput();
  }

  private focusNativeInput(which: 'single' | 'low' | 'high') {
    const wrapper = this.trackWrapperEl;
    if (!wrapper) return;
    let input: HTMLInputElement | null;
    if (which === 'low') {
      input = wrapper.querySelector('.range__input--low');
    } else if (which === 'high') {
      input = wrapper.querySelector('.range__input--high');
    } else {
      input = wrapper.querySelector('.range__input');
    }
    if (input) input.focus();
  }

  private handleThumbMouseDown = (e: MouseEvent, which: 'single' | 'low' | 'high') => {
    if (this.disabled) return;
    e.preventDefault();
    this.activeThumb = which;
    this.focusNativeInput(which);

    // Cache rect + RTL once at drag start — neither changes during a drag.
    // Avoids getBoundingClientRect + getComputedStyle on every mousemove.
    const dragRect = this.trackWrapperEl?.getBoundingClientRect();
    const dragIsRtl = getComputedStyle(this.el).direction === 'rtl';

    const moveHandler = (moveEvent: MouseEvent) => {
      this.updateValueFromPointer(moveEvent.clientX, moveEvent.clientY, which, dragRect, dragIsRtl);
    };
    const upHandler = () => {
      this.activeThumb = null;
      document.removeEventListener('mousemove', moveHandler);
      document.removeEventListener('mouseup', upHandler);
      this.emitChange();
    };
    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('mouseup', upHandler);
  };

  private handleThumbTouchStart = (e: TouchEvent, which: 'single' | 'low' | 'high') => {
    if (this.disabled) return;
    e.preventDefault();
    this.activeThumb = which;
    this.focusNativeInput(which);

    // Cache rect + RTL once at touch-start — same rationale as mouse drag.
    const dragRect = this.trackWrapperEl?.getBoundingClientRect();
    const dragIsRtl = getComputedStyle(this.el).direction === 'rtl';

    const moveHandler = (moveEvent: TouchEvent) => {
      const touch = moveEvent.touches[0];
      this.updateValueFromPointer(touch.clientX, touch.clientY, which, dragRect, dragIsRtl);
    };
    const endHandler = () => {
      this.activeThumb = null;
      document.removeEventListener('touchmove', moveHandler);
      document.removeEventListener('touchend', endHandler);
      this.emitChange();
    };
    document.addEventListener('touchmove', moveHandler, { passive: false });
    document.addEventListener('touchend', endHandler);
  };

  private handleTrackClick = (e: MouseEvent) => {
    if (this.disabled) return;
    // Determine which thumb to move in range mode (closest to click)
    if (this.mode === 'range') {
      const wrapper = this.trackWrapperEl;
      if (!wrapper) return;
      const rect = wrapper.getBoundingClientRect();
      let percent: number;
      if (this.orientation === 'vertical') {
        percent = 1 - (e.clientY - rect.top) / rect.height;
      } else {
        const isRtl = getComputedStyle(this.el).direction === 'rtl';
        percent = isRtl
          ? 1 - (e.clientX - rect.left) / rect.width
          : (e.clientX - rect.left) / rect.width;
      }
      percent = Math.max(0, Math.min(1, percent));
      const rawValue = this.min + percent * (this.max - this.min);
      const distLow = Math.abs(rawValue - this.valueLow);
      const distHigh = Math.abs(rawValue - this.valueHigh);
      const which = distLow <= distHigh ? 'low' : 'high';
      this.updateValueFromPointer(e.clientX, e.clientY, which);
      this.focusNativeInput(which);
      this.emitChange();
    } else {
      this.updateValueFromPointer(e.clientX, e.clientY, 'single');
      this.focusNativeInput('single');
      this.emitChange();
    }
  };

  // ── Render helpers ──

  private renderThumb(
    which: 'single' | 'low' | 'high',
    showTooltip: boolean,
    showThumbValue: boolean,
  ) {
    const value = which === 'low' ? this.valueLow
      : which === 'high' ? this.valueHigh
      : this.value;

    const thumbClasses = [
      'range__thumb',
      `range__thumb--${which}`,
      showThumbValue ? 'range__thumb--display-thumb' : '',
      this.activeThumb === which ? 'range__thumb--active' : '',
    ].filter(Boolean).join(' ');

    const percent = this.getPercent(value);
    const posVar = which === 'low' ? '--range-thumb-low-percent'
      : which === 'high' ? '--range-thumb-high-percent'
      : '--range-thumb-percent';

    const posProperty = this.orientation === 'vertical' ? 'bottom' : 'inset-inline-start';

    return (
      <div
        class={thumbClasses}
        style={{ [posProperty]: `var(${posVar}, ${percent}%)` }}
        onMouseDown={(e: MouseEvent) => this.handleThumbMouseDown(e, which)}
        onTouchStart={(e: TouchEvent) => this.handleThumbTouchStart(e, which)}
      >
        {showThumbValue && <span class="range__thumb-value" aria-hidden="true">{value}</span>}
        {showTooltip && <span class="range__tooltip" aria-hidden="true">{value}</span>}
      </div>
    );
  }

  render() {
    const passThroughAttrs = this.hostAria ? this.hostAria.bridge(getPassThroughAttributes(this.el, AegovRange.PASS_THROUGH_ATTRS)) : getPassThroughAttributes(this.el, AegovRange.PASS_THROUGH_ATTRS);
    delete passThroughAttrs['aria-invalid'];
    delete passThroughAttrs['aria-describedby'];
    const rtl = isRtl(this.el);
    const t = rtl ? STRINGS.ar : STRINGS.en;

    const hasErrorSlot = !!this.el.querySelector('[slot="error"]');
    const hasHintSlot = !!this.el.querySelector('[slot="hint"]');
    const showError = this.isInvalid && (hasErrorSlot || !!this.errorMessage);
    // Hint stays visible (and in the description) while an error shows (DS-A11Y-input-08).
    const showHint = hasHintSlot || !!this.hint;
    const announceError = showError && this.hasBlurredOnce;
    const authorDescribedBy = this.hostAria?.descriptionId();
    // Each thumb of a two-thumb range: "<field name> — Range minimum / maximum".
    // The field name comes from the label prop, else the host (aegov-form-field,
    // aria-label, aria-labelledby, label for) (DS-A11Y-form-field-01).
    const fieldName = this.label || this.hostAria?.name();
    const describedBy = composeDescribedBy(
      authorDescribedBy,
      showError ? this.errorId : null,
      showHint ? this.hintId : null,
    );
    const ariaInvalidAttr = this.isInvalid ? 'true' : null;

    const size: RangeSize = this._resolvedSize;
    const display: RangeDisplay = (RANGE_DISPLAYS as readonly string[]).includes(this.display) ? this.display : 'none';
    const orientation: RangeOrientation = (RANGE_ORIENTATIONS as readonly string[]).includes(this.orientation) ? this.orientation : 'horizontal';
    const mode: RangeMode = (RANGE_MODES as readonly string[]).includes(this.mode) ? this.mode : 'single';
    const variant: FormVariant = (FORM_VARIANTS as readonly string[]).includes(this.variant) ? this.variant : 'primary';
    const isRange = mode === 'range';
    const percent = this.getPercent(this.value);
    const percentLow = isRange ? this.getPercent(this.valueLow) : 0;
    const percentHigh = isRange ? this.getPercent(this.valueHigh) : percent;

    const containerStyle = {
      '--range-fill-start': isRange ? `${percentLow}%` : '0%',
      '--range-fill-end': isRange ? `${percentHigh}%` : `${percent}%`,
      '--range-thumb-percent': `${percent}%`,
      '--range-thumb-low-percent': `${percentLow}%`,
      '--range-thumb-high-percent': `${percentHigh}%`,
    };

    const showTooltip = display === 'tooltip';
    const showThumbValue = display === 'thumb' || display === 'full';
    const showMinMax = display === 'full';

    const displayClass = (display === 'thumb' || display === 'full')
      ? `range--display-${display}`
      : '';

    const wrapperClasses = [
      'aegov-range',
      `range--${size}`,
      `range--${orientation}`,
      `range-variant-${variant}`,
      displayClass,
      this.disabled ? 'aegov-range--disabled' : '',
      this.extraClass || '',
    ].filter(Boolean).join(' ');

    const rangeContent = (
      <div class={wrapperClasses}>
        <div class="range__container" style={containerStyle}>
          {/* Visual only: the sliders expose min, max and value themselves (DS-A11Y-range-06). */}
          {showMinMax && <span class="range__label-min" aria-hidden="true">{this.min}</span>}

          <div
            class="range__track-wrapper"
            ref={(el) => this.trackWrapperEl = el}
            onClick={this.handleTrackClick}
          >
            <div class="range__track">
              <div class="range__fill" />
            </div>

            {!isRange && this.renderThumb('single', showTooltip, showThumbValue)}
            {isRange && this.renderThumb('low', showTooltip, showThumbValue)}
            {isRange && this.renderThumb('high', showTooltip, showThumbValue)}

            {!isRange && (
              <input
                ref={(el) => this.nativeRef = el}
                type="range"
                class="range__input"
                id={this.fieldId}
                min={this.min}
                max={this.max}
                step={this.step}
                value={this.value}
                disabled={this.disabled}
                required={this.isRequired}
                onInput={this.handleSingleInput}
                onChange={this.handleSingleChange}
                onBlur={this.handleInputBlur}
                aria-valuemin={this.min}
                aria-valuemax={this.max}
                aria-valuenow={this.value}
                aria-labelledby={this.label ? this.labelId : undefined}
                aria-orientation={orientation}
                aria-invalid={ariaInvalidAttr}
                aria-describedby={describedBy}
                {...(orientation === 'vertical' ? { orient: 'vertical' } : {})}
                {...passThroughAttrs}
              />
            )}
            {isRange && [
              <input
                ref={(el) => this.nativeRef = el}
                type="range"
                class="range__input range__input--low"
                id={`${this.fieldId}-low`}
                min={this.min}
                max={this.max}
                step={this.step}
                value={this.valueLow}
                disabled={this.disabled}
                onInput={this.handleLowInput}
                onChange={this.handleLowChange}
                onBlur={this.handleInputBlur}
                aria-valuemin={this.min}
                // The thumbs can't meet: report the limit that is really reachable (DS-A11Y-range-05).
                aria-valuemax={this.valueHigh - this.step}
                aria-valuenow={this.valueLow}
                aria-label={t.thumbMin(fieldName)}
                aria-orientation={orientation}
                aria-invalid={ariaInvalidAttr}
                aria-describedby={describedBy}
                {...(orientation === 'vertical' ? { orient: 'vertical' } : {})}
              />,
              <input
                ref={(el) => this.highRef = el}
                type="range"
                class="range__input range__input--high"
                id={`${this.fieldId}-high`}
                min={this.min}
                max={this.max}
                step={this.step}
                value={this.valueHigh}
                disabled={this.disabled}
                onInput={this.handleHighInput}
                onChange={this.handleHighChange}
                onBlur={this.handleInputBlur}
                aria-valuemin={this.valueLow + this.step}
                aria-valuemax={this.max}
                aria-valuenow={this.valueHigh}
                aria-label={t.thumbMax(fieldName)}
                aria-orientation={orientation}
                aria-invalid={ariaInvalidAttr}
                aria-describedby={describedBy}
                {...(orientation === 'vertical' ? { orient: 'vertical' } : {})}
              />,
            ]}
          </div>

          {showMinMax && <span class="range__label-max" aria-hidden="true">{this.max}</span>}
        </div>
      </div>
    );

    const errorRegion = showError ? (
      <div
        id={this.errorId}
        class="aegov-range__error"
        role={announceError ? 'alert' : null}
      >
        {hasErrorSlot ? <slot name="error" /> : this.errorMessage}
      </div>
    ) : null;
    const hintRegion = showHint ? (
      <div id={this.hintId} class="aegov-range__hint">
        {hasHintSlot ? <slot name="hint" /> : this.hint}
      </div>
    ) : null;
    const hostClass = { 'is-invalid': this.isInvalid };

    if (this.label) {
      return (
        <Host class={hostClass}>
          <div class="range__wrapper">
            {isRange
              ? <span id={this.labelId} class="range__label-text">{this.label}</span>
              : <label id={this.labelId} class="range__label-text" {...{ for: this.fieldId }}>{this.label}</label>
            }
            {rangeContent}
          </div>
          {errorRegion}
          {hintRegion}
          {this.hostAria?.renderDescription()}
        </Host>
      );
    }

    return (
      <Host class={hostClass}>
        {rangeContent}
        {errorRegion}
        {hintRegion}
        {this.hostAria?.renderDescription()}
      </Host>
    );
  }
}
