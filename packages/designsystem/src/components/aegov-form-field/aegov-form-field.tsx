import { Component, Host, h, Prop, State, Element, Watch } from '@stencil/core';
import { FORM_VARIANTS } from '../../utils/types';
import type { FormVariant } from '../../utils/types';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { getPassThroughAttributes } from '../../utils/attributes';
import { generateId } from '../../utils/id-generator';

/**
 * Type alias for any aegov form control that exposes the Layer 1 validation surface.
 * Used by `cascadeErrorToChild` to propagate isInvalid/errorMessage/hint to the first
 * form control descendant when set on the wrapper.
 */
type AegovFormControl = HTMLElement & {
  fieldId?: string;
  isInvalid?: boolean;
  errorMessage?: string;
  hint?: string;
  variant?: FormVariant;
  isDisabled?: boolean;
};

@Component({
  tag: 'aegov-form-field',
  styleUrl: 'aegov-form-field.css',
  scoped: false,
  shadow: false,
})
export class AegovFormField {
  @Element() el: HTMLElement;

  /** Unique ID for the form-field wrapper. Auto-generated if not provided. */
  @Prop({ mutable: true, reflect: true }) fieldId?: string;

  /**
   * Wrapper-level invalid state. Cascades to the first form-control descendant if the
   * child has not set its own value. See validation-engine-addon.md §2.7.
   */
  @Prop({ mutable: true, reflect: true }) isInvalid: boolean = false;

  /** Wrapper-level error message — cascaded to first form-control descendant. */
  @Prop({ mutable: true }) errorMessage: string = '';

  /** Wrapper-level hint — cascaded to first form-control descendant. */
  @Prop() hint: string = '';

  /** Colour family. Drives idle ring/border, selected/checked fill, and value/accent text. Cascades to first form-control descendant. */
  @Prop() variant?: FormVariant;

  /** Additional CSS classes to apply. */
  @Prop() extraClass?: string;

  /**
   * Whether the linked control is currently disabled — drives the dimmed-label
   * styling (#46). Every aegov form control is `shadow: true`, so its real
   * native `<input>`/`<button>` lives inside its own shadow root, unreachable
   * by any CSS selector from here regardless of how it's written — there is
   * no `:has()` trick that can see across that boundary. Reading the
   * control's own `isDisabled` *property* directly (always correct, unlike
   * its reflected host attribute — Stencil adds that attribute when the prop
   * becomes true but never removes it again when it becomes false) is the
   * only reliable source of truth.
   */
  @State() private isControlDisabled: boolean = false;
  private disabledObserver?: MutationObserver;
  private observedControl?: AegovFormControl;

  /**
   * Tracks the `aria-label` value WE last assigned to each control, so a later
   * sync can tell "we set this" apart from "the author set their own value" —
   * otherwise checking only `hasAttribute('aria-label')` would see our own
   * previous write and wrongly treat it as an explicit author override,
   * permanently blocking further updates (e.g. when the label's text changes).
   */
  private appliedAriaLabels = new WeakMap<AegovFormControl, string>();
  private accessibleNameObserver?: MutationObserver;
  private observedLabelForName?: HTMLElement;

  @Watch('variant')
  onVariantChange(v: unknown) {
    warnIfInvalidEnumProp(v, FORM_VARIANTS, 'primary', { component: 'aegov-form-field', prop: 'variant' });
    this.cascadeToChild();
  }

  componentWillLoad() {
    warnIfInvalidEnumProp(this.variant, FORM_VARIANTS, 'primary', { component: 'aegov-form-field', prop: 'variant' });
    if (!this.fieldId) {
      this.fieldId = generateId('aegov-form-field');
    }
  }

  componentDidLoad() {
    this.linkChildren();
    this.cascadeToChild();
  }

  componentDidUpdate() {
    this.linkChildren();
    this.cascadeToChild();
  }

  disconnectedCallback() {
    this.disabledObserver?.disconnect();
    this.accessibleNameObserver?.disconnect();
  }

