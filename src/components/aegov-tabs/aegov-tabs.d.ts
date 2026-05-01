import { EventEmitter } from '@stencil/core';
import type { TabVariant, TabOrientation } from '../../utils/types';
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
export declare class AegovTabs {
    el: HTMLElement;
    /**
     * Unique ID for the tabs container. Auto-generated if not provided.
     */
    fieldId?: string;
    /**
     * Visual style variant of the tabs.
     * - `simple`: Underline style (default)
     * - `segmented`: Button-group style, ideal for toggling views
     * - `pill`: Pill-shaped individual tabs
     */
    variant: TabVariant;
    /**
     * The tab-id of the tab that should be active on initial render.
     * If not provided, the first non-disabled tab is activated.
     */
    defaultOpen: string;
    /**
     * Size of the tabs.
     */
    size: string;
    private _resolvedSize;
    private _sizeWatcher;
    /**
     * Enables horizontal scrolling when tabs overflow the container.
     * A faded gradient edge is shown to indicate scrollable content.
     */
    isScrollable: boolean;
    /**
     * Distributes tabs evenly to fill the full width of the container.
     * Each tab grows equally to occupy available space.
     */
    isStretchable: boolean;
    /**
     * Layout orientation of the tabs.
     * - `horizontal`: Tabs appear above the panels (default)
     * - `vertical`: Tabs appear to the side of the panels
     */
    orientation: TabOrientation;
    /**
     * Accessible label for the tablist element.
     * Provides context for screen readers about what the tabs control.
     */
    labelTablist: string;
    /** Currently active tab id (internal uncontrolled state) */
    activeTabId: string;
    /**
     * Emitted when the active tab changes.
     * Event detail contains the new active tab-id string.
     * @event aegovTabChange
     */
    aegovTabChange: EventEmitter<string>;
    private listWrapperEl;
    private listEl;
    private scrollHandler;
    componentWillLoad(): void;
    componentDidLoad(): void;
    disconnectedCallback(): void;
    onActiveTabChange(): void;
    onVariantChange(v: unknown): void;
    onSizeChange(): void;
    onOrientationChange(v: unknown): void;
    handleTabSelect(event: CustomEvent<string>): void;
    private getTabElements;
    private getPanelElements;
    private syncChildren;
    private activateTab;
    private checkScrollFade;
    handleKeydown(event: KeyboardEvent): void;
    render(): any;
}
