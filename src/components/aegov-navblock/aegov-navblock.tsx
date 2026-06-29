import { Component, Host, h, Prop, State, Element, Watch } from '@stencil/core';
import { NAVBLOCK_ICONS, NAVBLOCK_SIZES, NAVBLOCK_VARIANTS } from '../../utils/types';
import type { NavblockIcon, NavblockSize, NavblockVariant } from '../../utils/types';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { watchResponsiveProp } from '../../utils/responsive-prop';
import type { ResponsivePropWatcher } from '../../utils/responsive-prop';
import { generateId } from '../../utils/id-generator';

const TAG = 'aegov-navblock';
const ctx = (prop: string) => ({ component: TAG, prop });

/**
 * @component aegov-navblock
 * @description Vertical navigation block, typically used in sidebar layouts.
 * Holds aegov-navblock-item children that may nest recursively. Each parent
 * item collapses/expands its sub-region, similar to an accordion. Cascades
 * `icon` and resolved `size` to all descendant items, and enforces single-vs-
 * multi open behavior at every level via `isMultiple`.
 *
 * @slot title - Custom title content. Overrides the `blockTitle` prop.
 * @slot - aegov-navblock-item top-level children.
 *
 * @example
 * <aegov-navblock block-title="Workspace" label-nav="Project sidebar">
 *   <aegov-navblock-item href="/" is-active>Dashboard</aegov-navblock-item>
 *   <aegov-navblock-item>
 *     Reports
 *     <aegov-navblock-item href="/r/sales">Sales</aegov-navblock-item>
 *     <aegov-navblock-item href="/r/users">Users</aegov-navblock-item>
 *   </aegov-navblock-item>
 * </aegov-navblock>
 */
@Component({
  tag: 'aegov-navblock',
  styleUrl: 'aegov-navblock.css',
  scoped: false,
})
export class AegovNavblock {
  @Element() el!: HTMLElement;

  @State() hasTitleSlot: boolean = false;
  @State() private _resolvedSize: NavblockSize = 'base';

  /** Unique ID for the block wrapper. Auto-generated if not provided. */
  @Prop({ mutable: true, reflect: true }) fieldId?: string;

  /** Block title text shown above items. The `title` slot overrides this. */
  @Prop() blockTitle?: string;

  /** Accessible label for the navigation landmark. */
  @Prop() labelNav: string = 'Sidebar navigation';

  /** Allow multiple items to be open at the same level simultaneously. */
  @Prop() isMultiple: boolean = false;

  /** Expand/collapse icon style for items. */
  @Prop() icon: NavblockIcon = 'chevron';

  /**
   * Size token. Accepts a Tailwind-style responsive string (e.g.
   * `"sm md:base lg:lg"`). Resolves at runtime and cascades to all items.
   */
  @Prop() size: string = 'base';

  /** Wrap the block in a bordered container with padding. */
  @Prop() isBordered: boolean = false;

  /**
   * Visual variant. `collapsible` (default) shows nested items in an
   * animated accordion; `flat` renders all items at the same indentation
   * level with group headers styled bold.
   */
  @Prop() variant: NavblockVariant = 'collapsible';

  /**
   * When `true` and `variant="flat"`, the active item shows a coloured
   * inline-start border as an active indicator (matches the Flux sidebar style).
   */
  @Prop() activeBorder: boolean = false;

  private _sizeWatcher: ResponsivePropWatcher | null = null;

  componentWillLoad() {
    if (!this.fieldId) {
      this.fieldId = generateId('aegov-navblock');
    }
    warnIfInvalidEnumProp(this.icon, NAVBLOCK_ICONS, 'chevron', ctx('icon'));
    warnIfInvalidEnumProp(this.variant, NAVBLOCK_VARIANTS, 'collapsible', ctx('variant'));

    this._sizeWatcher = watchResponsiveProp(this.size, NAVBLOCK_SIZES, 'base', v => {
      this._resolvedSize = v as NavblockSize;
      if (this.el.isConnected) this.syncDescendants();
    });
    this._resolvedSize = this._sizeWatcher.current as NavblockSize;

    this.hasTitleSlot = Array.from(this.el.children).some(
      c => c.getAttribute('slot') === 'title',
    );
  }

