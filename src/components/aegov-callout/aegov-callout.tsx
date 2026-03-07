import { Component, Prop, Event, EventEmitter, State, h, Element } from '@stencil/core';
import type { CalloutVariant, CalloutAppearance } from '../../utils/types';
import { getPassThroughAttributes } from '../../utils/attributes';
import { getVariantIcon } from '../../utils/icons';

/**
 * @slot default - The main content of the callout
 */
@Component({
  tag: 'aegov-callout',
  styleUrl: 'aegov-callout.css',
  scoped: false,
  shadow:false
})
export class AegovCallout {
  @Element() el: HTMLElement;

  /**
   * The variant of the callout. Determines the color scheme.
   */
  @Prop() variant: CalloutVariant = 'default';

  /**
   * The appearance style of the callout.
   */
  @Prop() appearance: CalloutAppearance = 'soft';

  /**
   * Whether the callout can be dismissed/closed.
   */
  @Prop() dismissible: boolean = false;

  /**
   * Whether the callout should have a border
   * @default false
   */
  @Prop() bordered: boolean = false;

  /**
   * Event emitted when the callout is dismissed.
   */
  @Event() aegovCalloutDismiss: EventEmitter<void>;

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
   * Get the default icon based on variant
   */

  /**
   * Lifecycle method called before each render
   */
  componentWillRender() {
    this.checkActionsSlot();
    this.checkIconSlot();
  }

  private static readonly PASS_THROUGH_ATTRS = new Set(['id']);

  /**
   * Get the CSS classes based on component props
   */
  private getCalloutClasses(): string {
    const classes: string[] = [
      'aegov-callout'
    ];

    if(this.bordered) {
      classes.push(
        'border-1',
      );
    } else {
      classes.push(
        'border-0',
      );
    }

    // Appearance classes
    const appearanceClasses: Record<CalloutAppearance, string[]> = {
        soft: ['callout--soft'],
        solid: ['callout--solid']
    };
    classes.push(...appearanceClasses[this.appearance]);

    // Variant classes
    const variantClasses: Record<CalloutVariant, string[]> = {
        default: ['callout--default'],
        error: ['callout--error'],
        success: ['callout--success'],
        warning: ['callout--warning'],
        info: ['callout--info']
    };
    classes.push(...variantClasses[this.variant]);

    return classes.join(' ');
  }

  render() {
    if (!this.isVisible) {
      return null;
    }

    const passThroughAttributes = getPassThroughAttributes(this.el, AegovCallout.PASS_THROUGH_ATTRS);

    return (
      <div data-aegov-callout class={this.getCalloutClasses()} role="alert" {...passThroughAttributes}>
        <div class="callout__icon">
          {this.hasIconSlot ? (
            <slot name="icon" />
          ) : (
            getVariantIcon(this.variant, 'size-6')
          )}
        </div>
        <div class="callout__content">
          <slot name="content" />
          {this.hasActionsSlot && (
            <div class="callout__actions">
              <slot name="actions" />
            </div>
          )}
        </div>
        <div class="callout__right">
          <slot name="link" />
        {this.dismissible && (
          <button
            type="button"
            onClick={this.handleDismiss}
            aria-label="Close callout"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="size-4" width="20" height="20" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
            </svg>
          </button>
        )}
        </div>
      </div>
    );
  }
}
