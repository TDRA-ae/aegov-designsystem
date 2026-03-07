import { Component, Host, h, Prop, Event, EventEmitter, Element, State, Watch } from '@stencil/core';
import type { LinkTarget, BreadcrumbSeparator } from '../../utils/types';
import { getPassThroughAttributes } from '../../utils/attributes';

/**
 * Breadcrumb item component
 *
 * **⚠️ IMPORTANT:** This component must be used inside `<aegov-breadcrumbs>` component.
 * Do not use this component standalone.
 *
 * @internal This component is designed to work only as a child of aegov-breadcrumbs
 * @slot - Content of the breadcrumb item
 */
@Component({
  tag: 'aegov-breadcrumbs-item',
  styleUrl: 'aegov-breadcrumbs-item.css',
  scoped: false,
})
export class AegovBreadcrumbsItem {
  @Element() el: HTMLElement;

  @State() slotContent: string = '';
  @State() hasElementChildren: boolean = false;

  /**
   * The URL that the breadcrumb item links to.
   * If not provided, the item will be rendered as plain text (current page).
   */
  @Prop({ mutable: true }) href?: string;

  /**
   * Where to open the linked document
   */
  @Prop({ mutable: true }) target: LinkTarget = '_self';

  /**
   * Whether this is the last/current item in the breadcrumb trail
   * @internal - Set automatically by parent component
   */
  @Prop({ mutable: true }) isLast: boolean = false;

  /**
   * Maximum length for text before truncation
   * @internal - Set automatically by parent component
   */
  @Prop({ mutable: true }) maxLength?: number;

  /**
   * Separator type to display after this item
   * @internal - Set automatically by parent component
   */
  @Prop({ mutable: true }) separator: BreadcrumbSeparator = 'slash';

  /**
   * Whether to add schema.org microdata
   * @internal - Set automatically by parent component
   */
  @Prop({ mutable: true }) microdata: boolean = false;

  /**
   * Position in the breadcrumb list (1-indexed) for microdata
   * @internal - Set automatically by parent component
   */
  @Prop({ mutable: true }) position: number = 1;

  /**
   * Emitted when the breadcrumb item is clicked
   */
  @Event() aegovBreadcrumbItemClick: EventEmitter<{ href?: string; event: MouseEvent }>;

  componentWillLoad() {
    // Validate that this component is inside aegov-breadcrumbs
    const parentBreadcrumbs = this.el.closest('aegov-breadcrumbs');
    if (!parentBreadcrumbs) {
      throw new Error(
        '[aegov-breadcrumbs-item] This component must be used inside <aegov-breadcrumbs>. ' +
        'It cannot be used as a standalone component. ' +
        'Please wrap it with <aegov-breadcrumbs>...</aegov-breadcrumbs>'
      );
    }

    // Check if there are element children (like SVG, icons, etc.)
    const childNodes = Array.from(this.el.childNodes);
    this.hasElementChildren = childNodes.some(node => node.nodeType === Node.ELEMENT_NODE);

    if (this.hasElementChildren) {
      // If there are element children (SVG, etc.), keep everything and render via slot
      // Don't remove anything - the slot will handle rendering both elements and text
    } else {
      // If only text content, capture it for truncation and remove the text nodes
      this.slotContent = this.el.textContent?.trim() || '';
      childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE) {
          node.remove();
        }
      });
    }
  }

  @Watch('href')
  @Watch('separator')
  @Watch('isLast')
  @Watch('maxLength')
  @Watch('microdata')
  @Watch('position')
  handlePropChange() {
    // Force re-render when props change
  }

  private handleClick = (event: MouseEvent) => {
    this.aegovBreadcrumbItemClick.emit({
      href: this.href,
      event: event,
    });
    // Allow default navigation unless preventDefault is called on the event
  };

  private truncateText(text: string): string {
    if (!this.maxLength || text.length <= this.maxLength) {
      return text;
    }
    return text.substring(0, this.maxLength) + '…';
  }

  private static readonly PASS_THROUGH_ATTRS = new Set(['id']);

  private renderSeparator() {
    if (this.isLast) {
      return null;
    }

    if (this.separator === 'chevron') {
      return (
        <svg class="breadcrumb__separator" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256"><rect width="256" height="256" fill="none"/><polyline points="96 48 176 128 96 208" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="16"/></svg>
      );
    }

    // Default to slash separator
    return (
      <span class="breadcrumb__separator" aria-hidden="true">/</span>
    );
  }

  render() {
    // If there are element children (SVG, icons, etc.), render the slot directly
    // Otherwise, render the truncated text
    const content = this.hasElementChildren ? <slot /> : this.truncateText(this.slotContent);
    const passThroughAttributes = getPassThroughAttributes(this.el, AegovBreadcrumbsItem.PASS_THROUGH_ATTRS);

    if (this.href) {
      return (
        <Host>
          <li
            class="breadcrumb__item"
            itemProp={this.microdata ? "itemListElement" : undefined}
            itemScope={this.microdata ? true : undefined}
            itemType={this.microdata ? "https://schema.org/ListItem" : undefined}
          >
            <a
              href={this.href}
              target={this.target}
              onClick={this.handleClick}
              class="breadcrumb-link"
              itemProp={this.microdata ? "item" : undefined}
              {...passThroughAttributes}
            >
              <span itemProp={this.microdata ? "name" : undefined}>
                {content}
              </span>
            </a>
            {this.microdata && (
              <meta itemProp="position" content={this.position.toString()} />
            )}
            <span>
            {this.renderSeparator()}
            </span>
          </li>
        </Host>
      );
    }

    return (
      <Host>
        <li
          class="breadcrumb__item"
          itemProp={this.microdata ? "itemListElement" : undefined}
          itemScope={this.microdata ? true : undefined}
          itemType={this.microdata ? "https://schema.org/ListItem" : undefined}
        >
          <span
            class="breadcrumb-current"
            aria-current={this.isLast ? 'page' : undefined}
            itemProp={this.microdata ? "name" : undefined}
            {...passThroughAttributes}
          >
            {content}
          </span>
          {this.microdata && (
            <meta itemProp="position" content={this.position.toString()} />
          )}
          {this.renderSeparator()}
        </li>
      </Host>
    );
  }
}
