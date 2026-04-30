import { Component, Host, h, Prop, State, Event, EventEmitter, Element, Watch } from '@stencil/core';
import { TEXTAREA_SIZES, TEXTAREA_RESIZES } from '../../utils/types';
import type { TextareaSize, TextareaResize } from '../../utils/types';
import { getPassThroughAttributes } from '../../utils/attributes';
import { generateId } from '../../utils/id-generator';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { watchResponsiveProp } from '../../utils/responsive-prop';
import type { ResponsivePropWatcher } from '../../utils/responsive-prop';

const TAG = 'aegov-textarea';
const ctx = (prop: string) => ({ component: TAG, prop });

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

  /** Whether the textarea is disabled. */
  @Prop() disabled: boolean = false;

  /** Whether the textarea is readonly. */
  @Prop() readonly: boolean = false;

  /** Placeholder text for the textarea. */
  @Prop() placeholder?: string;

  /** The current value of the textarea. */
  @Prop({ mutable: true }) value: string = '';

  /** The name attribute for the textarea. */
  @Prop() name?: string;

  /** Whether the textarea is required. */
  @Prop() required: boolean = false;

  /** Resize behaviour of the textarea. */
  @Prop() resize: TextareaResize = 'vertical';

  /** Maximum number of characters. When set, a character counter is displayed. */
  @Prop() maxlength?: number;

  /** Show a copy button to copy the textarea value to clipboard. Only applies when readonly. */
  @Prop() copyable: boolean = false;

  /** Additional CSS classes to apply. */
  @Prop() extraClass?: string;

  /** Tracks whether the value was just copied (for visual feedback). */
  @State() justCopied: boolean = false;

  /** Internal character count for the counter display. */
  @State() charCount: number = 0;

  private textareaEl?: HTMLTextAreaElement;

  /** Emitted when the textarea value changes (on blur). */
  @Event() aegovTextareaChange: EventEmitter<{ value: string; event: Event }>;

  /** Emitted on every keystroke. */
  @Event() aegovTextareaInput: EventEmitter<{ value: string; event: Event }>;

  /** Emitted when the textarea gains focus. */
  @Event() aegovTextareaFocus: EventEmitter<FocusEvent>;

  /** Emitted when the textarea loses focus. */
  @Event() aegovTextareaBlur: EventEmitter<FocusEvent>;

  componentWillLoad() {
    this._sizeWatcher = watchResponsiveProp(this.size, TEXTAREA_SIZES, 'base', v => {
      this._resolvedSize = v as TextareaSize;
    });
    this._resolvedSize = this._sizeWatcher.current as TextareaSize;
    warnIfInvalidEnumProp(this.resize, TEXTAREA_RESIZES, 'vertical', ctx('resize'));
    if (!this.fieldId) {
      this.fieldId = generateId('aegov-textarea');
    }
    this.charCount = (this.value || '').length;
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

  @Watch('value')
  watchValue(newVal: string) {
    this.charCount = (newVal || '').length;
    if (this.resize === 'auto' && this.textareaEl) {
      this.autoResize();
    }
  }

  /** Native textarea attributes to pass through. */
  private static readonly NATIVE_TEXTAREA_ATTRS = new Set([
    'rows', 'cols', 'minlength', 'maxlength', 'wrap',
    'autocomplete', 'autofocus', 'spellcheck', 'enterkeyhint',
    'title', 'tabindex', 'form',
  ]);


  private get isCopyable(): boolean {
    return this.readonly && this.copyable;
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

    const resizeClasses: Record<TextareaResize, string> = {
      none: 'textarea--resize-none',
      vertical: 'textarea--resize-vertical',
      horizontal: 'textarea--resize-horizontal',
      both: 'textarea--resize-both',
      auto: 'textarea--resize-none',
    };

    const resize: TextareaResize = (TEXTAREA_RESIZES as readonly string[]).includes(this.resize) ? this.resize : 'vertical';
    classes.push(resizeClasses[resize]);

    if (this.isCopyable) {
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
  };

  private handleInput = (event: Event) => {
    const textarea = event.target as HTMLTextAreaElement;
    this.value = textarea.value;
    this.aegovTextareaInput.emit({ value: this.value, event });
    if (this.resize === 'auto') {
      this.autoResize();
    }
  };

  private handleFocus = (event: FocusEvent) => {
    this.aegovTextareaFocus.emit(event);
  };

  private handleBlur = (event: FocusEvent) => {
    this.aegovTextareaBlur.emit(event);
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
    if (!this.isCopyable) return null;

    return (
      <button
        type="button"
        class={`textarea__copy-btn${this.justCopied ? ' textarea__copy-btn--copied' : ''}`}
        onClick={this.handleCopy}
        tabindex={-1}
        aria-label={this.justCopied ? 'Copied' : 'Copy to clipboard'}
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
    const passThroughAttributes = getPassThroughAttributes(this.el, AegovTextarea.NATIVE_TEXTAREA_ATTRS);
    const needsWrapper = this.isCopyable;
    const hasCounter = this.maxlength !== undefined && this.maxlength !== null;

    const textarea = (
      <textarea
        id={this.fieldId}
        class={this.getTextareaClasses()}
        disabled={this.disabled}
        readOnly={this.readonly}
        placeholder={this.placeholder}
        value={this.value}
        name={this.name}
        required={this.required}
        aria-describedby={hasCounter ? this.counterId : undefined}
        onChange={this.handleChange}
        onInput={this.handleInput}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        ref={(el) => this.textareaEl = el}
        {...passThroughAttributes}
      />
    );

    if (needsWrapper || hasCounter) {
      return (
        <Host>
          <div class="textarea__wrapper">
            {textarea}
            {this.renderCopyButton()}
          </div>
          {this.renderCharCounter()}
        </Host>
      );
    }

    return (
      <Host>
        {textarea}
      </Host>
    );
  }
}
