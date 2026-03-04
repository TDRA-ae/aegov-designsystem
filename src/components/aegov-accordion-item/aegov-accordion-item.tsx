import { Component, Host, h, Prop, Element, Event, EventEmitter, Watch, State } from '@stencil/core';
import { AccordionIcon } from '../../utils/types';

/**
 * Accordion item component
 *
 * **⚠️ IMPORTANT:** This component must be used inside `<aegov-accordion>` component.
 * Do not use this component standalone.
 *
 * @internal This component is designed to work only as a child of aegov-accordion
 * @slot accordion-item-heading - Heading content for the accordion item
 * @slot accordion-item-content - Content that expands/collapses
 */
@Component({
  tag: 'aegov-accordion-item',
  styleUrl: 'aegov-accordion-item.css',
  scoped: false,
})
export class AegovAccordionItem {
  @Element() el: HTMLElement;

  @State() contentHeight: number = 0;
  @State() hasHeadingSlot: boolean = false;

  private contentEl?: HTMLElement;
  private resizeObserver?: ResizeObserver;

  /**
   * Heading text for the accordion item (alternative to using the slot)
   * Note: If both heading property and slot are provided, the slot takes precedence
   */
  @Prop() heading?: string;

  /**
   * Whether the accordion item is open
   * @internal - Set automatically by parent component
   */
  @Prop({ mutable: true }) open: boolean = false;

  /**
   * Whether the accordion item is disabled
   */
  @Prop() disabled: boolean = false;

  /**
   * Icon style for the accordion item
   * @internal - Set automatically by parent component
   */
  @Prop({ mutable: true }) icon: AccordionIcon = 'chevron';

  /**
   * Whether this is the first accordion item
   * @internal - Set automatically by parent component
   */
  @Prop({ mutable: true }) isFirst: boolean = false;

  /**
   * Whether this is the last accordion item
   * @internal - Set automatically by parent component
   */
  @Prop({ mutable: true }) isLast: boolean = false;

  /**
   * Emitted when the accordion item is toggled
   */
  @Event() aegovAccordionItemToggle: EventEmitter<{ open: boolean }>;

  componentWillLoad() {
    // Validate that this component is inside aegov-accordion
    const parentAccordion = this.el.closest('aegov-accordion');
    if (!parentAccordion) {
      throw new Error(
        '[aegov-accordion-item] This component must be used inside <aegov-accordion>. ' +
        'It cannot be used as a standalone component. ' +
        'Please wrap it with <aegov-accordion>...</aegov-accordion>'
      );
    }

    // Check if heading slot has content
    const headingSlot = this.el.querySelector('[slot="accordion-item-heading"]');
    this.hasHeadingSlot = headingSlot !== null && headingSlot.textContent?.trim().length > 0;
  }

  componentDidLoad() {
    this.updateContentHeight();

    // Set up ResizeObserver to watch for content size changes (handles nested accordions)
    if (this.contentEl && typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(() => {
        // Only update if the accordion is open
        if (this.open) {
          this.updateContentHeight();
        }
      });
      this.resizeObserver.observe(this.contentEl);
    }
  }

  disconnectedCallback() {
    // Clean up ResizeObserver
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  @Watch('open')
  handleOpenChange() {
    this.updateContentHeight();
  }

  private updateContentHeight() {
    if (this.contentEl) {
      if (this.open) {
        this.contentHeight = this.contentEl.scrollHeight;
      } else {
        this.contentHeight = 0;
      }
    }
  }

  private handleToggle = () => {
    if (this.disabled) {
      return;
    }

    this.aegovAccordionItemToggle.emit({ open: !this.open });
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.handleToggle();
    }
  };

  render() {
    const classes = [
      'aegov-accordion-item',
      this.open && 'accordion-item--open',
      this.disabled && 'accordion-item--disabled',
      this.isFirst && 'accordion-item__first',
      this.isLast && 'accordion-item__last'
    ].filter(Boolean).join(' ');

    return (
      <Host>
        <div class={classes}>
          <button
            class="group accordion-item__header"
            onClick={this.handleToggle}
            onKeyDown={this.handleKeyDown}
            disabled={this.disabled}
            aria-expanded={this.open.toString()}
            type="button"
          >
            <div class="accordion-item__heading">
              {this.hasHeadingSlot ? (
                <slot name="accordion-item-heading" />
              ) : (
                this.heading
              )}
            </div>
            {this.icon === 'chevron' ? (
              <svg class="accordion-item__icon accordion-item__icon-chevron" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256" aria-hidden="true">
                <rect width="256" height="256" fill="none"/>
                <polyline points="208 96 128 176 48 96" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/>
              </svg>
            ) : (
              <svg class="accordion-item__icon accordion-item__icon-plus" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><line x1="40" y1="128" x2="216" y2="128" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/><line x1="128" y1="40" x2="128" y2="216" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"/></svg>
            )}
          </button>
          <div
            class="accordion-item__content-wrapper"
            style={{ height: `${this.contentHeight}px` }}
          >
            <div
              class="accordion-item__content"
              ref={(el) => this.contentEl = el}
            >
              <slot />
            </div>
          </div>
        </div>
      </Host>
    );
  }
}
