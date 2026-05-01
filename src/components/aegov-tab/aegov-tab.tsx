import { Component, Prop, Watch, State, Event, EventEmitter, Element, h } from '@stencil/core';
import { TAB_VARIANTS, TAB_SIZES, TAB_ORIENTATIONS } from '../../utils/types';
import type { TabVariant, TabSize, TabOrientation } from '../../utils/types';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { watchResponsiveProp } from '../../utils/responsive-prop';
import type { ResponsivePropWatcher } from '../../utils/responsive-prop';

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
  @Prop() isDisabled: boolean = false;

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
  @Prop() size: string = 'base';

  @State() private _resolvedSize: TabSize = 'base';
  private _sizeWatcher: ResponsivePropWatcher | null = null;

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
    const parentTabs = this.el.closest('aegov-tabs');
    if (!parentTabs) {
      throw new Error(
        '[aegov-tab] This component must be used inside <aegov-tabs>. ' +
        'It cannot be used as a standalone component. ' +
        'Please wrap it with <aegov-tabs>...</aegov-tabs>'
      );
    }

    warnIfInvalidEnumProp(this.variant, TAB_VARIANTS, 'simple', ctx('variant'));
    warnIfInvalidEnumProp(this.orientation, TAB_ORIENTATIONS, 'horizontal', ctx('orientation'));
    this.hasIconSlot = !!this.el.querySelector('[slot="icon"]');
    this.hasIconEndSlot = !!this.el.querySelector('[slot="icon-end"]');
    this._sizeWatcher = watchResponsiveProp(this.size, TAB_SIZES, 'base', v => {
      this._resolvedSize = v as TabSize;
    });
    this._resolvedSize = this._sizeWatcher.current as TabSize;
  }

  disconnectedCallback() {
    this._sizeWatcher?.destroy();
  }

  @Watch('variant')
  onVariantChange(v: unknown) { warnIfInvalidEnumProp(v, TAB_VARIANTS, 'simple', ctx('variant')); }

  @Watch('size')
  onSizeChange() {
    this._sizeWatcher?.destroy();
    this._sizeWatcher = watchResponsiveProp(this.size, TAB_SIZES, 'base', v => {
      this._resolvedSize = v as TabSize;
    });
    this._resolvedSize = this._sizeWatcher.current as TabSize;
  }

  @Watch('orientation')
  onOrientationChange(v: unknown) { warnIfInvalidEnumProp(v, TAB_ORIENTATIONS, 'horizontal', ctx('orientation')); }

  private handleClick() {
    if (this.isDisabled) return;
    this.aegovTabSelect.emit(this.tabId);
  }

  render() {
    const isActive = this.tabId === this.activeTabId;
    const variant: TabVariant = (TAB_VARIANTS as readonly string[]).includes(this.variant) ? this.variant : 'simple';
    const orientation: TabOrientation = (TAB_ORIENTATIONS as readonly string[]).includes(this.orientation) ? this.orientation : 'horizontal';

    return (
      <button
        role="tab"
        id={`tab-${this.tabId}`}
        aria-selected={String(isActive)}
        aria-controls={`panel-${this.tabId}`}
        aria-disabled={this.isDisabled ? 'true' : undefined}
        disabled={this.isDisabled}
        tabIndex={isActive ? 0 : -1}
        class={{
          'aegov-tab': true,
          [`tab__btn--${variant}`]: true,
          [`tab__btn--${this._resolvedSize}`]: true,
          'tab__btn--vertical': orientation === 'vertical',
          'tab__btn--active': isActive,
          'tab__btn--disabled': this.isDisabled,
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
