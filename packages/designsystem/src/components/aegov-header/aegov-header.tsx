import { Build, Component, Element, Event, EventEmitter, Host, Method, Prop, State, Watch, h } from '@stencil/core';
import { HEADER_VARIANTS, HEADER_COLLAPSE_BREAKPOINTS, HEADER_EMBLEM_COLORS, HEADER_GSR_STARS, DRAWER_SIZES } from '../../utils/types';
import type { HeaderVariant, HeaderCollapseBreakpoint, HeaderEmblemColor, HeaderGsrStars, DrawerSize } from '../../utils/types';
import { GSR_BADGE_WIDTH, GSR_BADGE_HEIGHT } from './gsr-badge-size';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { isRtl, observeDir } from '../../utils/rtl';
import { readBreakpointPx } from '../../utils/responsive-prop';
import { generateId } from '../../utils/id-generator';
import { getUaeEmblem } from '../../utils/icons';

const TAG = 'aegov-header';
const ctx = (prop: string) => ({ component: TAG, prop });

/**
 * Fills for the authority variant's UAE emblem, keyed by `emblemColor`.
 *
 * The emblem is a brand mark, so its colour is chosen from this closed set of
 * palette tokens rather than inherited or freely retinted: it must not pick up
 * the page's text colour, and consumers can't push an arbitrary colour into it.
 * Applied as an inline custom property on the emblem container, which beats any
 * inherited value and is unreachable from outside the shadow root.
 *
 * Each tracks its palette token, so a global retheme still carries.
 */
const EMBLEM_COLORS: Record<HeaderEmblemColor, string> = {
  aeblack: 'var(--color-aeblack-800, oklch(29.36% 0.0112 271.01))',
  aegold: 'var(--color-aegold-600, oklch(56.32% 0.0956 83.8))',
  whitely: 'var(--color-whitely-50, oklch(100% 0 0))',
};

const STRINGS = {
  en: {
    menu: 'Menu',
    close: 'Close menu',
    gsr: (n: number) => `Global Star Rating System for Services: ${n} ${n === 1 ? 'star' : 'stars'}`,
  },
  ar: {
    menu: 'القائمة',
    close: 'إغلاق القائمة',
    // Arabic number agreement: 1 = singular, 2 = dual, 3–10 = plural.
    gsr: (n: number) => `نظام النجوم العالمي لتصنيف الخدمات: ${n === 1 ? 'نجمة واحدة' : n === 2 ? 'نجمتان' : `${n} نجوم`}`,
  },
};

/**
 * @slot logo - The entity logo or wordmark. Always rendered at the inline start of the bar and wrapped in a link to `entityDomain`.
 * @slot search - Search affordance shown at the inline end of the brand row. **Ministry variant only** — on `authority` the slot is not rendered at all and the UAE emblem takes its place. Hidden below `collapseAt`, where the menu toggle replaces it.
 * @slot navigation - Primary navigation, at the inline start of the second row. Visible from the `collapseAt` breakpoint up; the whole second row is hidden below it. Slotted content owns its own `<nav>` landmark (e.g. `aegov-navbar`) — the header does not add one.
 * @slot secondary-actions - Action buttons at the inline end of the second row. Hidden below `collapseAt` together with the navigation — repeat anything essential inside `mobile-content`.
 * @slot mobile-content - Content of the menu drawer, opened by the toggle below `lg`. Fully consumer-controlled. Navigation markup must be repeated here: a named slot's light DOM can only be projected once, so the `navigation` slot cannot also render inside the drawer.
 * @slot actions - Forwarded to the embedded `aegov-header-banner` top bar.
 */
@Component({
  tag: 'aegov-header',
  styleUrl: 'aegov-header.css',
  scoped: false,
  shadow: true
})
export class AegovHeader {
  @Element() el: HTMLElement;

  /**
   * The variant of the header. Determines the layout and style.
   * - "ministry": Header for ministry-level entities
   * - "authority": Header for authority-level entities
   */
  @Prop() variant: HeaderVariant = 'ministry';

  /** The name of the government entity. Required. Forwarded to the embedded aegov-header-banner. */
  @Prop() entityName: string;

  /** The domain/URL of the government entity. Required. Forwarded to the embedded aegov-header-banner. */
  @Prop() entityDomain: string;

  /** Forwarded to the embedded aegov-header-banner. The CSS selector or ID of the main content container to skip to (e.g. "#main-content"). When provided, the banner injects a "Skip to content" link at the top of the document body. */
  @Prop() skipContentContainer: string;

