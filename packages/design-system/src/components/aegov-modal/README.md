# aegov-modal

A fully accessible, feature-rich modal/dialog component with Shadow DOM encapsulation, focus management, and support for stacked modals.

## Features

- ✅ **Shadow DOM** - Complete style encapsulation with CSS custom properties for theming
- ✅ **Accessibility** - Full ARIA support, keyboard navigation, and focus trap
- ✅ **Stacked Modals** - Support for multiple modals with automatic z-index management
- ✅ **Animations** - Smooth fade + scale transitions (200ms)
- ✅ **Portal Pattern** - Auto-appends to document.body for proper stacking context
- ✅ **Body Scroll Lock** - Prevents background scrolling with scrollbar compensation
- ✅ **Flexible Positioning** - Center, top, or bottom alignment
- ✅ **Customizable Backdrop** - Three opacity levels (light, base, dark)
- ✅ **Event-Driven** - Comprehensive event system for integration
- ✅ **Responsive** - Adapts to content size or accepts custom width classes
- ✅ **Keyboard Control** - ESC always closes modal (non-configurable), Tab for focus trap
- ✅ **Cancellable Close** - Prevent closing via beforeClose event

## Usage

### Basic Example

```html
<aegov-modal id="myModal">
  <div style="padding: 2rem;">
    <h2>Modal Title</h2>
    <p>This is modal content.</p>
    <button onclick="document.getElementById('myModal').close()">Close</button>
  </div>
</aegov-modal>

<button onclick="document.getElementById('myModal').show()">Open Modal</button>
```

### With Custom Width

```html
<aegov-modal class="max-w-2xl">
  <div style="padding: 2rem;">
    <h2>Wide Modal</h2>
    <p>This modal has a max-width of 672px (Tailwind's max-w-2xl).</p>
  </div>
</aegov-modal>
```

### Top Position with Light Backdrop

```html
<aegov-modal position="top" backdrop-opacity="light">
  <div style="padding: 2rem;">
    <h2>Notification</h2>
    <p>This modal appears at the top with a light backdrop.</p>
  </div>
</aegov-modal>
```

### Prevent Closing on Backdrop Click

```html
<aegov-modal close-with-backdrop="false">
  <div style="padding: 2rem;">
    <h2>Important Action</h2>
    <p>This modal can only be closed using the buttons below or pressing ESC.</p>
    <button onclick="this.closest('aegov-modal').close()">Cancel</button>
    <button onclick="handleAction()">Confirm</button>
  </div>
</aegov-modal>
```

**Note:** While backdrop clicks can be disabled, the ESC key always closes the modal for accessibility compliance.

### With ARIA Labels

```html
<aegov-modal aria-labelledby="modal-title" aria-describedby="modal-desc">
  <div style="padding: 2rem;">
    <h2 id="modal-title">Delete Account</h2>
    <p id="modal-desc">Are you sure you want to delete your account? This action cannot be undone.</p>
    <button onclick="this.closest('aegov-modal').close()">Cancel</button>
    <button onclick="deleteAccount()">Delete</button>
  </div>
</aegov-modal>
```

## JavaScript Examples

### Opening and Closing

```javascript
const modal = document.querySelector('aegov-modal');

// Open modal
await modal.show();

// Close modal
await modal.close();

// Toggle modal
await modal.toggle();
```

### Event Listeners

```javascript
const modal = document.querySelector('aegov-modal');

// Listen for open event
modal.addEventListener('aegovModalOpen', () => {
  console.log('Modal opened!');
});

// Listen for close event
modal.addEventListener('aegovModalClose', () => {
  console.log('Modal closed!');
});

// Prevent closing under certain conditions
modal.addEventListener('aegovModalBeforeClose', (event) => {
  if (hasUnsavedChanges()) {
    event.detail.preventDefault();
    alert('Please save your changes first!');
  }
});

// Track backdrop clicks
modal.addEventListener('aegovModalBackdropClick', (event) => {
  console.log('Backdrop clicked!', event.detail);
});

// Track ESC key presses
modal.addEventListener('aegovModalEscapePress', (event) => {
  console.log('ESC pressed!', event.detail);
});
```

### Stacked Modals

```javascript
// Open multiple modals
const modal1 = document.getElementById('modal1');
const modal2 = document.getElementById('modal2');

await modal1.show(); // Z-index: 50
await modal2.show(); // Z-index: 60 (automatically higher)
```

## Framework Integration

### React

