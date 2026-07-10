import { EventEmitter } from '@stencil/core';
import type { ModalPosition, ModalOverlayOpacity, ModalSize } from '../../utils/types';
/**
 * @slot - Modal content
 */
export declare class AegovModal {
    el: HTMLElement;
    private triggerElement;
    private focusableElements;
    private modalZIndex;
    private movedToBody;
    /**
     * Unique ID for the modal dialog element. Auto-generated if not provided.
     */
    fieldId?: string;
    /**
     * Whether the modal is currently open/visible
     */
    isOpen: boolean;
    /**
     * Whether clicking the overlay closes the modal
     * @default true
     */
    isCloseWithOverlay: boolean;
    /**
     * Whether to prevent body scroll when modal is open
     * @default true
     */
    isPreventScroll: boolean;
    /**
     * Overlay opacity level
     * @default 'base'
     */
    overlayOpacity: ModalOverlayOpacity;
    /**
     * Position of the modal on screen
     * @default 'center'
     */
    position: ModalPosition;
    /**
     * Size: 'sm' (compact padding/radius), 'base' (default), or 'lg' (generous padding/radius). Mirrors aegov-card sizing tokens.
     * @default 'base'
     */
    size: ModalSize;
    /**
     * Whether to apply inner content padding. On by default; scales with size.
     * @default true
     */
    isPadding: boolean;
    /**
     * @internal State to manage animation
     */
    animationState: 'closed' | 'opening' | 'open' | 'closing';
    /**
     * Emitted when modal is opened
     */
    aegovModalOpen: EventEmitter<void>;
    /**
     * Emitted when modal is closed
     */
    aegovModalClose: EventEmitter<void>;
    /**
     * Emitted before modal closes (cancellable)
     */
    aegovModalBeforeClose: EventEmitter<{
        preventDefault: () => void;
    }>;
    /**
     * Emitted when backdrop is clicked
     */
    aegovModalBackdropClick: EventEmitter<MouseEvent>;
    /**
     * Emitted when ESC key is pressed
     */
    aegovModalEscapePress: EventEmitter<KeyboardEvent>;
    /**
     * Programmatically open the modal
     */
    show(): Promise<void>;
    /**
     * Programmatically close the modal
     */
    close(): Promise<void>;
    /**
     * Toggle modal open/closed state
     */
    toggle(): Promise<void>;
    handleOpenChange(newValue: boolean, oldValue: boolean): void;
    componentWillLoad(): void;
    onOverlayOpacityChange(v: unknown): void;
    onPositionChange(v: unknown): void;
    onSizeChange(v: unknown): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private handleOpen;
    private handleClose;
    private handleCloseComplete;
    private handleBackdropClick;
    private handleKeyDown;
    private setupFocusTrap;
    private handleTabKey;
    private getPositionClass;
    private getSizeClass;
    private getOverlayOpacityClass;
    render(): any;
}
