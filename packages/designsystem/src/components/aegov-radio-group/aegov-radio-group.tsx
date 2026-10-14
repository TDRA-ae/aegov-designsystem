import { Component, Host, h, Prop, State, Event, EventEmitter, Element, Listen, Watch, Method } from '@stencil/core';
import { RADIO_GROUP_VARIANTS, RADIO_GROUP_ORIENTATIONS, RADIO_SIZES, FORM_VARIANTS } from '../../utils/types';
import type {
  RadioGroupVariant, RadioGroupOrientation, RadioSize, FormVariant,
  AegovValidationDetail, AegovValidationResult, AegovValidationTrigger,
} from '../../utils/types';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { watchResponsiveProp } from '../../utils/responsive-prop';
import type { ResponsivePropWatcher } from '../../utils/responsive-prop';
import {
  composeDescribedBy, buildValidationDetail, synthesizeValidity,
} from '../../utils/validation';
import { getPassThroughAttributes } from '../../utils/attributes';
import { adoptExtraClassStylesIntoShadowRoot } from '../../utils/shadow-styles';
import { generateId } from '../../utils/id-generator';

const TAG = 'aegov-radio-group';
const ctx = (prop: string) => ({ component: TAG, prop });

@Component({
  tag: 'aegov-radio-group',
  styleUrl: 'aegov-radio-group.css',
  shadow: { delegatesFocus: true },
})
export class AegovRadioGroup {
  @Element() el: HTMLElement;

  /** Visual appearance for the group layout. */
  @Prop() appearance: RadioGroupVariant = 'default';

  /** Stack direction for radio items. */
  @Prop() orientation: RadioGroupOrientation = 'vertical';

  /** Optional label rendered as a <legend> for accessibility. */
  @Prop() label?: string;

  /** Size of all radios in the group. Propagated to children. */
  @Prop() size: string = 'base';
  @State() private _resolvedSize: RadioSize = 'base';
  private _sizeWatcher: ResponsivePropWatcher | null = null;

  /** Colour family. Cascades to child radios (only if child has no own variant). Focus ring stays camel; error stays aered regardless. */
  @Prop() variant?: FormVariant;

  /** The name shared by all radios in the group. Ensures native single-select behavior. */
  @Prop() name!: string;

  /** Disables all radios within the group via native fieldset disabled. */
  @Prop({ mutable: true, reflect: true }) isDisabled: boolean = false;

  /** Group is required — at least one radio must be selected. Aggregate-level only. */
  @Prop() isRequired: boolean = false;

  /** Visual + a11y invalid state. See §2.3. */
  @Prop({ mutable: true, reflect: true }) isInvalid: boolean = false;

  /** Inline error message. */
  @Prop({ mutable: true }) errorMessage: string = '';

  /** Helper hint shown below the legend when not invalid. */
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

  /** Emitted when the selected radio changes. Contains the selected value. */
  @Event() aegovRadioGroupChange: EventEmitter<{ value: string | undefined }>;

  /** Unified validation event (group-level aggregate). See §2.3. */
  @Event() aegovValidate: EventEmitter<AegovValidationDetail<string | undefined>>;

  @State() private hasInteractedOnce: boolean = false;
  private fieldId: string = '';
  private errorId: string = '';
  private hintId: string = '';

  componentWillLoad() {
    warnIfInvalidEnumProp(this.appearance, RADIO_GROUP_VARIANTS, 'default', ctx('appearance'));
    warnIfInvalidEnumProp(this.orientation, RADIO_GROUP_ORIENTATIONS, 'vertical', ctx('orientation'));
    warnIfInvalidEnumProp(this.variant, FORM_VARIANTS, 'primary', ctx('variant'));
    this._sizeWatcher = watchResponsiveProp(this.size, RADIO_SIZES, 'base', v => {
      this._resolvedSize = v as RadioSize;
      if (this.el.isConnected) { this.syncChildren(); }
    });
    this._resolvedSize = this._sizeWatcher.current as RadioSize;
    this.fieldId = generateId('aegov-radio-group');
    this.errorId = `${this.fieldId}-error`;
    this.hintId = `${this.fieldId}-hint`;
  }

