/**
 * Native form actions for shadow-DOM controls.
 *
 * A native <button>/<input> rendered inside a shadow root has no form owner
 * (`.form === null`): the form lives in the light DOM, and form ownership does
 * not cross the shadow boundary. So the browser never runs its built-in
 * submit/reset activation or Enter-key implicit submission for these inner
 * elements. The host component has to run them itself. These helpers do that,
 * following the HTML spec algorithms closely enough that validation, the
 * `submit`/`reset` events and `preventDefault()` all keep working.
 */

/** Input types whose Enter key triggers implicit submission (HTML §4.10.21.2). */
const IMPLICIT_SUBMISSION_BLOCKING_TYPES = new Set([
  'text', 'search', 'url', 'tel', 'email', 'password',
  'date', 'month', 'week', 'time', 'datetime-local', 'number',
]);

/**
 * Resolve the <form> a host element belongs to. Uses ElementInternals when the
 * host is form-associated (honours the `form="id"` attribute exactly like a
 * native control), else falls back to the nearest ancestor <form>.
 */
export function getOwningForm(host: HTMLElement, internals: ElementInternals | null): HTMLFormElement | null {
  if (internals) {
    try {
      // A browser returns the form or null; undefined means an incomplete
      // ElementInternals (e.g. a test DOM), so fall back below.
      const form = internals.form;
      if (form !== undefined) return form;
    } catch {
      // Not actually form-associated in this runtime; fall through.
    }
  }
  return typeof host.closest === 'function' ? host.closest('form') : null;
}

/**
 * A form exposes its named controls as properties: a control with
 * `name="reset"` or `id="reset"` makes `form.reset` that control, not the
 * method (likewise `requestSubmit`, `elements`, `appendChild`, …). Native
 * buttons are immune because the browser runs the algorithm internally, so
 * look the method up on the prototype whenever the property has been shadowed.
 */
function formMethod<K extends 'reset' | 'requestSubmit'>(form: HTMLFormElement, name: K): HTMLFormElement[K] | undefined {
  const own = (form as unknown as Record<string, unknown>)[name];
  if (typeof own === 'function') return own as HTMLFormElement[K];
  const proto = typeof HTMLFormElement !== 'undefined' ? HTMLFormElement.prototype[name] : undefined;
  return typeof proto === 'function' ? proto : undefined;
}

/** The form's controls, even when a control is named "elements". */
function formControls(form: HTMLFormElement): Element[] {
  const getter = typeof HTMLFormElement !== 'undefined'
    ? Object.getOwnPropertyDescriptor(HTMLFormElement.prototype, 'elements')?.get
    : undefined;
  return Array.from((getter ? getter.call(form) : form.elements) as ArrayLike<Element>);
}

/**
 * Submit a form the way a native submit button does: constraint validation
 * runs, a cancelable `submit` event fires, and only then is the form submitted.
 */
export function submitForm(form: HTMLFormElement): void {
  const requestSubmit = formMethod(form, 'requestSubmit');
  if (requestSubmit) {
    requestSubmit.call(form);
    return;
  }
  // Older engines without requestSubmit(): a temporary native submit button
  // gets the same validation + submit event semantics.
  const temp = document.createElement('button');
  temp.type = 'submit';
  temp.hidden = true;
  Node.prototype.appendChild.call(form, temp);
  temp.click();
  temp.remove();
}

/** Reset a form the way a native reset button does (fires a cancelable `reset` event). */
export function resetForm(form: HTMLFormElement): void {
  formMethod(form, 'reset')?.call(form);
}

function isAegovSubmitButton(el: Element): boolean {
  return el.tagName === 'AEGOV-BUTTON' && (el as HTMLElement & { type?: string }).type === 'submit';
}

function isSubmitButton(el: Element): boolean {
  if (el instanceof HTMLButtonElement) return el.type === 'submit';
  if (el instanceof HTMLInputElement) return el.type === 'submit' || el.type === 'image';
  return isAegovSubmitButton(el);
}

function blocksImplicitSubmission(el: Element): boolean {
  if (el instanceof HTMLInputElement) return IMPLICIT_SUBMISSION_BLOCKING_TYPES.has(el.type);
  if (el.tagName === 'AEGOV-INPUT') {
    return IMPLICIT_SUBMISSION_BLOCKING_TYPES.has((el as HTMLElement & { type?: string }).type || 'text');
  }
  return false;
}

/**
 * HTML implicit submission (Enter in a single-line text field):
 * - if the form has a default button (its first submit button, in tree order),
 *   activate it with a click, so its own click handlers and disabled state apply;
 * - otherwise submit only if at most one field blocks implicit submission.
 * aegov-button[type=submit] counts as a submit button here.
 */
export function implicitlySubmit(form: HTMLFormElement): void {
  const controls = formControls(form);
  const defaultButton = controls.find(isSubmitButton);
  if (defaultButton) {
    if (isAegovSubmitButton(defaultButton)) {
      defaultButton.shadowRoot?.querySelector('button')?.click();
    } else {
      (defaultButton as HTMLElement).click();
    }
    return;
  }
  if (controls.filter(blocksImplicitSubmission).length <= 1) {
    submitForm(form);
  }
}

/**
 * Run `action` once the current event has finished dispatching, unless some
 * listener called `preventDefault()` on it. This matches native activation
 * behaviour: a submit button's form action and an input's implicit submission
 * run after every listener (including ones on ancestors) has had a chance to
 * cancel it. A listener on an ancestor would otherwise run after this
 * component's own shadow-internal listener and be unable to cancel.
 */
export function afterDispatchUnlessPrevented(event: Event, action: () => void): void {
  setTimeout(() => {
    if (!event.defaultPrevented) action();
  }, 0);
}
