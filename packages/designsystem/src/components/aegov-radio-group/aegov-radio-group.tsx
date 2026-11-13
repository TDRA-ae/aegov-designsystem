import { Component, Host, h, Prop, State, Event, EventEmitter, Element, Listen, Watch, Method, forceUpdate } from '@stencil/core';
import { RADIO_GROUP_VARIANTS, RADIO_GROUP_ORIENTATIONS, RADIO_SIZES, FORM_VARIANTS } from '../../utils/types';
import type {
  RadioGroupVariant, RadioGroupOrientation, RadioSize, FormVariant,
  AegovValidationDetail, AegovValidationResult, AegovValidationTrigger,
} from '../../utils/types';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { watchResponsiveProp } from '../../utils/responsive-prop';
import type { ResponsivePropWatcher } from '../../utils/responsive-prop';
import {
  composeDescribedBy, buildValidationDetail, synthesizeValidity,
  withCustomError,
} from '../../utils/validation';
import { getPassThroughAttributes } from '../../utils/attributes';
import { HostAria } from '../../utils/host-aria';
import { adoptExtraClassStylesIntoShadowRoot } from '../../utils/shadow-styles';
import { generateId } from '../../utils/id-generator';
import { uiLang } from '../../utils/lang';
import { isRtl } from '../../utils/rtl';

const TAG = 'aegov-radio-group';
const ctx = (prop: string) => ({ component: TAG, prop });

/**
 * Built-in text, by page language (DS-A11Y-checkbox-group-01): an Arabic page
 * no longer gets "(required)" / "Required" in English. `errorMessage` still
 * overrides the message.
 */
const STRINGS = {
  en: { required: 'required', requiredMessage: 'Required' },
  ar: { required: 'مطلوب', requiredMessage: 'هذا الحقل مطلوب' },
};

@Component({
  tag: 'aegov-radio-group',
  styleUrl: 'aegov-radio-group.css',
  shadow: { delegatesFocus: true },
})
export class AegovRadioGroup {
  @Element() el: HTMLElement;

  /** Visual appearance for the group layout. */
  @Prop() appearance: RadioGroupVariant = 'default';

  /** Stack direction for radio items. */
  @Prop() orientation: RadioGroupOrientation = 'vertical';

  /** Optional label rendered as a <legend> for accessibility. */
  @Prop() label?: string;

  /** Size of all radios in the group. Propagated to children. */
  @Prop() size: string = 'base';
  @State() private _resolvedSize: RadioSize = 'base';
  private _sizeWatcher: ResponsivePropWatcher | null = null;

  /** Colour family. Cascades to child radios (only if child has no own variant). Focus ring follows the variant's support colour (camel for primary, desert for secondary, seablue for neutral-max/neutral-min); error stays aered regardless. */
  @Prop() variant?: FormVariant;

  /** The name shared by all radios in the group. Ensures native single-select behavior. */
  @Prop() name!: string;

  /** Disables all radios within the group via native fieldset disabled. */
  @Prop({ mutable: true, reflect: true }) isDisabled: boolean = false;

  /** Group is required — at least one radio must be selected. Aggregate-level only. */
  @Prop() isRequired: boolean = false;

  /** Visual + a11y invalid state. See §2.3. */
  @Prop({ mutable: true, reflect: true }) isInvalid: boolean = false;

  /** Inline error message. */
  @Prop({ mutable: true }) errorMessage: string = '';

  /** Helper hint shown below the legend when not invalid. */
  @Prop() hint: string = '';

  /**
   * Additional CSS classes to apply.
   *
   * This component renders in a real shadow root, which normally blocks the page's CSS
   * from reaching inside it. Margin/padding utilities (e.g. `mt-4`, `md:px-6`) are copied
   * in from the page's own stylesheets at runtime and work as expected; other utilities
   * (colour, border, typography, etc.) still have no effect — see #35.
   */
  @Prop() extraClass?: string;

  /** Emitted when the selected radio changes. Contains the selected value. */
  @Event() aegovRadioGroupChange: EventEmitter<{ value: string | undefined }>;

