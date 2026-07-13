import { Component, Prop, State, Event, EventEmitter, Element, Listen, Watch, h } from '@stencil/core';
import { TAB_VARIANTS, TAB_SIZES, TAB_ORIENTATIONS } from '../../utils/types';
import type { TabVariant, TabSize, TabOrientation } from '../../utils/types';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { watchResponsiveProp } from '../../utils/responsive-prop';
import { isRtl as detectRtl } from '../../utils/rtl';
import type { ResponsivePropWatcher } from '../../utils/responsive-prop';
import { generateId } from '../../utils/id-generator';
import { getPassThroughAttributes } from '../../utils/attributes';

const TAG = 'aegov-tabs';
const ctx = (prop: string) => ({ component: TAG, prop });

const STRINGS = {
  en: { tablist: 'Tabs' },
  ar: { tablist: 'علامات التبويب' },
};

/**
 * @component aegov-tabs
 * @description Tab container that organizes content into panels.
 * Manages active tab state internally (uncontrolled) and wires up tab triggers
 * with their corresponding panels via matching tab-id attributes.
 *
 * @slot tabs   - Place aegov-tab elements here (use slot="tabs" on each)
 * @slot default - Place aegov-tab-panel elements here (no slot attribute needed)
 *
 * @example
 * <aegov-tabs default-open="overview" variant="simple">
 *   <aegov-tab slot="tabs" tab-id="overview">Overview</aegov-tab>
 *   <aegov-tab slot="tabs" tab-id="details">Details</aegov-tab>
 *   <aegov-tab-panel tab-id="overview">Overview content</aegov-tab-panel>
 *   <aegov-tab-panel tab-id="details">Details content</aegov-tab-panel>
 * </aegov-tabs>
 */
@Component({
  tag: 'aegov-tabs',
  styleUrl: 'aegov-tabs.css',
  scoped: false,
  shadow: false,
})
export class AegovTabs {
  @Element() el: HTMLElement;

  /**
   * Unique ID for the tabs container. Auto-generated if not provided.
   */
  @Prop({ mutable: true, reflect: true }) fieldId?: string;

  /**
   * Visual style variant of the tabs.
   * - `simple`: Underline style (default)
   * - `segmented`: Button-group style, ideal for toggling views
   * - `pill`: Pill-shaped individual tabs
   */
  @Prop() variant: TabVariant = 'simple';

  /**
   * The tab-id of the tab that should be active on initial render.
   * If not provided, the first non-disabled tab is activated.
   */
  @Prop() defaultOpen: string = '';

  /**
   * Size of the tabs.
   */
  @Prop() size: string = 'base';
  @State() private _resolvedSize: TabSize = 'base';
  private _sizeWatcher: ResponsivePropWatcher | null = null;

  /**
   * Enables horizontal scrolling when tabs overflow the container.
   * A faded gradient edge is shown to indicate scrollable content.
   */
  @Prop() isScrollable: boolean = false;

  /**
   * Distributes tabs evenly to fill the full width of the container.
   * Each tab grows equally to occupy available space.
   */
  @Prop() isStretchable: boolean = false;

  /**
   * Layout orientation of the tabs.
   * - `horizontal`: Tabs appear above the panels (default)
   * - `vertical`: Tabs appear to the side of the panels
   */
  @Prop() orientation: TabOrientation = 'horizontal';

  /**
   * Accessible label for the tablist element.
   * Provides context for screen readers about what the tabs control.
   * Defaults to a bilingual auto-detected string ("Tabs" / "علامات التبويب").
   */
  @Prop() labelTablist: string = '';

  /** Currently active tab id (internal uncontrolled state) */
  @State() activeTabId: string = '';

  /**
   * Emitted when the active tab changes.
   * Event detail contains the new active tab-id string.
   * @event aegovTabChange
   */
  @Event() aegovTabChange: EventEmitter<string>;

  private listWrapperEl: HTMLElement;
  private listEl: HTMLElement;
  private scrollHandler: () => void;

