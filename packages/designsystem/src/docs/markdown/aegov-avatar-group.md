# Avatar Group

<p class="text-lg text-aeblack-500 mb-8">A layout wrapper that arranges multiple <code>aegov-avatar</code> children in a row and optionally renders a trailing &ldquo;+N more&rdquo; indicator. Use it for service teams, project members, document collaborators, or any place where several users are represented as a single cluster. The group enforces a uniform size across its children and forces every avatar to a circular appearance.</p>

## Introduction

The `aegov-avatar-group` component composes a parent wrapper with one or more `aegov-avatar` children. The parent owns shared configuration — size and appearance — and propagates it to each child automatically: every child avatar is forced to `appearance="rounded"` and inherits the group's `size`. You only need to author each `aegov-avatar` inside the group; the visual harmony of the cluster is wired up for you.

```html
<aegov-avatar-group size="lg" more-count="3">
  <aegov-avatar src="https://i.pravatar.cc/150?img=12" alt="Khalid Al Mansoori"></aegov-avatar>
  <aegov-avatar src="https://i.pravatar.cc/150?img=32" alt="Fatima Al Zaabi"></aegov-avatar>
  <aegov-avatar src="https://i.pravatar.cc/150?img=58" alt="Yousef Al Suwaidi"></aegov-avatar>
  <aegov-avatar>MA</aegov-avatar>
</aegov-avatar-group>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-avatar-group size="lg" more-count="3">
    <aegov-avatar src="https://i.pravatar.cc/150?img=12" alt="Khalid Al Mansoori"></aegov-avatar>
    <aegov-avatar src="https://i.pravatar.cc/150?img=32" alt="Fatima Al Zaabi"></aegov-avatar>
    <aegov-avatar src="https://i.pravatar.cc/150?img=58" alt="Yousef Al Suwaidi"></aegov-avatar>
    <aegov-avatar>MA</aegov-avatar>
  </aegov-avatar-group>
</div>

---

## Variant — Default vs. Compact

The `variant` property controls how the avatars are arranged.

- `default` — avatars are spaced apart with a small gap between them.
- `compact` — avatars overlap, mimicking a stack of stickers; the leftmost avatar sits on top.

Use `default` when each user is a distinct unit (a team listing, a contact strip). Use `compact` to compress a cluster into a tight visual shorthand for "these people are involved", typically alongside text such as a project name.

### Default (spaced)

```html
<aegov-avatar-group variant="default" size="lg">
  <aegov-avatar src="https://i.pravatar.cc/150?img=15" alt="Ahmed"></aegov-avatar>
  <aegov-avatar src="https://i.pravatar.cc/150?img=23" alt="Sara"></aegov-avatar>
  <aegov-avatar src="https://i.pravatar.cc/150?img=44" alt="Hamda"></aegov-avatar>
</aegov-avatar-group>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-avatar-group variant="default" size="lg">
    <aegov-avatar src="https://i.pravatar.cc/150?img=15" alt="Ahmed"></aegov-avatar>
    <aegov-avatar src="https://i.pravatar.cc/150?img=23" alt="Sara"></aegov-avatar>
    <aegov-avatar src="https://i.pravatar.cc/150?img=44" alt="Hamda"></aegov-avatar>
  </aegov-avatar-group>
</div>

### Compact (overlapping)

```html
<aegov-avatar-group variant="compact" size="lg">
  <aegov-avatar src="https://i.pravatar.cc/150?img=15" alt="Ahmed"></aegov-avatar>
  <aegov-avatar src="https://i.pravatar.cc/150?img=23" alt="Sara"></aegov-avatar>
  <aegov-avatar src="https://i.pravatar.cc/150?img=44" alt="Hamda"></aegov-avatar>
  <aegov-avatar src="https://i.pravatar.cc/150?img=51" alt="Mohammed"></aegov-avatar>
</aegov-avatar-group>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-avatar-group variant="compact" size="lg">
    <aegov-avatar src="https://i.pravatar.cc/150?img=15" alt="Ahmed"></aegov-avatar>
    <aegov-avatar src="https://i.pravatar.cc/150?img=23" alt="Sara"></aegov-avatar>
    <aegov-avatar src="https://i.pravatar.cc/150?img=44" alt="Hamda"></aegov-avatar>
    <aegov-avatar src="https://i.pravatar.cc/150?img=51" alt="Mohammed"></aegov-avatar>
  </aegov-avatar-group>
</div>

---

## More Indicator

When more users belong to the group than are visible, set `more-count` to render a trailing "+N" button. The indicator is a real `<button>` and emits the `aegovAvatarGroupMore` event when clicked, so you can open a modal listing the full membership.

```html
<aegov-avatar-group variant="compact" size="lg" more-count="12">
  <aegov-avatar src="https://i.pravatar.cc/150?img=12" alt="Khalid"></aegov-avatar>
  <aegov-avatar src="https://i.pravatar.cc/150?img=32" alt="Fatima"></aegov-avatar>
  <aegov-avatar src="https://i.pravatar.cc/150?img=58" alt="Yousef"></aegov-avatar>
