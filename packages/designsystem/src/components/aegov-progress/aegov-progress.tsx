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

  /** Accessible label applied as aria-label on the native progress element. Provide this or a visible <label for="fieldId"> for screen reader support. */
  @Prop() label?: string;

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
    if (isNaN(parseFloat(this.height))) {
      console.warn(`[aegov-progress] Invalid height prop "${this.height}". Expected a numeric Tailwind spacing unit (e.g. "2", "2.5", "4"). Defaulting to "2".`);
    }
  }

  componentDidLoad() {
    // Deferred via a real macrotask rather than checked synchronously here
    // (#59). The canonical "composing with a form field" pattern relies on
    // aegov-form-field wiring `label.htmlFor = progress.fieldId` in ITS OWN
    // componentDidLoad() — which, per Stencil's child-before-parent DidLoad
    // ordering, always runs AFTER this component's own componentDidLoad.
    // Checking synchronously here (or in componentWillLoad, which runs even
    // earlier) would see the label-less DOM mid-wiring and false-positive on
    // the exact pattern the docs recommend. A setTimeout(0) escapes the
    // current synchronous hydration batch entirely, so it reliably runs
    // after any ancestor's own DidLoad-time wiring has completed.
    setTimeout(() => this.checkAccessibleLabel(), 0);
  }

  private checkAccessibleLabel() {
    // A label can be satisfied by the `label` prop, a host aria-label/aria-labelledby
    // pass-through, or a real <label for="fieldId"> found anywhere in the document —
    // including one wired up after the fact by a parent like aegov-form-field, not
    // only one the caller manually pre-wired to a caller-supplied field-id.
    const hasAriaLabelPassThrough = this.el.hasAttribute('aria-label') || this.el.hasAttribute('aria-labelledby');
    const hasExternalLabel = !!document.querySelector(`label[for="${this.fieldId}"]`);
    if (!this.label && !hasAriaLabelPassThrough && !hasExternalLabel) {
      console.warn('[aegov-progress] Progress bar has no accessible label. Provide a label prop, an aria-label/aria-labelledby attribute, or a <label> element linked via fieldId.');
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
            aria-label={this.label || undefined}
            aria-valuetext={this.counterSuffix && !indeterminate && this.value != null ? `${this.value}${this.counterSuffix}` : undefined}
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