  /** Accessible name for the logo anchor. When provided, applied as aria-label on the <a> element. */
  @Prop() logoLabel?: string;

  /** Accessible name for the menu toggle, and the accessible name of the drawer it opens. Defaults to "Menu" / "القائمة". */
  @Prop() labelMenu?: string;

  /** Accessible name for the close button inside the menu drawer. Defaults to "Close menu" / "إغلاق القائمة". */
  @Prop() labelMenuClose?: string;

  /**
   * Breakpoint at which the `navigation` slot appears and the menu toggle
   * disappears. Below it, navigation is hidden and the toggle opens the drawer.
   * `"lg"` (1024px) by default; `"md"` is the narrowest allowed.
   */
  @Prop() collapseAt: HeaderCollapseBreakpoint = 'lg';

  /** Panel width of the menu drawer. Below 640px all widths collapse to full width. */
  @Prop() drawerSize: DrawerSize = 'base';

  /**
   * Colour of the UAE emblem on the `authority` variant: `"aeblack"` (default),
   * `"aegold"` or `"whitely"`. Use `"whitely"` on dark backgrounds (dark mode);
   * `"aegold"` is available to entities that show the emblem in gold. Ignored on
   * the `ministry` variant, which has no emblem.
   */
  @Prop() emblemColor: HeaderEmblemColor = 'aeblack';

  /**
   * Number of stars the entity holds in the Global Star Rating System for
   * Services: `0`–`5`. `0` (default) shows no badge. Any other value shows the
   * official badge next to the logo, vertically centred on it, with an
   * accessible name that states the rating. Its height follows the logo's,
   * clamped to 50–80px. The badge artwork is loaded on demand, so headers
   * without a rating download nothing extra.
   */
  @Prop() gsrStars: HeaderGsrStars = 0;

  /**
   * Whether the main bar pins to the top of the viewport on scroll. The
   * `aegov-header-banner` above it scrolls away; once it has, the bar gains a
   * translucent blurred background and a shadow.
   *
   * Implemented by making the host itself sticky with a negative `top` equal to
   * the banner's height — `position: sticky` on the bar alone cannot work,
   * because a sticky element is confined to its parent's box and would unstick
   * as soon as the header scrolled past. Like any sticky element, an ancestor
   * with `overflow: hidden` / `auto` in the consumer's page breaks it.
   */
  @Prop() isSticky: boolean = false;

  /** Whether the menu drawer is currently open. */
  @State() isMenuOpen: boolean = false;

  /** Whether the bar is currently pinned to the top of the viewport. */
  @State() isStuck: boolean = false;

  /**
   * Whether the viewport is at or above `collapseAt`. Sticky is gated on this:
   * below the breakpoint the navigation row does not exist, so there is nothing
   * to pin.
   */
  @State() isDesktop: boolean = true;

  /** Resolved text direction. Drives the drawer edge, which is a physical position. */
  @State() isRtlDir: boolean = false;

  /** `data:` URI of the loaded Global Star Rating badge, once its chunk has arrived. */
  @State() gsrBadgeSrc?: string;

  /** Emitted when the menu drawer has opened. */
  @Event() aegovHeaderMenuOpen: EventEmitter<void>;

  /** Emitted when the menu drawer has closed. */
  @Event() aegovHeaderMenuClose: EventEmitter<void>;

  /** Emitted when the bar pins to the top of the viewport. Only fires when `isSticky` is set. */
  @Event() aegovHeaderStuck: EventEmitter<void>;

  /** Emitted when the bar returns to its resting position. Only fires when `isSticky` is set. */
  @Event() aegovHeaderUnstuck: EventEmitter<void>;

  private drawerId = generateId('aegov-header-menu');
  private drawerEl?: HTMLAegovDrawerElement;
  private menuButtonEl?: HTMLAegovButtonElement;
  private desktopMql?: MediaQueryList;
  private stopDirWatch?: () => void;
  private bannerEl?: HTMLElement;
  private brandRowEl?: HTMLElement;
  private navRowEl?: HTMLElement;
  private stuckObserver?: IntersectionObserver;
  private sizeObserver?: ResizeObserver;
  /** Increments per badge request, so a slow load cannot overwrite a newer star count. */
  private gsrRequest = 0;
  private logoSlotEl?: HTMLSlotElement;
  private logoSizeObserver?: ResizeObserver;

  /** Open the menu drawer. */
  @Method()
  async openMenu(): Promise<void> {
    await this.drawerEl?.show();
  }

