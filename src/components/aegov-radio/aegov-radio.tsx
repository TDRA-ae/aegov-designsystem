import { Component, Host, h, Prop, State, Watch, Event, EventEmitter, Element, Method } from '@stencil/core';
import { RADIO_SIZES } from '../../utils/types';
import type {
  RadioSize,
  AegovValidationDetail, AegovValidationResult, AegovValidationTrigger,
} from '../../utils/types';
import { getPassThroughAttributes } from '../../utils/attributes';
import { generateId } from '../../utils/id-generator';
import { watchResponsiveProp } from '../../utils/responsive-prop';
import type { ResponsivePropWatcher } from '../../utils/responsive-prop';
import {
  fromNativeValidity, VALID_STATE,
  composeDescribedBy, buildValidationDetail,
} from '../../utils/validation';

@Component({
  tag: 'aegov-radio',
  styleUrl: 'aegov-radio.css',
  scoped: false,
  shadow: false,
})
export class AegovRadio {
  @Element() el: HTMLElement;

  /** Unique ID for the native radio element. Auto-generated if not provided. */
  @Prop({ mutable: true, reflect: true }) fieldId?: string;

  /** The name attribute for the radio. Required for native radio grouping. */
  @Prop() name?: string;

  /** The value attribute for the radio. */
  @Prop() value?: string;

  /** Whether the radio is checked. */
  @Prop({ mutable: true, reflect: true }) isChecked: boolean = false;

  /** The size of the radio. */
  @Prop() size: string = 'base';

  @State() private _resolvedSize: RadioSize = 'base';
  private _sizeWatcher: ResponsivePropWatcher | null = null;

  /** Whether the radio is disabled. */
  @Prop({ reflect: true }) isDisabled: boolean = false;

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

  /** Additional CSS classes to apply. */
  @Prop() extraClass?: string;

  /** Emitted when the radio checked state changes. */
  @Event() aegovRadioChange: EventEmitter<{ checked: boolean; value?: string }>;

  /** Unified validation event. See §2.3. */
  @Event() aegovValidate: EventEmitter<AegovValidationDetail<boolean>>;

  /** Whether user has blurred at least once — gates aria-live (gap §7.10). */
  @State() private hasBlurredOnce: boolean = false;

  private inputEl?: HTMLInputElement;
  private errorId: string = '';
  private hintId: string = '';

  componentWillLoad() {
    if (!this.fieldId) {
      this.fieldId = generateId('aegov-radio');
    }
    this.errorId = `${this.fieldId}-error`;
    this.hintId = `${this.fieldId}-hint`;
    this._sizeWatcher = watchResponsiveProp(this.size, RADIO_SIZES, 'base', v => {
      this._resolvedSize = v as RadioSize;
    });
    this._resolvedSize = this._sizeWatcher.current as RadioSize;
  }

  disconnectedCallback() {
    this._sizeWatcher?.destroy();
  }

  @Watch('size')
  onSizeChange() {
    this._sizeWatcher?.destroy();
    this._sizeWatcher = watchResponsiveProp(this.size, RADIO_SIZES, 'base', v => {
      this._resolvedSize = v as RadioSize;
    });
    this._resolvedSize = this._sizeWatcher.current as RadioSize;
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

  private handleChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    this.isChecked = input.checked;
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

    const wrapperClasses = ['aegov-radio', `radio--${this._resolvedSize}`];
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
        id={this.fieldId}
        name={this.name}
        value={this.value}
        checked={this.isChecked}
        disabled={this.isDisabled}
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
        aria-live={announceError ? 'polite' : null}
      >
        {hasErrorSlot ? <slot name="error" /> : this.errorMessage}
      </div>
    ) : null;

    const hostClass = { 'is-invalid': this.isInvalid };

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
        </div>
        {errorRegion}
      </Host>
    );
  }
}
