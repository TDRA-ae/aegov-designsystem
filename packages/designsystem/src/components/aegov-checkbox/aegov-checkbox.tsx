import { Component, Host, h, Prop, State, Event, EventEmitter, Element, Watch, Method, Listen, forceUpdate } from '@stencil/core';
import { CHECKBOX_SIZES, FORM_VARIANTS } from '../../utils/types';
import type {
  CheckboxSize, FormVariant,
  AegovValidationDetail, AegovValidationResult, AegovValidationTrigger,
} from '../../utils/types';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { getPassThroughAttributes } from '../../utils/attributes';
import { HostAria } from '../../utils/host-aria';
import { adoptExtraClassStylesIntoShadowRoot } from '../../utils/shadow-styles';
import { generateId } from '../../utils/id-generator';
import { watchResponsiveProp } from '../../utils/responsive-prop';
import type { ResponsivePropWatcher } from '../../utils/responsive-prop';
import {
  fromNativeValidity, VALID_STATE,
  composeDescribedBy, buildValidationDetail, synthesizeValidity, setInternalsValidity, syncHostDisabled,
} from '../../utils/validation';

@Component({
  tag: 'aegov-checkbox',
  styleUrl: 'aegov-checkbox.css',
  formAssociated: true,
  shadow: { delegatesFocus: true },
})
export class AegovCheckbox {
  @Element() el: HTMLElement;

  /** Unique ID for the native checkbox element. Auto-generated if not provided. */
  @Prop({ mutable: true, reflect: true }) fieldId?: string;

  /** The name attribute for the checkbox. Reflected so ElementInternals can read it for form submission. */
  @Prop({ reflect: true }) name?: string;

  /** The value attribute for the checkbox. */
  @Prop() value?: string;

  /** Whether the checkbox is checked. */
  @Prop({ mutable: true, reflect: true }) isChecked: boolean = false;

  /** The size of the checkbox. */
  @Prop() size: string = 'base';

  /** Colour family. Drives rest border, checked bg/border. Focus ring follows the variant's support colour (camel for primary, desert for secondary, seablue for neutral-max/neutral-min); error stays aered. */
  @Prop() variant?: FormVariant;

  /** Visual appearance set by a parent aegov-checkbox-group. Not meant to be set directly. */
  @Prop({ reflect: true }) appearance: string = 'default';

  @State() private _resolvedSize: CheckboxSize = 'base';
  private _sizeWatcher: ResponsivePropWatcher | null = null;
  private _defaultChecked: boolean = false;

  /** Whether the checkbox is disabled. */
  @Prop({ mutable: true, reflect: true }) isDisabled: boolean = false;

  /** Whether the checkbox is required. */
  @Prop() isRequired: boolean = false;

  /** Label text for the checkbox. When provided, generates an associated <label> element. */
  @Prop() label?: string;

  /**
   * Helper hint text displayed below the label. Only rendered when label is provided
   * and no error is shown. Renamed from `description` (decision §6.6).
   */
  @Prop() hint?: string;

  /** Marks this checkbox as a "check all" controller within a checkbox group. */
  @Prop({ reflect: true }) isCheckAll: boolean = false;

  /** Whether the checkbox is in an indeterminate state. Set by parent group for check-all. */
  @Prop({ mutable: true }) isIndeterminate: boolean = false;

  /** Visual + a11y invalid state. Toggles `aria-invalid` + `is-invalid` host class. See §2.3. */
  @Prop({ mutable: true, reflect: true }) isInvalid: boolean = false;

  /** Inline error message. Use `error` slot for rich markup. */
  @Prop({ mutable: true }) errorMessage: string = '';

  /**
   * Additional CSS classes to apply.
   *
   * This component renders in a real shadow root, which normally blocks the page's CSS
   * from reaching inside it. Margin/padding utilities (e.g. `mt-4`, `md:px-6`) are copied
   * in from the page's own stylesheets at runtime and work as expected; other utilities
   * (colour, border, typography, etc.) still have no effect — see #35.
   */
  @Prop() extraClass?: string;

  /** Emitted when the checkbox checked state changes. */
  @Event() aegovCheckboxChange: EventEmitter<{ checked: boolean; value?: string }>;

  /** Unified validation event. See §2.3. */
  @Event() aegovValidate: EventEmitter<AegovValidationDetail<boolean>>;

