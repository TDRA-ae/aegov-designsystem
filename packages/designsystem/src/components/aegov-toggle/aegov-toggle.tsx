import { Component, Host, h, Prop, Watch, State, Event, EventEmitter, Element, Method, Listen } from '@stencil/core';
import { watchResponsiveProp } from '../../utils/responsive-prop';
import type { ResponsivePropWatcher } from '../../utils/responsive-prop';
import { TOGGLE_SIZES, FORM_VARIANTS } from '../../utils/types';
import type {
  ToggleSize, FormVariant,
  AegovValidationDetail, AegovValidationResult, AegovValidationTrigger,
} from '../../utils/types';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { getPassThroughAttributes } from '../../utils/attributes';
import { generateId } from '../../utils/id-generator';
import {
  fromNativeValidity, VALID_STATE,
  composeDescribedBy, buildValidationDetail, synthesizeValidity, setInternalsValidity, syncHostDisabled,
} from '../../utils/validation';

@Component({
  tag: 'aegov-toggle',
  styleUrl: 'aegov-toggle.css',
  formAssociated: true,
  shadow: { delegatesFocus: true },
})
export class AegovToggle {
  @Element() el: HTMLElement;

  /** Unique ID for the native checkbox element. Auto-generated if not provided. */
  @Prop({ mutable: true, reflect: true }) fieldId?: string;

  /** The name attribute for the toggle. Reflected so ElementInternals can read it for form submission. */
  @Prop({ reflect: true }) name?: string;

  /** The value attribute for the toggle. */
  @Prop() value?: string;

  /** Whether the toggle is checked/on. */
  @Prop({ mutable: true, reflect: true }) isChecked: boolean = false;

  /** The size of the toggle. */
  @Prop() size: string = 'base';

  /** Colour family. Drives ON track bg. OFF track stays aeblack-200. Focus ring stays camel; error stays aered. */
  @Prop() variant?: FormVariant;

  @State() private _resolvedSize: ToggleSize = 'base';
  private _sizeWatcher: ResponsivePropWatcher | null = null;
  private _defaultChecked: boolean = false;

  /** Whether the toggle is disabled. */
  @Prop({ mutable: true, reflect: true }) isDisabled: boolean = false;

  /** Whether the toggle is required. */
  @Prop() isRequired: boolean = false;

  /** Label text for the toggle. Rendered at the end (inline-end). */
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

  /** Emitted when the toggle checked state changes. */
  @Event() aegovToggleChange: EventEmitter<{ checked: boolean; value?: string }>;

  /** Unified validation event. See §2.3. */
  @Event() aegovValidate: EventEmitter<AegovValidationDetail<boolean>>;

  /** Whether user has blurred at least once — gates aria-live (gap §7.10). */
  @State() private hasBlurredOnce: boolean = false;

  private inputEl?: HTMLInputElement;
  private internals: ElementInternals | null = null;
  private errorId: string = '';
  private hintId: string = '';

  @Watch('variant')
  onVariantChange(v: unknown) { warnIfInvalidEnumProp(v, FORM_VARIANTS, 'primary', { component: 'aegov-toggle', prop: 'variant' }); }