  /** Unified validation event (group-level aggregate). See §2.3. */
  @Event() aegovValidate: EventEmitter<AegovValidationDetail<string | undefined>>;

  @State() private hasInteractedOnce: boolean = false;
  private fieldId: string = '';
  private errorId: string = '';
  private hintId: string = '';

  componentWillLoad() {
    warnIfInvalidEnumProp(this.appearance, RADIO_GROUP_VARIANTS, 'default', ctx('appearance'));
    warnIfInvalidEnumProp(this.orientation, RADIO_GROUP_ORIENTATIONS, 'vertical', ctx('orientation'));
    warnIfInvalidEnumProp(this.variant, FORM_VARIANTS, 'primary', ctx('variant'));
    this._sizeWatcher = watchResponsiveProp(this.size, RADIO_SIZES, 'base', v => {
      this._resolvedSize = v as RadioSize;
      if (this.el.isConnected) { this.syncChildren(); }
    });
    this._resolvedSize = this._sizeWatcher.current as RadioSize;
    this.fieldId = generateId('aegov-radio-group');
    this.errorId = `${this.fieldId}-error`;
    this.hintId = `${this.fieldId}-hint`;
  }

  /** Imperatively re-run validation. */
  @Method()
  async validate(trigger: AegovValidationTrigger = 'manual'): Promise<AegovValidationResult> {
    if (trigger === 'submit') this.hasInteractedOnce = true;
    return this.runAndEmitValidation(trigger);
  }

  /** Set a custom error message. */
  @Method()
  async setCustomValidity(message: string): Promise<void> {
    this.errorMessage = message;
    this.isInvalid = !!message;
    this.customValidityMessage = message;
  }

  /** Message from setCustomValidity(), kept so recomputing validity does not drop it. */
  private customValidityMessage = '';

  private collectSelectedValue(): string | undefined {
    const radios = this.getRadios();
    const selected = radios.find(r => r.isChecked);
    return selected?.value;
  }

  private computeValidity() {
    // Disabled controls are barred from constraint validation, as native ones are.
    if (this.isDisabled) return { ...this.computeConstraintValidity(), validity: synthesizeValidity({}), message: '' };
    return withCustomError(this.computeConstraintValidity(), this.customValidityMessage);
  }

  private computeConstraintValidity() {
    const value = this.collectSelectedValue();
    if (this.isRequired && !value) {
      return { validity: synthesizeValidity({ valueMissing: true }), message: this.errorMessage || STRINGS[uiLang(this.el)].requiredMessage, value };
    }
    return { validity: synthesizeValidity({}), message: '', value };
  }

  private async runAndEmitValidation(trigger: AegovValidationTrigger): Promise<AegovValidationResult> {
    const { validity, message, value } = this.computeValidity();
    this.aegovValidate.emit(buildValidationDetail<string | undefined>(
      this.el as unknown as HTMLElement & { name?: string },
      value, validity, message, this.errorMessage || null, trigger,
    ));
    return { valid: validity.valid, message, validity };
  }

  componentDidLoad() {
    this.hostAria?.refreshSoon();
    this.syncChildren();
    adoptExtraClassStylesIntoShadowRoot(this.el.shadowRoot, this.extraClass);
  }

  @Watch('extraClass')
  onExtraClassChange() {
    adoptExtraClassStylesIntoShadowRoot(this.el.shadowRoot, this.extraClass);
  }

  @Watch('appearance')
  onVariantChange(v: unknown) {
    warnIfInvalidEnumProp(v, RADIO_GROUP_VARIANTS, 'default', ctx('appearance'));
    if (this.el.isConnected) { this.syncChildren(); }
  }

  @Watch('orientation')
  onOrientationChange(v: unknown) { warnIfInvalidEnumProp(v, RADIO_GROUP_ORIENTATIONS, 'vertical', ctx('orientation')); }

  @Watch('variant')
  onColourVariantChange(v: unknown) {
    warnIfInvalidEnumProp(v, FORM_VARIANTS, 'primary', ctx('variant'));
    if (this.el.isConnected) { this.syncChildren(); }
  }

