import { Component, Element, Listen, Prop, State, Watch, getAssetPath, h } from '@stencil/core';
import { getFocusableElements, handleTabKeyWrap } from '../../utils/focus-management';

@Component({
  tag: 'aegov-header-banner',
  styleUrl: 'aegov-header-banner.css',
  assetsDirs: ['assets'],
  scoped: false,
  shadow: true
})
export class AegovHeaderBanner {
  @Element() el!: HTMLElement;

  /** The name of the government entity. Required. */
  @Prop() entityName: string;

  /** The domain/URL of the government entity. Required. */
  @Prop() entityDomain: string;

  /** The CSS selector or ID of the main content container to skip to (e.g. "#main-content"). When provided, renders a "Skip to content" link before the header for keyboard accessibility. */
  @Prop() skipContentContainer: string;

  @State() headerExpanded: boolean = false;

  private actionsSlotEl: HTMLSlotElement;
  private actionsDefaultEl: HTMLElement;

  private syncActionsFallbackVisibility = () => {
    if (!this.actionsSlotEl || !this.actionsDefaultEl) return;
    const has = this.actionsSlotEl.assignedElements({ flatten: true }).length > 0;
    this.actionsDefaultEl.style.display = has ? 'none' : '';
  };

  componentDidLoad() {
    this.actionsSlotEl = this.el.shadowRoot?.querySelector('slot[name="actions"]') as HTMLSlotElement;
    this.actionsDefaultEl = this.el.shadowRoot?.querySelector('.header__actions-default') as HTMLElement;
    if (this.actionsSlotEl) {
      this.actionsSlotEl.addEventListener('slotchange', this.syncActionsFallbackVisibility);
      this.syncActionsFallbackVisibility();
    }
  }

  private triggerEl: HTMLAnchorElement;
  private expandedEl: HTMLDivElement;
  private closeButtonEl: HTMLElement;
  private skipLinkEl: HTMLAnchorElement;

  private primeTextEn = 'A United Arab Emirates Federal Government website.';
  private primeTextAr = 'هذا هو الموقع الإلكتروني الرسمي لحكومة دولة الإمارات العربية المتحدة.';
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
        <div class="aegov-header-banner aegov-header-banner--error">
          <p>Error: <code>entity-name</code> and <code>entity-domain</code> are required properties.</p>
        </div>
      );
    }

    return (
      <div class="aegov-header-banner">
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
            <slot name="actions" />
          </div>
          <div
            id="header-top-expand"
            class={`header__top-expand ${this.headerExpanded ? 'header__top-expand--open' : ''}`}
            ref={(el) => this.expandedEl = el}
          >
            <div class="aegov-container block sm:flex sm:justify-between sm:items-center sm:gap-8">
              <aegov-button onClick={this.toggleHeaderExpanded} appearance="link" size="xs" variant="neutral-min" class="absolute top-2 left-2" ref={(el) => this.closeButtonEl = el}>
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
      </div>
    );
  }
}
