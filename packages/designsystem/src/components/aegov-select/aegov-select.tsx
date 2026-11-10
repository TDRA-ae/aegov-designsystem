import { Component, Host, h, Prop, State, Event, EventEmitter, Element, Listen, Watch, Method, forceUpdate } from '@stencil/core';
import { SELECT_VARIANTS, SELECT_SIZES, FORM_VARIANTS } from '../../utils/types';
import type {
  SelectVariant, SelectSize, SelectChangeDetail, FormVariant,
  AegovValidationDetail, AegovValidationResult, AegovValidationTrigger,
  AegovValidityState,
} from '../../utils/types';
import { getPassThroughAttributes } from '../../utils/attributes';
import { HostAria } from '../../utils/host-aria';
import { adoptExtraClassStylesIntoShadowRoot } from '../../utils/shadow-styles';
import { generateId } from '../../utils/id-generator';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { watchResponsiveProp } from '../../utils/responsive-prop';
import type { ResponsivePropWatcher } from '../../utils/responsive-prop';
import {
  fromNativeValidity, VALID_STATE,
  composeDescribedBy, buildValidationDetail, synthesizeValidity,
  withCustomError, setInternalsValidity, syncHostDisabled,
} from '../../utils/validation';
import type { InternalsHost } from '../../utils/validation';
import { isRtl } from '../../utils/rtl';

const STRINGS = {
  en: {
    noResults: 'No results found',
    clearSelection: 'Clear selection',
    searchLabel: 'Search options',
    searchPlaceholder: 'Search...',
    selectedCount: (n: number) => `${n} selected`,
    required: 'Required',
    listSeparator: ', ',
  },
  ar: {
    noResults: 'لم يتم العثور على نتائج',
    clearSelection: 'مسح التحديد',
    searchLabel: 'البحث في الخيارات',
    searchPlaceholder: 'بحث...',
    selectedCount: (n: number) => `تم اختيار ${n}`,
    required: 'مطلوب',
    listSeparator: '، ',
  },
};

