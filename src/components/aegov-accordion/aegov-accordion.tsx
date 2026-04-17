import { Component, Host, h, Prop, Element, Watch } from '@stencil/core';
import { AccordionIcon, ACCORDION_ICONS } from '../../utils/types';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';

const TAG = 'aegov-accordion';
const ctx = (prop: string) => ({ component: TAG, prop });

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

  private itemListeners: Map<HTMLElement, EventListener> = new Map();
  private cachedItems: HTMLAegovAccordionItemElement[] = [];

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

  componentWillLoad() {
    warnIfInvalidEnumProp(this.icon, ACCORDION_ICONS, 'chevron', ctx('icon'));
  }

  componentDidLoad() {
    this.refreshItemCache();
    this.setupEventListeners();

    // Open default item if specified
    if (this.defaultOpen !== undefined) {
      const items = this.cachedItems;
      if (items[this.defaultOpen]) {
        items[this.defaultOpen].open = true;
      }
    }

    // Set icon and position flags on all items
    this.syncItemProps();
  }

  disconnectedCallback() {
    this.removeEventListeners();
    this.cachedItems = [];
  }

  @Watch('icon')
  onIconChange(v: unknown) { warnIfInvalidEnumProp(v, ACCORDION_ICONS, 'chevron', ctx('icon')); }

  @Watch('icon')
  handleIconChange() {
    this.syncItemProps();
  }

  private refreshItemCache() {
    const allItems = Array.from(
      this.el.querySelectorAll('aegov-accordion-item')
    ) as HTMLAegovAccordionItemElement[];

    this.cachedItems = allItems.filter((item) => {
      const parentAccordion = item.parentElement?.closest('aegov-accordion');
      return parentAccordion === this.el;
    });
  }

  private syncItemProps() {
    this.cachedItems.forEach((item, index) => {
      item.icon = this.icon;
      item.isFirst = index === 0;
      item.isLast = index === this.cachedItems.length - 1;
    });
  }

  private removeEventListeners() {
    this.itemListeners.forEach((listener, item) => {
      item.removeEventListener('aegovAccordionItemToggle', listener);
    });
    this.itemListeners.clear();
  }

  private setupEventListeners() {
    this.removeEventListeners();

    const items = this.cachedItems;

    items.forEach((item, index) => {
      const listener = ((event: CustomEvent<{ open: boolean }>) => {
        const eventTarget = event.target as HTMLAegovAccordionItemElement;
        const isDirectChild = items.includes(eventTarget);

        if (!isDirectChild) {
          return;
        }

        event.stopPropagation();

        const shouldOpen = event.detail.open;

        if (shouldOpen && !this.allowMultiple) {
          items.forEach((otherItem, otherIndex) => {
            if (otherIndex !== index) {
              otherItem.open = false;
            }
          });
        }

        item.open = shouldOpen;
      }) as EventListener;

      item.addEventListener('aegovAccordionItemToggle', listener);
      this.itemListeners.set(item, listener);
    });
  }

  render() {
    const classes = [
      'aegov-accordion',
      this.bordered && 'aegov-accordion__bordered'
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
