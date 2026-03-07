import { Component, Host, h, Prop, Event, EventEmitter, Element, Listen, Watch } from '@stencil/core';
import type { RadioGroupVariant, RadioGroupOrientation, RadioSize } from '../../utils/types';

@Component({
  tag: 'aegov-radio-group',
  styleUrl: 'aegov-radio-group.css',
  scoped: false,
  shadow: false,
})
export class AegovRadioGroup {
  @Element() el: HTMLElement;

  /** Visual variant for the group layout. */
  @Prop() variant: RadioGroupVariant = 'default';

  /** Stack direction for radio items. */
  @Prop() orientation: RadioGroupOrientation = 'vertical';

  /** Optional label rendered as a <legend> for accessibility. */
  @Prop() label?: string;

  /** Size of all radios in the group. Propagated to children. */
  @Prop() size: RadioSize = 'base';

  /** The name shared by all radios in the group. Ensures native single-select behavior. */
  @Prop() name!: string;

  /** Disables all radios within the group via native fieldset disabled. */
  @Prop() disabled: boolean = false;

  /** Additional CSS classes to apply. */
  @Prop() class?: string;

  /** Emitted when the selected radio changes. Contains the selected value. */
  @Event() aegovRadioGroupChange: EventEmitter<{ value: string | undefined }>;

  componentDidLoad() {
    this.syncChildren();
  }

  componentDidUpdate() {
    this.syncChildren();
  }

  @Watch('size')
  onSizeChange() {
    this.syncChildren();
  }

  private syncChildren() {
    const radios = this.getRadios();
    radios.forEach(radio => {
      radio.size = this.size;
      radio.name = this.name;
    });
  }

  private getRadios(): HTMLAegovRadioElement[] {
    return Array.from(this.el.querySelectorAll('aegov-radio'));
  }

  @Listen('aegovRadioChange')
  handleRadioChange(event: CustomEvent<{ checked: boolean; value?: string }>) {
    const target = event.target as HTMLAegovRadioElement;

    if (event.detail.checked) {
      // Uncheck all other radios (sync Stencil state; native radio handles DOM)
      const radios = this.getRadios();
      radios.forEach(radio => {
        if (radio !== target) {
          radio.checked = false;
        }
      });
    }

    this.aegovRadioGroupChange.emit({ value: event.detail.checked ? event.detail.value : undefined });
  }

  private getGroupClasses(): string {
    const classes = ['aegov-radio-group'];
    if (this.variant !== 'default') {
      classes.push(`radio-group--${this.variant}`);
    }
    if (this.orientation === 'horizontal') {
      classes.push('radio-group--horizontal');
    }
    if (this.class) {
      classes.push(this.class);
    }
    return classes.join(' ');
  }

  render() {
    return (
      <Host>
        <fieldset class={this.getGroupClasses()} role="radiogroup" disabled={this.disabled}>
          {this.label && <legend class="radio-group__legend">{this.label}</legend>}
          <div class="radio-group__items">
            <slot />
          </div>
        </fieldset>
      </Host>
    );
  }
}
