import { Component, Host, h, Prop, Event, EventEmitter, Element } from '@stencil/core';
import type { RadioSize } from '../../utils/types';
import { getPassThroughAttributes } from '../../utils/attributes';

let radioIdCounter = 0;

@Component({
  tag: 'aegov-radio',
  styleUrl: 'aegov-radio.css',
  scoped: false,
  shadow: false,
})
export class AegovRadio {
  @Element() el: HTMLElement;

  /** Unique ID for the native radio element. Auto-generated if not provided. */
  @Prop({ mutable: true, reflect: true }) fieldId?: string;

  /** The name attribute for the radio. Required for native radio grouping. */
  @Prop() name?: string;

  /** The value attribute for the radio. */
  @Prop() value?: string;

  /** Whether the radio is checked. */
  @Prop({ mutable: true, reflect: true }) checked: boolean = false;

  /** The size of the radio. */
  @Prop() size: RadioSize = 'base';

  /** Whether the radio is disabled. */
  @Prop({ reflect: true }) disabled: boolean = false;

  /** Whether the radio is required. */
  @Prop() required: boolean = false;

  /** Label text for the radio. When provided, generates an associated <label> element. */
  @Prop() label?: string;

  /** Description text displayed below the label. Only rendered when label is provided. */
  @Prop() description?: string;

  /** Additional CSS classes to apply. */
  @Prop() class?: string;

  /** Emitted when the radio checked state changes. */
  @Event() aegovRadioChange: EventEmitter<{ checked: boolean; value?: string }>;

  componentWillLoad() {
    if (!this.fieldId) {
      this.fieldId = `aegov-radio-${++radioIdCounter}`;
    }
  }

  private handleChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    this.checked = input.checked;
    this.aegovRadioChange.emit({ checked: this.checked, value: this.value });
  };

  private static readonly NATIVE_RADIO_ATTRS = new Set([
    'form', 'tabindex', 'autofocus', 'title',
  ]);


  render() {
    const passThroughAttrs = getPassThroughAttributes(this.el, AegovRadio.NATIVE_RADIO_ATTRS);
    const wrapperClasses = ['aegov-radio', `radio--${this.size}`];
    if (this.class) wrapperClasses.push(this.class);

    const descriptionId = this.description ? `${this.fieldId}-desc` : undefined;

    const radioInput = (
      <input
        type="radio"
        id={this.fieldId}
        name={this.name}
        value={this.value}
        checked={this.checked}
        disabled={this.disabled}
        required={this.required}
        aria-required={this.required ? 'true' : undefined}
        aria-describedby={descriptionId}
        onChange={this.handleChange}
        {...passThroughAttrs}
      />
    );

    if (this.label) {
      return (
        <Host>
          <div class={wrapperClasses.join(' ')}>
            <label class="radio__wrapper">
              {radioInput}
              <span class="radio__text">
                <span class="radio__label-text">{this.label}</span>
                {this.description && (
                  <span id={descriptionId} class="radio__description">{this.description}</span>
                )}
              </span>
            </label>
          </div>
        </Host>
      );
    }

    return (
      <Host>
        <div class={wrapperClasses.join(' ')}>
          {radioInput}
        </div>
      </Host>
    );
  }
}
