import { Component, Host, h, Prop, State, Event, EventEmitter, Element, Listen, Watch, Method } from '@stencil/core';
import { SELECT_VARIANTS, SELECT_SIZES, FORM_VARIANTS } from '../../utils/types';
import type {
  SelectVariant, SelectSize, SelectChangeDetail, FormVariant,
  AegovValidationDetail, AegovValidationResult, AegovValidationTrigger,
  AegovValidityState,
} from '../../utils/types';
import { getPassThroughAttributes } from '../../utils/attributes';
import { adoptExtraClassStylesIntoShadowRoot } from '../../utils/shadow-styles';
import { generateId } from '../../utils/id-generator';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { watchResponsiveProp } from '../../utils/responsive-prop';
import type { ResponsivePropWatcher } from '../../utils/responsive-prop';
import {
  fromNativeValidity, VALID_STATE,
  composeDescribedBy, buildValidationDetail, synthesizeValidity,
  withCustomError, setInternalsValidity,
} from '../../utils/validation';
import type { InternalsHost } from '../../utils/validation';
import { isRtl } from '../../utils/rtl';

const STRINGS = {
  en: {
    noResults: 'No results found',
    clearSelection: 'Clear selection',
    searchLabel: 'Search options',
    searchPlaceholder: 'Search...',
  },
  ar: {
    noResults: 'لم يتم العثور على نتائج',
    clearSelection: 'مسح التحديد',
    searchLabel: 'البحث في الخيارات',
    searchPlaceholder: 'بحث...',
  },
};

/** Select value type per §2.4.1 — string for single, string[] for multiple. */
export type AegovSelectValue = string | string[];

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
  shadow: { delegatesFocus: true },
  formAssociated: true, // §2.5: listbox appearance uses ElementInternals; native appearance keeps inner <select name> behavior
})
export class AegovSelect {
  @Element() el: HTMLElement;

  /** Native select attributes to pass through to the inner select element. */
  private static readonly PASS_THROUGH_ATTRS = new Set([
    'autofocus', 'form',
  ]);

  /** Unique ID for the select element. Auto-generated if not provided. */
  @Prop({ mutable: true, reflect: true }) fieldId?: string;

  /** The visual appearance. 'default' renders a native select; 'listbox' renders a custom dropdown. */
  @Prop() appearance: SelectVariant = 'default';

  /** The size of the select. Matches aegov-input height. */
  @Prop() size: string = 'base';

  /** Colour family. Drives idle ring/border, selected/checked fill, and value/accent text. Focus ring stays camel; error stays aered regardless. */
  @Prop() variant?: FormVariant;
  @State() private _resolvedSize: SelectSize = 'base';
  private _sizeWatcher: ResponsivePropWatcher | null = null;

  /** Whether multiple selection is enabled. Forces listbox behaviour. */
  @Prop() isMultiple: boolean = false;

  /** Whether the select is disabled. */
  @Prop({ mutable: true }) isDisabled: boolean = false;

  /** Placeholder text shown when nothing is selected. */
  @Prop() placeholder?: string;

  /** The current selected value. For multiple, a comma-separated string. */
  @Prop({ mutable: true }) value: string = '';

  /** The name attribute for form submission. */
  @Prop({ reflect: true }) name?: string;

  /** Whether the select is required. */
  @Prop() isRequired: boolean = false;

  /** Show a search input in the listbox dropdown to filter options. Only works with listbox appearance. */
  @Prop() isSearchable: boolean = false;

  /** Message shown when search yields no results. Empty string defaults to localized text via isRtl. */
  @Prop() emptyMessage: string = '';

  /** Max visible items in the dropdown before scrolling. */
  @Prop() visibleItems: number = 6;

  /** Show a clear button to reset selection. */
  @Prop() isClearable: boolean = false;

  /** Visual + a11y invalid state. See §2.3. */
  @Prop({ mutable: true, reflect: true }) isInvalid: boolean = false;

  /** Inline error message. Use `error` slot for rich markup. */
  @Prop({ mutable: true }) errorMessage: string = '';

  /** Helper hint shown below the control. Hidden when an error is shown. */
  @Prop() hint: string = '';

