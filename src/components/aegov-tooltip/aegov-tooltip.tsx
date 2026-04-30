import { Component, Host, h, Prop, Element, State, Listen, Watch } from '@stencil/core';
import { TOOLTIP_POSITIONS, TOOLTIP_ALIGNS, TOOLTIP_TRIGGERS } from '../../utils/types';
import type { TooltipPosition, TooltipAlign, TooltipTrigger } from '../../utils/types';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';

const TAG = 'aegov-tooltip';
const ctx = (prop: string) => ({ component: TAG, prop });

/**
 * Tooltip component that displays additional information on hover or click
 *
 * @slot - Trigger element (button, link, etc.)
 * @slot tooltip-content - Tooltip content (alternative to using content prop)
 */
@Component({
  tag: 'aegov-tooltip',
  styleUrl: 'aegov-tooltip.css',
  scoped: false,
})
export class AegovTooltip {
  @Element() el: HTMLElement;

  @State() isVisible: boolean = false;
  @State() hasContentSlot: boolean = false;

  private tooltipRef?: HTMLDivElement;
  private triggerRef?: HTMLDivElement;
  private hideTimeout?: number;
  private positionUpdateScheduled: boolean = false;
  private positionRetryCount: number = 0;
  private readonly MAX_POSITION_RETRIES = 10;
  private tooltipId: string;

  /**
   * Tooltip content text (alternative to using slot)
   */
  @Prop() content?: string;

  /**
   * Position of the tooltip relative to the trigger element
   * @default 'top'
   */
  @Prop() position: TooltipPosition = 'top';

  /**
   * Alignment of the tooltip
   * @default 'center'
   */
  @Prop() align: TooltipAlign = 'center';

  /**
   * Trigger type for showing the tooltip
   * @default 'hover'
   */
  @Prop() trigger: TooltipTrigger = 'hover';

  /**
   * Gap between tooltip and trigger element (in pixels)
   * @default 8
   */
  @Prop() gap: number = 8;

  /**
   * Additional offset for tooltip positioning (in pixels)
   * @default 0
   */
  @Prop() offset: number = 0;

  /**
   * Whether the tooltip is disabled
   * @default false
   */
  @Prop() disabled: boolean = false;

  /**
   * Whether the tooltip contains interactive content
   * This adds ARIA attributes and prevents auto-hide on hover
   * @default false
   */
  @Prop() interactive: boolean = false;

  /**
   * Delay before showing tooltip (in milliseconds)
   * @default 200
   */
  @Prop() showDelay: number = 200;

  /**
   * Delay before hiding tooltip (in milliseconds)
   * @default 0
   */
  @Prop() hideDelay: number = 0;

  private showTooltipTimeout?: number;

  componentWillLoad() {
    warnIfInvalidEnumProp(this.position, TOOLTIP_POSITIONS, 'top', ctx('position'));
    warnIfInvalidEnumProp(this.align, TOOLTIP_ALIGNS, 'center', ctx('align'));
    warnIfInvalidEnumProp(this.trigger, TOOLTIP_TRIGGERS, 'hover', ctx('trigger'));
    // Generate stable tooltip ID once
    this.tooltipId = `aegov-tooltip-${Math.random().toString(36).substr(2, 9)}`;

    // Check if tooltip-content slot has content
    this.checkSlotContent();
  }

  @Watch('position')
  onPositionChange(v: unknown) { warnIfInvalidEnumProp(v, TOOLTIP_POSITIONS, 'top', ctx('position')); }

  @Watch('align')
  onAlignChange(v: unknown) { warnIfInvalidEnumProp(v, TOOLTIP_ALIGNS, 'center', ctx('align')); }

  @Watch('trigger')
  onTriggerChange(v: unknown) { warnIfInvalidEnumProp(v, TOOLTIP_TRIGGERS, 'hover', ctx('trigger')); }

  private checkSlotContent() {
    const contentSlot = this.el.querySelector('[slot="tooltip-content"]');
    const hasSlot = contentSlot !== null && contentSlot.textContent?.trim().length > 0;
    this.hasContentSlot = hasSlot;
  }