  componentDidLoad() {
    this.syncDescendants();
    this.expandAncestorsOfActive();
    this.el.addEventListener('aegovNavblockItemToggle', this.handleItemToggle as EventListener);
    this.el.addEventListener('keydown', this.handleKeyDown);
  }

  componentDidUpdate() {
    this.syncDescendants();
  }

  disconnectedCallback() {
    this._sizeWatcher?.destroy();
    this._sizeWatcher = null;
    this.el.removeEventListener('aegovNavblockItemToggle', this.handleItemToggle as EventListener);
    this.el.removeEventListener('keydown', this.handleKeyDown);
  }

  @Watch('icon')
  onIconChange(v: unknown) {
    warnIfInvalidEnumProp(v, NAVBLOCK_ICONS, 'chevron', ctx('icon'));
    this.syncDescendants();
  }

  @Watch('variant')
  onVariantChange(v: unknown) {
    warnIfInvalidEnumProp(v, NAVBLOCK_VARIANTS, 'collapsible', ctx('variant'));
    this.syncDescendants();
  }

  @Watch('size')
  onSizeChange() {
    this._sizeWatcher?.destroy();
    this._sizeWatcher = watchResponsiveProp(this.size, NAVBLOCK_SIZES, 'base', v => {
      this._resolvedSize = v as NavblockSize;
      if (this.el.isConnected) this.syncDescendants();
    });
    this._resolvedSize = this._sizeWatcher.current as NavblockSize;
    this.syncDescendants();
  }

  /**
   * Push `icon` + resolved `size` down to every descendant item. Items
   * themselves further cascade to their direct sub-items, but pushing from the
   * root every cycle keeps the tree consistent without coordinating updates.
   */
  private syncDescendants() {
    const items = Array.from(
      this.el.querySelectorAll('aegov-navblock-item'),
    ) as HTMLAegovNavblockItemElement[];
    items.forEach(item => {
      item.icon = this.icon;
      item.size = this._resolvedSize;
      item.variant = this.variant;
    });
  }

  /**
   * Walk every descendant item; for each `is-active`, open its ancestor chain
   * up to the navblock root so the active row is visible on initial render.
   */
  private expandAncestorsOfActive() {
    const items = Array.from(
      this.el.querySelectorAll('aegov-navblock-item'),
    ) as HTMLAegovNavblockItemElement[];
    items.forEach(item => {
      if (!item.isActive) return;
      let parent = item.parentElement?.closest('aegov-navblock-item') as HTMLAegovNavblockItemElement | null;
      while (parent) {
        parent.isOpen = true;
        const next = parent.parentElement?.closest('aegov-navblock-item') as HTMLAegovNavblockItemElement | null;
        if (next === parent) break;
        parent = next;
      }
    });
  }

  /**
   * Centralized single-open enforcement: when an item toggles open, close its
   * siblings (items sharing the same direct navblock-item or navblock parent)
   * unless `isMultiple` is enabled.
   */
  private handleItemToggle = (event: CustomEvent<{ open: boolean }>) => {
    const target = event.target as HTMLAegovNavblockItemElement;
    const shouldOpen = event.detail.open;
    target.isOpen = shouldOpen;

    if (shouldOpen && !this.isMultiple) {
      this.closeSiblings(target);
    }
  };

  private openItemWithSingleOpenEnforcement(item: HTMLAegovNavblockItemElement) {
    item.isOpen = true;
    if (!this.isMultiple) this.closeSiblings(item);
  }

  /**
   * Close any sibling `aegov-navblock-item` of `item` (items sharing the same
   * direct parent in the rendered DOM) that is currently open. Stencil's
   * scoped:false rendering moves slotted items into the inner `<ul>`, so the
   * sibling check uses `item.parentElement` directly rather than walking up to
   * the nearest navblock ancestor.
   */
  private closeSiblings(item: HTMLAegovNavblockItemElement) {
    const directParent = item.parentElement;
    if (!directParent) return;
    Array.from(directParent.children).forEach(c => {
      if (
        c.tagName.toLowerCase() === 'aegov-navblock-item' &&
        c !== item &&
        (c as HTMLAegovNavblockItemElement).isOpen
      ) {
        (c as HTMLAegovNavblockItemElement).isOpen = false;
      }
    });
  }

