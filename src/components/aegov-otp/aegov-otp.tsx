import { Component, Host, h, Prop, Element, Event, EventEmitter, Watch, Method } from '@stencil/core';
import { OTP_VARIANTS, OTP_SIZES } from '../../utils/types';
import type { OtpVariant, OtpSize } from '../../utils/types';
import { getPassThroughAttributes } from '../../utils/attributes';
import { generateId } from '../../utils/id-generator';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';

const TAG = 'aegov-otp';
const ctx = (prop: string) => ({ component: TAG, prop });

@Component({
  tag: 'aegov-otp',
  styleUrl: 'aegov-otp.css',
  scoped: false,
})
export class AegovOtp {
  @Element() el: HTMLElement;

  /** Unique ID for the first input cell. Auto-generated if not provided. Used by aegov-label for linking. */
  @Prop({ mutable: true, reflect: true }) fieldId?: string;

  /**
   * Visual variant. "continuous" = single bordered box with dividers between cells.
   * "individual" = separate bordered boxes per digit.
   * Note: named "variant" to avoid conflict with native HTML "style" attribute.
   */
  @Prop() variant: OtpVariant = 'continuous';

  /** Number of input cells (digits/characters expected). */
  @Prop() length: number = 5;

  /** Size of the input cells. Maps to text size: xs, sm, base, lg, xl, 2xl. */
  @Prop() size: OtpSize = 'base';

  /** Allow letters and numbers when true. Numbers only when false. */
  @Prop() alphanumeric: boolean = false;

  /** Regex pattern string for validation. Checked when all cells are filled. */
  @Prop() pattern?: string;

  /** Disables all input cells. */
  @Prop() disabled: boolean = false;

  /** Form field name for the hidden input (used in form submission). */
  @Prop() name?: string;

  /** Current OTP value. Can be set externally to pre-fill cells. */
  @Prop({ mutable: true }) value: string = '';

  /** Additional CSS classes. */
  @Prop() class?: string;

  /** Fires on every character change with the current value. */
  @Event() aegovOtpChange: EventEmitter<{ value: string }>;

  /** Fires when all cells are filled (and pattern is valid if set). */
  @Event() aegovOtpComplete: EventEmitter<{ value: string }>;

  /** Fires when all cells are filled but pattern validation fails. */
  @Event() aegovOtpInvalid: EventEmitter<{ value: string; pattern: string }>;

  private cellRefs: HTMLInputElement[] = [];
  private hiddenRef: HTMLInputElement;
  private internalUpdate = false;

  componentWillLoad() {
    warnIfInvalidEnumProp(this.variant, OTP_VARIANTS, 'continuous', ctx('variant'));
    warnIfInvalidEnumProp(this.size, OTP_SIZES, 'base', ctx('size'));
    if (!this.fieldId) {
      this.fieldId = generateId('aegov-otp');
    }
  }

  @Watch('variant')
  onVariantChange(v: unknown) { warnIfInvalidEnumProp(v, OTP_VARIANTS, 'continuous', ctx('variant')); }

  @Watch('size')
  onSizeChange(v: unknown) { warnIfInvalidEnumProp(v, OTP_SIZES, 'base', ctx('size')); }

  componentDidLoad() {
    if (this.value) {
      this.distributeValue(this.value);
    }
  }

  @Watch('value')
  onValueChange(newVal: string) {
    if (this.internalUpdate) {
      this.internalUpdate = false;
      return;
    }
    this.distributeValue(newVal);
  }

  /** Clears all cells and focuses the first cell. */
  @Method()
  async clear() {
    for (const ref of this.cellRefs) {
      if (ref) ref.value = '';
    }
    this.internalUpdate = true;
    this.value = '';
    if (this.hiddenRef) this.hiddenRef.value = '';
    this.aegovOtpChange.emit({ value: '' });
    this.cellRefs[0]?.focus();
  }

  private distributeValue(val: string) {
    const clean = (val || '').replace(/\s/g, '');
    for (let i = 0; i < this.length; i++) {
      if (this.cellRefs[i]) {
        this.cellRefs[i].value = clean[i] || '';
      }
    }
  }

  private collectValue(): string {
    return this.cellRefs.map(r => r?.value || '').join('');
  }

  private isValidChar(char: string): boolean {
    if (this.alphanumeric) {
      return /^[a-zA-Z0-9]$/.test(char);
    }
    return /^[0-9]$/.test(char);
  }

  private emitChange() {
    const val = this.collectValue();
    this.internalUpdate = true;
    this.value = val;
    if (this.hiddenRef) {
      this.hiddenRef.value = val;
    }
    this.aegovOtpChange.emit({ value: val });

    const filled = this.cellRefs.filter(r => r?.value).length;
    if (filled === this.length) {
      if (this.pattern) {
        const regex = new RegExp(this.pattern);
        if (!regex.test(val)) {
          this.aegovOtpInvalid.emit({ value: val, pattern: this.pattern });
          return;
        }
      }
      this.aegovOtpComplete.emit({ value: val });
    }
  }

