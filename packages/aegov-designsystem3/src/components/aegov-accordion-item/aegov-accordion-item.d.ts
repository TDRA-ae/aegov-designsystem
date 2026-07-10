import { EventEmitter } from '@stencil/core';
import { AccordionIcon, AccordionSize } from '../../utils/types';
/**
 * Accordion item component
 *
 * **⚠️ IMPORTANT:** This component must be used inside `<aegov-accordion>` component.
 * Do not use this component standalone.
 *
 * @internal This component is designed to work only as a child of aegov-accordion
 * @slot accordion-item-heading - Heading content for the accordion item
 * @slot accordion-item-content - Content that expands/collapses
 */
export declare class AegovAccordionItem {
    el: HTMLElement;
    contentHeight: number;
    hasHeadingSlot: boolean;
    private contentEl?;
    private resizeObserver?;
    private itemId;
    /**
     * Heading text for the accordion item (alternative to using the slot)
     * Note: If both heading property and slot are provided, the slot takes precedence
     */
    heading?: string;
    /**
     * Whether the accordion item is open
     * @internal - Set automatically by parent component
     */
    isOpen: boolean;
    /**
     * Whether the accordion item is disabled
     */
    isDisabled: boolean;
    /**
     * Icon style for the accordion item
     * @internal - Set automatically by parent component
     */
    icon: AccordionIcon;
    /**
     * Whether this is the first accordion item
     * @internal - Set automatically by parent component
     */
    isFirst: boolean;
    /**
     * Whether this is the last accordion item
     * @internal - Set automatically by parent component
     */
    isLast: boolean;
    /**
     * Size of the accordion item — controls heading font size.
     * @internal - Set automatically by parent component
     */
    size: AccordionSize;
    /**
     * Emitted when the accordion item is toggled
     */
    aegovAccordionItemToggle: EventEmitter<{
        open: boolean;
    }>;
    componentWillLoad(): void;
    componentDidLoad(): void;
    disconnectedCallback(): void;
    handleOpenChange(): void;
    private updateContentHeight;
    private handleToggle;
    private handleKeyDown;
    render(): any;
}
