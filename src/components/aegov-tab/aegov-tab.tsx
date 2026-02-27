import { Component, Prop, State, Event, EventEmitter, Element, h } from '@stencil/core';
import type { TabVariant, TabSize } from '../../utils/types';

/**
 * @component aegov-tab
 * @description A single tab trigger. Must be placed inside an aegov-tabs component
 * with slot="tabs". Pairs with a corresponding aegov-tab-panel via matching tab-id.
 *
 * @slot default    - Tab label text
 * @slot icon       - Optional icon shown before the label
 * @slot icon-end   - Optional icon shown after the label
 *
 * @example
 * <aegov-tab slot="tabs" tab-id="profile">
 *   <svg slot="icon" ...></svg>
 *   Profile
 * </aegov-tab>
 */
@Component({
  tag: 'aegov-tab',
  styleUrl: 'aegov-tab.css',
  scoped: false,
  shadow: false,
})
export class AegovTab {
  @Element() el: HTMLElement;

  /**
   * Unique identifier that must match the corresponding aegov-tab-panel's tab-id.
   */
  @Prop() tabId!: string;

  /**
   * Disables this tab and its associated panel.
   */
  @Prop() disabled: boolean = false;

  /**
   * The currently active tab id. Set automatically by the parent aegov-tabs.
   */
  @Prop() activeTabId: string = '';

  /**
   * Visual variant of the tabs. Set automatically by the parent aegov-tabs.
   */
  @Prop() variant: TabVariant = 'simple';

  /**
   * Size of the tab. Set automatically by the parent aegov-tabs.
   */
  @Prop() size: TabSize = 'base';

  @State() hasIconSlot: boolean = false;
  @State() hasIconEndSlot: boolean = false;

  /**
   * Emitted when this tab is clicked. Bubbles up to the parent aegov-tabs.
   * @event aegovTabSelect
   */
  @Event({ bubbles: true, composed: true })
  aegovTabSelect: EventEmitter<string>;

  componentWillLoad() {
    this.hasIconSlot = !!this.el.querySelector('[slot="icon"]');
    this.hasIconEndSlot = !!this.el.querySelector('[slot="icon-end"]');
  }

  private handleClick() {
    if (this.disabled) return;
    this.aegovTabSelect.emit(this.tabId);
  }

  render() {
    const isActive = this.tabId === this.activeTabId;

    return (
      <button
        role="tab"
        id={`tab-${this.tabId}`}
        aria-selected={String(isActive)}
        aria-controls={`panel-${this.tabId}`}
        aria-disabled={this.disabled ? 'true' : undefined}
        disabled={this.disabled}
        tabIndex={isActive ? 0 : -1}
        class={{
          'tab__btn': true,
          [`tab__btn--${this.variant}`]: true,
          [`tab__btn--${this.size}`]: true,
          'tab__btn--active': isActive,
          'tab__btn--disabled': this.disabled,
        }}
        onClick={() => this.handleClick()}
      >
        {this.hasIconSlot && <slot name="icon" />}
        <span class="tab__label">
          <slot />
        </span>
        {this.hasIconEndSlot && <slot name="icon-end" />}
      </button>
    );
  }
}
