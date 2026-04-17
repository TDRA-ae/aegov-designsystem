import { Component, Host, h, Prop, State, Event, EventEmitter, Element, Watch } from '@stencil/core';
import { RANGE_SIZES, RANGE_DISPLAYS, RANGE_ORIENTATIONS, RANGE_MODES } from '../../utils/types';
import type { RangeSize, RangeDisplay, RangeOrientation, RangeMode } from '../../utils/types';
import { getPassThroughAttributes } from '../../utils/attributes';
import { generateId } from '../../utils/id-generator';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';

const TAG = 'aegov-range';
const ctx = (prop: string) => ({ component: TAG, prop });

@Component({
  tag: 'aegov-range',
  styleUrl: 'aegov-range.css',
  scoped: false,
  shadow: false,
})
export class AegovRange {
  @Element() el: HTMLElement;

  /** Unique ID for the native range input element. Auto-generated if not provided. */
  @Prop({ mutable: true, reflect: true }) fieldId?: string;

  /** The name attribute for the range. */
  @Prop() name?: string;

  /** Current value (single mode). */
  @Prop({ mutable: true }) value: number = 50;

  /** Low thumb value (range mode). */
  @Prop({ mutable: true }) valueLow: number = 25;

  /** High thumb value (range mode). */
  @Prop({ mutable: true }) valueHigh: number = 75;

  /** Minimum value. */
  @Prop() min: number = 0;

  /** Maximum value. */
  @Prop() max: number = 100;

  /** Step increment. */
  @Prop() step: number = 1;

  /** Size of the range track. Thumb remains constant. */
  @Prop() size: RangeSize = 'base';

  /** Value display mode. */
  @Prop() display: RangeDisplay = 'none';

  /** Layout orientation. */
  @Prop() orientation: RangeOrientation = 'horizontal';

  /** Single thumb or dual thumb (range selection). */
  @Prop() mode: RangeMode = 'single';

  /** Whether the range is disabled. */
  @Prop({ reflect: true }) disabled: boolean = false;

  /** Whether the range is required. */
  @Prop() required: boolean = false;

  /** Optional label text. */
  @Prop() label?: string;

  /** Additional CSS classes. */
  @Prop() class?: string;

  @State() activeThumb: 'single' | 'low' | 'high' | null = null;

  /** Emitted during drag on every value update. */
  @Event() aegovRangeInput: EventEmitter<{ value?: number; valueLow?: number; valueHigh?: number }>;

  /** Emitted on release (value committed). */
  @Event() aegovRangeChange: EventEmitter<{ value?: number; valueLow?: number; valueHigh?: number }>;

  private trackWrapperEl?: HTMLElement;

  componentWillLoad() {
    warnIfInvalidEnumProp(this.size, RANGE_SIZES, 'base', ctx('size'));
    warnIfInvalidEnumProp(this.display, RANGE_DISPLAYS, 'none', ctx('display'));
    warnIfInvalidEnumProp(this.orientation, RANGE_ORIENTATIONS, 'horizontal', ctx('orientation'));
    warnIfInvalidEnumProp(this.mode, RANGE_MODES, 'single', ctx('mode'));
    if (!this.fieldId) {
      this.fieldId = generateId('aegov-range');
    }
  }

  @Watch('size')
  onSizeChange(v: unknown) { warnIfInvalidEnumProp(v, RANGE_SIZES, 'base', ctx('size')); }

  @Watch('display')
  onDisplayChange(v: unknown) { warnIfInvalidEnumProp(v, RANGE_DISPLAYS, 'none', ctx('display')); }

  @Watch('orientation')
  onOrientationChange(v: unknown) { warnIfInvalidEnumProp(v, RANGE_ORIENTATIONS, 'horizontal', ctx('orientation')); }

  @Watch('mode')
  onModeChange(v: unknown) { warnIfInvalidEnumProp(v, RANGE_MODES, 'single', ctx('mode')); }

  private static readonly NATIVE_RANGE_ATTRS = new Set([
    'tabindex', 'autofocus', 'title', 'form',
  ]);

  // ── Helpers ──

  private getPercent(val: number): number {
    const range = this.max - this.min;
    if (range === 0) return 0;
    return ((val - this.min) / range) * 100;
  }

