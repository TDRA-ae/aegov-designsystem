import { Component, Host, h, Prop, Element, State, Listen, Event, EventEmitter, Watch } from '@stencil/core';
import type { DropdownPosition, DropdownAlign, DropdownTrigger } from '../../utils/types';

// Singleton to track currently open dropdown
let currentOpenDropdown: AegovDropdown | null = null;

let dropdownIdCounter = 0;

/**
 * Dropdown component that displays positioned content on trigger interaction
 *
 * @slot - Trigger element (button, link, etc.)
 * @slot dropdown-content - Dropdown content (any HTML/components)
 */
@Component({
  tag: 'aegov-dropdown',
  styleUrl: 'aegov-dropdown.css',
  scoped: true,
})
export class AegovDropdown {
  @Element() el: HTMLElement;

  @State() isOpen: boolean = false;
  @State() hasContentSlot: boolean = false;

  private dropdownRef?: HTMLDivElement;
  private triggerRef?: HTMLDivElement;
  private portalElement?: HTMLDivElement;
  private hideTimeout?: number;
  private showTimeout?: number;
  private positionUpdateScheduled: boolean = false;
  private positionRetryCount: number = 0;
  private readonly MAX_POSITION_RETRIES = 10;
  private dropdownId: string;
  private focusableElements: HTMLElement[] = [];
  private currentFocusIndex: number = -1;
  private triggerElement?: HTMLElement;

  /**
   * Trigger type for showing the dropdown
   * @default 'click'
   */
  @Prop() triggerType: DropdownTrigger = 'click';

  /**
   * Position of the dropdown relative to the trigger element
   * @default 'bottom'
   */
  @Prop() position: DropdownPosition = 'bottom';

  /**
   * Alignment of the dropdown
   * @default 'start'
   */
  @Prop() align: DropdownAlign = 'start';

  /**
   * Gap between dropdown and trigger element (in pixels)
   * @default 8
   */
  @Prop() gap: number = 8;

  /**
   * Additional offset for dropdown positioning (in pixels)
   * @default 0
   */
  @Prop() offset: number = 0;

  /**
   * Whether the dropdown is disabled
   * @default false
   */
  @Prop() disabled: boolean = false;

  /**
   * Delay before showing dropdown (in milliseconds)
   * @default 200
   */
  @Prop() showDelay: number = 200;

  /**
   * Delay before hiding dropdown (in milliseconds)
   * @default 0
   */
  @Prop() hideDelay: number = 0;

  /**
   * Emitted when dropdown opens
   */
  @Event() aegovDropdownOpen: EventEmitter<void>;

  /**
   * Emitted when dropdown closes
   */
  @Event() aegovDropdownClose: EventEmitter<void>;

  componentWillLoad() {
    // Generate stable dropdown ID once
    this.dropdownId = `aegov-dropdown-${++dropdownIdCounter}`;

    // Check if dropdown-content slot has content
    this.checkSlotContent();
  }

  componentDidLoad() {
    // Create portal element for dropdown content
    this.createPortalElement();
  }

  disconnectedCallback() {
    this.clearTimeouts();
    this.removePortalElement();
  }

  private checkSlotContent() {
    const contentSlot = this.el.querySelector('[slot="dropdown-content"]');
    const hasSlot = contentSlot !== null;
    this.hasContentSlot = hasSlot;
  }

  private createPortalElement() {
    if (!this.portalElement) {
      this.portalElement = document.createElement('div');
      this.portalElement.className = 'aegov-dropdown-portal';
      document.body.appendChild(this.portalElement);
    }
  }

  private removePortalElement() {
    if (this.portalElement) {
      document.body.removeChild(this.portalElement);
      this.portalElement = undefined;
    }
  }

  @Watch('isOpen')
  handleOpenChange(newValue: boolean) {
    if (newValue) {
      // Close any other open dropdown before opening this one
      // BUT: Don't close if the current dropdown is a parent of this dropdown (nested dropdown)
      if (currentOpenDropdown && currentOpenDropdown !== this) {
        // Check if this dropdown is nested inside the currently open dropdown
        const isNested = currentOpenDropdown.dropdownRef &&
                        currentOpenDropdown.dropdownRef.contains(this.el);

        if (!isNested) {
          // Not a nested dropdown, close the current one
          currentOpenDropdown.closeDropdown();
        }
      }
      // Set this as the currently open dropdown (even if nested, it becomes the "current")
      currentOpenDropdown = this;

      // Reset retry count when showing dropdown
      this.positionRetryCount = 0;
      // Render portal content
      this.renderPortalContent();
      // Schedule position update after dropdown is rendered
      this.schedulePositionUpdate();
      // Emit open event
      this.aegovDropdownOpen.emit();
      // Store the trigger element for focus restoration
      this.triggerElement = document.activeElement as HTMLElement;
      // Set up focus trap after a tick
      setTimeout(() => this.setupFocusTrap(), 0);
    } else {
      // Clear reference if this was the currently open dropdown
      if (currentOpenDropdown === this) {
        currentOpenDropdown = null;
      }

      // Clear dropdown ref when hiding
      this.dropdownRef = undefined;
      // Reset scheduled flag
      this.positionUpdateScheduled = false;
      this.positionRetryCount = 0;
      // Clear portal content
      if (this.portalElement) {
        this.portalElement.innerHTML = '';
      }
      // Emit close event
      this.aegovDropdownClose.emit();
      // Restore focus to trigger
      if (this.triggerElement) {
        this.triggerElement.focus();
      }
    }
  }

