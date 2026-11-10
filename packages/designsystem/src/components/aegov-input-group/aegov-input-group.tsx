import { Component, Host, h, Prop, State, Element, Watch, Listen } from '@stencil/core';
import { generateId } from '../../utils/id-generator';
import { INPUT_SIZES, FORM_VARIANTS } from '../../utils/types';
import type { InputSize, FormVariant } from '../../utils/types';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { getPassThroughAttributes } from '../../utils/attributes';
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

  /**
   * Accessible label for the group. Sets `aria-label` on the group wrapper.
   * Use this to describe the purpose of a combined phone/URL/similar input group.
   */
  @Prop() groupLabel?: string;

  /** Colour family. Drives idle ring/border, selected/checked fill, and value/accent text. Focus ring follows the variant's support colour (camel for primary, desert for secondary, seablue for neutral-max/neutral-min); error stays aered regardless. */
  @Prop() variant?: FormVariant;

  /** Additional CSS classes to apply. */
  @Prop() extraClass?: string;

  private groupId!: string;

  @Watch('variant')
  onVariantChange(v: unknown) { warnIfInvalidEnumProp(v, FORM_VARIANTS, 'primary', { component: 'aegov-input-group', prop: 'variant' }); }

  componentWillLoad() {
    this.groupId = generateId('aegov-input-group');
    warnIfInvalidEnumProp(this.variant, FORM_VARIANTS, 'primary', { component: 'aegov-input-group', prop: 'variant' });
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
      // Cascade variant only if the child never set its own (#49, same
      // sentinel bug as #31). `variant` no longer has a default value — a
      // child that never touched it reads back as genuinely `undefined`,
      // distinguishable from one that explicitly chose `variant="primary"`.
      if (input.variant === undefined) {
        input.variant = this.variant;
      }
      // Addon text ("AED", ".gov.ae") becomes part of the input's description.
      // The text is passed, not the span ids: the real input is in the
      // child's shadow root and can't reference ids in this light DOM.
      input.addonPrefixText = this.addonPrefix || undefined;
      input.addonSuffixText = this.addonSuffix || undefined;
      // Flag grouped membership as a plain host attribute so the child can
      // style itself with :host([is-grouped]) instead of the parent reaching
      // in with :host-context(.aegov-input-group) — :host-context() is
      // deprecated and not implemented in Firefox or Safari, so the border/
      // radius suppression it drove silently never applied there.
      input.setAttribute('is-grouped', '');
    });

    const buttons = this.el.querySelectorAll('aegov-button');
    buttons.forEach((btn: any) => {
      btn.size = this._resolvedSize;
      btn.setAttribute('is-grouped', '');
    });
  }

  /** Bumped when a child input's invalid state, error or hint changes. */
  @State() private messageRevision: number = 0;

  /**
   * A child aegov-input re-rendered (its validity, error or hint may have
   * changed): re-read the messages shown below the group.
   */
  @Listen('aegovInputGroupSync')
  onChildRender() {
    const next = JSON.stringify(this.childMessages());
    if (next !== this.lastMessages) {
      this.lastMessages = next;
      this.messageRevision++;
    }
  }

  private lastMessages = '';

  /**
   * The hint or error of each child input. Inside the group the input can't
   * show them (they would sit inside the bordered box), so the group shows
   * them below itself, as a standalone input does (DS-A11Y-input-group-02).
   * The input keeps its own hidden copy for its aria-describedby.
   */
  private childMessages(): Array<{ kind: 'error' | 'hint'; text: string }> {
    const text = (el?: Element | null) => (el?.textContent ?? '').replace(/\s+/g, ' ').trim();
    const out: Array<{ kind: 'error' | 'hint'; text: string }> = [];
    this.el.querySelectorAll<HTMLAegovInputElement>('aegov-input').forEach(input => {
      const error = text(input.querySelector('[slot="error"]')) || (input.errorMessage ?? '').trim();
      const hint = text(input.querySelector('[slot="hint"]')) || (input.hint ?? '').trim();
      if (input.isInvalid && error) out.push({ kind: 'error', text: error });
      else if (hint) out.push({ kind: 'hint', text: hint });
    });
    return out;
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

    const variant: FormVariant = (FORM_VARIANTS as readonly string[]).includes(this.variant) ? this.variant : 'primary';
    classes.push(`input-group-variant-${variant}`);

    if (this.extraClass) {
      classes.push(this.extraClass);
    }

    return classes.join(' ');
  }

  render() {
    const prefixId = this.addonPrefix ? `${this.groupId}-prefix` : undefined;
    const suffixId = this.addonSuffix ? `${this.groupId}-suffix` : undefined;
    const passThroughAttrs = getPassThroughAttributes(this.el);
    delete passThroughAttrs['aria-label'];
    void this.messageRevision; // re-render when a child's messages change
    const messages = this.childMessages();
    return (
      <Host>
        <div
          class={this.getGroupClasses()}
          role="group"
          aria-label={this.groupLabel || undefined}
          {...passThroughAttrs}
        >
          {this.addonPrefix && (
            <span id={prefixId} class="input-group__addon input-group__addon--prefix">
              {this.addonPrefix}
            </span>
          )}
          <slot />
          {this.addonSuffix && (
            <span id={suffixId} class="input-group__addon input-group__addon--suffix">
              {this.addonSuffix}
            </span>
          )}
        </div>
        {/* Always rendered, so an error that appears later is announced once. */}
        <div class="input-group__error" role="alert">
          {messages.filter(m => m.kind === 'error').map(m => <div>{m.text}</div>)}
        </div>
        {messages.filter(m => m.kind === 'hint').map(m => <div class="input-group__hint">{m.text}</div>)}
      </Host>
    );
  }
}
