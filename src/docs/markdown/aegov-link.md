# Link

<p class="text-lg text-aeblack-500 mb-8">A link is an interactive text element that navigates the user to another page, resource, or section. The <code>aegov-link</code> component wraps a native anchor with consistent styling, automatic security defaults for external links, and custom event handling for framework integration.</p>

## Introduction

Links are fundamental navigation elements in any web interface. The `aegov-link` component renders a semantic `<a>` element internally, providing consistent styling across the design system while supporting custom click handling, pass-through attributes, and automatic security measures for external links.

The component forwards `aria-*`, `data-*`, `title`, and `id` attributes to the inner anchor, making it fully compatible with accessibility tools and analytics libraries.

```html
<aegov-link href="https://example.com">Visit Example</aegov-link>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-link href="https://example.com">Visit Example</aegov-link>
</div>

---

## Basic Usage

Provide a `href` property to set the link destination. The link renders with the design system's primary colour and smooth hover transitions.

```html
<aegov-link href="/about">About Us</aegov-link>
<aegov-link href="/contact">Contact</aegov-link>
<aegov-link href="#section-top">Back to Top</aegov-link>
```

<div class="flex flex-wrap gap-6 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-link href="/about">About Us</aegov-link>
  <aegov-link href="/contact">Contact</aegov-link>
  <aegov-link href="#section-top">Back to Top</aegov-link>
</div>

---

## External Links with Target

Use the `target` property to control where the linked document opens. The most common value is `_blank` to open in a new tab.

```html
<aegov-link href="https://example.com" target="_blank">
  Open in New Tab
</aegov-link>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-link href="https://example.com" target="_blank">Open in New Tab</aegov-link>
</div>

| Target     | Behaviour                                    |
|------------|----------------------------------------------|
| `_self`    | Opens in the same frame (default behaviour). |
| `_blank`   | Opens in a new tab or window.                |
| `_parent`  | Opens in the parent frame.                   |
| `_top`     | Opens in the full body of the window.        |

---

## Automatic Security for External Links

