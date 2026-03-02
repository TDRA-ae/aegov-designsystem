import { Component, Prop, Element, Watch, h } from '@stencil/core';
import type { ProgressVariant, ProgressSize, ProgressOrientation } from '../../utils/types';

@Component({
  tag: 'aegov-progress',
  styleUrl: 'aegov-progress.css',
  scoped: true,
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

  private getPassThroughAttributes(): { [key: string]: string } {
    const attrs: { [key: string]: string } = {};
    Array.from(this.el.attributes).forEach(attr => {
      if (attr.name.startsWith('aria-') || attr.name.startsWith('data-') || attr.name === 'id') {
        attrs[attr.name] = attr.value;
      }
    });
    return attrs;
  }

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
    const passThroughAttrs = this.getPassThroughAttributes();
    const listClasses = [
      'progress__list',
      `progress__list--${this.orientation}`,
    ].join(' ');

    return (
      <nav
        class="progress"
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
