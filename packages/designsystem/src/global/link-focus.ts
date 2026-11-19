/**
 * Link focus: text link or card link (A11Y-FINAL-25).
 *
 * The base `a` focus style fills the link with gold. That suits text links,
 * but on a link that is a whole card, image or logo, or an overlay stretched
 * over a card, the fill hides the content. global.css detects the common
 * shapes from the markup alone; this script covers the rest by looking at how
 * the link is actually drawn when it receives focus, and marks it with
 * data-aegov-focus="box" (outline only) or "text" (gold fill). global.css
 * reads that mark, so nobody has to add a class.
 *
 * A link counts as a card ("box") when it:
 *  1. is positioned absolute/fixed and covers most of its container (overlay);
 *  2. is padded like a card (24px+ both ways) or bordered on all four sides;
 *  3. holds media taller than an icon (image, video, logo-sized svg);
 *  4. holds content stacked in rows (title above description, label above title).
 */

const MEDIA = 'img,picture,video,canvas,iframe,object,embed,svg';

type Item = { rect: DOMRect; block: boolean; text: boolean; node: Node };

const unionRect = (a: DOMRect, b: DOMRect): DOMRect => {
  const left = Math.min(a.left, b.left);
  const top = Math.min(a.top, b.top);
  return new DOMRect(left, top, Math.max(a.right, b.right) - left, Math.max(a.bottom, b.bottom) - top);
};

/** Visible content of an element: slots flattened, display:contents unwrapped, sr-only and hidden parts skipped. */
function contentItems(el: Element): Item[] {
  let nodes: Node[] = el.tagName === 'SLOT' ? (el as HTMLSlotElement).assignedNodes({ flatten: true }) : Array.from(el.childNodes);
  if (el.tagName === 'SLOT' && nodes.length === 0) nodes = Array.from(el.childNodes);
  // In a flex or grid container, neighbouring text runs (and <br>) form one anonymous item.
  const mergeText = /flex|grid/.test(getComputedStyle(el).display);
  const items: Item[] = [];
  let lastWasText = false;
  for (const node of nodes) {
    if (node.nodeType === Node.TEXT_NODE) {
      if (!node.textContent?.trim()) continue;
      const range = document.createRange();
      range.selectNodeContents(node);
      const rect = range.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) continue;
      const prev = items[items.length - 1];
      if (mergeText && lastWasText && prev) prev.rect = unionRect(prev.rect, rect);
      else items.push({ rect, block: false, text: true, node });
      lastWasText = true;
      continue;
    }
    if (node.nodeType !== Node.ELEMENT_NODE) continue;
    const child = node as Element;
    if (child.tagName === 'BR') continue;
    const style = getComputedStyle(child);
    if (child.tagName === 'SLOT' || style.display === 'contents') {
      items.push(...contentItems(child));
      lastWasText = false;
      continue;
    }
    if (style.display === 'none') continue;
    const rect = child.getBoundingClientRect();
    if (rect.width <= 1 && rect.height <= 1) continue; // sr-only or empty
    items.push({ rect, block: !style.display.startsWith('inline'), text: false, node: child });
    lastWasText = false;
  }
  return items;
}

/** True when two content parts sit in different rows (one fully below the other). */
function isStacked(el: Element, items: Item[]): boolean {
  if (items.length < 2) return false;
  const layoutItems = /flex|grid/.test(getComputedStyle(el).display);
  for (const a of items) {
    for (const b of items) {
      if (a === b || b.rect.top < a.rect.bottom - 0.5) continue;
      // In normal text flow, inline parts wrapping onto a new line is still one text link.
      if (layoutItems || a.block || b.block) return true;
    }
  }
  return false;
}

