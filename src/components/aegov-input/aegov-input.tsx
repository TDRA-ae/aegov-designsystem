import { Component, Host, h, Prop, State, Event, EventEmitter, Element, Watch, Method } from '@stencil/core';
import { INPUT_TYPES, INPUT_SIZES, FORM_VARIANTS } from '../../utils/types';
import type {
  InputType, InputSize, FormVariant,
  AegovValidationDetail, AegovValidationResult, AegovValidationTrigger,
} from '../../utils/types';
import { getPassThroughAttributes } from '../../utils/attributes';
import { generateId } from '../../utils/id-generator';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { watchResponsiveProp } from '../../utils/responsive-prop';
import type { ResponsivePropWatcher } from '../../utils/responsive-prop';
import {
  fromNativeValidity, VALID_STATE,
  composeDescribedBy, buildValidationDetail,
} from '../../utils/validation';

const TAG = 'aegov-input';
const ctx = (prop: string) => ({ component: TAG, prop });

@Component({
  tag: 'aegov-input',
  styleUrl: 'aegov-input.css',
  scoped: false,
  shadow: false,
})
export class AegovInput {
  @Element() el: HTMLElement;

  /** Unique ID for the native input element. Auto-generated if not provided. */
  @Prop({ mutable: true, reflect: true }) fieldId?: string;

  /** The type of the input field. */
  @Prop() type: InputType = 'text';

  /** The size of the input field. */
  @Prop() size: string = 'base';

  /** Colour family. Drives idle ring, value text, and accent hover. Focus ring stays camel; error stays aered regardless. */
  @Prop() variant: FormVariant = 'primary';
  @State() private _resolvedSize: InputSize = 'base';
  private _sizeWatcher: ResponsivePropWatcher | null = null;

  /** Whether the input is disabled. */
  @Prop() isDisabled: boolean = false;

  /** Whether the input is readonly. */
  @Prop() isReadonly: boolean = false;

  /** Placeholder text for the input. */
  @Prop() placeholder?: string;

  /** The current value of the input. */
  @Prop({ mutable: true }) value: string = '';

  /** The name attribute for the input. */
  @Prop() name?: string;

  /** Whether the input is required. */
  @Prop() isRequired: boolean = false;

  /** Show a toggle button to reveal/hide password. Only applies when type="password". */
  @Prop() isRevealable: boolean = false;

  /** Show a copy button to copy the input value to clipboard. Only applies when readonly. */
  @Prop() isCopyable: boolean = false;

  /**
   * Visual + a11y invalid state. Toggles `aria-invalid="true"` on the inner input
   * and adds the `is-invalid` class on the host. See validation-engine-addon.md §2.3.
   */
  @Prop({ mutable: true, reflect: true }) isInvalid: boolean = false;

  /**
   * Inline error message rendered below the control when `isInvalid` is true.
   * Auto-wires `aria-describedby` on the inner input. Use the `error` slot for
   * richer markup.
   */
  @Prop({ mutable: true }) errorMessage: string = '';

  /**
   * Helper hint rendered below the control. Hidden when an error is shown so the
   * two text regions don't compete for the user's attention. Use the `hint` slot
   * for richer markup.
   */
  @Prop() hint: string = '';

  /** Additional CSS classes to apply. */
  @Prop() extraClass?: string;

  /** Tracks whether the password is currently visible. */
  @State() passwordVisible: boolean = false;

  /** Tracks whether the value was just copied (for visual feedback). */
  @State() justCopied: boolean = false;

  /** Emitted when the input value changes (on blur/enter). */
  @Event() aegovInputChange: EventEmitter<{ value: string; event: Event }>;

  /** Emitted on every keystroke. */
  @Event() aegovInputInput: EventEmitter<{ value: string; event: Event }>;

  /** Emitted when the input gains focus. */
  @Event() aegovInputFocus: EventEmitter<FocusEvent>;

  /** Emitted when the input loses focus. */
  @Event() aegovInputBlur: EventEmitter<FocusEvent>;

