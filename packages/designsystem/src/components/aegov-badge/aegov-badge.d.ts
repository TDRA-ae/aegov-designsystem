import { EventEmitter } from '@stencil/core';
import type { BadgeAppearance, BadgeColor } from '../../utils/types';
/**
 * @slot default - The main content of the badge
 */
export declare class AegovBadge {
    el: HTMLElement;
    /**
     * Unique ID for the badge element. Auto-generated if not provided.
     */
    fieldId?: string;
    /**
     * The appearance style of the badge.
     * @default 'soft'
     */
    appearance: BadgeAppearance;
    /**
     * The color variant of the badge.
     * @default 'default'
     */
    color: BadgeColor;
    /**
     * Whether the badge can be dismissed/closed.
     * @default false
     */
    isDismissible: boolean;
    /**
     * The badge size
     * @default 'base'
     */
    size: string;
    private _resolvedSize;
    private _sizeWatcher;
    /**
     * Emitted when the dismiss button is clicked.
     */
    aegovBadgeDismiss: EventEmitter<void>;
    componentWillLoad(): void;
    disconnectedCallback(): void;
    onAppearanceChange(v: unknown): void;
    onColorChange(v: unknown): void;
    onSizeChange(): void;
    /**
     * Handle dismiss button click
     */
    private handleBadgeDismissClick;
    /**
     * Get the CSS classes based on component props
     */
    private getBadgeClasses;
    render(): any;
}
