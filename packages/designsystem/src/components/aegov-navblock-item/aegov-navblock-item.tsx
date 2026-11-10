import { Component, Host, h, Prop, Element, Event, EventEmitter, State, Watch } from '@stencil/core';
import type { NavblockIcon, NavblockSize, NavblockVariant, LinkTarget } from '../../utils/types';
import { NAVBLOCK_ICONS } from '../../utils/types';
import { getDataAttributes, listItemRole } from '../../utils/attributes';
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

  /**
   * Visual variant. Cascades from parent navblock.
   * @internal
   */
  @Prop({ mutable: true }) variant: NavblockVariant = 'collapsible';

  /** Emitted when the row toggles its sub-region. */
  @Event() aegovNavblockItemToggle!: EventEmitter<{ open: boolean }>;

  private subInnerEl?: HTMLElement;
  private resizeObserver?: ResizeObserver;
  private itemId!: string;
  private _suppressRO = false;
  private _suppressROTimer?: ReturnType<typeof setTimeout>;

  connectedCallback() {
    this.el.addEventListener('aegovNavblockItemToggle', this.handleChildToggle as EventListener);
  }

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
        if (this.isOpen && !this._suppressRO) this.updateContentHeight();
      });
      this.resizeObserver.observe(this.subInnerEl);
    }
  }

  componentDidUpdate() {
    this.syncSubItems();
    // Self-heal: if isOpen but height is 0 and the element now has real layout
    // (e.g. the containing drawer just opened), update to the correct height.
    if (this.isOpen && this.contentHeight === 0 && this.subInnerEl && this.subInnerEl.scrollHeight > 0) {
      this.contentHeight = this.subInnerEl.scrollHeight;
    }
  }

  disconnectedCallback() {
    this.resizeObserver?.disconnect();
    clearTimeout(this._suppressROTimer);
    this.el.removeEventListener('aegovNavblockItemToggle', this.handleChildToggle as EventListener);
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

  @Watch('variant')
  onVariantChange() {
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
      child.variant = this.variant;
    });
  }

  private updateContentHeight() {
    if (!this.subInnerEl) return;
    if (this.isOpen) {
      const h = this.subInnerEl.scrollHeight;
      // Guard against scrollHeight=0 when element has no layout (e.g. inside a
      // closed shadow-DOM drawer that renders null). Keep the last known height
      // so the state stays consistent with isOpen=true.
      if (h > 0) this.contentHeight = h;
    } else {
      this.contentHeight = 0;
    }
  }

  // When a descendant item toggles, update our height to the final target so
  // the parent's wrapper expands concurrently with the child animation rather
  // than chasing it frame-by-frame via ResizeObserver.
  //
  // Approach: one Promise.resolve microtask to let navblock process the event
  // (it sets isOpen on the affected children synchronously). After that:
  //  - isOpen is a @Prop and readable from outside the element.
  //  - sub-wrapper.scrollHeight gives the FULL content height even when the
  //    wrapper's CSS height is still "0px" (scrollHeight ignores overflow clips).
  // We can therefore compute the exact final delta without Stencil having rendered.
  // If delta === 0 (e.g. 3-level nesting where the direct child isn't the one
  // toggling), we return early and let ResizeObserver handle the parent naturally.
  private handleChildToggle = (event: CustomEvent<{ open: boolean }>) => {
    if (event.target === this.el) return; // own toggle — let it bubble
    if (!this.isOpen || !this.subInnerEl) return;

    const directChildren = Array.from(
      this.subInnerEl.querySelectorAll<HTMLAegovNavblockItemElement>(':scope > aegov-navblock-item'),
    );
    if (directChildren.length === 0) return;

    // Snapshot current wrapper heights from inline styles (always in sync with
    // contentHeight @State because Stencil sets them via style={{ height: '...' }}).
    const prevWrapperH = directChildren.map(c => {
      const w = c.querySelector<HTMLElement>('.aegov-navblock-item__sub-wrapper');
      return w ? parseFloat(w.style.height) || 0 : 0;
    });
    const prevScrollH = this.subInnerEl.scrollHeight;

    // One microtask — navblock has now set isOpen on all affected children.
    Promise.resolve().then(() => {
      if (!this.isOpen || !this.subInnerEl) return;

      let delta = 0;
      directChildren.forEach((c, i) => {
        const w = c.querySelector<HTMLElement>('.aegov-navblock-item__sub-wrapper');
        // isOpen is a @Prop so it's readable on the element even from outside.
        // scrollHeight gives the full content depth regardless of the animated height.
        const newH = c.isOpen && w ? w.scrollHeight : 0;
        delta += newH - prevWrapperH[i];
      });

      // delta === 0 means none of our direct children changed (e.g. a grandchild
      // toggled in a 3-level layout). Let ResizeObserver handle the expansion
      // naturally in that case — no suppression needed.
      if (delta === 0) return;

      const targetH = prevScrollH + delta;
      if (targetH <= 0) return;

      this.contentHeight = targetH;
      // Suppress ResizeObserver for the animation window (150 ms + small buffer)
      // so intermediate scrollHeight values during CSS transitions don't overwrite
      // the target we just set.
      this._suppressRO = true;
      clearTimeout(this._suppressROTimer);
      this._suppressROTimer = setTimeout(() => {
        this._suppressRO = false;
        // Final sync after animation completes to correct any drift.
        if (this.isOpen && this.subInnerEl) {
          const h = this.subInnerEl.scrollHeight;
          if (h > 0) this.contentHeight = h;
        }
      }, 160);
    });
  };

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
    const icon: NavblockIcon = (NAVBLOCK_ICONS as readonly string[]).includes(this.icon) ? this.icon : 'chevron';
    if (icon === 'chevron') {
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
    const isFlat = this.variant === 'flat';

    const itemClasses = {
      'aegov-navblock-item': true,
      [`navblock-item--${this.size}`]: true,
      'aegov-navblock-item--has-children': this.hasChildren,
      'aegov-navblock-item--open': this.isOpen,
      'aegov-navblock-item--active': this.isActive,
      'aegov-navblock-item--disabled': this.isDisabled,
      'aegov-navblock-item--flat-header': isFlat && this.hasChildren,
      'is-active': this.isActive,
    };

    // The host is the list item (role and its own aria-* apply there); the
    // inner wrapper only keeps data-* for styling hooks.
    const dataAttributes = getDataAttributes(this.el);
    const linkAttrs: Record<string, string> = {};
    Array.from(this.el.attributes).forEach(attr => {
      if (AegovNavblockItem.PASS_THROUGH_LINK_ATTRS.has(attr.name)) {
        linkAttrs[attr.name] = attr.value;
      }
    });

    // Icon area: always rendered to preserve horizontal text alignment.
    // Collapsible: chevron fills the slot when no explicit icon + has children.
    // Flat: chevron never shown; slot content or empty spacer.
    // --empty modifier allows CSS to hide the spacer for leaf children in
    // collapsible mode so their text aligns with the parent label, not icon.
    const showLeftChevron = !isFlat && this.hasChildren && !this.hasIconStartSlot;
    const showRightChevron = !isFlat && this.hasChildren && this.hasIconStartSlot;
    const iconIsEmpty = !this.hasIconStartSlot && !showLeftChevron;

    // In flat mode: skip the icon span entirely when there's nothing to show.
    // This removes the 20px spacer so all text without icons aligns flush left.
    // In collapsible mode: always render so text aligns; CSS hides it for sub-items.
    const iconNode = isFlat && iconIsEmpty ? null : (
      <span
        class={`aegov-navblock-item__icon${iconIsEmpty ? ' aegov-navblock-item__icon--empty' : ''}`}
        aria-hidden="true"
      >
        {this.hasIconStartSlot ? (
          <slot name="icon-start" />
        ) : showLeftChevron ? (
          this.renderChevron()
        ) : null}
      </span>
    );

    const labelNode = (
      <span class="aegov-navblock-item__label">
        <slot />
      </span>
    );

    let row: any;
    const subId = `${this.itemId}-sub`;
    const triggerId = `${this.itemId}-trigger`;

    if (isFlat && this.hasChildren) {
      // Flat group header: non-interactive, always expanded
      row = (
        <span
          class="aegov-navblock-item__row aegov-navblock-item__group-header"
          role="presentation"
        >
          {iconNode}
          {labelNode}
        </span>
      );
    } else if (this.hasChildren) {
      // Collapsible toggle button
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
          {showRightChevron && this.renderChevron()}
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
      <Host role={listItemRole(this.el)}>
        <div {...dataAttributes} class={itemClasses}>
          {row}
          {this.hasChildren && (
            isFlat ? (
              // Flat: children always visible, no animation, no indentation
              <div
                class="aegov-navblock-item__sub aegov-navblock-item__sub--flat"
                role="list"
              >
                <slot name="subnav" />
              </div>
            ) : (
              // Collapsible: animated height wrapper
              <div
                class="aegov-navblock-item__sub-wrapper"
                style={{ height: `${this.contentHeight}px` }}
              >
                <div
                  class="aegov-navblock-item__sub"
                  id={subId}
                  role="list"
                  aria-labelledby={triggerId}
                  ref={el => (this.subInnerEl = el)}
                >
                  <slot name="subnav" />
                </div>
              </div>
            )
          )}
        </div>
      </Host>
    );
  }
}

