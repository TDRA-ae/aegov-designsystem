import { Component, Element, Host, h, Prop, Watch } from '@stencil/core';
import { ButtonGroupOrientation } from '../../utils/types';

/**
 * @slot - Button elements to be grouped together
 */
@Component({
  tag: 'aegov-button-group',
  styleUrl: 'aegov-button-group.css',
  scoped: true,
})
export class AegovButtonGroup {
  @Element() el: HTMLElement;

  /**
   * The orientation of the button group
   */
  @Prop() orientation: ButtonGroupOrientation = 'horizontal';

  componentDidLoad() {
    this.updateButtons();
  }

  componentDidUpdate() {
    this.updateButtons();
  }

  @Watch('orientation')
  watchOrientation() {
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
      (child) => child.tagName.toLowerCase() !== 'aegov-button'
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
      const isFirst = index === 0;
      const isLast = index === buttons.length - 1;
      const isSingle = buttons.length === 1;

      // Set positional flags on each button
      button.isFirst = isFirst;
      button.isLast = isLast;
      button.isSingle = isSingle;
      button.groupOrientation = this.orientation;
    });
  }

  render() {
    const classes = {
      'button-group': true,
      'button-group--horizontal': this.orientation === 'horizontal',
      'button-group--vertical': this.orientation === 'vertical',
    };

    return (
      <Host>
        <div class={classes} role="group">
          <slot />
        </div>
      </Host>
    );
  }
}
