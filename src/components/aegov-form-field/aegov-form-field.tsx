import { Component, Host, h, Prop, Element, Watch } from '@stencil/core';
import { getPassThroughAttributes } from '../../utils/attributes';
import { generateId } from '../../utils/id-generator';

/**
 * Type alias for any aegov form control that exposes the Layer 1 validation surface.
 * Used by `cascadeErrorToChild` to propagate isInvalid/errorMessage/hint to the first
 * form control descendant when set on the wrapper.
 */
type AegovFormControl = HTMLElement & {
  fieldId?: string;
  isInvalid?: boolean;
  errorMessage?: string;
  hint?: string;
};

@Component({
  tag: 'aegov-form-field',
  styleUrl: 'aegov-form-field.css',
  scoped: false,
  shadow: false,
})
export class AegovFormField {
  @Element() el: HTMLElement;

  /** Unique ID for the form-field wrapper. Auto-generated if not provided. */
  @Prop({ mutable: true, reflect: true }) fieldId?: string;

  /**
   * Wrapper-level invalid state. Cascades to the first form-control descendant if the
   * child has not set its own value. See validation-engine-addon.md §2.7.
   */
  @Prop({ mutable: true }) isInvalid: boolean = false;

  /** Wrapper-level error message — cascaded to first form-control descendant. */
  @Prop({ mutable: true }) errorMessage: string = '';

  /** Wrapper-level hint — cascaded to first form-control descendant. */
  @Prop() hint: string = '';

  /** Additional CSS classes to apply. */
  @Prop() extraClass?: string;

  componentWillLoad() {
    if (!this.fieldId) {
      this.fieldId = generateId('aegov-form-field');
    }
  }

  componentDidLoad() {
    this.linkChildren();
    this.cascadeToChild();
  }

  componentDidUpdate() {
    this.linkChildren();
    this.cascadeToChild();
  }

  @Watch('isInvalid')
  @Watch('errorMessage')
  @Watch('hint')
  onValidationCascadeChange() {
    this.cascadeToChild();
  }

  private linkChildren() {
    const input = this.el.querySelector('aegov-input') as HTMLAegovInputElement | null;
    const textarea = this.el.querySelector('aegov-textarea') as HTMLAegovTextareaElement | null;
    const label = this.el.querySelector('aegov-label') as HTMLAegovLabelElement | null;
    const select = this.el.querySelector('aegov-select') as HTMLAegovSelectElement | null;
    const checkbox = this.el.querySelector('aegov-checkbox') as HTMLAegovCheckboxElement | null;
    const range = this.el.querySelector('aegov-range') as HTMLAegovRangeElement | null;
    const progress = this.el.querySelector('aegov-progress') as HTMLAegovProgressElement | null;
    const otp = this.el.querySelector('aegov-otp') as HTMLAegovOtpElement | null;

    if (label) {
      if (input && input.fieldId) {
        label.htmlFor = input.fieldId;
      } else if (textarea && textarea.fieldId) {
        label.htmlFor = textarea.fieldId;
      } else if (select && select.fieldId) {
        label.htmlFor = select.fieldId;
      } else if (checkbox && checkbox.fieldId) {
        label.htmlFor = checkbox.fieldId;
      } else if (range && range.fieldId) {
        label.htmlFor = range.fieldId;
      } else if (progress && progress.fieldId) {
        label.htmlFor = progress.fieldId;
      } else if (otp && otp.fieldId) {
        label.htmlFor = otp.fieldId;
      }
    }
  }

  /**
   * Find the first aegov form-control descendant.
   * See validation-engine-addon.md §2.7.
   */
  private findControl(): AegovFormControl | null {
    return this.el.querySelector(
      'aegov-input, aegov-textarea, aegov-select, aegov-checkbox, aegov-checkbox-group, ' +
      'aegov-radio-group, aegov-toggle, aegov-range, aegov-otp, aegov-fileupload, aegov-datepicker'
    ) as AegovFormControl | null;
  }

  /**
   * Cascade wrapper-level isInvalid/errorMessage/hint to first form-control descendant.
   * Only fills in values that the child has not already authored to its own props.
   */
  private cascadeToChild() {
    const ctrl = this.findControl();
    if (!ctrl) return;

    // errorMessage cascades only if child has no own value
    if (this.errorMessage && (!ctrl.errorMessage || ctrl.errorMessage === '')) {
      ctrl.errorMessage = this.errorMessage;
    }
    // hint cascades only if child has no own value
    if (this.hint && (!ctrl.hint || ctrl.hint === '')) {
      ctrl.hint = this.hint;
    }
    // isInvalid: wrapper override wins when truthy (since errorMessage demands display)
    if (this.isInvalid) {
      ctrl.isInvalid = true;
    }
  }

  private getFieldClasses(): string {
    const classes: string[] = ['aegov-form-field'];
    if (this.isInvalid) {
      classes.push('is-invalid');
    }
    if (this.extraClass) {
      classes.push(this.extraClass);
    }
    return classes.join(' ');
  }

  render() {
    const passThroughAttributes = getPassThroughAttributes(this.el);

    return (
      <Host>
        <div id={this.fieldId} class={this.getFieldClasses()} {...passThroughAttributes}>
          <slot />
        </div>
      </Host>
    );
  }
}
