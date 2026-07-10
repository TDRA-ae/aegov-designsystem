import { Component, Host, h, Prop, Element, State, Watch } from '@stencil/core';
import { NAVBAR_SIZES } from '../../utils/types';
import type { NavbarSize, LinkTarget } from '../../utils/types';
import { watchResponsiveProp } from '../../utils/responsive-prop';
import type { ResponsivePropWatcher } from '../../utils/responsive-prop';
import { getPassThroughAttributes } from '../../utils/attributes';
import { isRtl } from '../../utils/rtl';

const CHEVRON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" aria-hidden="true" focusable="false"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="20" d="m48 96 80 80 80-80"/></svg>`;

/**
 * @component aegov-navbar-item
 * @description Single navigation item used inside aegov-navbar. Renders as a link
 * (when `href` is set) or plain text. Optional prefix icon via `slot="icon-start"`.
 * Optional submenu via `slot="dropdown"` containing an aegov-dropdown — the
 * navbar-item itself becomes the dropdown trigger so hover/position resolve to
 * the full item rect, and a chevron button is injected for keyboard/click
 * toggling. The user controls the dropdown's `trigger` (e.g. set
 * `trigger="hover"` for hover open).
 *
 * @slot           - Item label.
 * @slot icon-start - Optional prefix icon (SVG).
 * @slot dropdown  - Optional aegov-dropdown for a submenu.
 *
 * @example
 * <aegov-navbar-item href="/products">
 *   <svg slot="icon-start" ...></svg>
 *   Products
 *   <aegov-dropdown slot="dropdown" trigger="hover">
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

  /** Native anchor attributes to pass through to the inner link element. */
  private static readonly PASS_THROUGH_ATTRS = new Set([
    'rel', 'referrerpolicy', 'target',
  ]);

  @State() hasIconStartSlot: boolean = false;
  @State() hasDropdown: boolean = false;

  /** URL the item links to. If unset, item renders as a non-link span. */
  @Prop() href?: string;

  /** Anchor target attribute. */
  @Prop() target?: LinkTarget;

  /** Anchor rel attribute. */
  @Prop() rel?: string;

  /** Mark this item as the current page. Sets `aria-current="page"`. */
  @Prop() isActive: boolean = false;

  /** Visually disabled, not clickable, removed from arrow-key cycle. */
  @Prop() isDisabled: boolean = false;

  /**
   * Size token. Accepts a Tailwind-style responsive string (e.g.
   * `"sm md:base lg:lg"`). Parent aegov-navbar sets this to its resolved
   * value; standalone use also supports breakpoint syntax.
   */
  @Prop({ mutable: true }) size: string = 'base';

  @State() private _resolvedSize: NavbarSize = 'base';
  private _sizeWatcher: ResponsivePropWatcher | null = null;

  private linkEl?: HTMLElement;
  private chevronEl?: HTMLButtonElement;

  componentWillLoad() {
    const parentNavbar = this.el.closest('aegov-navbar');
    if (!parentNavbar) {
      throw new Error(
        '[aegov-navbar-item] This component must be used inside <aegov-navbar>. ' +
        'It cannot be used as a standalone component. ' +
        'Please wrap it with <aegov-navbar>...</aegov-navbar>'
      );
    }

    this._sizeWatcher = watchResponsiveProp(this.size, NAVBAR_SIZES, 'base', v => {
      this._resolvedSize = v as NavbarSize;
    });
    this._resolvedSize = this._sizeWatcher.current as NavbarSize;
    this.hasIconStartSlot = !!this.el.querySelector('[slot="icon-start"]');
    this.hasDropdown = !!this.el.querySelector('aegov-dropdown[slot="dropdown"]');
    // Inject link + chevron BEFORE the dropdown hydrates so they are captured
    // as the dropdown's default-slot content (becoming the trigger area).
    if (this.hasDropdown && !this.isDisabled) {
      this.wireDropdown();
    }
  }

  disconnectedCallback() {
    if (this.chevronEl) {
      this.chevronEl.removeEventListener('keydown', this.handleChevronKeydown);
      this.chevronEl.removeEventListener('click', this.handleChevronClick);
      this.chevronEl = undefined;
    }
    if (this.linkEl) {
      this.linkEl.removeEventListener('click', this.handleLinkClick);
      this.linkEl = undefined;
    }
    this._sizeWatcher?.destroy();
    this._sizeWatcher = null;
  }

  @Watch('size')
  onSizeChange() {
    this._sizeWatcher?.destroy();
    this._sizeWatcher = watchResponsiveProp(this.size, NAVBAR_SIZES, 'base', v => {
      this._resolvedSize = v as NavbarSize;
    });
    this._resolvedSize = this._sizeWatcher.current as NavbarSize;
  }

  private getLabelText(): string {
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

    const labelText = this.getLabelText();

    // Build link or span (mirrors render output for non-dropdown case).
    const link = document.createElement(this.href ? 'a' : 'span');
    link.className = 'aegov-navbar-item__link';
    if (this.href) {
      link.setAttribute('href', this.href);
      if (this.target) link.setAttribute('target', this.target);
      if (this.rel) link.setAttribute('rel', this.rel);
      const referrerPolicy = this.el.getAttribute('referrerpolicy');
      if (referrerPolicy) link.setAttribute('referrerpolicy', referrerPolicy);
    }
    if (this.isActive) link.setAttribute('aria-current', 'page');

    // Move user-provided icon into the link.
    const iconEl = this.el.querySelector('[slot="icon-start"]') as HTMLElement | null;
    if (iconEl) {
      const iconWrap = document.createElement('span');
      iconWrap.className = 'aegov-navbar-item__icon';
      iconEl.removeAttribute('slot');
      iconWrap.appendChild(iconEl);
      link.appendChild(iconWrap);
    }

    // Label.
    const labelSpan = document.createElement('span');
    labelSpan.className = 'aegov-navbar-item__label';
    labelSpan.textContent = labelText;
    link.appendChild(labelSpan);

    // Strip text nodes from the host so they don't render alongside.
    Array.from(this.el.childNodes).forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        this.el.removeChild(node);
      }
    });

    // Only stop click on real <a> links so they don't toggle a click-trigger
    // dropdown. For a non-link span the click should bubble to aegov-dropdown's
    // trigger and toggle the menu like any other clickable trigger.
    if (this.href) {
      link.addEventListener('click', this.handleLinkClick);
    }

    // Chevron (always toggles, independent of dropdown's triggerType).
    const chevron = document.createElement('button');
    chevron.type = 'button';
    chevron.className = 'aegov-navbar-item__chevron';
    const rtl = isRtl(this.el);
    const chevronLabel = rtl ? `فتح القائمة الفرعية ${labelText}` : `Open ${labelText} submenu`;
    chevron.setAttribute('aria-label', chevronLabel);
    chevron.innerHTML = CHEVRON_SVG;
    chevron.addEventListener('keydown', this.handleChevronKeydown);
    chevron.addEventListener('click', this.handleChevronClick);

    // Inject as default-slot children of the user's dropdown so the
    // dropdown's trigger div wraps the entire item area.
    dropdown.insertBefore(chevron, dropdown.firstChild);
    dropdown.insertBefore(link, chevron);

    this.linkEl = link;
    this.chevronEl = chevron;
  }

  private handleLinkClick = (event: MouseEvent) => {
    // Stop the click reaching the dropdown's trigger div so a click-trigger
    // dropdown does not toggle when the link is clicked. Browser navigation
    // proceeds normally.
    event.stopPropagation();
  };

  private handleChevronClick = async (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    const dropdown = this.el.querySelector(
      'aegov-dropdown[slot="dropdown"]',
    ) as HTMLAegovDropdownElement | null;
    if (dropdown && typeof dropdown.toggle === 'function') {
      // detail === 0 → click came from keyboard (Enter/Space, or our
      // ArrowDown shim that calls chevron.click()). Pass through so the
      // dropdown moves focus into the menu only for keyboard users.
      await dropdown.toggle(event.detail === 0);
    }
  };

  private handleChevronKeydown = (event: KeyboardEvent) => {
    // Enter/Space fire native click on a <button>, which our click handler
    // already toggles. Only ArrowDown needs an explicit shim.
    if (event.key === 'ArrowDown' && this.chevronEl) {
      event.preventDefault();
      event.stopPropagation();
      this.chevronEl.click();
    }
  };

  render() {
    const sizeClass = `aegov-navbar-item--${this._resolvedSize}`;
    const liClasses = {
      'aegov-navbar-item': true,
      [sizeClass]: true,
      'aegov-navbar-item--has-dropdown': this.hasDropdown,
      'aegov-navbar-item--active': this.isActive,
      'aegov-navbar-item--disabled': this.isDisabled,
    };
    const passThroughAttributes = getPassThroughAttributes(this.el);
    const linkAttrs: Record<string, string> = {};
    Array.from(this.el.attributes).forEach(attr => {
      if (AegovNavbarItem.PASS_THROUGH_ATTRS.has(attr.name)) {
        linkAttrs[attr.name] = attr.value;
      }
    });

    // hasDropdown && !disabled: link/chevron live inside the user's
    // <aegov-dropdown>. Render only the dropdown slot.
    if (this.hasDropdown && !this.isDisabled) {
      return (
        <Host>
          <li {...passThroughAttributes} class={liClasses}>
            <slot name="dropdown" />
          </li>
        </Host>
      );
    }

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
    if (this.isDisabled) {
      inner = (
        <span class="aegov-navbar-item__link" aria-disabled="true">
          {iconNode}
          {labelNode}
        </span>
      );
    } else if (this.href) {
      inner = (
        <a
          {...linkAttrs}
          class="aegov-navbar-item__link"
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
      inner = (
        <span
          class="aegov-navbar-item__link"
          aria-current={this.isActive ? 'page' : undefined}
        >
          {iconNode}
          {labelNode}
        </span>
      );
    }

    return (
      <Host>
        <li {...passThroughAttributes} class={liClasses}>
          {inner}
          {this.hasDropdown && <slot name="dropdown" />}
        </li>
      </Host>
    );
  }
}
