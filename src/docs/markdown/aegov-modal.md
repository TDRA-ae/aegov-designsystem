# Modal

<p class="text-lg text-aeblack-500 mb-8">A modal dialog overlays the page to capture the user's attention for confirmations, forms, or important information. It blocks interaction with the underlying content until dismissed.</p>

## Introduction

Modals are a common pattern for focused interactions that require the user to acknowledge or complete a task before returning to the main page. The `aegov-modal` component provides a fully accessible dialog with **backdrop overlay**, **focus trapping**, **keyboard navigation**, **body scroll locking**, and **smooth open/close animations** out of the box.

Because the component uses **Shadow DOM** (`shadow: true`), you supply your own content via the default slot — including headers, body text, footers, and close buttons. The modal handles all the overlay mechanics for you.

```html
<aegov-button id="open-intro">Open Modal</aegov-button>

<aegov-modal id="intro-modal" aria-label="Example modal">
  <div style="padding: 2rem; max-width: 480px;">
    <h2 style="margin: 0 0 0.5rem;">Welcome</h2>
    <p style="margin: 0 0 1.5rem; color: #64748b;">This is a basic modal dialog.</p>
    <aegov-button id="close-intro">Close</aegov-button>
  </div>
</aegov-modal>

<script>
  document.getElementById('open-intro').addEventListener('aegovButtonClick', () => {
    document.getElementById('intro-modal').show();
  });
  document.getElementById('close-intro').addEventListener('aegovButtonClick', () => {
    document.getElementById('intro-modal').close();
  });
</script>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-button id="open-intro-demo">Open Modal</aegov-button>
  <aegov-modal id="intro-modal-demo" aria-label="Example modal">
    <div style="padding: 2rem; max-width: 480px;">
      <h2 style="margin: 0 0 0.5rem;">Welcome</h2>
      <p style="margin: 0 0 1.5rem; color: #64748b;">This is a basic modal dialog.</p>
      <aegov-button id="close-intro-demo">Close</aegov-button>
    </div>
  </aegov-modal>
  <script>
    document.getElementById('open-intro-demo').addEventListener('aegovButtonClick', () => {
      document.getElementById('intro-modal-demo').show();
    });
    document.getElementById('close-intro-demo').addEventListener('aegovButtonClick', () => {
      document.getElementById('intro-modal-demo').close();
    });
  </script>
</div>

---

## Positions

The `position` property controls where the modal appears on screen. There are three positions available.

| Position  | Description                                  |
|-----------|----------------------------------------------|
| `center`  | Default. Vertically and horizontally centred. |
| `top`     | Aligned to the top of the viewport.          |
| `bottom`  | Aligned to the bottom of the viewport.       |

### Centre (default)

```html
<aegov-modal position="center" aria-label="Centre modal">
  <!-- content -->
</aegov-modal>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-button id="open-center-demo">Open Centre Modal</aegov-button>
  <aegov-modal id="center-modal-demo" position="center" aria-label="Centre modal">
    <div style="padding: 2rem; max-width: 480px;">
      <h2 style="margin: 0 0 0.5rem;">Centre Position</h2>
      <p style="margin: 0 0 1.5rem; color: #64748b;">This modal appears in the centre of the viewport.</p>
      <aegov-button id="close-center-demo">Close</aegov-button>
    </div>
  </aegov-modal>
  <script>
    document.getElementById('open-center-demo').addEventListener('aegovButtonClick', () => {
      document.getElementById('center-modal-demo').show();
    });
    document.getElementById('close-center-demo').addEventListener('aegovButtonClick', () => {
      document.getElementById('center-modal-demo').close();
    });
  </script>
</div>

### Top

```html
<aegov-modal position="top" aria-label="Top modal">
  <!-- content -->
</aegov-modal>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-button id="open-top-demo">Open Top Modal</aegov-button>
  <aegov-modal id="top-modal-demo" position="top" aria-label="Top modal">
    <div style="padding: 2rem; max-width: 480px;">
      <h2 style="margin: 0 0 0.5rem;">Top Position</h2>
      <p style="margin: 0 0 1.5rem; color: #64748b;">This modal appears at the top of the viewport.</p>
      <aegov-button id="close-top-demo">Close</aegov-button>
    </div>
  </aegov-modal>
  <script>
    document.getElementById('open-top-demo').addEventListener('aegovButtonClick', () => {
      document.getElementById('top-modal-demo').show();
    });
    document.getElementById('close-top-demo').addEventListener('aegovButtonClick', () => {
      document.getElementById('top-modal-demo').close();
    });
  </script>
</div>

### Bottom

```html
<aegov-modal position="bottom" aria-label="Bottom modal">
  <!-- content -->