export function isCardLink(link: HTMLElement): boolean {
  const style = getComputedStyle(link);
  const rect = link.getBoundingClientRect();
  const lineHeight = parseFloat(style.lineHeight) || parseFloat(style.fontSize) * 1.5;

  // 1. Overlay stretched over its card.
  if (style.position === 'absolute' || style.position === 'fixed') {
    const container = (link.offsetParent || link.parentElement) as Element | null;
    const box = container?.getBoundingClientRect();
    if (box && rect.width >= box.width * 0.8 && rect.height >= box.height * 0.8 && rect.height > 2 * lineHeight) return true;
  }

  // 2. Padded or bordered like a card.
  const padBlock = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
  const padInline = parseFloat(style.paddingLeft) + parseFloat(style.paddingRight);
  if (padBlock >= 24 && padInline >= 24) return true;
  const borderedSides = ['Top', 'Right', 'Bottom', 'Left'].filter((side) => {
    const width = parseFloat(style.getPropertyValue(`border-${side.toLowerCase()}-width`));
    const color = style.getPropertyValue(`border-${side.toLowerCase()}-color`);
    return width > 0 && !/^transparent$|^rgba\(.*,\s*0\)$|\/\s*0\)$/.test(color.trim());
  });
  if (borderedSides.length === 4) return true;

  // 3 + 4. Media bigger than an icon, or content stacked in rows, anywhere inside.
  const walk = (el: Element): boolean => {
    if (el !== link && el.matches(MEDIA) && el.getBoundingClientRect().height >= 1.75 * lineHeight) return true;
    const items = contentItems(el);
    if (isStacked(el, items)) return true;
    return items.some((item) => !item.text && walk(item.node as Element));
  };
  return walk(link);
}

/**
 * True when an ancestor that clips its overflow would cut off the focus
 * outline drawn outside the link (for example a link that fills an
 * overflow-hidden card). The outline is then drawn just inside the link.
 */
export function isOutlineClipped(link: HTMLElement): boolean {
  const style = getComputedStyle(link);
  const reach = parseFloat(style.outlineOffset) + parseFloat(style.outlineWidth) || 4;
  if (reach <= 0) return false;
  const rect = link.getBoundingClientRect();
  let node: Element | null = link.parentElement ?? ((link.getRootNode() as ShadowRoot).host || null);
  while (node && node !== document.documentElement && node !== document.body) {
    const s = getComputedStyle(node);
    if (/hidden|clip|auto|scroll/.test(s.overflowX + s.overflowY)) {
      const box = node.getBoundingClientRect();
      if (rect.left - reach < box.left || rect.top - reach < box.top || rect.right + reach > box.right || rect.bottom + reach > box.bottom) return true;
    }
    node = node.parentElement ?? (((node.getRootNode() as ShadowRoot).host as Element) || null);
  }
  return false;
}

let started = false;
const watchedRoots = new WeakSet<ShadowRoot>();
const handledEvents = new WeakSet<Event>();

function onFocusIn(event: Event): void {
  if (handledEvents.has(event)) return;
  handledEvents.add(event);
  const path = event.composedPath();
  // Focus moving between two elements inside the same shadow root (for example
  // "Learn more" to the logo in aegov-header) never reaches the document: from
  // outside, the host keeps focus. Listen inside every shadow root focus enters.
  for (const node of path) {
    if (node instanceof ShadowRoot && !watchedRoots.has(node)) {
      watchedRoots.add(node);
      node.addEventListener('focusin', onFocusIn, true);
    }
  }
  const target = path[0];
  if (!(target instanceof Element)) return;
  const link = target.closest('a[href]') as HTMLElement | null;
  if (!link) return;
  // Links drawn by a DS component (aegov-btn, aegov-navbar-item__link, ...) keep the component's own design.
  const componentLink = Array.from(link.classList).some((name) => name.startsWith('aegov-'));
  const card = !componentLink && isCardLink(link);
  link.setAttribute('data-aegov-focus', card ? (isOutlineClipped(link) ? 'box-inset' : 'box') : 'text');
}

/** Marks each link as it receives focus (light DOM and open shadow roots). */
export function initLinkFocus(): void {
  if (started || typeof document === 'undefined') return;
  started = true;
  document.addEventListener('focusin', onFocusIn, true);
}

// Start as soon as this module loads. The custom-elements build (used by the
// React wrapper) runs the global script only when the package index is
// imported, so app.ts alone would miss pages that import single components.
initLinkFocus();
