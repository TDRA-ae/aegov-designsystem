import { Component, Host, h, Prop, Element, State, Listen, Event, EventEmitter, Watch, Method } from '@stencil/core';
import { DATEPICKER_MODES, INPUT_SIZES, FORM_VARIANTS } from '../../utils/types';
import type {
  DatepickerMode, DatepickerPreset, DatepickerChangeDetail, DatepickerMonthChangeDetail, InputSize, FormVariant,
  AegovValidationDetail, AegovValidationResult, AegovValidationTrigger,
  AegovValidityState,
} from '../../utils/types';
import {
  composeDescribedBy, buildValidationDetail, synthesizeValidity, setInternalsValidity,
} from '../../utils/validation';
import type { InternalsHost } from '../../utils/validation';

/** Datepicker value type per §2.4.1 — ISO string for single, { start, end } for range. */
export type AegovDatepickerValue = string | { start: string; end: string };
import { generateCalendarGrid, getWeekdayNames, getMonthNames, getYearRange, isSameDay, isDateBetween, stripTime, isBefore, isAfter, diffDays } from './utils/calendar';
import { formatDate, parseDate, parseRangeValue, formatRangeValue } from './utils/format';
import { getPresetDefinitions, calculatePreset } from './utils/presets';
import { DATEPICKER_PORTAL_STYLES } from './utils/portal-styles';
import { generateId } from '../../utils/id-generator';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { watchResponsiveProp } from '../../utils/responsive-prop';
import type { ResponsivePropWatcher } from '../../utils/responsive-prop';
import { getPassThroughAttributes } from '../../utils/attributes';
import { isRtl } from '../../utils/rtl';

const STRINGS = {
  en: {
    selectDate: 'Select date',
    startDate: 'Start date',
    endDate: 'End date',
    required: 'Required',
    rangeMinDays: (n: number) => `Range must be at least ${n} days`,
    rangeMaxDays: (n: number) => `Range must be at most ${n} days`,
    chooseDate: 'Choose date',
    prevMonth: 'Previous month',
    nextMonth: 'Next month',
    selectMonth: 'Select month',
    selectYear: 'Select year',
    cancel: 'Cancel',
    apply: 'Apply',
    clearDate: 'Clear date',
    clearDates: 'Clear dates',
    changeDate: 'Change date',
    unavailable: 'unavailable',
  },
  ar: {
    selectDate: 'اختر التاريخ',
    startDate: 'تاريخ البدء',
    endDate: 'تاريخ الانتهاء',
    required: 'مطلوب',
    rangeMinDays: (n: number) => `يجب أن يكون النطاق ${n} أيام على الأقل`,
    rangeMaxDays: (n: number) => `يجب ألا يتجاوز النطاق ${n} أيام`,
    chooseDate: 'اختر تاريخاً',
    prevMonth: 'الشهر السابق',
    nextMonth: 'الشهر التالي',
    selectMonth: 'اختر الشهر',
    selectYear: 'اختر السنة',
    cancel: 'إلغاء',
    apply: 'تطبيق',
    clearDate: 'مسح التاريخ',
    clearDates: 'مسح التواريخ',
    changeDate: 'تغيير التاريخ',
    unavailable: 'غير متاح',
  },
};

const TAG = 'aegov-datepicker';
const ctx = (prop: string) => ({ component: TAG, prop });

// SVG icons
const CALENDAR_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`;
const CHEVRON_LEFT = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>`;
const CHEVRON_RIGHT = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>`;
const CLEAR_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
const ARROW_RIGHT = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`;

@Component({
  tag: 'aegov-datepicker',
  styleUrl: 'aegov-datepicker.css',
  scoped: true,
  formAssociated: true, // §2.5 + §7.5 spike: scoped:true + formAssociated combo verified
})
export class AegovDatepicker {
  @Element() el: HTMLElement;

  /** Native input attributes to pass through to the inner input element. */
  private static readonly PASS_THROUGH_ATTRS = new Set([
    'pattern', 'minlength', 'maxlength', 'step',
    'autocomplete', 'autofocus', 'inputmode', 'list', 'multiple',
    'accept', 'capture', 'spellcheck', 'enterkeyhint', 'title',
    'tabindex', 'form',
  ]);

  // ── Props ─────────────────────────────────────────────
  /** Selection appearance: single date or date range */
  @Prop() appearance: DatepickerMode = 'single';

  /** Pre-selected value. Single: "YYYY-MM-DD". Range: "YYYY-MM-DD / YYYY-MM-DD" */
  @Prop({ mutable: true }) value: string = '';

  /** Output format using tokens: YYYY, YY, MM, M, DD, D, MMM, MMMM, dd, ddd */
  @Prop() format: string = 'YYYY-MM-DD';

  /** Placeholder text for single mode input. Empty defaults to localized text via isRtl. */
  @Prop() placeholder: string = '';

  /** Placeholder for range start input. Empty defaults to localized text via isRtl. */
  @Prop() labelRangeStart: string = '';

  /** Placeholder for range end input. Empty defaults to localized text via isRtl. */
  @Prop() labelRangeEnd: string = '';

  /** Minimum selectable date (ISO string or "today") */
  @Prop() min: string = '';

  /** Maximum selectable date (ISO string or "today") */
  @Prop() max: string = '';

  /** Disable all future dates (shorthand for max="today") */
  @Prop() isDisableFuture: boolean = false;

  /** Week start day: 0=Sunday, 1=Monday, ...6=Saturday */
  @Prop({ attribute: 'start-day' }) startDay: number = 0;

  /** Locale for day/month names (BCP 47, e.g., 'en', 'ar', 'fr') */
  @Prop() locale: string = 'en';

  /** Minimum number of days for range selection */
  @Prop({ attribute: 'min-range' }) minRange: number = 0;

  /** Maximum number of days for range selection (0 = unlimited) */
  @Prop({ attribute: 'max-range' }) maxRange: number = 0;

  /** Comma-separated ISO dates that cannot be selected */
  @Prop() blackout: string = '';

  /** Comma-separated preset IDs for range mode (e.g., "today,last7Days,thisMonth") */
  @Prop() presets: string = '';

  /** Whether the datepicker is disabled */
  @Prop() isDisabled: boolean = false;

  /** Marks the datepicker as required for form validation. Sets `required` on the inner input. */
  @Prop() isRequired: boolean = false;

  /** Show clear button when value is set */
  @Prop() isClearable: boolean = true;

  /** Show month/year select dropdowns in header */
  @Prop() isHeaderSelectable: boolean = true;

  /** Start year for the year dropdown (default: current year - 100) */
  @Prop({ attribute: 'year-range-start' }) yearRangeStart: number = 0;

  /** End year for the year dropdown (default: current year + 100) */
  @Prop({ attribute: 'year-range-end' }) yearRangeEnd: number = 0;

  /** Show Apply/Cancel buttons for confirming selection */
  @Prop() isWithConfirmation: boolean = false;

  /** The size of the datepicker input. */
  @Prop() size: string = 'base';
  @State() private _resolvedSize: InputSize = 'base';
  private _sizeWatcher: ResponsivePropWatcher | null = null;

  /** Colour family. Drives idle ring/border, selected/checked fill, and value/accent text. Focus ring stays camel; error stays aered regardless. */
  @Prop() variant: FormVariant = 'primary';

  /** Optional unique field ID. Used by aegov-form-field for label linking + error/hint id derivation. */
  @Prop({ mutable: true, reflect: true }) fieldId?: string;

  /** Form field name for FormAssociated submission (§2.5). */
  @Prop() name?: string;

  /** Visual + a11y invalid state. See §2.3. */
  @Prop({ mutable: true, reflect: true }) isInvalid: boolean = false;

  /** Inline error message. Use `error` slot for rich markup. */
  @Prop({ mutable: true }) errorMessage: string = '';

  /** Helper hint shown below the control. Hidden when an error is shown. */
  @Prop() hint: string = '';

  // ── State ─────────────────────────────────────────────
  @State() isOpen: boolean = false;
  @State() viewMonth: number = new Date().getMonth();
  @State() viewYear: number = new Date().getFullYear();
  @State() selectedDate: Date | null = null;
  @State() rangeStart: Date | null = null;
  @State() rangeEnd: Date | null = null;
  @State() hoverDate: Date | null = null;
  @State() focusedDate: Date | null = null;
  @State() hasTriggerSlot: boolean = false;
  @State() private liveAnnouncement: string = '';

