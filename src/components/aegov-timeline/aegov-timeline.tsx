import { Component, Prop, Element, Watch, h } from '@stencil/core';
import type { TimelineVariant, TimelineSize, TimelineOrientation } from '../../utils/types';
import { getPassThroughAttributes } from '../../utils/attributes';

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

  @Watch('variant')
  @Watch('size')
  @Watch('orientation')
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

  componentDidLoad() {
    this.updateSteps();
  }

  componentDidUpdate() {
    this.updateSteps();
  }

  render() {
    const passThroughAttrs = getPassThroughAttributes(this.el, AegovTimeline.PASS_THROUGH_ATTRS);
    const listClasses = [
      'timeline__list',
      `timeline__list--${this.orientation}`,
    ].join(' ');

    return (
      <nav
        class="aegov-timeline"
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