</aegov-modal>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-button id="open-bottom-demo">Open Bottom Modal</aegov-button>
  <aegov-modal id="bottom-modal-demo" position="bottom" aria-label="Bottom modal">
    <div style="padding: 2rem; max-width: 480px;">
      <h2 style="margin: 0 0 0.5rem;">Bottom Position</h2>
      <p style="margin: 0 0 1.5rem; color: #64748b;">This modal appears at the bottom of the viewport.</p>
      <aegov-button id="close-bottom-demo">Close</aegov-button>
    </div>
  </aegov-modal>
  <script>
    document.getElementById('open-bottom-demo').addEventListener('aegovButtonClick', () => {
      document.getElementById('bottom-modal-demo').show();
    });
    document.getElementById('close-bottom-demo').addEventListener('aegovButtonClick', () => {
      document.getElementById('bottom-modal-demo').close();
    });
  </script>
</div>

---

## Backdrop Opacity

The `overlay-opacity` attribute controls the darkness of the overlay behind the modal.

| Value   | Opacity |
|---------|---------|
| `light` | 30%     |
| `base`  | 50% (default) |
| `dark`  | 70%     |

```html
<aegov-modal overlay-opacity="light" aria-label="Light backdrop">...</aegov-modal>
<aegov-modal overlay-opacity="base" aria-label="Base backdrop">...</aegov-modal>
<aegov-modal overlay-opacity="dark" aria-label="Dark backdrop">...</aegov-modal>
```

<div class="flex flex-wrap gap-3 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-button id="open-light-demo">Light Backdrop</aegov-button>
  <aegov-button id="open-base-demo">Base Backdrop</aegov-button>
  <aegov-button id="open-dark-demo">Dark Backdrop</aegov-button>

  <aegov-modal id="light-modal-demo" overlay-opacity="light" aria-label="Light backdrop modal">
    <div style="padding: 2rem; max-width: 480px;">
      <h2 style="margin: 0 0 0.5rem;">Light Backdrop</h2>
      <p style="margin: 0 0 1.5rem; color: #64748b;">The backdrop is 30% opaque.</p>
      <aegov-button id="close-light-demo">Close</aegov-button>
    </div>
  </aegov-modal>

  <aegov-modal id="base-modal-demo" overlay-opacity="base" aria-label="Base backdrop modal">
    <div style="padding: 2rem; max-width: 480px;">
      <h2 style="margin: 0 0 0.5rem;">Base Backdrop</h2>
      <p style="margin: 0 0 1.5rem; color: #64748b;">The backdrop is 50% opaque (default).</p>
      <aegov-button id="close-base-demo">Close</aegov-button>
    </div>
  </aegov-modal>

  <aegov-modal id="dark-modal-demo" overlay-opacity="dark" aria-label="Dark backdrop modal">
    <div style="padding: 2rem; max-width: 480px;">
      <h2 style="margin: 0 0 0.5rem;">Dark Backdrop</h2>
      <p style="margin: 0 0 1.5rem; color: #64748b;">The backdrop is 70% opaque.</p>
      <aegov-button id="close-dark-demo">Close</aegov-button>
    </div>
  </aegov-modal>

  <script>
    ['light', 'base', 'dark'].forEach(level => {
      document.getElementById('open-' + level + '-demo').addEventListener('aegovButtonClick', () => {
        document.getElementById(level + '-modal-demo').show();
      });
      document.getElementById('close-' + level + '-demo').addEventListener('aegovButtonClick', () => {
        document.getElementById(level + '-modal-demo').close();
      });
    });
  </script>
</div>

---

## Closing Behaviour

### Backdrop Click

By default, clicking the backdrop closes the modal. Set `is-close-with-overlay="false"` to disable this behaviour, requiring the user to interact with an explicit close control.