  /**
   * Additional CSS classes to apply.
   *
   * This component renders in a real shadow root, which normally blocks the page's CSS
   * from reaching inside it. Margin/padding utilities (e.g. `mt-4`, `md:px-6`) are copied
   * in from the page's own stylesheets at runtime and work as expected; other utilities
   * (colour, border, typography, etc.) still have no effect — see #35.
   */
  @Prop() extraClass?: string;

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
  private typeaheadBuffer: string = '';
  private typeaheadTimer: ReturnType<typeof setTimeout> | null = null;

  /** Emitted when the selected value changes. */
  @Event() aegovSelectChange: EventEmitter<SelectChangeDetail>;

  /** Emitted when the dropdown opens (listbox appearance). */
  @Event() aegovSelectOpen: EventEmitter<void>;

  /** Emitted when the dropdown closes (listbox appearance). */
  @Event() aegovSelectClose: EventEmitter<void>;

  /** Unified validation event. See §2.3. */
  @Event() aegovValidate: EventEmitter<AegovValidationDetail<AegovSelectValue>>;

  @State() private hasBlurredOnce: boolean = false;
  private nativeSelectEl?: HTMLSelectElement;
  private internals: ElementInternals | null = null;
  private errorId: string = '';
  private hintId: string = '';

  componentWillLoad() {
    warnIfInvalidEnumProp(this.appearance, SELECT_VARIANTS, 'default', ctx('appearance'));
    warnIfInvalidEnumProp(this.variant, FORM_VARIANTS, 'primary', ctx('variant'));
    this._sizeWatcher = watchResponsiveProp(this.size, SELECT_SIZES, 'base', v => {
      this._resolvedSize = v as SelectSize;
    });
    this._resolvedSize = this._sizeWatcher.current as SelectSize;
    if (!this.fieldId) {
      this.fieldId = generateId('aegov-select');
    }
    this.selectId = `${this.fieldId}-listbox`;
    this.errorId = `${this.fieldId}-error`;
    this.hintId = `${this.fieldId}-hint`;
    this.parseOptions();
    this.updateDerivedState();

    // Manual attachInternals per §6.8 fallback
    const host = this.el as unknown as InternalsHost;
    if (typeof host.attachInternals === 'function') {
      try {
        this.internals = host.attachInternals();
      } catch {
        this.internals = null;
      }
    }
  }

  disconnectedCallback() {
    this._sizeWatcher?.destroy();
    if (this.typeaheadTimer) clearTimeout(this.typeaheadTimer);
  }

  // ── FormAssociated lifecycle (listbox appearance uses ElementInternals) ──
  formAssociatedCallback(_form: HTMLFormElement | null) { /* no-op */ }
  formDisabledCallback(disabled: boolean) { this.isDisabled = disabled; }
  formResetCallback() {
    this.value = '';
    this.errorMessage = '';
    this.isInvalid = false;
    this.runValidationSync();
  }

  /** The form found this field invalid during a submit or checkValidity() — start announcing errors. */
  @Listen('invalid')
  onInvalid() {
    this.hasBlurredOnce = true;
  }

  /** Imperatively re-run validation. */
  @Method()
  async validate(trigger: AegovValidationTrigger = 'manual'): Promise<AegovValidationResult> {
    if (trigger === 'submit') this.hasBlurredOnce = true;
    return this.runAndEmitValidation(trigger);
  }

  /** Mirror of HTMLSelectElement.setCustomValidity(). */
  @Method()
  async setCustomValidity(message: string): Promise<void> {
    this.errorMessage = message;
    this.isInvalid = !!message;
    this.customValidityMessage = message;
    if (this.useListbox && this.internals) {
      if (message) {
        setInternalsValidity(
          this.internals,
          synthesizeValidity({ customError: true }),
          message,
          this.triggerRef?.querySelector('button') ?? undefined,
        );
      } else {
        setInternalsValidity(this.internals, { valid: true }, '');
      }
    } else if (this.nativeSelectEl && typeof this.nativeSelectEl.setCustomValidity === 'function') {
      this.nativeSelectEl.setCustomValidity(message);
    }
  }

