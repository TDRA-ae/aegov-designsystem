import { Component, Host, h, Prop, State, Event, EventEmitter, Element, Watch } from '@stencil/core';
import { CHECKBOX_SIZES } from '../../utils/types';
import type { CheckboxSize } from '../../utils/types';
import { getPassThroughAttributes } from '../../utils/attributes';
import { generateId } from '../../utils/id-generator';
import { watchResponsiveProp } from '../../utils/responsive-prop';
import type { ResponsivePropWatcher } from '../../utils/responsive-prop';

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
  @Prop({ mutable: true, reflect: true }) isChecked: boolean = false;

  /** The size of the checkbox. */
  @Prop() size: string = 'base';

  @State() private _resolvedSize: CheckboxSize = 'base';
  private _sizeWatcher: ResponsivePropWatcher | null = null;

  /** Whether the checkbox is disabled. */
  @Prop({ reflect: true }) isDisabled: boolean = false;

  /** Whether the checkbox is required. */
  @Prop() isRequired: boolean = false;

  /** Label text for the checkbox. When provided, generates an associated <label> element. */
  @Prop() label?: string;

  /** Description text displayed below the label. Only rendered when label is provided. */
  @Prop() description?: string;

  /** Marks this checkbox as a "check all" controller within a checkbox group. */
  @Prop({ reflect: true }) isCheckAll: boolean = false;

  /** Whether the checkbox is in an indeterminate state. Set by parent group for check-all. */
  @Prop({ mutable: true }) isIndeterminate: boolean = false;

  /** Additional CSS classes to apply. */
  @Prop() extraClass?: string;

  /** Emitted when the checkbox checked state changes. */
  @Event() aegovCheckboxChange: EventEmitter<{ checked: boolean; value?: string }>;

  private inputEl?: HTMLInputElement;

  componentWillLoad() {
    if (!this.fieldId) {
      this.fieldId = generateId('aegov-checkbox');
    }
    this._sizeWatcher = watchResponsiveProp(this.size, CHECKBOX_SIZES, 'base', v => {
      this._resolvedSize = v as CheckboxSize;
    });
    this._resolvedSize = this._sizeWatcher.current as CheckboxSize;
  }

  disconnectedCallback() {
    this._sizeWatcher?.destroy();
  }

  @Watch('size')
  onSizeChange() {
    this._sizeWatcher?.destroy();
    this._sizeWatcher = watchResponsiveProp(this.size, CHECKBOX_SIZES, 'base', v => {
      this._resolvedSize = v as CheckboxSize;
    });
    this._resolvedSize = this._sizeWatcher.current as CheckboxSize;
  }

  componentDidRender() {
    if (this.inputEl) {
      this.inputEl.indeterminate = this.isIndeterminate;
    }
  }

  @Watch('isIndeterminate')
  onIndeterminateChange() {
    if (this.inputEl) {
      this.inputEl.indeterminate = this.isIndeterminate;
    }
  }

  private handleChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    this.isChecked = input.checked;
    this.isIndeterminate = false;
    this.aegovCheckboxChange.emit({ checked: this.isChecked, value: this.value });
  };

  private static readonly PASS_THROUGH_ATTRS = new Set([
    'form', 'tabindex', 'autofocus', 'title',
  ]);


  render() {
    const passThroughAttrs = getPassThroughAttributes(this.el, AegovCheckbox.PASS_THROUGH_ATTRS);
    const wrapperClasses = ['aegov-checkbox', `checkbox--${this._resolvedSize}`];
    if (this.extraClass) wrapperClasses.push(this.extraClass);

    const descriptionId = this.description ? `${this.fieldId}-desc` : undefined;

    const checkboxInput = (
      <input
        ref={(el) => this.inputEl = el}
        type="checkbox"
        id={this.fieldId}
        name={this.name}
        value={this.value}
        checked={this.isChecked}
        disabled={this.isDisabled}
        required={this.isRequired}
        aria-required={this.isRequired ? 'true' : undefined}
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
