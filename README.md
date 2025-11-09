# AEGOV Design System

A modern, framework-agnostic design system built with **StencilJS** and **Tailwind CSS v4**. Create beautiful, accessible, and performant web components that work seamlessly across React, Vue, Angular, and vanilla JavaScript.

## 🌟 Features

- **Framework Agnostic**: Works with React, Vue, Angular, and vanilla JavaScript
- **Tailwind CSS v4**: Modern CSS-first configuration with design tokens
- **Scoped CSS**: Styles that don't leak, without Shadow DOM restrictions
- **TypeScript**: Full type safety and IntelliSense support
- **Accessible**: Built with WCAG 2.1 guidelines in mind
- **Tree-shakeable**: Import only what you need
- **Zero Runtime**: Compiled to native Web Components

## 📦 Installation

### For Consuming Projects

```bash
npm install @aegov/design-system
```

### For Development

```bash
# Clone the repository
git clone <repository-url>
cd aegov-dls-3

# Install dependencies
npm install

# Start development server
npm start
```

## 🚀 Quick Start

### Vanilla JavaScript / HTML

```html
<!DOCTYPE html>
<html>
  <head>
    <script type="module" src="https://unpkg.com/@aegov/design-system/dist/aegov/aegov.esm.js"></script>
  </head>
  <body>
    <aegov-button variant="solid" size="base">
      Click Me
    </aegov-button>

    <script>
      const button = document.querySelector('aegov-button');
      button.addEventListener('aegovClick', () => {
        console.log('Button clicked!');
      });
    </script>
  </body>
</html>
```

### React

```tsx
import { AegovButton } from '@aegov/design-system-react';

function App() {
  return (
    <AegovButton
      variant="solid"
      size="base"
      onAegovClick={() => console.log('Clicked!')}
    >
      Click Me
    </AegovButton>
  );
}
```

### Vue 3

```vue
<template>
  <aegov-button
    variant="solid"
    size="base"
    @aegov-click="handleClick"
  >
    Click Me
  </aegov-button>
</template>

<script setup>
import { AegovButton } from '@aegov/design-system-vue';

const handleClick = () => {
  console.log('Clicked!');
};
</script>
```

### Angular

```typescript
import { Component } from '@angular/core';
import { AegovButton } from '@aegov/design-system-angular';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AegovButton],
  template: `
    <aegov-button
      variant="solid"
      size="base"
      (aegovClick)="handleClick()"
    >
      Click Me
    </aegov-button>
  `
})
export class AppComponent {
  handleClick() {
    console.log('Clicked!');
  }
}
```

## 🎨 Using Tailwind Theme in Your Project

The AEGOV Design System packages its Tailwind CSS theme with design tokens that you can use in your consuming projects.

### Setup in Your Project

1. **Install Tailwind CSS v4** in your project:

```bash
npm install -D tailwindcss@^4.1.3 @tailwindcss/postcss
```

2. **Import the AEGOV theme** in your CSS:

```css
/* src/styles/main.css */
@import "@aegov/design-system/tailwind.css";

/* Your custom styles here */
```

3. **Configure PostCSS**:

```javascript
// postcss.config.js
module.exports = {
  plugins: [
    require('@tailwindcss/postcss'),
  ]
};
```

4. **Use the design tokens** in your application:

```html
<div class="bg-primary-600 text-white px-4 py-2 rounded-lg">
  Using AEGOV design tokens!
</div>
```

### Available Design Tokens

The theme includes:

- **Colors**: Primary, Secondary, Neutral, Success, Warning, Error, Info (50-950 shades)
- **Typography**: Font families (Sans, Mono, Display), sizes, weights, line heights
- **Spacing**: Comprehensive spacing scale (px, 0-24)
- **Border Radius**: From none to full (sm, md, lg, xl, 2xl, 3xl, full)
- **Shadows**: xs, sm, base, md, lg, xl, 2xl
- **Transitions**: Duration and timing functions
- **Z-index**: Semantic z-index scale

See `src/styles/tailwind.css` for the complete theme configuration.

## 📚 Components

### aegov-button

A versatile button component with multiple variants and sizes.

**Props:**
- `variant`: `'solid'` | `'outline'` (default: `'solid'`)
- `size`: `'xs'` | `'sm'` | `'base'` | `'lg'` (default: `'base'`)
- `type`: `'button'` | `'submit'` | `'reset'` (default: `'button'`)
- `disabled`: `boolean` (default: `false`)
- `loading`: `boolean` (default: `false`)
- `fullWidth`: `boolean` (default: `false`)

**Events:**
- `aegovClick`: Emitted when button is clicked
- `aegovFocus`: Emitted when button receives focus
- `aegovBlur`: Emitted when button loses focus

[Full documentation →](src/components/aegov-button/readme.md)

## 🛠️ Development

### Project Structure

```
aegov-dls-3/
├── src/
│   ├── components/           # Component library
│   │   └── aegov-button/    # Button component
│   ├── styles/              # Tailwind theme configuration
│   │   └── tailwind.css     # Main theme file
│   ├── global/              # Global styles
│   ├── utils/               # Shared utilities and types
│   └── index.ts             # Main entry point
├── stencil.config.ts        # Stencil configuration
├── postcss.config.js        # PostCSS configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies
```

### Available Scripts

```bash
# Start development server with hot reload
npm start

# Build for production
npm run build

# Run tests
npm test

# Run tests in watch mode
npm run test.watch

# Generate a new component
npm run generate
```

### Creating New Components

```bash
# Generate a new component scaffold
npm run generate

# Follow the prompts to create your component
```

## 🎯 Design Principles

1. **Accessibility First**: All components are built with WCAG 2.1 AA compliance in mind
2. **Framework Agnostic**: Works everywhere, no framework lock-in
3. **Developer Experience**: Excellent TypeScript support and clear documentation
4. **Performance**: Lazy loading, tree-shaking, and minimal runtime overhead
5. **Customizable**: Design tokens and CSS custom properties for easy theming
6. **Scoped Styles**: No style conflicts, but without Shadow DOM restrictions

## 📖 Documentation

- [Component Documentation](src/components/)
- [Design Tokens](src/styles/tailwind.css)
- [StencilJS Documentation](https://stenciljs.com/)
- [Tailwind CSS v4 Documentation](https://tailwindcss.com/)

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

MIT License - see [LICENSE](LICENSE) for details

## 🙏 Acknowledgments

- Built with [StencilJS](https://stenciljs.com/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Inspired by modern design systems

---

**Built with ♥ by the AEGOV Team**