  @Watch('isInvalid')
  @Watch('errorMessage')
  @Watch('hint')
  onValidationCascadeChange() {
    this.cascadeToChild();
  }

  /**
   * Like `this.el.querySelector(tag)`, but excludes a match that's really
   * one option of a `groupTag` ancestor (e.g. an `aegov-checkbox` that's a
   * child of `aegov-checkbox-group`), not a genuinely standalone control.
   * A plain querySelector has no concept of that boundary and would wrongly
   * match the group's first nested option, silently binding the field's
   * `<label>` to one arbitrary option instead of correctly linking to
   * nothing — `aegov-checkbox-group`/`aegov-radio-group` manage their own
   * `<legend>` and need their own `aria-labelledby` instead (see
   * form-field.md's "Composing a group" guidance) (#45).
   */
  private findStandaloneControl<T extends HTMLElement>(tag: string, groupTag: string): T | null {
    const candidates = Array.from(this.el.querySelectorAll<T>(tag));
    return candidates.find(el => !el.closest(groupTag)) ?? null;
  }

  /**
   * The same priority list `linkChildren()` uses to decide which control a
   * `<aegov-label>` links to — reused for the disabled-label sync (#46) so it
   * covers exactly the controls that can actually have a label to dim,
   * including standalone `aegov-radio`/`aegov-progress`, which `findControl()`
   * (validation-cascade only) deliberately does not match.
   */
  private findLabelableControl(): AegovFormControl | null {
    return (
      (this.el.querySelector('aegov-input') as AegovFormControl | null) ||
      (this.el.querySelector('aegov-textarea') as AegovFormControl | null) ||
      (this.el.querySelector('aegov-select') as AegovFormControl | null) ||
      this.findStandaloneControl<AegovFormControl>('aegov-checkbox', 'aegov-checkbox-group') ||
      (this.el.querySelector('aegov-range') as AegovFormControl | null) ||
      (this.el.querySelector('aegov-progress') as AegovFormControl | null) ||
      (this.el.querySelector('aegov-otp') as AegovFormControl | null) ||
      (this.el.querySelector('aegov-fileupload') as AegovFormControl | null) ||
      this.findStandaloneControl<AegovFormControl>('aegov-radio', 'aegov-radio-group') ||
      (this.el.querySelector('aegov-toggle') as AegovFormControl | null)
    );
  }

