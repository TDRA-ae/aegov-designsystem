/**
 * A separator component for visually dividing sections of content
 *
 * @slot - Optional text label displayed at the center of the separator
 */
export declare class AegovSeparator {
    el: HTMLElement;
    /**
     * Orientation of the separator
     * @default 'horizontal'
     */
    orientation: 'horizontal' | 'vertical';
    /**
     * Visual appearance of the separator
     * @default 'default'
     */
    appearance: 'default' | 'subtle';
    /**
     * Optional text label displayed at the center of the separator
     */
    text?: string;
    /**
     * Whether the separator is purely decorative (no semantic meaning)
     * @default true
     */
    isDecorative: boolean;
    /**
     * Additional CSS classes merged onto the inner separator element.
     */
    extraClass?: string;
    render(): any;
}
