import { Component, Prop, Event, EventEmitter, State, h, Element } from '@stencil/core';
import type { CalloutVariant, CalloutAppearance } from '../../utils/types';

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
  private getDefaultIcon() {
    const iconClass = "size-6";

    switch (this.variant) {
      case 'error':
        return (
          <svg class={iconClass} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm-8,56a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm8,104a12,12,0,1,1,12-12A12,12,0,0,1,128,184Z"/></svg>
        );
      case 'warning':
        return (
          <svg class={iconClass} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><path d="M236.8,188.09,149.35,36.22h0a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM120,104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm8,88a12,12,0,1,1,12-12A12,12,0,0,1,128,192Z"/></svg>
        );
      case 'success':
        return (
          <svg class={iconClass} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z"/></svg>
        );
      case 'info':
        return (
          <svg class={iconClass} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm-4,48a12,12,0,1,1-12,12A12,12,0,0,1,124,72Zm12,112a16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40a8,8,0,0,1,0,16Z"/></svg>
        );
      default: // 'default'
        return (
          <svg class={iconClass} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><circle cx="124" cy="84" r="16"/><circle cx="128" cy="128" r="96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><path d="M120,124a8,8,0,0,1,8,8v36a8,8,0,0,0,8,8" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
        );
    }
  }

  /**
   * Lifecycle method called before each render
   */
  componentWillRender() {
    this.checkActionsSlot();
    this.checkIconSlot();
  }

  /**
   * Get aria-*, data-*, and id attributes from the host element to pass through to the callout wrapper
   */
  private getPassThroughAttributes(): { [key: string]: string } {
    const passThroughAttrs: { [key: string]: string } = {};

    // Get all attributes from the host element
    Array.from(this.el.attributes).forEach(attr => {
      // Pass through aria-*, data-*, and id attributes
      if (attr.name.startsWith('aria-') || attr.name.startsWith('data-') || attr.name === 'id') {
        passThroughAttrs[attr.name] = attr.value;
      }
    });

    return passThroughAttrs;
  }

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

    const passThroughAttributes = this.getPassThroughAttributes();

    return (
      <div data-aegov-callout class={this.getCalloutClasses()} role="alert" {...passThroughAttributes}>
        <div class="callout__icon">
          {this.hasIconSlot ? (
            <slot name="icon" />
          ) : (
            this.getDefaultIcon()
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
            aria-label="Close this callout"
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
