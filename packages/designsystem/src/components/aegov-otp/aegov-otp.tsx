import { Component, Host, h, Prop, State, Element, Event, EventEmitter, Watch, Method } from '@stencil/core';
import { watchResponsiveProp } from '../../utils/responsive-prop';
import type { ResponsivePropWatcher } from '../../utils/responsive-prop';
import { OTP_VARIANTS, OTP_SIZES, FORM_VARIANTS } from '../../utils/types';
import type {
  OtpVariant, OtpSize, FormVariant,
  AegovValidationDetail, AegovValidationResult, AegovValidationTrigger,
  AegovValidityState,
} from '../../utils/types';
import { getPassThroughAttributes } from '../../utils/attributes';
import { isRtl } from '../../utils/rtl';
import { generateId } from '../../utils/id-generator';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import {
  composeDescribedBy, buildValidationDetail, synthesizeValidity, setInternalsValidity,
} from '../../utils/validation';
import type { InternalsHost } from '../../utils/validation';

const TAG = 'aegov-otp';
const ctx = (prop: string) => ({ component: TAG, prop });

@Component({
  tag: 'aegov-otp',
  styleUrl: 'aegov-otp.css',
  formAssociated: true, // §2.5: OTP participates in <form> via ElementInternals (replaces hidden input)
  shadow: { delegatesFocus: true },
})
export class AegovOtp {
  @Element() el: HTMLElement;

  /** Unique ID for the first input cell. Auto-generated if not provided. Used by aegov-label for linking. */
  @Prop({ mutable: true, reflect: true }) fieldId?: string;

  /**
   * Visual appearance. "continuous" = single bordered box with dividers between cells.
   * "individual" = separate bordered boxes per digit.
   */
  @Prop() appearance: OtpVariant = 'continuous';

  /** Number of input cells (digits/characters expected). */
  @Prop() length: number = 5;

  /** Size of the input cells. */
  @Prop() size: string = 'base';

  /** Colour family. Drives idle ring/border, selected/checked fill, and value/accent text. Focus ring stays camel; error stays aered regardless. */
  @Prop() variant: FormVariant = 'primary';

  @State() private _resolvedSize: OtpSize = 'base';
  private _sizeWatcher: ResponsivePropWatcher | null = null;

  /** Allow letters and numbers when true. Numbers only when false. */
  @Prop() isAlphanumeric: boolean = false;

  /** Regex pattern string for validation. Checked when all cells are filled. */
  @Prop() pattern?: string;

  /** Disables all input cells. */
  @Prop({ mutable: true }) isDisabled: boolean = false;

  /** Marks the field as required for form submission. Used by FormAssociated for `valueMissing`. */
  @Prop() isRequired: boolean = false;

  /** Form field name for FormAssociated submission. */
  @Prop() name?: string;

  /** Current OTP value. Can be set externally to pre-fill cells. */
  @Prop({ mutable: true }) value: string = '';

  /** Visual + a11y invalid state. See §2.3. */
  @Prop({ mutable: true, reflect: true }) isInvalid: boolean = false;

  /** Inline error message. Use `error` slot for rich markup. */
  @Prop({ mutable: true }) errorMessage: string = '';

  /** Helper hint shown below the control. Hidden when an error is shown. */
  @Prop() hint: string = '';

  /** Additional CSS classes. */
  @Prop() extraClass?: string;

  /** Fires on every character change with the current value. */
  @Event() aegovOtpChange: EventEmitter<{ value: string }>;

  /** Fires when all cells are filled (and pattern is valid if set). */
  @Event() aegovOtpComplete: EventEmitter<{ value: string }>;

  // §6.6: aegovOtpInvalid REMOVED — use aegovValidate with validity.patternMismatch instead.

  /** Unified validation event. See §2.3. */
  @Event() aegovValidate: EventEmitter<AegovValidationDetail<string>>;

  @State() private hasBlurredOnce: boolean = false;
  @State() private groupLabelId: string = '';

  private cellRefs: HTMLInputElement[] = [];
  private internalUpdate = false;
  private internals: ElementInternals | null = null;
  private errorId: string = '';
  private hintId: string = '';

