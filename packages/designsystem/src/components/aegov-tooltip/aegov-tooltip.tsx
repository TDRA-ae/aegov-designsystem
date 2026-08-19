import { Component, Host, h, Prop, Element, State, Listen, Watch } from '@stencil/core';
import { TOOLTIP_POSITIONS, TOOLTIP_ALIGNS, TOOLTIP_TRIGGERS } from '../../utils/types';
import type { TooltipPosition, TooltipAlign, TooltipTrigger } from '../../utils/types';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { getPassThroughAttributes } from '../../utils/attributes';
import { generateId } from '../../utils/id-generator';

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
  @Prop() isDisabled: boolean = false;

  /**
   * Delay before showing tooltip (in milliseconds)
   * @default 200
   */
  @Prop() delayStart: number = 200;

  /**
   * Delay before hiding tooltip (in milliseconds)
   * @default 0
   */
  @Prop() delayEnd: number = 0;

  private showTooltipTimeout?: number;

  componentWillLoad() {
    warnIfInvalidEnumProp(this.position, TOOLTIP_POSITIONS, 'top', ctx('position'));
    warnIfInvalidEnumProp(this.align, TOOLTIP_ALIGNS, 'center', ctx('align'));
    warnIfInvalidEnumProp(this.trigger, TOOLTIP_TRIGGERS, 'hover', ctx('trigger'));
    this.tooltipId = generateId('aegov-tooltip');

    // Check if tooltip-content slot has content
    this.checkSlotContent();
  }

  @Watch('position')
  onPositionChange(v: unknown) { warnIfInvalidEnumProp(v, TOOLTIP_POSITIONS, 'top', ctx('position')); }

  @Watch('align')
  onAlignChange(v: unknown) { warnIfInvalidEnumProp(v, TOOLTIP_ALIGNS, 'center', ctx('align')); }

  @Watch('trigger')
  onTriggerChange(v: unknown) { warnIfInvalidEnumProp(v, TOOLTIP_TRIGGERS, 'hover', ctx('trigger')); }

  /**
   * Sanitized `trigger` value — falls back to the documented default ('hover') for any
   * invalid value. Every runtime branch below compares against this, not the raw prop:
   * an invalid `trigger` must still behave like the default, not silently disable both
   * the hover AND click code paths (each guarded by a bare `=== 'hover'`/`=== 'click'`).
   */
  private get safeTrigger(): TooltipTrigger {
    return (TOOLTIP_TRIGGERS as readonly string[]).includes(this.trigger) ? this.trigger : 'hover';
  }

  private checkSlotContent() {
    const contentSlot = this.el.querySelector('[slot="tooltip-content"]');
    const hasSlot = contentSlot !== null && contentSlot.textContent?.trim().length > 0;
    this.hasContentSlot = hasSlot;
  }

  @Watch('isVisible')
  handleVisibilityChange(newValue: boolean) {
    if (newValue) {
      this.positionRetryCount = 0;
      this.schedulePositionUpdate();
    } else {
      this.tooltipRef = undefined;
      this.positionUpdateScheduled = false;
      this.positionRetryCount = 0;
    }
  }

  /**
   * Finds the trigger's real focusable element so `aria-describedby` lands where AT
   * actually reads it. A plain light-DOM search covers native elements and non-shadow
   * custom elements (e.g. `aegov-link`), but a `shadow:true` trigger like `aegov-button`
   * never reflects `tabindex`/role onto its own host — its real `<button>` lives inside
   * its shadow root, unreachable by a plain `querySelector` from here.
   *
   * Search within `triggerRef`, not `this.el`: for a `scoped:false` component, Stencil's
   * light-DOM slot emulation physically relocates slotted nodes to wherever `<slot/>`
   * sits in the render tree — here, one level inside the `.aegov-tooltip-trigger` wrapper
   * div — so the slotted trigger is never a direct child of `this.el` at all.
   */
  private getTriggerFocusable(): HTMLElement | null {
    if (!this.triggerRef) return null;
    const direct = this.triggerRef.querySelector<HTMLElement>('button, a, [tabindex]');
    if (direct) return direct;
    for (const child of Array.from(this.triggerRef.querySelectorAll<HTMLElement>('*'))) {
      if (child.shadowRoot) {
        const inner = child.shadowRoot.querySelector<HTMLElement>('button, a, [tabindex]');
        if (inner) return inner;
      }
    }
    return null;
  }

  /**
   * Same search as `getTriggerFocusable`, but awaits each shadow-DOM candidate's own
   * `componentOnReady()` first. At `componentDidLoad()` time a nested Stencil component's
   * shadow root already exists (`attachShadow` runs synchronously on connection) but is
   * often still empty — its own render hasn't completed yet, since each component follows
   * its own independently-queued render cycle. Searching it immediately would find nothing
   * even though it becomes populated moments later.
   */
  private async getTriggerFocusableAsync(): Promise<HTMLElement | null> {
    if (!this.triggerRef) return null;
    const direct = this.triggerRef.querySelector<HTMLElement>('button, a, [tabindex]');
    if (direct) return direct;
    for (const child of Array.from(this.triggerRef.querySelectorAll<HTMLElement>('*'))) {
      const maybeStencilEl = child as unknown as { componentOnReady?: () => Promise<unknown> };
      if (typeof maybeStencilEl.componentOnReady === 'function') {
        await maybeStencilEl.componentOnReady();
      }
      if (child.shadowRoot) {
        const inner = child.shadowRoot.querySelector<HTMLElement>('button, a, [tabindex]');
        if (inner) return inner;
      }
    }
    return null;
  }

  async componentDidLoad() {
    // Apply aria-describedby to the slotted trigger element so AT reads
    // the tooltip content regardless of Shadow DOM boundary
    const triggerEl = await this.getTriggerFocusableAsync();
    if (triggerEl) {
      triggerEl.setAttribute('aria-describedby', this.tooltipId);
    }
  }

  disconnectedCallback() {
    this.clearTimeouts();
    const triggerEl = this.getTriggerFocusable();
    if (triggerEl) {
      triggerEl.removeAttribute('aria-describedby');
    }
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
    if (this.isDisabled) return;

    this.clearTimeouts();

    this.showTooltipTimeout = window.setTimeout(() => {
      this.isVisible = true;
    }, this.delayStart);
  };

  private hideTooltip = () => {
    this.clearTimeouts();

    this.hideTimeout = window.setTimeout(() => {
      this.isVisible = false;
    }, this.delayEnd);
  };

  private handleTriggerMouseEnter = () => {
    if (this.safeTrigger === 'hover') {
      this.showTooltip();
    }
  };

  private handleTriggerMouseLeave = () => {
    if (this.safeTrigger === 'hover') {
      this.hideTooltip();
    }
  };

  private handleTriggerFocusin = () => {
    // APG: tooltip must appear on keyboard focus regardless of trigger mode
    this.showTooltip();
  };

  private handleTriggerFocusout = (e: FocusEvent) => {
    if (this.el.contains(e.relatedTarget as Node)) return;
    this.hideTooltip();
  };

  private handleTooltipMouseEnter = () => {
    // Keep tooltip visible when mouse moves from trigger onto tooltip
    this.clearTimeouts();
  };

  private handleTooltipMouseLeave = () => {
    if (this.safeTrigger === 'hover') {
      this.hideTooltip();
    }
  };

  private handleTriggerClick = (event: MouseEvent) => {
    if (this.isDisabled) return;
    if (this.safeTrigger === 'click') {
      event.stopPropagation();
      this.isVisible = !this.isVisible;
    }
  };

  @Listen('click', { target: 'document' })
  handleDocumentClick(event: MouseEvent) {
    if (this.safeTrigger === 'click' && this.isVisible) {
      const target = event.target as Node;
      if (!this.el.contains(target)) {
        this.isVisible = false;
      }
    }
  }

  // target: 'document' (not the default host-only bubble path) so Escape dismisses a
  // tooltip shown purely by mouse hover, with no keyboard focus anywhere inside it —
  // required by WCAG SC 1.4.13 (Content on Hover or Focus), which the docs cite as the
  // reason Escape must work. A host-scoped listener would miss that exact case, since
  // the keydown event never passes through the host when focus is elsewhere entirely.
  @Listen('keydown', { target: 'document' })
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Escape' && this.isVisible) {
      this.isVisible = false;
    }
  }

  render() {
    const hasContent = this.hasContentSlot || this.content;
    const position: TooltipPosition = (TOOLTIP_POSITIONS as readonly string[]).includes(this.position) ? this.position : 'top';
    const passThroughAttributes = getPassThroughAttributes(this.el);

    return (
      <Host>
        <div
          {...passThroughAttributes}
          class="aegov-tooltip-trigger"
          ref={(el) => (this.triggerRef = el)}
          onMouseEnter={this.handleTriggerMouseEnter}
          onMouseLeave={this.handleTriggerMouseLeave}
          onFocusin={this.handleTriggerFocusin}
          onFocusout={this.handleTriggerFocusout}
          onClick={this.handleTriggerClick}
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
            }}
            style={{ visibility: this.isVisible ? undefined : 'hidden' }}
            role="tooltip"
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