```html
<!-- Backdrop click closes (default) -->
<aegov-modal is-close-with-overlay="true" aria-label="Closable modal">...</aegov-modal>

<!-- Backdrop click does NOT close -->
<aegov-modal is-close-with-overlay="false" aria-label="Persistent modal">...</aegov-modal>
```

<div class="flex flex-wrap gap-3 p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-button id="open-closable-demo">Backdrop Closes</aegov-button>
  <aegov-button id="open-persistent-demo">Backdrop Does Not Close</aegov-button>

  <aegov-modal id="closable-modal-demo" aria-label="Closable modal">
    <div style="padding: 2rem; max-width: 480px;">
      <h2 style="margin: 0 0 0.5rem;">Backdrop Closes</h2>
      <p style="margin: 0 0 1.5rem; color: #64748b;">Click the dark backdrop area to dismiss this modal.</p>
      <aegov-button id="close-closable-demo">Or Close Here</aegov-button>
    </div>
  </aegov-modal>

  <aegov-modal id="persistent-modal-demo" is-close-with-overlay="false" aria-label="Persistent modal">
    <div style="padding: 2rem; max-width: 480px;">
      <h2 style="margin: 0 0 0.5rem;">Persistent Modal</h2>
      <p style="margin: 0 0 1.5rem; color: #64748b;">Clicking the backdrop will not close this modal. You must use the button below or press Escape.</p>
      <aegov-button id="close-persistent-demo">Close</aegov-button>
    </div>
  </aegov-modal>

  <script>
    document.getElementById('open-closable-demo').addEventListener('aegovButtonClick', () => {
      document.getElementById('closable-modal-demo').show();
    });
    document.getElementById('close-closable-demo').addEventListener('aegovButtonClick', () => {
      document.getElementById('closable-modal-demo').close();
    });
    document.getElementById('open-persistent-demo').addEventListener('aegovButtonClick', () => {
      document.getElementById('persistent-modal-demo').show();
    });
    document.getElementById('close-persistent-demo').addEventListener('aegovButtonClick', () => {
      document.getElementById('persistent-modal-demo').close();
    });
  </script>
</div>

### Escape Key

Pressing the **Escape** key always closes the modal. This is a non-configurable accessibility requirement to ensure users are never trapped in a dialog. The `aegovModalEscapePress` event is emitted before the close action proceeds.

---

## Programmatic Methods

The modal exposes three asynchronous methods that can be called from JavaScript.

| Method     | Description                                |
|------------|--------------------------------------------|
| `show()`   | Opens the modal.                           |
| `close()`  | Closes the modal (respects `beforeClose`). |
| `toggle()` | Toggles between open and closed.           |

```html
<aegov-button id="toggle-btn">Toggle Modal</aegov-button>

<aegov-modal id="toggle-modal" aria-label="Toggle example">
  <div style="padding: 2rem; max-width: 480px;">
    <h2 style="margin: 0 0 0.5rem;">Toggle Demo</h2>
    <p style="margin: 0 0 1.5rem; color: #64748b;">Click the button again to toggle this modal.</p>
    <aegov-button id="close-toggle">Close</aegov-button>
  </div>
</aegov-modal>

<script>
  const modal = document.getElementById('toggle-modal');
  document.getElementById('toggle-btn').addEventListener('aegovButtonClick', () => {
    modal.toggle();
  });
  document.getElementById('close-toggle').addEventListener('aegovButtonClick', () => {
    modal.close();
  });
</script>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-button id="toggle-btn-demo">Toggle Modal</aegov-button>
  <aegov-modal id="toggle-modal-demo" aria-label="Toggle example">
    <div style="padding: 2rem; max-width: 480px;">
      <h2 style="margin: 0 0 0.5rem;">Toggle Demo</h2>
      <p style="margin: 0 0 1.5rem; color: #64748b;">Click the trigger button again to toggle this modal.</p>
      <aegov-button id="close-toggle-demo">Close</aegov-button>
    </div>
  </aegov-modal>
  <script>
    (function() {
      const modal = document.getElementById('toggle-modal-demo');
      document.getElementById('toggle-btn-demo').addEventListener('aegovButtonClick', () => {
        modal.toggle();
      });
      document.getElementById('close-toggle-demo').addEventListener('aegovButtonClick', () => {
        modal.close();
      });
    })();
  </script>
</div>

---

## Cancellable Close with beforeClose

The `aegovModalBeforeClose` event fires before the modal begins its closing animation. Call `event.detail.preventDefault()` to cancel the close and keep the modal open. This is useful for unsaved-changes confirmations or form validation.

```html
<aegov-modal id="confirm-modal" aria-label="Unsaved changes">
  <div style="padding: 2rem; max-width: 480px;">
    <h2 style="margin: 0 0 0.5rem;">Unsaved Changes</h2>
    <p style="margin: 0 0 1.5rem; color: #64748b;">You have unsaved changes. Close anyway?</p>
    <div style="display: flex; gap: 0.5rem;">
      <aegov-button id="confirm-yes" appearance="danger">Discard & Close</aegov-button>
      <aegov-button id="confirm-no" variant="outline">Keep Editing</aegov-button>
    </div>
  </div>
