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
 * Host relocation for overlays (aegov-modal, aegov-drawer) — "portal while open".
 *
 * An open overlay must escape any ancestor stacking context / containing block,
 * so its host element is moved to document.body. But the host is owned by
 * whatever rendered it (React, Angular, Vue, plain DOM code), and that owner
 * keeps addressing it at the position it declared it: React calls
 * `parent.removeChild(host)` / `parent.insertBefore(x, host)`, Angular and Vue
 * remove an ancestor and expect the host to go with it, SSR hydration looks
 * for it in place. A host that permanently lives in body therefore crashes
 * React ("removeChild: not a child of this node"), and piles up orphan copies
 * when an ancestor is removed.
 *
 * So the move only lasts while the overlay is open:
 *  - relocateHostToBody(): leave a comment placeholder where the host was and
 *    append the host to body.
 *  - restoreHostFromBody(): on close, put the host back at the placeholder.
 *  - While relocated, the placeholder stands in for the host: the original
 *    parent's removeChild / insertBefore / appendChild treat a call naming the
 *    host as a call on the placeholder (removing the host from body too, in the
 *    removeChild case). That is what lets React, Vue and Angular keep
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
 * Move an overlay host to document.body while it is open. Returns true if the
 * host was moved (the caller sees a synchronous disconnect/connect pair for
 * it and must ignore both). No-op if already relocated, already a direct
 * child of body, or not in the document.
 */
export function relocateHostToBody(host: HTMLElement): boolean {
  if (typeof document === 'undefined' || !document.body) return false;
  if (relocated.has(host) || !host.isConnected || host.parentNode === document.body) return false;
  const parent = host.parentNode;
  if (!parent) return false;
  const placeholder = document.createComment(` ${host.tagName.toLowerCase()} (open, moved to body) `);
  callOriginal(parent, 'insertBefore', placeholder, host);
  document.body.appendChild(host);
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
export function restoreHostFromBody(host: HTMLElement): boolean {
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

/** Whether the host is currently relocated to body. */
export function isHostRelocated(host: HTMLElement): boolean {
  return relocated.has(host);
}