  // Pending state for confirmation mode
  @State() pendingDate: Date | null = null;
  @State() pendingRangeStart: Date | null = null;
  @State() pendingRangeEnd: Date | null = null;

  // ── Events ────────────────────────────────────────────
  @Event() aegovDatepickerChange: EventEmitter<DatepickerChangeDetail>;
  @Event() aegovDatepickerOpen: EventEmitter<void>;
  @Event() aegovDatepickerClose: EventEmitter<void>;
  @Event() aegovDatepickerClear: EventEmitter<void>;
  @Event() aegovDatepickerMonthChange: EventEmitter<DatepickerMonthChangeDetail>;

  /** Unified validation event. See §2.3. */
  @Event() aegovValidate: EventEmitter<AegovValidationDetail<AegovDatepickerValue>>;

  @State() private hasBlurredOnce: boolean = false;
  private internals: ElementInternals | null = null;
  private errorId: string = '';
  private hintId: string = '';

  private get t() {
    return isRtl(this.el) ? STRINGS.ar : STRINGS.en;
  }

  // ── Private ───────────────────────────────────────────
  private portalElement?: HTMLDivElement;
  private triggerRef?: HTMLDivElement;
  private datepickerId: string;
  private parsedUnavailableDates: Set<string> = new Set();
  private parsedPresets: DatepickerPreset[] = [];
  private mouseDownInsideComponent: boolean = false;
  private positionUpdateScheduled: boolean = false;
  private positionRetryCount: number = 0;
  private readonly MAX_POSITION_RETRIES = 10;
  private triggerElement?: HTMLElement;

  // ── Lifecycle ─────────────────────────────────────────

  componentWillLoad() {
    warnIfInvalidEnumProp(this.appearance, DATEPICKER_MODES, 'single', ctx('appearance'));
    warnIfInvalidEnumProp(this.variant, FORM_VARIANTS, 'primary', ctx('variant'));
    this._sizeWatcher = watchResponsiveProp(this.size, INPUT_SIZES, 'base', v => {
      this._resolvedSize = v as InputSize;
    });
    this._resolvedSize = this._sizeWatcher.current as InputSize;
    this.datepickerId = generateId('aegov-datepicker');
    if (!this.fieldId) {
      this.fieldId = this.datepickerId;
    }
    this.errorId = `${this.fieldId}-error`;
    this.hintId = `${this.fieldId}-hint`;

    // Manual attachInternals per §6.8 fallback
    const host = this.el as unknown as InternalsHost;
    if (typeof host.attachInternals === 'function') {
      try {
        this.internals = host.attachInternals();
      } catch {
        this.internals = null;
      }
    }
    this.hasTriggerSlot = !!this.el.querySelector('[slot="trigger"]');

    this.parseValue();
    this.parseUnavailableDates();
    this.parsePresets();
  }

  @Watch('appearance')
  onVariantChange(v: unknown) { warnIfInvalidEnumProp(v, DATEPICKER_MODES, 'single', ctx('appearance')); }

  @Watch('variant')
  onColourVariantChange(v: unknown) { warnIfInvalidEnumProp(v, FORM_VARIANTS, 'primary', ctx('variant')); }

  @Watch('size')
  onSizeChange() {
    this._sizeWatcher?.destroy();
    this._sizeWatcher = watchResponsiveProp(this.size, INPUT_SIZES, 'base', v => {
      this._resolvedSize = v as InputSize;
    });
    this._resolvedSize = this._sizeWatcher.current as InputSize;
  }

  componentDidLoad() {
    this.createPortalElement();
    this.runValidationSync();
  }

  disconnectedCallback() {
    this._sizeWatcher?.destroy();
    this.removePortalElement();
  }

  // ── FormAssociated lifecycle (§2.5 + §7.5 spike) ──
  formAssociatedCallback(_form: HTMLFormElement | null) { /* no-op */ }
  formDisabledCallback(disabled: boolean) { this.isDisabled = disabled; }
  formResetCallback() {
    this.value = '';
    this.parseValue();
    this.runValidationSync();
  }

  // ── Validation surface (Layer 1) ──

  /** Imperatively re-run validation. */
  @Method()
  async validate(trigger: AegovValidationTrigger = 'manual'): Promise<AegovValidationResult> {
    return this.runAndEmitValidation(trigger);
  }

  /** Mirror of HTMLInputElement.setCustomValidity(). */
  @Method()
  async setCustomValidity(message: string): Promise<void> {
    this.errorMessage = message;
    this.isInvalid = !!message;
    if (this.internals) {
      if (message) {
        setInternalsValidity(
          this.internals,
          synthesizeValidity({ customError: true }),
          message,
          this.triggerElement,
        );
      } else {
        setInternalsValidity(this.internals, { valid: true }, '');
      }
    }
  }

  private currentValueForDetail(): AegovDatepickerValue {
    if (this.appearance === 'range') {
      const start = this.rangeStart ? formatDate(this.rangeStart, 'YYYY-MM-DD') : '';
      const end = this.rangeEnd ? formatDate(this.rangeEnd, 'YYYY-MM-DD') : '';
      return { start, end };
    }
    return this.selectedDate ? formatDate(this.selectedDate, 'YYYY-MM-DD') : '';
  }

  private computeValidity(): { validity: AegovValidityState; message: string } {
    const hasValue = this.appearance === 'range'
      ? !!(this.rangeStart && this.rangeEnd)
      : !!this.selectedDate;
    const t = this.t;
    if (this.isRequired && !hasValue) {
      return { validity: synthesizeValidity({ valueMissing: true }), message: this.errorMessage || t.required };
    }
    if (this.appearance === 'range' && this.rangeStart && this.rangeEnd) {
      const days = diffDays(this.rangeStart, this.rangeEnd) + 1;
      if (this.minRange && days < this.minRange) {
        return { validity: synthesizeValidity({ tooShort: true }), message: this.errorMessage || t.rangeMinDays(this.minRange) };
      }
      if (this.maxRange && days > this.maxRange) {
        return { validity: synthesizeValidity({ tooLong: true }), message: this.errorMessage || t.rangeMaxDays(this.maxRange) };
      }
    }
    return { validity: synthesizeValidity({}), message: '' };
  }

  private runValidationSync() {
    const { validity, message } = this.computeValidity();
    setInternalsValidity(this.internals, validity, message, this.triggerElement);
    try {
      if (this.internals && typeof this.internals.setFormValue === 'function' && this.name) {
        if (this.appearance === 'range') {
          const fd = new FormData();
          if (this.rangeStart) fd.append(`${this.name}-start`, formatDate(this.rangeStart, 'YYYY-MM-DD'));
          if (this.rangeEnd) fd.append(`${this.name}-end`, formatDate(this.rangeEnd, 'YYYY-MM-DD'));
          this.internals.setFormValue(fd);
        } else {
          this.internals.setFormValue(this.value || '');
        }
      }
    } catch { /* ignore mock env */ }
  }

  private async runAndEmitValidation(trigger: AegovValidationTrigger): Promise<AegovValidationResult> {
    this.runValidationSync();
    const { validity, message } = this.computeValidity();
    this.aegovValidate.emit(buildValidationDetail<AegovDatepickerValue>(
      this.el as unknown as HTMLElement & { name?: string },
      this.currentValueForDetail(), validity, message, this.errorMessage || null, trigger,
    ));
    return { valid: validity.valid, message, validity };
  }

  private emitValidate(trigger: AegovValidationTrigger) {
    const { validity, message } = this.computeValidity();
    this.aegovValidate.emit(buildValidationDetail<AegovDatepickerValue>(
      this.el as unknown as HTMLElement & { name?: string },
      this.currentValueForDetail(), validity, message, this.errorMessage || null, trigger,
    ));
  }

  // ── Watchers ──────────────────────────────────────────

  @Watch('value')
  onValueChange() {
    this.parseValue();
    this.runValidationSync();
    // Emit unified validate event whenever value changes (covers all selection paths
    // — single day click, range complete, preset, apply, clear, programmatic set)
    this.emitValidate('change');
  }

  @Watch('unavailableDates')
  onUnavailableDatesChange() {
    this.parseUnavailableDates();
  }

  @Watch('presets')
  onPresetsChange() {
    this.parsePresets();
  }