  @Watch('isVisible')
  handleVisibilityChange(newValue: boolean) {
    if (newValue) {
      // Reset retry count when showing tooltip
      this.positionRetryCount = 0;
      // Schedule position update after tooltip is rendered
      this.schedulePositionUpdate();
    } else {
      // Clear tooltip ref when hiding to prevent stale references
      this.tooltipRef = undefined;
      // Reset scheduled flag
      this.positionUpdateScheduled = false;
      this.positionRetryCount = 0;
    }
  }

  disconnectedCallback() {
    this.clearTimeouts();
  }

  private clearTimeouts() {
    if (this.showTooltipTimeout) {
      window.clearTimeout(this.showTooltipTimeout);
    }
    if (this.hideTimeout) {
      window.clearTimeout(this.hideTimeout);
    }
  }

  @Listen('scroll', { target: 'window', passive: true })
  @Listen('resize', { target: 'window', passive: true })
  handleWindowEvents() {
    if (this.isVisible) {
      this.schedulePositionUpdate();
    }
  }

  private schedulePositionUpdate() {
    if (this.positionUpdateScheduled) return;

    // Only schedule if tooltip is actually visible
    if (!this.isVisible) return;

    this.positionUpdateScheduled = true;
    // Use double RAF to ensure tooltip is fully rendered and measured
    requestAnimationFrame(() => {
      // Check again if tooltip is still visible before second RAF
      if (!this.isVisible) {
        this.positionUpdateScheduled = false;
        return;
      }

      requestAnimationFrame(() => {
        // Final check before updating position
        if (this.isVisible && this.tooltipRef) {
          this.updateTooltipPosition();
        }
        this.positionUpdateScheduled = false;
      });
    });
  }

  private isRtl(): boolean {
    return getComputedStyle(this.el).direction === 'rtl';
  }

  private updateTooltipPosition() {
    if (!this.tooltipRef || !this.triggerRef) return;

    const triggerRect = this.triggerRef.getBoundingClientRect();
    const tooltipRect = this.tooltipRef.getBoundingClientRect();

    // If tooltip hasn't been measured yet (width/height = 0), retry with limit
    if (tooltipRect.width === 0 || tooltipRect.height === 0) {
      // Prevent infinite loop by limiting retries
      if (this.positionRetryCount < this.MAX_POSITION_RETRIES) {
        this.positionRetryCount++;
        requestAnimationFrame(() => this.updateTooltipPosition());
      } else {
        // Max retries reached - tooltip content may be empty or hidden
        console.warn('Tooltip position update failed: Unable to measure tooltip dimensions after maximum retries');
      }
      return;
    }

    const rtl = this.isRtl();
    let top = 0;
    let left = 0;

    // In RTL, "left" and "right" positions are mirrored
    const effectivePosition = rtl
      ? this.position === 'left' ? 'right' : this.position === 'right' ? 'left' : this.position
      : this.position;

    // Calculate position based on placement
    switch (effectivePosition) {
      case 'top':
        top = triggerRect.top - tooltipRect.height - this.gap;
        left = this.calculateHorizontalPosition(triggerRect, tooltipRect);
        break;
      case 'bottom':
        top = triggerRect.bottom + this.gap;
        left = this.calculateHorizontalPosition(triggerRect, tooltipRect);
        break;
      case 'left':
        top = this.calculateVerticalPosition(triggerRect, tooltipRect);
        left = triggerRect.left - tooltipRect.width - this.gap;
        break;
      case 'right':
        top = this.calculateVerticalPosition(triggerRect, tooltipRect);
        left = triggerRect.right + this.gap;
        break;
    }

    // Apply offset (flip horizontal offset in RTL)
    if (this.position === 'top' || this.position === 'bottom') {
      left += rtl ? -this.offset : this.offset;
    } else {
      top += this.offset;
    }

    // Ensure tooltip stays within viewport
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    if (left < 0) {
      left = 8;
    } else if (left + tooltipRect.width > viewportWidth) {
      left = viewportWidth - tooltipRect.width - 8;
    }

    if (top < 0) {
      top = 8;
    } else if (top + tooltipRect.height > viewportHeight) {
      top = viewportHeight - tooltipRect.height - 8;
    }

    // Apply styles directly to DOM to avoid triggering re-renders
    this.tooltipRef.style.top = `${top}px`;
    this.tooltipRef.style.left = `${left}px`;
    this.tooltipRef.style.visibility = 'visible';
  }

