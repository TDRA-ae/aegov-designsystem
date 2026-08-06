import { Component, Host, h, Prop, State, Event, EventEmitter, Element, Watch, Method } from '@stencil/core';
import { TEXTAREA_SIZES, TEXTAREA_RESIZES, FORM_VARIANTS } from '../../utils/types';
import type {
  TextareaSize, TextareaResize, FormVariant,
  AegovValidationDetail, AegovValidationResult, AegovValidationTrigger,
} from '../../utils/types';
import { getPassThroughAttributes } from '../../utils/attributes';
import { generateId } from '../../utils/id-generator';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { isRtl } from '../../utils/rtl';
import { watchResponsiveProp } from '../../utils/responsive-prop';
import type { ResponsivePropWatcher } from '../../utils/responsive-prop';
import {
  fromNativeValidity, VALID_STATE,
  composeDescribedBy, buildValidationDetail,
} from '../../utils/validation';

const TAG = 'aegov-textarea';
const ctx = (prop: string) => ({ component: TAG, prop });

const STRINGS = {
  en: { copy: 'Copy to clipboard', copied: 'Copied' },
  ar: { copy: 'نسخ إلى الحافظة', copied: 'تم النسخ' },
};

@Component({
  tag: 'aegov-textarea',
  styleUrl: 'aegov-textarea.css',
  scoped: false,
  shadow: false,
})
export class AegovTextarea {
  @Element() el: HTMLElement;

  /** Unique ID for the native textarea element. Auto-generated if not provided. */
  @Prop({ mutable: true, reflect: true }) fieldId?: string;

  /** The size of the textarea (affects font size only). */
  @Prop() size: string = 'base';
  @State() private _resolvedSize: TextareaSize = 'base';
  private _sizeWatcher: ResponsivePropWatcher | null = null;

  /** Colour family. Drives idle ring, value text, and accent hover. */
  @Prop() variant: FormVariant = 'primary';

  /**
   * Whether the textarea is disabled.
   * Reflected as `is-disabled` so `aegov-form-field` can dim the associated label via CSS.
   */
  @Prop({ reflect: true }) isDisabled: boolean = false;

  /** Whether the textarea is readonly. */
  @Prop() isReadonly: boolean = false;

  /** Placeholder text for the textarea. */
  @Prop() placeholder?: string;

  /** The current value of the textarea. */
  @Prop({ mutable: true }) value: string = '';

  /** The name attribute for the textarea. */
  @Prop() name?: string;

  /** Whether the textarea is required. */
  @Prop() isRequired: boolean = false;

  /** Resize behaviour of the textarea. */
  @Prop() resize: TextareaResize = 'vertical';

  /** Maximum number of characters. When set, a character counter is displayed. */
  @Prop() maxlength?: number;

  /** Show a copy button to copy the textarea value to clipboard. Only applies when readonly. */
  @Prop() isCopyable: boolean = false;

  /** Visual + a11y invalid state. Toggles `aria-invalid` and `.is-invalid` host class. See validation-engine-addon.md §2.3. */
  @Prop({ mutable: true, reflect: true }) isInvalid: boolean = false;

  /** Inline error message rendered below the control when `isInvalid` is true. Use `error` slot for richer markup. */
  @Prop({ mutable: true }) errorMessage: string = '';

  /** Helper hint rendered below the control. Hidden when an error is shown. Use `hint` slot for richer markup. */
  @Prop() hint: string = '';

  /** Additional CSS classes to apply. */
  @Prop() extraClass?: string;

  /** Tracks whether the value was just copied (for visual feedback). */
  @State() justCopied: boolean = false;

  /** Internal character count for the counter display. */
  @State() charCount: number = 0;

  private textareaEl?: HTMLTextAreaElement;

  /** Emitted when the textarea value changes (on blur). */
  @Event() aegovTextareaChange: EventEmitter<{ value: string; event: globalThis.Event }>;

  /** Emitted on every keystroke. */
  @Event() aegovTextareaInput: EventEmitter<{ value: string; event: globalThis.Event }>;

  /** Emitted when the textarea gains focus. */
  @Event() aegovTextareaFocus: EventEmitter<FocusEvent>;

  /** Emitted when the textarea loses focus. */
  @Event() aegovTextareaBlur: EventEmitter<FocusEvent>;

  /** Unified validation event. See validation-engine-addon.md §2.3. */
  @Event() aegovValidate: EventEmitter<AegovValidationDetail<string>>;

  /** Whether user has blurred at least once — gates aria-live (gap §7.10). */
  @State() private hasBlurredOnce: boolean = false;

  private errorId: string = '';
  private hintId: string = '';

