/**
 * @component aegov-tab-panel
 * @description Content panel for a single tab. Managed by a parent aegov-tabs component.
 * Shows its content when its tab-id matches the active tab, hides otherwise.
 *
 * @slot default - The panel content
 *
 * @example
 * <aegov-tab-panel tab-id="profile">
 *   <p>Profile settings content here</p>
 * </aegov-tab-panel>
 */
export declare class AegovTabPanel {
    /**
     * Unique identifier that must match the corresponding aegov-tab's tab-id.
     */
    tabId: string;
    /**
     * Whether this panel is currently active. Set automatically by the parent aegov-tabs.
     */
    active: boolean;
    /**
     * Additional CSS classes merged onto the inner panel element.
     */
    extraClass?: string;
    render(): any;
}
