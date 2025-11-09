# StencilJS + Tailwind CSS 4.x - Complete Knowledge Base

## Table of Contents

1. [Overview & Compatibility](#overview--compatibility)
2. [Stencil-Tailwind-Plugin](#stencil-tailwind-plugin)
3. [StencilJS Core Concepts](#stenciljs-core-concepts)
4. [Component Architecture](#component-architecture)
5. [Lifecycle & Reactivity](#lifecycle--reactivity)
6. [JSX Templating](#jsx-templating)
7. [Styling & Theming](#styling--theming)
8. [Framework Integration](#framework-integration)
9. [Advanced Topics](#advanced-topics)
10. [Production Best Practices](#production-best-practices)

---

## Overview & Compatibility

### Confirmed Compatibility

**✓ StencilJS + Tailwind CSS 4.x is fully compatible and production-ready**

- **Tailwind CSS Version:** v4.1.3 (latest stable)
- **Plugin Version:** stencil-tailwind-plugin v2.0.3+
- **StencilJS Version:** v4.29.1+
- **Status:** Production-ready, actively maintained

### Version Matrix

| Tailwind CSS | Plugin Version | Status |
|--------------|----------------|---------|
| v4.x | v2.x | ✓ Current & Stable |
| v3.x | v1.x | Legacy |
| v2.x | v0.x | Deprecated |

---

## Stencil-Tailwind-Plugin

### Installation

```bash
npm install -D stencil-tailwind-plugin tailwindcss @tailwindcss/postcss
```

**Peer Dependencies:**
- `@tailwindcss/postcss` (required for v4)
- `tailwindcss`
- `typescript`

### Basic Configuration

```typescript
// stencil.config.ts
import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import {
  tailwind,
  tailwindGlobal,
  tailwindHMR,
  setPluginConfigurationDefaults
} from 'stencil-tailwind-plugin';

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
  namespace: 'my-component-library',

  plugins: [
    // Order matters: Sass → tailwindGlobal → tailwind → tailwindHMR
    sass(),
    tailwindGlobal(),
    tailwind(),
    tailwindHMR()
  ],

  devServer: {
    reloadStrategy: 'pageReload'  // Required for proper HMR
  }
};
```

### Plugin Options

| Option | Description | Default |
|--------|-------------|---------|
| `enableDebug` | Enables debugging output | `false` |
| `tailwindCssPath` | Path to CSS config file | `undefined` |
| `injectTailwindConfiguration` | Config object or callback | `undefined` |
| `stripComments` | Remove CSS comment headers | `false` |
| `minify` | Minify CSS output | `true` |
| `optimise` | Optimize without minification | `false` |

### Available Plugins

1. **tailwind()** - Core style processor (required)
2. **tailwindHMR()** - Hot Module Reloading for development
3. **tailwindGlobal()** - Global Tailwind styles management

### PostCSS Configuration

```javascript
// postcss.config.js
module.exports = {
  plugins: [
    require('@tailwindcss/postcss'),
    require('./src/postcss/property-to-variable')  // Custom plugin
  ]
};
```

### Tailwind CSS v4 Configuration

```css
/* src/styles/tailwind.css */
@import "tailwindcss";
@plugin "@tailwindcss/forms";

@theme {
  /* Custom Font Stack */
  --default-font: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto;
  --font-sans: Montserrat, var(--default-font);
  --font-title: Dongle, var(--default-font);

  /* Custom Spacing */
  --spacing-hero: 4.5rem;
}

/* Custom Utility */
@utility glass {
  backdrop-filter: blur(40px);
  background: linear-gradient(
    135deg,
    rgba(255, 255, 255, 0.1),
    rgba(255, 255, 255, 0.05)
  );
  box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.1);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}
```

### Per-File Configuration

```typescript
const twConfigFn = (filename: string) => {
  if (filename.includes('special-component.tsx')) {
    return '@import "custom-fonts"; @import "tailwindcss";';
  }
  return '@import "tailwindcss"';
};

export const config: Config = {
  plugins: [
    tailwind({ injectTailwindConfiguration: twConfigFn })
  ]
};
```

### Known Limitations

**Functional Components:**
1. External functional components don't trigger HMR in consuming components
2. Nested functional components only generate styles at first level

**Workaround:** Use full components instead of functional components for complex, reusable elements.

---

## StencilJS Core Concepts

### What is StencilJS?

- **Compiler** (not a framework) that generates standards-compliant Web Components
- Zero runtime dependencies
- Framework-agnostic output
- TypeScript and JSX powered
- Primary use case: Design systems and component libraries

### Design Philosophy

> "Stencil's primary goal is to remove the need for components to be written using a specific framework's API."

### Key Features

- Virtual DOM with async rendering
- JSX templating
- TypeScript support
- Lazy loading & code splitting
- Server-side rendering & prerendering
- Framework wrappers (Angular, React, Vue)
- Shadow DOM & scoped styles
- Web standards compliance

---

## Component Architecture

### Complete Component Structure

```typescript
import {
  Component, Prop, State, Event, EventEmitter,
  Watch, Element, Method, Listen, h, Host
} from '@stencil/core';

@Component({
  tag: 'my-component',           // Required, must contain dash
  styleUrl: 'my-component.css',  // External stylesheet
  shadow: true,                  // Shadow DOM encapsulation
  assetsDirs: ['assets'],        // Static assets
  formAssociated: false,         // HTML form integration
  scoped: false                  // Scoped CSS alternative
})
export class MyComponent {
  // 1. Own Properties (internal variables)
  private internalData: any[] = [];

  // 2. Element References
  @Element() el: HTMLElement;

  // 3. State Variables
  @State() isLoading: boolean = false;
  @State() items: Item[] = [];

  // 4. Public Properties (Props)
  @Prop() name: string;
  @Prop({ mutable: true, reflect: true }) count: number = 0;

  // 5. Property Watchers
  @Watch('name')
  nameChanged(newValue: string, oldValue: string) {
    console.log('Name changed:', newValue);
  }

  // 6. Event Emitters
  @Event() completed: EventEmitter<any>;
  @Event({ bubbles: true, composed: true }) customEvent: EventEmitter<string>;

  // 7. Lifecycle Methods (in execution order)
  connectedCallback() {}
  disconnectedCallback() {}
  componentWillLoad() {}
  componentDidLoad() {}
  componentShouldUpdate(newVal, oldVal, propName) { return true; }
  componentWillRender() {}
  componentDidRender() {}
  componentWillUpdate() {}
  componentDidUpdate() {}

  // 8. Event Listeners
  @Listen('click', { target: 'window' })
  handleClick(event: MouseEvent) {}

  // 9. Public Methods (must be async)
  @Method()
  async showPrompt(): Promise<void> {
    return Promise.resolve();
  }

  // 10. Internal Methods
  private fetchData() {}
  private processData() {}

  // 11. Render Function (always last)
  render() {
    return (
      <Host class={{ 'is-loading': this.isLoading }}>
        <div class="flex gap-4">
          <slot />
        </div>
      </Host>
    );
  }
}
```

### Decorators Reference

#### @Component

```typescript
@Component({
  tag: string,                    // Required
  styleUrl?: string,
  styleUrls?: string[] | object,
  styles?: string,
  shadow?: boolean | { delegatesFocus: boolean },
  scoped?: boolean,
  assetsDirs?: string[],
  formAssociated?: boolean
})
```

#### @Prop

```typescript
@Prop({
  attribute?: string,      // HTML attribute name mapping
  mutable?: boolean,       // Allow internal modification
  reflect?: boolean        // Sync to DOM attribute
}) propertyName: Type;
```

**Key Rules:**
- Immutable by default
- Triggers re-render on change
- Use spread operator for objects/arrays
- Use `!` for required props

#### @State

```typescript
@State() internalValue: Type;
```

**Critical:** Must reassign to trigger re-render
- ❌ `this.items.push(newItem)`
- ✅ `this.items = [...this.items, newItem]`

#### @Event

```typescript
@Event({
  eventName?: string,
  bubbles?: boolean,
  cancelable?: boolean,
  composed?: boolean
}) eventName: EventEmitter<PayloadType>;
```

#### @Listen

```typescript
@Listen('eventName', {
  target?: 'body' | 'document' | 'window',
  passive?: boolean,
  capture?: boolean
})
```

#### @Watch

```typescript
@Watch('propName')
watchHandler(newValue: any, oldValue: any, propName: string) {
  // Does NOT fire on initial load
}
```

#### @Method

```typescript
@Method()
async publicMethod(): Promise<ReturnType> {
  return someValue;
}
```

**Requirements:**
- Must return Promise
- Use sparingly; prefer props and events

#### @Element

```typescript
@Element() el: HTMLElement;

// Access host element
this.el.getBoundingClientRect();
this.el.shadowRoot.querySelector('.selector');
```

---

## Lifecycle & Reactivity

### Lifecycle Execution Order

```
Initial Load:
1. connectedCallback()
2. componentWillLoad()        ← Async data loading
3. componentWillRender()
4. render()
5. componentDidRender()
6. componentDidLoad()          ← Fully loaded

Updates (Prop/State Change):
1. componentShouldUpdate()     ← Return false to skip
2. componentWillUpdate()
3. componentWillRender()       ← Best for state updates
4. render()
5. componentDidRender()
6. componentDidUpdate()

Disconnection:
1. disconnectedCallback()      ← Cleanup
```

### Parent-Child Hierarchy

- `componentWillLoad()`: Depth-first (child → parent)
- `componentDidLoad()`: Bubbles up (child completes before parent)

### Reactivity Best Practices

**Immutable Updates:**

```typescript
// Arrays
this.items = [...this.items, newItem];
this.items = this.items.filter(item => item.id !== id);
this.items = this.items.map(item =>
  item.id === id ? { ...item, updated: true } : item
);

// Objects
this.user = { ...this.user, name: 'New Name' };
this.settings = {
  ...this.settings,
  theme: { ...this.settings.theme, color: 'blue' }
};
```

**Force Update (use sparingly):**

```typescript
import { forceUpdate } from '@stencil/core';
forceUpdate(this);
```

---

## JSX Templating

### Data Binding

```typescript
render() {
  return (
    <div>
      {/* Variables */}
      <p>Hello {this.name}</p>

      {/* Conditionals */}
      {this.show ? <p>Visible</p> : <p>Hidden</p>}

      {/* Loops with keys */}
      {this.items.map(item =>
        <li key={item.id}>{item.name}</li>
      )}

      {/* Event handlers */}
      <button onClick={this.handleClick}>Click</button>

      {/* DOM reference */}
      <input ref={el => this.inputEl = el as HTMLInputElement} />

      {/* Dynamic attributes */}
      <div class={{ 'active': this.isActive }}>Content</div>

      {/* Dynamic innerHTML */}
      <div innerHTML={this.svgContent}></div>
    </div>
  );
}
```

### Host Element

```typescript
import { Host } from '@stencil/core';

render() {
  return (
    <Host
      class={{
        'my-class': true,
        'is-active': this.active
      }}
      aria-label={this.label}
      onClick={this.handleHostClick}>
      {/* Content */}
    </Host>
  );
}
```

### Fragments

```typescript
import { Fragment } from '@stencil/core';

render() {
  return (
    <Fragment>
      <div>First</div>
      <div>Second</div>
    </Fragment>
  );
}

// Or array syntax
render() {
  return [
    <div>First</div>,
    <div>Second</div>
  ];
}
```

### Slots

```typescript
render() {
  return (
    <div>
      <slot name="header" />
      <slot />  {/* Default slot */}
      <slot name="footer">
        <p>Default footer content</p>
      </slot>
    </div>
  );
}
```

**Usage:**

```html
<my-component>
  <h1 slot="header">Title</h1>
  <p>Default content</p>
  <footer slot="footer">Custom footer</footer>
</my-component>
```

### Keys for Lists

```typescript
// ✓ Good: Stable, unique keys
{this.todos.map(todo =>
  <li key={todo.uid}>{todo.name}</li>
)}

// ✗ Bad: Array indices
{this.todos.map((todo, index) =>
  <li key={index}>{todo.name}</li>
)}
```

### Conditional Component Swapping

```typescript
// Force recreation with keys
{condition
  ? <my-counter key="a" initialValue={2} />
  : <my-counter key="b" initialValue={5} />
}
```

### Anti-Patterns

```typescript
// ❌ NEVER: Shared JSX nodes
const sharedNode = <div>Text</div>;
return <div>{sharedNode}{sharedNode}</div>;

// ✅ CORRECT: New instances
return <div><div>Text</div><div>Text</div></div>;

// ✅ OR: Factory function
getNode() { return <div>Text</div>; }
return <div>{this.getNode()}{this.getNode()}</div>;
```

---

## Styling & Theming

### Shadow DOM Styling

```typescript
@Component({
  tag: 'my-component',
  styleUrl: 'my-component.css',
  shadow: true
})
```

```css
/* my-component.css */
:host {
  display: block;
  --primary-color: blue;
}

:host(.active) {
  background: var(--primary-color);
}

:host([disabled]) {
  opacity: 0.5;
}

/* Internal styles */
.container {
  padding: 1rem;
}
```

### CSS Custom Properties (Theming)

```css
/* Component exposes variables */
:host {
  --button-background: #3880ff;
  --button-color: white;
  --button-padding: 10px 20px;
  --button-border-radius: 4px;
}

button {
  background: var(--button-background);
  color: var(--button-color);
  padding: var(--button-padding);
  border-radius: var(--button-border-radius);
}
```

**Consumer customization:**

```css
my-button {
  --button-background: #ff6b6b;
  --button-border-radius: 20px;
}

my-button.primary {
  --button-background: #4caf50;
}
```

### CSS Parts

```typescript
// Component
render() {
  return <h1 part="heading">{this.title}</h1>;
}
```

```css
/* Consumer */
my-component::part(heading) {
  font-size: 2rem;
  color: red;
}
```

**Exportparts:**

```typescript
<child-component exportparts="inner-text"></child-component>
```

### Global Styles

```typescript
// stencil.config.ts
export const config: Config = {
  globalStyle: 'src/global/theme.css'
};
```

```css
/* src/global/theme.css */
:root {
  --color-primary: #3880ff;
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI";
  --spacing-md: 16px;
}

/* Target specific components globally */
:host(my-button) {
  --button-background: var(--color-primary);
}
```

### Style Modes

```typescript
@Component({
  tag: 'my-button',
  styleUrls: {
    ios: 'my-button.ios.css',
    md: 'my-button.md.css'
  }
})
```

```typescript
// Set mode
import { setMode } from '@stencil/core';
setMode(el => 'ios');

// Query mode
import { getMode } from '@stencil/core';
const mode = getMode(this.el);
```

### Tailwind Integration Patterns

```typescript
@Component({
  tag: 'product-card',
  styleUrl: 'product-card.css',
  shadow: true
})
export class ProductCard {
  render() {
    return (
      <div class="flex flex-col items-center justify-between
                  px-4 py-8 mb-4 bg-white rounded-md shadow
                  h-[272px] w-[312px]">
        <div class="flex flex-col items-center gap-2">
          <h3 class="text-4xl font-bold">{this.title}</h3>
          <p class="text-sm text-gray-600">{this.subtitle}</p>
        </div>
        <slot />
      </div>
    );
  }
}
```

---

## Framework Integration

### Angular Integration

**Setup:**

```typescript
// stencil.config.ts
import { angularOutputTarget } from '@stencil/angular-output-target';

export const config: Config = {
  outputTargets: [
    { type: 'dist' },
    angularOutputTarget({
      componentCorePackage: 'stencil-library',
      outputType: 'standalone',  // 'component' | 'scam' | 'standalone'
      directivesProxyFile: '../angular-workspace/projects/lib/src/lib/stencil-generated/components.ts',
      valueAccessorConfigs: [
        {
          elementSelectors: ['my-input[type=text]'],
          event: 'myChange',
          targetAttr: 'value',
          type: 'text'
        }
      ]
    })
  ]
};
```

**Usage:**

```typescript
// Standalone component
import { Component } from '@angular/core';
import { MyButton, MyInput } from 'component-library';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MyButton, MyInput],
  template: `
    <my-button (buttonClick)="handleClick()">Click</my-button>
    <my-input [(ngModel)]="value"></my-input>
  `
})
export class AppComponent {
  value = '';
  handleClick() {}
}
```

### React Integration

**Setup:**

```typescript
// stencil.config.ts
import { reactOutputTarget } from '@stencil/react-output-target';

export const config: Config = {
  outputTargets: [
    { type: 'dist-custom-elements' },
    reactOutputTarget({
      outDir: '../react-library/lib/components/stencil-generated/',
      hydrateModule: 'stencil-library/hydrate'  // For SSR
    })
  ]
};
```

**Usage:**

```typescript
import React, { useState } from 'react';
import { MyButton, MyInput } from 'react-library';

function App() {
  const [value, setValue] = useState('');

  return (
    <div>
      <MyButton
        variant="primary"
        onButtonClick={(e) => console.log(e.detail)}>
        Click Me
      </MyButton>

      <MyInput
        value={value}
        onMyChange={(e) => setValue(e.detail)}
      />
    </div>
  );
}
```

### Vue Integration

**Setup:**

```typescript
// stencil.config.ts
import { vueOutputTarget } from '@stencil/vue-output-target';

export const config: Config = {
  outputTargets: [
    { type: 'dist' },
    vueOutputTarget({
      componentCorePackage: 'stencil-library',
      proxiesFile: '../vue-library/lib/components.ts',
      componentModels: [
        {
          elements: ['my-input'],
          event: 'v-on-change',
          targetAttr: 'value'
        }
      ]
    })
  ]
};
```

**Usage:**

```vue
<template>
  <div>
    <my-button @button-click="handleClick">Click</my-button>
    <my-input v-model="inputValue" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const inputValue = ref('');
const handleClick = () => {};
</script>
```

### Vanilla JavaScript

```html
<!DOCTYPE html>
<html>
<head>
  <script type="module" src="/build/my-library.esm.js"></script>
</head>
<body>
  <my-button variant="primary">Click Me</my-button>

  <script>
    const button = document.querySelector('my-button');

    // Set properties
    button.disabled = false;
    button.config = { theme: 'dark' };

    // Listen to events
    button.addEventListener('buttonClick', (event) => {
      console.log('Clicked:', event.detail);
    });

    // Call methods
    customElements.whenDefined('my-button').then(async () => {
      await button.setFocus();
    });
  </script>
</body>
</html>
```

---

## Advanced Topics

### Build Conditionals

```typescript
import { Build } from '@stencil/core';

componentWillLoad() {
  if (Build.isDev) {
    // Development only - removed in production
    console.log('Dev mode');
  }

  if (Build.isBrowser) {
    // Browser only - not during SSR/prerender
    this.initBrowserAPIs();
  }

  if (Build.isTesting) {
    // Test environment only
    this.mockData = true;
  }
}
```

### Assets Management

```typescript
import { Component, getAssetPath, h } from '@stencil/core';

@Component({
  tag: 'my-component',
  assetsDirs: ['assets']
})
export class MyComponent {
  render() {
    const logoPath = getAssetPath('./assets/logo.png');
    return <img src={logoPath} alt="Logo" />;
  }
}
```

**Consumer setup:**

```typescript
import { setAssetPath } from 'my-library';
setAssetPath('/static/assets/');
```

### Content Security Policy (CSP)

```typescript
// main.ts
import { defineCustomElements, setNonce } from 'my-library/loader';

const nonce = document.querySelector('meta[name="csp-nonce"]')?.getAttribute('content');
if (nonce) {
  setNonce(nonce);
}

defineCustomElements();
```

### Form-Associated Components

```typescript
@Component({
  tag: 'my-input',
  formAssociated: true
})
export class MyInput {
  @AttachInternals() internals: ElementInternals;

  handleInput = (event: Event) => {
    const value = (event.target as HTMLInputElement).value;
    this.internals.setFormValue(value);

    // Validation
    if (!value) {
      this.internals.setValidity(
        { valueMissing: true },
        'This field is required'
      );
    } else {
      this.internals.setValidity({});
    }
  }
}
```

### Web Workers

```typescript
// src/workers/calculator.worker.ts
export const calculate = async (numbers: number[]): Promise<number> => {
  return numbers.reduce((sum, n) => sum + Math.pow(n, 2), 0);
};

// Component
import { calculate } from '../../workers/calculator.worker';

async performCalculation() {
  const result = await calculate([1, 2, 3, 4, 5]);
  console.log(result);
}
```

### Server-Side Rendering

```typescript
// stencil.config.ts
export const config: Config = {
  outputTargets: [
    { type: 'dist-custom-elements' },
    { type: 'dist-hydrate-script', dir: './hydrate' }
  ]
};
```

**Express example:**

```typescript
import { renderToString } from 'my-library/hydrate';

app.get('*', async (req, res) => {
  const { html } = await renderToString('<my-app></my-app>', {
    serializeShadowRoot: 'declarative-shadow-dom',
    prettyHtml: false
  });

  res.send(`<!DOCTYPE html><html><body>${html}</body></html>`);
});
```

### Service Workers (PWA)

```typescript
// stencil.config.ts
{
  type: 'www',
  serviceWorker: {
    globPatterns: ['**/*.{js,css,json,html,ico,png,svg}']
  }
}
```

### State Management (Stencil Store)

```typescript
// store/counter.ts
import { createStore } from '@stencil/store';

const { state, onChange } = createStore({
  count: 0,
  lastUpdated: new Date()
});

onChange('count', value => {
  state.lastUpdated = new Date();
});

export { state };

// Component
import { state } from '../../store/counter';

render() {
  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => state.count++}>Increment</button>
    </div>
  );
}
```

---

## Production Best Practices

### Style Guide

**Naming Conventions:**
- Component tags: Use unique prefix (`ion-`, `my-`, `acme-`)
- Use nouns: `button`, `card`, `menu` (not `click-handler`)
- Avoid `stencil-` prefix

**File Organization:**
```
src/components/my-button/
├── my-button.tsx
├── my-button.css
├── my-button.spec.tsx
├── assets/
│   └── icon.svg
└── README.md
```

**Code Organization (Newspaper Metaphor):**
1. Own Properties
2. @Element()
3. @State()
4. @Prop()
5. @Watch()
6. @Event()
7. Lifecycle methods
8. @Listen()
9. @Method()
10. Internal methods
11. render() (always last)

### TypeScript Best Practices

```typescript
/**
 * A customizable button component
 * @slot - Button content
 * @part button - The native button element
 */
@Component({ tag: 'my-button' })
export class MyButton {
  /**
   * The button variant
   */
  @Prop() variant: 'primary' | 'secondary' = 'primary';

  /**
   * Emitted when clicked
   */
  @Event() buttonClick: EventEmitter<void>;
}
```

### Publishing Configuration

```json
{
  "name": "my-library",
  "version": "1.0.0",
  "module": "dist/index.js",
  "types": "dist/types/index.d.ts",
  "collection": "dist/collection/collection-manifest.json",
  "unpkg": "dist/my-library/my-library.esm.js",
  "files": ["dist/", "loader/"],
  "exports": {
    ".": {
      "import": "./dist/index.js",
      "types": "./dist/types/index.d.ts"
    },
    "./loader": {
      "import": "./loader/index.js"
    }
  }
}
```

### Performance Optimization

**Lazy Loading:**
- Automatic code splitting per component
- Only load components when used

**Task Queue Strategies:**
```typescript
taskQueue: 'async'            // Default: requestIdleCallback
taskQueue: 'congestionAsync'  // Smart scheduling
taskQueue: 'immediate'        // Synchronous
```

**Manual Bundling:**
```typescript
bundles: [
  { components: ['my-card', 'my-card-header', 'my-card-content'] },
  { components: ['my-dialog'] }
]
```

### Testing

```typescript
// Unit test
import { newSpecPage } from '@stencil/core/testing';

it('renders', async () => {
  const page = await newSpecPage({
    components: [MyComponent],
    html: `<my-component name="Test"></my-component>`
  });
  expect(page.root).toEqualHtml(`
    <my-component name="Test">
      <div>Hello, Test!</div>
    </my-component>
  `);
});

// E2E test
import { newE2EPage } from '@stencil/core/testing';

it('clicks button', async () => {
  const page = await newE2EPage();
  await page.setContent('<my-component></my-component>');

  const button = await page.find('my-component >>> button');
  await button.click();
  await page.waitForChanges();

  const component = await page.find('my-component');
  expect(await component.getProperty('count')).toBe(1);
});
```

### Browser Support

**Stencil v4:**
- Chrome 79+
- Edge 79+
- Firefox 70+
- Safari 14+
- ❌ No IE11 support

**Native Support:**
- Custom Elements
- Shadow DOM
- ES Modules
- CSS Custom Properties

---

## Key Takeaways

1. **StencilJS + Tailwind CSS 4.x is production-ready** via stencil-tailwind-plugin v2.x
2. **Plugin order matters:** Sass → tailwindGlobal → tailwind → tailwindHMR
3. **Always use `reloadStrategy: 'pageReload'`** for proper HMR with Web Components
4. **CSS-first configuration** is required for Tailwind v4
5. **Shadow DOM + utility classes** work seamlessly together
6. **Framework wrappers** provide native integration for Angular, React, and Vue
7. **One component per file** for optimal code splitting
8. **Immutable updates** required for @State and @Prop objects/arrays
9. **Build conditionals** eliminate code in production bundles
10. **Form-associated components** integrate with native HTML forms

---

## References

- [Stencil Documentation](https://stenciljs.com/docs)
- [stencil-tailwind-plugin](https://github.com/Poimen/stencil-tailwind-plugin)
- [stencil-tailwind-plugin-example](https://github.com/Poimen/stencil-tailwind-plugin-example)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [Ionic Framework](https://ionicframework.com) - Built with Stencil

---

*Last Updated: January 2025*
*Stencil Version: v4.29.1*
*Tailwind CSS Version: v4.1.3*
*Plugin Version: v2.0.3*
