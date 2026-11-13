import { Component, Host, h, Prop, State, Event, EventEmitter, Element, Watch, Method, Listen, forceUpdate } from '@stencil/core';
import { INPUT_TYPES, INPUT_SIZES, FORM_VARIANTS } from '../../utils/types';
import type {
  InputType, InputSize, FormVariant,
  AegovValidationDetail, AegovValidationResult, AegovValidationTrigger,
} from '../../utils/types';
import { getPassThroughAttributes, observePassThroughAttributes } from '../../utils/attributes';
import { HostAria } from '../../utils/host-aria';
import { adoptExtraClassStylesIntoShadowRoot } from '../../utils/shadow-styles';
import { generateId } from '../../utils/id-generator';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { watchResponsiveProp } from '../../utils/responsive-prop';
import type { ResponsivePropWatcher } from '../../utils/responsive-prop';
import {
  fromNativeValidity, VALID_STATE,
  composeDescribedBy, buildValidationDetail, synthesizeValidity, setInternalsValidity, syncHostDisabled,
} from '../../utils/validation';
import { uiLang, observePageLang } from '../../utils/lang';
import { afterDispatchUnlessPrevented, getOwningForm, implicitlySubmit } from '../../utils/form-submit';

const STRINGS = {
  en: {
    hidePassword: 'Hide password',
    showPassword: 'Show password',
    copied: 'Copied',
    copyToClipboard: 'Copy to clipboard',
  },
  ar: {
    hidePassword: 'إخفاء كلمة المرور',
    showPassword: 'إظهار كلمة المرور',
    copied: 'تم النسخ',
    copyToClipboard: 'نسخ إلى الحافظة',
  },
};

const TAG = 'aegov-input';
const ctx = (prop: string) => ({ component: TAG, prop });

@Component({
  tag: 'aegov-input',
  styleUrl: 'aegov-input.css',
  formAssociated: true,
  shadow: { delegatesFocus: true },
})
export class AegovInput {
  @Element() el: HTMLElement;

  /** Unique ID for the native input element. Auto-generated if not provided. */
  @Prop({ mutable: true, reflect: true }) fieldId?: string;

  /** The type of the input field. */
  @Prop() type: InputType = 'text';

  /** The size of the input field. */
  @Prop() size: string = 'base';

  /** Colour family. Drives idle ring, value text, and accent hover. Focus ring follows the variant's support colour (camel for primary, desert for secondary, seablue for neutral-max/neutral-min); error stays aered regardless. */
  @Prop() variant?: FormVariant;
  @State() private _resolvedSize: InputSize = 'base';
  private _sizeWatcher: ResponsivePropWatcher | null = null;

  /** Whether the input is disabled. */
  @Prop({ mutable: true }) isDisabled: boolean = false;

  /** Whether the input is readonly. */
  @Prop() isReadonly: boolean = false;

  /** Placeholder text for the input. */
  @Prop() placeholder?: string;

  /** The current value of the input. */
  @Prop({ mutable: true }) value: string = '';

  /** The name attribute for the input. Reflected so ElementInternals can read it for form submission. */
  @Prop({ reflect: true }) name?: string;

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

  /**
   * Additional CSS classes to apply.
   *
   * This component renders in a real shadow root, which normally blocks the page's CSS
   * from reaching inside it. Margin/padding utilities (e.g. `mt-4`, `md:px-6`) are copied
   * in from the page's own stylesheets at runtime and work as expected; other utilities
   * (colour, border, typography, etc.) still have no effect — see #35.
   */
  @Prop() extraClass?: string;

  /**
   * Text of the prefix addon of an enclosing aegov-input-group ("AED", "+971").
   * Rendered in a hidden span inside this shadow root and added to the inner
   * input's description, as an id in the group's light DOM can't be
   * referenced from here. Set by aegov-input-group.
   * @internal
   */
  @Prop({ mutable: true }) addonPrefixText?: string;

  /**
   * Text of the suffix addon of an enclosing aegov-input-group (".gov.ae").
   * See `addonPrefixText`. Set by aegov-input-group.
   * @internal
   */
  @Prop({ mutable: true }) addonSuffixText?: string;

