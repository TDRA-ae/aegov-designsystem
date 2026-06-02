# Link

<p class="text-lg text-aeblack-500 mb-8">A styled inline anchor for navigation, in-content references, and external destinations. The component wraps a real <code>&lt;a&gt;</code> element so it remains keyboard-accessible and crawlable, while applying the design system's link colour and transition. It also adds automatic safe-rel handling for external targets and a custom click event for SPA-style routing.</p>

## Introduction

The `aegov-link` component renders a styled anchor with the system's link colour (`text-primary-600`) and a subtle colour transition. It accepts the standard anchor properties (`href`, `target`, `rel`, `download`, `hreflang`, etc.) and automatically applies `rel="noopener noreferrer"` when `target="_blank"` to prevent reverse-tabnabbing. For SPA routing, a custom `aegovLinkClick` event lets you intercept navigation and hand off to your client-side router.

```html
<aegov-text>
  Visit the official UAE Government portal at
  <aegov-link href="https://u.ae" target="_blank">u.ae</aegov-link>
  for the full directory of federal services.
</aegov-text>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-text>
    Visit the official UAE Government portal at <aegov-link href="https://u.ae" target="_blank">u.ae</aegov-link> for the full directory of federal services.
  </aegov-text>
</div>

---

## Internal Links

For in-application navigation, set `href` to the route or in-page anchor. The link inherits its size from the surrounding text, so you can drop it inside `aegov-text`, list items, or table cells without additional styling.

```html
<aegov-text>
  Already have an account?
  <aegov-link href="/sign-in">Sign in</aegov-link>
  to continue your application.
</aegov-text>

<aegov-text>
  See the
  <aegov-link href="#fees">fees and charges</aegov-link>
  section below for details.
</aegov-text>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-text>
    Already have an account? <aegov-link href="/sign-in">Sign in</aegov-link> to continue your application.
  </aegov-text>
  <aegov-text>
    See the <aegov-link href="#fees">fees and charges</aegov-link> section below for details.
  </aegov-text>
</div>

---

## External Links

Set `target="_blank"` to open the link in a new browser tab. When `target="_blank"` is set without an explicit `rel`, the component automatically adds `rel="noopener noreferrer"` to mitigate reverse-tabnabbing. You can override this by providing your own `rel` value.

```html
<aegov-link href="https://u.ae" target="_blank">
  UAE Government portal
</aegov-link>

<aegov-link href="https://government.ae" target="_blank" rel="nofollow">
  Federal services directory
</aegov-link>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-text>
    Open the
    <aegov-link href="https://u.ae" target="_blank">UAE Government portal</aegov-link>
    or the
    <aegov-link href="https://government.ae" target="_blank">federal services directory</aegov-link>
    in a new tab.
  </aegov-text>
</div>

---

## Download Links

Pass the standard `download` attribute to prompt the browser to save the resource instead of navigating to it. The attribute is forwarded through to the underlying `<a>` element.

```html
<aegov-link href="/files/service-charter.pdf" download="service-charter.pdf">
  Download service charter (PDF)
</aegov-link>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-text>
    <aegov-link href="/files/service-charter.pdf" download="service-charter.pdf">
      Download service charter (PDF)
    </aegov-link>
  </aegov-text>
</div>

---

## Custom Styling

Use `extra-class` to merge additional Tailwind utilities — for example, to make the link bolder, change its colour, or add an underline.

```html
<aegov-link href="/services" extra-class="font-semibold underline">
  Browse all services
</aegov-link>

<aegov-link href="/help" extra-class="text-aeblack-700 hover:text-primary-600">
  Help and support
</aegov-link>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-text>
    <aegov-link href="/services" extra-class="font-semibold underline">Browse all services</aegov-link>
    &nbsp;·&nbsp;
    <aegov-link href="/help" extra-class="text-aeblack-700 hover:text-primary-600">Help and support</aegov-link>
  </aegov-text>
</div>

---

## Intercepting Navigation

The `aegovLinkClick` event fires before navigation. Listen for it and call `preventDefault()` on `event.detail.event` to stop the browser navigation and hand control to your SPA router.

```html
<aegov-link href="/dashboard" id="dashboard-link">Open dashboard</aegov-link>

<script>
  document
    .getElementById('dashboard-link')
    .addEventListener('aegovLinkClick', (e) => {
      e.detail.event.preventDefault();
      // Hand off to the client-side router
      router.push(e.detail.href);
    });
