/**
 * Shared portal element lifecycle for components that append content to document.body.
 * Used by dropdown, toast, datepicker, and similar portal-based components.
 */

/**
 * Create a portal div on document.body with the given CSS class name.
 */
export function createPortal(className: string): HTMLDivElement {
  const el = document.createElement('div');
  el.className = className;
  document.body.appendChild(el);
  return el;
}

/**
 * Remove a portal div from document.body and return undefined (for easy assignment).
 */
export function removePortal(el: HTMLDivElement | undefined): undefined {
  if (el && el.parentNode === document.body) {
    document.body.removeChild(el);
  }
  return undefined;
}

/*
 * Host relocation for overlays (aegov-modal, aegov-drawer) — "move while open,
 * only when trapped".
 *
 * An open overlay's backdrop and panel are `position: fixed`. They cover the
 * viewport from wherever the host is declared — unless an ancestor traps them:
 * a containing block for fixed elements (transform, filter, contain, …), a
 * stacking context that other content can cover (z-index, opacity, sticky, …),
 * or a hidden / inert ancestor. Only then is the host moved, and only out of
 * the outermost such ancestor (overlayContainer()); document.body is the last
 * resort. Staying as deep as possible keeps the overlay inside the app's root
 * element, where React listens for events: content moved outside it would get
 * no onClick / onChange from React at all.
 *
 * When it is moved, the host is owned by
 * whatever rendered it (React, Angular, Vue, plain DOM code), and that owner
 * keeps addressing it at the position it declared it: React calls
 * `parent.removeChild(host)` / `parent.insertBefore(x, host)`, Angular and Vue
 * remove an ancestor and expect the host to go with it, SSR hydration looks
 * for it in place. A host that permanently lives in body therefore crashes
 * React ("removeChild: not a child of this node"), and piles up orphan copies
 * when an ancestor is removed.
 *
 * So the move only lasts while the overlay is open:
 *  - relocateHost(): leave a comment placeholder where the host was and
 *    append the host to the container overlayContainer() chose.
 *  - restoreHost(): on close, put the host back at the placeholder.
 *  - While relocated, the placeholder stands in for the host: the original
 *    parent's removeChild / insertBefore / appendChild treat a call naming the
 *    host as a call on the placeholder (removing the host from its container
 *    too, in the removeChild case). That is what lets React, Vue and Angular keep
 *    manipulating "their" node.
 *  - A MutationObserver notices when the placeholder leaves the document
 *    (an ancestor was removed) and puts the host back beside it, so it leaves
 *    with its declared subtree and its disconnectedCallback cleans up.
 *
 * None of this runs from inside connectedCallback/disconnectedCallback, which
 * is what caused the old "Maximum call stack size exceeded" loop (removing the
 * host from inside its own disconnect). Callers must still ignore the
 * disconnect/connect pair their own relocate/restore call triggers.
 */

/** Whether `el`'s parent lays it out as a flex or grid item (z-index then creates a stacking context). */
function isFlexOrGridItem(el: Element): boolean {
  const parent = el.parentElement;
  return !!parent && /(^|-)(flex|grid)$/.test(getComputedStyle(parent).display);
}

/**
 * Whether `el` traps a `position: fixed` overlay declared inside it: it is a
 * containing block for fixed descendants (the overlay would size to it, not
 * the viewport), a stacking context (content outside it can cover the overlay
 * whatever its z-index), or it hides or disables its content.
 */
function trapsFixedOverlay(el: Element): boolean {
  const style = getComputedStyle(el);
  // Spec tests run on a DOM without computed styles: nothing traps there.
  if (typeof style.getPropertyValue !== 'function') return false;
  const value = (prop: string) => style.getPropertyValue(prop).trim();
  const set = (prop: string, unset = 'none') => { const v = value(prop); return v !== '' && v !== unset; };

  if (value('display') === 'none' || /^(hidden|collapse)$/.test(value('visibility'))) return true;
  if (el.hasAttribute('inert') || el.getAttribute('aria-hidden') === 'true') return true;
  if (el.localName === 'details' && !el.hasAttribute('open')) return true;
  if (value('content-visibility') === 'hidden' || value('content-visibility') === 'auto') return true;

  const position = value('position');
  if (position === 'fixed' || position === 'sticky') return true;
  if (value('z-index') !== 'auto' && value('z-index') !== '' && (position !== 'static' || isFlexOrGridItem(el))) return true;
  if (value('opacity') !== '' && parseFloat(value('opacity')) < 1) return true;
  if (['transform', 'translate', 'rotate', 'scale', 'filter', 'backdrop-filter', 'perspective', 'clip-path', 'mask-image'].some(p => set(p))) return true;
  if (set('mix-blend-mode', 'normal') || value('isolation') === 'isolate') return true;
  if (/\b(layout|paint|strict|content)\b/.test(value('contain'))) return true;
  if (/\b(transform|translate|rotate|scale|filter|backdrop-filter|perspective|opacity|z-index|contain|clip-path|mask)\b/.test(value('will-change'))) return true;
  if (set('container-type', 'normal')) return true;
  return false;
}

