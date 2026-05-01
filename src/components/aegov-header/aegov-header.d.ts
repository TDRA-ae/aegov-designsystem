import type { HeaderVariant } from '../../utils/types';
export declare class AegovHeader {
    /**
     * The variant of the header. Determines the layout and style.
     * - "ministry": Header for ministry-level entities
     * - "authority": Header for authority-level entities
     */
    el: HTMLElement;
    variant: HeaderVariant;
    /** The name of the government entity. Required. */
    entityName: string;
    /** The domain/URL of the government entity. Required. */
    entityDomain: string;
    /** The CSS selector or ID of the main content container to skip to (e.g. "#main-content"). When provided, renders a "Skip to content" link before the header for keyboard accessibility. */
    skipContentContainer: string;
    headerExpanded: boolean;
    private triggerEl;
    private expandedEl;
    private closeButtonEl;
    private skipLinkEl;
    private primeTextEn;
    private primeTextAr;
    private accessibilityTextEn;
    private accessibilityTextAr;
    private languageTextEn;
    private languageTextAr;
    private learnMoreTextEn;
    private learnMoreTextAr;
    private closeTextEn;
    private closeTextAr;
    private officialTextEn;
    private officialTextAr;
    componentWillLoad(): void;
    onVariantChange(v: unknown): void;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private createSkipLink;
    handleExpandedChange(newValue: boolean): void;
    handleKeyDown(event: KeyboardEvent): void;
    private toggleHeaderExpanded;
    private isRtl;
    render(): any;
}
