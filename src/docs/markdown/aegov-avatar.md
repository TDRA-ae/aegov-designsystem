# Avatar

<p class="text-lg text-aeblack-500 mb-8">A user-avatar component that renders an image when one is available and falls back to slotted content (such as initials) or a default user silhouette when it is not. Supports seven sizes, square or rounded shapes, and an optional status indicator. Use it for citizen profiles, ministry staff listings, and any place a single user is represented in the interface.</p>

## Introduction

The `aegov-avatar` component is the building block for representing a single person in the UI. Set `src` to display a photograph, slot in initials as a fallback, and optionally render a coloured status dot in the lower-right corner. When the image fails to load, the component automatically falls back to whatever is in the default slot — or to a generic user silhouette if no slot content is provided.

```html
<aegov-avatar
  src="https://i.pravatar.cc/150?img=12"
  alt="Khalid Al Mansoori"
  size="lg"
  appearance="rounded"
  status="online"
></aegov-avatar>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-avatar src="https://i.pravatar.cc/150?img=12" alt="Khalid Al Mansoori" size="lg" appearance="rounded" status="online"></aegov-avatar>
</div>

---

## Image, Initials, and Default Fallback

The avatar resolves its content in this order:

1. If `src` is set and the image loads successfully — show the image.
2. If `src` is missing or the image fails to load — render the default slot.
3. If the default slot is empty — render a built-in user silhouette icon.

```html
<!-- 1. Image -->
<aegov-avatar src="https://i.pravatar.cc/150?img=5" alt="Sara Al Hashimi" appearance="rounded"></aegov-avatar>

<!-- 2. Initials fallback (no src) -->
<aegov-avatar appearance="rounded">SA</aegov-avatar>

<!-- 3. Default silhouette (no src, no slot) -->
<aegov-avatar appearance="rounded"></aegov-avatar>

<!-- 4. Graceful fallback when image fails to load -->
<aegov-avatar src="https://example.invalid/missing.jpg" alt="Sara Al Hashimi" appearance="rounded">SA</aegov-avatar>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div style="display:flex;gap:1rem;align-items:center;">
    <aegov-avatar src="https://i.pravatar.cc/150?img=5" alt="Sara Al Hashimi" appearance="rounded"></aegov-avatar>
    <aegov-avatar appearance="rounded">SA</aegov-avatar>
    <aegov-avatar appearance="rounded"></aegov-avatar>
    <aegov-avatar src="https://example.invalid/missing.jpg" alt="Sara Al Hashimi" appearance="rounded">SA</aegov-avatar>
  </div>
</div>

---

## Appearance

Two shape tokens are available. `square` (default) renders the avatar with rounded corners, while `rounded` renders a full circle. Use `rounded` for personal profiles and chat-style UIs; `square` works well for employee directories and structured layouts.

```html
<aegov-avatar src="https://picsum.photos/200/300" alt="Ahmed Al Marri" appearance="square"></aegov-avatar>
<aegov-avatar src="https://i.pravatar.cc/150?img=14" alt="Ahmed Al Marri" appearance="rounded"></aegov-avatar>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div style="display:flex;gap:1rem;align-items:center;">
    <aegov-avatar src="https://picsum.photos/200/300" alt="Ahmed Al Marri" appearance="square" size="lg"></aegov-avatar>
    <aegov-avatar src="https://i.pravatar.cc/150?img=14" alt="Ahmed Al Marri" appearance="rounded" size="lg"></aegov-avatar>
  </div>
</div>

---

## Sizes

`size` accepts `xs`, `sm`, `base` (default), `lg`, `xl`, `2xl`, or `3xl`. The same value can be supplied as a Tailwind-style responsive string with the breakpoint prefixes `xs`, `sm`, `md`, `lg`, `xl`, and `2xl` so the avatar scales with the viewport.

```html
<aegov-avatar size="xs" src="https://i.pravatar.cc/150?img=20" alt="Hamda"></aegov-avatar>
<aegov-avatar size="sm" src="https://i.pravatar.cc/150?img=20" alt="Hamda"></aegov-avatar>
<aegov-avatar size="base" src="https://i.pravatar.cc/150?img=20" alt="Hamda"></aegov-avatar>
<aegov-avatar size="lg" src="https://i.pravatar.cc/150?img=20" alt="Hamda"></aegov-avatar>
<aegov-avatar size="xl" src="https://i.pravatar.cc/150?img=20" alt="Hamda"></aegov-avatar>
<aegov-avatar size="2xl" src="https://i.pravatar.cc/150?img=20" alt="Hamda"></aegov-avatar>
<aegov-avatar size="3xl" src="https://i.pravatar.cc/150?img=20" alt="Hamda"></aegov-avatar>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div style="display:flex;gap:1rem;align-items:center;flex-wrap:wrap;">
    <aegov-avatar size="xs" src="https://i.pravatar.cc/150?img=20" alt="Hamda" appearance="rounded"></aegov-avatar>
    <aegov-avatar size="sm" src="https://i.pravatar.cc/150?img=20" alt="Hamda" appearance="rounded"></aegov-avatar>
    <aegov-avatar size="base" src="https://i.pravatar.cc/150?img=20" alt="Hamda" appearance="rounded"></aegov-avatar>
    <aegov-avatar size="lg" src="https://i.pravatar.cc/150?img=20" alt="Hamda" appearance="rounded"></aegov-avatar>
    <aegov-avatar size="xl" src="https://i.pravatar.cc/150?img=20" alt="Hamda" appearance="rounded"></aegov-avatar>
    <aegov-avatar size="2xl" src="https://i.pravatar.cc/150?img=20" alt="Hamda" appearance="rounded"></aegov-avatar>
    <aegov-avatar size="3xl" src="https://i.pravatar.cc/150?img=20" alt="Hamda" appearance="rounded"></aegov-avatar>
  </div>