  componentWillLoad() {
    warnIfInvalidEnumProp(this.appearance, OTP_VARIANTS, 'continuous', ctx('appearance'));
    warnIfInvalidEnumProp(this.variant, FORM_VARIANTS, 'primary', ctx('variant'));
    if (!this.fieldId) {
      this.fieldId = generateId('aegov-otp');
    }
    this.errorId = `${this.fieldId}-error`;
    this.hintId = `${this.fieldId}-hint`;
    this._sizeWatcher = watchResponsiveProp(this.size, OTP_SIZES, 'base', v => {
      this._resolvedSize = v as OtpSize;
    });
    this._resolvedSize = this._sizeWatcher.current as OtpSize;

    // Manual attachInternals per §6.8 fallback. Defensive against test-mock environments
    // that lack ElementInternals support.
    const host = this.el as unknown as InternalsHost;
    if (typeof host.attachInternals === 'function') {
      try {
        this.internals = host.attachInternals();
      } catch {
        this.internals = null;
      }
    }
  }

  disconnectedCallback() {
    this._sizeWatcher?.destroy();
  }

  // ── FormAssociated lifecycle ──
  formAssociatedCallback(_form: HTMLFormElement | null) { /* no-op */ }
  formDisabledCallback(disabled: boolean) { this.isDisabled = disabled; }
  formResetCallback() {
    this.value = '';
    this.distributeValue('');
    this.runValidationSync();
  }
  formStateRestoreCallback(state: string | File | FormData | null) {
    if (typeof state === 'string') {
      this.value = state;
      this.distributeValue(state);
    }
  }

  @Watch('appearance')
  onVariantChange(v: unknown) { warnIfInvalidEnumProp(v, OTP_VARIANTS, 'continuous', ctx('appearance')); }

  @Watch('variant')
  onColourVariantChange(v: unknown) { warnIfInvalidEnumProp(v, FORM_VARIANTS, 'primary', ctx('variant')); }

  @Watch('size')
  onSizeChange() {
    this._sizeWatcher?.destroy();
    this._sizeWatcher = watchResponsiveProp(this.size, OTP_SIZES, 'base', v => {
      this._resolvedSize = v as OtpSize;
    });
    this._resolvedSize = this._sizeWatcher.current as OtpSize;
  }

  componentDidLoad() {
    if (this.value) {
      this.distributeValue(this.value);
    }
    this.runValidationSync();
    // Find the associated aegov-label so the group wrapper can reference it by ID
    const formField = this.el.closest('.aegov-form-field');
    if (formField) {
      const labelEl = formField.querySelector('aegov-label') as any;
      if (labelEl?.fieldId) {
        this.groupLabelId = labelEl.fieldId;
      }
    }
  }

  @Watch('value')
  onValueChange(newVal: string) {
    if (this.internalUpdate) {
      this.internalUpdate = false;
      return;
    }
    this.distributeValue(newVal);
  }

  /** Clears all cells and focuses the first cell. */
  @Method()
  async clear() {
    for (const ref of this.cellRefs) {
      if (ref) ref.value = '';
    }
    this.internalUpdate = true;
    this.value = '';
    this.aegovOtpChange.emit({ value: '' });
    this.runValidationSync();
    this.cellRefs[0]?.focus();
  }

  /** Imperatively re-run validation. */
  @Method()
  async validate(trigger: AegovValidationTrigger = 'manual'): Promise<AegovValidationResult> {
    return this.runAndEmitValidation(trigger);
  }

  /** Mirror of HTMLInputElement.setCustomValidity(). Marks field invalid + sets error message. */
  @Method()
  async setCustomValidity(message: string): Promise<void> {
    this.errorMessage = message;
    this.isInvalid = !!message;
    if (this.internals) {
      if (message) {
        setInternalsValidity(
          this.internals,
          synthesizeValidity({ customError: true }),
          message,
          this.cellRefs[0],
        );
      } else {
        setInternalsValidity(this.internals, { valid: true }, '');
      }
    }
  }

  private computeValidity(): { validity: AegovValidityState; message: string } {
    const val = this.value || '';
    const filled = val.length;
    if (this.isRequired && filled === 0) {
      return { validity: synthesizeValidity({ valueMissing: true }), message: this.errorMessage || 'Required' };
    }
    if (filled > 0 && filled < this.length) {
      return { validity: synthesizeValidity({ tooShort: true }), message: this.errorMessage || `Enter ${this.length} characters` };
    }
    if (filled === this.length && this.pattern) {
      try {
        const re = new RegExp(this.pattern);
        if (!re.test(val)) {
          return { validity: synthesizeValidity({ patternMismatch: true }), message: this.errorMessage || 'Invalid format' };
        }
      } catch {
        // Bad regex — treat as no constraint
      }
    }
    return { validity: synthesizeValidity({}), message: '' };
  }

