import { Component, Host, h, Prop, Element, State, Watch } from '@stencil/core';
import { NAVBAR_SIZES } from '../../utils/types';
import type { NavbarSize, LinkTarget } from '../../utils/types';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';

const TAG = 'aegov-navbar-item';
const ctx = (prop: string) => ({ component: TAG, prop });

const CHEVRON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" aria-hidden="true" focusable="false"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="20" d="m48 96 80 80 80-80"/></svg>`;

/**
 * @component aegov-navbar-item
 * @description Single navigation item used inside aegov-navbar. Renders as a link
 * (when `href` is set) or plain text. Optional prefix icon via `slot="icon-start"`.
 * Optional submenu via `slot="dropdown"` containing an aegov-dropdown — a chevron
 * trigger button is injected automatically and is independently focusable from
 * the link, so the link navigates while the chevron opens the submenu.
 *
 * @slot           - Item label.
 * @slot icon-start - Optional prefix icon (SVG).
 * @slot dropdown  - Optional aegov-dropdown for a submenu.
 *
 * @example
 * <aegov-navbar-item href="/products">
 *   <svg slot="icon-start" ...></svg>
 *   Products
 *   <aegov-dropdown slot="dropdown">
 *     <a slot="dropdown-content" href="/a">Item A</a>
 *   </aegov-dropdown>
 * </aegov-navbar-item>
 */
@Component({
  tag: 'aegov-navbar-item',
  styleUrl: 'aegov-navbar-item.css',
  scoped: false,
})
export class AegovNavbarItem {
  @Element() el: HTMLElement;

  @State() hasIconStartSlot: boolean = false;
  @State() hasDropdown: boolean = false;

  /** URL the item links to. If unset, item renders as a non-link span. */
  @Prop() href?: string;

  /** Anchor target attribute. */
  @Prop() target?: LinkTarget;

  /** Anchor rel attribute. */
  @Prop() rel?: string;

  /** Mark this item as the current page. Sets `aria-current="page"`. */
  @Prop() active: boolean = false;

  /** Visually disabled, not clickable, removed from arrow-key cycle. */
  @Prop() disabled: boolean = false;

  /** Size token. Set by parent aegov-navbar. */
  @Prop({ mutable: true }) size: NavbarSize = 'base';

  private chevronEl?: HTMLButtonElement;

  componentWillLoad() {
    warnIfInvalidEnumProp(this.size, NAVBAR_SIZES, 'base', ctx('size'));
    this.hasIconStartSlot = !!this.el.querySelector('[slot="icon-start"]');
    this.hasDropdown = !!this.el.querySelector('aegov-dropdown[slot="dropdown"]');
    // Inject chevron BEFORE the dropdown hydrates so it is captured as
    // the dropdown's default slot content (its click trigger).
    if (this.hasDropdown && !this.disabled) {
      this.wireDropdown();
    }
  }

  disconnectedCallback() {
    if (this.chevronEl) {
      this.chevronEl.removeEventListener('keydown', this.handleChevronKeydown);
      this.chevronEl = undefined;
    }
  }

  @Watch('size')
  onSizeChange(v: unknown) {
    warnIfInvalidEnumProp(v, NAVBAR_SIZES, 'base', ctx('size'));
  }

  @Watch('disabled')
  onDisabledChange(disabled: boolean) {
    if (disabled && this.chevronEl) {
      this.chevronEl.remove();
      this.chevronEl = undefined;
    } else if (!disabled && this.hasDropdown && !this.chevronEl) {
      this.wireDropdown();
    }
  }

  private getLabelText(): string {
    // Prefer text nodes only (skip slotted icon/dropdown elements)
    let txt = '';
    this.el.childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        txt += node.textContent || '';
      }
    });
    return txt.trim() || 'menu';
  }

  private wireDropdown() {
    const dropdown = this.el.querySelector(
      'aegov-dropdown[slot="dropdown"]',
    ) as HTMLAegovDropdownElement | null;
    if (!dropdown) return;

    // Force click trigger so chevron click toggles dropdown predictably.
    dropdown.triggerType = 'click';

    // Build chevron button and inject as the dropdown's default-slot trigger.
    const chevron = document.createElement('button');
    chevron.type = 'button';
    chevron.className = 'aegov-navbar-item__chevron';
    chevron.setAttribute('aria-label', `Open ${this.getLabelText()} submenu`);
    chevron.innerHTML = CHEVRON_SVG;
    chevron.addEventListener('keydown', this.handleChevronKeydown);

    // Prepend so it is the first default-slot child (becoming the dropdown trigger).
    dropdown.insertBefore(chevron, dropdown.firstChild);
    this.chevronEl = chevron;
  }

  private handleChevronKeydown = (event: KeyboardEvent) => {
    // Open dropdown on ArrowDown by synthesising a click on the chevron —
    // aegov-dropdown's trigger div already toggles isOpen on click. Once
    // the dropdown is open, its document-level keyboard handler takes over
    // (Tab/Arrow/Escape inside the menu).
    if (event.key === 'ArrowDown' && this.chevronEl) {
      event.preventDefault();
      event.stopPropagation();
      this.chevronEl.click();
    }
  };

  render() {
    const sizeClass = `aegov-navbar-item--${this.size}`;
    const liClasses = {
      'aegov-navbar-item': true,
      [sizeClass]: true,
      'aegov-navbar-item--has-dropdown': this.hasDropdown,
      'aegov-navbar-item--active': this.active,
      'aegov-navbar-item--disabled': this.disabled,
    };

    const iconNode = this.hasIconStartSlot ? (
      <span class="aegov-navbar-item__icon">
        <slot name="icon-start" />
      </span>
    ) : null;

    const labelNode = (
      <span class="aegov-navbar-item__label">
        <slot />
      </span>
    );

    let inner: any;
    if (this.disabled) {
      inner = (
        <span class="aegov-navbar-item__link" aria-disabled="true">
          {iconNode}
          {labelNode}
        </span>
      );
    } else if (this.href) {
      inner = (
        <a
          class="aegov-navbar-item__link"
          href={this.href}
          target={this.target}
          rel={this.rel}
          aria-current={this.active ? 'page' : undefined}
        >
          {iconNode}
          {labelNode}
        </a>
      );
    } else {
      inner = (
        <span
          class="aegov-navbar-item__link"
          aria-current={this.active ? 'page' : undefined}
        >
          {iconNode}
          {labelNode}
        </span>
      );
    }

    return (
      <Host>
        <li class={liClasses}>
          {inner}
          {this.hasDropdown && <slot name="dropdown" />}
        </li>
      </Host>
    );
  }
}
