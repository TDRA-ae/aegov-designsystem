import { Component, Prop, Element, Watch, h } from '@stencil/core';
import { TIMELINE_VARIANTS, TIMELINE_SIZES, TIMELINE_ORIENTATIONS } from '../../utils/types';
import type { TimelineVariant, TimelineSize, TimelineOrientation } from '../../utils/types';
import { getPassThroughAttributes } from '../../utils/attributes';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';

const TAG = 'aegov-timeline';
const ctx = (prop: string) => ({ component: TAG, prop });

@Component({
  tag: 'aegov-timeline',
  styleUrl: 'aegov-timeline.css',
  scoped: false,
})
export class AegovTimeline {
  @Element() el: HTMLElement;

  /**
   * Visual variant: default (numbered circles) or compact (dots).
   */
  @Prop() variant: TimelineVariant = 'default';

  /**
   * Size of step indicators.
   */
  @Prop() size: TimelineSize = 'base';

  /**
   * Layout orientation.
   */
  @Prop() orientation: TimelineOrientation = 'horizontal';

  private static readonly PASS_THROUGH_ATTRS = new Set(['id']);

  private getDirectChildren(): HTMLAegovTimelineStepElement[] {
    const all = Array.from(
      this.el.querySelectorAll('aegov-timeline-step')
    ) as HTMLAegovTimelineStepElement[];
    return all.filter(step => step.closest('aegov-timeline') === this.el);
  }

  updateSteps() {
    const steps = this.getDirectChildren();

    steps.forEach((step, index) => {
      step.variant = this.variant;
      step.size = this.size;
      step.orientation = this.orientation;
      step.stepIndex = index;
      step.stepCount = steps.length;
      step.isFirst = index === 0;
      step.isLast = index === steps.length - 1;
      step.connectorSolid = index > 0 && steps[index - 1].getAttribute('status') === 'completed';
    });
  }

  componentWillLoad() {
    warnIfInvalidEnumProp(this.variant, TIMELINE_VARIANTS, 'default', ctx('variant'));
    warnIfInvalidEnumProp(this.size, TIMELINE_SIZES, 'base', ctx('size'));
    warnIfInvalidEnumProp(this.orientation, TIMELINE_ORIENTATIONS, 'horizontal', ctx('orientation'));
  }

  @Watch('variant')
  onVariantChange(v: unknown) {
    warnIfInvalidEnumProp(v, TIMELINE_VARIANTS, 'default', ctx('variant'));
    this.updateSteps();
  }

  @Watch('size')
  onSizeChange(v: unknown) {
    warnIfInvalidEnumProp(v, TIMELINE_SIZES, 'base', ctx('size'));
    this.updateSteps();
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
    const passThroughAttrs = getPassThroughAttributes(this.el, AegovTimeline.PASS_THROUGH_ATTRS);
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
      <nav
        class={navClasses}
        aria-label="Timeline"
        {...passThroughAttrs}
      >
        <ol class={listClasses}>
          <slot />
        </ol>
      </nav>
    );
  }
}
