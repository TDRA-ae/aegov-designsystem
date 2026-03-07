import { Component, Host, h, Prop, Event, EventEmitter, Element, Watch } from '@stencil/core';
import type { CheckboxSize } from '../../utils/types';

let checkboxIdCounter = 0;

@Component({
  tag: 'aegov-checkbox',
  styleUrl: 'aegov-checkbox.css',
  scoped: false,
  shadow: false,
})
export class AegovCheckbox {
  @Element() el: HTMLElement;

  /** Unique ID for the native checkbox element. Auto-generated if not provided. */
  @Prop({ mutable: true, reflect: true }) fieldId?: string;

  /** The name attribute for the checkbox. */
  @Prop() name?: string;

  /** The value attribute for the checkbox. */
  @Prop() value?: string;

  /** Whether the checkbox is checked. */
  @Prop({ mutable: true, reflect: true }) checked: boolean = false;

  /** The size of the checkbox. */
  @Prop() size: CheckboxSize = 'base';

  /** Whether the checkbox is disabled. */
  @Prop({ reflect: true }) disabled: boolean = false;

  /** Whether the checkbox is required. */
  @Prop() required: boolean = false;

  /** Label text for the checkbox. When provided, generates an associated <label> element. */
  @Prop() label?: string;

  /** Description text displayed below the label. Only rendered when label is provided. */
  @Prop() description?: string;

  /** Marks this checkbox as a "check all" controller within a checkbox group. */
  @Prop({ reflect: true }) checkAll: boolean = false;

  /** Whether the checkbox is in an indeterminate state. Set by parent group for check-all. */
  @Prop({ mutable: true }) indeterminate: boolean = false;

  /** Additional CSS classes to apply. */
  @Prop() class?: string;

  /** Emitted when the checkbox checked state changes. */
  @Event() aegovCheckboxChange: EventEmitter<{ checked: boolean; value?: string }>;

  private inputEl?: HTMLInputElement;

  componentWillLoad() {
    if (!this.fieldId) {
      this.fieldId = `aegov-checkbox-${++checkboxIdCounter}`;
    }
  }

  componentDidRender() {
    if (this.inputEl) {
      this.inputEl.indeterminate = this.indeterminate;
    }
  }

  @Watch('indeterminate')
  onIndeterminateChange() {
    if (this.inputEl) {
      this.inputEl.indeterminate = this.indeterminate;
    }
  }

  private handleChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    this.checked = input.checked;
    this.indeterminate = false;
    this.aegovCheckboxChange.emit({ checked: this.checked, value: this.value });
  };

  private static readonly NATIVE_CHECKBOX_ATTRS = new Set([
    'form', 'tabindex', 'autofocus', 'title',
  ]);

  private getPassThroughAttributes(): { [key: string]: string } {
    const passThroughAttrs: { [key: string]: string } = {};
    Array.from(this.el.attributes).forEach(attr => {
      if (
        attr.name.startsWith('aria-') ||
        attr.name.startsWith('data-') ||
        AegovCheckbox.NATIVE_CHECKBOX_ATTRS.has(attr.name)
      ) {
        passThroughAttrs[attr.name] = attr.value;
      }
    });
    return passThroughAttrs;
  }

  render() {
    const passThroughAttrs = this.getPassThroughAttributes();
    const wrapperClasses = ['aegov-checkbox', `checkbox--${this.size}`];
    if (this.class) wrapperClasses.push(this.class);

    const descriptionId = this.description ? `${this.fieldId}-desc` : undefined;

    const checkboxInput = (
      <input
        ref={(el) => this.inputEl = el}
        type="checkbox"
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
            <label class="checkbox__wrapper">
              {checkboxInput}
              <span class="checkbox__text">
                <span class="checkbox__label-text">{this.label}</span>
                {this.description && (
                  <span id={descriptionId} class="checkbox__description">{this.description}</span>
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
          {checkboxInput}
        </div>
      </Host>
    );
  }
}
