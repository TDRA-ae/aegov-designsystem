import { Component, Host, h, Prop, Element } from '@stencil/core';
import { getPassThroughAttributes } from '../../utils/attributes';
import { generateId } from '../../utils/id-generator';

@Component({
  tag: 'aegov-label',
  styleUrl: 'aegov-label.css',
  scoped: false,
  shadow: false,
})
export class AegovLabel {
  @Element() el: HTMLElement;

  /** Unique ID for the label element. Auto-generated if not provided. */
  @Prop({ mutable: true, reflect: true }) fieldId?: string;

  /** The ID of the form element this label is for. Automatically set by parent aegov-form-field. */
  @Prop({ mutable: true, attribute: 'for' }) htmlFor?: string;

  /** Additional CSS classes to apply. */
  @Prop() extraClass?: string;

  componentWillLoad() {
    if (!this.fieldId) {
      this.fieldId = generateId('aegov-label');
    }
  }

  private getLabelClasses(): string {
    const classes: string[] = ['aegov-label'];
    if (this.extraClass) {
      classes.push(this.extraClass);
    }
    return classes.join(' ');
  }

  render() {
    const passThroughAttributes = getPassThroughAttributes(this.el);

    return (
      <Host>
        <label
          id={this.fieldId}
          {...{ for: this.htmlFor }}
          class={this.getLabelClasses()}
          {...passThroughAttributes}
        >
          <slot />
        </label>
      </Host>
    );
  }
}
