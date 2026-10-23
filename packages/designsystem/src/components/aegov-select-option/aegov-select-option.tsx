import { Component, Host, h, Prop, Element, State, Watch } from '@stencil/core';

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
    const parentSelect = this.el.closest('aegov-select');
    if (!parentSelect) {
      throw new Error(
        '[aegov-select-option] This component must be used inside <aegov-select> ' +
        '(optionally nested in <aegov-select-option-group>). ' +
        'It cannot be used as a standalone component. ' +
        'Please wrap it with <aegov-select>...</aegov-select>'
      );
    }
    this.slotContent = this.el.textContent?.trim() || '';
  }

  /**
   * Tell the parent aegov-select to re-read options when data changes after
   * load (e.g. `value` set as a JS property only). Plain DOM event rather than
   * an @Event, so it stays out of the public API.
   */
  @Watch('value')
  @Watch('isDisabled')
  notifyParent() {
    this.el.dispatchEvent(new CustomEvent('aegovInternalSelectOptionUpdate', { bubbles: true }));
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