  private currentValueForDetail(): AegovSelectValue {
    return this.isMultiple ? this.selectedValues : this.value;
  }

  /** Message from setCustomValidity(), kept so recomputing validity does not drop it. */
  private customValidityMessage = '';

  private computeListboxValidity(): { validity: AegovValidityState; message: string } {
    const filled = this.isMultiple ? this.selectedValues.length > 0 : !!this.value;
    const result = this.isRequired && !filled
      ? { validity: synthesizeValidity({ valueMissing: true }), message: this.errorMessage || 'Required' }
      : { validity: synthesizeValidity({}), message: '' };
    return withCustomError(result, this.customValidityMessage);
  }

  private readValidity(): AegovValidityState {
    if (this.useListbox) {
      return this.computeListboxValidity().validity;
    }
    const v = this.nativeSelectEl?.validity;
    return v ? fromNativeValidity(v) : VALID_STATE;
  }

  private runValidationSync() {
    if (!this.useListbox) {
      // In shadow:true the inner <select> is inside the shadow root and invisible to FormData.
      // Mirror its value via ElementInternals so native-mode select participates in form submission.
      try {
        if (this.internals && typeof this.internals.setFormValue === 'function') {
          if (this.isMultiple) {
            const fd = new FormData();
            for (const v of this.selectedValues) if (this.name) fd.append(this.name, v);
            this.internals.setFormValue(fd);
          } else {
            this.internals.setFormValue(this.value || null);
          }
        }
        // Sync native <select> validity to ElementInternals so form.checkValidity() sees required etc.
        if (this.internals && this.nativeSelectEl) {
          const v = this.nativeSelectEl.validity;
          if (v.valid) {
            setInternalsValidity(this.internals, { valid: true }, '');
          } else {
            const message = this.errorMessage || this.nativeSelectEl.validationMessage || '';
            setInternalsValidity(this.internals, fromNativeValidity(v), message, this.nativeSelectEl);
          }
        }
      } catch { /* jsdom mock */ }
      return;
    }
    const { validity, message } = this.computeListboxValidity();
    setInternalsValidity(this.internals, validity, message, this.triggerRef?.querySelector('button') ?? undefined);
    try {
      if (this.internals && typeof this.internals.setFormValue === 'function' && this.name) {
        if (this.isMultiple) {
          // Per §7.3: multiple-select uses FormData with one entry per value (not comma-joined)
          const fd = new FormData();
          for (const v of this.selectedValues) fd.append(this.name, v);
          this.internals.setFormValue(fd);
        } else {
          this.internals.setFormValue(this.value || '');
        }
      }
    } catch {
      // jsdom mock — ignore
    }
  }

  private async runAndEmitValidation(trigger: AegovValidationTrigger): Promise<AegovValidationResult> {
    this.runValidationSync();
    const validity = this.readValidity();
    const message = !validity.valid
      ? (this.errorMessage || this.nativeSelectEl?.validationMessage || '')
      : '';
    this.aegovValidate.emit(buildValidationDetail<AegovSelectValue>(
      this.el as unknown as HTMLElement & { name?: string },
      this.currentValueForDetail(), validity, message, this.errorMessage || null, trigger,
    ));
    return { valid: validity.valid, message, validity };
  }

  private emitValidate(trigger: AegovValidationTrigger) {
    const validity = this.readValidity();
    const message = !validity.valid
      ? (this.errorMessage || this.nativeSelectEl?.validationMessage || '')
      : '';
    this.aegovValidate.emit(buildValidationDetail<AegovSelectValue>(
      this.el as unknown as HTMLElement & { name?: string },
      this.currentValueForDetail(), validity, message, this.errorMessage || null, trigger,
    ));
  }

  private handleBlurNative = () => {
    this.hasBlurredOnce = true;
    this.emitValidate('blur');
  };

  @Watch('appearance')
  onVariantChange(v: unknown) { warnIfInvalidEnumProp(v, SELECT_VARIANTS, 'default', ctx('appearance')); }

