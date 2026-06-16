/**
 * @slot default - The text content
 */
export declare class AegovText {
    el: HTMLElement;
    /**
     * The size of the text.
     * @default 'base'
     */
    size: string;
    private _resolvedSize;
    private _sizeWatcher;
    /**
     * Additional CSS classes to apply to the text.
     */
    extraClass?: string;
    componentWillLoad(): void;
    disconnectedCallback(): void;
    onSizeChange(): void;
    /**
     * Get the CSS classes based on component props
     */
    private getTextClasses;
    render(): any;
}
