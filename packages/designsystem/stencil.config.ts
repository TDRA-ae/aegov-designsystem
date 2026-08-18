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
import { reactOutputTarget } from '@stencil/react-output-target';
import { vueOutputTarget } from '@stencil/vue-output-target';

const isProd = process.env.NODE_ENV === 'production';

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
    {
      type: 'dist-custom-elements',
      customElementsExportBehavior: 'auto-define-custom-elements',
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

    angularOutputTarget({
      componentCorePackage: '@aegov/designsystem',
      outputType: 'standalone',
      directivesProxyFile: '../designsystem-angular/projects/component-library/src/lib/stencil-generated/components.ts',
      directivesArrayFile: '../designsystem-angular/projects/component-library/src/lib/stencil-generated/index.ts',
    }),
    reactOutputTarget({
      stencilPackageName: '@aegov/designsystem',
      outDir: '../designsystem-react/lib/components/stencil-generated/',
    }),
    vueOutputTarget({
      componentCorePackage: '@aegov/designsystem',
      proxiesFile: '../designsystem-vue/lib/components.ts',
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
  invisiblePrehydration: false,

  // Extras for better compatibility
  extras: {
    enableImportInjection: true,
  }
};
