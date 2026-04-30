# Avatar Group

<p class="text-lg text-aeblack-500 mb-8">An avatar group displays multiple avatars together in a compact layout. It supports spaced or overlapping modes, a "+N more" indicator, and enforces consistent sizing and rounded shape across all child avatars.</p>

## Introduction

The `aegov-avatar-group` component wraps one or more `<aegov-avatar>` elements and arranges them in either a spaced or overlapping layout. It enforces a uniform `size` on all children, and can display a "+N more" button when there are additional users not shown.

> **Always rounded.** Avatars inside a group are always displayed in the `rounded` (circular) shape, regardless of any `variant` attribute set on individual `<aegov-avatar>` elements. The group overrides this automatically — there is no square option inside a group.

```html
<aegov-avatar-group>
  <aegov-avatar src="https://i.pravatar.cc/150?img=1" alt="User 1"></aegov-avatar>
  <aegov-avatar src="https://i.pravatar.cc/150?img=5" alt="User 2"></aegov-avatar>
  <aegov-avatar src="https://i.pravatar.cc/150?img=12" alt="User 3"></aegov-avatar>
</aegov-avatar-group>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-avatar-group>
    <aegov-avatar src="https://i.pravatar.cc/150?img=1" alt="User 1"></aegov-avatar>
    <aegov-avatar src="https://i.pravatar.cc/150?img=5" alt="User 2"></aegov-avatar>
    <aegov-avatar src="https://i.pravatar.cc/150?img=12" alt="User 3"></aegov-avatar>
  </aegov-avatar-group>
</div>

---

## Layout Modes

The `mode` property controls how avatars are arranged within the group.

### Default (spaced)

Avatars are laid out with a small gap between them. This is the default behaviour.

```html
<aegov-avatar-group variant="default">
  <aegov-avatar src="https://i.pravatar.cc/150?img=1" alt="User 1"></aegov-avatar>
  <aegov-avatar src="https://i.pravatar.cc/150?img=5" alt="User 2"></aegov-avatar>
  <aegov-avatar src="https://i.pravatar.cc/150?img=12" alt="User 3"></aegov-avatar>
</aegov-avatar-group>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-avatar-group variant="default" size="lg">
    <aegov-avatar src="https://i.pravatar.cc/150?img=1" alt="User 1"></aegov-avatar>
    <aegov-avatar src="https://i.pravatar.cc/150?img=5" alt="User 2"></aegov-avatar>
    <aegov-avatar src="https://i.pravatar.cc/150?img=12" alt="User 3"></aegov-avatar>
    <aegov-avatar src="https://i.pravatar.cc/150?img=32" alt="User 4"></aegov-avatar>
  </aegov-avatar-group>
</div>

### Compact (overlapping)

Avatars overlap each other with a negative margin. A white ring separates each avatar for clarity. The overlap amount scales with the avatar size.

```html
<aegov-avatar-group variant="compact">
  <aegov-avatar src="https://i.pravatar.cc/150?img=1" alt="User 1"></aegov-avatar>
  <aegov-avatar src="https://i.pravatar.cc/150?img=5" alt="User 2"></aegov-avatar>
  <aegov-avatar src="https://i.pravatar.cc/150?img=12" alt="User 3"></aegov-avatar>
</aegov-avatar-group>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-avatar-group variant="compact" size="lg">
    <aegov-avatar src="https://i.pravatar.cc/150?img=1" alt="User 1"></aegov-avatar>
    <aegov-avatar src="https://i.pravatar.cc/150?img=5" alt="User 2"></aegov-avatar>
    <aegov-avatar src="https://i.pravatar.cc/150?img=12" alt="User 3"></aegov-avatar>
    <aegov-avatar src="https://i.pravatar.cc/150?img=32" alt="User 4"></aegov-avatar>
  </aegov-avatar-group>
</div>

---

## Enforced Size

The `size` property on the group overrides the size of every child avatar, ensuring visual consistency.

```html
<aegov-avatar-group size="xl">
  <aegov-avatar src="https://i.pravatar.cc/150?img=1" alt="User 1"></aegov-avatar>
  <aegov-avatar src="https://i.pravatar.cc/150?img=5" alt="User 2"></aegov-avatar>
