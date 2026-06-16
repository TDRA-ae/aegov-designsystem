import { AccordionIcon } from '../../utils/types';
/**
 * Accordion component for collapsible content sections
 *
 * @slot - Accordion items (aegov-accordion-item elements)
 */
export declare class AegovAccordion {
    el: HTMLElement;
    private itemListeners;
    private cachedItems;
    /**
     * Unique ID for the accordion wrapper element. Auto-generated if not provided.
     */
    fieldId?: string;
    /**
     * Whether multiple accordion items can be open at the same time
     */
    isMultiple: boolean;
    /**
     * Index of the accordion item to open by default (0-based)
     */
    defaultOpen?: number;
    /**
     * Icon style for accordion items
     */
    icon: AccordionIcon;
    /**
     * Whether to show border around the accordion
     */
    isBordered: boolean;
    /**
     * Size of the accordion items — controls heading font size.
     * sm = 14px, base = 16px (default), lg = 18px
     */
    size: string;
    private _resolvedSize;
    private _sizeWatcher;
    componentWillLoad(): void;
    componentDidLoad(): void;
    disconnectedCallback(): void;
    onIconChange(v: unknown): void;
    onSizeChange(): void;
    private refreshItemCache;
    private syncItemProps;
    private removeEventListeners;
    private setupEventListeners;
    render(): any;
}
