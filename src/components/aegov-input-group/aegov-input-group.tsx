import { Component, Host, h, Prop, Element } from '@stencil/core';
import type { InputSize } from '../../utils/types';

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

    classes.push(sizeClasses[this.size]);

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
