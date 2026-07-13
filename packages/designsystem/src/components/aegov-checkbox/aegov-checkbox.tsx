import { Component, Host, h, Prop, State, Event, EventEmitter, Element, Watch, Method } from '@stencil/core';
import { CHECKBOX_SIZES, FORM_VARIANTS } from '../../utils/types';
import type {
  CheckboxSize, FormVariant,
  AegovValidationDetail, AegovValidationResult, AegovValidationTrigger,
} from '../../utils/types';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { getPassThroughAttributes } from '../../utils/attributes';
import { generateId } from '../../utils/id-generator';
import { watchResponsiveProp } from '../../utils/responsive-prop';
import type { ResponsivePropWatcher } from '../../utils/responsive-prop';
import {
  fromNativeValidity, VALID_STATE,
  composeDescribedBy, buildValidationDetail,
} from '../../utils/validation';

@Component({
  tag: 'aegov-checkbox',
  styleUrl: 'aegov-checkbox.css',
  scoped: false,
  shadow: false,
})
export class AegovCheckbox {
  @Element() el: HTMLElement;

  /** Unique ID for the native checkbox element. Auto-generated if not provided. */
  @Prop({ mutable: true, reflect: true }) fieldId?: string;

  /** The name attribute for the checkbox. */
  @Prop() name?: string;

  /** The value attribute for the checkbox. */
  @Prop() value?: string;

  /** Whether the checkbox is checked. */
  @Prop({ mutable: true, reflect: true }) isChecked: boolean = false;

  /** The size of the checkbox. */
  @Prop() size: string = 'base';

  /** Colour family. Drives rest border, checked bg/border. Focus ring stays camel; error stays aered. */
  @Prop() variant: FormVariant = 'primary';

  @State() private _resolvedSize: CheckboxSize = 'base';
  private _sizeWatcher: ResponsivePropWatcher | null = null;

  /** Whether the checkbox is disabled. */
  @Prop({ reflect: true }) isDisabled: boolean = false;

  /** Whether the checkbox is required. */
  @Prop() isRequired: boolean = false;

  /** Label text for the checkbox. When provided, generates an associated <label> element. */
  @Prop() label?: string;

  /**
   * Helper hint text displayed below the label. Only rendered when label is provided
   * and no error is shown. Renamed from `description` (decision §6.6).
   */
  @Prop() hint?: string;

  /** Marks this checkbox as a "check all" controller within a checkbox group. */
  @Prop({ reflect: true }) isCheckAll: boolean = false;

  /** Whether the checkbox is in an indeterminate state. Set by parent group for check-all. */
  @Prop({ mutable: true }) isIndeterminate: boolean = false;

  /** Visual + a11y invalid state. Toggles `aria-invalid` + `is-invalid` host class. See §2.3. */
  @Prop({ mutable: true, reflect: true }) isInvalid: boolean = false;

  /** Inline error message. Use `error` slot for rich markup. */
  @Prop({ mutable: true }) errorMessage: string = '';

  /** Additional CSS classes to apply. */
  @Prop() extraClass?: string;

  /** Emitted when the checkbox checked state changes. */
  @Event() aegovCheckboxChange: EventEmitter<{ checked: boolean; value?: string }>;

  /** Unified validation event. See §2.3. */
  @Event() aegovValidate: EventEmitter<AegovValidationDetail<boolean>>;

  /** Whether user has interacted with the field — gates aria-live (gap §7.10). */
  @State() private hasBlurredOnce: boolean = false;

  private inputEl?: HTMLInputElement;
  private errorId: string = '';
  private hintId: string = '';

  @Watch('variant')
  onVariantChange(v: unknown) { warnIfInvalidEnumProp(v, FORM_VARIANTS, 'primary', { component: 'aegov-checkbox', prop: 'variant' }); }

  componentWillLoad() {
    warnIfInvalidEnumProp(this.variant, FORM_VARIANTS, 'primary', { component: 'aegov-checkbox', prop: 'variant' });
    if (!this.fieldId) {
      this.fieldId = generateId('aegov-checkbox');
    }
    this.errorId = `${this.fieldId}-error`;
    this.hintId = `${this.fieldId}-hint`;
    this._sizeWatcher = watchResponsiveProp(this.size, CHECKBOX_SIZES, 'base', v => {
      this._resolvedSize = v as CheckboxSize;
    });
    this._resolvedSize = this._sizeWatcher.current as CheckboxSize;
  }

  /** Imperatively re-run validation. */
  @Method()
  async validate(trigger: AegovValidationTrigger = 'manual'): Promise<AegovValidationResult> {
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
  }

  private readValidity() {
    const v = this.inputEl?.validity;
    return v ? fromNativeValidity(v) : VALID_STATE;
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

  private handleBlur = () => {
    this.hasBlurredOnce = true;
    this.emitValidate('blur');
  };

  disconnectedCallback() {
    this._sizeWatcher?.destroy();
  }

  @Watch('size')
  onSizeChange() {
    this._sizeWatcher?.destroy();
    this._sizeWatcher = watchResponsiveProp(this.size, CHECKBOX_SIZES, 'base', v => {
      this._resolvedSize = v as CheckboxSize;
    });
    this._resolvedSize = this._sizeWatcher.current as CheckboxSize;
  }

  componentDidRender() {
    if (this.inputEl) {
      this.inputEl.indeterminate = this.isIndeterminate;
    }
  }

  @Watch('isIndeterminate')
  onIndeterminateChange() {
    if (this.inputEl) {
      this.inputEl.indeterminate = this.isIndeterminate;
    }
  }

  private handleChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    this.isChecked = input.checked;
    this.isIndeterminate = false;
    this.aegovCheckboxChange.emit({ checked: this.isChecked, value: this.value });
    this.emitValidate('change');
  };

  private static readonly PASS_THROUGH_ATTRS = new Set([
    'form', 'tabindex', 'autofocus', 'title',
  ]);


  render() {
    const passThroughAttrs = getPassThroughAttributes(this.el, AegovCheckbox.PASS_THROUGH_ATTRS);
    // Layer 1 owns aria-invalid + aria-describedby (gap §7.8)
    delete passThroughAttrs['aria-invalid'];
    delete passThroughAttrs['aria-describedby'];

    const variant: FormVariant = (FORM_VARIANTS as readonly string[]).includes(this.variant) ? this.variant : 'primary';
    const wrapperClasses = ['aegov-checkbox', `checkbox--${this._resolvedSize}`, `checkbox-variant-${variant}`];
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

    const checkboxInput = (
      <input
        ref={(el) => this.inputEl = el}
        type="checkbox"
        id={this.fieldId}
        name={this.name}
        value={this.value}
        checked={this.isChecked}
        disabled={this.isDisabled}
        required={this.isRequired}
        aria-checked={this.isIndeterminate ? 'mixed' : this.isChecked ? 'true' : 'false'}
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
        class="aegov-checkbox__error"
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
            <label class="checkbox__wrapper">
              {checkboxInput}
              <span class="checkbox__text">
                <span class="checkbox__label-text">{this.label}</span>
                {showHint && (
                  <span id={this.hintId} class="checkbox__hint">
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
          {checkboxInput}
        </div>
        {errorRegion}
      </Host>
    );
  }
}
