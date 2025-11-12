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

  private actionsSlotRef?: HTMLSlotElement;

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
   * Handle the dismiss button click.
   */
  private handleDismiss = () => {
    this.isVisible = false;
    this.aegovCalloutDismiss.emit();
  };

  /**
   * Check if the actions slot has content
   */
  private checkActionsSlot = () => {
    if (this.actionsSlotRef) {
      const assignedNodes = this.actionsSlotRef.assignedNodes();
      this.hasActionsSlot = assignedNodes.length > 0;
    }
  };

  /**
   * Lifecycle method called after the component loads
   */
  componentDidLoad() {
    this.checkActionsSlot();
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
      'text-base',
      '[&_.callout-actions_button]:h-12',
      '[&_.callout-actions_button]:px-4'
    ];

    if(this.bordered) {
      classes.push(
        'border-2',
      );
    } else {
      classes.push(
        'border-0',
      );
    }

    if(this.appearance === 'solid') {
      if(this.variant === 'default') {
        classes.push(
          'bg-slate-800',
          'text-slate-50',
          'border-slate-800',
          '[&_.callout-icon_svg]:fill-slate-400',
          '[&_.callout-actions_button]:bg-slate-100',
          '[&_.callout-actions_button]:hover:bg-slate-200',
          '[&_.callout-actions_button]:text-slate-900'
        );
      } else if(this.variant === 'error') {
        classes.push(
          'bg-aered-700',
          'text-aered-50',
          'border-aered-700',
          '[&_.callout-icon_svg]:fill-aered-300',
          '[&_.callout-actions_button]:bg-aered-100',
          '[&_.callout-actions_button]:hover:bg-aered-200',
          '[&_.callout-actions_button]:text-aered-900'
        );
      } else if(this.variant === 'success') {
        classes.push(
          'bg-aegreen-700',
          'text-aegreen-50',
          'border-aegreen-700',
          '[&_.callout-icon_svg]:fill-aegreen-300',
          '[&_.callout-actions_button]:bg-aegreen-100',
          '[&_.callout-actions_button]:hover:bg-aegreen-200',
          '[&_.callout-actions_button]:text-aegreen-900'
        );
      } else if(this.variant === 'warning') {
        classes.push(
          'bg-camel-700',
          'text-camel-50',
          'border-camel-700',
          '[&_.callout-icon_svg]:fill-camel-300',
          '[&_.callout-actions_button]:bg-camel-100',
          '[&_.callout-actions_button]:hover:bg-camel-200',
          '[&_.callout-actions_button]:text-camel-900'
        );
      } else if(this.variant === 'info') {
        classes.push(
          'bg-techblue-700',
          'text-techblue-50',
          'border-techblue-700',
          '[&_.callout-icon_svg]:fill-techblue-300',
          '[&_.callout-actions_button]:bg-techblue-100',
          '[&_.callout-actions_button]:hover:bg-techblue-200',
          '[&_.callout-actions_button]:text-techblue-900'
        );
      }
    }
    else if(this.appearance === 'soft') {
      if(this.variant === 'default') {
        classes.push(
          'bg-slate-50',
          'text-slate-800',
          'border-slate-400',
          '[&_.callout-icon_svg]:fill-slate-600',
          '[&_.callout-actions_button]:bg-slate-800',
          '[&_.callout-actions_button]:hover:bg-slate-700',
          '[&_.callout-actions_button]:text-slate-50'
        );
      } else if(this.variant === 'error') {
        classes.push(
          'bg-aered-50',
          'text-aered-700',
          'border-aered-800',
          '[&_.callout-icon_svg]:fill-aered-700',
          '[&_.callout-actions_button]:bg-aered-700',
          '[&_.callout-actions_button]:hover:bg-aered-600',
          '[&_.callout-actions_button]:text-aered-50'
        );
      } else if(this.variant === 'success') {
        classes.push(
          'bg-aegreen-50',
          'text-aegreen-700',
          'border-aegreen-800',
          '[&_.callout-icon_svg]:fill-aegreen-700',
          '[&_.callout-actions_button]:bg-aegreen-700',
          '[&_.callout-actions_button]:hover:bg-aegreen-600',
          '[&_.callout-actions_button]:text-aegreen-50'
        );
      } else if(this.variant === 'warning') {
        classes.push(
          'bg-camel-50',
          'text-camel-700',
          'border-camel-800',
          '[&_.callout-icon_svg]:fill-camel-700',
          '[&_.callout-actions_button]:bg-camel-700',
          '[&_.callout-actions_button]:hover:bg-camel-600',
          '[&_.callout-actions_button]:text-camel-50'
        );
      } else if(this.variant === 'info') {
        classes.push(
          'bg-techblue-50',
          'text-techblue-700',
          'border-techblue-800',
          '[&_.callout-icon_svg]:fill-techblue-700',
          '[&_.callout-actions_button]:bg-techblue-700',
          '[&_.callout-actions_button]:hover:bg-techblue-600',
          '[&_.callout-actions_button]:text-techblue-50'
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
          <slot name="icon" />
        </div>
        <div class="grow text-base leading-normal">
          <slot name="content" />
          {this.hasActionsSlot && (
            <div class="callout-actions mt-8">
              <slot
                name="actions"
                ref={(el) => (this.actionsSlotRef = el as HTMLSlotElement)}
                onSlotchange={this.checkActionsSlot}
              />
            </div>
          )}
          {!this.hasActionsSlot && (
            <slot
              name="actions"
              ref={(el) => (this.actionsSlotRef = el as HTMLSlotElement)}
              onSlotchange={this.checkActionsSlot}
            />
          )}
        </div>
        <div class="shrink-0 flex items-center justify-end gap-2 callout-right [&_a]:text-sm [&_a]:font-medium [&_a]:hover:underline">
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
