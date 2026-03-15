import { Component, Element, Listen, Prop, State, Watch, getAssetPath, h } from '@stencil/core';
import type { HeaderVariant } from '../../utils/types';
import { getFocusableElements, handleTabKeyWrap } from '../../utils/focus-management';

@Component({
  tag: 'aegov-header',
  styleUrl: 'aegov-header.css',
  assetsDirs: ['assets'],
  scoped: false,
  shadow: true
})
export class AegovHeader {
  /**
   * The variant of the header. Determines the layout and style.
   * - "ministry": Header for ministry-level entities
   * - "authority": Header for authority-level entities
   */
  @Element() el: HTMLElement;

  @Prop() variant: HeaderVariant = 'ministry';

  /** The name of the government entity. Required. */
  @Prop() entityName: string;

  /** The domain/URL of the government entity. Required. */
  @Prop() entityDomain: string;

  /** The CSS selector or ID of the main content container to skip to (e.g. "#main-content"). When provided, renders a "Skip to content" link before the header for keyboard accessibility. */
  @Prop() skipContentContainer: string;

  @State() headerExpanded: boolean = false;

  private triggerEl: HTMLAnchorElement;
  private expandedEl: HTMLDivElement;
  private closeButtonEl: HTMLElement;
  private skipLinkEl: HTMLAnchorElement;

  private primeTextEn = 'A United Arab Emirates Federal Government website.';
  private primeTextAr = 'هذا هو الموقع الإلكتروني الرسمي لحكومة دولة الإمارات العربية المتحدة.';
  private accessibilityTextEn = 'Accessibility';
  private accessibilityTextAr = 'إمكانية الوصول';
  private languageTextEn = 'Language';
  private languageTextAr = 'اللغة';
  private learnMoreTextEn = 'Learn more';
  private learnMoreTextAr = 'اعرف المزيد';
  private closeTextEn = 'Close';
  private closeTextAr = 'إغلاق';
  private officialTextEn = 'This is an official United Arab Emirates Federal Government website. You can recognise this by the presence of the official seal and the domain name that contains the "gov.ae" extension.';
  private officialTextAr = 'هذا هو الموقع الإلكتروني الرسمي لحكومة دولة الإمارات العربية المتحدة. يمكنك التعرف عليه من خلال وجود الختم الرسمي واسم النطاق الذي يحتوي على امتداد "gov.ae".';

  connectedCallback() {
    if (this.skipContentContainer) {
      this.createSkipLink();
    }
  }

  disconnectedCallback() {
    this.skipLinkEl?.remove();
  }

