# Toast

<p class="text-lg text-aeblack-500 mb-8">A toast is a lightweight, non-intrusive notification that appears temporarily to inform users about the result of an action or a system event. Toasts auto-dismiss after a set duration and can be stacked or racked at any screen corner.</p>

## Introduction

The `aegov-toast` component provides transient feedback messages that overlay the page without interrupting the user's workflow. Toasts are portal-based — they detach from their original DOM position and render inside a fixed container at one of **6 screen positions**.

The component supports **5 semantic variants**, **2 appearances** (soft and solid), **auto-dismiss with progress bar**, **stack and rack display modes**, and named slots for title, icon, and action buttons.

Toast is a **programmatic component** — you create a toast element, then call its `show()` method to display it. When it closes, it is automatically removed from the DOM.

```html
<aegov-toast id="demo-toast" variant="success" duration="5000">
  Your changes have been saved.
</aegov-toast>

<script>
  document.getElementById('demo-toast').show();
</script>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-button id="intro-trigger">Show Toast</aegov-button>
  <script>
    document.getElementById('intro-trigger').addEventListener('aegovButtonClick', function() {
      var t = document.createElement('aegov-toast');
      t.variant = 'success';
      t.duration = 4000;
      t.position = 'top-right';
      t.innerHTML = 'Your changes have been saved.';
      document.body.appendChild(t);
      t.show();
    });
  </script>
</div>

---

## Variants

The `variant` property controls the colour of the 4px top border, giving the toast semantic meaning. The rest of the toast appearance (background, text colour) is controlled by the `appearance` property.

| Variant    | Border Colour | Use Case                          |
|------------|---------------|-----------------------------------|
| `default`  | None (neutral)| General notifications             |
| `error`    | AERed         | Error messages, failed operations |
| `warning`  | Camel         | Warnings, important notices       |
| `success`  | AEGreen       | Success confirmations             |
| `info`     | TechBlue      | Informational messages            |

```html
<aegov-toast variant="default">Default notification</aegov-toast>
<aegov-toast variant="error">Something went wrong</aegov-toast>
<aegov-toast variant="warning">Please review your input</aegov-toast>
<aegov-toast variant="success">File uploaded successfully</aegov-toast>
<aegov-toast variant="info">A new version is available</aegov-toast>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 space-y-3 not-aegov">
  <div class="flex flex-wrap gap-2">
    <aegov-button id="var-default" size="sm">Default</aegov-button>
    <aegov-button id="var-error" size="sm" appearance="danger">Error</aegov-button>
    <aegov-button id="var-warning" size="sm" appearance="secondary">Warning</aegov-button>
    <aegov-button id="var-success" size="sm">Success</aegov-button>
    <aegov-button id="var-info" size="sm">Info</aegov-button>
  </div>
  <script>
    (function() {
      var variants = {
        'var-default': { variant: 'default', msg: 'Default notification' },
        'var-error': { variant: 'error', msg: 'Something went wrong' },
        'var-warning': { variant: 'warning', msg: 'Please review your input' },
        'var-success': { variant: 'success', msg: 'File uploaded successfully' },
        'var-info': { variant: 'info', msg: 'A new version is available' },
      };
      Object.keys(variants).forEach(function(id) {
        document.getElementById(id).addEventListener('aegovButtonClick', function() {
          var t = document.createElement('aegov-toast');
          t.variant = variants[id].variant;
          t.duration = 4000;
          t.position = 'top-right';
          t.innerHTML = variants[id].msg;
          document.body.appendChild(t);
          t.show();
        });
      });
    })();
  </script>
</div>

---

## Appearances

The `appearance` property controls the overall colour scheme of the toast. The variant-coloured top border is applied on top of this base appearance.

### Soft

The default appearance. White background with dark text — clean and unobtrusive.

```html
<aegov-toast appearance="soft" variant="info">
  Soft appearance with info border
</aegov-toast>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-button id="app-soft" size="sm">Show Soft Toast</aegov-button>
  <script>
    document.getElementById('app-soft').addEventListener('aegovButtonClick', function() {
      var t = document.createElement('aegov-toast');
      t.appearance = 'soft';
      t.variant = 'info';
      t.duration = 4000;
      t.position = 'top-right';
      t.innerHTML = 'Soft appearance with info border';
      document.body.appendChild(t);
      t.show();
    });
  </script>
</div>

### Solid

Dark background with light text — higher contrast, draws more attention.

```html
<aegov-toast appearance="solid" variant="error">
  Solid appearance with error border
