import { Component, Element, Host, Prop, Watch, h } from '@stencil/core';
import { FOOTER_NAV_VARIANTS } from '../../utils/types';
import type { FooterNavVariant } from '../../utils/types';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { isRtl } from '../../utils/rtl';
import { generateId } from '../../utils/id-generator';

const TAG = 'aegov-footer';
const ctx = (prop: string) => ({ component: TAG, prop });

/**
 * Matches the `sm` breakpoint token — the point at which columns stop being
 * collapsible, not the point at which they switch to a 4-up grid (that's
 * `lg`, handled entirely by CSS and unrelated to this). Confirmed against
 * the reference footer block: below 640px it's a 1-column accordion; at
 * 640px it's already a fully-expanded 2-column grid, well before the 4-up
 * grid kicks in at 1024px.
 */
function readSmBreakpointPx(): number {
  if (typeof document !== 'undefined') {
    const raw = getComputedStyle(document.documentElement).getPropertyValue('--breakpoint-sm').trim();
    const px = parseFloat(raw);
    if (Number.isFinite(px)) return px;
  }
  return 640;
}

const STRINGS = {
  en: {
    navLabel: 'Footer navigation',
  },
  ar: {
    navLabel: 'التنقل في التذييل',
  },
};

/**
 * @component aegov-footer
 * @description Full-width government website footer. Internally embeds
 * `aegov-footer-highlights` as its hero row (same relationship
 * `aegov-header` has with `aegov-header-banner`) — the `highlights` slot is
 * forwarded straight through to it (a plain slot with no chrome of its own;
 * the author's own slotted markup owns background/shadow/radius/padding
 * alike), and the `entity-contact-*` props below are forwarded to its own
 * identically-named props. Below that: a brand
 * column (logo, description, social links — entirely author-provided via
 * the `brand` slot) alongside an open slot for author-written link columns
 * — each authored as PLAIN HTML: a title element (any tag — `<h2>`–`<h6>`
 * recommended) as the group's first child, followed by the rest of the
 * column's content (typically a `<ul>`). No button, no disclosure markup,
 * no special classes beyond `.aegov-footer__group` — the component
 * synthesizes a trigger button around the title's own content only when a
 * column genuinely needs to be toggleable (below `sm`, with
 * `nav-variant="collapsible"`), and unwraps it completely otherwise, so an
 * author never has to reason about interactivity that doesn't apply to their
 * content. This also means no button exists in the DOM at all outside that
 * one state — not hidden, not neutralized, never created — which is what
 * makes the title read as a plain heading to assistive tech everywhere else
 * (confirmed with real VoiceOver testing; reassigning ARIA roles on a
 * still-focusable element does not reliably suppress its native role, per
 * WAI-ARIA's Presentational Roles Conflict Resolution rule). Also renders a
 * bottom bar for copyright + legal links.
 *
 * @slot highlights - Forwarded to the embedded `aegov-footer-highlights`'s own default slot (its start-side card content, e.g. a newsletter form or app-download links).
 * @slot brand - Logo, description, and social links for the first column above the nav groups.
 * @slot - Footer link columns. Each column: `<div class="aegov-footer__group">
 * <h2>Title</h2><ul>…</ul></div>`.
 * @slot copyright - Copyright / last-updated text in the bottom bar.
 * @slot legal - Legal links (privacy policy, accessibility statement, etc.) in the bottom bar. One wrapper, plain links — no `<li>` needed: `<div slot="legal"><a href="…">…</a><a href="…">…</a></div>`. The component wraps each `<a>` in a real `<li>` and turns the wrapper into a `<ul role="list">` itself; structure and styling are entirely managed by the design system.
 *
 * @example
 * <aegov-footer nav-variant="collapsible" entity-contact-number="800 8877" entity-email="info@example.gov.ae">
 *   <div slot="highlights">
 *     <div class="rounded-xl shadow-lg bg-primary-900 dark:bg-primary-950 p-6 sm:p-8">
 *       <p>Sign up for updates.</p>
 *     </div>
 *   </div>
 *   <div slot="brand">
 *     <span>Example Entity</span>
 *     <p>An entity of the UAE Federal Government.</p>
 *     <a href="https://facebook.com/example"><span class="sr-only">Facebook</span>…</a>
 *   </div>
 *   <div class="aegov-footer__group">
 *     <h2>The Ministry</h2>
 *     <ul role="list"><li><a href="/about">About the ministry</a></li></ul>
 *   </div>
 *   <p slot="copyright">© 2026. Ministry of Example. All rights reserved.</p>
 *   <div slot="legal">
 *     <a href="/privacy">Privacy policy</a>
 *     <a href="/accessibility-statement">Accessibility statement</a>
 *   </div>
 * </aegov-footer>
 */