  /** Tracks whether the password is currently visible. */
  @State() passwordVisible: boolean = false;

  /** Tracks whether the value was just copied (for visual feedback). */
  @State() justCopied: boolean = false;

  /** Emitted when the input value changes (on blur/enter). */
  @Event() aegovInputChange: EventEmitter<{ value: string; event: globalThis.Event }>;

  /** Emitted on every keystroke. */
  @Event() aegovInputValue: EventEmitter<{ value: string; event: globalThis.Event }>;

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

  private internals: ElementInternals | null = null;

  /** Stable IDs for the error and hint regions; built once in componentWillLoad. */
  private errorId: string = '';
  private hintId: string = '';

  @Watch('variant')
  onVariantChange(v: unknown) { warnIfInvalidEnumProp(v, FORM_VARIANTS, 'primary', ctx('variant')); }

  /** The value the field started with — what a form reset restores, like a native control's default value. */
  private _defaultValue: string = '';

  componentWillLoad() {
    if (this.isDisabled) syncHostDisabled(this.el, true);
    this._defaultValue = this.value ?? '';
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
    const host = this.el as unknown as HTMLElement & { attachInternals?: () => ElementInternals };
    if (typeof host.attachInternals === 'function') {
      try {
        this.internals = host.attachInternals();
        this.internals.setFormValue(this.value ?? '');
      } catch {
        this.internals = null;
      }
    }
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
    this.errorMessage = '';
    this.isInvalid = false;
    if (this.nativeRef) {
      this.nativeRef.value = this._defaultValue;
      this.nativeRef.setCustomValidity('');
    }
    this.internals?.setFormValue(this.value ?? '');
    this.syncInternalsValidity();
  }

  /**
   * A value set from code (a framework binding, loading saved data, clearing the
   * form) fires no input event, so the form value and validity would otherwise
   * keep the previous value. Like a native input, no events are emitted for it.
   */
  @Watch('value')
  onValueChange() {
    if (this.nativeRef && this.nativeRef.value !== (this.value ?? '')) {
      this.nativeRef.value = this.value ?? '';
    }
    this.internals?.setFormValue(this.value ?? '');
    this.syncInternalsValidity();
  }

  /** The form found this field invalid during a submit or checkValidity() — start announcing errors. */
  @Listen('invalid')
  onInvalid() {
    this.hasBlurredOnce = true;
  }

  componentDidLoad() {
    adoptExtraClassStylesIntoShadowRoot(this.el.shadowRoot, this.extraClass);
    // A label written after this control (e.g. <label for> later in the page).
    this.hostAria?.refreshSoon();
  }

  /**
   * The inner input's constraints (required, type, pattern, min/max, …) only
   * change once it re-renders, so validity is synced after every render rather
   * than in a watcher, which would read the old ones.
   */
  componentDidRender() {
    this.syncInternalsValidity();
    // Inside aegov-input-group the hint/error can't show in this host (the
    // group's bordered box would clip them); the group shows them below
    // itself and re-reads them on this event (DS-A11Y-input-group-02).
    if (this.el.hasAttribute('is-grouped')) {
      this.el.dispatchEvent(new CustomEvent('aegovInputGroupSync', { bubbles: true, composed: true }));
    }
  }

  @Watch('extraClass')
  onExtraClassChange() {
    adoptExtraClassStylesIntoShadowRoot(this.el.shadowRoot, this.extraClass);
  }

  /**
   * Imperatively re-run validation. Emits `aegovValidate` and returns the result.
   * @param trigger Reason for the validation run; defaults to `'manual'`.
   */
  @Method()
  async validate(trigger: AegovValidationTrigger = 'manual'): Promise<AegovValidationResult> {
    if (trigger === 'submit') this.hasBlurredOnce = true;
    this.syncInternalsValidity();
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
    if (this.internals) {
      if (message) {
        setInternalsValidity(this.internals, synthesizeValidity({ customError: true }), message, this.nativeRef);
      } else {
        setInternalsValidity(this.internals, { valid: true }, '');
      }
    }
  }

