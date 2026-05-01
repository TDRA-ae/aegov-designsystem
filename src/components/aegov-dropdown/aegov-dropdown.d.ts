import { EventEmitter } from '@stencil/core';
import type { DropdownPosition, DropdownAlign, DropdownTrigger } from '../../utils/types';
/**
 * Dropdown component that displays positioned content on trigger interaction
 *
 * @slot - Trigger element (button, link, etc.)
 * @slot dropdown-content - Dropdown content (any HTML/components)
 */
export declare class AegovDropdown {
    el: HTMLElement;
    isOpen: boolean;
    hasContentSlot: boolean;
    private dropdownRef?;
    private triggerRef?;
    private portalElement?;
    private contentSlotRef?;
    private slotWrapperRef?;
    private hideTimeout?;
    private showTimeout?;
    private positionUpdateScheduled;
    private positionRetryCount;
    private readonly MAX_POSITION_RETRIES;
    private focusableElements;
    private currentFocusIndex;
    private triggerElement?;
    /**
     * Whether the most recent open was triggered via keyboard. Drives the
     * decision to auto-focus the first menu item: keyboard opens move focus
     * into the menu (ARIA menu pattern), pointer opens leave focus where
     * the user put it.
     */
    private openedViaKeyboard;
    /**
     * Unique ID for the dropdown menu element. Auto-generated if not provided.
     * The trigger element receives a derived ID `${fieldId}-trigger` for ARIA linkage.
     */
    fieldId?: string;
    /**
     * Trigger type for showing the dropdown
     * @default 'click'
     */
    trigger: DropdownTrigger;
    /**
     * Position of the dropdown relative to the trigger element
     * @default 'bottom'
     */
    position: DropdownPosition;
    /**
     * Alignment of the dropdown
     * @default 'start'
     */
    align: DropdownAlign;
    /**
     * Gap between dropdown and trigger element (in pixels)
     * @default 8
     */
    gap: number;
    /**
     * Additional offset for dropdown positioning (in pixels)
     * @default 0
     */
    offset: number;
    /**
     * Whether the dropdown is disabled
     * @default false
     */
    isDisabled: boolean;
    /**
     * Delay before showing dropdown (in milliseconds)
     * @default 200
     */
    delayStart: number;
    /**
     * Delay before hiding dropdown (in milliseconds)
     * @default 0
     */
    delayEnd: number;
    /**
     * Emitted when dropdown opens
     */
    aegovDropdownOpen: EventEmitter<void>;
    /**
     * Emitted when dropdown closes
     */
    aegovDropdownClose: EventEmitter<void>;
    componentWillLoad(): void;
    private get triggerId();
    onTriggerChange(v: unknown): void;
    onPositionChange(v: unknown): void;
    onAlignChange(v: unknown): void;
    componentDidLoad(): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private checkSlotContent;
    private createPortalElement;
    private removePortalElement;
    private cleanupDropdownListeners;
    handleOpenChange(newValue: boolean): void;
    /**
     * Public method to close this dropdown
     * Used by other dropdowns to close this one when they open
     */
    closeDropdown(): void;
    /**
     * Toggle the dropdown open/closed state regardless of triggerType.
     * Allows external triggers (e.g. a navbar-item chevron) to drive the
     * dropdown when triggerType is 'hover' or 'click'.
     *
     * @param viaKeyboard When true and this call opens the dropdown, the first
     *   focusable item receives focus (ARIA menu pattern). Pass true from
     *   keyboard handlers and false from pointer/mouse handlers.
     */
    toggle(viaKeyboard?: boolean): Promise<void>;
    private clearTimeouts;
    handleWindowEvents(): void;
    private schedulePositionUpdate;
    private updateDropdownPosition;
    private calculateHorizontalPosition;
    private calculateVerticalPosition;
    private showDropdown;
    /**
     * Minimum grace period (ms) for hover-triggered dropdowns.
     * Gives the cursor time to cross the gap between trigger and portal panel.
     */
    private static readonly HOVER_HIDE_GRACE;
    private hideDropdown;
    private handleTriggerMouseEnter;
    private handleTriggerMouseLeave;
    private handleTriggerClick;
    private handleDropdownMouseEnter;
    private handleDropdownMouseLeave;
    /**
     * Check if any nested aegov-dropdown inside our dropdown panel is currently open.
     */
    private hasOpenNestedDropdown;
    handleDocumentClick(event: MouseEvent): void;
    private keyHandler;
    handleKeyDown(event: KeyboardEvent): void;
    private setupFocusTrap;
    private focusNextElement;
    private renderPortalContent;
    /**
     * Moves the content slot element back into the host's hidden wrapper
     * so it is available for the next open cycle.
     */
    private returnPortalContent;
    render(): any;
}
