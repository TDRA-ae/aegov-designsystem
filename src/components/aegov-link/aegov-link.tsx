import { Component, Prop, Watch, Event, EventEmitter, Element, State, h, Host } from '@stencil/core';
import {
  LINK_TARGETS,
  BUTTON_APPEARANCES,
  BUTTON_SIZES,
  BUTTON_VARIANTS,
} from '../../utils/types';
import type {
  LinkTarget,
  ButtonAppearance,
  ButtonSize,
  ButtonVariant,
} from '../../utils/types';
import { getPassThroughAttributes } from '../../utils/attributes';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { watchResponsiveProp } from '../../utils/responsive-prop';
import type { ResponsivePropWatcher } from '../../utils/responsive-prop';
import { generateId } from '../../utils/id-generator';
import { getActionClasses } from '../../utils/action-classes';

const TAG = 'aegov-link';
const ctx = (prop: string) => ({ component: TAG, prop });

/**
 * @slot default - The link text content
 *
 * An anchor element wrapper.
 *
 * In its default form `aegov-link` renders a plain styled `<a>`. Opt into a
 * button-shaped link by setting any of the button-style props
 * (`variant`, `appearance`, `size`, `isIcon`, `isFull`, `isBold`, `isDisabled`).
 * When any of those are set the component switches its class output to the
 * shared `getActionClasses` util so it matches `aegov-button` exactly while
 * keeping native `<a>` semantics (right-click, middle-click new tab,
 * screen-reader link role, copy-link, etc.).
 *
 * `isLoading` is intentionally NOT supported — loading states belong on
 * `<button>` (use `aegov-button isLoading` instead).
 */
@Component({
  tag: 'aegov-link',
  styleUrl: 'aegov-link.css',
  scoped: false,
})
export class AegovLink {
  @Element() el: HTMLElement;

  /**
   * Unique ID for the inner anchor element. Auto-generated if not provided.
   */
  @Prop({ mutable: true, reflect: true }) fieldId?: string;

  /**
   * The URL that the link points to.
   * @required
   */
  @Prop() href!: string;

  /**
   * Target attribute for the link (_blank, _self, _parent, _top).
   */
  @Prop() target?: LinkTarget;

  /**
   * Rel attribute for the link (e.g., "noopener noreferrer" for external links).
   */
  @Prop() rel?: string;

  /**
   * Additional CSS classes to apply to the link.
   */
  @Prop() extraClass?: string;

  // ── Button-style props (opt-in) ───────────────────────────
  // Supplying any of these switches the link's class output to the shared
  // button-style util via `getActionClasses`. Leave all unset for the default
  // text-link rendering.

  /** Button-style color variant. Setting this opts into button styling. */
  @Prop() variant?: ButtonVariant;

  /** Button-style appearance. Setting this opts into button styling. */
  @Prop() appearance?: ButtonAppearance;

  /** Button-style size (xs/sm/base/lg/xl, optionally responsive). */
  @Prop() size?: string;

  @State() private _resolvedSize: ButtonSize = 'base';
  private _sizeWatcher: ResponsivePropWatcher | null = null;

  /** Render as icon-only (square). Requires a button-style appearance. */
  @Prop() isIcon: boolean = false;

  /** Stretch to fill container width. */
  @Prop() isFull: boolean = false;

  /** Bold text. */
  @Prop() isBold: boolean = false;

  /**
   * Disable navigation and apply disabled styling. Adds `aria-disabled="true"`,
   * removes the link from tab order, and prevents default click navigation.
   * Native `<a>` does not support `disabled`; this is a polyfill.
   */
  @Prop() isDisabled: boolean = false;

  /**
   * Emitted when the link is clicked.
   * The event detail contains the href and can be used to implement custom navigation.
   */
  @Event() aegovLinkClick: EventEmitter<{ href: string; event: MouseEvent }>;

  componentWillLoad() {
    if (!this.fieldId) {
      this.fieldId = generateId('aegov-link');
    }
    if (this.target !== undefined) {
      warnIfInvalidEnumProp(this.target, LINK_TARGETS, '_self', ctx('target'));
    }
    if (this.variant !== undefined) {
      warnIfInvalidEnumProp(this.variant, BUTTON_VARIANTS, 'primary', ctx('variant'));
    }
    if (this.appearance !== undefined) {
      warnIfInvalidEnumProp(this.appearance, BUTTON_APPEARANCES, 'solid', ctx('appearance'));
    }
    if (this.size !== undefined) {
      this._sizeWatcher = watchResponsiveProp(this.size, BUTTON_SIZES, 'base', v => {
        this._resolvedSize = v as ButtonSize;
      });
      this._resolvedSize = this._sizeWatcher.current as ButtonSize;
    }
  }