  componentWillLoad() {
    if (this.isDisabled) syncHostDisabled(this.el, true);
    this._defaultChecked = this.isChecked;
    warnIfInvalidEnumProp(this.variant, FORM_VARIANTS, 'primary', { component: 'aegov-toggle', prop: 'variant' });
    if (!this.fieldId) {
      this.fieldId = generateId('aegov-toggle');
    }
    this.errorId = `${this.fieldId}-error`;
    this.hintId = `${this.fieldId}-hint`;
    this._sizeWatcher = watchResponsiveProp(this.size, TOGGLE_SIZES, 'base', v => {
      this._resolvedSize = v as ToggleSize;
    });
    this._resolvedSize = this._sizeWatcher.current as ToggleSize;
    const host = this.el as unknown as HTMLElement & { attachInternals?: () => ElementInternals };
    if (typeof host.attachInternals === 'function') {
      try {
        this.internals = host.attachInternals();
        this.internals.setFormValue(this.isChecked ? (this.value ?? 'on') : null);
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
    this.internals?.setFormValue(this.isChecked ? (this.value ?? 'on') : null);
    if (this.isRequired && !this.isChecked) {
      setInternalsValidity(this.internals, synthesizeValidity({ valueMissing: true }), 'Please check this field');
    } else {
      setInternalsValidity(this.internals, { valid: true }, '');
    }
  }

  /**
   * The inner control's constraints only change once it re-renders, so
   * validity is synced after every render rather than in a watcher, which
   * would read the old ones.
   */
  componentDidRender() {
    this.syncInternalsValidity();
  }

  disconnectedCallback() {
    this._sizeWatcher?.destroy();
  }

  /**
   * Checked state or value set from code fires no change event — keep the inner
   * input, the form value and validity in step with it (no events, like native).
   */
  @Watch('isChecked')
  @Watch('value')
  onCheckedOrValueChange() {
    if (this.inputEl && this.inputEl.checked !== !!this.isChecked) {
      this.inputEl.checked = !!this.isChecked;
    }
    this.internals?.setFormValue(this.isChecked ? (this.value ?? 'on') : null);
    this.syncInternalsValidity();
  }

  @Watch('size')
  onSizeChange() {
    this._sizeWatcher?.destroy();
    this._sizeWatcher = watchResponsiveProp(this.size, TOGGLE_SIZES, 'base', v => {
      this._resolvedSize = v as ToggleSize;
    });
    this._resolvedSize = this._sizeWatcher.current as ToggleSize;
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
    const v = this.inputEl?.validity;
    return v ? fromNativeValidity(v) : VALID_STATE;
  }

  private syncInternalsValidity(): void {
    if (!this.internals || !this.inputEl) return;
    const v = this.inputEl.validity;
    if (v.valid) {
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
    // Explicit, defensive attribute sync (#64) — Stencil's own `reflect: true`
    // can silently skip writing the `is-checked` attribute on the very first
    // change away from a literally-attribute-declared `is-checked="true"`
    // (its internal "last reflected value" bookkeeping appears to get
    // desynced from the real DOM attribute when the initial value comes from
    // attribute parsing rather than a property assignment — reproduces
    // identically on aegov-radio's own isChecked, same prop shape, so this
    // isn't toggle-specific application code). Every change thereafter
    // reflects correctly on its own; this line makes the first one reliable
    // too, and is a no-op when Stencil's own reflect already did the write.
    // set/remove rather than toggleAttribute(): mock-doc (spec tests) doesn't implement it.
    if (this.isChecked) this.el.setAttribute('is-checked', '');
    else this.el.removeAttribute('is-checked');
    this.internals?.setFormValue(this.isChecked ? (this.value ?? 'on') : null);
    this.syncInternalsValidity();
    this.aegovToggleChange.emit({ checked: this.isChecked, value: this.value });
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
    const passThroughAttrs = getPassThroughAttributes(this.el, AegovToggle.PASS_THROUGH_ATTRS);
    delete passThroughAttrs['aria-invalid'];
    delete passThroughAttrs['aria-describedby'];

    const size: ToggleSize = this._resolvedSize;
    const variant: FormVariant = (FORM_VARIANTS as readonly string[]).includes(this.variant) ? this.variant : 'primary';
    const wrapperClasses = ['aegov-toggle', `toggle--${size}`, `toggle-variant-${variant}`];

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

    const hasIconChecked = !!this.el.querySelector('[slot="icon-checked"]');
    const hasIconUnchecked = !!this.el.querySelector('[slot="icon-unchecked"]');
    const hasIcons = hasIconChecked || hasIconUnchecked;

    const toggle = (
      <span class="toggle__control">
        <input
          ref={(el) => this.inputEl = el}
          type="checkbox"
          role="switch"
          id={this.fieldId}
          value={this.value}
          checked={this.isChecked}
          disabled={this.disabled}
          required={this.isRequired}
          aria-checked={this.isChecked ? 'true' : 'false'}
          aria-required={this.isRequired ? 'true' : undefined}
          aria-invalid={this.isInvalid ? 'true' : null}
          aria-describedby={describedBy}
          onChange={this.handleChange}
          onBlur={this.handleBlur}
          class="toggle__input"
          {...passThroughAttrs}
        />
        <span class="toggle__track" aria-hidden="true">
          <span class={`toggle__thumb${hasIcons ? ' toggle__thumb--has-icon' : ''}`}>
            {hasIcons && (
              <span class="toggle__icon">
                <span class={`toggle__icon-item${this.isChecked ? '' : ' toggle__icon-item--active'}`}>
                  <slot name="icon-unchecked" />
                </span>
                <span class={`toggle__icon-item${this.isChecked ? ' toggle__icon-item--active' : ''}`}>
                  <slot name="icon-checked" />
                </span>
              </span>
            )}
          </span>
        </span>
      </span>
    );

    const errorRegion = showError ? (
      <div
        id={this.errorId}
        class="aegov-toggle__error"
        role={announceError ? 'alert' : null}
      >
        {hasErrorSlot ? <slot name="error" /> : this.errorMessage}
      </div>
    ) : null;

    const hostClass = { 'is-invalid': this.isInvalid };

    if (this.label) {
      return (
        <Host class={hostClass}>
          <div class={wrapperClasses.join(' ')}>
            <label class="toggle__wrapper">
              {toggle}
              <span class="toggle__text">
                <span class="toggle__label-text">{this.label}</span>
                {showHint && (
                  <span id={this.hintId} class="toggle__hint">
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
          {toggle}
        </div>
        {errorRegion}
      </Host>
    );
  }
}
