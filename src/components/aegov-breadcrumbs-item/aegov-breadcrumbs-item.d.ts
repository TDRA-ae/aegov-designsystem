import { EventEmitter } from '@stencil/core';
import type { LinkTarget, BreadcrumbSeparator } from '../../utils/types';
/**
 * Breadcrumb item component
 *
 * **⚠️ IMPORTANT:** This component must be used inside `<aegov-breadcrumbs>` component.
 * Do not use this component standalone.
 *
 * @internal This component is designed to work only as a child of aegov-breadcrumbs
 * @slot - Content of the breadcrumb item
 */
export declare class AegovBreadcrumbsItem {
    el: HTMLElement;
    slotContent: string;
    hasElementChildren: boolean;
    /**
     * The URL that the breadcrumb item links to.
     * If not provided, the item will be rendered as plain text (current page).
     */
    href?: string;
    /**
     * Where to open the linked document
     */
    target: LinkTarget;
    /**
     * Whether this is the last/current item in the breadcrumb trail
     * @internal - Set automatically by parent component
     */
    isLast: boolean;
    /**
     * Maximum length for text before truncation
     * @internal - Set automatically by parent component
     */
    maxLength?: number;
    /**
     * Separator type to display after this item
     * @internal - Set automatically by parent component
     */
    separator: BreadcrumbSeparator;
    /**
     * Whether to add schema.org microdata
     * @internal - Set automatically by parent component
     */
    isMicrodata: boolean;
    /**
     * Position in the breadcrumb list (1-indexed) for microdata
     * @internal - Set automatically by parent component
     */
    position: number;
    /**
     * Emitted when the breadcrumb item is clicked
     */
    aegovBreadcrumbItemClick: EventEmitter<{
        href?: string;
        event: MouseEvent;
    }>;
    componentWillLoad(): void;
    handlePropChange(): void;
    private handleClick;
    private truncateText;
    private static readonly PASS_THROUGH_ATTRS;
    private renderSeparator;
    render(): any;
}
