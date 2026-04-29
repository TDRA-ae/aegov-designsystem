import { Component, Host, h, Prop, State, Event, EventEmitter, Element, Listen, Watch } from '@stencil/core';
import { SELECT_VARIANTS, SELECT_SIZES } from '../../utils/types';
import type { SelectVariant, SelectSize, SelectChangeDetail } from '../../utils/types';
import { getPassThroughAttributes } from '../../utils/attributes';
import { generateId } from '../../utils/id-generator';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { watchResponsiveProp } from '../../utils/responsive-prop';
import type { ResponsivePropWatcher } from '../../utils/responsive-prop';

const TAG = 'aegov-select';
const ctx = (prop: string) => ({ component: TAG, prop });

interface OptionItem {
  value: string;
  label: string;
  disabled: boolean;
  group?: string;
}

@Component({
  tag: 'aegov-select',
  styleUrl: 'aegov-select.css',
  scoped: false,
  shadow: false,
})
export class AegovSelect {
  @Element() el: HTMLElement;

  /** Unique ID for the select element. Auto-generated if not provided. */
  @Prop({ mutable: true, reflect: true }) fieldId?: string;

  /** The visual variant. 'default' renders a native select; 'listbox' renders a custom dropdown. */
  @Prop() variant: SelectVariant = 'default';

  /** The size of the select. Matches aegov-input height. */
  @Prop() size: string = 'base';
  @State() private _resolvedSize: SelectSize = 'base';
  private _sizeWatcher: ResponsivePropWatcher | null = null;

  /** Whether multiple selection is enabled. Forces listbox behaviour. */
  @Prop() multiple: boolean = false;

  /** Whether the select is disabled. */
  @Prop() disabled: boolean = false;

  /** Placeholder text shown when nothing is selected. */
  @Prop() placeholder?: string;

  /** The current selected value. For multiple, a comma-separated string. */
  @Prop({ mutable: true }) value: string = '';

  /** The name attribute for form submission. */
  @Prop() name?: string;

  /** Whether the select is required. */
  @Prop() required: boolean = false;

  /** Show a search input in the listbox dropdown to filter options. Only works with listbox variant. */
  @Prop() searchable: boolean = false;

  /** Message shown when search yields no results. */
  @Prop() emptyMessage: string = 'No results found';

  /** Max visible items in the dropdown before scrolling. */
  @Prop() visibleItems: number = 6;

  /** Show a clear button to reset selection. */
  @Prop() clearable: boolean = false;

  /** Additional CSS classes to apply. */
  @Prop() class?: string;

  @State() isOpen: boolean = false;
  @State() searchQuery: string = '';
  @State() focusedIndex: number = -1;
  @State() parsedOptions: OptionItem[] = [];

  private listboxRef?: HTMLDivElement;
  private triggerRef?: HTMLDivElement;
  private searchInputRef?: HTMLInputElement;
  private selectId: string;
  private cachedSelectedValues: string[] = [];
  private cachedDisplayText: string = '';

  /** Emitted when the selected value changes. */
  @Event() aegovSelectChange: EventEmitter<SelectChangeDetail>;

  /** Emitted when the dropdown opens (listbox variant). */
  @Event() aegovSelectOpen: EventEmitter<void>;

  /** Emitted when the dropdown closes (listbox variant). */
  @Event() aegovSelectClose: EventEmitter<void>;

  componentWillLoad() {
    warnIfInvalidEnumProp(this.variant, SELECT_VARIANTS, 'default', ctx('variant'));
    this._sizeWatcher = watchResponsiveProp(this.size, SELECT_SIZES, 'base', v => {
      this._resolvedSize = v as SelectSize;
    });
    this._resolvedSize = this._sizeWatcher.current as SelectSize;
    if (!this.fieldId) {
      this.fieldId = generateId('aegov-select');
    }
    this.selectId = `${this.fieldId}-listbox`;
    this.parseOptions();
    this.updateDerivedState();
  }

  disconnectedCallback() {
    this._sizeWatcher?.destroy();
  }