  @Watch('isDisabled')
  onIsDisabledChange() {
    if (this.el.isConnected) { this.syncChildren(); }
  }

  /** Host aria-label / aria-labelledby / aria-describedby / labels, resolved for the inner control (DS-A11Y-input-01). */
  private hostAria?: HostAria;

  connectedCallback() {
    this.hostAria ??= new HostAria(this.el, { fieldId: () => this.fieldId, onChange: () => forceUpdate(this) });
    this.hostAria.connect();
  }

  disconnectedCallback() {
    this.hostAria?.disconnect();
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

  /** Each child's own isDisabled, saved while the group is forcing it disabled. */
  private childOwnDisabled = new WeakMap<HTMLElement, boolean>();

  private syncChildren() {
    const radios = this.getRadios();
    const isListAppearance = this.appearance === 'list';
    const isHorizontal = this.orientation === 'horizontal';
    radios.forEach((radio, index) => {
      radio.size = this._resolvedSize;
      radio.name = this.name;
      (radio as any).appearance = this.appearance;
      const hostEl = radio as HTMLElement;
      // Also set host class directly — Stencil's async re-render may not fire in time
      hostEl.classList.toggle('radio-appearance-cards', this.appearance === 'cards');
      hostEl.classList.toggle('radio-appearance-pills', this.appearance === 'pills');
      // List separator classes, applied directly here rather than left to
      // aegov-radio's own componentDidLoad self-detection (which read the
      // group's raw `appearance` DOM attribute — never set when a consumer
      // like React assigns the prop only as a JS property, #62).
      hostEl.classList.toggle('radio-in-list', isListAppearance);
      hostEl.classList.toggle('radio-list-horizontal', isListAppearance && isHorizontal);
      hostEl.classList.toggle('radio-list-first', isListAppearance && index === 0);
      hostEl.classList.toggle('radio-list-last', isListAppearance && index === radios.length - 1);
      // Cascade variant only if the child never set its own (same sentinel
      // bug as #31). `variant` no longer has a default value — a child that
      // never touched it reads back as genuinely `undefined`, distinguishable
      // from one that explicitly chose `variant="primary"`.
      if (radio.variant === undefined) {
        radio.variant = this.variant;
      }
      // A disabled group always wins (#34); an enabled group must not clear a
      // child's own is-disabled, so restore whatever the child had before.
      if (this.isDisabled) {
        if (!this.childOwnDisabled.has(radio)) this.childOwnDisabled.set(radio, !!radio.isDisabled);
        radio.isDisabled = true;
      } else if (this.childOwnDisabled.has(radio)) {
        radio.isDisabled = this.childOwnDisabled.get(radio);
        this.childOwnDisabled.delete(radio);
      }
      // Disabled dimming is per-item only (aegov-radio.css); the group dims
      // just its legend/hint, so nothing compounds (#68).
    });
    this.syncRovingTabindex(radios);
  }

  private getRadios(): HTMLAegovRadioElement[] {
    return Array.from(this.el.querySelectorAll('aegov-radio'));
  }

  /**
   * Implements the WAI-ARIA radiogroup roving-tabindex pattern (#61): only
   * one radio in the group is ever a Tab stop (the checked one, or the first
   * enabled one if none is checked) — the rest get `tabindex="-1"` on their
   * real native `<input>` so Tab/Shift+Tab skip straight over them, while
   * they stay individually focusable for the arrow-key handler below.
   * Native `name`-sharing can't do this automatically here since each
   * radio's real input lives in its own separate shadow root (#61).
   */
  private syncRovingTabindex(radios: HTMLAegovRadioElement[] = this.getRadios()) {
    const enabled = radios.filter(radio => !radio.isDisabled);
    if (enabled.length === 0) return;
    const active = enabled.find(radio => radio.isChecked) ?? enabled[0];
    enabled.forEach(radio => {
      const input = radio.shadowRoot?.querySelector('input[type="radio"]') as HTMLInputElement | null;
      if (input) {
        input.tabIndex = radio === active ? 0 : -1;
      }
    });
  }

  /**
   * A group is not form-associated, so the browser never calls formResetCallback()
   * on it. `reset` bubbles, so listen at the document and clear the group's error
   * state when its own form is reset (and the reset was not cancelled), matching
   * what every form-associated control does in its formResetCallback().
   */
  @Listen('reset', { target: 'document' })
  handleFormReset(event: Event) {
    if (event.defaultPrevented) return;
    const form = event.target as Node | null;
    if (!form || !form.contains(this.el)) return;
    this.errorMessage = '';
    this.isInvalid = false;
    this.customValidityMessage = '';
  }

  /**
   * A radio's isChecked changed outside a user click/arrow (form reset,
   * framework binding, script): keep a single selection and move the Tab stop
   * to it (DS-A11Y-radio-group-01).
   */
  @Listen('aegovRadioCheckedSync')
  handleRadioCheckedSync(event: CustomEvent<{ checked: boolean }>) {
    const target = event.target as HTMLAegovRadioElement;
    const radios = this.getRadios();
    if (!radios.includes(target)) return;
    if (event.detail.checked) {
      radios.forEach(radio => {
        if (radio !== target && radio.isChecked) radio.isChecked = false;
      });
    }
    this.syncRovingTabindex(radios);
  }

  /**
   * With nothing selected the first radio is the Tab stop, so Shift+Tab from
   * after the group landed on the first option. Native radios land on the
   * last one when coming from below; do the same (DS-A11Y-radio-group-03).
   */
  /** Time of the last Shift+Tab, so only keyboard entry is redirected (a mouse click keeps its target). */
  private lastShiftTabAt = 0;

  @Listen('keydown', { target: 'document', capture: true })
  trackShiftTab(event: KeyboardEvent) {
    if (event.key === 'Tab' && event.shiftKey) this.lastShiftTabAt = Date.now();
  }

  @Listen('focusin')
  handleGroupFocusIn(event: FocusEvent) {
    if (Date.now() - this.lastShiftTabAt > 500) return;
    const from = event.relatedTarget as Node | null;
    if (!from || this.el.contains(from)) return;
    if (!(this.el.compareDocumentPosition(from) & Node.DOCUMENT_POSITION_FOLLOWING)) return;
    const enabled = this.getRadios().filter(radio => !radio.isDisabled);
    if (enabled.length < 2 || enabled.some(radio => radio.isChecked)) return;
    const last = enabled[enabled.length - 1];
    if (event.target === last) return;
    (last as unknown as HTMLElement).focus();
  }

  @Listen('focusout')
  handleGroupBlur(event: FocusEvent) {
    if (!this.el.contains(event.relatedTarget as Node)) {
      this.hasInteractedOnce = true;
      this.runAndEmitValidation('blur');
    }
  }

  @Listen('aegovRadioChange')
  handleRadioChange(event: CustomEvent<{ checked: boolean; value?: string }>) {
    const target = event.target as HTMLAegovRadioElement;

    if (event.detail.checked) {
      // Uncheck all other radios (sync Stencil state; native radio handles DOM)
      const radios = this.getRadios();
      radios.forEach(radio => {
        if (radio !== target) {
          radio.isChecked = false;
        }
      });
      this.syncRovingTabindex(radios);
    }

    this.aegovRadioGroupChange.emit({ value: event.detail.checked ? event.detail.value : undefined });
    this.hasInteractedOnce = true;
    const { validity, message, value } = this.computeValidity();
    this.aegovValidate.emit(buildValidationDetail<string | undefined>(
      this.el as unknown as HTMLElement & { name?: string },
      value, validity, message, this.errorMessage || null, 'change',
    ));
  }

  /**
   * Arrow-key roving focus + selection, per the ARIA radiogroup pattern (#61).
   * Browsers do this natively only when every radio's real `<input>` shares
   * one literal `name` in the same tree scope — impossible here since each
   * radio's input is isolated in its own shadow root — so it's reimplemented
   * by simulating the same native "check + fire change" sequence a real
   * same-name radio group would produce, reusing aegov-radio's own existing
   * change handling rather than duplicating its event-emission logic.
   */
  @Listen('keydown')
  handleKeyDown(event: KeyboardEvent) {
    if (!['ArrowRight', 'ArrowDown', 'ArrowLeft', 'ArrowUp'].includes(event.key)) return;

    const radios = this.getRadios().filter(radio => !radio.isDisabled);
    if (radios.length < 2) return;

    const currentIndex = radios.indexOf(document.activeElement as HTMLAegovRadioElement);
    if (currentIndex === -1) return;

    event.preventDefault();

    // Left/Right follow the reading direction: in RTL the next option is on the
    // left, so ArrowLeft moves forward (as native radios do, DS-A11Y-radio-group-02).
    // Up/Down are the same in both directions.
    const forwardKeys = isRtl(this.el) ? ['ArrowLeft', 'ArrowDown'] : ['ArrowRight', 'ArrowDown'];
    const direction = forwardKeys.includes(event.key) ? 1 : -1;
    const next = radios[(currentIndex + direction + radios.length) % radios.length];

    const nextInput = next.shadowRoot?.querySelector('input[type="radio"]') as HTMLInputElement | null;
    if (nextInput && !nextInput.checked) {
      nextInput.checked = true;
      nextInput.dispatchEvent(new globalThis.Event('change', { bubbles: true }));
    }
    (next as unknown as HTMLElement).focus();
  }

  private getGroupClasses(): string {
    const classes = ['aegov-radio-group'];
    const appearance: RadioGroupVariant = (RADIO_GROUP_VARIANTS as readonly string[]).includes(this.appearance) ? this.appearance : 'default';
    const orientation: RadioGroupOrientation = (RADIO_GROUP_ORIENTATIONS as readonly string[]).includes(this.orientation) ? this.orientation : 'vertical';
    if (appearance !== 'default') {
      classes.push(`radio-group--${appearance}`);
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
    const hasErrorSlot = !!this.el.querySelector('[slot="error"]');
    const hasHintSlot = !!this.el.querySelector('[slot="hint"]');
    const showError = this.isInvalid && (hasErrorSlot || !!this.errorMessage);
    const showHint = !showError && (hasHintSlot || !!this.hint);
    const announceError = showError && this.hasInteractedOnce;

    const passThroughAttrs = this.hostAria ? this.hostAria.bridge(getPassThroughAttributes(this.el)) : getPassThroughAttributes(this.el);
    delete passThroughAttrs['aria-invalid'];
    delete passThroughAttrs['aria-describedby'];
    delete passThroughAttrs['aria-required'];

    const authorDescribedBy = this.hostAria?.descriptionId();
    const describedBy = composeDescribedBy(
      authorDescribedBy,
      showError ? this.errorId : null,
      showHint ? this.hintId : null,
    );

    return (
      <Host class={{ 'is-invalid': this.isInvalid }}>
        <fieldset
          class={this.getGroupClasses()}
          role="radiogroup"
          disabled={this.isDisabled}
          aria-required={this.isRequired ? 'true' : undefined}
          aria-invalid={this.isInvalid ? 'true' : null}
          aria-describedby={describedBy}
          {...passThroughAttrs}
        >
          {this.label && (
            <legend class="radio-group__legend">
              {this.label}
              {/* Visible marker (WCAG 3.3.2, DS-A11Y-checkbox-03); the radiogroup already exposes aria-required. */}
              {this.isRequired && <span class="radio-group__required" aria-hidden="true"> *</span>}
            </legend>
          )}
          <div class="radio-group__items">
            <slot />
          </div>
          {showHint && (
            <div id={this.hintId} class="aegov-radio-group__hint">
              {hasHintSlot ? <slot name="hint" /> : this.hint}
            </div>
          )}
          {showError && (
            <div
              id={this.errorId}
              class="aegov-radio-group__error"
              role={announceError ? 'alert' : null}
            >
              {hasErrorSlot ? <slot name="error" /> : this.errorMessage}
            </div>
          )}
        </fieldset>
        {this.hostAria?.renderDescription()}
      </Host>
    );
  }
}
