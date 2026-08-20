import { Component, Element, Host, Prop, h } from '@stencil/core';
import { isRtl } from '../../utils/rtl';

/**
 * The official Tawasul 171 logo, inlined rather than loaded as an asset file
 * (consistent with every other icon in this component). Colors are direct
 * `fill`/`stroke` attributes on each path rather than the source file's
 * `class="cls-N"` + `<style>` block — this component is `scoped: false`, so
 * generic class names like `cls-1` would leak into the page's global CSS
 * scope and could collide with an unrelated element using the same name
 * elsewhere on the consumer's page. Purely decorative (`aria-hidden`) — the
 * "171" and "Tawasul"/"تواصل" it depicts are already announced via the tel:
 * link text and the sr-only label next to it.
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
    commentsComplaints: 'Comments or complaints',
    tawasul: 'Tawasul',
    tawasulDesc: 'The unified channel for comments and complaints about any federal service.',
    call: 'Call',
    whatsapp: 'WhatsApp',
    contactUs: 'Contact us',
    tollFree: 'Toll free',
    email: 'Email',
  },
  ar: {
    commentsComplaints: 'التعليقات أو الشكاوى',
    tawasul: 'تواصل',
    tawasulDesc: 'القناة الموحدة للتعليقات والشكاوى حول أي خدمة اتحادية.',
    call: 'اتصال',
    whatsapp: 'واتساب',
    contactUs: 'اتصل بنا',
    tollFree: 'الرقم المجاني',
    email: 'البريد الإلكتروني',
  },
};

/**
 * @component aegov-footer-highlights
 * @description A two-card hero row for the top of a government website
 * footer, sitting above the link columns. The start-side card is a plain
 * slot — this component renders no chrome for it at all (no background, no
 * shadow, no radius, no padding); the author's own slotted markup supplies
 * everything, content and styling alike. The end-side card is fixed:
 * a "Comments or complaints" block with the Tawasul 171/WhatsApp channels
 * (always shown, matching design-system guidance) and a "Contact us" block
 * where only the entity's own contact number and email are dynamic.
 *
 * This is not a standalone top-level component in the docs nav — it is
 * embedded inside `aegov-footer`'s own render output (the same relationship
 * `aegov-header-banner` has with `aegov-header`) but can be used on its own
 * wherever just the hero row is needed.
 *
 * @slot - The start-side card's content. Author-owned end to end — wrap it
 * in your own `<div>` carrying whatever background/shadow/radius/padding
 * classes you want; nothing is applied for you.
 *
 * @example
 * <aegov-footer-highlights entity-contact-number="800 8877" entity-email="info@example.gov.ae" entity-contact-href="/contact">
 *   <div class="rounded-xl shadow-lg bg-primary-900 dark:bg-primary-950 p-6 sm:p-8">
 *     <p>Sign up for updates.</p>
 *   </div>
 * </aegov-footer-highlights>
 */
@Component({
  tag: 'aegov-footer-highlights',
  styleUrl: 'aegov-footer-highlights.css',
  scoped: false,
})
export class AegovFooterHighlights {
  @Element() el!: HTMLElement;

  /**
   * The entity's own contact number (e.g. "800 8877"), shown in the fixed
   * "Contact us" card alongside the Tawasul 171/WhatsApp channels. Entirely
   * optional and site-specific — nothing renders unless it's provided.
   */
  @Prop() entityContactNumber?: string;

  /**
   * Overrides the label shown before `entityContactNumber` (defaults to the
   * bilingual "Toll free"/"الرقم المجاني" text used elsewhere in this block).
   */
  @Prop() entityContactNumberLabel?: string;

  /**
   * The entity's own contact email, shown below the contact number. Entirely
   * optional — nothing renders unless it's provided.
   */
  @Prop() entityEmail?: string;

  /**
   * Overrides the label shown before `entityEmail` (defaults to the
   * bilingual "Email"/"البريد الإلكتروني" text).
   */
  @Prop() entityEmailLabel?: string;

  /**
   * Target for the fixed "Contact us" link at the end of the card. The link
   * text itself is fixed — only the destination is site-specific — so
   * nothing renders unless this is provided.
   */
  @Prop() entityContactHref?: string;

  /** Strips everything but digits/`+` from a displayed number to build a valid `tel:` URI. */
  private phoneHref(number: string): string {
    return `tel:${number.replace(/[^\d+]/g, '')}`;
  }

