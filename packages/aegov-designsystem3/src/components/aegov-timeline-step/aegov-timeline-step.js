var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Prop, Watch, Element, State, Host, h } from '@stencil/core';
import { TIMELINE_STEP_STATUSES } from '../../utils/types';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
const TAG = 'aegov-timeline-step';
const ctx = (prop) => ({ component: TAG, prop });
let AegovTimelineStep = class AegovTimelineStep {
    constructor() {
        /**
         * Step status.
         */
        this.status = 'pending';
        /**
         * @internal Set by parent.
         */
        this.variant = 'default';
        /**
         * @internal Set by parent.
         */
        this.size = 'base';
        /**
         * @internal Set by parent.
         */
        this.orientation = 'horizontal';
        /**
         * @internal 0-based index, set by parent.
         */
        this.stepIndex = 0;
        /**
         * @internal Total step count, set by parent.
         */
        this.stepCount = 1;
        /**
         * @internal Set by parent.
         */
        this.isFirst = false;
        /**
         * @internal Set by parent.
         */
        this.isLast = false;
        /**
         * @internal Whether connector before this step is solid (prev completed). Set by parent.
         */
        this.isConnectorSolid = false;
        this.hasIconSlot = false;
        this.slotContent = '';
    }
    onStatusChange(v) { warnIfInvalidEnumProp(v, TIMELINE_STEP_STATUSES, 'pending', ctx('status')); }
    get safeStatus() {
        return TIMELINE_STEP_STATUSES.includes(this.status) ? this.status : 'pending';
    }
    componentWillLoad() {
        warnIfInvalidEnumProp(this.status, TIMELINE_STEP_STATUSES, 'pending', ctx('status'));
        const parent = this.el.closest('aegov-timeline');
        if (!parent) {
            throw new Error('[aegov-timeline-step] This component must be used inside <aegov-timeline>. ' +
                'It cannot be used as a standalone component.');
        }
        // Capture slot content to prevent duplication
        const childNodes = Array.from(this.el.childNodes);
        this.hasIconSlot = this.el.querySelectorAll('[slot="icon"]').length > 0;
        // Extract text content (excluding slotted elements)
        this.slotContent = childNodes
            .filter(node => node.nodeType === Node.TEXT_NODE)
            .map(node => { var _a; return (_a = node.textContent) === null || _a === void 0 ? void 0 : _a.trim(); })
            .filter(Boolean)
            .join(' ');
        // Remove text nodes to prevent duplication
        childNodes.forEach(node => {
            if (node.nodeType === Node.TEXT_NODE) {
                node.remove();
            }
        });
    }
    getCheckmarkIcon() {
        return (h("svg", { "aria-hidden": "true", class: "step__checkmark", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 256 256" },
            h("rect", { width: "256", height: "256", fill: "none" }),
            h("polyline", { points: "40 144 96 200 224 72", fill: "none", stroke: "currentColor", "stroke-linecap": "round", "stroke-linejoin": "round", "stroke-width": "24" })));
    }
    renderIndicator() {
        const isCompact = this.variant === 'compact';
        const stepNumber = this.stepIndex + 1;
        const status = this.safeStatus;
        if (isCompact) {
            return (h("div", { class: `step__dot step__dot--${status} step__dot--${this.size}` },
                h("span", { class: "sr-only" },
                    "Step ",
                    stepNumber,
                    " of ",
                    this.stepCount,
                    ": ",
                    this.slotContent,
                    this.status === 'completed' ? ' (completed)' : this.status === 'active' ? ' (current)' : '')));
        }
        // Default variant — numbered circles
        return (h("div", { class: `step__indicator step__indicator--${status} step__indicator--${this.size}` },
            this.status === 'completed' ? (this.hasIconSlot ? h("slot", { name: "icon" }) : this.getCheckmarkIcon()) : (this.hasIconSlot ? h("slot", { name: "icon" }) : h("span", { class: "step__number" }, stepNumber)),
            h("span", { class: "sr-only" },
                "Step ",
                stepNumber,
                " of ",
                this.stepCount,
                ":",
                this.status === 'completed' ? ' (completed)' : this.status === 'active' ? ' (current)' : '')));
    }
    /**
     * Horizontal before-connector (left side of indicator).
     * First step gets an invisible spacer for centering alignment.
     */
    renderConnectorBefore() {
        if (this.isFirst) {
            return h("div", { class: "step__spacer step__spacer--horizontal", "aria-hidden": "true" });
        }
        const connectorClass = [
            'step__connector',
            'step__connector--horizontal',
            'step__connector--before',
            this.isConnectorSolid ? 'step__connector--solid' : 'step__connector--dashed',
        ].join(' ');
        return h("div", { class: connectorClass, "aria-hidden": "true" });
    }
    /**
     * Horizontal after-connector (right side of indicator).
     * Last step gets an invisible spacer for centering alignment.
     */
    renderConnectorAfter() {
        if (this.isLast) {
            return h("div", { class: "step__spacer step__spacer--horizontal", "aria-hidden": "true" });
        }
        const isSolid = this.status === 'completed';
        const connectorClass = [
            'step__connector',
            'step__connector--horizontal',
            'step__connector--after',
            isSolid ? 'step__connector--solid' : 'step__connector--dashed',
        ].join(' ');
        return h("div", { class: connectorClass, "aria-hidden": "true" });
    }
    renderLabel() {
        const isCompact = this.variant === 'compact';
        const hideLabel = isCompact && this.orientation === 'horizontal';
        if (hideLabel)
            return null;
        const status = this.safeStatus;
        return (h("div", { class: `step__text step__text--${this.orientation}` },
            h("span", { class: `step__label step__label--${status}` }, this.slotContent),
            this.description && (h("span", { class: `step__description step__description--${status}` }, this.description))));
    }
    renderVerticalConnector() {
        const isSolid = this.status === 'completed';
        const connectorClass = [
            'step__connector',
            'step__connector--vertical',
            isSolid ? 'step__connector--solid' : 'step__connector--dashed',
        ].join(' ');
        return h("div", { class: connectorClass, "aria-hidden": "true" });
    }
    render() {
        const isHorizontal = this.orientation === 'horizontal';
        const status = this.safeStatus;
        const hostClasses = {
            'host--horizontal': isHorizontal,
            'host--vertical': !isHorizontal,
        };
        const liClasses = [
            'aegov-step',
            `step--${this.orientation}`,
            `step--${status}`,
        ].filter(Boolean).join(' ');
        const ariaCurrent = this.status === 'active' ? 'step' : undefined;
        if (isHorizontal) {
            return (h(Host, { class: hostClasses },
                h("li", { class: liClasses, "aria-current": ariaCurrent },
                    h("div", { class: "step__indicator-row" },
                        this.renderConnectorBefore(),
                        this.renderIndicator(),
                        this.renderConnectorAfter()),
                    this.renderLabel())));
        }
        // Vertical layout
        return (h(Host, { class: hostClasses },
            h("li", { class: liClasses, "aria-current": ariaCurrent },
                h("div", { class: "step__vertical-row" },
                    h("div", { class: "step__vertical-indicator" },
                        this.renderIndicator(),
                        !this.isLast && this.renderVerticalConnector()),
                    this.renderLabel()))));
    }
};
__decorate([
    Element()
], AegovTimelineStep.prototype, "el", void 0);
__decorate([
    Prop()
], AegovTimelineStep.prototype, "status", void 0);
__decorate([
    Prop()
], AegovTimelineStep.prototype, "description", void 0);
__decorate([
    Prop({ mutable: true })
], AegovTimelineStep.prototype, "variant", void 0);
__decorate([
    Prop({ mutable: true })
], AegovTimelineStep.prototype, "size", void 0);
__decorate([
    Prop({ mutable: true })
], AegovTimelineStep.prototype, "orientation", void 0);
__decorate([
    Prop({ mutable: true })
], AegovTimelineStep.prototype, "stepIndex", void 0);
__decorate([
    Prop({ mutable: true })
], AegovTimelineStep.prototype, "stepCount", void 0);
__decorate([
    Prop({ mutable: true })
], AegovTimelineStep.prototype, "isFirst", void 0);
__decorate([
    Prop({ mutable: true })
], AegovTimelineStep.prototype, "isLast", void 0);
__decorate([
    Prop({ mutable: true })
], AegovTimelineStep.prototype, "isConnectorSolid", void 0);
__decorate([
    State()
], AegovTimelineStep.prototype, "hasIconSlot", void 0);
__decorate([
    State()
], AegovTimelineStep.prototype, "slotContent", void 0);
__decorate([
    Watch('status')
], AegovTimelineStep.prototype, "onStatusChange", null);
AegovTimelineStep = __decorate([
    Component({
        tag: 'aegov-timeline-step',
        styleUrl: 'aegov-timeline-step.css',
        scoped: false,
    })
], AegovTimelineStep);
export { AegovTimelineStep };
