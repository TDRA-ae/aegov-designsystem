/**
 * Adopts only the *spacing* (margin/padding) CSS rules matching `extraClass`'s classes into
 * a component's shadow root — colour, border, typography, and every other utility class
 * stays exactly as inert as it is today. This is a deliberate scope boundary, not a technical
 * limitation: spacing is a layout concern (how a component sits in a page), not a visual-
 * identity concern, so letting it through doesn't compromise design-system consistency the
 * way letting arbitrary colour/border overrides through would.
 *
 * Components with `shadow: true`/`{ delegatesFocus: true }` render `extraClass` onto an
 * element inside the shadow tree. Shadow encapsulation blocks the page's stylesheets
 * (e.g. a consuming app's compiled Tailwind CSS) from reaching that element, so
 * author-supplied utility classes have no effect. This scans `document.styleSheets` for
 * rules whose selector references one of `extraClass`'s *spacing* tokens, builds a stylesheet
 * from just those rules, and adopts it into the shadow root — leaving every other page rule
 * untouched. Works the same way regardless of the host framework (React, Angular, Vue,
 * plain HTML), since it reads from `document.styleSheets` rather than any
 * framework-specific build output.
 *
 * `@media`/`@supports` wrappers are preserved (they're genuinely conditional) — responsive
 * variants like `md:mt-8` work correctly. `@layer` wrappers are deliberately NOT preserved:
 * per the CSS Cascade Layers spec, an unlayered author rule always beats a layered one for
 * the same property, regardless of specificity or source order — and Tailwind (v4) emits
 * every utility class inside `@layer utilities`. Re-wrapping a matched rule in its original
 * `@layer utilities{...}` would make it silently lose to the component's own (frequently
 * unlayered) base styles. Dropping the wrapper and inlining the rule unlayered is what makes
 * it actually take effect once adopted.
 *
 * This only ever *copies* rules that already exist in the page's own stylesheets — it never
 * generates anything new. A spacing class with no matching rule anywhere on the page (e.g.
 * because the consuming app's own Tailwind build never generated it) will still silently
 * have no effect, exactly as it does today.
 *
 * Known gap: selectors that depend on matching an ancestor from inside the shadow root (e.g.
 * Tailwind's `dark:` variant, compiled as `:where(.dark, .dark *) .dark\:foo`) never match
 * once adopted — a shadow root can't resolve an ancestor condition across its own boundary,
 * whether `.dark` sits on the page or even on the component's own host element. Not something
 * this utility can route around; not something spacing variants need anyway.
 */

import { Build } from '@stencil/core';

const scopedSheetCache = new Map<string, CSSStyleSheet | null>();
/** Every CSSStyleSheet this utility has ever created, so dynamic re-syncs can tell "ours" apart from the host's own adopted sheets. */
const ownedSheets = new Set<CSSStyleSheet>();

