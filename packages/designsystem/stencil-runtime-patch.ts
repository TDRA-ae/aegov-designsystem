import { readFileSync, renameSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';

/**
 * Keeps `is-*="false"` meaning off on form-associated components.
 *
 * Stencil 4.45.2 reads any present boolean attribute as `true` on form-associated
 * components (stenciljs/core#6908), so `<aegov-button is-disabled="false">` would be
 * disabled. That rule exists for the native `disabled` attribute; our `is-*`
 * attributes have no native meaning, and the docs, the other components and the
 * default-true props (is-bold, is-clearable, is-header-selectable) rely on "false"
 * meaning off.
 *
 * stencil.config.ts runs this before every build and test, so it applies however the
 * package is installed: from the repo root or as a standalone folder. The built
 * output bundles the runtime, so the fix ships to users. `verify:build` and
 * src/utils/boolean-attributes.e2e.ts fail if it is missing.
 */
const STENCIL_VERSION = '4.45.2';
const UNPATCHED = 'newValue = newValue === null || newValue === "false" && !isFormAssociated ? false : true;';
const PATCHED = 'newValue = newValue === null || newValue === "false" ? false : true;';
const RUNTIMES = ['internal/client/index.js', 'internal/hydrate/index.js', 'internal/testing/index.js'];

export function patchStencilRuntime(): void {
  // package.json isn't exported by @stencil/core; internal/client is, at <root>/internal/client/index.js.
  const stencilRoot = join(dirname(require.resolve('@stencil/core/internal/client')), '..', '..');
  const { version } = JSON.parse(readFileSync(join(stencilRoot, 'package.json'), 'utf8'));
  if (version !== STENCIL_VERSION) {
    throw new Error(
      `@stencil/core ${version} is installed, but stencil-runtime-patch.ts targets ${STENCIL_VERSION}. ` +
        'Install the pinned version, or re-check the is-*="false" patch for the new version.',
    );
  }

  for (const runtime of RUNTIMES) {
    const file = join(stencilRoot, runtime);
    const source = readFileSync(file, 'utf8');
    if (source.includes(PATCHED) && !source.includes(UNPATCHED)) continue;
    if (source.split(UNPATCHED).length !== 2) {
      throw new Error(`Cannot apply the is-*="false" patch: the expected line was not found exactly once in ${file}.`);
    }
    // Write a new file and rename it over the old one, so a hard-linked install isn't changed in place.
    const temporary = `${file}.aegov-patch`;
    writeFileSync(temporary, source.replace(UNPATCHED, PATCHED));
    renameSync(temporary, file);
  }
}