  @Watch('variant')
  onVariantChange(v: unknown) { warnIfInvalidEnumProp(v, SELECT_VARIANTS, 'default', ctx('variant')); }

  @Watch('size')
  onSizeChange() {
    this._sizeWatcher?.destroy();
    this._sizeWatcher = watchResponsiveProp(this.size, SELECT_SIZES, 'base', v => {
      this._resolvedSize = v as SelectSize;
    });
    this._resolvedSize = this._sizeWatcher.current as SelectSize;
  }

  componentDidLoad() {
    // Re-parse if children weren't available during componentWillLoad
    if (this.parsedOptions.length === 0) {
      this.parseOptions();
      this.updateDerivedState();
    }
  }

  componentDidUpdate() {
    if (this.isOpen && this.listboxRef) {
      this.positionDropdown();
    }
  }

  /** Whether to use the custom listbox rendering. */
  private get useListbox(): boolean {
    return this.variant === 'listbox' || this.multiple;
  }

  /** Current selected values as an array (cached). */
  private get selectedValues(): string[] {
    return this.cachedSelectedValues;
  }

  /** Get the display text for the trigger (cached). */
  private get displayText(): string {
    return this.cachedDisplayText;
  }

  @Watch('value')
  onValueChange() {
    this.updateDerivedState();
  }

  /** Recompute cached selectedValues and displayText from this.value. */
  private updateDerivedState() {
    this.cachedSelectedValues = !this.value
      ? []
      : this.value.split(',').filter(v => v !== '');

    const selected = this.cachedSelectedValues;
    if (selected.length === 0) {
      this.cachedDisplayText = '';
    } else if (this.multiple) {
      this.cachedDisplayText = `${selected.length} selected`;
    } else {
      const option = this.parsedOptions.find(o => o.value === selected[0]);
      this.cachedDisplayText = option ? option.label : selected[0];
    }
  }

  /** Parse option children into a flat list. */
  private parseOptions() {
    const items: OptionItem[] = [];

    // Find all option-group elements (may be direct children or inside slot container)
    const groups = Array.from(this.el.querySelectorAll('aegov-select-option-group'));
    const groupedOptionEls = new Set<Element>();

    for (const group of groups) {
      const groupLabel = group.getAttribute('label') || '';
      const groupOptions = Array.from(group.querySelectorAll('aegov-select-option'));
      for (const opt of groupOptions) {
        groupedOptionEls.add(opt);
        items.push({
          value: opt.getAttribute('value') || '',
          label: opt.textContent?.trim() || '',
          disabled: opt.hasAttribute('disabled'),
          group: groupLabel,
        });
      }
    }

    // Find ungrouped options
    const allOptions = Array.from(this.el.querySelectorAll('aegov-select-option'));
    for (const opt of allOptions) {
      if (!groupedOptionEls.has(opt)) {
        items.push({
          value: opt.getAttribute('value') || '',
          label: opt.textContent?.trim() || '',
          disabled: opt.hasAttribute('disabled'),
        });
      }
    }

    this.parsedOptions = items;
  }

  /** Filtered options based on search query. */
  private get filteredOptions(): OptionItem[] {
    if (!this.searchQuery) return this.parsedOptions;
    const query = this.searchQuery.toLowerCase();
    return this.parsedOptions.filter(o => o.label.toLowerCase().includes(query));
  }

  /** Get unique group labels in order from filtered options. */
  private get groupedFilteredOptions(): { group: string | null; options: OptionItem[] }[] {
    const groups: { group: string | null; options: OptionItem[] }[] = [];
    const seenGroups = new Map<string | null, OptionItem[]>();

    for (const opt of this.filteredOptions) {
      const key = opt.group || null;
      if (!seenGroups.has(key)) {
        const arr: OptionItem[] = [];
        seenGroups.set(key, arr);
        groups.push({ group: key, options: arr });
      }
      seenGroups.get(key)!.push(opt);
    }

    return groups;
  }


  // --- Native select handlers ---

  private handleNativeChange = (event: Event) => {
    const select = event.target as HTMLSelectElement;
    this.value = select.value;
    const opt = this.parsedOptions.find(o => o.value === select.value);
    this.aegovSelectChange.emit({
      value: this.value,
      label: opt ? opt.label : this.value,
    });
  };

