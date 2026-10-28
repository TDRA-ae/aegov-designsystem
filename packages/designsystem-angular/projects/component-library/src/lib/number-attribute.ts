/** A string that parses as a number, such as `'5'` or `'0.5'`. */
export type NumericString = `${number}`;

/**
 * Input transform for number properties, so a static attribute such as `pages="5"`
 * type-checks while `[pages]="'five'"` and `pages="five"` are compile errors.
 *
 * The number counterpart of the output target's `nullableBooleanAttribute`:
 * - the parameter type is what Angular derives `ngAcceptInputType_*` from, and
 *   `` `${number}` `` accepts only numeric string literals;
 * - `null` and `undefined` pass through (the `async` pipe and form values produce them);
 * - strings are parsed with `parseFloat`, as Stencil parses number props, so the
 *   value the component receives is unchanged.
 *
 * The template literal type is behind an alias because the Angular compiler emits
 * `ngAcceptInputType_*` from this parameter type and mangles an inline template
 * literal type in the published declarations (it came out as `mElenumbers`).
 *
 * Declared as a function so Angular can resolve it statically in partial compilation.
 * Wired up by `angularNumberAttributes()` in `packages/designsystem/stencil.config.ts`.
 */
export function nullableNumberAttribute(value: number | NumericString | null | undefined): number | null | undefined {
  if (value === null || value === undefined) {
    return value;
  }
  return typeof value === 'number' ? value : parseFloat(value);
}