  /**
   * Unified validation event emitted on input/change/blur/manual triggers.
   * Carries full validity snapshot for orchestrators (Layer 2) and BYO consumers.
   * See validation-engine-addon.md §2.3.
   */
  @Event() aegovValidate: EventEmitter<AegovValidationDetail<string>>;

  /** Whether user has blurred the field at least once. Gates aria-live announcement to avoid AT spam during typing (gap §7.10). */
  @State() private hasBlurredOnce: boolean = false;

  /** Reference to the inner native <input> for native validity reads. */
  private nativeRef?: HTMLInputElement;

  /** Stable IDs for the error and hint regions; built once in componentWillLoad. */
  private errorId: string = '';
  private hintId: string = '';

  @Watch('variant')
  onVariantChange(v: unknown) { warnIfInvalidEnumProp(v, FORM_VARIANTS, 'primary', ctx('variant')); }

  componentWillLoad() {
    warnIfInvalidEnumProp(this.type, INPUT_TYPES, 'text', ctx('type'));
    warnIfInvalidEnumProp(this.variant, FORM_VARIANTS, 'primary', ctx('variant'));
    this._sizeWatcher = watchResponsiveProp(this.size, INPUT_SIZES, 'base', v => {
      this._resolvedSize = v as InputSize;
    });
    this._resolvedSize = this._sizeWatcher.current as InputSize;
    if (!this.fieldId) {
      this.fieldId = generateId('aegov-input');
    }
    this.errorId = `${this.fieldId}-error`;
    this.hintId = `${this.fieldId}-hint`;
  }

  /**
   * Imperatively re-run validation. Emits `aegovValidate` and returns the result.
   * @param trigger Reason for the validation run; defaults to `'manual'`.
   */
  @Method()
  async validate(trigger: AegovValidationTrigger = 'manual'): Promise<AegovValidationResult> {
    const validity = this.readValidity();
    const message = !validity.valid
      ? (this.errorMessage || this.nativeRef?.validationMessage || '')
      : '';
    this.aegovValidate.emit(buildValidationDetail<string>(
      this.el as unknown as HTMLElement & { name?: string },
      this.value,
      validity,
      message,
      this.errorMessage || null,
      trigger,
    ));
    return { valid: validity.valid, message, validity };
  }

  /**
   * Mirror of `HTMLInputElement.setCustomValidity()`. Setting a non-empty message
   * marks the field invalid AND surfaces the message in the error region.
   * Pass an empty string to clear.
   */
  @Method()
  async setCustomValidity(message: string): Promise<void> {
    this.errorMessage = message;
    this.isInvalid = !!message;
    if (this.nativeRef && typeof this.nativeRef.setCustomValidity === 'function') {
      this.nativeRef.setCustomValidity(message);
    }
  }

  /** Read native validity defensively — returns VALID_STATE in environments without ValidityState (e.g. spec mocks). */
  private readValidity() {
    const v = this.nativeRef?.validity;
    return v ? fromNativeValidity(v) : VALID_STATE;
  }

  disconnectedCallback() {
    this._sizeWatcher?.destroy();
  }

  @Watch('type')
  onTypeChange(v: unknown) { warnIfInvalidEnumProp(v, INPUT_TYPES, 'text', ctx('type')); }

  @Watch('size')
  onSizeChange() {
    this._sizeWatcher?.destroy();
    this._sizeWatcher = watchResponsiveProp(this.size, INPUT_SIZES, 'base', v => {
      this._resolvedSize = v as InputSize;
    });
    this._resolvedSize = this._sizeWatcher.current as InputSize;
  }

  /** Native input attributes to pass through to the inner input element. */
  private static readonly PASS_THROUGH_ATTRS = new Set([
    'pattern', 'min', 'max', 'minlength', 'maxlength', 'step',
    'autocomplete', 'autofocus', 'inputmode', 'list', 'multiple',
    'accept', 'capture', 'spellcheck', 'enterkeyhint', 'title',
    'tabindex', 'form',
  ]);


  private get showReveal(): boolean {
    return this.type === 'password' && this.isRevealable;
  }

