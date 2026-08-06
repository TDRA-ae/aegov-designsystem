# Toast

<p class="text-lg text-aeblack-500 mb-8">A Toast confirms that something just happened. It appears over the page, announces itself to assistive technology, and disappears on its own. Use it for the outcome of an action the user just took — a preference saved, a draft stored, an upload finished — and never for information the user must not miss.</p>

## Introduction

`aegov-toast` renders into a container appended to `document.body`, so it floats above the page regardless of where you declared it. Call `show()` to display it.

```html
<aegov-toast id="saved" variant="success">Your preference has been saved.</aegov-toast>

<script type="module">
  document.querySelector('#saved').show();
</script>
```

In practice you rarely write toast markup by hand. The library installs a global helper that creates and shows one for you:

```js
window.aegovToast.show({ message: 'Your preference has been saved.', variant: 'success' });
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap items-center gap-3">
    <aegov-button size="sm" onclick="window.aegovToast.show({ message: 'Your preference has been saved.', variant: 'success' })">Show success toast</aegov-button>
    <aegov-button size="sm" appearance="outline" onclick="window.aegovToast.show({ message: 'We could not save your preference.', variant: 'error' })">Show error toast</aegov-button>
    <aegov-button size="sm" appearance="soft" onclick="window.aegovToast.show({ message: 'Your session expires in 5 minutes.', variant: 'warning' })">Show warning toast</aegov-button>
  </div>
</div>

---

## When not to use a toast

A toast is transient and floating, which makes it the wrong home for anything important. Use something else when:

| Situation | Use instead |
| --- | --- |
| The user must read it to continue | [Callout](aegov-callout.html) or [Modal](aegov-modal.html) |
| It applies to the whole site | [Banner](aegov-banner.html) |
| It explains why a field is invalid | The field's own error — see [Validation Surface](validation-overview.html) |
| It needs to be actioned later | A persistent list or notification centre |

The test: if the user missing it would be a problem, it is not a toast.

---

## The global helper

`window.aegovToast.show(options)` creates an `aegov-toast`, appends it to the body, shows it, and returns the element.

```js
const toast = window.aegovToast.show({
  message: 'Your application has been submitted.',
  variant: 'success',
  position: 'top-right',
  duration: 5000,
  isDismissible: true,
  mode: 'stack',
  isProgressEnabled: true,
});
```

| Option | Type | Default |
| --- | --- | --- |
| `message` | `string` | — (required) |
| `variant` | `'default' \| 'error' \| 'warning' \| 'success' \| 'info'` | `'default'` |
| `appearance` | `'soft' \| 'solid'` | `'soft'` |
| `position` | one of the six positions | `'top-right'` |
| `duration` | `number` — milliseconds, `0` for persistent | `5000` |
| `isDismissible` | `boolean` | `true` |
| `mode` | `'stack' \| 'rack'` | `'stack'` |
| `isProgressEnabled` | `boolean` | `false` |

`message` is assigned as HTML, so it accepts simple inline markup — but never pass unescaped user input through it.

The returned element is a real `aegov-toast`, so you can listen to its events or close it early:

```js
const toast = window.aegovToast.show({ message: 'Uploading…', duration: 0 });
await upload();
await toast.close();
```

---

## Variant

Variant is deliberately restrained here: it controls a **4px coloured top border** and nothing else. The panel itself stays neutral, so a stack of toasts does not become a wall of colour.

| Variant | Border |
| --- | --- |
| `default` | No coloured border |
| `error` | Aered |
| `warning` | Camel |
| `success` | Aegreen |
| `info` | Techblue |

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap items-center gap-3">
    <aegov-button size="sm" appearance="soft" onclick="window.aegovToast.show({ message: 'Default toast — no coloured border.' })">default</aegov-button>
    <aegov-button size="sm" appearance="soft" onclick="window.aegovToast.show({ message: 'Information for your attention.', variant: 'info' })">info</aegov-button>
    <aegov-button size="sm" appearance="soft" onclick="window.aegovToast.show({ message: 'Your changes have been saved.', variant: 'success' })">success</aegov-button>
    <aegov-button size="sm" appearance="soft" onclick="window.aegovToast.show({ message: 'Your session expires in 5 minutes.', variant: 'warning' })">warning</aegov-button>
    <aegov-button size="sm" appearance="soft" onclick="window.aegovToast.show({ message: 'We could not save your changes.', variant: 'error' })">error</aegov-button>
  </div>
</div>

Variant also decides how the toast is announced: `error` and `warning` go to an assertive live region, everything else to a polite one. See [Accessibility](#accessibility).

---

## Appearance

| Appearance | Look |
| --- | --- |
| `soft` | Light panel with dark text. |
| `solid` | Dark panel with light text. |

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap items-center gap-3">
    <aegov-button size="sm" appearance="outline" onclick="window.aegovToast.show({ message: 'Soft appearance — light panel.', variant: 'success', appearance: 'soft' })">soft</aegov-button>
    <aegov-button size="sm" appearance="outline" onclick="window.aegovToast.show({ message: 'Solid appearance — dark panel.', variant: 'success', appearance: 'solid' })">solid</aegov-button>
  </div>
</div>

---

## Position

Six positions. The component maintains one container per position, so toasts shown at different positions never interleave.

```
top-left      top-center      top-right
bottom-left   bottom-center   bottom-right
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="grid grid-cols-3 gap-2 max-w-md">
    <aegov-button size="xs" appearance="soft" onclick="window.aegovToast.show({ message: 'top-left', position: 'top-left' })">top-left</aegov-button>
    <aegov-button size="xs" appearance="soft" onclick="window.aegovToast.show({ message: 'top-center', position: 'top-center' })">top-center</aegov-button>
    <aegov-button size="xs" appearance="soft" onclick="window.aegovToast.show({ message: 'top-right', position: 'top-right' })">top-right</aegov-button>
    <aegov-button size="xs" appearance="soft" onclick="window.aegovToast.show({ message: 'bottom-left', position: 'bottom-left' })">bottom-left</aegov-button>
    <aegov-button size="xs" appearance="soft" onclick="window.aegovToast.show({ message: 'bottom-center', position: 'bottom-center' })">bottom-center</aegov-button>
    <aegov-button size="xs" appearance="soft" onclick="window.aegovToast.show({ message: 'bottom-right', position: 'bottom-right' })">bottom-right</aegov-button>
  </div>
