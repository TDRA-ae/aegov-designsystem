import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import {
  tailwind,
  tailwindGlobal,
  tailwindHMR,
  setPluginConfigurationDefaults
} from 'stencil-tailwind-plugin';
import { angularOutputTarget } from '@stencil/angular-output-target';
import { reactOutputTarget } from '@stencil/react-output-target';
import { vueOutputTarget } from '@stencil/vue-output-target';

const isProd = process.env.NODE_ENV === 'production';

// Global plugin defaults
setPluginConfigurationDefaults({
  enableDebug: !isProd,
  tailwindCssPath: './src/styles/tailwind.css',
  stripComments: isProd,
  minify: isProd,
  optimise: !isProd
});

export const config: Config = {
  namespace: 'aegov-design-system',
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

    // Development server output
    {
      type: 'www',
      serviceWorker: null,
      copy: [
        { src: 'styles' }
      ]
    },

    // Angular output target
    angularOutputTarget({
      componentCorePackage: '@aegov/design-system',
      outputType: 'standalone',
      directivesProxyFile: '../angular-workspace/projects/aegov-components/src/lib/stencil-generated/components.ts',
      directivesArrayFile: '../angular-workspace/projects/aegov-components/src/lib/stencil-generated/index.ts',
    }),

    // React output target
    reactOutputTarget({
      componentCorePackage: '@aegov/design-system',
      proxiesFile: '../react-library/src/components/stencil-generated/index.ts',
    }),

    // Vue output target
    vueOutputTarget({
      componentCorePackage: '@aegov/design-system',
      proxiesFile: '../vue-library/src/components.ts',
    }),
  ],

  // Testing configuration
  testing: {
    browserHeadless: 'new',
  },

  // Plugin configuration - ORDER MATTERS!
  plugins: [
    sass(),           // 1. Sass preprocessing (if used)
    tailwindGlobal(), // 2. Global Tailwind styles
    tailwind(),       // 3. Component-scoped Tailwind
    tailwindHMR()     // 4. Hot Module Reloading (dev only)
  ],

  // Dev server configuration
  devServer: {
    reloadStrategy: 'pageReload',  // Required for proper HMR with Web Components
    port: 3333
  },

  // Enable source maps in development
  sourceMap: !isProd,

  // Extras for better compatibility
  extras: {
    enableImportInjection: true,
  }
};
