---
name: stenciljs-developer
description: Build cross-framework web components using Stencil.js that work seamlessly in React, Vue, Angular, and plain HTML. Use this skill whenever the user asks to create reusable UI components, design system elements, component libraries, or custom HTML elements that need to work across multiple frontend frameworks. Also trigger when the user mentions Stencil, web components, custom elements, cross-framework components, component, framework-agnostic UI, shadow DOM components, or wants to build a shared component library.
license: Complete terms in LICENSE.md
---

This skill guides creation of cross-framework web components using Stencil.js. Implement real working code with exceptional attention to aesthetic details and creative choices.

The user provides frontend requirements: such as a component name, desired functionality, and any specific design preferences. The skill generates Stencil.js code for a web component that can be used in React, Vue, Angular, or plain HTML. The generated code includes the component's TypeScript logic, HTML template, and CSS styles.

# Design Thinking

Before coding, understand the context and user needs. Consider the following:
- What is the purpose of the component?
- What functionality should it have? (e.g., click events, dynamic content)
- Compatibility with accessibility standards (e.g., ARIA attributes)
- Design preferences (e.g., colors, layout, animations)
- Performance considerations (e.g., lazy loading, minimal dependencies)

**CRITICAL**: Choose a clear conceptual direction and execute it with precision. Focus on writing clean, maintainable code that adheres to best practices in web component development. Pay attention to details like naming conventions, code organization, and documentation.

## Frontend Aesthetics Guidelines
- Use semantic HTML elements where appropriate.
- Follow a consistent naming convention for classes and variables (e.g., BEM for CSS).
- Ensure the component is responsive and looks good on various screen sizes.
- Implement smooth animations and transitions for interactive elements.
- Use modern CSS features (e.g., Flexbox, Grid) for layout.
- Include comments in the code to explain complex logic and design decisions.

## Why This Approach Works

Stencil compiles TypeScript/JSX source into standard Web Components (Custom Elements + Shadow DOM). The compiled output is vanilla JS with zero runtime framework dependency. Framework-specific output targets then generate thin wrapper libraries that give React, Vue, and Angular developers a native feel — proper prop bindings, typed events, and v-model/two-way binding support — while the underlying implementation is always the same web component.

# Stencil.js Developer Skill
Use this skill whenever the user asks to create reusable UI components, design system elements, component libraries, or custom HTML elements that need to work across multiple frontend frameworks. Also trigger when the user mentions Stencil, web components, custom elements, cross-framework components, component, framework-agnostic UI, shadow DOM components, or wants to build a shared component library.

When triggered, ask the user for specific details about the component they want to create. This includes:
- Component name
- Desired functionality (e.g., what the component should do, any specific interactions)
- Design preferences (e.g., colors, layout, animations)
- Any accessibility requirements (e.g., ARIA attributes, keyboard navigation)
- Any performance considerations (e.g., lazy loading, minimal dependencies) 
Based on the user's input, generate Stencil.js code for a web component that meets their requirements. The generated code should include:
- TypeScript logic for the component's functionality
- HTML template for the component's structure
- CSS styles for the component's appearance
Make sure the generated code is clean, maintainable, and adheres to best practices in web component development.

## Project Structure
```
src/
|-- components/
|   |-- component-name/
|   |   |-- component-name.tsx
|   |   |-- component-name.css
|   |   |-- component-name.spec.tsx
|   |   |-- component-name.e2e.ts
|-- global/
|   |-- app.ts
|   |-- global.css
|-- utils/
|   |-- accessibility.spec.ts
|   |-- index.ts
|   |-- types.ts
|-- index.html
|-- index.ts
package.json
tsconfig.json
stencil.config.ts
postscss.config.js
```

## Stencil Config
This is the single most important file. It determines what gets built and how every consumer framework receives the components.
```ts
import { Config } from '@stencil/core';
export const config: Config = {
  ...
}
```

## Writing Components That Work Everywhere
The way you author a component determines whether it will integrate cleanly across frameworks. These patterns ensure maximum compatibility.

