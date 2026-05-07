import { Component, Prop, Watch, State, Event, EventEmitter, Element, h, Host } from '@stencil/core';
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

const TAG = 'aegov-button';
const ctx = (prop: string) => ({ component: TAG, prop });

/**
 * @slot - Button content
 * @part button - The native button element
 */
@Component({
  tag: 'aegov-button',
  styleUrl: 'aegov-button.css',
  scoped: false,
  shadow:false
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
   * Whether the button is only an icon
   * @default false
   */
  @Prop() isIcon: boolean = false;

  /**
   * Whether the button should take full width
   * @default false
   */
  @Prop() isFull: boolean = false;

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

  componentWillLoad() {
    if (!this.fieldId) {
      this.fieldId = generateId('aegov-button');
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

  private handleClick = (event: MouseEvent) => {
    if (!this.isDisabled && !this.isLoading) {
      this.aegovButtonClick.emit(event);
    }
  };

  private handleFocus = (event: FocusEvent) => {
    this.aegovButtonFocus.emit(event);
  };

  private handleBlur = (event: FocusEvent) => {
    this.aegovButtonBlur.emit(event);
  };


  /**
   * Get the CSS classes based on component props
   */
  private getButtonClasses(): string {
    const classes: string[] = [
      'aegov-btn relative inline-flex shrink-0 cursor-pointer select-none flex-wrap items-center justify-center whitespace-nowrap no-underline transition-all duration-200 ease-in-out focus-visible:outline-2  disabled:cursor-default disabled:pointer-events-none disabled:cursor-not-allowed'
    ];

    const size: ButtonSize = this._resolvedSize;
    const variant: ButtonVariant = (BUTTON_VARIANTS as readonly string[]).includes(this.variant) ? this.variant : 'primary';
    const appearance: ButtonAppearance = (BUTTON_APPEARANCES as readonly string[]).includes(this.appearance) ? this.appearance : 'solid';

    // Size classes
    const sizeClasses: Record<ButtonSize, string[]> = {
      xs: ['btn-xs','h-9','rounded-md', 'gap-1.5', 'px-2.5', 'text-sm'],
      sm: ['btn-sm', 'h-10', 'rounded-md', 'gap-2', 'px-3', 'text-base'],
      base: ['btn-base', 'h-11', 'rounded-md', 'gap-2', 'px-3.5', 'text-base'],
      lg: ['btn-lg','h-12', 'rounded-lg', 'gap-3', 'px-4', 'text-lg'],
      xl: ['btn-lg','h-13', 'rounded-lg', 'gap-3', 'px-4.5', 'text-lg']
    };

    classes.push(...sizeClasses[size]);

    const variantClasses: Record<ButtonVariant, string[]> = {
      primary: ['btn-primary', 'outline-primary-support-600'],
      secondary: ['btn-secondary', 'outline-secondary-support-600'],
      danger: ['btn-danger', 'outline-camel-600'],
      neutralMin: ['btn-neutral-min', 'outline-seablue-600'],
      neutralMax: ['btn-neutral-max', 'outline-seablue-600']
    };

    classes.push(...variantClasses[variant]);

    const appearanceClasses: Record<ButtonAppearance, string[]> = {
      solid: ['btn-solid','shadow-[inset_0px_1px_--theme(--color-whitely-50/.2)]', 'border-1', 'focus-visible:outline-offset-2', 'disabled:opacity-30'],
      outline: ['btn-outline','bg-transparent', 'border-2', 'focus-visible:outline-offset-0', 'disabled:opacity-50'],
      soft: ['btn-soft', 'border-0', 'focus-visible:outline-offset-2', 'disabled:opacity-50'],
      link: ['btn-link', 'bg-transparent', 'border-0', 'hover:underline', 'hover:decoration-2', 'hover:underline-offset-2', 'focus-visible:outline-offset-2', 'disabled:opacity-50']
    };

    classes.push(...appearanceClasses[appearance]);


    // Disabled state
    if (this.isDisabled || this.isLoading) {
      classes.push(
        'cursor-not-allowed',
        'pointer-events-none'
      );
    }

    // Icon only button
    if (this.isIcon) {
      classes.push(
        'btn-icon'
      );
    }

    // Full width
    if (this.isFull) {
      classes.push('w-full');
    }

    // bold management
    if (this.isBold) {
      classes.push('font-semibold');
    }

    // Button group styling
    const groupOrientation = (BUTTON_GROUP_ORIENTATIONS as readonly string[]).includes(this.groupOrientation as string)
      ? (this.groupOrientation as ButtonGroupOrientation)
      : undefined;
    const groupPosition = (BUTTON_GROUP_POSITIONS as readonly string[]).includes(this.groupPosition as string)
      ? (this.groupPosition as ButtonGroupPosition)
      : undefined;

    if (groupPosition && groupOrientation) {
      classes.push(`btn-grouped-${groupOrientation}`);

      if (groupPosition === 'single') {
        classes.push('btn-grouped-single');
      } else {
        classes.push(`btn-grouped-${groupPosition}-${groupOrientation}`);
      }
    }

    return classes.join(' ');
  }

  render() {
    const passThroughAttributes = getPassThroughAttributes(this.el);
    const type: ButtonType = (BUTTON_TYPES as readonly string[]).includes(this.type) ? this.type : 'button';

    return (
      <Host>
        <button
          part="button"
          id={this.fieldId}
          type={type}
          class={this.getButtonClasses()}
          disabled={this.isDisabled || this.isLoading}
          onClick={this.handleClick}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          aria-disabled={this.isDisabled || this.isLoading ? 'true' : 'false'}
          aria-busy={this.isLoading ? 'true' : 'false'}
          {...passThroughAttributes}
        >
          {this.isLoading && (
            <svg class="mr-1 -ml-1 size-4! animate-spin text-whitely-50" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          )}
          <slot></slot>
        </button>
      </Host>
    );
  }
}
