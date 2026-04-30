import { Component, Host, h, Prop, State, Event, EventEmitter, Element, Listen, Watch } from '@stencil/core';
import { CHECKBOX_GROUP_VARIANTS, CHECKBOX_GROUP_ORIENTATIONS, CHECKBOX_SIZES } from '../../utils/types';
import type { CheckboxGroupVariant, CheckboxGroupOrientation, CheckboxSize } from '../../utils/types';
import { warnIfInvalidEnumProp } from '../../utils/prop-validator';
import { watchResponsiveProp } from '../../utils/responsive-prop';
import type { ResponsivePropWatcher } from '../../utils/responsive-prop';

const TAG = 'aegov-checkbox-group';
const ctx = (prop: string) => ({ component: TAG, prop });

@Component({
  tag: 'aegov-checkbox-group',
  styleUrl: 'aegov-checkbox-group.css',
  scoped: false,
  shadow: false,
})
export class AegovCheckboxGroup {
  @Element() el: HTMLElement;

  /** Visual variant for the group layout. */
  @Prop() variant: CheckboxGroupVariant = 'default';

  /** Stack direction for checkbox items. */
  @Prop() orientation: CheckboxGroupOrientation = 'vertical';

  /** Optional label rendered as a <legend> for accessibility. */
  @Prop() label?: string;

  /** Size of all checkboxes in the group. Propagated to children. */
  @Prop() size: string = 'base';
  @State() private _resolvedSize: CheckboxSize = 'base';
  private _sizeWatcher: ResponsivePropWatcher | null = null;

  /** Disables all checkboxes within the group via native fieldset disabled. */
  @Prop() disabled: boolean = false;

  /** Additional CSS classes to apply. */
  @Prop() extraClass?: string;

  /** Emitted when any checkbox in the group changes. Contains all currently checked values. */
  @Event() aegovCheckboxGroupChange: EventEmitter<{ values: string[] }>;

  componentWillLoad() {
    warnIfInvalidEnumProp(this.variant, CHECKBOX_GROUP_VARIANTS, 'default', ctx('variant'));
    warnIfInvalidEnumProp(this.orientation, CHECKBOX_GROUP_ORIENTATIONS, 'vertical', ctx('orientation'));
    this._sizeWatcher = watchResponsiveProp(this.size, CHECKBOX_SIZES, 'base', v => {
      this._resolvedSize = v as CheckboxSize;
      if (this.el.isConnected) { this.syncChildren(); }
    });
    this._resolvedSize = this._sizeWatcher.current as CheckboxSize;
  }

  componentDidLoad() {
    this.syncChildren();
    this.updateCheckAllState();
  }

  @Watch('variant')
  onVariantChange(v: unknown) { warnIfInvalidEnumProp(v, CHECKBOX_GROUP_VARIANTS, 'default', ctx('variant')); }

  @Watch('orientation')
  onOrientationChange(v: unknown) { warnIfInvalidEnumProp(v, CHECKBOX_GROUP_ORIENTATIONS, 'vertical', ctx('orientation')); }

  disconnectedCallback() {
    this._sizeWatcher?.destroy();
  }

  @Watch('size')
  onSizeChange() {
    this._sizeWatcher?.destroy();
    this._sizeWatcher = watchResponsiveProp(this.size, CHECKBOX_SIZES, 'base', v => {
      this._resolvedSize = v as CheckboxSize;
      if (this.el.isConnected) { this.syncChildren(); }
    });
    this._resolvedSize = this._sizeWatcher.current as CheckboxSize;
  }

  private syncChildren() {
    const checkboxes = Array.from(this.el.querySelectorAll('aegov-checkbox')) as HTMLAegovCheckboxElement[];
    checkboxes.forEach(cb => {
      cb.size = this._resolvedSize;
    });
  }

  private getRegularCheckboxes(): HTMLAegovCheckboxElement[] {
    return Array.from(this.el.querySelectorAll('aegov-checkbox')).filter(cb => !cb.checkAll);
  }

  private getCheckAllCheckbox(): HTMLAegovCheckboxElement | null {
    return this.el.querySelector('aegov-checkbox[check-all]') as HTMLAegovCheckboxElement | null;
  }

  @Listen('aegovCheckboxChange')
  handleCheckboxChange(event: CustomEvent<{ checked: boolean; value?: string }>) {
    const target = event.target as HTMLAegovCheckboxElement;

    if (target.checkAll) {
      this.handleCheckAllToggle(event.detail.checked);
    } else {
      this.updateCheckAllState();
    }

    this.emitGroupChange();
  }

  private handleCheckAllToggle(checked: boolean) {
    const checkboxes = this.getRegularCheckboxes();
    checkboxes.forEach(cb => {
      if (!cb.disabled) {
        cb.checked = checked;
      }
    });
  }

  private updateCheckAllState() {
    const checkAll = this.getCheckAllCheckbox();
    if (!checkAll) return;

    const checkboxes = this.getRegularCheckboxes();
    const enabledCheckboxes = checkboxes.filter(cb => !cb.disabled);
    const checkedCount = enabledCheckboxes.filter(cb => cb.checked).length;
    const total = enabledCheckboxes.length;

    if (total === 0) return;

    if (checkedCount === 0) {
      checkAll.checked = false;
      checkAll.indeterminate = false;
    } else if (checkedCount === total) {
      checkAll.checked = true;
      checkAll.indeterminate = false;
    } else {
      checkAll.checked = false;
      checkAll.indeterminate = true;
    }
  }

  private emitGroupChange() {
    const checkboxes = this.getRegularCheckboxes();
    const values = checkboxes
      .filter(cb => cb.checked)
      .map(cb => cb.value)
      .filter((v): v is string => v != null);
    this.aegovCheckboxGroupChange.emit({ values });
  }

  private getGroupClasses(): string {
    const classes = ['aegov-checkbox-group'];
    const variant: CheckboxGroupVariant = (CHECKBOX_GROUP_VARIANTS as readonly string[]).includes(this.variant) ? this.variant : 'default';
    const orientation: CheckboxGroupOrientation = (CHECKBOX_GROUP_ORIENTATIONS as readonly string[]).includes(this.orientation) ? this.orientation : 'vertical';
    if (variant !== 'default') {
      classes.push(`checkbox-group--${variant}`);
    }
    if (orientation === 'horizontal') {
      classes.push('checkbox-group--horizontal');
    }
    if (this.extraClass) {
      classes.push(this.extraClass);
    }
    return classes.join(' ');
  }

  render() {
    return (
      <Host>
        <fieldset class={this.getGroupClasses()} disabled={this.disabled}>
          {this.label && <legend class="checkbox-group__legend">{this.label}</legend>}
          <div class="checkbox-group__items">
            <slot />
          </div>
        </fieldset>
      </Host>
    );
  }
}
