import type { TitleHeadingType } from '../../utils/types';
/**
 * @slot default - The title content
 */
export declare class AegovTitle {
    el: HTMLElement;
    /**
     * Unique ID for the title element. Auto-generated if not provided.
     */
    fieldId?: string;
    /**
     * The size of the title text.
     * @default 'base'
     */
    size: string;
    private _resolvedSize;
    private _sizeWatcher;
    /**
     * The semantic wrapper tag for the title. When set, renders the title
     * inside the specified heading tag (`h2`–`h6`) or a `p`. When omitted,
     * the title renders as a `<p>` (default).
     */
    headingType?: TitleHeadingType;
    /**
     * Additional CSS classes to apply to the title.
     */
    extraClass?: string;
    componentWillLoad(): void;
    disconnectedCallback(): void;
    onSizeChange(): void;
    /**
     * Get the CSS classes based on component props
     */
    private getTitleClasses;
    render(): any;
}
