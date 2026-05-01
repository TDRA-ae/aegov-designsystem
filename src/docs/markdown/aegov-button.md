# aegov-button

A clickable, framework-agnostic button used to trigger actions, submit forms, or navigate-by-action. Renders a native `<button>` internally with full keyboard and screen-reader support, and exposes `variant`, `appearance`, `size`, and state props for flexible visual styling.

## Properties

### fieldId

Unique ID applied to the inner `<button>`. Auto-generated as `aegov-button-{n}` if omitted. Reflected to the host attribute.

```html
<aegov-button field-id="submit-btn">Submit</aegov-button>
```

### variant

Color scheme. One of `primary` (default), `secondary`, `danger`, `neutralMin`, `neutralMax`.

```html
<aegov-button variant="danger">Delete</aegov-button>
```

### appearance

Visual style. One of `solid` (default), `outline`, `soft`, `link`.

```html
<aegov-button appearance="outline">Cancel</aegov-button>
<aegov-button appearance="soft">Continue</aegov-button>
<aegov-button appearance="link">Read more</aegov-button>
```

### type

Maps to the native HTML `type` attribute. One of `button` (default), `submit`, `reset`.

```html
<aegov-button type="submit">Save</aegov-button>
```

### isDisabled

Prevents interaction. Applies `disabled` and `aria-disabled="true"` on the inner button.

```html
<aegov-button is-disabled>Disabled</aegov-button>
```

### isLoading

Shows a spinner, disables the button, and sets `aria-busy="true"`. Use during async operations.

```html
<aegov-button is-loading>Submitting…</aegov-button>
```

### isIcon

Renders the button as an icon-only square. Always pair with `aria-label`.

```html
<aegov-button is-icon aria-label="Settings">
  <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/></svg>
</aegov-button>
```

### isFull

Stretches the button to the full width of its container.

```html
<aegov-button is-full>Continue</aegov-button>
```

### isBold

Defaults to `true`. Set to `false` for normal-weight text.

```html
<aegov-button is-bold="false">Normal weight</aegov-button>
```

## Sizes

The `size` prop is responsive. Tokens: `xs`, `sm`, `base` (default), `lg`, `xl`. Accepts a Tailwind-style responsive string (e.g. `"sm md:base lg:lg"`).

| Size | Height |
|---|---|
| `xs` | 36px (`h-9`) |
| `sm` | 40px (`h-10`) |
| `base` | 44px (`h-11`) |
| `lg` | 48px (`h-12`) |
| `xl` | 52px (`h-13`) |

```html
<aegov-button size="xs">XS</aegov-button>
<aegov-button size="sm">SM</aegov-button>
<aegov-button size="base">Base</aegov-button>
<aegov-button size="lg">LG</aegov-button>
<aegov-button size="xl">XL</aegov-button>

<!-- Responsive -->
<aegov-button size="sm md:base lg:lg">Resize me</aegov-button>
```

## Examples

### Submit form

```html
<form>
  <aegov-button type="submit" variant="primary">Save changes</aegov-button>
  <aegov-button type="reset" appearance="outline">Reset</aegov-button>
</form>
```

### Loading state

```html
<aegov-button id="save" is-loading>Saving…</aegov-button>
<script>
  // toggle off when async work completes
  document.getElementById('save').isLoading = false;
</script>
```

### Button with leading icon

```html
<aegov-button>
  <svg viewBox="0 0 24 24" width="16" height="16"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
  Continue
</aegov-button>
```

### Full-width primary action

```html
<aegov-button is-full variant="primary">Sign in</aegov-button>
```

## RTL Behavior

The component uses Tailwind logical properties (`gap`, padding scales, group-position rules) so it mirrors automatically when the document or a parent has `dir="rtl"`. Leading/trailing icons swap visually, and grouped border radii flip correctly.

```html
<div dir="rtl">
  <aegov-button>متابعة</aegov-button>
</div>
```

## Sub-component: aegov-button-group

`aegov-button-group` visually joins multiple `aegov-button` children edge-to-edge. The group sets each child's `groupPosition` (`first` / `middle` / `last` / `single`) and `groupOrientation` (`horizontal` / `vertical`) so the buttons render with merged borders and radii.