  private snapToStep(val: number): number {
    const stepped = Math.round((val - this.min) / this.step) * this.step + this.min;
    return Math.min(this.max, Math.max(this.min, parseFloat(stepped.toFixed(10))));
  }

  private emitInput() {
    if (this.mode === 'range') {
      this.aegovRangeInput.emit({ valueLow: this.valueLow, valueHigh: this.valueHigh });
    } else {
      this.aegovRangeInput.emit({ value: this.value });
    }
  }

  private emitChange() {
    if (this.mode === 'range') {
      this.aegovRangeChange.emit({ valueLow: this.valueLow, valueHigh: this.valueHigh });
    } else {
      this.aegovRangeChange.emit({ value: this.value });
    }
  }

  // ── Native input handlers (keyboard) ──

  private handleSingleInput = (e: Event) => {
    const input = e.target as HTMLInputElement;
    this.value = this.snapToStep(parseFloat(input.value));
    this.emitInput();
  };

  private handleSingleChange = (e: Event) => {
    const input = e.target as HTMLInputElement;
    this.value = this.snapToStep(parseFloat(input.value));
    this.emitChange();
  };

  private handleLowInput = (e: Event) => {
    const input = e.target as HTMLInputElement;
    const newVal = this.snapToStep(Math.min(parseFloat(input.value), this.valueHigh - this.step));
    this.valueLow = newVal;
    input.value = String(newVal);
    this.emitInput();
  };

  private handleLowChange = (e: Event) => {
    const input = e.target as HTMLInputElement;
    const newVal = this.snapToStep(Math.min(parseFloat(input.value), this.valueHigh - this.step));
    this.valueLow = newVal;
    input.value = String(newVal);
    this.emitChange();
  };

  private handleHighInput = (e: Event) => {
    const input = e.target as HTMLInputElement;
    const newVal = this.snapToStep(Math.max(parseFloat(input.value), this.valueLow + this.step));
    this.valueHigh = newVal;
    input.value = String(newVal);
    this.emitInput();
  };

  private handleHighChange = (e: Event) => {
    const input = e.target as HTMLInputElement;
    const newVal = this.snapToStep(Math.max(parseFloat(input.value), this.valueLow + this.step));
    this.valueHigh = newVal;
    input.value = String(newVal);
    this.emitChange();
  };

  // ── Pointer drag handlers ──

  private updateValueFromPointer(clientX: number, clientY: number, which: 'single' | 'low' | 'high') {
    const wrapper = this.trackWrapperEl;
    if (!wrapper) return;
    const rect = wrapper.getBoundingClientRect();

    let percent: number;
    if (this.orientation === 'vertical') {
      // Bottom = min, top = max
      percent = 1 - (clientY - rect.top) / rect.height;
    } else {
      const isRtl = getComputedStyle(this.el).direction === 'rtl';
      percent = isRtl
        ? 1 - (clientX - rect.left) / rect.width
        : (clientX - rect.left) / rect.width;
    }

    percent = Math.max(0, Math.min(1, percent));
    const rawValue = this.min + percent * (this.max - this.min);
    const snapped = this.snapToStep(rawValue);

    if (which === 'single') {
      this.value = snapped;
    } else if (which === 'low') {
      this.valueLow = Math.min(snapped, this.valueHigh - this.step);
    } else {
      this.valueHigh = Math.max(snapped, this.valueLow + this.step);
    }

    this.emitInput();
  }

  private focusNativeInput(which: 'single' | 'low' | 'high') {
    const wrapper = this.trackWrapperEl;
    if (!wrapper) return;
    let input: HTMLInputElement | null;
    if (which === 'low') {
      input = wrapper.querySelector('.range__input--low');
    } else if (which === 'high') {
      input = wrapper.querySelector('.range__input--high');
    } else {
      input = wrapper.querySelector('.range__input');
    }
    if (input) input.focus();
  }

