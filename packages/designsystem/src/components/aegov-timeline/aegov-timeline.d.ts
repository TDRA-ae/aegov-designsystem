import type { TimelineVariant, TimelineOrientation } from '../../utils/types';
export declare class AegovTimeline {
    el: HTMLElement;
    /**
     * Unique ID for the timeline nav element. Auto-generated if not provided.
     */
    fieldId?: string;
    /**
     * Visual variant: default (numbered circles) or compact (dots).
     */
    variant: TimelineVariant;
    /**
     * Size of step indicators.
     */
    size: string;
    private _resolvedSize;
    private _sizeWatcher;
    /**
     * Layout orientation.
     */
    orientation: TimelineOrientation;
    private getDirectChildren;
    updateSteps(): void;
    componentWillLoad(): void;
    onVariantChange(v: unknown): void;
    disconnectedCallback(): void;
    onSizeChange(): void;
    onOrientationChange(v: unknown): void;
    componentDidLoad(): void;
    componentDidUpdate(): void;
    render(): any;
}