</aegov-avatar-group>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-avatar-group variant="compact" size="lg" more-count="12">
    <aegov-avatar src="https://i.pravatar.cc/150?img=12" alt="Khalid"></aegov-avatar>
    <aegov-avatar src="https://i.pravatar.cc/150?img=32" alt="Fatima"></aegov-avatar>
    <aegov-avatar src="https://i.pravatar.cc/150?img=58" alt="Yousef"></aegov-avatar>
  </aegov-avatar-group>
</div>

### Custom More Text

By default, the indicator renders as `{moreCount}+`. Set `more-text` to provide a different label — for example a localised string or shorter shorthand.

```html
<aegov-avatar-group size="lg" more-count="48" more-text="See all">
  <aegov-avatar src="https://i.pravatar.cc/150?img=12" alt="Khalid"></aegov-avatar>
  <aegov-avatar src="https://i.pravatar.cc/150?img=32" alt="Fatima"></aegov-avatar>
  <aegov-avatar src="https://i.pravatar.cc/150?img=58" alt="Yousef"></aegov-avatar>
</aegov-avatar-group>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-avatar-group size="lg" more-count="48" more-text="See all">
    <aegov-avatar src="https://i.pravatar.cc/150?img=12" alt="Khalid"></aegov-avatar>
    <aegov-avatar src="https://i.pravatar.cc/150?img=32" alt="Fatima"></aegov-avatar>
    <aegov-avatar src="https://i.pravatar.cc/150?img=58" alt="Yousef"></aegov-avatar>
  </aegov-avatar-group>
</div>

### Reacting to the More Click

```html
<aegov-avatar-group id="team" size="lg" more-count="12">
  <aegov-avatar src="https://i.pravatar.cc/150?img=12" alt="Khalid"></aegov-avatar>
  <aegov-avatar src="https://i.pravatar.cc/150?img=32" alt="Fatima"></aegov-avatar>
</aegov-avatar-group>

<script>
  document.querySelector('#team').addEventListener('aegovAvatarGroupMore', () => {
    console.log('User wants to see all members of the team');
    // open a modal, navigate to a team page, etc.
  });