</div>

Pick one position and use it everywhere in a service. Toasts appearing in different corners depending on the action are disorienting, and a user who has learned where to look will stop looking anywhere else.

Avoid `bottom-*` positions when you also use a bottom-anchored [Banner](aegov-banner.html) — they will overlap.

---

## Duration

`duration` is in milliseconds. **`0` makes the toast persistent**, staying until dismissed or closed in code.

```js
window.aegovToast.show({ message: 'Saved.', duration: 3000 });
window.aegovToast.show({ message: 'Uploading…', duration: 0 });   // persistent
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap items-center gap-3">
    <aegov-button size="sm" appearance="soft" onclick="window.aegovToast.show({ message: 'Gone in 2 seconds.', duration: 2000 })">2 seconds</aegov-button>
    <aegov-button size="sm" appearance="soft" onclick="window.aegovToast.show({ message: 'Gone in 10 seconds.', duration: 10000 })">10 seconds</aegov-button>
    <aegov-button size="sm" appearance="soft" onclick="window.aegovToast.show({ message: 'Persistent — dismiss me.', duration: 0, variant: 'info' })">Persistent</aegov-button>
  </div>
</div>

The default 5 seconds is enough for a short confirmation. Longer messages need proportionally longer — a rough guide is 5 seconds plus one second per additional ten words. If the message needs more than about ten seconds, it is not a toast.

Anything with an action in it should be persistent. A user cannot reliably reach an Undo button that disappears while they are moving the mouse toward it.

---

## Progress bar

`isProgressEnabled` draws a bar that depletes over the duration, so the user can see how long they have.

```js
window.aegovToast.show({
  message: 'Draft saved.',
  variant: 'success',
  isProgressEnabled: true,
});
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-button size="sm" appearance="soft" onclick="window.aegovToast.show({ message: 'Draft saved — watch the progress bar.', variant: 'success', isProgressEnabled: true, duration: 6000 })">With progress bar</aegov-button>
</div>