  private get showCopy(): boolean {
    return this.isReadonly && this.isCopyable;
  }

  private get hasActionButton(): boolean {
    return this.showReveal || this.showCopy;
  }

  private get resolvedType(): string {
    if (this.showReveal && this.passwordVisible) {
      return 'text';
    }
    return (INPUT_TYPES as readonly string[]).includes(this.type) ? this.type : 'text';
  }

  private getInputClasses(hasIconStart: boolean, hasIconEnd: boolean): string {
    const classes: string[] = ['aegov-input'];

    const sizeClasses: Record<InputSize, string> = {
      xs: 'input--xs',
      sm: 'input--sm',
      base: 'input--base',
      lg: 'input--lg',
      xl: 'input--xl',
    };

    classes.push(sizeClasses[this._resolvedSize]);

    const variant: FormVariant = (FORM_VARIANTS as readonly string[]).includes(this.variant) ? this.variant : 'primary';
    classes.push(`input-variant-${variant}`);

    if (this.hasActionButton) {
      classes.push('input--has-action');
    }

    if (hasIconStart) {
      classes.push('input--has-icon-start');
    }

    if (hasIconEnd) {
      classes.push('input--has-icon-end');
    }

    if (this.extraClass) {
      classes.push(this.extraClass);
    }

    return classes.join(' ');
  }

