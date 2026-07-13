import { EventEmitter } from '@stencil/core';
import type { DrawerPosition, DrawerAnimation, DrawerOverlayOpacity, DrawerSize } from '../../utils/types';
/**
 * @slot - Drawer content
 */
export declare class AegovDrawer {
    el: HTMLElement;
    private triggerElement;
    private focusableElements;
    private drawerZIndex;
    private movedToBody;
    /**
     * Unique ID for the drawer dialog element. Auto-generated if not provided.
     */
    fieldId?: string;
    /**
     * Whether the drawer is currently open/visible
     */
    isOpen: boolean;
    /**
     * Which edge the drawer slides from
     * @default 'right'
     */
    position: DrawerPosition;
    /**
     * Animation strategy for open/close transitions
     * @default 'slide'
     */
    animation: DrawerAnimation;
    /**
     * Whether the drawer is pinned flush to edges (true) or has a gap with rounded corners (false)
     * @default true
     */
    isPinned: boolean;
    /**
     * Whether to show a backdrop overlay behind the drawer
     * @default true
     */
    isOverlay: boolean;
    /**
     * Backdrop overlay opacity level
     * @default 'base'
     */
    overlayOpacity: DrawerOverlayOpacity;
    /**
     * Whether clicking the backdrop closes the drawer
     * @default true
     */
    isCloseWithOverlay: boolean;
    /**
     * Whether to prevent body scroll when drawer is open
     * @default true
     */
    isPreventScroll: boolean;
    /**
     * Size: 'sm' (compact padding), 'base' (default), or 'lg' (generous padding). Mirrors aegov-card sizing tokens. When `is-pinned="false"`, size also drives the edge gap and border-radius. When pinned, no border-radius is applied regardless of size.
     * @default 'base'
     */
    size: DrawerSize;
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
     * Emitted when drawer is opened
     */
    aegovDrawerOpen: EventEmitter<void>;
    /**
     * Emitted when drawer is closed
     */
    aegovDrawerClose: EventEmitter<void>;
    /**
     * Emitted before drawer closes (cancellable)
     */
    aegovDrawerBeforeClose: EventEmitter<{
        preventDefault: () => void;
    }>;
    /**
     * Emitted when backdrop is clicked
     */
    aegovDrawerBackdropClick: EventEmitter<MouseEvent>;
    /**
     * Emitted when ESC key is pressed
     */
    aegovDrawerEscapePress: EventEmitter<KeyboardEvent>;
    /**
     * Programmatically open the drawer
     */
    show(): Promise<void>;
    /**
     * Programmatically close the drawer
     */
    close(): Promise<void>;
    /**
     * Toggle drawer open/closed state
     */
    toggle(): Promise<void>;
    handleOpenChange(newValue: boolean, oldValue: boolean): void;
    componentWillLoad(): void;
    onPositionChange(v: unknown): void;
    onAnimationChange(v: unknown): void;
    onOverlayOpacityChange(v: unknown): void;
    onSizeChange(v: unknown): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private getAnimationDuration;
    private handleOpen;
    private handleClose;
    /**
     * Animate the closing transition then clean up.
     * Called from @Watch('open') so ALL close paths (close(), toggle(), open=false) animate.
     */
    private handleCloseAnimation;
    private handleCloseComplete;
    private handleBackdropClick;
    private handleKeyDown;
    private setupFocusTrap;
    private handleTabKey;
    private getOverlayOpacityClass;
    render(): any;
}