| Property | Attribute | Description | Type | Default |
|---|---|---|---|---|
| `orientation` | `orientation` | Layout direction. | `'horizontal' \| 'vertical'` | `'horizontal'` |

**Slot:** Default — place `aegov-button` elements as direct children. Non-button children produce a console warning.

**Role:** The wrapping `<div>` has `role="group"` so assistive tech announces the buttons as a related set.

```html
<aegov-button-group>
  <aegov-button appearance="outline">Day</aegov-button>
  <aegov-button appearance="outline">Week</aegov-button>
  <aegov-button appearance="outline">Month</aegov-button>
</aegov-button-group>

<aegov-button-group orientation="vertical">
  <aegov-button appearance="soft">Edit</aegov-button>
  <aegov-button appearance="soft">Duplicate</aegov-button>
  <aegov-button appearance="soft" variant="danger">Delete</aegov-button>
</aegov-button-group>
```

## API Reference

### Properties

| Property | Attribute | Description | Type | Default |
|---|---|---|---|---|
| `fieldId` | `field-id` | Inner button id (auto-generated). | `string` | `aegov-button-{n}` |
| `variant` | `variant` | Color scheme. | `'primary' \| 'secondary' \| 'danger' \| 'neutralMin' \| 'neutralMax'` | `'primary'` |
| `appearance` | `appearance` | Visual style. | `'solid' \| 'outline' \| 'soft' \| 'link'` | `'solid'` |
| `size` | `size` | Size token; supports responsive strings. | `'xs' \| 'sm' \| 'base' \| 'lg' \| 'xl'` | `'base'` |
| `type` | `type` | Native button type. | `'button' \| 'submit' \| 'reset'` | `'button'` |
| `isDisabled` | `is-disabled` | Disables the button. | `boolean` | `false` |
| `isLoading` | `is-loading` | Shows spinner; disables; sets `aria-busy`. | `boolean` | `false` |
| `isIcon` | `is-icon` | Renders square icon-only button. | `boolean` | `false` |
| `isFull` | `is-full` | Stretches to container width. | `boolean` | `false` |
| `isBold` | `is-bold` | Bold (semibold) text. | `boolean` | `true` |
| `groupPosition` | `group-position` | _Internal._ Set by `aegov-button-group`. | `'first' \| 'middle' \| 'last' \| 'single'` | `undefined` |
| `groupOrientation` | `group-orientation` | _Internal._ Set by `aegov-button-group`. | `'horizontal' \| 'vertical'` | `undefined` |

### Pass-through Attributes

All `aria-*` and `data-*` attributes set on the host are forwarded to the inner `<button>`.

### Events

| Event | Description | Detail |
|---|---|---|
| `aegovButtonClick` | Fires on click. Suppressed when disabled or loading. | `MouseEvent` |
| `aegovButtonFocus` | Fires when the inner button receives focus. | `FocusEvent` |
| `aegovButtonBlur` | Fires when the inner button loses focus. | `FocusEvent` |

### Event listening example

```html
<aegov-button id="cta">Click me</aegov-button>
<script>
  document.getElementById('cta').addEventListener('aegovButtonClick', (e) => {
    console.log('Clicked', e.detail);
  });
</script>
```

### Slots

| Slot | Description |
|---|---|
| (default) | Button content — text, icons, or a combination. |

### Shadow Parts

| Part | Description |
|---|---|
| `button` | The inner native `<button>` element. |

```css
aegov-button::part(button) {
  text-transform: uppercase;
}
```

## Accessibility

### Built-in

- Renders a real `<button>` element (focusable, keyboard activatable).
- Sets `aria-disabled` to match the disabled/loading state.
- Sets `aria-busy="true"` while loading.
- Visible `focus-visible` outline tuned per appearance.
- Passes `aria-*` attributes through from the host.

### Developer responsibilities

- Provide `aria-label` on icon-only buttons.
- For loading buttons whose label does not change ("Save" → "Save"), add a label that describes what is happening (`aria-label="Saving..."`).
- Verify color contrast if you override colors via `::part(button)`.
- Do not wrap `aegov-button` inside another `<button>`.

### Notes

- The `loading` state already disables interaction — you do not also need `is-disabled`.
- Icons placed in the slot inherit the current text size automatically.
- The `link` appearance still renders a `<button>` (not an `<a>`); use a real anchor for navigation.