/** Options moved by PageUp / PageDown, as in the APG select-only combobox. */
const PAGE_STEP = 10;

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

  /** Colour family. Drives idle ring/border, selected/checked fill, and value/accent text. Focus ring follows the variant's support colour (camel for primary, desert for secondary, seablue for neutral-max/neutral-min); error stays aered regardless. */
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

  /**
   * True while the user is navigating with the keyboard (or a screen reader
   * moves focus onto an option). The highlighted option only gets the focus
   * fill in this mode — like :focus-visible on buttons and links, a mouse
   * user never sees keyboard focus styling.
   */
  @State() private keyboardMode: boolean = false;
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

  /** Set when the active option changed; componentDidUpdate scrolls it into view (and focuses it, see below). */
  private pendingActiveSync: { focusOption: boolean } | null = null;

  /** Watches the host's own aria-label / aria-labelledby, which aegov-form-field or the author may set after load. */
  private nameObserver?: MutationObserver;

  /** Bumped to re-render when the host's labelling attributes change. */
  @State() private nameRevision: number = 0;

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

  /** The value the field started with — what a form reset restores, like a native control's default value. */
  private _defaultValue: string = '';

  componentWillLoad() {
    if (this.isDisabled) syncHostDisabled(this.el, true);
    this._defaultValue = this.value ?? '';
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

  /** Host aria-label / aria-labelledby / aria-describedby / labels, resolved for the inner control (DS-A11Y-input-01). */
  private hostAria?: HostAria;

  connectedCallback() {
    this.hostAria ??= new HostAria(this.el, { fieldId: () => this.fieldId, internals: () => this.internals, onChange: () => forceUpdate(this) });
    this.hostAria.connect();
  }

  disconnectedCallback() {
    this.hostAria?.disconnect();
    this._sizeWatcher?.destroy();
    if (this.typeaheadTimer) clearTimeout(this.typeaheadTimer);
    this.nameObserver?.disconnect();
  }

  // ── FormAssociated lifecycle (listbox appearance uses ElementInternals) ──
  formAssociatedCallback(_form: HTMLFormElement | null) { /* no-op */ }
  formDisabledCallback(disabled: boolean) { this.formDisabled = disabled; }

  /**
   * True while an ancestor `<fieldset disabled>` or the host's `disabled`
   * attribute disables the field. Kept apart from `isDisabled` so that
   * re-enabling the fieldset doesn't clear the field's own setting.
   */
  @State() private formDisabled: boolean = false;

  /** Disabled by its own `isDisabled` or by the form. */
  private get disabled(): boolean {
    return this.isDisabled || this.formDisabled;
  }

  /** Leave FormData and constraint validation while disabled, like a native control. */
  @Watch('isDisabled')
  onIsDisabledChange() {
    syncHostDisabled(this.el, this.isDisabled);
  }

  formResetCallback() {
    this.value = this._defaultValue;
    this.errorMessage = '';
    this.isInvalid = false;
    this.customValidityMessage = '';
    if (this.nativeSelectEl) {
      this.nativeSelectEl.value = this._defaultValue;
      this.nativeSelectEl.setCustomValidity('');
    }
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
      this.runValidationSync();
    }
  }

  private currentValueForDetail(): AegovSelectValue {
    return this.isMultiple ? this.selectedValues : this.value;
  }

  /** Message from setCustomValidity(), kept so recomputing validity does not drop it. */
  private customValidityMessage = '';

  private computeListboxValidity(): { validity: AegovValidityState; message: string } {
    // Disabled controls are barred from constraint validation, as native ones are.
    if (this.disabled) return { validity: synthesizeValidity({}), message: '' };
    const filled = this.isMultiple ? this.selectedValues.length > 0 : !!this.value;
    const result = this.isRequired && !filled
      ? { validity: synthesizeValidity({ valueMissing: true }), message: this.errorMessage || this.t.required }
      : { validity: synthesizeValidity({}), message: '' };
    return withCustomError(result, this.customValidityMessage);
  }

  private readValidity(): AegovValidityState {
    // Disabled controls are barred from constraint validation, as native ones are.
    if (this.disabled) return VALID_STATE;
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
            this.internals.setFormValue(this.value ?? '');
          }
        }
        // Sync native <select> validity to ElementInternals so form.checkValidity() sees required etc.
        if (this.internals && this.nativeSelectEl) {
          const v = this.nativeSelectEl.validity;
          if (this.disabled || v.valid) {
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
    this.hostAria?.refreshSoon();
    // Re-parse if children weren't available during componentWillLoad
    if (this.parsedOptions.length === 0) {
      this.parseOptions();
      this.updateDerivedState();
    }
    this.runValidationSync();
    adoptExtraClassStylesIntoShadowRoot(this.el.shadowRoot, this.extraClass);
    if (typeof MutationObserver !== 'undefined') {
      this.nameObserver = new MutationObserver(() => { this.nameRevision++; });
      this.nameObserver.observe(this.el, { attributes: true, attributeFilter: ['aria-label', 'aria-labelledby'] });
    }
  }

  /** UI strings in the page's language. */
  private get t() {
    return isRtl(this.el) ? STRINGS.ar : STRINGS.en;
  }

  /**
   * Text of the labels pointing at this select: native `<label for>` (via
   * ElementInternals) and `aegov-label` (its `for` property, which
   * aegov-form-field sets). Same approach as aegov-datepicker.
   */
  private externalLabelText(): string {
    const labels = new Set<Element>(
      Array.from((this.internals?.labels ?? []) as ArrayLike<HTMLLabelElement>).map(label => label.closest('aegov-label') ?? label),
    );
    const id = this.el.id;
    const root = this.el.getRootNode() as Document | ShadowRoot;
    if (id && typeof root.querySelectorAll === 'function') {
      root.querySelectorAll('aegov-label').forEach(label => {
        if ((label as HTMLAegovLabelElement).htmlFor === id || label.getAttribute('for') === id) labels.add(label);
      });
    }
    return Array.from(labels)
      .map(label => (label.textContent ?? '').replace(/\s+/g, ' ').trim())
      .filter(Boolean)
      .join(' ');
  }

  /**
   * Accessible name for the listbox trigger and its popup. The trigger lives in
   * the shadow root, so label associations made on the host (aria-label from
   * aegov-form-field, aria-labelledby IDs in the page, <label for>) cannot reach
   * it; resolve them to text here instead. Precedence follows the ARIA name
   * computation: aria-labelledby, then aria-label, then labels.
   */
  private accessibleName(): string | undefined {
    // Shared resolver (utils/host-aria): aria-labelledby, aria-label, then
    // <label for> / aegov-label for (host id or field-id), kept live.
    return this.hostAria?.name() || this.externalLabelText() || undefined;
  }

  @Watch('extraClass')
  onExtraClassChange() {
    adoptExtraClassStylesIntoShadowRoot(this.el.shadowRoot, this.extraClass);
  }

  /**
   * Constraint props (isRequired, isMultiple, appearance) changed after load
   * must reach the form too; the native select only has them once it re-renders.
   */
  componentDidRender() {
    this.runValidationSync();
  }

  componentDidUpdate() {
    if (this.isOpen && this.listboxRef) {
      this.positionDropdown();
    }
    this.flushActiveSync();
  }

  /**
   * Keep the active option visible, and — when DOM focus is already on an
   * option (VoiceOver's "keyboard focus follows VoiceOver cursor" puts it
   * there) — move focus along with it so the screen reader announces it.
   * Otherwise focus stays on the trigger and aria-activedescendant does the
   * announcing (APG select-only combobox).
   */
  private flushActiveSync() {
    const pending = this.pendingActiveSync;
    if (!pending || !this.isOpen) return;
    this.pendingActiveSync = null;
    const id = this.activeDescendantId;
    const option = id ? this.el.shadowRoot?.getElementById(id) : null;
    if (!option) return;
    if (pending.focusOption && typeof (option as HTMLElement).focus === 'function') {
      (option as HTMLElement).focus({ preventScroll: true });
    }
    if (typeof option.scrollIntoView === 'function') option.scrollIntoView({ block: 'nearest' });
  }

  /** Whether DOM focus is currently on one of the options. */
  private get optionHasFocus(): boolean {
    const active = this.el.shadowRoot?.activeElement as HTMLElement | null;
    return !!active && active.getAttribute('role') === 'option';
  }

  /** Make option `index` (among enabled, filtered options) the active one. */
  private setActiveIndex(index: number) {
    const count = this.filteredOptions.filter(o => !o.disabled).length;
    if (count === 0) return;
    this.focusedIndex = Math.max(0, Math.min(index, count - 1));
    this.pendingActiveSync = { focusOption: this.optionHasFocus };
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
      this.cachedDisplayText = this.t.selectedCount(selected.length);
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
    if (this.disabled) return;
    if (this.isOpen) {
      this.closeDropdown();
    } else {
      this.openDropdown();
    }
  };

  /**
   * Open the popup. APG select-only combobox: visual focus goes to the
   * selected option, else the first option; Home/End open on the first/last.
   */
  private openDropdown(position?: 'first' | 'last') {
    this.isOpen = true;
    this.searchQuery = '';
    if (!this.isSearchable) {
      const enabledOptions = this.parsedOptions.filter(o => !o.disabled);
      const firstSelected = this.selectedValues[0];
      const selectedIdx = firstSelected ? enabledOptions.findIndex(o => o.value === firstSelected) : -1;
      if (position === 'first') this.focusedIndex = 0;
      else if (position === 'last') this.focusedIndex = enabledOptions.length - 1;
      else this.focusedIndex = selectedIdx >= 0 ? selectedIdx : 0;
      this.pendingActiveSync = { focusOption: false };
    } else {
      this.focusedIndex = -1;
    }
    this.aegovSelectOpen.emit();
    requestAnimationFrame(() => {
      if (this.searchInputRef) {
        this.searchInputRef.focus();
        const end = this.searchInputRef.value.length;
        this.searchInputRef.setSelectionRange?.(end, end);
      }
      this.positionDropdown();
    });
  }

  /** The trigger button (the combobox). */
  private get triggerButton(): HTMLButtonElement | null {
    return (this.triggerRef?.querySelector('button[role="combobox"]') as HTMLButtonElement | null) ?? null;
  }

  /**
   * Close the popup. `returnFocus` moves focus back to the trigger (Escape,
   * a choice); an outside click or focus leaving the field closes without
   * pulling focus back.
   */
  private closeDropdown(returnFocus = true) {
    this.isOpen = false;
    this.searchQuery = '';
    this.focusedIndex = -1;
    this.pendingActiveSync = null;
    this.aegovSelectClose.emit();
    if (returnFocus) this.triggerButton?.focus();
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
    // Size the panel to the bottom of the last option that should be visible,
    // measured from the rendered rows. Group headings, group dividers and
    // wrapped labels take room too; a row-count estimate leaves the option
    // under a heading hidden (e.g. a search that matches one grouped option).
    let desiredHeight = (actualItemCount * itemHeight) + searchHeight + padding;
    const optionsEl = this.listboxRef.querySelector<HTMLElement>('.select__options');
    const lastShown = optionsEl?.querySelectorAll<HTMLElement>('[role="option"]')[actualItemCount - 1];
    if (optionsEl && lastShown) {
      const searchEl = this.listboxRef.querySelector<HTMLElement>('.select__search');
      const contentBottom = lastShown.getBoundingClientRect().bottom - optionsEl.getBoundingClientRect().top + optionsEl.scrollTop;
      const paddingBottom = parseFloat(getComputedStyle(optionsEl).paddingBottom) || 0;
      desiredHeight = (searchEl?.offsetHeight ?? 0) + Math.ceil(contentBottom + paddingBottom);
    } else if (this.listboxRef.querySelector('.select__empty')) {
      // No matches: make room for the "No results found" message, which sits
      // after the (empty) options list inside the panel.
      desiredHeight = Array.from(this.listboxRef.children).reduce((sum, el) => sum + (el as HTMLElement).offsetHeight, 0);
    }

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

  private selectOption(option: OptionItem, returnFocus = true) {
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
      this.closeDropdown(returnFocus);
    }
  }

  private handleClear = (event: MouseEvent) => {
    event.stopPropagation();
    // The clear button disappears once the value is empty: move focus to the
    // trigger first, so it never falls to <body>.
    this.triggerButton?.focus();
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

  /** Whether `node` is this select or inside it (light DOM or shadow root). */
  private containsNode(node: Node | null): boolean {
    if (!node) return false;
    return node === this.el || this.el.contains(node) || !!this.el.shadowRoot?.contains(node);
  }

  @Listen('click', { target: 'document' })
  handleDocumentClick(event: MouseEvent) {
    if (this.isOpen) {
      const target = event.target as Node;
      // shadowRoot check covers environments without event retargeting (spec mock-doc)
      if (!this.containsNode(target)) {
        // Clicking elsewhere must not pull focus back to the select.
        this.closeDropdown(false);
      }
    }
  }

  /**
   * Focus left the field (Tab, a click elsewhere, a screen reader moving on):
   * close without stealing focus back.
   *
   * Decided once focus has settled, not from this event: when VoiceOver moves
   * real focus onto an option ("keyboard focus follows VoiceOver cursor"),
   * Chrome first moves focus to the document (<html>) and only then to the
   * option. Closing on that intermediate step removed the option VoiceOver
   * was moving to, so the list closed and VoiceOver said "dimmed".
   */
  @Listen('focusout')
  handleFocusOut() {
    if (!this.isOpen) return;
    setTimeout(() => {
      if (!this.isOpen) return;
      const active = document.activeElement;
      // Still inside, or focus is on nothing / the page itself: keep the popup open.
      if (!active || active === document.body || active === document.documentElement) return;
      if (this.containsNode(active)) return;
      this.closeDropdown(false);
      this.hasBlurredOnce = true;
      this.emitValidate('blur');
    }, 0);
  }

  /**
   * Focus arrived somewhere else on the page while the popup is open. Covers
   * the case focusout can't: focus had already gone to nothing (a screen
   * reader step, see handleFocusOut) and then lands on another control.
   */
  @Listen('focusin', { target: 'document' })
  handleDocumentFocusIn(event: FocusEvent) {
    if (!this.isOpen) return;
    const target = (typeof event.composedPath === 'function' ? event.composedPath()[0] : event.target) as Node | null;
    if (!target || target === document.body || target === document.documentElement) return;
    if (this.containsNode(target)) return;
    this.closeDropdown(false);
    this.hasBlurredOnce = true;
    this.emitValidate('blur');
  }

  /** Any pointer input inside the select switches the focus styling off. */
  @Listen('pointerdown')
  handlePointerDown() {
    this.keyboardMode = false;
  }

  /** Mouse down inside the popup must not move focus off the trigger / search field. */
  private preventFocusSteal = (event: MouseEvent) => {
    if (event.target !== this.searchInputRef) event.preventDefault();
  };

  /**
   * An option received DOM focus — VoiceOver's "keyboard focus follows
   * VoiceOver cursor" does this when its cursor lands on an option. Make it
   * the active option so the highlight and the keyboard follow it.
   */
  private handleOptionFocus(option: OptionItem) {
    if (option.disabled) return;
    this.keyboardMode = true;
    const index = this.filteredOptions.filter(o => !o.disabled).indexOf(option);
    if (index >= 0 && index !== this.focusedIndex) this.focusedIndex = index;
  }

  /** An option's value/isDisabled changed after load — see aegov-select-option's notifyParent(). */
  @Listen('aegovInternalSelectOptionUpdate')
  handleOptionUpdate(event: Event) {
    event.stopPropagation();
    this.parseOptions();
    this.updateDerivedState();
  }

  /**
   * Keyboard model: W3C APG select-only combobox
   * (https://www.w3.org/WAI/ARIA/apg/patterns/combobox/examples/combobox-select-only/).
   * Listening on the host catches keys from the trigger, the search field and
   * any option that holds DOM focus, so the keys work wherever focus is.
   */
  @Listen('keydown')
  handleKeyDown(event: KeyboardEvent) {
    if (!this.useListbox || this.disabled) return;

    const origin = (typeof event.composedPath === 'function' ? event.composedPath()[0] : event.target) as HTMLElement | null;
    // The clear button is an ordinary button: let Enter/Space activate it.
    if (origin?.classList?.contains('select__clear')) return;
    const inSearch = !!this.searchInputRef && origin === this.searchInputRef;
    const key = event.key;
    if (key !== 'Tab' && key !== 'Shift' && key !== 'Control' && key !== 'Alt' && key !== 'Meta') this.keyboardMode = true;
    const printable = key.length === 1 && !event.ctrlKey && !event.metaKey && !event.altKey;

    if (!this.isOpen) {
      switch (key) {
        case 'ArrowDown':
        case 'ArrowUp':
        case 'Enter':
        case ' ':
          event.preventDefault();
          this.openDropdown();
          break;
        case 'Home':
          event.preventDefault();
          this.openDropdown('first');
          break;
        case 'End':
          event.preventDefault();
          this.openDropdown('last');
          break;
        default:
          if (printable) {
            event.preventDefault();
            this.openDropdown();
            if (this.isSearchable) this.searchQuery = key;
            else this.handleTypeahead(key);
          }
      }
      return;
    }

    const options = this.filteredOptions.filter(o => !o.disabled);
    const active = this.focusedIndex >= 0 && this.focusedIndex < options.length ? options[this.focusedIndex] : null;

    switch (key) {
      case 'Escape':
        event.preventDefault();
        // Only the popup closes — not a modal or drawer around the select.
        event.stopPropagation();
        this.closeDropdown();
        break;
      case 'ArrowDown':
        event.preventDefault();
        if (!event.altKey) this.setActiveIndex(this.focusedIndex + 1);
        break;
      case 'ArrowUp':
        event.preventDefault();
        if (event.altKey) {
          // APG: Alt+Up chooses the active option and closes.
          if (active && !this.isMultiple) this.selectOption(active);
          else this.closeDropdown();
        } else {
          this.setActiveIndex(this.focusedIndex - 1);
        }
        break;
      case 'Home':
      case 'End':
        if (inSearch) return; // move the caret in the search field
        event.preventDefault();
        this.setActiveIndex(key === 'Home' ? 0 : options.length - 1);
        break;
      case 'PageUp':
      case 'PageDown':
        event.preventDefault();
        this.setActiveIndex(Math.max(this.focusedIndex, 0) + (key === 'PageUp' ? -PAGE_STEP : PAGE_STEP));
        break;
      case 'Enter':
      case ' ':
        if (inSearch && key === ' ') return; // a space typed into the search
        event.preventDefault();
        if (active) this.selectOption(active);
        break;
      case 'Tab': {
        // APG: Tab chooses the active option, closes, and lets focus move on.
        // Put focus back on the trigger first, so the browser continues the
        // Tab sequence from there instead of from an option that is about to
        // disappear.
        // The search field is still in the DOM until the re-render: take it out
        // of the Tab order now, or Tab would land on it just before it is removed.
        if (this.searchInputRef) this.searchInputRef.tabIndex = -1;
        const leavingInside = inSearch || this.optionHasFocus;
        if (active && !this.isMultiple) this.selectOption(active, false);
        else this.closeDropdown(false);
        if (leavingInside) this.triggerButton?.focus();
        break;
      }
      default:
        if (!printable) break;
        if (this.isSearchable) {
          if (!inSearch) {
            event.preventDefault();
            this.searchQuery += key;
            this.focusedIndex = -1;
            this.searchInputRef?.focus();
          }
        } else {
          event.preventDefault();
          this.handleTypeahead(key);
        }
    }
  }

  private handleTypeahead(char: string) {
    this.typeaheadBuffer += char.toLowerCase();
    if (this.typeaheadTimer) clearTimeout(this.typeaheadTimer);
    this.typeaheadTimer = setTimeout(() => { this.typeaheadBuffer = ''; }, 500);

    const options = this.filteredOptions.filter(o => !o.disabled);
    if (options.length === 0) return;

    // A single repeated character cycles through matches (APG); a longer
    // buffer starts matching at the current option, so typing "sha" stays on
    // "Sharjah" once it matched at "s".
    const isRepeat = this.typeaheadBuffer.length > 1 && this.typeaheadBuffer.split('').every(c => c === this.typeaheadBuffer[0]);
    const search = isRepeat ? this.typeaheadBuffer[0] : this.typeaheadBuffer;
    const start = this.focusedIndex < 0 ? -1 : this.focusedIndex;
    const offset = search.length === 1 ? 1 : 0;
    for (let i = 0; i < options.length; i++) {
      const idx = (start + offset + i + options.length) % options.length;
      if (options[idx].label.toLowerCase().startsWith(search)) {
        this.setActiveIndex(idx);
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
    if (this.disabled) classes.push('select--disabled');
    if (this.isOpen) classes.push('select--open');
    if (!this.displayText) classes.push('select--placeholder');
    if (this.showClearButton) classes.push('select--has-clear');
    if (this.extraClass) classes.push(this.extraClass);
    return classes.join(' ');
  }

  private renderNativeSelect() {
    const passThroughAttrs = this.hostAria ? this.hostAria.bridge(getPassThroughAttributes(this.el, AegovSelect.PASS_THROUGH_ATTRS)) : getPassThroughAttributes(this.el, AegovSelect.PASS_THROUGH_ATTRS);
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
            disabled={this.disabled}
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
        {this.hostAria?.renderDescription()}
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
    const authorDescribedBy = this.hostAria?.descriptionId();
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

  /** Whether the clear button is shown. */
  private get showClearButton(): boolean {
    return this.isClearable && this.selectedValues.length > 0 && !this.disabled;
  }

  private renderListbox() {
    const groups = this.groupedFilteredOptions;
    const enabledOptions = this.filteredOptions.filter(o => !o.disabled);
    const validationDecor = this.computeValidationDecor();
    const { errorRegion, hintRegion, describedBy, hostClass } = validationDecor;
    const t = this.t;
    // Read so a change to the host's labelling attributes re-renders.
    void this.nameRevision;
    const name = this.accessibleName();
    const noResults = groups.length === 0;
    const noResultsText = this.emptyMessage || t.noResults;
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
              // While the popup is open, focus may pass through the page on its
              // way to an option (screen readers); handleFocusOut validates if
              // focus really leaves.
              if (this.isOpen) return;
              if (!this.containsNode(e.relatedTarget as Node)) {
                this.hasBlurredOnce = true;
                this.emitValidate('blur');
              }
            }}
            disabled={this.disabled}
            role="combobox"
            aria-label={name}
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
            <span class="select__actions" aria-hidden="true">
              <span class={`select__arrow${this.isOpen ? ' select__arrow--open' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </span>
          </button>

          {/* A real button next to the combobox, not inside it: interactive
              content can't be nested in a <button>, and inside one it was
              unreachable by keyboard. */}
          {this.showClearButton && (
            <button
              type="button"
              class="select__clear"
              onClick={this.handleClear}
              aria-label={name ? `${t.clearSelection}${t.listSeparator}${name}` : t.clearSelection}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}

          {this.isOpen && (
            <div
              class={`select__listbox${this.keyboardMode ? ' select__listbox--keyboard' : ''}`}
              ref={el => this.listboxRef = el}
              onMouseDown={this.preventFocusSteal}
            >
              {/* The search field sits outside the listbox: a listbox may only contain options and groups. */}
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
                    aria-label={name ? `${t.searchLabel}${t.listSeparator}${name}` : t.searchLabel}
                    aria-expanded="true"
                    aria-haspopup="listbox"
                    aria-autocomplete="list"
                    aria-controls={this.selectId}
                    aria-activedescendant={this.activeDescendantId}
                    autocomplete="off"
                  />
                </div>
              )}
              {/* role="listbox" sits on the scroll container itself. Chrome makes
                  a scroll container with no tabbable content a Tab stop, which
                  is where Tab and VoiceOver used to strand focus: tabindex -1
                  takes it out of the Tab order, and every option is focusable
                  (tabindex -1) so a screen reader's focus lands on an option,
                  never on the container. */}
              <div
                class="select__options"
                role="listbox"
                tabindex="-1"
                id={this.selectId}
                aria-label={name}
                aria-multiselectable={this.isMultiple ? 'true' : undefined}
              >
                {groups.map(g => {
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
                        tabindex="-1"
                        // Single select: aria-selected marks the highlighted option, as in the
                        // APG select-only combobox — VoiceOver's own navigation (Quick Nav)
                        // moves to the option marked selected, so it has to follow the
                        // highlight. The check icon still shows the saved value. Multiple
                        // select: aria-selected is each option's checked state.
                        aria-selected={(this.isMultiple ? isSelected : isFocused) ? 'true' : 'false'}
                        aria-disabled={opt.disabled ? 'true' : undefined}
                        onClick={() => { if (enabledIndex >= 0) this.focusedIndex = enabledIndex; this.selectOption(opt); }}
                        onFocus={() => this.handleOptionFocus(opt)}
                        data-value={opt.value}
                      >
                        {this.isMultiple && (
                          <span class="select__checkbox" aria-hidden="true">
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
                    // Named with aria-label (not the visible heading): the heading is
                    // styled uppercase, which would otherwise end up in the name, and
                    // the heading text would be read a second time inside the group.
                    return (
                      <div role="group" aria-label={g.group}>
                        <div class="select__group-label" aria-hidden="true">{g.group}</div>
                        {optionElements}
                      </div>
                    );
                  }
                  return optionElements;
                })}
              </div>
              {noResults && (
                <div class="select__empty" aria-hidden="true">{noResultsText}</div>
              )}
              {/* Present from the moment the popup opens, so filling it is announced. */}
              <div class="select__status" role="status">{noResults ? noResultsText : ''}</div>
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
        {this.hostAria?.renderDescription()}
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