  /** Close the menu drawer. */
  @Method()
  async closeMenu(): Promise<void> {
    await this.drawerEl?.close();
  }

  /** Toggle the menu drawer. */
  @Method()
  async toggleMenu(): Promise<void> {
    await this.drawerEl?.toggle();
  }

  componentWillLoad() {
    warnIfInvalidEnumProp(this.variant, HEADER_VARIANTS, 'ministry', ctx('variant'));
    warnIfInvalidEnumProp(this.collapseAt, HEADER_COLLAPSE_BREAKPOINTS, 'lg', ctx('collapseAt'));
    warnIfInvalidEnumProp(this.drawerSize, DRAWER_SIZES, 'base', ctx('drawerSize'));
    warnIfInvalidEnumProp(this.emblemColor, HEADER_EMBLEM_COLORS, 'aeblack', ctx('emblemColor'));
    this.warnIfInvalidGsrStars(this.gsrStars);
    this.syncDir();
    // Not awaited: the header renders immediately and the badge fills its
    // reserved box when the artwork chunk arrives.
    this.loadGsrBadge();
  }

  componentDidLoad() {
    this.warnIfLogoUnlabelled();
    this.warnIfSearchIgnored();
    this.warnIfMenuEmpty();
    this.watchDesktopBreakpoint();
    this.watchDir();
    this.watchSticky();
    this.watchLogoSize();
  }

  disconnectedCallback() {
    this.unwatchLogoSize();
    this.desktopMql?.removeEventListener('change', this.handleDesktopChange);
    this.desktopMql = undefined;
    this.stopDirWatch?.();
    this.stopDirWatch = undefined;
    this.unwatchSticky();
  }

  @Watch('variant')
  onVariantChange(v: unknown) {
    warnIfInvalidEnumProp(v, HEADER_VARIANTS, 'ministry', ctx('variant'));
    this.warnIfSearchIgnored();
  }

  @Watch('drawerSize')
  onDrawerSizeChange(v: unknown) { warnIfInvalidEnumProp(v, DRAWER_SIZES, 'base', ctx('drawerSize')); }

  @Watch('emblemColor')
  onEmblemColorChange(v: unknown) { warnIfInvalidEnumProp(v, HEADER_EMBLEM_COLORS, 'aeblack', ctx('emblemColor')); }

  @Watch('gsrStars')
  onGsrStarsChange(v: unknown) {
    this.warnIfInvalidGsrStars(v);
    this.loadGsrBadge();
  }

  @Watch('isSticky')
  onIsStickyChange(isSticky: boolean) {
    if (isSticky) {
      this.watchSticky();
    } else {
      this.unwatchSticky();
      if (this.isStuck) {
        this.isStuck = false;
        this.aegovHeaderUnstuck.emit();
      }
    }
  }

  @Watch('collapseAt')
  onCollapseAtChange(v: unknown) {
    warnIfInvalidEnumProp(v, HEADER_COLLAPSE_BREAKPOINTS, 'lg', ctx('collapseAt'));
    // Re-arm the media query so the drawer still auto-closes at the new width.
    this.watchDesktopBreakpoint();
  }

  /**
   * `gsr-stars` is numeric, so the string-based enum validator does not apply.
   * Accepts numbers and numeric strings (the attribute arrives as a string).
   */
  private resolvedGsrStars(): HeaderGsrStars {
    const n = Number(this.gsrStars);
    return (HEADER_GSR_STARS as readonly number[]).includes(n) ? (n as HeaderGsrStars) : 0;
  }

  private warnIfInvalidGsrStars(v: unknown) {
    if (!Build.isDev || v === undefined || v === null || v === '') return;
    if (!(HEADER_GSR_STARS as readonly number[]).includes(Number(v))) {
      console.warn(`[aegov-header] Invalid value ${JSON.stringify(v)} for prop "gsrStars". Expected one of: ${HEADER_GSR_STARS.join(', ')}. Falling back to 0 (no badge).`);
    }
  }