  /**
   * Public method to close this dropdown
   * Used by other dropdowns to close this one when they open
   */
  public closeDropdown() {
    this.isOpen = false;
  }

  private clearTimeouts() {
    if (this.showTimeout) {
      window.clearTimeout(this.showTimeout);
    }
    if (this.hideTimeout) {
      window.clearTimeout(this.hideTimeout);
    }
  }

  @Listen('scroll', { target: 'window', passive: true })
  @Listen('resize', { target: 'window', passive: true })
  handleWindowEvents() {
    if (this.isOpen) {
      this.schedulePositionUpdate();
    }
  }

  private schedulePositionUpdate() {
    if (this.positionUpdateScheduled) return;

    // Only schedule if dropdown is actually open
    if (!this.isOpen) return;

    this.positionUpdateScheduled = true;
    // Use double RAF to ensure dropdown is fully rendered and measured
    requestAnimationFrame(() => {
      // Check again if dropdown is still open before second RAF
      if (!this.isOpen) {
        this.positionUpdateScheduled = false;
        return;
      }

      requestAnimationFrame(() => {
        // Final check before updating position
        if (this.isOpen && this.dropdownRef) {
          this.updateDropdownPosition();
        }
        this.positionUpdateScheduled = false;
      });
    });
  }

  private updateDropdownPosition() {
    if (!this.dropdownRef || !this.triggerRef) return;

    const triggerRect = this.triggerRef.getBoundingClientRect();
    const dropdownRect = this.dropdownRef.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Close dropdown if trigger has scrolled out of the viewport
    if (
      triggerRect.bottom < 0 ||
      triggerRect.top > viewportHeight ||
      triggerRect.right < 0 ||
      triggerRect.left > viewportWidth
    ) {
      this.isOpen = false;
      return;
    }

    // If dropdown hasn't been measured yet (width/height = 0), retry with limit
    if (dropdownRect.width === 0 || dropdownRect.height === 0) {
      if (this.positionRetryCount < this.MAX_POSITION_RETRIES) {
        this.positionRetryCount++;
        requestAnimationFrame(() => this.updateDropdownPosition());
      } else {
        console.warn('Dropdown position update failed: Unable to measure dropdown dimensions after maximum retries');
      }
      return;
    }

    let position = this.position;

    // Check if there's enough space in the preferred position, flip if needed
    if (position === 'bottom' && triggerRect.bottom + this.gap + dropdownRect.height > viewportHeight) {
      if (triggerRect.top - this.gap - dropdownRect.height > 0) {
        position = 'top';
      }
    } else if (position === 'top' && triggerRect.top - this.gap - dropdownRect.height < 0) {
      if (triggerRect.bottom + this.gap + dropdownRect.height < viewportHeight) {
        position = 'bottom';
      }
    } else if (position === 'right' && triggerRect.right + this.gap + dropdownRect.width > viewportWidth) {
      if (triggerRect.left - this.gap - dropdownRect.width > 0) {
        position = 'left';
      }
    } else if (position === 'left' && triggerRect.left - this.gap - dropdownRect.width < 0) {
      if (triggerRect.right + this.gap + dropdownRect.width < viewportWidth) {
        position = 'right';
      }
    }

    let top = 0;
    let left = 0;

    // Calculate position based on placement
    switch (position) {
      case 'top':
        top = triggerRect.top - dropdownRect.height - this.gap;
        left = this.calculateHorizontalPosition(triggerRect, dropdownRect);
        break;
      case 'bottom':
        top = triggerRect.bottom + this.gap;
        left = this.calculateHorizontalPosition(triggerRect, dropdownRect);
        break;
      case 'left':
        top = this.calculateVerticalPosition(triggerRect, dropdownRect);
        left = triggerRect.left - dropdownRect.width - this.gap;
        break;
      case 'right':
        top = this.calculateVerticalPosition(triggerRect, dropdownRect);
        left = triggerRect.right + this.gap;
        break;
    }

    // Apply offset
    if (position === 'top' || position === 'bottom') {
      left += this.offset;
    } else {
      top += this.offset;
    }

    // Ensure dropdown stays within viewport
    if (left < 8) {
      left = 8;
    } else if (left + dropdownRect.width > viewportWidth) {
      left = viewportWidth - dropdownRect.width - 8;
    }

    if (top < 8) {
      top = 8;
    } else if (top + dropdownRect.height > viewportHeight) {
      top = viewportHeight - dropdownRect.height - 8;
    }

    // Set transform origin for animation based on final position
    const originX = position === 'left' ? '100%' : position === 'right' ? '0%' : '50%';
    const originY = position === 'top' ? '100%' : position === 'bottom' ? '0%' : '50%';

    // Apply styles directly to DOM
    this.dropdownRef.style.top = `${top}px`;
    this.dropdownRef.style.left = `${left}px`;
    this.dropdownRef.style.transformOrigin = `${originX} ${originY}`;
    this.dropdownRef.style.visibility = 'visible';
  }