  @Watch('isOpen')
  onOpenChange(newValue: boolean) {
    if (newValue) {
      this.positionRetryCount = 0;

      // Set view month/year based on selection or today
      if (this.appearance === 'single' && this.selectedDate) {
        this.viewMonth = this.selectedDate.getMonth();
        this.viewYear = this.selectedDate.getFullYear();
      } else if (this.appearance === 'range' && this.rangeStart) {
        this.viewMonth = this.rangeStart.getMonth();
        this.viewYear = this.rangeStart.getFullYear();
      } else {
        const now = new Date();
        this.viewMonth = now.getMonth();
        this.viewYear = now.getFullYear();
      }

      // Reset pending state for confirmation mode
      if (this.isWithConfirmation) {
        this.pendingDate = this.selectedDate;
        this.pendingRangeStart = this.rangeStart;
        this.pendingRangeEnd = this.rangeEnd;
      }

      this.renderPortalContent();
      this.schedulePositionUpdate();
      this.aegovDatepickerOpen.emit();
      setTimeout(() => this.announceMonthChange(), 150);
      this.triggerElement = document.activeElement as HTMLElement;

      // Move focus into the calendar: focus today, selected day, or first day
      const focusTarget = this.selectedDate || (this.appearance === 'range' && this.rangeStart ? this.rangeStart : null) || stripTime(new Date());
      this.focusedDate = focusTarget;
      this.focusDayButton(focusTarget);
    } else {
      this.hoverDate = null;
      this.focusedDate = null;
      if (this.portalElement) {
        this.portalElement.innerHTML = '';
      }
      this.positionUpdateScheduled = false;
      this.positionRetryCount = 0;
      this.aegovDatepickerClose.emit();
      if (this.triggerElement) {
        this.triggerElement.focus();
      }
    }
  }

  // ── Methods ───────────────────────────────────────────

  @Method()
  async open() {
    if (this.isDisabled) return;
    // Ensure portal is ready (may not exist if called before componentDidLoad)
    this.createPortalElement();
    this.isOpen = true;
  }

  @Method()
  async close() {
    this.isOpen = false;
  }

  @Method()
  async clear() {
    this.handleClear();
  }

  @Method()
  async getValue(): Promise<string> {
    return this.getFormattedValue();
  }

  /** Returns formatted start date string in range mode, or false if not in range mode or no start date */
  @Method()
  async getStartDate(): Promise<string | false> {
    if (this.appearance !== 'range') return false;
    return this.rangeStart ? formatDate(this.rangeStart, this.format, this.locale) : false;
  }

  /** Returns formatted end date string in range mode, or false if not in range mode or no end date */
  @Method()
  async getEndDate(): Promise<string | false> {
    if (this.appearance !== 'range') return false;
    return this.rangeEnd ? formatDate(this.rangeEnd, this.format, this.locale) : false;
  }

  /** Returns the preset ID that matches the current range selection, or false if none matches or not in range mode */
  @Method()
  async getPreset(): Promise<string | false> {
    if (this.appearance !== 'range' || !this.rangeStart || !this.rangeEnd || this.parsedPresets.length === 0) return false;
    const definitions = getPresetDefinitions(this.parsedPresets);
    for (const preset of definitions) {
      const range = preset.calculate(this.startDay);
      if (isSameDay(range.start, this.rangeStart) && isSameDay(range.end, this.rangeEnd)) {
        return preset.id;
      }
    }
    return false;
  }

  // ── Parsing ───────────────────────────────────────────

  private parseValue() {
    if (!this.value) {
      this.selectedDate = null;
      this.rangeStart = null;
      this.rangeEnd = null;
      return;
    }

    if (this.appearance === 'single') {
      this.selectedDate = parseDate(this.value, this.format, this.locale);
    } else {
      const { start, end } = parseRangeValue(this.value, this.format, this.locale);
      this.rangeStart = start;
      this.rangeEnd = end;
    }
  }

  private parseUnavailableDates() {
    this.parsedUnavailableDates = new Set();
    if (this.blackout) {
      this.blackout.split(',').forEach(d => {
        const trimmed = d.trim();
        if (trimmed) this.parsedUnavailableDates.add(trimmed);
      });
    }
  }

  private parsePresets() {
    this.parsedPresets = [];
    if (this.presets) {
      this.parsedPresets = this.presets.split(',').map(p => p.trim()).filter(Boolean) as DatepickerPreset[];
    }
  }

  // ── Date Constraints ──────────────────────────────────

  private getMinDate(): Date | null {
    if (this.min === 'today') return stripTime(new Date());
    if (this.min) return parseDate(this.min, 'YYYY-MM-DD');
    return null;
  }

  private getMaxDate(): Date | null {
    if (this.max === 'today' || this.isDisableFuture) return stripTime(new Date());
    if (this.max) return parseDate(this.max, 'YYYY-MM-DD');
    return null;
  }

  private isDateDisabled(date: Date): boolean {
    const minDate = this.getMinDate();
    const maxDate = this.getMaxDate();

    if (minDate && isBefore(date, minDate)) return true;
    if (maxDate && isAfter(date, maxDate)) return true;

    const isoStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    if (this.parsedUnavailableDates.has(isoStr)) return true;

    return false;
  }

  private isRangeSelectionInvalid(start: Date, end: Date): boolean {
    const days = diffDays(start, end) + 1; // inclusive
    if (this.minRange > 0 && days < this.minRange) return true;
    if (this.maxRange > 0 && days > this.maxRange) return true;
    return false;
  }

  // ── Formatted Value ───────────────────────────────────

  private getFormattedValue(): string {
    if (this.appearance === 'single') {
      return this.selectedDate ? formatDate(this.selectedDate, this.format, this.locale) : '';
    }
    if (this.rangeStart && this.rangeEnd) {
      return formatRangeValue(this.rangeStart, this.rangeEnd, this.format, this.locale);
    }
    return '';
  }

  private getDisplayValue(): string {
    if (this.appearance === 'single') {
      return this.selectedDate ? formatDate(this.selectedDate, this.format, this.locale) : '';
    }
    return '';
  }

  private getDisplayRangeStart(): string {
    return this.rangeStart ? formatDate(this.rangeStart, this.format, this.locale) : '';
  }

  private getDisplayRangeEnd(): string {
    return this.rangeEnd ? formatDate(this.rangeEnd, this.format, this.locale) : '';
  }

  // ── Portal Management ─────────────────────────────────

  private createPortalElement() {
    if (!this.portalElement) {
      this.portalElement = document.createElement('div');
      this.portalElement.className = 'aegov-datepicker-portal';
      document.body.appendChild(this.portalElement);
    }
  }

  private removePortalElement() {
    if (this.portalElement) {
      document.body.removeChild(this.portalElement);
      this.portalElement = undefined;
    }
  }

  @Listen('scroll', { target: 'window', passive: true })
  @Listen('resize', { target: 'window', passive: true })
  handleWindowEvents() {
    if (this.isOpen) {
      this.schedulePositionUpdate();
    }
  }

  private schedulePositionUpdate() {
    if (this.positionUpdateScheduled || !this.isOpen) return;
    this.positionUpdateScheduled = true;

    requestAnimationFrame(() => {
      if (!this.isOpen) {
        this.positionUpdateScheduled = false;
        return;
      }
      requestAnimationFrame(() => {
        if (this.isOpen) {
          this.updatePosition();
        }
        this.positionUpdateScheduled = false;
      });
    });
  }

  private updatePosition() {
    if (!this.triggerRef || !this.portalElement) return;

    const datepickerEl = this.portalElement.querySelector('.aegov-datepicker') as HTMLElement;
    if (!datepickerEl) return;

    const triggerRect = this.triggerRef.getBoundingClientRect();
    const dpRect = datepickerEl.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    // Close datepicker if trigger has scrolled out of the viewport
    if (
      triggerRect.bottom < 0 ||
      triggerRect.top > viewportHeight ||
      triggerRect.right < 0 ||
      triggerRect.left > viewportWidth
    ) {
      this.close();
      return;
    }

    if (dpRect.width === 0 || dpRect.height === 0) {
      if (this.positionRetryCount < this.MAX_POSITION_RETRIES) {
        this.positionRetryCount++;
        requestAnimationFrame(() => this.updatePosition());
      }
      return;
    }

    const gap = 8;
    let top: number;
    let openAbove = false;

    // Prefer below, flip to above if not enough space
    if (triggerRect.bottom + gap + dpRect.height > viewportHeight && triggerRect.top - gap - dpRect.height > 0) {
      top = triggerRect.top - dpRect.height - gap;
      openAbove = true;
    } else {
      top = triggerRect.bottom + gap;
    }

    // Align start (left in LTR, right in RTL)
    let left = triggerRect.left;

    // Keep within viewport
    if (left + dpRect.width > viewportWidth - 8) {
      left = viewportWidth - dpRect.width - 8;
    }
    if (left < 8) left = 8;
    if (top < 8) top = 8;

    datepickerEl.style.top = `${top}px`;
    datepickerEl.style.left = `${left}px`;

    // Add visible class after positioning
    datepickerEl.classList.add('datepicker--visible');
    if (openAbove) {
      datepickerEl.classList.add('datepicker--above');
    }
  }

