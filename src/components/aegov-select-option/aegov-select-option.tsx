import { Component, Host, h, Prop, Element, State } from '@stencil/core';

@Component({
  tag: 'aegov-select-option',
  styleUrl: 'aegov-select-option.css',
  scoped: false,
  shadow: false,
})
export class AegovSelectOption {
  @Element() el: HTMLElement;

  /** The value of this option. */
  @Prop() value: string = '';

  /** Whether this option is disabled. */
  @Prop() isDisabled: boolean = false;

  /** Internal: label text captured from slot content. */
  @State() slotContent: string = '';

  componentWillLoad() {
    this.slotContent = this.el.textContent?.trim() || '';
  }

  render() {
    return (
      <Host
        role="option"
        data-value={this.value}
        data-label={this.slotContent}
        aria-disabled={this.isDisabled ? 'true' : null}
      >
        <slot />
      </Host>
    );
  }
}
