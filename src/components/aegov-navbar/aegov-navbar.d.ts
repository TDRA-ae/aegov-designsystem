/**
 * @component aegov-navbar
 * @description Horizontal primary navigation container. Holds aegov-navbar-item
 * children which can be plain links, links with prefix icons, or links paired
 * with an aegov-dropdown submenu (chevron-triggered).
 *
 * @slot - Place aegov-navbar-item elements as direct children.
 *
 * @example
 * <aegov-navbar label-nav="Main navigation" size="base" gap="gap-6">
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
export declare class AegovNavbar {
    el: HTMLElement;
    /**
     * Size of the navbar items. Accepts a Tailwind-style responsive string,
     * e.g. `"sm md:base lg:lg"`, resolved against the active viewport width.
     * The resolved token cascades to all aegov-navbar-item children.
     */
    size: string;
    /**
     * Tailwind gap utility class applied between items, e.g. "gap-4", "gap-6", "gap-10".
     */
    gap: string;
    /**
     * Accessible label for the navigation landmark.
     */
    labelNav: string;
    private _resolvedSize;
    private _sizeWatcher;
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentDidUpdate(): void;
    disconnectedCallback(): void;
    onSizeChange(): void;
    private syncChildren;
    /**
     * Collect all keyboard-focusable navbar elements in document order:
     * each item's link plus its chevron (if present).
     */
    private getFocusables;
    handleKeydown(event: KeyboardEvent): void;
    render(): any;
}
