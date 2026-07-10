var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AegovAvatar_1;
import { Component, Element, Prop, Watch, h, Host, State } from '@stencil/core';
import { AVATAR_SIZES, AVATAR_APPEARANCES, AVATAR_STATUSES } from '../../utils/types';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { watchResponsiveProp } from '../../utils/responsive-prop';
import { getPassThroughAttributes } from '../../utils/attributes';
import { generateId } from '../../utils/id-generator';
const TAG = 'aegov-avatar';
const ctx = (prop) => ({ component: TAG, prop });
/**
 * @slot - Avatar content (used when no src is provided)
 * @part avatar - The avatar container element
 * @part image - The avatar image element
 * @part status - The status indicator element
 */
let AegovAvatar = AegovAvatar_1 = class AegovAvatar {
    constructor() {
        /**
         * The avatar size
         * @default 'base'
         */
        this.size = 'base';
        this._resolvedSize = 'base';
        this._sizeWatcher = null;
        /**
         * The avatar appearance (shape)
         * @default 'square'
         */
        this.appearance = 'square';
        /**
         * Status indicator. Set to a status string to show the indicator, or `false` to hide it.
         * Accepts: `'online'`, `'offline'`, `'away'`, `'unavailable'`, `'busy'`, or boolean (`true` maps to `'online'`).
         * @default false
         */
        this.status = false;
        /**
         * Internal state to track image load error
         */
        this.imageError = false;
        /**
         * Handle image load error
         */
        this.handleImageError = () => {
            this.imageError = true;
        };
    }
    componentWillLoad() {
        warnIfInvalidEnumProp(this.appearance, AVATAR_APPEARANCES, 'square', ctx('appearance'));
        this._sizeWatcher = watchResponsiveProp(this.size, AVATAR_SIZES, 'base', v => {
            this._resolvedSize = v;
        });
        this._resolvedSize = this._sizeWatcher.current;
        if (!this.fieldId) {
            this.fieldId = generateId('aegov-avatar');
        }
    }
    disconnectedCallback() {
        var _a;
        (_a = this._sizeWatcher) === null || _a === void 0 ? void 0 : _a.destroy();
    }
    onSizeChange() {
        var _a;
        (_a = this._sizeWatcher) === null || _a === void 0 ? void 0 : _a.destroy();
        this._sizeWatcher = watchResponsiveProp(this.size, AVATAR_SIZES, 'base', v => {
            this._resolvedSize = v;
        });
        this._resolvedSize = this._sizeWatcher.current;
    }
    onAppearanceChange(v) { warnIfInvalidEnumProp(v, AVATAR_APPEARANCES, 'square', ctx('appearance')); }
    /**
     * Get the CSS classes based on component props
     */
    getAvatarClasses() {
        const classes = ['aegov-avatar'];
        const size = this._resolvedSize;
        const appearance = AVATAR_APPEARANCES.includes(this.appearance) ? this.appearance : 'square';
        // Size classes
        const sizeClasses = {
            xs: 'avatar-xs',
            sm: 'avatar-sm',
            base: 'avatar-base',
            lg: 'avatar-lg',
            xl: 'avatar-xl',
            '2xl': 'avatar-2xl',
            '3xl': 'avatar-3xl',
        };
        classes.push(sizeClasses[size]);
        // Appearance classes
        if (appearance === 'rounded') {
            classes.push('avatar-rounded');
        }
        // No user class (when no image is available)
        if (!this.src || this.imageError) {
            classes.push('no-user');
        }
        return classes.join(' ');
    }
    /**
     * Get the effective status type from the status prop, or null when hidden.
     */
    getEffectiveStatus() {
        if (this.status === true)
            return 'online';
        if (this.status === false)
            return null;
        return AVATAR_STATUSES.includes(this.status)
            ? this.status
            : null;
    }
    /**
     * Get status indicator classes
     */
    getStatusClasses(effectiveStatus) {
        return `avatar-indicator avatar-${effectiveStatus}`;
    }
    render() {
        const showImage = this.src && !this.imageError;
        const passThroughAttributes = getPassThroughAttributes(this.el, AegovAvatar_1.PASS_THROUGH_ATTRS);
        return (h(Host, null,
            h("div", { id: this.fieldId, part: "avatar", class: this.getAvatarClasses(), role: "img", "aria-label": this.alt || 'User avatar' },
                showImage ? (h("img", Object.assign({ part: "image" }, passThroughAttributes, { src: this.src, alt: this.alt || '', onError: this.handleImageError, class: "avatar-image" }))) : (h("div", { class: "avatar-fallback" },
                    h("slot", null,
                        h("svg", { class: "avatar-icon", fill: "currentColor", viewBox: "0 0 20 20", xmlns: "http://www.w3.org/2000/svg" },
                            h("path", { "fill-rule": "evenodd", d: "M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z", "clip-rule": "evenodd" }))))),
                (() => {
                    const effectiveStatus = this.getEffectiveStatus();
                    return effectiveStatus && (h("span", { part: "status", class: this.getStatusClasses(effectiveStatus), "aria-label": `Status: ${effectiveStatus}` }));
                })())));
    }
};
/** Native img attributes to pass through to the inner img element. */
AegovAvatar.PASS_THROUGH_ATTRS = new Set([
    'loading', 'crossorigin', 'referrerpolicy', 'srcset', 'alt', 'src',
]);
__decorate([
    Element()
], AegovAvatar.prototype, "el", void 0);
__decorate([
    Prop({ mutable: true, reflect: true })
], AegovAvatar.prototype, "fieldId", void 0);
__decorate([
    Prop()
], AegovAvatar.prototype, "size", void 0);
__decorate([
    State()
], AegovAvatar.prototype, "_resolvedSize", void 0);
__decorate([
    Prop()
], AegovAvatar.prototype, "appearance", void 0);
__decorate([
    Prop()
], AegovAvatar.prototype, "src", void 0);
__decorate([
    Prop()
], AegovAvatar.prototype, "alt", void 0);
__decorate([
    Prop()
], AegovAvatar.prototype, "status", void 0);
__decorate([
    State()
], AegovAvatar.prototype, "imageError", void 0);
__decorate([
    Watch('size')
], AegovAvatar.prototype, "onSizeChange", null);
__decorate([
    Watch('appearance')
], AegovAvatar.prototype, "onAppearanceChange", null);
AegovAvatar = AegovAvatar_1 = __decorate([
    Component({
        tag: 'aegov-avatar',
        styleUrl: 'aegov-avatar.css',
        scoped: false,
    })
], AegovAvatar);
export { AegovAvatar };
