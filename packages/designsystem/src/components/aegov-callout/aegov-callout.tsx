import { Component, Prop, Watch, Event, EventEmitter, State, h, Element } from '@stencil/core';
import { CALLOUT_VARIANTS, CALLOUT_APPEARANCES, CALLOUT_SIZES } from '../../utils/types';
import type { CalloutVariant, CalloutAppearance, CalloutSize } from '../../utils/types';
import { getPassThroughAttributes } from '../../utils/attributes';
import { getVariantIcon } from '../../utils/icons';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { watchResponsiveProp } from '../../utils/responsive-prop';
import type { ResponsivePropWatcher } from '../../utils/responsive-prop';
import { generateId } from '../../utils/id-generator';
import { isRtl } from '../../utils/rtl';

const STRINGS = {
  en: { close: 'Close callout' },
  ar: { close: 'إغلاق الإشعار' },
};

const TAG = 'aegov-callout';
const ctx = (prop: string) => ({ component: TAG, prop });

/**
 * @slot default - The main content of the callout
 * @slot icon - Custom icon replacing the default variant icon. Use an SVG or aegov-icon element.
 * @slot link - A single aegov-link (or anchor) on the trailing side, before the dismiss button. Mutually exclusive with the actions slot.
 * @slot actions - A group of buttons or links rendered below the content. Mutually exclusive with the link slot.
 */
@Component({
  tag: 'aegov-callout',
  styleUrl: 'aegov-callout.css',
  scoped: false,
  shadow:false
})
export class AegovCallout {
  @Element() el!: HTMLElement;

  /**
   * Unique ID for the callout element. Auto-generated if not provided.
   */
  @Prop({ mutable: true, reflect: true }) fieldId?: string;

  /**
   * The variant of the callout. Determines the color scheme.
   */
  @Prop() variant: CalloutVariant = 'default';

  /**
   * The appearance style of the callout.
   */
  @Prop() appearance: CalloutAppearance = 'soft';

  /**
   * The size of the callout. Controls font size, icon size, and padding.
   * Accepts a plain value (`"sm"`, `"base"`, `"lg"`) or a responsive string
   * using Tailwind-style breakpoint prefixes (`"sm xl:lg"`).
   */
  @Prop() size: string = 'base';

  @State() private _resolvedSize: CalloutSize = 'base';
  private _sizeWatcher: ResponsivePropWatcher | null = null;

  /**
   * Whether the callout can be dismissed/closed.
   */
  @Prop() isDismissible: boolean = false;

  /**
   * Event emitted when the callout is dismissed.
   */
  @Event() aegovCalloutDismiss!: EventEmitter<void>;

  /**
   * Internal state to track visibility of the callout.
   */
  @State() isVisible: boolean = true;

  /**
   * Internal state to track if the actions slot has content.
   */
  @State() hasActionsSlot: boolean = false;

  /**
   * Internal state to track if the icon slot has content.
   */
  @State() hasIconSlot: boolean = false;

  /**
   * Internal state to track if the link slot has content.
   */
  @State() hasLinkSlot: boolean = false;

  /**
   * Holds a usage-error description (mutually-exclusive slots, unsupported
   * children in `actions`). When set, render is replaced by a visible error
   * block. Computed each render — not @State to avoid an extra re-render.
   */
  private validationError: { message: string; offendingTag?: string } | null = null;

  /**
   * Handle the dismiss button click.
   */
  private handleDismiss = () => {
    this.isVisible = false;
    this.aegovCalloutDismiss.emit();
  };

  /**
   * Check if the actions slot has content
   * Note: Using scoped CSS, not Shadow DOM, so we check for elements with slot="actions"
   */
  private checkActionsSlot = () => {
    // For scoped components, check if there are children with slot="actions" attribute
    const actionsElements = this.el.querySelectorAll('[slot="actions"]');
    this.hasActionsSlot = actionsElements.length > 0;
  };

  /**
   * Check if the icon slot has content
   */
  private checkIconSlot = () => {
    const iconElements = this.el.querySelectorAll('[slot="icon"]');
    this.hasIconSlot = iconElements.length > 0;
  };
  
  /**
   * Check if the link slot has content
   */
  private checkLinkSlot = () => {
    const linkElements = this.el.querySelectorAll('[slot="link"]');
    this.hasLinkSlot = linkElements.length > 0;
  };

  /**
   * Get the default icon based on variant
   */

  componentWillLoad() {
    if (!this.fieldId) {
      this.fieldId = generateId('aegov-callout');
    }
    warnIfInvalidEnumProp(this.variant, CALLOUT_VARIANTS, 'default', ctx('variant'));
    warnIfInvalidEnumProp(this.appearance, CALLOUT_APPEARANCES, 'soft', ctx('appearance'));
    this._sizeWatcher = watchResponsiveProp(this.size, CALLOUT_SIZES, 'base', v => {
      this._resolvedSize = v as CalloutSize;
    });
    this._resolvedSize = this._sizeWatcher.current as CalloutSize;
  }

  disconnectedCallback() {
    this._sizeWatcher?.destroy();
  }

  @Watch('variant')
  onVariantChange(v: unknown) { warnIfInvalidEnumProp(v, CALLOUT_VARIANTS, 'default', ctx('variant')); }

  @Watch('appearance')
  onAppearanceChange(v: unknown) { warnIfInvalidEnumProp(v, CALLOUT_APPEARANCES, 'soft', ctx('appearance')); }

