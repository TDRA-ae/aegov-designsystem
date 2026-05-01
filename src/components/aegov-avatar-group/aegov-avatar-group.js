var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Element, Event, Host, h, Prop, State, Watch } from '@stencil/core';
import { AVATAR_GROUP_VARIANTS, AVATAR_SIZES } from '../../utils/types';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { watchResponsiveProp } from '../../utils/responsive-prop';
const TAG = 'aegov-avatar-group';
const ctx = (prop) => ({ component: TAG, prop });
/**
 * @slot - Avatar elements to be grouped together
 */
let AegovAvatarGroup = class AegovAvatarGroup {
    constructor() {
        /**
         * The layout variant: 'default' (spaced) or 'compact' (overlapping)
         */
        this.variant = 'default';
        /**
         * The size enforced on all child avatars
         */
        this.size = 'base';
        this._resolvedSize = 'base';
        this._sizeWatcher = null;
        /**
         * Number of additional users not shown. When > 0, displays "+N" indicator.
         */
        this.moreCount = 0;
        this.handleMoreClick = () => {
            this.aegovAvatarGroupMore.emit();
        };
    }
    componentWillLoad() {
        warnIfInvalidEnumProp(this.variant, AVATAR_GROUP_VARIANTS, 'default', ctx('variant'));
        this._sizeWatcher = watchResponsiveProp(this.size, AVATAR_SIZES, 'base', v => {
            this._resolvedSize = v;
            if (this.el.isConnected) {
                this.updateAvatars();
            }
        });
        this._resolvedSize = this._sizeWatcher.current;
    }
    componentDidLoad() {
        this.updateAvatars();
    }
    componentDidUpdate() {
        this.updateAvatars();
    }
    onVariantChange(v) { warnIfInvalidEnumProp(v, AVATAR_GROUP_VARIANTS, 'default', ctx('variant')); }
    disconnectedCallback() {
        var _a;
        (_a = this._sizeWatcher) === null || _a === void 0 ? void 0 : _a.destroy();
    }
    watchSize() {
        var _a;
        (_a = this._sizeWatcher) === null || _a === void 0 ? void 0 : _a.destroy();
        this._sizeWatcher = watchResponsiveProp(this.size, AVATAR_SIZES, 'base', v => {
            this._resolvedSize = v;
            if (this.el.isConnected) {
                this.updateAvatars();
            }
        });
        this._resolvedSize = this._sizeWatcher.current;
    }
    getDirectChildAvatars() {
        const allAvatars = Array.from(this.el.querySelectorAll('aegov-avatar'));
        return allAvatars.filter(avatar => {
            var _a;
            const parentGroup = (_a = avatar.parentElement) === null || _a === void 0 ? void 0 : _a.closest('aegov-avatar-group');
            return parentGroup === this.el;
        });
    }
    updateAvatars() {
        const avatars = this.getDirectChildAvatars();
        avatars.forEach(avatar => {
            avatar.size = this._resolvedSize;
            // Groups always use rounded avatars — override any individual appearance setting
            avatar.appearance = 'rounded';
        });
    }
    getMoreDisplayText() {
        if (this.moreText) {
            return this.moreText;
        }
        return `${this.moreCount}+`;
    }
    getSizeClass() {
        return `avatar-${this._resolvedSize}`;
    }
    render() {
        const size = this._resolvedSize;
        const variant = AVATAR_GROUP_VARIANTS.includes(this.variant) ? this.variant : 'default';
        const classes = {
            'aegov-avatar-group': true,
            'avatar-group--default': variant === 'default',
            'avatar-group--compact': variant === 'compact',
            [`avatar-group--${size}`]: true,
        };
        // More button is always rounded — groups only support rounded avatars
        const moreClasses = {
            'avatar-group__more': true,
            [this.getSizeClass()]: true,
            'avatar-rounded': true,
        };
        return (h(Host, null,
            h("div", { class: classes, role: "group", "aria-label": "Avatar group" },
                h("slot", null),
                this.moreCount > 0 && (h("button", { type: "button", class: moreClasses, onClick: this.handleMoreClick, "aria-label": `Show ${this.moreCount} more users` }, this.getMoreDisplayText())))));
    }
};
__decorate([
    Element()
], AegovAvatarGroup.prototype, "el", void 0);
__decorate([
    Prop()
], AegovAvatarGroup.prototype, "variant", void 0);
__decorate([
    Prop()
], AegovAvatarGroup.prototype, "size", void 0);
__decorate([
    State()
], AegovAvatarGroup.prototype, "_resolvedSize", void 0);
__decorate([
    Prop()
], AegovAvatarGroup.prototype, "moreCount", void 0);
__decorate([
    Prop()
], AegovAvatarGroup.prototype, "moreText", void 0);
__decorate([
    Event()
], AegovAvatarGroup.prototype, "aegovAvatarGroupMore", void 0);
__decorate([
    Watch('variant')
], AegovAvatarGroup.prototype, "onVariantChange", null);
__decorate([
    Watch('size')
], AegovAvatarGroup.prototype, "watchSize", null);
AegovAvatarGroup = __decorate([
    Component({
        tag: 'aegov-avatar-group',
        styleUrl: 'aegov-avatar-group.css',
        scoped: false,
    })
], AegovAvatarGroup);
export { AegovAvatarGroup };
