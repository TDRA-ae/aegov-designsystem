var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AegovNavbarItem_1;
import { Component, Host, h, Prop, Element, State, Watch } from '@stencil/core';
import { NAVBAR_SIZES } from '../../utils/types';
import { watchResponsiveProp } from '../../utils/responsive-prop';
import { getPassThroughAttributes } from '../../utils/attributes';
const CHEVRON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" aria-hidden="true" focusable="false"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="20" d="m48 96 80 80 80-80"/></svg>`;
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
let AegovNavbarItem = AegovNavbarItem_1 = class AegovNavbarItem {
    constructor() {
        this.hasIconStartSlot = false;
        this.hasDropdown = false;
        /** Mark this item as the current page. Sets `aria-current="page"`. */
        this.isActive = false;
        /** Visually disabled, not clickable, removed from arrow-key cycle. */
        this.isDisabled = false;
        /**
         * Size token. Accepts a Tailwind-style responsive string (e.g.
         * `"sm md:base lg:lg"`). Parent aegov-navbar sets this to its resolved
         * value; standalone use also supports breakpoint syntax.
         */
        this.size = 'base';
        this._resolvedSize = 'base';
        this._sizeWatcher = null;
        this.handleLinkClick = (event) => {
            // Stop the click reaching the dropdown's trigger div so a click-trigger
            // dropdown does not toggle when the link is clicked. Browser navigation
            // proceeds normally.
            event.stopPropagation();
        };
        this.handleChevronClick = async (event) => {
            event.preventDefault();
            event.stopPropagation();
            const dropdown = this.el.querySelector('aegov-dropdown[slot="dropdown"]');
            if (dropdown && typeof dropdown.toggle === 'function') {
                // detail === 0 → click came from keyboard (Enter/Space, or our
                // ArrowDown shim that calls chevron.click()). Pass through so the
                // dropdown moves focus into the menu only for keyboard users.
                await dropdown.toggle(event.detail === 0);
            }
        };
        this.handleChevronKeydown = (event) => {
            // Enter/Space fire native click on a <button>, which our click handler
            // already toggles. Only ArrowDown needs an explicit shim.
            if (event.key === 'ArrowDown' && this.chevronEl) {
                event.preventDefault();
                event.stopPropagation();
                this.chevronEl.click();
            }
        };
    }
    componentWillLoad() {
        this._sizeWatcher = watchResponsiveProp(this.size, NAVBAR_SIZES, 'base', v => {
            this._resolvedSize = v;
        });
        this._resolvedSize = this._sizeWatcher.current;
        this.hasIconStartSlot = !!this.el.querySelector('[slot="icon-start"]');
        this.hasDropdown = !!this.el.querySelector('aegov-dropdown[slot="dropdown"]');
        // Inject link + chevron BEFORE the dropdown hydrates so they are captured
        // as the dropdown's default-slot content (becoming the trigger area).
        if (this.hasDropdown && !this.isDisabled) {
            this.wireDropdown();
        }
    }
    disconnectedCallback() {
        var _a;
        if (this.chevronEl) {
            this.chevronEl.removeEventListener('keydown', this.handleChevronKeydown);
            this.chevronEl.removeEventListener('click', this.handleChevronClick);
            this.chevronEl = undefined;
        }
        if (this.linkEl) {
            this.linkEl.removeEventListener('click', this.handleLinkClick);
            this.linkEl = undefined;
        }
        (_a = this._sizeWatcher) === null || _a === void 0 ? void 0 : _a.destroy();
        this._sizeWatcher = null;
    }
    onSizeChange() {
        var _a;
        (_a = this._sizeWatcher) === null || _a === void 0 ? void 0 : _a.destroy();
        this._sizeWatcher = watchResponsiveProp(this.size, NAVBAR_SIZES, 'base', v => {
            this._resolvedSize = v;
        });
        this._resolvedSize = this._sizeWatcher.current;
    }
    getLabelText() {
        let txt = '';
        this.el.childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                txt += node.textContent || '';
            }
        });
        return txt.trim() || 'menu';
    }
    wireDropdown() {
        const dropdown = this.el.querySelector('aegov-dropdown[slot="dropdown"]');
        if (!dropdown)
            return;
        const labelText = this.getLabelText();
        // Build link or span (mirrors render output for non-dropdown case).
        const link = document.createElement(this.href ? 'a' : 'span');
        link.className = 'aegov-navbar-item__link';
        if (this.href) {
            link.setAttribute('href', this.href);
            if (this.target)
                link.setAttribute('target', this.target);
            if (this.rel)
                link.setAttribute('rel', this.rel);
            const referrerPolicy = this.el.getAttribute('referrerpolicy');
            if (referrerPolicy)
                link.setAttribute('referrerpolicy', referrerPolicy);
        }
        if (this.isActive)
            link.setAttribute('aria-current', 'page');
        // Move user-provided icon into the link.
        const iconEl = this.el.querySelector('[slot="icon-start"]');
        if (iconEl) {
            const iconWrap = document.createElement('span');
            iconWrap.className = 'aegov-navbar-item__icon';
            iconEl.removeAttribute('slot');
            iconWrap.appendChild(iconEl);
            link.appendChild(iconWrap);
        }
        // Label.
        const labelSpan = document.createElement('span');
        labelSpan.className = 'aegov-navbar-item__label';
        labelSpan.textContent = labelText;
        link.appendChild(labelSpan);
        // Strip text nodes from the host so they don't render alongside.
        Array.from(this.el.childNodes).forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                this.el.removeChild(node);
            }
        });
        // Only stop click on real <a> links so they don't toggle a click-trigger
        // dropdown. For a non-link span the click should bubble to aegov-dropdown's
        // trigger and toggle the menu like any other clickable trigger.
        if (this.href) {
            link.addEventListener('click', this.handleLinkClick);
        }
        // Chevron (always toggles, independent of dropdown's triggerType).
        const chevron = document.createElement('button');
        chevron.type = 'button';
        chevron.className = 'aegov-navbar-item__chevron';
        chevron.setAttribute('aria-label', `Open ${labelText} submenu`);
        chevron.innerHTML = CHEVRON_SVG;
        chevron.addEventListener('keydown', this.handleChevronKeydown);
        chevron.addEventListener('click', this.handleChevronClick);
        // Inject as default-slot children of the user's dropdown so the
        // dropdown's trigger div wraps the entire item area.
        dropdown.insertBefore(chevron, dropdown.firstChild);
        dropdown.insertBefore(link, chevron);
        this.linkEl = link;
        this.chevronEl = chevron;
    }
    render() {
        const sizeClass = `aegov-navbar-item--${this._resolvedSize}`;
        const liClasses = {
            'aegov-navbar-item': true,
            [sizeClass]: true,
            'aegov-navbar-item--has-dropdown': this.hasDropdown,
            'aegov-navbar-item--active': this.isActive,
            'aegov-navbar-item--disabled': this.isDisabled,
        };
        const passThroughAttributes = getPassThroughAttributes(this.el);
        const linkAttrs = {};
        Array.from(this.el.attributes).forEach(attr => {
            if (AegovNavbarItem_1.PASS_THROUGH_ATTRS.has(attr.name)) {
                linkAttrs[attr.name] = attr.value;
            }
        });
        // hasDropdown && !disabled: link/chevron live inside the user's
        // <aegov-dropdown>. Render only the dropdown slot.
        if (this.hasDropdown && !this.isDisabled) {
            return (h(Host, null,
                h("li", Object.assign({}, passThroughAttributes, { class: liClasses }),
                    h("slot", { name: "dropdown" }))));
        }
        const iconNode = this.hasIconStartSlot ? (h("span", { class: "aegov-navbar-item__icon" },
            h("slot", { name: "icon-start" }))) : null;
        const labelNode = (h("span", { class: "aegov-navbar-item__label" },
            h("slot", null)));
        let inner;
        if (this.isDisabled) {
            inner = (h("span", { class: "aegov-navbar-item__link", "aria-disabled": "true" },
                iconNode,
                labelNode));
        }
        else if (this.href) {
            inner = (h("a", Object.assign({}, linkAttrs, { class: "aegov-navbar-item__link", href: this.href, target: this.target, rel: this.rel, "aria-current": this.isActive ? 'page' : undefined }),
                iconNode,
                labelNode));
        }
        else {
            inner = (h("span", { class: "aegov-navbar-item__link", "aria-current": this.isActive ? 'page' : undefined },
                iconNode,
                labelNode));
        }
        return (h(Host, null,
            h("li", Object.assign({}, passThroughAttributes, { class: liClasses }),
                inner,
                this.hasDropdown && h("slot", { name: "dropdown" }))));
    }
};
/** Native anchor attributes to pass through to the inner link element. */
AegovNavbarItem.PASS_THROUGH_ATTRS = new Set([
    'rel', 'referrerpolicy', 'target',
]);
__decorate([
    Element()
], AegovNavbarItem.prototype, "el", void 0);
__decorate([
    State()
], AegovNavbarItem.prototype, "hasIconStartSlot", void 0);
__decorate([
    State()
], AegovNavbarItem.prototype, "hasDropdown", void 0);
__decorate([
    Prop()
], AegovNavbarItem.prototype, "href", void 0);
__decorate([
    Prop()
], AegovNavbarItem.prototype, "target", void 0);
__decorate([
    Prop()
], AegovNavbarItem.prototype, "rel", void 0);
__decorate([
    Prop()
], AegovNavbarItem.prototype, "isActive", void 0);
__decorate([
    Prop()
], AegovNavbarItem.prototype, "isDisabled", void 0);
__decorate([
    Prop({ mutable: true })
], AegovNavbarItem.prototype, "size", void 0);
__decorate([
    State()
], AegovNavbarItem.prototype, "_resolvedSize", void 0);
__decorate([
    Watch('size')
], AegovNavbarItem.prototype, "onSizeChange", null);
AegovNavbarItem = AegovNavbarItem_1 = __decorate([
    Component({
        tag: 'aegov-navbar-item',
        styleUrl: 'aegov-navbar-item.css',
        scoped: false,
    })
], AegovNavbarItem);
export { AegovNavbarItem };