  private calculateHorizontalPosition(triggerRect: DOMRect, dropdownRect: DOMRect): number {
    switch (this.align) {
      case 'start':
        return triggerRect.left;
      case 'end':
        return triggerRect.right - dropdownRect.width;
      case 'center':
      default:
        return triggerRect.left + (triggerRect.width - dropdownRect.width) / 2;
    }
  }

  private calculateVerticalPosition(triggerRect: DOMRect, dropdownRect: DOMRect): number {
    switch (this.align) {
      case 'start':
        return triggerRect.top;
      case 'end':
        return triggerRect.bottom - dropdownRect.height;
      case 'center':
      default:
        return triggerRect.top + (triggerRect.height - dropdownRect.height) / 2;
    }
  }

  private showDropdown = () => {
    if (this.disabled) return;

    this.clearTimeouts();

    this.showTimeout = window.setTimeout(() => {
      this.isOpen = true;
    }, this.showDelay);
  };

  private hideDropdown = () => {
    this.clearTimeouts();

    this.hideTimeout = window.setTimeout(() => {
      this.isOpen = false;
    }, this.hideDelay);
  };

  private handleTriggerMouseEnter = () => {
    if (this.triggerType === 'hover') {
      this.showDropdown();
    }
  };

  private handleTriggerMouseLeave = (event: MouseEvent) => {
    if (this.triggerType === 'hover') {
      // Check if we're moving to the dropdown or a nested dropdown
      const relatedTarget = event.relatedTarget as HTMLElement;
      if (relatedTarget && this.portalElement && this.portalElement.contains(relatedTarget)) {
        // Moving to the dropdown content, don't hide
        return;
      }
      // Check if moving to a nested dropdown trigger
      if (relatedTarget && relatedTarget.closest && relatedTarget.closest('aegov-dropdown')) {
        // Moving to a nested dropdown, don't hide
        return;
      }
      this.hideDropdown();
    }
  };

  private handleTriggerClick = (event: MouseEvent) => {
    if (this.triggerType === 'click' && !this.disabled) {
      event.stopPropagation();
      this.isOpen = !this.isOpen;
    }
  };

  private handleDropdownMouseEnter = () => {
    if (this.triggerType === 'hover') {
      this.clearTimeouts();
    }
  };

  private handleDropdownMouseLeave = (event: MouseEvent) => {
    if (this.triggerType === 'hover') {
      // Check if we're moving to a nested dropdown element or any dropdown portal
      const relatedTarget = event.relatedTarget as HTMLElement;

      if (relatedTarget) {
        // Don't hide if moving to another dropdown portal (includes nested dropdown portals)
        if (relatedTarget.closest && relatedTarget.closest('.aegov-dropdown-portal')) {
          return;
        }

        // Don't hide if moving into our own portal element or a child within it
        if (this.portalElement && this.portalElement.contains(relatedTarget)) {
          return;
        }

        // Don't hide if moving to a nested aegov-dropdown component that's inside our dropdown
        const targetDropdown = relatedTarget.closest && relatedTarget.closest('aegov-dropdown');
        if (targetDropdown && this.dropdownRef && this.dropdownRef.contains(targetDropdown as Node)) {
          return;
        }
      }

      this.hideDropdown();
    }
  };

  @Listen('click', { target: 'document' })
  handleDocumentClick(event: MouseEvent) {
    if (this.isOpen) {
      const target = event.target as Node;

      // Close if click is outside both trigger and dropdown
      if (!this.el.contains(target) && this.portalElement && !this.portalElement.contains(target)) {
        this.isOpen = false;
      }
    }
  }