  private handleInput = (index: number, e: Event) => {
    const input = e.target as HTMLInputElement;
    const val = input.value;

    if (val.length === 0) {
      this.emitChange();
      return;
    }

    // Multi-character: distribute across cells (handles autofill or overtype)
    if (val.length > 1) {
      const cleaned = val.replace(/\s/g, '');
      let ci = index;
      for (const ch of cleaned) {
        if (ci >= this.length) break;
        if (this.isValidChar(ch)) {
          this.cellRefs[ci].value = ch;
          ci++;
        }
      }
      input.value = this.cellRefs[index]?.value || '';
      this.emitChange();
      const focusIdx = Math.min(ci, this.length - 1);
      this.cellRefs[focusIdx]?.focus();
      return;
    }

    // Single character
    if (!this.isValidChar(val)) {
      input.value = '';
      return;
    }

    this.emitChange();

    if (index < this.length - 1) {
      this.cellRefs[index + 1]?.focus();
    }
  };

  private handleKeyDown = (index: number, e: KeyboardEvent) => {
    if (e.key === 'Backspace') {
      const input = e.target as HTMLInputElement;
      if (input.value === '' && index > 0) {
        e.preventDefault();
        this.cellRefs[index - 1].value = '';
        this.cellRefs[index - 1].focus();
        this.emitChange();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      this.cellRefs[index - 1].focus();
    } else if (e.key === 'ArrowRight' && index < this.length - 1) {
      e.preventDefault();
      this.cellRefs[index + 1].focus();
    } else if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
      // Ensure existing content is selected so new char replaces it
      const input = e.target as HTMLInputElement;
      if (input.value) {
        input.select();
      }
    }
  };

  private handlePaste = (_index: number, e: ClipboardEvent) => {
    e.preventDefault();
    const pasted = (e.clipboardData?.getData('text') || '').replace(/\s/g, '');

    // Always fill from cell 0 on paste (most common OTP paste behavior)
    let ci = 0;
    for (const ch of pasted) {
      if (ci >= this.length) break;
      if (this.isValidChar(ch)) {
        this.cellRefs[ci].value = ch;
        ci++;
      }
    }

    this.emitChange();

    const nextEmpty = this.cellRefs.findIndex(r => !r?.value);
    const focusIdx = nextEmpty !== -1 ? nextEmpty : Math.min(ci, this.length - 1);
    this.cellRefs[focusIdx]?.focus();
  };

  private handleFocus = (e: FocusEvent) => {
    (e.target as HTMLInputElement).select();
  };

  private handleClick = (e: MouseEvent) => {
    (e.target as HTMLInputElement).select();
  };

  render() {
    const passThroughAttrs = getPassThroughAttributes(this.el, new Set([]));
    const wrapperClasses = ['aegov-otp', this.class || ''].filter(Boolean).join(' ');
    const cells = Array.from({ length: this.length }, (_, i) => i);
    const variant: OtpVariant = (OTP_VARIANTS as readonly string[]).includes(this.variant) ? this.variant : 'continuous';
    const size: OtpSize = (OTP_SIZES as readonly string[]).includes(this.size) ? this.size : 'base';

    return (
      <Host>
        <div class={wrapperClasses}>
          <div
            class={`otp__wrapper otp__wrapper--${variant}`}
            role="group"
            {...passThroughAttrs}
          >
            {cells.map((index) => [
              <input
                ref={(el) => { this.cellRefs[index] = el; }}
                id={index === 0 ? this.fieldId : undefined}
                class={`otp__cell otp__cell--${size}`}
                type="text"
                inputMode={this.alphanumeric ? 'text' : 'numeric'}
                disabled={this.disabled}
                autocomplete={index === 0 ? 'one-time-code' : 'off'}
                aria-label={`Character ${index + 1} of ${this.length}`}
                onInput={(e) => this.handleInput(index, e)}
                onKeyDown={(e) => this.handleKeyDown(index, e)}
                onPaste={(e: any) => this.handlePaste(index, e)}
                onFocus={(e) => this.handleFocus(e)}
                onClick={(e) => this.handleClick(e)}
              />,
              variant === 'continuous' && index < this.length - 1 && (
                <span class="otp__divider" aria-hidden="true"></span>
              ),
            ])}
          </div>

          {/* Hidden input for form submission */}
          <input
            ref={(el) => { this.hiddenRef = el; }}
            type="hidden"
            name={this.name}
            value={this.value}
          />
        </div>
      </Host>
    );
  }
}
