import { Component, Host, h, Prop, Element, Watch } from '@stencil/core';
import { AccordionIcon } from '../../utils/types';

/**
 * Accordion component for collapsible content sections
 *
 * @slot - Accordion items (aegov-accordion-item elements)
 */
@Component({
  tag: 'aegov-accordion',
  styleUrl: 'aegov-accordion.css',
  scoped: false,
})
export class AegovAccordion {
  @Element() el: HTMLElement;

  /**
   * Whether multiple accordion items can be open at the same time
   */
  @Prop() allowMultiple: boolean = false;

  /**
   * Index of the accordion item to open by default (0-based)
   */
  @Prop() defaultOpen?: number;

  /**
   * Icon style for accordion items
   */
  @Prop() icon: AccordionIcon = 'chevron';

  /**
   * Whether to show border around the accordion
   */
  @Prop() bordered: boolean = false;

  componentDidLoad() {
    this.updateItems();
    this.setupEventListeners();

    // Open default item if specified
    if (this.defaultOpen !== undefined) {
      const items = this.getItems();
      if (items && items[this.defaultOpen]) {
        items[this.defaultOpen].open = true;
      }
    }

    // Set icon on all items
    this.setIconOnItems();
  }

  componentDidUpdate() {
    this.updateItems();
  }

  @Watch('allowMultiple')
  @Watch('defaultOpen')
  handlePropChange() {
    this.updateItems();
  }

  @Watch('icon')
  handleIconChange() {
    this.setIconOnItems();
  }

  private setIconOnItems() {
    const items = this.getItems();
    items.forEach((item, index) => {
      item.icon = this.icon;

      // Set first/last flags
      item.isFirst = index === 0;
      item.isLast = index === items.length - 1;
    });
  }

  private getItems(): HTMLAegovAccordionItemElement[] {
    // Get all accordion items, but filter to only direct children
    const allItems = Array.from(
      this.el.querySelectorAll('aegov-accordion-item')
    ) as HTMLAegovAccordionItemElement[];

    // Filter to only items that are direct children of this accordion
    return allItems.filter((item) => {
      // Find the closest accordion parent
      const parentAccordion = item.parentElement?.closest('aegov-accordion');
      // Only include if the parent accordion is this element
      return parentAccordion === this.el;
    });
  }

  private updateItems() {
    // This method ensures items are queried and available
    // The actual work is done in setupEventListeners()
    this.getItems();
  }

  private setupEventListeners() {
    const items = this.getItems();

    items.forEach((item, index) => {
      item.addEventListener('aegovAccordionItemToggle', ((event: CustomEvent<{ open: boolean }>) => {
        // Only handle events from direct children, not nested accordion items
        const eventTarget = event.target as HTMLAegovAccordionItemElement;
        const isDirectChild = items.includes(eventTarget);

        if (!isDirectChild) {
          // This event is from a nested accordion, ignore it
          return;
        }

        // Stop propagation to prevent parent accordions from handling this event
        event.stopPropagation();

        const shouldOpen = event.detail.open;

        if (shouldOpen && !this.allowMultiple) {
          // Close all other items
          items.forEach((otherItem, otherIndex) => {
            if (otherIndex !== index) {
              otherItem.open = false;
            }
          });
        }

        // Toggle the clicked item
        item.open = shouldOpen;
      }) as EventListener);
    });
  }

  render() {
    const classes = [
      'aegov-accordion',
      this.bordered && 'accordion--bordered'
    ].filter(Boolean).join(' ');

    return (
      <Host>
        <div class={classes}>
          <slot />
        </div>
      </Host>
    );
  }
}
