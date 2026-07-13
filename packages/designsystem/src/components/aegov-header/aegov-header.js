var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Element, Listen, Prop, State, Watch, getAssetPath, h } from '@stencil/core';
import { HEADER_VARIANTS } from '../../utils/types';
import { getFocusableElements, handleTabKeyWrap } from '../../utils/focus-management';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
const TAG = 'aegov-header';
const ctx = (prop) => ({ component: TAG, prop });
let AegovHeader = class AegovHeader {
    constructor() {
        this.variant = 'ministry';
        this.headerExpanded = false;
        this.primeTextEn = 'A United Arab Emirates Federal Government website.';
        this.primeTextAr = 'هذا هو الموقع الإلكتروني الرسمي لحكومة دولة الإمارات العربية المتحدة.';
        this.accessibilityTextEn = 'Accessibility';
        this.accessibilityTextAr = 'إمكانية الوصول';
        this.languageTextEn = 'Language';
        this.languageTextAr = 'اللغة';
        this.learnMoreTextEn = 'Learn more';
        this.learnMoreTextAr = 'اعرف المزيد';
        this.closeTextEn = 'Close';
        this.closeTextAr = 'إغلاق';
        this.officialTextEn = 'This is an official United Arab Emirates Federal Government website. You can recognise this by the presence of the official seal and the domain name that contains the "gov.ae" extension.';
        this.officialTextAr = 'هذا هو الموقع الإلكتروني الرسمي لحكومة دولة الإمارات العربية المتحدة. يمكنك التعرف عليه من خلال وجود الختم الرسمي واسم النطاق الذي يحتوي على امتداد "gov.ae".';
        this.toggleHeaderExpanded = (e) => {
            e.preventDefault();
            this.headerExpanded = !this.headerExpanded;
        };
    }
    componentWillLoad() {
        warnIfInvalidEnumProp(this.variant, HEADER_VARIANTS, 'ministry', ctx('variant'));
    }
    onVariantChange(v) { warnIfInvalidEnumProp(v, HEADER_VARIANTS, 'ministry', ctx('variant')); }
    connectedCallback() {
        if (this.skipContentContainer) {
            this.createSkipLink();
        }
    }
    disconnectedCallback() {
        var _a;
        (_a = this.skipLinkEl) === null || _a === void 0 ? void 0 : _a.remove();
    }
    createSkipLink() {
        const skipTarget = this.skipContentContainer.startsWith('#') ? this.skipContentContainer : `#${this.skipContentContainer}`;
        const link = document.createElement('a');
        link.href = skipTarget;
        link.className = 'aegov-skip-content';
        link.textContent = this.isRtl() ? 'تخطي إلى المحتوى' : 'Skip to content';
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(skipTarget);
            if (target) {
                target.setAttribute('tabindex', '-1');
                target.focus();
            }
        });
        this.skipLinkEl = link;
        document.body.insertBefore(link, document.body.firstChild);
    }
    handleExpandedChange(newValue) {
        var _a;
        if (newValue) {
            requestAnimationFrame(() => {
                var _a;
                (_a = this.closeButtonEl) === null || _a === void 0 ? void 0 : _a.focus();
            });
        }
        else {
            (_a = this.triggerEl) === null || _a === void 0 ? void 0 : _a.focus();
        }
    }
    handleKeyDown(event) {
        if (!this.headerExpanded)
            return;
        if (event.key === 'Escape') {
            this.headerExpanded = false;
            return;
        }
        if (event.key === 'Tab' && this.expandedEl) {
            const focusable = getFocusableElements(this.expandedEl);
            handleTabKeyWrap(event, focusable);
        }
    }
    isRtl() {
        var _a;
        const parentDir = (_a = this.el.closest('[dir]')) === null || _a === void 0 ? void 0 : _a.getAttribute('dir');
        if (parentDir)
            return parentDir === 'rtl';
        return document.documentElement.getAttribute('dir') === 'rtl';
    }
    render() {
        if (!this.entityName || !this.entityDomain) {
            return (h("div", { class: "aegov-header aegov-header--error" },
                h("p", null,
                    "Error: ",
                    h("code", null, "entity-name"),
                    " and ",
                    h("code", null, "entity-domain"),
                    " are required properties.")));
        }
        const variant = HEADER_VARIANTS.includes(this.variant) ? this.variant : 'ministry';
        return (h("header", { class: `aegov-header header--${variant}` },
            h("div", { class: "header__top" },
                h("div", { class: "aegov-container flex justify-between items-center" },
                    h("div", { class: "block sm:flex sm:justify-start sm:items-center sm:gap-4 sm:h-5" },
                        h("span", { class: "text-xs lg:text-sm! inline pe-3 sm:pe-0" }, this.isRtl() ? this.primeTextAr : this.primeTextEn),
                        h("a", { href: "#", class: "text-primary-200! no-underline hover:no-underline focus-visible:text-aeblack-800! text-xs p-0! lg:text-sm", onClick: this.toggleHeaderExpanded, "aria-expanded": this.headerExpanded ? 'true' : 'false', "aria-controls": "header-top-expand", ref: (el) => this.triggerEl = el },
                            this.isRtl() ? this.learnMoreTextAr : this.learnMoreTextEn,
                            h("svg", { class: "w-3 h-3", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 256 256" },
                                h("rect", { width: "256", height: "256", fill: "none" }),
                                h("polyline", { points: "208 96 128 176 48 96", fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "24" })))),
                    h("nav", { class: "hidden sm:inline" },
                        h("ul", { class: "flex justify-end items-center gap-6 list-none m-0 p-0" },
                            h("li", null,
                                h("a", { href: "#", class: "text-sm! text-aeblack-100! focus-visible:text-aeblack-800! no-underline" },
                                    h("svg", { class: "w-5 h-5", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 256 256" },
                                        h("rect", { width: "256", height: "256", fill: "none" }),
                                        h("polyline", { points: "104 72 104 136 192 136 224 200 248 192", fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "16" }),
                                        h("circle", { cx: "104", cy: "48", r: "24", fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "16" }),
                                        h("path", { d: "M168,96H112a64,64,0,0,0,0,128c29.82,0,56.9-20.4,64-48", fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "16" })),
                                    h("span", { class: "hidden lg:inline" }, this.isRtl() ? this.accessibilityTextAr : this.accessibilityTextEn))),
                            h("li", null,
                                h("a", { href: "#", class: "text-sm! text-aeblack-100! focus-visible:text-aeblack-800! no-underline" },
                                    h("svg", { class: "w-5 h-5", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 256 256" },
                                        h("rect", { width: "256", height: "256", fill: "none" }),
                                        h("circle", { cx: "128", cy: "128", r: "96", fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "16" }),
                                        h("path", { d: "M168,128c0,64-40,96-40,96s-40-32-40-96,40-96,40-96S168,64,168,128Z", fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "16" }),
                                        h("line", { x1: "37.46", y1: "96", x2: "218.54", y2: "96", fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "16" }),
                                        h("line", { x1: "37.46", y1: "160", x2: "218.54", y2: "160", fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "16" })),
                                    h("span", { class: "hidden lg:inline" }, this.isRtl() ? this.languageTextAr : this.languageTextEn)))))),
                h("div", { id: "header-top-expand", class: `header__top-expand ${this.headerExpanded ? 'header__top-expand--open' : ''}`, ref: (el) => this.expandedEl = el },
                    h("div", { class: "aegov-container block sm:flex sm:justify-between sm:items-center sm:gap-8" },
                        h("aegov-button", { onClick: this.toggleHeaderExpanded, appearance: "link", size: "xs", variant: "neutralMin", class: "absolute top-2 left-2", ref: (el) => this.closeButtonEl = el },
                            h("svg", { xmlns: "http://www.w3.org/2000/svg", class: "w-4! h-4! text-aeblack-100!", viewBox: "0 0 256 256" },
                                h("rect", { width: "256", height: "256", fill: "none" }),
                                h("line", { x1: "200", y1: "56", x2: "56", y2: "200", fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "24" }),
                                h("line", { x1: "200", y1: "200", x2: "56", y2: "56", fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "24" })),
                            h("span", { class: "text-aeblack-100!" }, this.isRtl() ? this.closeTextAr : this.closeTextEn)),
                        h("div", { class: "sm:max-w-lg sm:shrink pt-8" },
                            h("p", { class: "w-full text-center sm:text-left text-xs sm:text-sm md:text-base font-bold text-aeblack-50 m-0" }, this.entityName),
                            h("p", { class: "w-full text-center sm:text-left text-xs md:text-sm text-aeblack-300 m-0 mt-1" }, this.entityDomain),
                            h("p", { class: "w-full text-center sm:text-left text-xs md:text-sm lg:text-base font-normal m-0 mt-4" }, this.isRtl() ? this.officialTextAr : this.officialTextEn)),
                        h("div", { class: "sm:flex-none sm:w-24 pt-8 sm:pt-0 flex justify-center-safe sm:justify-end" },
                            h("img", { src: getAssetPath('./assets/UAE-emblem-white_outline-01.png'), alt: "United Arab Emirates National Emblem", class: "h-auto w-12 sm:w-18 md:w-24" }))))),
            h("div", { class: "header__head" },
                h("div", { class: "aegov-container flex items-center justify-between" },
                    h("div", { class: "header__logo" },
                        h("a", { href: this.entityDomain },
                            h("slot", { name: "logo" }))),
                    h("div", { class: "header__search hidden md:inline" },
                        h("slot", { name: "search" }))))));
    }
};
__decorate([
    Element()
], AegovHeader.prototype, "el", void 0);
__decorate([
    Prop()
], AegovHeader.prototype, "variant", void 0);
__decorate([
    Prop()
], AegovHeader.prototype, "entityName", void 0);
__decorate([
    Prop()
], AegovHeader.prototype, "entityDomain", void 0);
__decorate([
    Prop()
], AegovHeader.prototype, "skipContentContainer", void 0);
__decorate([
    State()
], AegovHeader.prototype, "headerExpanded", void 0);
__decorate([
    Watch('variant')
], AegovHeader.prototype, "onVariantChange", null);
__decorate([
    Watch('headerExpanded')
], AegovHeader.prototype, "handleExpandedChange", null);
__decorate([
    Listen('keydown')
], AegovHeader.prototype, "handleKeyDown", null);
AegovHeader = __decorate([
    Component({
        tag: 'aegov-header',
        styleUrl: 'aegov-header.css',
        assetsDirs: ['assets'],
        scoped: false,
        shadow: true
    })
], AegovHeader);
export { AegovHeader };