  private handleThumbMouseDown = (e: MouseEvent, which: 'single' | 'low' | 'high') => {
    if (this.disabled) return;
    e.preventDefault();
    this.activeThumb = which;
    this.focusNativeInput(which);

    const moveHandler = (moveEvent: MouseEvent) => {
      this.updateValueFromPointer(moveEvent.clientX, moveEvent.clientY, which);
    };
    const upHandler = () => {
      this.activeThumb = null;
      document.removeEventListener('mousemove', moveHandler);
      document.removeEventListener('mouseup', upHandler);
      this.emitChange();
    };
    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('mouseup', upHandler);
  };

  private handleThumbTouchStart = (e: TouchEvent, which: 'single' | 'low' | 'high') => {
    if (this.disabled) return;
    e.preventDefault();
    this.activeThumb = which;
    this.focusNativeInput(which);

    const moveHandler = (moveEvent: TouchEvent) => {
      const touch = moveEvent.touches[0];
      this.updateValueFromPointer(touch.clientX, touch.clientY, which);
    };
    const endHandler = () => {
      this.activeThumb = null;
      document.removeEventListener('touchmove', moveHandler);
      document.removeEventListener('touchend', endHandler);
      this.emitChange();
    };
    document.addEventListener('touchmove', moveHandler, { passive: false });
    document.addEventListener('touchend', endHandler);
  };

  private handleTrackClick = (e: MouseEvent) => {
    if (this.disabled) return;
    // Determine which thumb to move in range mode (closest to click)
    if (this.mode === 'range') {
      const wrapper = this.trackWrapperEl;
      if (!wrapper) return;
      const rect = wrapper.getBoundingClientRect();
      let percent: number;
      if (this.orientation === 'vertical') {
        percent = 1 - (e.clientY - rect.top) / rect.height;
      } else {
        const isRtl = getComputedStyle(this.el).direction === 'rtl';
        percent = isRtl
          ? 1 - (e.clientX - rect.left) / rect.width
          : (e.clientX - rect.left) / rect.width;
      }
      percent = Math.max(0, Math.min(1, percent));
      const rawValue = this.min + percent * (this.max - this.min);
      const distLow = Math.abs(rawValue - this.valueLow);
      const distHigh = Math.abs(rawValue - this.valueHigh);
      const which = distLow <= distHigh ? 'low' : 'high';
      this.updateValueFromPointer(e.clientX, e.clientY, which);
      this.focusNativeInput(which);
      this.emitChange();
    } else {
      this.updateValueFromPointer(e.clientX, e.clientY, 'single');
      this.focusNativeInput('single');
      this.emitChange();
    }
  };

  // ── Render helpers ──

  private renderThumb(
    which: 'single' | 'low' | 'high',
    showTooltip: boolean,
    showThumbValue: boolean,
  ) {
    const value = which === 'low' ? this.valueLow
      : which === 'high' ? this.valueHigh
      : this.value;

    const thumbClasses = [
      'range__thumb',
      `range__thumb--${which}`,
      showThumbValue ? 'range__thumb--display-thumb' : '',
      this.activeThumb === which ? 'range__thumb--active' : '',
    ].filter(Boolean).join(' ');

    const percent = this.getPercent(value);
    const posVar = which === 'low' ? '--range-thumb-low-percent'
      : which === 'high' ? '--range-thumb-high-percent'
      : '--range-thumb-percent';

    const posProperty = this.orientation === 'vertical' ? 'bottom' : 'inset-inline-start';

    return (
      <div
        class={thumbClasses}
        style={{ [posProperty]: `var(${posVar}, ${percent}%)` }}
        onMouseDown={(e: MouseEvent) => this.handleThumbMouseDown(e, which)}
        onTouchStart={(e: TouchEvent) => this.handleThumbTouchStart(e, which)}
      >
        {showThumbValue && <span class="range__thumb-value">{value}</span>}
        {showTooltip && <span class="range__tooltip">{value}</span>}
      </div>
    );
  }