  disconnectedCallback() {
    this._sizeWatcher?.destroy();
  }

  @Watch('target')
  onTargetChange(v: unknown) {
    if (v === undefined) return;
    warnIfInvalidEnumProp(v, LINK_TARGETS, '_self', ctx('target'));
  }

  @Watch('variant')
  onVariantChange(v: unknown) {
    if (v === undefined) return;
    warnIfInvalidEnumProp(v, BUTTON_VARIANTS, 'primary', ctx('variant'));
  }

  @Watch('appearance')
  onAppearanceChange(v: unknown) {
    if (v === undefined) return;
    warnIfInvalidEnumProp(v, BUTTON_APPEARANCES, 'solid', ctx('appearance'));
  }

  @Watch('size')
  onSizeChange() {
    this._sizeWatcher?.destroy();
    if (this.size === undefined) {
      this._resolvedSize = 'base';
      return;
    }
    this._sizeWatcher = watchResponsiveProp(this.size, BUTTON_SIZES, 'base', v => {
      this._resolvedSize = v as ButtonSize;
    });
    this._resolvedSize = this._sizeWatcher.current as ButtonSize;
  }

  /**
   * Whether any button-style prop has been supplied — if so we render with
   * the shared `getActionClasses` output instead of the default text-link
   * Tailwind utilities.
   */
  private get isButtonStyled(): boolean {
    return (
      this.variant !== undefined ||
      this.appearance !== undefined ||
      this.size !== undefined ||
      this.isIcon ||
      this.isFull ||
      this.isBold ||
      this.isDisabled
    );
  }

  private handleClick = (event: MouseEvent) => {
    // Disabled <a> polyfill — block default navigation entirely.
    if (this.isDisabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }

    const customEvent = this.aegovLinkClick.emit({
      href: this.href,
      event,
    });

    // If a listener calls preventDefault on the custom event, also stop the
    // anchor's native navigation.
    if (customEvent.defaultPrevented) {
      event.preventDefault();
    }
  };

  private static readonly PASS_THROUGH_ATTRS = new Set(['title', 'referrerpolicy', 'hreflang', 'rel', 'target', 'download', 'type']);

  /**
   * Build the link's class string. Defaults to the original text-link styling;
   * delegates to `getActionClasses` when any button-style prop is set.
   */
  private getLinkClasses(): string {
    if (this.isButtonStyled) {
      const action = getActionClasses({
        variant: this.variant,
        appearance: this.appearance,
        size: this._resolvedSize,
        isIcon: this.isIcon,
        isFull: this.isFull,
        isBold: this.isBold,
        isDisabled: this.isDisabled,
      });
      return this.extraClass ? `${action} ${this.extraClass}` : action;
    }

    const classes = [
      'no-underline',
      'ease-in-out',
      'transition-colors',
      'duration-200',
      'text-primary-600',
    ];
    if (this.extraClass) classes.push(this.extraClass);
    return classes.join(' ');
  }

  render() {
    const passThroughAttrs = getPassThroughAttributes(this.el, AegovLink.PASS_THROUGH_ATTRS);
    // Strip navigation-affecting attrs from pass-through when disabled, otherwise
    // a host-level `target="..."` would survive the spread and override the JSX prop.
    if (this.isDisabled) {
      delete passThroughAttrs['target'];
      delete passThroughAttrs['download'];
      delete passThroughAttrs['rel'];
    }

    return (
      <Host class={{ 'is-full': this.isFull, 'is-disabled': this.isDisabled }}>
        <a
          id={this.fieldId}
          href={this.isDisabled ? undefined : this.href}
          target={this.isDisabled ? undefined : this.target}
          rel={this.isDisabled ? undefined : (this.rel || (this.target === '_blank' ? 'noopener noreferrer' : undefined))}
          class={this.getLinkClasses()}
          onClick={this.handleClick}
          aria-disabled={this.isDisabled ? 'true' : undefined}
          tabindex={this.isDisabled ? -1 : undefined}
          {...passThroughAttrs}
        >
          <slot />
        </a>
      </Host>
    );
  }
}
