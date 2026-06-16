import type { BreadcrumbSeparator } from '../../utils/types';
/**
 * @slot - Breadcrumb items (aegov-breadcrumbs-item elements)
 */
export declare class AegovBreadcrumbs {
    el: HTMLElement;
    /**
     * Unique ID for the breadcrumbs nav element. Auto-generated if not provided.
     */
    fieldId?: string;
    /**
     * The separator style to use between breadcrumb items
     */
    separator: BreadcrumbSeparator;
    /**
     * Maximum number of characters before truncating breadcrumb item text.
     * If not set, text will not be truncated.
     */
    maxLength?: number;
    /**
     * Whether to add schema.org microdata for structured data
     * @default false
     */
    isMicrodata: boolean;
    componentWillLoad(): void;
    onSeparatorChange(v: unknown): void;
    componentDidLoad(): void;
    componentDidUpdate(): void;
    updateItems(): void;
    render(): any;
}