  /** Read native validity defensively — returns VALID_STATE in environments without ValidityState (e.g. spec mocks). */
  private readValidity() {
    // Disabled controls are barred from constraint validation, as native ones are.
    if (this.disabled) return VALID_STATE;
    const v = this.nativeRef?.validity;
    return v ? fromNativeValidity(v) : VALID_STATE;
  }

  /** Sync native input ValidityState to ElementInternals so form.checkValidity() sees required/pattern/etc. */
  private syncInternalsValidity(): void {
    if (!this.internals || !this.nativeRef) return;
    const v = this.nativeRef.validity;
    if (this.disabled || v.valid) {
      setInternalsValidity(this.internals, { valid: true }, '');
    } else {
      const message = this.errorMessage || this.nativeRef.validationMessage || '';
      setInternalsValidity(this.internals, fromNativeValidity(v), message, this.nativeRef);
    }
  }

  private attrObserver: MutationObserver | null = null;

  /** Host aria-label / aria-labelledby / aria-describedby / labels, resolved for the inner input. */
  private hostAria?: HostAria;

  connectedCallback() {
    this.attrObserver = observePassThroughAttributes(this.el, AegovInput.PASS_THROUGH_ATTRS, () => forceUpdate(this));
    this.hostAria ??= new HostAria(this.el, { fieldId: () => this.fieldId, internals: () => this.internals, onChange: () => forceUpdate(this) });
    this.hostAria.connect();
    this.stopPageLangObserver = observePageLang(() => forceUpdate(this));
  }

  disconnectedCallback() {
    this._sizeWatcher?.destroy();
    this.attrObserver?.disconnect();
    this.hostAria?.disconnect();
    this.stopPageLangObserver?.();
  }

  /** Re-renders the built-in strings when the page language/direction changes (DS-A11Y-input-05). */
  private stopPageLangObserver?: () => void;

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

  private getInputClasses(hasIconStart: boolean, hasIconEnd: boolean, hasMultiIconEnd: boolean = false): string {
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
      if (hasMultiIconEnd) classes.push('input--has-multi-icon-end');
    }

    if (this.extraClass) {
      classes.push(this.extraClass);
    }

