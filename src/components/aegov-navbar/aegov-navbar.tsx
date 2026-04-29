import { Component, Host, h, Prop, Element, Listen, Watch } from '@stencil/core';
import { NAVBAR_SIZES } from '../../utils/types';
import type { NavbarSize } from '../../utils/types';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';

const TAG = 'aegov-navbar';
const ctx = (prop: string) => ({ component: TAG, prop });

/**
 * @component aegov-navbar
 * @description Horizontal primary navigation container. Holds aegov-navbar-item
 * children which can be plain links, links with prefix icons, or links paired
 * with an aegov-dropdown submenu (chevron-triggered).
 *
 * @slot - Place aegov-navbar-item elements as direct children.
 *
 * @example
 * <aegov-navbar nav-label="Main navigation" size="base" gap="gap-6">
 *   <aegov-navbar-item href="/">Home</aegov-navbar-item>
 *   <aegov-navbar-item href="/services">Services</aegov-navbar-item>
 *   <aegov-navbar-item href="/products">
 *     Products
 *     <aegov-dropdown slot="dropdown">
 *       <a slot="dropdown-content" href="/a">Item A</a>
 *       <a slot="dropdown-content" href="/b">Item B</a>
 *     </aegov-dropdown>
 *   </aegov-navbar-item>
 * </aegov-navbar>
 */
@Component({
  tag: 'aegov-navbar',
  styleUrl: 'aegov-navbar.css',
  scoped: false,
})
export class AegovNavbar {
  @Element() el: HTMLElement;

  /**
   * Size of the navbar items. Cascades to all aegov-navbar-item children.
   */
  @Prop() size: NavbarSize = 'base';

  /**
   * Tailwind gap utility class applied between items, e.g. "gap-4", "gap-6", "gap-10".
   */
  @Prop() gap: string = 'gap-6';

  /**
   * Accessible label for the navigation landmark.
   */
  @Prop() navLabel: string = 'Main navigation';

  componentWillLoad() {
    warnIfInvalidEnumProp(this.size, NAVBAR_SIZES, 'base', ctx('size'));
  }

  componentDidLoad() {
    this.syncChildren();
  }

  componentDidUpdate() {
    this.syncChildren();
  }

  @Watch('size')
  onSizeChange(v: unknown) {
    warnIfInvalidEnumProp(v, NAVBAR_SIZES, 'base', ctx('size'));
    this.syncChildren();
  }

  private syncChildren() {
    const items = Array.from(
      this.el.querySelectorAll('aegov-navbar-item'),
    ) as HTMLAegovNavbarItemElement[];
    items.forEach(item => {
      item.size = this.size;
    });
  }

  /**
   * Collect all keyboard-focusable navbar elements in document order:
   * each item's link plus its chevron (if present).
   */
  private getFocusables(): HTMLElement[] {
    return Array.from(
      this.el.querySelectorAll<HTMLElement>(
        '.aegov-navbar-item__link, .aegov-navbar-item__chevron',
      ),
    ).filter(el => !el.hasAttribute('aria-disabled') || el.getAttribute('aria-disabled') !== 'true');
  }

  @Listen('keydown')
  handleKeydown(event: KeyboardEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('aegov-navbar-item')) return;

    const focusables = this.getFocusables();
    if (focusables.length === 0) return;

    const currentIndex = focusables.indexOf(target);
    if (currentIndex === -1) return;

    const isRtl =
      this.el.closest('[dir="rtl"]') !== null ||
      document.documentElement.dir === 'rtl';

    let nextIndex = -1;

    switch (event.key) {
      case 'ArrowRight':
        nextIndex = isRtl
          ? (currentIndex - 1 + focusables.length) % focusables.length
          : (currentIndex + 1) % focusables.length;
        break;
      case 'ArrowLeft':
        nextIndex = isRtl
          ? (currentIndex + 1) % focusables.length
          : (currentIndex - 1 + focusables.length) % focusables.length;
        break;
      case 'Home':
        nextIndex = 0;
        break;
      case 'End':
        nextIndex = focusables.length - 1;
        break;
      default:
        return;
    }

    if (nextIndex >= 0) {
      event.preventDefault();
      focusables[nextIndex].focus();
    }
  }

  render() {
    const size: NavbarSize = (NAVBAR_SIZES as readonly string[]).includes(this.size)
      ? this.size
      : 'base';
    return (
      <Host>
        <nav class={`aegov-navbar aegov-navbar--${size}`} aria-label={this.navLabel}>
          <ul class={`aegov-navbar__list ${this.gap}`}>
            <slot />
          </ul>
        </nav>
      </Host>
    );
  }
}
