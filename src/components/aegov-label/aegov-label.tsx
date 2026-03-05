import { Component, Host, h, Prop, Element } from '@stencil/core';

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
  @Prop() class?: string;

  private getPassThroughAttributes(): { [key: string]: string } {
    const passThroughAttrs: { [key: string]: string } = {};
    Array.from(this.el.attributes).forEach(attr => {
      if (attr.name.startsWith('aria-') || attr.name.startsWith('data-') || attr.name === 'id') {
        passThroughAttrs[attr.name] = attr.value;
      }
    });
    return passThroughAttrs;
  }

  private getLabelClasses(): string {
    const classes: string[] = ['aegov-label'];
    if (this.class) {
      classes.push(this.class);
    }
    return classes.join(' ');
  }

  render() {
    const passThroughAttributes = this.getPassThroughAttributes();

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
