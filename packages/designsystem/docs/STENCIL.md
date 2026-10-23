# StencilJS Complete Reference Guide

> A comprehensive reference guide for StencilJS v4.42+ - The Web Component Compiler
>
> **Version:** 4.42  
> **Last Updated:** March 2026  
> **Official Docs:** https://stenciljs.com/docs/introduction

---

## Table of Contents

1. [Introduction & Overview](#introduction--overview)
2. [Core Concepts](#core-concepts)
3. [Component API](#component-api)
4. [Lifecycle Hooks](#lifecycle-hooks)
5. [Styling](#styling)
6. [Output Targets](#output-targets)
7. [Framework Integrations](#framework-integrations)
8. [Server-Side Rendering (SSR)](#server-side-rendering-ssr)
9. [Service Workers & PWA](#service-workers--pwa)
10. [Web Workers](#web-workers)
11. [Testing](#testing)
12. [Publishing & Distribution](#publishing--distribution)
13. [Storybook Integration](#storybook-integration)
14. [Build Configuration](#build-configuration)
15. [Performance Optimization](#performance-optimization)
16. [Advanced Features](#advanced-features)
17. [Migration Guide](#migration-guide)
18. [Quick Reference](#quick-reference)

---

## Introduction & Overview

### What is StencilJS?

StencilJS is a **compiler** that generates Web Components (Custom Elements). It combines the best concepts from popular frontend frameworks (React, Angular, Vue) into a build-time tool rather than a runtime framework.

**Key Characteristics:**
- Generates standards-compliant Custom Elements
- Works with React, Angular, Vue, Ember right out of the box
- Framework-specific wrappers can be auto-generated
- Virtual DOM, JSX, async rendering
- Prerendering support
- Zero runtime overhead (after compilation)

**Primary Use Case:** Design systems & component libraries

**Created By:** Ionic Framework team, now owned by OutSystems

### Getting Started

```bash
# Create a new Stencil project
npm init stencil

# Choose project type:
# - component (web components library)
# - app (minimal PWA starter)
# - ionic-pwa (Ionic PWA starter)

# Navigate to project
cd my-project

# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

**Reference:** https://stenciljs.com/docs/getting-started

---

## Core Concepts

### Project Structure

```
my-project/
├── src/
│   ├── components/          # Your web components
│   │   └── my-component/
│   │       ├── my-component.tsx
│   │       ├── my-component.css
│   │       ├── my-component.spec.ts
│   │       └── my-component.e2e.ts
│   ├── utils/              # Shared utilities
│   ├── global/             # Global styles
│   └── index.html          # Entry HTML
├── stencil.config.ts        # Stencil configuration
├── tsconfig.json
└── package.json
```

### Basic Component Structure

```tsx
import { Component, Prop, State, h } from '@stencil/core';

@Component({
  tag: 'my-component',           // Custom element tag name
  styleUrl: 'my-component.css',  // Stylesheet
  shadow: true,                  // Use Shadow DOM (optional)
  scoped: true,                  // Use scoped CSS (optional, default)
})
export class MyComponent {
  @Prop() first: string;         // Public property (attribute)
  @State() private count: number = 0; // Internal state

  render() {
    return <div>Hello, {this.first}!</div>;
  }
}
```

**Reference:** https://stenciljs.com/docs/component

---

## Component API

### Decorators

| Decorator | Description | Reference |
|-----------|-------------|-----------|
| `@Component()` | Declares a new web component | https://stenciljs.com/docs/component |
| `@Prop()` | Exposes property/attribute to consumers | https://stenciljs.com/docs/properties |
| `@State()` | Internal component state | https://stenciljs.com/docs/state |
| `@Watch()` | Hook when props/state change | https://stenciljs.com/docs/properties#the-watch-decorator-watch |
| `@Element()` | Reference to host element | https://stenciljs.com/docs/host-element |
| `@Method()` | Exposes public method | https://stenciljs.com/docs/methods |
| `@Event()` | Declares DOM event | https://stenciljs.com/docs/events |
| `@Listen()` | Listens for DOM events | https://stenciljs.com/docs/events#listening-to-events |
| `@AttachInternals()` | Form-associated internals | https://stenciljs.com/docs/form-associated |

### @Component Options

```typescript
@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',     // Single stylesheet
  styleUrls: {                      // Multiple stylesheets
    ios: 'my-component.ios.css',
    md: 'my-component.md.css'
  },
  shadow: true,                     // Shadow DOM (default: false)
  scoped: true,                     // Scoped CSS (default: true if shadow: false)
  formAssociated: true,             // Form-associated custom element
  assetsDirs: ['./assets'],         // Static assets directory
  configurations: [],               // Build configurations
})
```

**Reference:** https://stenciljs.com/docs/component

### @Prop Options

```typescript
@Prop() name: string;                    // Basic prop
@Prop({ attribute: 'custom-name' }) val: string; // Custom attribute name
@Prop({ mutable: true }) value: string;  // Can be mutated by consumer
@Prop({ reflect: true }) count: number;  // Reflect to attribute
@Prop({ context: 'config' }) config: any; // DEPRECATED - Context API
@Prop({ connect: 'ion-menu' }) menu: any; // DEPRECATED - Lazy loading
```

**Reference:** https://stenciljs.com/docs/properties

### @Event Options

```typescript
@Event() myEvent: EventEmitter;                    // Basic event
@Event({ eventName: 'customEvent', bubbles: true, composed: true }) 
emitted: EventEmitter;
```

**Event Emission:**
```typescript
this.myEvent.emit({ detail: 'data' });
```

**Reference:** https://stenciljs.com/docs/events

### @Listen Options

```typescript
@Listen('click')
handleClick(event: MouseEvent) { }

@Listen('click', { target: 'window' })
handleWindowClick() { }

@Listen('keydown', { enabled: true })
handleKeyDown() { }
```

**Reference:** https://stenciljs.com/docs/events#listening-to-events

---

## Lifecycle Hooks

### Order of Execution

```
1. connectedCallback()        #每次连接到DOM
2. componentWillLoad()        #首次加载前
3. componentDidLoad()         #首次加载后
4. [Property change detected]
5. componentShouldUpdate()    #决定是否重渲染
6. componentWillRender()      #每次渲染前
7. render()                   #渲染JSX
8. componentDidRender()       #每次渲染后
9. componentWillUpdate()     #更新前
10. componentDidUpdate()      #更新后
11. disconnectedCallback()    #断开连接时
```

### Detailed Lifecycle Methods

| Method | Description | First Render | Subsequent Renders |
|--------|-------------|--------------|-------------------|
| `connectedCallback()` | Called when component connects to DOM | ✅ | ✅ |
| `componentWillLoad()` | Called once before first render | ✅ | ❌ |
| `componentDidLoad()` | Called once after first render | ✅ | ❌ |
| `componentShouldUpdate()` | Return boolean to control rerender | ❌ | ✅ |
| `componentWillRender()` | Called before every render | ✅ | ✅ |
| `render()` | Returns JSX | ✅ | ✅ |
| `componentDidRender()` | Called after every render | ✅ | ✅ |
| `componentWillUpdate()` | Called before update | ❌ | ✅ |
| `componentDidUpdate()` | Called after update | ❌ | ✅ |
| `disconnectedCallback()` | Called when disconnected from DOM | ✅ | ✅ |

### Async Lifecycle Methods

Some lifecycle methods can return Promises:

```typescript
async componentWillLoad() {
  const data = await fetch('/api/data');
  this.data = await data.json();
}
```

### Lifecycle Hierarchy

Child components complete loading before parent:
```
<cmp-a>
  <cmp-b>
    <cmp-c></cmp-c>
  </cmp-b>
</cmp-a>

# Order:
# 1. cmp-a componentWillLoad()
# 2. cmp-b componentWillLoad()
# 3. cmp-c componentWillLoad()
# 4. cmp-c componentDidLoad()
# 5. cmp-b componentDidLoad()
# 6. cmp-a componentDidLoad()
```

**Reference:** https://stenciljs.com/docs/component-lifecycle

---

## Styling

### Shadow DOM vs Scoped CSS

| Feature | Shadow DOM | Scoped CSS |
|---------|------------|------------|
| Encapsulation | Native | Emulated (data attributes) |
| Performance | Faster | Slightly slower |
| External styling | `::part()` | N/A |
| @media queries | Outside component | Inside component |
| Inheritance | No | Partial |

### Shadow DOM

```typescript
@Component({
  tag: 'my-component',
  shadow: true,  // Enables Shadow DOM
})
export class MyComponent { }
```

**External Styling with ::part:**
```css
/* Consumer CSS */
my-component::part(button) {
  background: blue;
}
```

```typescript
// Component
render() {
  return <button part="button">Click</button>;
}
```

### Scoped CSS

```typescript
@Component({
  tag: 'my-component',
  scoped: true,  // Default when shadow: false
})
export class MyComponent { }
```

### CSS Variables (Theming)

```css
/* Component */
:host {
  --primary-color: #007bff;
}
button {
  background: var(--primary-color);
}
```

```css
/* Consumer */
my-component {
  --primary-color: red;
}
```

### Style Modes (Multiple Themes)

```typescript
@Component({
  tag: 'my-component',
  styleUrls: {
    ios: 'my-component.ios.css',
    md: 'my-component.md.css',
  }
})
export class MyComponent { }
```

### Constructable Stylesheets

For better SSR performance with Shadow DOM:

```typescript
import { h } from '@stencil/core';
import styles from './my-component.css?inline';

@Component({
  tag: 'my-component',
  shadow: true,
})
export class MyComponent {
  componentWillLoad() {
    this.el.shadowRoot.adoptedStyleSheets = [styles];
  }
}
```

**Reference:** https://stenciljs.com/docs/styling

---

## Output Targets

### Types of Output Targets

| Type | Use Case | Reference |
|------|----------|-----------|
| `dist` | Lazy-loading library | https://stenciljs.com/docs/distribution |
| `dist-custom-elements` | Framework integrations | https://stenciljs.com/docs/custom-elements |
| `www` | Development/website | https://stenciljs.com/docs/www |
| `dist-hydrate-script` | SSR hydration | https://stenciljs.com/docs/server-side-rendering |
| `docs-json` | Documentation | https://stenciljs.com/docs/doc-generation |

### dist (Lazy Loading)

```typescript
outputTargets: [
  {
    type: 'dist',
    esmLoaderPath: '../loader',
    dir: 'dist',
    empty: true,
  }
]
```

**Features:**
- Auto-lazy loads components when used
- Tree-shakeable
- Ideal for vanilla JS and framework-agnostic usage
- Generates loader for component registration

### dist-custom-elements (Standalone)

```typescript
outputTargets: [
  {
    type: 'dist-custom-elements',
    generateTypeDeclarations: true,
    customElementsExportBehavior: 'single-export-module',
    externalRuntime: true,
  }
]
```

**Features:**
- Each component as standalone class
- For bundlers (Vite, Webpack, Rollup)
- Components are not registered on import; call each component's `defineCustomElement()` (the Angular/React wrappers do this for you). Do not switch back to `auto-define-custom-elements`: it makes every import register — and bundle — all components.

### www (Development)

```typescript
outputTargets: [
  {
    type: 'www',
    dir: 'www',
    serviceWorker: { /* Workbox config */ }
  }
]
```

**Features:**
- Development server
- Hot Module Replacement
- Service worker generation for PWA

### docs-json

```typescript
outputTargets: [
  {
    type: 'docs-json',
    file: 'dist/docs.json'
  }
]
```

**Generates:**
- Component metadata
- Props, events, methods
- JSDoc documentation
- CSS custom properties

**Reference:** https://stenciljs.com/docs/output-targets

---

## Framework Integrations

### React Integration

**Package:** `@stencil/react-output-target`

**Setup:**
```bash
npm install @stencil/react-output-target --save-dev
```

**Configuration:**
```typescript
import { reactOutputTarget } from '@stencil/react-output-target';

outputTargets: [
  reactOutputTarget({
    componentCorePackage: 'my-designsystem',
    proxiesFile: '../react-lib/src/components.ts',
    includeDefineCustomElements: true,
  }),
]
```

**Usage in React:**
```tsx
import { MyComponent } from 'my-designsystem-react';

function App() {
  return <MyComponent first="John" onMyEvent={(e) => console.log(e)} />;
}
```

**Reference:** https://stenciljs.com/docs/react

---

### Vue Integration

**Package:** `@stencil/vue-output-target`

**Setup:**
```bash
npm install @stencil/vue-output-target --save-dev
```

**Configuration:**
```typescript
import { vueOutputTarget } from '@stencil/vue-output-target';

outputTargets: [
  vueOutputTarget({
    componentCorePackage: 'my-designsystem',
    proxiesFile: '../vue-lib/src/components.ts',
    componentModels: [
      { elements: ['my-input'], event: 'v-on-change', targetAttr: 'value' }
    ],
  }),
]
```

**v-model Support:**
```vue
<template>
  <my-input v-model="value" />
</template>
```

**Reference:** https://stenciljs.com/docs/vue

---

### Angular Integration

**Package:** `@stencil/angular-output-target`

**Setup:**
```bash
npm install @stencil/angular-output-target --save-dev
```

**Configuration:**
```typescript
import { angularOutputTarget } from '@stencil/angular-output-target';

outputTargets: [
  angularOutputTarget({
    componentCorePackage: 'my-designsystem',
    directivesProxyFile: '../angular-lib/src/lib/directives/proxies.ts',
  }),
]
```

**Reference:** https://stenciljs.com/docs/angular

---

## Server-Side Rendering (SSR)

### Two SSR Approaches

#### Strategy 1: Compiler Approach (Universal SSR)

- Works with Vite, Remix, Next.js, any meta-framework
- Zero runtime overhead - pre-rendered at build time
- Best for: static props, content-focused sites, performance-critical apps
- Limitation: Cannot resolve dynamic props (function calls)

**Installation:**
```bash
npm install @stencil/ssr
```

**Vite/Remix Configuration:**
```typescript
import { stencilSSR } from '@stencil/ssr';

export default defineConfig({
  plugins: [
    stencilSSR({
      module: import('component-library-react'),
      from: 'component-library-react',
      hydrateModule: import('component-library/hydrate'),
      serializeShadowRoot: {
        scoped: ['my-button'],
        default: 'declarative-shadow-dom',
      },
    }),
  ],
});
```

#### Strategy 2: Runtime Approach (Next.js Server Components)

- Renders on-demand during request cycle
- Full prop access - handles runtime-computed values
- Best for: highly dynamic props, Next.js commitment

**Configuration:**
```typescript
reactOutputTarget({
  outDir: '../react-lib/src',
  hydrateModule: 'component-library/hydrate',
  clientModule: 'component-library-react',
  serializeShadowRoot: { /* options */ },
})
```

### Hydrate Module

```typescript
outputTargets: [
  {
    type: 'dist-hydrate-script',
    dir: './hydrate',
  }
]
```

### SSR Limitations

1. **Performance**: Declarative Shadow DOM includes all styles - use scoped mode for repeated components
2. **Avoid non-primitive params**: Can't resolve function calls in props
3. **Cross-component state**: Each component rendered independently on server

**Reference:** https://stenciljs.com/docs/server-side-rendering

---

## Service Workers & PWA

### Built-in Workbox Integration

Stencil auto-generates service workers using Workbox during production builds.

### Configuration

```typescript
outputTargets: [
  {
    type: 'www',
    serviceWorker: {
      globPatterns: ['**/*.{js,css,json,html,ico,png}']
    }
  }
]
```

### Disable Service Worker

```typescript
serviceWorker: null
```

### Custom Service Worker

```typescript
serviceWorker: {
  swSrc: 'src/sw.js'
}
```

```javascript
// src/sw.js
importScripts('workbox-v4.3.1/workbox-sw.js');
self.workbox.precaching.precacheAndRoute([]);
```

### Update Notification

```typescript
@Listen("swUpdate", { target: 'window' })
async onServiceWorkerUpdate() {
  const registration = await navigator.serviceWorker.getRegistration();
  if (registration?.waiting) {
    // Show reload toast
  }
}
```

### Push Notifications

```typescript
// Request permission
if ('Notification' in window) {
  Notification.requestPermission();
}

// Subscribe
const registration = await navigator.serviceWorker.ready;
const subscription = await registration.pushManager.subscribe({
  userVisibleOnly: true
});
```

**Reference:** https://stenciljs.com/docs/service-workers

---

## Web Workers

### When to Use Web Workers

✅ CPU-intensive tasks (image processing, data parsing)  
✅ Real-time code highlighting  
✅ Anything blocking the main thread  

❌ DOM manipulation (no DOM access)  
❌ Need @stencil/core APIs  
❌ Small, quick tasks (overhead not worth it)

### Usage

```typescript
// src/processor.worker.ts
export const processData = async (data: number[]) => {
  return data.map(x => x * 2);
};

export const heavyTask = async (buffer: ArrayBuffer) => {
  // CPU-intensive processing
  return buffer;
};
```

```typescript
// In component
import { processData, heavyTask } from '../../processor.worker';

async componentWillLoad() {
  const result = await processData([1, 2, 3]); // Runs in worker!
}
```

### Progress Callbacks

```typescript
// Worker
export const longTask = (data, progress) => {
  // progress(25); // Progress percentage
  return result;
};

// Component
longTask(data, (p) => console.log('Progress:', p));
```

### Direct Worker Access

```typescript
import { worker, workerPath } from '../../processor.worker?worker';

// Use worker API directly
worker.postMessage(['data']);

// Create worker pool
const pool = [new Worker(workerPath), new Worker(workerPath)];
```

**Reference:** https://stenciljs.com/docs/web-workers

---

## Testing

### Test Types

| Type | File Pattern | Framework | Reference |
|------|--------------|-----------|-----------|
| Unit | `.spec.ts` | Jest | https://stenciljs.com/docs/testing-overview |
| E2E | `.e2e.ts` | Puppeteer + Jest | https://stenciljs.com/docs/testing-overview |

### Running Tests

```bash
# All tests
npm test

# Unit tests only
npm test -- --spec

# E2E tests only
npm test -- --e2e

# With dev tools
npm test -- --e2e --devtools

# New headless mode (Chrome 112+)
npm test -- --e2e --headless=new
```

### Unit Testing Example

```typescript
import { newSpecPage } from '@stencil/core/testing';
import { MyComponent } from './my-component';

describe('my-component', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MyComponent],
      html: `<my-component first="Stencil"></my-component>`,
    });
    expect(page.root).toEqualHtml(`
      <my-component first="Stencil">
        <mock-host>
          <div>Hello, Stencil!</div>
        </mock-host>
      </my-component>
    `);
  });
});
```

### E2E Testing Example

```typescript
import { newE2EPage } from '@stencil/core/testing';

describe('my-component', () => {
  it('renders', async () => {
    const page = await newE2EPage({
      html: `<my-component first="Stencil"></my-component>`,
    });
    const element = await page.find('my-component');
    expect(element).toHaveClass('hydrated');
  });

  it('responds to clicks', async () => {
    const page = await newE2EPage({
      html: `<my-component></my-component>`,
    });
    await page.click('my-component');
    const event = await page.spyOnEvent('myEvent');
    expect(event).toHaveReceivedEvent();
  });
});
```

**Reference:** https://stenciljs.com/docs/testing-overview

---

## Publishing & Distribution

### Package.json Configuration

**Lazy Loading (dist):**
```json
{
  "name": "my-designsystem",
  "exports": "./dist/esm/my-designsystem.js",
  "main": "./dist/cjs/my-designsystem.js",
  "unpkg": "dist/my-designsystem/my-designsystem.esm.js"
}
```

**Standalone (dist-custom-elements):**
```json
{
  "exports": {
    ".": {
      "import": "./dist/components/index.js",
      "types": "./dist/components/index.d.ts"
    },
    "./my-component": {
      "import": "./dist/components/my-component.js",
      "types": "./dist/components/my-component.d.ts"
    }
  },
  "types": "dist/components/index.d.ts"
}
```

**TypeScript Dependencies:**
```json
{
  "dependencies": {
    "@stencil/core": "latest"
  }
}
```

### Publishing to NPM

```bash
npm publish
```

### Distribution Strategies

| Strategy | Use Case | Pros | Cons |
|----------|----------|------|------|
| **Lazy Loading (dist)** | Vanilla JS, any framework | Auto-loading, tree-shakeable | Requires static asset serving |
| **Standalone (dist-custom-elements)** | Bundler-based apps | Full control, no lazy-loading | Manual element definition |

**Reference:** https://stenciljs.com/docs/publishing

---

## Storybook Integration

### Installation

```bash
npm install --save-dev storybook@8 @stencil/core@latest @stencil/storybook-plugin
```

### Configuration

```typescript
// .storybook/main.ts
const config = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions'
  ],
  framework: { name: '@stencil/storybook-plugin' },
};
export default config;
```

### Register Components

```typescript
// .storybook/preview.tsx
import { defineCustomElements } from '../loader/index.js';
import { setCustomElementsManifest } from '@stencil/storybook-plugin';
import customElements from '../custom-elements.json';

defineCustomElements();
setCustomElementsManifest(customElements);
```

### Auto-Generate Docs

```typescript
// stencil.config.ts
outputTargets: [
  { type: 'docs-json', file: './custom-elements.json' }
]
```

### Create Stories

```typescript
// src/components/my-component/my-component.stories.tsx
import { Meta, StoryObj } from '@stencil/storybook-plugin';
import { MyComponent } from './my-component';

const meta: Meta<MyComponent> = {
  title: 'Components/MyComponent',
  component: MyComponent,
  argTypes: {
    first: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<MyComponent>;

export const Primary: Story = {
  args: { first: 'John' },
  render: (props) => <my-component {...props} />,
};
```

**Reference:** https://stenciljs.com/docs/storybook

---

## Build Configuration

### stencil.config.ts

```typescript
import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { reactOutputTarget } from '@stencil/react-output-target';

export const config: Config = {
  namespace: 'my-designsystem',
  outputTargets: [
    { type: 'dist', esmLoaderPath: '../loader' },
    { type: 'dist-custom-elements' },
    { type: 'docs-json', file: './dist/docs.json' },
    reactOutputTarget({ /* ... */ }),
  ],
  plugins: [
    sass()  // Add Sass support
  ],
  testing: {
    browserHeadless: "new",
  },
};
```

### Dev Server Configuration

```typescript
devServer: {
  address: '0.0.0.0',
  port: 3333,
  https: false,
  reloadStrategy: 'hmr',  // 'hmr' | 'pageReload' | null
  openBrowser: true,
  logRequests: false,
  basePath: '/',
  strictPort: false,
}
```

### Extras Configuration

```typescript
extras: {
  // DOM polyfills
  appendChildSlotFix: true,
  cloneNodeFix: true,
  slotChildNodesFix: true,
  
  // Runtime features
  tagNameTransform: true,        // Custom tag names at runtime
  enableImportInjection: true,  // Vite lazy loading
  lifecycleDOMEvents: true,    // Debug lifecycle
  experimentalSlotFixes: true,  // Experimental slot fixes
}
```

### Plugins

```typescript
plugins: [
  sass(),           // Sass support
  // Add PostCSS, Less, etc.
],

rollupPlugins: {
  before: [/* Before node-resolve */],
  after: [/* After commonjs */],
}
```

**Reference:** https://stenciljs.com/docs/config

---

## Performance Optimization

### Rendering Optimization

```typescript
// Use componentShouldUpdate to prevent unnecessary renders
componentShouldUpdate(newVal, oldVal, propName) {
  return newVal !== oldVal;
}
```

### Lazy Loading

Use `@lazy` decorator for non-critical components:

```typescript
@Component({
  tag: 'heavy-component',
  lazy: true,  // Loads only when rendered
})
export class HeavyComponent { }
```

### Task Queue Configuration

```typescript
// stencil.config.ts
taskQueue: 'async' | 'congestionAsync' | 'immediate'
```

- **async** - Default, good for most apps
- **congestionAsync** - Better for animations + intensive tasks
- **immediate** - Synchronous, best for simple apps

### Build Conditionals

```typescript
import { Component, Build } from '@stencil/core';

@Component({ tag: 'my-component' })
export class MyComponent {
  componentDidLoad() {
    if (Build.isDev) {
      console.log('dev only');
    }
  }
}
```

### Other Optimizations

- Use `shadow: true` for better encapsulation
- Minimize `@Prop` mutations (use immutable patterns)
- Use `readTask()` / `writeTask()` for DOM operations
- Enable caching: `enableCache: true`

**Reference:** https://stenciljs.com/docs/guides/build-conditionals

---

## Advanced Features

### Form-Associated Components

```typescript
import { Component, h, AttachInternals, State } from '@stencil/core';

@Component({
  tag: 'my-input',
  formAssociated: true,
})
export class MyInput {
  @State() value: string;
  @AttachInternals() internals: ElementInternals;

  handleInput(ev) {
    this.value = ev.target.value;
    this.internals.setFormValue(this.value);
  }

  render() {
    return <input value={this.value} onInput={(ev) => this.handleInput(ev)} />;
  }
}
```

**Lifecycle Callbacks:**
- `formAssociatedCallback(form)` - When associated/disassociated
- `formDisabledCallback(disabled)` - When disabled state changes
- `formResetCallback()` - When form is reset
- `formStateRestoreCallback(state, mode)` - After browser auto-fill

**Reference:** https://stenciljs.com/docs/form-associated

### Tag Transformation

```typescript
// stencil.config.ts
extras: {
  tagNameTransform: true,
}
```

```typescript
// At runtime
defineCustomElements(window, {
  transformTagName: (tag) => `${tag}-v1`
});
// <my-button> becomes <my-button-v1>
```

**Reference:** https://stenciljs.com/docs/tag-transformation

### Build Conditionals

```typescript
import { Build } from '@stencil/core';

if (Build.isDev) {
  // Dev only code
}
```

**Reference:** https://stenciljs.com/docs/guides/build-conditionals

---

## Migration Guide

### Upgrading to Stencil v4

**Breaking Changes:**

1. **Path aliases** - Now enabled by default (`transformAliasedImportPaths`)
2. **Browser compilation** - Removed (no replacement)
3. **Legacy context/connect APIs** - Removed
4. **Legacy browser support** - IE11, old Edge, Safari 10 dropped
5. **Deprecated config flags removed:**
   - `extras.__deprecated__cssVarsShim`
   - `extras.__deprecated__dynamicImportShim`
   - `extras.__deprecated__safari10`
   - `extras.__deprecated__shadowDomShim`
   - `enableCacheStats`
6. **Node 14** - No longer supported (min: Node 16)

**Upgrade Command:**
```bash
npm install @stencil/core@4
```

**Package Updates Required:**

| Package | Minimum Version |
|---------|----------------|
| @stencil/angular-output-target | 0.7.1 |
| @stencil/sass | 3.0.4 |
| @stencil/store | 2.0.8 |
| @stencil/react-output-target | 0.5.1 |
| @stencil/vue-output-target | 0.8.6 |

**Reference:** https://stenciljs.com/docs/introduction/upgrading-to-stencil-four

---

## Quick Reference

### CLI Commands

```bash
# Development
npm start              # Start dev server
npm run build         # Production build
npm run build --dev   # Dev build

# Testing
npm test              # Run all tests
npm test -- --spec   # Unit tests only
npm test -- --e2e    # E2E tests only

# Generation
stencil generate my-component    # Generate component
stencil g pages/my-component      # Generate in subfolder

# Other
stencil docs         # Generate docs
stencil version      # Show version
```

### Common Decorators Quick Reference

```typescript
@Component({ tag: 'my-cmp' })     // Declare component
@Prop() name: string;              // Public property
@State() count: number = 0;        // Internal state
@Event() myEvent: EventEmitter;   // Custom event
@Method() myMethod() {}            // Public method
@Listen('click') handleClick() {}  // Event listener
@Element() el: HTMLElement;       // Host element
@Watch('prop') onPropChange() {}  // Property observer
@AttachInternals() internals;      // Form internals
```

### Lifecycle Quick Reference

```
Load:    connectedCallback → componentWillLoad → render → componentDidLoad
Update:  componentShouldUpdate → componentWillRender → render → componentDidRender → componentWillUpdate → componentDidUpdate
Unmount: disconnectedCallback
```

### Output Target Quick Reference

```typescript
// Lazy loading (recommended for most)
{ type: 'dist' }

// Framework integrations
{ type: 'dist-custom-elements' }

// SSR
{ type: 'dist-hydrate-script' }

// Documentation
{ type: 'docs-json', file: 'dist/docs.json' }
```

### File Extensions Reference

| Extension | Purpose | Reference |
|-----------|---------|-----------|
| `.tsx` | Component with JSX | https://stenciljs.com/docs/templating-jsx |
| `.ts` | Pure TypeScript (utils) | N/A |
| `.css` | Component styles | https://stenciljs.com/docs/styling |
| `.scss` | Sass styles (with plugin) | https://www.npmjs.com/package/@stencil/sass |
| `.spec.ts` | Unit tests | https://stenciljs.com/docs/testing-overview |
| `.e2e.ts` | E2E tests | https://stenciljs.com/docs/testing-overview |
| `.worker.ts` | Web Worker | https://stenciljs.com/docs/web-workers |

---

## Official Resources

### Documentation
- **Main Docs:** https://stenciljs.com/docs/introduction
- **API Reference:** https://stenciljs.com/docs/api
- **Config Reference:** https://stenciljs.com/docs/config
- **Testing:** https://stenciljs.com/docs/testing-overview

### Framework Integrations
- **React:** https://stenciljs.com/docs/react
- **Vue:** https://stenciljs.com/docs/vue
- **Angular:** https://stenciljs.com/docs/angular

### Advanced Features
- **SSR:** https://stenciljs.com/docs/server-side-rendering
- **Service Workers:** https://stenciljs.com/docs/service-workers
- **Web Workers:** https://stenciljs.com/docs/web-workers
- **Storybook:** https://stenciljs.com/docs/storybook

### Community
- **Discord:** https://chat.stenciljs.com
- **GitHub:** https://github.com/ionic-team/stencil
- **npm:** https://www.npmjs.com/package/@stencil/core

---

## Appendix: Common Patterns

### Pass-Through Attributes

```typescript
import { Component, Element, h } from '@stencil/core';

@Component({ tag: 'my-link' })
export class MyLink {
  @Element() el: HTMLElement;

  private getAttributes() {
    const attrs = {};
    Array.from(this.el.attributes).forEach(attr => {
      if (attr.name.startsWith('data-') || attr.name.startsWith('aria-')) {
        attrs[attr.name] = attr.value;
      }
    });
    return attrs;
  }

  render() {
    return <a {...this.getAttributes()}><slot /></a>;
  }
}
```

### Slot Content Extraction

```typescript
@Component({ tag: 'my-component' })
export class MyComponent {
  @State() slotContent: string = '';

  componentWillLoad() {
    this.slotContent = this.el.textContent?.trim() || '';
  }

  render() {
    return <div>{this.slotContent}</div>;
  }
}
```

### Parent-Child Communication

```typescript
// Parent component
@Component({ tag: 'my-parent' })
export class MyParent {
  componentDidLoad() {
    const children = this.el.querySelectorAll('my-child');
    children.forEach((child, index) => {
      child.position = index;
    });
  }
}

// Child component
@Component({ tag: 'my-child' })
export class MyChild {
  @Prop() position: number;
}
```

---

> **End of StencilJS Reference Guide**
>
> This document is maintained as a quick reference. For the most up-to-date information, always refer to the official StencilJS documentation at https://stenciljs.com/docs/introduction and read through all the pages linked from this page. 