@Component({
  tag: 'aegov-footer',
  styleUrl: 'aegov-footer.css',
  scoped: false,
})
export class AegovFooter {
  @Element() el!: HTMLElement;

  /**
   * Controls how footer link columns behave below the `sm` breakpoint (640px)
   * — the point at which the reference footer block stops being collapsible
   * altogether, well before the grid switches from 2 to 4 columns at `lg`.
   * - "collapsible" (default): each column's content toggles below `sm`, always expanded at `sm+`.
   * - "flat": columns are always expanded, at every breakpoint.
   * Author each column as a plain title element + content — no extra markup needed for either value.
   */
  @Prop() navVariant: FooterNavVariant = 'collapsible';

  /** Forwarded to the embedded `aegov-footer-highlights`. */
  @Prop() entityContactNumber?: string;

  /** Forwarded to the embedded `aegov-footer-highlights`. */
  @Prop() entityContactNumberLabel?: string;

  /** Forwarded to the embedded `aegov-footer-highlights`. */
  @Prop() entityEmail?: string;

  /** Forwarded to the embedded `aegov-footer-highlights`. */
  @Prop() entityEmailLabel?: string;

  /** Forwarded to the embedded `aegov-footer-highlights`. */
  @Prop() entityContactHref?: string;

  private _isAboveMobile = false;
  private _mql: MediaQueryList | null = null;

  componentWillLoad() {
    warnIfInvalidEnumProp(this.navVariant, FOOTER_NAV_VARIANTS, 'collapsible', ctx('navVariant'));

    // matchMedia is unavailable in some test/SSR environments — degrade to
    // "mobile" (collapsible, interactive) rather than throwing.
    if (typeof window !== 'undefined' && typeof window.matchMedia === 'function') {
      this._mql = window.matchMedia(`(min-width: ${readSmBreakpointPx()}px)`);
      this._isAboveMobile = this._mql.matches;
      this._mql.addEventListener('change', this.handleBreakpointChange);
    }
    this.syncGroups();
    this.syncLegalLinks();

    // Attached here rather than componentDidLoad so the click-block is in
    // place before the first paint, not after it — closes the (tiny) window
    // where a click could toggle a group before we've forbidden it.
    this.el.addEventListener('click', this.handleGroupClick);
  }

  componentDidLoad() {
    this.warnIfBrandLinksMissingAccessibleName();
  }

  disconnectedCallback() {
    this._mql?.removeEventListener('change', this.handleBreakpointChange);
    this._mql = null;
    this.el.removeEventListener('click', this.handleGroupClick);
  }

  private handleBreakpointChange = (event: MediaQueryListEvent) => {
    this._isAboveMobile = event.matches;
    this.syncGroups();
  };

  /**
   * Icon-only social links in the `brand` slot are author-owned markup the
   * component can't add labels to itself — warn (matches aegov-header's
   * unlabeled-logo check) so a missing accessible name is caught in dev
   * rather than shipped silently.
   */
  private warnIfBrandLinksMissingAccessibleName() {
    const links = Array.from(this.el.querySelectorAll('[slot="brand"] a'));
    links.forEach(link => {
      const hasAriaLabel = !!link.getAttribute('aria-label')?.trim();
      const hasAriaLabelledby = !!link.getAttribute('aria-labelledby')?.trim();
      const hasText = !!link.textContent?.trim();
      const hasImgAlt = !!link.querySelector('img[alt]')?.getAttribute('alt')?.trim();
      if (!hasAriaLabel && !hasAriaLabelledby && !hasText && !hasImgAlt) {
        console.warn(
          '[aegov-footer] A "brand" slot link has no accessible name. Add an aria-label, ' +
            'or an .sr-only text span, so screen reader users know what the icon links to.',
        );
      }
    });
  }