  private handleChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.aegovInputChange.emit({ value: this.value, event });
    this.emitValidate('change');
  };

  private handleInput = (event: Event) => {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.aegovInputInput.emit({ value: this.value, event });
    this.emitValidate('input');
  };

  private handleFocus = (event: FocusEvent) => {
    this.aegovInputFocus.emit(event);
  };

  private handleBlur = (event: FocusEvent) => {
    this.hasBlurredOnce = true;
    this.aegovInputBlur.emit(event);
    this.emitValidate('blur');
  };

  /** Internal: emit a unified validate event without going through the public Method. */
  private emitValidate(trigger: AegovValidationTrigger) {
    const validity = this.readValidity();
    const message = !validity.valid
      ? (this.errorMessage || this.nativeRef?.validationMessage || '')
      : '';
    this.aegovValidate.emit(buildValidationDetail<string>(
      this.el as unknown as HTMLElement & { name?: string },
      this.value,
      validity,
      message,
      this.errorMessage || null,
      trigger,
    ));
  }

  private handleRevealToggle = () => {
    this.passwordVisible = !this.passwordVisible;
  };

  private handleCopy = async () => {
    if (!this.value) return;
    try {
      await navigator.clipboard.writeText(this.value);
      this.justCopied = true;
      setTimeout(() => {
        this.justCopied = false;
      }, 2000);
    } catch {
      // Fallback for environments without clipboard API
      const input = this.el.querySelector('input');
      if (input) {
        input.select();
        document.execCommand('copy');
        this.justCopied = true;
        setTimeout(() => {
          this.justCopied = false;
        }, 2000);
      }
    }
  };

  private renderRevealButton() {
    if (!this.showReveal) return null;

    const sizeClasses: Record<InputSize, string> = {
      xs: 'revealable--xs',
      sm: 'revealable--sm',
      base: 'revealable--base',
      lg: 'revealable--lg',
      xl: 'revealable--xl',
    };

    return (
      <button
        type="button"
        class={`input__revealable ${sizeClasses[this._resolvedSize]}`}
        onClick={this.handleRevealToggle}
        disabled={this.isDisabled}
        tabindex={-1}
        aria-label={this.passwordVisible ? 'Hide password' : 'Show password'}
      >
        {this.passwordVisible ? (
          // Eye-off icon
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
            <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
            <line x1="1" y1="1" x2="23" y2="23" />
            <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
          </svg>
        ) : (
          // Eye icon
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        )}
      </button>
    );
  }

  private renderCopyButton() {
    if (!this.showCopy) return null;

    const sizeClasses: Record<InputSize, string> = {
      xs: 'copy-btn--xs',
      sm: 'copy-btn--sm',
      base: 'copy-btn--base',
      lg: 'copy-btn--lg',
      xl: 'copy-btn--xl',
    };

    return (
      <button
        type="button"
        class={`input__copy-btn ${sizeClasses[this._resolvedSize]}${this.justCopied ? ' input__copy-btn--copied' : ''}`}
        onClick={this.handleCopy}
        tabindex={-1}
        aria-label={this.justCopied ? 'Copied' : 'Copy to clipboard'}
      >
        {this.justCopied ? (
          // Checkmark icon
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          // Copy icon
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        )}
      </button>
    );
  }

  render() {
    const passThroughAttributes = getPassThroughAttributes(this.el, AegovInput.PASS_THROUGH_ATTRS);
    // Layer 1 owns aria-invalid and aria-describedby — strip from pass-through to prevent
    // host-level attributes from clobbering our composed values (gap §7.8).
    delete passThroughAttributes['aria-invalid'];
    delete passThroughAttributes['aria-describedby'];
    const hasIconStart = !!this.el.querySelector('[slot="icon-start"]');
    const hasIconEndContent = !!this.el.querySelector('[slot="icon-end"]');
    const hasIconEnd = hasIconEndContent && !this.hasActionButton;
    const needsWrapper = this.hasActionButton || hasIconStart || hasIconEnd || hasIconEndContent;
    const hasErrorSlot = !!this.el.querySelector('[slot="error"]');
    const hasHintSlot = !!this.el.querySelector('[slot="hint"]');
    const showError = this.isInvalid && (hasErrorSlot || !!this.errorMessage);
    const showHint = !showError && (hasHintSlot || !!this.hint);
    // Gap §7.10 — only announce errors via live region after first blur; silent during typing
    const announceError = showError && this.hasBlurredOnce;
    // Gap §7.8 — preserve any aria-describedby the author put on the host (e.g. linking to external help text)
    const authorDescribedBy = this.el.getAttribute('aria-describedby');
    const describedBy = composeDescribedBy(
      authorDescribedBy,
      showError ? this.errorId : null,
      showHint ? this.hintId : null,
    );
    const input = (
      <input
        ref={el => (this.nativeRef = el)}
        id={this.fieldId}
        type={this.resolvedType}
        class={this.getInputClasses(hasIconStart, hasIconEnd)}
        disabled={this.isDisabled}
        readOnly={this.isReadonly}
        placeholder={this.placeholder}
        value={this.value}
        name={this.name}
        required={this.isRequired}
        aria-invalid={this.isInvalid ? 'true' : null}
        aria-describedby={describedBy}
        onChange={this.handleChange}
        onInput={this.handleInput}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        {...passThroughAttributes}
      />
    );

    const errorRegion = showError ? (
      <div
        id={this.errorId}
        class="aegov-input__error"
        role={announceError ? 'alert' : null}
        aria-live={announceError ? 'polite' : null}
      >
        {hasErrorSlot ? <slot name="error" /> : this.errorMessage}
      </div>
    ) : null;

    const hintRegion = showHint ? (
      <div id={this.hintId} class="aegov-input__hint">
        {hasHintSlot ? <slot name="hint" /> : this.hint}
      </div>
    ) : null;

    const hostClass = { 'is-invalid': this.isInvalid };

    if (needsWrapper) {
      return (
        <Host class={hostClass}>
          <div class={`input__wrapper input__wrapper--${this._resolvedSize}`}>
            {hasIconStart && (
              <span class="input__icon input__icon--start">
                <slot name="icon-start" />
              </span>
            )}
            {input}
            {hasIconEndContent && (
              <span class={`input__icon input__icon--end${!hasIconEnd ? ' input__icon--hidden' : ''}`}>
                <slot name="icon-end" />
              </span>
            )}
            {this.renderRevealButton()}
            {this.renderCopyButton()}
          </div>
          {errorRegion}
          {hintRegion}
        </Host>
      );
    }

    return (
      <Host class={hostClass}>
        {input}
        {errorRegion}
        {hintRegion}
      </Host>
    );
  }
}