### Component Anatomy
```tsx
// src/components/component-name/component-name.tsx
import { Component, Prop, Event, EventEmitter, State, Watch, Method, h } from '@stencil/core';

@Component({
  tag: 'component-name',
  styleUrl: 'component-name.css',
  shadow: false,  // use Shadow DOM true only when asked
  scoped: false,  // use scoped styles only when asked
})

export class ComponentName {
  // ── Props: The public API ──────────────────────────────────
  // These become HTML attributes AND JS properties.
  // Frameworks bind to these naturally.
  @Prop() variant: 'primary' | 'secondary' // example prop.

  @Prop() disabled: boolean = false; // example boolean prop with default value.

  @Prop({ reflect: true }) loading: boolean = false;
  //       ↑ reflect: true syncs the JS property back to the HTML attribute.
  //         Use it when CSS selectors need to target the attribute,
  //         e.g., component-name[loading] { ... }

  // ── Internal State ─────────────────────────────────────────
  // Not visible to consumers. Changes trigger re-render.
  @State() hasFocus: boolean = false;

  // ── Watchers ───────────────────────────────────────────────
  // React to prop/state changes. Great for validation.
  @Watch('variant')
  validateVariant(newValue: string) {
    const valid = ['primary', 'secondary'];
    if (!valid.includes(newValue)) {
      throw new Error(`Invalid variant: ${newValue}`);
    }
  }

  // ── Events: Custom DOM events ──────────────────────────────
  // These become native CustomEvents on the element.
  // React wrappers auto-generate `onMyClick` props.
  // Vue wrappers emit proper Vue events.
  @Event() componentClick: EventEmitter;

  @Event() componentFocus: EventEmitter;

  @Event() componentBlur: EventEmitter;

  // ── Public Methods ─────────────────────────────────────────
  // Callable from outside. Must be async (returns Promise).
  // Use sparingly — prefer props and events.
  @Method()
  async setFocus(): Promise {
    this.buttonEl?.focus();
  }

  // ── Private members ────────────────────────────────────────
  private buttonEl?: HTMLButtonElement;

  // ── Event handlers ─────────────────────────────────────────
  private handleClick = () => {
    if (!this.disabled && !this.loading) {
      this.componentClick.emit();
    }
  };

  // ── Render ─────────────────────────────────────────────────
  render() {
    return (
      // the html code to render the component, using JSX syntax
    );
  }
}
```

## Critical Patterns for Cross-Framework Compatibility

### 1. Event Naming

Use **camelCase** event names. This is the single biggest source of cross-framework issues.
```tsx
// CORRECT — works in all frameworks
@Event() myChange: EventEmitter;
@Event() itemSelected: EventEmitter;

// AVOID — causes issues, especially in React wrappers
@Event() my-change: EventEmitter;   // kebab-case breaks React
@Event() MYCHANGE: EventEmitter;    // uppercase is confusing
```

The React wrapper converts `myChange` → `onMyChange` prop. The Vue wrapper converts `myChange` → `@myChange` event. Kebab-case or other patterns break these automatic conversions.

### 2. Prop Types and Attribute Reflection

HTML attributes are always strings. Stencil automatically deserializes attributes to the declared TypeScript type, but you need to understand the mapping:

```tsx
// String props: attribute = property (simple)
@Prop() label: string;
// 

// Number props: attribute string is parsed to number
@Prop() count: number = 0;
//   →  this.count === 5 (number, not string)

// Boolean props: presence of attribute = true, absence = false
@Prop() disabled: boolean = false;
//      →  this.disabled === true
//               →  this.disabled === false

// Complex types (objects, arrays): CANNOT be set via HTML attributes.
// Must be set via JS property or framework binding.
@Prop() items: string[] = [];
// In React:  <MyComp items={['a', 'b']} />       ✅
// In Vue:           ✅
// In HTML:   myComp.items = ['a', 'b'];            ✅
// In HTML:             ❌ won't work
```

Use `reflect: true` only when the attribute value needs to be visible in the DOM (for CSS selectors, accessibility, or serialization). Don't reflect complex types.

### 3. Slots (Content Projection)

Slots let consumers pass content into your component. They work identically in every framework. Use named slots for multiple content areas. Use the default slot for simple cases.

```tsx
// Component definition
render() {
  return (
      
             {/* Named slot */}
      
      
                            {/* Default slot */}
       
  );
}
```

### 4. Lifecycle Hooks

Stencil provides lifecycle methods that align with the Custom Elements spec:

```tsx
export class MyComponent {
  // Before first render. Best place for initial data fetching.
  componentWillLoad() {}

  // After first render. DOM is available. Safe to measure/query elements.
  componentDidLoad() {}

  // Before any re-render (not called on first render).
  componentWillUpdate() {}

  // After any re-render.
  componentDidUpdate() {}

  // Element added to DOM (maps to connectedCallback).
  connectedCallback() {}

  // Element removed from DOM (maps to disconnectedCallback).
  // Clean up timers, listeners, subscriptions here.
  disconnectedCallback() {}
}
```

