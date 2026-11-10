import { Config } from '@stencil/core';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { sass } from '@stencil/sass';
import tailwindPlugin, {
  tailwindGlobal,
  tailwindHMR,
  setPluginConfigurationDefaults
} from 'stencil-tailwind-plugin';
import { angularOutputTarget } from '@stencil/angular-output-target';
import type { OutputTargetCustom } from '@stencil/core/internal';
import { reactOutputTarget } from '@stencil/react-output-target';
import { vueOutputTarget } from '@stencil/vue-output-target';
import { patchStencilRuntime } from './stencil-runtime-patch';

patchStencilRuntime();

// `--prod` works on every OS; NODE_ENV=production is kept for existing scripts.
const isProd = process.env.NODE_ENV === 'production' || process.argv.includes('--prod');

// Strip @source inline() lines for the per-component compile — they exist
// only to keep theme tokens alive against the consumer's own build, which
// does normal (non-reference) theme pruning. @theme reference mode (used
// below) never prunes or emits theme values regardless of detected usage,
// so these lines are pure overhead here: 55 components x ~20 lines of
// forced dead-utility generation for zero effect. Stripping them is what
// keeps the per-component build at its original speed.
const componentTailwindCss = readFileSync(
  resolve(__dirname, './src/styles/tailwind.css'),
  'utf8'
).replace(
  '@import "tailwindcss/utilities.css" layer(utilities)',
  '@import "tailwindcss/utilities.css" layer(base)'
).replace(
  /^@theme \{/m,
  '@theme reference {'
).replace(/^@source inline\([^)]*\);\n/gm, '');

setPluginConfigurationDefaults({
  enableDebug: !isProd,
  injectTailwindConfiguration: () => componentTailwindCss,
  stripComments: isProd,
  minify: isProd,
  optimise: !isProd
});

const angularProxyFile = resolve(
  __dirname,
  '../designsystem-angular/projects/component-library/src/lib/stencil-generated/components.ts'
);

/**
 * Gives number props an Angular input transform, the counterpart of the output
 * target's `booleanAttributes` (which only covers booleans). With `inlineProperties`
 * the wrappers declare typed inputs, so without a transform a static `pages="5"`
 * would be a string assigned to a number input and fail under strictTemplates.
 * Runs after the output target has generated the proxies and edits only the
 * `@Component` inputs list of each wrapper.
 */
function angularNumberAttributes(target: OutputTargetCustom): OutputTargetCustom {
  return {
    ...target,
    async generator(config, compilerCtx, buildCtx, docs) {
      await target.generator(config, compilerCtx, buildCtx, docs);
      let text = await compilerCtx.fs.readFile(angularProxyFile);
      let transformed = 0;
      for (const cmp of buildCtx.components) {
        const numberProps = cmp.properties.filter((prop) => prop.type === 'number' && !prop.internal);
        if (numberProps.length === 0) continue;
        const inputsLine = new RegExp(
          `(selector: '${cmp.tagName}',[\\s\\S]*?no-inputs-metadata-property\\n  inputs: \\[)([^\\n]*)(\\],)`
        );
        text = text.replace(inputsLine, (_match, start: string, inputs: string, end: string) => {
          for (const prop of numberProps) {
            const before = inputs;
            inputs = inputs.replace(`'${prop.name}'`, `{ name: '${prop.name}', transform: nullableNumberAttribute }`);
            if (inputs === before) throw new Error(`angularNumberAttributes: input ${cmp.tagName}.${prop.name} not found`);
            transformed++;
          }
          return start + inputs + end;
        });
      }
      if (transformed > 0) {
        text = text.replace(
          "import { ProxyCmp } from './angular-component-lib/utils';",
          "import { ProxyCmp } from './angular-component-lib/utils';\nimport { nullableNumberAttribute } from '../number-attribute';"
        );
      }
      await compilerCtx.fs.writeFile(angularProxyFile, text);
    },
  };
}

