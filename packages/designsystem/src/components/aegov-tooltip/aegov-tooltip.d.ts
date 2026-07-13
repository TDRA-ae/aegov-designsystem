import type { TooltipPosition, TooltipAlign, TooltipTrigger } from '../../utils/types';
/**
 * Tooltip component that displays additional information on hover or click
 *
 * @slot - Trigger element (button, link, etc.)
 * @slot tooltip-content - Tooltip content (alternative to using content prop)
 */
export declare class AegovTooltip {
    el: HTMLElement;
    isVisible: boolean;
    hasContentSlot: boolean;
    private tooltipRef?;
    private triggerRef?;
    private hideTimeout?;
    private positionUpdateScheduled;
    private positionRetryCount;
    private readonly MAX_POSITION_RETRIES;
    private tooltipId;
    /**
     * Tooltip content text (alternative to using slot)
     */
    content?: string;
    /**
     * Position of the tooltip relative to the trigger element
     * @default 'top'
     */
    position: TooltipPosition;
    /**
     * Alignment of the tooltip
     * @default 'center'
     */
    align: TooltipAlign;
    /**
     * Trigger type for showing the tooltip
     * @default 'hover'
     */
    trigger: TooltipTrigger;
    /**
     * Gap between tooltip and trigger element (in pixels)
     * @default 8
     */
    gap: number;
    /**
     * Additional offset for tooltip positioning (in pixels)
     * @default 0
     */
    offset: number;
    /**
     * Whether the tooltip is disabled
     * @default false
     */
    isDisabled: boolean;
    /**
     * Delay before showing tooltip (in milliseconds)
     * @default 200
     */
    delayStart: number;
    /**
     * Delay before hiding tooltip (in milliseconds)
     * @default 0
     */
    delayEnd: number;
    private showTooltipTimeout?;
    componentWillLoad(): void;
    onPositionChange(v: unknown): void;
    onAlignChange(v: unknown): void;
    onTriggerChange(v: unknown): void;
    private checkSlotContent;
    handleVisibilityChange(newValue: boolean): void;
    disconnectedCallback(): void;
    private clearTimeouts;
    handleWindowEvents(): void;
    private schedulePositionUpdate;
    private isRtl;
    private updateTooltipPosition;
    private calculateHorizontalPosition;
    private calculateVerticalPosition;
    private showTooltip;
    private hideTooltip;
    private handleTriggerMouseEnter;
    private handleTriggerMouseLeave;
    private handleTriggerClick;
    handleDocumentClick(event: MouseEvent): void;
    handleKeyDown(event: KeyboardEvent): void;
    render(): any;
}