  private createSkipLink() {
    const skipTarget = this.skipContentContainer.startsWith('#') ? this.skipContentContainer : `#${this.skipContentContainer}`;
    const link = document.createElement('a');
    link.href = skipTarget;
    link.className = 'aegov-skip-content';
    link.textContent = this.isRtl() ? 'تخطي إلى المحتوى' : 'Skip to content';
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(skipTarget) as HTMLElement;
      if (target) {
        target.setAttribute('tabindex', '-1');
        target.focus();
      }
    });
    this.skipLinkEl = link;
    document.body.insertBefore(link, document.body.firstChild);
  }

  @Watch('headerExpanded')
  handleExpandedChange(newValue: boolean) {
    if (newValue) {
      requestAnimationFrame(() => {
        this.closeButtonEl?.focus();
      });
    } else {
      this.triggerEl?.focus();
    }
  }

  @Listen('keydown')
  handleKeyDown(event: KeyboardEvent) {
    if (!this.headerExpanded) return;

    if (event.key === 'Escape') {
      this.headerExpanded = false;
      return;
    }

    if (event.key === 'Tab' && this.expandedEl) {
      const focusable = getFocusableElements(this.expandedEl);
      handleTabKeyWrap(event, focusable);
    }
  }

  private toggleHeaderExpanded = (e: MouseEvent) => {
    e.preventDefault();
    this.headerExpanded = !this.headerExpanded;
  };

  private isRtl(): boolean {
    const parentDir = this.el.closest('[dir]')?.getAttribute('dir');
    if (parentDir) return parentDir === 'rtl';
    return document.documentElement.getAttribute('dir') === 'rtl';
  }

  render() {
    if (!this.entityName || !this.entityDomain) {
      return (
        <div class="aegov-header aegov-header--error">
          <p>Error: <code>entity-name</code> and <code>entity-domain</code> are required properties.</p>
        </div>
      );
    }

    return (
      <header class={`aegov-header header--${this.variant}`}>
        <div class="header__top">
          <div class="aegov-container flex justify-between items-center">
            <div class="block sm:flex sm:justify-start sm:items-center sm:gap-4 sm:h-5">
              
              <span class="text-xs lg:text-sm! inline pe-3 sm:pe-0">{this.isRtl() ? this.primeTextAr : this.primeTextEn}</span>
              <a
                href="#"
                class="text-primary-200! no-underline hover:no-underline focus-visible:text-aeblack-800! text-xs p-0! lg:text-sm"
                onClick={this.toggleHeaderExpanded}
                aria-expanded={this.headerExpanded ? 'true' : 'false'}
                aria-controls="header-top-expand"
                ref={(el) => this.triggerEl = el}
              >
                {this.isRtl() ? this.learnMoreTextAr : this.learnMoreTextEn}
                <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><polyline points="208 96 128 176 48 96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
              </a>
            </div>
            <nav class="hidden sm:inline">
              <ul class="flex justify-end items-center gap-6 list-none m-0 p-0">
                <li><a href="#" class="text-sm! text-aeblack-100! focus-visible:text-aeblack-800! no-underline">
                  <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><polyline points="104 72 104 136 192 136 224 200 248 192" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><circle cx="104" cy="48" r="24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M168,96H112a64,64,0,0,0,0,128c29.82,0,56.9-20.4,64-48" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
                  <span class="hidden lg:inline">{this.isRtl() ? this.accessibilityTextAr : this.accessibilityTextEn}</span>
                </a></li>
                <li><a href="#" class="text-sm! text-aeblack-100! focus-visible:text-aeblack-800! no-underline">
                  <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><path d="M168,128c0,64-40,96-40,96s-40-32-40-96,40-96,40-96S168,64,168,128Z" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="37.46" y1="96" x2="218.54" y2="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/><line x1="37.46" y1="160" x2="218.54" y2="160" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
                  <span class="hidden lg:inline">{this.isRtl() ? this.languageTextAr : this.languageTextEn}</span>
                </a></li>
              </ul>
            </nav>
          </div>
          <div
            id="header-top-expand"
            class={`header__top-expand ${this.headerExpanded ? 'header__top-expand--open' : ''}`}
            ref={(el) => this.expandedEl = el}
          >
            <div class="aegov-container block sm:flex sm:justify-between sm:items-center sm:gap-8">
              <aegov-button onClick={this.toggleHeaderExpanded} variant="link" size="xs" appearance="neutralMin" class="absolute top-2 left-2" ref={(el) => this.closeButtonEl = el}>
                <svg xmlns="http://www.w3.org/2000/svg" class="w-4! h-4! text-aeblack-100!" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><line x1="200" y1="56" x2="56" y2="200" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="200" y1="200" x2="56" y2="56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                <span class="text-aeblack-100!">{this.isRtl() ? this.closeTextAr : this.closeTextEn}</span>
              </aegov-button>
              <div class="sm:max-w-lg sm:shrink pt-8">
                <p class="w-full text-center sm:text-left text-xs sm:text-sm md:text-base font-bold text-aeblack-50 m-0">{this.entityName}</p>
                <p class="w-full text-center sm:text-left text-xs md:text-sm text-aeblack-300 m-0 mt-1">{this.entityDomain}</p>
                <p class="w-full text-center sm:text-left text-xs md:text-sm lg:text-base font-normal m-0 mt-4">{this.isRtl() ? this.officialTextAr : this.officialTextEn}</p>
              </div>
              <div class="sm:flex-none sm:w-24 pt-8 sm:pt-0 flex justify-center-safe sm:justify-end">
                <img src={getAssetPath('./assets/UAE-emblem-white_outline-01.png')} alt="United Arab Emirates National Emblem" class="h-auto w-12 sm:w-18 md:w-24" />
              </div>
            </div>
          </div>
        </div>
        <div class="header__head">
          <div class="aegov-container flex items-center justify-between">
            <div class="header__logo">
              <a href={this.entityDomain}><slot name="logo" /></a>
            </div>
            <div class="header__search hidden md:inline">
              <slot name="search" />
            </div>
          </div>
        </div>
      </header>
    );
  }
}