  /** Visible row elements (parent open chain) for arrow-key roving focus. */
  private getVisibleRows(): HTMLElement[] {
    const allItems = Array.from(
      this.el.querySelectorAll('aegov-navblock-item'),
    ) as HTMLAegovNavblockItemElement[];

    const visible = allItems.filter(item => {
      // Walk ancestor chain; if any ancestor item is closed, this item is hidden.
      let ancestor = item.parentElement?.closest('aegov-navblock-item') as HTMLAegovNavblockItemElement | null;
      while (ancestor) {
        if (!ancestor.isOpen) return false;
        ancestor = ancestor.parentElement?.closest('aegov-navblock-item') as HTMLAegovNavblockItemElement | null;
      }
      return true;
    });

    const rows: HTMLElement[] = [];
    visible.forEach(item => {
      const row = item.querySelector(':scope > li > .aegov-navblock-item__row') as HTMLElement | null;
      if (row && !row.hasAttribute('disabled') && row.getAttribute('aria-disabled') !== 'true') {
        rows.push(row);
      }
    });
    return rows;
  }

  private handleKeyDown = (event: KeyboardEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest('aegov-navblock-item')) return;
    if (!target.classList.contains('aegov-navblock-item__row')) return;

    const rows = this.getVisibleRows();
    if (rows.length === 0) return;
    const idx = rows.indexOf(target);
    if (idx === -1) return;

    const item = target.closest('aegov-navblock-item') as HTMLAegovNavblockItemElement;
    // Toggle rows expose `aria-expanded`; leaf rows don't. Cheaper and more
    // direct than walking into the rendered <li> for a class check.
    const hasChildren = target.hasAttribute('aria-expanded');

    let nextIdx = -1;
    switch (event.key) {
      case 'ArrowDown':
        nextIdx = (idx + 1) % rows.length;
        break;
      case 'ArrowUp':
        nextIdx = (idx - 1 + rows.length) % rows.length;
        break;
      case 'Home':
        nextIdx = 0;
        break;
      case 'End':
        nextIdx = rows.length - 1;
        break;
      case 'ArrowRight':
        if (hasChildren && !item.isOpen) {
          event.preventDefault();
          this.openItemWithSingleOpenEnforcement(item);
        }
        return;
      case 'ArrowLeft':
        if (hasChildren && item.isOpen) {
          event.preventDefault();
          item.isOpen = false;
          return;
        }
        // Leaf: focus parent item's row, if any.
        {
          const parentItem = item.parentElement?.closest('aegov-navblock-item') as HTMLAegovNavblockItemElement | null;
          if (parentItem) {
            const parentRow = parentItem.querySelector(':scope > li > .aegov-navblock-item__row') as HTMLElement | null;
            if (parentRow) {
              event.preventDefault();
              parentRow.focus();
            }
          }
        }
        return;
      default:
        return;
    }

    if (nextIdx >= 0) {
      event.preventDefault();
      rows[nextIdx].focus();
    }
  };

  render() {
    const classes = {
      'aegov-navblock': true,
      [`navblock--${this._resolvedSize}`]: true,
      [`navblock--${this.variant}`]: true,
      'navblock--active-border': this.activeBorder,
      'aegov-navblock--bordered': this.isBordered,
    };

    return (
      <Host>
        <nav class={classes} aria-label={this.labelNav} id={this.fieldId}>
          {(this.hasTitleSlot || this.blockTitle) && (
            <h2 class="aegov-navblock__title">
              {this.hasTitleSlot ? <slot name="title" /> : this.blockTitle}
            </h2>
          )}
          <ul class="aegov-navblock__list" role="list">
            <slot />
          </ul>
        </nav>
      </Host>
    );
  }
}