</aegov-modal>

<script>
  const modal = document.getElementById('confirm-modal');
  let allowClose = false;

  modal.addEventListener('aegovModalBeforeClose', (e) => {
    if (!allowClose) {
      e.detail.preventDefault();
    }
  });

  document.getElementById('confirm-yes').addEventListener('aegovButtonClick', () => {
    allowClose = true;
    modal.close();
  });

  document.getElementById('confirm-no').addEventListener('aegovButtonClick', () => {
    // preventDefault already keeps it open; just reset flag
    allowClose = false;
  });
</script>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-button id="open-confirm-demo">Open Guarded Modal</aegov-button>
  <aegov-modal id="confirm-modal-demo" aria-label="Unsaved changes">
    <div style="padding: 2rem; max-width: 480px;">
      <h2 style="margin: 0 0 0.5rem;">Unsaved Changes</h2>
      <p style="margin: 0 0 1.5rem; color: #64748b;">Backdrop click and Escape are blocked. You must explicitly choose an action.</p>
      <div style="display: flex; gap: 0.5rem;">
        <aegov-button id="confirm-yes-demo" appearance="danger">Discard & Close</aegov-button>
        <aegov-button id="confirm-no-demo" variant="outline">Keep Editing</aegov-button>
      </div>
    </div>
  </aegov-modal>
  <script>
    (function() {
      var modal = document.getElementById('confirm-modal-demo');
      var allowClose = false;
      document.getElementById('open-confirm-demo').addEventListener('aegovButtonClick', function() {
        allowClose = false;
        modal.show();
      });
      modal.addEventListener('aegovModalBeforeClose', function(e) {
        if (!allowClose) { e.detail.preventDefault(); }
      });
      document.getElementById('confirm-yes-demo').addEventListener('aegovButtonClick', function() {
        allowClose = true;
        modal.close();
      });
      document.getElementById('confirm-no-demo').addEventListener('aegovButtonClick', function() {
        allowClose = false;
      });
    })();
  </script>
</div>

---

## Body Scroll Lock

By default, the modal prevents the page from scrolling while it is open. Set `is-prevent-scroll="false"` to allow background scrolling.

```html
<!-- Body scroll locked (default) -->
<aegov-modal is-prevent-scroll="true" aria-label="Locked scroll">...</aegov-modal>

<!-- Body scroll allowed -->
<aegov-modal is-prevent-scroll="false" aria-label="Unlocked scroll">...</aegov-modal>
```

The scroll lock is reference-counted, so nesting multiple modals works correctly — scrolling is only restored when the last overlay closes.

---

## Slotted Content Patterns

The modal uses a single default slot. You are responsible for structuring the content inside it. Below are common layout patterns.

### Header, Body, and Footer

