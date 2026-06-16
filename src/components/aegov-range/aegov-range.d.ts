import { EventEmitter } from '@stencil/core';
import type { RangeDisplay, RangeOrientation, RangeMode } from '../../utils/types';
export declare class AegovRange {
    el: HTMLElement;
    /** Unique ID for the native range input element. Auto-generated if not provided. */
    fieldId?: string;
    /** The name attribute for the range. */
    name?: string;
    /** Current value (single mode). */
    value: number;
    /** Low thumb value (range mode). */
    valueLow: number;
    /** High thumb value (range mode). */
    valueHigh: number;
    /** Minimum value. */
    min: number;
    /** Maximum value. */
    max: number;
    /** Step increment. */
    step: number;
    /** Size of the range track. Thumb remains constant. */
    size: string;
    private _resolvedSize;
    private _sizeWatcher;
    /** Value display mode. */
    display: RangeDisplay;
    /** Layout orientation. */
    orientation: RangeOrientation;
    /** Single thumb or dual thumb (range selection). */
    mode: RangeMode;
    /** Whether the range is disabled. */
    isDisabled: boolean;
    /** Whether the range is required. */
    isRequired: boolean;
    /** Optional label text. */
    label?: string;
    /** Additional CSS classes. */
    extraClass?: string;
    activeThumb: 'single' | 'low' | 'high' | null;
    /** Emitted during drag on every value update. */
    aegovRangeInput: EventEmitter<{
        value?: number;
        valueLow?: number;
        valueHigh?: number;
    }>;
    /** Emitted on release (value committed). */
    aegovRangeChange: EventEmitter<{
        value?: number;
        valueLow?: number;
        valueHigh?: number;
    }>;
    private trackWrapperEl?;
    componentWillLoad(): void;
    disconnectedCallback(): void;
    onSizeChange(): void;
    onDisplayChange(v: unknown): void;
    onOrientationChange(v: unknown): void;
    onModeChange(v: unknown): void;
    private static readonly PASS_THROUGH_ATTRS;
    private getPercent;
    private snapToStep;
    private emitInput;
    private emitChange;
    private handleSingleInput;
    private handleSingleChange;
    private handleLowInput;
    private handleLowChange;
    private handleHighInput;
    private handleHighChange;
    private updateValueFromPointer;
    private focusNativeInput;
    private handleThumbMouseDown;
    private handleThumbTouchStart;
    private handleTrackClick;
    private renderThumb;
    render(): any;
}