  @Listen('keydown', { target: 'document' })
  handleKeyDown(event: KeyboardEvent) {
    if (!this.isOpen) return;

    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        this.isOpen = false;
        break;
      case 'Tab':
        event.preventDefault();
        this.focusNextElement(event.shiftKey);
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.focusNextElement(false);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.focusNextElement(true);
        break;
    }
  }

  private setupFocusTrap() {
    if (!this.dropdownRef) return;

    // Get all focusable elements within dropdown
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'textarea:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
    ];

    this.focusableElements = Array.from(
      this.dropdownRef.querySelectorAll(focusableSelectors.join(', '))
    ) as HTMLElement[];

    // Focus first element
    if (this.focusableElements.length > 0) {
      this.currentFocusIndex = 0;
      this.focusableElements[0].focus();
    }
  }

  private focusNextElement(reverse: boolean = false) {
    if (this.focusableElements.length === 0) return;

    if (reverse) {
      this.currentFocusIndex--;
      if (this.currentFocusIndex < 0) {
        this.currentFocusIndex = this.focusableElements.length - 1;
      }
    } else {
      this.currentFocusIndex++;
      if (this.currentFocusIndex >= this.focusableElements.length) {
        this.currentFocusIndex = 0;
      }
    }

    this.focusableElements[this.currentFocusIndex].focus();
  }

  private renderPortalContent() {
    if (!this.portalElement || !this.hasContentSlot) return;

    // Get content slot element
    const contentSlot = this.el.querySelector('[slot="dropdown-content"]');
    if (!contentSlot) return;

    // Clear portal
    this.portalElement.innerHTML = '';

    // Inject styles for portal content (scoped CSS can't reach portal elements)
    const styleElement = document.createElement('style');
    styleElement.textContent = `
      .aegov-dropdown-portal {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 9999;
        pointer-events: none;
      }

      .aegov-dropdown-portal .aegov-dropdown {
        background: white;
        border: 1px solid #cbd5e0;
        border-radius: 0.5rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        position: fixed;
        visibility: hidden;
        pointer-events: auto;
        padding: 0.5rem;
        width: auto;
        min-width: 12rem;
        z-index: 9999;
        opacity: 0;
        transform: scale(0.95);
        transition: opacity 200ms ease-in-out, transform 200ms ease-in-out;
      }

      .aegov-dropdown-portal .aegov-dropdown[data-state="open"] {
        opacity: 1;
        transform: scale(1);
      }

      .aegov-dropdown-portal .aegov-dropdown hr {
        border: none;
        border-top: 1px solid #e2e8f0;
        margin: 0.5rem 0;
      }

      .aegov-dropdown-portal .aegov-dropdown a[aria-disabled="true"],
      .aegov-dropdown-portal .aegov-dropdown button[disabled] {
        opacity: 0.5;
        cursor: not-allowed;
        pointer-events: none;
      }

      /* Nested dropdown: make the host a block element so it fills the full
         row of the parent dropdown and never overlaps the parent panel.
         The sub-menu opens to the side (position="right") of this block row. */
      .aegov-dropdown-portal .aegov-dropdown aegov-dropdown {
        display: block;
      }

      /* Make the trigger div inside nested dropdowns span the full row width
         so the clickable / hoverable area covers the entire menu item. */
      .aegov-dropdown-portal .aegov-dropdown aegov-dropdown .aegov-dropdown-trigger {
        display: block;
        width: 100%;
        box-sizing: border-box;
      }
    `;
    this.portalElement.appendChild(styleElement);

    // Create dropdown container
    const dropdownContainer = document.createElement('div');
    dropdownContainer.className = 'aegov-dropdown';
    dropdownContainer.id = this.dropdownId;
    dropdownContainer.setAttribute('role', 'menu');
    dropdownContainer.setAttribute('data-state', 'open');

    // Clone and append content
    const contentClone = contentSlot.cloneNode(true) as HTMLElement;
    contentClone.removeAttribute('slot');
    dropdownContainer.appendChild(contentClone);

    // Add event listeners
    dropdownContainer.addEventListener('mouseenter', this.handleDropdownMouseEnter);
    dropdownContainer.addEventListener('mouseleave', this.handleDropdownMouseLeave);

    // Append to portal
    this.portalElement.appendChild(dropdownContainer);

    // Store reference
    this.dropdownRef = dropdownContainer;
  }

  render() {
    const hasContent = this.hasContentSlot;

    return (
      <Host>
        <div
          class="aegov-dropdown-trigger"
          ref={(el) => (this.triggerRef = el)}
          onMouseEnter={this.handleTriggerMouseEnter}
          onMouseLeave={this.handleTriggerMouseLeave}
          onClick={this.handleTriggerClick}
          aria-haspopup="true"
          aria-expanded={this.isOpen.toString()}
          aria-controls={this.isOpen ? this.dropdownId : undefined}
        >
          <slot />
        </div>

        {/* Content slot is hidden - it will be cloned to portal */}
        {hasContent && (
          <div style={{ display: 'none' }}>
            <slot name="dropdown-content" />
          </div>
        )}
      </Host>
    );
  }
}