  // ── Portal Content Rendering ──────────────────────────

  private renderPortalContent() {
    if (!this.portalElement) return;

    this.portalElement.innerHTML = '';

    // Inject styles
    const styleEl = document.createElement('style');
    styleEl.textContent = DATEPICKER_PORTAL_STYLES;
    this.portalElement.appendChild(styleEl);

    // Main container
    const container = document.createElement('div');
    const variant: FormVariant = (FORM_VARIANTS as readonly string[]).includes(this.variant) ? this.variant : 'primary';
    container.className = `aegov-datepicker datepicker-variant-${variant}`;
    container.id = this.datepickerId;
    const dialogTitleId = `${this.datepickerId}-title`;
    container.setAttribute('role', 'dialog');
    container.setAttribute('aria-modal', 'true');
    container.setAttribute('aria-labelledby', dialogTitleId);
    container.setAttribute('tabindex', '-1');

    // Visually hidden dialog title for screen readers (updated on month navigation)
    const dialogTitle = document.createElement('div');
    dialogTitle.id = dialogTitleId;
    dialogTitle.className = 'datepicker__dialog-title';
    const monthNamesForTitle = getMonthNames(this.locale);
    let titleText = `${monthNamesForTitle[this.viewMonth]} ${this.viewYear}`;
    if (this.appearance === 'range') {
      let sm = this.viewMonth + 1;
      let sy = this.viewYear;
      if (sm > 11) { sm = 0; sy++; }
      titleText += ` – ${monthNamesForTitle[sm]} ${sy}`;
    }
    dialogTitle.textContent = titleText;
    container.appendChild(dialogTitle);

    // Live region for announcements
    const liveRegion = document.createElement('div');
    liveRegion.className = 'datepicker__live-region';
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    container.appendChild(liveRegion);

    // Presets sidebar (range mode only)
    if (this.appearance === 'range' && this.parsedPresets.length > 0) {
      container.appendChild(this.buildPresetsPanel());
    }

    // Calendar body
    const body = document.createElement('div');
    body.className = 'datepicker__body';

    const calendars = document.createElement('div');
    calendars.className = 'datepicker__calendars';

    // First (or only) calendar
    calendars.appendChild(this.buildCalendarMonth(this.viewYear, this.viewMonth, true));

    // Second calendar for range mode
    if (this.appearance === 'range') {
      let secondMonth = this.viewMonth + 1;
      let secondYear = this.viewYear;
      if (secondMonth > 11) {
        secondMonth = 0;
        secondYear++;
      }
      calendars.appendChild(this.buildCalendarMonth(secondYear, secondMonth, false));
    }

    body.appendChild(calendars);

    // Confirmation footer
    if (this.isWithConfirmation) {
      body.appendChild(this.buildConfirmationFooter());
    }

    container.appendChild(body);
    this.portalElement.appendChild(container);
  }

  private buildPresetsPanel(): HTMLElement {
    const panel = document.createElement('div');
    panel.className = 'datepicker__presets';

    const definitions = getPresetDefinitions(this.parsedPresets);

    definitions.forEach(preset => {
      const btn = document.createElement('button');
      btn.className = 'datepicker__preset-btn';
      btn.type = 'button';
      btn.textContent = preset.label;

      // Check if this preset matches current selection
      let isActivePreset = false;
      if (this.rangeStart && this.rangeEnd) {
        const range = preset.calculate(this.startDay);
        if (isSameDay(range.start, this.rangeStart) && isSameDay(range.end, this.rangeEnd)) {
          btn.classList.add('preset--active');
          isActivePreset = true;
        }
      }

      btn.setAttribute('aria-pressed', isActivePreset ? 'true' : 'false');
      btn.addEventListener('click', () => this.handlePresetClick(preset.id));
      panel.appendChild(btn);
    });

    return panel;
  }

