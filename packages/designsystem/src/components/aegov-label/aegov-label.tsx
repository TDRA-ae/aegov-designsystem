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

  /** Colour family. Drives idle ring/border, selected/checked fill, and value/accent text. Error stays aered regardless. */
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
   * The control this label is for: the element whose id is `for`, else an
   * aegov form control whose `field-id` is `for` (the documented standalone
   * pattern `<aegov-label for="x">` + `<aegov-input field-id="x">`, where
   * field-id is the id of the input inside the shadow root, not of the host).
   */
  private resolveTarget(): HTMLElement | null {
    const key = this.htmlFor;
    if (!key) return null;
    const root = this.el.getRootNode() as Document | ShadowRoot;
    const byId = (typeof root.getElementById === 'function' ? root.getElementById(key) : null) ?? document.getElementById(key);
    if (byId) return byId;
    return Array.from(root.querySelectorAll<HTMLElement>('*'))
      .find(el => el.tagName.startsWith('AEGOV-') && el !== this.el && (el as HTMLElement & { fieldId?: string }).fieldId === key) ?? null;
  }

  /**
   * Do what a native `<label for>` click does. The `<label>` is inside this
   * component's shadow root, so the browser resolves its `for` there and
   * never reaches the control: a checkbox / radio is toggled by clicking its
   * real input (#48; the host is never itself a checkbox, so nothing toggles
   * twice), any other control is focused (`delegatesFocus` puts focus on its
   * inner field, DS-A11Y-label-01).
   */
  private handleClick = () => {
    const target = this.resolveTarget();
    if (!target) return;
    const toggle = target.matches('input[type="checkbox"], input[type="radio"]')
      ? target as HTMLInputElement
      : target.shadowRoot?.querySelector<HTMLInputElement>('input[type="checkbox"], input[type="radio"]');
    if (toggle) {
      toggle.click();
      return;
    }
    if (typeof target.focus === 'function') target.focus();
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
