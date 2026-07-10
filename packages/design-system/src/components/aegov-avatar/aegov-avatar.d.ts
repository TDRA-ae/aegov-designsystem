import type { AvatarAppearance, AvatarStatus } from '../../utils/types';
/**
 * @slot - Avatar content (used when no src is provided)
 * @part avatar - The avatar container element
 * @part image - The avatar image element
 * @part status - The status indicator element
 */
export declare class AegovAvatar {
    el: HTMLElement;
    /** Native img attributes to pass through to the inner img element. */
    private static readonly PASS_THROUGH_ATTRS;
    /** Unique ID for the inner avatar element. Auto-generated if not provided. */
    fieldId?: string;
    /**
     * The avatar size
     * @default 'base'
     */
    size: string;
    private _resolvedSize;
    private _sizeWatcher;
    /**
     * The avatar appearance (shape)
     * @default 'square'
     */
    appearance: AvatarAppearance;
    /**
     * The image source URL
     */
    src?: string;
    /**
     * Alternative text for the image (required for accessibility)
     */
    alt?: string;
    /**
     * Status indicator. Set to a status string to show the indicator, or `false` to hide it.
     * Accepts: `'online'`, `'offline'`, `'away'`, `'unavailable'`, `'busy'`, or boolean (`true` maps to `'online'`).
     * @default false
     */
    status: AvatarStatus | boolean;
    /**
     * Internal state to track image load error
     */
    imageError: boolean;
    componentWillLoad(): void;
    disconnectedCallback(): void;
    onSizeChange(): void;
    onAppearanceChange(v: unknown): void;
    /**
     * Handle image load error
     */
    private handleImageError;
    /**
     * Get the CSS classes based on component props
     */
    private getAvatarClasses;
    /**
     * Get the effective status type from the status prop, or null when hidden.
     */
    private getEffectiveStatus;
    /**
     * Get status indicator classes
     */
    private getStatusClasses;
    render(): any;
}