  private linkChildren() {
    const input = this.el.querySelector('aegov-input') as HTMLAegovInputElement | null;
    const textarea = this.el.querySelector('aegov-textarea') as HTMLAegovTextareaElement | null;
    const label = this.el.querySelector('aegov-label') as HTMLAegovLabelElement | null;
    const select = this.el.querySelector('aegov-select') as HTMLAegovSelectElement | null;
    const checkbox = this.findStandaloneControl<HTMLAegovCheckboxElement>('aegov-checkbox', 'aegov-checkbox-group');
    const range = this.el.querySelector('aegov-range') as HTMLAegovRangeElement | null;
    const progress = this.el.querySelector('aegov-progress') as HTMLAegovProgressElement | null;
    const otp = this.el.querySelector('aegov-otp') as HTMLAegovOtpElement | null;
    const fileupload = this.el.querySelector('aegov-fileupload') as HTMLAegovFileuploadElement | null;
    const radio = this.findStandaloneControl<HTMLAegovRadioElement>('aegov-radio', 'aegov-radio-group');
    const toggle = this.el.querySelector('aegov-toggle') as HTMLAegovToggleElement | null;

    const labelableControl = this.findLabelableControl();
    if (labelableControl) {
      this.syncDisabledState(labelableControl);
    }

    if (label) {
      // For shadow:true components the browser cannot follow <label for="..."> into the
      // shadow root. We must ensure the HOST element has an id attribute that the label
      // can target from the document. delegatesFocus:true then routes browser focus to
      // the first focusable element inside the shadow root automatically.
      const ensureHostId = (el: HTMLElement & { fieldId?: string }): string => {
        if (el.shadowRoot && el.fieldId) {
          if (!el.id) el.id = el.fieldId; // stamp id on host so <label for> can reach it
          return el.id;
        }
        return el.fieldId ?? '';
      };

      if (input && input.fieldId) {
        label.htmlFor = ensureHostId(input);
      } else if (textarea && textarea.fieldId) {
        label.htmlFor = ensureHostId(textarea);
      } else if (select && select.fieldId) {
        label.htmlFor = ensureHostId(select);
      } else if (checkbox && checkbox.fieldId) {
        label.htmlFor = ensureHostId(checkbox);
      } else if (range && range.fieldId) {
        label.htmlFor = ensureHostId(range);
      } else if (progress && progress.fieldId) {
        label.htmlFor = progress.fieldId;
      } else if (otp && otp.fieldId) {
        label.htmlFor = ensureHostId(otp);
      } else if (fileupload && fileupload.fieldId) {
        label.htmlFor = ensureHostId(fileupload);
      } else if (radio && radio.fieldId) {
        label.htmlFor = ensureHostId(radio);
      } else if (toggle && toggle.fieldId) {
        label.htmlFor = ensureHostId(toggle);
      }
      // Cascade variant to label only if neither side has a sentinel problem
      // (#47): `variant` no longer has a default value on either side, so
      // "wrapper never set one" and "label never set one" are both genuinely
      // `undefined`, distinguishable from an explicit `variant="primary"`.
      if (this.variant !== undefined && (label as any).variant === undefined) {
        (label as any).variant = this.variant;
      }

      if (labelableControl) {
        this.syncAccessibleName(label, labelableControl);
      }
    }
  }

  /**
   * Find the first aegov form-control descendant.
   * See validation-engine-addon.md §2.7.
   */
  private findControl(): AegovFormControl | null {
    return this.el.querySelector(
      'aegov-input, aegov-textarea, aegov-select, aegov-checkbox, aegov-checkbox-group, ' +
      'aegov-radio-group, aegov-toggle, aegov-range, aegov-otp, aegov-fileupload, aegov-datepicker'
    ) as AegovFormControl | null;
  }

  /**
   * Cascade wrapper-level isInvalid/errorMessage/hint to first form-control descendant.
   * Only fills in values that the child has not already authored to its own props.
   */
  private cascadeToChild() {
    const ctrl = this.findControl();
    if (!ctrl) return;

    // errorMessage cascades only if child has no own value
    if (this.errorMessage && (!ctrl.errorMessage || ctrl.errorMessage === '')) {
      ctrl.errorMessage = this.errorMessage;
    }
    // hint cascades only if child has no own value
    if (this.hint && (!ctrl.hint || ctrl.hint === '')) {
      ctrl.hint = this.hint;
    }
    // isInvalid: wrapper override wins when truthy (since errorMessage demands display)
    if (this.isInvalid) {
      ctrl.isInvalid = true;
    }
    // variant cascades only if neither side has a sentinel problem (#47) —
    // see the identical comment on the label-variant cascade above.
    if (this.variant !== undefined && ctrl.variant === undefined) {
      ctrl.variant = this.variant;
    }
  }

  /**
   * Mirrors the control's live `isDisabled` property onto `isControlDisabled`
   * (driving the dimmed-label CSS class), and watches for further changes.
   *
   * No DOM mutation reliably fires when `isDisabled` is toggled as a plain JS
   * property on a control that doesn't reflect it (`aegov-input`/`textarea`/
   * `select` don't) — but every control's own render output always keeps its
   * REAL inner native element's `disabled` attribute correctly in sync both
   * ways (confirmed live: it clears correctly, unlike the host's reflected
   * attribute). Observing each control's shadow root for that attribute is
   * therefore a reliable proxy trigger to re-read the authoritative property.
   */
  private syncDisabledState(ctrl: AegovFormControl) {
    this.isControlDisabled = !!ctrl.isDisabled;

    if (this.observedControl === ctrl) return;
    this.disabledObserver?.disconnect();
    this.observedControl = ctrl;

    if (ctrl.shadowRoot) {
      this.disabledObserver = new MutationObserver(() => {
        this.isControlDisabled = !!ctrl.isDisabled;
      });
      this.disabledObserver.observe(ctrl.shadowRoot, {
        attributes: true,
        attributeFilter: ['disabled'],
        subtree: true,
      });
    }
  }