```html
<aegov-modal id="structured-modal" aria-label="Structured modal">
  <div style="max-width: 540px;">
    <!-- Header -->
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 1.5rem; border-bottom: 1px solid #e2e8f0;">
      <h2 style="margin: 0; font-size: 1.25rem;">Modal Title</h2>
      <aegov-button icon variant="soft" appearance="neutralMax" aria-label="Close" id="close-structured">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </aegov-button>
    </div>
    <!-- Body -->
    <div style="padding: 1.5rem;">
      <p style="margin: 0; color: #64748b;">Place your main content here — forms, text, images, or any HTML.</p>
    </div>
    <!-- Footer -->
    <div style="display: flex; justify-content: flex-end; gap: 0.5rem; padding: 1.5rem; border-top: 1px solid #e2e8f0;">
      <aegov-button variant="outline" id="cancel-structured">Cancel</aegov-button>
      <aegov-button id="save-structured">Save Changes</aegov-button>
    </div>
  </div>
</aegov-modal>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-button id="open-structured-demo">Open Structured Modal</aegov-button>
  <aegov-modal id="structured-modal-demo" aria-label="Structured modal">
    <div style="max-width: 540px;">
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 1.5rem; border-bottom: 1px solid #e2e8f0;">
        <h2 style="margin: 0; font-size: 1.25rem;">Modal Title</h2>
        <aegov-button icon variant="soft" appearance="neutralMax" size="sm" aria-label="Close" id="close-structured-demo">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
        </aegov-button>
      </div>
      <div style="padding: 1.5rem;">
        <p style="margin: 0; color: #64748b;">Place your main content here — forms, text, images, or any HTML.</p>
      </div>
      <div style="display: flex; justify-content: flex-end; gap: 0.5rem; padding: 1.5rem; border-top: 1px solid #e2e8f0;">
        <aegov-button variant="outline" id="cancel-structured-demo">Cancel</aegov-button>
        <aegov-button id="save-structured-demo">Save Changes</aegov-button>
      </div>
    </div>
  </aegov-modal>
  <script>
    (function() {
      const modal = document.getElementById('structured-modal-demo');
      document.getElementById('open-structured-demo').addEventListener('aegovButtonClick', () => modal.show());
      document.getElementById('close-structured-demo').addEventListener('aegovButtonClick', () => modal.close());
      document.getElementById('cancel-structured-demo').addEventListener('aegovButtonClick', () => modal.close());
      document.getElementById('save-structured-demo').addEventListener('aegovButtonClick', () => modal.close());
    })();
  </script>
</div>

### Confirmation Dialog

```html
<aegov-modal id="delete-modal" is-close-with-overlay="false" aria-label="Delete confirmation">
  <div style="padding: 2rem; max-width: 400px; text-align: center;">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 48px; height: 48px; margin: 0 auto 1rem;">
      <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
    </svg>
    <h2 style="margin: 0 0 0.5rem;">Delete Item?</h2>
    <p style="margin: 0 0 1.5rem; color: #64748b;">This action cannot be undone.</p>
    <div style="display: flex; justify-content: center; gap: 0.5rem;">
      <aegov-button variant="outline" id="cancel-delete">Cancel</aegov-button>
      <aegov-button appearance="danger" id="confirm-delete">Delete</aegov-button>
    </div>
  </div>
</aegov-modal>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-button appearance="danger" id="open-delete-demo">Delete Item</aegov-button>
  <aegov-modal id="delete-modal-demo" is-close-with-overlay="false" aria-label="Delete confirmation">
    <div style="padding: 2rem; max-width: 400px; text-align: center;">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="width: 48px; height: 48px; margin: 0 auto 1rem;">
        <circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>
      </svg>
      <h2 style="margin: 0 0 0.5rem;">Delete Item?</h2>
      <p style="margin: 0 0 1.5rem; color: #64748b;">This action cannot be undone.</p>
      <div style="display: flex; justify-content: center; gap: 0.5rem;">
        <aegov-button variant="outline" id="cancel-delete-demo">Cancel</aegov-button>
        <aegov-button appearance="danger" id="confirm-delete-demo">Delete</aegov-button>
      </div>
    </div>
  </aegov-modal>
  <script>
    (function() {
      const modal = document.getElementById('delete-modal-demo');
      document.getElementById('open-delete-demo').addEventListener('aegovButtonClick', () => modal.show());
      document.getElementById('cancel-delete-demo').addEventListener('aegovButtonClick', () => modal.close());
      document.getElementById('confirm-delete-demo').addEventListener('aegovButtonClick', () => modal.close());
    })();
  </script>
</div>

---

## Events

The modal emits five custom events to let you react to lifecycle changes.