  private buildCalendarMonth(year: number, month: number, showNavigation: boolean): HTMLElement {
    const calendar = document.createElement('div');
    calendar.className = 'datepicker__calendar';

    // ── Header ──────────────────────────────────────────────────────────────
    const header = document.createElement('div');
    header.className = 'datepicker__header';

    if (showNavigation) {
      const prevBtn = document.createElement('button');
      prevBtn.className = 'datepicker__nav-btn';
      prevBtn.type = 'button';
      prevBtn.innerHTML = CHEVRON_LEFT;
      prevBtn.setAttribute('aria-label', this.t.prevMonth);
      prevBtn.addEventListener('click', () => this.navigateMonth(-1));
      header.appendChild(prevBtn);
    }

    const selects = document.createElement('div');
    selects.className = 'datepicker__selects';

    if (this.isHeaderSelectable) {
      const monthSelect = document.createElement('select');
      monthSelect.className = 'datepicker__select';
      monthSelect.setAttribute('aria-label', this.t.selectMonth);
      const monthNamesLocal = getMonthNames(this.locale);
      monthNamesLocal.forEach((name, i) => {
        const opt = document.createElement('option');
        opt.value = String(i);
        opt.textContent = name;
        if (i === month) opt.selected = true;
        monthSelect.appendChild(opt);
      });
      monthSelect.addEventListener('change', (e) => {
        const target = e.target as HTMLSelectElement;
        this.handleMonthSelect(parseInt(target.value, 10), showNavigation);
      });
      selects.appendChild(monthSelect);

      const yearSelect = document.createElement('select');
      yearSelect.className = 'datepicker__select';
      yearSelect.setAttribute('aria-label', this.t.selectYear);
      const years = this.yearRangeStart && this.yearRangeEnd
        ? Array.from({ length: this.yearRangeEnd - this.yearRangeStart + 1 }, (_, i) => this.yearRangeStart + i)
        : getYearRange(year, 100);
      years.forEach(y => {
        const opt = document.createElement('option');
        opt.value = String(y);
        opt.textContent = String(y);
        if (y === year) opt.selected = true;
        yearSelect.appendChild(opt);
      });
      yearSelect.addEventListener('change', (e) => {
        const target = e.target as HTMLSelectElement;
        this.handleYearSelect(parseInt(target.value, 10), showNavigation);
      });
      selects.appendChild(yearSelect);
    } else {
      const label = document.createElement('span');
      label.className = 'datepicker__month-label';
      const monthNamesLocal = getMonthNames(this.locale);
      label.textContent = `${monthNamesLocal[month]} ${year}`;
      selects.appendChild(label);
    }

    header.appendChild(selects);

    const isLastCalendar = this.appearance === 'single' ? showNavigation : !showNavigation;
    if (isLastCalendar) {
      const nextBtn = document.createElement('button');
      nextBtn.className = 'datepicker__nav-btn';
      nextBtn.type = 'button';
      nextBtn.innerHTML = CHEVRON_RIGHT;
      nextBtn.setAttribute('aria-label', this.t.nextMonth);
      nextBtn.addEventListener('click', () => this.navigateMonth(1));
      header.appendChild(nextBtn);
    }

    calendar.appendChild(header);

    // ── Grid (weekday headers + days) ──────────────────────────────────────
    const monthNames = getMonthNames(this.locale);
    const grid = document.createElement('div');
    grid.className = 'datepicker__grid';
    grid.setAttribute('role', 'grid');
    grid.setAttribute('aria-label', `${monthNames[month]} ${year}`);

    // Weekday header row (role="row" with role="columnheader" cells)
    const shortNames = getWeekdayNames(this.locale, this.startDay, 'short');
    const longNames = getWeekdayNames(this.locale, this.startDay, 'long');

    const weekdayRow = document.createElement('div');
    weekdayRow.setAttribute('role', 'row');
    weekdayRow.className = 'datepicker__row';

    shortNames.forEach((shortName, i) => {
      const th = document.createElement('div');
      th.setAttribute('role', 'columnheader');
      th.className = 'datepicker__weekday';
      th.setAttribute('abbr', longNames[i]);
      const abbr = document.createElement('abbr');
      abbr.title = longNames[i];
      abbr.textContent = shortName;
      th.appendChild(abbr);
      weekdayRow.appendChild(th);
    });
    grid.appendChild(weekdayRow);

    // Focus target for roving tabindex initialisation
    const focusTarget = this.focusedDate ||
      (this.appearance === 'single' ? this.selectedDate : this.rangeStart) ||
      stripTime(new Date());

    const calendarGrid = generateCalendarGrid(year, month, this.startDay);
    const todayDate = stripTime(new Date());

    const activeSelectedDate = this.isWithConfirmation ? this.pendingDate : this.selectedDate;
    const activeRangeStart = this.isWithConfirmation ? this.pendingRangeStart : this.rangeStart;
    const activeRangeEnd = this.isWithConfirmation ? this.pendingRangeEnd : this.rangeEnd;

    let isHoverRangeInvalid = false;
    if (this.appearance === 'range' && activeRangeStart && !activeRangeEnd && this.hoverDate && (this.minRange > 0 || this.maxRange > 0)) {
      const previewStart = isBefore(this.hoverDate, activeRangeStart) ? this.hoverDate : activeRangeStart;
      const previewEnd = isBefore(this.hoverDate, activeRangeStart) ? activeRangeStart : this.hoverDate;
      isHoverRangeInvalid = this.isRangeSelectionInvalid(previewStart, previewEnd);
    }

    calendarGrid.forEach(week => {
      const row = document.createElement('div');
      row.setAttribute('role', 'row');
      row.className = 'datepicker__row';

      week.forEach(date => {
        const isoDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        const isOutside = date.getMonth() !== month;
        const isToday = isSameDay(date, todayDate);
        const isDisabled = this.isDateDisabled(date);

        // Gridcell wrapper — aria-selected lives here per ARIA grid pattern
        const cell = document.createElement('div');
        cell.setAttribute('role', 'gridcell');
        cell.className = 'datepicker__cell';

        // Hide outside-month cells from assistive technology
        if (isOutside) {
          cell.setAttribute('aria-hidden', 'true');
        }

        // Day button
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'datepicker__day';
        btn.textContent = String(date.getDate());
        btn.setAttribute('data-date', isoDate);
        btn.setAttribute('aria-label', this.buildFullDateLabel(date, isDisabled));

        // Roving tabindex: only focused/selected day is in tab order
        const isFocusTarget = !isOutside &&
          isSameDay(date, focusTarget) &&
          date.getMonth() === month &&
          date.getFullYear() === year;
        btn.setAttribute('tabindex', isFocusTarget ? '0' : '-1');

        // Selection state
        let isSelected = false;
        let isRangeStart = false;
        let isRangeEnd = false;
        let isInRange = false;

        if (this.appearance === 'single') {
          isSelected = activeSelectedDate ? isSameDay(date, activeSelectedDate) : false;
        } else {
          if (activeRangeStart) isRangeStart = isSameDay(date, activeRangeStart);
          if (activeRangeEnd) isRangeEnd = isSameDay(date, activeRangeEnd);
          if (activeRangeStart && activeRangeEnd) {
            isInRange = isDateBetween(date, activeRangeStart, activeRangeEnd);
          } else if (activeRangeStart && !activeRangeEnd && this.hoverDate) {
            isInRange = isDateBetween(date, activeRangeStart, this.hoverDate);
            if (isSameDay(date, this.hoverDate) && !isSameDay(date, activeRangeStart)) {
              if (isAfter(this.hoverDate, activeRangeStart)) {
                isRangeEnd = true;
              } else {
                isRangeStart = true;
              }
            }
          }
        }

        if (isOutside) btn.classList.add('datepicker__day--outside');
        if (isToday) btn.classList.add('datepicker__day--today');
        if (isSelected) btn.classList.add('datepicker__day--selected');
        if (isRangeStart) btn.classList.add('datepicker__day--range-start');
        if (isRangeEnd) btn.classList.add('datepicker__day--range-end');
        if (isInRange) btn.classList.add('datepicker__day--in-range');
        if (isHoverRangeInvalid && (isRangeStart || isRangeEnd || isInRange)) {
          btn.classList.add('datepicker__day--range-invalid');
        }
        if (isDisabled) {
          btn.classList.add('datepicker__day--disabled');
          btn.setAttribute('aria-disabled', 'true');
          btn.disabled = true;
        }
        if (isToday) btn.setAttribute('aria-current', 'date');

        // aria-selected on gridcell (not button) per WAI-ARIA grid pattern
        if (isSelected || isRangeStart || isRangeEnd) {
          cell.setAttribute('aria-selected', 'true');
        }

        if (!isDisabled && !isOutside) {
          btn.addEventListener('click', () => this.handleDayClick(date));
          btn.addEventListener('mouseenter', () => this.handleDayHover(date));
        }

        cell.appendChild(btn);
        row.appendChild(cell);
      });

      grid.appendChild(row);
    });

    calendar.appendChild(grid);
    return calendar;
  }

  private buildConfirmationFooter(): HTMLElement {
    const footer = document.createElement('div');
    footer.className = 'datepicker__footer';

    const cancelBtn = document.createElement('button');
    cancelBtn.type = 'button';
    cancelBtn.className = 'datepicker__footer-btn datepicker__footer-btn--cancel';
    cancelBtn.textContent = this.t.cancel;
    cancelBtn.setAttribute('aria-label', this.t.cancel);
    cancelBtn.addEventListener('click', () => this.handleCancel());

    const applyBtn = document.createElement('button');
    applyBtn.type = 'button';
    applyBtn.className = 'datepicker__footer-btn datepicker__footer-btn--apply';
    applyBtn.textContent = this.t.apply;
    applyBtn.setAttribute('aria-label', this.t.apply);
    applyBtn.addEventListener('click', () => this.handleApply());

    footer.appendChild(cancelBtn);
    footer.appendChild(applyBtn);
    return footer;
  }

  // ── Event Handlers ────────────────────────────────────

  private handleTriggerClick = () => {
    if (!this.isDisabled) {
      this.isOpen = !this.isOpen;
    }
  };

  private handleDayClick(date: Date) {
    if (this.isDateDisabled(date)) return;

    if (this.appearance === 'single') {
      if (this.isWithConfirmation) {
        this.pendingDate = date;
        this.updateDayClasses();
      } else {
        this.selectedDate = date;
        this.value = formatDate(date, this.format, this.locale);
        this.aegovDatepickerChange.emit({
          value: this.value,
          date: this.selectedDate,
        });
        this.announceHostLive(this.buildFullDateLabel(date, false));
        this.isOpen = false;
      }
    } else {
      this.handleRangeDayClick(date);
    }
  }

  private handleRangeDayClick(date: Date) {
    const activeStart = this.isWithConfirmation ? this.pendingRangeStart : this.rangeStart;
    const activeEnd = this.isWithConfirmation ? this.pendingRangeEnd : this.rangeEnd;

    if (!activeStart || (activeStart && activeEnd)) {
      // First click or reset
      if (this.isWithConfirmation) {
        this.pendingRangeStart = date;
        this.pendingRangeEnd = null;
      } else {
        this.rangeStart = date;
        this.rangeEnd = null;
      }
      this.hoverDate = null;
      // Lightweight update — no full portal rebuild needed
      this.updateDayClasses();
    } else {
      // Second click - complete range
      let start = activeStart;
      let end = date;

      // Swap if end is before start
      if (isBefore(end, start)) {
        [start, end] = [end, start];
      }

      // Validate range limits
      if (this.isRangeSelectionInvalid(start, end)) {
        return; // Don't complete selection if invalid
      }

      if (this.isWithConfirmation) {
        this.pendingRangeStart = start;
        this.pendingRangeEnd = end;
        // Lightweight update for confirmation mode
        this.updateDayClasses();
      } else {
        this.rangeStart = start;
        this.rangeEnd = end;
        this.value = formatRangeValue(start, end, this.format, this.locale);
        this.aegovDatepickerChange.emit({
          value: this.value,
          date: null,
          startDate: this.rangeStart,
          endDate: this.rangeEnd,
        });
        this.isOpen = false;
      }
    }
  }

