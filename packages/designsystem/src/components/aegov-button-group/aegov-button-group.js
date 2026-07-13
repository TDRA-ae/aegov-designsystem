var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Element, Host, h, Prop, Watch } from '@stencil/core';
import { BUTTON_GROUP_ORIENTATIONS } from '../../utils/types';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
const TAG = 'aegov-button-group';
const ctx = (prop) => ({ component: TAG, prop });
/**
 * @slot - Button elements to be grouped together
 */
let AegovButtonGroup = class AegovButtonGroup {
    constructor() {
        /**
         * The orientation of the button group
         */
        this.orientation = 'horizontal';
    }
    componentWillLoad() {
        warnIfInvalidEnumProp(this.orientation, BUTTON_GROUP_ORIENTATIONS, 'horizontal', ctx('orientation'));
    }
    componentDidLoad() {
        this.updateButtons();
    }
    componentDidUpdate() {
        this.updateButtons();
    }
    watchOrientation(v) {
        warnIfInvalidEnumProp(v, BUTTON_GROUP_ORIENTATIONS, 'horizontal', ctx('orientation'));
        this.updateButtons();
    }
    /**
     * Gets direct child button elements only (no nested buttons)
     */
    getDirectChildButtons() {
        const allButtons = Array.from(this.el.querySelectorAll('aegov-button'));
        // Filter to only direct children of this button-group
        return allButtons.filter((button) => {
            var _a;
            const parentGroup = (_a = button.parentElement) === null || _a === void 0 ? void 0 : _a.closest('aegov-button-group');
            return parentGroup === this.el;
        });
    }
    /**
     * Validates that all direct children are aegov-button elements
     */
    validateChildren() {
        const directChildren = Array.from(this.el.children).filter((child) => child.tagName !== 'STYLE' && child.tagName !== 'SCRIPT');
        const invalidChildren = directChildren.filter((child) => child.tagName.toLowerCase() !== 'aegov-button');
        if (invalidChildren.length > 0) {
            console.warn('[aegov-button-group] All children must be <aegov-button> elements. Found:', invalidChildren.map((child) => child.tagName));
        }
    }
    /**
     * Updates button states based on their position in the group
     */
    updateButtons() {
        this.validateChildren();
        const buttons = this.getDirectChildButtons();
        if (buttons.length === 0) {
            return;
        }
        buttons.forEach((button, index) => {
            const isSingle = buttons.length === 1;
            const isFirst = index === 0;
            const isLast = index === buttons.length - 1;
            let position;
            if (isSingle) {
                position = 'single';
            }
            else if (isFirst) {
                position = 'first';
            }
            else if (isLast) {
                position = 'last';
            }
            else {
                position = 'middle';
            }
            button.groupPosition = position;
            button.groupOrientation = BUTTON_GROUP_ORIENTATIONS.includes(this.orientation) ? this.orientation : 'horizontal';
        });
    }
    render() {
        const orientation = BUTTON_GROUP_ORIENTATIONS.includes(this.orientation) ? this.orientation : 'horizontal';
        const classes = {
            'aegov-button-group': true,
            'button-group--horizontal': orientation === 'horizontal',
            'button-group--vertical': orientation === 'vertical',
        };
        return (h(Host, null,
            h("div", { class: classes, role: "group" },
                h("slot", null))));
    }
};
__decorate([
    Element()
], AegovButtonGroup.prototype, "el", void 0);
__decorate([
    Prop()
], AegovButtonGroup.prototype, "orientation", void 0);
__decorate([
    Watch('orientation')
], AegovButtonGroup.prototype, "watchOrientation", null);
AegovButtonGroup = __decorate([
    Component({
        tag: 'aegov-button-group',
        styleUrl: 'aegov-button-group.css',
        scoped: false,
    })
], AegovButtonGroup);
export { AegovButtonGroup };
