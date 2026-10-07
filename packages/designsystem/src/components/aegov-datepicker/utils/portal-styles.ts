/**
 * CSS styles injected into the datepicker portal element.
 * Uses CSS custom properties from the Tailwind theme (available globally via aegov.css).
 */

export const DATEPICKER_PORTAL_STYLES = `
.aegov-datepicker-portal {
  position: fixed;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  z-index: 9999;
  pointer-events: none;
}

.aegov-datepicker {
  position: fixed;
  background: var(--color-whitely-50);
  color: var(--color-aeblack-800);
  border: 1px solid var(--color-aeblack-200);
  border-radius: 0.75rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
  pointer-events: auto;
  z-index: 9999;
  display: flex;
  flex-direction: row;
  opacity: 0;
  transform: translateY(4px);
  transition: opacity 200ms ease, transform 200ms ease;
  overflow: hidden;
}

.aegov-datepicker.datepicker--visible {
  opacity: 1;
  transform: translateY(0);
}

.aegov-datepicker.datepicker--above {
  transform: translateY(-4px);
}

.aegov-datepicker.datepicker--above.datepicker--visible {
  transform: translateY(0);
}

/* ── Presets Sidebar ────────────────────────────────── */
.datepicker__presets {
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 0.75rem;
  border-right: 1px solid var(--color-aeblack-200, #e2e8f0);
  min-width: 140px;
  max-height: 340px;
  overflow-y: auto;
  background: var(--color-aeblack-50, #f8fafc);
}

.datepicker__preset-btn {
  display: block;
  width: 100%;
  padding: 0.375rem 0.625rem;
  border: none;
  border-radius: 0.375rem;
  background: transparent;
  color: var(--color-aeblack-700, #334155);
  font-size: 0.8125rem;
  line-height: 1.25rem;
  text-align: left;
  cursor: pointer;
  white-space: nowrap;
  transition: background 150ms ease, color 150ms ease;
  font-family: inherit;
}

[dir="rtl"] .datepicker__presets {
  border-right: none;
  border-left: 1px solid var(--color-aeblack-200, #e2e8f0);
}

[dir="rtl"] .datepicker__preset-btn {
  text-align: right;
}

.datepicker__preset-btn:hover {
  background: var(--color-primary-100, #e0f2fe);
  color: var(--color-primary-700, #0369a1);
}

.datepicker__preset-btn:focus-visible {
  outline: 2px solid var(--color-primary-500, #0ea5e9);
  outline-offset: -2px;
}

.datepicker__preset-btn.preset--active {
  background: var(--color-primary-600);
  color: var(--color-primary-50);
}

/* ── Calendar Body ──────────────────────────────────── */
.datepicker__body {
  display: flex;
  flex-direction: column;
}

.datepicker__calendars {
  display: flex;
  flex-direction: row;
}

.datepicker__calendar {
  padding: 0.75rem;
  min-width: 280px;
}

.datepicker__calendar + .datepicker__calendar {
  border-left: 1px solid var(--color-aeblack-200, #e2e8f0);
}

[dir="rtl"] .datepicker__calendar + .datepicker__calendar {
  border-left: none;
  border-right: 1px solid var(--color-aeblack-200, #e2e8f0);
}

/* ── Header ─────────────────────────────────────────── */
.datepicker__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  gap: 0.25rem;
}

.datepicker__nav-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: none;
  border-radius: 0.375rem;
  background: transparent;
  color: var(--color-aeblack-600, #475569);
  cursor: pointer;
  flex-shrink: 0;
  transition: background 150ms ease, color 150ms ease;
  font-family: inherit;
}

.datepicker__nav-btn:hover {
  background: var(--color-aeblack-100, #f1f5f9);
  color: var(--color-aeblack-800, #1e293b);
}

.datepicker__nav-btn:focus-visible {
  outline: 2px solid var(--color-primary-500, #0ea5e9);
  outline-offset: -2px;
}

.datepicker__nav-btn svg {
  width: 1rem;
  height: 1rem;
}

.datepicker__selects {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  flex: 1;
  justify-content: center;
}

.datepicker__select {
  border: 1px solid var(--color-aeblack-200);
  border-radius: 0.375rem;
  padding: 0.25rem 0.375rem;
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--color-aeblack-800);
  background: var(--color-whitely-50);
  cursor: pointer;
  font-family: inherit;
  outline: none;
  -webkit-appearance: none;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23475569' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.25rem center;
  padding-right: 1.25rem;
}

[dir="rtl"] .datepicker__select {
  background-position: left 0.25rem center;
  padding-right: 0.375rem;
  padding-left: 1.25rem;
}

.datepicker__select:focus-visible {
  border-color: var(--color-primary-500, #0ea5e9);
  box-shadow: 0 0 0 1px var(--color-primary-500, #0ea5e9);
}

.datepicker__month-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--color-aeblack-800, #1e293b);
  white-space: nowrap;
}

/* ── Grid ───────────────────────────────────────────── */
.datepicker__grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 1px;
}

/* Row and cell wrappers are transparent to the grid layout */
.datepicker__row {
  display: contents;
}

.datepicker__cell {
  display: contents;
}

/* Weekday column headers — now inside the grid as first row */
.datepicker__weekday {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2rem;
  padding-bottom: 0.25rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--color-aeblack-600, #595c66); /* aeblack-400 was 4.08:1 — fails WCAG AA at 12px */
  text-transform: uppercase;
}

.datepicker__weekday abbr {
  text-decoration: none;
  cursor: default;
}

/* ── Day Cell ───────────────────────────────────────── */
.datepicker__day {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  border: none;
  border-radius: 0.375rem;
  background: transparent;
  color: var(--color-aeblack-800, #1e293b);
  font-size: 0.8125rem;
  cursor: pointer;
  transition: background 100ms ease, color 100ms ease;
  font-family: inherit;
  position: relative;
}

.datepicker__day:hover:not(.datepicker__day--disabled):not(.datepicker__day--outside):not(.datepicker__day--selected):not(.datepicker__day--range-start):not(.datepicker__day--range-end) {
  background: var(--color-primary-100);
}

.datepicker__day:focus-visible {
  outline: 2px solid var(--color-primary-500, #0ea5e9);
  outline-offset: -2px;
  z-index: 1;
}

.datepicker__day--today:not(.datepicker__day--selected):not(.datepicker__day--range-start):not(.datepicker__day--range-end) {
  font-weight: 700;
  color: var(--color-primary-600, #0284c7);
  box-shadow: inset 0 0 0 1px var(--color-primary-400, #38bdf8);
  border-radius: 0.375rem;
}

.datepicker__day--selected,
.datepicker__day--range-start,
.datepicker__day--range-end {
  background: var(--color-primary-600);
  color: var(--color-primary-50);
  font-weight: 600;
  border-radius: 0.375rem;
}

.datepicker__day--selected:hover,
.datepicker__day--range-start:hover,
.datepicker__day--range-end:hover {
  background: var(--color-primary-700);
}

.datepicker__day--in-range:not(.datepicker__day--range-start):not(.datepicker__day--range-end) {
  background: var(--color-primary-100, #e0f2fe);
  color: var(--color-primary-800, #075985);
  border-radius: 0;
}

.datepicker__day--in-range:not(.datepicker__day--range-start):not(.datepicker__day--range-end):hover {
  background: var(--color-primary-200, #bae6fd);
}

.datepicker__day--range-start {
  border-radius: 0.375rem 0 0 0.375rem;
}

.datepicker__day--range-end {
  border-radius: 0 0.375rem 0.375rem 0;
}

.datepicker__day--range-start.datepicker__day--range-end {
  border-radius: 0.375rem;
}

[dir="rtl"] .datepicker__day--range-start {
  border-radius: 0 0.375rem 0.375rem 0;
}

[dir="rtl"] .datepicker__day--range-end {
  border-radius: 0.375rem 0 0 0.375rem;
}

[dir="rtl"] .datepicker__day--range-start.datepicker__day--range-end {
  border-radius: 0.375rem;
}

/* Invalid range feedback (min-range / max-range violations) */
.datepicker__day--range-invalid.datepicker__day--range-start,
.datepicker__day--range-invalid.datepicker__day--range-end {
  background: var(--color-aered-600);
  color: var(--color-aered-50);
}

.datepicker__day--range-invalid.datepicker__day--range-start:hover,
.datepicker__day--range-invalid.datepicker__day--range-end:hover {
  background: var(--color-aered-600);
}

.datepicker__day--range-invalid.datepicker__day--in-range:not(.datepicker__day--range-start):not(.datepicker__day--range-end) {
  background: var(--color-aered-100, #fee2e2);
  color: var(--color-aered-800, #991b1b);
}

.datepicker__day--range-invalid.datepicker__day--in-range:not(.datepicker__day--range-start):not(.datepicker__day--range-end):hover {
  background: var(--color-aered-200, #fecaca);
}

.datepicker__day--disabled {
  color: var(--color-aeblack-300, #cbd5e1);
  cursor: not-allowed;
  pointer-events: none;
  opacity: 0.5;
}

.datepicker__day--outside:not(.datepicker__day--selected):not(.datepicker__day--range-start):not(.datepicker__day--range-end):not(.datepicker__day--in-range) {
  color: var(--color-aeblack-500, #636870);
}

.datepicker__day--outside:hover:not(.datepicker__day--selected):not(.datepicker__day--range-start):not(.datepicker__day--range-end) {
  background: var(--color-aeblack-50, #f8fafc);
}

/* Outside days that fall within a selected range render at reduced opacity so the range is clear */
.datepicker__day--outside.datepicker__day--in-range {
  background: var(--color-primary-100);
  color: var(--color-primary-800);
  opacity: 0.6;
}

.datepicker__day--focused {
  outline: 2px solid var(--color-primary-500, #0ea5e9);
  outline-offset: -2px;
  z-index: 1;
}

/* ── Footer (Confirmation Buttons) ──────────────────── */
.datepicker__footer {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.5rem;
  padding: 0.5rem 0.75rem;
  border-top: 1px solid var(--color-aeblack-200, #e2e8f0);
}

.datepicker__footer-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.375rem 0.875rem;
  border-radius: 0.375rem;
  font-size: 0.8125rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 150ms ease, color 150ms ease, border-color 150ms ease;
  font-family: inherit;
  border: 1px solid transparent;
}

.datepicker__footer-btn--cancel {
  background: transparent;
  color: var(--color-aeblack-600, #475569);
  border-color: var(--color-aeblack-300, #cbd5e1);
}

.datepicker__footer-btn--cancel:hover {
  background: var(--color-aeblack-50, #f8fafc);
  border-color: var(--color-aeblack-400, #94a3b8);
}

.datepicker__footer-btn--apply {
  background: var(--color-primary-600);
  color: var(--color-primary-50);
  border-color: var(--color-primary-600);
}

.datepicker__footer-btn--apply:hover {
  background: var(--color-primary-700, #0369a1);
  border-color: var(--color-primary-700, #0369a1);
}

.datepicker__footer-btn:focus-visible {
  outline: 2px solid var(--color-primary-500, #0ea5e9);
  outline-offset: 2px;
}

.datepicker__footer-btn:disabled {
  opacity: 0.45;
  cursor: not-allowed;
  pointer-events: none;
}

/* ── Live Region ────────────────────────────────────── */
.datepicker__live-region {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Visually hidden dialog title referenced by aria-labelledby */
.datepicker__dialog-title {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* ─────────────────────────────────────────────────────────────────────
   Variant overrides — colour family (primary/secondary/neutral-max/neutral-min)
   Focus ring stays camel; error stays aered regardless of variant.
   ───────────────────────────────────────────────────────────────────── */

/* Secondary variant */
.aegov-datepicker.datepicker-variant-secondary .datepicker__day--selected,
.aegov-datepicker.datepicker-variant-secondary .datepicker__day--range-start,
.aegov-datepicker.datepicker-variant-secondary .datepicker__day--range-end,
.aegov-datepicker.datepicker-variant-secondary .datepicker__day--selected:hover,
.aegov-datepicker.datepicker-variant-secondary .datepicker__day--range-start:hover,
.aegov-datepicker.datepicker-variant-secondary .datepicker__day--range-end:hover {
  background: var(--color-secondary-600);
  color: var(--color-secondary-50);
}
.aegov-datepicker.datepicker-variant-secondary .datepicker__day--today:not(.datepicker__day--selected):not(.datepicker__day--range-start):not(.datepicker__day--range-end) {
  /* secondary-700 (camel-700) instead of secondary-600 — 600 is #d67907 (3.18:1 vs white, fails WCAG AA) */
  color: var(--color-secondary-700, #7c5e24);
  box-shadow: inset 0 0 0 1px var(--color-secondary-500, #b68a35);
}
.aegov-datepicker.datepicker-variant-secondary .datepicker__day--in-range:not(.datepicker__day--range-start):not(.datepicker__day--range-end) {
  background: var(--color-secondary-100, #e0f2fe);
  color: var(--color-secondary-800, #075985);
}
.aegov-datepicker.datepicker-variant-secondary .datepicker__day--in-range:not(.datepicker__day--range-start):not(.datepicker__day--range-end):hover {
  background: var(--color-secondary-200, #bae6fd);
}
.aegov-datepicker.datepicker-variant-secondary .datepicker__day:hover:not(.datepicker__day--selected):not(.datepicker__day--range-start):not(.datepicker__day--range-end):not(.datepicker__day--disabled):not(:disabled) {
  background: var(--color-secondary-100, #e0f2fe);
  color: var(--color-secondary-700, #0369a1);
}

/* Neutral-max variant */
.aegov-datepicker.datepicker-variant-neutral-max .datepicker__day--selected,
.aegov-datepicker.datepicker-variant-neutral-max .datepicker__day--range-start,
.aegov-datepicker.datepicker-variant-neutral-max .datepicker__day--range-end,
.aegov-datepicker.datepicker-variant-neutral-max .datepicker__day--selected:hover,
.aegov-datepicker.datepicker-variant-neutral-max .datepicker__day--range-start:hover,
.aegov-datepicker.datepicker-variant-neutral-max .datepicker__day--range-end:hover {
  background: var(--color-aeblack-800);
  color: var(--color-aeblack-50);
}
.aegov-datepicker.datepicker-variant-neutral-max .datepicker__day--today:not(.datepicker__day--selected):not(.datepicker__day--range-start):not(.datepicker__day--range-end) {
  color: var(--color-aeblack-800, #1f2937);
  box-shadow: inset 0 0 0 1px var(--color-aeblack-400, #9ca3af);
}
.aegov-datepicker.datepicker-variant-neutral-max .datepicker__day--in-range:not(.datepicker__day--range-start):not(.datepicker__day--range-end) {
  background: var(--color-aeblack-100, #f3f4f6);
  color: var(--color-aeblack-800, #1f2937);
}
.aegov-datepicker.datepicker-variant-neutral-max .datepicker__day--in-range:not(.datepicker__day--range-start):not(.datepicker__day--range-end):hover {
  background: var(--color-aeblack-200, #e5e7eb);
}
.aegov-datepicker.datepicker-variant-neutral-max .datepicker__day:hover:not(.datepicker__day--selected):not(.datepicker__day--range-start):not(.datepicker__day--range-end):not(.datepicker__day--disabled):not(:disabled) {
  background: var(--color-aeblack-100, #f3f4f6);
  color: var(--color-aeblack-800, #1f2937);
}

/* Neutral-min variant — fill stays dark for legibility, accents lighter */
.aegov-datepicker.datepicker-variant-neutral-min .datepicker__day--selected,
.aegov-datepicker.datepicker-variant-neutral-min .datepicker__day--range-start,
.aegov-datepicker.datepicker-variant-neutral-min .datepicker__day--range-end,
.aegov-datepicker.datepicker-variant-neutral-min .datepicker__day--selected:hover,
.aegov-datepicker.datepicker-variant-neutral-min .datepicker__day--range-start:hover,
.aegov-datepicker.datepicker-variant-neutral-min .datepicker__day--range-end:hover {
  background: var(--color-aeblack-800);
  color: var(--color-aeblack-50);
}
.aegov-datepicker.datepicker-variant-neutral-min .datepicker__day--today:not(.datepicker__day--selected):not(.datepicker__day--range-start):not(.datepicker__day--range-end) {
  color: var(--color-aeblack-800, #1f2937);
  box-shadow: inset 0 0 0 1px var(--color-aeblack-200, #e5e7eb);
}
.aegov-datepicker.datepicker-variant-neutral-min .datepicker__day--in-range:not(.datepicker__day--range-start):not(.datepicker__day--range-end) {
  background: var(--color-aeblack-50, #f9fafb);
  color: var(--color-aeblack-900, #111827);
}
.aegov-datepicker.datepicker-variant-neutral-min .datepicker__day--in-range:not(.datepicker__day--range-start):not(.datepicker__day--range-end):hover {
  background: var(--color-aeblack-100, #f3f4f6);
}
.aegov-datepicker.datepicker-variant-neutral-min .datepicker__day:hover:not(.datepicker__day--selected):not(.datepicker__day--range-start):not(.datepicker__day--range-end):not(.datepicker__day--disabled):not(:disabled) {
  background: var(--color-aeblack-50, #f9fafb);
  color: var(--color-aeblack-900, #111827);
}

/* ─────────────────────────────────────────────────────────────────────
   Dark mode — .dark on <html> cascades into portal (document.body child).
   Mirrors light surface tokens with darker equivalents.
   ───────────────────────────────────────────────────────────────────── */

.dark .aegov-datepicker {
  background: var(--color-aeblack-900);
  color: var(--color-whitely-100);
  border-color: var(--color-aeblack-700);
}

.dark .datepicker__presets {
  background: var(--color-aeblack-800);
  border-right-color: var(--color-aeblack-700);
}

[dir="rtl"].dark .datepicker__presets,
.dark [dir="rtl"] .datepicker__presets {
  border-left-color: var(--color-aeblack-700);
}

.dark .datepicker__preset-btn {
  color: var(--color-aeblack-200);
}

.dark .datepicker__preset-btn:hover {
  background: var(--color-primary-900);
  color: var(--color-primary-200);
}

.dark .datepicker__preset-btn.preset--active {
  background: var(--color-primary-500);
  color: var(--color-primary-50);
}

.dark .datepicker__calendar + .datepicker__calendar {
  border-left-color: var(--color-aeblack-700);
}

[dir="rtl"].dark .datepicker__calendar + .datepicker__calendar,
.dark [dir="rtl"] .datepicker__calendar + .datepicker__calendar {
  border-right-color: var(--color-aeblack-700);
}

.dark .datepicker__nav-btn {
  color: var(--color-aeblack-300);
}

.dark .datepicker__nav-btn:hover {
  background: var(--color-aeblack-700);
  color: var(--color-whitely-100);
}

.dark .datepicker__select {
  border-color: var(--color-aeblack-700);
  color: var(--color-whitely-100);
  background-color: var(--color-aeblack-800);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23b9bbc1' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
}

.dark .datepicker__select:focus-visible {
  border-color: var(--color-primary-400);
  box-shadow: 0 0 0 1px var(--color-primary-400);
}

.dark .datepicker__month-label {
  color: var(--color-whitely-100);
}

.dark .datepicker__weekday {
  color: var(--color-aeblack-400);
}

.dark .datepicker__day {
  color: var(--color-whitely-100);
}

.dark .datepicker__day:hover:not(.datepicker__day--disabled):not(.datepicker__day--outside) {
  background: var(--color-primary-900);
}

.dark .datepicker__day:focus-visible {
  outline-color: var(--color-primary-400);
}

.dark .datepicker__day--today:not(.datepicker__day--selected):not(.datepicker__day--range-start):not(.datepicker__day--range-end) {
  color: var(--color-primary-300);
  box-shadow: inset 0 0 0 1px var(--color-primary-500);
}

.dark .datepicker__day--selected,
.dark .datepicker__day--range-start,
.dark .datepicker__day--range-end {
  background: var(--color-primary-500);
  color: var(--color-primary-50);
}

.dark .datepicker__day--selected:hover,
.dark .datepicker__day--range-start:hover,
.dark .datepicker__day--range-end:hover {
  background: var(--color-primary-500);
}

.dark .datepicker__day--in-range:not(.datepicker__day--range-start):not(.datepicker__day--range-end) {
  background: var(--color-primary-900);
  color: var(--color-primary-200);
}

.dark .datepicker__day--in-range:not(.datepicker__day--range-start):not(.datepicker__day--range-end):hover {
  background: var(--color-primary-800);
}

.dark .datepicker__day--range-invalid.datepicker__day--range-start,
.dark .datepicker__day--range-invalid.datepicker__day--range-end {
  background: var(--color-aered-500);
  color: var(--color-aered-50);
}

.dark .datepicker__day--range-invalid.datepicker__day--in-range:not(.datepicker__day--range-start):not(.datepicker__day--range-end) {
  background: var(--color-aered-950);
  color: var(--color-aered-200);
}

.dark .datepicker__day--range-invalid.datepicker__day--in-range:not(.datepicker__day--range-start):not(.datepicker__day--range-end):hover {
  background: var(--color-aered-900);
}

.dark .datepicker__day--disabled,
.dark .datepicker__day--outside {
  color: var(--color-aeblack-500);
}

.dark .datepicker__day--outside:hover {
  background: var(--color-aeblack-800);
}

.dark .datepicker__day--focused {
  outline-color: var(--color-primary-400);
}

.dark .datepicker__footer {
  border-top-color: var(--color-aeblack-700);
}

.dark .datepicker__footer-btn--cancel {
  color: var(--color-aeblack-200);
  border-color: var(--color-aeblack-600);
}

.dark .datepicker__footer-btn--cancel:hover {
  background: var(--color-aeblack-700);
  border-color: var(--color-aeblack-500);
}

.dark .datepicker__footer-btn--apply {
  background: var(--color-primary-500);
  border-color: var(--color-primary-500);
  color: var(--color-primary-50);
}

.dark .datepicker__footer-btn--apply:hover {
  background: var(--color-primary-400);
  border-color: var(--color-primary-400);
}

.dark .datepicker__footer-btn:focus-visible {
  outline-color: var(--color-primary-400);
}

/* Dark — secondary variant */
.dark .aegov-datepicker.datepicker-variant-secondary .datepicker__day--selected,
.dark .aegov-datepicker.datepicker-variant-secondary .datepicker__day--range-start,
.dark .aegov-datepicker.datepicker-variant-secondary .datepicker__day--range-end,
.dark .aegov-datepicker.datepicker-variant-secondary .datepicker__day--selected:hover,
.dark .aegov-datepicker.datepicker-variant-secondary .datepicker__day--range-start:hover,
.dark .aegov-datepicker.datepicker-variant-secondary .datepicker__day--range-end:hover {
  background: var(--color-secondary-500);
  color: var(--color-secondary-50);
}
.dark .aegov-datepicker.datepicker-variant-secondary .datepicker__day--today:not(.datepicker__day--selected):not(.datepicker__day--range-start):not(.datepicker__day--range-end) {
  color: var(--color-secondary-300);
  box-shadow: inset 0 0 0 1px var(--color-secondary-500);
}
.dark .aegov-datepicker.datepicker-variant-secondary .datepicker__day--in-range:not(.datepicker__day--range-start):not(.datepicker__day--range-end) {
  background: var(--color-secondary-900);
  color: var(--color-secondary-200);
}
.dark .aegov-datepicker.datepicker-variant-secondary .datepicker__day--in-range:not(.datepicker__day--range-start):not(.datepicker__day--range-end):hover {
  background: var(--color-secondary-800);
}
.dark .aegov-datepicker.datepicker-variant-secondary .datepicker__day:hover:not(.datepicker__day--selected):not(.datepicker__day--range-start):not(.datepicker__day--range-end):not(.datepicker__day--disabled):not(:disabled) {
  background: var(--color-secondary-900);
  color: var(--color-secondary-200);
}

/* Dark — neutral-max variant */
.dark .aegov-datepicker.datepicker-variant-neutral-max .datepicker__day--selected,
.dark .aegov-datepicker.datepicker-variant-neutral-max .datepicker__day--range-start,
.dark .aegov-datepicker.datepicker-variant-neutral-max .datepicker__day--range-end,
.dark .aegov-datepicker.datepicker-variant-neutral-max .datepicker__day--selected:hover,
.dark .aegov-datepicker.datepicker-variant-neutral-max .datepicker__day--range-start:hover,
.dark .aegov-datepicker.datepicker-variant-neutral-max .datepicker__day--range-end:hover {
  background: var(--color-aeblack-200);
  color: var(--color-aeblack-900);
}
.dark .aegov-datepicker.datepicker-variant-neutral-max .datepicker__day--today:not(.datepicker__day--selected):not(.datepicker__day--range-start):not(.datepicker__day--range-end) {
  color: var(--color-whitely-100);
  box-shadow: inset 0 0 0 1px var(--color-aeblack-400);
}
.dark .aegov-datepicker.datepicker-variant-neutral-max .datepicker__day--in-range:not(.datepicker__day--range-start):not(.datepicker__day--range-end) {
  background: var(--color-aeblack-700);
  color: var(--color-whitely-100);
}
.dark .aegov-datepicker.datepicker-variant-neutral-max .datepicker__day--in-range:not(.datepicker__day--range-start):not(.datepicker__day--range-end):hover {
  background: var(--color-aeblack-600);
}
.dark .aegov-datepicker.datepicker-variant-neutral-max .datepicker__day:hover:not(.datepicker__day--selected):not(.datepicker__day--range-start):not(.datepicker__day--range-end):not(.datepicker__day--disabled):not(:disabled) {
  background: var(--color-aeblack-700);
  color: var(--color-whitely-100);
}

/* Dark — neutral-min variant */
.dark .aegov-datepicker.datepicker-variant-neutral-min .datepicker__day--selected,
.dark .aegov-datepicker.datepicker-variant-neutral-min .datepicker__day--range-start,
.dark .aegov-datepicker.datepicker-variant-neutral-min .datepicker__day--range-end,
.dark .aegov-datepicker.datepicker-variant-neutral-min .datepicker__day--selected:hover,
.dark .aegov-datepicker.datepicker-variant-neutral-min .datepicker__day--range-start:hover,
.dark .aegov-datepicker.datepicker-variant-neutral-min .datepicker__day--range-end:hover {
  background: var(--color-aeblack-300);
  color: var(--color-aeblack-900);
}
.dark .aegov-datepicker.datepicker-variant-neutral-min .datepicker__day--today:not(.datepicker__day--selected):not(.datepicker__day--range-start):not(.datepicker__day--range-end) {
  color: var(--color-aeblack-200);
  box-shadow: inset 0 0 0 1px var(--color-aeblack-500);
}
.dark .aegov-datepicker.datepicker-variant-neutral-min .datepicker__day--in-range:not(.datepicker__day--range-start):not(.datepicker__day--range-end) {
  background: var(--color-aeblack-800);
  color: var(--color-whitely-100);
}
.dark .aegov-datepicker.datepicker-variant-neutral-min .datepicker__day--in-range:not(.datepicker__day--range-start):not(.datepicker__day--range-end):hover {
  background: var(--color-aeblack-700);
}
.dark .aegov-datepicker.datepicker-variant-neutral-min .datepicker__day:hover:not(.datepicker__day--selected):not(.datepicker__day--range-start):not(.datepicker__day--range-end):not(.datepicker__day--disabled):not(:disabled) {
  background: var(--color-aeblack-800);
  color: var(--color-whitely-100);
}
`;