  private handleDayHover(date: Date) {
    if (this.appearance !== 'range') return;
    const activeStart = this.isWithConfirmation ? this.pendingRangeStart : this.rangeStart;
    const activeEnd = this.isWithConfirmation ? this.pendingRangeEnd : this.rangeEnd;

    if (activeStart && !activeEnd) {
      // Skip if hovering the same date (prevents infinite rebuild loops)
      if (this.hoverDate && isSameDay(this.hoverDate, date)) return;
      this.hoverDate = date;
      // Lightweight class update — no full portal rebuild
      this.updateDayClasses();
    }
  }

  private handlePresetClick(presetId: DatepickerPreset) {
    const range = calculatePreset(presetId, this.startDay);
    if (!range) return;

    if (this.isWithConfirmation) {
      this.pendingRangeStart = range.start;
      this.pendingRangeEnd = range.end;
      this.viewMonth = range.start.getMonth();
      this.viewYear = range.start.getFullYear();
      this.renderPortalContent();
      this.schedulePositionUpdate();
    } else {
      this.rangeStart = range.start;
      this.rangeEnd = range.end;
      this.value = formatRangeValue(range.start, range.end, this.format, this.locale);
      this.aegovDatepickerChange.emit({
        value: this.value,
        date: null,
        startDate: this.rangeStart,
        endDate: this.rangeEnd,
      });
      this.isOpen = false;
    }
  }

  private handleApply() {
    if (this.appearance === 'single' && this.pendingDate) {
      this.selectedDate = this.pendingDate;
      this.value = formatDate(this.selectedDate, this.format, this.locale);
      this.aegovDatepickerChange.emit({
        value: this.value,
        date: this.selectedDate,
      });
      this.announceHostLive(this.buildFullDateLabel(this.selectedDate, false));
    } else if (this.appearance === 'range' && this.pendingRangeStart && this.pendingRangeEnd) {
      this.rangeStart = this.pendingRangeStart;
      this.rangeEnd = this.pendingRangeEnd;
      this.value = formatRangeValue(this.rangeStart, this.rangeEnd, this.format, this.locale);
      this.aegovDatepickerChange.emit({
        value: this.value,
        date: null,
        startDate: this.rangeStart,
        endDate: this.rangeEnd,
      });
      const startLabel = this.buildFullDateLabel(this.rangeStart, false);
      const endLabel = this.buildFullDateLabel(this.rangeEnd, false);
      this.announceHostLive(`${startLabel} to ${endLabel}`);
    }
    this.isOpen = false;
  }

  private handleCancel() {
    this.pendingDate = null;
    this.pendingRangeStart = null;
    this.pendingRangeEnd = null;
    this.isOpen = false;
  }

  private handleClear() {
    this.selectedDate = null;
    this.rangeStart = null;
    this.rangeEnd = null;
    this.value = '';
    this.aegovDatepickerClear.emit();
    this.aegovDatepickerChange.emit({
      value: '',
      date: null,
      startDate: null,
      endDate: null,
    });
  }

  private navigateMonth(delta: number) {
    let newMonth = this.viewMonth + delta;
    let newYear = this.viewYear;

    if (newMonth > 11) {
      newMonth = 0;
      newYear++;
    } else if (newMonth < 0) {
      newMonth = 11;
      newYear--;
    }

    this.viewMonth = newMonth;
    this.viewYear = newYear;
    this.focusedDate = this.clampFocusToMonth(newYear, newMonth);

    this.aegovDatepickerMonthChange.emit({ month: newMonth, year: newYear });
    this.refreshCalendars();
    this.schedulePositionUpdate();

    // Announce change
    this.announceMonthChange();
  }

  private handleMonthSelect(month: number, isPrimary: boolean) {
    if (isPrimary) {
      this.viewMonth = month;
    } else {
      // Right calendar changed: set viewMonth to one before
      let m = month - 1;
      let y = this.viewYear;
      if (m < 0) { m = 11; y--; }
      this.viewMonth = m;
      this.viewYear = y;
    }
    this.focusedDate = this.clampFocusToMonth(this.viewYear, this.viewMonth);
    this.aegovDatepickerMonthChange.emit({ month: this.viewMonth, year: this.viewYear });
    this.refreshCalendars();
    this.schedulePositionUpdate();
    this.announceMonthChange();
  }

  private handleYearSelect(year: number, isPrimary: boolean) {
    if (isPrimary) {
      this.viewYear = year;
    } else {
      this.viewYear = year;
    }
    this.focusedDate = this.clampFocusToMonth(this.viewYear, this.viewMonth);
    this.aegovDatepickerMonthChange.emit({ month: this.viewMonth, year: this.viewYear });
    this.refreshCalendars();
    this.schedulePositionUpdate();
    this.announceMonthChange();
  }

  /** Keep the same day-of-month when navigating to a new month, clamped to the last valid day. */
  private clampFocusToMonth(year: number, month: number): Date {
    const current = this.focusedDate || this.selectedDate || stripTime(new Date());
    const lastDay = new Date(year, month + 1, 0).getDate();
    return new Date(year, month, Math.min(current.getDate(), lastDay));
  }

  private announceMonthChange() {
    const monthNames = getMonthNames(this.locale);
    this.announceLive(`${monthNames[this.viewMonth]} ${this.viewYear}`);
  }

  /**
   * Lightweight month refresh — replaces only the .datepicker__calendars element
   * in the existing portal DOM, leaving the style tag, dialog container, live
   * region, presets panel, and footer all intact. This prevents the full teardown
   * + rebuild that renderPortalContent() does, which caused a visible blink when
   * navigating between months.
   */
  private refreshCalendars() {
    if (!this.portalElement) return;
    const container = this.portalElement.querySelector('.aegov-datepicker');
    if (!container) { this.renderPortalContent(); return; }

    // Update dialog title in place
    const dialogTitle = container.querySelector('.datepicker__dialog-title');
    if (dialogTitle) {
      const monthNames = getMonthNames(this.locale);
      let titleText = `${monthNames[this.viewMonth]} ${this.viewYear}`;
      if (this.appearance === 'range') {
        let sm = this.viewMonth + 1;
        let sy = this.viewYear;
        if (sm > 11) { sm = 0; sy++; }
        titleText += ` – ${monthNames[sm]} ${sy}`;
      }
      dialogTitle.textContent = titleText;
    }

    // Swap only the calendars container
    const oldCalendars = container.querySelector('.datepicker__calendars');
    if (!oldCalendars) { this.renderPortalContent(); return; }

    const newCalendars = document.createElement('div');
    newCalendars.className = 'datepicker__calendars';
    newCalendars.appendChild(this.buildCalendarMonth(this.viewYear, this.viewMonth, true));

    if (this.appearance === 'range') {
      let secondMonth = this.viewMonth + 1;
      let secondYear = this.viewYear;
      if (secondMonth > 11) { secondMonth = 0; secondYear++; }
      newCalendars.appendChild(this.buildCalendarMonth(secondYear, secondMonth, false));
    }

    oldCalendars.parentElement!.replaceChild(newCalendars, oldCalendars);
  }

  private announceLive(message: string) {
    // Portal live region for month/year announcements
    if (!this.portalElement) return;
    const liveRegion = this.portalElement.querySelector('.datepicker__live-region');
    if (!liveRegion) return;
    liveRegion.textContent = '';
    requestAnimationFrame(() => {
      if (liveRegion) liveRegion.textContent = message;
    });
  }

  private announceHostLive(message: string) {
    // Host live region for selection announcements (survives portal close)
    this.liveAnnouncement = '';
    setTimeout(() => { this.liveAnnouncement = message; }, 0);
  }

  private getDialogFocusable(): HTMLElement[] {
    if (!this.portalElement) return [];
    const selector = 'button:not([disabled]):not([tabindex="-1"]), select:not([disabled])';
    return Array.from(this.portalElement.querySelectorAll(selector)) as HTMLElement[];
  }

  private buildFullDateLabel(date: Date, isDisabled: boolean): string {
    const label = new Intl.DateTimeFormat(this.locale, {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    }).format(date);
    return isDisabled ? `${label}, ${this.t.unavailable}` : label;
  }

  private focusFirstOfWeek() {
    const current = this.focusedDate || this.selectedDate || stripTime(new Date());
    const dayOfWeek = current.getDay();
    const daysFromStart = (dayOfWeek - this.startDay + 7) % 7;
    const first = new Date(current);
    first.setDate(current.getDate() - daysFromStart);
    this.focusedDate = first;
    if (first.getMonth() !== this.viewMonth || first.getFullYear() !== this.viewYear) {
      this.viewMonth = first.getMonth();
      this.viewYear = first.getFullYear();
      this.refreshCalendars();
      this.schedulePositionUpdate();
    } else {
      this.updateFocusedDay(first);
    }
    this.focusDayButton(first);
  }

