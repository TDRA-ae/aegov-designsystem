import { Component, Prop, Watch, State, Event, EventEmitter, Element, Method, Listen, h, Host } from '@stencil/core';
import { watchResponsiveProp } from '../../utils/responsive-prop';
import type { ResponsivePropWatcher } from '../../utils/responsive-prop';
import {
  BUTTON_APPEARANCES,
  BUTTON_GROUP_ORIENTATIONS,
  BUTTON_GROUP_POSITIONS,
  BUTTON_SIZES,
  BUTTON_TYPES,
  BUTTON_VARIANTS,
} from '../../utils/types';
import type {
  ButtonAppearance,
  ButtonGroupOrientation,
  ButtonGroupPosition,
  ButtonSize,
  ButtonType,
  ButtonVariant,
} from '../../utils/types';
import { getPassThroughAttributes } from '../../utils/attributes';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { generateId } from '../../utils/id-generator';
import { getActionClasses } from '../../utils/action-classes';
import { afterDispatchUnlessPrevented, getOwningForm, submitForm, resetForm, implicitlySubmit, isAegovImplicitSubmission } from '../../utils/form-submit';
import { uiLang } from '../../utils/lang';

const TAG = 'aegov-button';
const ctx = (prop: string) => ({ component: TAG, prop });

/**
 * A `type="submit"` button submits its form like a native submit button:
 * `event.submitter` is set, `name`/`value` are added to the form data, and the
 * `formaction`, `formenctype`, `formmethod`, `formnovalidate` and `formtarget`
 * attributes override the form's own settings.
 *
 * @slot - Button content
 * @part button - The native button element
 */
@Component({
  tag: 'aegov-button',
  styleUrl: 'aegov-button.css',
  // Form-associated for the same reason as the form controls (aegov-input etc.):
  // the inner native <button> lives in the shadow root, so its `.form` is always
  // null and `type="submit"` / `type="reset"` can never reach the light-DOM
  // <form> on their own. ElementInternals gives the host a real form owner
  // (including the `form="id"` attribute) and `<fieldset disabled>` support;
  // handleClick() then runs the submit/reset itself.
  formAssociated: true,
  shadow: { delegatesFocus: true }
})
export class AegovButton {
  @Element() el!: HTMLElement;

  /**
   * Unique ID for the button element. Auto-generated if not provided.
   */
  @Prop({ mutable: true, reflect: true }) fieldId?: string;

  /**
   * The button variant (color scheme)
   * @default 'primary'
   */
  @Prop() variant: ButtonVariant = 'primary';

  /**
   * The button size
   * @default 'base'
   */
  @Prop() size: string = 'base';

  @State() private _resolvedSize: ButtonSize = 'base';
  private _sizeWatcher: ResponsivePropWatcher | null = null;

  /**
   * The button type attribute
   * @default 'button'
   */
  @Prop() type: ButtonType = 'button';

  /**
   * Name submitted with the form, paired with `value`, when this button submits
   * it — as on a native `<button>`.
   */
  @Prop() name?: string;

  /**
   * Value submitted with `name` when this button submits the form.
   */
  @Prop() value?: string;

  /**
   * The button appearance (visual style)
   * @default 'solid'
   */
  @Prop() appearance: ButtonAppearance = 'solid';

  /**
   * Whether the button is disabled
   * @default false
   */
  @Prop() isDisabled: boolean = false;

  /**
   * Keep a disabled button in the Tab order: it gets `aria-disabled="true"`
   * instead of native `disabled`, so keyboard and screen-reader users still
   * find it (and any tooltip or text explaining why), while activation stays
   * blocked. Only applies together with `is-disabled` (DS-A11Y-button-08).
   * @default false
   */
  @Prop() isDisabledFocusable: boolean = false;

  /**
   * Whether the button is only an icon
   * @default false
   */
  @Prop() isIcon: boolean = false;

  /**
   * Whether the button should take full width
   * @default false
   *
   * Reflected to the `is-full` attribute: the host-level `:host([is-full])` CSS rule
   * (in aegov-button.css) that switches the host to `display: block` only matches a
   * real attribute, so a framework that sets this as a JS property binding instead of
   * a literal string attribute (e.g. Angular's `[isFull]="true"`, React's JSX `isFull`
   * shorthand) would otherwise never trigger it — only `reflect: true` makes every
   * binding style reach the attribute the CSS depends on.
   */
  @Prop({ reflect: true }) isFull: boolean = false;

  /**
   * Whether the button should have bold text or not
   * @default true
   */
  @Prop() isBold: boolean = true;

  /**
   * Whether the button is in a loading state
   * @default false
   */
  @Prop() isLoading: boolean = false;

  /**
   * Internal: Position of this button within a button group
   * @internal
   */
  @Prop() groupPosition?: ButtonGroupPosition;

  /**
   * Internal: The orientation of the button group this button belongs to
   * @internal
   */
  @Prop() groupOrientation?: ButtonGroupOrientation;

  /**
   * Emitted when the button is clicked
   */
  @Event() aegovButtonClick: EventEmitter<MouseEvent>;

