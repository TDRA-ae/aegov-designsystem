var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AegovDatepicker_1;
import { Component, Host, h, Prop, Element, State, Listen, Event, Watch, Method } from '@stencil/core';
import { DATEPICKER_MODES, INPUT_SIZES } from '../../utils/types';
import { generateCalendarGrid, getWeekdayNames, getMonthNames, getYearRange, isSameDay, isDateBetween, stripTime, isBefore, isAfter, diffDays } from './utils/calendar';
import { formatDate, parseDate, parseRangeValue, formatRangeValue } from './utils/format';
import { getPresetDefinitions, calculatePreset } from './utils/presets';
import { DATEPICKER_PORTAL_STYLES } from './utils/portal-styles';
import { generateId } from '../../utils/id-generator';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { watchResponsiveProp } from '../../utils/responsive-prop';
import { getPassThroughAttributes } from '../../utils/attributes';
const TAG = 'aegov-datepicker';
const ctx = (prop) => ({ component: TAG, prop });
// SVG icons
const CALENDAR_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`;
const CHEVRON_LEFT = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m15 18-6-6 6-6"/></svg>`;
const CHEVRON_RIGHT = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6"/></svg>`;
const CLEAR_ICON = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
const ARROW_RIGHT = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>`;
let AegovDatepicker = AegovDatepicker_1 = class AegovDatepicker {
    constructor() {
        // ── Props ─────────────────────────────────────────────
        /** Selection variant: single date or date range */
        this.variant = 'single';
        /** Pre-selected value. Single: "YYYY-MM-DD". Range: "YYYY-MM-DD / YYYY-MM-DD" */
        this.value = '';
        /** Output format using tokens: YYYY, YY, MM, M, DD, D, MMM, MMMM, dd, ddd */
        this.format = 'YYYY-MM-DD';
        /** Placeholder text for single mode input */
        this.placeholder = 'Select date';
        /** Placeholder for range start input */
        this.labelRangeStart = 'Start date';
        /** Placeholder for range end input */
        this.labelRangeEnd = 'End date';
        /** Minimum selectable date (ISO string or "today") */
        this.min = '';
        /** Maximum selectable date (ISO string or "today") */
        this.max = '';
        /** Disable all future dates (shorthand for max="today") */
        this.isDisableFuture = false;
        /** Week start day: 0=Sunday, 1=Monday, ...6=Saturday */
        this.startDay = 0;
        /** Locale for day/month names (BCP 47, e.g., 'en', 'ar', 'fr') */
        this.locale = 'en';
        /** Minimum number of days for range selection */
        this.minRange = 0;
        /** Maximum number of days for range selection (0 = unlimited) */
        this.maxRange = 0;
        /** Comma-separated ISO dates that cannot be selected */
        this.blackout = '';
        /** Comma-separated preset IDs for range mode (e.g., "today,last7Days,thisMonth") */
        this.presets = '';
        /** Whether the datepicker is disabled */
        this.isDisabled = false;
        /** Marks the datepicker as required for form validation. Sets `required` on the inner input. */
        this.isRequired = false;
        /** Show clear button when value is set */
        this.isClearable = true;
        /** Show month/year select dropdowns in header */
        this.isHeaderSelectable = true;
        /** Start year for the year dropdown (default: current year - 100) */
        this.yearRangeStart = 0;
        /** End year for the year dropdown (default: current year + 100) */
        this.yearRangeEnd = 0;
        /** Show Apply/Cancel buttons for confirming selection */
        this.isWithConfirmation = false;
        /** The size of the datepicker input. */
        this.size = 'base';
        this._resolvedSize = 'base';
        this._sizeWatcher = null;
        // ── State ─────────────────────────────────────────────
        this.isOpen = false;
        this.viewMonth = new Date().getMonth();
        this.viewYear = new Date().getFullYear();
        this.selectedDate = null;
        this.rangeStart = null;
        this.rangeEnd = null;
        this.hoverDate = null;
        this.focusedDate = null;
        this.hasTriggerSlot = false;
        // Pending state for confirmation mode
        this.pendingDate = null;
        this.pendingRangeStart = null;
        this.pendingRangeEnd = null;
        this.parsedUnavailableDates = new Set();
        this.parsedPresets = [];
        this.mouseDownInsideComponent = false;
        this.positionUpdateScheduled = false;
        this.positionRetryCount = 0;
        this.MAX_POSITION_RETRIES = 10;
        // ── Event Handlers ────────────────────────────────────
        this.handleTriggerClick = () => {
            if (!this.isDisabled) {
                this.isOpen = !this.isOpen;
            }
        };
    }
    // ── Lifecycle ─────────────────────────────────────────
    componentWillLoad() {
        warnIfInvalidEnumProp(this.variant, DATEPICKER_MODES, 'single', ctx('variant'));
        this._sizeWatcher = watchResponsiveProp(this.size, INPUT_SIZES, 'base', v => {
            this._resolvedSize = v;
        });
        this._resolvedSize = this._sizeWatcher.current;
        this.datepickerId = generateId('aegov-datepicker');
        this.hasTriggerSlot = !!this.el.querySelector('[slot="trigger"]');
        this.parseValue();
        this.parseUnavailableDates();
        this.parsePresets();
    }
    onVariantChange(v) { warnIfInvalidEnumProp(v, DATEPICKER_MODES, 'single', ctx('variant')); }
    onSizeChange() {
        var _a;
        (_a = this._sizeWatcher) === null || _a === void 0 ? void 0 : _a.destroy();
        this._sizeWatcher = watchResponsiveProp(this.size, INPUT_SIZES, 'base', v => {
            this._resolvedSize = v;
        });
        this._resolvedSize = this._sizeWatcher.current;
    }
    componentDidLoad() {
        this.createPortalElement();
    }
    disconnectedCallback() {
        var _a;
        (_a = this._sizeWatcher) === null || _a === void 0 ? void 0 : _a.destroy();
        this.removePortalElement();
    }
    // ── Watchers ──────────────────────────────────────────
    onValueChange() {
        this.parseValue();
    }
    onUnavailableDatesChange() {
        this.parseUnavailableDates();
    }
    onPresetsChange() {
        this.parsePresets();
    }
    onOpenChange(newValue) {
        if (newValue) {
            this.positionRetryCount = 0;
            // Set view month/year based on selection or today
            if (this.variant === 'single' && this.selectedDate) {
                this.viewMonth = this.selectedDate.getMonth();
                this.viewYear = this.selectedDate.getFullYear();
            }
            else if (this.variant === 'range' && this.rangeStart) {
                this.viewMonth = this.rangeStart.getMonth();
                this.viewYear = this.rangeStart.getFullYear();
            }
            else {
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
            this.triggerElement = document.activeElement;
            // Move focus into the calendar: focus today, selected day, or first day
            const focusTarget = this.selectedDate || (this.variant === 'range' && this.rangeStart ? this.rangeStart : null) || stripTime(new Date());
            this.focusedDate = focusTarget;
            this.focusDayButton(focusTarget);
        }
        else {
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
    async open() {
        if (this.isDisabled)
            return;
        // Ensure portal is ready (may not exist if called before componentDidLoad)
        this.createPortalElement();
        this.isOpen = true;
    }
    async close() {
        this.isOpen = false;
    }
    async clear() {
        this.handleClear();
    }
    async getValue() {
        return this.getFormattedValue();
    }
    /** Returns formatted start date string in range mode, or false if not in range mode or no start date */
    async getStartDate() {
        if (this.variant !== 'range')
            return false;
        return this.rangeStart ? formatDate(this.rangeStart, this.format, this.locale) : false;
    }
    /** Returns formatted end date string in range mode, or false if not in range mode or no end date */
    async getEndDate() {
        if (this.variant !== 'range')
            return false;
        return this.rangeEnd ? formatDate(this.rangeEnd, this.format, this.locale) : false;
    }
    /** Returns the preset ID that matches the current range selection, or false if none matches or not in range mode */
    async getPreset() {
        if (this.variant !== 'range' || !this.rangeStart || !this.rangeEnd || this.parsedPresets.length === 0)
            return false;
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
    parseValue() {
        if (!this.value) {
            this.selectedDate = null;
            this.rangeStart = null;
            this.rangeEnd = null;
            return;
        }
        if (this.variant === 'single') {
            this.selectedDate = parseDate(this.value, this.format);
        }
        else {
            const { start, end } = parseRangeValue(this.value, this.format);
            this.rangeStart = start;
            this.rangeEnd = end;
        }
    }
    parseUnavailableDates() {
        this.parsedUnavailableDates = new Set();
        if (this.blackout) {
            this.blackout.split(',').forEach(d => {
                const trimmed = d.trim();
                if (trimmed)
                    this.parsedUnavailableDates.add(trimmed);
            });
        }
    }
    parsePresets() {
        this.parsedPresets = [];
        if (this.presets) {
            this.parsedPresets = this.presets.split(',').map(p => p.trim()).filter(Boolean);
        }
    }
    // ── Date Constraints ──────────────────────────────────
    getMinDate() {
        if (this.min === 'today')
            return stripTime(new Date());
        if (this.min)
            return parseDate(this.min, 'YYYY-MM-DD');
        return null;
    }
    getMaxDate() {
        if (this.max === 'today' || this.isDisableFuture)
            return stripTime(new Date());
        if (this.max)
            return parseDate(this.max, 'YYYY-MM-DD');
        return null;
    }
    isDateDisabled(date) {
        const minDate = this.getMinDate();
        const maxDate = this.getMaxDate();
        if (minDate && isBefore(date, minDate))
            return true;
        if (maxDate && isAfter(date, maxDate))
            return true;
        const isoStr = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        if (this.parsedUnavailableDates.has(isoStr))
            return true;
        return false;
    }
    isRangeSelectionInvalid(start, end) {
        const days = diffDays(start, end) + 1; // inclusive
        if (this.minRange > 0 && days < this.minRange)
            return true;
        if (this.maxRange > 0 && days > this.maxRange)
            return true;
        return false;
    }
    // ── Formatted Value ───────────────────────────────────
    getFormattedValue() {
        if (this.variant === 'single') {
            return this.selectedDate ? formatDate(this.selectedDate, this.format, this.locale) : '';
        }
        if (this.rangeStart && this.rangeEnd) {
            return formatRangeValue(this.rangeStart, this.rangeEnd, this.format, this.locale);
        }
        return '';
    }
    getDisplayValue() {
        if (this.variant === 'single') {
            return this.selectedDate ? formatDate(this.selectedDate, this.format, this.locale) : '';
        }
        return '';
    }
    getDisplayRangeStart() {
        return this.rangeStart ? formatDate(this.rangeStart, this.format, this.locale) : '';
    }
    getDisplayRangeEnd() {
        return this.rangeEnd ? formatDate(this.rangeEnd, this.format, this.locale) : '';
    }
    // ── Portal Management ─────────────────────────────────
    createPortalElement() {
        if (!this.portalElement) {
            this.portalElement = document.createElement('div');
            this.portalElement.className = 'aegov-datepicker-portal';
            document.body.appendChild(this.portalElement);
        }
    }
    removePortalElement() {
        if (this.portalElement) {
            document.body.removeChild(this.portalElement);
            this.portalElement = undefined;
        }
    }
    handleWindowEvents() {
        if (this.isOpen) {
            this.schedulePositionUpdate();
        }
    }
    schedulePositionUpdate() {
        if (this.positionUpdateScheduled || !this.isOpen)
            return;
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
    updatePosition() {
        if (!this.triggerRef || !this.portalElement)
            return;
        const datepickerEl = this.portalElement.querySelector('.aegov-datepicker');
        if (!datepickerEl)
            return;
        const triggerRect = this.triggerRef.getBoundingClientRect();
        const dpRect = datepickerEl.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const viewportWidth = window.innerWidth;
        // Close datepicker if trigger has scrolled out of the viewport
        if (triggerRect.bottom < 0 ||
            triggerRect.top > viewportHeight ||
            triggerRect.right < 0 ||
            triggerRect.left > viewportWidth) {
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
        let top;
        let openAbove = false;
        // Prefer below, flip to above if not enough space
        if (triggerRect.bottom + gap + dpRect.height > viewportHeight && triggerRect.top - gap - dpRect.height > 0) {
            top = triggerRect.top - dpRect.height - gap;
            openAbove = true;
        }
        else {
            top = triggerRect.bottom + gap;
        }
        // Align start (left in LTR, right in RTL)
        let left = triggerRect.left;
        // Keep within viewport
        if (left + dpRect.width > viewportWidth - 8) {
            left = viewportWidth - dpRect.width - 8;
        }
        if (left < 8)
            left = 8;
        if (top < 8)
            top = 8;
        datepickerEl.style.top = `${top}px`;
        datepickerEl.style.left = `${left}px`;
        // Add visible class after positioning
        datepickerEl.classList.add('datepicker--visible');
        if (openAbove) {
            datepickerEl.classList.add('datepicker--above');
        }
    }
    // ── Portal Content Rendering ──────────────────────────
    renderPortalContent() {
        if (!this.portalElement)
            return;
        this.portalElement.innerHTML = '';
        // Inject styles
        const styleEl = document.createElement('style');
        styleEl.textContent = DATEPICKER_PORTAL_STYLES;
        this.portalElement.appendChild(styleEl);
        // Main container
        const container = document.createElement('div');
        container.className = 'aegov-datepicker';
        container.id = this.datepickerId;
        container.setAttribute('role', 'dialog');
        container.setAttribute('aria-modal', 'true');
        container.setAttribute('aria-label', 'Choose date');
        container.setAttribute('tabindex', '-1');
        // Live region for announcements
        const liveRegion = document.createElement('div');
        liveRegion.className = 'datepicker__live-region';
        liveRegion.setAttribute('aria-live', 'polite');
        liveRegion.setAttribute('aria-atomic', 'true');
        container.appendChild(liveRegion);
        // Presets sidebar (range mode only)
        if (this.variant === 'range' && this.parsedPresets.length > 0) {
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
        if (this.variant === 'range') {
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
    buildPresetsPanel() {
        const panel = document.createElement('div');
        panel.className = 'datepicker__presets';
        const definitions = getPresetDefinitions(this.parsedPresets);
        definitions.forEach(preset => {
            const btn = document.createElement('button');
            btn.className = 'datepicker__preset-btn';
            btn.type = 'button';
            btn.textContent = preset.label;
            // Check if this preset matches current selection
            if (this.rangeStart && this.rangeEnd) {
                const range = preset.calculate(this.startDay);
                if (isSameDay(range.start, this.rangeStart) && isSameDay(range.end, this.rangeEnd)) {
                    btn.classList.add('preset--active');
                }
            }
            btn.addEventListener('click', () => this.handlePresetClick(preset.id));
            panel.appendChild(btn);
        });
        return panel;
    }
    buildCalendarMonth(year, month, showNavigation) {
        const calendar = document.createElement('div');
        calendar.className = 'datepicker__calendar';
        // Header
        const header = document.createElement('div');
        header.className = 'datepicker__header';
        if (showNavigation) {
            const prevBtn = document.createElement('button');
            prevBtn.className = 'datepicker__nav-btn';
            prevBtn.type = 'button';
            prevBtn.innerHTML = CHEVRON_LEFT;
            prevBtn.setAttribute('aria-label', 'Previous month');
            prevBtn.addEventListener('click', () => this.navigateMonth(-1));
            header.appendChild(prevBtn);
        }
        // Month/year selects or label
        const selects = document.createElement('div');
        selects.className = 'datepicker__selects';
        if (this.isHeaderSelectable) {
            // Month select
            const monthSelect = document.createElement('select');
            monthSelect.className = 'datepicker__select';
            monthSelect.setAttribute('aria-label', 'Select month');
            const monthNames = getMonthNames(this.locale);
            monthNames.forEach((name, i) => {
                const opt = document.createElement('option');
                opt.value = String(i);
                opt.textContent = name;
                if (i === month)
                    opt.selected = true;
                monthSelect.appendChild(opt);
            });
            monthSelect.addEventListener('change', (e) => {
                const target = e.target;
                this.handleMonthSelect(parseInt(target.value, 10), showNavigation);
            });
            selects.appendChild(monthSelect);
            // Year select
            const yearSelect = document.createElement('select');
            yearSelect.className = 'datepicker__select';
            yearSelect.setAttribute('aria-label', 'Select year');
            const years = this.yearRangeStart && this.yearRangeEnd
                ? Array.from({ length: this.yearRangeEnd - this.yearRangeStart + 1 }, (_, i) => this.yearRangeStart + i)
                : getYearRange(year, 100);
            years.forEach(y => {
                const opt = document.createElement('option');
                opt.value = String(y);
                opt.textContent = String(y);
                if (y === year)
                    opt.selected = true;
                yearSelect.appendChild(opt);
            });
            yearSelect.addEventListener('change', (e) => {
                const target = e.target;
                this.handleYearSelect(parseInt(target.value, 10), showNavigation);
            });
            selects.appendChild(yearSelect);
        }
        else {
            const label = document.createElement('span');
            label.className = 'datepicker__month-label';
            const monthNames = getMonthNames(this.locale);
            label.textContent = `${monthNames[month]} ${year}`;
            selects.appendChild(label);
        }
        header.appendChild(selects);
        // Next button only on last calendar shown
        const isLastCalendar = this.variant === 'single' ? showNavigation : !showNavigation;
        if (isLastCalendar) {
            const nextBtn = document.createElement('button');
            nextBtn.className = 'datepicker__nav-btn';
            nextBtn.type = 'button';
            nextBtn.innerHTML = CHEVRON_RIGHT;
            nextBtn.setAttribute('aria-label', 'Next month');
            nextBtn.addEventListener('click', () => this.navigateMonth(1));
            header.appendChild(nextBtn);
        }
        calendar.appendChild(header);
        // Weekday headers
        const weekdays = document.createElement('div');
        weekdays.className = 'datepicker__weekdays';
        const dayNames = getWeekdayNames(this.locale, this.startDay, 'short');
        dayNames.forEach(name => {
            const dayEl = document.createElement('div');
            dayEl.className = 'datepicker__weekday';
            dayEl.textContent = name;
            weekdays.appendChild(dayEl);
        });
        calendar.appendChild(weekdays);
        // Day grid
        const grid = document.createElement('div');
        grid.className = 'datepicker__grid';
        grid.setAttribute('role', 'grid');
        const calendarGrid = generateCalendarGrid(year, month, this.startDay);
        const todayDate = stripTime(new Date());
        // Determine active selection state (pending if confirmation mode, actual otherwise)
        const activeSelectedDate = this.isWithConfirmation ? this.pendingDate : this.selectedDate;
        const activeRangeStart = this.isWithConfirmation ? this.pendingRangeStart : this.rangeStart;
        const activeRangeEnd = this.isWithConfirmation ? this.pendingRangeEnd : this.rangeEnd;
        // Determine if the hover preview range is invalid (min/max range violation)
        let isHoverRangeInvalid = false;
        if (this.variant === 'range' && activeRangeStart && !activeRangeEnd && this.hoverDate && (this.minRange > 0 || this.maxRange > 0)) {
            const previewStart = isBefore(this.hoverDate, activeRangeStart) ? this.hoverDate : activeRangeStart;
            const previewEnd = isBefore(this.hoverDate, activeRangeStart) ? activeRangeStart : this.hoverDate;
            isHoverRangeInvalid = this.isRangeSelectionInvalid(previewStart, previewEnd);
        }
        calendarGrid.forEach(week => {
            week.forEach(date => {
                const btn = document.createElement('button');
                btn.type = 'button';
                btn.className = 'datepicker__day';
                btn.textContent = String(date.getDate());
                // Store full date as data attribute for precise identification
                const isoDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                btn.setAttribute('data-date', isoDate);
                const isOutside = date.getMonth() !== month;
                const isToday = isSameDay(date, todayDate);
                const isDisabled = this.isDateDisabled(date);
                // Selection state
                let isSelected = false;
                let isRangeStart = false;
                let isRangeEnd = false;
                let isInRange = false;
                if (this.variant === 'single') {
                    isSelected = activeSelectedDate ? isSameDay(date, activeSelectedDate) : false;
                }
                else {
                    if (activeRangeStart) {
                        isRangeStart = isSameDay(date, activeRangeStart);
                    }
                    if (activeRangeEnd) {
                        isRangeEnd = isSameDay(date, activeRangeEnd);
                    }
                    if (activeRangeStart && activeRangeEnd) {
                        isInRange = isDateBetween(date, activeRangeStart, activeRangeEnd);
                    }
                    else if (activeRangeStart && !activeRangeEnd && this.hoverDate) {
                        // Preview range on hover
                        isInRange = isDateBetween(date, activeRangeStart, this.hoverDate);
                        if (isSameDay(date, this.hoverDate) && !isSameDay(date, activeRangeStart)) {
                            if (isAfter(this.hoverDate, activeRangeStart)) {
                                isRangeEnd = true;
                            }
                            else {
                                isRangeStart = true;
                            }
                        }
                    }
                }
                const isFocused = this.focusedDate ? isSameDay(date, this.focusedDate) : false;
                if (isOutside)
                    btn.classList.add('datepicker__day--outside');
                if (isToday)
                    btn.classList.add('datepicker__day--today');
                if (isFocused && !isOutside)
                    btn.classList.add('datepicker__day--focused');
                if (isSelected)
                    btn.classList.add('datepicker__day--selected');
                if (isRangeStart)
                    btn.classList.add('datepicker__day--range-start');
                if (isRangeEnd)
                    btn.classList.add('datepicker__day--range-end');
                if (isInRange)
                    btn.classList.add('datepicker__day--in-range');
                if (isHoverRangeInvalid && (isRangeStart || isRangeEnd || isInRange)) {
                    btn.classList.add('datepicker__day--range-invalid');
                }
                if (isDisabled) {
                    btn.classList.add('datepicker__day--disabled');
                    btn.setAttribute('aria-disabled', 'true');
                    btn.disabled = true;
                }
                if (isSelected || isRangeStart || isRangeEnd) {
                    btn.setAttribute('aria-selected', 'true');
                }
                if (isToday) {
                    btn.setAttribute('aria-current', 'date');
                }
                if (!isDisabled) {
                    btn.addEventListener('click', () => this.handleDayClick(date));
                    btn.addEventListener('mouseenter', () => this.handleDayHover(date));
                }
                grid.appendChild(btn);
            });
        });
        calendar.appendChild(grid);
        return calendar;
    }
    buildConfirmationFooter() {
        const footer = document.createElement('div');
        footer.className = 'datepicker__footer';
        const cancelBtn = document.createElement('button');
        cancelBtn.type = 'button';
        cancelBtn.className = 'datepicker__footer-btn datepicker__footer-btn--cancel';
        cancelBtn.textContent = 'Cancel';
        cancelBtn.addEventListener('click', () => this.handleCancel());
        const applyBtn = document.createElement('button');
        applyBtn.type = 'button';
        applyBtn.className = 'datepicker__footer-btn datepicker__footer-btn--apply';
        applyBtn.textContent = 'Apply';
        applyBtn.addEventListener('click', () => this.handleApply());
        footer.appendChild(cancelBtn);
        footer.appendChild(applyBtn);
        return footer;
    }
    handleDayClick(date) {
        if (this.isDateDisabled(date))
            return;
        if (this.variant === 'single') {
            if (this.isWithConfirmation) {
                this.pendingDate = date;
                this.updateDayClasses();
            }
            else {
                this.selectedDate = date;
                this.value = formatDate(date, this.format, this.locale);
                this.aegovDatepickerChange.emit({
                    value: this.value,
                    date: this.selectedDate,
                });
                this.isOpen = false;
            }
        }
        else {
            this.handleRangeDayClick(date);
        }
    }
    handleRangeDayClick(date) {
        const activeStart = this.isWithConfirmation ? this.pendingRangeStart : this.rangeStart;
        const activeEnd = this.isWithConfirmation ? this.pendingRangeEnd : this.rangeEnd;
        if (!activeStart || (activeStart && activeEnd)) {
            // First click or reset
            if (this.isWithConfirmation) {
                this.pendingRangeStart = date;
                this.pendingRangeEnd = null;
            }
            else {
                this.rangeStart = date;
                this.rangeEnd = null;
            }
            this.hoverDate = null;
            // Lightweight update — no full portal rebuild needed
            this.updateDayClasses();
        }
        else {
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
            }
            else {
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
    handleDayHover(date) {
        if (this.variant !== 'range')
            return;
        const activeStart = this.isWithConfirmation ? this.pendingRangeStart : this.rangeStart;
        const activeEnd = this.isWithConfirmation ? this.pendingRangeEnd : this.rangeEnd;
        if (activeStart && !activeEnd) {
            // Skip if hovering the same date (prevents infinite rebuild loops)
            if (this.hoverDate && isSameDay(this.hoverDate, date))
                return;
            this.hoverDate = date;
            // Lightweight class update — no full portal rebuild
            this.updateDayClasses();
        }
    }
    handlePresetClick(presetId) {
        const range = calculatePreset(presetId, this.startDay);
        if (!range)
            return;
        if (this.isWithConfirmation) {
            this.pendingRangeStart = range.start;
            this.pendingRangeEnd = range.end;
            this.viewMonth = range.start.getMonth();
            this.viewYear = range.start.getFullYear();
            this.renderPortalContent();
            this.schedulePositionUpdate();
        }
        else {
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
    handleApply() {
        if (this.variant === 'single' && this.pendingDate) {
            this.selectedDate = this.pendingDate;
            this.value = formatDate(this.selectedDate, this.format, this.locale);
            this.aegovDatepickerChange.emit({
                value: this.value,
                date: this.selectedDate,
            });
        }
        else if (this.variant === 'range' && this.pendingRangeStart && this.pendingRangeEnd) {
            this.rangeStart = this.pendingRangeStart;
            this.rangeEnd = this.pendingRangeEnd;
            this.value = formatRangeValue(this.rangeStart, this.rangeEnd, this.format, this.locale);
            this.aegovDatepickerChange.emit({
                value: this.value,
                date: null,
                startDate: this.rangeStart,
                endDate: this.rangeEnd,
            });
        }
        this.isOpen = false;
    }
    handleCancel() {
        this.pendingDate = null;
        this.pendingRangeStart = null;
        this.pendingRangeEnd = null;
        this.isOpen = false;
    }
    handleClear() {
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
    navigateMonth(delta) {
        let newMonth = this.viewMonth + delta;
        let newYear = this.viewYear;
        if (newMonth > 11) {
            newMonth = 0;
            newYear++;
        }
        else if (newMonth < 0) {
            newMonth = 11;
            newYear--;
        }
        this.viewMonth = newMonth;
        this.viewYear = newYear;
        this.aegovDatepickerMonthChange.emit({ month: newMonth, year: newYear });
        this.renderPortalContent();
        this.schedulePositionUpdate();
        // Announce change
        this.announceMonthChange();
    }
    handleMonthSelect(month, isPrimary) {
        if (isPrimary) {
            this.viewMonth = month;
        }
        else {
            // Right calendar changed: set viewMonth to one before
            let m = month - 1;
            let y = this.viewYear;
            if (m < 0) {
                m = 11;
                y--;
            }
            this.viewMonth = m;
            this.viewYear = y;
        }
        this.aegovDatepickerMonthChange.emit({ month: this.viewMonth, year: this.viewYear });
        this.renderPortalContent();
        this.schedulePositionUpdate();
        this.announceMonthChange();
    }
    handleYearSelect(year, isPrimary) {
        if (isPrimary) {
            this.viewYear = year;
        }
        else {
            this.viewYear = year;
        }
        this.aegovDatepickerMonthChange.emit({ month: this.viewMonth, year: this.viewYear });
        this.renderPortalContent();
        this.schedulePositionUpdate();
        this.announceMonthChange();
    }
    announceMonthChange() {
        if (!this.portalElement)
            return;
        const liveRegion = this.portalElement.querySelector('.datepicker__live-region');
        if (liveRegion) {
            const monthNames = getMonthNames(this.locale);
            liveRegion.textContent = `${monthNames[this.viewMonth]} ${this.viewYear}`;
        }
    }
    // ── Keyboard Navigation ───────────────────────────────
    handleDocumentMouseDown(event) {
        // Record whether mousedown happened inside our component or portal BEFORE
        // any click handlers run and potentially rebuild the portal DOM.
        // This is robust because mousedown fires before the click event.
        // Must always track — even when calendar is closed — because the trigger click
        // that opens the calendar also bubbles to handleDocumentClick.
        const target = event.target;
        this.mouseDownInsideComponent = (this.el.contains(target) ||
            (!!this.portalElement && this.portalElement.contains(target)));
    }
    handleDocumentClick(event) {
        if (!this.isOpen)
            return;
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
        const clickedInsideComponent = path.some((el) => {
            if (el instanceof Node) {
                return this.el.contains(el) || (!!this.portalElement && this.portalElement.contains(el));
            }
            return false;
        });
        if (clickedInsideComponent)
            return;
        if (this.isWithConfirmation) {
            this.handleCancel();
        }
        else {
            this.isOpen = false;
        }
    }
    handleKeyDown(event) {
        if (!this.isOpen) {
            // Open on Enter/Space when trigger is focused
            if ((event.key === 'Enter' || event.key === ' ') && this.el.contains(event.target)) {
                event.preventDefault();
                this.isOpen = true;
            }
            return;
        }
        // Escape always works when calendar is open, regardless of focus position
        if (event.key === 'Escape') {
            event.preventDefault();
            if (this.isWithConfirmation) {
                this.handleCancel();
            }
            else {
                this.isOpen = false;
            }
            return;
        }
        // Only handle navigation keys when focus is inside the host or portal
        const target = event.target;
        const focusInsideComponent = this.el.contains(target) || (!!this.portalElement && this.portalElement.contains(target));
        if (!focusInsideComponent)
            return;
        // Let Tab key navigate naturally through calendar controls (selects, nav buttons, days)
        if (event.key === 'Tab')
            return;
        switch (event.key) {
            case 'ArrowLeft':
                event.preventDefault();
                this.moveFocus(-1);
                break;
            case 'ArrowRight':
                event.preventDefault();
                this.moveFocus(1);
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
                }
                else {
                    this.moveFocusMonths(-1);
                }
                break;
            case 'PageDown':
                event.preventDefault();
                if (event.shiftKey) {
                    this.moveFocusMonths(12);
                }
                else {
                    this.moveFocusMonths(1);
                }
                break;
            case 'Home':
                event.preventDefault();
                this.focusFirstOfMonth();
                break;
            case 'End':
                event.preventDefault();
                this.focusLastOfMonth();
                break;
            case 'Enter':
            case ' ': {
                const targetEl = event.target;
                const tag = targetEl === null || targetEl === void 0 ? void 0 : targetEl.tagName;
                // Let native <select> and non-day <button> elements handle Enter/Space natively
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
    moveFocus(days) {
        const current = this.focusedDate || this.selectedDate || stripTime(new Date());
        const next = new Date(current);
        next.setDate(next.getDate() + days);
        const needsMonthChange = next.getMonth() !== this.viewMonth || next.getFullYear() !== this.viewYear;
        this.focusedDate = next;
        if (needsMonthChange) {
            // Month changed: full portal rebuild needed
            this.viewMonth = next.getMonth();
            this.viewYear = next.getFullYear();
            this.renderPortalContent();
            this.schedulePositionUpdate();
        }
        else {
            // Same month: lightweight update — just move the focused class
            this.updateFocusedDay(next);
        }
        this.focusDayButton(next);
    }
    moveFocusMonths(months) {
        const current = this.focusedDate || this.selectedDate || stripTime(new Date());
        const next = new Date(current);
        next.setMonth(next.getMonth() + months);
        this.focusedDate = next;
        this.viewMonth = next.getMonth();
        this.viewYear = next.getFullYear();
        this.renderPortalContent();
        this.schedulePositionUpdate();
        this.focusDayButton(next);
    }
    focusFirstOfMonth() {
        const first = new Date(this.viewYear, this.viewMonth, 1);
        this.focusedDate = first;
        this.renderPortalContent();
        this.schedulePositionUpdate();
        this.focusDayButton(first);
    }
    focusLastOfMonth() {
        const last = new Date(this.viewYear, this.viewMonth + 1, 0);
        this.focusedDate = last;
        this.renderPortalContent();
        this.schedulePositionUpdate();
        this.focusDayButton(last);
    }
    dateToIso(date) {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    }
    findDayButton(date) {
        if (!this.portalElement)
            return null;
        return this.portalElement.querySelector(`.datepicker__day[data-date="${this.dateToIso(date)}"]`);
    }
    /**
     * Lightweight update of selection/range/hover classes on all day buttons.
     * Avoids full portal rebuild which causes mouseenter loops and outside-click issues.
     */
    updateDayClasses() {
        if (!this.portalElement)
            return;
        const activeRangeStart = this.isWithConfirmation ? this.pendingRangeStart : this.rangeStart;
        const activeRangeEnd = this.isWithConfirmation ? this.pendingRangeEnd : this.rangeEnd;
        const activeSelectedDate = this.isWithConfirmation ? this.pendingDate : this.selectedDate;
        // Determine if the hover preview range is invalid (min/max range violation)
        let isHoverRangeInvalid = false;
        if (this.variant === 'range' && activeRangeStart && !activeRangeEnd && this.hoverDate && (this.minRange > 0 || this.maxRange > 0)) {
            const previewStart = isBefore(this.hoverDate, activeRangeStart) ? this.hoverDate : activeRangeStart;
            const previewEnd = isBefore(this.hoverDate, activeRangeStart) ? activeRangeStart : this.hoverDate;
            isHoverRangeInvalid = this.isRangeSelectionInvalid(previewStart, previewEnd);
        }
        const buttons = this.portalElement.querySelectorAll('.datepicker__day');
        buttons.forEach((btn) => {
            const iso = btn.getAttribute('data-date');
            if (!iso)
                return;
            const [y, m, d] = iso.split('-').map(Number);
            const date = new Date(y, m - 1, d);
            // Remove all dynamic selection classes
            btn.classList.remove('datepicker__day--selected', 'datepicker__day--range-start', 'datepicker__day--range-end', 'datepicker__day--in-range', 'datepicker__day--range-invalid');
            btn.removeAttribute('aria-selected');
            if (this.variant === 'single') {
                if (activeSelectedDate && isSameDay(date, activeSelectedDate)) {
                    btn.classList.add('datepicker__day--selected');
                    btn.setAttribute('aria-selected', 'true');
                }
            }
            else {
                let isRangeStart = false;
                let isRangeEnd = false;
                let isInRange = false;
                if (activeRangeStart)
                    isRangeStart = isSameDay(date, activeRangeStart);
                if (activeRangeEnd)
                    isRangeEnd = isSameDay(date, activeRangeEnd);
                if (activeRangeStart && activeRangeEnd) {
                    isInRange = isDateBetween(date, activeRangeStart, activeRangeEnd);
                }
                else if (activeRangeStart && !activeRangeEnd && this.hoverDate) {
                    isInRange = isDateBetween(date, activeRangeStart, this.hoverDate);
                    if (isSameDay(date, this.hoverDate) && !isSameDay(date, activeRangeStart)) {
                        if (isAfter(this.hoverDate, activeRangeStart)) {
                            isRangeEnd = true;
                        }
                        else {
                            isRangeStart = true;
                        }
                    }
                }
                if (isRangeStart) {
                    btn.classList.add('datepicker__day--range-start');
                    btn.setAttribute('aria-selected', 'true');
                }
                if (isRangeEnd) {
                    btn.classList.add('datepicker__day--range-end');
                    btn.setAttribute('aria-selected', 'true');
                }
                if (isInRange)
                    btn.classList.add('datepicker__day--in-range');
                // Apply invalid class to all days in the hover preview range
                if (isHoverRangeInvalid && (isRangeStart || isRangeEnd || isInRange)) {
                    btn.classList.add('datepicker__day--range-invalid');
                }
            }
        });
    }
    updateFocusedDay(date) {
        if (!this.portalElement)
            return;
        const prev = this.portalElement.querySelector('.datepicker__day--focused');
        if (prev)
            prev.classList.remove('datepicker__day--focused');
        const btn = this.findDayButton(date);
        if (btn)
            btn.classList.add('datepicker__day--focused');
    }
    focusDayButton(date) {
        if (!this.portalElement)
            return;
        requestAnimationFrame(() => {
            if (!this.portalElement)
                return;
            const prev = this.portalElement.querySelector('.datepicker__day--focused');
            if (prev)
                prev.classList.remove('datepicker__day--focused');
            const btn = this.findDayButton(date);
            if (btn) {
                btn.classList.add('datepicker__day--focused');
                btn.focus();
            }
        });
    }
    // ── Render ────────────────────────────────────────────
    renderSingleTrigger(passThroughAttrs) {
        const displayValue = this.getDisplayValue();
        const hasValue = !!displayValue;
        return (h("div", { class: `datepicker__input-wrapper datepicker__input-wrapper--${this._resolvedSize}` },
            h("input", Object.assign({ type: "text", class: "datepicker__input" }, passThroughAttrs, { value: displayValue, placeholder: this.placeholder, readOnly: true, disabled: this.isDisabled, required: this.isRequired, "aria-required": this.isRequired ? 'true' : undefined, "aria-haspopup": "dialog", "aria-expanded": this.isOpen.toString(), "aria-controls": this.isOpen ? this.datepickerId : undefined, "aria-label": this.placeholder })),
            hasValue && this.isClearable && !this.isDisabled && (h("button", { type: "button", class: "datepicker__clear-btn", onClick: (e) => { e.stopPropagation(); this.handleClear(); }, "aria-label": "Clear date", innerHTML: CLEAR_ICON })),
            h("span", { class: "datepicker__icon", "aria-hidden": "true", innerHTML: CALENDAR_ICON })));
    }
    renderRangeTrigger(passThroughAttrs) {
        const startValue = this.getDisplayRangeStart();
        const endValue = this.getDisplayRangeEnd();
        const hasValue = !!(startValue || endValue);
        return (h("div", { class: `datepicker__input-wrapper datepicker__input-wrapper--${this._resolvedSize} datepicker__input-wrapper--range` },
            h("input", Object.assign({ type: "text", class: "datepicker__input datepicker__input--range-start" }, passThroughAttrs, { value: startValue, placeholder: this.labelRangeStart, readOnly: true, disabled: this.isDisabled, required: this.isRequired, "aria-required": this.isRequired ? 'true' : undefined, "aria-label": this.labelRangeStart })),
            h("span", { class: "datepicker__range-separator", "aria-hidden": "true", innerHTML: ARROW_RIGHT }),
            h("input", Object.assign({ type: "text", class: "datepicker__input datepicker__input--range-end" }, passThroughAttrs, { value: endValue, placeholder: this.labelRangeEnd, readOnly: true, disabled: this.isDisabled, required: this.isRequired, "aria-required": this.isRequired ? 'true' : undefined, "aria-label": this.labelRangeEnd })),
            hasValue && this.isClearable && !this.isDisabled && (h("button", { type: "button", class: "datepicker__clear-btn", onClick: (e) => { e.stopPropagation(); this.handleClear(); }, "aria-label": "Clear dates", innerHTML: CLEAR_ICON })),
            h("span", { class: "datepicker__icon", "aria-hidden": "true", innerHTML: CALENDAR_ICON })));
    }
    render() {
        const mode = DATEPICKER_MODES.includes(this.variant) ? this.variant : 'single';
        const passThroughAttrs = getPassThroughAttributes(this.el, AegovDatepicker_1.PASS_THROUGH_ATTRS);
        return (h(Host, null,
            h("div", { class: "datepicker__trigger", ref: (el) => (this.triggerRef = el), onClick: this.handleTriggerClick }, this.hasTriggerSlot ? (h("slot", { name: "trigger" })) : mode === 'range' ? (this.renderRangeTrigger(passThroughAttrs)) : (this.renderSingleTrigger(passThroughAttrs)))));
    }
};
/** Native input attributes to pass through to the inner input element. */
AegovDatepicker.PASS_THROUGH_ATTRS = new Set([
    'pattern', 'minlength', 'maxlength', 'step',
    'autocomplete', 'autofocus', 'inputmode', 'list', 'multiple',
    'accept', 'capture', 'spellcheck', 'enterkeyhint', 'title',
    'tabindex', 'form',
]);
__decorate([
    Element()
], AegovDatepicker.prototype, "el", void 0);
__decorate([
    Prop()
], AegovDatepicker.prototype, "variant", void 0);
__decorate([
    Prop({ mutable: true })
], AegovDatepicker.prototype, "value", void 0);
__decorate([
    Prop()
], AegovDatepicker.prototype, "format", void 0);
__decorate([
    Prop()
], AegovDatepicker.prototype, "placeholder", void 0);
__decorate([
    Prop()
], AegovDatepicker.prototype, "labelRangeStart", void 0);
__decorate([
    Prop()
], AegovDatepicker.prototype, "labelRangeEnd", void 0);
__decorate([
    Prop()
], AegovDatepicker.prototype, "min", void 0);
__decorate([
    Prop()
], AegovDatepicker.prototype, "max", void 0);
__decorate([
    Prop()
], AegovDatepicker.prototype, "isDisableFuture", void 0);
__decorate([
    Prop({ attribute: 'start-day' })
], AegovDatepicker.prototype, "startDay", void 0);
__decorate([
    Prop()
], AegovDatepicker.prototype, "locale", void 0);
__decorate([
    Prop({ attribute: 'min-range' })
], AegovDatepicker.prototype, "minRange", void 0);
__decorate([
    Prop({ attribute: 'max-range' })
], AegovDatepicker.prototype, "maxRange", void 0);
__decorate([
    Prop()
], AegovDatepicker.prototype, "blackout", void 0);
__decorate([
    Prop()
], AegovDatepicker.prototype, "presets", void 0);
__decorate([
    Prop()
], AegovDatepicker.prototype, "isDisabled", void 0);
__decorate([
    Prop()
], AegovDatepicker.prototype, "isRequired", void 0);
__decorate([
    Prop()
], AegovDatepicker.prototype, "isClearable", void 0);
__decorate([
    Prop()
], AegovDatepicker.prototype, "isHeaderSelectable", void 0);
__decorate([
    Prop({ attribute: 'year-range-start' })
], AegovDatepicker.prototype, "yearRangeStart", void 0);
__decorate([
    Prop({ attribute: 'year-range-end' })
], AegovDatepicker.prototype, "yearRangeEnd", void 0);
__decorate([
    Prop()
], AegovDatepicker.prototype, "isWithConfirmation", void 0);
__decorate([
    Prop()
], AegovDatepicker.prototype, "size", void 0);
__decorate([
    State()
], AegovDatepicker.prototype, "_resolvedSize", void 0);
__decorate([
    State()
], AegovDatepicker.prototype, "isOpen", void 0);
__decorate([
    State()
], AegovDatepicker.prototype, "viewMonth", void 0);
__decorate([
    State()
], AegovDatepicker.prototype, "viewYear", void 0);
__decorate([
    State()
], AegovDatepicker.prototype, "selectedDate", void 0);
__decorate([
    State()
], AegovDatepicker.prototype, "rangeStart", void 0);
__decorate([
    State()
], AegovDatepicker.prototype, "rangeEnd", void 0);
__decorate([
    State()
], AegovDatepicker.prototype, "hoverDate", void 0);
__decorate([
    State()
], AegovDatepicker.prototype, "focusedDate", void 0);
__decorate([
    State()
], AegovDatepicker.prototype, "hasTriggerSlot", void 0);
__decorate([
    State()
], AegovDatepicker.prototype, "pendingDate", void 0);
__decorate([
    State()
], AegovDatepicker.prototype, "pendingRangeStart", void 0);
__decorate([
    State()
], AegovDatepicker.prototype, "pendingRangeEnd", void 0);
__decorate([
    Event()
], AegovDatepicker.prototype, "aegovDatepickerChange", void 0);
__decorate([
    Event()
], AegovDatepicker.prototype, "aegovDatepickerOpen", void 0);
__decorate([
    Event()
], AegovDatepicker.prototype, "aegovDatepickerClose", void 0);
__decorate([
    Event()
], AegovDatepicker.prototype, "aegovDatepickerClear", void 0);
__decorate([
    Event()
], AegovDatepicker.prototype, "aegovDatepickerMonthChange", void 0);
__decorate([
    Watch('variant')
], AegovDatepicker.prototype, "onVariantChange", null);
__decorate([
    Watch('size')
], AegovDatepicker.prototype, "onSizeChange", null);
__decorate([
    Watch('value')
], AegovDatepicker.prototype, "onValueChange", null);
__decorate([
    Watch('unavailableDates')
], AegovDatepicker.prototype, "onUnavailableDatesChange", null);
__decorate([
    Watch('presets')
], AegovDatepicker.prototype, "onPresetsChange", null);
__decorate([
    Watch('isOpen')
], AegovDatepicker.prototype, "onOpenChange", null);
__decorate([
    Method()
], AegovDatepicker.prototype, "open", null);
__decorate([
    Method()
], AegovDatepicker.prototype, "close", null);
__decorate([
    Method()
], AegovDatepicker.prototype, "clear", null);
__decorate([
    Method()
], AegovDatepicker.prototype, "getValue", null);
__decorate([
    Method()
], AegovDatepicker.prototype, "getStartDate", null);
__decorate([
    Method()
], AegovDatepicker.prototype, "getEndDate", null);
__decorate([
    Method()
], AegovDatepicker.prototype, "getPreset", null);
__decorate([
    Listen('scroll', { target: 'window', passive: true }),
    Listen('resize', { target: 'window', passive: true })
], AegovDatepicker.prototype, "handleWindowEvents", null);
__decorate([
    Listen('mousedown', { target: 'document' })
], AegovDatepicker.prototype, "handleDocumentMouseDown", null);
__decorate([
    Listen('click', { target: 'document' })
], AegovDatepicker.prototype, "handleDocumentClick", null);
__decorate([
    Listen('keydown', { target: 'document' })
], AegovDatepicker.prototype, "handleKeyDown", null);
AegovDatepicker = AegovDatepicker_1 = __decorate([
    Component({
        tag: 'aegov-datepicker',
        styleUrl: 'aegov-datepicker.css',
        scoped: true,
    })
], AegovDatepicker);
export { AegovDatepicker };