  /** Whether user has interacted with the field — gates aria-live (gap §7.10). */
  @State() private hasBlurredOnce: boolean = false;

  private inputEl?: HTMLInputElement;
  private internals: ElementInternals | null = null;
  private errorId: string = '';
  private hintId: string = '';
  /** The visible label text only — the input's name, so the hint stays a description (DS-A11Y-checkbox-02). */
  private labelTextId: string = '';

  @Watch('variant')
  onVariantChange(v: unknown) { warnIfInvalidEnumProp(v, FORM_VARIANTS, 'primary', { component: 'aegov-checkbox', prop: 'variant' }); }

  @Watch('appearance')
  onAppearanceChange(newVal: string) {
    (this.el as HTMLElement).classList.toggle('checkbox-appearance-cards', newVal === 'cards');
    (this.el as HTMLElement).classList.toggle('checkbox-appearance-pills', newVal === 'pills');
  }

  componentWillLoad() {
    if (this.isDisabled) syncHostDisabled(this.el, true);
    this._defaultChecked = this.isChecked;
    warnIfInvalidEnumProp(this.variant, FORM_VARIANTS, 'primary', { component: 'aegov-checkbox', prop: 'variant' });
    if (!this.fieldId) {
      this.fieldId = generateId('aegov-checkbox');
    }
    this.errorId = `${this.fieldId}-error`;
    this.hintId = `${this.fieldId}-hint`;
    this.labelTextId = `${this.fieldId}-label-text`;
    this._sizeWatcher = watchResponsiveProp(this.size, CHECKBOX_SIZES, 'base', v => {
      this._resolvedSize = v as CheckboxSize;
    });
    this._resolvedSize = this._sizeWatcher.current as CheckboxSize;
    const host = this.el as unknown as HTMLElement & { attachInternals?: () => ElementInternals };
    if (typeof host.attachInternals === 'function') {
      try {
        this.internals = host.attachInternals();
        this.internals.setFormValue(this.isChecked ? (this.value ?? 'on') : null);
      } catch {
        this.internals = null;
      }
    }
  }

  formAssociatedCallback(_form: HTMLFormElement | null) { /* no-op */ }
  formDisabledCallback(disabled: boolean) { this.formDisabled = disabled; }

  /**
   * True while an ancestor `<fieldset disabled>` or the host's `disabled`
   * attribute disables the field. Kept apart from `isDisabled` so that
   * re-enabling the fieldset doesn't clear the field's own setting.
   */
  @State() private formDisabled: boolean = false;

  /** Disabled by its own `isDisabled` or by the form. */
  private get disabled(): boolean {
    return this.isDisabled || this.formDisabled;
  }

  /** Leave FormData and constraint validation while disabled, like a native control. */
  @Watch('isDisabled')
  onIsDisabledChange() {
    syncHostDisabled(this.el, this.isDisabled);
  }

  formResetCallback() {
    this.isChecked = this._defaultChecked;
    this.errorMessage = '';
    this.isInvalid = false;
    if (this.inputEl) this.inputEl.setCustomValidity('');
    this.internals?.setFormValue(this.isChecked ? (this.value ?? 'on') : null);
    if (this.isRequired && !this.isChecked) {
      setInternalsValidity(this.internals, synthesizeValidity({ valueMissing: true }), 'Please check this field');
    } else {
      setInternalsValidity(this.internals, { valid: true }, '');
    }
  }

  componentDidLoad() {
    this.hostAria?.refreshSoon();
    adoptExtraClassStylesIntoShadowRoot(this.el.shadowRoot, this.extraClass);
    // Self-detect parent group appearance — bypasses syncChildren() timing dependency.
    // Stencil: children mount before parents, so we read the HTML attribute directly.
    const group = this.el.closest('aegov-checkbox-group');
    if (group) {
      const groupAppearance = group.getAttribute('appearance') || 'default';
      if (groupAppearance !== 'default' && groupAppearance !== this.appearance) {
        this.appearance = groupAppearance;
        (this.el as HTMLElement).classList.toggle('checkbox-appearance-cards', groupAppearance === 'cards');
        (this.el as HTMLElement).classList.toggle('checkbox-appearance-pills', groupAppearance === 'pills');
      }
      // List separator: classes drive :host(.class) .aegov-checkbox CSS rules.
      if (groupAppearance === 'list') {
        const siblings = Array.from(group.children).filter(
          el => el.tagName === 'AEGOV-CHECKBOX' && !el.hasAttribute('slot'),
        );
        const isHorizontal = (group.getAttribute('orientation') || 'vertical') === 'horizontal';
        const host = this.el as HTMLElement;
        host.classList.add('checkbox-in-list');
        host.classList.toggle('checkbox-list-horizontal', isHorizontal);
        host.classList.toggle('checkbox-list-first', siblings[0] === host);
        host.classList.toggle('checkbox-list-last', siblings[siblings.length - 1] === host);
      }
    }
  }