</div>

### Responsive sizes

```html
<!-- Small on phones, base from md, large from lg -->
<aegov-avatar size="sm md:base lg:lg" src="https://i.pravatar.cc/150?img=27" alt="Latifa" appearance="rounded"></aegov-avatar>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-avatar size="sm md:base lg:lg" src="https://i.pravatar.cc/150?img=27" alt="Latifa" appearance="rounded"></aegov-avatar>
</div>

---

## Status Indicator

Set `status` to render a coloured dot in the lower-right corner. Five status values are supported, each with its own colour:

- `online` — the user is currently active
- `offline` — the user is not connected
- `away` — the user is away from their device
- `unavailable` — the user is do-not-disturb / unavailable
- `busy` — the user is busy

`status="true"` is shorthand for `online`; `status="false"` (default) hides the indicator. The indicator carries `aria-label="Status: {status}"` so screen readers announce the user's state.

```html
<aegov-avatar src="https://i.pravatar.cc/150?img=8" alt="Mohammed" appearance="rounded" status="online"></aegov-avatar>
<aegov-avatar src="https://i.pravatar.cc/150?img=8" alt="Mohammed" appearance="rounded" status="away"></aegov-avatar>
<aegov-avatar src="https://i.pravatar.cc/150?img=8" alt="Mohammed" appearance="rounded" status="busy"></aegov-avatar>
<aegov-avatar src="https://i.pravatar.cc/150?img=8" alt="Mohammed" appearance="rounded" status="unavailable"></aegov-avatar>
<aegov-avatar src="https://i.pravatar.cc/150?img=8" alt="Mohammed" appearance="rounded" status="offline"></aegov-avatar>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div style="display:flex;gap:1rem;align-items:center;flex-wrap:wrap;">
    <aegov-avatar src="https://i.pravatar.cc/150?img=8" alt="Mohammed (online)" appearance="rounded" size="lg" status="online"></aegov-avatar>
    <aegov-avatar src="https://i.pravatar.cc/150?img=8" alt="Mohammed (away)" appearance="rounded" size="lg" status="away"></aegov-avatar>
    <aegov-avatar src="https://i.pravatar.cc/150?img=8" alt="Mohammed (busy)" appearance="rounded" size="lg" status="busy"></aegov-avatar>
    <aegov-avatar src="https://i.pravatar.cc/150?img=8" alt="Mohammed (unavailable)" appearance="rounded" size="lg" status="unavailable"></aegov-avatar>
    <aegov-avatar src="https://i.pravatar.cc/150?img=8" alt="Mohammed (offline)" appearance="rounded" size="lg" status="offline"></aegov-avatar>
  </div>
</div>

---

## Initials Avatar

When no portrait is available — for example, on a freshly created account — slot in the user's initials. The component uses the slot for the fallback rendering, so any markup is allowed.

```html
<aegov-avatar appearance="rounded" size="lg">KM</aegov-avatar>
<aegov-avatar appearance="rounded" size="lg" status="online">FZ</aegov-avatar>
<aegov-avatar appearance="square" size="lg">AH</aegov-avatar>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div style="display:flex;gap:1rem;align-items:center;">
    <aegov-avatar appearance="rounded" size="lg">KM</aegov-avatar>
    <aegov-avatar appearance="rounded" size="lg" status="online">FZ</aegov-avatar>
    <aegov-avatar appearance="square" size="lg">AH</aegov-avatar>
  </div>
</div>

---

## Composite Examples

### Profile row

```html
<div style="display:flex;gap:0.75rem;align-items:center;">
  <aegov-avatar
    src="https://i.pravatar.cc/150?img=12"
    alt="Khalid Al Mansoori"
    size="lg"
    appearance="rounded"
    status="online"
  ></aegov-avatar>
  <div>
    <strong>Khalid Al Mansoori</strong>
    <div style="color:var(--color-aeblack-500);font-size:0.875rem;">
      Director, Digital Services — TDRA
    </div>
  </div>
