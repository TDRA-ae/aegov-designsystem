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
import { getActionClasses } from '../../utils/action-classes';

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
      isDisabled: this.isDisabled,
      isLoading: this.isLoading,
      groupPosition: this.groupPosition,
      groupOrientation: this.groupOrientation,
    });
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
          aria-disabled={this.isDisabled || this.isLoading ? 'true' : undefined}
          aria-busy={this.isLoading ? 'true' : undefined}
          {...passThroughAttributes}
        >
          {this.isLoading && (
            <svg aria-hidden="true" class="mr-1 -ml-1 size-4! animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle><path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
          )}
          <slot></slot>
        </button>
      </Host>
    );
  }
}
