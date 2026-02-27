import { Component, Prop, h } from '@stencil/core';

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
@Component({
  tag: 'aegov-tab-panel',
  styleUrl: 'aegov-tab-panel.css',
  scoped: false,
  shadow: false,
})
export class AegovTabPanel {
  /**
   * Unique identifier that must match the corresponding aegov-tab's tab-id.
   */
  @Prop() tabId!: string;

  /**
   * Whether this panel is currently active. Set automatically by the parent aegov-tabs.
   */
  @Prop() active: boolean = false;

  render() {
    return (
      <div
        role="tabpanel"
        id={`panel-${this.tabId}`}
        aria-labelledby={`tab-${this.tabId}`}
        tabIndex={this.active ? 0 : undefined}
        hidden={!this.active}
        class="tab-panel"
      >
        <slot />
      </div>
    );
  }
}