</div>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div style="display:flex;gap:0.75rem;align-items:center;">
    <aegov-avatar src="https://i.pravatar.cc/150?img=12" alt="Khalid Al Mansoori" size="lg" appearance="rounded" status="online"></aegov-avatar>
    <div>
      <strong>Khalid Al Mansoori</strong>
      <div style="color:#475569;font-size:0.875rem;">Director, Digital Services — TDRA</div>
    </div>
  </div>
</div>

### Support team list

```html
<ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:0.75rem;">
  <li style="display:flex;gap:0.75rem;align-items:center;">
    <aegov-avatar src="https://i.pravatar.cc/150?img=32" alt="Fatima Al Zaabi" appearance="rounded" status="online"></aegov-avatar>
    <span>Fatima Al Zaabi — Senior Support</span>
  </li>
  <li style="display:flex;gap:0.75rem;align-items:center;">
    <aegov-avatar src="https://i.pravatar.cc/150?img=58" alt="Yousef Al Suwaidi" appearance="rounded" status="busy"></aegov-avatar>
    <span>Yousef Al Suwaidi — Tier 2 Support</span>
  </li>
  <li style="display:flex;gap:0.75rem;align-items:center;">
    <aegov-avatar appearance="rounded" status="away">MA</aegov-avatar>
    <span>Maryam Al Ali — Out today</span>
  </li>
</ul>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:0.75rem;">
    <li style="display:flex;gap:0.75rem;align-items:center;">
      <aegov-avatar src="https://i.pravatar.cc/150?img=32" alt="Fatima Al Zaabi" appearance="rounded" status="online"></aegov-avatar>
      <span>Fatima Al Zaabi — Senior Support</span>
    </li>
    <li style="display:flex;gap:0.75rem;align-items:center;">
      <aegov-avatar src="https://i.pravatar.cc/150?img=58" alt="Yousef Al Suwaidi" appearance="rounded" status="busy"></aegov-avatar>
      <span>Yousef Al Suwaidi — Tier 2 Support</span>
    </li>
    <li style="display:flex;gap:0.75rem;align-items:center;">
      <aegov-avatar appearance="rounded" status="away">MA</aegov-avatar>
      <span>Maryam Al Ali — Out today</span>
    </li>
  </ul>
</div>

---

## RTL Support

The avatar itself is square or circular and direction-neutral — it renders identically in `dir="ltr"` and `dir="rtl"`. The status indicator's position is fixed relative to the avatar circle, so it stays in the lower-right corner regardless of direction. Surrounding layout (such as a profile row) flips automatically when wrapped in `dir="rtl"`.

```html
<div dir="rtl">
  <div style="display:flex;gap:0.75rem;align-items:center;">
    <aegov-avatar
      src="https://i.pravatar.cc/150?img=32"
      alt="فاطمة الزعابي"
      size="lg"
      appearance="rounded"
      status="online"
    ></aegov-avatar>
    <div>
      <strong>فاطمة الزعابي</strong>
      <div style="color:#475569;font-size:0.875rem;">
        مديرة الخدمات الرقمية — هيئة تنظيم الاتصالات
      </div>
    </div>
  </div>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div style="display:flex;gap:0.75rem;align-items:center;">
    <aegov-avatar src="https://i.pravatar.cc/150?img=32" alt="فاطمة الزعابي" size="lg" appearance="rounded" status="online"></aegov-avatar>
    <div>
      <strong>فاطمة الزعابي</strong>
      <div style="color:#475569;font-size:0.875rem;">مديرة الخدمات الرقمية — هيئة تنظيم الاتصالات</div>
    </div>
  </div>
</div>

A list of team members in RTL — the avatars sit on the right and the names align to the right edge:

