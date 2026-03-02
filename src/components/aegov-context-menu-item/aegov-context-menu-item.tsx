import { Component, Host, h, Prop, Event, EventEmitter } from '@stencil/core';

/**
 * Context menu item component (optional helper for styling)
 *
 * @slot - Item content (text, icons, etc.)
 */
@Component({
  tag: 'aegov-context-menu-item',
  styleUrl: 'aegov-context-menu-item.css',
  scoped: false,
})
export class AegovContextMenuItem {
  /**
   * Whether the menu item is disabled
   * @default false
   */
  @Prop() disabled: boolean = false;

  /**
   * Emitted when the menu item is clicked
   */
  @Event() aegovContextMenuItemClick: EventEmitter<MouseEvent>;

  private handleClick = (event: MouseEvent) => {
    if (!this.disabled) {
      this.aegovContextMenuItemClick.emit(event);
    }
  };

  render() {
    return (
      <Host>
        <button
          class="aegov-context-menu-item"
          role="menuitem"
          disabled={this.disabled}
          aria-disabled={this.disabled ? 'true' : 'false'}
          onClick={this.handleClick}
          type="button"
        >
          <slot />
        </button>
      </Host>
    );
  }
}
