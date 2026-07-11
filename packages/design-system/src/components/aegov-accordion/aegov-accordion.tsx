import { Component, Host, h, Prop, State, Element, Watch, Listen } from '@stencil/core';
import { AccordionIcon, ACCORDION_ICONS, AccordionSize, ACCORDION_SIZES } from '../../utils/types';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { watchResponsiveProp } from '../../utils/responsive-prop';
import type { ResponsivePropWatcher } from '../../utils/responsive-prop';
import { generateId } from '../../utils/id-generator';

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
  @Element() el!: HTMLElement;

  private itemListeners: Map<HTMLElement, EventListener> = new Map();
  private cachedItems: HTMLAegovAccordionItemElement[] = [];

  /**
   * Unique ID for the accordion wrapper element. Auto-generated if not provided.
   */
  @Prop({ mutable: true, reflect: true }) fieldId?: string;

  /**
   * Whether multiple accordion items can be open at the same time
   */
  @Prop() isMultiple: boolean = false;

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
  @Prop() isBordered: boolean = false;

  /**
   * Size of the accordion items — controls heading font size.
   * sm = 14px, base = 16px (default), lg = 18px
   */
  @Prop() size: string = 'base';

  /**
   * Heading level for accordion item triggers (1–6).
   * Cascaded to all child aegov-accordion-item elements.
   * @default 3
   */
  @Prop() headingLevel: number = 3;
  @State() private _resolvedSize: AccordionSize = 'base';
  private _sizeWatcher: ResponsivePropWatcher | null = null;

  componentWillLoad() {
    if (!this.fieldId) {
      this.fieldId = generateId('aegov-accordion');
    }

    // Auto-increment heading level when nested inside an aegov-accordion-item,
    // unless the author explicitly set heading-level on this element.
    if (!this.el.hasAttribute('heading-level')) {
      const parentItem = this.el.closest('aegov-accordion-item');
      if (parentItem) {
        const parentAccordion = parentItem.closest('aegov-accordion') as any;
        if (parentAccordion) {
          this.headingLevel = Math.min(6, (parentAccordion.headingLevel || 3) + 1);
        }
      }
    }

    warnIfInvalidEnumProp(this.icon, ACCORDION_ICONS, 'chevron', ctx('icon'));
    this._sizeWatcher = watchResponsiveProp(this.size, ACCORDION_SIZES, 'base', v => {
      this._resolvedSize = v as AccordionSize;
      if (this.el.isConnected) { this.syncItemProps(); }
    });
    this._resolvedSize = this._sizeWatcher.current as AccordionSize;
  }

  componentDidLoad() {
    this.refreshItemCache();
    this.setupEventListeners();

    // Open default item if specified
    if (this.defaultOpen !== undefined) {
      const items = this.cachedItems;
      if (items[this.defaultOpen]) {
        items[this.defaultOpen].isOpen = true;
      }
    }

    // Set icon and position flags on all items
    this.syncItemProps();
  }

  disconnectedCallback() {
    this._sizeWatcher?.destroy();
    this.removeEventListeners();
    this.cachedItems = [];
  }

  @Watch('icon')
  onIconChange(v: unknown) {
    warnIfInvalidEnumProp(v, ACCORDION_ICONS, 'chevron', ctx('icon'));
    this.syncItemProps();
  }

  @Watch('size')
  onSizeChange() {
    this._sizeWatcher?.destroy();
    this._sizeWatcher = watchResponsiveProp(this.size, ACCORDION_SIZES, 'base', v => {
      this._resolvedSize = v as AccordionSize;
      if (this.el.isConnected) { this.syncItemProps(); }
    });
    this._resolvedSize = this._sizeWatcher.current as AccordionSize;
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
      item.size = this._resolvedSize;
      item.headingLevel = this.headingLevel;
      item.isFirst = index === 0;
      item.isLast = index === this.cachedItems.length - 1;
    });
  }

  @Listen('keydown')
  handleKeyDown(event: KeyboardEvent) {
    const target = event.target as HTMLElement;
    if (!target.classList.contains('accordion-item__header')) return;

    // Scope check: only handle buttons that belong to THIS accordion, not a nested one.
    // Without this, a button inside a child aegov-accordion would bubble up and be
    // processed by BOTH the inner and outer accordion handlers, breaking navigation.
    if (target.closest('aegov-accordion') !== this.el) return;

    // Only include buttons belonging to this accordion's own items (not nested accordions).
    const buttons = Array.from(
      this.el.querySelectorAll<HTMLButtonElement>('button.accordion-item__header:not([aria-disabled="true"])'),
    ).filter(btn => btn.closest('aegov-accordion') === this.el);

    if (buttons.length === 0) return;

    const currentIndex = buttons.indexOf(target as HTMLButtonElement);

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        buttons[(currentIndex + 1) % buttons.length].focus();
        break;
      case 'ArrowUp':
        event.preventDefault();
        buttons[(currentIndex - 1 + buttons.length) % buttons.length].focus();
        break;
      case 'Home':
        event.preventDefault();
        buttons[0].focus();
        break;
      case 'End':
        event.preventDefault();
        buttons[buttons.length - 1].focus();
        break;
    }
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

        if (shouldOpen && !this.isMultiple) {
          items.forEach((otherItem, otherIndex) => {
            if (otherIndex !== index) {
              otherItem.isOpen = false;
            }
          });
        }

        item.isOpen = shouldOpen;
      }) as EventListener;

      item.addEventListener('aegovAccordionItemToggle', listener);
      this.itemListeners.set(item, listener);
    });
  }

  render() {
    const classes = [
      'aegov-accordion',
      this.isBordered && 'aegov-accordion__bordered'
    ].filter(Boolean).join(' ');

    return (
      <Host>
        <div class={classes} id={this.fieldId}>
          <slot />
        </div>
      </Host>
    );
  }
}
