import { EventEmitter } from '@stencil/core';
import type { AvatarGroupVariant } from '../../utils/types';
/**
 * @slot - Avatar elements to be grouped together
 */
export declare class AegovAvatarGroup {
    el: HTMLElement;
    /**
     * The layout variant: 'default' (spaced) or 'compact' (overlapping)
     */
    variant: AvatarGroupVariant;
    /**
     * The size enforced on all child avatars
     */
    size: string;
    private _resolvedSize;
    private _sizeWatcher;
    /**
     * Number of additional users not shown. When > 0, displays "+N" indicator.
     */
    moreCount: number;
    /**
     * Custom text for the "more" indicator. Defaults to "{moreCount}+"
     */
    moreText?: string;
    /**
     * Emitted when the "more" indicator button is clicked
     */
    aegovAvatarGroupMore: EventEmitter<void>;
    componentWillLoad(): void;
    componentDidLoad(): void;
    componentDidUpdate(): void;
    onVariantChange(v: unknown): void;
    disconnectedCallback(): void;
    watchSize(): void;
    private getDirectChildAvatars;
    private updateAvatars;
    private handleMoreClick;
    private getMoreDisplayText;
    private getSizeClass;
    render(): any;
}