</script>
```

The event detail also includes the original `MouseEvent`, so you can read modifier keys (Cmd / Ctrl-click for new tab) and decide whether to intercept or let the browser proceed.

---

## Combined Example

A typical service description block uses inline links for navigation and external references. The example below combines internal navigation, an external link, and a download.

```html
<aegov-title heading-type="h3" size="lg" extra-class="mb-2">
  Renew your residence visa
</aegov-title>
<aegov-text>
  Eligible residents can renew their visa through the
  <aegov-link href="/services/visa-renewal">online service</aegov-link>
  or by visiting an
  <aegov-link href="https://icp.gov.ae" target="_blank">authorised ICP centre</aegov-link>.
  Read the
  <aegov-link href="/files/visa-renewal-guide.pdf" download>full guide (PDF)</aegov-link>
  before you start.
</aegov-text>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-title heading-type="h3" size="lg" extra-class="mb-2">
    Renew your residence visa
  </aegov-title>
  <aegov-text>
    Eligible residents can renew their visa through the
    <aegov-link href="/services/visa-renewal">online service</aegov-link>
    or by visiting an
    <aegov-link href="https://icp.gov.ae" target="_blank">authorised ICP centre</aegov-link>.
    Read the
    <aegov-link href="/files/visa-renewal-guide.pdf" download>full guide (PDF)</aegov-link>
    before you start.
  </aegov-text>
</div>

---

## Button-Styled Links

For calls-to-action that must remain semantically anchors (so they participate in browser navigation, are middle-click openable, copy-link friendly, and announced as **links** by assistive technology), opt into button styling by passing any of the button-style props: `variant`, `appearance`, `size`, `is-icon`, `is-full`, `is-bold`, or `is-disabled`. Setting any of these switches the rendered `<a>` to use the shared button class util, so its look stays in lock-step with `aegov-button`.

Crucially, `aegov-link` does **not** support `is-loading` — loading states belong on real `<button>` elements that perform an action. Use `aegov-button` for those.

```html
<aegov-link href="/start" variant="primary" appearance="solid" size="base">
  Get started
</aegov-link>

<aegov-link href="/sign-in" variant="secondary" appearance="outline" size="base">
  Sign in
</aegov-link>

<aegov-link href="/learn-more" variant="primary" appearance="soft" size="base">
  Learn more
</aegov-link>

<aegov-link href="/docs" variant="neutral-min" appearance="link" size="base">
  Read the docs
</aegov-link>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov flex flex-wrap gap-3 items-center">
  <aegov-link href="/start" variant="primary" appearance="solid" size="base">Get started</aegov-link>
  <aegov-link href="/sign-in" variant="secondary" appearance="outline" size="base">Sign in</aegov-link>
  <aegov-link href="/learn-more" variant="primary" appearance="soft" size="base">Learn more</aegov-link>
  <aegov-link href="/docs" variant="neutral-min" appearance="link" size="base">Read the docs</aegov-link>
</div>

### Sizes

Size scale mirrors `aegov-button` exactly: `xs`, `sm`, `base`, `lg`, `xl`. Sizes also accept responsive tokens (e.g. `"sm md:base lg:lg"`).

```html
<aegov-link href="/a" variant="primary" appearance="solid" size="xs">Extra small</aegov-link>
<aegov-link href="/a" variant="primary" appearance="solid" size="sm">Small</aegov-link>
<aegov-link href="/a" variant="primary" appearance="solid" size="base">Base</aegov-link>
<aegov-link href="/a" variant="primary" appearance="solid" size="lg">Large</aegov-link>
<aegov-link href="/a" variant="primary" appearance="solid" size="xl">Extra large</aegov-link>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov flex flex-wrap gap-3 items-center">
  <aegov-link href="/a" variant="primary" appearance="solid" size="xs">Extra small</aegov-link>
  <aegov-link href="/a" variant="primary" appearance="solid" size="sm">Small</aegov-link>
  <aegov-link href="/a" variant="primary" appearance="solid" size="base">Base</aegov-link>
  <aegov-link href="/a" variant="primary" appearance="solid" size="lg">Large</aegov-link>
  <aegov-link href="/a" variant="primary" appearance="solid" size="xl">Extra large</aegov-link>
</div>

### Full-width link

Pair `is-full` with a block-level container to render a stretched call-to-action.