  private focusLastOfWeek() {
    const current = this.focusedDate || this.selectedDate || stripTime(new Date());
    const dayOfWeek = current.getDay();
    const daysFromStart = (dayOfWeek - this.startDay + 7) % 7;
    const last = new Date(current);
    last.setDate(current.getDate() + (6 - daysFromStart));
    this.focusedDate = last;
    if (last.getMonth() !== this.viewMonth || last.getFullYear() !== this.viewYear) {
      this.viewMonth = last.getMonth();
      this.viewYear = last.getFullYear();
      this.refreshCalendars();
      this.schedulePositionUpdate();
    } else {
      this.updateFocusedDay(last);
    }
    this.focusDayButton(last);
  }

  // ── Keyboard Navigation ───────────────────────────────

  @Listen('mousedown', { target: 'document' })
  handleDocumentMouseDown(event: MouseEvent) {
    // Record whether mousedown happened inside our component or portal BEFORE
    // any click handlers run and potentially rebuild the portal DOM.
    // This is robust because mousedown fires before the click event.
    // Must always track — even when calendar is closed — because the trigger click
    // that opens the calendar also bubbles to handleDocumentClick.
    const target = event.target as Node;
    this.mouseDownInsideComponent = (
      this.el.contains(target) ||
      (!!this.portalElement && this.portalElement.contains(target))
    );
  }

  @Listen('click', { target: 'document' })
  handleDocumentClick(event: MouseEvent) {
    if (!this.isOpen) return;

    // If mousedown originated inside our component or portal, this is not
    // an outside click — even if the DOM was rebuilt and the target is now detached.
    if (this.mouseDownInsideComponent) {
      this.mouseDownInsideComponent = false;
      return;
    }

    // Fallback: check composedPath for programmatic clicks (element.click())
    // which don't fire mousedown. composedPath preserves the original path
    // even after DOM elements are removed/rebuilt.
    const path = event.composedPath();
    const clickedInsideComponent = path.some((el: EventTarget) => {
      if (el instanceof Node) {
        return this.el.contains(el) || (!!this.portalElement && this.portalElement.contains(el));
      }
      return false;
    });

    if (clickedInsideComponent) return;

    if (this.isWithConfirmation) {
      this.handleCancel();
    } else {
      this.isOpen = false;
    }
  }

  @Listen('keydown', { target: 'document' })
  handleKeyDown(event: KeyboardEvent) {
    if (!this.isOpen) {
      if ((event.key === 'Enter' || event.key === ' ') && this.el.contains(event.target as Node)) {
        event.preventDefault();
        this.isOpen = true;
      }
      return;
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      if (this.isWithConfirmation) {
        this.handleCancel();
      } else {
        this.isOpen = false;
      }
      return;
    }

    const target = event.target as Node;
    const focusInsideComponent = this.el.contains(target) || (!!this.portalElement && this.portalElement.contains(target));
    if (!focusInsideComponent) return;

    // Focus trap: Tab/Shift+Tab cycles only within the dialog
    if (event.key === 'Tab') {
      const focusable = this.getDialogFocusable();
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement;
      if (event.shiftKey) {
        if (active === first || !focusable.includes(active)) {
          event.preventDefault();
          last.focus();
        }
      } else {
        if (active === last || !focusable.includes(active)) {
          event.preventDefault();
          first.focus();
        }
      }
      return;
    }

    const rtl = isRtl(this.el);

    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault();
        this.moveFocus(rtl ? 1 : -1);
        break;
      case 'ArrowRight':
        event.preventDefault();
        this.moveFocus(rtl ? -1 : 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.moveFocus(-7);
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.moveFocus(7);
        break;
      case 'PageUp':
        event.preventDefault();
        if (event.shiftKey) {
          this.moveFocusMonths(-12);
        } else {
          this.moveFocusMonths(-1);
        }
        break;
      case 'PageDown':
        event.preventDefault();
        if (event.shiftKey) {
          this.moveFocusMonths(12);
        } else {
          this.moveFocusMonths(1);
        }
        break;
      case 'Home':
        event.preventDefault();
        this.focusFirstOfWeek();
        break;
      case 'End':
        event.preventDefault();
        this.focusLastOfWeek();
        break;
      case 'Enter':
      case ' ': {
        const targetEl = event.target as HTMLElement;
        const tag = targetEl?.tagName;
        if (tag === 'SELECT' || (tag === 'BUTTON' && !targetEl.classList.contains('datepicker__day'))) {
          return;
        }
        event.preventDefault();
        if (this.focusedDate) {
          this.handleDayClick(this.focusedDate);
        }
        break;
      }
    }
  }

  private moveFocus(days: number) {
    const current = this.focusedDate || this.selectedDate || stripTime(new Date());
    const next = new Date(current);
    next.setDate(next.getDate() + days);

    const needsMonthChange = next.getMonth() !== this.viewMonth || next.getFullYear() !== this.viewYear;

    this.focusedDate = next;

    if (needsMonthChange) {
      this.viewMonth = next.getMonth();
      this.viewYear = next.getFullYear();
      this.refreshCalendars();
      this.schedulePositionUpdate();
    } else {
      // Same month: lightweight update — just move the focused class
      this.updateFocusedDay(next);
    }

    this.focusDayButton(next);
  }

  private moveFocusMonths(months: number) {
    const current = this.focusedDate || this.selectedDate || stripTime(new Date());
    const next = new Date(current);
    next.setMonth(next.getMonth() + months);

    this.focusedDate = next;
    this.viewMonth = next.getMonth();
    this.viewYear = next.getFullYear();

    this.refreshCalendars();
    this.schedulePositionUpdate();
    this.focusDayButton(next);
  }

  private dateToIso(date: Date): string {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }

  private findDayButton(date: Date): HTMLButtonElement | null {
    if (!this.portalElement) return null;
    return this.portalElement.querySelector(`.datepicker__day[data-date="${this.dateToIso(date)}"]`);
  }

  /**
   * Lightweight update of selection/range/hover classes on all day buttons.
   * Avoids full portal rebuild which causes mouseenter loops and outside-click issues.
   */
  private updateDayClasses() {
    if (!this.portalElement) return;

    const activeRangeStart = this.isWithConfirmation ? this.pendingRangeStart : this.rangeStart;
    const activeRangeEnd = this.isWithConfirmation ? this.pendingRangeEnd : this.rangeEnd;
    const activeSelectedDate = this.isWithConfirmation ? this.pendingDate : this.selectedDate;

    // Determine if the hover preview range is invalid (min/max range violation)
    let isHoverRangeInvalid = false;
    if (this.appearance === 'range' && activeRangeStart && !activeRangeEnd && this.hoverDate && (this.minRange > 0 || this.maxRange > 0)) {
      const previewStart = isBefore(this.hoverDate, activeRangeStart) ? this.hoverDate : activeRangeStart;
      const previewEnd = isBefore(this.hoverDate, activeRangeStart) ? activeRangeStart : this.hoverDate;
      isHoverRangeInvalid = this.isRangeSelectionInvalid(previewStart, previewEnd);
    }

    const buttons = this.portalElement.querySelectorAll('.datepicker__day');
    buttons.forEach((btn: HTMLButtonElement) => {
      const iso = btn.getAttribute('data-date');
      if (!iso) return;
      const [y, m, d] = iso.split('-').map(Number);
      const date = new Date(y, m - 1, d);

      // Remove all dynamic selection classes
      btn.classList.remove(
        'datepicker__day--selected',
        'datepicker__day--range-start',
        'datepicker__day--range-end',
        'datepicker__day--in-range',
        'datepicker__day--range-invalid',
      );
      const cell = btn.parentElement;
      if (cell) cell.removeAttribute('aria-selected');

      if (this.appearance === 'single') {
        if (activeSelectedDate && isSameDay(date, activeSelectedDate)) {
          btn.classList.add('datepicker__day--selected');
          if (cell) cell.setAttribute('aria-selected', 'true');
        }
      } else {
        let isRangeStart = false;
        let isRangeEnd = false;
        let isInRange = false;

        if (activeRangeStart) isRangeStart = isSameDay(date, activeRangeStart);
        if (activeRangeEnd) isRangeEnd = isSameDay(date, activeRangeEnd);

        if (activeRangeStart && activeRangeEnd) {
          isInRange = isDateBetween(date, activeRangeStart, activeRangeEnd);
        } else if (activeRangeStart && !activeRangeEnd && this.hoverDate) {
          isInRange = isDateBetween(date, activeRangeStart, this.hoverDate);
          if (isSameDay(date, this.hoverDate) && !isSameDay(date, activeRangeStart)) {
            if (isAfter(this.hoverDate, activeRangeStart)) {
              isRangeEnd = true;
            } else {
              isRangeStart = true;
            }
          }
        }

        if (isRangeStart) {
          btn.classList.add('datepicker__day--range-start');
          if (cell) cell.setAttribute('aria-selected', 'true');
        }
        if (isRangeEnd) {
          btn.classList.add('datepicker__day--range-end');
          if (cell) cell.setAttribute('aria-selected', 'true');
        }
        if (isInRange) btn.classList.add('datepicker__day--in-range');

        // Apply invalid class to all days in the hover preview range
        if (isHoverRangeInvalid && (isRangeStart || isRangeEnd || isInRange)) {
          btn.classList.add('datepicker__day--range-invalid');
        }
      }
    });
  }