  componentWillLoad() {
    this._sizeWatcher = watchResponsiveProp(this.size, TEXTAREA_SIZES, 'base', v => {
      this._resolvedSize = v as TextareaSize;
    });
    this._resolvedSize = this._sizeWatcher.current as TextareaSize;
    warnIfInvalidEnumProp(this.resize, TEXTAREA_RESIZES, 'vertical', ctx('resize'));
    warnIfInvalidEnumProp(this.variant, FORM_VARIANTS, 'primary', ctx('variant'));
    if (!this.fieldId) {
      this.fieldId = generateId('aegov-textarea');
    }
    this.errorId = `${this.fieldId}-error`;
    this.hintId = `${this.fieldId}-hint`;
    this.charCount = (this.value || '').length;
  }

  /** Imperatively re-run validation. */
  @Method()
  async validate(trigger: AegovValidationTrigger = 'manual'): Promise<AegovValidationResult> {
    const validity = this.readValidity();
    const message = !validity.valid
      ? (this.errorMessage || this.textareaEl?.validationMessage || '')
      : '';
    this.aegovValidate.emit(buildValidationDetail<string>(
      this.el as unknown as HTMLElement & { name?: string },
      this.value, validity, message, this.errorMessage || null, trigger,
    ));
    return { valid: validity.valid, message, validity };
  }

  /** Mirror of `HTMLTextAreaElement.setCustomValidity()`. */
  @Method()
  async setCustomValidity(message: string): Promise<void> {
    this.errorMessage = message;
    this.isInvalid = !!message;
    if (this.textareaEl && typeof this.textareaEl.setCustomValidity === 'function') {
      this.textareaEl.setCustomValidity(message);
    }
  }

  private readValidity() {
    const v = this.textareaEl?.validity;
    return v ? fromNativeValidity(v) : VALID_STATE;
  }

  private emitValidate(trigger: AegovValidationTrigger) {
    const validity = this.readValidity();
    const message = !validity.valid
      ? (this.errorMessage || this.textareaEl?.validationMessage || '')
      : '';
    this.aegovValidate.emit(buildValidationDetail<string>(
      this.el as unknown as HTMLElement & { name?: string },
      this.value, validity, message, this.errorMessage || null, trigger,
    ));
  }

  disconnectedCallback() {
    this._sizeWatcher?.destroy();
  }

  @Watch('size')
  onSizeChange() {
    this._sizeWatcher?.destroy();
    this._sizeWatcher = watchResponsiveProp(this.size, TEXTAREA_SIZES, 'base', v => {
      this._resolvedSize = v as TextareaSize;
    });
    this._resolvedSize = this._sizeWatcher.current as TextareaSize;
  }

  @Watch('resize')
  onResizeChange(v: unknown) { warnIfInvalidEnumProp(v, TEXTAREA_RESIZES, 'vertical', ctx('resize')); }

  @Watch('variant')
  onVariantChange(v: unknown) { warnIfInvalidEnumProp(v, FORM_VARIANTS, 'primary', ctx('variant')); }

  @Watch('value')
  watchValue(newVal: string) {
    this.charCount = (newVal || '').length;
    if (this.resize === 'auto' && this.textareaEl) {
      this.autoResize();
    }
  }

  /** Native textarea attributes to pass through. */
  private static readonly PASS_THROUGH_ATTRS = new Set([
    'rows', 'cols', 'minlength', 'wrap',
    'autocomplete', 'autofocus', 'spellcheck', 'enterkeyhint',
    'title', 'tabindex', 'form',
  ]);


  private get showCopy(): boolean {
    return this.isReadonly && this.isCopyable;
  }

  private getTextareaClasses(): string {
    const classes: string[] = ['aegov-textarea'];

    const sizeClasses: Record<TextareaSize, string> = {
      xs: 'textarea--xs',
      sm: 'textarea--sm',
      base: 'textarea--base',
      lg: 'textarea--lg',
      xl: 'textarea--xl',
    };

    classes.push(sizeClasses[this._resolvedSize]);

    const variant: FormVariant = (FORM_VARIANTS as readonly string[]).includes(this.variant) ? this.variant : 'primary';
    classes.push(`textarea-variant-${variant}`);

    const resizeClasses: Record<TextareaResize, string> = {
      none: 'textarea--resize-none',
      vertical: 'textarea--resize-vertical',
      horizontal: 'textarea--resize-horizontal',
      both: 'textarea--resize-both',
      auto: 'textarea--resize-none',
    };

    const resize: TextareaResize = (TEXTAREA_RESIZES as readonly string[]).includes(this.resize) ? this.resize : 'vertical';
    classes.push(resizeClasses[resize]);

    if (this.showCopy) {
      classes.push('textarea--has-copy');
    }

    if (this.extraClass) {
      classes.push(this.extraClass);
    }

    return classes.join(' ');
  }

  private handleChange = (event: Event) => {
    const textarea = event.target as HTMLTextAreaElement;
    this.value = textarea.value;
    this.aegovTextareaChange.emit({ value: this.value, event });
    this.emitValidate('change');
  };

