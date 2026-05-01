# AEGOV Design System — Component Property & Pass-through Reference

Stencil converts camelCase TypeScript props to kebab-case HTML attributes automatically (e.g. `isMultiple` → `is-multiple`, `fieldId` → `field-id`).

Each component section below has **two tables**:

1. **Properties** — every `@Prop()` declared on the component, with type, allowed values, default, and purpose.
2. **Pass-through attributes** — what additional HTML attributes the component forwards from the host element to the appropriate inner element via `getPassThroughAttributes()`.

## How pass-through works

The shared utility [`src/utils/attributes.ts`](src/utils/attributes.ts) exports `getPassThroughAttributes(el, additionalAttrs?)`. It collects host attributes by an allow-list:

| Always forwarded | Optionally forwarded |
|---|---|
| `aria-*` (any aria attribute) | Names in the `additionalAttrs` Set passed by each component |
| `data-*` (any data attribute) | |

Each component declares its `additionalAttrs` as a static `PASS_THROUGH_ATTRS` Set (or passes nothing for `aria-*`/`data-*`-only). In the per-component pass-through tables below:

- `aria-*`, `data-*` rows are always present (or marked "none — no pass-through" if the component doesn't call the utility at all).
- Any extra attribute names listed are the contents of that component's `PASS_THROUGH_ATTRS` Set.
- A "Blocked" row appears for components that explicitly delete an attribute from the result before spreading (only `aegov-banner` does this today, for `role`).

## Conventions used in this design system

- **`fieldId`** (`mutable: true, reflect: true`): present on most components. Auto-generated as `aegov-{tag}-{n}` if the user does not pass one. Reflected to the host's `field-id` HTML attribute and applied as `id` on the appropriate inner element. The `id` attribute is **not** a pass-through attribute — use `field-id` instead.
- **`extraClass`** (`extra-class`): on a curated set of components, allows the user to merge extra CSS classes into the inner element. Components without it have intentionally locked styling.
- **Boolean state props** use the `isX` prefix: `isOpen`, `isDisabled`, `isDismissible`, `isPadding`, `isMultiple`, `isBordered`, `isLoading`, `isMicrodata`, `isOverlay`, `isPinned`, `isFull`, `isBold`, `isIcon`, `isCloseWithOverlay`, `isPreventScroll`, `isFocusable`, `isEnabledFirstLast`, `isScrollable`, `isStretchable`, `isDecorative`, `isConnectorSolid`, `isProgressEnabled`, `isActive`.
- **`variant` / `appearance`** pair: semantic vs. visual. The split varies by component — see each entry.
- **Delay props** use `delayStart` / `delayEnd` (`delay-start` / `delay-end`) on overlay-style components.
- **Reserved-name workarounds**: `fieldId` (not `id`), `htmlFor`→`for` (label only), `addonPrefix`/`addonSuffix` (not `prefix`/`suffix`), `authorTitle` (not `title`), `extraClass` (not `class`).
- **Internal "set by parent"** props: child components that take their state from a parent (accordion-item, breadcrumbs-item, tab, tab-panel, timeline-step, button inside button-group). Users typically don't set them directly.
- **Mutable** props (`@Prop({ mutable: true })`) can be re-assigned by the component or its parent.
- **Reflect** props mirror their value back to the HTML attribute when changed.
- **Responsive sizes** accept space-delimited breakpoint syntax: `"sm md:base lg:lg"`.

---

## UI Components

### aegov-accordion

**Properties**

| Prop | HTML attr | Type | Allowed values | Default | Purpose |
|---|---|---|---|---|---|
| `fieldId` | `field-id` | string (mutable, reflect) | — | auto | ID for the accordion wrapper |
| `isMultiple` | `is-multiple` | boolean | — | `false` | Allow multiple items open simultaneously |
| `defaultOpen` | `default-open` | number? | — | `undefined` | Index of item open by default (0-based) |
| `icon` | `icon` | string (fixed) | `'chevron'`, `'plus'` | `'chevron'` | Icon style for items |
| `isBordered` | `is-bordered` | boolean | — | `false` | Show border around the accordion |
| `size` | `size` | string (responsive) | `'sm'`, `'base'`, `'lg'` | `'base'` | Heading font size |

**Pass-through attributes**

| Pattern / name | Source | Forwarded? |
|---|---|---|
| _none_ | — | This component does not call `getPassThroughAttributes()`. Host `aria-*`/`data-*` attributes stay on the host element only. |

---

### aegov-accordion-item

**Properties**

| Prop | HTML attr | Type | Allowed values | Default | Purpose |
|---|---|---|---|---|---|
| `heading` | `heading` | string? | — | `undefined` | Heading text (alt to slot) |
| `isOpen` | `is-open` | boolean (mutable) | — | `false` | Open state |
| `isDisabled` | `is-disabled` | boolean | — | `false` | Disabled state |
| `icon` | `icon` | string (set by parent) | `'chevron'`, `'plus'` | `'chevron'` | Inherited icon style |
| `isFirst` | `is-first` | boolean (set by parent) | — | `false` | Internal: first flag |
| `isLast` | `is-last` | boolean (set by parent) | — | `false` | Internal: last flag |
| `size` | `size` | string (set by parent) | `'sm'`, `'base'`, `'lg'` | `'base'` | Inherited size |

**Pass-through attributes**

| Pattern / name | Source | Forwarded? |
|---|---|---|
| _none_ | — | No pass-through. |

---

### aegov-aspect-ratio

**Properties**

| Prop | HTML attr | Type | Allowed values | Default | Purpose |
|---|---|---|---|---|---|
| `ratio` | `ratio` | string | `'auto'`, `'square'`, `'video'`, `'4/3'`, `'3/2'`, `'21/9'` or custom (e.g. `'5/4'`) | `'auto'` | Aspect ratio preset / custom |
| `fit` | `fit` | string (fixed) | `'cover'`, `'contain'` | `'cover'` | How slotted media fits |
| `extraClass` | `extra-class` | string? | — | `undefined` | Extra CSS classes merged onto inner container |

**Pass-through attributes**

| Pattern / name | Source | Forwarded? |
|---|---|---|
| _none_ | — | No pass-through. |

---

### aegov-avatar

**Properties**

| Prop | HTML attr | Type | Allowed values | Default | Purpose |
|---|---|---|---|---|---|
| `size` | `size` | string (responsive) | `'xs'`, `'sm'`, `'base'`, `'lg'`, `'xl'`, `'2xl'`, `'3xl'` | `'base'` | Avatar size |
| `appearance` | `appearance` | string (fixed) | `'square'`, `'rounded'` | `'square'` | Shape |
| `src` | `src` | string? | — | `undefined` | Image URL |
| `alt` | `alt` | string? | — | `undefined` | Image alt text |
| `status` | `status` | string \| boolean | `'online'`, `'offline'`, `'away'`, `'unavailable'`, `'busy'` | `'none'` | Status indicator |

**Pass-through attributes**

| Pattern / name | Source | Forwarded? |
|---|---|---|
| _none_ | — | No pass-through. |

---

### aegov-avatar-group

**Properties**

| Prop | HTML attr | Type | Allowed values | Default | Purpose |
|---|---|---|---|---|---|
| `variant` | `variant` | string (fixed) | `'default'`, `'compact'` | `'default'` | Spaced or overlapping |
| `size` | `size` | string (responsive) | `'xs'`–`'3xl'` | `'base'` | Size enforced on children |
| `moreCount` | `more-count` | number | — | `0` | Additional users count |
| `moreText` | `more-text` | string? | — | `undefined` | Custom "+N" text |

**Pass-through attributes**

| Pattern / name | Source | Forwarded? |
|---|---|---|
| _none_ | — | No pass-through. |

---

### aegov-badge

**Properties**

| Prop | HTML attr | Type | Allowed values | Default | Purpose |
|---|---|---|---|---|---|
| `fieldId` | `field-id` | string (mutable, reflect) | — | auto | ID for the badge element |
| `appearance` | `appearance` | string (fixed) | `'soft'`, `'solid'` | `'soft'` | Visual style |
| `color` | `color` | string (fixed) | `'default'`, `'primary'`, `'secondary'`, `'aegold'`, `'aered'`, `'aegreen'`, `'aeblack'`, `'techblue'`, `'seablue'`, `'camel'`, `'desert'`, `'fuchsia'`, `'slate'`, `'purple'`, `'pink'`, `'indigo'`, `'lime'` | `'default'` | Color variant |
| `isDismissible` | `is-dismissible` | boolean | — | `false` | Show dismiss button |
| `size` | `size` | string (responsive) | `'sm'`, `'base'`, `'lg'` | `'base'` | Badge size |

**Pass-through attributes**

| Pattern / name | Source | Forwarded? |
|---|---|---|
| _none_ | — | No pass-through. |

---

### aegov-banner

**Properties**

| Prop | HTML attr | Type | Allowed values | Default | Purpose |
|---|---|---|---|---|---|
| `fieldId` | `field-id` | string (mutable, reflect) | — | auto | ID for the banner; heading reference uses `${fieldId}-heading` |
| `variant` | `variant` | string (fixed) | `'default'`, `'error'`, `'success'`, `'warning'`, `'info'` | `'default'` | Color scheme |
| `appearance` | `appearance` | string (fixed) | `'soft'`, `'solid'` | `'soft'` | Visual style |
| `position` | `position` | string (fixed) | `'top'`, `'bottom'` | `'top'` | Viewport position |
| `display` | `display` | string (fixed) | `'fixed'`, `'sticky'` | `'fixed'` | CSS positioning |
| `mode` | `mode` | string (fixed) | `'push'`, `'overlay'` | `'push'` | Layout mode |
| `isDismissible` | `is-dismissible` | boolean | — | `true` | Dismiss button |
| `heading` | `heading` | string? | — | `undefined` | Heading text used by `aria-labelledby` |
| `size` | `size` | string (responsive) | `'sm'`, `'base'`, `'lg'` | `'base'` | Font size + padding |
| `isFocusable` | `is-focusable` | boolean | — | `false` | Auto-focus on mount |

**Pass-through attributes**

| Pattern / name | Source | Forwarded? |
|---|---|---|
| `aria-*` | utility default | Yes |
| `data-*` | utility default | Yes |
| `role` | host attribute (read by `getRole()` first) | The host's `role` overrides the component's auto-derived role. After collection, the spread copy of `role` is **deleted** so the explicit `role={...}` on the inner element wins. |

---

### aegov-blockquote

**Properties**

| Prop | HTML attr | Type | Allowed values | Default | Purpose |
|---|---|---|---|---|---|
| `appearance` | `appearance` | string (fixed) | `'primary'`, `'colored'`, `'coloured'` | `'primary'` | Visual variant |
| `cite` | `cite` | string? | — | `undefined` | Citation source |
| `author` | `author` | string? | — | `undefined` | Author name |
| `authorTitle` | `author-title` | string? | — | `undefined` | Author's title |
| `extraClass` | `extra-class` | string? | — | `undefined` | Extra CSS classes merged onto inner blockquote |

**Pass-through attributes**

| Pattern / name | Source | Forwarded? |
|---|---|---|
| _none_ | — | No pass-through. |

---

### aegov-breadcrumbs

**Properties**

| Prop | HTML attr | Type | Allowed values | Default | Purpose |
|---|---|---|---|---|---|
| `fieldId` | `field-id` | string (mutable, reflect) | — | auto | ID for the breadcrumbs `<nav>` |
| `separator` | `separator` | string (fixed) | `'slash'`, `'chevron'` | `'slash'` | Item separator |
| `maxLength` | `max-length` | number? | — | `undefined` | Truncate item text length |
| `isMicrodata` | `is-microdata` | boolean | — | `false` | Add schema.org markup |

**Pass-through attributes**

| Pattern / name | Source | Forwarded? |
|---|---|---|
| `aria-*` | utility default | Yes |
| `data-*` | utility default | Yes |

---

### aegov-breadcrumbs-item

**Properties**

| Prop | HTML attr | Type | Allowed values | Default | Purpose |
|---|---|---|---|---|---|
| `href` | `href` | string? | — | `undefined` | Link URL |
| `target` | `target` | string (fixed) | `'_self'`, `'_blank'`, `'_parent'`, `'_top'` | `'_self'` | Link target |
| `isLast` | `is-last` | boolean (set by parent) | — | `false` | Internal flag |
| `maxLength` | `max-length` | number? (set by parent) | — | `undefined` | Internal |
| `separator` | `separator` | string (set by parent) | `'slash'`, `'chevron'` | `'slash'` | Internal |
| `isMicrodata` | `is-microdata` | boolean (set by parent) | — | `false` | Internal |
| `position` | `position` | number (set by parent) | — | `1` | Internal: 1-indexed |

**Pass-through attributes**

| Pattern / name | Source | Forwarded? |
|---|---|---|
| `aria-*` | utility default | Yes |
| `data-*` | utility default | Yes |
| `id` | `PASS_THROUGH_ATTRS` set | Yes (pre-existing exception, not yet migrated to `fieldId`) |

---

### aegov-button

**Properties**

| Prop | HTML attr | Type | Allowed values | Default | Purpose |
|---|---|---|---|---|---|
| `fieldId` | `field-id` | string (mutable, reflect) | — | auto | ID applied to the inner `<button>` |
| `variant` | `variant` | string (fixed) | `'primary'`, `'secondary'`, `'danger'`, `'neutralMin'`, `'neutralMax'` | `'primary'` | Color scheme |
| `size` | `size` | string (responsive) | `'xs'`, `'sm'`, `'base'`, `'lg'`, `'xl'` | `'base'` | Button size |
| `type` | `type` | string (fixed) | `'button'`, `'submit'`, `'reset'` | `'button'` | Native type |
| `appearance` | `appearance` | string (fixed) | `'solid'`, `'outline'`, `'soft'`, `'link'` | `'solid'` | Visual style |
| `isDisabled` | `is-disabled` | boolean | — | `false` | Disabled state |
| `isIcon` | `is-icon` | boolean | — | `false` | Icon-only button |
| `isFull` | `is-full` | boolean | — | `false` | Full width |
| `isBold` | `is-bold` | boolean | — | `true` | Bold text |
| `isLoading` | `is-loading` | boolean | — | `false` | Loading state |
| `groupPosition` | `group-position` | string (set by parent) | `'first'`, `'middle'`, `'last'`, `'single'` | `undefined` | Internal |
| `groupOrientation` | `group-orientation` | string (set by parent) | `'horizontal'`, `'vertical'` | `undefined` | Internal |

**Pass-through attributes**

| Pattern / name | Source | Forwarded? |
|---|---|---|
| `aria-*` | utility default | Yes |
| `data-*` | utility default | Yes |

---

### aegov-button-group

**Properties**

| Prop | HTML attr | Type | Allowed values | Default | Purpose |
|---|---|---|---|---|---|
| `orientation` | `orientation` | string (fixed) | `'horizontal'`, `'vertical'` | `'horizontal'` | Layout direction |

**Pass-through attributes**

| Pattern / name | Source | Forwarded? |
|---|---|---|
| _none_ | — | No pass-through. |

---

### aegov-callout

**Properties**

| Prop | HTML attr | Type | Allowed values | Default | Purpose |
|---|---|---|---|---|---|
| `fieldId` | `field-id` | string (mutable, reflect) | — | auto | ID applied to the alert `<div>` |
| `variant` | `variant` | string (fixed) | `'default'`, `'error'`, `'success'`, `'warning'`, `'info'` | `'default'` | Color scheme |
| `appearance` | `appearance` | string (fixed) | `'soft'`, `'solid'` | `'soft'` | Visual style |
| `size` | `size` | string (responsive) | `'sm'`, `'base'`, `'lg'` | `'base'` | Font + padding |
| `isDismissible` | `is-dismissible` | boolean | — | `false` | Dismiss button |

**Pass-through attributes**

| Pattern / name | Source | Forwarded? |
|---|---|---|
| `aria-*` | utility default | Yes |
| `data-*` | utility default | Yes |

(`PASS_THROUGH_ATTRS` is `new Set<string>()` — explicitly empty; defaults only.)

---

### aegov-card

**Properties**

| Prop | HTML attr | Type | Allowed values | Default | Purpose |
|---|---|---|---|---|---|
| `fieldId` | `field-id` | string (mutable, reflect) | — | auto | ID for the card wrapper |
| `isPadding` | `is-padding` | boolean | — | `true` | Apply inner padding |
| `borderWidth` | `border-width` | number (fixed) | `1`, `2`, `3` | `2` | Border thickness |
| `borderStyle` | `border-style` | string (fixed) | `'standard'`, `'light'`, `'creative'`, `'highlight'` | `'standard'` | Border style |
| `bg` | `bg` | string (fixed) | `'white'`, `'subtle'` | `'white'` | Background |
| `hover` | `hover` | string (fixed) | `'off'`, `'standard'`, `'glow'` | `'off'` | Hover effect |
| `size` | `size` | string (fixed) | `'sm'`, `'base'`, `'lg'` | `'base'` | Card size |

**Pass-through attributes**

| Pattern / name | Source | Forwarded? |
|---|---|---|
| _none_ | — | No pass-through. |

---

### aegov-drawer

**Properties**

| Prop | HTML attr | Type | Allowed values | Default | Purpose |
|---|---|---|---|---|---|
| `fieldId` | `field-id` | string (mutable, reflect) | — | auto | ID for the drawer dialog (in shadow DOM) |
| `isOpen` | `is-open` | boolean (mutable, reflect) | — | `false` | Open state |
| `position` | `position` | string (fixed) | `'right'`, `'left'`, `'top'`, `'bottom'` | `'right'` | Edge to slide from |
| `animation` | `animation` | string (fixed) | `'slide'`, `'fade'`, `'none'` | `'slide'` | Transition |
| `isPinned` | `is-pinned` | boolean | — | `true` | Flush vs gap with rounded corners |
| `isOverlay` | `is-overlay` | boolean | — | `true` | Show overlay |
| `overlayOpacity` | `overlay-opacity` | string (fixed) | `'light'`, `'base'`, `'dark'` | `'base'` | Overlay opacity |
| `isCloseWithOverlay` | `is-close-with-overlay` | boolean | — | `true` | Click overlay to close |
| `isPreventScroll` | `is-prevent-scroll` | boolean | — | `true` | Lock body scroll |
| `size` | `size` | string (fixed) | `'sm'`, `'base'`, `'lg'` | `'base'` | Drawer size |
| `isPadding` | `is-padding` | boolean | — | `true` | Apply inner padding |

**Pass-through attributes**

| Pattern / name | Source | Forwarded? |
|---|---|---|
| `aria-*` | utility default | Yes (e.g. `aria-label`, `aria-labelledby`, `aria-describedby`) |
| `data-*` | utility default | Yes |

---

### aegov-dropdown

**Properties**

| Prop | HTML attr | Type | Allowed values | Default | Purpose |
|---|---|---|---|---|---|
| `fieldId` | `field-id` | string (mutable, reflect) | — | auto | ID for the menu container; trigger receives `${fieldId}-trigger` |
| `trigger` | `trigger` | string (fixed) | `'click'`, `'hover'` | `'click'` | Trigger mode |
| `position` | `position` | string (fixed) | `'top'`, `'bottom'`, `'left'`, `'right'` | `'bottom'` | Position relative to trigger |
| `align` | `align` | string (fixed) | `'start'`, `'center'`, `'end'` | `'start'` | Alignment |
| `gap` | `gap` | number | — | `8` | Gap from trigger (px) |
| `offset` | `offset` | number | — | `0` | Extra offset (px) |
| `isDisabled` | `is-disabled` | boolean | — | `false` | Disabled state |
| `delayStart` | `delay-start` | number | — | `200` | Show delay (ms) |
| `delayEnd` | `delay-end` | number | — | `0` | Hide delay (ms) |

**Pass-through attributes**

| Pattern / name | Source | Forwarded? |
|---|---|---|
| _none_ | — | No pass-through. |

---

### aegov-link

**Properties**

| Prop | HTML attr | Type | Allowed values | Default | Purpose |
|---|---|---|---|---|---|
| `fieldId` | `field-id` | string (mutable, reflect) | — | auto | ID applied to the inner `<a>` |
| `href` | `href` | string (required) | — | — | Link URL |
| `target` | `target` | string (fixed) | `'_self'`, `'_blank'`, `'_parent'`, `'_top'` | `undefined` | Target attribute |
| `rel` | `rel` | string? | — | `undefined` | Rel attribute |
| `extraClass` | `extra-class` | string? | — | `undefined` | Extra CSS classes merged onto inner anchor |

**Pass-through attributes**

| Pattern / name | Source | Forwarded? |
|---|---|---|
| `aria-*` | utility default | Yes |
| `data-*` | utility default | Yes |
| `title` | `PASS_THROUGH_ATTRS` set | Yes |

---

### aegov-modal

**Properties**

| Prop | HTML attr | Type | Allowed values | Default | Purpose |
|---|---|---|---|---|---|
| `fieldId` | `field-id` | string (mutable, reflect) | — | auto | ID for the modal dialog (in shadow DOM) |
| `isOpen` | `is-open` | boolean (mutable, reflect) | — | `false` | Open state |
| `isCloseWithOverlay` | `is-close-with-overlay` | boolean | — | `true` | Click overlay to close |
| `isPreventScroll` | `is-prevent-scroll` | boolean | — | `true` | Lock body scroll |
| `overlayOpacity` | `overlay-opacity` | string (fixed) | `'light'`, `'base'`, `'dark'` | `'base'` | Overlay opacity |
| `position` | `position` | string (fixed) | `'center'`, `'top'`, `'bottom'` | `'center'` | Modal position |
| `size` | `size` | string (fixed) | `'sm'`, `'base'`, `'lg'` | `'base'` | Modal size |
| `isPadding` | `is-padding` | boolean | — | `true` | Apply inner padding |

**Pass-through attributes**

| Pattern / name | Source | Forwarded? |
|---|---|---|
| `aria-*` | utility default | Yes (e.g. `aria-label`, `aria-labelledby`, `aria-describedby`) |
| `data-*` | utility default | Yes |

---

### aegov-pagination

**Properties**

| Prop | HTML attr | Type | Allowed values | Default | Purpose |
|---|---|---|---|---|---|
| `fieldId` | `field-id` | string (mutable, reflect) | — | auto | ID applied to the pagination `<nav>` |
| `pages` | `pages` | number | — | `1` | Total pages |
| `pageCurrent` | `page-current` | number | — | `1` | Active page (1-indexed) |
| `isEnabledFirstLast` | `is-enabled-first-last` | boolean | — | `false` | Show First/Last buttons |
| `countSibling` | `count-sibling` | number | — | `1` | Siblings around current |
| `countBoundary` | `count-boundary` | number | — | `1` | Boundary pages shown |
| `variant` | `variant` | string (fixed) | `'default'`, `'compact'` | `'default'` | Display variant |
| `size` | `size` | string (responsive) | `'sm'`, `'base'`, `'lg'` | `'base'` | Size |
| `isDisabled` | `is-disabled` | boolean | — | `false` | Disabled state |
| `labelPrev` | `label-prev` | string | — | `'Previous'` | Previous button label |
| `labelNext` | `label-next` | string | — | `'Next'` | Next button label |
| `labelFirst` | `label-first` | string | — | `'First'` | First button label |
| `labelLast` | `label-last` | string | — | `'Last'` | Last button label |

**Pass-through attributes**

| Pattern / name | Source | Forwarded? |
|---|---|---|
| _none_ | — | No pass-through. |

---

### aegov-popover

**Properties**

| Prop | HTML attr | Type | Allowed values | Default | Purpose |
|---|---|---|---|---|---|
| `fieldId` | `field-id` | string (mutable, reflect) | — | auto | ID for the popover container; trigger receives `${fieldId}-trigger` |
| `trigger` | `trigger` | string (fixed) | `'click'`, `'hover'` | `'click'` | Trigger mode |
| `position` | `position` | string (fixed) | `'top'`, `'bottom'`, `'left'`, `'right'` | `'bottom'` | Position |
| `align` | `align` | string (fixed) | `'start'`, `'center'`, `'end'` | `'center'` | Alignment |
| `gap` | `gap` | number | — | `10` | Gap from trigger (px) |
| `offset` | `offset` | number | — | `0` | Extra offset (px) |
| `isDisabled` | `is-disabled` | boolean | — | `false` | Disabled state |
| `delayStart` | `delay-start` | number | — | `200` | Show delay (ms) |
| `delayEnd` | `delay-end` | number | — | `0` | Hide delay (ms) |

**Pass-through attributes**

| Pattern / name | Source | Forwarded? |
|---|---|---|
| _none_ | — | No pass-through. |

---

### aegov-progress

**Properties**

| Prop | HTML attr | Type | Allowed values | Default | Purpose |
|---|---|---|---|---|---|
| `fieldId` | `field-id` | string (mutable, reflect) | — | auto | Native `<progress>` element ID |
| `value` | `value` | number? | — | `undefined` | Current value (undefined = indeterminate) |
| `max` | `max` | number | — | `100` | Max value |
| `height` | `height` | string | — | `'2'` | Tailwind spacing height |
| `counter` | `counter` | string? | `'top'`, `'trailing'` | `undefined` | Counter placement |
| `counterSuffix` | `counter-suffix` | string | — | `''` | Counter suffix |
| `description` | `description` | string? | — | `undefined` | Description below bar |
| `extraClass` | `extra-class` | string? | — | `undefined` | Extra CSS classes |

**Pass-through attributes**

| Pattern / name | Source | Forwarded? |
|---|---|---|
| `aria-*` | utility default | Yes |
| `data-*` | utility default | Yes |
| `tabindex` | `PASS_THROUGH_ATTRS` set | Yes |
| `title` | `PASS_THROUGH_ATTRS` set | Yes |
| `form` | `PASS_THROUGH_ATTRS` set | Yes |

---

### aegov-separator

**Properties**

| Prop | HTML attr | Type | Allowed values | Default | Purpose |
|---|---|---|---|---|---|
| `orientation` | `orientation` | string (fixed) | `'horizontal'`, `'vertical'` | `'horizontal'` | Orientation |
| `appearance` | `appearance` | string (fixed) | `'default'`, `'subtle'` | `'default'` | Visual variant |
| `text` | `text` | string? | — | `undefined` | Center label |
| `isDecorative` | `is-decorative` | boolean | — | `true` | A11y decorative flag |
| `extraClass` | `extra-class` | string? | — | `undefined` | Extra CSS classes |

**Pass-through attributes**

| Pattern / name | Source | Forwarded? |
|---|---|---|
| _none_ | — | No pass-through. |

---

### aegov-tabs

**Properties**

| Prop | HTML attr | Type | Allowed values | Default | Purpose |
|---|---|---|---|---|---|
| `fieldId` | `field-id` | string (mutable, reflect) | — | auto | ID applied to the tabs container |
| `variant` | `variant` | string (fixed) | `'simple'`, `'segmented'`, `'pill'` | `'simple'` | Visual variant |
| `defaultOpen` | `default-open` | string | — | `''` | Tab-id active on initial render |
| `size` | `size` | string (responsive) | `'sm'`, `'base'`, `'lg'` | `'base'` | Size |
| `isScrollable` | `is-scrollable` | boolean | — | `false` | Horizontal scroll on overflow |
| `isStretchable` | `is-stretchable` | boolean | — | `false` | Distribute evenly |
| `orientation` | `orientation` | string (fixed) | `'horizontal'`, `'vertical'` | `'horizontal'` | Orientation |
| `labelTablist` | `label-tablist` | string | — | `'Tabs'` | A11y tablist label |

**Pass-through attributes**

| Pattern / name | Source | Forwarded? |
|---|---|---|
| _none_ | — | No pass-through. |

---

### aegov-tab

**Properties**

| Prop | HTML attr | Type | Allowed values | Default | Purpose |
|---|---|---|---|---|---|
| `tabId` | `tab-id` | string (required) | — | — | Unique ID matching tab-panel |
| `isDisabled` | `is-disabled` | boolean | — | `false` | Disable tab |
| `activeTabId` | `active-tab-id` | string (set by parent) | — | `''` | Internal |
| `variant` | `variant` | string (set by parent) | `'simple'`, `'segmented'`, `'pill'` | `'simple'` | Internal |
| `size` | `size` | string (set by parent) | `'sm'`, `'base'`, `'lg'` | `'base'` | Internal |
| `orientation` | `orientation` | string (set by parent) | `'horizontal'`, `'vertical'` | `'horizontal'` | Internal |

**Pass-through attributes**

| Pattern / name | Source | Forwarded? |
|---|---|---|
| _none_ | — | No pass-through. |

---

### aegov-tab-panel

**Properties**

| Prop | HTML attr | Type | Allowed values | Default | Purpose |
|---|---|---|---|---|---|
| `tabId` | `tab-id` | string (required) | — | — | Match tab |
| `active` | `active` | boolean (set by parent) | — | `false` | Internal |

**Pass-through attributes**

| Pattern / name | Source | Forwarded? |
|---|---|---|
| _none_ | — | No pass-through. |

---

### aegov-timeline

**Properties**

| Prop | HTML attr | Type | Allowed values | Default | Purpose |
|---|---|---|---|---|---|
| `fieldId` | `field-id` | string (mutable, reflect) | — | auto | ID applied to the timeline `<nav>` |
| `variant` | `variant` | string (fixed) | `'default'`, `'compact'` | `'default'` | Numbered or dots |
| `size` | `size` | string (responsive) | `'sm'`, `'base'`, `'lg'` | `'base'` | Step size |
| `orientation` | `orientation` | string (fixed) | `'horizontal'`, `'vertical'` | `'horizontal'` | Orientation |

**Pass-through attributes**

| Pattern / name | Source | Forwarded? |
|---|---|---|
| `aria-*` | utility default | Yes |
| `data-*` | utility default | Yes |

---

### aegov-timeline-step

**Properties**

| Prop | HTML attr | Type | Allowed values | Default | Purpose |
|---|---|---|---|---|---|
| `status` | `status` | string (fixed) | `'pending'`, `'active'`, `'completed'` | `'pending'` | Step status |
| `description` | `description` | string? | — | `undefined` | Description below label |
| `variant` | `variant` | string (set by parent) | `'default'`, `'compact'` | `'default'` | Internal |
| `size` | `size` | string (set by parent) | `'sm'`, `'base'`, `'lg'` | `'base'` | Internal |
| `orientation` | `orientation` | string (set by parent) | `'horizontal'`, `'vertical'` | `'horizontal'` | Internal |
| `stepIndex` | `step-index` | number (set by parent) | — | `0` | 0-based index |
| `stepCount` | `step-count` | number (set by parent) | — | `1` | Total steps |
| `isFirst` | `is-first` | boolean (set by parent) | — | `false` | Internal |
| `isLast` | `is-last` | boolean (set by parent) | — | `false` | Internal |
| `isConnectorSolid` | `is-connector-solid` | boolean (set by parent) | — | `false` | Solid connector |

**Pass-through attributes**

| Pattern / name | Source | Forwarded? |
|---|---|---|
| _none_ | — | No pass-through. |

---

### aegov-toast

**Properties**

| Prop | HTML attr | Type | Allowed values | Default | Purpose |
|---|---|---|---|---|---|
| `variant` | `variant` | string (fixed) | `'default'`, `'success'`, `'info'`, `'warning'`, `'error'` | `'default'` | Color border |
| `appearance` | `appearance` | string (fixed) | `'soft'`, `'solid'` | `'soft'` | Visual style |
| `position` | `position` | string (fixed) | `'top-right'`, `'top-left'`, `'top-center'`, `'bottom-right'`, `'bottom-left'`, `'bottom-center'` | `'top-right'` | Screen position |
| `duration` | `duration` | number | — | `5000` | Auto-dismiss ms (0 = none) |
| `isDismissible` | `is-dismissible` | boolean | — | `true` | Show close button |
| `mode` | `mode` | string (fixed) | `'stack'`, `'rack'` | `'stack'` | Multi-toast layout |
| `isProgressEnabled` | `is-progress-enabled` | boolean | — | `false` | Countdown progress bar |

**Pass-through attributes**

| Pattern / name | Source | Forwarded? |
|---|---|---|
| _none_ | — | No pass-through. |

---

### aegov-tooltip

**Properties**

| Prop | HTML attr | Type | Allowed values | Default | Purpose |
|---|---|---|---|---|---|
| `content` | `content` | string? | — | `undefined` | Tooltip content (alt to slot) |
| `position` | `position` | string (fixed) | `'top'`, `'bottom'`, `'left'`, `'right'` | `'top'` | Position |
| `align` | `align` | string (fixed) | `'start'`, `'center'`, `'end'` | `'center'` | Alignment |
| `trigger` | `trigger` | string (fixed) | `'hover'`, `'click'` | `'hover'` | Trigger mode |
| `gap` | `gap` | number | — | `8` | Gap from trigger (px) |
| `offset` | `offset` | number | — | `0` | Extra offset (px) |
| `isDisabled` | `is-disabled` | boolean | — | `false` | Disabled state |
| `delayStart` | `delay-start` | number | — | `200` | Show delay (ms) |
| `delayEnd` | `delay-end` | number | — | `0` | Hide delay (ms) |

**Pass-through attributes**

| Pattern / name | Source | Forwarded? |
|---|---|---|
| _none_ | — | No pass-through. |

---

## Typography Components

### aegov-text

**Properties**

| Prop | HTML attr | Type | Allowed values | Default | Purpose |
|---|---|---|---|---|---|
| `size` | `size` | string (responsive) | `'sm'`, `'base'`, `'lg'` | `'base'` | Text size |
| `extraClass` | `extra-class` | string? | — | `undefined` | Extra CSS classes |

**Pass-through attributes**

| Pattern / name | Source | Forwarded? |
|---|---|---|
| `aria-*` | utility default | Yes |
| `data-*` | utility default | Yes |
| `id` | `PASS_THROUGH_ATTRS` set | Yes — pre-existing exception, not yet migrated to `fieldId` |

---

### aegov-title

**Properties**

| Prop | HTML attr | Type | Allowed values | Default | Purpose |
|---|---|---|---|---|---|
| `fieldId` | `field-id` | string (mutable, reflect) | — | auto | ID applied to inner heading tag |
| `size` | `size` | string (responsive) | `'sm'`, `'base'`, `'lg'`, `'xl'`, `'2xl'` | `'base'` | Size |
| `headingType` | `heading-type` | string? | `'h2'`, `'h3'`, `'h4'`, `'h5'`, `'h6'`, `'p'` | `undefined` | Semantic tag (defaults to `<p>`) |
| `extraClass` | `extra-class` | string? | — | `undefined` | Extra CSS classes |

**Pass-through attributes**

| Pattern / name | Source | Forwarded? |
|---|---|---|
| `aria-*` | utility default | Yes |
| `data-*` | utility default | Yes |

---

## Layout Components

### aegov-header

**Properties**

| Prop | HTML attr | Type | Allowed values | Default | Purpose |
|---|---|---|---|---|---|
| `variant` | `variant` | string (fixed) | `'ministry'`, `'authority'` | `'ministry'` | Government tier |
| `entityName` | `entity-name` | string (required) | — | — | Entity name |
| `entityDomain` | `entity-domain` | string (required) | — | — | Entity domain |
| `skipContentContainer` | `skip-content-container` | string | — | `''` | Skip-link target selector |

**Pass-through attributes**

| Pattern / name | Source | Forwarded? |
|---|---|---|
| _none_ | — | No pass-through. |

---

### aegov-navbar

**Properties**

| Prop | HTML attr | Type | Allowed values | Default | Purpose |
|---|---|---|---|---|---|
| `size` | `size` | string (responsive) | `'sm'`, `'base'`, `'lg'` | `'base'` | Item size cascaded to children |
| `gap` | `gap` | string | Tailwind utility (e.g. `'gap-4'`) | `'gap-3'` | Gap between items |
| `labelNav` | `label-nav` | string | — | `'Main navigation'` | A11y landmark label |

**Pass-through attributes**

| Pattern / name | Source | Forwarded? |
|---|---|---|
| _none_ | — | No pass-through. |

---

### aegov-navbar-item

**Properties**

| Prop | HTML attr | Type | Allowed values | Default | Purpose |
|---|---|---|---|---|---|
| `href` | `href` | string? | — | `undefined` | Link URL (omit for non-link span) |
| `target` | `target` | string (fixed) | `'_self'`, `'_blank'`, `'_parent'`, `'_top'` | `undefined` | Anchor target |
| `rel` | `rel` | string? | — | `undefined` | Anchor rel |
| `isActive` | `is-active` | boolean | — | `false` | Current page (sets `aria-current`) |
| `isDisabled` | `is-disabled` | boolean | — | `false` | Disabled state |
| `size` | `size` | string (set by parent, responsive) | `'sm'`, `'base'`, `'lg'` | `'base'` | Inherited size |

**Pass-through attributes**

| Pattern / name | Source | Forwarded? |
|---|---|---|
| _none_ | — | No pass-through. |

---

## Form Components

### aegov-checkbox

**Properties**

| Prop | HTML attr | Type | Allowed values | Default | Purpose |
|---|---|---|---|---|---|
| `fieldId` | `field-id` | string (mutable, reflect) | — | auto | Native checkbox ID |
| `name` | `name` | string? | — | `undefined` | Form name |
| `value` | `value` | string? | — | `undefined` | Form value |
| `checked` | `checked` | boolean (mutable, reflect) | — | `false` | Checked state |
| `size` | `size` | string (responsive) | `'sm'`, `'base'`, `'lg'` | `'base'` | Size |
| `disabled` | `disabled` | boolean (reflect) | — | `false` | Disabled state |
| `required` | `required` | boolean | — | `false` | Required field |
| `label` | `label` | string? | — | `undefined` | Label text |
| `description` | `description` | string? | — | `undefined` | Description below label |
| `checkAll` | `check-all` | boolean (reflect) | — | `false` | "Check all" controller |
| `indeterminate` | `indeterminate` | boolean (mutable) | — | `false` | Indeterminate state |
| `extraClass` | `extra-class` | string? | — | `undefined` | Extra CSS classes |

**Pass-through attributes**

| Pattern / name | Source | Forwarded? |
|---|---|---|
| `aria-*` | utility default | Yes |
| `data-*` | utility default | Yes |
| `form` | `PASS_THROUGH_ATTRS` set | Yes |
| `tabindex` | `PASS_THROUGH_ATTRS` set | Yes |
| `autofocus` | `PASS_THROUGH_ATTRS` set | Yes |
| `title` | `PASS_THROUGH_ATTRS` set | Yes |

---

### aegov-checkbox-group

**Properties**

| Prop | HTML attr | Type | Allowed values | Default | Purpose |
|---|---|---|---|---|---|
| `variant` | `variant` | string (fixed) | `'default'`, `'list'`, `'cards'`, `'pills'` | `'default'` | Group layout |
| `orientation` | `orientation` | string (fixed) | `'vertical'`, `'horizontal'` | `'vertical'` | Stack direction |
| `label` | `label` | string? | — | `undefined` | Legend text |
| `size` | `size` | string (responsive) | `'sm'`, `'base'`, `'lg'` | `'base'` | Size propagated |
| `disabled` | `disabled` | boolean | — | `false` | Disable all |
| `extraClass` | `extra-class` | string? | — | `undefined` | Extra CSS classes |

**Pass-through attributes**

| Pattern / name | Source | Forwarded? |
|---|---|---|
| _none_ | — | No pass-through. |

---

### aegov-datepicker

**Properties**

| Prop | HTML attr | Type | Allowed values | Default | Purpose |
|---|---|---|---|---|---|
| `mode` | `mode` | string (fixed) | `'single'`, `'range'` | `'single'` | Selection mode |
| `value` | `value` | string (mutable) | — | `''` | Pre-selected value |
| `format` | `format` | string | tokens: `YYYY`, `YY`, `MM`, `M`, `DD`, `D`, `MMM`, `MMMM`, `dd`, `ddd` | `'YYYY-MM-DD'` | Output format |
| `placeholder` | `placeholder` | string | — | `'Select date'` | Single placeholder |
| `rangePlaceholderStart` | `range-placeholder-start` | string | — | `'Start date'` | Range start placeholder |
| `rangePlaceholderEnd` | `range-placeholder-end` | string | — | `'End date'` | Range end placeholder |
| `min` | `min` | string | ISO date or `'today'` | `''` | Min date |
| `max` | `max` | string | ISO date or `'today'` | `''` | Max date |
| `disableFuture` | `disable-future` | boolean | — | `false` | Disable future dates |
| `startDay` | `start-day` | number | `0`–`6` (0=Sun) | `0` | Week start day |
| `locale` | `locale` | string | BCP 47 (`'en'`, `'ar'`) | `'en'` | Locale |
| `minRange` | `min-range` | number | — | `0` | Min range days |
| `maxRange` | `max-range` | number | — | `0` | Max range days (0=unlimited) |
| `unavailableDates` | `unavailable-dates` | string | comma-separated ISO | `''` | Unavailable dates |
| `presets` | `presets` | string | comma-separated preset IDs | `''` | Range presets |
| `disabled` | `disabled` | boolean | — | `false` | Disabled state |
| `clearable` | `clearable` | boolean | — | `true` | Show clear button |
| `selectableHeader` | `selectable-header` | boolean | — | `true` | Show month/year selects |
| `yearRangeStart` | `year-range-start` | number | — | `0` | Year dropdown start |
| `yearRangeEnd` | `year-range-end` | number | — | `0` | Year dropdown end |
| `withConfirmation` | `with-confirmation` | boolean | — | `false` | Apply/Cancel buttons |
| `size` | `size` | string (responsive) | `'sm'`, `'base'`, `'lg'` | `'base'` | Input size |

**Pass-through attributes**

| Pattern / name | Source | Forwarded? |
|---|---|---|
| _none_ | — | No pass-through. |

---

### aegov-fileupload

**Properties**

| Prop | HTML attr | Type | Allowed values | Default | Purpose |
|---|---|---|---|---|---|
| `fieldId` | `field-id` | string | — | auto | Field ID |
| `variant` | `variant` | string (fixed) | `'default'`, `'button'`, `'dropzone'` | `'default'` | Visual variant |
| `size` | `size` | string (responsive) | `'sm'`, `'base'`, `'lg'` | `'base'` | Component size |
| `multiple` | `multiple` | boolean | — | `false` | Allow multiple files |
| `accept` | `accept` | string? | — | `undefined` | Accepted file types |
| `maxFileSize` | `max-file-size` | number? | — | `undefined` | Max file size (bytes) |
| `maxFiles` | `max-files` | number? | — | `undefined` | Max number of files |
| `disabled` | `disabled` | boolean | — | `false` | Disabled |
| `required` | `required` | boolean | — | `false` | Required field |
| `name` | `name` | string? | — | `undefined` | Form name |
| `label` | `label` | string? | — | `undefined` | Label text |
| `description` | `description` | string? | — | `undefined` | Description |
| `helperText` | `helper-text` | string? | — | `undefined` | Custom helper text |
| `buttonText` | `button-text` | string? | — | `undefined` | Custom browse-button text |

**Pass-through attributes**

| Pattern / name | Source | Forwarded? |
|---|---|---|
| _none_ | — | No pass-through. |

---

### aegov-form-field

**Properties**

| Prop | HTML attr | Type | Allowed values | Default | Purpose |
|---|---|---|---|---|---|
| `fieldId` | `field-id` | string (mutable, reflect) | — | auto | ID for the form-field wrapper |
| `extraClass` | `extra-class` | string? | — | `undefined` | Extra CSS classes |

**Pass-through attributes**

| Pattern / name | Source | Forwarded? |
|---|---|---|
| `aria-*` | utility default | Yes |
| `data-*` | utility default | Yes |

---

### aegov-input

**Properties**

| Prop | HTML attr | Type | Allowed values | Default | Purpose |
|---|---|---|---|---|---|
| `fieldId` | `field-id` | string | — | auto | Native input ID |
| `type` | `type` | string (fixed) | `'text'`, `'email'`, `'number'`, `'password'`, `'tel'`, `'url'`, `'search'`, `'date'`, `'time'`, `'datetime-local'`, `'month'`, `'week'` | `'text'` | Input type |
| `size` | `size` | string (responsive) | `'sm'`, `'base'`, `'lg'` | `'base'` | Input size |
| `disabled` | `disabled` | boolean | — | `false` | Disabled |
| `readonly` | `readonly` | boolean | — | `false` | Readonly |
| `placeholder` | `placeholder` | string? | — | `undefined` | Placeholder |
| `value` | `value` | string | — | `''` | Current value |
| `name` | `name` | string? | — | `undefined` | Form name |
| `required` | `required` | boolean | — | `false` | Required field |
| `revealable` | `revealable` | boolean | — | `false` | Reveal/hide password (only `type="password"`) |
| `copyable` | `copyable` | boolean | — | `false` | Copy button (only when readonly) |
| `extraClass` | `extra-class` | string? | — | `undefined` | Extra CSS classes |

**Pass-through attributes**

| Pattern / name | Source | Forwarded? |
|---|---|---|
| `aria-*` | utility default | Yes |
| `data-*` | utility default | Yes |
| `pattern` | `PASS_THROUGH_ATTRS` set | Yes |
| `min`, `max` | `PASS_THROUGH_ATTRS` set | Yes |
| `minlength`, `maxlength` | `PASS_THROUGH_ATTRS` set | Yes |
| `step` | `PASS_THROUGH_ATTRS` set | Yes |
| `autocomplete` | `PASS_THROUGH_ATTRS` set | Yes |
| `autofocus` | `PASS_THROUGH_ATTRS` set | Yes |
| `inputmode` | `PASS_THROUGH_ATTRS` set | Yes |
| `list` | `PASS_THROUGH_ATTRS` set | Yes |
| `multiple` | `PASS_THROUGH_ATTRS` set | Yes |
| `accept` | `PASS_THROUGH_ATTRS` set | Yes |
| `capture` | `PASS_THROUGH_ATTRS` set | Yes |
| `spellcheck` | `PASS_THROUGH_ATTRS` set | Yes |
| `enterkeyhint` | `PASS_THROUGH_ATTRS` set | Yes |
| `title` | `PASS_THROUGH_ATTRS` set | Yes |
| `tabindex` | `PASS_THROUGH_ATTRS` set | Yes |
| `form` | `PASS_THROUGH_ATTRS` set | Yes |

---

### aegov-input-group

**Properties**

| Prop | HTML attr | Type | Allowed values | Default | Purpose |
|---|---|---|---|---|---|
| `size` | `size` | string (responsive) | `'sm'`, `'base'`, `'lg'` | `'base'` | Size propagated to children |
| `addonPrefix` | `addon-prefix` | string? | — | `undefined` | Prefix addon text |
| `addonSuffix` | `addon-suffix` | string? | — | `undefined` | Suffix addon text |
| `extraClass` | `extra-class` | string? | — | `undefined` | Extra CSS classes |

**Pass-through attributes**

| Pattern / name | Source | Forwarded? |
|---|---|---|
| _none_ | — | No pass-through. |

---

### aegov-label

**Properties**

| Prop | HTML attr | Type | Allowed values | Default | Purpose |
|---|---|---|---|---|---|
| `fieldId` | `field-id` | string (mutable, reflect) | — | auto | ID applied to inner `<label>` |
| `htmlFor` | `for` | string? | — | `undefined` | Associated form element ID |
| `extraClass` | `extra-class` | string? | — | `undefined` | Extra CSS classes |

**Pass-through attributes**

| Pattern / name | Source | Forwarded? |
|---|---|---|
| `aria-*` | utility default | Yes |
| `data-*` | utility default | Yes |

---

### aegov-otp

**Properties**

| Prop | HTML attr | Type | Allowed values | Default | Purpose |
|---|---|---|---|---|---|
| `fieldId` | `field-id` | string | — | auto | First cell ID |
| `variant` | `variant` | string (fixed) | `'continuous'`, `'individual'` | `'continuous'` | Box layout |
| `length` | `length` | number | — | `5` | Number of cells |
| `size` | `size` | string (responsive) | `'xs'`, `'sm'`, `'base'`, `'lg'`, `'xl'`, `'2xl'` | `'base'` | Cell size |
| `alphanumeric` | `alphanumeric` | boolean | — | `false` | Allow letters + digits |
| `pattern` | `pattern` | string? | — | `undefined` | Regex validation |
| `disabled` | `disabled` | boolean | — | `false` | Disabled state |
| `name` | `name` | string? | — | `undefined` | Form name (hidden input) |
| `value` | `value` | string | — | `''` | Current OTP value |
| `extraClass` | `extra-class` | string? | — | `undefined` | Extra CSS classes |

**Pass-through attributes**

| Pattern / name | Source | Forwarded? |
|---|---|---|
| `aria-*` | utility default | Yes |
| `data-*` | utility default | Yes |

(Inline `new Set([])` — empty additional set, defaults only.)

---

### aegov-radio

**Properties**

| Prop | HTML attr | Type | Allowed values | Default | Purpose |
|---|---|---|---|---|---|
| `fieldId` | `field-id` | string | — | auto | Native radio ID |
| `name` | `name` | string? | — | `undefined` | Form name (required for native grouping) |
| `value` | `value` | string? | — | `undefined` | Form value |
| `checked` | `checked` | boolean | — | `false` | Checked state |
| `size` | `size` | string (responsive) | `'sm'`, `'base'`, `'lg'` | `'base'` | Size |
| `disabled` | `disabled` | boolean | — | `false` | Disabled state |
| `required` | `required` | boolean | — | `false` | Required field |
| `label` | `label` | string? | — | `undefined` | Label text |
| `description` | `description` | string? | — | `undefined` | Description below label |
| `extraClass` | `extra-class` | string? | — | `undefined` | Extra CSS classes |

**Pass-through attributes**

| Pattern / name | Source | Forwarded? |
|---|---|---|
| `aria-*` | utility default | Yes |
| `data-*` | utility default | Yes |
| `form` | `PASS_THROUGH_ATTRS` set | Yes |
| `tabindex` | `PASS_THROUGH_ATTRS` set | Yes |
| `autofocus` | `PASS_THROUGH_ATTRS` set | Yes |
| `title` | `PASS_THROUGH_ATTRS` set | Yes |

---

### aegov-radio-group

**Properties**

| Prop | HTML attr | Type | Allowed values | Default | Purpose |
|---|---|---|---|---|---|
| `variant` | `variant` | string (fixed) | `'default'`, `'list'`, `'cards'`, `'pills'` | `'default'` | Group layout |
| `orientation` | `orientation` | string (fixed) | `'vertical'`, `'horizontal'` | `'vertical'` | Stack direction |
| `label` | `label` | string? | — | `undefined` | Legend text |
| `size` | `size` | string (responsive) | `'sm'`, `'base'`, `'lg'` | `'base'` | Size propagated |
| `name` | `name` | string (required) | — | — | Shared name for native single-select |
| `disabled` | `disabled` | boolean | — | `false` | Disable all |
| `extraClass` | `extra-class` | string? | — | `undefined` | Extra CSS classes |

**Pass-through attributes**

| Pattern / name | Source | Forwarded? |
|---|---|---|
| _none_ | — | No pass-through. |

---

### aegov-range

**Properties**

| Prop | HTML attr | Type | Allowed values | Default | Purpose |
|---|---|---|---|---|---|
| `fieldId` | `field-id` | string | — | auto | Native range ID |
| `name` | `name` | string? | — | `undefined` | Form name |
| `value` | `value` | number | — | `50` | Single-mode value |
| `valueLow` | `value-low` | number | — | `25` | Range-mode low thumb |
| `valueHigh` | `value-high` | number | — | `75` | Range-mode high thumb |
| `min` | `min` | number | — | `0` | Min value |
| `max` | `max` | number | — | `100` | Max value |
| `step` | `step` | number | — | `1` | Step increment |
| `size` | `size` | string (responsive) | `'sm'`, `'base'`, `'lg'` | `'base'` | Track size |
| `display` | `display` | string (fixed) | `'none'`, `'tooltip'`, `'thumb'`, `'full'` | `'none'` | Value display mode |
| `orientation` | `orientation` | string (fixed) | `'horizontal'`, `'vertical'` | `'horizontal'` | Layout |
| `mode` | `mode` | string (fixed) | `'single'`, `'range'` | `'single'` | Single/dual thumb |
| `disabled` | `disabled` | boolean | — | `false` | Disabled state |
| `required` | `required` | boolean | — | `false` | Required field |
| `label` | `label` | string? | — | `undefined` | Label |
| `extraClass` | `extra-class` | string? | — | `undefined` | Extra CSS classes |

**Pass-through attributes**

| Pattern / name | Source | Forwarded? |
|---|---|---|
| `aria-*` | utility default | Yes |
| `data-*` | utility default | Yes |
| `tabindex` | `PASS_THROUGH_ATTRS` set | Yes |
| `autofocus` | `PASS_THROUGH_ATTRS` set | Yes |
| `title` | `PASS_THROUGH_ATTRS` set | Yes |
| `form` | `PASS_THROUGH_ATTRS` set | Yes |

---

### aegov-select

**Properties**

| Prop | HTML attr | Type | Allowed values | Default | Purpose |
|---|---|---|---|---|---|
| `fieldId` | `field-id` | string | — | auto | Select ID |
| `variant` | `variant` | string (fixed) | `'default'`, `'listbox'` | `'default'` | Native select vs custom |
| `size` | `size` | string (responsive) | `'sm'`, `'base'`, `'lg'` | `'base'` | Size |
| `multiple` | `multiple` | boolean | — | `false` | Multi-select (forces listbox) |
| `disabled` | `disabled` | boolean | — | `false` | Disabled state |
| `placeholder` | `placeholder` | string? | — | `undefined` | Placeholder |
| `value` | `value` | string | — | `''` | Selected value (CSV when multiple) |
| `name` | `name` | string? | — | `undefined` | Form name |
| `required` | `required` | boolean | — | `false` | Required field |
| `searchable` | `searchable` | boolean | — | `false` | Search input (listbox only) |
| `emptyMessage` | `empty-message` | string | — | `'No results found'` | Empty results message |
| `visibleItems` | `visible-items` | number | — | `6` | Max visible items |
| `clearable` | `clearable` | boolean | — | `false` | Clear button |
| `extraClass` | `extra-class` | string? | — | `undefined` | Extra CSS classes |

**Pass-through attributes**

| Pattern / name | Source | Forwarded? |
|---|---|---|
| `aria-*` | utility default | Yes |
| `data-*` | utility default | Yes |

---

### aegov-select-option

**Properties**

| Prop | HTML attr | Type | Allowed values | Default | Purpose |
|---|---|---|---|---|---|
| `value` | `value` | string | — | `''` | Option value |
| `disabled` | `disabled` | boolean | — | `false` | Disabled |

**Pass-through attributes**

| Pattern / name | Source | Forwarded? |
|---|---|---|
| _none_ | — | No pass-through. |

---

### aegov-select-option-group

**Properties**

| Prop | HTML attr | Type | Allowed values | Default | Purpose |
|---|---|---|---|---|---|
| `label` | `label` | string | — | `''` | Group label |

**Pass-through attributes**

| Pattern / name | Source | Forwarded? |
|---|---|---|
| _none_ | — | No pass-through. |

---

### aegov-textarea

**Properties**

| Prop | HTML attr | Type | Allowed values | Default | Purpose |
|---|---|---|---|---|---|
| `fieldId` | `field-id` | string | — | auto | Native textarea ID |
| `size` | `size` | string (responsive) | `'sm'`, `'base'`, `'lg'` | `'base'` | Font size |
| `disabled` | `disabled` | boolean | — | `false` | Disabled |
| `readonly` | `readonly` | boolean | — | `false` | Readonly |
| `placeholder` | `placeholder` | string? | — | `undefined` | Placeholder |
| `value` | `value` | string | — | `''` | Current value |
| `name` | `name` | string? | — | `undefined` | Form name |
| `required` | `required` | boolean | — | `false` | Required field |
| `resize` | `resize` | string (fixed) | `'none'`, `'vertical'`, `'horizontal'`, `'both'`, `'auto'` | `'vertical'` | Resize behaviour |
| `maxlength` | `maxlength` | number? | — | `undefined` | Max chars (shows counter) |
| `copyable` | `copyable` | boolean | — | `false` | Copy button (readonly only) |
| `extraClass` | `extra-class` | string? | — | `undefined` | Extra CSS classes |

**Pass-through attributes**

| Pattern / name | Source | Forwarded? |
|---|---|---|
| `aria-*` | utility default | Yes |
| `data-*` | utility default | Yes |
| `rows`, `cols` | `PASS_THROUGH_ATTRS` set | Yes |
| `minlength`, `maxlength` | `PASS_THROUGH_ATTRS` set | Yes |
| `wrap` | `PASS_THROUGH_ATTRS` set | Yes |
| `autocomplete` | `PASS_THROUGH_ATTRS` set | Yes |
| `autofocus` | `PASS_THROUGH_ATTRS` set | Yes |
| `spellcheck` | `PASS_THROUGH_ATTRS` set | Yes |
| `enterkeyhint` | `PASS_THROUGH_ATTRS` set | Yes |
| `title` | `PASS_THROUGH_ATTRS` set | Yes |
| `tabindex` | `PASS_THROUGH_ATTRS` set | Yes |
| `form` | `PASS_THROUGH_ATTRS` set | Yes |

---

### aegov-toggle

**Properties**

| Prop | HTML attr | Type | Allowed values | Default | Purpose |
|---|---|---|---|---|---|
| `fieldId` | `field-id` | string | — | auto | Native checkbox ID |
| `name` | `name` | string? | — | `undefined` | Form name |
| `value` | `value` | string? | — | `undefined` | Form value |
| `checked` | `checked` | boolean | — | `false` | On/off state |
| `size` | `size` | string (responsive) | `'sm'`, `'base'`, `'lg'` | `'base'` | Size |
| `disabled` | `disabled` | boolean | — | `false` | Disabled |
| `required` | `required` | boolean | — | `false` | Required field |
| `label` | `label` | string? | — | `undefined` | Label text |
| `description` | `description` | string? | — | `undefined` | Description below label |

**Pass-through attributes**

| Pattern / name | Source | Forwarded? |
|---|---|---|
| `aria-*` | utility default | Yes |
| `data-*` | utility default | Yes |
| `form` | `PASS_THROUGH_ATTRS` set | Yes |
| `tabindex` | `PASS_THROUGH_ATTRS` set | Yes |
| `autofocus` | `PASS_THROUGH_ATTRS` set | Yes |
| `title` | `PASS_THROUGH_ATTRS` set | Yes |

---

## Cross-cutting notes

### Pre-existing inconsistencies

Two components still keep `'id'` in their `PASS_THROUGH_ATTRS` set rather than adopting the `fieldId` prop:

- **aegov-text** — typography helper, hasn't been migrated yet.
- **aegov-breadcrumbs-item** — child component; the parent `aegov-breadcrumbs` already uses `fieldId`, but each item's `id` is still pass-through.

Both still work; they just don't follow the `fieldId` convention used elsewhere.

### Where pass-through is used most

Native form elements (input, textarea, checkbox, radio, toggle, range, progress) have the largest `PASS_THROUGH_ATTRS` sets — users genuinely need to forward attributes like `pattern`, `autocomplete`, `tabindex`, `form` to the underlying native element.

Container components without pass-through (button-group, tabs, pagination, popover, tooltip, etc.) intentionally lock their behaviour to their declared props.
