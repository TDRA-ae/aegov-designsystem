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

/**
 * The official Tawasul 171 logo, inlined rather than loaded as an asset file
 * (consistent with every other icon in this component). Colors are direct
 * `fill`/`stroke` attributes on each path rather than the source file's
 * `class="cls-N"` + `<style>` block — this component is `scoped: false`, so
 * generic class names like `cls-1` would leak into the page's global CSS
 * scope and could collide with an unrelated element using the same name
 * elsewhere on the consumer's page. Purely decorative (`aria-hidden` where
 * used) — the "171" and "Tawasul"/"تواصل" it depicts are already announced
 * via the tel: link text and the sr-only label next to it.
 */
const TAWASUL_LOGO_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 146.09 66.06"><path fill="#141818" d="M46.72,65.62l-.16-27.41H42.27l.11,27.41h4.34Z"/>
<path fill="#ff2f1b" d="M29.86,62.94h1v2.43h-1Z"/>
<path fill="#ff2f1b" d="M33.66,63.19h.8v2.28h-.8Z"/>
<path fill="#ff2f1b" d="M37.33,63.19l0,2.19h.79l0-2.2h-.79Z"/>
<path fill="#ff2f1b" d="M26.49,64.72l.77.17.53-2.42L27,62.3Z"/>
<path fill="#ff2f1b" d="M23.21,63.86l.75.24.8-2.54L24,61.32Z"/>
<path fill="#ff2f1b" d="M20,62.7l.73.31,1.11-2.6-.73-.31Z"/>
<path fill="#ff2f1b" d="M16.92,61.13l.7.37L19,58.88l-.7-.37-1.41,2.62Z"/>
<path fill="#ff2f1b" d="M14.05,59.3l.65.44,1.76-2.59-.65-.44Z"/>
<path fill="#ff2f1b" d="M11.34,57.08l.6.52,2.14-2.48-.6-.51-2.14,2.48Z"/>
<path fill="#ff2f1b" d="M8.92,54.84l.54.57L12,53l-.54-.57Z"/>
<path fill="#44a845" d="M6.82,52.08l.48.63,2.81-2.12L9.64,50,6.83,52.08Z"/>
<path fill="#44a845" d="M5,49.26l.41.67L8.57,48l-.41-.67Z"/>
<path fill="#44a845" d="M3.34,46.21l.33.71L7.2,45.27l-.33-.71Z"/>
<path fill="#44a845" d="M2.13,43.07l.26.74,3.82-1.32L6,41.75Z"/>
<path fill="#44a845" d="M1.22,39.82l.19.76,4.06-1-.19-.76-4.06,1Z"/>
<path fill="#44a845" d="M.67,36.49l.1.78,4.38-.57-.1-.78Z"/>
<path fill="#44a845" d="M.5,33.08l0,.79,4.6-.14,0-.79Z"/>
<path fill="#44a845" d="M.58,30.47l4.68.3,0-.79-4.68-.3-.05.78Z"/>
<path fill="#44a845" d="M1,27l4.73.9.15-.77-4.73-.9Z"/>
<path fill="#44a845" d="M1.85,23.69l4.72,1.42.23-.75L2.08,23l-.23.75Z"/>
<path fill="#44a845" d="M2.9,20.5l4.75,2,.3-.73-4.75-2Z"/>
<path fill="#44a845" d="M4.38,17.44,9,20l.38-.69L4.76,16.75Z"/>
<path fill="#44a845" d="M6.16,14.54l4.5,3,.43-.66-4.5-3Z"/>
<path fill="#44a845" d="M8.28,11.79l4.2,3.61.52-.59L8.8,11.2l-.51.59Z"/>
<path fill="#44a845" d="M10.65,9.3l4,4.08.57-.55-4-4.08-.57.54Z"/>
<path fill="#141818" d="M13.14,7.15l3.63,4.63.62-.48L13.76,6.66l-.62.48Z"/>
<path fill="#141818" d="M16,5.17l3.19,5.12.67-.41L16.66,4.76Z"/>
<path fill="#141818" d="M19,3.55l2.66,5.57.71-.34L19.67,3.21Z"/>
<path fill="#141818" d="M22.07,2.26l2.13,6L25,8,22.82,2l-.74.26Z"/>
<path fill="#141818" d="M25.36,1.29,27,7.56l.76-.2L26.12,1.1l-.77.19Z"/>
<path fill="#141818" d="M28.73.65l.84,6.56.78-.1L29.5.54l-.78.1Z"/>
<path fill="#141818" d="M32.14.32l.17,6.82.79,0L32.94.3l-.79,0Z"/>
<path fill="#141818" d="M35,7.36l.79.07L36.36.49,35.57.42Z"/>
<path fill="#141818" d="M37.62,7.84,38.4,8l1.36-7L39,.85l-1.36,7Z"/>
<path fill="#141818" d="M40.16,8.58l.76.23,2.09-7-.76-.22-2.09,7Z"/>
<path fill="#141818" d="M42.61,9.57l.72.31L46.24,3l-.73-.31L42.6,9.57Z"/>
<path fill="#141818" d="M44.93,10.85l.69.38L49.3,4.49l-.69-.37-3.68,6.74Z"/>
<path fill="#141818" d="M47.11,12.38l.65.45L52.21,6.4,51.56,6Z"/>
<path fill="#ff2f1b" d="M49.23,14.17l.6.51,5.17-6-.6-.51Z"/>
<path fill="#ff2f1b" d="M51,16l.55.57L57.37,11l-.55-.57Z"/>
<path fill="#ff2f1b" d="M56.7,29.86l.1.78,8.87-1.17-.1-.78L56.7,29.87Z"/>
<path fill="#ff2f1b" d="M56.29,27.22l.19.76L65,25.89l-.19-.76Z"/>
<path fill="#ff2f1b" d="M55.68,24.74l.26.74,8.19-2.86-.26-.74Z"/>
<path fill="#ff2f1b" d="M54.86,22.45l.34.71L63,19.45l-.34-.71Z"/>
<path fill="#ff2f1b" d="M53.77,20.1l.41.67,7.24-4.37L61,15.73Z"/>
<path fill="#ff2f1b" d="M52.47,18l.49.62,6.58-5.08-.48-.62L52.48,18Z"/>
<path fill="#141818" d="M52,38.28v4.14H63.77L50.51,65.72h5.1l13-23.27V38.28Z"/>
<path fill="#141818" d="M77,65.7l-.16-27.41H72.57l.11,27.41Z"/>
<path fill="#141818" d="M84.2,56.15v.79h3.16v9h.85v-9h3.17v-.79Z"/>
<path fill="#141818" fill-rule="evenodd" d="M99.24,65.94h-.91l-1.22-3.35h-3.9L92,65.94h-.85l3.5-9.79h.93ZM96,59.4c-.42-1.14-.69-1.87-.83-2.32-.17.54-.5,1.47-.93,2.73l-.68,2h3.33L96,59.4Z"/>
<path fill="#141818" d="M110.73,56.15v0c-.25.84-.6,2.05-1,3.33-.62,2.11-1.26,4.28-1.5,5.27-.23-1-1.11-4.33-1.77-6.83-.18-.68-.34-1.29-.46-1.77v0h-.9v0c-.31,1.16-.78,2.86-1.24,4.52s-.94,3.4-1.11,4.09c-.32-1.47-1.62-6.34-2.23-8.61v0h-.87l2.63,9.75v0h.91v0c.14-.48.31-1.05.49-1.68.67-2.39,1.58-5.61,1.85-6.83.29,1.29,1.6,6.29,2.2,8.51v0h.92l2.89-9.72,0-.07Z"/>
<path fill="#141818" fill-rule="evenodd" d="M120,65.94h-.91l-1.22-3.35H114l-1.2,3.35h-.85l3.5-9.79h.93Zm-3.29-6.55c-.42-1.13-.68-1.85-.83-2.3-.17.54-.5,1.47-.93,2.73l-.68,2h3.33c-.35-1-.64-1.75-.89-2.4Z"/>
<path fill="#141818" d="M125.05,60.36c-1.8-.46-2.32-.88-2.32-1.87s.75-1.68,2-1.68a2.08,2.08,0,0,1,2.31,1.74v0H128v-.06a2.82,2.82,0,0,0-.82-1.71,3.2,3.2,0,0,0-2.3-.81c-2.19,0-3,1.36-3,2.51,0,1.37.78,2.08,2.89,2.63s2.51,1.22,2.51,2.24c0,1.2-.85,1.89-2.33,1.89a2.37,2.37,0,0,1-2.62-2v0h-.86v.06a3.18,3.18,0,0,0,3.45,2.76,3.53,3.53,0,0,0,2.45-.81,2.55,2.55,0,0,0,.79-1.9c0-1.14-.37-2.29-3.08-3Z"/>
<path fill="#141818" d="M136.54,56.15v5.92c0,2.2-.83,3.19-2.69,3.19-1.23,0-2.69-.55-2.69-3.19V56.15h-.86v6c0,3.52,2.46,3.9,3.52,3.9,2.37,0,3.57-1.35,3.57-4V56.15Z"/>
<path fill="#44a845" stroke="#44a845" stroke-width="2px" d="M84.22,48h18.59v.66H84.22Z"/>
<path fill="#44a845" stroke="#44a845" stroke-width="2px" d="M84.22,48.71h18.59v-.66H84.22Z"/>
<path fill="#141818" d="M143.69,41.43a.61.61,0,0,0,.45-.17.63.63,0,0,0,0-.86.63.63,0,0,0-.45-.17.64.64,0,0,0-.45.17.63.63,0,0,0,0,.86A.61.61,0,0,0,143.69,41.43Z"/>
<path fill="#141818" d="M145.54,40.4a.68.68,0,0,0-.9,0,.63.63,0,0,0,0,.86.68.68,0,0,0,.9,0,.63.63,0,0,0,0-.86Z"/>
<path fill="#141818" fill-rule="evenodd" d="M131.17,46.16a5.5,5.5,0,0,1-.14,1.32,2,2,0,0,1-.5.93,2,2,0,0,1-.93.51,5.35,5.35,0,0,1-1.37.15h-6.87A.74.74,0,0,1,121,49a.38.38,0,0,1-.2-.37.39.39,0,0,1,.2-.37.9.9,0,0,1,.36-.06h1.48V43.12a.32.32,0,0,1,0-.12h.81a.71.71,0,0,1,0,.12v3.21l.34-.62a7.93,7.93,0,0,1,1.06-1.45,5.89,5.89,0,0,1,1.37-1.13,3.32,3.32,0,0,1,1.73-.46,2.9,2.9,0,0,1,1.14.22,2.71,2.71,0,0,1,.95.66,3,3,0,0,1,.64,1.1,4.69,4.69,0,0,1,.23,1.53Zm-.88.09a4.22,4.22,0,0,0-.17-1.26,2.56,2.56,0,0,0-.44-.84,1.58,1.58,0,0,0-.63-.46,2.18,2.18,0,0,0-.82-.15,2.76,2.76,0,0,0-1.54.46,5.37,5.37,0,0,0-1.27,1.21,9.73,9.73,0,0,0-1,1.61c-.24.48-.45.94-.64,1.36h4.8a1.66,1.66,0,0,0,1.32-.44,2.38,2.38,0,0,0,.38-1.51Z"/>
<path fill="#141818" d="M133.82,48.74V38.68a.32.32,0,0,0-.1-.24.3.3,0,0,0-.25-.06l-.22,0a.33.33,0,0,0-.28.37v10Z"/>
<path fill="#141818" fill-rule="evenodd" d="M144.8,43.24v4.14a1.7,1.7,0,0,1-.43,1.26,1.79,1.79,0,0,1-1.32.43h-2.53a4,4,0,0,1-.44,1,4.48,4.48,0,0,1-.69.87,5.17,5.17,0,0,1-.8.67H137a.37.37,0,0,1,.18-.17c.29-.17.55-.33.79-.5a5.37,5.37,0,0,0,.7-.56,4.32,4.32,0,0,0,.58-.68,3.41,3.41,0,0,0,.32-.6h-1a3.57,3.57,0,0,1-1.39-.24,2.33,2.33,0,0,1-.91-.67,2.66,2.66,0,0,1-.47-1,5.55,5.55,0,0,1-.14-1.27,3.48,3.48,0,0,1,.68-2.24,2.35,2.35,0,0,1,1.93-.86,2.43,2.43,0,0,1,1.83.73,3.12,3.12,0,0,1,.7,2.21v1.36q0,.39,0,.72c0,.14,0,.27-.05.39h2.12a2.78,2.78,0,0,0,.64-.06.48.48,0,0,0,.29-.16.75.75,0,0,0,.15-.36,4.43,4.43,0,0,0,.05-.71V43.21h.85Zm-4.86,2.47a3.31,3.31,0,0,0-.09-.77,2.08,2.08,0,0,0-.26-.67,1.33,1.33,0,0,0-.49-.45,1.72,1.72,0,0,0-.8-.17,1.64,1.64,0,0,0-1.29.52,2.46,2.46,0,0,0-.49,1.68,4.66,4.66,0,0,0,.12,1.15,1.59,1.59,0,0,0,.35.7,1.43,1.43,0,0,0,.62.37,3.6,3.6,0,0,0,1,.12h1.19a6.74,6.74,0,0,0,.12-1.32V45.71Z"/>
<path fill="#141818" d="M120.14,48.19h-8V38.65a.24.24,0,0,0-.1-.22.23.23,0,0,0-.21,0l-.29,0h0a.34.34,0,0,0-.2.33V48.3a3.63,3.63,0,0,1-.66,2.36,2.71,2.71,0,0,1-2.19.78,3,3,0,0,1-2.07-.69,2.67,2.67,0,0,1-.76-2.08,4.78,4.78,0,0,1,.14-1.08,6,6,0,0,1,.38-1.1l-.84-.21a5.93,5.93,0,0,0-.41,1.18,5.21,5.21,0,0,0-.14,1.2,3.62,3.62,0,0,0,1,2.65,3.68,3.68,0,0,0,2.75,1,3.88,3.88,0,0,0,2.6-.83,3.43,3.43,0,0,0,1.07-2.38h11v-.88h-3Z"/>
<path fill="#141818" d="M146.09,65.14h-4.8v-9h-.83v9.79h5.63Z"/></svg>`;

const STRINGS = {
  en: {
    navLabel: 'Footer navigation',
    tawasul: 'Tawasul',
    call: 'Call',
    whatsapp: 'WhatsApp',
    tollFree: 'Toll free',
  },
  ar: {
    navLabel: 'التنقل في التذييل',
    tawasul: 'تواصل',
    call: 'اتصال',
    whatsapp: 'واتساب',
    tollFree: 'الرقم المجاني',
  },
};

/**
 * @component aegov-footer
 * @description Full-width government website footer. Holds an open slot for
 * author-written link columns — each authored as PLAIN HTML: a title element
 * (any tag — `<h2>`–`<h6>` recommended) as the group's first child, followed
 * by the rest of the column's content (typically a `<ul>`). No button, no
 * disclosure markup, no special classes beyond `.aegov-footer__group` — the
 * component synthesizes a trigger button around the title's own content only
 * when a column genuinely needs to be toggleable (below `sm`, with
 * `nav-variant="collapsible"`), and unwraps it completely otherwise, so an
 * author never has to reason about interactivity that doesn't apply to their
 * content. This also means no button exists in the DOM at all outside that
 * one state — not hidden, not neutralized, never created — which is what
 * makes the title read as a plain heading to assistive tech everywhere else
 * (confirmed with real VoiceOver testing; reassigning ARIA roles on a
 * still-focusable element does not reliably suppress its native role, per
 * WAI-ARIA's Presentational Roles Conflict Resolution rule). Also renders a
 * fixed bilingual Tawasul contact block and a bottom bar for copyright +
 * social actions.
 *
 * @slot - Footer link columns. Each column: `<div class="aegov-footer__group">
 * <h2>Title</h2><ul>…</ul></div>`.
 * @slot copyright - Copyright / last-updated text in the bottom bar.
 * @slot actions - Social links in the bottom bar.
 *
 * @example
 * <aegov-footer nav-variant="collapsible">
 *   <div class="aegov-footer__group">
 *     <h2>The Ministry</h2>
 *     <ul role="list"><li><a href="/about">About the ministry</a></li></ul>
 *   </div>
 *   <p slot="copyright">© 2026. Ministry of Example. All rights reserved.</p>
 *   <a slot="actions" href="https://facebook.com/example"><span class="sr-only">Facebook</span>…</a>
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

  /**
   * The entity's own toll-free number (e.g. "600 522222"), shown as its own
   * line below the fixed logo/171/WhatsApp block — per the design system
   * guidance that "the entity's toll-free contact number must be below the
   * '171 tawasul' container". Entirely optional and site-specific, so
   * nothing renders unless it's provided — there is no fixed Tawasul
   * toll-free number of its own to fall back to.
   */
  @Prop() entityTollFree?: string;

  /**
   * Overrides the label shown before `entityTollFree` (defaults to the same
   * bilingual "Toll free"/"الرقم المجاني" text used elsewhere in the block).
   */
  @Prop() entityTollFreeLabel?: string;

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

    // Attached here rather than componentDidLoad so the click-block is in
    // place before the first paint, not after it — closes the (tiny) window
    // where a click could toggle a group before we've forbidden it.
    this.el.addEventListener('click', this.handleGroupClick);
  }

  componentDidLoad() {
    this.warnIfActionsMissingAccessibleName();
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
   * Icon-only social links in the `actions` slot are author-owned markup the
   * component can't add labels to itself — warn (matches aegov-header's
   * unlabeled-logo check) so a missing accessible name is caught in dev
   * rather than shipped silently.
   */
  private warnIfActionsMissingAccessibleName() {
    const links = Array.from(this.el.querySelectorAll('[slot="actions"]'));
    links.forEach(link => {
      const hasAriaLabel = !!link.getAttribute('aria-label')?.trim();
      const hasAriaLabelledby = !!link.getAttribute('aria-labelledby')?.trim();
      const hasText = !!link.textContent?.trim();
      const hasImgAlt = !!link.querySelector('img[alt]')?.getAttribute('alt')?.trim();
      if (!hasAriaLabel && !hasAriaLabelledby && !hasText && !hasImgAlt) {
        console.warn(
          '[aegov-footer] An "actions" slot link has no accessible name. Add an aria-label, ' +
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

  /** Strips everything but digits/`+` from a displayed number to build a valid `tel:` URI. */
  private phoneHref(number: string): string {
    return `tel:${number.replace(/[^\d+]/g, '')}`;
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
          <div class="aegov-footer__main aegov-container">
            <nav class={`aegov-footer__nav footer--${navVariant}`} aria-label={s.navLabel}>
              <slot></slot>
            </nav>

            <div class="aegov-footer__tawasul">
              <div class="aegov-footer__tawasul-logo">
                <span class="aegov-footer__tawasul-mark">
                  <span class="aegov-footer__tawasul-mark-svg" aria-hidden="true" innerHTML={TAWASUL_LOGO_SVG}></span>
                  <span class="sr-only">{s.tawasul}</span>
                </span>
              </div>
              <ul class="aegov-footer__tawasul-contacts" role="list">
                <li>
                  <a class="aegov-footer__tawasul-link" href="tel:171">
                    <svg aria-hidden="true" class="fill-aegreen-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                      <rect width="256" height="256" fill="none" />
                      <path d="M152.27,37.93a8,8,0,0,1,9.8-5.66,86.22,86.22,0,0,1,61.66,61.66,8,8,0,0,1-5.66,9.8A8.23,8.23,0,0,1,216,104a8,8,0,0,1-7.73-5.93,70.35,70.35,0,0,0-50.33-50.34A8,8,0,0,1,152.27,37.93Zm-2.33,41.8c13.79,3.68,22.65,12.55,26.33,26.34A8,8,0,0,0,184,112a8.23,8.23,0,0,0,2.07-.27,8,8,0,0,0,5.66-9.8c-5.12-19.16-18.5-32.54-37.66-37.66a8,8,0,1,0-4.13,15.46Zm72.43,78.73-47.11-21.11-.13-.06a16,16,0,0,0-15.17,1.4,8.12,8.12,0,0,0-.75.56L134.87,160c-15.42-7.49-31.34-23.29-38.83-38.51l20.78-24.71c.2-.25.39-.5.57-.77a16,16,0,0,0,1.32-15.06l0-.12L97.54,33.64a16,16,0,0,0-16.62-9.52A56.26,56.26,0,0,0,32,80c0,79.4,64.6,144,144,144a56.26,56.26,0,0,0,55.88-48.92A16,16,0,0,0,222.37,158.46Z" />
                    </svg>
                    <span><span class="sr-only">{s.call}: </span>171</span>
                  </a>
                </li>
                <li>
                  <a class="aegov-footer__tawasul-link" href="https://wa.me/97147771777" target="_blank" rel="noopener noreferrer">
                    <svg aria-hidden="true" class="fill-aegreen-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                      <rect width="256" height="256" fill="none" />
                      <path d="M152.58,145.23l23,11.48A24,24,0,0,1,152,176a72.08,72.08,0,0,1-72-72A24,24,0,0,1,99.29,80.46l11.48,23L101,118a8,8,0,0,0-.73,7.51,56.47,56.47,0,0,0,30.15,30.15A8,8,0,0,0,138,155ZM232,128A104,104,0,0,1,79.12,219.82L45.07,231.17a16,16,0,0,1-20.24-20.24l11.35-34.05A104,104,0,1,1,232,128Zm-40,24a8,8,0,0,0-4.42-7.16l-32-16a8,8,0,0,0-8,.5l-14.69,9.8a40.55,40.55,0,0,1-16-16l9.8-14.69a8,8,0,0,0,.5-8l-16-32A8,8,0,0,0,104,64a40,40,0,0,0-40,40,88.1,88.1,0,0,0,88,88A40,40,0,0,0,192,152Z" />
                    </svg>
                    <span><span class="sr-only">{s.whatsapp}: </span>04-7771777</span>
                  </a>
                </li>
              </ul>
              {this.entityTollFree && (
                <p class="aegov-footer__entity-tollfree">
                  <a class="aegov-footer__entity-tollfree-link" href={this.phoneHref(this.entityTollFree)}>
                    <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                      <rect width="256" height="256" fill="none" />
                      <path d="M164.05,105.11A32,32,0,0,1,151,118.17M177.71,71.16A56,56,0,0,1,151,118.17M164.05,105.11l19.94,19.94" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" />
                      <path d="M70,101.66C81.53,126.36,101.44,146,126.34,158l14.49-27.71a16,16,0,0,1,20.09-7.23,102.87,102.87,0,0,0,32.55,7.83A16,16,0,0,1,208,146v29.85a16,16,0,0,1-17.43,15.94A159.91,159.91,0,0,1,52.21,65.43,16,16,0,0,1,68.15,48H98a16,16,0,0,1,15.93,14.53,102.87,102.87,0,0,0,7.83,32.55,16,16,0,0,1-7.23,20.09Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16" />
                    </svg>
                    <span class="aegov-footer__entity-tollfree-label">{this.entityTollFreeLabel || s.tollFree}: </span>
                    <strong>{this.entityTollFree}</strong>
                  </a>
                </p>
              )}
            </div>
          </div>

          <div class="aegov-footer__bottom aegov-container">
            <div class="aegov-footer__copyright">
              <slot name="copyright"></slot>
            </div>
            <div class="aegov-footer__actions">
              <slot name="actions"></slot>
            </div>
          </div>
        </footer>
      </Host>
    );
  }
}
