import type { BlockquoteAppearance } from '../../utils/types';
/**
 * @slot - Blockquote content
 * @part blockquote - The native blockquote element
 */
export declare class AegovBlockquote {
    el: HTMLElement;
    /**
     * The blockquote appearance style
     * @default 'primary'
     */
    appearance: BlockquoteAppearance;
    /**
     * The citation source
     */
    cite?: string;
    /**
     * The author source
     */
    author?: string;
    /**
     * The author's title/position
     */
    authorTitle?: string;
    /**
     * Additional CSS classes merged onto the inner blockquote element.
     */
    extraClass?: string;
    componentWillLoad(): void;
    onAppearanceChange(v: unknown): void;
    /**
     * Get the CSS classes based on component props
     */
    private getBlockquoteClasses;
    /**
     * Get the CSS classes based on component props for the Author and title
     */
    private getBlockquoteFooterClasses;
    render(): any;
}