</aegov-toast>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-button id="app-solid" size="sm">Show Solid Toast</aegov-button>
  <script>
    document.getElementById('app-solid').addEventListener('aegovButtonClick', function() {
      var t = document.createElement('aegov-toast');
      t.appearance = 'solid';
      t.variant = 'error';
      t.duration = 4000;
      t.position = 'top-right';
      t.innerHTML = 'Solid appearance with error border';
      document.body.appendChild(t);
      t.show();
    });
  </script>
</div>

---

## Positions

The `position` property determines which corner (or centre edge) of the viewport the toast appears in. There are six positions available.

| Position        | Description                |
|-----------------|----------------------------|
| `top-right`     | Default. Top-right corner. |
| `top-left`      | Top-left corner.           |
| `top-center`    | Top centre of viewport.    |
| `bottom-right`  | Bottom-right corner.       |
| `bottom-left`   | Bottom-left corner.        |
| `bottom-center` | Bottom centre of viewport. |

```html
<aegov-toast position="top-right">Top Right (default)</aegov-toast>
<aegov-toast position="bottom-center">Bottom Center</aegov-toast>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <div class="flex flex-wrap gap-2">
    <aegov-button id="pos-tr" size="sm">Top Right</aegov-button>
    <aegov-button id="pos-tl" size="sm">Top Left</aegov-button>
    <aegov-button id="pos-tc" size="sm">Top Center</aegov-button>
    <aegov-button id="pos-br" size="sm">Bottom Right</aegov-button>
    <aegov-button id="pos-bl" size="sm">Bottom Left</aegov-button>
    <aegov-button id="pos-bc" size="sm">Bottom Center</aegov-button>
  </div>
  <script>
    (function() {
      var positions = {
        'pos-tr': 'top-right',
        'pos-tl': 'top-left',
        'pos-tc': 'top-center',
        'pos-br': 'bottom-right',
        'pos-bl': 'bottom-left',
        'pos-bc': 'bottom-center',
      };
      Object.keys(positions).forEach(function(id) {
        document.getElementById(id).addEventListener('aegovButtonClick', function() {
          var t = document.createElement('aegov-toast');
          t.variant = 'info';
          t.duration = 3000;
          t.position = positions[id];
          t.innerHTML = 'Position: ' + positions[id];
          document.body.appendChild(t);
          t.show();
        });
      });
    })();
  </script>
</div>

---

## Duration and Auto-dismiss

The `duration` property controls how long the toast stays visible before automatically closing, in milliseconds. The default is `5000` (5 seconds). Set to `0` to disable auto-dismiss — the toast will remain until manually closed.

When the user hovers over a toast, the auto-dismiss timer pauses. It resumes when the mouse leaves.

```html
<!-- Auto-dismiss after 3 seconds -->
<aegov-toast duration="3000">Quick notification</aegov-toast>

<!-- No auto-dismiss — must be closed manually -->
<aegov-toast duration="0" is-dismissible>Persistent notification</aegov-toast>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <div class="flex flex-wrap gap-2">
    <aegov-button id="dur-short" size="sm">3 Second Toast</aegov-button>
    <aegov-button id="dur-long" size="sm">10 Second Toast</aegov-button>
    <aegov-button id="dur-none" size="sm">Persistent (no auto-dismiss)</aegov-button>
  </div>
  <script>
    (function() {
      document.getElementById('dur-short').addEventListener('aegovButtonClick', function() {
        var t = document.createElement('aegov-toast');
        t.variant = 'info';
        t.duration = 3000;
        t.position = 'top-right';
        t.innerHTML = 'This will close in 3 seconds.';
        document.body.appendChild(t);
        t.show();
      });
      document.getElementById('dur-long').addEventListener('aegovButtonClick', function() {
        var t = document.createElement('aegov-toast');
        t.variant = 'warning';
        t.duration = 10000;
        t.position = 'top-right';
        t.innerHTML = 'This will close in 10 seconds. Hover to pause.';
        document.body.appendChild(t);
        t.show();
      });
      document.getElementById('dur-none').addEventListener('aegovButtonClick', function() {
        var t = document.createElement('aegov-toast');
        t.variant = 'error';
        t.duration = 0;
        t.dismissible = true;
        t.position = 'top-right';
        t.innerHTML = 'This will stay until you close it.';
        document.body.appendChild(t);
        t.show();
      });
    })();
  </script>
</div>

---

## Progress Bar

