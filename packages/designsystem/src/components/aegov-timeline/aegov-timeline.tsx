import { Component, Prop, State, Element, Watch, h } from '@stencil/core';
import { TIMELINE_VARIANTS, TIMELINE_SIZES, TIMELINE_ORIENTATIONS } from '../../utils/types';
import type { TimelineVariant, TimelineSize, TimelineOrientation } from '../../utils/types';
import { getPassThroughAttributes } from '../../utils/attributes';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { watchResponsiveProp } from '../../utils/responsive-prop';
import type { ResponsivePropWatcher } from '../../utils/responsive-prop';
import { generateId } from '../../utils/id-generator';
import { isRtl } from '../../utils/rtl';

const TAG = 'aegov-timeline';
const ctx = (prop: string) => ({ component: TAG, prop });

const STRINGS = {
  en: { timeline: 'Timeline' },
  ar: { timeline: 'الجدول الزمني' },
};

@Component({
  tag: 'aegov-timeline',
  styleUrl: 'aegov-timeline.css',
  scoped: false,
})
export class AegovTimeline {
  @Element() el: HTMLElement;

  /**
   * Unique ID for the timeline nav element. Auto-generated if not provided.
   */
  @Prop({ mutable: true, reflect: true }) fieldId?: string;

  /**
   * Visual variant: default (numbered circles) or compact (dots).
   */
  @Prop() variant: TimelineVariant = 'default';

  /**
   * Size of step indicators.
   */
  @Prop() size: string = 'base';
  @State() private _resolvedSize: TimelineSize = 'base';
  private _sizeWatcher: ResponsivePropWatcher | null = null;

  /**
   * Layout orientation.
   */
  @Prop() orientation: TimelineOrientation = 'horizontal';

  private getDirectChildren(): HTMLAegovTimelineStepElement[] {
    const all = Array.from(
      this.el.querySelectorAll('aegov-timeline-step')
    ) as HTMLAegovTimelineStepElement[];
    return all.filter(step => step.closest('aegov-timeline') === this.el);
  }

  updateSteps() {
    const steps = this.getDirectChildren();
    // Cascade the SANITIZED values, not the raw props — the parent's own rendering
    // already falls back invalid variant/orientation to their defaults, and children
    // must match. Previously an invalid orientation cascaded unvalidated: a child only
    // checks `orientation === 'horizontal'`, so any non-'horizontal' string (including
    // the invalid one) made it render as vertical while the parent's own wrapper still
    // rendered horizontal-oriented classes — a real horizontal/vertical layout mismatch.
    const variant: TimelineVariant = (TIMELINE_VARIANTS as readonly string[]).includes(this.variant) ? this.variant : 'default';
    const orientation: TimelineOrientation = (TIMELINE_ORIENTATIONS as readonly string[]).includes(this.orientation) ? this.orientation : 'horizontal';

    steps.forEach((step, index) => {
      const previousStep = steps[index - 1] as HTMLAegovTimelineStepElement | undefined;
      const previousStatus = previousStep?.getAttribute('status') ?? previousStep?.status;

      step.variant = variant;
      step.size = this._resolvedSize;
      step.orientation = orientation;
      step.stepIndex = index;
      step.stepCount = steps.length;
      step.isFirst = index === 0;
      step.isLast = index === steps.length - 1;
      step.isConnectorSolid = index > 0 && previousStatus === 'completed';
    });
  }

  componentWillLoad() {
    if (!this.fieldId) {
      this.fieldId = generateId('aegov-timeline');
    }
    warnIfInvalidEnumProp(this.variant, TIMELINE_VARIANTS, 'default', ctx('variant'));
    warnIfInvalidEnumProp(this.orientation, TIMELINE_ORIENTATIONS, 'horizontal', ctx('orientation'));
    this._sizeWatcher = watchResponsiveProp(this.size, TIMELINE_SIZES, 'base', v => {
      this._resolvedSize = v as TimelineSize;
      if (this.el.isConnected) { this.updateSteps(); }
    });
    this._resolvedSize = this._sizeWatcher.current as TimelineSize;
  }

  @Watch('variant')
  onVariantChange(v: unknown) {
    warnIfInvalidEnumProp(v, TIMELINE_VARIANTS, 'default', ctx('variant'));
    this.updateSteps();
  }

  disconnectedCallback() {
    this._sizeWatcher?.destroy();
  }

  @Watch('size')
  onSizeChange() {
    this._sizeWatcher?.destroy();
    this._sizeWatcher = watchResponsiveProp(this.size, TIMELINE_SIZES, 'base', v => {
      this._resolvedSize = v as TimelineSize;
      if (this.el.isConnected) { this.updateSteps(); }
    });
    this._resolvedSize = this._sizeWatcher.current as TimelineSize;
  }

  @Watch('orientation')
  onOrientationChange(v: unknown) {
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
    const authorLabel = passThroughAttrs['aria-label'] as string | undefined;
    delete passThroughAttrs['aria-label'];
    const rtl = isRtl(this.el);
    const navLabel = authorLabel || (rtl ? STRINGS.ar.timeline : STRINGS.en.timeline);

    const orientation: TimelineOrientation = (TIMELINE_ORIENTATIONS as readonly string[]).includes(this.orientation) ? this.orientation : 'horizontal';
    const variant: TimelineVariant = (TIMELINE_VARIANTS as readonly string[]).includes(this.variant) ? this.variant : 'default';
    const listClasses = [
      'timeline__list',
      `timeline__list--${orientation}`,
    ].join(' ');

    const navClasses = [
      'aegov-timeline',
      variant === 'compact' ? 'aegov-timeline--compact' : '',
    ].filter(Boolean).join(' ');

    return (
      <section
        id={this.fieldId}
        class={navClasses}
        aria-label={navLabel}
        {...passThroughAttrs}
      >
        {/* role="list" on a div, not <ol>: the items are aegov-timeline-step
            hosts (role="listitem"), which an <ol> may not contain. */}
        <div class={listClasses} role="list">
          <slot />
        </div>
      </section>
    );
  }
}