import { Component, Host, h, Prop, Element, Watch } from '@stencil/core';
import { BREADCRUMB_SEPARATORS } from '../../utils/types';
import type { BreadcrumbSeparator } from '../../utils/types';
import { getPassThroughAttributes } from '../../utils/attributes';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { generateId } from '../../utils/id-generator';

const TAG = 'aegov-breadcrumbs';
const ctx = (prop: string) => ({ component: TAG, prop });

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
   * Unique ID for the breadcrumbs nav element. Auto-generated if not provided.
   */
  @Prop({ mutable: true, reflect: true }) fieldId?: string;

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
  @Prop() isMicrodata: boolean = false;

  componentWillLoad() {
    if (!this.fieldId) {
      this.fieldId = generateId('aegov-breadcrumbs');
    }
    warnIfInvalidEnumProp(this.separator, BREADCRUMB_SEPARATORS, 'slash', ctx('separator'));
  }

  @Watch('separator')
  onSeparatorChange(v: unknown) { warnIfInvalidEnumProp(v, BREADCRUMB_SEPARATORS, 'slash', ctx('separator')); }

  componentDidLoad() {
    this.updateItems();
  }

  componentDidUpdate() {
    this.updateItems();
  }

  @Watch('separator')
  @Watch('maxLength')
  @Watch('isMicrodata')
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
      item.isMicrodata = this.isMicrodata;

      // Set position for microdata (1-indexed)
      item.position = index + 1;

      // Mark the last item
      item.isLast = index === items.length - 1;
    });
  }

  render() {
    const passThroughAttributes = getPassThroughAttributes(this.el);

    return (
      <Host>
        <nav aria-label="Breadcrumb" id={this.fieldId} class="aegov-breadcrumbs" {...passThroughAttributes}>
          <ol
            class="breadcrumb__list"
            itemScope={this.isMicrodata ? true : undefined}
            itemType={this.isMicrodata ? "https://schema.org/BreadcrumbList" : undefined}
          >
            <slot />
          </ol>
        </nav>
      </Host>
    );
  }
}
