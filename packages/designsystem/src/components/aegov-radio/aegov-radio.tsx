import { Component, Host, h, Prop, State, Watch, Event, EventEmitter, Element, Method, Listen } from '@stencil/core';
import { RADIO_SIZES, FORM_VARIANTS } from '../../utils/types';
import type {
  RadioSize, FormVariant,
  AegovValidationDetail, AegovValidationResult, AegovValidationTrigger,
} from '../../utils/types';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { getPassThroughAttributes } from '../../utils/attributes';
import { adoptExtraClassStylesIntoShadowRoot } from '../../utils/shadow-styles';
import { generateId } from '../../utils/id-generator';
import { watchResponsiveProp } from '../../utils/responsive-prop';
import type { ResponsivePropWatcher } from '../../utils/responsive-prop';
import {
  fromNativeValidity, VALID_STATE,
  composeDescribedBy, buildValidationDetail, synthesizeValidity, setInternalsValidity, syncHostDisabled,
} from '../../utils/validation';

@Component({
  tag: 'aegov-radio',
  styleUrl: 'aegov-radio.css',
  formAssociated: true,
  shadow: { delegatesFocus: true },
})
export class AegovRadio {
  @Element() el: HTMLElement;

  /** Unique ID for the native radio element. Auto-generated if not provided. */
  @Prop({ mutable: true, reflect: true }) fieldId?: string;

  /** The name attribute for the radio. Reflected so ElementInternals reads it for form submission, and so radio-group can propagate it via JS property assignment. */
  @Prop({ reflect: true }) name?: string;

  /** The value attribute for the radio. */
  @Prop() value?: string;

  /** Whether the radio is checked. */
  @Prop({ mutable: true, reflect: true }) isChecked: boolean = false;

  /** The size of the radio. */
  @Prop() size: string = 'base';

  /** Colour family. Drives rest border, checked bg/border. Focus ring stays camel; error stays aered. */
  @Prop() variant?: FormVariant;

  /** Visual appearance set by a parent aegov-radio-group. Not meant to be set directly. */
  @Prop({ reflect: true }) appearance: string = 'default';

  @State() private _resolvedSize: RadioSize = 'base';
  private _sizeWatcher: ResponsivePropWatcher | null = null;
  private _defaultChecked: boolean = false;

  /** Whether the radio is disabled. */
  @Prop({ mutable: true, reflect: true }) isDisabled: boolean = false;

  /** Whether the radio is required. */
  @Prop() isRequired: boolean = false;

  /** Label text for the radio. When provided, generates an associated <label> element. */
  @Prop() label?: string;

  /**
   * Helper hint text displayed below the label. Renamed from `description` per §6.6.
   * Hidden when an error is shown.
   */
  @Prop() hint?: string;

  /** Visual + a11y invalid state. See §2.3. */
  @Prop({ mutable: true, reflect: true }) isInvalid: boolean = false;

  /** Inline error message. Use `error` slot for rich markup. */
  @Prop({ mutable: true }) errorMessage: string = '';

  /**
   * Additional CSS classes to apply.
   *
   * This component renders in a real shadow root, which normally blocks the page's CSS
   * from reaching inside it. Margin/padding utilities (e.g. `mt-4`, `md:px-6`) are copied
   * in from the page's own stylesheets at runtime and work as expected; other utilities
   * (colour, border, typography, etc.) still have no effect — see #35.
   */
  @Prop() extraClass?: string;

  /** Emitted when the radio checked state changes. */
  @Event() aegovRadioChange: EventEmitter<{ checked: boolean; value?: string }>;

  /** Unified validation event. See §2.3. */
  @Event() aegovValidate: EventEmitter<AegovValidationDetail<boolean>>;

  /** Whether user has blurred at least once — gates aria-live (gap §7.10). */
  @State() private hasBlurredOnce: boolean = false;

  private inputEl?: HTMLInputElement;
  private internals: ElementInternals | null = null;
  private errorId: string = '';
  private hintId: string = '';

  @Watch('variant')
  onVariantChange(v: unknown) { warnIfInvalidEnumProp(v, FORM_VARIANTS, 'primary', { component: 'aegov-radio', prop: 'variant' }); }

  @Watch('appearance')
  onAppearanceChange(newVal: string) {
    (this.el as HTMLElement).classList.toggle('radio-appearance-cards', newVal === 'cards');
    (this.el as HTMLElement).classList.toggle('radio-appearance-pills', newVal === 'pills');
  }