  private updateFocusedDay(date: Date) {
    if (!this.portalElement) return;
    const prev = this.portalElement.querySelector('.datepicker__day--focused');
    if (prev) {
      prev.classList.remove('datepicker__day--focused');
      prev.setAttribute('tabindex', '-1');
    }
    const btn = this.findDayButton(date);
    if (btn) {
      btn.classList.add('datepicker__day--focused');
      btn.setAttribute('tabindex', '0');
    }
  }

  private focusDayButton(date: Date) {
    if (!this.portalElement) return;
    requestAnimationFrame(() => {
      if (!this.portalElement) return;
      // Reset all day buttons to tabindex -1
      const allDayBtns = this.portalElement.querySelectorAll('.datepicker__day');
      allDayBtns.forEach(b => {
        b.classList.remove('datepicker__day--focused');
        b.setAttribute('tabindex', '-1');
      });
      const btn = this.findDayButton(date);
      if (btn) {
        btn.classList.add('datepicker__day--focused');
        btn.setAttribute('tabindex', '0');
        btn.focus();
      }
    });
  }

  // ── Render ────────────────────────────────────────────

  private renderSingleTrigger(passThroughAttrs: Record<string, string>) {
    const displayValue = this.getDisplayValue();
    const hasValue = !!displayValue;
    const placeholder = this.placeholder || this.t.selectDate;

    return (
      <div class={`datepicker__input-wrapper datepicker__input-wrapper--${this._resolvedSize}`}>
        <input
          type="text"
          class="datepicker__input"
          {...passThroughAttrs}
          value={displayValue}
          placeholder={placeholder}
          readOnly
          disabled={this.isDisabled}
          required={this.isRequired}
          aria-required={this.isRequired ? 'true' : undefined}
          aria-haspopup="dialog"
          aria-expanded={this.isOpen.toString()}
          aria-controls={this.isOpen ? this.datepickerId : undefined}
          aria-label={this.selectedDate
            ? `${this.t.changeDate}, ${new Intl.DateTimeFormat(this.locale, { dateStyle: 'long' }).format(this.selectedDate)}`
            : placeholder}
          aria-describedby={`${this.fieldId}-format-hint`}
        />
        <span id={`${this.fieldId}-format-hint`} class="datepicker__sr-only">{this.format}</span>
        {hasValue && this.isClearable && !this.isDisabled && (
          <button
            type="button"
            class="datepicker__clear-btn"
            onClick={(e: MouseEvent) => { e.stopPropagation(); this.handleClear(); }}
            aria-label={this.t.clearDate}
            innerHTML={CLEAR_ICON}
          />
        )}
        <span class="datepicker__icon" aria-hidden="true" innerHTML={CALENDAR_ICON} />
      </div>
    );
  }

  private renderRangeTrigger(passThroughAttrs: Record<string, string>) {
    const startValue = this.getDisplayRangeStart();
    const endValue = this.getDisplayRangeEnd();
    const hasValue = !!(startValue || endValue);
    const labelStart = this.labelRangeStart || this.t.startDate;
    const labelEnd = this.labelRangeEnd || this.t.endDate;

    return (
      <div class={`datepicker__input-wrapper datepicker__input-wrapper--${this._resolvedSize} datepicker__input-wrapper--range`}>
        <input
          type="text"
          class="datepicker__input datepicker__input--range-start"
          {...passThroughAttrs}
          value={startValue}
          placeholder={labelStart}
          readOnly
          disabled={this.isDisabled}
          required={this.isRequired}
          aria-required={this.isRequired ? 'true' : undefined}
          aria-label={labelStart}
          aria-haspopup="dialog"
          aria-expanded={this.isOpen.toString()}
          aria-controls={this.isOpen ? this.datepickerId : undefined}
        />
        <span class="datepicker__range-separator" aria-hidden="true" innerHTML={ARROW_RIGHT} />
        <input
          type="text"
          class="datepicker__input datepicker__input--range-end"
          {...passThroughAttrs}
          value={endValue}
          placeholder={labelEnd}
          readOnly
          disabled={this.isDisabled}
          required={this.isRequired}
          aria-required={this.isRequired ? 'true' : undefined}
          aria-label={labelEnd}
          aria-haspopup="dialog"
          aria-expanded={this.isOpen.toString()}
          aria-controls={this.isOpen ? this.datepickerId : undefined}
        />
        {hasValue && this.isClearable && !this.isDisabled && (
          <button
            type="button"
            class="datepicker__clear-btn"
            onClick={(e: MouseEvent) => { e.stopPropagation(); this.handleClear(); }}
            aria-label={this.t.clearDates}
            innerHTML={CLEAR_ICON}
          />
        )}
        <span class="datepicker__icon" aria-hidden="true" innerHTML={CALENDAR_ICON} />
      </div>
    );
  }

  render() {
    const mode: DatepickerMode = (DATEPICKER_MODES as readonly string[]).includes(this.appearance) ? this.appearance : 'single';
    const passThroughAttrs = getPassThroughAttributes(this.el, AegovDatepicker.PASS_THROUGH_ATTRS);
    delete passThroughAttrs['aria-invalid'];
    delete passThroughAttrs['aria-describedby'];

    const hasErrorSlot = !!this.el.querySelector('[slot="error"]');
    const hasHintSlot = !!this.el.querySelector('[slot="hint"]');
    const showError = this.isInvalid && (hasErrorSlot || !!this.errorMessage);
    const showHint = !showError && (hasHintSlot || !!this.hint);
    const announceError = showError && this.hasBlurredOnce;

    const errorRegion = showError ? (
      <div
        id={this.errorId}
        class="aegov-datepicker__error"
        role={announceError ? 'alert' : null}
        aria-live={announceError ? 'polite' : null}
      >
        {hasErrorSlot ? <slot name="error" /> : this.errorMessage}
      </div>
    ) : null;
    const hintRegion = showHint ? (
      <div id={this.hintId} class="aegov-datepicker__hint">
        {hasHintSlot ? <slot name="hint" /> : this.hint}
      </div>
    ) : null;

    const variant: FormVariant = (FORM_VARIANTS as readonly string[]).includes(this.variant) ? this.variant : 'primary';
    return (
      <Host class={{ 'is-invalid': this.isInvalid, [`datepicker-variant-${variant}`]: true }}>
        <div
          class="datepicker__trigger"
          ref={(el) => (this.triggerRef = el)}
          onClick={this.handleTriggerClick}
          onBlur={() => { this.hasBlurredOnce = true; this.emitValidate('blur'); }}
          aria-invalid={this.isInvalid ? 'true' : null}
          aria-describedby={composeDescribedBy(
            this.el.getAttribute('aria-describedby'),
            showError ? this.errorId : null,
            showHint ? this.hintId : null,
          )}
        >
          {this.hasTriggerSlot ? (
            <slot name="trigger" />
          ) : mode === 'range' ? (
            this.renderRangeTrigger(passThroughAttrs)
          ) : (
            this.renderSingleTrigger(passThroughAttrs)
          )}
        </div>
        {errorRegion}
        {hintRegion}
        <div
          aria-live="polite"
          aria-atomic="true"
          class="datepicker__sr-only"
        >
          {this.liveAnnouncement}
        </div>
      </Host>
    );
  }
}