/**
 * Where an open overlay host has to move so no ancestor traps it: the parent
 * of the outermost trapping ancestor (crossing shadow roots), or null when no
 * ancestor traps it and it can open where it was declared.
 */
export function overlayContainer(host: HTMLElement): Node | null {
  if (typeof document === 'undefined' || !document.body) return null;
  let outermost: Element | null = null;
  let node: Node = host;
  for (;;) {
    let parent: Node | null = node.parentNode;
    if (parent && parent.nodeType === 11) parent = (parent as ShadowRoot).host ?? null;
    if (!parent || parent.nodeType !== 1 || parent === document.body || parent === document.documentElement) break;
    if (trapsFixedOverlay(parent as Element)) outermost = parent as Element;
    node = parent;
  }
  return outermost ? (outermost.parentNode ?? document.body) : null;
}

const relocated = new Map<HTMLElement, Comment>();
let relocationObserver: MutationObserver | null = null;

type PatchedMethod = 'removeChild' | 'insertBefore' | 'appendChild';
const PATCHED_METHODS: PatchedMethod[] = ['removeChild', 'insertBefore', 'appendChild'];
const patchedParents = new Map<Node, Partial<Record<PatchedMethod, PropertyDescriptor | undefined>>>();

/**
 * Call `parent`'s own, un-patched DOM method: the one it had before we patched
 * it (if it already had an own override), else the one from its prototype.
 */
function callOriginal(parent: Node, method: PatchedMethod, ...args: (Node | null)[]): any {
  const saved = patchedParents.get(parent)?.[method];
  const fn: Function = saved && typeof saved.value === 'function'
    ? saved.value
    : (Object.getPrototypeOf(parent) as any)[method];
  return fn.apply(parent, args);
}

/** The placeholder standing in for `node` inside `parent`, if `node` is a relocated host declared there. */
function standInFor(parent: Node, node: Node | null): Comment | null {
  if (!node) return null;
  const placeholder = relocated.get(node as HTMLElement);
  return placeholder && placeholder.parentNode === parent ? placeholder : null;
}

function patchParent(parent: Node): void {
  if (patchedParents.has(parent)) return;
  const saved: Partial<Record<PatchedMethod, PropertyDescriptor | undefined>> = {};
  for (const m of PATCHED_METHODS) saved[m] = Object.getOwnPropertyDescriptor(parent, m);
  patchedParents.set(parent, saved);
  const p = parent as any;

  p.removeChild = function <T extends Node>(this: Node, child: T): T {
    const placeholder = standInFor(this, child);
    if (!placeholder) return callOriginal(this, 'removeChild', child) as T;
    // The owner is removing the overlay it declared here: drop the
    // placeholder and take the host out of body.
    releaseHost(child as unknown as HTMLElement);
    (child as unknown as HTMLElement).remove();
    return child;
  };
  p.insertBefore = function <T extends Node>(this: Node, node: T, ref: Node | null): T {
    const refPlaceholder = standInFor(this, ref);
    const nodePlaceholder = standInFor(this, node);
    if (nodePlaceholder) {
      // The owner is moving the (relocated) host within its parent: move the placeholder.
      callOriginal(this, 'insertBefore', nodePlaceholder, refPlaceholder || ref);
      return node;
    }
    return callOriginal(this, 'insertBefore', node, refPlaceholder || ref) as T;
  };
  p.appendChild = function <T extends Node>(this: Node, node: T): T {
    const nodePlaceholder = standInFor(this, node);
    if (nodePlaceholder) {
      callOriginal(this, 'appendChild', nodePlaceholder);
      return node;
    }
    return callOriginal(this, 'appendChild', node) as T;
  };
}

