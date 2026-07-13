import { EventEmitter } from '@stencil/core';
import type { PopoverPosition, PopoverAlign, PopoverTrigger } from '../../utils/types';
/**
 * Popover component that displays positioned content with an arrow marker
 *
 * @slot - Trigger element (button, link, etc.)
 * @slot popover-content - Popover content (any HTML/components)
 */
export declare class AegovPopover {
    el: HTMLElement;
    isOpen: boolean;
    hasContentSlot: boolean;
    private popoverRef?;
    private arrowRef?;
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
     * Unique ID for the popover element. Auto-generated if not provided.
     * The trigger element receives a derived ID `${fieldId}-trigger` for ARIA linkage.
     */
    fieldId?: string;
    /**
     * Trigger type for showing the popover
     * @default 'click'
     */
    trigger: PopoverTrigger;
    /**
     * Position of the popover relative to the trigger element
     * @default 'bottom'
     */
    position: PopoverPosition;
    /**
     * Alignment of the popover
     * @default 'center'
     */
    align: PopoverAlign;
    /**
     * Gap between popover and trigger element (in pixels)
     * @default 10
     */
    gap: number;
    /**
     * Additional offset for popover positioning (in pixels)
     * @default 0
     */
    offset: number;
    /**
     * Whether the popover is disabled
     * @default false
     */
    isDisabled: boolean;
    /**
     * Delay before showing popover on hover (in milliseconds)
     * @default 200
     */
    delayStart: number;
    /**
     * Delay before hiding popover on hover (in milliseconds)
     * @default 0
     */
    delayEnd: number;
    /**
     * Emitted when popover opens
     */
    aegovPopoverOpen: EventEmitter<void>;
    /**
     * Emitted when popover closes
     */
    aegovPopoverClose: EventEmitter<void>;
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
    handleOpenChange(newValue: boolean): void;
    closePopover(): void;
    private clearTimeouts;
    private cleanupPopoverListeners;
    handleWindowEvents(): void;
    private schedulePositionUpdate;
    private updatePopoverPosition;
    private positionArrow;
    private calculateHorizontalPosition;
    private calculateVerticalPosition;
    private showPopover;
    private static readonly HOVER_HIDE_GRACE;
    private hidePopover;
    private handleTriggerMouseEnter;
    private handleTriggerMouseLeave;
    private handleTriggerClick;
    private handlePopoverMouseEnter;
    private handlePopoverMouseLeave;
    handleDocumentClick(event: MouseEvent): void;
    private keyHandler;
    handleKeyDown(event: KeyboardEvent): void;
    private setupFocusTrap;
    private focusNextElement;
    private renderPortalContent;
    private returnPortalContent;
    render(): any;
}