  private handleInput = (event: Event) => {
    const textarea = event.target as HTMLTextAreaElement;
    this.value = textarea.value;
    this.aegovTextareaInput.emit({ value: this.value, event });
    if (this.resize === 'auto') {
      this.autoResize();
    }
    this.emitValidate('input');
  };

  private handleFocus = (event: FocusEvent) => {
    this.aegovTextareaFocus.emit(event);
  };

  private handleBlur = (event: FocusEvent) => {
    this.hasBlurredOnce = true;
    this.aegovTextareaBlur.emit(event);
    this.emitValidate('blur');
  };

  private autoResize() {
    const el = this.textareaEl;
    if (!el) return;
    el.style.height = 'auto';
    el.style.height = `${el.scrollHeight}px`;
  }

  private handleCopy = async () => {
    if (!this.value) return;
    try {
      await navigator.clipboard.writeText(this.value);
      this.justCopied = true;
      setTimeout(() => {
        this.justCopied = false;
      }, 2000);
    } catch {
      const textarea = this.el.querySelector('textarea');
      if (textarea) {
        textarea.select();
        document.execCommand('copy');
        this.justCopied = true;
        setTimeout(() => {
          this.justCopied = false;
        }, 2000);
      }
    }
  };

  private renderCopyButton() {
    if (!this.showCopy) return null;
    const t = isRtl(this.el) ? STRINGS.ar : STRINGS.en;
    return (
      <button
        type="button"
        class={`textarea__copy-btn${this.justCopied ? ' textarea__copy-btn--copied' : ''}`}
        onClick={this.handleCopy}
        aria-label={this.justCopied ? t.copied : t.copy}
      >
        {this.justCopied ? (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        )}
      </button>
    );
  }

  private get counterId(): string {
    return `${this.fieldId}-counter`;
  }

  private renderCharCounter() {
    if (this.maxlength === undefined || this.maxlength === null) return null;

    const isOver = this.charCount > this.maxlength;

    return (
      <div
        id={this.counterId}
        class={`textarea__counter${isOver ? ' textarea__counter--over' : ''}`}
        aria-live="polite"
        aria-atomic="true"
      >
        {this.charCount} / {this.maxlength}
      </div>
    );
  }

  render() {
    const passThroughAttributes = getPassThroughAttributes(this.el, AegovTextarea.PASS_THROUGH_ATTRS);
    // Layer 1 owns aria-invalid + aria-describedby (gap §7.8); strip from pass-through.
    delete passThroughAttributes['aria-invalid'];
    delete passThroughAttributes['aria-describedby'];

    const needsWrapper = this.showCopy;
    const hasCounter = this.maxlength !== undefined && this.maxlength !== null;
    const hasErrorSlot = !!this.el.querySelector('[slot="error"]');
    const hasHintSlot = !!this.el.querySelector('[slot="hint"]');
    const showError = this.isInvalid && (hasErrorSlot || !!this.errorMessage);
    const showHint = !showError && (hasHintSlot || !!this.hint);
    const announceError = showError && this.hasBlurredOnce;
    const authorDescribedBy = this.el.getAttribute('aria-describedby');
    const describedBy = composeDescribedBy(
      authorDescribedBy,
      hasCounter ? this.counterId : null,
      showError ? this.errorId : null,
      showHint ? this.hintId : null,
    );

    const textarea = (
      <textarea
        id={this.fieldId}
        class={this.getTextareaClasses()}
        disabled={this.isDisabled}
        readOnly={this.isReadonly}
        placeholder={this.placeholder}
        value={this.value}
        name={this.name}
        required={this.isRequired}
        maxLength={this.maxlength}
        aria-invalid={this.isInvalid ? 'true' : null}
        aria-describedby={describedBy}
        onChange={this.handleChange}
        onInput={this.handleInput}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        ref={(el) => this.textareaEl = el}
        {...passThroughAttributes}
      />
    );

    const errorRegion = showError ? (
      <div
        id={this.errorId}
        class="aegov-textarea__error"
        role={announceError ? 'alert' : null}
      >
        {hasErrorSlot ? <slot name="error" /> : this.errorMessage}
      </div>
    ) : null;

    const hintRegion = showHint ? (
      <div id={this.hintId} class="aegov-textarea__hint">
        {hasHintSlot ? <slot name="hint" /> : this.hint}
      </div>
    ) : null;

    const hostClass = { 'is-invalid': this.isInvalid };

    if (needsWrapper || hasCounter) {
      return (
        <Host class={hostClass}>
          <div class="textarea__wrapper">
            {textarea}
            {this.renderCopyButton()}
          </div>
          {this.renderCharCounter()}
          {errorRegion}
          {hintRegion}
        </Host>
      );
    }

    return (
      <Host class={hostClass}>
        {textarea}
        {errorRegion}
        {hintRegion}
      </Host>
    );
  }
}
