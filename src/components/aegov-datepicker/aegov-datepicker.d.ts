import { EventEmitter } from '@stencil/core';
import type { DatepickerMode, DatepickerChangeDetail, DatepickerMonthChangeDetail } from '../../utils/types';
export declare class AegovDatepicker {
    el: HTMLElement;
    /** Native input attributes to pass through to the inner input element. */
    private static readonly PASS_THROUGH_ATTRS;
    /** Selection variant: single date or date range */
    variant: DatepickerMode;
    /** Pre-selected value. Single: "YYYY-MM-DD". Range: "YYYY-MM-DD / YYYY-MM-DD" */
    value: string;
    /** Output format using tokens: YYYY, YY, MM, M, DD, D, MMM, MMMM, dd, ddd */
    format: string;
    /** Placeholder text for single mode input */
    placeholder: string;
    /** Placeholder for range start input */
    labelRangeStart: string;
    /** Placeholder for range end input */
    labelRangeEnd: string;
    /** Minimum selectable date (ISO string or "today") */
    min: string;
    /** Maximum selectable date (ISO string or "today") */
    max: string;
    /** Disable all future dates (shorthand for max="today") */
    isDisableFuture: boolean;
    /** Week start day: 0=Sunday, 1=Monday, ...6=Saturday */
    startDay: number;
    /** Locale for day/month names (BCP 47, e.g., 'en', 'ar', 'fr') */
    locale: string;
    /** Minimum number of days for range selection */
    minRange: number;
    /** Maximum number of days for range selection (0 = unlimited) */
    maxRange: number;
    /** Comma-separated ISO dates that cannot be selected */
    blackout: string;
    /** Comma-separated preset IDs for range mode (e.g., "today,last7Days,thisMonth") */
    presets: string;
    /** Whether the datepicker is disabled */
    isDisabled: boolean;
    /** Marks the datepicker as required for form validation. Sets `required` on the inner input. */
    isRequired: boolean;
    /** Show clear button when value is set */
    isClearable: boolean;
    /** Show month/year select dropdowns in header */
    isHeaderSelectable: boolean;
    /** Start year for the year dropdown (default: current year - 100) */
    yearRangeStart: number;
    /** End year for the year dropdown (default: current year + 100) */
    yearRangeEnd: number;
    /** Show Apply/Cancel buttons for confirming selection */
    isWithConfirmation: boolean;
    /** The size of the datepicker input. */
    size: string;
    private _resolvedSize;
    private _sizeWatcher;
    isOpen: boolean;
    viewMonth: number;
    viewYear: number;
    selectedDate: Date | null;
    rangeStart: Date | null;
    rangeEnd: Date | null;
    hoverDate: Date | null;
    focusedDate: Date | null;
    hasTriggerSlot: boolean;
    pendingDate: Date | null;
    pendingRangeStart: Date | null;
    pendingRangeEnd: Date | null;
    aegovDatepickerChange: EventEmitter<DatepickerChangeDetail>;
    aegovDatepickerOpen: EventEmitter<void>;
    aegovDatepickerClose: EventEmitter<void>;
    aegovDatepickerClear: EventEmitter<void>;
    aegovDatepickerMonthChange: EventEmitter<DatepickerMonthChangeDetail>;
    private portalElement?;
    private triggerRef?;
    private datepickerId;
    private parsedUnavailableDates;
    private parsedPresets;
    private mouseDownInsideComponent;
    private positionUpdateScheduled;
    private positionRetryCount;
    private readonly MAX_POSITION_RETRIES;
    private triggerElement?;
    componentWillLoad(): void;
    onVariantChange(v: unknown): void;
    onSizeChange(): void;
    componentDidLoad(): void;
    disconnectedCallback(): void;
    onValueChange(): void;
    onUnavailableDatesChange(): void;
    onPresetsChange(): void;
    onOpenChange(newValue: boolean): void;
    open(): Promise<void>;
    close(): Promise<void>;
    clear(): Promise<void>;
    getValue(): Promise<string>;
    /** Returns formatted start date string in range mode, or false if not in range mode or no start date */
    getStartDate(): Promise<string | false>;
    /** Returns formatted end date string in range mode, or false if not in range mode or no end date */
    getEndDate(): Promise<string | false>;
    /** Returns the preset ID that matches the current range selection, or false if none matches or not in range mode */
    getPreset(): Promise<string | false>;
    private parseValue;
    private parseUnavailableDates;
    private parsePresets;
    private getMinDate;
    private getMaxDate;
    private isDateDisabled;
    private isRangeSelectionInvalid;
    private getFormattedValue;
    private getDisplayValue;
    private getDisplayRangeStart;
    private getDisplayRangeEnd;
    private createPortalElement;
    private removePortalElement;
    handleWindowEvents(): void;
    private schedulePositionUpdate;
    private updatePosition;
    private renderPortalContent;
    private buildPresetsPanel;
    private buildCalendarMonth;
    private buildConfirmationFooter;
    private handleTriggerClick;
    private handleDayClick;
    private handleRangeDayClick;
    private handleDayHover;
    private handlePresetClick;
    private handleApply;
    private handleCancel;
    private handleClear;
    private navigateMonth;
    private handleMonthSelect;
    private handleYearSelect;
    private announceMonthChange;
    handleDocumentMouseDown(event: MouseEvent): void;
    handleDocumentClick(event: MouseEvent): void;
    handleKeyDown(event: KeyboardEvent): void;
    private moveFocus;
    private moveFocusMonths;
    private focusFirstOfMonth;
    private focusLastOfMonth;
    private dateToIso;
    private findDayButton;
    /**
     * Lightweight update of selection/range/hover classes on all day buttons.
     * Avoids full portal rebuild which causes mouseenter loops and outside-click issues.
     */
    private updateDayClasses;
    private updateFocusedDay;
    private focusDayButton;
    private renderSingleTrigger;
    private renderRangeTrigger;
    render(): any;
}