  /**
   * Emitted when the button receives focus
   */
  @Event() aegovButtonFocus: EventEmitter<FocusEvent>;

  /**
   * Emitted when the button loses focus
   */
  @Event() aegovButtonBlur: EventEmitter<FocusEvent>;

  /**
   * Bumped whenever a host `aria-*` / `data-*` attribute changes, to re-run
   * render so `getPassThroughAttributes` re-forwards the new value onto the
   * inner button.
   */
  @State() private _passThroughVersion: number = 0;

  private _hostAttrObserver?: MutationObserver;

  private internals: ElementInternals | null = null;

  /** True while an ancestor `<fieldset disabled>` (or a host `disabled` attribute) disables the button. */
  @State() private formDisabled: boolean = false;

  /**
   * Move focus to the inner native button.
   *
   * The host element is not focusable, so `buttonEl.focus()` from outside does
   * nothing. Callers that need to place or restore focus on a button — a
   * disclosure trigger reclaiming focus after its panel closes, for example —
   * must use this instead.
   */
  @Method()
  async setFocus(): Promise<void> {
    this.el.shadowRoot?.querySelector('button')?.focus();
  }

  connectedCallback() {
    // `getPassThroughAttributes` only reads the host's attributes during
    // render, and Stencil does not re-render on arbitrary attribute changes.
    // Without this, a caller toggling `aria-expanded` / `aria-pressed` on the
    // host would leave the inner button reporting the original value forever.
    if (typeof MutationObserver === 'undefined') return;
    this._hostAttrObserver = new MutationObserver((mutations) => {
      const forwarded = mutations.some(({ attributeName }) =>
        !!attributeName && (attributeName.startsWith('aria-') || attributeName.startsWith('data-'))
      );
      if (forwarded) this._passThroughVersion++;
    });
    this._hostAttrObserver.observe(this.el, { attributes: true });
  }

  /**
   * Icon-only buttons need a name from the author. Warn in development when
   * there is none, and hide the decorative slotted SVG from the accessibility
   * tree once the button is named, so it isn't exposed as a nameless image
   * (DS-A11Y-button-04).
   */
  private warnedNoName = false;

  private checkIconName() {
    if (!this.isIcon) return;
    const named = !!(this.el.getAttribute('aria-label')?.trim() || this.el.getAttribute('aria-labelledby')?.trim() || this.el.getAttribute('title')?.trim());
    if (!named) {
      // Always (not only in dev builds): npm consumers get the production build,
      // and a nameless button is an accessibility failure, not a style choice.
      if (!this.warnedNoName) {
        this.warnedNoName = true;
        console.warn('[aegov-button] An icon-only button (is-icon) needs an accessible name: add aria-label (or aria-labelledby) to <aegov-button>.', this.el);
      }
      return;
    }
    Array.from(this.el.children)
      .filter(child => child.tagName.toLowerCase() === 'svg')
      .forEach(svg => {
        if (!svg.hasAttribute('aria-hidden') && !svg.hasAttribute('role')) svg.setAttribute('aria-hidden', 'true');
      });
  }

  componentDidLoad() {
    this.checkIconName();
  }

  componentWillLoad() {
    if (!this.fieldId) {
      this.fieldId = generateId('aegov-button');
    }
    const host = this.el as unknown as HTMLElement & { attachInternals?: () => ElementInternals };
    if (!this.internals && typeof host.attachInternals === 'function') {
      try {
        this.internals = host.attachInternals();
      } catch {
        this.internals = null;
      }
    }
    warnIfInvalidEnumProp(this.variant, BUTTON_VARIANTS, 'primary', ctx('variant'));
    warnIfInvalidEnumProp(this.type, BUTTON_TYPES, 'button', ctx('type'));
    warnIfInvalidEnumProp(this.appearance, BUTTON_APPEARANCES, 'solid', ctx('appearance'));
    if (this.groupPosition !== undefined) {
      warnIfInvalidEnumProp(this.groupPosition, BUTTON_GROUP_POSITIONS, 'single', ctx('groupPosition'));
    }
    if (this.groupOrientation !== undefined) {
      warnIfInvalidEnumProp(this.groupOrientation, BUTTON_GROUP_ORIENTATIONS, 'horizontal', ctx('groupOrientation'));
    }
    this._sizeWatcher = watchResponsiveProp(this.size, BUTTON_SIZES, 'base', v => {
      this._resolvedSize = v as ButtonSize;
    });
    this._resolvedSize = this._sizeWatcher.current as ButtonSize;
  }

  disconnectedCallback() {
    this._sizeWatcher?.destroy();
  }

  formAssociatedCallback(_form: HTMLFormElement | null) { /* no-op: the owner is read lazily in handleClick */ }
  formDisabledCallback(disabled: boolean) { this.formDisabled = disabled; }

  @Watch('variant')
  onVariantChange(v: unknown) { warnIfInvalidEnumProp(v, BUTTON_VARIANTS, 'primary', ctx('variant')); }