```html
<aegov-modal id="events-modal" aria-label="Events demo">
  <div style="padding: 2rem; max-width: 480px;">
    <h2 style="margin: 0 0 1rem;">Events Demo</h2>
    <aegov-button id="close-events">Close</aegov-button>
  </div>
</aegov-modal>

<script>
  const modal = document.getElementById('events-modal');

  modal.addEventListener('aegovModalOpen', () => {
    console.log('Modal opened');
  });

  modal.addEventListener('aegovModalClose', () => {
    console.log('Modal closed');
  });

  modal.addEventListener('aegovModalBeforeClose', (e) => {
    console.log('Before close — call e.detail.preventDefault() to cancel');
  });

  modal.addEventListener('aegovModalBackdropClick', () => {
    console.log('Backdrop clicked');
  });

  modal.addEventListener('aegovModalEscapePress', () => {
    console.log('Escape key pressed');
  });
</script>
```

<div class="p-6 bg-aeblack-50 rounded-lg my-6 not-aegov">
  <aegov-button id="open-events-demo">Open Events Modal</aegov-button>
  <div id="events-log" style="margin-top: 1rem; padding: 0.75rem; background: #1e293b; color: #e2e8f0; border-radius: 0.5rem; font-family: monospace; font-size: 0.8rem; max-height: 150px; overflow-y: auto;">Event log:<br></div>
  <aegov-modal id="events-modal-demo" aria-label="Events demo">
    <div style="padding: 2rem; max-width: 480px;">
      <h2 style="margin: 0 0 1rem;">Events Demo</h2>
      <p style="margin: 0 0 1rem; color: #64748b;">Open the browser console or watch the log below. Try clicking the backdrop, pressing Escape, or using the close button.</p>
      <aegov-button id="close-events-demo">Close</aegov-button>
    </div>
  </aegov-modal>
  <script>
    (function() {
      const modal = document.getElementById('events-modal-demo');
      const log = document.getElementById('events-log');
      function logEvent(name) {
        log.innerHTML += '<span style="color:#facc15">' + name + '</span><br>';
        log.scrollTop = log.scrollHeight;
      }
      document.getElementById('open-events-demo').addEventListener('aegovButtonClick', () => modal.show());
      document.getElementById('close-events-demo').addEventListener('aegovButtonClick', () => modal.close());
      modal.addEventListener('aegovModalOpen', () => logEvent('aegovModalOpen'));
      modal.addEventListener('aegovModalClose', () => logEvent('aegovModalClose'));
      modal.addEventListener('aegovModalBeforeClose', () => logEvent('aegovModalBeforeClose'));
      modal.addEventListener('aegovModalBackdropClick', () => logEvent('aegovModalBackdropClick'));
      modal.addEventListener('aegovModalEscapePress', () => logEvent('aegovModalEscapePress'));
    })();
  </script>
</div>

---

## API Reference

### Properties

| Property             | Attribute              | Description                                     | Type                                    | Default    |
|----------------------|------------------------|-------------------------------------------------|-----------------------------------------|------------|
| `open`               | `open`                 | Whether the modal is currently visible          | `boolean`                               | `false`    |
| `isCloseWithOverlay`  | `is-close-with-overlay`  | Whether clicking the backdrop closes the modal  | `boolean`                               | `true`     |
| `isPreventScroll`  | `is-prevent-scroll`  | Whether to lock body scroll when open           | `boolean`                               | `true`     |
| `overlayOpacity`    | `overlay-opacity`     | Backdrop darkness level                         | `'light'` \| `'base'` \| `'dark'`      | `'base'`   |
| `position`           | `position`             | Position of the modal on screen                 | `'center'` \| `'top'` \| `'bottom'`    | `'center'` |

### Events

| Event                       | Description                                         | Detail Type                              |
|-----------------------------|-----------------------------------------------------|------------------------------------------|
| `aegovModalOpen`            | Emitted when the modal is opened                    | `void`                                   |
| `aegovModalClose`           | Emitted when the modal has finished closing         | `void`                                   |
| `aegovModalBeforeClose`     | Emitted before close begins (cancellable)           | `{ preventDefault: () => void }`         |
| `aegovModalBackdropClick`   | Emitted when the backdrop is clicked                | `MouseEvent`                             |
| `aegovModalEscapePress`     | Emitted when the Escape key is pressed              | `KeyboardEvent`                          |

