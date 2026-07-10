import { Component, Host, h, Prop, State, Event, EventEmitter, Element, Listen, Watch, Method } from '@stencil/core';
import { CHECKBOX_GROUP_VARIANTS, CHECKBOX_GROUP_ORIENTATIONS, CHECKBOX_SIZES, FORM_VARIANTS } from '../../utils/types';
import type {
  CheckboxGroupVariant, CheckboxGroupOrientation, CheckboxSize, FormVariant,
  AegovValidationDetail, AegovValidationResult, AegovValidationTrigger,
} from '../../utils/types';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { getPassThroughAttributes } from '../../utils/attributes';
import { watchResponsiveProp } from '../../utils/responsive-prop';
import type { ResponsivePropWatcher } from '../../utils/responsive-prop';
import {
  composeDescribedBy, buildValidationDetail, synthesizeValidity,
} from '../../utils/validation';
import { generateId } from '../../utils/id-generator';

const TAG = 'aegov-checkbox-group';
const ctx = (prop: string) => ({ component: TAG, prop });

@Component({
  tag: 'aegov-checkbox-group',
  styleUrl: 'aegov-checkbox-group.css',
  scoped: false,
  shadow: false,
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
  @Prop() variant: FormVariant = 'primary';

  /** Disables all checkboxes within the group via native fieldset disabled. */
  @Prop() isDisabled: boolean = false;

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
    return this.runAndEmitValidation(trigger);
  }

  /** Set a custom error message; clears with empty string. */
  @Method()
  async setCustomValidity(message: string): Promise<void> {
    this.errorMessage = message;
    this.isInvalid = !!message;
  }

  private collectValues(): string[] {
    const checkboxes = this.getRegularCheckboxes();
    return checkboxes
      .filter(cb => cb.isChecked)
      .map(cb => cb.value)
      .filter((v): v is string => v != null);
  }

  private computeValidity() {
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
  }

  @Watch('appearance')
  onVariantChange(v: unknown) { warnIfInvalidEnumProp(v, CHECKBOX_GROUP_VARIANTS, 'default', ctx('appearance')); }

  @Watch('orientation')
  onOrientationChange(v: unknown) { warnIfInvalidEnumProp(v, CHECKBOX_GROUP_ORIENTATIONS, 'vertical', ctx('orientation')); }

  @Watch('variant')
  onColourVariantChange(v: unknown) {
    warnIfInvalidEnumProp(v, FORM_VARIANTS, 'primary', ctx('variant'));
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
      // Cascade variant only if child has no own value (still default 'primary')
      if (!cb.variant || cb.variant === 'primary') {
        cb.variant = this.variant;
      }
    });
  }

  private getRegularCheckboxes(): HTMLAegovCheckboxElement[] {
    return Array.from(this.el.querySelectorAll('aegov-checkbox')).filter(cb => !cb.isCheckAll);
  }

  private getCheckAllCheckbox(): HTMLAegovCheckboxElement | null {
    return this.el.querySelector('aegov-checkbox[is-check-all]') as HTMLAegovCheckboxElement | null;
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
      <Host class={{ 'is-invalid': this.isInvalid }}>
        <fieldset
          class={this.getGroupClasses()}
          disabled={this.isDisabled}
          aria-invalid={this.isInvalid ? 'true' : null}
          aria-required={this.isRequired ? 'true' : undefined}
          aria-describedby={describedBy}
          {...passThroughAttrs}
        >
          {this.label && <legend class="checkbox-group__legend">{this.label}</legend>}
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
              aria-live={announceError ? 'polite' : null}
            >
              {hasErrorSlot ? <slot name="error" /> : this.errorMessage}
            </div>
          )}
          <div class="checkbox-group__items">
            <slot />
          </div>
        </fieldset>
      </Host>
    );
  }
}