  /** The form found this field invalid during a submit or checkValidity() — start announcing errors. */
  @Listen('invalid')
  onInvalid() {
    this.hasBlurredOnce = true;
  }

  /** Imperatively re-run validation. */
  @Method()
  async validate(trigger: AegovValidationTrigger = 'manual'): Promise<AegovValidationResult> {
    if (trigger === 'submit') this.hasBlurredOnce = true;
    this.syncInternalsValidity();
    const validity = this.readValidity();
    const message = !validity.valid
      ? (this.errorMessage || this.inputEl?.validationMessage || '')
      : '';
    this.aegovValidate.emit(buildValidationDetail<boolean>(
      this.el as unknown as HTMLElement & { name?: string },
      this.isChecked, validity, message, this.errorMessage || null, trigger,
    ));
    return { valid: validity.valid, message, validity };
  }

  /** Mirror of HTMLInputElement.setCustomValidity(). */
  @Method()
  async setCustomValidity(message: string): Promise<void> {
    this.errorMessage = message;
    this.isInvalid = !!message;
    if (this.inputEl && typeof this.inputEl.setCustomValidity === 'function') {
      this.inputEl.setCustomValidity(message);
    }
    if (this.internals) {
      if (message) {
        setInternalsValidity(this.internals, synthesizeValidity({ customError: true }), message, this.inputEl);
      } else {
        setInternalsValidity(this.internals, { valid: true }, '');
      }
    }
  }

  private readValidity() {
    // Disabled controls are barred from constraint validation, as native ones are.
    if (this.disabled) return VALID_STATE;
    const v = this.inputEl?.validity;
    return v ? fromNativeValidity(v) : VALID_STATE;
  }

  private syncInternalsValidity(): void {
    if (!this.internals || !this.inputEl) return;
    const v = this.inputEl.validity;
    if (this.disabled || v.valid) {
      setInternalsValidity(this.internals, { valid: true }, '');
    } else {
      const message = this.errorMessage || this.inputEl.validationMessage || '';
      setInternalsValidity(this.internals, fromNativeValidity(v), message, this.inputEl);
    }
  }

  private emitValidate(trigger: AegovValidationTrigger) {
    const validity = this.readValidity();
    const message = !validity.valid
      ? (this.errorMessage || this.inputEl?.validationMessage || '')
      : '';
    this.aegovValidate.emit(buildValidationDetail<boolean>(
      this.el as unknown as HTMLElement & { name?: string },
      this.isChecked, validity, message, this.errorMessage || null, trigger,
    ));
  }

  private handleBlur = () => {
    this.hasBlurredOnce = true;
    this.emitValidate('blur');
  };

  /** Host aria-label / aria-labelledby / aria-describedby / labels, resolved for the inner control (DS-A11Y-input-01). */
  private hostAria?: HostAria;

  connectedCallback() {
    this.hostAria ??= new HostAria(this.el, { fieldId: () => this.fieldId, internals: () => this.internals, onChange: () => forceUpdate(this) });
    this.hostAria.connect();
  }

  disconnectedCallback() {
    this.hostAria?.disconnect();
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

  /**
   * The inner input's constraints (required, …) only change once it re-renders,
   * so validity is synced after every render rather than in a watcher, which
   * would read the old ones.
   */
  componentDidRender() {
    if (this.inputEl) {
      this.inputEl.indeterminate = this.isIndeterminate;
    }
    this.syncInternalsValidity();
  }

  /**
   * Checked state or value set from code fires no change event — keep the inner
   * input, the form value and validity in step with it (no events, like native).
   */
  @Watch('isChecked')
  @Watch('value')
  onCheckedOrValueChange() {
    if (this.inputEl && this.inputEl.checked !== !!this.isChecked) {
      this.inputEl.checked = !!this.isChecked;
    }
    this.internals?.setFormValue(this.isChecked ? (this.value ?? 'on') : null);
    this.syncInternalsValidity();
  }

  @Watch('isIndeterminate')
  onIndeterminateChange() {
    if (this.inputEl) {
      this.inputEl.indeterminate = this.isIndeterminate;
    }
  }

  @Watch('extraClass')
  onExtraClassChange() {
    adoptExtraClassStylesIntoShadowRoot(this.el.shadowRoot, this.extraClass);
  }

  private handleChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    this.isChecked = input.checked;
    this.isIndeterminate = false;
    this.internals?.setFormValue(this.isChecked ? (this.value ?? 'on') : null);
    this.syncInternalsValidity();
    this.aegovCheckboxChange.emit({ checked: this.isChecked, value: this.value });
    this.emitValidate('change');
  };

