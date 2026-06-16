import { EventEmitter } from '@stencil/core';
import type { LinkTarget } from '../../utils/types';
/**
 * @slot default - The link text content
 */
export declare class AegovLink {
    el: HTMLElement;
    /**
     * Unique ID for the inner anchor element. Auto-generated if not provided.
     */
    fieldId?: string;
    /**
     * The URL that the link points to.
     * @required
     */
    href: string;
    /**
     * Target attribute for the link (_blank, _self, _parent, _top).
     */
    target?: LinkTarget;
    componentWillLoad(): void;
    onTargetChange(v: unknown): void;
    /**
     * Rel attribute for the link (e.g., "noopener noreferrer" for external links).
     */
    rel?: string;
    /**
     * Additional CSS classes to apply to the link.
     */
    extraClass?: string;
    /**
     * Emitted when the link is clicked.
     * The event detail contains the href and can be used to implement custom navigation.
     */
    aegovLinkClick: EventEmitter<{
        href: string;
        event: MouseEvent;
    }>;
    /**
     * Handle link click
     */
    private handleClick;
    private static readonly PASS_THROUGH_ATTRS;
    /**
     * Get the CSS classes based on component props
     */
    private getLinkClasses;
    render(): any;
}
