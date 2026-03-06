import { Component, Host, h, Prop } from '@stencil/core';

@Component({
  tag: 'aegov-select-option-group',
  styleUrl: 'aegov-select-option-group.css',
  scoped: false,
  shadow: false,
})
export class AegovSelectOptionGroup {
  /** The label for this option group. */
  @Prop() label: string = '';

  render() {
    return (
      <Host role="group" aria-label={this.label} data-group-label={this.label}>
        <slot />
      </Host>
    );
  }
}