```tsx
import { AegovModal } from '@aegov/design-system-react';

function App() {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>

      <AegovModal
        open={isOpen}
        onAegovModalClose={() => setIsOpen(false)}
        position="center"
        backdropOpacity="base"
      >
        <div style={{ padding: '2rem' }}>
          <h2>React Modal</h2>
          <p>Modal content here.</p>
          <button onClick={() => setIsOpen(false)}>Close</button>
        </div>
      </AegovModal>
    </>
  );
}
```

### Angular

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-modal-example',
  template: `
    <button (click)="openModal()">Open Modal</button>

    <aegov-modal
      [open]="isOpen"
      (aegovModalClose)="closeModal()"
      position="center"
    >
      <div style="padding: 2rem;">
        <h2>Angular Modal</h2>
        <p>Modal content here.</p>
        <button (click)="closeModal()">Close</button>
      </div>
    </aegov-modal>
  `
})
export class ModalExampleComponent {
  isOpen = false;

  openModal() {
    this.isOpen = true;
  }

  closeModal() {
    this.isOpen = false;
  }
}
```

### Vue

```vue
<template>
  <div>
    <button @click="isOpen = true">Open Modal</button>

    <aegov-modal
      :open="isOpen"
      @aegovModalClose="isOpen = false"
      position="center"
    >
      <div style="padding: 2rem;">
        <h2>Vue Modal</h2>
        <p>Modal content here.</p>
        <button @click="isOpen = false">Close</button>
      </div>
    </aegov-modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false
    };
  }
};
</script>
```

## CSS Custom Properties

You can customize the modal appearance using CSS custom properties:

```css
aegov-modal {
  --modal-z-index: 50;
  --modal-backdrop-opacity-light: 0.3;
  --modal-backdrop-opacity-base: 0.5;
  --modal-backdrop-opacity-dark: 0.7;
  --modal-transition-duration: 200ms;
  --modal-transition-timing: cubic-bezier(0.4, 0, 0.2, 1);
}
```

## Design Tokens

### Z-Index
- `--modal-z-index`: Base z-index for modals (default: 50, auto-increments by 10 per stacked modal)

### Backdrop Opacity
- `--modal-backdrop-opacity-light`: 0.3 (30% opacity)
- `--modal-backdrop-opacity-base`: 0.5 (50% opacity)
- `--modal-backdrop-opacity-dark`: 0.7 (70% opacity)

### Transitions
- `--modal-transition-duration`: 200ms
- `--modal-transition-timing`: cubic-bezier(0.4, 0, 0.2, 1) (ease-in-out)

### Colors
- Background: white
- Backdrop: black with variable opacity
- Shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)

### Spacing
- Container padding: 1rem (mobile), 2rem (desktop)
- Top/bottom position offset: 2rem (mobile), 4rem (desktop)
- Border radius: 0.5rem (8px)

### Scrollbar (Webkit browsers)
- Width: 8px
- Track color: slate-100 (#f1f5f9)
- Thumb color: slate-300 (#cbd5e1)
- Thumb hover: slate-400 (#94a3b8)

## Accessibility

The modal component follows WCAG 2.1 guidelines and includes:

- **Keyboard Navigation**: Full keyboard support with Tab/Shift+Tab for focus cycling and **ESC always closes the modal** (non-configurable for accessibility compliance)
- **Focus Management**: Automatic focus trap within modal, returns focus to trigger element on close
- **ARIA Attributes**: Proper `role="dialog"`, `aria-modal="true"`, and support for `aria-label`, `aria-labelledby`, and `aria-describedby`
- **Screen Reader Support**: Semantic HTML structure with proper labeling
- **Reduced Motion**: Respects `prefers-reduced-motion` preference to disable animations

### Best Practices

1. **Always provide a label**: Use either `aria-label` or `aria-labelledby` to give the modal a descriptive name
2. **Include a close mechanism**: Provide a visible close button for users who cannot use ESC key
3. **Focus first interactive element**: The modal automatically focuses the first focusable element
4. **Use semantic HTML**: Structure content with headings, paragraphs, and buttons for better screen reader experience
5. **ESC key behavior**: The ESC key always closes the modal and cannot be disabled. This is intentional for accessibility compliance and follows WCAG guidelines.

## Common Patterns

### Confirmation Dialog

```html
<aegov-modal id="confirmDelete" aria-labelledby="confirm-title" aria-describedby="confirm-desc">
  <div style="padding: 2rem;">
    <h2 id="confirm-title">Confirm Delete</h2>
    <p id="confirm-desc">Are you sure you want to delete this item? This action cannot be undone.</p>
    <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
      <button onclick="this.closest('aegov-modal').close()">Cancel</button>
      <button onclick="handleDelete()">Delete</button>
    </div>
  </div>
