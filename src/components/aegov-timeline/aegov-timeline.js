var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component, Prop, State, Element, Watch, h } from '@stencil/core';
import { TIMELINE_VARIANTS, TIMELINE_SIZES, TIMELINE_ORIENTATIONS } from '../../utils/types';
import { getPassThroughAttributes } from '../../utils/attributes';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { watchResponsiveProp } from '../../utils/responsive-prop';
import { generateId } from '../../utils/id-generator';
const TAG = 'aegov-timeline';
const ctx = (prop) => ({ component: TAG, prop });
let AegovTimeline = class AegovTimeline {
    constructor() {
        /**
         * Visual variant: default (numbered circles) or compact (dots).
         */
        this.variant = 'default';
        /**
         * Size of step indicators.
         */
        this.size = 'base';
        this._resolvedSize = 'base';
        this._sizeWatcher = null;
        /**
         * Layout orientation.
         */
        this.orientation = 'horizontal';
    }
    getDirectChildren() {
        const all = Array.from(this.el.querySelectorAll('aegov-timeline-step'));
        return all.filter(step => step.closest('aegov-timeline') === this.el);
    }
    updateSteps() {
        const steps = this.getDirectChildren();
        steps.forEach((step, index) => {
            step.variant = this.variant;
            step.size = this._resolvedSize;
            step.orientation = this.orientation;
            step.stepIndex = index;
            step.stepCount = steps.length;
            step.isFirst = index === 0;
            step.isLast = index === steps.length - 1;
            step.isConnectorSolid = index > 0 && steps[index - 1].getAttribute('status') === 'completed';
        });
    }
    componentWillLoad() {
        if (!this.fieldId) {
            this.fieldId = generateId('aegov-timeline');
        }
        warnIfInvalidEnumProp(this.variant, TIMELINE_VARIANTS, 'default', ctx('variant'));
        warnIfInvalidEnumProp(this.orientation, TIMELINE_ORIENTATIONS, 'horizontal', ctx('orientation'));
        this._sizeWatcher = watchResponsiveProp(this.size, TIMELINE_SIZES, 'base', v => {
            this._resolvedSize = v;
            if (this.el.isConnected) {
                this.updateSteps();
            }
        });
        this._resolvedSize = this._sizeWatcher.current;
    }
    onVariantChange(v) {
        warnIfInvalidEnumProp(v, TIMELINE_VARIANTS, 'default', ctx('variant'));
        this.updateSteps();
    }
    disconnectedCallback() {
        var _a;
        (_a = this._sizeWatcher) === null || _a === void 0 ? void 0 : _a.destroy();
    }
    onSizeChange() {
        var _a;
        (_a = this._sizeWatcher) === null || _a === void 0 ? void 0 : _a.destroy();
        this._sizeWatcher = watchResponsiveProp(this.size, TIMELINE_SIZES, 'base', v => {
            this._resolvedSize = v;
            if (this.el.isConnected) {
                this.updateSteps();
            }
        });
        this._resolvedSize = this._sizeWatcher.current;
    }
    onOrientationChange(v) {
        warnIfInvalidEnumProp(v, TIMELINE_ORIENTATIONS, 'horizontal', ctx('orientation'));
        this.updateSteps();
    }
    componentDidLoad() {
        this.updateSteps();
    }
    componentDidUpdate() {
        this.updateSteps();
    }
    render() {
        const passThroughAttrs = getPassThroughAttributes(this.el);
        const orientation = TIMELINE_ORIENTATIONS.includes(this.orientation) ? this.orientation : 'horizontal';
        const variant = TIMELINE_VARIANTS.includes(this.variant) ? this.variant : 'default';
        const listClasses = [
            'timeline__list',
            `timeline__list--${orientation}`,
        ].join(' ');
        const navClasses = [
            'aegov-timeline',
            variant === 'compact' ? 'aegov-timeline--compact' : '',
        ].filter(Boolean).join(' ');
        return (h("nav", Object.assign({ id: this.fieldId, class: navClasses, "aria-label": "Timeline" }, passThroughAttrs),
            h("ol", { class: listClasses },
                h("slot", null))));
    }
};
__decorate([
    Element()
], AegovTimeline.prototype, "el", void 0);
__decorate([
    Prop({ mutable: true, reflect: true })
], AegovTimeline.prototype, "fieldId", void 0);
__decorate([
    Prop()
], AegovTimeline.prototype, "variant", void 0);
__decorate([
    Prop()
], AegovTimeline.prototype, "size", void 0);
__decorate([
    State()
], AegovTimeline.prototype, "_resolvedSize", void 0);
__decorate([
    Prop()
], AegovTimeline.prototype, "orientation", void 0);
__decorate([
    Watch('variant')
], AegovTimeline.prototype, "onVariantChange", null);
__decorate([
    Watch('size')
], AegovTimeline.prototype, "onSizeChange", null);
__decorate([
    Watch('orientation')
], AegovTimeline.prototype, "onOrientationChange", null);
AegovTimeline = __decorate([
    Component({
        tag: 'aegov-timeline',
        styleUrl: 'aegov-timeline.css',
        scoped: false,
    })
], AegovTimeline);
export { AegovTimeline };
