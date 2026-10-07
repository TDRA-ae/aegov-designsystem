import { Component, Element, Listen, Prop, State, Watch, h } from '@stencil/core';
import { getFocusableElements, handleTabKeyWrap } from '../../utils/focus-management';
import { isRtl } from '../../utils/rtl';
import { getUaeEmblem } from '../../utils/icons';

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
  private officialEntityTitleEn = 'Official UAE Federal Government Entity';
  private officialEntityTitleAr = 'جهة اتحادية حكومية رسمية في دولة الإمارات';
  private officialEntityTextEn = 'UAE Federal Government websites, apps and portals use a gov.ae domain. This confirms identity.';
  private officialEntityTextAr = 'تستخدم مواقع وتطبيقات وبوابات حكومة دولة الإمارات الاتحادية نطاق gov.ae، وهذا يؤكد الهوية.';
  private secureTitleEn = 'Your connection is secure';
  private secureTitleAr = 'اتصالك آمن';
  private secureTextEn = 'The padlock and https:// mean an SSL-encrypted link. You may confidently share sensitive information here.';
  private secureTextAr = 'يشير القفل و https:// إلى اتصال مشفّر عبر SSL. يمكنك بثقة مشاركة المعلومات الحساسة هنا.';

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

  @Listen('focusout')
  handleFocusOut(event: FocusEvent) {
    if (!this.headerExpanded) return;
    const rt = event.relatedTarget as Node;
    const isInsideLight = rt && this.el.contains(rt);
    const isInsideShadow = rt && this.el.shadowRoot?.contains(rt);
    if (!isInsideLight && !isInsideShadow) {
      this.headerExpanded = false;
    }
  }

  private toggleHeaderExpanded = (e: Event) => {
    e.preventDefault();
    this.headerExpanded = !this.headerExpanded;
  };

  private isRtl(): boolean {
    return isRtl(this.el);
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
                onKeyDown={(e: KeyboardEvent) => { if (e.key === ' ') this.toggleHeaderExpanded(e); }}
                aria-expanded={this.headerExpanded ? 'true' : 'false'}
                aria-controls="header-top-expand"
                ref={(el) => this.triggerEl = el}
              >
                {this.isRtl() ? this.learnMoreTextAr : this.learnMoreTextEn}
                <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><polyline points="208 96 128 176 48 96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
              </a>
            </div>
            <slot name="actions" />
          </div>
          <div
            id="header-top-expand"
            class={`header__top-expand ${this.headerExpanded ? 'header__top-expand--open' : ''}`}
            ref={(el) => this.expandedEl = el}
          >
            <div class="aegov-container header__expand-inner">
              <aegov-button onClick={this.toggleHeaderExpanded} appearance="link" size="xs" variant="neutral-min" class="absolute top-3 end-3 z-10" ref={(el) => this.closeButtonEl = el}>
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" class="w-4! h-4! text-aeblack-100!" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><line x1="200" y1="56" x2="56" y2="200" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="200" y1="200" x2="56" y2="56" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
                <span class="text-aeblack-100!">{this.isRtl() ? this.closeTextAr : this.closeTextEn}</span>
              </aegov-button>
              <div class="header__identity">
                <div class="header__seal">
                  {getUaeEmblem()}
                </div>
                <div class="header__entity">
                  <p class="header__entity-name">{this.entityName}</p>
                  <p class="header__entity-domain">{this.entityDomain}</p>
                </div>
              </div>
              <div class="header__trust">
                <div class="header__trust-card">
                  <span class="header__trust-icon header__trust-icon--gold" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M20 10v11M8 14v3M12 14v3M16 14v3" /></svg>
                  </span>
                  <div>
                    <p class="header__trust-title">{this.isRtl() ? this.officialEntityTitleAr : this.officialEntityTitleEn}</p>
                    <p class="header__trust-text">{this.isRtl() ? this.officialEntityTextAr : this.officialEntityTextEn}</p>
                  </div>
                </div>
                <div class="header__trust-card">
                  <span class="header__trust-icon header__trust-icon--green" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
                  </span>
                  <div>
                    <p class="header__trust-title">{this.isRtl() ? this.secureTitleAr : this.secureTitleEn}</p>
                    <p class="header__trust-text">{this.isRtl() ? this.secureTextAr : this.secureTextEn}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
