import { h } from '@stencil/core';

/**
 * Bridges the naming and description an author (or aegov-form-field) puts on
 * a control's HOST to the real focusable element inside its shadow root.
 *
 * ID references can't cross a shadow boundary: `aria-labelledby="x"` or
 * `aria-describedby="x"` copied onto an inner element looks for "x" inside the
 * shadow root and finds nothing, and `<label for="host-id">` names only the
 * host, never the inner input. So, as the browser does for a native control,
 * the bridge resolves every source to text, in the order of the accessible
 * name computation:
 *
 *   1. the host's `aria-labelledby` (text of the referenced elements)
 *   2. the host's `aria-label` (also how aegov-form-field passes its label)
 *   3. labels pointing at the control: native `<label for>` (ElementInternals
 *      `labels`), `aegov-label for="<host id or field-id>"`, and an
 *      `aegov-label` whose `field-id` matches the control's `field-id`
 *
 * and the host's `aria-describedby` to description text, which the component
 * renders in a hidden span inside its own shadow root (`renderDescription()`)
 * and references by id. It watches the host attributes and the referenced
 * elements' text, so names stay live like native label associations.
 */
export interface HostAriaOptions {
  /** The control's `field-id`, used for label lookup and the description span id. */
  fieldId: () => string | undefined;
  /** ElementInternals, for native `<label for>` association (form-associated controls). */
  internals?: () => ElementInternals | null | undefined;
  /** Re-render the component (e.g. `() => forceUpdate(this)`). */
  onChange: () => void;
}

const WATCHED_ATTRS = ['aria-label', 'aria-labelledby', 'aria-describedby', 'id', 'field-id'];

export const normalizeText = (text?: string | null): string => (text ?? '').replace(/\s+/g, ' ').trim();

function rootOf(el: Element): Document | ShadowRoot {
  return el.getRootNode() as Document | ShadowRoot;
}

function byId(root: Document | ShadowRoot, id: string): HTMLElement | null {
  return (typeof root.getElementById === 'function' ? root.getElementById(id) : null)
    ?? (typeof document !== 'undefined' ? document.getElementById(id) : null);
}

/** The elements an idref attribute on `el` points to, resolved in its own tree. */
export function idrefElements(el: Element, attr: string): HTMLElement[] {
  const ids = el.getAttribute(attr)?.trim();
  if (!ids) return [];
  const root = rootOf(el);
  return ids.split(/\s+/).map(id => byId(root, id)).filter((x): x is HTMLElement => !!x);
}

export class HostAria {
  private hostObserver?: MutationObserver;
  private textObserver?: MutationObserver;
  /** Last resolved name + description; a re-render is requested only when it changes. */
  private signature?: string;

  constructor(private host: HTMLElement, private opts: HostAriaOptions) {}

  connect(): void {
    if (typeof MutationObserver === 'undefined' || this.hostObserver) return;
    this.hostObserver = new MutationObserver(() => this.changed());
    this.hostObserver.observe(this.host, { attributes: true, attributeFilter: WATCHED_ATTRS });
    this.textObserver = new MutationObserver(() => this.notifyIfChanged());
    this.observeSources();
    this.signature = this.currentSignature();
  }

  disconnect(): void {
    this.hostObserver?.disconnect();
    this.textObserver?.disconnect();
    this.hostObserver = undefined;
    this.textObserver = undefined;
  }

  /** Re-check once the page has rendered: a label written after the control is found too. */
  refreshSoon(): void {
    const run = () => this.changed();
    if (typeof requestAnimationFrame === 'function') requestAnimationFrame(run); else setTimeout(run, 0);
  }

  private changed(): void {
    this.observeSources();
    this.notifyIfChanged();
  }

  private currentSignature(): string {
    return `${this.name() ?? ''}\u0000${this.description()}`;
  }

  private notifyIfChanged(): void {
    const next = this.currentSignature();
    if (next === this.signature) return;
    this.signature = next;
    this.opts.onChange();
  }

  /** Watch the text of every element the name/description currently comes from. */
  private observeSources(): void {
    if (!this.textObserver) return;
    this.textObserver.disconnect();
    const sources = [
      ...idrefElements(this.host, 'aria-labelledby'),
      ...idrefElements(this.host, 'aria-describedby'),
      ...this.labelElements(),
    ];
    for (const el of new Set(sources)) {
      this.textObserver.observe(el, { characterData: true, childList: true, subtree: true });
    }
  }

  /** Label elements pointing at this control (see the class comment, step 3). */
  labelElements(): HTMLElement[] {
    const found = new Set<HTMLElement>();
    try {
      const native = this.opts.internals?.()?.labels;
      Array.from((native ?? []) as ArrayLike<HTMLLabelElement>).forEach(label => found.add((label.closest('aegov-label') as HTMLElement) ?? label));
    } catch {
      // labels throws for controls that aren't form-associated
    }
    const root = rootOf(this.host);
    const keys = [this.host.id, this.opts.fieldId()].filter(Boolean) as string[];
    if (keys.length && typeof root.querySelectorAll === 'function') {
      root.querySelectorAll<HTMLElement>('aegov-label, label[for]').forEach(label => {
        const forValue = (label as HTMLElement & { htmlFor?: string }).htmlFor || label.getAttribute('for');
        if (forValue && keys.includes(forValue)) {
          found.add((label.closest('aegov-label') as HTMLElement) ?? label);
        } else if (label.tagName === 'AEGOV-LABEL' && !forValue && this.opts.fieldId() && label.getAttribute('field-id') === this.opts.fieldId()) {
          // Documented OTP pairing: <aegov-label field-id="x"> + <aegov-otp field-id="x">.
          found.add(label);
        }
      });
    }
    return Array.from(found);
  }

  /** The control's accessible name from host-level sources, or undefined when there is none. */
  name(): string | undefined {
    const labelledBy = idrefElements(this.host, 'aria-labelledby').map(el => normalizeText(el.textContent)).filter(Boolean).join(' ');
    if (labelledBy) return labelledBy;
    const ariaLabel = normalizeText(this.host.getAttribute('aria-label'));
    if (ariaLabel) return ariaLabel;
    const labels = this.labelElements().map(el => normalizeText(el.textContent)).filter(Boolean).join(' ');
    return labels || undefined;
  }

  /** Text of the host's aria-describedby targets. */
  description(): string {
    return idrefElements(this.host, 'aria-describedby').map(el => normalizeText(el.textContent)).filter(Boolean).join(' ');
  }

  /** Id of the hidden description span, when there is a description to point at. */
  descriptionId(): string | undefined {
    return this.description() ? `${this.opts.fieldId() ?? 'aegov'}-host-desc` : undefined;
  }

  /** Hidden span holding the host's description; reference it with `descriptionId()`. */
  renderDescription() {
    const text = this.description();
    return text ? <span id={this.descriptionId()} hidden>{text}</span> : null;
  }

  /**
   * Pass-through attributes with the host-level naming replaced: the raw
   * aria-labelledby / aria-describedby IDs (which can't resolve in the shadow
   * root) are dropped, and aria-label carries the resolved name.
   */
  bridge<T extends Record<string, unknown>>(passThrough: T): T {
    const out = { ...passThrough } as Record<string, unknown>;
    delete out['aria-labelledby'];
    delete out['aria-describedby'];
    const name = this.name();
    if (name) out['aria-label'] = name; else delete out['aria-label'];
    return out as T;
  }
}