  componentWillLoad() {
    if (this.isDisabled) syncHostDisabled(this.el, true);
    this._defaultChecked = this.isChecked;
    warnIfInvalidEnumProp(this.variant, FORM_VARIANTS, 'primary', { component: 'aegov-radio', prop: 'variant' });
    if (!this.fieldId) {
      this.fieldId = generateId('aegov-radio');
    }
    this.errorId = `${this.fieldId}-error`;
    this.hintId = `${this.fieldId}-hint`;
    this._sizeWatcher = watchResponsiveProp(this.size, RADIO_SIZES, 'base', v => {
      this._resolvedSize = v as RadioSize;
    });
    this._resolvedSize = this._sizeWatcher.current as RadioSize;
    const host = this.el as unknown as HTMLElement & { attachInternals?: () => ElementInternals };
    if (typeof host.attachInternals === 'function') {
      try {
        this.internals = host.attachInternals();
        this.internals.setFormValue(this.isChecked ? (this.value ?? null) : null);
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
    this.isChecked = this._defaultChecked;
    this.errorMessage = '';
    this.isInvalid = false;
    if (this.inputEl) this.inputEl.setCustomValidity('');
    this.internals?.setFormValue(this.isChecked ? (this.value ?? null) : null);
    if (this.isRequired && !this.isChecked) {
      setInternalsValidity(this.internals, synthesizeValidity({ valueMissing: true }), 'Please select an option');
    } else {
      setInternalsValidity(this.internals, { valid: true }, '');
    }
  }

  componentDidLoad() {
    adoptExtraClassStylesIntoShadowRoot(this.el.shadowRoot, this.extraClass);
    // Self-detect parent group appearance — bypasses syncChildren() timing dependency.
    const group = this.el.closest('aegov-radio-group');
    if (group) {
      const groupAppearance = group.getAttribute('appearance') || 'default';
      if (groupAppearance !== 'default' && groupAppearance !== this.appearance) {
        this.appearance = groupAppearance;
        (this.el as HTMLElement).classList.toggle('radio-appearance-cards', groupAppearance === 'cards');
        (this.el as HTMLElement).classList.toggle('radio-appearance-pills', groupAppearance === 'pills');
      }
      // Note: `list` appearance's separator classes are NOT self-detected here.
      // This read-the-DOM-attribute approach is exactly what broke for `list`
      // under React (#62), since the wrapper sets `appearance` as a JS property
      // only. They're applied correctly and unconditionally by the parent
      // group's own syncChildren() instead, which already runs right after
      // this (componentDidLoad is child-before-parent) and reads its own
      // resolved `appearance`/`orientation` props directly — no attribute
      // involved, so it works the same regardless of how the group's props
      // were set.
    }
  }

  disconnectedCallback() {
    this._sizeWatcher?.destroy();
  }

  /**
   * The inner control's constraints only change once it re-renders, so
   * validity is synced after every render rather than in a watcher, which
   * would read the old ones.
   */
  componentDidRender() {
    this.syncInternalsValidity();
  }

  @Watch('isChecked')
  onIsCheckedChange() {
    // Fires when radio-group programmatically deselects this radio (no DOM event fires).
    this.internals?.setFormValue(this.isChecked ? (this.value ?? null) : null);
    this.syncInternalsValidity();
  }

  @Watch('size')
  onSizeChange() {
    this._sizeWatcher?.destroy();
    this._sizeWatcher = watchResponsiveProp(this.size, RADIO_SIZES, 'base', v => {
      this._resolvedSize = v as RadioSize;
    });
    this._resolvedSize = this._sizeWatcher.current as RadioSize;
  }

  @Watch('extraClass')
  onExtraClassChange() {
    adoptExtraClassStylesIntoShadowRoot(this.el.shadowRoot, this.extraClass);
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
    this.syncInternalsValidity();
    const validity = this.readValidity();
    const message = !validity.valid
      ? (this.errorMessage || this.inputEl?.validationMessage || '')
      : '';
    this.aegovValidate.emit(buildValidationDetail<boolean>(
      this.el as unknown as HTMLElement & { name?: string },
      this.isChecked, validity, message, this.errorMessage || null, trigger,
    ));
    return { valid: validity.valid, message, validity };
  }

  /** Mirror of HTMLInputElement.setCustomValidity(). */
  @Method()
  async setCustomValidity(message: string): Promise<void> {
    this.errorMessage = message;
    this.isInvalid = !!message;
    if (this.inputEl && typeof this.inputEl.setCustomValidity === 'function') {
      this.inputEl.setCustomValidity(message);
    }
    if (this.internals) {
      if (message) {
        setInternalsValidity(this.internals, synthesizeValidity({ customError: true }), message, this.inputEl);
      } else {
        setInternalsValidity(this.internals, { valid: true }, '');
      }
    }
  }

  private readValidity() {
    // Disabled controls are barred from constraint validation, as native ones are.
    if (this.disabled) return VALID_STATE;
    const v = this.inputEl?.validity;
    return v ? fromNativeValidity(v) : VALID_STATE;
  }

  private syncInternalsValidity(): void {
    if (!this.internals || !this.inputEl) return;
    const v = this.inputEl.validity;
    if (this.disabled || v.valid) {
      setInternalsValidity(this.internals, { valid: true }, '');
    } else {
      const message = this.errorMessage || this.inputEl.validationMessage || '';
      setInternalsValidity(this.internals, fromNativeValidity(v), message, this.inputEl);
    }
  }

  private emitValidate(trigger: AegovValidationTrigger) {
    const validity = this.readValidity();
    const message = !validity.valid
      ? (this.errorMessage || this.inputEl?.validationMessage || '')
      : '';
    this.aegovValidate.emit(buildValidationDetail<boolean>(
      this.el as unknown as HTMLElement & { name?: string },
      this.isChecked, validity, message, this.errorMessage || null, trigger,
    ));
  }

  private handleChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    this.isChecked = input.checked;
    this.internals?.setFormValue(this.isChecked ? (this.value ?? null) : null);
    this.syncInternalsValidity();
    this.aegovRadioChange.emit({ checked: this.isChecked, value: this.value });
    this.emitValidate('change');
  };

  private handleBlur = () => {
    this.hasBlurredOnce = true;
    this.emitValidate('blur');
  };

  private static readonly PASS_THROUGH_ATTRS = new Set([
    'form', 'tabindex', 'autofocus', 'title',
  ]);


  render() {
    const passThroughAttrs = getPassThroughAttributes(this.el, AegovRadio.PASS_THROUGH_ATTRS);
    delete passThroughAttrs['aria-invalid'];
    delete passThroughAttrs['aria-describedby'];

    const variant: FormVariant = (FORM_VARIANTS as readonly string[]).includes(this.variant) ? this.variant : 'primary';
    const wrapperClasses = ['aegov-radio', `radio--${this._resolvedSize}`, `radio-variant-${variant}`];
    if (this.extraClass) wrapperClasses.push(this.extraClass);

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

    const radioInput = (
      <input
        ref={(el) => this.inputEl = el}
        type="radio"
        // A radio with no name belongs to no radio group, and the HTML spec never
        // reports valueMissing for it — so a required radio could never be missing.
        // The input lives in this component's own shadow root, so the name does not
        // join it to other radios or change what the form submits (ElementInternals does).
        name={this.name || this.fieldId}
        id={this.fieldId}
        value={this.value}
        checked={this.isChecked}
        disabled={this.disabled}
        required={this.isRequired}
        aria-required={this.isRequired ? 'true' : undefined}
        aria-invalid={this.isInvalid ? 'true' : null}
        aria-describedby={describedBy}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        {...passThroughAttrs}
      />
    );

    const errorRegion = showError ? (
      <div
        id={this.errorId}
        class="aegov-radio__error"
        role={announceError ? 'alert' : null}
      >
        {hasErrorSlot ? <slot name="error" /> : this.errorMessage}
      </div>
    ) : null;

    const hostClass = {
      'is-invalid': this.isInvalid,
      'radio-appearance-cards': this.appearance === 'cards',
      'radio-appearance-pills': this.appearance === 'pills',
    };

    if (this.label) {
      return (
        <Host class={hostClass}>
          <div class={wrapperClasses.join(' ')}>
            <label class="radio__wrapper">
              {radioInput}
              <span class="radio__text">
                <span class="radio__label-text">{this.label}</span>
                {showHint && (
                  <span id={this.hintId} class="radio__hint">
                    {hasHintSlot ? <slot name="hint" /> : this.hint}
                  </span>
                )}
              </span>
            </label>
          </div>
          {errorRegion}
        </Host>
      );
    }

    return (
      <Host class={hostClass}>
        <div class={wrapperClasses.join(' ')}>
          {radioInput}
          {showHint && (
            <span id={this.hintId} class="radio__hint">
              {hasHintSlot ? <slot name="hint" /> : this.hint}
            </span>
          )}
        </div>
        {errorRegion}
      </Host>
    );
  }
}