Set `is-progress-enabled` to display an animated countdown bar at the bottom of the toast. The bar shrinks from left to right over the `duration` period. It pauses when the user hovers over the toast.

The progress bar colour matches the variant's semantic colour (e.g. red for error, green for success).

```html
<aegov-toast variant="success" duration="6000" is-progress-enabled>
  Upload complete!
</aegov-toast>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <div class="flex flex-wrap gap-2">
    <aegov-button id="prog-soft" size="sm">Soft + Progress</aegov-button>
    <aegov-button id="prog-solid" size="sm">Solid + Progress</aegov-button>
  </div>
  <script>
    (function() {
      document.getElementById('prog-soft').addEventListener('aegovButtonClick', function() {
        var t = document.createElement('aegov-toast');
        t.variant = 'success';
        t.appearance = 'soft';
        t.duration = 6000;
        t.showProgress = true;
        t.position = 'top-right';
        t.innerHTML = 'Upload complete! (soft with progress bar)';
        document.body.appendChild(t);
        t.show();
      });
      document.getElementById('prog-solid').addEventListener('aegovButtonClick', function() {
        var t = document.createElement('aegov-toast');
        t.variant = 'error';
        t.appearance = 'solid';
        t.duration = 6000;
        t.showProgress = true;
        t.position = 'top-right';
        t.innerHTML = 'Connection lost! (solid with progress bar)';
        document.body.appendChild(t);
        t.show();
      });
    })();
  </script>
</div>

---

## Dismissible

The `is-dismissible` property controls whether a close button is shown. It defaults to `true`. Set it to `false` to hide the dismiss button — the toast will only close via auto-dismiss or by calling the `close()` method programmatically.

```html
<!-- With dismiss button (default) -->
<aegov-toast is-dismissible>You can close this.</aegov-toast>

<!-- Without dismiss button -->
<aegov-toast is-dismissible="false" duration="3000">
  Auto-closing only.
</aegov-toast>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <div class="flex flex-wrap gap-2">
    <aegov-button id="dism-yes" size="sm">Dismissible</aegov-button>
    <aegov-button id="dism-no" size="sm">Not Dismissible (3s)</aegov-button>
  </div>
  <script>
    (function() {
      document.getElementById('dism-yes').addEventListener('aegovButtonClick', function() {
        var t = document.createElement('aegov-toast');
        t.variant = 'default';
        t.duration = 0;
        t.dismissible = true;
        t.position = 'top-right';
        t.innerHTML = 'Click the X to close.';
        document.body.appendChild(t);
        t.show();
      });
      document.getElementById('dism-no').addEventListener('aegovButtonClick', function() {
        var t = document.createElement('aegov-toast');
        t.variant = 'info';
        t.duration = 3000;
        t.dismissible = false;
        t.position = 'top-right';
        t.innerHTML = 'No dismiss button — auto-closes in 3s.';
        document.body.appendChild(t);
        t.show();
      });
    })();
  </script>
</div>

---

## Title Slot

Use the `title` named slot to add a bold heading above the description text. This is useful for toasts that need more context.

```html
<aegov-toast variant="error" duration="0">
  <span slot="title">Payment Failed</span>
  Your card was declined. Please try a different payment method.
</aegov-toast>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-button id="slot-title" size="sm">Show Toast with Title</aegov-button>
  <script>
    document.getElementById('slot-title').addEventListener('aegovButtonClick', function() {
      var t = document.createElement('aegov-toast');
      t.variant = 'error';
      t.duration = 0;
      t.position = 'top-right';
      t.innerHTML = '<span slot="title">Payment Failed</span>Your card was declined. Please try a different payment method.';
      document.body.appendChild(t);
      t.show();
    });
  </script>
</div>

---

## Icon Slot

Use the `icon` named slot to provide a custom icon displayed to the left of the content. The icon area is fixed-width and vertically aligned with the top of the text.

```html
<aegov-toast variant="success" duration="5000">
  <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" stroke-width="2"
       stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
    <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/>
    <polyline points="22 4 12 14.01 9 11.01"/>
  </svg>
  <span slot="title">Success</span>
  Your profile has been updated.
</aegov-toast>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-button id="slot-icon" size="sm">Show Toast with Icon</aegov-button>
  <script>
    document.getElementById('slot-icon').addEventListener('aegovButtonClick', function() {
      var t = document.createElement('aegov-toast');
      t.variant = 'success';
      t.duration = 5000;
      t.position = 'top-right';
      t.innerHTML = '<svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg><span slot="title">Success</span>Your profile has been updated.';
      document.body.appendChild(t);
      t.show();
    });
  </script>
