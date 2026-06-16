import { EventEmitter } from '@stencil/core';
import type { SelectVariant, SelectChangeDetail } from '../../utils/types';
interface OptionItem {
    value: string;
    label: string;
    disabled: boolean;
    group?: string;
}
export declare class AegovSelect {
    el: HTMLElement;
    /** Native select attributes to pass through to the inner select element. */
    private static readonly PASS_THROUGH_ATTRS;
    /** Unique ID for the select element. Auto-generated if not provided. */
    fieldId?: string;
    /** The visual variant. 'default' renders a native select; 'listbox' renders a custom dropdown. */
    variant: SelectVariant;
    /** The size of the select. Matches aegov-input height. */
    size: string;
    private _resolvedSize;
    private _sizeWatcher;
    /** Whether multiple selection is enabled. Forces listbox behaviour. */
    isMultiple: boolean;
    /** Whether the select is disabled. */
    isDisabled: boolean;
    /** Placeholder text shown when nothing is selected. */
    placeholder?: string;
    /** The current selected value. For multiple, a comma-separated string. */
    value: string;
    /** The name attribute for form submission. */
    name?: string;
    /** Whether the select is required. */
    isRequired: boolean;
    /** Show a search input in the listbox dropdown to filter options. Only works with listbox variant. */
    isSearchable: boolean;
    /** Message shown when search yields no results. */
    emptyMessage: string;
    /** Max visible items in the dropdown before scrolling. */
    visibleItems: number;
    /** Show a clear button to reset selection. */
    isClearable: boolean;
    /** Additional CSS classes to apply. */
    extraClass?: string;
    isOpen: boolean;
    searchQuery: string;
    focusedIndex: number;
    parsedOptions: OptionItem[];
    private listboxRef?;
    private triggerRef?;
    private searchInputRef?;
    private selectId;
    private cachedSelectedValues;
    private cachedDisplayText;
    /** Emitted when the selected value changes. */
    aegovSelectChange: EventEmitter<SelectChangeDetail>;
    /** Emitted when the dropdown opens (listbox variant). */
    aegovSelectOpen: EventEmitter<void>;
    /** Emitted when the dropdown closes (listbox variant). */
    aegovSelectClose: EventEmitter<void>;
    componentWillLoad(): void;
    disconnectedCallback(): void;
    onVariantChange(v: unknown): void;
    onSizeChange(): void;
    componentDidLoad(): void;
    componentDidUpdate(): void;
    /** Whether to use the custom listbox rendering. */
    private get useListbox();
    /** Current selected values as an array (cached). */
    private get selectedValues();
    /** Get the display text for the trigger (cached). */
    private get displayText();
    onValueChange(): void;
    /** Recompute cached selectedValues and displayText from this.value. */
    private updateDerivedState;
    /** Parse option children into a flat list. */
    private parseOptions;
    /** Filtered options based on search query. */
    private get filteredOptions();
    /** Get unique group labels in order from filtered options. */
    private get groupedFilteredOptions();
    private handleNativeChange;
    private toggleDropdown;
    private openDropdown;
    private closeDropdown;
    private positionDropdown;
    private selectOption;
    private handleClear;
    private handleSearchInput;
    handleDocumentClick(event: MouseEvent): void;
    handleKeyDown(event: KeyboardEvent): void;
    private scrollFocusedIntoView;
    onOpenChange(): void;
    /** Generate a stable option ID from value. */
    private getOptionId;
    /** Generate a stable group label ID. */
    private getGroupId;
    /** Get the ID of the currently focused option (for aria-activedescendant). */
    private get activeDescendantId();
    private getTriggerClasses;
    private renderNativeSelect;
    private renderListbox;
    render(): any;
}
export {};