</aegov-avatar-group>
```

<div class="flex flex-wrap items-end gap-8 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <div>
    <p class="text-xs text-aeblack-400 mb-2">size="sm"</p>
    <aegov-avatar-group variant="compact" size="sm">
      <aegov-avatar src="https://i.pravatar.cc/150?img=1" alt="User 1"></aegov-avatar>
      <aegov-avatar src="https://i.pravatar.cc/150?img=5" alt="User 2"></aegov-avatar>
      <aegov-avatar src="https://i.pravatar.cc/150?img=12" alt="User 3"></aegov-avatar>
    </aegov-avatar-group>
  </div>
  <div>
    <p class="text-xs text-aeblack-400 mb-2">size="base"</p>
    <aegov-avatar-group variant="compact" size="base">
      <aegov-avatar src="https://i.pravatar.cc/150?img=1" alt="User 1"></aegov-avatar>
      <aegov-avatar src="https://i.pravatar.cc/150?img=5" alt="User 2"></aegov-avatar>
      <aegov-avatar src="https://i.pravatar.cc/150?img=12" alt="User 3"></aegov-avatar>
    </aegov-avatar-group>
  </div>
  <div>
    <p class="text-xs text-aeblack-400 mb-2">size="lg"</p>
    <aegov-avatar-group variant="compact" size="lg">
      <aegov-avatar src="https://i.pravatar.cc/150?img=1" alt="User 1"></aegov-avatar>
      <aegov-avatar src="https://i.pravatar.cc/150?img=5" alt="User 2"></aegov-avatar>
      <aegov-avatar src="https://i.pravatar.cc/150?img=12" alt="User 3"></aegov-avatar>
    </aegov-avatar-group>
  </div>
  <div>
    <p class="text-xs text-aeblack-400 mb-2">size="xl"</p>
    <aegov-avatar-group variant="compact" size="xl">
      <aegov-avatar src="https://i.pravatar.cc/150?img=1" alt="User 1"></aegov-avatar>
      <aegov-avatar src="https://i.pravatar.cc/150?img=5" alt="User 2"></aegov-avatar>
      <aegov-avatar src="https://i.pravatar.cc/150?img=12" alt="User 3"></aegov-avatar>
    </aegov-avatar-group>
  </div>
</div>

> **Note:** Even if individual `<aegov-avatar>` elements have their own `size` set, the group will override them to match the group's `size` property.

### Responsive Size

The `size` prop accepts Tailwind-style responsive prefixes. Write a space-separated string where each token is either a plain value or `breakpoint:value`. The base value (no prefix) applies below the smallest specified breakpoint.

Available breakpoints: `xs` (480px), `sm` (640px), `md` (768px), `lg` (1024px), `xl` (1280px), `2xl` (1536px), `3xl` (1680px).

```html
<aegov-avatar-group size="sm xl:2xl">
  <aegov-avatar src="https://i.pravatar.cc/150?img=1" alt="User 1"></aegov-avatar>
  <aegov-avatar src="https://i.pravatar.cc/150?img=5" alt="User 2"></aegov-avatar>
  <aegov-avatar src="https://i.pravatar.cc/150?img=12" alt="User 3"></aegov-avatar>
</aegov-avatar-group>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-avatar-group size="sm xl:2xl">
    <aegov-avatar src="https://i.pravatar.cc/150?img=1" alt="User 1"></aegov-avatar>
    <aegov-avatar src="https://i.pravatar.cc/150?img=5" alt="User 2"></aegov-avatar>
    <aegov-avatar src="https://i.pravatar.cc/150?img=12" alt="User 3"></aegov-avatar>
  </aegov-avatar-group>
</div>

> **Graceful degradation:** Unknown breakpoint names and invalid values are silently ignored. An unrecognised base value falls back to the component default.

---

## More Indicator

When there are additional users that are not displayed, set the `more-count` property to show a "+N" indicator button at the end of the group. Clicking the indicator emits the `aegovAvatarGroupMore` event.

```html
<aegov-avatar-group variant="compact" more-count="12">
  <aegov-avatar src="https://i.pravatar.cc/150?img=1" alt="User 1"></aegov-avatar>
  <aegov-avatar src="https://i.pravatar.cc/150?img=5" alt="User 2"></aegov-avatar>
  <aegov-avatar src="https://i.pravatar.cc/150?img=12" alt="User 3"></aegov-avatar>
</aegov-avatar-group>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-avatar-group variant="compact" size="lg" more-count="12">
    <aegov-avatar src="https://i.pravatar.cc/150?img=1" alt="User 1"></aegov-avatar>
    <aegov-avatar src="https://i.pravatar.cc/150?img=5" alt="User 2"></aegov-avatar>
    <aegov-avatar src="https://i.pravatar.cc/150?img=12" alt="User 3"></aegov-avatar>
  </aegov-avatar-group>
</div>

### Custom More Text

Use the `more-text` property to override the default "+N" label.

```html
<aegov-avatar-group variant="compact" more-count="99" more-text="99+">
  …
</aegov-avatar-group>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-avatar-group variant="compact" size="lg" more-count="99" more-text="99+">
    <aegov-avatar src="https://i.pravatar.cc/150?img=1" alt="User 1"></aegov-avatar>
    <aegov-avatar src="https://i.pravatar.cc/150?img=5" alt="User 2"></aegov-avatar>
    <aegov-avatar src="https://i.pravatar.cc/150?img=12" alt="User 3"></aegov-avatar>
  </aegov-avatar-group>
</div>

---

## Listening to Events

The "more" indicator button emits an `aegovAvatarGroupMore` event when clicked. Use this to open a popover, modal, or navigate to a full user list.

