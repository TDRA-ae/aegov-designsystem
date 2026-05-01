import { EventEmitter } from '@stencil/core';
import type { ToastVariant, ToastAppearance, ToastPosition, ToastMode } from '../../utils/types';
/**
 * @slot default - Toast description content
 * @slot title - Toast title text
 * @slot icon - Custom icon
 * @slot actions - Action buttons/links
 */
export declare class AegovToast {
    el: HTMLAegovToastElement;
    /**
     * Semantic color variant of the toast.
     */
    variant: ToastVariant;
    /**
     * Appearance style: soft (light bg) or solid (dark bg).
     */
    appearance: ToastAppearance;
    /**
     * Screen position where the toast appears.
     */
    position: ToastPosition;
    /**
     * Auto-dismiss duration in milliseconds. 0 = no auto-dismiss.
     */
    duration: number;
    /**
     * Whether the toast shows a close button.
     */
    isDismissible: boolean;
    /**
     * Display mode for multiple toasts at the same position.
     * 'stack' = all toasts visible with gap between them (default).
     * 'rack' = toasts collapse into a deck; hover to expand.
     */
    mode: ToastMode;
    /**
     * Whether to show a countdown progress bar.
     */
    isProgressEnabled: boolean;
    /**
     * Emitted after the toast becomes visible.
     */
    aegovToastOpen: EventEmitter<void>;
    /**
     * Emitted after the toast close animation completes and element is removed.
     */
    aegovToastClose: EventEmitter<void>;
    /**
     * Emitted when the user clicks the dismiss button.
     */
    aegovToastDismiss: EventEmitter<void>;
    isVisible: boolean;
    isEntering: boolean;
    isExiting: boolean;
    hasIconSlot: boolean;
    hasTitleSlot: boolean;
    hasActionsSlot: boolean;
    private autoCloseTimer;
    private isClosing;
    private timerStartedAt;
    private timeRemaining;
    isPaused: boolean;
    /**
     * Show the toast notification.
     */
    show(): Promise<void>;
    /**
     * Close the toast with exit animation and auto-remove from DOM.
     */
    close(): Promise<void>;
    private handleDismiss;
    private startAutoCloseTimer;
    private handleMouseEnter;
    private handleMouseLeave;
    private checkSlots;
    private getPositionDirection;
    private getToastClasses;
    componentWillLoad(): void;
    onVariantChange(v: unknown): void;
    onAppearanceChange(v: unknown): void;
    onPositionChange(v: unknown): void;
    onModeChange(v: unknown): void;
    componentDidLoad(): void;
    disconnectedCallback(): void;
    render(): any;
}