  /**
   * Sets `aria-label` on the linked control's host AND directly on its real
   * internal `<input>`/`<select>`/`<textarea>`, derived from the paired
   * `<aegov-label>`'s visible text, and watches that label for further
   * changes (#51). Every aegov form control is `shadow: true`, so native
   * `<label for>`/`id` resolution — same as `isControlDisabled` above — can
   * only reach the host, never the real internal control one level deeper;
   * the browser's accessible-name computation can't follow `delegatesFocus`
   * the way focus itself can, so it stays stuck on the host's own placeholder
   * or no name at all. Setting `aria-label` on the host alone isn't enough —
   * each control's own `getPassThroughAttributes` forwarding only re-runs on
   * that control's OWN next Stencil re-render, which a plain external
   * `setAttribute` call never triggers — so the real interactive element (the
   * one focus actually lands on, and the one AT/screen readers actually
   * query) must be reached directly, the same shadow-root-crossing approach
   * already used in `aegov-label.tsx` for #48. The host-level attribute is
   * still set too, both as a fallback for any control with its own existing
   * host-attribute convention (e.g. `aegov-progress`, see #59) and so a
   * control's later, unrelated re-render keeps including it via its own
   * pass-through. Per the ARIA spec, an explicit `aria-label` always wins
   * over implicit `<label for>` association, so this is safe regardless of
   * whether that broken native path happens to work for a given browser.
   */
  private syncAccessibleName(label: HTMLElement, ctrl: AegovFormControl) {
    this.applyAccessibleName(label, ctrl);

    if (this.observedLabelForName === label) return;
    this.accessibleNameObserver?.disconnect();
    this.observedLabelForName = label;

    this.accessibleNameObserver = new MutationObserver(() => {
      this.applyAccessibleName(label, ctrl);
    });
    this.accessibleNameObserver.observe(label, { characterData: true, childList: true, subtree: true });
  }

  private applyAccessibleName(label: HTMLElement, ctrl: AegovFormControl) {
    if (ctrl.hasAttribute('aria-labelledby')) return; // author already provided their own association

    const current = ctrl.getAttribute('aria-label');
    const weSetLast = this.appliedAriaLabels.get(ctrl);
    if (current !== null && current !== weSetLast) return; // author's own explicit aria-label — never override

    const text = label.textContent?.trim() || null;
    if (!text) {
      if (weSetLast !== undefined) {
        ctrl.removeAttribute('aria-label');
        this.appliedAriaLabels.delete(ctrl);
      }
    } else if (current !== text) {
      ctrl.setAttribute('aria-label', text);
      this.appliedAriaLabels.set(ctrl, text);
    }

    ctrl.shadowRoot?.querySelectorAll('input, select, textarea').forEach(inner => {
      if (text) {
        inner.setAttribute('aria-label', text);
      } else {
        inner.removeAttribute('aria-label');
      }
    });
  }

  private getFieldClasses(): string {
    const classes: string[] = ['aegov-form-field'];
    if (this.isInvalid) {
      classes.push('is-invalid');
    }
    if (this.isControlDisabled) {
      classes.push('is-control-disabled');
    }
    if (this.extraClass) {
      classes.push(this.extraClass);
    }
    return classes.join(' ');
  }

  render() {
    const passThroughAttributes = getPassThroughAttributes(this.el);

    return (
      <Host>
        <div class={this.getFieldClasses()} {...passThroughAttributes}>
          <slot />
          <slot name="hint" />
        </div>
      </Host>
    );
  }
}