</div>

---

## Actions Slot

Use the `actions` named slot to add action buttons or links below the description. This is useful for toasts that require user interaction, such as "Undo" or "View Details".

```html
<aegov-toast variant="warning" duration="0">
  <span slot="title">Unsaved Changes</span>
  You have unsaved changes that will be lost.
  <div slot="actions">
    <aegov-button size="sm" variant="outline">Discard</aegov-button>
    <aegov-button size="sm">Save Now</aegov-button>
  </div>
</aegov-toast>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-button id="slot-actions" size="sm">Show Toast with Actions</aegov-button>
  <script>
    document.getElementById('slot-actions').addEventListener('aegovButtonClick', function() {
      var t = document.createElement('aegov-toast');
      t.variant = 'warning';
      t.duration = 0;
      t.position = 'top-right';
      t.innerHTML = '<span slot="title">Unsaved Changes</span>You have unsaved changes that will be lost.<div slot="actions"><aegov-button size="sm" variant="outline">Discard</aegov-button> <aegov-button size="sm">Save Now</aegov-button></div>';
      document.body.appendChild(t);
      t.show();
    });
  </script>
</div>

---

## Complete Example

Combining icon, title, description, actions, and progress bar in a single toast.

```html
<aegov-toast variant="info" appearance="soft" duration="8000"
             is-progress-enabled position="top-right">
  <svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
       fill="none" stroke="currentColor" stroke-width="2"
       stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5">
    <circle cx="12" cy="12" r="10"/>
    <line x1="12" y1="16" x2="12" y2="12"/>
    <line x1="12" y1="8" x2="12.01" y2="8"/>
  </svg>
  <span slot="title">New Update Available</span>
  Version 2.4.0 is ready. Refresh to apply the latest improvements.
  <div slot="actions">
    <aegov-button size="sm" variant="soft">Later</aegov-button>
    <aegov-button size="sm">Refresh Now</aegov-button>
  </div>
</aegov-toast>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-button id="complete-demo" size="sm">Show Complete Toast</aegov-button>
  <script>
    document.getElementById('complete-demo').addEventListener('aegovButtonClick', function() {
      var t = document.createElement('aegov-toast');
      t.variant = 'info';
      t.appearance = 'soft';
      t.duration = 8000;
      t.showProgress = true;
      t.position = 'top-right';
      t.innerHTML = '<svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg><span slot="title">New Update Available</span>Version 2.4.0 is ready. Refresh to apply the latest improvements.<div slot="actions"><aegov-button size="sm" variant="soft">Later</aegov-button> <aegov-button size="sm">Refresh Now</aegov-button></div>';
      document.body.appendChild(t);
      t.show();
    });
  </script>
</div>

---

## Stack Mode (Default)

In stack mode, multiple toasts at the same position are displayed with a gap between each one, all fully visible. This is the default `mode`.

```html
<aegov-toast mode="stack" position="top-right">First toast</aegov-toast>
<aegov-toast mode="stack" position="top-right">Second toast</aegov-toast>
<aegov-toast mode="stack" position="top-right">Third toast</aegov-toast>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-button id="stack-demo" size="sm">Show 3 Stacked Toasts</aegov-button>
  <script>
    document.getElementById('stack-demo').addEventListener('aegovButtonClick', function() {
      var variants = ['success', 'warning', 'error'];
      var messages = ['First toast (success)', 'Second toast (warning)', 'Third toast (error)'];
      for (var i = 0; i < 3; i++) {
        (function(idx) {
          setTimeout(function() {
            var t = document.createElement('aegov-toast');
            t.variant = variants[idx];
            t.mode = 'stack';
            t.duration = 5000;
            t.position = 'top-right';
            t.innerHTML = messages[idx];
            document.body.appendChild(t);
            t.show();
          }, idx * 300);
        })(i);
      }
    });
  </script>
</div>

---

## Rack Mode

In rack mode, multiple toasts at the same position collapse into a compact deck. Only the newest toast is fully visible; older toasts peek out behind it with decreasing scale and opacity. A count badge shows how many toasts are in the rack.

**Hover over the rack to expand** all toasts and interact with them individually.

```html
<aegov-toast mode="rack" position="bottom-right">First toast</aegov-toast>
<aegov-toast mode="rack" position="bottom-right">Second toast</aegov-toast>
<aegov-toast mode="rack" position="bottom-right">Third toast</aegov-toast>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-button id="rack-demo" size="sm">Show 3 Racked Toasts</aegov-button>
  <script>
    document.getElementById('rack-demo').addEventListener('aegovButtonClick', function() {
      var variants = ['info', 'success', 'warning'];
      var messages = ['First notification', 'Second notification', 'Third notification'];
      for (var i = 0; i < 3; i++) {
        (function(idx) {
          setTimeout(function() {
            var t = document.createElement('aegov-toast');
            t.variant = variants[idx];
            t.mode = 'rack';
            t.duration = 10000;
            t.position = 'bottom-right';
            t.innerHTML = messages[idx];
            document.body.appendChild(t);
            t.show();
          }, idx * 300);
        })(i);
      }
    });
  </script>