It has no effect on a persistent toast, since there is nothing to count down.

---

## Mode — stack or rack

| Mode | Behaviour with several toasts |
| --- | --- |
| `stack` | Default. Toasts list vertically, all fully visible. |
| `rack` | Toasts collapse into a layered pile with a count badge, expanding on hover or keyboard focus. |

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap items-center gap-3">
    <aegov-button size="sm" appearance="outline" onclick="[1,2,3].forEach((n,i)=>setTimeout(()=>window.aegovToast.show({ message: 'Stacked toast '+n, mode: 'stack', duration: 6000 }), i*250))">Show 3 stacked</aegov-button>
    <aegov-button size="sm" appearance="outline" onclick="[1,2,3,4].forEach((n,i)=>setTimeout(()=>window.aegovToast.show({ message: 'Racked toast '+n, mode: 'rack', duration: 8000 }), i*250))">Show 4 racked</aegov-button>
  </div>
</div>

Rack mode keeps the viewport clear when several toasts arrive at once — a bulk operation reporting per-item results, for example. It expands on `mouseenter` **and** on `focusin`, so keyboard users can reach the toasts underneath; it collapses again on `mouseleave` or when focus leaves the container entirely.

Rack styling is injected as a `<style>` element at runtime, because the toasts live in a portal that scoped component CSS cannot reach.

---

## Slots

Toasts have no built-in icons. Everything is slotted.

| Slot | Renders |
| --- | --- |
| `icon` | Leading icon, before the content. |
| `title` | Bold line above the message. |
| _(default)_ | The message. |
| `actions` | Buttons or links below the message. |

```html
<aegov-toast id="undo" variant="success" duration="0">
  <svg slot="icon" viewBox="0 0 20 20" fill="currentColor" class="size-5" aria-hidden="true">
    <path fill-rule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0l-3.5-3.5a1 1 0 0 1 1.4-1.4l2.8 2.8 6.8-6.8a1 1 0 0 1 1.4 0Z" clip-rule="evenodd" />
  </svg>
  <span slot="title">Application withdrawn</span>
  Your application APP-2026-0041827 has been withdrawn.
  <div slot="actions">
    <aegov-button size="sm" appearance="link">Undo</aegov-button>
  </div>
</aegov-toast>
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-toast id="toast-slots-demo" variant="success" duration="0" position="top-right">
    <svg slot="icon" viewBox="0 0 20 20" fill="currentColor" class="size-5" aria-hidden="true"><path fill-rule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0l-3.5-3.5a1 1 0 0 1 1.4-1.4l2.8 2.8 6.8-6.8a1 1 0 0 1 1.4 0Z" clip-rule="evenodd" /></svg>
    <span slot="title">Application withdrawn</span>
    Your application APP-2026-0041827 has been withdrawn.
    <div slot="actions">
      <aegov-button size="sm" appearance="link">Undo</aegov-button>
    </div>
  </aegov-toast>
  <aegov-button size="sm" onclick="document.querySelector('#toast-slots-demo').show()">Show toast with title, icon and action</aegov-button>
</div>

Note that using the slots means writing the markup rather than using `window.aegovToast.show()`, whose `message` option only fills the default slot.

---

## Methods and events

```js
const toast = document.querySelector('#saved');