function escapeForRegExp(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Matches Tailwind's margin/padding utilities: m/p, optional direction (t/b/s/e/x/y), a
// numeric (incl. fractional) scale step, `px`, or `auto` (margin only, but harmless to allow
// generically — a nonexistent `p-auto` rule simply won't be found on the page either way).
// Negative margins (`-mt-4`) are included; padding has no negative form in Tailwind.
const SPACING_UTILITY_PATTERN = /^-?(m|p)([tbslexy])?-(\d+(\.\d+)?|px|auto)$/;

/**
 * Whether `className` is a margin/padding utility, ignoring any leading variant prefixes
 * (`md:`, `hover:`, `dark:`, stacked `md:hover:`, etc.) — only the final segment matters.
 */
function isSpacingUtility(className: string): boolean {
  const base = className.includes(':') ? className.slice(className.lastIndexOf(':') + 1) : className;
  return SPACING_UTILITY_PATTERN.test(base);
}

function buildClassMatcher(className: string): RegExp {
  const escaped = typeof CSS !== 'undefined' && typeof CSS.escape === 'function'
    ? CSS.escape(className)
    : className;
  const pattern = escapeForRegExp(escaped);
  // Matches `.class-name` as a whole class token within a selector (including compound
  // selectors like `.hover\:mt-4:hover` or `:where(.dark, .dark *) .dark\:bg-red-500`),
  // not as a prefix of a longer class name (`.mt-4` must not match `.mt-40`).
  return new RegExp(`(^|[\\s,>+~(])\\.${pattern}(?![\\w-])`);
}

function ruleGroupHeader(rule: CSSRule): string {
  const text = rule.cssText;
  const braceIdx = text.indexOf('{');
  return braceIdx > -1 ? text.slice(0, braceIdx).trim() : '';
}

/**
 * Recursively collects matching rules' CSS text. `@media`/`@supports`/`@container` blocks
 * are preserved around their matches (genuinely conditional). `@layer` blocks are unwrapped —
 * their matched inner rules are inlined unlayered instead of being re-wrapped in `@layer
 * name{...}`, so they don't lose the cascade-layer priority fight against the component's
 * own (likely unlayered) styles once adopted.
 */
function collectMatchingCss(rules: CSSRuleList, matchers: RegExp[]): string {
  const parts: string[] = [];
  Array.from(rules).forEach((rule) => {
    if (rule instanceof CSSStyleRule) {
      if (matchers.some((matcher) => matcher.test(rule.selectorText))) {
        parts.push(rule.cssText);
      }
    } else if ('cssRules' in rule) {
      const inner = collectMatchingCss((rule as CSSGroupingRule).cssRules, matchers);
      if (!inner) return;
      const header = ruleGroupHeader(rule);
      if (header.startsWith('@layer')) {
        // Unwrap: inline the matched rules directly, deliberately dropping the layer.
        parts.push(inner);
      } else if (header) {
        parts.push(`${header}{${inner}}`);
      }
    }
  });
  return parts.join('\n');
}

function buildScopedCssText(classNames: string[]): string {
  const matchers = classNames.map(buildClassMatcher);
  const cssParts: string[] = [];
  Array.from(document.styleSheets).forEach((sheet) => {
    try {
      const text = collectMatchingCss(sheet.cssRules, matchers);
      if (text) cssParts.push(text);
    } catch {
      // Cross-origin or otherwise inaccessible stylesheet — skip it.
    }
  });
  return cssParts.join('\n');
}

function getOrBuildSheet(classNames: string[]): CSSStyleSheet | null {
  const cacheKey = classNames.slice().sort().join(' ');
  let sheet = scopedSheetCache.get(cacheKey);
  if (sheet !== undefined) {
    return sheet;
  }

  const cssText = buildScopedCssText(classNames);
  if (!cssText) {
    scopedSheetCache.set(cacheKey, null);
    return null;
  }
  sheet = new CSSStyleSheet();
  sheet.replaceSync(cssText);
  ownedSheets.add(sheet);
  scopedSheetCache.set(cacheKey, sheet);
  return sheet;
}

/**
 * Adopts the page-level CSS rules matching `extraClass`'s classes into `shadowRoot`,
 * replacing whatever this utility previously adopted there (so a changed or removed
 * `extraClass` value doesn't leave stale styles behind). Safe to call multiple times,
 * including with an empty/undefined `extraClass` to clear a previous adoption.
 */
export function adoptExtraClassStylesIntoShadowRoot(shadowRoot?: ShadowRoot | null, extraClass?: string): void {
  if (!shadowRoot) return;
  if (typeof CSSStyleSheet === 'undefined' || !('adoptedStyleSheets' in shadowRoot)) return;

  const tokens = (extraClass ?? '').split(/\s+/).filter(Boolean);
  const classNames = tokens.filter(isSpacingUtility);

  if (Build.isDev) {
    const rejected = tokens.filter((token) => !isSpacingUtility(token));
    if (rejected.length) {
      const tag = shadowRoot.host?.tagName?.toLowerCase() ?? 'unknown-component';
      console.warn(
        `[${tag}] extra-class only supports margin/padding utilities on this component ` +
          `(it renders in a real shadow root, so other CSS can't reach inside it). ` +
          `Ignoring non-spacing class(es): ${rejected.map((c) => `"${c}"`).join(', ')}. ` +
          `Wrap the component in your own element for other styling.`,
      );
    }
  }

  const nextSheet = classNames.length ? getOrBuildSheet(classNames) : null;

  const current = shadowRoot.adoptedStyleSheets;
  const withoutOurs = current.filter((s) => !ownedSheets.has(s));
  const next = nextSheet ? [...withoutOurs, nextSheet] : withoutOurs;

  const changed = next.length !== current.length || next.some((s, i) => s !== current[i]);
  if (changed) {
    shadowRoot.adoptedStyleSheets = next;
  }
}
