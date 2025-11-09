# Getting Started with AEGOV Design System

This guide will help you get started with developing the AEGOV Design System or consuming it in your projects.

## Table of Contents

1. [For Contributors](#for-contributors)
2. [For Consumers](#for-consumers)
3. [Working with Tailwind CSS](#working-with-tailwind-css)
4. [Component Development](#component-development)
5. [Testing](#testing)
6. [Publishing](#publishing)

---

## For Contributors

### Prerequisites

- Node.js 16.x or higher
- npm 7.x or higher

### Initial Setup

```bash
# Clone the repository
git clone <repository-url>
cd aegov-dls-3

# Install dependencies
npm install

# Start development server
npm start
```

The development server will start at `http://localhost:3333` and automatically reload when you make changes.

### Development Workflow

1. **Create a new component:**
   ```bash
   npm run generate
   ```

2. **Make your changes** to the component files in `src/components/`

3. **View your changes** at `http://localhost:3333`

4. **Build for production:**
   ```bash
   npm run build
   ```

5. **Run tests:**
   ```bash
   npm test
   ```

---

## For Consumers

### Installation in Your Project

```bash
npm install @aegov/design-system
```

### Framework-Specific Setup

#### Vanilla JavaScript / HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <script type="module" src="node_modules/@aegov/design-system/dist/aegov-design-system/aegov-design-system.esm.js"></script>
  </head>
  <body>
    <aegov-button>Click Me</aegov-button>
  </body>
</html>
```

#### React

1. **Install React wrapper:**
   ```bash
   npm install @aegov/design-system-react
   ```

2. **Import and use:**
   ```tsx
   import { AegovButton } from '@aegov/design-system-react';

   function App() {
     return <AegovButton variant="solid">Click Me</AegovButton>;
   }
   ```

#### Vue 3

1. **Install Vue wrapper:**
   ```bash
   npm install @aegov/design-system-vue
   ```

2. **Register globally in main.ts:**
   ```typescript
   import { createApp } from 'vue';
   import { ComponentLibrary } from '@aegov/design-system-vue';
   import App from './App.vue';

   createApp(App)
     .use(ComponentLibrary)
     .mount('#app');
   ```

3. **Use in components:**
   ```vue
   <template>
     <aegov-button variant="solid">Click Me</aegov-button>
   </template>
   ```

#### Angular

1. **Install Angular wrapper:**
   ```bash
   npm install @aegov/design-system-angular
   ```

2. **Import in your component:**
   ```typescript
   import { Component } from '@angular/core';
   import { AegovButton } from '@aegov/design-system-angular';

   @Component({
     selector: 'app-root',
     standalone: true,
     imports: [AegovButton],
     template: `<aegov-button variant="solid">Click Me</aegov-button>`
   })
   export class AppComponent {}
   ```

---

## Working with Tailwind CSS

### Using AEGOV Design Tokens in Your Project

The AEGOV Design System provides a complete Tailwind CSS v4 theme with design tokens.

#### 1. Install Tailwind CSS v4

```bash
npm install -D tailwindcss@^4.1.3 @tailwindcss/postcss
```

#### 2. Create PostCSS Configuration

```javascript
// postcss.config.js
module.exports = {
  plugins: [
    require('@tailwindcss/postcss'),
  ]
};
```

#### 3. Import AEGOV Theme

```css
/* src/styles/main.css */
@import "@aegov/design-system/tailwind.css";

/* Your custom styles and utilities */
.my-custom-class {
  @apply bg-primary-600 text-white px-4 py-2 rounded-lg;
}
```

#### 4. Use in Your Build Process

**Vite:**
```javascript
// vite.config.js
import { defineConfig } from 'vite';

export default defineConfig({
  css: {
    postcss: './postcss.config.js',
  },
});
```

**Next.js:**
```javascript
// next.config.js
module.exports = {
  // PostCSS is automatically configured in Next.js
};
```

**Webpack:**
```javascript
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
};
```

### Available Design Tokens

```css
/* Colors */
bg-primary-500, text-primary-700, border-primary-600
bg-secondary-500, bg-neutral-100, bg-success-500, etc.

/* Typography */
font-sans, font-mono, font-display
text-xs, text-sm, text-base, text-lg, text-xl, etc.
font-normal, font-medium, font-semibold, font-bold

/* Spacing */
p-4, m-8, gap-2, space-x-4
px-6, py-3, mx-auto, mt-4

/* Border Radius */
rounded, rounded-md, rounded-lg, rounded-xl, rounded-full

/* Shadows */
shadow-sm, shadow-base, shadow-md, shadow-lg

/* And many more! See src/styles/tailwind.css for the complete list */
```

---

## Component Development

### Component Structure

Each component follows this structure:

```
src/components/aegov-button/
├── aegov-button.tsx         # Component logic
├── aegov-button.css         # Component styles
├── aegov-button.spec.tsx    # Unit tests (optional)
├── aegov-button.e2e.tsx     # E2E tests (optional)
└── readme.md                # Component documentation
```

### Component Best Practices

1. **Use Scoped CSS** (not Shadow DOM) for AEGOV components:
   ```typescript
   @Component({
     tag: 'aegov-button',
     styleUrl: 'aegov-button.css',
     scoped: true,  // Important!
   })
   ```

2. **Follow naming convention**: All components must be prefixed with `aegov-`

3. **Use TypeScript types** from `utils/types.ts`

4. **Implement accessibility** features:
   - ARIA attributes
   - Keyboard navigation
   - Focus management

5. **Emit custom events** with the `aegov` prefix:
   ```typescript
   @Event() aegovClick: EventEmitter<MouseEvent>;
   ```

6. **Document everything** with JSDoc comments

### Example Component Template

```typescript
import { Component, Prop, Event, EventEmitter, h, Host } from '@stencil/core';

/**
 * @slot - Component content
 * @part element - The main element
 */
@Component({
  tag: 'aegov-my-component',
  styleUrl: 'aegov-my-component.css',
  scoped: true,
})
export class AegovMyComponent {
  /**
   * Component property
   */
  @Prop() myProp: string = 'default';

  /**
   * Emitted when something happens
   */
  @Event() aegovMyEvent: EventEmitter<any>;

  render() {
    return (
      <Host>
        <div class="flex items-center gap-2">
          <slot></slot>
        </div>
      </Host>
    );
  }
}
```

---

## Testing

### Unit Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test.watch
```

### E2E Tests

```bash
# Run E2E tests
npm run test -- --e2e
```

### Writing Tests

```typescript
// aegov-button.spec.tsx
import { newSpecPage } from '@stencil/core/testing';
import { AegovButton } from './aegov-button';

describe('aegov-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AegovButton],
      html: `<aegov-button>Click Me</aegov-button>`,
    });
    expect(page.root).toEqualHtml(`
      <aegov-button>
        <button class="aegov-button ...">
          Click Me
        </button>
      </aegov-button>
    `);
  });
});
```

---

## Publishing

### Pre-publish Checklist

1. **Update version** in `package.json`
2. **Run build:**
   ```bash
   npm run build
   ```
3. **Run tests:**
   ```bash
   npm test
   ```
4. **Review dist folder** to ensure all files are included
5. **Test in a sample project** before publishing

### Publishing to npm

```bash
# Login to npm (first time only)
npm login

# Publish
npm publish --access public
```

### Versioning

We follow [Semantic Versioning](https://semver.org/):

- **MAJOR** version for incompatible API changes
- **MINOR** version for new functionality (backwards compatible)
- **PATCH** version for bug fixes (backwards compatible)

```bash
# Bump version and publish
npm version patch  # 0.1.0 -> 0.1.1
npm version minor  # 0.1.1 -> 0.2.0
npm version major  # 0.2.0 -> 1.0.0
```

---

## Helpful Resources

- [StencilJS Documentation](https://stenciljs.com/docs/introduction)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs)
- [Web Components MDN](https://developer.mozilla.org/en-US/docs/Web/Web_Components)
- [ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)

---

## Need Help?

- Check the [main README](README.md)
- Review [component documentation](src/components/)
- Read the [knowledge base](PROJECT_KNOWLEDGE_BASE.md)
- Open an issue on GitHub

---

**Happy coding! 🚀**