### 5. Immutability for Reactive Updates

Stencil uses reference comparison for change detection on `@Prop()` and `@State()`. In-place mutations (e.g., `array.push()`) won't trigger re-renders. Always produce new references:

```tsx
// WRONG — no re-render
this.items.push(newItem);

// CORRECT — new array reference triggers re-render
this.items = [...this.items, newItem];

// WRONG — no re-render
this.config.theme = 'dark';

// CORRECT — new object reference
this.config = { ...this.config, theme: 'dark' };
```

### 6. Shadow DOM vs. Scoped Styles
By default, Stencil uses Shadow DOM for style encapsulation. This ensures styles don't leak out and external styles don't affect the component. However, some users may prefer scoped styles (no Shadow DOM) for easier global theming or integration with existing CSS frameworks. Always ask the user about their preference and explain the trade-offs. Follow patterns that may already exist in their codebase or design system.

### 7. Public Methods Must Be Async

All `@Method()` decorated functions must return a `Promise`. This is a Stencil requirement because the component architecture is async at all levels. Even if your method doesn't do anything async, it must still return a Promise.


### 8.  Accessibility Built In

Every component should include proper ARIA attributes. Use semantic HTML elements whenever possible. Ensure keyboard navigation works correctly. Consider screen reader users and include appropriate roles, labels, and states. For example, if you create a button component, use `<button>` element and support `disabled` state with proper ARIA attributes. If you create a modal component, ensure it traps focus and has appropriate roles and labels.

Import `Host` from `@stencil/core` to set attributes and listeners on the host element itself.

## Form-Associated Components
For input-like components that need to participate in HTML forms, use the `@Element()` decorator to access the host element and implement the necessary form-associated behavior. This includes handling form submission, validation, and resetting.


```tsx
@Component({
  tag: 'example-input',
  shadow: false,
  formAssociated: true,    // Enables ElementInternals
})
export class MyInput {
  @AttachInternals() internals: ElementInternals;

  @Prop({ mutable: true }) value: string = '';

  @Watch('value')
  handleValueChange(newValue: string) {
    this.internals.setFormValue(newValue);
    this.componentChange.emit(newValue);
  }

  @Event() componentChange: EventEmitter;

  render() {
    return (
      <input
        value={this.value}
        onInput={(e) => this.value = (e.target as HTMLInputElement).value}
      />
    );
  }
}
```

# Common Gotchas & Solutions

| Problem | Cause | Solution |
|---------|-------|----------|
| Events don't fire in React | React doesn't natively bind to custom element events | Use the `@stencil/react-output-target` wrapper (it handles this) |
| Vite-based app can't lazy-load components | Bundler can't resolve dynamic imports | Set `extras.enableImportInjection: true` in stencil config |
| Array/object prop changes don't re-render | In-place mutation instead of new reference | Always create new array/object references |
| Prop set from parent but component doesn't update | Prop is not marked as `mutable` but component tries to change it internally | Either make it `mutable: true` or use `@State()` for internal tracking |
| Complex prop can't be set in HTML | Objects/arrays can't be serialized as HTML attributes | Set via JS property: `el.items = [...]`, or use framework binding (`:items` in Vue, `items={...}` in React) |
| `@Method()` doesn't appear on element | Method not marked `async` | All `@Method()` functions must return a Promise |
| Component not rendering in Angular | Custom elements not registered | Add `CUSTOM_ELEMENTS_SCHEMA` to your Angular module, or use the Angular output target |

# Style Guide Summary

Follow these conventions for maximum cross-framework compatibility:


1. **One component per file, one file per directory.**
2. **Tag names**: `{namespace}-{name}` (e.g., `my-button`, `acme-dropdown`). Always use a prefix to avoid collisions with native HTML elements and other libraries.
3. **Props**: camelCase in TypeScript, Stencil auto-maps to dash-case HTML attributes (`myProp` → `my-prop`).
4. **Events**: camelCase, prefixed with your namespace to avoid collisions (`myClick`, not just `click`).
5. **CSS custom properties**: `--{tag}-{property}` (e.g., `--my-button-bg`).
6. **JSDoc every public Prop, Event, and Method** — Stencil auto-generates docs from these.
7. **Default all props** — every prop should have a sensible default so the component works with zero configuration.
8. **Never mutate props directly** — use `@State()` for internal tracking if needed.
9. **Keep `@Method()` usage minimal** — prefer declarative props and events over imperative method calls.