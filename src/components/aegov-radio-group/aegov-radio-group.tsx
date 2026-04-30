import { Component, Host, h, Prop, State, Event, EventEmitter, Element, Listen, Watch } from '@stencil/core';
import { RADIO_GROUP_VARIANTS, RADIO_GROUP_ORIENTATIONS, RADIO_SIZES } from '../../utils/types';
import type { RadioGroupVariant, RadioGroupOrientation, RadioSize } from '../../utils/types';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { watchResponsiveProp } from '../../utils/responsive-prop';
import type { ResponsivePropWatcher } from '../../utils/responsive-prop';

const TAG = 'aegov-radio-group';
const ctx = (prop: string) => ({ component: TAG, prop });

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
  @Prop() size: string = 'base';
  @State() private _resolvedSize: RadioSize = 'base';
  private _sizeWatcher: ResponsivePropWatcher | null = null;

  /** The name shared by all radios in the group. Ensures native single-select behavior. */
  @Prop() name!: string;

  /** Disables all radios within the group via native fieldset disabled. */
  @Prop() disabled: boolean = false;

  /** Additional CSS classes to apply. */
  @Prop() extraClass?: string;

  /** Emitted when the selected radio changes. Contains the selected value. */
  @Event() aegovRadioGroupChange: EventEmitter<{ value: string | undefined }>;

  componentWillLoad() {
    warnIfInvalidEnumProp(this.variant, RADIO_GROUP_VARIANTS, 'default', ctx('variant'));
    warnIfInvalidEnumProp(this.orientation, RADIO_GROUP_ORIENTATIONS, 'vertical', ctx('orientation'));
    this._sizeWatcher = watchResponsiveProp(this.size, RADIO_SIZES, 'base', v => {
      this._resolvedSize = v as RadioSize;
      if (this.el.isConnected) { this.syncChildren(); }
    });
    this._resolvedSize = this._sizeWatcher.current as RadioSize;
  }

  componentDidLoad() {
    this.syncChildren();
  }

  @Watch('variant')
  onVariantChange(v: unknown) { warnIfInvalidEnumProp(v, RADIO_GROUP_VARIANTS, 'default', ctx('variant')); }

  @Watch('orientation')
  onOrientationChange(v: unknown) { warnIfInvalidEnumProp(v, RADIO_GROUP_ORIENTATIONS, 'vertical', ctx('orientation')); }

  disconnectedCallback() {
    this._sizeWatcher?.destroy();
  }

  @Watch('size')
  onSizeChange() {
    this._sizeWatcher?.destroy();
    this._sizeWatcher = watchResponsiveProp(this.size, RADIO_SIZES, 'base', v => {
      this._resolvedSize = v as RadioSize;
      if (this.el.isConnected) { this.syncChildren(); }
    });
    this._resolvedSize = this._sizeWatcher.current as RadioSize;
  }

  @Watch('name')
  onNameChange() {
    this.syncChildren();
  }

  private syncChildren() {
    const radios = this.getRadios();
    radios.forEach(radio => {
      radio.size = this._resolvedSize;
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
    const variant: RadioGroupVariant = (RADIO_GROUP_VARIANTS as readonly string[]).includes(this.variant) ? this.variant : 'default';
    const orientation: RadioGroupOrientation = (RADIO_GROUP_ORIENTATIONS as readonly string[]).includes(this.orientation) ? this.orientation : 'vertical';
    if (variant !== 'default') {
      classes.push(`radio-group--${variant}`);
    }
    if (orientation === 'horizontal') {
      classes.push('radio-group--horizontal');
    }
    if (this.extraClass) {
      classes.push(this.extraClass);
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