```html
<div dir="rtl">
  <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:0.75rem;">
    <li style="display:flex;gap:0.75rem;align-items:center;">
      <aegov-avatar src="https://i.pravatar.cc/150?img=12" alt="خالد المنصوري" appearance="rounded" status="online"></aegov-avatar>
      <span>خالد المنصوري — مدير الخدمات الرقمية</span>
    </li>
    <li style="display:flex;gap:0.75rem;align-items:center;">
      <aegov-avatar appearance="rounded" status="busy">يس</aegov-avatar>
      <span>يوسف السويدي — الدعم الفني</span>
    </li>
  </ul>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <ul style="list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:0.75rem;">
    <li style="display:flex;gap:0.75rem;align-items:center;">
      <aegov-avatar src="https://i.pravatar.cc/150?img=12" alt="خالد المنصوري" appearance="rounded" status="online"></aegov-avatar>
      <span>خالد المنصوري — مدير الخدمات الرقمية</span>
    </li>
    <li style="display:flex;gap:0.75rem;align-items:center;">
      <aegov-avatar appearance="rounded" status="busy">يس</aegov-avatar>
      <span>يوسف السويدي — الدعم الفني</span>
    </li>
  </ul>
</div>

---

## API Reference

### Properties

| Property      | Attribute    | Description                                                              | Type                                                                       | Default       |
| ------------- | ------------ | ------------------------------------------------------------------------ | -------------------------------------------------------------------------- | ------------- |
| `fieldId`     | `field-id`   | DOM `id` reflected onto the inner avatar `<div>`. Auto-generated if omitted. | `string`                                                                   | _generated_   |
| `size`        | `size`       | Avatar size, single token or responsive string.                          | `'xs' \| 'sm' \| 'base' \| 'lg' \| 'xl' \| '2xl' \| '3xl'` (or responsive) | `'base'`      |
| `appearance`  | `appearance` | Shape — `square` (rounded corners) or `rounded` (circle).                | `'square' \| 'rounded'`                                                    | `'square'`    |
| `src`         | `src`        | Image source URL.                                                        | `string`                                                                   | `undefined`   |
| `alt`         | `alt`        | Alternative text — used for the image and as host `aria-label`.          | `string`                                                                   | `undefined`   |
| `status`      | `status`     | Status indicator. `true` maps to `online`; `false` hides the dot.        | `'online' \| 'offline' \| 'away' \| 'unavailable' \| 'busy' \| boolean`    | `false`       |

### Slots

| Slot        | Description                                                                                  |
| ----------- | -------------------------------------------------------------------------------------------- |
| _(default)_ | Fallback content rendered when no `src` is set or the image fails to load (e.g. initials).   |

### Events

The avatar does not emit any custom events.

### Pass-through Attributes

`aria-*` and `data-*` attributes set on the host are forwarded automatically. In addition, the following native `<img>` attributes are forwarded to the inner image element when one is rendered:

| Attribute          | Description                                                              |
| ------------------ | ------------------------------------------------------------------------ |
| `loading`          | Native lazy-loading hint (`lazy`, `eager`).                              |
| `crossorigin`      | CORS settings for the image request.                                     |
| `referrerpolicy`   | Referrer policy for the image request.                                   |
| `srcset`           | Responsive image sources.                                                |
| `alt`              | Image alt text (also applied to the host `aria-label`).                   |
| `src`              | Image source URL.                                                        |
| `aria-*`, `data-*` | Forwarded to the inner `<img>` element.                                  |

---

## Accessibility

### Built-in behaviour

- The avatar root `<div>` carries `role="img"` and an `aria-label` built from the `alt` prop (or `"User avatar"` when `alt` is not supplied). This is the **only** label assistive technology reads for the avatar — child elements do not add additional announcements.
- The inner `<img>` element is given `alt=""` and `aria-hidden="true"`. It is intentionally presentation-only: the meaningful label lives on the `role="img"` container, not on the image itself.
- When a `status` value is present, the component **folds it into the container's `aria-label`** rather than labelling the indicator span separately. For example: `"Fatima Al Rashidi, status: online"` (English) or `"فاطمة الراشدي, الحالة: متصل"` (Arabic / RTL). Arabic status strings are translated built-in: `online → متصل`, `offline → غير متصل`, `away → بعيد`, `unavailable → غير متاح`, `busy → مشغول`.
- The status indicator `<span>` itself is `aria-hidden="true"` — it is a colour dot for sighted users; all meaning is already in the container label.
- The fallback SVG silhouette is `aria-hidden="true"`, so nothing extra is announced when no image or slot content is provided.
- When the image fails to load, `imageError` flips to `true` and the component silently falls back to the slot / silhouette path. Broken-image icons never appear.

### Developer responsibilities

- Always provide a meaningful `alt` when the avatar represents a real user — the component falls back to the generic `"User avatar"` string, which is rarely useful in context.
- Initials or custom slot content are visual only. Assistive technology reads the `aria-label` on the container, not the slot text. Ensure `alt` matches the user's name.
- The avatar itself is not focusable. If the avatar is interactive (e.g. opens a profile dropdown), wrap it in an `<a>` or `<button>` and provide a label there.
- Do **not** place a separate `aria-label` on `<aegov-avatar>` to describe status — the component's built-in label already includes it. Adding your own label would replace the computed one and drop the status wording.

### Notes

- `status="false"` (the default) renders no indicator at all — there is no "no status" dot.
- When grouped via `aegov-avatar-group`, the parent overrides each child's `appearance` to `rounded` and synchronises `size` across all children.
