import { AspectRatioPreset, AspectRatioFit } from '../../utils/types';
/**
 * @component aegov-aspect-ratio
 * @description A layout component that enforces a specific aspect ratio on its
 * content. Supports images, videos, iframes, and arbitrary slotted content.
 * The `ratio` prop supports Tailwind-style breakpoint prefixes — e.g.
 * `ratio="square md:video lg:21/9"` switches the ratio at each breakpoint.
 */
export declare class AegovAspectRatio {
    el: HTMLElement;
    /**
     * The aspect ratio to apply. Accepts named presets (`'auto'`, `'square'`,
     * `'video'`) or any custom ratio string such as `'5/4'`, `'21/9'`,
     * `'2.35/1'`. Supports a Tailwind-style responsive string with breakpoint
     * prefixes, e.g. `"square md:video lg:21/9"`.
     * @default 'auto'
     */
    ratio: AspectRatioPreset | string;
    /**
     * How slotted media (img, video, iframe) should fit within the aspect
     * ratio container.
     * @default 'cover'
     */
    fit: AspectRatioFit;
    /**
     * Additional CSS classes merged onto the inner aspect-ratio container.
     */
    extraClass?: string;
    private _resolvedRatio;
    private _ratioWatcher;
    componentWillLoad(): void;
    disconnectedCallback(): void;
    onFitChange(v: unknown): void;
    onRatioChange(): void;
    private resolveRatio;
    render(): any;
}