  private runValidationSync() {
    const { validity, message } = this.computeValidity();
    setInternalsValidity(this.internals, validity, message, this.cellRefs[0]);
    try {
      if (this.internals && typeof this.internals.setFormValue === 'function') {
        this.internals.setFormValue(this.value || '');
      }
    } catch {
      // jsdom mock environment may throw — safe to ignore
    }
  }

  private async runAndEmitValidation(trigger: AegovValidationTrigger): Promise<AegovValidationResult> {
    this.runValidationSync();
    const { validity, message } = this.computeValidity();
    this.aegovValidate.emit(buildValidationDetail<string>(
      this.el as unknown as HTMLElement & { name?: string },
      this.value, validity, message, this.errorMessage || null, trigger,
    ));
    return { valid: validity.valid, message, validity };
  }

  private distributeValue(val: string) {
    const clean = (val || '').replace(/\s/g, '');
    for (let i = 0; i < this.length; i++) {
      if (this.cellRefs[i]) {
        this.cellRefs[i].value = clean[i] || '';
      }
    }
  }

  private collectValue(): string {
    return this.cellRefs.map(r => r?.value || '').join('');
  }

  private isValidChar(char: string): boolean {
    if (this.isAlphanumeric) {
      return /^[a-zA-Z0-9]$/.test(char);
    }
    return /^[0-9]$/.test(char);
  }

  private emitChange() {
    const val = this.collectValue();
    this.internalUpdate = true;
    this.value = val;
    this.aegovOtpChange.emit({ value: val });
    this.runValidationSync();

    // Emit unified validate event
    const { validity, message } = this.computeValidity();
    this.aegovValidate.emit(buildValidationDetail<string>(
      this.el as unknown as HTMLElement & { name?: string },
      val, validity, message, this.errorMessage || null, 'change',
    ));

    if (val.length === this.length && validity.valid) {
      this.aegovOtpComplete.emit({ value: val });
    }
  }

  private handleInput = (index: number, e: Event) => {
    const input = e.target as HTMLInputElement;
    const val = input.value;

    if (val.length === 0) {
      this.emitChange();
      return;
    }

    // Multi-character: distribute across cells (handles autofill or overtype)
    if (val.length > 1) {
      const cleaned = val.replace(/\s/g, '');
      let ci = index;
      for (const ch of cleaned) {
        if (ci >= this.length) break;
        if (this.isValidChar(ch)) {
          this.cellRefs[ci].value = ch;
          ci++;
        }
      }
      input.value = this.cellRefs[index]?.value || '';
      this.emitChange();
      const focusIdx = Math.min(ci, this.length - 1);
      this.cellRefs[focusIdx]?.focus();
      return;
    }

    // Single character
    if (!this.isValidChar(val)) {
      input.value = '';
      return;
    }

    this.emitChange();

    if (index < this.length - 1) {
      this.cellRefs[index + 1]?.focus();
    }
  };