</div>

---

## Programmatic API (Toast Helper)

The design system exposes a global `window.aegovToast.show()` helper function for creating toasts without manually constructing DOM elements. This is useful for quick notifications from event handlers or API callbacks.

```html
<script>
  // Simple message
  aegovToast.show({
    message: 'Settings saved successfully.',
    variant: 'success',
  });

  // Full options
  aegovToast.show({
    message: '<span slot="title">Error</span>Could not reach the server.',
    variant: 'error',
    appearance: 'solid',
    position: 'bottom-center',
    duration: 0,
    dismissible: true,
    mode: 'stack',
    showProgress: false,
  });
</script>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <div class="flex flex-wrap gap-2">
    <aegov-button id="helper-simple" size="sm">Simple Helper</aegov-button>
    <aegov-button id="helper-full" size="sm">Full Options Helper</aegov-button>
  </div>
  <script>
    document.getElementById('helper-simple').addEventListener('aegovButtonClick', function() {
      if (window.aegovToast) {
        aegovToast.show({
          message: 'Settings saved successfully.',
          variant: 'success',
          duration: 4000,
        });
      }
    });
    document.getElementById('helper-full').addEventListener('aegovButtonClick', function() {
      if (window.aegovToast) {
        aegovToast.show({
          message: '<span slot="title">Connection Error</span>Could not reach the server. Please check your internet connection.',
          variant: 'error',
          appearance: 'solid',
          position: 'top-center',
          duration: 0,
          dismissible: true,
          showProgress: false,
        });
      }
    });
  </script>
</div>

### Helper Options

| Option         | Type              | Default       | Description                                       |
|----------------|-------------------|---------------|---------------------------------------------------|
| `message`      | `string`          | (required)    | HTML content for the toast body. Can include named slots. |
| `variant`      | `ToastVariant`    | `'default'`   | Semantic variant for the top border colour.       |
| `appearance`   | `ToastAppearance` | `'soft'`      | Visual appearance (soft or solid).                |
| `position`     | `ToastPosition`   | `'top-right'` | Screen position for the toast.                    |
| `duration`     | `number`          | `5000`        | Auto-dismiss delay in ms. `0` = no auto-dismiss.  |
| `is-dismissible`  | `boolean`         | `true`        | Whether to show the close button.                 |
| `mode`         | `ToastMode`       | `'stack'`     | Display mode: `'stack'` or `'rack'`.              |
| `isProgressEnabled` | `boolean`         | `false`       | Whether to show the countdown progress bar.       |

---

## API Reference

### Properties

| Property       | Attribute       | Description                                                        | Type                                                                                          | Default       |
|----------------|-----------------|--------------------------------------------------------------------|-----------------------------------------------------------------------------------------------|---------------|
| `variant`      | `variant`       | Semantic colour variant for the top border                         | `'default'` \| `'error'` \| `'warning'` \| `'success'` \| `'info'`                           | `'default'`   |
| `appearance`   | `appearance`    | Visual appearance style                                            | `'soft'` \| `'solid'`                                                                         | `'soft'`      |
| `position`     | `position`      | Screen position where the toast appears                            | `'top-right'` \| `'top-left'` \| `'top-center'` \| `'bottom-right'` \| `'bottom-left'` \| `'bottom-center'` | `'top-right'` |
| `duration`     | `duration`      | Auto-dismiss duration in milliseconds. `0` disables auto-dismiss.  | `number`                                                                                      | `5000`        |
| `is-dismissible`  | `is-dismissible`   | Whether to show a close button                                     | `boolean`                                                                                     | `true`        |
| `mode`         | `mode`          | Display mode for multiple toasts at the same position              | `'stack'` \| `'rack'`                                                                         | `'stack'`     |
| `isProgressEnabled` | `is-progress-enabled` | Whether to show a countdown progress bar                           | `boolean`                                                                                     | `false`       |

### Methods

| Method   | Signature              | Description                                                        |
|----------|------------------------|--------------------------------------------------------------------|
| `show()` | `show() => Promise<void>` | Shows the toast with an enter animation. Moves the element into the portal container at the specified position. Starts the auto-dismiss timer if `duration > 0`. |
| `close()` | `close() => Promise<void>` | Closes the toast with an exit animation. After the animation (300ms), the element is removed from the DOM and the `aegovToastClose` event is emitted. |

### Events

| Event              | Description                                              | Detail Type |
|--------------------|----------------------------------------------------------|-------------|
| `aegovToastOpen`   | Emitted after the toast becomes visible (enter animation ends) | `void`      |
| `aegovToastClose`  | Emitted after the close animation completes and element is removed | `void`      |
| `aegovToastDismiss`| Emitted when the user clicks the dismiss button          | `void`      |

#### Listening to Events

```html
<aegov-toast id="my-toast" variant="info">Something happened</aegov-toast>

