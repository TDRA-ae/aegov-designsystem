import { Component, Host, h, Prop, State, Event, EventEmitter, Element } from '@stencil/core';
import type { InputType, InputSize } from '../../utils/types';

let fieldIdCounter = 0;

@Component({
  tag: 'aegov-input',
  styleUrl: 'aegov-input.css',
  scoped: false,
  shadow: false,
})
export class AegovInput {
  @Element() el: HTMLElement;

  /** Unique ID for the native input element. Auto-generated if not provided. */
  @Prop({ mutable: true, reflect: true }) fieldId?: string;

  /** The type of the input field. */
  @Prop() type: InputType = 'text';

  /** The size of the input field. */
  @Prop() size: InputSize = 'base';

  /** Whether the input is disabled. */
  @Prop() disabled: boolean = false;

  /** Whether the input is readonly. */
  @Prop() readonly: boolean = false;

  /** Placeholder text for the input. */
  @Prop() placeholder?: string;

  /** The current value of the input. */
  @Prop({ mutable: true }) value: string = '';

  /** The name attribute for the input. */
  @Prop() name?: string;

  /** Whether the input is required. */
  @Prop() required: boolean = false;

  /** Show a toggle button to reveal/hide password. Only applies when type="password". */
  @Prop() revealable: boolean = false;

  /** Show a copy button to copy the input value to clipboard. Only applies when readonly. */
  @Prop() copyable: boolean = false;

  /** Additional CSS classes to apply. */
  @Prop() class?: string;

  /** Tracks whether the password is currently visible. */
  @State() passwordVisible: boolean = false;

  /** Tracks whether the value was just copied (for visual feedback). */
  @State() justCopied: boolean = false;

  /** Emitted when the input value changes (on blur/enter). */
  @Event() aegovInputChange: EventEmitter<{ value: string; event: Event }>;

  /** Emitted on every keystroke. */
  @Event() aegovInputInput: EventEmitter<{ value: string; event: Event }>;

  /** Emitted when the input gains focus. */
  @Event() aegovInputFocus: EventEmitter<FocusEvent>;

  /** Emitted when the input loses focus. */
  @Event() aegovInputBlur: EventEmitter<FocusEvent>;

  componentWillLoad() {
    if (!this.fieldId) {
      this.fieldId = `aegov-input-${++fieldIdCounter}`;
    }
  }

  /** Native input attributes to pass through to the inner input element. */
  private static readonly NATIVE_INPUT_ATTRS = new Set([
    'pattern', 'min', 'max', 'minlength', 'maxlength', 'step',
    'autocomplete', 'autofocus', 'inputmode', 'list', 'multiple',
    'accept', 'capture', 'spellcheck', 'enterkeyhint', 'title',
    'tabindex', 'form',
  ]);

  private getPassThroughAttributes(): { [key: string]: string } {
    const passThroughAttrs: { [key: string]: string } = {};
    Array.from(this.el.attributes).forEach(attr => {
      if (
        attr.name.startsWith('aria-') ||
        attr.name.startsWith('data-') ||
        AegovInput.NATIVE_INPUT_ATTRS.has(attr.name)
      ) {
        passThroughAttrs[attr.name] = attr.value;
      }
    });
    return passThroughAttrs;
  }

  private get isRevealable(): boolean {
    return this.type === 'password' && this.revealable;
  }

  private get isCopyable(): boolean {
    return this.readonly && this.copyable;
  }

  private get hasActionButton(): boolean {
    return this.isRevealable || this.isCopyable;
  }

  private get resolvedType(): string {
    if (this.isRevealable && this.passwordVisible) {
      return 'text';
    }
    return this.type;
  }

  private getInputClasses(hasIconStart: boolean, hasIconEnd: boolean): string {
    const classes: string[] = ['aegov-input'];

    const sizeClasses: Record<InputSize, string> = {
      sm: 'input--sm',
      base: 'input--base',
      lg: 'input--lg',
    };

    classes.push(sizeClasses[this.size]);

    if (this.hasActionButton) {
      classes.push('input--has-action');
    }

    if (hasIconStart) {
      classes.push('input--has-icon-start');
    }

    if (hasIconEnd) {
      classes.push('input--has-icon-end');
    }

    if (this.class) {
      classes.push(this.class);
    }

    return classes.join(' ');
  }