    return classes.join(' ');
  }

  private handleChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.internals?.setFormValue(this.value ?? '');
    this.syncInternalsValidity();
    this.aegovInputChange.emit({ value: this.value, event });
    this.emitValidate('change');
  };

  private handleInput = (event: Event) => {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.internals?.setFormValue(this.value ?? '');
    this.syncInternalsValidity();
    this.aegovInputValue.emit({ value: this.value, event });
    this.emitValidate('input');
  };

  private handleFocus = (event: FocusEvent) => {
    this.aegovInputFocus.emit(event);
  };

  /**
   * Enter-key implicit submission. A native <input> in a <form> submits it on
   * Enter, but this one lives in the shadow root and has no form owner, so the
   * browser never does; run the HTML algorithm against the host's form instead.
   * Deferred until the keydown has finished dispatching so a consumer's
   * keydown listener (e.g. an autocomplete taking Enter) can still cancel it
   * with preventDefault(), as with a native input.
   */
  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.key !== 'Enter' || event.isComposing || event.defaultPrevented) return;
    const form = getOwningForm(this.el, this.internals);
    if (!form) return;
    afterDispatchUnlessPrevented(event, () => implicitlySubmit(form));
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
      // Fallback for environments without clipboard API (uses nativeRef — safe in shadow:true)
      if (this.nativeRef) {
        this.nativeRef.select();
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
        disabled={this.disabled}
        aria-label={(() => { const t = STRINGS[uiLang(this.el)]; return this.passwordVisible ? t.hidePassword : t.showPassword; })()}
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
    const strings = STRINGS[uiLang(this.el)];

    return [
      <button
        type="button"
        class={`input__copy-btn ${sizeClasses[this._resolvedSize]}${this.justCopied ? ' input__copy-btn--copied' : ''}`}
        onClick={this.handleCopy}
        // The name stays the same; only the status region below says "Copied".
        // Changing the focused button's name as well made VoiceOver say it
        // two or three times (DS-A11Y-textarea-01).
        aria-label={strings.copyToClipboard}
      >
        {this.justCopied ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        )}
      </button>,
      <span
        role="status"
        aria-live="polite"
        aria-atomic="true"
        style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)', whiteSpace: 'nowrap' }}
      >
        {this.justCopied ? strings.copied : ''}
      </span>,
    ];
  }

  render() {
    // Host aria-labelledby / aria-label / labels become the inner input's
    // aria-label; raw IDs can't resolve inside the shadow root (DS-A11Y-input-01).
    const passThroughAttributes = this.hostAria
      ? this.hostAria.bridge(getPassThroughAttributes(this.el, AegovInput.PASS_THROUGH_ATTRS))
      : getPassThroughAttributes(this.el, AegovInput.PASS_THROUGH_ATTRS);
    // Layer 1 owns aria-invalid and aria-describedby — strip from pass-through to prevent
    // host-level attributes from clobbering our composed values (gap §7.8).
    delete passThroughAttributes['aria-invalid'];
    delete passThroughAttributes['aria-describedby'];
    const hasIconStart = !!this.el.querySelector('[slot="icon-start"]');
    const iconEndSlotted = this.el.querySelectorAll('[slot="icon-end"]');
    const hasIconEndContent = iconEndSlotted.length > 0;
    const hasIconEnd = hasIconEndContent && !this.hasActionButton;
    const hasMultiIconEnd = iconEndSlotted.length >= 2 && hasIconEnd;
    const needsWrapper = this.hasActionButton || hasIconStart || hasIconEnd || hasIconEndContent;
    const hasErrorSlot = !!this.el.querySelector('[slot="error"]');
    const hasHintSlot = !!this.el.querySelector('[slot="hint"]');
    const showError = this.isInvalid && (hasErrorSlot || !!this.errorMessage);
    // The hint (format, length, where to find the value) stays visible while an
    // error shows, after the error, and both describe the field: the hint is
    // most needed exactly then (DS-A11Y-input-08).
    const showHint = hasHintSlot || !!this.hint;
    // Gap §7.10 — only announce errors via live region after first blur; silent during typing
    const announceError = showError && this.hasBlurredOnce;
    // Gap §7.8 — keep the author's host aria-describedby (external help text):
    // its text sits in a hidden span here, as its ids can't be referenced from
    // inside the shadow root. Then the group addons ("AED", ".gov.ae").
    const prefixId = this.addonPrefixText ? `${this.fieldId}-addon-prefix` : null;
    const suffixId = this.addonSuffixText ? `${this.fieldId}-addon-suffix` : null;
    const describedBy = composeDescribedBy(
      this.hostAria?.descriptionId(),
      prefixId,
      suffixId,
      showError ? this.errorId : null,
      showHint ? this.hintId : null,
    );
    const input = (
      <input
        ref={el => (this.nativeRef = el)}
        id={this.fieldId}
        type={this.resolvedType}
        class={this.getInputClasses(hasIconStart, hasIconEnd, hasMultiIconEnd)}
        disabled={this.disabled}
        readOnly={this.isReadonly}
        placeholder={this.placeholder}
        value={this.value}
        required={this.isRequired}
        aria-invalid={this.isInvalid ? 'true' : null}
        aria-describedby={describedBy}
        onChange={this.handleChange}
        onInput={this.handleInput}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        onKeyDown={this.handleKeyDown}
        {...passThroughAttributes}
      />
    );

    const errorRegion = showError ? (
      <div
        id={this.errorId}
        class="aegov-input__error"
        role={announceError ? 'alert' : null}
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
    const hiddenDescriptions = [
      this.hostAria?.renderDescription(),
      prefixId && <span id={prefixId} hidden>{this.addonPrefixText}</span>,
      suffixId && <span id={suffixId} hidden>{this.addonSuffixText}</span>,
    ];

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
          {hiddenDescriptions}
        </Host>
      );
    }

    return (
      <Host class={hostClass}>
        {input}
        {errorRegion}
        {hintRegion}
        {hiddenDescriptions}
      </Host>
    );
  }
}