  render() {
    const passThroughAttrs = getPassThroughAttributes(this.el, AegovRange.NATIVE_RANGE_ATTRS);
    const size: RangeSize = (RANGE_SIZES as readonly string[]).includes(this.size) ? this.size : 'base';
    const display: RangeDisplay = (RANGE_DISPLAYS as readonly string[]).includes(this.display) ? this.display : 'none';
    const orientation: RangeOrientation = (RANGE_ORIENTATIONS as readonly string[]).includes(this.orientation) ? this.orientation : 'horizontal';
    const mode: RangeMode = (RANGE_MODES as readonly string[]).includes(this.mode) ? this.mode : 'single';
    const isRange = mode === 'range';
    const percent = this.getPercent(this.value);
    const percentLow = isRange ? this.getPercent(this.valueLow) : 0;
    const percentHigh = isRange ? this.getPercent(this.valueHigh) : percent;

    const containerStyle = {
      '--range-fill-start': isRange ? `${percentLow}%` : '0%',
      '--range-fill-end': isRange ? `${percentHigh}%` : `${percent}%`,
      '--range-thumb-percent': `${percent}%`,
      '--range-thumb-low-percent': `${percentLow}%`,
      '--range-thumb-high-percent': `${percentHigh}%`,
    };

    const showTooltip = display === 'tooltip';
    const showThumbValue = display === 'thumb' || display === 'full';
    const showMinMax = display === 'full';

    const displayClass = (display === 'thumb' || display === 'full')
      ? `range--display-${display}`
      : '';

    const wrapperClasses = [
      'aegov-range',
      `range--${size}`,
      `range--${orientation}`,
      displayClass,
      this.disabled ? 'aegov-range--disabled' : '',
      this.class || '',
    ].filter(Boolean).join(' ');

    const rangeContent = (
      <div class={wrapperClasses}>
        <div class="range__container" style={containerStyle}>
          {showMinMax && <span class="range__label-min">{this.min}</span>}

          <div
            class="range__track-wrapper"
            ref={(el) => this.trackWrapperEl = el}
            onClick={this.handleTrackClick}
          >
            <div class="range__track">
              <div class="range__fill" />
            </div>

            {!isRange && this.renderThumb('single', showTooltip, showThumbValue)}
            {isRange && this.renderThumb('low', showTooltip, showThumbValue)}
            {isRange && this.renderThumb('high', showTooltip, showThumbValue)}

            {!isRange && (
              <input
                type="range"
                class="range__input"
                id={this.fieldId}
                name={this.name}
                min={this.min}
                max={this.max}
                step={this.step}
                value={this.value}
                disabled={this.disabled}
                required={this.required}
                onInput={this.handleSingleInput}
                onChange={this.handleSingleChange}
                aria-valuemin={this.min}
                aria-valuemax={this.max}
                aria-valuenow={this.value}
                aria-orientation={orientation}
                {...(orientation === 'vertical' ? { orient: 'vertical' } : {})}
                {...passThroughAttrs}
              />
            )}
            {isRange && [
              <input
                type="range"
                class="range__input range__input--low"
                id={`${this.fieldId}-low`}
                name={this.name ? `${this.name}-low` : undefined}
                min={this.min}
                max={this.max}
                step={this.step}
                value={this.valueLow}
                disabled={this.disabled}
                onInput={this.handleLowInput}
                onChange={this.handleLowChange}
                aria-valuemin={this.min}
                aria-valuemax={this.valueHigh}
                aria-valuenow={this.valueLow}
                aria-label="Range minimum"
                aria-orientation={orientation}
                {...(orientation === 'vertical' ? { orient: 'vertical' } : {})}
              />,
              <input
                type="range"
                class="range__input range__input--high"
                id={`${this.fieldId}-high`}
                name={this.name ? `${this.name}-high` : undefined}
                min={this.min}
                max={this.max}
                step={this.step}
                value={this.valueHigh}
                disabled={this.disabled}
                onInput={this.handleHighInput}
                onChange={this.handleHighChange}
                aria-valuemin={this.valueLow}
                aria-valuemax={this.max}
                aria-valuenow={this.valueHigh}
                aria-label="Range maximum"
                aria-orientation={orientation}
                {...(orientation === 'vertical' ? { orient: 'vertical' } : {})}
              />,
            ]}
          </div>

          {showMinMax && <span class="range__label-max">{this.max}</span>}
        </div>
      </div>
    );

    if (this.label) {
      return (
        <Host>
          <div class="range__wrapper">
            <span class="range__label-text">{this.label}</span>
            {rangeContent}
          </div>
        </Host>
      );
    }

    return <Host>{rangeContent}</Host>;
  }
}
