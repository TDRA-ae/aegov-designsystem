import { Component, Host, h, Prop, Element, Event, EventEmitter, State, Watch } from '@stencil/core';
import type { NavblockIcon, NavblockSize, LinkTarget } from '../../utils/types';
import { getPassThroughAttributes } from '../../utils/attributes';
import { generateId } from '../../utils/id-generator';

/**
 * @component aegov-navblock-item
 * @description Single row inside an aegov-navblock. Renders as a link (when
 * `href` is set and the item has no sub-items) or a toggle button (when the
 * item has sub-items via `slot="subnav"` or nested `aegov-navblock-item`
 * children). Cascades `icon` and `size` to direct sub-items.
 *
 * @slot - Row content (label + inline siblings such as aegov-badge).
 * @slot icon-start - Optional leading icon (SVG or element).
 * @slot subnav - Nested aegov-navblock-item children. Auto-assigned for
 *               nested aegov-navblock-item elements without an explicit slot.
 *
 * @example
 * <aegov-navblock-item>
 *   <svg slot="icon-start"></svg>
 *   Reports <aegov-badge>3</aegov-badge>
 *   <aegov-navblock-item href="/r/sales">Sales</aegov-navblock-item>
 *   <aegov-navblock-item href="/r/users">Users</aegov-navblock-item>
 * </aegov-navblock-item>
 */
@Component({
  tag: 'aegov-navblock-item',
  styleUrl: 'aegov-navblock-item.css',
  scoped: false,
})
export class AegovNavblockItem {
  @Element() el!: HTMLElement;

  private static readonly PASS_THROUGH_LINK_ATTRS = new Set([
    'rel', 'referrerpolicy', 'target',
  ]);

  @State() hasIconStartSlot: boolean = false;
  @State() hasChildren: boolean = false;
  @State() contentHeight: number = 0;

  /** Destination URL. If set and the item has no sub-items, renders an `<a>`. */
  @Prop() href?: string;

  /** Anchor target. */
  @Prop() target?: LinkTarget;

  /** Anchor rel. */
  @Prop() rel?: string;

  /** Mark as the current page. Sets `aria-current="page"` on the link. */
  @Prop() isActive: boolean = false;

  /** Visually disabled, not focusable, click no-op. */
  @Prop() isDisabled: boolean = false;

  /**
   * Whether the sub-region is open. Set by parent navblock or parent
   * navblock-item; mutable so the row can self-toggle.
   */
  @Prop({ mutable: true }) isOpen: boolean = false;

  /**
   * Expand/collapse icon. Cascades from parent navblock.
   * @internal
   */
  @Prop({ mutable: true }) icon: NavblockIcon = 'chevron';

  /**
   * Size token. Cascades from parent navblock.
   * @internal
   */
  @Prop({ mutable: true }) size: NavblockSize = 'base';

  /** Emitted when the row toggles its sub-region. */
  @Event() aegovNavblockItemToggle!: EventEmitter<{ open: boolean }>;

  private subInnerEl?: HTMLElement;
  private resizeObserver?: ResizeObserver;
  private itemId!: string;

  componentWillLoad() {
    this.itemId = generateId('aegov-navblock-item');

    // Auto-promote nested aegov-navblock-item children without explicit slot
    // to `slot="subnav"` so authors don't need to repeat the slot attribute
    // on every nested item.
    Array.from(this.el.children).forEach(child => {
      if (
        child.tagName.toLowerCase() === 'aegov-navblock-item' &&
        !child.hasAttribute('slot')
      ) {
        child.setAttribute('slot', 'subnav');
      }
    });

    this.hasIconStartSlot = Array.from(this.el.children).some(
      c => c.getAttribute('slot') === 'icon-start',
    );
    this.hasChildren = Array.from(this.el.children).some(
      c => c.getAttribute('slot') === 'subnav',
    );
  }

