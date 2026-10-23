import { Component, Host, h, Prop, State, Event, EventEmitter, Element, Listen, Watch, Method } from '@stencil/core';
import { CHECKBOX_GROUP_VARIANTS, CHECKBOX_GROUP_ORIENTATIONS, CHECKBOX_SIZES, FORM_VARIANTS } from '../../utils/types';
import type {
  CheckboxGroupVariant, CheckboxGroupOrientation, CheckboxSize, FormVariant,
  AegovValidationDetail, AegovValidationResult, AegovValidationTrigger,
} from '../../utils/types';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { getPassThroughAttributes } from '../../utils/attributes';
import { adoptExtraClassStylesIntoShadowRoot } from '../../utils/shadow-styles';
import { watchResponsiveProp } from '../../utils/responsive-prop';
import type { ResponsivePropWatcher } from '../../utils/responsive-prop';
import {
  composeDescribedBy, buildValidationDetail, synthesizeValidity,
  withCustomError,
} from '../../utils/validation';
import { generateId } from '../../utils/id-generator';

const TAG = 'aegov-checkbox-group';
const ctx = (prop: string) => ({ component: TAG, prop });

@Component({
  tag: 'aegov-checkbox-group',
  styleUrl: 'aegov-checkbox-group.css',
  shadow: { delegatesFocus: true },
})
export class AegovCheckboxGroup {
  @Element() el: HTMLElement;

  /** Visual appearance for the group layout. */
  @Prop() appearance: CheckboxGroupVariant = 'default';

  /** Stack direction for checkbox items. */
  @Prop() orientation: CheckboxGroupOrientation = 'vertical';

  /** Optional label rendered as a <legend> for accessibility. */
  @Prop() label?: string;

  /** Size of all checkboxes in the group. Propagated to children. */
  @Prop() size: string = 'base';
  @State() private _resolvedSize: CheckboxSize = 'base';
  private _sizeWatcher: ResponsivePropWatcher | null = null;

  /** Colour family. Cascades to child checkboxes (only if child has no own variant). Focus ring stays camel; error stays aered regardless. */
  @Prop() variant?: FormVariant;

  /** Disables all checkboxes within the group via native fieldset disabled. */
  @Prop({ mutable: true, reflect: true }) isDisabled: boolean = false;

  /** Group is required — at least one child checkbox must be checked. Aggregate-level only. */
  @Prop() isRequired: boolean = false;

  /** Visual + a11y invalid state. See §2.3. */
  @Prop({ mutable: true, reflect: true }) isInvalid: boolean = false;

  /** Inline error message rendered below the legend when `isInvalid`. */
  @Prop({ mutable: true }) errorMessage: string = '';

  /** Helper hint shown below the legend when not invalid. */
  @Prop() hint: string = '';

  /** Additional CSS classes to apply. */
  @Prop() extraClass?: string;

  /** Emitted when any checkbox in the group changes. Contains all currently checked values. */
  @Event() aegovCheckboxGroupChange: EventEmitter<{ values: string[] }>;

  /** Unified validation event (group-level aggregate). See §2.3. */
  @Event() aegovValidate: EventEmitter<AegovValidationDetail<string[]>>;

  @State() private hasInteractedOnce: boolean = false;
  private fieldId: string = '';
  private errorId: string = '';
  private hintId: string = '';

  componentWillLoad() {
    warnIfInvalidEnumProp(this.appearance, CHECKBOX_GROUP_VARIANTS, 'default', ctx('appearance'));
    warnIfInvalidEnumProp(this.orientation, CHECKBOX_GROUP_ORIENTATIONS, 'vertical', ctx('orientation'));
    warnIfInvalidEnumProp(this.variant, FORM_VARIANTS, 'primary', ctx('variant'));
    this._sizeWatcher = watchResponsiveProp(this.size, CHECKBOX_SIZES, 'base', v => {
      this._resolvedSize = v as CheckboxSize;
      if (this.el.isConnected) { this.syncChildren(); }
    });
    this._resolvedSize = this._sizeWatcher.current as CheckboxSize;
    this.fieldId = generateId('aegov-checkbox-group');
    this.errorId = `${this.fieldId}-error`;
    this.hintId = `${this.fieldId}-hint`;
  }

  /** Imperatively re-run validation. */
  @Method()
  async validate(trigger: AegovValidationTrigger = 'manual'): Promise<AegovValidationResult> {
    if (trigger === 'submit') this.hasInteractedOnce = true;
    return this.runAndEmitValidation(trigger);
  }

