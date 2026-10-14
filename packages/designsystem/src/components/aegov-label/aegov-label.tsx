import { Component, Host, h, Prop, Element, Watch } from '@stencil/core';
import { FORM_VARIANTS } from '../../utils/types';
import type { FormVariant } from '../../utils/types';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { getPassThroughAttributes } from '../../utils/attributes';
import { generateId } from '../../utils/id-generator';

@Component({
  tag: 'aegov-label',
  styleUrl: 'aegov-label.css',
  scoped: false,
  shadow: false,
})
export class AegovLabel {
  @Element() el: HTMLElement;

  /** Unique ID for the label element. Auto-generated if not provided. */
  @Prop({ mutable: true, reflect: true }) fieldId?: string;

  /** The ID of the form element this label is for. Automatically set by parent aegov-form-field. */
  @Prop({ mutable: true, attribute: 'for' }) htmlFor?: string;

  /** Colour family. Drives idle ring/border, selected/checked fill, and value/accent text. Focus ring stays camel; error stays aered regardless. */
  @Prop() variant?: FormVariant;

  /** Additional CSS classes to apply. */
  @Prop() extraClass?: string;

  @Watch('variant')
  onVariantChange(v: unknown) { warnIfInvalidEnumProp(v, FORM_VARIANTS, 'primary', { component: 'aegov-label', prop: 'variant' }); }

  componentWillLoad() {
    warnIfInvalidEnumProp(this.variant, FORM_VARIANTS, 'primary', { component: 'aegov-label', prop: 'variant' });
    if (!this.fieldId) {
      this.fieldId = generateId('aegov-label');
    }
  }

  private getLabelClasses(): string {
    const variant: FormVariant = (FORM_VARIANTS as readonly string[]).includes(this.variant) ? this.variant : 'primary';
    const classes: string[] = ['aegov-label', `label-variant-${variant}`];
    if (this.extraClass) {
      classes.push(this.extraClass);
    }
    return classes.join(' ');
  }

  /**
   * Native `<label for>` click activation only toggles a genuine
   * `HTMLInputElement` of type checkbox/radio resolved via `for`/`id`. When
   * `for` resolves to a shadow-DOM custom-element host instead (standalone
   * aegov-checkbox/aegov-radio/aegov-toggle), the host isn't itself such an
   * element, so the browser still delegates FOCUS into the shadow input
   * (`delegatesFocus: true`) but never performs the "click toggles"
   * activation step (#48). Forward the click to the real inner input
   * ourselves — its own native click/change handling then runs exactly as
   * if the user had clicked it directly. The host is never itself a real
   * checkbox/radio, so native `for` activation never also fires — no risk
   * of double-toggling.
   */
  private handleClick = () => {
    if (!this.htmlFor) return;
    const target = document.getElementById(this.htmlFor);
    if (!target?.shadowRoot) return;
    const innerControl = target.shadowRoot.querySelector<HTMLInputElement>(
      'input[type="checkbox"], input[type="radio"]',
    );
    innerControl?.click();
  };

  render() {
    const passThroughAttributes = getPassThroughAttributes(this.el);

    return (
      <Host>
        <label
          id={this.fieldId}
          {...{ for: this.htmlFor }}
          class={this.getLabelClasses()}
          onClick={this.handleClick}
          {...passThroughAttributes}
        >
          <slot />
        </label>
      </Host>
    );
  }
}
