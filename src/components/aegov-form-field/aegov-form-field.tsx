import { Component, Host, h, Prop, Element } from '@stencil/core';
import { getPassThroughAttributes } from '../../utils/attributes';

@Component({
  tag: 'aegov-form-field',
  styleUrl: 'aegov-form-field.css',
  scoped: false,
  shadow: false,
})
export class AegovFormField {
  @Element() el: HTMLElement;

  /** Additional CSS classes to apply. */
  @Prop() class?: string;

  componentDidLoad() {
    this.linkChildren();
  }

  componentDidUpdate() {
    this.linkChildren();
  }

  private linkChildren() {
    const input = this.el.querySelector('aegov-input') as HTMLAegovInputElement | null;
    const textarea = this.el.querySelector('aegov-textarea') as HTMLAegovTextareaElement | null;
    const label = this.el.querySelector('aegov-label') as HTMLAegovLabelElement | null;
    const select = this.el.querySelector('aegov-select') as HTMLAegovSelectElement | null;
    const checkbox = this.el.querySelector('aegov-checkbox') as HTMLAegovCheckboxElement | null;

    if (label) {
      if (input && input.fieldId) {
        label.htmlFor = input.fieldId;
      } else if (textarea && textarea.fieldId) {
        label.htmlFor = textarea.fieldId;
      } else if (select && select.fieldId) {
        label.htmlFor = select.fieldId;
      } else if (checkbox && checkbox.fieldId) {
        label.htmlFor = checkbox.fieldId;
      }
    }
  }

  private static readonly PASS_THROUGH_ATTRS = new Set(['id']);

  private getFieldClasses(): string {
    const classes: string[] = ['aegov-form-field'];
    if (this.class) {
      classes.push(this.class);
    }
    return classes.join(' ');
  }

  render() {
    const passThroughAttributes = getPassThroughAttributes(this.el, AegovFormField.PASS_THROUGH_ATTRS);

    return (
      <Host>
        <div class={this.getFieldClasses()} {...passThroughAttributes}>
          <slot />
        </div>
      </Host>
    );
  }
}
