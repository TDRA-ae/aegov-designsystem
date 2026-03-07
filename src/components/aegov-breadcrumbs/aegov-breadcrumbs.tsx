import { Component, Host, h, Prop, Element, Watch } from '@stencil/core';
import type { BreadcrumbSeparator } from '../../utils/types';
import { getPassThroughAttributes } from '../../utils/attributes';

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

  /**
   * Whether to add schema.org microdata for structured data
   * @default false
   */
  @Prop() microdata: boolean = false;

  componentDidLoad() {
    this.updateItems();
  }

  componentDidUpdate() {
    this.updateItems();
  }

  @Watch('separator')
  @Watch('maxLength')
  @Watch('microdata')
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

      // Pass microdata property to children
      item.microdata = this.microdata;

      // Set position for microdata (1-indexed)
      item.position = index + 1;

      // Mark the last item
      item.isLast = index === items.length - 1;
    });
  }

  private static readonly PASS_THROUGH_ATTRS = new Set(['id']);

  render() {
    const passThroughAttributes = getPassThroughAttributes(this.el, AegovBreadcrumbs.PASS_THROUGH_ATTRS);

    return (
      <Host>
        <nav aria-label="Breadcrumb" class="aegov-breadcrumbs" {...passThroughAttributes}>
          <ol
            class="breadcrumb__list"
            itemScope={this.microdata ? true : undefined}
            itemType={this.microdata ? "https://schema.org/BreadcrumbList" : undefined}
          >
            <slot />
          </ol>
        </nav>
      </Host>
    );
  }
}