</aegov-modal>
```

### Form Dialog

```html
<aegov-modal id="formModal" aria-labelledby="form-title">
  <form style="padding: 2rem;">
    <h2 id="form-title">Contact Us</h2>
    <label>
      Name:
      <input type="text" name="name" required>
    </label>
    <label>
      Email:
      <input type="email" name="email" required>
    </label>
    <label>
      Message:
      <textarea name="message" required></textarea>
    </label>
    <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
      <button type="button" onclick="this.closest('aegov-modal').close()">Cancel</button>
      <button type="submit">Submit</button>
    </div>
  </form>
</aegov-modal>
```

### Image Lightbox

```html
<aegov-modal id="lightbox" aria-label="Image preview" backdrop-opacity="dark">
  <div style="max-width: 90vw; max-height: 90vh;">
    <img src="image.jpg" alt="Preview" style="width: 100%; height: auto;">
  </div>
</aegov-modal>
```

## Pass-Through Attributes

The following attributes are automatically passed through to the internal dialog element:

- `id` - Element ID
- `data-*` - All data attributes
- `aria-*` - All ARIA attributes (including aria-label, aria-labelledby, aria-describedby)

## Browser Support

- Chrome/Edge 88+
- Firefox 87+
- Safari 14+
- iOS Safari 14+
- Android Chrome 88+

## Notes

- The modal automatically appends itself to `document.body` in `connectedCallback()` for proper stacking context
- Body scroll is locked when modal is open (with scrollbar width compensation to prevent layout shift)
- Multiple modals can be open simultaneously with automatic z-index management
- Focus is automatically trapped within the modal and returned to the trigger element on close
- All animations respect the `prefers-reduced-motion` media query for accessibility

## Related Components

- **aegov-callout**: For non-modal alerts and notifications
- **aegov-button**: For trigger buttons and modal actions

<!-- Auto Generated Below -->


## Properties

| Property             | Attribute               | Description                                                                                                                                                                                          | Type                             | Default     |
| -------------------- | ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------- | ----------- |
| `fieldId`            | `field-id`              | Unique ID for the modal dialog element. Auto-generated if not provided.                                                                                                                              | `string`                         | `undefined` |
| `isCloseWithOverlay` | `is-close-with-overlay` | Whether clicking the overlay closes the modal                                                                                                                                                        | `boolean`                        | `true`      |
| `isOpen`             | `is-open`               | Whether the modal is currently open/visible                                                                                                                                                          | `boolean`                        | `false`     |
| `isPadding`          | `is-padding`            | Whether to apply inner content padding. On by default; scales with size.                                                                                                                             | `boolean`                        | `true`      |
| `isPreventScroll`    | `is-prevent-scroll`     | Whether to prevent body scroll when modal is open                                                                                                                                                    | `boolean`                        | `true`      |
| `label`              | `label`                 | Accessible label for the dialog. Passed as `aria-label` on the dialog element. Required for screen readers unless you pass `aria-labelledby` pointing to a heading rendered inside the modal's slot. | `string`                         | `undefined` |
| `overlayOpacity`     | `overlay-opacity`       | Overlay opacity level                                                                                                                                                                                | `"base" \| "dark" \| "light"`    | `'base'`    |
| `position`           | `position`              | Position of the modal on screen                                                                                                                                                                      | `"bottom" \| "center" \| "top"`  | `'center'`  |
| `size`               | `size`                  | Size: 'sm' (compact padding/radius), 'base' (default), 'lg' (generous padding/radius), or 'xl' (extra-wide). Mirrors aegov-card sizing tokens.                                                       | `"base" \| "lg" \| "sm" \| "xl"` | `'base'`    |


## Events

| Event                     | Description                               | Type                         |
| ------------------------- | ----------------------------------------- | ---------------------------- |
| `aegovModalBackdropClick` | Emitted when backdrop is clicked          | `CustomEvent<MouseEvent>`    |
| `aegovModalBeforeClose`   | Emitted before modal closes (cancellable) | `CustomEvent<void>`          |
| `aegovModalClose`         | Emitted when modal is closed              | `CustomEvent<void>`          |
| `aegovModalEscapePress`   | Emitted when ESC key is pressed           | `CustomEvent<KeyboardEvent>` |
| `aegovModalOpen`          | Emitted when modal is opened              | `CustomEvent<void>`          |


## Methods

### `close() => Promise<void>`

Programmatically close the modal

#### Returns

Type: `Promise<void>`



### `show() => Promise<void>`

Programmatically open the modal

#### Returns

Type: `Promise<void>`



### `toggle() => Promise<void>`

Toggle modal open/closed state

#### Returns

Type: `Promise<void>`




## Slots

| Slot | Description   |
| ---- | ------------- |
|      | Modal content |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
