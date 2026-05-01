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

interface BreakpointEntry<T extends string> {
  minWidth: number;
  value: T;
}

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
export type ResponsivePropValidator<T extends string> =
  | readonly T[]
  | ((value: string) => boolean);

function isValid<T extends string>(validate: ResponsivePropValidator<T>, value: string): boolean {
  if (typeof validate === 'function') return validate(value);
  return (validate as readonly string[]).includes(value);
}

function readBreakpointPx(name: string): number | null {
  if (typeof document === 'undefined') return null;
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(`--breakpoint-${name}`)
    .trim();
  if (!raw) return null;
  return parseFloat(raw);
}

function parseRaw<T extends string>(
  raw: string,
  validate: ResponsivePropValidator<T>,
  defaultValue: T,
): { base: T; breakpoints: BreakpointEntry<T>[] } {
  const parts = raw.trim().split(/\s+/);
  let base: T = defaultValue;
  const breakpoints: BreakpointEntry<T>[] = [];

  for (const part of parts) {
    const colonIdx = part.indexOf(':');
    if (colonIdx !== -1) {
      const bpName = part.slice(0, colonIdx);
      const val = part.slice(colonIdx + 1);
      const px = readBreakpointPx(bpName);
      if (px !== null && isValid(validate, val)) {
        breakpoints.push({ minWidth: px, value: val as T });
      }
      // Unknown breakpoint or invalid value → silently skip
    } else {
      if (isValid(validate, part)) {
        base = part as T;
      }
      // Invalid base value → silently fall back to defaultValue
    }
  }

  // Sort descending — largest min-width checked first (mobile-first resolution)
  breakpoints.sort((a, b) => b.minWidth - a.minWidth);

  return { base, breakpoints };
}

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
export function watchResponsiveProp<T extends string>(
  raw: string,
  validate: ResponsivePropValidator<T>,
  defaultValue: T,
  onChange: (value: T) => void,
): ResponsivePropWatcher {
  const { base, breakpoints } = parseRaw(raw, validate, defaultValue);

  // No responsive breakpoints — static resolution, no listeners needed
  if (breakpoints.length === 0 || typeof window === 'undefined') {
    onChange(base);
    return {
      get current() { return base; },
      destroy() {},
    };
  }

  const mqls = breakpoints.map(bp => ({
    mql: window.matchMedia(`(min-width: ${bp.minWidth}px)`),
    value: bp.value,
  }));

  let _current: T = base;

  function resolve(): T {
    for (const { mql, value } of mqls) {
      if (mql.matches) return value;
    }
    return base;
  }

  function update() {
    const next = resolve();
    if (next !== _current) {
      _current = next;
      onChange(next);
    }
  }

  mqls.forEach(({ mql }) => mql.addEventListener('change', update));

  // Resolve immediately
  _current = resolve();
  onChange(_current);

  return {
    get current() { return _current; },
    destroy() {
      mqls.forEach(({ mql }) => mql.removeEventListener('change', update));
    },
  };
}
