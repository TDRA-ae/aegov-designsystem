# aegov-button

A versatile button component that supports multiple variants and sizes.

## Usage

### Basic Usage

```html
<aegov-button>Click Me</aegov-button>
```

### Variants

```html
<!-- Solid variant (default) -->
<aegov-button variant="solid">Solid Button</aegov-button>

<!-- Outline variant -->
<aegov-button variant="outline">Outline Button</aegov-button>
```

### Sizes

```html
<!-- Extra small -->
<aegov-button size="xs">Extra Small</aegov-button>

<!-- Small -->
<aegov-button size="sm">Small</aegov-button>

<!-- Base (default) -->
<aegov-button size="base">Base Size</aegov-button>

<!-- Large -->
<aegov-button size="lg">Large</aegov-button>
```

### States

```html
<!-- Disabled -->
<aegov-button disabled>Disabled</aegov-button>

<!-- Loading -->
<aegov-button loading>Loading...</aegov-button>

<!-- Full width -->
<aegov-button full-width>Full Width Button</aegov-button>
```

### Button Types

```html
<!-- Submit button -->
<aegov-button type="submit">Submit</aegov-button>

<!-- Reset button -->
<aegov-button type="reset">Reset</aegov-button>

<!-- Button (default) -->
<aegov-button type="button">Button</aegov-button>
```

### Event Handling

```javascript
const button = document.querySelector('aegov-button');

button.addEventListener('aegovClick', (event) => {
  console.log('Button clicked!', event.detail);
});

button.addEventListener('aegovFocus', (event) => {
  console.log('Button focused!');
});

button.addEventListener('aegovBlur', (event) => {
  console.log('Button blurred!');
});
```

### Framework Integration

#### React

```jsx
import { AegovButton } from '@aegov/design-system-react';

function App() {
  return (
    <AegovButton
      variant="solid"
      size="base"
      onAegovClick={(e) => console.log('Clicked!')}
    >
      Click Me
    </AegovButton>
  );
}
```

#### Vue

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

<script>
export default {
  methods: {
    handleClick(event) {
      console.log('Clicked!', event.detail);
    }
  }
}
</script>
```

#### Angular

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <aegov-button
      variant="solid"
      size="base"
      (aegovClick)="handleClick($event)"
    >
      Click Me
    </aegov-button>
  `
})
export class AppComponent {
  handleClick(event: CustomEvent) {
    console.log('Clicked!', event.detail);
  }
}
```

## Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `variant` | `variant` | The button variant style | `"outline" \| "solid"` | `'solid'` |
| `size` | `size` | The button size | `"base" \| "lg" \| "sm" \| "xs"` | `'base'` |
| `type` | `type` | The button type attribute | `"button" \| "reset" \| "submit"` | `'button'` |
| `disabled` | `disabled` | Whether the button is disabled | `boolean` | `false` |
| `fullWidth` | `full-width` | Whether the button should take full width | `boolean` | `false` |
| `loading` | `loading` | Whether the button is in a loading state | `boolean` | `false` |

## Events

| Event | Description | Type |
| --- | --- | --- |
| `aegovBlur` | Emitted when the button loses focus | `CustomEvent<FocusEvent>` |
| `aegovClick` | Emitted when the button is clicked | `CustomEvent<MouseEvent>` |
| `aegovFocus` | Emitted when the button receives focus | `CustomEvent<FocusEvent>` |

## Slots

| Slot | Description |
| --- | --- |
| Default | Button content |

## CSS Shadow Parts

| Part | Description |
| --- | --- |
| `button` | The native button element |

## Styling

The component uses scoped CSS and Tailwind utility classes. You can customize the appearance using CSS custom properties or by targeting the shadow parts:

```css
/* Using CSS custom properties */
aegov-button {
  --aegov-button-transition: all 0.3s ease;
}

/* Using shadow parts */
aegov-button::part(button) {
  /* Custom styles for the button element */
}
```

---

*Built with ♥ by AEGOV Design System*
