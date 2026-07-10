/**
 * Range preset calculations for aegov-datepicker
 */
import { DatepickerPreset } from '../../../utils/types';
export interface PresetRange {
    start: Date;
    end: Date;
}
export interface PresetDefinition {
    id: DatepickerPreset;
    label: string;
    calculate: (startDay: number) => PresetRange;
}
/**
 * Get preset definitions filtered by the requested preset IDs.
 *
 * @param presetIds - Array of preset IDs to include
 * @returns Matching preset definitions in the order requested
 */
export declare function getPresetDefinitions(presetIds: DatepickerPreset[]): PresetDefinition[];
/**
 * Calculate a preset range by ID.
 *
 * @param presetId - The preset identifier
 * @param startDay - Week start day (for week-based presets)
 * @returns The calculated date range, or null if preset not found
 */
export declare function calculatePreset(presetId: DatepickerPreset, startDay?: number): PresetRange | null;
/**
 * Get all available preset IDs.
 */
export declare function getAllPresetIds(): DatepickerPreset[];
