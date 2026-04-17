import { Component, Prop, Watch, Element, State, Host, h } from '@stencil/core';
import { TIMELINE_STEP_STATUSES } from '../../utils/types';
import type { TimelineVariant, TimelineSize, TimelineOrientation, TimelineStepStatus } from '../../utils/types';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';

const TAG = 'aegov-timeline-step';
const ctx = (prop: string) => ({ component: TAG, prop });

@Component({
  tag: 'aegov-timeline-step',
  styleUrl: 'aegov-timeline-step.css',
  scoped: false,
})
export class AegovTimelineStep {
  @Element() el: HTMLAegovTimelineStepElement;

  /**
   * Step status.
   */
  @Prop() status: TimelineStepStatus = 'pending';

  /**
   * Optional description shown below the label.
   */
  @Prop() description?: string;

  /**
   * @internal Set by parent.
   */
  @Prop({ mutable: true }) variant: TimelineVariant = 'default';

  /**
   * @internal Set by parent.
   */
  @Prop({ mutable: true }) size: TimelineSize = 'base';

  /**
   * @internal Set by parent.
   */
  @Prop({ mutable: true }) orientation: TimelineOrientation = 'horizontal';

  /**
   * @internal 0-based index, set by parent.
   */
  @Prop({ mutable: true }) stepIndex: number = 0;

  /**
   * @internal Total step count, set by parent.
   */
  @Prop({ mutable: true }) stepCount: number = 1;

  /**
   * @internal Set by parent.
   */
  @Prop({ mutable: true }) isFirst: boolean = false;

  /**
   * @internal Set by parent.
   */
  @Prop({ mutable: true }) isLast: boolean = false;

  /**
   * @internal Whether connector before this step is solid (prev completed). Set by parent.
   */
  @Prop({ mutable: true }) connectorSolid: boolean = false;

  @State() hasIconSlot: boolean = false;
  @State() slotContent: string = '';

  @Watch('status')
  onStatusChange(v: unknown) { warnIfInvalidEnumProp(v, TIMELINE_STEP_STATUSES, 'pending', ctx('status')); }

  private get safeStatus(): TimelineStepStatus {
    return (TIMELINE_STEP_STATUSES as readonly string[]).includes(this.status) ? this.status : 'pending';
  }

  componentWillLoad() {
    warnIfInvalidEnumProp(this.status, TIMELINE_STEP_STATUSES, 'pending', ctx('status'));

    const parent = this.el.closest('aegov-timeline');
    if (!parent) {
      throw new Error(
        '[aegov-timeline-step] This component must be used inside <aegov-timeline>. ' +
        'It cannot be used as a standalone component.'
      );
    }

    // Capture slot content to prevent duplication
    const childNodes = Array.from(this.el.childNodes);
    this.hasIconSlot = this.el.querySelectorAll('[slot="icon"]').length > 0;

    // Extract text content (excluding slotted elements)
    this.slotContent = childNodes
      .filter(node => node.nodeType === Node.TEXT_NODE)
      .map(node => node.textContent?.trim())
      .filter(Boolean)
      .join(' ');

    // Remove text nodes to prevent duplication
    childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        node.remove();
      }
    });
  }

  private getCheckmarkIcon() {
    return (
      <svg aria-hidden="true" class="step__checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
        <rect width="256" height="256" fill="none"/>
        <polyline points="40 144 96 200 224 72" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/>
      </svg>
    );
  }

  private renderIndicator() {
    const isCompact = this.variant === 'compact';
    const stepNumber = this.stepIndex + 1;

    const status = this.safeStatus;

    if (isCompact) {
      return (
        <div class={`step__dot step__dot--${status} step__dot--${this.size}`}>
          <span class="sr-only">
            Step {stepNumber} of {this.stepCount}: {this.slotContent}
            {this.status === 'completed' ? ' (completed)' : this.status === 'active' ? ' (current)' : ''}
          </span>
        </div>
      );
    }

    // Default variant — numbered circles
    return (
      <div class={`step__indicator step__indicator--${status} step__indicator--${this.size}`}>
        {this.status === 'completed' ? (
          this.hasIconSlot ? <slot name="icon" /> : this.getCheckmarkIcon()
        ) : (
          this.hasIconSlot ? <slot name="icon" /> : <span class="step__number">{stepNumber}</span>
        )}
        <span class="sr-only">
          Step {stepNumber} of {this.stepCount}:
          {this.status === 'completed' ? ' (completed)' : this.status === 'active' ? ' (current)' : ''}
        </span>
      </div>
    );
  }

  /**
   * Horizontal before-connector (left side of indicator).
   * First step gets an invisible spacer for centering alignment.
   */
  private renderConnectorBefore() {
    if (this.isFirst) {
      return <div class="step__spacer step__spacer--horizontal" aria-hidden="true" />;
    }

    const connectorClass = [
      'step__connector',
      'step__connector--horizontal',
      'step__connector--before',
      this.connectorSolid ? 'step__connector--solid' : 'step__connector--dashed',
    ].join(' ');

    return <div class={connectorClass} aria-hidden="true" />;
  }

  /**
   * Horizontal after-connector (right side of indicator).
   * Last step gets an invisible spacer for centering alignment.
   */
  private renderConnectorAfter() {
    if (this.isLast) {
      return <div class="step__spacer step__spacer--horizontal" aria-hidden="true" />;
    }

    const isSolid = this.status === 'completed';
    const connectorClass = [
      'step__connector',
      'step__connector--horizontal',
      'step__connector--after',
      isSolid ? 'step__connector--solid' : 'step__connector--dashed',
    ].join(' ');

    return <div class={connectorClass} aria-hidden="true" />;
  }

  private renderLabel() {
    const isCompact = this.variant === 'compact';
    const hideLabel = isCompact && this.orientation === 'horizontal';

    if (hideLabel) return null;

    const status = this.safeStatus;

    return (
      <div class={`step__text step__text--${this.orientation}`}>
        <span class={`step__label step__label--${status}`}>
          {this.slotContent}
        </span>
        {this.description && (
          <span class={`step__description step__description--${status}`}>
            {this.description}
          </span>
        )}
      </div>
    );
  }

  private renderVerticalConnector() {
    const isSolid = this.status === 'completed';

    const connectorClass = [
      'step__connector',
      'step__connector--vertical',
      isSolid ? 'step__connector--solid' : 'step__connector--dashed',
    ].join(' ');

    return <div class={connectorClass} aria-hidden="true" />;
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
      return (
        <Host class={hostClasses}>
          <li class={liClasses} aria-current={ariaCurrent}>
            <div class="step__indicator-row">
              {this.renderConnectorBefore()}
              {this.renderIndicator()}
              {this.renderConnectorAfter()}
            </div>
            {this.renderLabel()}
          </li>
        </Host>
      );
    }

    // Vertical layout
    return (
      <Host class={hostClasses}>
        <li class={liClasses} aria-current={ariaCurrent}>
          <div class="step__vertical-row">
            <div class="step__vertical-indicator">
              {this.renderIndicator()}
              {!this.isLast && this.renderVerticalConnector()}
            </div>
            {this.renderLabel()}
          </div>
        </li>
      </Host>
    );
  }
}