  /**
   * The artwork (~40KB) lives in its own module and is imported on demand, so
   * only headers that show a rating fetch it.
   */
  private async loadGsrBadge() {
    const stars = this.resolvedGsrStars();
    const request = ++this.gsrRequest;
    if (stars === 0) {
      this.gsrBadgeSrc = undefined;
      return;
    }
    const { getGsrBadgeSvg } = await import('./gsr-badge');
    if (request !== this.gsrRequest) return;
    this.gsrBadgeSrc = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(getGsrBadgeSvg(stars))}`;
  }

  /**
   * The badge takes its height from the logo (clamped in CSS to 50–80px), so
   * the slotted logo is measured and published as
   * `--aegov-header-gsr-logo-height` on the host. CSS cannot read a sibling's
   * height, and a ResizeObserver also follows logos that change size per
   * breakpoint or finish loading late.
   */
  private watchLogoSize() {
    this.logoSlotEl = this.el.shadowRoot?.querySelector('slot[name="logo"]') as HTMLSlotElement;
    if (!this.logoSlotEl) return;
    this.logoSlotEl.addEventListener('slotchange', this.observeLogo);
    this.observeLogo();
  }

  private unwatchLogoSize() {
    this.logoSlotEl?.removeEventListener('slotchange', this.observeLogo);
    this.logoSlotEl = undefined;
    this.logoSizeObserver?.disconnect();
    this.logoSizeObserver = undefined;
  }

  private observeLogo = () => {
    this.logoSizeObserver?.disconnect();
    const logo = this.logoSlotEl?.assignedElements?.({ flatten: true })[0] as HTMLElement | undefined;
    if (!logo) {
      this.el.style.removeProperty('--aegov-header-gsr-logo-height');
      return;
    }
    const publish = () => {
      const h = logo.getBoundingClientRect().height;
      if (h > 0) this.el.style.setProperty('--aegov-header-gsr-logo-height', `${h}px`);
    };
    publish();
    if (typeof ResizeObserver !== 'undefined') {
      this.logoSizeObserver = new ResizeObserver(publish);
      this.logoSizeObserver.observe(logo);
    }
  };

  private warnIfLogoUnlabelled() {
    if (this.logoLabel) return;
    const logoSlot = this.el.querySelector('[slot="logo"]');
    const hasAlt = !!(logoSlot?.querySelector('img[alt]')?.getAttribute('alt'));
    const hasText = !!(logoSlot?.textContent?.trim());
    if (!hasAlt && !hasText) {
      console.warn('[aegov-header] Logo link has no accessible name. Provide a logoLabel prop or ensure the slotted logo has an accessible name.');
    }
  }

  private warnIfSearchIgnored() {
    if (this.variant === 'authority' && this.el.querySelector('[slot="search"]')) {
      console.warn('[aegov-header] The "search" slot is ignored on the authority variant, where the UAE emblem takes its place. Remove the slotted content or switch to variant="ministry".');
    }
  }

  private warnIfMenuEmpty() {
    if (!this.el.querySelector('[slot="mobile-content"]')) {
      console.warn('[aegov-header] No content in the "mobile-content" slot. The menu toggle shown below the lg breakpoint will open an empty drawer.');
    }
  }

  /**
   * Tracks the collapse breakpoint. Two jobs:
   * - close the drawer when the viewport grows past it, so the same links are
   *   not reachable twice;
   * - drive `isDesktop`, which gates sticky. Gating in JS rather than CSS keeps
   *   one sticky rule instead of one per breakpoint, since a runtime-built
   *   Tailwind variant would never be generated.
   */
  private watchDesktopBreakpoint() {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return;
    this.desktopMql?.removeEventListener('change', this.handleDesktopChange);
    const px = readBreakpointPx(this.resolvedCollapseAt()) ?? 1024;
    this.desktopMql = window.matchMedia(`(min-width: ${px}px)`);
    this.desktopMql.addEventListener('change', this.handleDesktopChange);
    this.isDesktop = this.desktopMql.matches;
  }

  private resolvedCollapseAt(): HeaderCollapseBreakpoint {
    return (HEADER_COLLAPSE_BREAKPOINTS as readonly string[]).includes(this.collapseAt) ? this.collapseAt : 'lg';
  }

  private handleDesktopChange = (event: MediaQueryListEvent) => {
    this.isDesktop = event.matches;
    if (event.matches && this.isMenuOpen) this.closeMenu();
    // Below the breakpoint nothing pins, so drop any stuck state on the way down.
    if (!event.matches && this.isStuck) {
      this.isStuck = false;
      this.aegovHeaderUnstuck.emit();
    }
  };

  /**
   * `aegov-drawer` takes a physical position, so the drawer edge has to be
   * recomputed whenever the effective direction changes.
   */
  private watchDir() {
    this.stopDirWatch?.();
    this.stopDirWatch = observeDir(this.syncDir);
  }

  /**
   * Sticky pins the navigation row alone: the banner and the brand row scroll
   * away above it.
   *
   * The host is what sticks, offset upward by banner + brand-row height — a
   * `position: sticky` navigation row would be confined to its parent's box and
   * unstick as soon as the header scrolled past. Keeping the host in flow means
   * no spacer and no layout jump.
   */
  private watchSticky() {
    if (!this.isSticky) return;
    this.measure();

    if (typeof ResizeObserver !== 'undefined' && !this.sizeObserver) {
      this.sizeObserver = new ResizeObserver(() => this.measure());
      if (this.bannerEl) this.sizeObserver.observe(this.bannerEl);
      if (this.brandRowEl) this.sizeObserver.observe(this.brandRowEl);
      if (this.navRowEl) this.sizeObserver.observe(this.navRowEl);
    }

    // Stuck state is derived from the brand row, which is the last thing to
    // leave the viewport before the navigation row lands at 0.
    //
    // The -1px top rootMargin is required, not cosmetic. Once stuck, the brand
    // row's bottom edge rests exactly on y=0, and that zero-area intersection
    // produces no threshold crossing — Chrome fires no entry at all, so the
    // state would never flip. Shrinking the root by 1px gives it a real margin
    // to clear. `top < 0` separates "scrolled past" from "not scrolled to yet",
    // for a header that starts below the fold.
    if (typeof IntersectionObserver !== 'undefined' && !this.stuckObserver && this.brandRowEl) {
      this.stuckObserver = new IntersectionObserver(
        (entries) => {
          const entry = entries[entries.length - 1];
          const stuck = this.isDesktop && !entry.isIntersecting && entry.boundingClientRect.top < 0;
          if (stuck === this.isStuck) return;
          this.isStuck = stuck;
          (stuck ? this.aegovHeaderStuck : this.aegovHeaderUnstuck).emit();
        },
        { threshold: 0, rootMargin: '-1px 0px 0px 0px' }
      );
      this.stuckObserver.observe(this.brandRowEl);
    }
  }

  private unwatchSticky() {
    this.stuckObserver?.disconnect();
    this.stuckObserver = undefined;
    this.sizeObserver?.disconnect();
    this.sizeObserver = undefined;
    this.el.style.removeProperty('--aegov-header-sticky-offset');
    this.el.style.removeProperty('--aegov-header-height');
  }

  private measure() {
    // Set on the host rather than through render, so a resize does not churn
    // the vdom.
    const bannerHeight = this.bannerEl?.offsetHeight ?? 0;
    const brandHeight = this.brandRowEl?.offsetHeight ?? 0;
    const navHeight = this.navRowEl?.offsetHeight ?? 0;
    // Everything above the navigation row has to clear the viewport first.
    this.el.style.setProperty('--aegov-header-sticky-offset', `${bannerHeight + brandHeight}px`);
    // The pinned row is what covers content, so that is the offset consumers need.
    this.el.style.setProperty('--aegov-header-height', `${navHeight}px`);
  }

  private syncDir = () => {
    this.isRtlDir = isRtl(this.el);
  };

  private handleToggleClick = () => {
    this.toggleMenu();
  };

  private handleCloseClick = () => {
    this.closeMenu();
  };

  /**
   * The drawer is an implementation detail, so its events are contained here
   * and re-emitted as header events.
   */
  private handleDrawerOpen = (event: CustomEvent<void>) => {
    event.stopPropagation();
    this.isMenuOpen = true;
    this.aegovHeaderMenuOpen.emit();
  };

  private handleDrawerClose = (event: CustomEvent<void>) => {
    event.stopPropagation();
    this.isMenuOpen = false;
    this.aegovHeaderMenuClose.emit();
    // The drawer restores focus to document.activeElement captured at open
    // time, which shadow retargeting reports as this host rather than the
    // toggle, so return focus to the toggle here. aegov-button's host element
    // is not focusable, hence setFocus() rather than focus().
    requestAnimationFrame(() => { this.menuButtonEl?.setFocus(); });
  };

  render() {
    const variant: HeaderVariant = (HEADER_VARIANTS as readonly string[]).includes(this.variant) ? this.variant : 'ministry';
    const drawerSize: DrawerSize = (DRAWER_SIZES as readonly string[]).includes(this.drawerSize) ? this.drawerSize : 'base';
    const collapseAt = this.resolvedCollapseAt();
    const strings = this.isRtlDir ? STRINGS.ar : STRINGS.en;
    const menuLabel = this.labelMenu || strings.menu;
    const closeLabel = this.labelMenuClose || strings.close;
    const drawerPosition = this.isRtlDir ? 'left' : 'right';
    const gsrStars = this.resolvedGsrStars();

    return (
      <Host class={{
        'header--sticky': this.isSticky && this.isDesktop,
        'header--stuck': this.isSticky && this.isDesktop && this.isStuck,
      }}>
      <header class={`aegov-header header--${variant} header--collapse-${collapseAt}`}>
        <aegov-header-banner
          ref={(el) => this.bannerEl = el as HTMLElement}
          entity-name={this.entityName}
          entity-domain={this.entityDomain}
          skip-content-container={this.skipContentContainer}
        >
          <slot name="actions" slot="actions" />
        </aegov-header-banner>

        {/* Brand row: logo (plus the Global Star Rating badge when gsrStars > 0)
            at the inline start; search (ministry) or the emblem (authority) at
            the inline end, both replaced by the menu toggle below the collapse
            breakpoint. */}
        <div class="header__brand-row" ref={(el) => this.brandRowEl = el}>
          <div class="aegov-container header__brand-bar">
            <div class="header__brand-start">
              <a class="header__logo" href={this.entityDomain} aria-label={this.logoLabel || undefined}>
                <slot name="logo" />
              </a>
              {/* Global Star Rating badge: beside the logo, never inside its
                  link, vertically centred on it. Height follows the logo,
                  clamped to 50–80px. The box is sized before the artwork
                  arrives, so loading it causes no layout shift. */}
              {gsrStars > 0 && (
                <span class="header__gsr">
                  {this.gsrBadgeSrc && (
                    <img
                      class="header__gsr-img"
                      src={this.gsrBadgeSrc}
                      alt={strings.gsr(gsrStars)}
                      width={GSR_BADGE_WIDTH}
                      height={GSR_BADGE_HEIGHT}
                      decoding="async"
                    />
                  )}
                </span>
              )}
            </div>
            <div class="header__brand-end">
              {variant === 'authority' ? (
                <div class="header__emblem" style={{ '--aegov-emblem-fill': EMBLEM_COLORS[this.emblemColor] ?? EMBLEM_COLORS.aeblack }}>
                  {getUaeEmblem()}
                </div>
              ) : (
                <div class="header__search">
                  <slot name="search" />
                </div>
              )}
              <aegov-button
                appearance="link"
                is-icon="true"
                class="header__menu-toggle"
                aria-expanded={this.isMenuOpen ? 'true' : 'false'}
                aria-controls={this.drawerId}
                aria-label={menuLabel}
                onClick={this.handleToggleClick}
                ref={(el) => this.menuButtonEl = el as HTMLAegovButtonElement}
              >
                {this.isMenuOpen ? (
                  <svg class="size-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><line x1="200" y1="56" x2="56" y2="200" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="200" y1="200" x2="56" y2="56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                ) : (
                  <svg class="size-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="16"/><circle cx="60" cy="128" r="16"/><circle cx="196" cy="128" r="16"/></svg>
                )}
              </aegov-button>
            </div>
          </div>
        </div>

        {/* Navigation row: nav at the inline start, actions at the inline end.
            Hidden as a whole below the collapse breakpoint, and the only part
            that pins when isSticky is set. */}
        <div class="header__nav-row" ref={(el) => this.navRowEl = el}>
          <div class="aegov-container header__nav-bar">
            <div class="header__nav">
              <slot name="navigation" />
            </div>
            <div class="header__actions">
              <slot name="secondary-actions" />
            </div>
          </div>
        </div>

        <aegov-drawer
          class="header__drawer"
          field-id={this.drawerId}
          animation="slide"
          is-portal="false"
          position={drawerPosition}
          size={drawerSize}
          label={menuLabel}
          ref={(el) => this.drawerEl = el as HTMLAegovDrawerElement}
          onAegovDrawerOpen={this.handleDrawerOpen}
          onAegovDrawerClose={this.handleDrawerClose}
        >
          <div class="header__drawer-head">
            <aegov-button
              is-icon="true"
              appearance="link"
              class="header__drawer-close"
              aria-label={closeLabel}
              onClick={this.handleCloseClick}
            >
              <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none" /><line x1="200" y1="56" x2="56" y2="200" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24" /><line x1="200" y1="200" x2="56" y2="56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24" /></svg>
            </aegov-button>
          </div>
          <slot name="mobile-content" />
        </aegov-drawer>
      </header>
      </Host>
    );
  }
}
