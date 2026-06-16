import { EventEmitter } from '@stencil/core';
import type { TabVariant, TabOrientation } from '../../utils/types';
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
export declare class AegovTab {
    el: HTMLElement;
    /**
     * Unique identifier that must match the corresponding aegov-tab-panel's tab-id.
     */
    tabId: string;
    /**
     * Disables this tab and its associated panel.
     */
    isDisabled: boolean;
    /**
     * The currently active tab id. Set automatically by the parent aegov-tabs.
     */
    activeTabId: string;
    /**
     * Visual variant of the tabs. Set automatically by the parent aegov-tabs.
     */
    variant: TabVariant;
    /**
     * Size of the tab. Set automatically by the parent aegov-tabs.
     */
    size: string;
    private _resolvedSize;
    private _sizeWatcher;
    /**
     * Orientation of the tabs. Set automatically by the parent aegov-tabs.
     */
    orientation: TabOrientation;
    hasIconSlot: boolean;
    hasIconEndSlot: boolean;
    /**
     * Emitted when this tab is clicked. Bubbles up to the parent aegov-tabs.
     * @event aegovTabSelect
     */
    aegovTabSelect: EventEmitter<string>;
    componentWillLoad(): void;
    disconnectedCallback(): void;
    onVariantChange(v: unknown): void;
    onSizeChange(): void;
    onOrientationChange(v: unknown): void;
    private handleClick;
    render(): any;
}