  render() {
    const s = isRtl(this.el) ? STRINGS.ar : STRINGS.en;
    return (
      <Host class="aegov-footer-highlights aegov-container">
        <div class="aegov-footer-highlights__grid">
          <div class="aegov-footer-highlights__card aegov-footer-highlights__card--start">
            <slot></slot>
          </div>

          <aegov-card
            class="aegov-footer-highlights__card aegov-footer-highlights__card--end"
            variant="neutral-min"
            appearance="light"
            border-width={1}
            is-padding="false"
          >
            <div class="aegov-footer-highlights__end-grid">
              <div class="aegov-footer-highlights__panel">
                <p class="aegov-footer-highlights__eyebrow">{s.commentsComplaints}</p>

                <span class="aegov-footer-highlights__tawasul-mark" aria-hidden="true" innerHTML={TAWASUL_LOGO_SVG}></span>
                <span class="sr-only">{s.tawasul}</span>

                <p class="aegov-footer-highlights__desc">{s.tawasulDesc}</p>

                <div class="aegov-footer-highlights__tawasul-actions">
                  <aegov-link href="tel:171" size="xs" appearance="solid" variant="secondary">
                    <svg aria-hidden="true" class="w-4 h-4" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                      <rect width="256" height="256" fill="none" />
                      <path
                        d="M164.39,145.34a8,8,0,0,1,7.59-.69l47.16,21.13a8,8,0,0,1,4.8,8.3A48.33,48.33,0,0,1,176,216,136,136,0,0,1,40,80,48.33,48.33,0,0,1,81.92,32.06a8,8,0,0,1,8.3,4.8l21.13,47.2a8,8,0,0,1-.66,7.53L89.32,117a7.93,7.93,0,0,0-.54,7.81c8.27,16.93,25.77,34.22,42.75,42.41a7.92,7.92,0,0,0,7.83-.59Z"
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="16"
                      />
                    </svg>
                    <span><span class="sr-only">{s.call}: </span>171</span>
                  </aegov-link>
                  <aegov-link href="https://wa.me/97147771777" target="_blank" rel="noopener noreferrer" size="xs" appearance="outline" variant="secondary">
                    <svg aria-hidden="true" class="w-4 h-4" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
                      <rect width="256" height="256" fill="none" />
                      <path
                        d="M72,104a32,32,0,0,1,32-32l16,32-12.32,18.47a48.19,48.19,0,0,0,25.85,25.85L152,136l32,16a32,32,0,0,1-32,32A80,80,0,0,1,72,104Z"
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="16"
                      />
                      <path
                        d="M79.93,211.11a96,96,0,1,0-35-35h0L32.42,213.46a8,8,0,0,0,10.12,10.12l37.39-12.47Z"
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="16"
                      />
                    </svg>
                    <span><span class="sr-only">{s.whatsapp}: </span>04-7771777</span>
                  </aegov-link>
                </div>
              </div>

              <div class="aegov-footer-highlights__panel">
                <p class="aegov-footer-highlights__eyebrow">{s.contactUs}</p>

                <div class="aegov-footer-highlights__rows">
                  {this.entityContactNumber && (
                    <div class="aegov-footer-highlights__row">
                      <span class="aegov-footer-highlights__row-label">{this.entityContactNumberLabel || s.tollFree}</span>
                      <aegov-link
                        href={this.phoneHref(this.entityContactNumber)}
                        extra-class="!underline !text-aeblack-900 font-bold text-lg dark:!text-aeblack-50"
                      >
                        {this.entityContactNumber}
                      </aegov-link>
                    </div>
                  )}
                  {this.entityEmail && (
                    <div class="aegov-footer-highlights__row">
                      <span class="aegov-footer-highlights__row-label">{this.entityEmailLabel || s.email}</span>
                      <aegov-link href={`mailto:${this.entityEmail}`} extra-class="!underline font-semibold">
                        {this.entityEmail}
                      </aegov-link>
                    </div>
                  )}
                </div>

                {this.entityContactHref && (
                  <aegov-link href={this.entityContactHref} extra-class="!underline aegov-footer-highlights__contact-link font-semibold">
                    {s.contactUs}
                    <svg aria-hidden="true" class="w-4 h-4" viewBox="0 0 256 256" fill="currentColor">
                      <rect width="256" height="256" fill="none" />
                      <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L196.69,136H40a8,8,0,0,1,0-16H196.69L138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z" />
                    </svg>
                  </aegov-link>
                )}
              </div>
            </div>
          </aegov-card>
        </div>
      </Host>
    );
  }
}