  @Watch('navVariant')
  onNavVariantChange(v: unknown) {
    warnIfInvalidEnumProp(v, FOOTER_NAV_VARIANTS, 'collapsible', ctx('navVariant'));
    this.syncGroups();
  }

  /** `true` when a footer group's synthesized trigger should respond to the visitor. */
  private allowsToggle(): boolean {
    return this.navVariant === 'collapsible' && !this._isAboveMobile;
  }

  /**
   * Wire each `.aegov-footer__group` and set its interactive-vs-static state.
   * The author writes only a plain title element (first child, any tag) plus
   * the rest of the column's content — no button, no disclosure markup.
   *
   * Interactive (below `sm` + "collapsible"): a `<button>` is synthesized
   * around the title's own child nodes (preserving whatever the author put
   * there exactly — plain text or nested markup), and everything after the
   * title is moved once into an auto-created panel wrapper. Non-interactive
   * (`sm` and up, or "flat"): that button is unwrapped again — its children
   * moved back into the plain title element and the button itself removed —
   * so there is no button anywhere in the DOM outside the one state that
   * genuinely needs it. Not hidden, not neutralized: never created.
   *
   * This is deliberate, not incidental: an earlier version tried reassigning
   * ARIA roles on a still-focusable button instead (`role="presentation"` +
   * `tabindex="-1"`), and real VoiceOver testing showed it still announcing
   * "button" — WAI-ARIA's Presentational Roles Conflict Resolution rule
   * requires user agents to fall back to native semantics on anything
   * focusable, so there's no attribute combination that fixes that. Only
   * genuinely not having a button avoids it.
   *
   * The moment a group's trigger is created (not the first time syncGroups()
   * runs — a page that loads non-interactive and is later resized down to
   * mobile creates triggers for the first time well after startup), the
   * first column defaults open and the rest closed, matching the reference
   * footer block. Once a trigger already exists, its own `aria-expanded`
   * state is preserved across re-syncs instead.
   */
  private syncGroups() {
    const groups = Array.from(this.el.querySelectorAll('.aegov-footer__group'));
    const interactive = this.allowsToggle();

    groups.forEach((group, index) => {
      const title = group.firstElementChild as HTMLElement | null;
      if (!title) return;
      const panel = this.ensurePanel(group, title);
      const existingTrigger = Array.from(title.children).find(c => c.classList.contains('aegov-footer__group-trigger'));

      if (interactive) {
        const isNewTrigger = !existingTrigger;
        const trigger = (existingTrigger as HTMLButtonElement) ?? this.wrapTitleInTrigger(title);
        if (!trigger.id) trigger.id = generateId('aegov-footer-trigger');
        if (!panel.id) panel.id = generateId('aegov-footer-panel');
        panel.setAttribute('role', 'region');
        panel.setAttribute('aria-labelledby', trigger.id);
        trigger.setAttribute('aria-controls', panel.id);
        // Matches the reference footer block: the first column starts open,
        // the rest closed — not everything closed, and not everything open.
        // Keyed on whether THIS trigger is newly created, not on whether
        // syncGroups() has run before — a page that loads non-interactive
        // (e.g. desktop-first, then resized down to mobile) must still open
        // the first column the moment its trigger is actually created,
        // rather than reading aria-expanded off a button that never existed.
        const open = isNewTrigger ? index === 0 : trigger.getAttribute('aria-expanded') === 'true';
        this.setGroupOpen(trigger, panel, open);
      } else {
        if (existingTrigger) this.unwrapTrigger(title, existingTrigger as HTMLButtonElement);
        panel.removeAttribute('hidden');
        panel.removeAttribute('role');
        panel.removeAttribute('aria-labelledby');
      }
    });
  }

  /** Move everything after the title into a single auto-created panel (once). */
  private ensurePanel(group: Element, title: HTMLElement): HTMLElement {
    const existing = Array.from(group.children).find(c => c.classList.contains('aegov-footer__group-panel'));
    if (existing) return existing as HTMLElement;

    const panel = document.createElement('div');
    panel.className = 'aegov-footer__group-panel';
    let node = title.nextSibling;
    while (node) {
      const next = node.nextSibling;
      panel.appendChild(node);
      node = next;
    }
    group.appendChild(panel);
    return panel;
  }