> **Cancelling a close:** Listen for `aegovModalBeforeClose` and call `event.detail.preventDefault()` to prevent the modal from closing.

### Methods

| Method     | Signature              | Description                                |
|------------|------------------------|--------------------------------------------|
| `show()`   | `show(): Promise<void>`   | Programmatically opens the modal.          |
| `close()`  | `close(): Promise<void>`  | Programmatically closes the modal.         |
| `toggle()` | `toggle(): Promise<void>` | Toggles between open and closed states.    |

### Slots

| Slot      | Description                                                                                  |
|-----------|----------------------------------------------------------------------------------------------|
| (default) | All modal content — headers, body, footers, close buttons. You control the entire layout.   |

### Pass-Through Attributes

The component forwards `aria-*` and `data-*` attributes from the host element to the inner dialog container. Use `aria-label` or `aria-labelledby` to provide an accessible name for the dialog.

```html
<aegov-modal aria-label="Payment confirmation" data-analytics="payment-modal">
  <!-- content -->
</aegov-modal>
```

---

## Accessibility

The `aegov-modal` component is built with accessibility as a first-class concern. The following features are included out of the box.

### Built-in Features

- **`role="dialog"`** — the inner content container is marked with `role="dialog"` so assistive technologies announce it as a dialog.
- **`aria-modal="true"`** — tells screen readers that content behind the modal is inert and should not be interacted with.
- **Focus trapping** — when the modal opens, focus is moved to the first focusable element inside the slot content. Tab and Shift+Tab cycle through focusable elements without leaving the modal.
- **Focus restoration** — when the modal closes, focus returns to the element that was focused before the modal opened (the trigger element).
- **Escape key** — pressing Escape always closes the modal. This is intentionally non-configurable to ensure users are never trapped.
- **Body scroll lock** — prevents confusing scroll behaviour while the modal is visible.
- **Reduced motion** — when `prefers-reduced-motion: reduce` is active, all open/close animations are disabled for users who are sensitive to motion.
- **Pass-through `aria-*` attributes** — attributes like `aria-label`, `aria-labelledby`, and `aria-describedby` placed on the host element are forwarded to the dialog container.

### Developer Responsibilities

The following items require action from the developer implementing the component:

1. **Always provide an accessible name.** Every modal must have either `aria-label` or `aria-labelledby` on the host element so screen readers can announce the dialog's purpose.

   ```html
   <!-- Using aria-label -->
   <aegov-modal aria-label="Confirm deletion">...</aegov-modal>

   <!-- Using aria-labelledby -->
   <aegov-modal aria-labelledby="modal-heading">
     <h2 id="modal-heading">Confirm Deletion</h2>
     ...
   </aegov-modal>
   ```

2. **Include a visible close mechanism.** Although Escape always works, sighted users expect a close button (typically an X icon in the header or a "Cancel" button in the footer).

3. **Do not remove focus styles.** The focus trap relies on visible focus indicators. Avoid overriding `outline` styles on elements inside the modal.

4. **Test with a screen reader.** Verify that the dialog is announced correctly, that content behind the modal is unreachable, and that focus returns to the trigger on close.

---

## Notes

- The `aegov-modal` component uses **Shadow DOM** (`shadow: true`). This means internal styles are fully encapsulated and you style the slotted content using regular CSS from the light DOM.
- The modal **portals itself to `document.body`** on connection. This ensures correct stacking order regardless of where the element is placed in the source HTML.
- The `is-open` property is **reflected** to an attribute. You can set it declaratively (`<aegov-modal is-open>`) or programmatically via the `show()`, `close()`, and `toggle()` methods.
- **Z-index management** is automatic. Each modal receives a unique z-index from a shared overlay stack, so nested or sequential modals always layer correctly.
- Open and close **animations** use a 200ms cubic-bezier transition. The backdrop fades in/out while the content panel scales and fades. When `prefers-reduced-motion` is active, these animations are skipped.
- The `close()` method and all implicit close triggers (backdrop click, Escape) go through `aegovModalBeforeClose`, making the cancellation mechanism consistent regardless of how the close was initiated.
- The body scroll lock is **reference-counted**. If two modals are open at the same time, scrolling is only restored when the last one closes.
