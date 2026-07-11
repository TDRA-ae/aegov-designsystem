import { Component, Element, Host, h, Prop, Watch } from '@stencil/core';
import { ButtonGroupOrientation, BUTTON_GROUP_ORIENTATIONS } from '../../utils/types';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { getPassThroughAttributes } from '../../utils/attributes';

const TAG = 'aegov-button-group';
const ctx = (prop: string) => ({ component: TAG, prop });

/**
 * @slot - Button elements to be grouped together
 */
@Component({
  tag: 'aegov-button-group',
  styleUrl: 'aegov-button-group.css',
  scoped: false,
})
export class AegovButtonGroup {
  @Element() el: HTMLElement;

  /**
   * The orientation of the button group
   */
  @Prop() orientation: ButtonGroupOrientation = 'horizontal';

  componentWillLoad() {
    warnIfInvalidEnumProp(this.orientation, BUTTON_GROUP_ORIENTATIONS, 'horizontal', ctx('orientation'));
  }

  componentDidLoad() {
    this.updateButtons();
  }

  componentDidUpdate() {
    this.updateButtons();
  }

  @Watch('orientation')
  watchOrientation(v: unknown) {
    warnIfInvalidEnumProp(v, BUTTON_GROUP_ORIENTATIONS, 'horizontal', ctx('orientation'));
    this.updateButtons();
  }

  /**
   * Gets direct child button elements only (no nested buttons)
   */
  private getDirectChildButtons(): HTMLAegovButtonElement[] {
    const allButtons = Array.from(
      this.el.querySelectorAll('aegov-button')
    ) as HTMLAegovButtonElement[];

    // Filter to only direct children of this button-group
    return allButtons.filter((button) => {
      const parentGroup = button.parentElement?.closest('aegov-button-group');
      return parentGroup === this.el;
    });
  }

  /**
   * Validates that all direct children are aegov-button elements
   */
  private validateChildren() {
    const directChildren = Array.from(this.el.children).filter(
      (child) => child.tagName !== 'STYLE' && child.tagName !== 'SCRIPT'
    );

    const invalidChildren = directChildren.filter(
      (child) => child.tagName.toLowerCase() !== 'aegov-button' && child.tagName.toLowerCase() !== 'div'
    );

    if (invalidChildren.length > 0) {
      console.warn(
        '[aegov-button-group] All children must be <aegov-button> elements. Found:',
        invalidChildren.map((child) => child.tagName)
      );
    }
  }

  /**
   * Updates button states based on their position in the group
   */
  private updateButtons() {
    this.validateChildren();

    const buttons = this.getDirectChildButtons();

    if (buttons.length === 0) {
      return;
    }

    buttons.forEach((button, index) => {
      const isSingle = buttons.length === 1;
      const isFirst = index === 0;
      const isLast = index === buttons.length - 1;

      let position: 'first' | 'middle' | 'last' | 'single';
      if (isSingle) {
        position = 'single';
      } else if (isFirst) {
        position = 'first';
      } else if (isLast) {
        position = 'last';
      } else {
        position = 'middle';
      }

      button.groupPosition = position;
      button.groupOrientation = (BUTTON_GROUP_ORIENTATIONS as readonly string[]).includes(this.orientation) ? this.orientation : 'horizontal';
    });
  }

  render() {
    const orientation: ButtonGroupOrientation = (BUTTON_GROUP_ORIENTATIONS as readonly string[]).includes(this.orientation) ? this.orientation : 'horizontal';
    const classes = {
      'aegov-button-group': true,
      'button-group--horizontal': orientation === 'horizontal',
      'button-group--vertical': orientation === 'vertical',
    };
    const passThroughAttributes = getPassThroughAttributes(this.el);

    return (
      <Host>
        <div class={classes} role="group" {...passThroughAttributes}>
          <slot />
        </div>
      </Host>
    );
  }
}