  /** Move the title's own child nodes into a new button, preserving them exactly. */
  private wrapTitleInTrigger(title: HTMLElement): HTMLButtonElement {
    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.className = 'aegov-footer__group-trigger';
    while (title.firstChild) trigger.appendChild(title.firstChild);
    title.appendChild(trigger);
    return trigger;
  }

  /** Reverse of wrapTitleInTrigger — move the button's children back and remove it. */
  private unwrapTrigger(title: HTMLElement, trigger: HTMLButtonElement) {
    while (trigger.firstChild) title.appendChild(trigger.firstChild);
    trigger.remove();
  }

  private setGroupOpen(trigger: HTMLElement, panel: HTMLElement, open: boolean) {
    trigger.setAttribute('aria-expanded', open ? 'true' : 'false');
    if (open) panel.removeAttribute('hidden');
    else panel.setAttribute('hidden', '');
  }

  /**
   * The author writes one plain wrapper — `<div slot="legal"><a>…</a><a>…</a></div>` —
   * no `<li>` needed. This wraps each `<a>` in a real `<li>` and replaces the
   * author's wrapper with a `<ul>` carrying the same `slot="legal"` attribute
   * (so it still lands in the same spot), giving the legal links genuine list
   * semantics without asking the author for any extra markup. Same synthesis
   * pattern as the trigger/panel above — just run once, since unlike those,
   * nothing here needs to react to breakpoint or nav-variant changes.
   */
  private syncLegalLinks() {
    const authored = this.el.querySelector('[slot="legal"]');
    if (!authored || authored.tagName === 'UL') return;

    const links = Array.from(authored.children).filter(c => c.tagName === 'A');
    if (links.length === 0) return;

    const list = document.createElement('ul');
    list.className = 'aegov-footer__legal';
    list.setAttribute('slot', 'legal');
    list.setAttribute('role', 'list');
    links.forEach(link => {
      const item = document.createElement('li');
      item.appendChild(link);
      list.appendChild(item);
    });
    authored.parentNode?.replaceChild(list, authored);
  }

  /**
   * The actual toggle mechanism — a plain `<button>` has no native disclosure
   * behavior of its own (unlike `<details>/<summary>`). When non-interactive
   * the trigger doesn't exist at all, so this is only ever reachable when
   * toggling is genuinely allowed.
   */
  private handleGroupClick = (event: MouseEvent) => {
    if (!this.allowsToggle()) return;
    const trigger = (event.target as HTMLElement).closest?.('.aegov-footer__group-trigger') as HTMLElement | null;
    if (!trigger) return;
    const group = trigger.closest('.aegov-footer__group');
    const panel = group?.querySelector('.aegov-footer__group-panel') as HTMLElement | null;
    if (!panel) return;
    this.setGroupOpen(trigger, panel, trigger.getAttribute('aria-expanded') !== 'true');
  };

  render() {
    const rtl = isRtl(this.el);
    const s = rtl ? STRINGS.ar : STRINGS.en;
    const navVariant: FooterNavVariant = (FOOTER_NAV_VARIANTS as readonly string[]).includes(this.navVariant)
      ? this.navVariant
      : 'collapsible';

    return (
      <Host>
        <footer class="aegov-footer">
          <aegov-footer-highlights
            entity-contact-number={this.entityContactNumber}
            entity-contact-number-label={this.entityContactNumberLabel}
            entity-email={this.entityEmail}
            entity-email-label={this.entityEmailLabel}
            entity-contact-href={this.entityContactHref}
          >
            <slot name="highlights" />
          </aegov-footer-highlights>

          <div class="aegov-footer__main aegov-container">
            <div class="aegov-footer__columns">
              <div class="aegov-footer__brand">
                <slot name="brand"></slot>
              </div>
              <nav class={`aegov-footer__nav footer--${navVariant}`} aria-label={s.navLabel}>
                <slot></slot>
              </nav>
            </div>
          </div>

          <div class="aegov-footer__bottom aegov-container">
            <div class="aegov-footer__copyright">
              <slot name="copyright"></slot>
            </div>
            <slot name="legal"></slot>
          </div>
        </footer>
      </Host>
    );
  }
}