export const config: Config = {
  namespace: 'aegov',
  globalScript: 'src/global/app.ts',
  globalStyle: 'src/global/global.css',

  // Output targets for different build formats
  outputTargets: [
    // Standard distribution
    {
      type: 'dist',
      esmLoaderPath: '../loader',
    },

    // Custom elements bundle (tree-shakeable)
    // 'single-export-module' is required by the Angular/React wrappers: each wrapper
    // calls its component's defineCustomElement() itself, so component modules must not
    // self-register on import — otherwise every app bundles and registers all components.
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'single-export-module',
      externalRuntime: false,
    },

    // Documentation JSON
    {
      type: 'docs-readme',
    },
    {
      type: 'docs-json',
      file: 'dist/docs.json'
    },

    // inlineProperties declares a typed member per input so strictTemplates checks value
    // types; booleanAttributes and angularNumberAttributes add input transforms so static
    // attributes (isDisabled, isDisabled="false", pages="5") still type-check.
    angularNumberAttributes(angularOutputTarget({
      componentCorePackage: '@aegov/designsystem',
      outputType: 'standalone',
      directivesProxyFile: '../designsystem-angular/projects/component-library/src/lib/stencil-generated/components.ts',
      directivesArrayFile: '../designsystem-angular/projects/component-library/src/lib/stencil-generated/index.ts',
      inlineProperties: true,
      booleanAttributes: true,
    })),
    reactOutputTarget({
      stencilPackageName: '@aegov/designsystem',
      outDir: '../designsystem-react/lib/components/stencil-generated/',
    }),
    // Each Vue proxy registers its own component from the custom elements bundle
    // (like the Angular/React wrappers), so props set on first render are not lost.
    // componentModels wire v-model to the prop each component updates before emitting
    // the event; v-model reads it back from event.target.
    vueOutputTarget({
      componentCorePackage: '@aegov/designsystem',
      proxiesFile: '../designsystem-vue/lib/components.ts',
      includeImportCustomElements: true,
      componentModels: [
        { elements: ['aegov-input'], event: 'aegovInputValue', targetAttr: 'value' },
        { elements: ['aegov-textarea'], event: 'aegovTextareaValue', targetAttr: 'value' },
        { elements: ['aegov-select'], event: 'aegovSelectChange', targetAttr: 'value' },
        { elements: ['aegov-otp'], event: 'aegovOtpChange', targetAttr: 'value' },
        { elements: ['aegov-range'], event: 'aegovRangeInput', targetAttr: 'value' },
        { elements: ['aegov-datepicker'], event: 'aegovDatepickerChange', targetAttr: 'value' },
        { elements: ['aegov-checkbox'], event: 'aegovCheckboxChange', targetAttr: 'isChecked' },
        { elements: ['aegov-toggle'], event: 'aegovToggleChange', targetAttr: 'isChecked' },
        { elements: ['aegov-radio'], event: 'aegovRadioChange', targetAttr: 'isChecked' },
      ],
    }),
  ],

  // Testing configuration
  testing: {
    browserHeadless: "shell",
    testPathIgnorePatterns: [
      '/node_modules/',
      '/.stencil/',
      '/dist/',
      '/www/',
      '/tests/',
      '/backup/',
    ],
  },

  // Plugin configuration - ORDER MATTERS!
  // NOTE: With scoped CSS, each component bundle includes Tailwind base layer
  // To minimize duplication, always include <link rel="stylesheet" href="/build/aegov.css">
  // in your HTML before loading components
  plugins: [
    sass(),             // 1. Sass preprocessing (if used)
    tailwindGlobal(),   // 2. Global Tailwind styles
    tailwindPlugin(),   // 3. Component-scoped Tailwind
    tailwindHMR()       // 4. Hot Module Reloading (dev only)
  ],

  // Dev server configuration
  devServer: {
    reloadStrategy: 'pageReload',  // Required for proper HMR with Web Components
    port: 3333
  },

  // Enable source maps in development
  sourceMap: !isProd,

  // Disable the injected <style> that hides components until hydrated.
  // Safe because our components have well-defined CSS (Tailwind utilities + aegov-* classes).
  // If you see a flash of unstyled content (FOUC), revert this to true.
  invisiblePrehydration: true,

  // Extras for better compatibility
  extras: {
    enableImportInjection: true,
  }
};