  /** Imperatively re-run validation. */
  @Method()
  async validate(trigger: AegovValidationTrigger = 'manual'): Promise<AegovValidationResult> {
    return this.runAndEmitValidation(trigger);
  }

  /** Set a custom error message. */
  @Method()
  async setCustomValidity(message: string): Promise<void> {
    this.errorMessage = message;
    this.isInvalid = !!message;
  }

  private collectSelectedValue(): string | undefined {
    const radios = this.getRadios();
    const selected = radios.find(r => r.isChecked);
    return selected?.value;
  }

  private computeValidity() {
    const value = this.collectSelectedValue();
    if (this.isRequired && !value) {
      return { validity: synthesizeValidity({ valueMissing: true }), message: this.errorMessage || 'Required', value };
    }
    return { validity: synthesizeValidity({}), message: '', value };
  }

  private async runAndEmitValidation(trigger: AegovValidationTrigger): Promise<AegovValidationResult> {
    const { validity, message, value } = this.computeValidity();
    this.aegovValidate.emit(buildValidationDetail<string | undefined>(
      this.el as unknown as HTMLElement & { name?: string },
      value, validity, message, this.errorMessage || null, trigger,
    ));
    return { valid: validity.valid, message, validity };
  }

  componentDidLoad() {
    this.syncChildren();
    adoptExtraClassStylesIntoShadowRoot(this.el.shadowRoot, this.extraClass);
  }

  @Watch('extraClass')
  onExtraClassChange() {
    adoptExtraClassStylesIntoShadowRoot(this.el.shadowRoot, this.extraClass);
  }

  @Watch('appearance')
  onVariantChange(v: unknown) {
    warnIfInvalidEnumProp(v, RADIO_GROUP_VARIANTS, 'default', ctx('appearance'));
    if (this.el.isConnected) { this.syncChildren(); }
  }

  @Watch('orientation')
  onOrientationChange(v: unknown) { warnIfInvalidEnumProp(v, RADIO_GROUP_ORIENTATIONS, 'vertical', ctx('orientation')); }

  @Watch('variant')
  onColourVariantChange(v: unknown) {
    warnIfInvalidEnumProp(v, FORM_VARIANTS, 'primary', ctx('variant'));
    if (this.el.isConnected) { this.syncChildren(); }
  }

  @Watch('isDisabled')
  onIsDisabledChange() {
    if (this.el.isConnected) { this.syncChildren(); }
  }

  disconnectedCallback() {
    this._sizeWatcher?.destroy();
  }

  @Watch('size')
  onSizeChange() {
    this._sizeWatcher?.destroy();
    this._sizeWatcher = watchResponsiveProp(this.size, RADIO_SIZES, 'base', v => {
      this._resolvedSize = v as RadioSize;
      if (this.el.isConnected) { this.syncChildren(); }
    });
    this._resolvedSize = this._sizeWatcher.current as RadioSize;
  }

  @Watch('name')
  onNameChange() {
    this.syncChildren();
  }

  private syncChildren() {
    const radios = this.getRadios();
    radios.forEach(radio => {
      radio.size = this._resolvedSize;
      radio.name = this.name;
      (radio as any).appearance = this.appearance;
      // Also set host class directly — Stencil's async re-render may not fire in time
      (radio as HTMLElement).classList.toggle('radio-appearance-cards', this.appearance === 'cards');
      (radio as HTMLElement).classList.toggle('radio-appearance-pills', this.appearance === 'pills');
      // Cascade variant only if the child never set its own (same sentinel
      // bug as #31). `variant` no longer has a default value — a child that
      // never touched it reads back as genuinely `undefined`, distinguishable
      // from one that explicitly chose `variant="primary"`.
      if (radio.variant === undefined) {
        radio.variant = this.variant;
      }
      // Group always wins — matches size/appearance's unconditional cascade (see issue #34).
      radio.isDisabled = this.isDisabled;
    });
  }

