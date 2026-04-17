import { Component, Prop, Watch, State, Event, EventEmitter, Element, h } from '@stencil/core';
import { TAB_VARIANTS, TAB_SIZES, TAB_ORIENTATIONS } from '../../utils/types';
import type { TabVariant, TabSize, TabOrientation } from '../../utils/types';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';

const TAG = 'aegov-tab';
const ctx = (prop: string) => ({ component: TAG, prop });

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

  /**
   * Orientation of the tabs. Set automatically by the parent aegov-tabs.
   */
  @Prop() orientation: TabOrientation = 'horizontal';

  @State() hasIconSlot: boolean = false;
  @State() hasIconEndSlot: boolean = false;

  /**
   * Emitted when this tab is clicked. Bubbles up to the parent aegov-tabs.
   * @event aegovTabSelect
   */
  @Event({ bubbles: true, composed: true })
  aegovTabSelect: EventEmitter<string>;

  componentWillLoad() {
    warnIfInvalidEnumProp(this.variant, TAB_VARIANTS, 'simple', ctx('variant'));
    warnIfInvalidEnumProp(this.size, TAB_SIZES, 'base', ctx('size'));
    warnIfInvalidEnumProp(this.orientation, TAB_ORIENTATIONS, 'horizontal', ctx('orientation'));
    this.hasIconSlot = !!this.el.querySelector('[slot="icon"]');
    this.hasIconEndSlot = !!this.el.querySelector('[slot="icon-end"]');
  }

  @Watch('variant')
  onVariantChange(v: unknown) { warnIfInvalidEnumProp(v, TAB_VARIANTS, 'simple', ctx('variant')); }

  @Watch('size')
  onSizeChange(v: unknown) { warnIfInvalidEnumProp(v, TAB_SIZES, 'base', ctx('size')); }

  @Watch('orientation')
  onOrientationChange(v: unknown) { warnIfInvalidEnumProp(v, TAB_ORIENTATIONS, 'horizontal', ctx('orientation')); }

  private handleClick() {
    if (this.disabled) return;
    this.aegovTabSelect.emit(this.tabId);
  }

  render() {
    const isActive = this.tabId === this.activeTabId;
    const variant: TabVariant = (TAB_VARIANTS as readonly string[]).includes(this.variant) ? this.variant : 'simple';
    const size: TabSize = (TAB_SIZES as readonly string[]).includes(this.size) ? this.size : 'base';
    const orientation: TabOrientation = (TAB_ORIENTATIONS as readonly string[]).includes(this.orientation) ? this.orientation : 'horizontal';

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
          'aegov-tab': true,
          [`tab__btn--${variant}`]: true,
          [`tab__btn--${size}`]: true,
          'tab__btn--vertical': orientation === 'vertical',
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
