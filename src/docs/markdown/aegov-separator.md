# aegov-separator

A visual divider for separating sections of content. Use it to break up form sections, divide list groups, or insert an "OR"-style break between two interaction paths. Supports horizontal and vertical orientation, optional inline text label, and a subtle appearance for less visual weight.

## Properties

### orientation

Direction of the separator. Accepts `horizontal` (default) or `vertical`.

```html
<aegov-separator orientation="horizontal"></aegov-separator>
<aegov-separator orientation="vertical"></aegov-separator>
```

### appearance

Visual weight. Accepts `default` (standard) or `subtle` (lighter).

```html
<aegov-separator appearance="subtle"></aegov-separator>
```

### text

Optional inline text label rendered at the center of the separator. When set (or when slotted content is present), the separator renders as a flex layout with line/text/line.

```html
<aegov-separator text="Or"></aegov-separator>
```

### is-decorative

Whether the separator is purely decorative. When `true` (default), uses `role="presentation"`. When `false`, uses `role="separator"` for assistive technology.

```html
<aegov-separator is-decorative="false"></aegov-separator>
```

### extra-class

Additional CSS class merged onto the separator element.

```html
<aegov-separator extra-class="my-2"></aegov-separator>
```

## Examples

### Horizontal divider

```html
<aegov-separator></aegov-separator>
```

### Subtle divider between sections

```html
<section>...</section>
<aegov-separator appearance="subtle"></aegov-separator>
<section>...</section>
```

### "Or" divider between login methods

```html
<aegov-button>Sign in</aegov-button>
<aegov-separator text="OR"></aegov-separator>
<aegov-button appearance="outline">Sign in with UAE Pass</aegov-button>
```

### Vertical divider in a row of actions

```html
<div class="flex items-center gap-3 h-6">
  <aegov-link href="/edit">Edit</aegov-link>
  <aegov-separator orientation="vertical"></aegov-separator>
  <aegov-link href="/delete">Delete</aegov-link>
</div>
```

## RTL Behavior

The separator is symmetric and direction-agnostic. The horizontal variant fills its container width identically in LTR and RTL. The text-bearing variant centers the label in either direction.

## API Reference

### Properties

| Property        | Attribute        | Description                                                              | Type                          | Default        |
| --------------- | ---------------- | ------------------------------------------------------------------------ | ----------------------------- | -------------- |
| `orientation`   | `orientation`    | Direction of the separator.                                              | `"horizontal" \| "vertical"`  | `'horizontal'` |
| `appearance`    | `appearance`     | Visual weight.                                                           | `"default" \| "subtle"`       | `'default'`    |
| `text`          | `text`           | Inline label text rendered at the center.                                | `string`                      | `undefined`    |
| `isDecorative`  | `is-decorative`  | If `true`, uses `role="presentation"`. If `false`, uses `role="separator"`. | `boolean`                  | `true`         |
| `extraClass`    | `extra-class`    | Additional CSS classes.                                                  | `string`                      | `undefined`    |

### Slots

| Slot      | Description                                                                              |
| --------- | ---------------------------------------------------------------------------------------- |
| (default) | Optional inline label (alternative to the `text` prop). When present, switches to the text-bearing variant. |

## Accessibility

### Built-in

- Renders `role="presentation"` by default (purely decorative). When `is-decorative="false"`, renders `role="separator"` so AT announces it as a structural divider.
- Sets `aria-orientation` to match the `orientation` prop.

### Developer responsibilities

- Set `is-decorative="false"` only when the separator carries meaning for assistive technology — for example, separating two distinct content groups in a list.
- For decorative dividers, leave the default to avoid noisy AT announcements.

### Notes

- The vertical separator requires a height context — its parent or the separator itself must have a defined height.