  private handleKeyDown = (index: number, e: KeyboardEvent) => {
    if (e.key === 'Backspace') {
      const input = e.target as HTMLInputElement;
      if (input.value === '' && index > 0) {
        e.preventDefault();
        this.cellRefs[index - 1].value = '';
        this.cellRefs[index - 1].focus();
        this.emitChange();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      this.cellRefs[index - 1].focus();
    } else if (e.key === 'ArrowRight' && index < this.length - 1) {
      e.preventDefault();
      this.cellRefs[index + 1].focus();
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      const input = e.target as HTMLInputElement;
      if (input.value) {
        input.select();
      }
    }
  };

  private handlePaste = (_index: number, e: ClipboardEvent) => {
    e.preventDefault();
    const pasted = (e.clipboardData?.getData('text') || '').replace(/\s/g, '');
    let ci = 0;
    for (const ch of pasted) {
      if (ci >= this.length) break;
      if (this.isValidChar(ch)) {
        this.cellRefs[ci].value = ch;
        ci++;
      }
    }
    this.emitChange();
    const nextEmpty = this.cellRefs.findIndex(r => !r?.value);
    const focusIdx = nextEmpty !== -1 ? nextEmpty : Math.min(ci, this.length - 1);
    this.cellRefs[focusIdx]?.focus();
  };

  private handleFocus = (e: FocusEvent) => {
    (e.target as HTMLInputElement).select();
  };

  private handleClick = (e: MouseEvent) => {
    (e.target as HTMLInputElement).select();
  };

  /** Blur on the entire OTP group — gates aria-live. Only fires when focus leaves the group entirely. */
  private handleBlurGroup = (e: FocusEvent) => {
    // If focus is moving to another cell within this component, skip
    if (this.el.contains(e.relatedTarget as Node)) return;
    this.hasBlurredOnce = true;
    this.runAndEmitValidation('blur');
  };

  render() {
    const passThroughAttrs = getPassThroughAttributes(this.el, new Set([]));
    delete passThroughAttrs['aria-invalid'];
    delete passThroughAttrs['aria-describedby'];

    const rtl = isRtl(this.el);
    const variant: FormVariant = (FORM_VARIANTS as readonly string[]).includes(this.variant) ? this.variant : 'primary';
    const wrapperClasses = ['aegov-otp', `otp-variant-${variant}`, this.extraClass || ''].filter(Boolean).join(' ');
    const cells = Array.from({ length: this.length }, (_, i) => i);
    const appearance: OtpVariant = (OTP_VARIANTS as readonly string[]).includes(this.appearance) ? this.appearance : 'continuous';
    const size: OtpSize = this._resolvedSize;

    const hasErrorSlot = !!this.el.querySelector('[slot="error"]');
    const hasHintSlot = !!this.el.querySelector('[slot="hint"]');
    const showError = this.isInvalid && (hasErrorSlot || !!this.errorMessage);
    const showHint = !showError && (hasHintSlot || !!this.hint);
    const announceError = showError && this.hasBlurredOnce;
    const authorDescribedBy = this.el.getAttribute('aria-describedby');
    const describedBy = composeDescribedBy(
      authorDescribedBy,
      showError ? this.errorId : null,
      showHint ? this.hintId : null,
    );

    const errorRegion = showError ? (
      <div
        id={this.errorId}
        class="aegov-otp__error"
        role={announceError ? 'alert' : null}
      >
        {hasErrorSlot ? <slot name="error" /> : this.errorMessage}
      </div>
    ) : null;
    const hintRegion = showHint ? (
      <div id={this.hintId} class="aegov-otp__hint">
        {hasHintSlot ? <slot name="hint" /> : this.hint}
      </div>
    ) : null;

    return (
      <Host class={{ 'is-invalid': this.isInvalid }}>
        <div class={wrapperClasses}>
          <div
            class={`otp__wrapper otp__wrapper--${appearance}`}
            role="group"
            aria-labelledby={this.groupLabelId || undefined}
            aria-invalid={this.isInvalid ? 'true' : null}
            onFocusout={this.handleBlurGroup}
            {...passThroughAttrs}
          >
            {cells.map((index) => [
              <input
                ref={(el) => { this.cellRefs[index] = el; }}
                id={index === 0 ? this.fieldId : undefined}
                class={`otp__cell otp__cell--${size}`}
                type="text"
                inputMode={this.isAlphanumeric ? 'text' : 'numeric'}
                disabled={this.isDisabled}
                autocomplete={index === 0 ? 'one-time-code' : 'off'}
                aria-label={rtl
                  ? `حرف ${index + 1} من ${this.length}`
                  : `Character ${index + 1} of ${this.length}`}
                aria-invalid={this.isInvalid ? 'true' : undefined}
                aria-required={index === 0 && this.isRequired ? 'true' : undefined}
                aria-describedby={index === 0 ? describedBy : undefined}
                onInput={(e) => this.handleInput(index, e)}
                onKeyDown={(e) => this.handleKeyDown(index, e)}
                onPaste={(e: any) => this.handlePaste(index, e)}
                onFocus={(e) => this.handleFocus(e)}
                onClick={(e) => this.handleClick(e)}
              />,
              appearance === 'continuous' && index < this.length - 1 && (
                <span class="otp__divider" aria-hidden="true"></span>
              ),
            ])}
          </div>
          {errorRegion}
          {hintRegion}
        </div>
      </Host>
    );
  }
}