</script>
```

---

## Sizes

The `size` property is enforced on every child `aegov-avatar` — individual `size` settings on children are overridden. Accepts `xs`, `sm`, `base` (default), `lg`, `xl`, `2xl`, `3xl`, or a Tailwind-style responsive string.

```html
<aegov-avatar-group size="xs">…</aegov-avatar-group>
<aegov-avatar-group size="sm">…</aegov-avatar-group>
<aegov-avatar-group size="base">…</aegov-avatar-group>
<aegov-avatar-group size="lg">…</aegov-avatar-group>
<aegov-avatar-group size="xl">…</aegov-avatar-group>
<aegov-avatar-group size="2xl">…</aegov-avatar-group>
<aegov-avatar-group size="3xl">…</aegov-avatar-group>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div style="display:flex;flex-direction:column;gap:1rem;">
    <aegov-avatar-group variant="compact" size="xs" more-count="5">
      <aegov-avatar src="https://i.pravatar.cc/150?img=12" alt="Khalid"></aegov-avatar>
      <aegov-avatar src="https://i.pravatar.cc/150?img=32" alt="Fatima"></aegov-avatar>
      <aegov-avatar src="https://i.pravatar.cc/150?img=58" alt="Yousef"></aegov-avatar>
    </aegov-avatar-group>
    <aegov-avatar-group variant="compact" size="sm" more-count="5">
      <aegov-avatar src="https://i.pravatar.cc/150?img=12" alt="Khalid"></aegov-avatar>
      <aegov-avatar src="https://i.pravatar.cc/150?img=32" alt="Fatima"></aegov-avatar>
      <aegov-avatar src="https://i.pravatar.cc/150?img=58" alt="Yousef"></aegov-avatar>
    </aegov-avatar-group>
    <aegov-avatar-group variant="compact" size="base" more-count="5">
      <aegov-avatar src="https://i.pravatar.cc/150?img=12" alt="Khalid"></aegov-avatar>
      <aegov-avatar src="https://i.pravatar.cc/150?img=32" alt="Fatima"></aegov-avatar>
      <aegov-avatar src="https://i.pravatar.cc/150?img=58" alt="Yousef"></aegov-avatar>
    </aegov-avatar-group>
    <aegov-avatar-group variant="compact" size="lg" more-count="5">
      <aegov-avatar src="https://i.pravatar.cc/150?img=12" alt="Khalid"></aegov-avatar>
      <aegov-avatar src="https://i.pravatar.cc/150?img=32" alt="Fatima"></aegov-avatar>
      <aegov-avatar src="https://i.pravatar.cc/150?img=58" alt="Yousef"></aegov-avatar>
    </aegov-avatar-group>
    <aegov-avatar-group variant="compact" size="xl" more-count="5">
      <aegov-avatar src="https://i.pravatar.cc/150?img=12" alt="Khalid"></aegov-avatar>
      <aegov-avatar src="https://i.pravatar.cc/150?img=32" alt="Fatima"></aegov-avatar>
      <aegov-avatar src="https://i.pravatar.cc/150?img=58" alt="Yousef"></aegov-avatar>
    </aegov-avatar-group>
    <aegov-avatar-group variant="compact" size="2xl" more-count="5">
      <aegov-avatar src="https://i.pravatar.cc/150?img=12" alt="Khalid"></aegov-avatar>
      <aegov-avatar src="https://i.pravatar.cc/150?img=32" alt="Fatima"></aegov-avatar>
      <aegov-avatar src="https://i.pravatar.cc/150?img=58" alt="Yousef"></aegov-avatar>
    </aegov-avatar-group>
    <aegov-avatar-group variant="compact" size="3xl" more-count="5">
      <aegov-avatar src="https://i.pravatar.cc/150?img=12" alt="Khalid"></aegov-avatar>
      <aegov-avatar src="https://i.pravatar.cc/150?img=32" alt="Fatima"></aegov-avatar>
      <aegov-avatar src="https://i.pravatar.cc/150?img=58" alt="Yousef"></aegov-avatar>
    </aegov-avatar-group>
  </div>
</div>

---

## Composite Examples

### Project members card

```html
<aegov-card appearance="light">
  <aegov-title level="4">Smart City roadmap</aegov-title>
  <aegov-text size="sm">Cross-ministry team delivering digital transformation initiatives.</aegov-text>
  <div style="margin-top:1rem;">
    <aegov-avatar-group variant="compact" size="base" more-count="8">
      <aegov-avatar src="https://i.pravatar.cc/150?img=12" alt="Khalid Al Mansoori"></aegov-avatar>
      <aegov-avatar src="https://i.pravatar.cc/150?img=32" alt="Fatima Al Zaabi"></aegov-avatar>
      <aegov-avatar src="https://i.pravatar.cc/150?img=58" alt="Yousef Al Suwaidi"></aegov-avatar>
      <aegov-avatar src="https://i.pravatar.cc/150?img=44" alt="Hamda Al Shamsi"></aegov-avatar>
    </aegov-avatar-group>
  </div>
</aegov-card>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-card appearance="light">
    <aegov-title level="4">Smart City roadmap</aegov-title>
    <aegov-text size="sm">Cross-ministry team delivering digital transformation initiatives.</aegov-text>
    <div style="margin-top:1rem;">
      <aegov-avatar-group variant="compact" size="base" more-count="8">
        <aegov-avatar src="https://i.pravatar.cc/150?img=12" alt="Khalid Al Mansoori"></aegov-avatar>
        <aegov-avatar src="https://i.pravatar.cc/150?img=32" alt="Fatima Al Zaabi"></aegov-avatar>
        <aegov-avatar src="https://i.pravatar.cc/150?img=58" alt="Yousef Al Suwaidi"></aegov-avatar>
        <aegov-avatar src="https://i.pravatar.cc/150?img=44" alt="Hamda Al Shamsi"></aegov-avatar>
      </aegov-avatar-group>
    </div>
  </aegov-card>
</div>

### Mixed image and initials fallback

```html
<aegov-avatar-group variant="compact" size="lg" more-count="2">
  <aegov-avatar src="https://i.pravatar.cc/150?img=12" alt="Khalid Al Mansoori"></aegov-avatar>
  <aegov-avatar>FZ</aegov-avatar>
  <aegov-avatar src="https://i.pravatar.cc/150?img=58" alt="Yousef Al Suwaidi"></aegov-avatar>
  <aegov-avatar>MA</aegov-avatar>