  componentDidLoad() {
    this.syncSubItems();
    this.updateContentHeight();

    if (this.subInnerEl && typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        if (this.isOpen) this.updateContentHeight();
      });
      this.resizeObserver.observe(this.subInnerEl);
    }
  }

  componentDidUpdate() {
    this.syncSubItems();
  }

  disconnectedCallback() {
    this.resizeObserver?.disconnect();
  }

  @Watch('isOpen')
  onOpenChange() {
    this.updateContentHeight();
  }

  @Watch('icon')
  onIconChange() {
    this.syncSubItems();
  }

  @Watch('size')
  onSizeChange() {
    this.syncSubItems();
  }

  private getDirectSubItems(): HTMLAegovNavblockItemElement[] {
    return Array.from(this.el.children).filter(
      c =>
        c.tagName.toLowerCase() === 'aegov-navblock-item' &&
        c.getAttribute('slot') === 'subnav',
    ) as unknown as HTMLAegovNavblockItemElement[];
  }

  private syncSubItems() {
    this.getDirectSubItems().forEach(child => {
      child.icon = this.icon;
      child.size = this.size;
    });
  }

  private updateContentHeight() {
    if (!this.subInnerEl) return;
    this.contentHeight = this.isOpen ? this.subInnerEl.scrollHeight : 0;
  }

  private handleToggle = () => {
    if (this.isDisabled) return;
    this.aegovNavblockItemToggle.emit({ open: !this.isOpen });
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handleToggle();
    }
  };

  private renderChevron() {
    const baseClass = 'aegov-navblock-item__chevron';
    if (this.icon === 'chevron') {
      return (
        <svg
          class={`${baseClass} ${baseClass}-chevron`}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 256"
          aria-hidden="true"
          focusable="false"
        >
          <rect width="256" height="256" fill="none" />
          <polyline
            points="208 96 128 176 48 96"
            fill="none"
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="24"
          />
        </svg>
      );
    }
    return (
      <svg
        class={`${baseClass} ${baseClass}-plus`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 256 256"
        aria-hidden="true"
        focusable="false"
      >
        <rect width="256" height="256" fill="none" />
        <line
          x1="40" y1="128" x2="216" y2="128"
          fill="none" stroke="currentColor"
          stroke-linecap="round" stroke-linejoin="round" stroke-width="24"
        />
        <line
          x1="128" y1="40" x2="128" y2="216"
          fill="none" stroke="currentColor"
          stroke-linecap="round" stroke-linejoin="round" stroke-width="24"
        />
      </svg>
    );
  }

  render() {
    const liClasses = {
      'aegov-navblock-item': true,
      [`navblock-item--${this.size}`]: true,
      'aegov-navblock-item--has-children': this.hasChildren,
      'aegov-navblock-item--open': this.isOpen,
      'aegov-navblock-item--active': this.isActive,
      'aegov-navblock-item--disabled': this.isDisabled,
      'is-active': this.isActive,
    };

    const passThroughAttributes = getPassThroughAttributes(this.el);
    const linkAttrs: Record<string, string> = {};
    Array.from(this.el.attributes).forEach(attr => {
      if (AegovNavblockItem.PASS_THROUGH_LINK_ATTRS.has(attr.name)) {
        linkAttrs[attr.name] = attr.value;
      }
    });

    const iconNode = this.hasIconStartSlot ? (
      <span class="aegov-navblock-item__icon">
        <slot name="icon-start" />
      </span>
    ) : null;

    const labelNode = (
      <span class="aegov-navblock-item__label">
        <slot />
      </span>
    );

    let row: any;
    const subId = `${this.itemId}-sub`;
    const triggerId = `${this.itemId}-trigger`;

    if (this.hasChildren) {
      row = (
        <button
          type="button"
          class="aegov-navblock-item__row aegov-navblock-item__toggle"
          id={triggerId}
          onClick={this.handleToggle}
          onKeyDown={this.handleKeyDown}
          disabled={this.isDisabled}
          aria-expanded={this.isOpen ? 'true' : 'false'}
          aria-controls={subId}
        >
          {iconNode}
          {labelNode}
          {this.renderChevron()}
        </button>
      );
    } else if (this.isDisabled) {
      row = (
        <span class="aegov-navblock-item__row" aria-disabled="true">
          {iconNode}
          {labelNode}
        </span>
      );
    } else if (this.href) {
      row = (
        <a
          {...linkAttrs}
          class="aegov-navblock-item__row"
          href={this.href}
          target={this.target}
          rel={this.rel}
          aria-current={this.isActive ? 'page' : undefined}
        >
          {iconNode}
          {labelNode}
        </a>
      );
    } else {
      row = (
        <button
          type="button"
          class="aegov-navblock-item__row"
          aria-current={this.isActive ? 'page' : undefined}
        >
          {iconNode}
          {labelNode}
        </button>
      );
    }

    return (
      <Host>
        <li {...passThroughAttributes} class={liClasses}>
          {row}
          {this.hasChildren && (
            <div
              class="aegov-navblock-item__sub-wrapper"
              style={{ height: `${this.contentHeight}px` }}
            >
              <ul
                class="aegov-navblock-item__sub"
                id={subId}
                role="list"
                aria-labelledby={triggerId}
                ref={el => (this.subInnerEl = el)}
              >
                <slot name="subnav" />
              </ul>
            </div>
          )}
        </li>
      </Host>
    );
  }
}

