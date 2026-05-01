import type { LinkTarget } from '../../utils/types';
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
export declare class AegovNavbarItem {
    el: HTMLElement;
    /** Native anchor attributes to pass through to the inner link element. */
    private static readonly PASS_THROUGH_ATTRS;
    hasIconStartSlot: boolean;
    hasDropdown: boolean;
    /** URL the item links to. If unset, item renders as a non-link span. */
    href?: string;
    /** Anchor target attribute. */
    target?: LinkTarget;
    /** Anchor rel attribute. */
    rel?: string;
    /** Mark this item as the current page. Sets `aria-current="page"`. */
    isActive: boolean;
    /** Visually disabled, not clickable, removed from arrow-key cycle. */
    isDisabled: boolean;
    /**
     * Size token. Accepts a Tailwind-style responsive string (e.g.
     * `"sm md:base lg:lg"`). Parent aegov-navbar sets this to its resolved
     * value; standalone use also supports breakpoint syntax.
     */
    size: string;
    private _resolvedSize;
    private _sizeWatcher;
    private linkEl?;
    private chevronEl?;
    componentWillLoad(): void;
    disconnectedCallback(): void;
    onSizeChange(): void;
    private getLabelText;
    private wireDropdown;
    private handleLinkClick;
    private handleChevronClick;
    private handleChevronKeydown;
    render(): any;
}