```html
<aegov-avatar-group id="team-group" mode="compact" more-count="8">
  <aegov-avatar src="https://i.pravatar.cc/150?img=1" alt="User 1"></aegov-avatar>
  <aegov-avatar src="https://i.pravatar.cc/150?img=5" alt="User 2"></aegov-avatar>
</aegov-avatar-group>

<script>
  document.getElementById('team-group')
    .addEventListener('aegovAvatarGroupMore', () => {
      console.log('Show all users');
    });
</script>
```

---

## Always Rounded

Avatars inside a group are **always rounded**, regardless of what `variant` is set on individual `<aegov-avatar>` elements. The group enforces `variant="rounded"` on every child automatically — you do not need to set it yourself, and setting `variant="square"` on a child will be silently overridden.

The "more" indicator button follows the same rule and is always circular.

```html
<!-- variant="square" on these avatars will be ignored inside the group -->
<aegov-avatar-group variant="compact" more-count="3">
  <aegov-avatar src="…" alt="…"></aegov-avatar>
  <aegov-avatar src="…" alt="…" variant="square"></aegov-avatar>
</aegov-avatar-group>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-avatar-group variant="compact" size="lg" more-count="3">
    <aegov-avatar src="https://i.pravatar.cc/150?img=3" alt="User 1"></aegov-avatar>
    <aegov-avatar src="https://i.pravatar.cc/150?img=8" alt="User 2" variant="square"></aegov-avatar>
    <aegov-avatar src="https://i.pravatar.cc/150?img=11" alt="User 3" variant="square"></aegov-avatar>
  </aegov-avatar-group>
</div>

> All three avatars above render as rounded circles — the `variant="square"` on the second and third avatars is overridden by the group.

---

## RTL Support

The compact mode uses `margin-inline-start` for overlap, which automatically reverses in RTL layouts. No additional configuration is needed.

<div dir="rtl" class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-avatar-group variant="compact" size="lg" more-count="7">
    <aegov-avatar src="https://i.pravatar.cc/150?img=3" alt="مستخدم 1"></aegov-avatar>
    <aegov-avatar src="https://i.pravatar.cc/150?img=8" alt="مستخدم 2"></aegov-avatar>
    <aegov-avatar src="https://i.pravatar.cc/150?img=11" alt="مستخدم 3"></aegov-avatar>
    <aegov-avatar src="https://i.pravatar.cc/150?img=20" alt="مستخدم 4"></aegov-avatar>
  </aegov-avatar-group>
</div>

---

## API Reference

### Properties

| Property    | Attribute    | Description                                       | Type                                                                    | Default     |
|-------------|--------------|---------------------------------------------------|-------------------------------------------------------------------------|-------------|
| `mode`      | `mode`       | Layout mode                                       | `'default'` \| `'compact'`                                             | `'default'` |
| `size`      | `size`       | Size enforced on all child avatars. Supports responsive strings (e.g. `'sm xl:2xl'`). | `'xs'` \| `'sm'` \| `'base'` \| `'lg'` \| `'xl'` \| `'2xl'` \| `'3xl'` | `'base'`    |
| `moreCount` | `more-count` | Number of additional users not shown              | `number`                                                                | `0`         |
| `moreText`  | `more-text`  | Custom label for the "more" indicator             | `string`                                                                | —           |

### Events

| Event                  | Description                                | Detail Type |
|------------------------|--------------------------------------------|-------------|
| `aegovAvatarGroupMore` | Emitted when the "more" button is clicked  | `void`      |

### Slots

| Slot      | Description                                            |
|-----------|--------------------------------------------------------|
| (default) | One or more `<aegov-avatar>` elements to group.       |

---

## Accessibility

### Built-in Features

- **`role="group"`** — the group container is marked with the `group` role for assistive technologies.
- **`aria-label="Avatar group"`** — provides a label for the group container.
- **"More" button `aria-label`** — automatically set to "Show N more users" based on the `more-count` value.
- **Keyboard accessible** — the "more" button is a native `<button>` element with visible focus indicators.

### Developer Responsibilities

1. **Provide `alt` text on each avatar.** The group component does not add labels to individual avatars — that responsibility stays with each `<aegov-avatar>`.

2. **Handle the "more" event meaningfully.** When a user clicks the "+N" button, provide a way to see the remaining users (popover, modal, navigation to a list page).

---

## Notes

- The group's `size` property overrides the `size` of every child `<aegov-avatar>` on load and update. Do not rely on per-avatar sizes when using a group.
- The group always enforces `variant="rounded"` on every child `<aegov-avatar>`. Any `variant="square"` set on an individual avatar is silently overridden. There is no square option inside a group.
- In compact mode, the overlap amount is size-dependent. Smaller avatars overlap less, and larger ones overlap more, keeping the proportions balanced.
- The "more" indicator uses `margin-inline-start` for overlap, which automatically mirrors in RTL layouts.
- The "more" button has hover and focus-visible styles. It matches the avatar sizing so it blends seamlessly with the stack.
- When `more-count` is `0` or not set, no indicator is rendered.
