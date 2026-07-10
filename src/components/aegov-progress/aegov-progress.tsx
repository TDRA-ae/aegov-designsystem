import { Component, Host, h, Prop, Element } from '@stencil/core';
import type { ProgressCounter } from '../../utils/types';
import { getPassThroughAttributes } from '../../utils/attributes';
import { composeDescribedBy } from '../../utils/validation';
import { generateId } from '../../utils/id-generator';

@Component({
  tag: 'aegov-progress',
  styleUrl: 'aegov-progress.css',
  scoped: false,
})
export class AegovProgress {
  @Element() el: HTMLElement;

  /** Unique ID for the native progress element. Auto-generated if not provided. */
  @Prop({ mutable: true, reflect: true }) fieldId?: string;

  /** Current value. When not set, shows indeterminate state. */
  @Prop() value?: number;

  /** Maximum value. */
  @Prop() max: number = 100;

  /**
   * Height using Tailwind spacing scale (1, 1.5, 2, 2.5, 3, 3.5, 4, etc.).
   * Each unit = 0.25rem. Default "2" = h-2 = 0.5rem (8px).
   */
  @Prop() height: string = '2';

  /** Counter placement. Hidden when not set. */
  @Prop() counter?: ProgressCounter;

  /** Suffix appended directly to the counter value. No automatic spacing. */
  @Prop() counterSuffix: string = '';

  /** Description text displayed below the progress bar. */
  @Prop() description?: string;

  /** Additional CSS classes. */
  @Prop() extraClass?: string;

  private static readonly PASS_THROUGH_ATTRS = new Set([
    'tabindex', 'title', 'form',
  ]);

  componentWillLoad() {
    if (!this.fieldId) {
      this.fieldId = generateId('aegov-progress');
    }
  }

  private getHeightRem(): string {
    const val = parseFloat(this.height);
    if (isNaN(val)) return '0.5rem';
    return `${val * 0.25}rem`;
  }

  private getPercent(): number {
    if (this.value == null || this.max === 0) return 0;
    return Math.min(100, Math.max(0, (this.value / this.max) * 100));
  }

  private isIndeterminate(): boolean {
    return this.value == null;
  }

  render() {
    const passThroughAttrs = getPassThroughAttributes(this.el, AegovProgress.PASS_THROUGH_ATTRS);
    const heightRem = this.getHeightRem();
    const percent = this.getPercent();
    const indeterminate = this.isIndeterminate();
    const showCounter = !!this.counter && !indeterminate;
    const counterValue = this.value != null ? `${this.value}${this.counterSuffix}` : '';
    const descriptionId = this.description ? `${this.fieldId}-desc` : null;
    // Compose internal description ID with any author-provided aria-describedby
    const authorDescribedBy = passThroughAttrs['aria-describedby'] as string | undefined;
    delete passThroughAttrs['aria-describedby'];
    const describedBy = composeDescribedBy(authorDescribedBy, descriptionId);

    const wrapperClasses = [
      'aegov-progress',
      this.extraClass || '',
    ].filter(Boolean).join(' ');

    return (
      <Host>
        <div class={wrapperClasses}>
          {/* Top counter */}
          {this.counter === 'top' && showCounter && (
            <div class="progress__top-row">
              <span class="progress__counter progress__counter--top">{counterValue}</span>
            </div>
          )}

          {/* Track row */}
          <div class={`progress__row${this.counter === 'trailing' ? ' progress__row--trailing' : ''}`}>
            <div
              class={`progress__track${indeterminate ? ' progress__track--indeterminate' : ''}`}
              style={{ height: heightRem }}
              aria-hidden="true"
            >
              {!indeterminate && (
                <div
                  class="progress__fill"
                  style={{ width: `${percent}%` }}
                />
              )}
            </div>

            {/* Trailing counter */}
            {this.counter === 'trailing' && showCounter && (
              <span class="progress__counter progress__counter--trailing">{counterValue}</span>
            )}
          </div>

          {/* Hidden native progress for semantics and accessibility */}
          <progress
            class="progress__native"
            id={this.fieldId}
            value={indeterminate ? undefined : this.value}
            max={this.max}
            aria-describedby={describedBy}
            {...passThroughAttrs}
          >
            {!indeterminate ? `${percent}%` : ''}
          </progress>

          {/* Description */}
          {this.description && (
            <p id={descriptionId} class="progress__description">{this.description}</p>
          )}
        </div>
      </Host>
    );
  }
}
