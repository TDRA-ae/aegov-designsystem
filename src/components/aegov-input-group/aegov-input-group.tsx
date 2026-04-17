import { Component, Host, h, Prop, Element, Watch } from '@stencil/core';
import { INPUT_SIZES } from '../../utils/types';
import type { InputSize } from '../../utils/types';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';

const TAG = 'aegov-input-group';
const ctx = (prop: string) => ({ component: TAG, prop });

@Component({
  tag: 'aegov-input-group',
  styleUrl: 'aegov-input-group.css',
  scoped: false,
  shadow: false,
})
export class AegovInputGroup {
  @Element() el: HTMLElement;

  /** The size of the input group. Propagated to child aegov-input and aegov-button. */
  @Prop() size: InputSize = 'base';

  /** Text to display as a prefix addon before the input. */
  @Prop() addonPrefix?: string;

  /** Text to display as a suffix addon after the input. */
  @Prop() addonSuffix?: string;

  /** Additional CSS classes to apply. */
  @Prop() class?: string;

  componentWillLoad() {
    warnIfInvalidEnumProp(this.size, INPUT_SIZES, 'base', ctx('size'));
  }

  @Watch('size')
  onSizeChange(v: unknown) { warnIfInvalidEnumProp(v, INPUT_SIZES, 'base', ctx('size')); }

  componentDidLoad() {
    this.propagateSize();
  }

  componentDidUpdate() {
    this.propagateSize();
  }

  private propagateSize() {
    const inputs = this.el.querySelectorAll('aegov-input');
    inputs.forEach((input: any) => {
      input.size = this.size;
    });

    const buttons = this.el.querySelectorAll('aegov-button');
    buttons.forEach((btn: any) => {
      btn.size = this.size;
    });
  }

  private getGroupClasses(): string {
    const classes: string[] = ['aegov-input-group'];

    const sizeClasses: Record<InputSize, string> = {
      xs: 'input-group--xs',
      sm: 'input-group--sm',
      base: 'input-group--base',
      lg: 'input-group--lg',
      xl: 'input-group--xl',
    };

    const size: InputSize = (INPUT_SIZES as readonly string[]).includes(this.size) ? this.size : 'base';
    classes.push(sizeClasses[size]);

    if (this.class) {
      classes.push(this.class);
    }

    return classes.join(' ');
  }

  render() {
    return (
      <Host>
        <div class={this.getGroupClasses()}>
          {this.addonPrefix && <span class="input-group__addon input-group__addon--prefix">{this.addonPrefix}</span>}
          <slot />
          {this.addonSuffix && <span class="input-group__addon input-group__addon--suffix">{this.addonSuffix}</span>}
        </div>
      </Host>
    );
  }
}
