var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var AegovSelect_1;
import { Component, Host, h, Prop, State, Event, Element, Listen, Watch } from '@stencil/core';
import { SELECT_VARIANTS, SELECT_SIZES } from '../../utils/types';
import { getPassThroughAttributes } from '../../utils/attributes';
import { generateId } from '../../utils/id-generator';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { watchResponsiveProp } from '../../utils/responsive-prop';
const TAG = 'aegov-select';
const ctx = (prop) => ({ component: TAG, prop });
let AegovSelect = AegovSelect_1 = class AegovSelect {
    constructor() {
        /** The visual variant. 'default' renders a native select; 'listbox' renders a custom dropdown. */
        this.variant = 'default';
        /** The size of the select. Matches aegov-input height. */
        this.size = 'base';
        this._resolvedSize = 'base';
        this._sizeWatcher = null;
        /** Whether multiple selection is enabled. Forces listbox behaviour. */
        this.isMultiple = false;
        /** Whether the select is disabled. */
        this.isDisabled = false;
        /** The current selected value. For multiple, a comma-separated string. */
        this.value = '';
        /** Whether the select is required. */
        this.isRequired = false;
        /** Show a search input in the listbox dropdown to filter options. Only works with listbox variant. */
        this.isSearchable = false;
        /** Message shown when search yields no results. */
        this.emptyMessage = 'No results found';
        /** Max visible items in the dropdown before scrolling. */
        this.visibleItems = 6;
        /** Show a clear button to reset selection. */
        this.isClearable = false;
        this.isOpen = false;
        this.searchQuery = '';
        this.focusedIndex = -1;
        this.parsedOptions = [];
        this.cachedSelectedValues = [];
        this.cachedDisplayText = '';
        // --- Native select handlers ---
        this.handleNativeChange = (event) => {
            const select = event.target;
            this.value = select.value;
            const opt = this.parsedOptions.find(o => o.value === select.value);
            this.aegovSelectChange.emit({
                value: this.value,
                label: opt ? opt.label : this.value,
            });
        };
        // --- Listbox handlers ---
        this.toggleDropdown = () => {
            if (this.isDisabled)
                return;
            if (this.isOpen) {
                this.closeDropdown();
            }
            else {
                this.openDropdown();
            }
        };
        this.handleClear = (event) => {
            event.stopPropagation();
            this.value = '';
            this.aegovSelectChange.emit({
                value: this.isMultiple ? [] : '',
                label: this.isMultiple ? [] : '',
            });
        };
        this.handleSearchInput = (event) => {
            const input = event.target;
            this.searchQuery = input.value;
            this.focusedIndex = -1;
        };
    }
    componentWillLoad() {
        warnIfInvalidEnumProp(this.variant, SELECT_VARIANTS, 'default', ctx('variant'));
        this._sizeWatcher = watchResponsiveProp(this.size, SELECT_SIZES, 'base', v => {
            this._resolvedSize = v;
        });
        this._resolvedSize = this._sizeWatcher.current;
        if (!this.fieldId) {
            this.fieldId = generateId('aegov-select');
        }
        this.selectId = `${this.fieldId}-listbox`;
        this.parseOptions();
        this.updateDerivedState();
    }
    disconnectedCallback() {
        var _a;
        (_a = this._sizeWatcher) === null || _a === void 0 ? void 0 : _a.destroy();
    }
    onVariantChange(v) { warnIfInvalidEnumProp(v, SELECT_VARIANTS, 'default', ctx('variant')); }
    onSizeChange() {
        var _a;
        (_a = this._sizeWatcher) === null || _a === void 0 ? void 0 : _a.destroy();
        this._sizeWatcher = watchResponsiveProp(this.size, SELECT_SIZES, 'base', v => {
            this._resolvedSize = v;
        });
        this._resolvedSize = this._sizeWatcher.current;
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
    get useListbox() {
        return this.variant === 'listbox' || this.isMultiple;
    }
    /** Current selected values as an array (cached). */
    get selectedValues() {
        return this.cachedSelectedValues;
    }
    /** Get the display text for the trigger (cached). */
    get displayText() {
        return this.cachedDisplayText;
    }
    onValueChange() {
        this.updateDerivedState();
    }
    /** Recompute cached selectedValues and displayText from this.value. */
    updateDerivedState() {
        this.cachedSelectedValues = !this.value
            ? []
            : this.value.split(',').filter(v => v !== '');
        const selected = this.cachedSelectedValues;
        if (selected.length === 0) {
            this.cachedDisplayText = '';
        }
        else if (this.isMultiple) {
            this.cachedDisplayText = `${selected.length} selected`;
        }
        else {
            const option = this.parsedOptions.find(o => o.value === selected[0]);
            this.cachedDisplayText = option ? option.label : selected[0];
        }
    }
    /** Parse option children into a flat list. */
    parseOptions() {
        var _a, _b;
        const items = [];
        // Find all option-group elements (may be direct children or inside slot container)
        const groups = Array.from(this.el.querySelectorAll('aegov-select-option-group'));
        const groupedOptionEls = new Set();
        for (const group of groups) {
            const groupLabel = group.getAttribute('label') || '';
            const groupOptions = Array.from(group.querySelectorAll('aegov-select-option'));
            for (const opt of groupOptions) {
                groupedOptionEls.add(opt);
                items.push({
                    value: opt.getAttribute('value') || '',
                    label: ((_a = opt.textContent) === null || _a === void 0 ? void 0 : _a.trim()) || '',
                    disabled: opt.hasAttribute('is-disabled'),
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
                    label: ((_b = opt.textContent) === null || _b === void 0 ? void 0 : _b.trim()) || '',
                    disabled: opt.hasAttribute('is-disabled'),
                });
            }
        }
        this.parsedOptions = items;
    }
    /** Filtered options based on search query. */
    get filteredOptions() {
        if (!this.searchQuery)
            return this.parsedOptions;
        const query = this.searchQuery.toLowerCase();
        return this.parsedOptions.filter(o => o.label.toLowerCase().includes(query));
    }
    /** Get unique group labels in order from filtered options. */
    get groupedFilteredOptions() {
        const groups = [];
        const seenGroups = new Map();
        for (const opt of this.filteredOptions) {
            const key = opt.group || null;
            if (!seenGroups.has(key)) {
                const arr = [];
                seenGroups.set(key, arr);
                groups.push({ group: key, options: arr });
            }
            seenGroups.get(key).push(opt);
        }
        return groups;
    }
    openDropdown() {
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
    closeDropdown() {
        var _a;
        this.isOpen = false;
        this.searchQuery = '';
        this.focusedIndex = -1;
        this.aegovSelectClose.emit();
        // Return focus to trigger
        const trigger = (_a = this.triggerRef) === null || _a === void 0 ? void 0 : _a.querySelector('button');
        if (trigger)
            trigger.focus();
    }
    positionDropdown() {
        if (!this.listboxRef || !this.triggerRef)
            return;
        const triggerRect = this.triggerRef.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const spaceBelow = viewportHeight - triggerRect.bottom - 8;
        const spaceAbove = triggerRect.top - 8;
        // Calculate item height based on size
        const itemHeightMap = { xs: 32, sm: 36, base: 40, lg: 44, xl: 48 };
        const searchHeightMap = { xs: 36, sm: 40, base: 44, lg: 48, xl: 52 };
        const itemHeight = itemHeightMap[this._resolvedSize];
        const searchHeight = this.isSearchable ? searchHeightMap[this._resolvedSize] : 0;
        const padding = 8; // py-1 top + bottom
        const actualItemCount = Math.min(this.filteredOptions.length, this.visibleItems);
        const desiredHeight = (actualItemCount * itemHeight) + searchHeight + padding;
        // Decide direction
        const openAbove = spaceBelow < desiredHeight && spaceAbove > spaceBelow;
        this.listboxRef.style.maxHeight = `${Math.min(desiredHeight, openAbove ? spaceAbove : spaceBelow)}px`;
        if (openAbove) {
            this.listboxRef.classList.add('select__listbox--above');
            this.listboxRef.classList.remove('select__listbox--below');
        }
        else {
            this.listboxRef.classList.add('select__listbox--below');
            this.listboxRef.classList.remove('select__listbox--above');
        }
    }
    selectOption(option) {
        if (option.disabled)
            return;
        if (this.isMultiple) {
            const selected = new Set(this.selectedValues);
            if (selected.has(option.value)) {
                selected.delete(option.value);
            }
            else {
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
        }
        else {
            this.value = option.value;
            this.aegovSelectChange.emit({
                value: option.value,
                label: option.label,
            });
            this.closeDropdown();
        }
    }
    handleDocumentClick(event) {
        if (this.isOpen) {
            const target = event.target;
            if (!this.el.contains(target)) {
                this.closeDropdown();
            }
        }
    }
    handleKeyDown(event) {
        if (!this.useListbox)
            return;
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
                if (this.isSearchable && event.key === ' ')
                    return; // Allow space in search
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
    scrollFocusedIntoView() {
        requestAnimationFrame(() => {
            const focused = this.el.querySelector('.select__option--focused');
            if (focused) {
                focused.scrollIntoView({ block: 'nearest' });
            }
        });
    }
    onOpenChange() {
        if (this.isOpen) {
            this.parseOptions();
            this.updateDerivedState();
        }
    }
    /** Generate a stable option ID from value. */
    getOptionId(value) {
        return `${this.selectId}-opt-${value}`;
    }
    /** Generate a stable group label ID. */
    getGroupId(label) {
        return `${this.selectId}-group-${label.replace(/\s+/g, '-').toLowerCase()}`;
    }
    /** Get the ID of the currently focused option (for aria-activedescendant). */
    get activeDescendantId() {
        if (!this.isOpen || this.focusedIndex < 0)
            return undefined;
        const enabledOptions = this.filteredOptions.filter(o => !o.disabled);
        const focused = enabledOptions[this.focusedIndex];
        return focused ? this.getOptionId(focused.value) : undefined;
    }
    // --- Rendering ---
    getTriggerClasses() {
        const classes = ['aegov-select'];
        const sizeClasses = {
            xs: 'select--xs',
            sm: 'select--sm',
            base: 'select--base',
            lg: 'select--lg',
            xl: 'select--xl',
        };
        classes.push(sizeClasses[this._resolvedSize]);
        if (this.isDisabled)
            classes.push('select--disabled');
        if (this.isOpen)
            classes.push('select--open');
        if (!this.displayText)
            classes.push('select--placeholder');
        if (this.extraClass)
            classes.push(this.extraClass);
        return classes.join(' ');
    }
    renderNativeSelect() {
        const passThroughAttrs = getPassThroughAttributes(this.el, AegovSelect_1.PASS_THROUGH_ATTRS);
        const sizeClasses = {
            xs: 'select--xs',
            sm: 'select--sm',
            base: 'select--base',
            lg: 'select--lg',
            xl: 'select--xl',
        };
        const groups = this.groupedFilteredOptions;
        return (h(Host, null,
            h("div", { class: "select__native-wrapper" },
                h("select", Object.assign({ id: this.fieldId, class: `aegov-select ${sizeClasses[this._resolvedSize]}${this.extraClass ? ` ${this.extraClass}` : ''}`, disabled: this.isDisabled, name: this.name, required: this.isRequired, onChange: this.handleNativeChange }, passThroughAttrs),
                    this.placeholder && (h("option", { value: "", disabled: true, selected: !this.value }, this.placeholder)),
                    groups.map(g => {
                        if (g.group) {
                            return (h("optgroup", { label: g.group }, g.options.map(opt => (h("option", { value: opt.value, disabled: opt.disabled, selected: opt.value === this.value }, opt.label)))));
                        }
                        return g.options.map(opt => (h("option", { value: opt.value, disabled: opt.disabled, selected: opt.value === this.value }, opt.label)));
                    }))),
            h("div", { class: "select__slot-container" },
                h("slot", null))));
    }
    renderListbox() {
        const groups = this.groupedFilteredOptions;
        const enabledOptions = this.filteredOptions.filter(o => !o.disabled);
        return (h(Host, null,
            h("div", { class: "select__trigger-wrapper", ref: el => this.triggerRef = el },
                h("button", { type: "button", id: this.fieldId, class: this.getTriggerClasses(), onClick: this.toggleDropdown, disabled: this.isDisabled, role: "combobox", "aria-expanded": this.isOpen ? 'true' : 'false', "aria-haspopup": "listbox", "aria-controls": this.isOpen ? this.selectId : undefined, "aria-activedescendant": this.activeDescendantId },
                    h("span", { class: "select__value" }, this.displayText || this.placeholder || ''),
                    h("span", { class: "select__actions" },
                        this.isClearable && this.selectedValues.length > 0 && !this.isDisabled && (h("span", { class: "select__clear", onClick: this.handleClear, role: "button", "aria-label": "Clear selection", tabindex: -1 },
                            h("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", "aria-hidden": "true" },
                                h("line", { x1: "18", y1: "6", x2: "6", y2: "18" }),
                                h("line", { x1: "6", y1: "6", x2: "18", y2: "18" })))),
                        h("span", { class: `select__arrow${this.isOpen ? ' select__arrow--open' : ''}` },
                            h("svg", { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2", "stroke-linecap": "round", "stroke-linejoin": "round", "aria-hidden": "true" },
                                h("polyline", { points: "6 9 12 15 18 9" }))))),
                this.isOpen && (h("div", { class: "select__listbox", ref: el => this.listboxRef = el, role: "listbox", id: this.selectId, "aria-multiselectable": this.isMultiple ? 'true' : undefined },
                    this.isSearchable && (h("div", { class: "select__search" },
                        h("input", { type: "text", class: `select__search-input select__search-input--${this._resolvedSize}`, placeholder: "Search...", value: this.searchQuery, onInput: this.handleSearchInput, ref: el => this.searchInputRef = el, role: "searchbox", "aria-label": "Search options", "aria-controls": this.selectId, "aria-activedescendant": this.activeDescendantId, autocomplete: "off" }))),
                    h("div", { class: "select__options" },
                        groups.length === 0 && (h("div", { class: "select__empty", role: "status" }, this.emptyMessage)),
                        groups.map(g => {
                            const groupLabelId = g.group ? this.getGroupId(g.group) : undefined;
                            const optionElements = g.options.map(opt => {
                                const isSelected = this.selectedValues.includes(opt.value);
                                const enabledIndex = enabledOptions.indexOf(opt);
                                const isFocused = enabledIndex === this.focusedIndex;
                                return (h("div", { id: this.getOptionId(opt.value), class: `select__option select__option--${this._resolvedSize}` +
                                        (isSelected ? ' select__option--selected' : '') +
                                        (opt.disabled ? ' select__option--disabled' : '') +
                                        (isFocused ? ' select__option--focused' : ''), role: "option", "aria-selected": isSelected ? 'true' : 'false', "aria-disabled": opt.disabled ? 'true' : undefined, onClick: () => this.selectOption(opt), "data-value": opt.value },
                                    this.isMultiple && (h("span", { class: "select__checkbox" }, isSelected && (h("svg", { xmlns: "http://www.w3.org/2000/svg", width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "3", "stroke-linecap": "round", "stroke-linejoin": "round", "aria-hidden": "true" },
                                        h("polyline", { points: "20 6 9 17 4 12" }))))),
                                    h("span", { class: "select__option-label" }, opt.label),
                                    !this.isMultiple && isSelected && (h("svg", { class: "select__check-icon", xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": "2.5", "stroke-linecap": "round", "stroke-linejoin": "round", "aria-hidden": "true" },
                                        h("polyline", { points: "20 6 9 17 4 12" })))));
                            });
                            if (g.group) {
                                return (h("div", { role: "group", "aria-labelledby": groupLabelId },
                                    h("div", { id: groupLabelId, class: "select__group-label" }, g.group),
                                    optionElements));
                            }
                            return optionElements;
                        }))))),
            h("div", { class: "select__slot-container" },
                h("slot", null)),
            this.name && (h("input", { type: "hidden", name: this.name, value: this.value }))));
    }
    render() {
        if (this.useListbox) {
            return this.renderListbox();
        }
        return this.renderNativeSelect();
    }
};
/** Native select attributes to pass through to the inner select element. */
AegovSelect.PASS_THROUGH_ATTRS = new Set([
    'autofocus', 'form',
]);
__decorate([
    Element()
], AegovSelect.prototype, "el", void 0);
__decorate([
    Prop({ mutable: true, reflect: true })
], AegovSelect.prototype, "fieldId", void 0);
__decorate([
    Prop()
], AegovSelect.prototype, "variant", void 0);
__decorate([
    Prop()
], AegovSelect.prototype, "size", void 0);
__decorate([
    State()
], AegovSelect.prototype, "_resolvedSize", void 0);
__decorate([
    Prop()
], AegovSelect.prototype, "isMultiple", void 0);
__decorate([
    Prop()
], AegovSelect.prototype, "isDisabled", void 0);
__decorate([
    Prop()
], AegovSelect.prototype, "placeholder", void 0);
__decorate([
    Prop({ mutable: true })
], AegovSelect.prototype, "value", void 0);
__decorate([
    Prop()
], AegovSelect.prototype, "name", void 0);
__decorate([
    Prop()
], AegovSelect.prototype, "isRequired", void 0);
__decorate([
    Prop()
], AegovSelect.prototype, "isSearchable", void 0);
__decorate([
    Prop()
], AegovSelect.prototype, "emptyMessage", void 0);
__decorate([
    Prop()
], AegovSelect.prototype, "visibleItems", void 0);
__decorate([
    Prop()
], AegovSelect.prototype, "isClearable", void 0);
__decorate([
    Prop()
], AegovSelect.prototype, "extraClass", void 0);
__decorate([
    State()
], AegovSelect.prototype, "isOpen", void 0);
__decorate([
    State()
], AegovSelect.prototype, "searchQuery", void 0);
__decorate([
    State()
], AegovSelect.prototype, "focusedIndex", void 0);
__decorate([
    State()
], AegovSelect.prototype, "parsedOptions", void 0);
__decorate([
    Event()
], AegovSelect.prototype, "aegovSelectChange", void 0);
__decorate([
    Event()
], AegovSelect.prototype, "aegovSelectOpen", void 0);
__decorate([
    Event()
], AegovSelect.prototype, "aegovSelectClose", void 0);
__decorate([
    Watch('variant')
], AegovSelect.prototype, "onVariantChange", null);
__decorate([
    Watch('size')
], AegovSelect.prototype, "onSizeChange", null);
__decorate([
    Watch('value')
], AegovSelect.prototype, "onValueChange", null);
__decorate([
    Listen('click', { target: 'document' })
], AegovSelect.prototype, "handleDocumentClick", null);
__decorate([
    Listen('keydown')
], AegovSelect.prototype, "handleKeyDown", null);
__decorate([
    Watch('isOpen')
], AegovSelect.prototype, "onOpenChange", null);
AegovSelect = AegovSelect_1 = __decorate([
    Component({
        tag: 'aegov-select',
        styleUrl: 'aegov-select.css',
        scoped: false,
        shadow: false,
    })
], AegovSelect);
export { AegovSelect };
