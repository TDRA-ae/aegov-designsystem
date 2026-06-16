/**
 * Responsive Prop Utility
 *
 * Resolves a prop value that may contain Tailwind-style breakpoint prefixes,
 * e.g. `"sm xl:lg"` means `sm` by default, switch to `lg` at the `xl` breakpoint.
 *
 * Breakpoint pixel values are read from CSS custom properties on :root
 * (--breakpoint-xs, --breakpoint-sm, …) so they automatically pick up any
 * user-defined Tailwind theme overrides.
 *
 * Graceful degradation:
 * - Unknown breakpoint names → silently ignored
 * - Invalid values (not in validValues) → silently ignored
 * - Unrecognised base value → falls back to defaultValue
 */
export interface ResponsivePropWatcher {
    readonly current: string;
    destroy(): void;
}
/**
 * The validator that decides whether a parsed token is acceptable.
 * - `readonly T[]` — strict enum: token must be one of the listed values.
 * - `(value: string) => boolean` — custom predicate, used for free-form props
 *   like aspect-ratio where any `n/m` shape (or named preset) is valid.
 */
export type ResponsivePropValidator<T extends string> = readonly T[] | ((value: string) => boolean);
/**
 * Watch a responsive prop string and call `onChange` whenever the resolved
 * value changes due to a viewport resize.
 *
 * @param raw        - The raw prop value, e.g. `"sm xl:lg"` or just `"base"`
 * @param validate   - Either an enum array of allowed values, or a predicate
 *                     function that returns `true` for an acceptable token.
 *                     Use the predicate form for free-form props (e.g. aspect
 *                     ratios like `'21/9'` that aren't part of a fixed enum).
 * @param defaultValue - Fallback when the base token is invalid
 * @param onChange   - Called immediately with the initial value, then on every change
 * @returns A watcher object with `.current` and `.destroy()`
 */
export declare function watchResponsiveProp<T extends string>(raw: string, validate: ResponsivePropValidator<T>, defaultValue: T, onChange: (value: T) => void): ResponsivePropWatcher;