  // --- Listbox handlers ---

  private toggleDropdown = () => {
    if (this.disabled) return;
    if (this.isOpen) {
      this.closeDropdown();
    } else {
      this.openDropdown();
    }
  };

  private openDropdown() {
    this.isOpen = true;
    this.searchQuery = '';
    this.focusedIndex = -1;
    this.aegovSelectOpen.emit();
    // Focus search input or first option after render
    requestAnimationFrame(() => {
      if (this.searchInputRef) {
        this.searchInputRef.focus();
      }
      this.positionDropdown();
    });
  }

  private closeDropdown() {
    this.isOpen = false;
    this.searchQuery = '';
    this.focusedIndex = -1;
    this.aegovSelectClose.emit();
    // Return focus to trigger
    const trigger = this.triggerRef?.querySelector('button');
    if (trigger) trigger.focus();
  }

  private positionDropdown() {
    if (!this.listboxRef || !this.triggerRef) return;

    const triggerRect = this.triggerRef.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const spaceBelow = viewportHeight - triggerRect.bottom - 8;
    const spaceAbove = triggerRect.top - 8;

    // Calculate item height based on size
    const itemHeightMap: Record<SelectSize, number> = { xs: 32, sm: 36, base: 40, lg: 44, xl: 48 };
    const searchHeightMap: Record<SelectSize, number> = { xs: 36, sm: 40, base: 44, lg: 48, xl: 52 };
    const itemHeight = itemHeightMap[this._resolvedSize];
    const searchHeight = this.searchable ? searchHeightMap[this._resolvedSize] : 0;
    const padding = 8; // py-1 top + bottom
    const actualItemCount = Math.min(this.filteredOptions.length, this.visibleItems);
    const desiredHeight = (actualItemCount * itemHeight) + searchHeight + padding;

    // Decide direction
    const openAbove = spaceBelow < desiredHeight && spaceAbove > spaceBelow;

    this.listboxRef.style.maxHeight = `${Math.min(desiredHeight, openAbove ? spaceAbove : spaceBelow)}px`;

    if (openAbove) {
      this.listboxRef.classList.add('select__listbox--above');
      this.listboxRef.classList.remove('select__listbox--below');
    } else {
      this.listboxRef.classList.add('select__listbox--below');
      this.listboxRef.classList.remove('select__listbox--above');
    }
  }

  private selectOption(option: OptionItem) {
    if (option.disabled) return;

    if (this.multiple) {
      const selected = new Set(this.selectedValues);
      if (selected.has(option.value)) {
        selected.delete(option.value);
      } else {
        selected.add(option.value);
      }
      this.value = Array.from(selected).join(',');

      const selectedLabels = this.parsedOptions
        .filter(o => selected.has(o.value))
        .map(o => o.label);

      this.aegovSelectChange.emit({
        value: Array.from(selected),
        label: selectedLabels,
      });
    } else {
      this.value = option.value;
      this.aegovSelectChange.emit({
        value: option.value,
        label: option.label,
      });
      this.closeDropdown();
    }
  }

  private handleClear = (event: MouseEvent) => {
    event.stopPropagation();
    this.value = '';
    this.aegovSelectChange.emit({
      value: this.multiple ? [] : '',
      label: this.multiple ? [] : '',
    });
  };

  private handleSearchInput = (event: Event) => {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;
    this.focusedIndex = -1;
  };

  @Listen('click', { target: 'document' })
  handleDocumentClick(event: MouseEvent) {
    if (this.isOpen) {
      const target = event.target as Node;
      if (!this.el.contains(target)) {
        this.closeDropdown();
      }
    }
  }

