import { Component, Prop, Event, EventEmitter, State, h, Element } from '@stencil/core';
import type { CalloutVariant, CalloutAppearance } from '../../utils/types';

/**
 * @slot default - The main content of the callout
 */
@Component({
  tag: 'aegov-callout',
  styleUrl: 'aegov-callout.css',
  scoped: true,
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
          <svg class={iconClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
            <rect width="256" height="256" fill="none"/>
            <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm-8,56a8,8,0,0,1,16,0v56a8,8,0,0,1-16,0Zm8,104a12,12,0,1,1,12-12A12,12,0,0,1,128,184Z"/>
          </svg>
        );
      case 'warning':
        return (
          <svg class={iconClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
            <rect width="256" height="256" fill="none"/>
            <path d="M236.8,188.09,149.35,36.22h0a24.76,24.76,0,0,0-42.7,0L19.2,188.09a23.51,23.51,0,0,0,0,23.72A24.35,24.35,0,0,0,40.55,224h174.9a24.35,24.35,0,0,0,21.33-12.19A23.51,23.51,0,0,0,236.8,188.09ZM120,104a8,8,0,0,1,16,0v40a8,8,0,0,1-16,0Zm8,88a12,12,0,1,1,12-12A12,12,0,0,1,128,192Z"/>
          </svg>
        );
      case 'success':
        return (
          <svg class={iconClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
            <rect width="256" height="256" fill="none"/>
            <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm45.66,85.66-56,56a8,8,0,0,1-11.32,0l-24-24a8,8,0,0,1,11.32-11.32L112,148.69l50.34-50.35a8,8,0,0,1,11.32,11.32Z"/>
          </svg>
        );
      case 'info':
        return (
          <svg class={iconClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
            <rect width="256" height="256" fill="none"/>
            <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm-4,48a12,12,0,1,1-12,12A12,12,0,0,1,124,72Zm12,112a16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40a8,8,0,0,1,0,16Z"/>
          </svg>
        );
      default: // 'default'
        return (
          <svg class={iconClass} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
            <rect width="256" height="256" fill="none"/>
            <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm-4,48a12,12,0,1,1-12,12A12,12,0,0,1,124,72Zm12,112a16,16,0,0,1-16-16V128a8,8,0,0,1,0-16,16,16,0,0,1,16,16v40a8,8,0,0,1,0,16Z"/>
          </svg>
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
   * Get the CSS classes based on component props
   */
  private getCalloutClasses(): string {
    const classes: string[] = [
      'aegov-callout',
      '@container',
      'px-5',
      'py-4',
      'flex',
      'items-start',
      'gap-4',
      'rounded-md',
      'text-base'
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

    // Add button styles only if actions slot has content
    if(this.hasActionsSlot) {
      classes.push(
        '[&_.callout-actions_button]:h-10',
        '[&_.callout-actions_button]:px-4',
        '[&_.callout-actions_button]:border-2',
        '[&_.callout-actions_button]:font-bold',
        '[&_.callout-actions_button]:rounded-md',
        '[&_.callout-actions_button]:hover:opacity-90',
        '[&_.callout-actions_button]:focus-visible:outline-offset-2',
        '[&_.callout-actions_button]:focus-visible:outline-2',
        '[&_.callout-actions_button]:focus-visible:outline-dashed'
      );
      if(this.appearance === 'soft') {
        if(this.variant === 'default') {
          classes.push(
            '[&_.callout-actions_button]:focus-visible:outline-seablue-600',
            '[&_.callout-actions_button.btn-solid]:border-slate-700',
            '[&_.callout-actions_button.btn-solid]:bg-slate-700',
            '[&_.callout-actions_button.btn-solid]:text-slate-50'
          );
        }
        if(this.variant === 'error') {
          classes.push(
            '[&_.callout-actions_button]:focus-visible:outline-seablue-600',
            '[&_.callout-actions_button.btn-solid]:border-aered-700',
            '[&_.callout-actions_button.btn-solid]:bg-aered-700',
            '[&_.callout-actions_button.btn-solid]:text-aered-50'
          );
        }
        if(this.variant === 'success') {
          classes.push(
            '[&_.callout-actions_button]:focus-visible:outline-camel-600',
            '[&_.callout-actions_button.btn-solid]:border-aegreen-700',
            '[&_.callout-actions_button.btn-solid]:bg-aegreen-700',
            '[&_.callout-actions_button.btn-solid]:text-aegreen-50'
          );
        }
        if(this.variant === 'warning') {
          classes.push(
            '[&_.callout-actions_button]:focus-visible:outline-aered-600',
            '[&_.callout-actions_button.btn-solid]:border-camel-700',
            '[&_.callout-actions_button.btn-solid]:bg-camel-700',
            '[&_.callout-actions_button.btn-solid]:text-camel-50'
          );
        }
        if(this.variant === 'info') {
          classes.push(
            '[&_.callout-actions_button]:focus-visible:outline-slate-700',
            '[&_.callout-actions_button.btn-solid]:border-techblue-700',
            '[&_.callout-actions_button.btn-solid]:bg-techblue-700',
            '[&_.callout-actions_button.btn-solid]:text-techblue-50'
          );
        }
      }
      if(this.appearance === 'solid') {
        if(this.variant === 'default') {
          classes.push(
            '[&_.callout-actions_button]:focus-visible:outline-slate-50',
            '[&_.callout-actions_button.btn-solid]:border-slate-100',
            '[&_.callout-actions_button.btn-solid]:bg-slate-100',
            '[&_.callout-actions_button.btn-solid]:text-slate-900'
          );
        }
        if(this.variant === 'error') {
          classes.push(
            '[&_.callout-actions_button]:focus-visible:outline-aered-50',
            '[&_.callout-actions_button.btn-solid]:border-aered-100',
            '[&_.callout-actions_button.btn-solid]:bg-aered-100',
            '[&_.callout-actions_button.btn-solid]:text-aered-900'
          );
        }
        if(this.variant === 'success') {
          classes.push(
            '[&_.callout-actions_button]:focus-visible:outline-aegreen-50',
            '[&_.callout-actions_button.btn-solid]:border-aegreen-100',
            '[&_.callout-actions_button.btn-solid]:bg-aegreen-100',
            '[&_.callout-actions_button.btn-solid]:text-aegreen-900'
          );
        }
        if(this.variant === 'warning') {
          classes.push(
            '[&_.callout-actions_button]:focus-visible:outline-camel-50',
            '[&_.callout-actions_button.btn-solid]:border-camel-100',
            '[&_.callout-actions_button.btn-solid]:bg-camel-100',
            '[&_.callout-actions_button.btn-solid]:text-camel-900'
          );
        }
        if(this.variant === 'info') {
          classes.push(
            '[&_.callout-actions_button]:focus-visible:outline-techblue-50',
            '[&_.callout-actions_button.btn-solid]:border-techblue-100',
            '[&_.callout-actions_button.btn-solid]:bg-techblue-100',
            '[&_.callout-actions_button.btn-solid]:text-techblue-900'
          );
        }
      }
    }

    if(this.appearance === 'solid') {
      if(this.variant === 'default') {
        classes.push(
          'bg-slate-800',
          'text-slate-50',
          'border-slate-800',
          '[&_.callout-icon_svg]:fill-slate-400'
        );
      } else if(this.variant === 'error') {
        classes.push(
          'bg-aered-700',
          'text-aered-50',
          'border-aered-700',
          '[&_.callout-icon_svg]:fill-aered-300'
        );
      } else if(this.variant === 'success') {
        classes.push(
          'bg-aegreen-700',
          'text-aegreen-50',
          'border-aegreen-700',
          '[&_.callout-icon_svg]:fill-aegreen-300'
        );
      } else if(this.variant === 'warning') {
        classes.push(
          'bg-camel-700',
          'text-camel-50',
          'border-camel-700',
          '[&_.callout-icon_svg]:fill-camel-300'
        );
      } else if(this.variant === 'info') {
        classes.push(
          'bg-techblue-700',
          'text-techblue-50',
          'border-techblue-700',
          '[&_.callout-icon_svg]:fill-techblue-300'
        );
      }
    }
    else if(this.appearance === 'soft') {
      if(this.variant === 'default') {
        classes.push(
          'bg-slate-50',
          'text-slate-800',
          'border-slate-400',
          '[&_.callout-icon_svg]:fill-slate-600'
        );
      } else if(this.variant === 'error') {
        classes.push(
          'bg-aered-50',
          'text-aered-700',
          'border-aered-800',
          '[&_.callout-icon_svg]:fill-aered-700'
        );
      } else if(this.variant === 'success') {
        classes.push(
          'bg-aegreen-50',
          'text-aegreen-700',
          'border-aegreen-800',
          '[&_.callout-icon_svg]:fill-aegreen-700'
        );
      } else if(this.variant === 'warning') {
        classes.push(
          'bg-camel-50',
          'text-camel-700',
          'border-camel-800',
          '[&_.callout-icon_svg]:fill-camel-700'
        );
      } else if(this.variant === 'info') {
        classes.push(
          'bg-techblue-50',
          'text-techblue-700',
          'border-techblue-800',
          '[&_.callout-icon_svg]:fill-techblue-700'
        );
      }
    }

    return classes.join(' ');
  }

  render() {
    if (!this.isVisible) {
      return null;
    }

    return (
      <div data-aegov-callout class={this.getCalloutClasses()} role="alert">
        <div class="shrink-0 callout-icon flex items-start min-w-fit">
          {this.hasIconSlot ? (
            <slot name="icon" />
          ) : (
            this.getDefaultIcon()
          )}
        </div>
        <div class="grow text-base leading-normal callout-content">
          <slot name="content" />
          {this.hasActionsSlot ? (
            <div class="callout-actions mt-8">
              <slot name="actions" />
            </div>
          ) : (
            <slot name="actions" />
          )}
        </div>
        <div class="shrink-0 flex items-center justify-end gap-2 callout-right">
          <slot name="link" />
        {this.dismissible && (
          <button
            type="button"
            class="w-auto h-auto border-0 p-1 cursor-pointer"
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