  private calculateHorizontalPosition(triggerRect: DOMRect, tooltipRect: DOMRect): number {
    const rtl = this.isRtl();
    // In RTL, 'start' means right edge and 'end' means left edge
    const effectiveAlign = rtl
      ? this.align === 'start' ? 'end' : this.align === 'end' ? 'start' : this.align
      : this.align;

    switch (effectiveAlign) {
      case 'start':
        return triggerRect.left;
      case 'end':
        return triggerRect.right - tooltipRect.width;
      case 'center':
      default:
        return triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
    }
  }

  private calculateVerticalPosition(triggerRect: DOMRect, tooltipRect: DOMRect): number {
    switch (this.align) {
      case 'start':
        return triggerRect.top;
      case 'end':
        return triggerRect.bottom - tooltipRect.height;
      case 'center':
      default:
        return triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
    }
  }

  private showTooltip = () => {
    if (this.disabled) return;

    this.clearTimeouts();

    this.showTooltipTimeout = window.setTimeout(() => {
      this.isVisible = true;
    }, this.showDelay);
  };

  private hideTooltip = () => {
    this.clearTimeouts();

    this.hideTimeout = window.setTimeout(() => {
      this.isVisible = false;
    }, this.hideDelay);
  };

  private handleTriggerMouseEnter = () => {
    if (this.trigger === 'hover') {
      this.showTooltip();
    }
  };

  private handleTriggerMouseLeave = () => {
    if (this.trigger === 'hover' && !this.interactive) {
      this.hideTooltip();
    }
  };

  private handleTriggerClick = (event: MouseEvent) => {
    if (this.trigger === 'click') {
      event.stopPropagation();
      this.isVisible = !this.isVisible;
    }
  };

  private handleTooltipMouseEnter = () => {
    if (this.interactive && this.trigger === 'hover') {
      this.clearTimeouts();
    }
  };

  private handleTooltipMouseLeave = () => {
    if (this.interactive && this.trigger === 'hover') {
      this.hideTooltip();
    }
  };

  @Listen('click', { target: 'document' })
  handleDocumentClick(event: MouseEvent) {
    if (this.trigger === 'click' && this.isVisible) {
      const target = event.target as Node;
      if (!this.el.contains(target)) {
        this.isVisible = false;
      }
    }
  }

  @Listen('keydown')
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.isVisible) {
      this.isVisible = false;
    }
  }

  render() {
    const hasContent = this.hasContentSlot || this.content;
    const position: TooltipPosition = (TOOLTIP_POSITIONS as readonly string[]).includes(this.position) ? this.position : 'top';

    return (
      <Host>
        <div
          class="aegov-tooltip-trigger"
          ref={(el) => (this.triggerRef = el)}
          onMouseEnter={this.handleTriggerMouseEnter}
          onMouseLeave={this.handleTriggerMouseLeave}
          onClick={this.handleTriggerClick}
          aria-describedby={this.isVisible ? this.tooltipId : undefined}
          aria-expanded={this.trigger === 'click' ? this.isVisible.toString() : undefined}
        >
          <slot />
        </div>

        {hasContent && (
          <div
            id={this.tooltipId}
            ref={(el) => (this.tooltipRef = el)}
            class={{
              'aegov-tooltip': true,
              [`tooltip--${position}`]: true,
              [`tooltip--align-${this.align}`]: true,
              'tooltip--interactive': this.interactive,
            }}
            style={{ display: this.isVisible ? 'block' : 'none' }}
            role={this.interactive ? 'dialog' : 'tooltip'}
            aria-label={this.interactive ? 'Interactive tooltip' : undefined}
            onMouseEnter={this.handleTooltipMouseEnter}
            onMouseLeave={this.handleTooltipMouseLeave}
          >
            <div class="tooltip__content">
              {this.hasContentSlot ? (
                <slot name="tooltip-content" />
              ) : (
                this.content
              )}
            </div>
            <div class="tooltip__arrow"></div>
          </div>
        )}
      </Host>
    );
  }
}