  @Watch('size')
  onSizeChange() {
    this._sizeWatcher?.destroy();
    this._sizeWatcher = watchResponsiveProp(this.size, BUTTON_SIZES, 'base', v => {
      this._resolvedSize = v as ButtonSize;
    });
    this._resolvedSize = this._sizeWatcher.current as ButtonSize;
  }

  @Watch('type')
  onTypeChange(v: unknown) { warnIfInvalidEnumProp(v, BUTTON_TYPES, 'button', ctx('type')); }

  @Watch('appearance')
  onAppearanceChange(v: unknown) { warnIfInvalidEnumProp(v, BUTTON_APPEARANCES, 'solid', ctx('appearance')); }

  @Watch('groupPosition')
  onGroupPositionChange(v: unknown) {
    if (v === undefined) return;
    warnIfInvalidEnumProp(v, BUTTON_GROUP_POSITIONS, 'single', ctx('groupPosition'));
  }

  @Watch('groupOrientation')
  onGroupOrientationChange(v: unknown) {
    if (v === undefined) return;
    warnIfInvalidEnumProp(v, BUTTON_GROUP_ORIENTATIONS, 'horizontal', ctx('groupOrientation'));
  }

  /**
   * Enter in a plain <input> of this button's form submits through this button
   * when it is the form's default (first) submit button, as a native submit
   * button would (DS-A11Y-button-03). aegov-input does its own implicit
   * submission, so only native inputs are handled here.
   */
  @Listen('keydown', { target: 'document' })
  handleDocumentKeydown(event: KeyboardEvent) {
    if (this.getResolvedType() !== 'submit') return;
    const form = getOwningForm(this.el, this.internals);
    if (!form || !isAegovImplicitSubmission(event, form, this.el)) return;
    afterDispatchUnlessPrevented(event, () => implicitlySubmit(form));
  }

  private handleClick = (event: MouseEvent) => {
    if (this.isDisabled || this.isLoading || this.formDisabled) return;
    this.aegovButtonClick.emit(event);

    // Native submit/reset activation, which the shadow-internal <button> can't
    // perform itself (see the formAssociated note on @Component). Deferred
    // until the click has finished dispatching so that preventDefault() from
    // any listener, including one on an ancestor, still cancels it, as it would
    // on a native button. The disabled/loading check above is taken at click
    // time, again like a native button, so a click handler that flips
    // isLoading on doesn't cancel its own submission.
    const type = this.getResolvedType();
    if (type === 'button') return;
    const form = getOwningForm(this.el, this.internals);
    if (!form) return;
    afterDispatchUnlessPrevented(event, () => {
      if (type === 'submit') submitForm(form, this.el);
      else resetForm(form);
    });
  };

  private getResolvedType(): ButtonType {
    return (BUTTON_TYPES as readonly string[]).includes(this.type) ? this.type : 'button';
  }

  private handleFocus = (event: FocusEvent) => {
    this.aegovButtonFocus.emit(event);
  };

  private handleBlur = (event: FocusEvent) => {
    this.aegovButtonBlur.emit(event);
  };


  /**
   * Get the CSS classes based on component props (delegates to shared util).
   */
  private getButtonClasses(): string {
    return getActionClasses({
      variant: this.variant,
      appearance: this.appearance,
      size: this._resolvedSize,
      isIcon: this.isIcon,
      isFull: this.isFull,
      isBold: this.isBold,
      isDisabled: this.isDisabled || this.formDisabled,
      isLoading: this.isLoading,
      groupPosition: this.groupPosition,
      groupOrientation: this.groupOrientation,
    });
  }

  render() {
    const passThroughAttributes = getPassThroughAttributes(this.el);
    const type = this.getResolvedType();
    // is-disabled-focusable keeps a disabled button focusable (aria-disabled);
    // a disabled <fieldset> still disables it natively, like any control.
    const softDisabled = this.isDisabled && this.isDisabledFocusable && !this.formDisabled;
    const disabled = (this.isDisabled && !softDisabled) || this.formDisabled;

    return (
      <Host>
        <button
          part="button"
          id={this.fieldId}
          type={type}
          class={this.getButtonClasses()}
          disabled={disabled}
          // Loading is not native `disabled`: that would blur a focused button and
          // send focus to <body> mid-submit. The button stays focusable, is marked
          // aria-disabled, and handleClick ignores activation while loading.
          aria-disabled={(this.isLoading || softDisabled) && !disabled ? 'true' : undefined}
          onClick={this.handleClick}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          aria-busy={this.isLoading ? 'true' : undefined}
          {...passThroughAttributes}
        >
          {this.isLoading && (
            <svg aria-hidden="true" class={this.isIcon ? 'size-4! animate-spin' : 'mr-1 -ml-1 size-4! animate-spin'} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          )}
          <slot></slot>
        </button>
        {/* Outside the <button>, so "Loading" is never part of its name, and always
            present, so the text change is announced. In the page language
            (DS-A11Y-button-02: it was "Loading Save application", English on Arabic pages). */}
        <span class="sr-only" role="status" aria-live="polite">
          {this.isLoading ? (uiLang(this.el) === 'ar' ? 'جارٍ التحميل' : 'Loading') : ''}
        </span>
      </Host>
    );
  }
}