  @Watch('variant')
  onColourVariantChange(v: unknown) { warnIfInvalidEnumProp(v, FORM_VARIANTS, 'primary', ctx('variant')); }

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
    this.runValidationSync();
    adoptExtraClassStylesIntoShadowRoot(this.el.shadowRoot, this.extraClass);
  }

  @Watch('extraClass')
  onExtraClassChange() {
    adoptExtraClassStylesIntoShadowRoot(this.el.shadowRoot, this.extraClass);
  }

  componentDidUpdate() {
    if (this.isOpen && this.listboxRef) {
      this.positionDropdown();
    }
  }

  /** Whether to use the custom listbox rendering. */
  private get useListbox(): boolean {
    return this.appearance === 'listbox' || this.isMultiple;
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
    // A value set from code fires no change event — keep the native select (in
    // default appearance), the form value and validity in step with it.
    if (!this.useListbox && this.nativeSelectEl && this.nativeSelectEl.value !== (this.value ?? '')) {
      this.nativeSelectEl.value = this.value ?? '';
    }
    this.runValidationSync();
  }

  /** Recompute cached selectedValues and displayText from this.value. */
  private updateDerivedState() {
    this.cachedSelectedValues = !this.value
      ? []
      : this.value.split(',').filter(v => v !== '');

    const selected = this.cachedSelectedValues;
    if (selected.length === 0) {
      this.cachedDisplayText = '';
    } else if (this.isMultiple) {
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
    const groups = Array.from(this.el.querySelectorAll('aegov-select-option-group')) as HTMLAegovSelectOptionGroupElement[];
    const groupedOptionEls = new Set<Element>();

    for (const group of groups) {
      // Resolved property, not a raw attribute read — same #63 fix, applied to
      // the group's own `label` prop, which has the identical non-reflected
      // @Prop() shape and breaks the same way when set via JS property only.
      const groupLabel = group.label || '';
      const groupOptions = Array.from(group.querySelectorAll('aegov-select-option')) as HTMLAegovSelectOptionElement[];
      for (const opt of groupOptions) {
        groupedOptionEls.add(opt);
        items.push({
          value: opt.value || '',
          label: opt.textContent?.trim() || '',
          disabled: opt.isDisabled,
          group: groupLabel,
        });
      }
    }

    // Find ungrouped options
    const allOptions = Array.from(this.el.querySelectorAll('aegov-select-option')) as HTMLAegovSelectOptionElement[];
    for (const opt of allOptions) {
      if (!groupedOptionEls.has(opt)) {
        items.push({
          value: opt.value || '',
          label: opt.textContent?.trim() || '',
          disabled: opt.isDisabled,
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
    this.runValidationSync();
    const opt = this.parsedOptions.find(o => o.value === select.value);
    this.aegovSelectChange.emit({
      value: this.value,
      label: opt ? opt.label : this.value,
    });
    this.emitValidate('change');
  };

  // --- Listbox handlers ---

  private toggleDropdown = () => {
    if (this.isDisabled) return;
    if (this.isOpen) {
      this.closeDropdown();
    } else {
      this.openDropdown();
    }
  };

  private openDropdown(direction?: 'down' | 'up') {
    this.isOpen = true;
    this.searchQuery = '';
    // APG Combobox: set visual focus to selected option (or first/last) on open
    if (!this.isSearchable) {
      const enabledOptions = this.parsedOptions.filter(o => !o.disabled);
      const selectedIdx = this.value
        ? enabledOptions.findIndex(o => o.value === this.value)
        : -1;
      this.focusedIndex = selectedIdx >= 0
        ? selectedIdx
        : (direction === 'up' ? enabledOptions.length - 1 : 0);
    } else {
      this.focusedIndex = -1;
    }
    this.aegovSelectOpen.emit();
    requestAnimationFrame(() => {
      if (this.searchInputRef) {
        this.searchInputRef.focus();
      }
      this.positionDropdown();
      this.scrollFocusedIntoView();
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
    } else {
      this.listboxRef.classList.add('select__listbox--below');
      this.listboxRef.classList.remove('select__listbox--above');
    }
  }

  private selectOption(option: OptionItem) {
    if (option.disabled) return;

    if (this.isMultiple) {
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
      this.runValidationSync();
      this.emitValidate('change');
    } else {
      this.value = option.value;
      this.aegovSelectChange.emit({
        value: option.value,
        label: option.label,
      });
      this.runValidationSync();
      this.emitValidate('change');
      this.closeDropdown();
    }
  }

  private handleClear = (event: MouseEvent) => {
    event.stopPropagation();
    this.value = '';
    this.aegovSelectChange.emit({
      value: this.isMultiple ? [] : '',
      label: this.isMultiple ? [] : '',
    });
    this.runValidationSync();
    this.emitValidate('change');
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
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        this.openDropdown();
      } else if (event.key === 'ArrowDown') {
        event.preventDefault();
        this.openDropdown('down');
      } else if (event.key === 'ArrowUp') {
        event.preventDefault();
        this.openDropdown('up');
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
        if (event.altKey) {
          this.closeDropdown();
        } else {
          this.focusedIndex = Math.max(this.focusedIndex - 1, 0);
          this.scrollFocusedIntoView();
        }
        break;
      case 'Enter':
      case ' ':
        if (this.isSearchable && event.key === ' ') return; // Allow space in search
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
      case 'Tab':
        this.closeDropdown();
        break;
      default:
        if (!this.isSearchable && event.key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey) {
          event.preventDefault();
          this.handleTypeahead(event.key);
        }
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

  private handleTypeahead(char: string) {
    this.typeaheadBuffer += char.toLowerCase();
    if (this.typeaheadTimer) clearTimeout(this.typeaheadTimer);
    this.typeaheadTimer = setTimeout(() => { this.typeaheadBuffer = ''; }, 500);

    const options = this.filteredOptions.filter(o => !o.disabled);
    if (options.length === 0) return;

    const start = this.focusedIndex < 0 ? 0 : this.focusedIndex;
    for (let i = 1; i <= options.length; i++) {
      const idx = (start + i) % options.length;
      if (options[idx].label.toLowerCase().startsWith(this.typeaheadBuffer)) {
        this.focusedIndex = idx;
        this.scrollFocusedIntoView();
        return;
      }
    }
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
    const variant: FormVariant = (FORM_VARIANTS as readonly string[]).includes(this.variant) ? this.variant : 'primary';
    classes.push(`select-variant-${variant}`);
    if (this.isDisabled) classes.push('select--disabled');
    if (this.isOpen) classes.push('select--open');
    if (!this.displayText) classes.push('select--placeholder');
    if (this.extraClass) classes.push(this.extraClass);
    return classes.join(' ');
  }

  private renderNativeSelect() {
    const passThroughAttrs = getPassThroughAttributes(this.el, AegovSelect.PASS_THROUGH_ATTRS);
    delete passThroughAttrs['aria-invalid'];
    delete passThroughAttrs['aria-describedby'];

    const sizeClasses: Record<SelectSize, string> = {
      xs: 'select--xs',
      sm: 'select--sm',
      base: 'select--base',
      lg: 'select--lg',
      xl: 'select--xl',
    };
    const groups = this.groupedFilteredOptions;
    const validationDecor = this.computeValidationDecor();
    const { errorRegion, hintRegion, describedBy, hostClass } = validationDecor;

    const variant: FormVariant = (FORM_VARIANTS as readonly string[]).includes(this.variant) ? this.variant : 'primary';
    return (
      <Host class={hostClass}>
        <div class="select__native-wrapper">
          <select
            ref={(el) => this.nativeSelectEl = el}
            id={this.fieldId}
            class={`aegov-select select-variant-${variant} ${sizeClasses[this._resolvedSize]}${this.extraClass ? ` ${this.extraClass}` : ''}`}
            disabled={this.isDisabled}
            name={this.name}
            required={this.isRequired}
            aria-invalid={this.isInvalid ? 'true' : null}
            aria-describedby={describedBy}
            onChange={this.handleNativeChange}
            onBlur={this.handleBlurNative}
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
        {errorRegion}
        {hintRegion}
      </Host>
    );
  }

  /** Build per-render validation decorations shared by both appearances. */
  private computeValidationDecor() {
    const hasErrorSlot = !!this.el.querySelector('[slot="error"]');
    const hasHintSlot = !!this.el.querySelector('[slot="hint"]');
    const showError = this.isInvalid && (hasErrorSlot || !!this.errorMessage);
    const showHint = !showError && (hasHintSlot || !!this.hint);
    const announceError = showError && this.hasBlurredOnce;
    const authorDescribedBy = this.el.getAttribute('aria-describedby');
    const describedBy = composeDescribedBy(
      authorDescribedBy,
      showError ? this.errorId : null,
      showHint ? this.hintId : null,
    );
    const errorRegion = showError ? (
      <div
        id={this.errorId}
        class="aegov-select__error"
        role={announceError ? 'alert' : null}
      >
        {hasErrorSlot ? <slot name="error" /> : this.errorMessage}
      </div>
    ) : null;
    const hintRegion = showHint ? (
      <div id={this.hintId} class="aegov-select__hint">
        {hasHintSlot ? <slot name="hint" /> : this.hint}
      </div>
    ) : null;
    const variant: FormVariant = (FORM_VARIANTS as readonly string[]).includes(this.variant) ? this.variant : 'primary';
    const hostClass = {
      'is-invalid': this.isInvalid,
      [`select-variant-${variant}`]: true,
    };
    return { errorRegion, hintRegion, describedBy, hostClass };
  }

  private renderListbox() {
    const groups = this.groupedFilteredOptions;
    const enabledOptions = this.filteredOptions.filter(o => !o.disabled);
    const validationDecor = this.computeValidationDecor();
    const { errorRegion, hintRegion, describedBy, hostClass } = validationDecor;
    const t = isRtl(this.el) ? STRINGS.ar : STRINGS.en;
    return (
      <Host class={hostClass}>
        <div
          class="select__trigger-wrapper"
          ref={el => this.triggerRef = el}
        >
          <button
            type="button"
            id={this.fieldId}
            class={this.getTriggerClasses()}
            onClick={this.toggleDropdown}
            onBlur={(e: FocusEvent) => {
              if (!this.el.contains(e.relatedTarget as Node)) {
                this.hasBlurredOnce = true;
                this.emitValidate('blur');
              }
            }}
            disabled={this.isDisabled}
            role="combobox"
            aria-expanded={this.isOpen ? 'true' : 'false'}
            aria-haspopup="listbox"
            aria-controls={this.selectId}
            aria-activedescendant={this.activeDescendantId}
            aria-required={this.isRequired ? 'true' : undefined}
            aria-invalid={this.isInvalid ? 'true' : null}
            aria-describedby={describedBy}
          >
            <span class="select__value">
              {this.displayText || this.placeholder || ''}
            </span>
            <span class="select__actions">
              {this.isClearable && this.selectedValues.length > 0 && !this.isDisabled && (
                <button
                  type="button"
                  class="select__clear"
                  onClick={this.handleClear}
                  aria-label={t.clearSelection}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
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
              aria-multiselectable={this.isMultiple ? 'true' : undefined}
            >
              {this.isSearchable && (
                <div class="select__search">
                  <input
                    type="text"
                    class={`select__search-input select__search-input--${this._resolvedSize}`}
                    placeholder={t.searchPlaceholder}
                    value={this.searchQuery}
                    onInput={this.handleSearchInput}
                    ref={el => this.searchInputRef = el}
                    role="combobox"
                    aria-label={t.searchLabel}
                    aria-expanded="true"
                    aria-haspopup="listbox"
                    aria-controls={this.selectId}
                    aria-activedescendant={this.activeDescendantId}
                    autocomplete="off"
                  />
                </div>
              )}
              <div class="select__options">
                {groups.length === 0 && (
                  <div class="select__empty" role="status">{this.emptyMessage || (isRtl(this.el) ? STRINGS.ar.noResults : STRINGS.en.noResults)}</div>
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
                        {this.isMultiple && (
                          <span class="select__checkbox">
                            {isSelected && (
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                <polyline points="20 6 9 17 4 12" />
                              </svg>
                            )}
                          </span>
                        )}
                        <span class="select__option-label">{opt.label}</span>
                        {!this.isMultiple && isSelected && (
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
        {/* §2.5: hidden input replaced by ElementInternals.setFormValue() in runValidationSync(). */}
        {errorRegion}
        {hintRegion}
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