<script>
  var toast = document.getElementById('my-toast');

  toast.addEventListener('aegovToastOpen', function() {
    console.log('Toast is now visible');
  });

  toast.addEventListener('aegovToastClose', function() {
    console.log('Toast was removed from the DOM');
  });

  toast.addEventListener('aegovToastDismiss', function() {
    console.log('User clicked dismiss');
  });

  toast.show();
</script>
```

### Slots

| Slot        | Description                                                                   |
|-------------|-------------------------------------------------------------------------------|
| (default)   | The toast description text.                                                   |
| `title`     | Bold title text displayed above the description.                              |
| `icon`      | Custom icon displayed to the left of the content area.                        |
| `actions`   | Action buttons or links displayed below the description.                      |

---

## Accessibility

The `aegov-toast` component is designed with accessibility in mind. The following features are built in.

### Built-in Features

- **Screen reader announcements** — when a toast is shown, its text content is injected into a persistent `aria-live="polite"` live region in the DOM. This ensures screen readers announce the notification without requiring focus.
- **`role="status"`** — the live region uses `role="status"` so assistive technologies treat it as a non-urgent status update.
- **Dismiss button label** — the close button includes `aria-label` text that describes the variant (e.g. "Close error notification") so screen readers convey the action clearly.
- **Decorative icon** — the dismiss button's SVG icon is marked with `aria-hidden="true"` to prevent screen readers from announcing the icon path data.
- **Hover-to-pause** — when a user hovers over a toast, the auto-dismiss timer pauses, giving users with motor impairments more time to read and interact.

### Developer Responsibilities

1. **Keep toast messages concise.** Screen readers announce the full text content. Long messages may be truncated or overwhelming. If you need more detail, provide a link to a full-page view.

2. **Avoid critical actions in toasts.** Toasts are transient and auto-dismiss. Do not use them as the sole mechanism for critical user decisions. If actions are included via the `actions` slot, consider using `duration="0"` to prevent the toast from disappearing before the user can interact.

3. **Do not rely solely on colour.** The variant top border provides visual differentiation, but users with colour vision deficiencies may not perceive it. Use the `title` and `icon` slots to provide additional context.

---

## Notes

- The `aegov-toast` component uses **`scoped: true`** encapsulation. This is required because it is a portal component — the element is moved to a container on `document.body` when shown.
- Toasts are **automatically removed from the DOM** after closing. You do not need to manually clean up the element.
- A **module-level toast manager** tracks active toasts per position. When the last toast at a position closes, its portal container is also removed from the DOM.
- In **rack mode**, toasts are always prepended (newest first). CSS transforms create the stacking effect. Indices are recalculated when a toast is added or removed.
- The **progress bar** animation uses CSS `@keyframes` with `animation-play-state` toggled between `running` and `paused` on hover. The animation duration is set dynamically to match the `duration` prop.
- The **toast helper** (`window.aegovToast.show()`) is a convenience wrapper that creates and shows a toast in a single call. It is loaded as a global script and available on `window` after the component library initialises.
- The enter and exit animations slide in from the direction nearest to the screen edge. RTL layouts automatically flip the horizontal slide direction.
- Multiple toasts at the same position stack newest-first for top positions and newest-last for bottom positions, ensuring the most recent toast is always closest to the screen edge.
