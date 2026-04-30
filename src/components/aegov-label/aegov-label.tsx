import { Component, Host, h, Prop, Element } from '@stencil/core';
import { getPassThroughAttributes } from '../../utils/attributes';

@Component({
  tag: 'aegov-label',
  styleUrl: 'aegov-label.css',
  scoped: false,
  shadow: false,
})
export class AegovLabel {
  @Element() el: HTMLElement;

  /** The ID of the form element this label is for. Automatically set by parent aegov-form-field. */
  @Prop({ mutable: true, attribute: 'for' }) htmlFor?: string;

  /** Additional CSS classes to apply. */
  @Prop() extraClass?: string;

  private static readonly PASS_THROUGH_ATTRS = new Set(['id']);

  private getLabelClasses(): string {
    const classes: string[] = ['aegov-label'];
    if (this.extraClass) {
      classes.push(this.extraClass);
    }
    return classes.join(' ');
  }

  render() {
    const passThroughAttributes = getPassThroughAttributes(this.el, AegovLabel.PASS_THROUGH_ATTRS);

    return (
      <Host>
        <label
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
