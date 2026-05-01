/**
 * Range preset calculations for aegov-datepicker
 */
import { stripTime } from './calendar';
function today() {
    return stripTime(new Date());
}
function addDays(date, days) {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d;
}
function startOfWeek(date, startDay) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = (day - startDay + 7) % 7;
    d.setDate(d.getDate() - diff);
    return stripTime(d);
}
function endOfWeek(date, startDay) {
    const start = startOfWeek(date, startDay);
    return addDays(start, 6);
}
function startOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
}
function endOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}
function startOfQuarter(date) {
    const q = Math.floor(date.getMonth() / 3) * 3;
    return new Date(date.getFullYear(), q, 1);
}
function endOfQuarter(date) {
    const q = Math.floor(date.getMonth() / 3) * 3 + 2;
    return endOfMonth(new Date(date.getFullYear(), q, 1));
}
function startOfYear(date) {
    return new Date(date.getFullYear(), 0, 1);
}
function endOfYear(date) {
    return new Date(date.getFullYear(), 11, 31);
}
function addMonths(date, months) {
    const d = new Date(date);
    d.setMonth(d.getMonth() + months);
    return d;
}
/**
 * All available preset definitions with their labels and calculation logic.
 */
const ALL_PRESETS = [
    // Current / Past
    {
        id: 'today',
        label: 'Today',
        calculate: () => ({ start: today(), end: today() }),
    },
    {
        id: 'yesterday',
        label: 'Yesterday',
        calculate: () => {
            const d = addDays(today(), -1);
            return { start: d, end: d };
        },
    },
    {
        id: 'thisWeek',
        label: 'This Week',
        calculate: (startDay) => ({
            start: startOfWeek(today(), startDay),
            end: endOfWeek(today(), startDay),
        }),
    },
    {
        id: 'lastWeek',
        label: 'Last Week',
        calculate: (startDay) => {
            const prev = addDays(today(), -7);
            return { start: startOfWeek(prev, startDay), end: endOfWeek(prev, startDay) };
        },
    },
    {
        id: 'last7Days',
        label: 'Last 7 Days',
        calculate: () => ({
            start: addDays(today(), -6),
            end: today(),
        }),
    },
    {
        id: 'last14Days',
        label: 'Last 14 Days',
        calculate: () => ({
            start: addDays(today(), -13),
            end: today(),
        }),
    },
    {
        id: 'last30Days',
        label: 'Last 30 Days',
        calculate: () => ({
            start: addDays(today(), -29),
            end: today(),
        }),
    },
    {
        id: 'thisMonth',
        label: 'This Month',
        calculate: () => ({
            start: startOfMonth(today()),
            end: endOfMonth(today()),
        }),
    },
    {
        id: 'lastMonth',
        label: 'Last Month',
        calculate: () => {
            const prev = addMonths(today(), -1);
            return { start: startOfMonth(prev), end: endOfMonth(prev) };
        },
    },
    {
        id: 'last3Months',
        label: 'Last 3 Months',
        calculate: () => ({
            start: addMonths(today(), -3),
            end: today(),
        }),
    },
    {
        id: 'last6Months',
        label: 'Last 6 Months',
        calculate: () => ({
            start: addMonths(today(), -6),
            end: today(),
        }),
    },
    {
        id: 'thisQuarter',
        label: 'This Quarter',
        calculate: () => ({
            start: startOfQuarter(today()),
            end: endOfQuarter(today()),
        }),
    },
    {
        id: 'lastQuarter',
        label: 'Last Quarter',
        calculate: () => {
            const prev = addMonths(today(), -3);
            return { start: startOfQuarter(prev), end: endOfQuarter(prev) };
        },
    },
    {
        id: 'thisYear',
        label: 'This Year',
        calculate: () => ({
            start: startOfYear(today()),
            end: endOfYear(today()),
        }),
    },
    {
        id: 'lastYear',
        label: 'Last Year',
        calculate: () => {
            const prev = new Date(today().getFullYear() - 1, 0, 1);
            return { start: startOfYear(prev), end: endOfYear(prev) };
        },
    },
    {
        id: 'yearToDate',
        label: 'Year to Date',
        calculate: () => ({
            start: startOfYear(today()),
            end: today(),
        }),
    },
    // Future
    {
        id: 'tomorrow',
        label: 'Tomorrow',
        calculate: () => {
            const d = addDays(today(), 1);
            return { start: d, end: d };
        },
    },
    {
        id: 'nextWeek',
        label: 'Next Week',
        calculate: (startDay) => {
            const next = addDays(today(), 7);
            return { start: startOfWeek(next, startDay), end: endOfWeek(next, startDay) };
        },
    },
    {
        id: 'next7Days',
        label: 'Next 7 Days',
        calculate: () => ({
            start: today(),
            end: addDays(today(), 6),
        }),
    },
    {
        id: 'next14Days',
        label: 'Next 14 Days',
        calculate: () => ({
            start: today(),
            end: addDays(today(), 13),
        }),
    },
    {
        id: 'next30Days',
        label: 'Next 30 Days',
        calculate: () => ({
            start: today(),
            end: addDays(today(), 29),
        }),
    },
    {
        id: 'nextMonth',
        label: 'Next Month',
        calculate: () => {
            const next = addMonths(today(), 1);
            return { start: startOfMonth(next), end: endOfMonth(next) };
        },
    },
    {
        id: 'next3Months',
        label: 'Next 3 Months',
        calculate: () => ({
            start: today(),
            end: addMonths(today(), 3),
        }),
    },
    {
        id: 'next6Months',
        label: 'Next 6 Months',
        calculate: () => ({
            start: today(),
            end: addMonths(today(), 6),
        }),
    },
    {
        id: 'nextQuarter',
        label: 'Next Quarter',
        calculate: () => {
            const next = addMonths(today(), 3);
            return { start: startOfQuarter(next), end: endOfQuarter(next) };
        },
    },
    {
        id: 'nextYear',
        label: 'Next Year',
        calculate: () => {
            const next = new Date(today().getFullYear() + 1, 0, 1);
            return { start: startOfYear(next), end: endOfYear(next) };
        },
    },
    {
        id: 'allTime',
        label: 'All Time',
        calculate: () => ({
            start: new Date(1970, 0, 1),
            end: new Date(2099, 11, 31),
        }),
    },
];
/**
 * Get preset definitions filtered by the requested preset IDs.
 *
 * @param presetIds - Array of preset IDs to include
 * @returns Matching preset definitions in the order requested
 */
export function getPresetDefinitions(presetIds) {
    return presetIds
        .map(id => ALL_PRESETS.find(p => p.id === id))
        .filter((p) => p !== undefined);
}
/**
 * Calculate a preset range by ID.
 *
 * @param presetId - The preset identifier
 * @param startDay - Week start day (for week-based presets)
 * @returns The calculated date range, or null if preset not found
 */
export function calculatePreset(presetId, startDay = 0) {
    const preset = ALL_PRESETS.find(p => p.id === presetId);
    if (!preset)
        return null;
    return preset.calculate(startDay);
}
/**
 * Get all available preset IDs.
 */
export function getAllPresetIds() {
    return ALL_PRESETS.map(p => p.id);
}