</aegov-avatar-group>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-avatar-group variant="compact" size="lg" more-count="2">
    <aegov-avatar src="https://i.pravatar.cc/150?img=12" alt="Khalid Al Mansoori"></aegov-avatar>
    <aegov-avatar>FZ</aegov-avatar>
    <aegov-avatar src="https://i.pravatar.cc/150?img=58" alt="Yousef Al Suwaidi"></aegov-avatar>
    <aegov-avatar>MA</aegov-avatar>
  </aegov-avatar-group>
</div>

---

## RTL Support

The avatar group flows in source order. When the document or any ancestor is set to `dir="rtl"`, the natural flex layout reverses automatically — the first avatar sits on the right and the "+N" indicator slides to the left, all without additional configuration. Each individual `aegov-avatar` remains direction-neutral; only the row layout flips.

```html
<div dir="rtl">
  <aegov-avatar-group variant="compact" size="lg" more-count="3" more-text="عرض الكل">
    <aegov-avatar src="https://i.pravatar.cc/150?img=12" alt="خالد المنصوري"></aegov-avatar>
    <aegov-avatar src="https://i.pravatar.cc/150?img=32" alt="فاطمة الزعابي"></aegov-avatar>
    <aegov-avatar src="https://i.pravatar.cc/150?img=58" alt="يوسف السويدي"></aegov-avatar>
    <aegov-avatar>ما</aegov-avatar>
  </aegov-avatar-group>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-avatar-group variant="compact" size="lg" more-count="3" more-text="عرض الكل">
    <aegov-avatar src="https://i.pravatar.cc/150?img=12" alt="خالد المنصوري"></aegov-avatar>
    <aegov-avatar src="https://i.pravatar.cc/150?img=32" alt="فاطمة الزعابي"></aegov-avatar>
    <aegov-avatar src="https://i.pravatar.cc/150?img=58" alt="يوسف السويدي"></aegov-avatar>
    <aegov-avatar>ما</aegov-avatar>
  </aegov-avatar-group>
</div>

A spaced (default) variant in RTL — note the consistent right-to-left flow:

```html
<div dir="rtl">
  <aegov-avatar-group variant="default" size="base">
    <aegov-avatar src="https://i.pravatar.cc/150?img=15" alt="أحمد"></aegov-avatar>
    <aegov-avatar src="https://i.pravatar.cc/150?img=23" alt="سارة"></aegov-avatar>
    <aegov-avatar src="https://i.pravatar.cc/150?img=44" alt="حمدة"></aegov-avatar>
  </aegov-avatar-group>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-avatar-group variant="default" size="base">
    <aegov-avatar src="https://i.pravatar.cc/150?img=15" alt="أحمد"></aegov-avatar>
    <aegov-avatar src="https://i.pravatar.cc/150?img=23" alt="سارة"></aegov-avatar>
    <aegov-avatar src="https://i.pravatar.cc/150?img=44" alt="حمدة"></aegov-avatar>
  </aegov-avatar-group>
</div>

---

## API Reference

### aegov-avatar-group Properties

| Property     | Attribute     | Description                                                                  | Type                          | Default     |
| ------------ | ------------- | ---------------------------------------------------------------------------- | ----------------------------- | ----------- |
| `variant`    | `variant`     | Layout — `default` (spaced) or `compact` (overlapping).                       | `'default' \| 'compact'`      | `'default'` |
| `size`       | `size`        | Size enforced on every child avatar. Accepts a single token or responsive string. | `string`                      | `'base'`    |
| `moreCount`  | `more-count`  | When greater than zero, renders a trailing `+N` button.                       | `number`                      | `0`         |
| `moreText`   | `more-text`   | Custom label for the more indicator. Defaults to `"{moreCount}+"`.            | `string`                      | `undefined` |

### aegov-avatar Properties (synced by the parent)

The parent group writes the following properties on each child `aegov-avatar` automatically. Setting these on a child directly is overridden on the next sync.