  /** Set a custom error message; clears with empty string. */
  @Method()
  async setCustomValidity(message: string): Promise<void> {
    this.errorMessage = message;
    this.isInvalid = !!message;
    this.customValidityMessage = message;
  }

  /** Message from setCustomValidity(), kept so recomputing validity does not drop it. */
  private customValidityMessage = '';

  private collectValues(): string[] {
    const checkboxes = this.getRegularCheckboxes();
    return checkboxes
      .filter(cb => cb.isChecked)
      .map(cb => cb.value)
      .filter((v): v is string => v != null);
  }

  private computeValidity() {
    return withCustomError(this.computeConstraintValidity(), this.customValidityMessage);
  }

  private computeConstraintValidity() {
    const values = this.collectValues();
    if (this.isRequired && values.length === 0) {
      return { validity: synthesizeValidity({ valueMissing: true }), message: this.errorMessage || 'Required', values };
    }
    return { validity: synthesizeValidity({}), message: '', values };
  }

  private async runAndEmitValidation(trigger: AegovValidationTrigger): Promise<AegovValidationResult> {
    const { validity, message, values } = this.computeValidity();
    this.aegovValidate.emit(buildValidationDetail<string[]>(
      this.el as unknown as HTMLElement & { name?: string },
      values, validity, message, this.errorMessage || null, trigger,
    ));
    return { valid: validity.valid, message, validity };
  }

  componentDidLoad() {
    this.syncChildren();
    this.updateCheckAllState();
    adoptExtraClassStylesIntoShadowRoot(this.el.shadowRoot, this.extraClass);
  }

  @Watch('extraClass')
  onExtraClassChange() {
    adoptExtraClassStylesIntoShadowRoot(this.el.shadowRoot, this.extraClass);
  }

  @Watch('appearance')
  onVariantChange(v: unknown) {
    warnIfInvalidEnumProp(v, CHECKBOX_GROUP_VARIANTS, 'default', ctx('appearance'));
    if (this.el.isConnected) { this.syncChildren(); }
  }