function unpatchParentIfUnused(parent: Node | null): void {
  if (!parent || !patchedParents.has(parent)) return;
  for (const placeholder of relocated.values()) {
    if (placeholder.parentNode === parent) return;
  }
  const saved = patchedParents.get(parent)!;
  patchedParents.delete(parent);
  for (const m of PATCHED_METHODS) {
    const desc = saved[m];
    if (desc) Object.defineProperty(parent, m, desc);
    else delete (parent as any)[m];
  }
}

function checkPlaceholders(): void {
  for (const [host, placeholder] of Array.from(relocated)) {
    if (placeholder.isConnected) continue;
    // An ancestor of the declared position was removed. Put the host back
    // where it was declared so it leaves together with that subtree (its
    // disconnectedCallback then releases scroll lock / z-index / listeners).
    // If that subtree is later re-attached (Vue <KeepAlive>, Angular view
    // re-insertion), the host comes back with it.
    const parent = placeholder.parentNode;
    if (parent) {
      callOriginal(parent, 'insertBefore', host, placeholder);
      releaseHost(host);
    } else {
      releaseHost(host);
      host.remove();
    }
  }
}

function observeRoot(root: Node): void {
  if (typeof MutationObserver === 'undefined') return;
  if (!relocationObserver) relocationObserver = new MutationObserver(checkPlaceholders);
  relocationObserver.observe(root, { childList: true, subtree: true });
}

/** Forget a relocated host: remove its placeholder and parent patches. Does not move the host. */
function releaseHost(host: HTMLElement): void {
  const placeholder = relocated.get(host);
  if (!placeholder) return;
  relocated.delete(host);
  const parent = placeholder.parentNode;
  if (parent) callOriginal(parent, 'removeChild', placeholder);
  unpatchParentIfUnused(parent);
  if (relocated.size === 0 && relocationObserver) {
    relocationObserver.disconnect();
    relocationObserver = null;
  }
}

/**
 * Move an open overlay host out of any ancestor that traps it (see
 * overlayContainer()). Returns true if the host was moved (the caller sees a
 * synchronous disconnect/connect pair for it and must ignore both). No-op if
 * nothing traps it, it is already relocated, or it is not in the document.
 */
export function relocateHost(host: HTMLElement): boolean {
  if (typeof document === 'undefined' || !document.body) return false;
  if (relocated.has(host) || !host.isConnected) return false;
  const parent = host.parentNode;
  if (!parent) return false;
  const container = overlayContainer(host);
  if (!container) return false;
  const placeholder = document.createComment(` ${host.tagName.toLowerCase()} (open, moved out of a trapping ancestor) `);
  callOriginal(parent, 'insertBefore', placeholder, host);
  container.appendChild(host);
  // Register and patch only once the host has left its parent, so the move
  // itself can never be mistaken for the owner removing it.
  relocated.set(host, placeholder);
  patchParent(parent);
  observeRoot(document);
  // Also watch the declared position's own shadow root, if it is in one:
  // `subtree` observation of document does not see inside shadow trees.
  const root = typeof placeholder.getRootNode === 'function' ? placeholder.getRootNode() : document;
  if (root !== document) observeRoot(root);
  return true;
}

/**
 * Put a relocated host back where it was declared (on close). Returns true if
 * the host was moved (again: the caller must ignore the disconnect/connect pair).
 */
export function restoreHost(host: HTMLElement): boolean {
  const placeholder = relocated.get(host);
  if (!placeholder) return false;
  const parent = placeholder.parentNode;
  if (parent) callOriginal(parent, 'insertBefore', host, placeholder);
  releaseHost(host);
  return !!parent;
}

/**
 * Call from the overlay's disconnectedCallback when the disconnect was NOT
 * caused by relocate/restore: the owner removed the host itself (e.g.
 * `host.remove()`, or Vue removing it via its current parentNode), so the
 * placeholder left at the declared position must go too.
 */
export function forgetRelocatedHost(host: HTMLElement): void {
  releaseHost(host);
}

/** Whether the host is currently relocated out of its declared position. */
export function isHostRelocated(host: HTMLElement): boolean {
  return relocated.has(host);
}