await toast.show();
await toast.close();
```

| Event | Detail | Description |
| --- | --- | --- |
| `aegovToastOpen` | `void` | The toast became visible. |
| `aegovToastClose` | `void` | The toast closed — by timeout, dismissal, or `close()`. |
| `aegovToastDismiss` | `void` | The user activated the dismiss button specifically. |

```js
toast.addEventListener('aegovToastDismiss', () => {
  // The user chose to dismiss, rather than letting it time out
  analytics.track('toast_dismissed');
});
```

---

## Composite example — save with undo

```js
async function withdrawApplication(id) {
  const previous = await api.withdraw(id);

  const toast = window.aegovToast.show({
    message: `Application ${id} has been withdrawn.`,
    variant: 'success',
    duration: 0,                    // persistent — it carries an action
    position: 'bottom-center',
  });

  // Add an Undo action to the slot the helper does not fill
  const actions = document.createElement('div');
  actions.slot = 'actions';

  const undo = document.createElement('aegov-button');
  undo.size = 'sm';
  undo.appearance = 'link';
  undo.textContent = 'Undo';
  undo.addEventListener('aegovButtonClick', async () => {
    await api.restore(previous);
    await toast.close();
    window.aegovToast.show({ message: 'Withdrawal reversed.', variant: 'info' });
  });

  actions.append(undo);
  toast.append(actions);
}
```

<div class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <aegov-button size="sm" variant="danger" appearance="outline" onclick="window.aegovToast.show({ message: 'Application APP-2026-0041827 has been withdrawn.', variant: 'success', duration: 0, position: 'bottom-center' })">Withdraw application</aegov-button>
</div>

The important detail is `duration: 0`. A toast carrying an Undo must not disappear before the user can reach it — and for a destructive action, Undo in a toast is only acceptable if it is genuinely reachable.

---

## RTL Support

Toasts are direction-aware. In an RTL document the containers anchor to the mirrored corners — `top-right` becomes visually top-left — the icon and dismiss button swap sides, and the progress bar depletes in the mirrored direction. The dismiss button's `aria-label` is translated automatically.

```js
window.aegovToast.show({
  message: 'تم حفظ تفضيلاتك.',
  variant: 'success',
  isProgressEnabled: true,
});
```

<div dir="rtl" class="p-6 bg-aeblack-50/60 shadow-lg rounded-lg mt-6 my-20 not-aegov">
  <div class="flex flex-wrap items-center gap-3">
    <aegov-button size="sm" appearance="soft" onclick="window.aegovToast.show({ message: 'تم حفظ تفضيلاتك.', variant: 'success', isProgressEnabled: true })">إظهار رسالة نجاح</aegov-button>
    <aegov-button size="sm" appearance="soft" onclick="window.aegovToast.show({ message: 'لم نتمكن من حفظ التغييرات.', variant: 'error' })">إظهار رسالة خطأ</aegov-button>
  </div>
</div>

**Set `dir` on `<html>`, not only on a wrapper.** The toast container is appended to `document.body`, so it inherits direction from the document — a `dir="rtl"` on some inner element will not reach it. This is the single most common RTL mistake with portalled components.

---

## API Reference

### Properties

| Property | Attribute | Description | Type | Default |
| --- | --- | --- | --- | --- |
| `variant` | `variant` | Controls the 4px coloured top border, and the announcement politeness. | `'default' \| 'error' \| 'warning' \| 'success' \| 'info'` | `'default'` |
| `appearance` | `appearance` | Light panel with dark text, or dark panel with light text. | `'soft' \| 'solid'` | `'soft'` |
| `position` | `position` | Which corner or edge the toast appears at. | `'top-left' \| 'top-center' \| 'top-right' \| 'bottom-left' \| 'bottom-center' \| 'bottom-right'` | `'top-right'` |
| `duration` | `duration` | Milliseconds before auto-close. **`0` means persistent.** | `number` | `5000` |
| `isDismissible` | `is-dismissible` | Renders a dismiss button. | `boolean` | `true` |
| `mode` | `mode` | How several toasts at the same position behave. | `'stack' \| 'rack'` | `'stack'` |
| `isProgressEnabled` | `is-progress-enabled` | Depleting progress bar. No effect when persistent. | `boolean` | `false` |

### Slots

| Slot | Description |
| --- | --- |
| _(default)_ | The message. |
| `icon` | Leading icon. There are no built-in icons. |
| `title` | Bold line above the message. |
| `actions` | Buttons or links below the message. |

### Events

| Event | Detail | Description |
| --- | --- | --- |
| `aegovToastOpen` | `void` | The toast became visible. |
| `aegovToastClose` | `void` | The toast closed for any reason. |
| `aegovToastDismiss` | `void` | The user activated the dismiss button. |

### Methods

| Method | Returns | Description |
| --- | --- | --- |
| `show()` | `Promise<void>` | Moves the toast into its position container and displays it. |
| `close()` | `Promise<void>` | Closes the toast early. |

### The portal

Toasts are moved into a container appended to `document.body`:

| Selector | Element |
| --- | --- |
| `.aegov-toast-container--{position}` | One container per position. |
| `.aegov-toast-container--rack` | Added in rack mode. |
| `.aegov-toast-container--expanded` | Added while a rack is expanded. |
| `.aegov-toast-rack-count` | The count badge on a collapsed rack. |
| `#aegov-toast-live-region` | The polite live region. |
| `#aegov-toast-live-region-assertive` | The assertive live region. |
| `[data-toast-index]` | Set on each toast in a rack, driving the layered offsets. |

