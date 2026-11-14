import { readFileSync } from 'fs';
import { join } from 'path';

/**
 * E2E pages load the components and the base stylesheet, but not the theme,
 * which a real project compiles from `@aegov/designsystem/theme`. Components
 * that read colour tokens (`--aegov-surface`, `--aegov-text`, …) need the
 * theme colours those tokens point at, so tests that check colours add them
 * with `page.addStyleTag({ content: themeColours() })`.
 *
 * Test-only: never import from component code.
 */
export function themeColours(): string {
  const theme = readFileSync(join(__dirname, '../styles/tailwind.css'), 'utf8');
  const declarations = [...theme.matchAll(/^\s*(--color-[a-z0-9-]+:[^;]+;)/gm)].map(m => m[1]);
  return `:root { ${declarations.join(' ')} }`;
}