  @Watch('orientation')
  onOrientationChange(v: unknown) { warnIfInvalidEnumProp(v, CHECKBOX_GROUP_ORIENTATIONS, 'vertical', ctx('orientation')); }

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
    this._sizeWatcher = watchResponsiveProp(this.size, CHECKBOX_SIZES, 'base', v => {
      this._resolvedSize = v as CheckboxSize;
      if (this.el.isConnected) { this.syncChildren(); }
    });
    this._resolvedSize = this._sizeWatcher.current as CheckboxSize;
  }

  private syncChildren() {
    const checkboxes = Array.from(this.el.querySelectorAll('aegov-checkbox')) as HTMLAegovCheckboxElement[];
    checkboxes.forEach(cb => {
      cb.size = this._resolvedSize;
      cb.appearance = this.appearance;
      // Also set host class directly — Stencil's async re-render may not fire in time
      (cb as HTMLElement).classList.toggle('checkbox-appearance-cards', this.appearance === 'cards');
      (cb as HTMLElement).classList.toggle('checkbox-appearance-pills', this.appearance === 'pills');
      // Cascade variant only if the child never set its own (#31). `variant`
      // no longer has a default value — a child that never touched it reads
      // back as genuinely `undefined`, distinguishable from one that
      // explicitly chose `variant="primary"` (same value as the old,
      // sentinel-based default, previously indistinguishable from "unset").
      if (cb.variant === undefined) {
        cb.variant = this.variant;
      }
      // Group always wins — matches size/appearance's unconditional cascade (see issue #34).
      cb.isDisabled = this.isDisabled;
      // Flag grouped membership as a plain host attribute (#68), same pattern
      // already used by aegov-input-group/aegov-input (#50): when the group's
      // "default" appearance is disabled, its own wrapper AND each now-also-
      // disabled child's own wrapper both apply their own opacity-0.4,
      // compounding to a near-invisible 0.16. `is-grouped` lets aegov-checkbox's
      // CSS tell "my own opacity is the only dimming source" (pills/cards,
      // where the group wrapper deliberately isn't dimmed) apart from "the
      // group wrapper is already dimming me too" (default appearance), without
      // reaching back across the shadow boundary to check.
      (cb as HTMLElement).setAttribute('is-grouped', '');
    });
  }

  private getRegularCheckboxes(): HTMLAegovCheckboxElement[] {
    return Array.from(this.el.querySelectorAll('aegov-checkbox')).filter(cb => !cb.isCheckAll);
  }

  private getCheckAllCheckbox(): HTMLAegovCheckboxElement | null {
    return this.el.querySelector('aegov-checkbox[is-check-all]') as HTMLAegovCheckboxElement | null;
  }

  @Listen('focusout')
  handleGroupBlur(event: FocusEvent) {
    if (!this.el.contains(event.relatedTarget as Node)) {
      this.hasInteractedOnce = true;
      this.runAndEmitValidation('blur');
    }
  }

  @Listen('aegovCheckboxChange')
  handleCheckboxChange(event: CustomEvent<{ checked: boolean; value?: string }>) {
    const target = event.target as HTMLAegovCheckboxElement;

    if (target.isCheckAll) {
      this.handleCheckAllToggle(event.detail.checked);
    } else {
      this.updateCheckAllState();
    }

    this.emitGroupChange();
  }

  private handleCheckAllToggle(checked: boolean) {
    const checkboxes = this.getRegularCheckboxes();
    checkboxes.forEach(cb => {
      if (!cb.isDisabled) {
        cb.isChecked = checked;
      }
    });
  }

  private updateCheckAllState() {
    const checkAll = this.getCheckAllCheckbox();
    if (!checkAll) return;

    const checkboxes = this.getRegularCheckboxes();
    const enabledCheckboxes = checkboxes.filter(cb => !cb.isDisabled);
    const checkedCount = enabledCheckboxes.filter(cb => cb.isChecked).length;
    const total = enabledCheckboxes.length;

    if (total === 0) return;

    if (checkedCount === 0) {
      checkAll.isChecked = false;
      checkAll.isIndeterminate = false;
    } else if (checkedCount === total) {
      checkAll.isChecked = true;
      checkAll.isIndeterminate = false;
    } else {
      checkAll.isChecked = false;
      checkAll.isIndeterminate = true;
    }
  }

  private emitGroupChange() {
    this.hasInteractedOnce = true;
    const values = this.collectValues();
    this.aegovCheckboxGroupChange.emit({ values });
    // Aggregate validation event
    const { validity, message } = this.computeValidity();
    this.aegovValidate.emit(buildValidationDetail<string[]>(
      this.el as unknown as HTMLElement & { name?: string },
      values, validity, message, this.errorMessage || null, 'change',
    ));
  }

  private getGroupClasses(): string {
    const classes = ['aegov-checkbox-group'];
    const appearance: CheckboxGroupVariant = (CHECKBOX_GROUP_VARIANTS as readonly string[]).includes(this.appearance) ? this.appearance : 'default';
    const orientation: CheckboxGroupOrientation = (CHECKBOX_GROUP_ORIENTATIONS as readonly string[]).includes(this.orientation) ? this.orientation : 'vertical';
    if (appearance !== 'default') {
      classes.push(`checkbox-group--${appearance}`);
    }
    if (orientation === 'horizontal') {
      classes.push('checkbox-group--horizontal');
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
    const describedBy = composeDescribedBy(
      showError ? this.errorId : null,
      showHint ? this.hintId : null,
    );
    const passThroughAttrs = getPassThroughAttributes(this.el);
    delete passThroughAttrs['aria-invalid'];
    delete passThroughAttrs['aria-describedby'];
    delete passThroughAttrs['aria-required'];

    return (
      <Host class={{ 'is-invalid': this.isInvalid }} data-appearance={this.appearance}>
        <fieldset
          class={this.getGroupClasses()}
          disabled={this.isDisabled}
          aria-invalid={this.isInvalid ? 'true' : null}
          aria-describedby={describedBy}
          {...passThroughAttrs}
        >
          {this.label && (
            <legend class="checkbox-group__legend">
              {this.label}
              {this.isRequired && <span class="sr-only"> (required)</span>}
            </legend>
          )}
          <div class="checkbox-group__items">
            <slot />
          </div>
          {showHint && (
            <div id={this.hintId} class="aegov-checkbox-group__hint">
              {hasHintSlot ? <slot name="hint" /> : this.hint}
            </div>
          )}
          {showError && (
            <div
              id={this.errorId}
              class="aegov-checkbox-group__error"
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