Consequences:

- **Host styles do not reach a shown toast.** Style `.aegov-toast-container--*` globally instead.
- **`document.querySelector` inside your own container will not find it.** In tests, query the container.
- **Direction is inherited from the document.**

---

## Accessibility

### Built-in behaviour

- **Two persistent, visually hidden live regions are maintained on the body**, created once and reused:
  - `#aegov-toast-live-region` — `role="status" aria-live="polite" aria-atomic="true"`
  - `#aegov-toast-live-region-assertive` — `role="alert" aria-live="assertive" aria-atomic="true"`
- **The toast's text is announced through whichever region matches its variant**: `error` and `warning` go to the assertive region so they interrupt; `default`, `info` and `success` go to the polite one. The region's text is cleared and re-set so that two identical consecutive messages are both announced.
- Announcing through a **separate, persistent** region rather than the toast element itself is what makes toasts reliably announced at all — a live region must exist in the DOM *before* content changes inside it, which a freshly-inserted toast cannot satisfy.
- The dismiss button is a real `<button type="button">` with a translated `aria-label` and an `aria-hidden` icon.
- Rack mode expands on `focusin` as well as `mouseenter`, and only collapses when focus leaves the container — so keyboard users can reach toasts behind the top one.
- Layout uses logical properties, so positions mirror correctly in RTL.

### Developer responsibilities

- **Never put essential information in a toast.** It disappears, it can be missed entirely, and a user who was looking elsewhere has no way to retrieve it. Use a [Callout](aegov-callout.html) for anything that matters.
- **Make any toast with an action persistent** (`duration: 0`). An Undo button on a 5-second timer is not operable for many users, and fails WCAG 2.2 SC 2.2.1 on timing.
- **Give long messages longer durations**, or move them out of a toast entirely.
- **Choose the variant for meaning.** `error` and `warning` interrupt screen reader users mid-sentence; using them for a routine confirmation is disruptive.
- **Use one position per service**, and avoid bottom positions if you also use a bottom [Banner](aegov-banner.html).
- **Do not fire toasts in bursts.** Several assertive announcements in a row are unusable — batch the outcome into one message, or use `rack` mode with polite variants.
- **Set `dir` on `<html>`** for RTL, since the container is on the body.
- **Do not pass unescaped user input** as `message`; the helper assigns it as HTML.
- **Provide a durable record** for anything a user may need again — a notifications list, or a status on the page itself. The toast is the notification, not the record.
- **Mark a slotted `icon` as `aria-hidden="true"`.**

### Keyboard support

| Key | Action |
| --- | --- |
| `Tab` | Move focus into the toast's actions and dismiss button. In rack mode, entering the container expands it. |
| `Enter`, `Space` | Activate the focused control. |

The toast is not focused automatically — moving focus to a transient element would interrupt whatever the user was doing. This is also why the announcement goes through a live region instead.

---

## Where to next

- [Callout](aegov-callout.html) — for messages that must persist.
- [Banner](aegov-banner.html) — for site-wide announcements.
- [Modal](aegov-modal.html) — when the user must respond before continuing.
- [Button](aegov-button.html) — for the `actions` slot.
