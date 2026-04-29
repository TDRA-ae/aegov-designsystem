import { Component, Host, h, Prop, Watch, State, Event, EventEmitter, Element } from '@stencil/core';
import { watchResponsiveProp } from '../../utils/responsive-prop';
import type { ResponsivePropWatcher } from '../../utils/responsive-prop';
import { TOGGLE_SIZES } from '../../utils/types';
import type { ToggleSize } from '../../utils/types';
import { getPassThroughAttributes } from '../../utils/attributes';
import { generateId } from '../../utils/id-generator';

@Component({
  tag: 'aegov-toggle',
  styleUrl: 'aegov-toggle.css',
  scoped: false,
  shadow: false,
})
export class AegovToggle {
  @Element() el: HTMLElement;

  /** Unique ID for the native checkbox element. Auto-generated if not provided. */
  @Prop({ mutable: true, reflect: true }) fieldId?: string;

  /** The name attribute for the toggle. */
  @Prop() name?: string;

  /** The value attribute for the toggle. */
  @Prop() value?: string;

  /** Whether the toggle is checked/on. */
  @Prop({ mutable: true, reflect: true }) checked: boolean = false;

  /** The size of the toggle. */
  @Prop() size: string = 'base';

  @State() private _resolvedSize: ToggleSize = 'base';
  private _sizeWatcher: ResponsivePropWatcher | null = null;

  /** Whether the toggle is disabled. */
  @Prop({ reflect: true }) disabled: boolean = false;

  /** Whether the toggle is required. */
  @Prop() required: boolean = false;

  /** Label text for the toggle. Rendered at the end (inline-end). */
  @Prop() label?: string;

  /** Description text displayed below the label. Only rendered when label is provided. */
  @Prop() description?: string;

  /** Emitted when the toggle checked state changes. */
  @Event() aegovToggleChange: EventEmitter<{ checked: boolean; value?: string }>;

  componentWillLoad() {
    if (!this.fieldId) {
      this.fieldId = generateId('aegov-toggle');
    }
    this._sizeWatcher = watchResponsiveProp(this.size, TOGGLE_SIZES, 'base', v => {
      this._resolvedSize = v as ToggleSize;
    });
    this._resolvedSize = this._sizeWatcher.current as ToggleSize;
  }

  disconnectedCallback() {
    this._sizeWatcher?.destroy();
  }

  @Watch('size')
  onSizeChange() {
    this._sizeWatcher?.destroy();
    this._sizeWatcher = watchResponsiveProp(this.size, TOGGLE_SIZES, 'base', v => {
      this._resolvedSize = v as ToggleSize;
    });
    this._resolvedSize = this._sizeWatcher.current as ToggleSize;
  }

  private handleChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    this.checked = input.checked;
    this.aegovToggleChange.emit({ checked: this.checked, value: this.value });
  };

  private static readonly NATIVE_TOGGLE_ATTRS = new Set([
    'form', 'tabindex', 'autofocus', 'title',
  ]);

  render() {
    const passThroughAttrs = getPassThroughAttributes(this.el, AegovToggle.NATIVE_TOGGLE_ATTRS);
    const size: ToggleSize = this._resolvedSize;
    const wrapperClasses = ['aegov-toggle', `toggle--${size}`];
    const descriptionId = this.description ? `${this.fieldId}-desc` : undefined;

    const hasIconChecked = !!this.el.querySelector('[slot="icon-checked"]');
    const hasIconUnchecked = !!this.el.querySelector('[slot="icon-unchecked"]');
    const hasIcons = hasIconChecked || hasIconUnchecked;

    const toggle = (
      <span class="toggle__control">
        <input
          type="checkbox"
          role="switch"
          id={this.fieldId}
          name={this.name}
          value={this.value}
          checked={this.checked}
          disabled={this.disabled}
          required={this.required}
          aria-checked={this.checked ? 'true' : 'false'}
          aria-required={this.required ? 'true' : undefined}
          aria-describedby={descriptionId}
          onChange={this.handleChange}
          class="toggle__input"
          {...passThroughAttrs}
        />
        <span class="toggle__track" aria-hidden="true">
          <span class={`toggle__thumb${hasIcons ? ' toggle__thumb--has-icon' : ''}`}>
            {hasIcons && (
              <span class="toggle__icon">
                <span class={`toggle__icon-item${this.checked ? '' : ' toggle__icon-item--active'}`}>
                  <slot name="icon-unchecked" />
                </span>
                <span class={`toggle__icon-item${this.checked ? ' toggle__icon-item--active' : ''}`}>
                  <slot name="icon-checked" />
                </span>
              </span>
            )}
          </span>
        </span>
      </span>
    );

    if (this.label) {
      return (
        <Host>
          <div class={wrapperClasses.join(' ')}>
            <label class="toggle__wrapper">
              {toggle}
              <span class="toggle__text">
                <span class="toggle__label-text">{this.label}</span>
                {this.description && (
                  <span id={descriptionId} class="toggle__description">{this.description}</span>
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
          {toggle}
        </div>
      </Host>
    );
  }
}
