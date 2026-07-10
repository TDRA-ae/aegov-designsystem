var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Prop, h } from '@stencil/core';
/**
 * @component aegov-tab-panel
 * @description Content panel for a single tab. Managed by a parent aegov-tabs component.
 * Shows its content when its tab-id matches the active tab, hides otherwise.
 *
 * @slot default - The panel content
 *
 * @example
 * <aegov-tab-panel tab-id="profile">
 *   <p>Profile settings content here</p>
 * </aegov-tab-panel>
 */
let AegovTabPanel = class AegovTabPanel {
    constructor() {
        /**
         * Whether this panel is currently active. Set automatically by the parent aegov-tabs.
         */
        this.active = false;
    }
    render() {
        const classes = ['aegov-tab-panel'];
        if (this.extraClass)
            classes.push(this.extraClass);
        return (h("div", { role: "tabpanel", id: `panel-${this.tabId}`, "aria-labelledby": `tab-${this.tabId}`, tabIndex: this.active ? 0 : undefined, hidden: !this.active, class: classes.join(' ') },
            h("slot", null)));
    }
};
__decorate([
    Prop()
], AegovTabPanel.prototype, "tabId", void 0);
__decorate([
    Prop()
], AegovTabPanel.prototype, "active", void 0);
__decorate([
    Prop()
], AegovTabPanel.prototype, "extraClass", void 0);
AegovTabPanel = __decorate([
    Component({
        tag: 'aegov-tab-panel',
        styleUrl: 'aegov-tab-panel.css',
        scoped: false,
        shadow: false,
    })
], AegovTabPanel);
export { AegovTabPanel };