```html
<aegov-link href="/apply" variant="primary" appearance="solid" size="lg" is-full>
  Apply now
</aegov-link>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-link href="/apply" variant="primary" appearance="solid" size="lg" is-full>Apply now</aegov-link>
</div>

### Icon-only link

Provide an explicit `aria-label` so the link's destination is announced by assistive technology — the visual icon does not convey meaning to screen readers.

```html
<aegov-link
  href="/settings"
  variant="primary"
  appearance="outline"
  size="base"
  is-icon
  aria-label="Open settings"
>
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="3"></circle>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
  </svg>
</aegov-link>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov flex gap-3 items-center">
  <aegov-link href="/settings" variant="primary" appearance="outline" size="base" is-icon aria-label="Open settings">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3"></circle>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
    </svg>
  </aegov-link>
</div>

### Disabled link

Native `<a>` elements do not support `disabled`, so `aegov-link` polyfills the behaviour when `is-disabled` is set:

- The link is removed from the tab order (`tabindex="-1"`).
- `aria-disabled="true"` is announced by assistive technology.
- `href` and `target` are stripped from the rendered element so the browser will not navigate even if the user activates it programmatically.
- Click events are intercepted and `preventDefault()` is called — `aegovLinkClick` is not emitted.
- Pointer events are disabled and the cursor switches to `not-allowed` via the shared button styling.

```html
<aegov-link href="/wip" variant="primary" appearance="solid" size="base" is-disabled>
  Coming soon
</aegov-link>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov flex gap-3 items-center">
  <aegov-link href="/wip" variant="primary" appearance="solid" size="base" is-disabled>Coming soon</aegov-link>
</div>

---

## RTL Support

`aegov-link` is direction-agnostic. Because it renders inline content, the link simply flows in the direction set by the surrounding `dir` attribute. No properties need to change between LTR and RTL — wrap any ancestor with `dir="rtl"` and the link reads right-to-left automatically.

```html
<div dir="rtl">
  <aegov-text>
    تفضّل بزيارة
    <aegov-link href="https://u.ae" target="_blank">البوابة الرسمية لحكومة الإمارات</aegov-link>
    للاطلاع على الدليل الكامل للخدمات الاتحادية.
  </aegov-text>
  <aegov-text>
    لديك حساب بالفعل؟
    <aegov-link href="/sign-in">سجّل الدخول</aegov-link>
    لمتابعة طلبك.
  </aegov-text>
  <aegov-text>
    <aegov-link href="/files/service-charter.pdf" download="service-charter.pdf">
      تنزيل ميثاق الخدمة (PDF)
    </aegov-link>
  </aegov-text>
</div>
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-text>
    تفضّل بزيارة
    <aegov-link href="https://u.ae" target="_blank">البوابة الرسمية لحكومة الإمارات</aegov-link>
    للاطلاع على الدليل الكامل للخدمات الاتحادية.
  </aegov-text>
  <aegov-text>
    لديك حساب بالفعل؟
    <aegov-link href="/sign-in">سجّل الدخول</aegov-link>
    لمتابعة طلبك.
  </aegov-text>
  <aegov-text>
    <aegov-link href="/files/service-charter.pdf" download="service-charter.pdf">
      تنزيل ميثاق الخدمة (PDF)
    </aegov-link>
  </aegov-text>
</div>

---

## API Reference

### Properties

