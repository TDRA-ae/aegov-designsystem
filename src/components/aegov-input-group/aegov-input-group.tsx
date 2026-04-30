import { Component, Host, h, Prop, State, Element, Watch } from '@stencil/core';
import { INPUT_SIZES } from '../../utils/types';
import type { InputSize } from '../../utils/types';
import { watchResponsiveProp } from '../../utils/responsive-prop';
import type { ResponsivePropWatcher } from '../../utils/responsive-prop';

@Component({
  tag: 'aegov-input-group',
  styleUrl: 'aegov-input-group.css',
  scoped: false,
  shadow: false,
})
export class AegovInputGroup {
  @Element() el: HTMLElement;

  /** The size of the input group. Propagated to child aegov-input and aegov-button. */
  @Prop() size: string = 'base';
  @State() private _resolvedSize: InputSize = 'base';
  private _sizeWatcher: ResponsivePropWatcher | null = null;

  /** Text to display as a prefix addon before the input. */
  @Prop() addonPrefix?: string;

  /** Text to display as a suffix addon after the input. */
  @Prop() addonSuffix?: string;

  /** Additional CSS classes to apply. */
  @Prop() extraClass?: string;

  componentWillLoad() {
    this._sizeWatcher = watchResponsiveProp(this.size, INPUT_SIZES, 'base', v => {
      this._resolvedSize = v as InputSize;
    });
    this._resolvedSize = this._sizeWatcher.current as InputSize;
  }

  disconnectedCallback() {
    this._sizeWatcher?.destroy();
  }

  @Watch('size')
  onSizeChange() {
    this._sizeWatcher?.destroy();
    this._sizeWatcher = watchResponsiveProp(this.size, INPUT_SIZES, 'base', v => {
      this._resolvedSize = v as InputSize;
    });
    this._resolvedSize = this._sizeWatcher.current as InputSize;
  }

  componentDidLoad() {
    this.propagateSize();
  }

  componentDidUpdate() {
    this.propagateSize();
  }

  private propagateSize() {
    const inputs = this.el.querySelectorAll('aegov-input');
    inputs.forEach((input: any) => {
      input.size = this._resolvedSize;
    });

    const buttons = this.el.querySelectorAll('aegov-button');
    buttons.forEach((btn: any) => {
      btn.size = this._resolvedSize;
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

    const size: InputSize = this._resolvedSize;
    classes.push(sizeClasses[size]);

    if (this.extraClass) {
      classes.push(this.extraClass);
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
