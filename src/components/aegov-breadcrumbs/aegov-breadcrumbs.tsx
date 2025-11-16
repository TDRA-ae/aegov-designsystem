import { Component, Host, h, Prop, Element, Watch } from '@stencil/core';
import type { BreadcrumbSeparator } from '../../utils/types';

/**
 * @slot - Breadcrumb items (aegov-breadcrumbs-item elements)
 */
@Component({
  tag: 'aegov-breadcrumbs',
  styleUrl: 'aegov-breadcrumbs.css',
  scoped: false,
})
export class AegovBreadcrumbs {
  @Element() el: HTMLElement;

  /**
   * The separator style to use between breadcrumb items
   */
  @Prop() separator: BreadcrumbSeparator = 'slash';

  /**
   * Maximum number of characters before truncating breadcrumb item text.
   * If not set, text will not be truncated.
   */
  @Prop() maxLength?: number;

  componentDidLoad() {
    this.updateItems();
  }

  componentDidUpdate() {
    this.updateItems();
  }

  @Watch('separator')
  @Watch('maxLength')
  updateItems() {
    // Query all slotted breadcrumb items
    const items = Array.from(
      this.el.querySelectorAll('aegov-breadcrumbs-item')
    ) as HTMLAegovBreadcrumbsItemElement[];

    // Set properties on each item
    items.forEach((item, index) => {
      item.separator = this.separator;

      if (this.maxLength !== undefined) {
        item.maxLength = this.maxLength;
      }

      // Mark the last item
      item.isLast = index === items.length - 1;
    });
  }

  render() {
    return (
      <Host>
        <nav aria-label="Breadcrumb" class="aegov-breadcrumbs">
          <ol class="breadcrumb-list">
            <slot />
          </ol>
        </nav>
      </Host>
    );
  }
}