  private handleChange = (event: Event) => {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.aegovInputChange.emit({ value: this.value, event });
  };

  private handleInput = (event: Event) => {
    const input = event.target as HTMLInputElement;
    this.value = input.value;
    this.aegovInputInput.emit({ value: this.value, event });
  };

  private handleFocus = (event: FocusEvent) => {
    this.aegovInputFocus.emit(event);
  };

  private handleBlur = (event: FocusEvent) => {
    this.aegovInputBlur.emit(event);
  };

  private handleRevealToggle = () => {
    this.passwordVisible = !this.passwordVisible;
  };

  private handleCopy = async () => {
    if (!this.value) return;
    try {
      await navigator.clipboard.writeText(this.value);
      this.justCopied = true;
      setTimeout(() => {
        this.justCopied = false;
      }, 2000);
    } catch {
      // Fallback for environments without clipboard API
      const input = this.el.querySelector('input');
      if (input) {
        input.select();
        document.execCommand('copy');
        this.justCopied = true;
        setTimeout(() => {
          this.justCopied = false;
        }, 2000);
      }
    }
  };

  private renderRevealButton() {
    if (!this.isRevealable) return null;

    const sizeClasses: Record<InputSize, string> = {
      sm: 'revealable--sm',
      base: 'revealable--base',
      lg: 'revealable--lg',
    };

    return (
      <button
        type="button"
        class={`input__revealable ${sizeClasses[this.size]}`}
        onClick={this.handleRevealToggle}
        disabled={this.disabled}
        tabindex={-1}
        aria-label={this.passwordVisible ? 'Hide password' : 'Show password'}
      >
        {this.passwordVisible ? (
          // Eye-off icon
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
            <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
            <line x1="1" y1="1" x2="23" y2="23" />
            <path d="M14.12 14.12a3 3 0 1 1-4.24-4.24" />
          </svg>
        ) : (
          // Eye icon
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        )}
      </button>
    );
  }

  private renderCopyButton() {
    if (!this.isCopyable) return null;

    const sizeClasses: Record<InputSize, string> = {
      sm: 'copy-btn--sm',
      base: 'copy-btn--base',
      lg: 'copy-btn--lg',
    };

    return (
      <button
        type="button"
        class={`input__copy-btn ${sizeClasses[this.size]}${this.justCopied ? ' input__copy-btn--copied' : ''}`}
        onClick={this.handleCopy}
        tabindex={-1}
        aria-label={this.justCopied ? 'Copied' : 'Copy to clipboard'}
      >
        {this.justCopied ? (
          // Checkmark icon
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        ) : (
          // Copy icon
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
          </svg>
        )}
      </button>
    );
  }

  render() {
    const passThroughAttributes = this.getPassThroughAttributes();
    const hasIconStart = !!this.el.querySelector('[slot="icon-start"]');
    const hasIconEndContent = !!this.el.querySelector('[slot="icon-end"]');
    const hasIconEnd = hasIconEndContent && !this.hasActionButton;
    const needsWrapper = this.hasActionButton || hasIconStart || hasIconEnd || hasIconEndContent;

    const input = (
      <input
        id={this.fieldId}
        type={this.resolvedType}
        class={this.getInputClasses(hasIconStart, hasIconEnd)}
        disabled={this.disabled}
        readOnly={this.readonly}
        placeholder={this.placeholder}
        value={this.value}
        name={this.name}
        required={this.required}
        onChange={this.handleChange}
        onInput={this.handleInput}
        onFocus={this.handleFocus}
        onBlur={this.handleBlur}
        {...passThroughAttributes}
      />
    );

    if (needsWrapper) {
      return (
        <Host>
          <div class={`input__wrapper input__wrapper--${this.size}`}>
            {hasIconStart && (
              <span class="input__icon input__icon--start">
                <slot name="icon-start" />
              </span>
            )}
            {input}
            {hasIconEndContent && (
              <span class={`input__icon input__icon--end${!hasIconEnd ? ' input__icon--hidden' : ''}`}>
                <slot name="icon-end" />
              </span>
            )}
            {this.renderRevealButton()}
            {this.renderCopyButton()}
          </div>
        </Host>
      );
    }

    return (
      <Host>
        {input}
      </Host>
    );
  }
}