  componentWillLoad() {
    if (!this.fieldId) {
      this.fieldId = generateId('aegov-tabs');
    }
    warnIfInvalidEnumProp(this.variant, TAB_VARIANTS, 'simple', ctx('variant'));
    warnIfInvalidEnumProp(this.orientation, TAB_ORIENTATIONS, 'horizontal', ctx('orientation'));
    this._sizeWatcher = watchResponsiveProp(this.size, TAB_SIZES, 'base', v => {
      this._resolvedSize = v as TabSize;
      if (this.el.isConnected) { this.syncChildren(); }
    });
    this._resolvedSize = this._sizeWatcher.current as TabSize;
    if (this.defaultOpen) {
      this.activeTabId = this.defaultOpen;
    } else {
      const tabs = this.getTabElements();
      const first = tabs.find(t => !t.hasAttribute('is-disabled') && !t.hasAttribute('disabled'));
      if (first) {
        this.activeTabId = first.getAttribute('tab-id') || '';
      }
    }
  }

  componentDidLoad() {
    this.syncChildren();
    if (this.isScrollable && this.listEl) {
      this.checkScrollFade();
      this.scrollHandler = () => this.checkScrollFade();
      this.listEl.addEventListener('scroll', this.scrollHandler, { passive: true });
    }
  }

  disconnectedCallback() {
    this._sizeWatcher?.destroy();
    if (this.scrollHandler && this.listEl) {
      this.listEl.removeEventListener('scroll', this.scrollHandler);
    }
  }

  @Watch('activeTabId')
  onActiveTabChange() {
    this.syncChildren();
    if (this.isScrollable && this.listEl) {
      this.checkScrollFade();
      const activeTab = this.el.querySelector(`aegov-tab[tab-id="${this.activeTabId}"]`) as HTMLElement;
      if (activeTab) {
        const scrollOpts: ScrollIntoViewOptions = this.orientation === 'vertical'
          ? { behavior: 'smooth', block: 'nearest', inline: 'start' }
          : { behavior: 'smooth', block: 'nearest', inline: 'nearest' };
        activeTab.scrollIntoView(scrollOpts);
      }
    }
  }

  @Watch('variant')
  onVariantChange(v: unknown) {
    warnIfInvalidEnumProp(v, TAB_VARIANTS, 'simple', ctx('variant'));
    this.syncChildren();
  }

  @Watch('size')
  onSizeChange() {
    this._sizeWatcher?.destroy();
    this._sizeWatcher = watchResponsiveProp(this.size, TAB_SIZES, 'base', v => {
      this._resolvedSize = v as TabSize;
      if (this.el.isConnected) { this.syncChildren(); }
    });
    this._resolvedSize = this._sizeWatcher.current as TabSize;
  }

  @Watch('orientation')
  onOrientationChange(v: unknown) {
    warnIfInvalidEnumProp(v, TAB_ORIENTATIONS, 'horizontal', ctx('orientation'));
    this.syncChildren();
  }

  @Listen('aegovTabSelect')
  handleTabSelect(event: CustomEvent<string>) {
    event.stopPropagation();
    this.activateTab(event.detail);
  }

  private getTabElements(): HTMLElement[] {
    return Array.from(this.el.querySelectorAll('aegov-tab'));
  }

  private getPanelElements(): HTMLElement[] {
    return Array.from(this.el.querySelectorAll('aegov-tab-panel'));
  }

  private syncChildren() {
    const tabs = this.getTabElements();
    const panels = this.getPanelElements();

    tabs.forEach((tab: any) => {
      tab.activeTabId = this.activeTabId;
      tab.variant = this.variant;
      tab.size = this._resolvedSize;
      tab.orientation = this.orientation;
    });

    panels.forEach((panel: any) => {
      const tabId = panel.getAttribute('tab-id') || panel.tabId;
      panel.active = tabId === this.activeTabId;
    });
  }

  private activateTab(tabId: string) {
    if (tabId === this.activeTabId) return;
    this.activeTabId = tabId;
    this.aegovTabChange.emit(tabId);
  }