  @Listen('keydown')
  handleKeyDown(event: KeyboardEvent) {
    if (!this.useListbox) return;

    if (!this.isOpen) {
      if (event.key === 'Enter' || event.key === ' ' || event.key === 'ArrowDown') {
        event.preventDefault();
        this.openDropdown();
      }
      return;
    }

    const options = this.filteredOptions.filter(o => !o.disabled);

    switch (event.key) {
      case 'Escape':
        event.preventDefault();
        this.closeDropdown();
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.focusedIndex = Math.min(this.focusedIndex + 1, options.length - 1);
        this.scrollFocusedIntoView();
        break;
      case 'ArrowUp':
        event.preventDefault();
        this.focusedIndex = Math.max(this.focusedIndex - 1, 0);
        this.scrollFocusedIntoView();
        break;
      case 'Enter':
      case ' ':
        if (this.searchable && event.key === ' ') return; // Allow space in search
        event.preventDefault();
        if (this.focusedIndex >= 0 && this.focusedIndex < options.length) {
          this.selectOption(options[this.focusedIndex]);
        }
        break;
      case 'Home':
        event.preventDefault();
        this.focusedIndex = 0;
        this.scrollFocusedIntoView();
        break;
      case 'End':
        event.preventDefault();
        this.focusedIndex = options.length - 1;
        this.scrollFocusedIntoView();
        break;
    }
  }

  private scrollFocusedIntoView() {
    requestAnimationFrame(() => {
      const focused = this.el.querySelector('.select__option--focused');
      if (focused) {
        focused.scrollIntoView({ block: 'nearest' });
      }
    });
  }

  @Watch('isOpen')
  onOpenChange() {
    if (this.isOpen) {
      this.parseOptions();
      this.updateDerivedState();
    }
  }

  /** Generate a stable option ID from value. */
  private getOptionId(value: string): string {
    return `${this.selectId}-opt-${value}`;
  }

  /** Generate a stable group label ID. */
  private getGroupId(label: string): string {
    return `${this.selectId}-group-${label.replace(/\s+/g, '-').toLowerCase()}`;
  }

  /** Get the ID of the currently focused option (for aria-activedescendant). */
  private get activeDescendantId(): string | undefined {
    if (!this.isOpen || this.focusedIndex < 0) return undefined;
    const enabledOptions = this.filteredOptions.filter(o => !o.disabled);
    const focused = enabledOptions[this.focusedIndex];
    return focused ? this.getOptionId(focused.value) : undefined;
  }

  // --- Rendering ---

  private getTriggerClasses(): string {
    const classes: string[] = ['aegov-select'];
    const sizeClasses: Record<SelectSize, string> = {
      xs: 'select--xs',
      sm: 'select--sm',
      base: 'select--base',
      lg: 'select--lg',
      xl: 'select--xl',
    };
    classes.push(sizeClasses[this._resolvedSize]);
    if (this.disabled) classes.push('select--disabled');
    if (this.isOpen) classes.push('select--open');
    if (!this.displayText) classes.push('select--placeholder');
    if (this.class) classes.push(this.class);
    return classes.join(' ');
  }

  private renderNativeSelect() {
    const passThroughAttrs = getPassThroughAttributes(this.el);
    const sizeClasses: Record<SelectSize, string> = {
      xs: 'select--xs',
      sm: 'select--sm',
      base: 'select--base',
      lg: 'select--lg',
      xl: 'select--xl',
    };
    const groups = this.groupedFilteredOptions;

    return (
      <Host>
        <div class="select__native-wrapper">
          <select
            id={this.fieldId}
            class={`aegov-select ${sizeClasses[this._resolvedSize]}${this.class ? ` ${this.class}` : ''}`}
            disabled={this.disabled}
            name={this.name}
            required={this.required}
            onChange={this.handleNativeChange}
            {...passThroughAttrs}
          >
            {this.placeholder && (
              <option value="" disabled selected={!this.value}>
                {this.placeholder}
              </option>
            )}
            {groups.map(g => {
              if (g.group) {
                return (
                  <optgroup label={g.group}>
                    {g.options.map(opt => (
                      <option
                        value={opt.value}
                        disabled={opt.disabled}
                        selected={opt.value === this.value}
                      >
                        {opt.label}
                      </option>
                    ))}
                  </optgroup>
                );
              }
              return g.options.map(opt => (
                <option
                  value={opt.value}
                  disabled={opt.disabled}
                  selected={opt.value === this.value}
                >
                  {opt.label}
                </option>
              ));
            })}
          </select>
        </div>
        {/* Hidden slot for option children */}
        <div class="select__slot-container">
          <slot />
        </div>
      </Host>
    );
  }