  @Watch('size')
  onSizeChange() {
    this._sizeWatcher?.destroy();
    this._sizeWatcher = watchResponsiveProp(this.size, CALLOUT_SIZES, 'base', v => {
      this._resolvedSize = v as CalloutSize;
    });
    this._resolvedSize = this._sizeWatcher.current as CalloutSize;
  }

  private static readonly ACTIONS_ALLOWED_TAGS = new Set(['AEGOV-BUTTON', 'AEGOV-LINK']);

  /**
   * Validate slot usage. Returns a structured error or null.
   * Rules:
   *  1. `link` and `actions` slots are mutually exclusive.
   *  2. Children of the slotted `actions` wrapper must be <aegov-button> or <aegov-link>.
   */
  private validateSlots(): { message: string; offendingTag?: string } | null {
    if (this.hasLinkSlot && this.hasActionsSlot) {
      return {
        message: 'Callout cannot have both a link slot and an actions slot. Provide one or the other.',
      };
    }
    if (this.hasActionsSlot) {
      const wrapper = this.el.querySelector('[slot="actions"]');
      if (wrapper) {
        const bad = Array.from(wrapper.children).find(
          c => !AegovCallout.ACTIONS_ALLOWED_TAGS.has(c.tagName)
        );
        if (bad) {
          return {
            message: 'Children of the actions slot wrapper must be <aegov-button> or <aegov-link>.',
            offendingTag: bad.tagName.toLowerCase(),
          };
        }
      }
    }
    return null;
  }

  /**
   * Lifecycle method called before each render
   */
  componentWillRender() {
    this.checkActionsSlot();
    this.checkIconSlot();
    this.checkLinkSlot();
    this.validationError = this.validateSlots();
  }

  private static readonly PASS_THROUGH_ATTRS = new Set<string>();

  /**
   * Get the CSS classes based on component props
   */
  private getCalloutClasses(): string {
    const classes: string[] = [
      'aegov-callout relative block rounded-sm border-0'
    ];

    const appearance: CalloutAppearance = (CALLOUT_APPEARANCES as readonly string[]).includes(this.appearance) ? this.appearance : 'soft';
    const variant: CalloutVariant = (CALLOUT_VARIANTS as readonly string[]).includes(this.variant) ? this.variant : 'default';
    const size: CalloutSize = this._resolvedSize;

    // Size classes (font size + padding)
    const sizeClasses: Record<CalloutSize, string[]> = {
      sm:   ['callout-sm',   'text-sm',   'px-4', 'py-3'],
      base: ['callout-base', 'text-base', 'px-5', 'py-4'],
      lg:   ['callout-lg',   'text-lg',   'px-6', 'py-5'],
    };
    classes.push(...sizeClasses[size]);

    // Appearance classes
    const appearanceClasses: Record<CalloutAppearance, string[]> = {
        soft: ['callout-soft'],
        solid: ['callout-solid']
    };
    classes.push(...appearanceClasses[appearance]);

    // Variant classes
    const variantClasses: Record<CalloutVariant, string[]> = {
        default: ['callout-default'],
        error: ['callout-error'],
        success: ['callout-success'],
        warning: ['callout-warning'],
        info: ['callout-info']
    };
    classes.push(...variantClasses[variant]);

    return classes.join(' ');
  }

  private getIconSizeClass(): string {
    const size: CalloutSize = this._resolvedSize;
    const iconSizes: Record<CalloutSize, string> = { sm: 'size-5', base: 'size-6', lg: 'size-7' };
    return iconSizes[size];
  }

  render() {
    if (!this.isVisible) {
      return null;
    }

    if (this.validationError) {
      const { message, offendingTag } = this.validationError;
      return (
        <div class="aegov-callout aegov-callout--error" role="alert" id={this.fieldId}>
          <p>
            <strong>aegov-callout configuration error:</strong> {message}
            {offendingTag && <span> Found <code>&lt;{offendingTag}&gt;</code>.</span>}
          </p>
        </div>
      );
    }

    const passThroughAttributes = getPassThroughAttributes(this.el, AegovCallout.PASS_THROUGH_ATTRS);
    const liveRole = (this.variant === 'error' || this.variant === 'warning') ? 'alert' : 'status';

    return (
      <div
        data-aegov-callout
        data-dismissible={this.isDismissible ? 'true' : null}
        class={this.getCalloutClasses()}
        role={liveRole}
        id={this.fieldId}
        {...passThroughAttributes}
      >
        <div class="callout__main">
          <div class="callout__icon">
            {this.hasIconSlot ? (
              <slot name="icon" />
            ) : (
              getVariantIcon(this.variant, this.getIconSizeClass())
            )}
          </div>
          <div>
            <div class="callout__content">
              <slot />
            </div>
            {this.hasLinkSlot && (
            <div class="callout__right">
              <slot name="link" />
            </div>
            )}
            {this.hasActionsSlot && (
              <div class="callout__actions">
                <slot name="actions" />
              </div>
            )}
          </div>
        </div>
        {this.isDismissible && (
          <button
            type="button"
            class="callout__dismiss"
            onClick={this.handleDismiss}
            aria-label={isRtl(this.el) ? STRINGS.ar.close : STRINGS.en.close}
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="size-4" width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        )}
      </div>
    );
  }
}
