import type { ProgressCounter } from '../../utils/types';
export declare class AegovProgress {
    el: HTMLElement;
    /** Unique ID for the native progress element. Auto-generated if not provided. */
    fieldId?: string;
    /** Current value. When not set, shows indeterminate state. */
    value?: number;
    /** Maximum value. */
    max: number;
    /**
     * Height using Tailwind spacing scale (1, 1.5, 2, 2.5, 3, 3.5, 4, etc.).
     * Each unit = 0.25rem. Default "2" = h-2 = 0.5rem (8px).
     */
    height: string;
    /** Counter placement. Hidden when not set. */
    counter?: ProgressCounter;
    /** Suffix appended directly to the counter value. No automatic spacing. */
    counterSuffix: string;
    /** Description text displayed below the progress bar. */
    description?: string;
    /** Additional CSS classes. */
    extraClass?: string;
    private static readonly PASS_THROUGH_ATTRS;
    componentWillLoad(): void;
    private getHeightRem;
    private getPercent;
    private isIndeterminate;
    render(): any;
}
