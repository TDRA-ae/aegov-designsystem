import { Component, Prop, Element, Watch, h } from '@stencil/core';
import type { ProgressVariant, ProgressSize, ProgressOrientation } from '../../utils/types';
import { getPassThroughAttributes } from '../../utils/attributes';

@Component({
  tag: 'aegov-progress',
  styleUrl: 'aegov-progress.css',
  scoped: false,
})
export class AegovProgress {
  @Element() el: HTMLElement;

  /**
   * Visual variant: default (numbered circles) or compact (dots).
   */
  @Prop() variant: ProgressVariant = 'default';

  /**
   * Size of step indicators.
   */
  @Prop() size: ProgressSize = 'base';

  /**
   * Layout orientation.
   */
  @Prop() orientation: ProgressOrientation = 'horizontal';

  private static readonly PASS_THROUGH_ATTRS = new Set(['id']);

  private getDirectChildren(): HTMLAegovProgressStepElement[] {
    const all = Array.from(
      this.el.querySelectorAll('aegov-progress-step')
    ) as HTMLAegovProgressStepElement[];
    return all.filter(step => step.closest('aegov-progress') === this.el);
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
    const passThroughAttrs = getPassThroughAttributes(this.el, AegovProgress.PASS_THROUGH_ATTRS);
    const listClasses = [
      'progress__list',
      `progress__list--${this.orientation}`,
    ].join(' ');

    return (
      <nav
        class="aegov-progress"
        aria-label="Progress"
        {...passThroughAttrs}
      >
        <ol class={listClasses}>
          <slot />
        </ol>
      </nav>
    );
  }
}
