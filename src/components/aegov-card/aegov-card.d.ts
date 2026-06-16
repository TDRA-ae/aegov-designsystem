import type { CardBorderWidth, CardBg, CardHover, CardBorderStyle, CardSize } from '../../utils/types';
export declare class AegovCard {
    el: HTMLElement;
    /**
     * Unique ID for the card element. Auto-generated if not provided.
     */
    fieldId?: string;
    /**
     * Whether to apply inner padding (1.5rem / 24px). On by default.
     */
    isPadding: boolean;
    /**
     * Border thickness: 1, 2, or 3.
     */
    borderWidth: CardBorderWidth;
    /**
     * Border style: 'standard' (solid primary-600), 'light' (solid primary-200), 'creative' (gradient from primary-400 to primary-800), or 'highlight' (solid aeblack-200 at rest, transitions to primary-300→700 gradient on hover).
     */
    borderStyle: CardBorderStyle;
    /**
     * Background style: 'white' (default) or 'subtle' (aeblack-50).
     */
    bg: CardBg;
    /**
     * Hover effect: 'off' (none), 'standard' (border color change), or 'glow' (shadow glow).
     */
    hover: CardHover;
    /**
     * Size: 'sm' (compact padding/radius), 'base' (default), or 'lg' (generous padding/radius). All sizes scale down responsively at md (768px) and xs (480px) breakpoints.
     */
    size: CardSize;
    componentWillLoad(): void;
    onBorderStyleChange(v: unknown): void;
    onBgChange(v: unknown): void;
    onHoverChange(v: unknown): void;
    onSizeChange(v: unknown): void;
    render(): any;
}