| Property     | Attribute     | Description                                                                                                                  | Type                                                          | Default     |
| ------------ | ------------- | ---------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------- | ----------- |
| `href`       | `href`        | The URL the link points to. **Required.** Stripped from the rendered `<a>` when `isDisabled` is true.                        | `string`                                                      | —           |
| `target`     | `target`      | Anchor `target` attribute. Stripped from the rendered `<a>` when `isDisabled` is true.                                       | `'_blank' \| '_self' \| '_parent' \| '_top'`                  | `undefined` |
| `rel`        | `rel`         | Anchor `rel` attribute. Auto-set to `'noopener noreferrer'` when `target="_blank"` and not explicitly provided.              | `string`                                                      | `undefined` |
| `fieldId`    | `field-id`    | DOM `id` for the inner anchor element. Auto-generated if omitted.                                                            | `string`                                                      | _generated_ |
| `extraClass` | `extra-class` | Additional Tailwind / CSS classes merged onto the rendered `<a>`.                                                            | `string`                                                      | `undefined` |
| `variant`    | `variant`     | Button-style colour variant. Setting this opts into button-style classes.                                                    | `'primary' \| 'secondary' \| 'danger' \| 'neutral-min' \| 'neutral-max'` | `undefined` |
| `appearance` | `appearance`  | Button-style visual appearance. Setting this opts into button-style classes.                                                 | `'solid' \| 'outline' \| 'soft' \| 'link'`                    | `undefined` |
| `size`       | `size`        | Button-style size token. Accepts responsive expressions (e.g. `"sm md:base lg:lg"`). Setting this opts into button styling.  | `'xs' \| 'sm' \| 'base' \| 'lg' \| 'xl'` (or responsive)      | `undefined` |
| `isIcon`     | `is-icon`     | Render as a square icon-only link. Provide an `aria-label` for accessibility.                                                | `boolean`                                                     | `false`     |
| `isFull`     | `is-full`     | Stretch the link to fill its container width.                                                                                | `boolean`                                                     | `false`     |
| `isBold`     | `is-bold`     | Apply bold (semibold) font weight to button-styled links.                                                                    | `boolean`                                                     | `false`     |
| `isDisabled` | `is-disabled` | Polyfill of native `disabled` for anchors. Removes the link from the tab order, sets `aria-disabled="true"`, strips `href` / `target`, and blocks click navigation. | `boolean`                                                     | `false`     |

### Slots

| Slot        | Description                                |
| ----------- | ------------------------------------------ |
| _(default)_ | The link text content rendered inside `<a>`. |

### Events

| Event             | Detail                                  | Description                                                                                                                            |
| ----------------- | --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| `aegovLinkClick`  | `{ href: string; event: MouseEvent }`   | Fired when the link is clicked. Call `event.detail.event.preventDefault()` (or `event.preventDefault()` on the custom event) to stop default navigation. |

#### Listening for click events

```html
<aegov-link href="/page" id="my-link">Open page</aegov-link>

<script>
  document.getElementById('my-link').addEventListener('aegovLinkClick', (e) => {
    console.log('Navigating to', e.detail.href);
  });
</script>
```

### Pass-through Attributes

In addition to `aria-*` and `data-*`, the following standard anchor attributes are forwarded from the host to the inner `<a>` element:

| Attribute          | Forwarded? | Where it lands       |
| ------------------ | ---------- | -------------------- |
| `title`            | Yes        | Inner `<a>` element. |
| `referrerpolicy`   | Yes        | Inner `<a>` element. |
| `hreflang`         | Yes        | Inner `<a>` element. |
| `rel`              | Yes        | Inner `<a>` element. |
| `target`           | Yes        | Inner `<a>` element. |
| `download`         | Yes        | Inner `<a>` element. |
| `type`             | Yes        | Inner `<a>` element. |
| `aria-*`, `data-*` | Yes        | Inner `<a>` element. |
| `class`, `style`   | Allowed    | Host element.        |

---

## Accessibility

### Built-in behaviour

- Renders a real `<a>` element so it is keyboard-focusable, recognised by assistive technology as a link, and discoverable to search engines.
- Automatically applies `rel="noopener noreferrer"` when `target="_blank"` (and no explicit `rel` is provided) to prevent reverse-tabnabbing.
- Pass-through attributes allow `aria-label`, `aria-describedby`, `title`, `hreflang`, and `referrerpolicy` to be forwarded without wrapping markup.

### Developer responsibilities

- Provide descriptive link text. Avoid generic text like "click here" or "read more" — the slot content should describe the destination.
- For icon-only links, provide an `aria-label` so screen readers announce the destination.
- Use `target="_blank"` sparingly — opening new tabs unexpectedly is disorienting for many users. When you do, consider warning the user in the link text (for example, "(opens in a new tab)").
- Maintain sufficient colour contrast (at least 4.5 : 1 against the background) when overriding colour via `extra-class`.

### Keyboard support

| Key             | Action                                          |
| --------------- | ----------------------------------------------- |
| `Tab`           | Move focus to the link.                         |
| `Shift + Tab`   | Move focus away from the link.                  |
| `Enter`         | Activate the link (navigate or fire the event). |

### Notes

- The `aegovLinkClick` event fires before navigation. To intercept SPA navigation, call `preventDefault()` on `event.detail.event` from your handler.
- The component does not underline links by default. If your site or context requires underlines for link affordance (often the case for inline links inside body copy), apply them via `extra-class="underline"` or via a global CSS rule.