| Property     | Attribute     | Description                                                              | Type                                                                       | Set to       |
| ------------ | ------------- | ------------------------------------------------------------------------ | -------------------------------------------------------------------------- | ------------ |
| `size`       | `size`        | _Set by the parent._ Resolved size token from the group's `size`.         | `'xs' \| 'sm' \| 'base' \| 'lg' \| 'xl' \| '2xl' \| '3xl'`                 | _from group_ |
| `appearance` | `appearance`  | _Set by the parent._ Always forced to `rounded` while inside a group.    | `'square' \| 'rounded'`                                                    | `'rounded'`  |

> Other `aegov-avatar` props — `src`, `alt`, `status`, `field-id` — remain under your control and behave exactly as documented on the avatar component.

### Slots

| Component               | Slot        | Description                                                                  |
| ----------------------- | ----------- | ---------------------------------------------------------------------------- |
| `aegov-avatar-group`    | _(default)_ | Place one or more `aegov-avatar` children here.                              |

### Events

| Event                   | Component              | Detail | Description                                                       |
| ----------------------- | ---------------------- | ------ | ----------------------------------------------------------------- |
| `aegovAvatarGroupMore`  | `aegov-avatar-group`   | `void` | Fired when the trailing `+N` button is clicked by the user.       |

#### Listening for the more click

```html
<aegov-avatar-group id="team" size="lg" more-count="12">
  <aegov-avatar src="https://i.pravatar.cc/150?img=12" alt="Khalid"></aegov-avatar>
  <aegov-avatar src="https://i.pravatar.cc/150?img=32" alt="Fatima"></aegov-avatar>
</aegov-avatar-group>

<script>
  document.querySelector('#team').addEventListener('aegovAvatarGroupMore', () => {
    console.log('Open the full team list');
  });
</script>
```

### Pass-through Attributes

`aegov-avatar-group` renders in the light DOM (no shadow root) — attributes on the host simply aren't read or forwarded to inner elements. The inner container always renders its own fixed `aria-label="Avatar group"` (or the Arabic equivalent under RTL); a host-level `aria-label` is not read by the component and has no effect, regardless of browser or assistive technology. Set attributes directly on the host where they are needed, or on each child `<aegov-avatar>`.

| Attribute group  | Forwarded? | Where to apply                                                         |
| ---------------- | ---------- | ---------------------------------------------------------------------- |
| `aria-*`         | No         | Apply directly to `<aegov-avatar-group>` or each `<aegov-avatar>`.      |
| `data-*`         | No         | Apply directly to `<aegov-avatar-group>` or each `<aegov-avatar>`.      |
| `class`, `style` | Allowed    | Applied to the host element.                                           |

---

## Accessibility

### Built-in behaviour

- The group container has `role="group"` and `aria-label="Avatar group"` so screen readers announce the cluster as a single unit.
- The trailing `+N` indicator is a real `<button type="button">` and is keyboard-focusable. It carries `aria-label="Show {N} more users"` so its purpose is announced clearly.
- Each child `aegov-avatar` retains its own `role="img"` and `aria-label` (derived from `alt`), so individual users are still announced when the user navigates into the group.

### Developer responsibilities

- Provide a meaningful `alt` on every child avatar — the group's container label alone is not enough to identify individual people.
- The component provides a built-in accessible label ("Avatar group") via `aria-label` on its inner light-DOM container. A host-level `aria-label` is simply not read by the component, so it is not a supported way to customise the group label — this isn't a Shadow DOM propagation limitation, `aegov-avatar-group` has no shadow root at all. The component does not currently expose a prop to override the internal label; if a custom group label is required, note this limitation.
- If the `+N` button opens a modal or navigates away, follow the relevant accessibility guidance for that destination — focus management, return focus, and labelled headings.
- Avoid placing too many avatars in a `compact` cluster — the overlapping arrangement makes individual avatars harder to identify visually. Use `more-count` to off-load the long tail to a dedicated list.

### Keyboard support

| Key              | Action                                                              |
| ---------------- | ------------------------------------------------------------------- |
| `Tab`            | Move focus to the `+N` button (when present) and onward.            |
| `Enter`, `Space` | Activate the focused `+N` button — emits `aegovAvatarGroupMore`.    |
| `Shift + Tab`    | Move focus to the previous focusable element.                       |

### Notes

- The group always renders rounded avatars regardless of each child's `appearance`. If you need square avatars in a row, lay them out manually instead of using the group.
- Updating `size` on the group propagates to every child on the next render cycle; you do not need to set it on each avatar individually.