  private renderListbox() {
    const groups = this.groupedFilteredOptions;
    const enabledOptions = this.filteredOptions.filter(o => !o.disabled);
    return (
      <Host>
        <div
          class="select__trigger-wrapper"
          ref={el => this.triggerRef = el}
        >
          <button
            type="button"
            id={this.fieldId}
            class={this.getTriggerClasses()}
            onClick={this.toggleDropdown}
            disabled={this.disabled}
            role="combobox"
            aria-expanded={this.isOpen ? 'true' : 'false'}
            aria-haspopup="listbox"
            aria-controls={this.isOpen ? this.selectId : undefined}
            aria-activedescendant={this.activeDescendantId}
          >
            <span class="select__value">
              {this.displayText || this.placeholder || ''}
            </span>
            <span class="select__actions">
              {this.clearable && this.selectedValues.length > 0 && !this.disabled && (
                <span
                  class="select__clear"
                  onClick={this.handleClear}
                  role="button"
                  aria-label="Clear selection"
                  tabindex={-1}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </span>
              )}
              <span class={`select__arrow${this.isOpen ? ' select__arrow--open' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </span>
          </button>

          {this.isOpen && (
            <div
              class="select__listbox"
              ref={el => this.listboxRef = el}
              role="listbox"
              id={this.selectId}
              aria-multiselectable={this.multiple ? 'true' : undefined}
            >
              {this.searchable && (
                <div class="select__search">
                  <input
                    type="text"
                    class={`select__search-input select__search-input--${this._resolvedSize}`}
                    placeholder="Search..."
                    value={this.searchQuery}
                    onInput={this.handleSearchInput}
                    ref={el => this.searchInputRef = el}
                    role="searchbox"
                    aria-label="Search options"
                    aria-controls={this.selectId}
                    aria-activedescendant={this.activeDescendantId}
                    autocomplete="off"
                  />
                </div>
              )}
              <div class="select__options">
                {groups.length === 0 && (
                  <div class="select__empty" role="status">{this.emptyMessage}</div>
                )}
                {groups.map(g => {
                  const groupLabelId = g.group ? this.getGroupId(g.group) : undefined;
                  const optionElements = g.options.map(opt => {
                    const isSelected = this.selectedValues.includes(opt.value);
                    const enabledIndex = enabledOptions.indexOf(opt);
                    const isFocused = enabledIndex === this.focusedIndex;
                    return (
                      <div
                        id={this.getOptionId(opt.value)}
                        class={
                          `select__option select__option--${this._resolvedSize}` +
                          (isSelected ? ' select__option--selected' : '') +
                          (opt.disabled ? ' select__option--disabled' : '') +
                          (isFocused ? ' select__option--focused' : '')
                        }
                        role="option"
                        aria-selected={isSelected ? 'true' : 'false'}
                        aria-disabled={opt.disabled ? 'true' : undefined}
                        onClick={() => this.selectOption(opt)}
                        data-value={opt.value}
                      >
                        {this.multiple && (
                          <span class="select__checkbox">
                            {isSelected && (
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            )}
                          </span>
                        )}
                        <span class="select__option-label">{opt.label}</span>
                        {!this.multiple && isSelected && (
                          <svg class="select__check-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </div>
                    );
                  });

                  if (g.group) {
                    return (
                      <div role="group" aria-labelledby={groupLabelId}>
                        <div id={groupLabelId} class="select__group-label">{g.group}</div>
                        {optionElements}
                      </div>
                    );
                  }
                  return optionElements;
                })}
              </div>
            </div>
          )}
        </div>
        {/* Hidden slot for option children */}
        <div class="select__slot-container">
          <slot />
        </div>
        {/* Hidden native input for form submission */}
        {this.name && (
          <input type="hidden" name={this.name} value={this.value} />
        )}
      </Host>
    );
  }

  render() {
    if (this.useListbox) {
      return this.renderListbox();
    }
    return this.renderNativeSelect();
  }
}