  private getRadios(): HTMLAegovRadioElement[] {
    return Array.from(this.el.querySelectorAll('aegov-radio'));
  }

  @Listen('focusout')
  handleGroupBlur(event: FocusEvent) {
    if (!this.el.contains(event.relatedTarget as Node)) {
      this.hasInteractedOnce = true;
      this.runAndEmitValidation('blur');
    }
  }

  @Listen('aegovRadioChange')
  handleRadioChange(event: CustomEvent<{ checked: boolean; value?: string }>) {
    const target = event.target as HTMLAegovRadioElement;

    if (event.detail.checked) {
      // Uncheck all other radios (sync Stencil state; native radio handles DOM)
      const radios = this.getRadios();
      radios.forEach(radio => {
        if (radio !== target) {
          radio.isChecked = false;
        }
      });
    }

    this.aegovRadioGroupChange.emit({ value: event.detail.checked ? event.detail.value : undefined });
    this.hasInteractedOnce = true;
    const { validity, message, value } = this.computeValidity();
    this.aegovValidate.emit(buildValidationDetail<string | undefined>(
      this.el as unknown as HTMLElement & { name?: string },
      value, validity, message, this.errorMessage || null, 'change',
    ));
  }

  private getGroupClasses(): string {
    const classes = ['aegov-radio-group'];
    const appearance: RadioGroupVariant = (RADIO_GROUP_VARIANTS as readonly string[]).includes(this.appearance) ? this.appearance : 'default';
    const orientation: RadioGroupOrientation = (RADIO_GROUP_ORIENTATIONS as readonly string[]).includes(this.orientation) ? this.orientation : 'vertical';
    if (appearance !== 'default') {
      classes.push(`radio-group--${appearance}`);
    }
    if (orientation === 'horizontal') {
      classes.push('radio-group--horizontal');
    }
    if (this.extraClass) {
      classes.push(this.extraClass);
    }
    return classes.join(' ');
  }

  render() {
    const hasErrorSlot = !!this.el.querySelector('[slot="error"]');
    const hasHintSlot = !!this.el.querySelector('[slot="hint"]');
    const showError = this.isInvalid && (hasErrorSlot || !!this.errorMessage);
    const showHint = !showError && (hasHintSlot || !!this.hint);
    const announceError = showError && this.hasInteractedOnce;

    const passThroughAttrs = getPassThroughAttributes(this.el);
    delete passThroughAttrs['aria-invalid'];
    delete passThroughAttrs['aria-describedby'];
    delete passThroughAttrs['aria-required'];

    const authorDescribedBy = this.el.getAttribute('aria-describedby');
    const describedBy = composeDescribedBy(
      authorDescribedBy,
      showError ? this.errorId : null,
      showHint ? this.hintId : null,
    );

    return (
      <Host class={{ 'is-invalid': this.isInvalid }}>
        <fieldset
          class={this.getGroupClasses()}
          role="radiogroup"
          disabled={this.isDisabled}
          aria-required={this.isRequired ? 'true' : undefined}
          aria-invalid={this.isInvalid ? 'true' : null}
          aria-describedby={describedBy}
          {...passThroughAttrs}
        >
          {this.label && <legend class="radio-group__legend">{this.label}</legend>}
          <div class="radio-group__items">
            <slot />
          </div>
          {showHint && (
            <div id={this.hintId} class="aegov-radio-group__hint">
              {hasHintSlot ? <slot name="hint" /> : this.hint}
            </div>
          )}
          {showError && (
            <div
              id={this.errorId}
              class="aegov-radio-group__error"
              role={announceError ? 'alert' : null}
            >
              {hasErrorSlot ? <slot name="error" /> : this.errorMessage}
            </div>
          )}
        </fieldset>
      </Host>
    );
  }
}