  private checkScrollFade() {
    if (!this.listEl || !this.listWrapperEl) return;
    if (this.orientation === 'vertical') {
      const { scrollTop, scrollHeight, clientHeight } = this.listEl;
      this.listWrapperEl.classList.toggle('has-start-fade', scrollTop > 4);
      this.listWrapperEl.classList.toggle('has-end-fade', scrollTop < scrollHeight - clientHeight - 4);
    } else {
      const { scrollLeft, scrollWidth, clientWidth } = this.listEl;
      // scrollLeft can be negative in RTL browsers
      const absScrollLeft = Math.abs(scrollLeft);
      this.listWrapperEl.classList.toggle('has-start-fade', absScrollLeft > 4);
      this.listWrapperEl.classList.toggle('has-end-fade', absScrollLeft < scrollWidth - clientWidth - 4);
    }
  }

  @Listen('keydown')
  handleKeydown(event: KeyboardEvent) {
    const target = event.target as HTMLElement;
    // Only handle keyboard events originating from inside a tab button
    if (!target.closest('aegov-tab')) return;

    const allTabs = this.getTabElements();
    const enabledTabs = allTabs.filter(t => !t.hasAttribute('is-disabled') && !t.hasAttribute('disabled'));
    if (enabledTabs.length === 0) return;

    const currentIndex = enabledTabs.findIndex(
      (t: any) => (t.getAttribute('tab-id') || t.tabId) === this.activeTabId,
    );
    const isRtl = detectRtl(this.el);

    let nextIndex = -1;

    const isVertical = this.orientation === 'vertical';

    switch (event.key) {
      case 'ArrowRight':
        if (!isVertical) {
          nextIndex = isRtl
            ? (currentIndex - 1 + enabledTabs.length) % enabledTabs.length
            : (currentIndex + 1) % enabledTabs.length;
        }
        break;
      case 'ArrowLeft':
        if (!isVertical) {
          nextIndex = isRtl
            ? (currentIndex + 1) % enabledTabs.length
            : (currentIndex - 1 + enabledTabs.length) % enabledTabs.length;
        }
        break;
      case 'ArrowDown':
        if (isVertical) {
          nextIndex = (currentIndex + 1) % enabledTabs.length;
        }
        break;
      case 'ArrowUp':
        if (isVertical) {
          nextIndex = (currentIndex - 1 + enabledTabs.length) % enabledTabs.length;
        }
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = enabledTabs.length - 1;
        break;
      default:
        return;
    }

    if (nextIndex >= 0) {
      event.preventDefault();
      const nextTab = enabledTabs[nextIndex] as any;
      const nextTabId = nextTab.getAttribute('tab-id') || nextTab.tabId;
      if (nextTabId) {
        this.activateTab(nextTabId);
        // Focus the button inside the aegov-tab
        const btnEl = nextTab.querySelector('button') as HTMLElement;
        if (btnEl) btnEl.focus();
      }
    }
  }

  render() {
    const variant: TabVariant = (TAB_VARIANTS as readonly string[]).includes(this.variant) ? this.variant : 'simple';
    const size: TabSize = this._resolvedSize;
    const orientation: TabOrientation = (TAB_ORIENTATIONS as readonly string[]).includes(this.orientation) ? this.orientation : 'horizontal';
    const passThroughAttributes = getPassThroughAttributes(this.el);
    const rtl = detectRtl(this.el);
    const listLabel = this.labelTablist || (rtl ? STRINGS.ar.tablist : STRINGS.en.tablist);
    return (
      <div {...passThroughAttributes} id={this.fieldId} class={`aegov-tabs tabs--${variant} tabs--${size}${this.isStretchable ? ' tabs--stretch' : ''}${orientation === 'vertical' ? ' tabs--vertical' : ''}`}>
        <div
          class={`tabs__list-wrapper${this.isScrollable ? ' tabs__list-wrapper--scrollable' : ''}`}
          ref={el => (this.listWrapperEl = el as HTMLElement)}
        >
          <div
            role="tablist"
            aria-label={listLabel}
            aria-orientation={orientation}
            class="tabs__list"
            ref={el => (this.listEl = el as HTMLElement)}
          >
            <slot name="tabs" />
          </div>
        </div>
        <div class="tabs__panels">
          <slot />
        </div>
      </div>
    );
  }
}