When `target="_blank"` is set and no custom `rel` is provided, the component automatically adds `rel="noopener noreferrer"` to prevent [reverse tabnabbing](https://owasp.org/www-community/attacks/Reverse_Tabnabbing) attacks. This is a security best practice for links that open new windows.

```html
<!-- rel="noopener noreferrer" is added automatically -->
<aegov-link href="https://external-site.com" target="_blank">
  External Link (secure by default)
</aegov-link>

<!-- You can override with a custom rel value -->
<aegov-link href="https://partner-site.com" target="_blank" rel="noopener">
  Partner Link (custom rel)
</aegov-link>
```

<div class="flex flex-wrap gap-6 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-link href="https://external-site.com" target="_blank">External Link (secure by default)</aegov-link>
  <aegov-link href="https://partner-site.com" target="_blank" rel="noopener">Partner Link (custom rel)</aegov-link>
</div>

---

## Custom Classes

Use the `class` property to add additional CSS classes to the inner anchor element. Custom classes are merged with the component's default styling classes.

```html
<aegov-link href="/bold" class="font-bold">Bold Link</aegov-link>
<aegov-link href="/large" class="text-lg">Larger Link</aegov-link>
<aegov-link href="/custom" class="text-aered-600">Red Link</aegov-link>
```

<div class="flex flex-wrap gap-6 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-link href="/bold" class="font-bold">Bold Link</aegov-link>
  <aegov-link href="/large" class="text-lg">Larger Link</aegov-link>
  <aegov-link href="/custom" class="text-aered-600">Red Link</aegov-link>
</div>

---

## Pass-Through Attributes

The component automatically forwards several categories of attributes from the host element to the inner `<a>` element.

### Data Attributes

All `data-*` attributes are passed through, making the component compatible with analytics libraries and custom JavaScript that relies on data attributes.

```html
<aegov-link href="/products" data-analytics="nav-products" data-section="header">
  Products
</aegov-link>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-link href="/products" data-analytics="nav-products" data-section="header">Products</aegov-link>
</div>

### ARIA Attributes

All `aria-*` attributes are forwarded for full accessibility support.

```html
<aegov-link href="/help" aria-label="Get help and support" aria-describedby="help-desc">
  Help
</aegov-link>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-link href="/help" aria-label="Get help and support">Help</aegov-link>
</div>

### Title Attribute

The `title` attribute is forwarded to the inner anchor, providing a native browser tooltip on hover.

```html
<aegov-link href="/terms" title="Read our full terms and conditions">
  Terms of Service
</aegov-link>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-link href="/terms" title="Read our full terms and conditions">Terms of Service</aegov-link>
</div>

### ID Attribute

The `id` attribute is also forwarded, allowing direct targeting of the inner anchor for JavaScript or CSS.

```html
<aegov-link href="/dashboard" id="dashboard-link">Dashboard</aegov-link>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-link href="/dashboard" id="dashboard-link">Dashboard</aegov-link>
</div>

---

## Link with HTML Content

The default slot accepts any HTML content, including icons and formatted text.

```html
<aegov-link href="/download">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
       stroke="currentColor" stroke-width="2" stroke-linecap="round"
       stroke-linejoin="round" width="16" height="16" style="display:inline; vertical-align:middle; margin-right:4px;">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
  Download File
</aegov-link>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-link href="/download">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="16" height="16" style="display:inline; vertical-align:middle; margin-right:4px;">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
      <polyline points="7 10 12 15 17 10"/>
      <line x1="12" y1="15" x2="12" y2="3"/>
    </svg>
    Download File
  </aegov-link>
</div>

---

## Custom Click Events

The `aegovLinkClick` event is emitted on every click. You can call `event.preventDefault()` on the custom event to stop the default navigation and implement your own routing logic — useful in SPA frameworks.

```html
<aegov-link href="/dashboard" id="custom-nav">Go to Dashboard</aegov-link>

<script>
  document.getElementById('custom-nav')
    .addEventListener('aegovLinkClick', (e) => {
      e.preventDefault();
      console.log('Custom navigation to:', e.detail.href);
      // Implement SPA routing here
    });
</script>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-link href="/dashboard" id="custom-nav-demo">Go to Dashboard (check console)</aegov-link>
</div>

<script>
  document.addEventListener('DOMContentLoaded', function() {
    var el = document.getElementById('custom-nav-demo');
    if (el) {
      el.addEventListener('aegovLinkClick', function(e) {
        e.preventDefault();
        console.log('Custom navigation to:', e.detail.href);
      });
    }
  });
</script>

If no listener calls `preventDefault()`, the link navigates normally as a standard anchor element.

---

## API Reference

### Properties

| Property | Attribute | Description                                                  | Type                                              | Default     |
|----------|-----------|--------------------------------------------------------------|---------------------------------------------------|-------------|
| `href`   | `href`    | The URL that the link points to (**required**)               | `string`                                          | —           |
| `target` | `target`  | Where to open the linked document                            | `'_blank'` \| `'_self'` \| `'_parent'` \| `'_top'` | `undefined` |
| `rel`    | `rel`     | The relationship between the current and linked document     | `string`                                          | `undefined` |
| `class`  | `class`   | Additional CSS classes to apply to the inner anchor          | `string`                                          | `undefined` |

### Events

| Event            | Description                                  | Detail Type                              |
|------------------|----------------------------------------------|------------------------------------------|
| `aegovLinkClick` | Emitted when the link is clicked             | `{ href: string; event: MouseEvent }`    |

Call `event.preventDefault()` on the custom event to stop default navigation and handle routing yourself.

#### Listening to Events

```html
<aegov-link href="/page" id="my-link">My Link</aegov-link>

<script>
  document.getElementById('my-link')
    .addEventListener('aegovLinkClick', (e) => {
      console.log('Navigating to:', e.detail.href);
      // Call e.preventDefault() to stop navigation
    });
</script>
```

### Slots

| Slot      | Description                                                        |
|-----------|--------------------------------------------------------------------|
| (default) | The link content — text, icons, or a combination of both.         |

### Pass-Through Attributes

The component forwards the following attributes from the host element to the inner `<a>` element. No extra configuration is needed — simply place them on the host.

| Attribute Pattern | Description                                      |
|-------------------|--------------------------------------------------|
| `aria-*`          | All ARIA attributes for accessibility            |
| `data-*`          | All data attributes for analytics and scripting  |
| `title`           | Native browser tooltip text                      |
| `id`              | Element identifier                               |

```html
<aegov-link href="/page"
  aria-label="Read more about this topic"
  data-tracking="footer-link"
  title="Opens the details page"
  id="details-link">
  Read More
</aegov-link>
```

---

## Accessibility

The `aegov-link` component is built with accessibility as a first-class concern. The following features are included out of the box.

### Built-in Features

- **Native `<a>` element** — renders a semantic HTML anchor inside the component, which is keyboard-focusable and announced correctly by screen readers by default.
- **Pass-through `aria-*` attributes** — any `aria-*` attribute placed on the host element is automatically forwarded to the inner anchor.
- **Focus indicators** — clearly visible focus styles are applied on keyboard navigation. The link receives a background highlight and thicker underline on focus.
- **Security defaults** — automatic `rel="noopener noreferrer"` for `target="_blank"` links prevents security vulnerabilities without developer effort.
- **Semantic `title` forwarding** — the `title` attribute provides additional context for sighted users via tooltip and is announced by some assistive technologies.

### Developer Responsibilities

The following items require action from the developer implementing the component:

1. **Provide meaningful link text.** Avoid generic text like "Click here" or "Read more" without context. Screen reader users often navigate by link list, so each link should make sense out of context.

   ```html
   <!-- Avoid -->
   <aegov-link href="/report">Click here</aegov-link>

   <!-- Preferred -->
   <aegov-link href="/report">Download the annual report</aegov-link>
   ```

2. **Use `aria-label` when the visible text is insufficient.** If the link text is short or ambiguous, add an `aria-label` to provide a fuller description for assistive technologies.

   ```html
   <aegov-link href="/report" aria-label="Download the 2025 annual report">
     Annual Report
   </aegov-link>
   ```

3. **Indicate external links visually.** When using `target="_blank"`, consider adding a visual indicator (such as an icon) to inform sighted users that the link opens in a new tab.

4. **Colour contrast.** The default link colour (`primary-600`) meets WCAG 2.1 AA contrast ratios against white backgrounds. If you override colours using the `class` property, verify that the new colours maintain at least a **4.5:1** contrast ratio.

---

## Notes

- The `aegov-link` component renders a native `<a>` element internally. Do **not** wrap it inside another `<a>` — this creates invalid HTML and breaks accessibility.
- The `href` property is **required**. If you need a clickable element that does not navigate, use `aegov-button` with `variant="link"` instead.
- When `target="_blank"` is set and no `rel` is explicitly provided, the component automatically applies `rel="noopener noreferrer"` for security. You can override this by setting your own `rel` value.
- The component uses `display: inline` on the host element, so it flows naturally within text content.
- Custom classes provided via the `class` property are merged with the component's default classes (`no-underline`, `text-primary-600`, `transition-colors`, `duration-200`, `ease-in-out`). Your classes can override these defaults if needed.
- The `aegovLinkClick` event is emitted before the default navigation occurs. If you call `event.preventDefault()`, the browser will not navigate. If no listener prevents the event, the link behaves as a standard anchor.
