var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Host, h, Prop, Element, Listen, Watch, State } from '@stencil/core';
import { NAVBAR_SIZES } from '../../utils/types';
import { watchResponsiveProp } from '../../utils/responsive-prop';
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
let AegovNavbar = class AegovNavbar {
    constructor() {
        /**
         * Size of the navbar items. Accepts a Tailwind-style responsive string,
         * e.g. `"sm md:base lg:lg"`, resolved against the active viewport width.
         * The resolved token cascades to all aegov-navbar-item children.
         */
        this.size = 'base';
        /**
         * Tailwind gap utility class applied between items, e.g. "gap-4", "gap-6", "gap-10".
         */
        this.gap = 'gap-3';
        /**
         * Accessible label for the navigation landmark.
         */
        this.labelNav = 'Main navigation';
        this._resolvedSize = 'base';
        this._sizeWatcher = null;
    }
    componentWillLoad() {
        this._sizeWatcher = watchResponsiveProp(this.size, NAVBAR_SIZES, 'base', v => {
            this._resolvedSize = v;
            this.syncChildren();
        });
        this._resolvedSize = this._sizeWatcher.current;
    }
    componentDidLoad() {
        this.syncChildren();
    }
    componentDidUpdate() {
        this.syncChildren();
    }
    disconnectedCallback() {
        var _a;
        (_a = this._sizeWatcher) === null || _a === void 0 ? void 0 : _a.destroy();
        this._sizeWatcher = null;
    }
    onSizeChange() {
        var _a;
        (_a = this._sizeWatcher) === null || _a === void 0 ? void 0 : _a.destroy();
        this._sizeWatcher = watchResponsiveProp(this.size, NAVBAR_SIZES, 'base', v => {
            this._resolvedSize = v;
            this.syncChildren();
        });
        this._resolvedSize = this._sizeWatcher.current;
        this.syncChildren();
    }
    syncChildren() {
        const items = Array.from(this.el.querySelectorAll('aegov-navbar-item'));
        items.forEach(item => {
            item.size = this._resolvedSize;
        });
    }
    /**
     * Collect all keyboard-focusable navbar elements in document order:
     * each item's link plus its chevron (if present).
     */
    getFocusables() {
        return Array.from(this.el.querySelectorAll('.aegov-navbar-item__link, .aegov-navbar-item__chevron')).filter(el => !el.hasAttribute('aria-disabled') || el.getAttribute('aria-disabled') !== 'true');
    }
    handleKeydown(event) {
        const target = event.target;
        if (!target.closest('aegov-navbar-item'))
            return;
        const focusables = this.getFocusables();
        if (focusables.length === 0)
            return;
        const currentIndex = focusables.indexOf(target);
        if (currentIndex === -1)
            return;
        const isRtl = this.el.closest('[dir="rtl"]') !== null ||
            document.documentElement.dir === 'rtl';
        let nextIndex = -1;
        switch (event.key) {
            case 'ArrowRight':
                nextIndex = isRtl
                    ? (currentIndex - 1 + focusables.length) % focusables.length
                    : (currentIndex + 1) % focusables.length;
                break;
            case 'ArrowLeft':
                nextIndex = isRtl
                    ? (currentIndex + 1) % focusables.length
                    : (currentIndex - 1 + focusables.length) % focusables.length;
                break;
            case 'Home':
                nextIndex = 0;
                break;
            case 'End':
                nextIndex = focusables.length - 1;
                break;
            default:
                return;
        }
        if (nextIndex >= 0) {
            event.preventDefault();
            focusables[nextIndex].focus();
        }
    }
    render() {
        return (h(Host, null,
            h("nav", { class: `aegov-navbar aegov-navbar-${this._resolvedSize}`, "aria-label": this.labelNav },
                h("ul", { class: `aegov-navbar-list ${this.gap}` },
                    h("slot", null)))));
    }
};
__decorate([
    Element()
], AegovNavbar.prototype, "el", void 0);
__decorate([
    Prop()
], AegovNavbar.prototype, "size", void 0);
__decorate([
    Prop()
], AegovNavbar.prototype, "gap", void 0);
__decorate([
    Prop()
], AegovNavbar.prototype, "labelNav", void 0);
__decorate([
    State()
], AegovNavbar.prototype, "_resolvedSize", void 0);
__decorate([
    Watch('size')
], AegovNavbar.prototype, "onSizeChange", null);
__decorate([
    Listen('keydown')
], AegovNavbar.prototype, "handleKeydown", null);
AegovNavbar = __decorate([
    Component({
        tag: 'aegov-navbar',
        styleUrl: 'aegov-navbar.css',
        scoped: false,
    })
], AegovNavbar);
export { AegovNavbar };