  private static readonly PASS_THROUGH_ATTRS = new Set([
    'form', 'tabindex', 'autofocus', 'title',
  ]);


  render() {
    const passThroughAttrs = this.hostAria ? this.hostAria.bridge(getPassThroughAttributes(this.el, AegovCheckbox.PASS_THROUGH_ATTRS)) : getPassThroughAttributes(this.el, AegovCheckbox.PASS_THROUGH_ATTRS);
    // Layer 1 owns aria-invalid + aria-describedby (gap §7.8)
    delete passThroughAttrs['aria-invalid'];
    delete passThroughAttrs['aria-describedby'];

    const variant: FormVariant = (FORM_VARIANTS as readonly string[]).includes(this.variant) ? this.variant : 'primary';
    const wrapperClasses = ['aegov-checkbox', `checkbox--${this._resolvedSize}`, `checkbox-variant-${variant}`];
    if (this.extraClass) wrapperClasses.push(this.extraClass);

    const hasErrorSlot = !!this.el.querySelector('[slot="error"]');
    const hasHintSlot = !!this.el.querySelector('[slot="hint"]');
    const showError = this.isInvalid && (hasErrorSlot || !!this.errorMessage);
    const showHint = !showError && (hasHintSlot || !!this.hint);
    const announceError = showError && this.hasBlurredOnce;
    const authorDescribedBy = this.hostAria?.descriptionId();
    const describedBy = composeDescribedBy(
      authorDescribedBy,
      showError ? this.errorId : null,
      showHint ? this.hintId : null,
    );

    const checkboxInput = (
      <input
        ref={(el) => this.inputEl = el}
        type="checkbox"
        id={this.fieldId}
        value={this.value}
        checked={this.isChecked}
        disabled={this.disabled}
        required={this.isRequired}
        aria-checked={this.isIndeterminate ? 'mixed' : this.isChecked ? 'true' : 'false'}
        aria-required={this.isRequired ? 'true' : undefined}
        aria-invalid={this.isInvalid ? 'true' : null}
        aria-describedby={describedBy}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        aria-labelledby={this.label ? this.labelTextId : undefined}
        {...passThroughAttrs}
      />
    );

    const errorRegion = showError ? (
      <div
        id={this.errorId}
        class="aegov-checkbox__error"
        role={announceError ? 'alert' : null}
      >
        {hasErrorSlot ? <slot name="error" /> : this.errorMessage}
      </div>
    ) : null;

    const hostClass = {
      'is-invalid': this.isInvalid,
      'checkbox-appearance-cards': this.appearance === 'cards',
      'checkbox-appearance-pills': this.appearance === 'pills',
    };

    if (this.label) {
      return (
        <Host class={hostClass}>
          <div class={wrapperClasses.join(' ')}>
            <label class="checkbox__wrapper">
              {checkboxInput}
              <span class="checkbox__text">
                <span id={this.labelTextId} class="checkbox__label-text">{this.label}{this.isRequired && <span class="checkbox__required" aria-hidden="true"> *</span>}</span>
                {showHint && (
                  <span id={this.hintId} class="checkbox__hint">
                    {hasHintSlot ? <slot name="hint" /> : this.hint}
                  </span>
                )}
              </span>
            </label>
          </div>
          {errorRegion}
          {this.hostAria?.renderDescription()}
        </Host>
      );
    }

    return (
      <Host class={hostClass}>
        <div class={wrapperClasses.join(' ')}>
          {checkboxInput}
        </div>
        {errorRegion}
        {this.hostAria?.renderDescription()}
      </Host>
    );
  }
}
